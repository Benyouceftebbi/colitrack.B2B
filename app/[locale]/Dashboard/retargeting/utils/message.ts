import type { ExcelData } from "../types"

export function containsArabicCharacters(text: string): boolean {
  // Arabic Unicode range: U+0600 to U+06FF
  const arabicRegex = /[\u0600-\u06FF]/
  return arabicRegex.test(text)
}

export function calculateMessageStats(message: string, characterLimit: number) {
  const hasArabic = containsArabicCharacters(message)
  // For Arabic text, use a smaller character limit (70 chars per segment)
  const effectiveLimit = hasArabic ? 70 : characterLimit
  const characterCount = message.length
  const messageCount = Math.ceil(characterCount / effectiveLimit)
  const remainingCharacters = effectiveLimit - (characterCount % effectiveLimit || effectiveLimit)

  return {
    characterCount,
    messageCount,
    remainingCharacters,
    hasArabic,
    effectiveLimit,
  }
}

export function splitMessageIntoChunks(message: string, characterLimit: number) {
  const hasArabic = containsArabicCharacters(message)
  const effectiveLimit = hasArabic ? 70 : characterLimit
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

