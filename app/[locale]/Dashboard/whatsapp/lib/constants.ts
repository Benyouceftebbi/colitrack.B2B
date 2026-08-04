import type {
  TemplateCategory,
  TemplateStatus,
  WhatsAppMessageStatus,
  WhatsAppQualityRating,
} from "../types"

/** Graph API version used by the frontend SDK. Keep in sync with the Cloud Functions. */
export const GRAPH_API_VERSION = "v21.0"

/** Languages Meta accepts for templates, trimmed to the ones this market uses. */
export const TEMPLATE_LANGUAGES = [
  { value: "ar", label: "العربية (ar)" },
  { value: "fr", label: "Français (fr)" },
  { value: "en", label: "English (en)" },
  { value: "en_US", label: "English US (en_US)" },
  { value: "en_GB", label: "English UK (en_GB)" },
  { value: "es", label: "Español (es)" },
] as const

export const TEMPLATE_CATEGORIES: { value: TemplateCategory; label: string; hint: string }[] = [
  {
    value: "MARKETING",
    label: "Marketing",
    hint: "Promotions, offers, product announcements. Requires an opt-in and can be blocked by the user.",
  },
  {
    value: "UTILITY",
    label: "Utility",
    hint: "Order updates, delivery notices, receipts. Tied to a transaction the customer already made.",
  },
  {
    value: "AUTHENTICATION",
    label: "Authentication",
    hint: "One-time passwords and account verification codes only.",
  },
]

/* ------------------------------- status maps ------------------------------ */

type Tone = "success" | "warning" | "danger" | "info" | "muted"

const TONE_CLASSES: Record<Tone, string> = {
  success:
    "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/25",
  warning:
    "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/25",
  danger:
    "bg-red-100 text-red-700 border-red-200 dark:bg-red-500/15 dark:text-red-400 dark:border-red-500/25",
  info: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/15 dark:text-blue-400 dark:border-blue-500/25",
  muted:
    "bg-muted text-muted-foreground border-border dark:bg-muted/40",
}

export const toneClass = (tone: Tone) => TONE_CLASSES[tone]

export const MESSAGE_STATUS_META: Record<
  WhatsAppMessageStatus,
  { label: string; tone: Tone; description: string }
> = {
  queued: { label: "Queued", tone: "muted", description: "Accepted by Colitrack, not yet handed to Meta." },
  sent: { label: "Sent", tone: "info", description: "Delivered to Meta, one tick. Not yet on the handset." },
  delivered: { label: "Delivered", tone: "success", description: "Two ticks — it reached the recipient's device." },
  read: { label: "Read", tone: "success", description: "Blue ticks — the recipient opened it." },
  failed: { label: "Failed", tone: "danger", description: "Meta rejected it or the handset never accepted it." },
  deleted: { label: "Deleted", tone: "muted", description: "Deleted by the sender." },
}

export const MESSAGE_STATUS_OPTIONS: { value: WhatsAppMessageStatus | "all"; label: string }[] = [
  { value: "all", label: "All statuses" },
  { value: "read", label: "Read" },
  { value: "delivered", label: "Delivered" },
  { value: "sent", label: "Sent (not delivered)" },
  { value: "failed", label: "Failed" },
  { value: "queued", label: "Queued" },
]

export const TEMPLATE_STATUS_META: Record<TemplateStatus, { label: string; tone: Tone; description: string }> = {
  APPROVED: { label: "Approved", tone: "success", description: "Live — you can send it." },
  PENDING: { label: "Pending", tone: "warning", description: "Under review by Meta, usually under 24h." },
  REJECTED: { label: "Rejected", tone: "danger", description: "Meta refused it. Check the reason and resubmit." },
  PAUSED: { label: "Paused", tone: "warning", description: "Paused for poor quality. It will resume automatically." },
  DISABLED: { label: "Disabled", tone: "danger", description: "Permanently disabled after repeated low quality." },
  IN_APPEAL: { label: "In appeal", tone: "info", description: "You appealed the rejection; awaiting Meta." },
  PENDING_DELETION: { label: "Deleting", tone: "muted", description: "Deletion in progress." },
  DELETED: { label: "Deleted", tone: "muted", description: "Removed from your WABA." },
  LIMIT_EXCEEDED: { label: "Limit exceeded", tone: "danger", description: "You hit the template limit for this WABA." },
}

export const TEMPLATE_STATUS_OPTIONS: { value: TemplateStatus | "all"; label: string }[] = [
  { value: "all", label: "All statuses" },
  { value: "APPROVED", label: "Approved" },
  { value: "PENDING", label: "Pending" },
  { value: "REJECTED", label: "Rejected" },
  { value: "PAUSED", label: "Paused" },
  { value: "DISABLED", label: "Disabled" },
]

export const QUALITY_META: Record<WhatsAppQualityRating, { label: string; tone: Tone; description: string }> = {
  GREEN: { label: "High", tone: "success", description: "Healthy. No restrictions." },
  YELLOW: { label: "Medium", tone: "warning", description: "Some users blocked or reported you. Watch your sends." },
  RED: { label: "Low", tone: "danger", description: "At risk of being flagged. Reduce volume and improve relevance." },
  UNKNOWN: { label: "Unknown", tone: "muted", description: "Not enough recent volume to rate." },
  NA: { label: "N/A", tone: "muted", description: "Not applicable for this number." },
}

/**
 * What each display-name review state means for the client. Graph spells these
 * PENDING_REVIEW / DECLINED — not PENDING / REJECTED, which is easy to get
 * wrong and produces a caption that contradicts the name shown above it.
 */
export const NAME_STATUS_HINTS: Record<string, string> = {
  APPROVED: "Approved — this is the name recipients see.",
  AVAILABLE_WITHOUT_REVIEW:
    "Active without review — recipients see this name. Test numbers and some accounts skip Meta's review step.",
  PENDING_REVIEW: "Pending Meta review. Recipients see the raw number until it is approved.",
  DECLINED: "Declined by Meta. Submit a different name in WhatsApp Manager.",
  EXPIRED: "The approval expired. Resubmit the name in WhatsApp Manager.",
  NONE: "No display name has been submitted for this number.",
}

/** Human label for Meta's messaging tiers. */
export const MESSAGING_TIER_LABELS: Record<string, string> = {
  TIER_50: "50 customers / 24h",
  TIER_250: "250 customers / 24h",
  TIER_1K: "1 000 customers / 24h",
  TIER_10K: "10 000 customers / 24h",
  TIER_100K: "100 000 customers / 24h",
  TIER_UNLIMITED: "Unlimited",
}

/** Meta error codes we can explain in plain language on the message detail panel. */
export const MESSAGE_ERROR_HINTS: Record<number, string> = {
  131026: "The number is not on WhatsApp, or it cannot receive messages from businesses.",
  131047: "The 24-hour customer service window is closed. Use an approved template to reopen it.",
  131049: "Meta throttled this send to protect the user experience (marketing frequency cap).",
  131051: "Unsupported message type for this recipient.",
  130472: "The user is part of an experiment group excluded from marketing messages.",
  132000: "The number of variables you sent does not match the template.",
  132001: "That template does not exist in this language, or it is not approved yet.",
  132005: "The template text was edited after approval and needs re-approval.",
  132007: "The template content violates WhatsApp policy.",
  133010: "This phone number is not registered on the Cloud API.",
  368: "The account is temporarily restricted for policy violations.",
  131031: "The account has been restricted or disabled by Meta.",
}
