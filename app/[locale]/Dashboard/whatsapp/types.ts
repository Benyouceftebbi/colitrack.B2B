// Shared types for the WhatsApp Hub.
// Mirrors the shapes written by the Cloud Functions in firebase-functions/whatsapp.

export type WhatsAppQualityRating = "GREEN" | "YELLOW" | "RED" | "UNKNOWN" | "NA"

export type WhatsAppPhoneStatus =
  | "CONNECTED"
  | "DISCONNECTED"
  | "FLAGGED"
  | "MIGRATED"
  | "PENDING"
  | "RESTRICTED"
  | "RATE_LIMITED"
  | "WARNED"
  | "BANNED"
  | "UNKNOWN"

/** A phone number attached to the client's WABA. */
export interface WhatsAppPhoneNumber {
  /** Graph API phone number id — the one used to send messages. */
  id: string
  /** E.164, e.g. "+213 555 00 11 22" as returned by Graph. */
  displayPhoneNumber: string
  /** Business display name shown to recipients (may be empty until approved). */
  verifiedName?: string
  /**
   * Display-name review state, exactly as Graph spells it. Note the values are
   * PENDING_REVIEW and DECLINED — not PENDING/REJECTED.
   */
  nameStatus?:
    | "APPROVED"
    | "AVAILABLE_WITHOUT_REVIEW"
    | "PENDING_REVIEW"
    | "DECLINED"
    | "EXPIRED"
    | "NONE"
  qualityRating?: WhatsAppQualityRating
  /** e.g. "TIER_1K", "TIER_10K", "TIER_100K", "TIER_UNLIMITED". */
  messagingLimitTier?: string
  platformType?: "CLOUD_API" | "ON_PREMISE" | "NOT_APPLICABLE"
  codeVerificationStatus?: string
  status?: WhatsAppPhoneStatus
  /** True once the number has been registered on Cloud API with a PIN. */
  isRegistered?: boolean
  throughputLevel?: string
}

/** The `whatsapp` map stored on Clients/{clientId}. Never contains the access token. */
export interface WhatsAppAccount {
  connected: boolean
  wabaId: string
  businessId?: string
  businessName?: string
  /** Currently selected phone number id (the one used for sending). */
  phoneNumberId: string
  phoneNumbers: WhatsAppPhoneNumber[]
  /** Meta App ID that owns the integration (useful when you rotate apps). */
  appId?: string
  currency?: string
  timezoneId?: string
  /** Whether the app is subscribed to this WABA's webhooks. */
  webhookSubscribed?: boolean
  connectedAt?: Date | null
  lastSyncedAt?: Date | null
  disconnectedAt?: Date | null
  /** Populated when the last token check failed, so the UI can prompt a reconnect. */
  tokenError?: string | null
}

/* -------------------------------------------------------------------------- */
/*                                  Templates                                  */
/* -------------------------------------------------------------------------- */

export type TemplateStatus =
  | "APPROVED"
  | "PENDING"
  | "REJECTED"
  | "PAUSED"
  | "DISABLED"
  | "IN_APPEAL"
  | "PENDING_DELETION"
  | "DELETED"
  | "LIMIT_EXCEEDED"

export type TemplateCategory = "MARKETING" | "UTILITY" | "AUTHENTICATION"

export type TemplateQuality = "GREEN" | "YELLOW" | "RED" | "UNKNOWN"

export type TemplateComponentType = "HEADER" | "BODY" | "FOOTER" | "BUTTONS"

export type TemplateHeaderFormat = "TEXT" | "IMAGE" | "VIDEO" | "DOCUMENT" | "LOCATION"

export interface TemplateButton {
  type: "QUICK_REPLY" | "URL" | "PHONE_NUMBER" | "COPY_CODE"
  text: string
  url?: string
  phone_number?: string
  example?: string[]
}

export interface TemplateComponent {
  type: TemplateComponentType
  format?: TemplateHeaderFormat
  text?: string
  buttons?: TemplateButton[]
  example?: {
    header_text?: string[]
    body_text?: string[][]
    header_handle?: string[]
  }
}

export interface WhatsAppTemplate {
  id: string
  name: string
  language: string
  status: TemplateStatus
  category: TemplateCategory
  /** Present on rejected templates. */
  rejectedReason?: string
  quality?: TemplateQuality
  components: TemplateComponent[]
  /** ms epoch — Graph does not return this, so we fall back to our Firestore mirror. */
  createdAt?: Date | null
  updatedAt?: Date | null
}

/** Payload accepted by whatsappCreateTemplate / whatsappUpdateTemplate. */
export interface TemplateDraft {
  name: string
  language: string
  category: TemplateCategory
  components: TemplateComponent[]
}

/* -------------------------------------------------------------------------- */
/*                                   Messages                                  */
/* -------------------------------------------------------------------------- */

/**
 * Delivery lifecycle. `read` implies delivered, `delivered` implies sent.
 * `failed` is terminal and carries an error code.
 */
export type WhatsAppMessageStatus = "queued" | "sent" | "delivered" | "read" | "failed" | "deleted"

export type WhatsAppMessageDirection = "outbound" | "inbound"

