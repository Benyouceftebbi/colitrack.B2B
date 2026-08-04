"use client"

import { useCallback, useState } from "react"
import { httpsCallable } from "firebase/functions"
import { functions } from "@/firebase/firebase"
import { useToast } from "@/hooks/use-toast"
import { useWhatsApp } from "../context/whatsapp-provider"

/**
 * Account-level actions. Every one of these is a callable — the permanent
 * access token lives only in the Cloud Function's secret store, so the browser
 * never holds a credential that could message a client's customers.
 */
export function useWhatsAppAccount() {
  const { clientId } = useWhatsApp()
  const { toast } = useToast()
  const [busy, setBusy] = useState<null | "refresh" | "disconnect" | "select" | "register">(null)

  const call = useCallback(
    async (name: string, payload: Record<string, any>) => {
      if (!clientId) throw new Error("No shop selected.")
      const fn = httpsCallable(functions, name)
      const res: any = await fn({ clientId, ...payload })
      if (!res?.data?.success) {
        throw new Error(res?.data?.message || res?.data?.reason || "The request failed.")
      }
      return res.data
    },
    [clientId],
  )

  /** Re-pulls phone numbers, quality rating and messaging tier from Meta. */
  const refresh = useCallback(async () => {
    setBusy("refresh")
    try {
      const data = await call("whatsappRefreshAccount", {})
      toast({ title: "Account refreshed", description: "Phone details and quality ratings are up to date." })
      return data
    } catch (err: any) {
      toast({ title: "Refresh failed", description: err.message, variant: "destructive" })
      return null
    } finally {
      setBusy(null)
    }
  }, [call, toast])

  /**
   * Unsubscribes our app from the WABA webhooks and wipes the stored token.
   * Templates and history stay on Meta's side — reconnecting restores them.
   */
  const disconnect = useCallback(async () => {
    setBusy("disconnect")
    try {
      await call("whatsappDisconnect", {})
      toast({
        title: "WhatsApp disconnected",
        description: "Colitrack can no longer send or receive messages on this number.",
      })
      return true
    } catch (err: any) {
      toast({ title: "Could not disconnect", description: err.message, variant: "destructive" })
      return false
    } finally {
      setBusy(null)
    }
  }, [call, toast])

  /** Chooses which number of the WABA is used for outgoing sends. */
  const selectPhoneNumber = useCallback(
    async (phoneNumberId: string) => {
      setBusy("select")
      try {
        await call("whatsappSetPhoneNumber", { phoneNumberId })
        toast({ title: "Sending number updated" })
        return true
      } catch (err: any) {
        toast({ title: "Could not switch number", description: err.message, variant: "destructive" })
        return false
      } finally {
        setBusy(null)
      }
    },
    [call, toast],
  )

  /** Registers the number on Cloud API with a 6-digit PIN (two-step verification). */
  const registerPhoneNumber = useCallback(
    async (phoneNumberId: string, pin: string) => {
      setBusy("register")
      try {
        await call("whatsappRegisterPhone", { phoneNumberId, pin })
        toast({ title: "Number registered", description: "You can now send messages from this number." })
        return true
      } catch (err: any) {
        toast({ title: "Registration failed", description: err.message, variant: "destructive" })
        return false
      } finally {
        setBusy(null)
      }
    },
    [call, toast],
  )

  return { refresh, disconnect, selectPhoneNumber, registerPhoneNumber, busy }
}
