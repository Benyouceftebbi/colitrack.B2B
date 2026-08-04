"use client"

import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  MESSAGE_STATUS_META,
  QUALITY_META,
  TEMPLATE_STATUS_META,
  toneClass,
} from "../lib/constants"
import type { TemplateStatus, WhatsAppMessageStatus, WhatsAppQualityRating } from "../types"

interface PillProps {
  label: string
  tone: Parameters<typeof toneClass>[0]
  description?: string
  className?: string
  dot?: boolean
}

function Pill({ label, tone, description, className, dot = true }: PillProps) {
  const pill = (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        toneClass(tone),
        className,
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />}
      {label}
    </span>
  )

  if (!description) return pill

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help">{pill}</span>
        </TooltipTrigger>
        <TooltipContent className="max-w-[240px] text-xs leading-relaxed">{description}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function MessageStatusPill({ status, className }: { status: WhatsAppMessageStatus; className?: string }) {
  const meta = MESSAGE_STATUS_META[status] ?? MESSAGE_STATUS_META.queued
  return <Pill label={meta.label} tone={meta.tone} description={meta.description} className={className} />
}

export function TemplateStatusPill({ status, className }: { status: TemplateStatus; className?: string }) {
  const meta = TEMPLATE_STATUS_META[status] ?? {
    label: status,
    tone: "muted" as const,
    description: undefined,
  }
  return <Pill label={meta.label} tone={meta.tone} description={meta.description} className={className} />
}

export function QualityPill({
  quality,
  className,
}: {
  quality?: WhatsAppQualityRating | string | null
  className?: string
}) {
  const key = (quality || "UNKNOWN").toString().toUpperCase() as WhatsAppQualityRating
  const meta = QUALITY_META[key] ?? QUALITY_META.UNKNOWN
  return <Pill label={meta.label} tone={meta.tone} description={meta.description} className={className} />
}

export { Pill }
