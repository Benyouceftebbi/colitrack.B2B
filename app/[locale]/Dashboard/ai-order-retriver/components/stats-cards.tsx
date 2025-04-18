import type React from "react"
import { MessageSquare, Truck, Bell, DollarSign } from "lucide-react"
import type { Order } from "../data/sample-orders"
import { parseISO, isWithinInterval } from "date-fns"

interface StatsCardsProps {
  orders: Order[]
  dateRange: {
    from: Date
    to: Date
  }
}

export function StatsCards({ orders, dateRange }: StatsCardsProps) {
  // Filter orders based on date range
  const filteredOrders = orders.filter((order) => {
    // Handle both string and Date objects for timestamp
    const orderDate = order.timestamp instanceof Date ? order.timestamp : parseISO(order.timestamp)
    const isInDateRange = isWithinInterval(orderDate, {
      start: dateRange.from,
      end: new Date(new Date(dateRange.to).setHours(23, 59, 59, 999)),
    })

    // Only include orders that are not confirmed
    return isInDateRange && order.status !== "confirmed"
  })

  // Calculate statistics from filtered orders
  const totalOrders = filteredOrders.length
  const deliveredOrders = filteredOrders.filter((order) => order.status === "delivered").length
  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.orderData.total_price.value, 0) / 100
  const successRate = totalOrders > 0 ? Math.round((deliveredOrders / totalOrders) * 100) : 0

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <StatCard
        title="Total Orders"
        value={totalOrders}
        icon={<MessageSquare className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />}
      />
      <StatCard
        title="Delivered Orders"
        value={deliveredOrders}
        icon={<Truck className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />}
      />
      <StatCard
        title="Total Revenue"
        value={`${totalRevenue.toLocaleString()} DA`}
        icon={<DollarSign className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />}
      />
      <StatCard
        title="Success Rate"
        value={`${successRate}%`}
        icon={<Bell className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />}
      />
    </div>
  )
}

interface StatCardProps {
  title: string
  value: number | string
  icon: React.ReactNode
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-lg shadow p-4 md:p-6 border dark:border-gray-700">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">{title}</p>
          <h2 className="text-xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400">{value}</h2>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-2 md:p-3 rounded-full">{icon}</div>
      </div>
    </div>
  )
}
