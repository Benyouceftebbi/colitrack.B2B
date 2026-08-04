"use client"

import * as React from "react"
import {
  AlertCircle,
  BadgeCheck,
  Building2,
  Check,
  Copy,
  Gauge,
  Hash,
  Loader2,
  Phone,
  RefreshCw,
  Signal,
  Unplug,
  Webhook,
} from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

import { useWhatsApp } from "../context/whatsapp-provider"
import { useWhatsAppAccount } from "../hooks/use-whatsapp-account"
import { MESSAGING_TIER_LABELS, NAME_STATUS_HINTS } from "../lib/constants"
import { QualityPill } from "./status-pill"
import { DisconnectDialog } from "./disconnect-dialog"

/** Click-to-copy row for the long Meta identifiers. */
function CopyField({ label, value, icon: Icon }: { label: string; value?: string; icon: React.ElementType }) {
  const [copied, setCopied] = React.useState(false)

  const copy = () => {
    if (!value) return
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border bg-muted/30 px-3 py-2.5">
      <div className="flex min-w-0 items-center gap-2.5">
        <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="truncate font-mono text-sm" title={value}>
            {value || "—"}
          </p>
        </div>
      </div>
      {value && (
        <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={copy} aria-label={`Copy ${label}`}>
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
        </Button>
      )}
    </div>
  )
}

export function ConnectionDetails() {
  const { account, activePhone, activePhoneId, setActivePhoneId } = useWhatsApp()
  const { refresh, selectPhoneNumber, busy } = useWhatsAppAccount()

  if (!account) return null

  const hasMultipleNumbers = account.phoneNumbers.length > 1

  const handlePhoneChange = async (id: string) => {
    setActivePhoneId(id)
    await selectPhoneNumber(id)
  }

  return (
    <div className="space-y-4">
      {account.tokenError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Your connection needs attention</AlertTitle>
          <AlertDescription>
            {account.tokenError} Disconnect and connect again to restore sending.
          </AlertDescription>
        </Alert>
      )}

      {account.webhookSubscribed === false && (
        <Alert>
          <Webhook className="h-4 w-4" />
          <AlertTitle>Delivery updates are not arriving</AlertTitle>
          <AlertDescription>
            Colitrack is not subscribed to this account&apos;s webhooks, so message statuses will stay on
            &quot;sent&quot;. Press Refresh to re-subscribe.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader className="flex-row items-start justify-between gap-4 space-y-0">
          <div className="min-w-0">
            <CardTitle className="flex items-center gap-2">
              <span className="flex h-2 w-2 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_0_3px] shadow-emerald-500/20" />
              Connected
            </CardTitle>
            <CardDescription>
              {account.businessName ? `${account.businessName} · ` : ""}
              {account.lastSyncedAt
                ? `Last synced ${format(account.lastSyncedAt, "d MMM yyyy 'at' HH:mm")}`
                : "Never synced"}
            </CardDescription>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => refresh()} disabled={busy === "refresh"} className="gap-2">
              {busy === "refresh" ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <RefreshCw className="h-3.5 w-3.5" />
              )}
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <DisconnectDialog>
              <Button variant="outline" size="sm" className="gap-2 text-destructive hover:text-destructive">
                <Unplug className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Disconnect</span>
              </Button>
            </DisconnectDialog>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {hasMultipleNumbers && (
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Sending number</label>
              <Select value={activePhoneId ?? undefined} onValueChange={handlePhoneChange} disabled={busy === "select"}>
                <SelectTrigger className="max-w-sm">
                  <SelectValue placeholder="Choose a number" />
                </SelectTrigger>
                <SelectContent>
                  {account.phoneNumbers.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.displayPhoneNumber}
                      {p.verifiedName ? ` — ${p.verifiedName}` : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Campaigns and delivery notifications go out from this number.
              </p>
            </div>
          )}

          {/* Headline: the number and the name customers actually see. */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border bg-gradient-to-br from-emerald-500/5 to-transparent p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Phone className="h-3.5 w-3.5" />
                Phone number
              </div>
              <p className="mt-1.5 text-xl font-bold tracking-tight">{activePhone?.displayPhoneNumber || "—"}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {activePhone?.isRegistered ? (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                    <BadgeCheck className="h-3.5 w-3.5" /> Registered on Cloud API
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                    <AlertCircle className="h-3.5 w-3.5" /> Not registered — sending is blocked
                  </span>
                )}
              </div>
            </div>

            <div className="rounded-xl border bg-gradient-to-br from-blue-500/5 to-transparent p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Building2 className="h-3.5 w-3.5" />
                Display name
              </div>
              <p className="mt-1.5 text-xl font-bold tracking-tight">
                {activePhone?.verifiedName || <span className="text-muted-foreground">Not set</span>}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {/* Fall back on whether a name actually came back, so the caption
                    can never contradict the name shown above it. */}
                {NAME_STATUS_HINTS[activePhone?.nameStatus ?? ""] ??
                  (activePhone?.verifiedName
                    ? "This name is set on the number."
                    : NAME_STATUS_HINTS.NONE)}
              </p>
            </div>
          </div>

          <Separator />

          {/* Health */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-1.5">
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Gauge className="h-3.5 w-3.5" /> Quality rating
              </p>
              <QualityPill quality={activePhone?.qualityRating} />
            </div>

            <div className="space-y-1.5">
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Signal className="h-3.5 w-3.5" /> Messaging limit
              </p>
              <p className="text-sm font-medium">
                {activePhone?.messagingLimitTier
                  ? (MESSAGING_TIER_LABELS[activePhone.messagingLimitTier] ?? activePhone.messagingLimitTier)
                  : "—"}
              </p>
            </div>

            <div className="space-y-1.5">
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Webhook className="h-3.5 w-3.5" /> Delivery webhooks
              </p>
              <p
                className={cn(
                  "text-sm font-medium",
                  account.webhookSubscribed ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600",
                )}
              >
                {account.webhookSubscribed ? "Active" : "Not subscribed"}
              </p>
            </div>
          </div>

          <Separator />

          {/* Raw identifiers — needed when the client opens a support ticket with Meta. */}
          <div className="grid gap-2.5 sm:grid-cols-2">
            <CopyField label="Phone number ID" value={activePhone?.id} icon={Hash} />
            <CopyField label="WhatsApp Business Account ID" value={account.wabaId} icon={Hash} />
            <CopyField label="Business portfolio ID" value={account.businessId} icon={Building2} />
            <CopyField label="Meta App ID" value={account.appId} icon={Hash} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
