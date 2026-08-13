import * as XLSX from "xlsx"
import type { AudienceRow, ColumnMapping, WhatsAppTemplate } from "../types"
import { getTemplateVariables } from "./template-variables"
import { dedupeByPhone, describeIssue, normalisePhone } from "./phone"

export interface ParsedSheet {
  headers: string[]
  rows: any[][]
  fileName: string
}

/**
 * Reads the first sheet of an uploaded workbook.
 *
 * `raw: false` matters: without it XLSX hands back numbers for phone columns
 * and the leading zero is already gone. We still guard against that in the
 * normaliser, but keeping the cell as text is the cleaner fix.
 */
export async function parseSheet(file: File): Promise<ParsedSheet> {
  const buffer = await file.arrayBuffer()
  const workbook = XLSX.read(buffer, { raw: false })
  const sheet = workbook.Sheets[workbook.SheetNames[0]]

  const matrix = XLSX.utils.sheet_to_json<any[]>(sheet, { header: 1, raw: false, defval: "" })
  if (!matrix.length) return { headers: [], rows: [], fileName: file.name }

  const headers = (matrix[0] as any[]).map((h, i) => String(h ?? "").trim() || `Column ${i + 1}`)
  const rows = matrix
    .slice(1)
    .filter((row) => Array.isArray(row) && row.some((cell) => String(cell ?? "").trim() !== ""))

  return { headers, rows, fileName: file.name }
}

/** Cell value as a trimmed string, tolerating short rows. */
const cell = (row: any[], index: number) =>
  index < 0 || index >= row.length ? "" : String(row[index] ?? "").trim()

export interface AudienceSummary {
  /** Valid, de-duplicated, ready to send. */
  recipients: AudienceRow[]
  /** Rows rejected by validation, with the reason. */
  invalid: AudienceRow[]
  /** Valid rows dropped because the number already appeared. */
  duplicatesRemoved: number
  /** Rows read from the sheet (excluding the header). */
  totalRows: number
  /** Rows where a mapped variable column was blank — Meta rejects those. */
  missingValues: number
}

/**
 * Turns the sheet plus a column mapping into a sendable audience.
 *
 * Rows with an unusable phone number or a blank variable are separated rather
 * than dropped, so the user can see exactly which rows in their file are wrong
 * instead of just a smaller number than they expected.
 */
export function buildAudience(
  sheet: ParsedSheet,
  mapping: ColumnMapping,
  template: WhatsAppTemplate | null,
): AudienceSummary {
  const variables = template ? getTemplateVariables(template) : null
  const indexOf = (header: string) => sheet.headers.indexOf(header)

  const phoneIndex = indexOf(mapping.phoneColumn)
  const headerIndices = (mapping.headerColumns || []).map(indexOf)
  const bodyIndices = (mapping.bodyColumns || []).map(indexOf)
  const buttonIndices = (mapping.buttonColumns || []).map(indexOf)

  const valid: AudienceRow[] = []
  const invalid: AudienceRow[] = []
  let missingValues = 0

  sheet.rows.forEach((row, i) => {
    const rawPhone = cell(row, phoneIndex)
    const phone = normalisePhone(rawPhone)

    const headerParams = headerIndices.map((idx) => cell(row, idx))
    const bodyParams = bodyIndices.map((idx) => cell(row, idx))
    const buttonParams = buttonIndices.map((idx) => cell(row, idx))

    const expected =
      (variables?.header.length ?? 0) + (variables?.body.length ?? 0) + (variables?.buttons.length ?? 0)
    const supplied = [...headerParams, ...bodyParams, ...buttonParams]
    const hasBlank = expected > 0 && supplied.some((v) => v === "")

    const entry: AudienceRow = {
      rowNumber: i + 2, // +1 for the header row, +1 for 1-based numbering
      phone: phone.value ?? "",
      rawPhone,
      valid: phone.valid && !hasBlank,
      issue: !phone.valid ? describeIssue(phone.issue) : hasBlank ? "Missing template value" : undefined,
      headerParams,
      bodyParams,
      buttonParams,
    }

    if (hasBlank && phone.valid) missingValues += 1

    if (entry.valid) valid.push(entry)
    else invalid.push(entry)
  })

  const { unique, duplicatesRemoved } = dedupeByPhone(valid)

  return {
    recipients: unique,
    invalid,
    duplicatesRemoved,
    totalRows: sheet.rows.length,
    missingValues,
  }
}

/** Substitutes a row's values into the template body, for the preview. */
export function renderForRow(bodyText: string, params: string[]): string {
  if (!bodyText) return ""
  return bodyText.replace(/\{\{(\d+)\}\}/g, (_m, i) => params[Number(i) - 1] || `{{${i}}}`)
}

/** Failed/invalid rows as CSV so the user can fix them and re-upload. */
export function invalidRowsToCsv(rows: AudienceRow[]): string {
  const head = ["Row", "Phone in file", "Problem"]
  const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`
  const body = rows.map((r) => [r.rowNumber, r.rawPhone, r.issue ?? ""].map(escape).join(","))
  return [head.join(","), ...body].join("\n")
}
