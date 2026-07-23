import { IntlErrorCode, type IntlError } from "next-intl";

/**
 * Centralised next-intl error handling, shared by the server request config
 * (i18n/request.ts) and the client provider (app/[locale]/IntlProvider.tsx).
 *
 * Goal: a missing/invalid translation must never spam the console with errors
 * or crash rendering. It degrades gracefully to a readable fallback instead.
 */
export function onMessageError(error: IntlError): void {
  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    // Missing translations are expected while locales are still being filled in.
    // Keep a quiet dev-only warning; stay silent in production.
    if (process.env.NODE_ENV === "development") {
      console.warn(`[i18n] ${error.message}`);
    }
    return;
  }
  // Real formatting/parse errors are worth surfacing.
  console.error(error);
}

/**
 * Renders a clean, human-readable fallback instead of the raw dotted key
 * (e.g. "messages.statusLabels.out-for-delivery" -> "Out For Delivery").
 */
export function getMessageFallback({
  key,
}: {
  error: IntlError;
  key: string;
  namespace?: string;
}): string {
  const last = key.split(".").pop() || key;
  const words = last
    .replace(/[-_]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .trim();
  if (!words) return key;
  return words
    .split(" ")
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(" ");
}
