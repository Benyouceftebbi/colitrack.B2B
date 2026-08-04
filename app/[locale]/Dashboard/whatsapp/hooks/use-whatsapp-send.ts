"use client"

import { useCallback, useState } from "react"
import { httpsCallable } from "firebase/functions"
import { functions } from "@/firebase/firebase"
import { useToast } from "@/hooks/use-toast"
import { useWhatsApp } from "../context/whatsapp-provider"

export interface SendTemplateArgs {
  to: string
  templateName: string
  templateLanguage: string
  bodyParameters?: string[]
  headerParameters?: string[]
  buttonParameters?: { subType: string; text: string; index: number }[]
  bodyText?: string
  contactName?: string | null
  /** Flags the row in history as a test rather than a customer send. */
  isTest?: boolean
}

/**
 * Sending goes through the callable, never the Graph API directly — the access
 * token stays server-side. The function writes the Firestore row itself, so
 * every send (test included) shows up in Messages with full traceability.
 */
export function useWhatsAppSend() {
  const { clientId } = useWhatsApp()
  const { toast } = useToast()
  const [sending, setSending] = useState(false)

  const sendTemplate = useCallback(
    async (args: SendTemplateArgs) => {
      if (!clientId) {
        toast({ title: "No shop selected", variant: "destructive" })
        return null
      }

      setSending(true)
      try {
        const fn = httpsCallable(functions, "whatsappSendTemplate")
        const res: any = await fn({ clientId, ...args })

        if (!res?.data?.success) {
          throw new Error(res?.data?.message || res?.data?.reason || "The message could not be sent.")
        }

        toast({
          title: args.isTest ? "Test message sent" : "Message sent",
          description: `Delivered to Meta. Track its status in Messages.`,
        })
        return res.data as { success: true; wamid: string }
      } catch (error: any) {
        // Callable errors surface Meta's own text, which is the useful part.
        const message = error?.message || "The message could not be sent."
        toast({ title: "Send failed", description: message, variant: "destructive" })
        return null
      } finally {
        setSending(false)
      }
    },
    [clientId, toast],
  )

  return { sendTemplate, sending }
}
