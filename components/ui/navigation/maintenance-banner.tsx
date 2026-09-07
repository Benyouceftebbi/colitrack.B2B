"use client"

import { useEffect, useState } from "react"
import { Clock, X } from "lucide-react"

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
const NOTICE_ID = "sms-mobilis-delay-2026-09-07"

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
          <Clock className="h-4 w-4" />
        </span>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
            Retards sur les SMS Mobilis
          </p>
          <p className="mt-0.5 text-sm leading-relaxed text-amber-800/90 dark:text-amber-200/80">
            Les SMS destinés aux numéros Mobilis peuvent mettre plus de temps que d&apos;habitude à être reçus, en
            raison d&apos;une maintenance en cours chez l&apos;opérateur. Vos messages sont bien envoyés et seront
            distribués. Les autres opérateurs ne sont pas concernés.
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
