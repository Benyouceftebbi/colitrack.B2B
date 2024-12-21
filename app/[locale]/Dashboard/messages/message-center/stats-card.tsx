import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  label: string
  value: number
  trend?: number
  icon: React.ReactNode
  className?: string
}

export function StatsCard({ label, value, trend, icon, className }: StatsCardProps) {
  return (
    <Card className={cn("glass p-6 relative overflow-hidden group", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold mt-2 glow">{value.toLocaleString()}</p>
          {trend && (
            <p className={cn(
              "text-xs font-medium mt-1",
              trend > 0 ? "text-emerald-400" : "text-rose-400"
            )}>
              {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% from last period
            </p>
          )}
        </div>
        <div className="text-muted-foreground/50">{icon}</div>
      </div>
    </Card>
  )
}