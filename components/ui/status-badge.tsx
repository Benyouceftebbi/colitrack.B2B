import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "delivered" | "pending" | "failed"
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variants = {
    delivered: "bg-emerald-500/20 text-emerald-400 border-emerald-500/50",
    pending: "bg-amber-500/20 text-amber-400 border-amber-500/50",
    failed: "bg-rose-500/20 text-rose-400 border-rose-500/50"
  }

  return (
    <span className={cn(
      "px-2.5 py-0.5 text-xs font-medium rounded-full border",
      variants[status],
      className
    )}>
      {status}
    </span>
  )
}