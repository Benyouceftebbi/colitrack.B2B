"use client"

/**
 * WhatsApp Embedded Signup.
 *
 * The flow has two halves that arrive independently and must be joined:
 *
 *   1. `window.postMessage` from the Meta popup carries WA_EMBEDDED_SIGNUP with
 *      `waba_id` and `phone_number_id`. This is the ONLY place those ids appear.
 *   2. The `FB.login` callback returns a short-lived `code` (60s, single use).
 *
 * Neither is useful alone, and their order is not guaranteed, so we stash the
 * session info in a ref and only call the backend once we hold both. The `code`
 * goes straight to the Cloud Function — it is exchanged for the permanent
 * business token server-side and the token never touches the browser.
 */

import { useCallback, useEffect, useRef, useState } from "react"
import { httpsCallable } from "firebase/functions"
import { functions } from "@/firebase/firebase"
import type { ConnectResult, EmbeddedSignupSessionInfo } from "../types"
import { GRAPH_API_VERSION } from "../lib/constants"

declare global {
  interface Window {
    FB?: any
    fbAsyncInit?: () => void
  }
}

const FB_APP_ID = process.env.NEXT_PUBLIC_META_APP_ID
const FB_CONFIG_ID = process.env.NEXT_PUBLIC_META_CONFIG_ID

/** Origins Meta posts the signup session info from. Anything else is ignored. */
const TRUSTED_ORIGINS = ["https://www.facebook.com", "https://web.facebook.com", "https://business.facebook.com"]

export type SignupPhase = "idle" | "loading-sdk" | "awaiting-user" | "exchanging" | "done" | "error"

interface UseEmbeddedSignupOptions {
  clientId?: string
  onConnected?: (result: ConnectResult) => void
}

let sdkPromise: Promise<void> | null = null

/** Injects the Facebook JS SDK once per page and resolves when FB.init has run. */
function loadFacebookSdk(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve()
  if (window.FB) return Promise.resolve()
  if (sdkPromise) return sdkPromise

  sdkPromise = new Promise<void>((resolve, reject) => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: FB_APP_ID,
        cookie: true,
        xfbml: false,
        version: GRAPH_API_VERSION,
      })
      resolve()
    }

    const script = document.createElement("script")
    script.src = "https://connect.facebook.net/en_US/sdk.js"
    script.async = true
    script.defer = true
    script.crossOrigin = "anonymous"
    script.onerror = () => {
      sdkPromise = null
      reject(new Error("Could not load the Facebook SDK. Check your ad blocker or network."))
    }
    document.body.appendChild(script)
  })

  return sdkPromise
}

