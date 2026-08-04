"use client"

/**
 * Feature-scoped provider for the WhatsApp Hub.
 *
 * Account state and messages come from Firestore in realtime — the webhook
 * Cloud Function writes status transitions there, so a message flips from
 * sent -> delivered -> read in the table without a refresh.
 *
 * Templates deliberately do NOT live here: they are read live from the Graph
 * API (see use-whatsapp-templates), because template status and quality change
 * on Meta's side and we want the authoritative value at page load.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { collection, doc, limit, onSnapshot, orderBy, query, Timestamp, where } from "firebase/firestore"
import type { DateRange } from "react-day-picker"
import { db } from "@/firebase/firebase"
import { useShop } from "@/app/context/ShopContext"
import type { WhatsAppAccount, WhatsAppMessage, WhatsAppPhoneNumber } from "../types"

const MESSAGE_PAGE_LIMIT = 2000

const toDate = (value: any): Date | null => {
  if (!value) return null
  if (typeof value?.toDate === "function") return value.toDate()
  if (value instanceof Date) return value
  if (typeof value?.seconds === "number") return new Date(value.seconds * 1000)
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

const startOfDay = (d: Date) => {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

/** End of range is exclusive at 00:00 of the day after `to`, so `to` is included. */
const endOfRangeExclusive = (d: Date) => {
  const x = startOfDay(d)
  x.setDate(x.getDate() + 1)
  return x
}

interface WhatsAppContextValue {
  clientId?: string
  account: WhatsAppAccount | null
  activePhone: WhatsAppPhoneNumber | null
  isConnected: boolean
  accountLoading: boolean
  messages: WhatsAppMessage[]
  messagesLoading: boolean
  error: string | null
  dateRange: DateRange | undefined
  setDateRange: (range: DateRange | undefined) => void
  /** Switch which of the WABA's numbers the hub is looking at. */
  activePhoneId: string | null
  setActivePhoneId: (id: string) => void
}

const WhatsAppContext = createContext<WhatsAppContextValue | undefined>(undefined)

