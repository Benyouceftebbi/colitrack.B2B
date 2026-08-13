/**
 * Phone normalisation for WhatsApp campaigns.
 *
 * WhatsApp wants the full international number, digits only, no `+` and no
 * leading zero. Real customer lists arrive in every shape imaginable:
 *
 *   0555 00 11 22      local Algerian
 *   +213 555 001 122   international with plus
 *   00213555001122     international with the 00 prefix
 *   213555001122       already correct
 *   555001122          bare subscriber number
 *
 * Excel makes this worse: a cell holding 0555001122 is often read as the
 * NUMBER 555001122, silently dropping the leading zero. That case is handled
 * explicitly below, because otherwise a whole column of numbers looks invalid.
 */

/** Default country. Algeria — Colitrack's market. */
export const DEFAULT_COUNTRY_CODE = "213"

/** Algerian mobiles are 9 digits after the country code and start 5, 6 or 7. */
const DZ_MOBILE = /^213[567]\d{8}$/

export type PhoneIssue = "empty" | "too-short" | "too-long" | "not-mobile" | "non-numeric"

export interface NormalisedPhone {
  /** Digits only, ready for the API. Null when it could not be salvaged. */
  value: string | null
  /** What was in the spreadsheet cell, for showing the user which row is wrong. */
  raw: string
  valid: boolean
  issue?: PhoneIssue
}

const ISSUE_LABEL: Record<PhoneIssue, string> = {
  empty: "Empty cell",
  "too-short": "Too few digits",
  "too-long": "Too many digits",
  "not-mobile": "Not an Algerian mobile number",
  "non-numeric": "Contains no digits",
}

export const describeIssue = (issue?: PhoneIssue) => (issue ? ISSUE_LABEL[issue] : "")

/**
 * Turns whatever was in the cell into a WhatsApp-ready number.
 *
 * @param input      the raw cell value
 * @param countryCode country to assume for local-format numbers
 */
export function normalisePhone(input: unknown, countryCode = DEFAULT_COUNTRY_CODE): NormalisedPhone {
  const raw = input === null || input === undefined ? "" : String(input).trim()

  if (!raw) return { value: null, raw, valid: false, issue: "empty" }

  // Strip spaces, dashes, dots, brackets and the leading plus.
  let digits = raw.replace(/[^\d]/g, "")

  if (!digits) return { value: null, raw, valid: false, issue: "non-numeric" }

  // 00213... -> 213...
  if (digits.startsWith("00")) digits = digits.slice(2)

  if (digits.startsWith(countryCode)) {
    // Already international. Nothing to prepend.
  } else if (digits.startsWith("0")) {
    // Local format 0XXXXXXXXX -> country code + XXXXXXXXX.
    digits = countryCode + digits.slice(1)
  } else if (digits.length === 9) {
    // Excel ate the leading zero and stored it as a number.
    digits = countryCode + digits
  } else {
    // Some other country, or already-odd input. Keep it and let length decide.
  }

  if (digits.length < 10) return { value: null, raw, valid: false, issue: "too-short" }
  if (digits.length > 15) return { value: null, raw, valid: false, issue: "too-long" }

  // For the default market we can be strict: a bad mobile prefix means the row
  // will fail at Meta anyway, so flag it before spending a send.
  if (digits.startsWith(DEFAULT_COUNTRY_CODE) && !DZ_MOBILE.test(digits)) {
    return { value: digits, raw, valid: false, issue: "not-mobile" }
  }

  return { value: digits, raw, valid: true }
}

/** Pretty form for display only — never send this to the API. */
export function formatForDisplay(digits: string): string {
  if (!digits) return ""
  if (DZ_MOBILE.test(digits)) {
    const local = digits.slice(3)
    return `+213 ${local.slice(0, 3)} ${local.slice(3, 5)} ${local.slice(5, 7)} ${local.slice(7)}`
  }
  return `+${digits}`
}

export interface DedupeResult<T> {
  unique: T[]
  duplicatesRemoved: number
}

/**
 * Drops repeat numbers, keeping the first occurrence.
 *
 * Worth doing before every campaign: WhatsApp charges per conversation, and
 * messaging the same person twice in one blast is the fastest way to get a
 * block and damage the number's quality rating.
 */
export function dedupeByPhone<T extends { phone: string }>(rows: T[]): DedupeResult<T> {
  const seen = new Set<string>()
  const unique: T[] = []
  let duplicatesRemoved = 0

  for (const row of rows) {
    if (seen.has(row.phone)) {
      duplicatesRemoved += 1
      continue
    }
    seen.add(row.phone)
    unique.push(row)
  }

  return { unique, duplicatesRemoved }
}
