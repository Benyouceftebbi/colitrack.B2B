import { StatsCard } from "./stats-card"
import { MessageSquare, Package, Truck, Users } from "lucide-react"

export function MessageStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        label="Total Messages"
        value={12458}
        trend={12}
        icon={<MessageSquare className="w-5 h-5" />}
      />
      <StatsCard
        label="Active Deliveries"
        value={847}
        trend={-3}
        icon={<Truck className="w-5 h-5" />}
      />
      <StatsCard
        label="Packages Delivered"
        value={11942}
        trend={8}
        icon={<Package className="w-5 h-5" />}
      />
      <StatsCard
        label="Customers Reached"
        value={8391}
        trend={15}
        icon={<Users className="w-5 h-5" />}
      />
    </div>
  )
}