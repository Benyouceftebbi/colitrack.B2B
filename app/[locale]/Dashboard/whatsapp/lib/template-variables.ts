import type { TemplateComponent, WhatsAppTemplate } from "../types"

/** `{{1}}`, `{{2}}`… in ascending order, de-duplicated. */
export function extractVariables(text?: string): number[] {
  if (!text) return []
  const found = new Set<number>()
  for (const match of text.matchAll(/\{\{(\d+)\}\}/g)) found.add(Number(match[1]))
  return Array.from(found).sort((a, b) => a - b)
}

export interface ButtonVariable {
  /** Position of the button within the BUTTONS component — Meta needs this index. */
  buttonIndex: number
  label: string
  /** The URL template, e.g. https://colitrack.com/track/{{1}} */
  url: string
}

export interface TemplateVariables {
  /** A TEXT header may contain at most one variable. */
  header: number[]
  body: number[]
  /** Dynamic-URL buttons each take exactly one suffix value. */
  buttons: ButtonVariable[]
  total: number
}

const find = (components: TemplateComponent[], type: string) => components.find((c) => c.type === type)

/**
 * Works out every value the user must supply before this template can be sent.
 * Meta rejects a send whose parameter count does not match the approved
 * template exactly, so this drives the form rather than free-text guessing.
 */
export function getTemplateVariables(template: WhatsAppTemplate): TemplateVariables {
  const components = template.components || []

  const header = find(components, "HEADER")
  const body = find(components, "BODY")
  const buttons = find(components, "BUTTONS")?.buttons ?? []

  const headerVars = header?.format === "TEXT" ? extractVariables(header.text) : []
  const bodyVars = extractVariables(body?.text)

  const buttonVars: ButtonVariable[] = []
  buttons.forEach((button, index) => {
    if (button.type !== "URL" || !button.url) return
    if (extractVariables(button.url).length === 0) return
    buttonVars.push({ buttonIndex: index, label: button.text, url: button.url })
  })

  return {
    header: headerVars,
    body: bodyVars,
    buttons: buttonVars,
    total: headerVars.length + bodyVars.length + buttonVars.length,
  }
}

/** The template's raw body text, kept so the sent message renders in history. */
export function getBodyText(template: WhatsAppTemplate): string {
  return template.components?.find((c) => c.type === "BODY")?.text ?? ""
}

/** Non-TEXT header formats need a media handle we do not collect here. */
export function getMediaHeaderFormat(template: WhatsAppTemplate): string | null {
  const header = template.components?.find((c) => c.type === "HEADER")
  if (!header?.format || header.format === "TEXT") return null
  return header.format
}

/**
 * WhatsApp wants the full international number, digits only, no leading zero
 * and no `+`. Returns null when the input cannot be one.
 */
export function normaliseWhatsAppPhone(input: string): string | null {
  const digits = String(input || "").replace(/\D/g, "")
  // Shortest valid E.164 subscriber numbers are ~8 digits incl. country code,
  // longest is 15.
  if (digits.length < 8 || digits.length > 15) return null
  return digits
}
