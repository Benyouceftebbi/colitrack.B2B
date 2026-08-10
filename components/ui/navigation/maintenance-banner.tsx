"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, X } from "lucide-react"

/* -------------------------------------------------------------------------- */
/*  Toggle the banner from here.                                              */
/*  Set to false (or delete the <MaintenanceBanner /> line in the dashboard   */
/*  layout) once this notice is no longer worth showing.                      */
/* -------------------------------------------------------------------------- */
const SMS_NOTICE_ACTIVE = true

/**
 * Bump this whenever the message changes — a dismissal is stored against this
 * id, so reusing an older one would hide the new notice from everyone who
 * dismissed the previous version.
 */
const NOTICE_ID = "sms-restored-2026-08-10"

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
      className="relative border-b border-emerald-300/70 bg-emerald-50 dark:border-emerald-500/25 dark:bg-emerald-500/10"
    >
      <div className="flex items-start gap-3 px-4 py-3 pr-12 sm:px-6">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-4 w-4" />
        </span>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
            Service SMS rétabli
          </p>
          <p className="mt-0.5 text-sm leading-relaxed text-emerald-800/90 dark:text-emerald-200/80">
            Le service SMS fonctionne à nouveau normalement depuis le 10 août 2026 à 13h00. Nous vous remercions de
            votre patience pendant la résolution de cet incident.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Masquer ce message"
        className="absolute right-3 top-3 rounded-md p-1.5 text-emerald-700/70 transition-colors hover:bg-emerald-500/10 hover:text-emerald-900 dark:text-emerald-300/70 dark:hover:text-emerald-200"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