export interface WhatsAppMessageError {
  code?: number
  title?: string
  message?: string
  details?: string
}

export interface WhatsAppMessage {
  /** Firestore doc id — we use the Meta wamid so status updates are idempotent. */
  id: string
  wamid?: string
  direction: WhatsAppMessageDirection
  /** Recipient (outbound) or sender (inbound), digits only. */
  phoneNumber: string
  /** Our phone number id that sent/received it. */
  phoneNumberId?: string
  contactName?: string
  status: WhatsAppMessageStatus
  /** "template" | "text" | "image" | ... */
  type?: string
  templateName?: string
  templateLanguage?: string
  /** Rendered body text for display in the table. */
  content?: string
  campaignId?: string
  /** True when sent from the "Send test" button rather than to a real customer. */
  isTest?: boolean
  /** "template-test" | "campaign" | "api" */
  source?: string
  /** Auth email of whoever triggered the send. */
  sentByEmail?: string | null
  /** The values substituted into the template, kept for diagnosing failures. */
  parameters?: { header?: string[]; body?: string[]; button?: string[] }
  /** Set on inbound messages when the customer used WhatsApp's reply action. */
  replyToWamid?: string | null
  conversationId?: string
  /** Meta pricing category for the conversation. */
  conversationCategory?: string
  billable?: boolean
  pricingModel?: string
  error?: WhatsAppMessageError | null
  createdAt: Date | null
  sentAt?: Date | null
  deliveredAt?: Date | null
  readAt?: Date | null
  failedAt?: Date | null
}

/* -------------------------------------------------------------------------- */
/*                                  Campaigns                                  */
/* -------------------------------------------------------------------------- */

export type CampaignStatus =
  /** Being built, nothing sent. */
  | "draft"
  /** Handed to the backend, sending in progress. */
  | "sending"
  /** Every recipient was accepted by Meta. */
  | "sent"
  /** Finished, but some recipients were rejected at send time. */
  | "partial"
  /** Nothing went out — usually a bad template or a billing problem. */
  | "failed"

export interface WhatsAppCampaign {
  id: string
  name: string
  templateName: string
  templateLanguage: string
  status: CampaignStatus
  /** Rows that passed validation and were actually attempted. */
  recipientCount: number
  /** Accepted by Meta at send time. Delivery is tracked per message. */
  acceptedCount: number
  /** Rejected by Meta at send time (bad number, template error, no credit). */
  rejectedCount: number
  createdAt: Date | null
  sentAt: Date | null
  completedAt: Date | null
  createdByEmail?: string | null
  /**
   * wamids of the messages this campaign produced. Capped — the authoritative
   * way to read a campaign's messages is a `campaignId` query, which has no
   * size limit. This array is for quick reference and audit.
   */
  messageIds?: string[]
  /** Set when the whole campaign failed rather than individual recipients. */
  error?: string | null
}

/** One spreadsheet row turned into something sendable. */
export interface AudienceRow {
  /** 1-based row number in the uploaded file, for pointing at bad data. */
  rowNumber: number
  /** Digits only, ready for the API. */
  phone: string
  /** Exactly what the spreadsheet cell held. */
  rawPhone: string
  valid: boolean
  issue?: string
  /** Body variable values, in {{1}}..{{n}} order. */
  bodyParams: string[]
  headerParams: string[]
  buttonParams: string[]
}

/** Which spreadsheet column feeds which part of the template. */
export interface ColumnMapping {
  /** Header name of the column holding phone numbers. */
  phoneColumn: string
  /** headerColumns[i] feeds the header's {{i+1}}. */
  headerColumns: string[]
  /** bodyColumns[i] feeds the body's {{i+1}}. */
  bodyColumns: string[]
  /** buttonColumns[i] feeds the i-th dynamic-URL button. */
  buttonColumns: string[]
}

/* -------------------------------------------------------------------------- */
/*                                  Analytics                                  */
/* -------------------------------------------------------------------------- */

export interface WhatsAppAnalytics {
  total: number
  sent: number
  delivered: number
  read: number
  failed: number
  queued: number
  /** delivered+read over sent, as a 0-100 number. */
  deliveryRate: number
  /** read over delivered, as a 0-100 number. */
  readRate: number
  failureRate: number
  /** Messages that left but never reported delivered. */
  undelivered: number
}

export interface WhatsAppTimeseriesPoint {
  date: string
  sent: number
  delivered: number
  read: number
  failed: number
}

/* -------------------------------------------------------------------------- */
/*                            Embedded Signup plumbing                         */
/* -------------------------------------------------------------------------- */

/** Payload Meta posts to the opener during Embedded Signup. */
export interface EmbeddedSignupSessionInfo {
  type: "WA_EMBEDDED_SIGNUP"
  event: "FINISH" | "CANCEL" | "ERROR" | "FINISH_ONLY_WABA" | "FINISH_WHATSAPP_BUSINESS_APP_ONBOARDING"
  data: {
    phone_number_id?: string
    waba_id?: string
    business_id?: string
    current_step?: string
    error_message?: string
  }
}

export interface ConnectResult {
  success: boolean
  account?: WhatsAppAccount
  reason?: string
  message?: string
}
