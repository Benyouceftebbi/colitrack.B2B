"use client"

import type React from "react"
import { PackageCheck, Truck, Clock, DollarSign } from "lucide-react"
import type { Order } from "../data/sample-orders"
import { parseISO, isWithinInterval } from "date-fns"
import { useTranslations } from "next-intl"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface StatsCardsProps {
  orders: Order[]
  dateRange: {
    from: Date
    to: Date
  }
}

export function StatsCards({ orders, dateRange }: StatsCardsProps) {
  const t = useTranslations("ai-order-retriever")

  // Filter orders based on date range only (no status filtering)
  const filteredOrders = orders.filter((order) => {
    try {
      // Handle both string and Date objects for timestamp
      let orderDate: Date

      if (order.timestamp instanceof Date) {
        orderDate = order.timestamp
      } else if (typeof order.timestamp === "string") {
        orderDate = parseISO(order.timestamp)
      } else if (order.timestamp && typeof order.timestamp.toDate === "function") {
        // Handle Firestore timestamp
        orderDate = order.timestamp.toDate()
      } else {
        console.warn("Invalid timestamp format for order:", order.id)
        return false
      }

      const isInDateRange = isWithinInterval(orderDate, {
        start: dateRange.from,
        end: new Date(new Date(dateRange.to).setHours(23, 59, 59, 999)),
      })

      return isInDateRange
    } catch (error) {
      console.error("Error filtering order by date:", error, order)
      return false
    }
  })

  // Calculate statistics from filtered orders
  const totalOrders = filteredOrders.length

  // Count orders by status
  const confirmedOrders = filteredOrders.filter((order) => order.status === "confirmed").length
  const pendingOrders = filteredOrders.filter((order) => order.status !== "confirmed").length

  // More robust revenue calculation with error handling
  const totalRevenue = filteredOrders.reduce((sum, order) => {
    try {
      if (order.orderData?.total_price?.value) {
        return sum + order.orderData.total_price.value
      } else if (order.total_price?.value) {
        return sum + order.total_price.value
      } else if (order.orderData?.total) {
        return sum + order.orderData.total
      } else if (order.total) {
        return sum + order.total
      }
      return sum
    } catch (error) {
      console.error("Error calculating revenue for order:", error, order)
      return sum
    }
  }, 0)

  // Count orders by status for the chart
  const statusCounts = {}
  filteredOrders.forEach((order) => {
    const status = order.status || "unknown"
    statusCounts[status] = (statusCounts[status] || 0) + 1
  })

  // Convert to array format for chart
  const chartData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
  }))

  // Define colors for different statuses
  const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" dir="rtl">
        <StatCard
          title={t("totalOrders")}
          value={totalOrders}
          icon={<PackageCheck className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />}
        />
        <StatCard
          title={t("confirmedOrders")}
          value={confirmedOrders}
          icon={<Truck className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />}
        />
        <StatCard
          title={t("pendingOrders")}
          value={pendingOrders}
          icon={<Clock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />}
        />
        <StatCard
          title={t("totalRevenue")}
          value={`${totalRevenue.toLocaleString()} DA`}
          icon={<DollarSign className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />}
        />
      </div>

      {/* Status Distribution Chart */}
    
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
