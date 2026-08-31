import type { WhatsAppMessage } from "../types"
import { normalisePhone } from "./phone"

/**
 * Templates that announce a parcel is ready for collection.
 *
 * Any client wanting the pickup panel simply names their template `order_ready`
 * — that is the whole contract. The template must carry two variables:
 *
 *   {{1}}  station name          e.g. "Blida"
 *   {{2}}  station phone number  e.g. "0561041724"
 */
export const ORDER_READY_TEMPLATE = "order_ready"

/** Used only when a template predates the {{2}} variable and has no phone. */
const FALLBACK_STATION_PHONE = "0561041724"

/** How far back to look for the template a reply belongs to. */
const REPLY_WINDOW_MS = 30 * 24 * 60 * 60 * 1000

export interface PickupContext {
  station: string
  /** Digits only, ready for a wa.me link. */
  stationPhone: string
  /** As written in the template, for display. */
  stationPhoneRaw: string
  mapsUrl?: string
  /** The order_ready message this reply is answering. */
  sourceMessage: WhatsAppMessage
  /** True when WhatsApp itself linked the reply, rather than us inferring it. */
  linkedByReply: boolean
}

const firstUrl = (text?: string) => text?.match(/https?:\/\/\S+/)?.[0]

/** Station name from the rendered text, for templates without variables. */
const stationFromContent = (text?: string) =>
  text?.match(/station\s+([^,\n.]+)/i)?.[1]?.trim()

/**
 * Given a client's inbound message, finds the order_ready template it is
 * answering — and pulls the station details out of it.
 *
 * Two ways a reply gets matched, in order of confidence:
 *
 *   1. WhatsApp's own reply context. When the customer uses "reply" in the app,
 *      the webhook stores `replyToWamid`, which points at the exact message.
 *   2. Otherwise, the most recent order_ready we sent that number before this
 *      message arrived. Customers usually just type rather than formally reply,
 *      so this is the common path.
 */
export function findPickupContext(
  message: WhatsAppMessage | null,
  allMessages: WhatsAppMessage[],
): PickupContext | null {
  if (!message || message.direction !== "inbound") return null

  let source: WhatsAppMessage | undefined
  let linkedByReply = false

  if (message.replyToWamid) {
    source = allMessages.find((m) => m.wamid === message.replyToWamid || m.id === message.replyToWamid)
    if (source) linkedByReply = true
  }

  if (!source) {
    const arrivedAt = message.createdAt?.getTime() ?? Date.now()

    source = allMessages
      .filter(
        (m) =>
          m.direction !== "inbound" &&
          m.templateName === ORDER_READY_TEMPLATE &&
          m.phoneNumber === message.phoneNumber &&
          m.createdAt !== null &&
          m.createdAt.getTime() <= arrivedAt &&
          arrivedAt - m.createdAt.getTime() < REPLY_WINDOW_MS,
      )
      // Nearest preceding send wins: a customer who got two notices is
      // answering the latest one.
      .sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0))[0]
  }

  if (!source || source.templateName !== ORDER_READY_TEMPLATE) return null

  // The values actually sent are authoritative; the rendered text is a fallback
  // for messages stored before parameters were recorded.
  const params = source.parameters?.body ?? []
  const station = params[0]?.trim() || stationFromContent(source.content) || "Unknown station"
  const stationPhoneRaw = params[1]?.trim() || FALLBACK_STATION_PHONE
  const normalised = normalisePhone(stationPhoneRaw)

  return {
    station,
    stationPhone: normalised.value ?? "",
    stationPhoneRaw,
    mapsUrl: firstUrl(source.content),
    sourceMessage: source,
    linkedByReply,
  }
}

/**
 * Deep link that opens WhatsApp with the station and a pre-written handover
 * note. Works on web and desktop; on mobile it opens the app.
 */
export function buildStationHandoverLink(context: PickupContext, reply: WhatsAppMessage): string | null {
  if (!context.stationPhone) return null

  const customer = reply.phoneNumber ? `+${reply.phoneNumber}` : "un client"
  const answer = (reply.content || "").trim()

  const text =
    `Bonjour, le client ${customer} a répondu au sujet de son colis prêt au retrait ` +
    `(Station ${context.station}).\n\n` +
    `Sa réponse : « ${answer || "(message vide)"} »`

  return `https://wa.me/${context.stationPhone}?text=${encodeURIComponent(text)}`
}