export function WhatsAppProvider({ children }: { children: ReactNode }) {
  const { shopData } = useShop()
  const clientId = shopData?.id

  const [account, setAccount] = useState<WhatsAppAccount | null>(null)
  const [accountLoading, setAccountLoading] = useState(true)
  const [messages, setMessages] = useState<WhatsAppMessage[]>([])
  const [messagesLoading, setMessagesLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activePhoneId, setActivePhoneId] = useState<string | null>(null)

  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    const to = new Date()
    const from = new Date()
    from.setDate(from.getDate() - 29)
    return { from: startOfDay(from), to: startOfDay(to) }
  })

  /* ------------------------------- account ------------------------------- */
  useEffect(() => {
    if (!clientId) {
      setAccount(null)
      setAccountLoading(false)
      return
    }

    setAccountLoading(true)
    const unsub = onSnapshot(
      doc(db, "Clients", clientId),
      (snap) => {
        const raw = snap.data()?.whatsapp
        if (!raw || !raw.connected) {
          setAccount(null)
          setAccountLoading(false)
          return
        }

        const next: WhatsAppAccount = {
          connected: true,
          wabaId: raw.wabaId,
          businessId: raw.businessId,
          businessName: raw.businessName,
          phoneNumberId: raw.phoneNumberId,
          appId: raw.appId,
          currency: raw.currency,
          timezoneId: raw.timezoneId,
          webhookSubscribed: raw.webhookSubscribed ?? false,
          tokenError: raw.tokenError ?? null,
          connectedAt: toDate(raw.connectedAt),
          lastSyncedAt: toDate(raw.lastSyncedAt),
          disconnectedAt: toDate(raw.disconnectedAt),
          phoneNumbers: (raw.phoneNumbers || []).map(
            (p: any): WhatsAppPhoneNumber => ({
              id: p.id,
              displayPhoneNumber: p.displayPhoneNumber ?? p.display_phone_number ?? "",
              verifiedName: p.verifiedName ?? p.verified_name ?? "",
              nameStatus: p.nameStatus ?? p.name_status,
              qualityRating: p.qualityRating ?? p.quality_rating ?? "UNKNOWN",
              messagingLimitTier: p.messagingLimitTier ?? p.messaging_limit_tier,
              platformType: p.platformType ?? p.platform_type,
              codeVerificationStatus: p.codeVerificationStatus ?? p.code_verification_status,
              status: p.status ?? "UNKNOWN",
              isRegistered: p.isRegistered ?? false,
              throughputLevel: p.throughputLevel ?? p.throughput?.level,
            }),
          ),
        }

        setAccount(next)
        setActivePhoneId((current) => {
          if (current && next.phoneNumbers.some((p) => p.id === current)) return current
          return next.phoneNumberId || next.phoneNumbers[0]?.id || null
        })
        setAccountLoading(false)
      },
      (err) => {
        console.error("[whatsapp] account listener failed:", err)
        setError("Could not read your WhatsApp connection.")
        setAccountLoading(false)
      },
    )

    return () => unsub()
  }, [clientId])

  /* ------------------------------- messages ------------------------------ */
  useEffect(() => {
    if (!clientId || !account?.connected) {
      setMessages([])
      setMessagesLoading(false)
      return
    }

    setMessagesLoading(true)

    const base = collection(db, "Clients", clientId, "WhatsAppMessages")
    const from = dateRange?.from ? startOfDay(dateRange.from) : null
    const to = dateRange?.to ? endOfRangeExclusive(dateRange.to) : null

    const qRef =
      from && to
        ? query(
            base,
            where("createdAt", ">=", Timestamp.fromDate(from)),
            where("createdAt", "<", Timestamp.fromDate(to)),
            orderBy("createdAt", "desc"),
            limit(MESSAGE_PAGE_LIMIT),
          )
        : query(base, orderBy("createdAt", "desc"), limit(MESSAGE_PAGE_LIMIT))

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
              phoneNumber: raw.phoneNumber ?? raw.to ?? raw.from ?? "",
              phoneNumberId: raw.phoneNumberId,
              contactName: raw.contactName,
              status: raw.status ?? "queued",
              type: raw.type,
              templateName: raw.templateName,
              templateLanguage: raw.templateLanguage,
              content: raw.content ?? raw.body ?? "",
              campaignId: raw.campaignId,
              isTest: raw.isTest ?? false,
              source: raw.source,
              sentByEmail: raw.sentByEmail ?? null,
              parameters: raw.parameters,
              conversationId: raw.conversationId,
              conversationCategory: raw.conversationCategory,
              billable: raw.billable,
              pricingModel: raw.pricingModel,
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
        console.error("[whatsapp] messages listener failed:", err)
        // A missing composite index is the usual cause here — the console link
        // is in the error message.
        setError(err?.message ?? "Could not load WhatsApp messages.")
        setMessagesLoading(false)
      },
    )

    return () => unsub()
  }, [clientId, account?.connected, dateRange?.from?.getTime(), dateRange?.to?.getTime()])

  const activePhone = useMemo(
    () => account?.phoneNumbers.find((p) => p.id === activePhoneId) ?? account?.phoneNumbers[0] ?? null,
    [account, activePhoneId],
  )

  const handleSetDateRange = useCallback((range: DateRange | undefined) => setDateRange(range), [])

  const value: WhatsAppContextValue = {
    clientId,
    account,
    activePhone,
    isConnected: Boolean(account?.connected),
    accountLoading,
    messages,
    messagesLoading,
    error,
    dateRange,
    setDateRange: handleSetDateRange,
    activePhoneId,
    setActivePhoneId,
  }

  return <WhatsAppContext.Provider value={value}>{children}</WhatsAppContext.Provider>
}

export function useWhatsApp() {
  const ctx = useContext(WhatsAppContext)
  if (!ctx) throw new Error("useWhatsApp must be used within a WhatsAppProvider")
  return ctx
}