export function useEmbeddedSignup({ clientId, onConnected }: UseEmbeddedSignupOptions = {}) {
  const [phase, setPhase] = useState<SignupPhase>("idle")
  const [error, setError] = useState<string | null>(null)
  const [sdkReady, setSdkReady] = useState(false)

  // Halves of the flow, joined in `tryExchange`.
  const sessionInfoRef = useRef<EmbeddedSignupSessionInfo["data"] | null>(null)
  const codeRef = useRef<string | null>(null)
  const exchangedRef = useRef(false)
  const clientIdRef = useRef(clientId)
  const onConnectedRef = useRef(onConnected)

  useEffect(() => {
    clientIdRef.current = clientId
    onConnectedRef.current = onConnected
  }, [clientId, onConnected])

  const reset = useCallback(() => {
    sessionInfoRef.current = null
    codeRef.current = null
    exchangedRef.current = false
    setError(null)
    setPhase("idle")
  }, [])

  const tryExchange = useCallback(async () => {
    if (exchangedRef.current) return
    if (!codeRef.current || !sessionInfoRef.current) return
    if (!clientIdRef.current) {
      setError("No shop selected. Pick a shop first, then connect WhatsApp.")
      setPhase("error")
      return
    }

    exchangedRef.current = true
    setPhase("exchanging")

    try {
      const exchange = httpsCallable(functions, "whatsappExchangeToken")
      const res: any = await exchange({
        clientId: clientIdRef.current,
        code: codeRef.current,
        wabaId: sessionInfoRef.current.waba_id,
        phoneNumberId: sessionInfoRef.current.phone_number_id,
        businessId: sessionInfoRef.current.business_id,
      })

      const data: ConnectResult = res?.data
      if (!data?.success) {
        throw new Error(data?.message || data?.reason || "The connection could not be completed.")
      }

      setPhase("done")
      onConnectedRef.current?.(data)
    } catch (err: any) {
      console.error("[whatsapp] token exchange failed:", err)
      setError(err?.message || "Could not finish connecting your WhatsApp account.")
      setPhase("error")
      exchangedRef.current = false
    } finally {
      codeRef.current = null
    }
  }, [])

  // Listen for the popup's session info for as long as the hub is mounted.
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (!TRUSTED_ORIGINS.includes(event.origin)) return

      let payload: EmbeddedSignupSessionInfo
      try {
        payload = typeof event.data === "string" ? JSON.parse(event.data) : event.data
      } catch {
        return // Meta also posts non-JSON chatter on this channel.
      }
      if (payload?.type !== "WA_EMBEDDED_SIGNUP") return

      if (payload.event === "FINISH" || payload.event === "FINISH_ONLY_WABA") {
        sessionInfoRef.current = payload.data
        void tryExchange()
        return
      }

      if (payload.event === "CANCEL") {
        setError(
          payload.data?.current_step
            ? `You closed the setup at the "${payload.data.current_step}" step. Nothing was saved.`
            : "Setup was cancelled before it finished.",
        )
        setPhase("error")
        return
      }

      if (payload.event === "ERROR") {
        setError(payload.data?.error_message || "Meta reported an error during setup.")
        setPhase("error")
      }
    }

    window.addEventListener("message", handler)
    return () => window.removeEventListener("message", handler)
  }, [tryExchange])

  // Warm the SDK up front so the click that opens the popup is a direct user
  // gesture — browsers block popups opened after an await.
  useEffect(() => {
    let alive = true
    if (!FB_APP_ID || !FB_CONFIG_ID) return

    setPhase((p) => (p === "idle" ? "loading-sdk" : p))
    loadFacebookSdk()
      .then(() => {
        if (!alive) return
        setSdkReady(true)
        setPhase((p) => (p === "loading-sdk" ? "idle" : p))
      })
      .catch((err) => {
        if (!alive) return
        setError(err.message)
        setPhase("error")
      })

    return () => {
      alive = false
    }
  }, [])

  const launch = useCallback(() => {
    if (!FB_APP_ID || !FB_CONFIG_ID) {
      setError("Missing NEXT_PUBLIC_META_APP_ID or NEXT_PUBLIC_META_CONFIG_ID.")
      setPhase("error")
      return
    }
    if (!window.FB) {
      setError("The Facebook SDK has not finished loading yet. Try again in a moment.")
      setPhase("error")
      return
    }

    sessionInfoRef.current = null
    codeRef.current = null
    exchangedRef.current = false
    setError(null)
    setPhase("awaiting-user")

    window.FB.login(
      (response: any) => {
        const code = response?.authResponse?.code
        if (!code) {
          setError("You closed the Facebook window before authorising Colitrack.")
          setPhase("error")
          return
        }
        codeRef.current = code
        void tryExchange()
      },
      {
        config_id: FB_CONFIG_ID,
        // Ask for an auth code instead of a client-side token: the code is
        // exchanged for the permanent token on the server.
        response_type: "code",
        override_default_response_type: true,
        extras: {
          setup: {},
          featureType: "",
          sessionInfoVersion: "3",
        },
      },
    )
  }, [tryExchange])

  return {
    launch,
    reset,
    phase,
    error,
    sdkReady,
    isBusy: phase === "awaiting-user" || phase === "exchanging" || phase === "loading-sdk",
    isConfigured: Boolean(FB_APP_ID && FB_CONFIG_ID),
  }
}
