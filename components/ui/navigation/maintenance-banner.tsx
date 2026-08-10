"use client"

import { useEffect, useState } from "react"
import { AlertTriangle, X } from "lucide-react"

/* -------------------------------------------------------------------------- */
/*  Toggle the banner from here.                                              */
/*  Set to false (or delete the <MaintenanceBanner /> line in the dashboard   */
/*  layout) once the SMS service is back to normal.                           */
/* -------------------------------------------------------------------------- */
const SMS_NOTICE_ACTIVE = true

/**
 * Bump this whenever the message changes — a dismissal is stored against this
 * id, so reusing an older one would hide the new notice from everyone who
 * dismissed the previous version.
 */
const NOTICE_ID = "sms-maintenance-2026-08-06"

export function MaintenanceBanner() {
  // Rendered only after mount: reading sessionStorage during SSR would make the
  // server and client markup disagree.
  const [mounted, setMounted] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      setDismissed(sessionStorage.getItem(NOTICE_ID) === "1")
    } catch {
      // Private browsing can block sessionStorage — showing the notice is the
      // safe fallback.
    }
  }, [])

  const dismiss = () => {
    setDismissed(true)
    try {
      sessionStorage.setItem(NOTICE_ID, "1")
    } catch {
      /* ignore */
    }
  }

  if (!SMS_NOTICE_ACTIVE || !mounted || dismissed) return null

  return (
    <div
      role="status"
      className="relative border-b border-amber-300/70 bg-amber-50 dark:border-amber-500/25 dark:bg-amber-500/10"
    >
      <div className="flex items-start gap-3 px-4 py-3 pr-12 sm:px-6">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
          <AlertTriangle className="h-4 w-4" />
        </span>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
            Perturbations du service SMS
          </p>
          <p className="mt-0.5 text-sm leading-relaxed text-amber-800/90 dark:text-amber-200/80">
            Nous avons connaissance des difficultés rencontrées sur l&apos;envoi des SMS, dues à un volume
            d&apos;utilisation exceptionnellement élevé. Nos équipes sont pleinement mobilisées pour rétablir le service
            dans les plus brefs délais. Merci de votre compréhension.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Masquer ce message"
        className="absolute right-3 top-3 rounded-md p-1.5 text-amber-700/70 transition-colors hover:bg-amber-500/10 hover:text-amber-900 dark:text-amber-300/70 dark:hover:text-amber-200"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
