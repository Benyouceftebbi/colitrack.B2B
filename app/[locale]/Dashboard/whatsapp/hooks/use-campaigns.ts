"use client"

import { useCallback, useEffect, useState } from "react"
import { collection, doc, limit, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { httpsCallable } from "firebase/functions"
import { db, functions } from "@/firebase/firebase"
import { useToast } from "@/hooks/use-toast"
import { useWhatsApp } from "../context/whatsapp-provider"
import type { AudienceRow, WhatsAppCampaign, WhatsAppMessage } from "../types"

const toDate = (value: any): Date | null => {
  if (!value) return null
  if (typeof value?.toDate === "function") return value.toDate()
  if (value instanceof Date) return value
  if (typeof value?.seconds === "number") return new Date(value.seconds * 1000)
  return null
}

const mapCampaign = (id: string, raw: any): WhatsAppCampaign => ({
  id,
  name: raw.name ?? "Untitled campaign",
  templateName: raw.templateName ?? "",
  templateLanguage: raw.templateLanguage ?? "",
  status: raw.status ?? "draft",
  recipientCount: raw.recipientCount ?? 0,
  acceptedCount: raw.acceptedCount ?? 0,
  rejectedCount: raw.rejectedCount ?? 0,
  createdAt: toDate(raw.createdAt),
  sentAt: toDate(raw.sentAt),
  completedAt: toDate(raw.completedAt),
  createdByEmail: raw.createdByEmail ?? null,
  messageIds: raw.messageIds ?? [],
  error: raw.error ?? null,
})

/** All campaigns for the current shop, newest first, live. */
export function useCampaigns() {
  const { clientId } = useWhatsApp()
  const [campaigns, setCampaigns] = useState<WhatsAppCampaign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!clientId) {
      setCampaigns([])
      setLoading(false)
      return
    }

    setLoading(true)
    const qRef = query(
      collection(db, "Clients", clientId, "WhatsAppCampaigns"),
      orderBy("createdAt", "desc"),
      limit(200),
    )

    const unsub = onSnapshot(
      qRef,
      (snap) => {
        setCampaigns(snap.docs.map((d) => mapCampaign(d.id, d.data())))
        setLoading(false)
      },
      (err) => {
        console.error("[whatsapp] campaigns listener failed:", err)
        setError(err.message)
        setLoading(false)
      },
    )

    return () => unsub()
  }, [clientId])

  return { campaigns, loading, error }
}

/**
 * One campaign plus every message it produced.
 *
 * Messages are read with a `campaignId` query rather than from the campaign's
 * `messageIds` array — the array is capped and Firestore's `in` operator tops
 * out at 30 values, so it cannot answer this for a real campaign.
 */
export function useCampaign(campaignId?: string) {
  const { clientId } = useWhatsApp()
  const [campaign, setCampaign] = useState<WhatsAppCampaign | null>(null)
  const [messages, setMessages] = useState<WhatsAppMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [messagesLoading, setMessagesLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!clientId || !campaignId) {
      setCampaign(null)
      setLoading(false)
      return
    }

    const unsub = onSnapshot(
      doc(db, "Clients", clientId, "WhatsAppCampaigns", campaignId),
      (snap) => {
        setCampaign(snap.exists() ? mapCampaign(snap.id, snap.data()) : null)
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      },
    )

    return () => unsub()
  }, [clientId, campaignId])

  useEffect(() => {
    if (!clientId || !campaignId) {
      setMessages([])
      setMessagesLoading(false)
      return
    }

    setMessagesLoading(true)
    const qRef = query(
      collection(db, "Clients", clientId, "WhatsAppMessages"),
      where("campaignId", "==", campaignId),
      limit(5000),
    )

    const unsub = onSnapshot(
      qRef,
      (snap) => {
        setMessages(
          snap.docs.map((d) => {
            const raw = d.data()
            return {
              id: d.id,
              wamid: raw.wamid,
              direction: raw.direction ?? "outbound",
              phoneNumber: raw.phoneNumber ?? "",
              contactName: raw.contactName,
              status: raw.status ?? "queued",
              type: raw.type,
              templateName: raw.templateName,
              templateLanguage: raw.templateLanguage,
              content: raw.content ?? "",
              campaignId: raw.campaignId,
              error: raw.error ?? null,
              createdAt: toDate(raw.createdAt),
              sentAt: toDate(raw.sentAt),
              deliveredAt: toDate(raw.deliveredAt),
              readAt: toDate(raw.readAt),
              failedAt: toDate(raw.failedAt),
            } as WhatsAppMessage
          }),
        )
        setMessagesLoading(false)
      },
      (err) => {
        // A missing composite index is the usual cause; the console link is in
        // the message.
        console.error("[whatsapp] campaign messages listener failed:", err)
        setError(err.message)
        setMessagesLoading(false)
      },
    )

    return () => unsub()
  }, [clientId, campaignId])

  return { campaign, messages, loading, messagesLoading, error }
}

export interface LaunchArgs {
  name: string
  templateName: string
  templateLanguage: string
  bodyText: string
  recipients: AudienceRow[]
}

/** Hands a built audience to the backend, which does the actual sending. */
export function useLaunchCampaign() {
  const { clientId } = useWhatsApp()
  const { toast } = useToast()
  const [launching, setLaunching] = useState(false)
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null)

  const launch = useCallback(
    async (args: LaunchArgs) => {
      if (!clientId) {
        toast({ title: "No shop selected", variant: "destructive" })
        return null
      }

      setLaunching(true)
      setProgress({ done: 0, total: args.recipients.length })

      try {
        const fn = httpsCallable(functions, "whatsappSendCampaign")
        const res: any = await fn({
          clientId,
          name: args.name,
          templateName: args.templateName,
          templateLanguage: args.templateLanguage,
          bodyText: args.bodyText,
          recipients: args.recipients.map((r) => ({
            phone: r.phone,
            bodyParams: r.bodyParams,
            headerParams: r.headerParams,
            buttonParams: r.buttonParams,
          })),
        })

        if (!res?.data?.success) {
          throw new Error(res?.data?.message || "The campaign could not be sent.")
        }

        toast({
          title: "Campaign sent",
          description: `${res.data.accepted} of ${args.recipients.length} messages accepted by Meta.`,
        })
        return res.data as { success: true; campaignId: string; accepted: number; rejected: number }
      } catch (err: any) {
        toast({ title: "Campaign failed", description: err?.message, variant: "destructive" })
        return null
      } finally {
        setLaunching(false)
        setProgress(null)
      }
    },
    [clientId, toast],
  )

  return { launch, launching, progress }
}
