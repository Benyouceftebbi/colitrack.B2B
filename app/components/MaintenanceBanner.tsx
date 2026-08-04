"use client";

import { useLocale } from "next-intl";
import { AlertTriangle } from "lucide-react";

// Toggle by setting NEXT_PUBLIC_MAINTENANCE=true in the environment
// (e.g. .env.local) and restarting/redeploying. Set to anything else / remove
// it to hide the banner.
const MESSAGES: Record<string, string> = {
  en: "We're currently performing scheduled maintenance. Some features may be temporarily unavailable.",
  fr: "Nous effectuons actuellement une maintenance planifiée. Certaines fonctionnalités peuvent être temporairement indisponibles.",
  ar: "نقوم حاليًا بإجراء صيانة مجدولة. قد تكون بعض الميزات غير متاحة مؤقتًا.",
};

export default function MaintenanceBanner() {
  const locale = useLocale();

  if (process.env.NEXT_PUBLIC_MAINTENANCE !== "true") return null;

  const text = MESSAGES[locale] ?? MESSAGES.en;

  return (
    <div
      role="status"
      aria-live="polite"
      className="sticky top-0 z-[100] flex w-full items-center justify-center gap-2 bg-amber-500 px-4 py-2 text-center text-sm font-medium text-amber-950 shadow-sm dark:bg-amber-600 dark:text-amber-50"
    >
      <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{text}</span>
    </div>
  );
}
