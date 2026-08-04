"use client"

import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface StatCardProps {
  label: string
  value: string | number
  hint?: string
  icon?: LucideIcon
  /** 0-100; renders a thin progress bar under the value. */
  progress?: number
  tone?: "default" | "success" | "warning" | "danger" | "info"
  loading?: boolean
  className?: string
}

const TONES = {
  default: { icon: "bg-muted text-foreground", bar: "bg-foreground/60" },
  success: { icon: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", bar: "bg-emerald-500" },
  warning: { icon: "bg-amber-500/10 text-amber-600 dark:text-amber-400", bar: "bg-amber-500" },
  danger: { icon: "bg-red-500/10 text-red-600 dark:text-red-400", bar: "bg-red-500" },
  info: { icon: "bg-blue-500/10 text-blue-600 dark:text-blue-400", bar: "bg-blue-500" },
}

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  progress,
  tone = "default",
  loading,
  className,
}: StatCardProps) {
  const t = TONES[tone]

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          {Icon && (
            <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", t.icon)}>
              <Icon className="h-4 w-4" />
            </div>
          )}
        </div>

        {loading ? (
          <Skeleton className="mt-3 h-8 w-20" />
        ) : (
          <p className="mt-2 text-2xl font-bold tabular-nums tracking-tight sm:text-3xl">{value}</p>
        )}

        {typeof progress === "number" && !loading && (
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn("h-full rounded-full transition-all duration-500", t.bar)}
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        )}

        {hint && !loading && <p className="mt-2 text-xs text-muted-foreground">{hint}</p>}
      </CardContent>
    </Card>
  )
}
