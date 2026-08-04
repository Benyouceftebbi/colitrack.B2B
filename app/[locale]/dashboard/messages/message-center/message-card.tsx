import { StatusBadge } from "@/components/ui/status-badge"
import { cn } from "@/lib/utils"
import { Package } from "lucide-react"

interface MessageCardProps {
  message: {
    id: number
    customer: string
    trackingNumber: string
    status: "delivered" | "pending" | "failed"
    time: Date
    message: string
  }
  className?: string
}

export function MessageCard({ message, className }: MessageCardProps) {
  return (
    <div className={cn(
      "glass rounded-lg p-4 group hover:neon-border transition-all duration-300",
      className
    )}>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
          <Package className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="flex-1 space-y-1 min-w-0">
          <div className="flex items-center justify-between gap-4">
            <p className="font-medium truncate">{message.customer}</p>
            <time className="text-sm text-muted-foreground whitespace-nowrap">
              {message.time.toLocaleTimeString()}
            </time>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{message.message}</p>
          <div className="flex items-center gap-2 mt-2">
            <StatusBadge status={message.status} />
            <span className="text-xs text-muted-foreground font-mono">
              {message.trackingNumber}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}