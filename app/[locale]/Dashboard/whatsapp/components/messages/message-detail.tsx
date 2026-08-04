"use client"

import { AlertCircle, ArrowDownLeft, ArrowUpRight, Check, CheckCheck, Clock, XCircle } from "lucide-react"
import { format } from "date-fns"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

import { MESSAGE_ERROR_HINTS } from "../../lib/constants"
import { MessageStatusPill } from "../status-pill"
import type { WhatsAppMessage } from "../../types"

/** Ordered lifecycle with the timestamp we recorded for each hop. */
function Timeline({ message }: { message: WhatsAppMessage }) {
  const steps = [
    { key: "queued", label: "Queued in Colitrack", at: message.createdAt, icon: Clock },
    { key: "sent", label: "Accepted by Meta", at: message.sentAt, icon: Check },
    { key: "delivered", label: "Delivered to device", at: message.deliveredAt, icon: CheckCheck },
    { key: "read", label: "Read by recipient", at: message.readAt, icon: CheckCheck },
  ]

  return (
    <ol className="space-y-0">
      {steps.map((step, i) => {
        const done = Boolean(step.at)
        const Icon = step.icon
        return (
          <li key={step.key} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border",
                  done
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "border-dashed bg-muted text-muted-foreground",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
              </span>
              {i < steps.length - 1 && (
                <span className={cn("h-6 w-px", done ? "bg-emerald-500/30" : "bg-border")} />
              )}
            </div>
            <div className="pb-3">
              <p className={cn("text-sm", done ? "font-medium" : "text-muted-foreground")}>{step.label}</p>
              <p className="text-xs text-muted-foreground">
                {step.at ? format(step.at, "d MMM yyyy 'at' HH:mm:ss") : "Not reached"}
              </p>
            </div>
          </li>
        )
      })}

      {message.status === "failed" && (
        <li className="flex gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400">
            <XCircle className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="text-sm font-medium">Failed</p>
            <p className="text-xs text-muted-foreground">
              {message.failedAt ? format(message.failedAt, "d MMM yyyy 'at' HH:mm:ss") : "—"}
            </p>
          </div>
        </li>
      )}
    </ol>
  )
}

function Field({ label, value }: { label: string; value?: React.ReactNode }) {
  if (value === undefined || value === null || value === "") return null
  return (
    <div className="flex items-start justify-between gap-4 py-1.5">
      <span className="shrink-0 text-xs text-muted-foreground">{label}</span>
      <span className="break-all text-right text-xs font-medium">{value}</span>
    </div>
  )
}

export function MessageDetail({
  message,
  onOpenChange,
}: {
  message: WhatsAppMessage | null
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Sheet open={Boolean(message)} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        {message && (
          <>
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                {message.direction === "inbound" ? (
                  <ArrowDownLeft className="h-4 w-4 text-blue-500" />
                ) : (
                  <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                )}
                {message.contactName || message.phoneNumber}
              </SheetTitle>
              <SheetDescription>
                {message.direction === "inbound" ? "Received from" : "Sent to"} {message.phoneNumber}
              </SheetDescription>
            </SheetHeader>

            <div className="mt-5 space-y-5">
              <MessageStatusPill status={message.status} />

              {message.error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>{message.error.title || "Delivery failed"}</AlertTitle>
                  <AlertDescription className="space-y-1">
                    <p>{message.error.message || message.error.details}</p>
                    {message.error.code && MESSAGE_ERROR_HINTS[message.error.code] && (
                      <p className="text-xs opacity-90">{MESSAGE_ERROR_HINTS[message.error.code]}</p>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              <div className="rounded-lg border bg-muted/30 p-3">
                <p className="mb-1 text-xs font-medium text-muted-foreground">Message</p>
                <p className="whitespace-pre-wrap break-words text-sm">{message.content || "—"}</p>
              </div>

              <div>
                <p className="mb-3 text-sm font-medium">Delivery timeline</p>
                <Timeline message={message} />
              </div>

              <Separator />

              <div>
                <p className="mb-1 text-sm font-medium">Details</p>
                <Field label="Template" value={message.templateName} />
                <Field label="Template language" value={message.templateLanguage?.toUpperCase()} />
                <Field label="Type" value={message.type} />
                <Field label="Conversation category" value={message.conversationCategory} />
                <Field label="Billable" value={message.billable === undefined ? undefined : message.billable ? "Yes" : "No"} />
                <Field label="Campaign" value={message.campaignId} />
                <Field
                  label="Origin"
                  value={
                    message.isTest
                      ? "Test send from the hub"
                      : message.source === "campaign"
                        ? "Campaign"
                        : message.source === "api"
                          ? "API"
                          : undefined
                  }
                />
                <Field label="Sent by" value={message.sentByEmail ?? undefined} />
                <Field
                  label="Values sent"
                  value={
                    message.parameters?.body?.length
                      ? message.parameters.body.join(" · ")
                      : undefined
                  }
                />
                <Field label="Message ID" value={<span className="font-mono">{message.wamid || message.id}</span>} />
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
