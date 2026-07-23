import type { ExcelData } from "../types"

export function containsUnicodeCharacters(text: string): boolean {
  // Check for characters outside basic ASCII (0-127) that require Unicode encoding
  // This includes Arabic, currency symbols, emojis, special punctuation, etc.
  const unicodeRegex = /[^\x00-\x7F]/
  return unicodeRegex.test(text)
}

export function containsArabicCharacters(text: string): boolean {
  // Arabic Unicode range: U+0600 to U+06FF
  const arabicRegex = /[\u0600-\u06FF]/
  return arabicRegex.test(text)
}

export function containsRTLCharacters(text: string): boolean {
  // Only Arabic and Hebrew should trigger RTL direction
  // Arabic: U+0600-U+06FF, Hebrew: U+0590-U+05FF
  const rtlRegex = /[\u0590-\u05FF\u0600-\u06FF]/
  return rtlRegex.test(text)
}

export function getUnicodeCharacterTypes(text: string): {
  hasArabic: boolean
  hasCurrency: boolean
  hasEmojis: boolean
  hasSpecialPunctuation: boolean
  hasOtherUnicode: boolean
} {
  return {
    hasArabic: /[\u0600-\u06FF]/.test(text), // Arabic
    hasCurrency: /[\u00A2-\u00A5\u20A0-\u20CF$€£¥¢₹₽₩₪₨₦₡₵₴₸₼₺₻₾₿]/.test(text), // Extended currency symbols
    hasEmojis: /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/u.test(text), // Emojis
    hasSpecialPunctuation: /[\u2000-\u206F\u2070-\u209F\u2100-\u214F]/.test(text), // Special punctuation
    hasOtherUnicode:
      /[^\x00-\x7F]/.test(text) &&
      !/[\u0600-\u06FF\u00A2-\u00A5\u20A0-\u20CF$€£¥¢₹₽₩₪₨₦₡₵₴₸₼₺₻₾₿\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u2000-\u206F\u2070-\u209F\u2100-\u214F]/u.test(
        text,
      ),
  }
}

export function calculateMessageStats(message: string, characterLimit: number) {
  const hasUnicode = containsUnicodeCharacters(message)
  const hasArabic = containsArabicCharacters(message) // Keep for backward compatibility
  const hasRTL = containsRTLCharacters(message) // Added RTL detection

  // For Unicode text (including Arabic, currency symbols, emojis, etc.), use a smaller character limit (80 chars per segment)
  const effectiveLimit = hasUnicode ? 80 : characterLimit
  const characterCount = message.length
  const messageCount = Math.ceil(characterCount / effectiveLimit)
  const remainingCharacters = effectiveLimit - (characterCount % effectiveLimit || effectiveLimit)

  return {
    characterCount,
    messageCount,
    remainingCharacters,
    hasArabic, // Keep for backward compatibility
    hasUnicode, // Added Unicode detection flag
    hasRTL, // Added RTL detection flag
    effectiveLimit,


    
  }
}

export function splitMessageIntoChunks(message: string, characterLimit: number) {
  const hasUnicode = containsUnicodeCharacters(message)
  const effectiveLimit = hasUnicode ? 80 : characterLimit
  const chunks: string[] = []
  for (let i = 0; i < message.length; i += effectiveLimit) {
    chunks.push(message.slice(i, i + effectiveLimit))
  }
  return chunks
}

export function replaceNamePlaceholder(message: string, name: string) {
  return message.replace(/{{name}}/g, name || "valued customer")
}

export function previewPersonalizedMessage(message: string, excelData: ExcelData | null) {
  if (!excelData || !excelData.nameColumn || !excelData.data.length) {
    return replaceNamePlaceholder(message, "")
  }

  const firstRow = excelData.data[0]
  const name = firstRow[excelData.nameColumn]
  return replaceNamePlaceholder(message, name)
}

export function hasNamePlaceholder(message: string): boolean {
  return message.includes("{{name}}")
}

export function validateNamePlaceholderLength(message: string): { hasWarning: boolean; warningMessage: string } {
  if (!hasNamePlaceholder(message)) {
    return { hasWarning: false, warningMessage: "" }
  }

  return {
    hasWarning: true,
    warningMessage: "The message might be counted as 2 messages if the length of the name exceeds 8 characters",
  }
}

export function validateUnicodeCharacters(message: string): {
  hasWarning: boolean
  warningMessage: string
  unicodeTypes: ReturnType<typeof getUnicodeCharacterTypes>
} {
  const unicodeTypes = getUnicodeCharacterTypes(message)
  const hasAnyUnicode = containsUnicodeCharacters(message)

  if (!hasAnyUnicode) {
    return {
      hasWarning: false,
      warningMessage: "",
      unicodeTypes,
    }
  }

  const detectedTypes: string[] = []
  if (unicodeTypes.hasArabic) detectedTypes.push("Arabic characters")
  if (unicodeTypes.hasCurrency) detectedTypes.push("currency symbols")
  if (unicodeTypes.hasEmojis) detectedTypes.push("emojis")
  if (unicodeTypes.hasSpecialPunctuation) detectedTypes.push("special punctuation")
  if (unicodeTypes.hasOtherUnicode) detectedTypes.push("other Unicode characters")

  const typesList =
    detectedTypes.length > 1
      ? detectedTypes.slice(0, -1).join(", ") + " and " + detectedTypes.slice(-1)
      : detectedTypes[0]

  return {
    hasWarning: true,
    warningMessage: `Message contains ${typesList}. Character limit reduced to 80 characters per SMS segment.`,
    unicodeTypes,
  }
}

export function getUnicodeValidationMessage(message: string): string {
  const validation = validateUnicodeCharacters(message)
  return validation.hasWarning ? validation.warningMessage : ""
}
