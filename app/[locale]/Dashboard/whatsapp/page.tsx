"use client"

import { useMemo } from "react"
import { CheckCheck, Eye, Send, XCircle } from "lucide-react"

import { HubGate } from "./components/hub-gate"
import { HubHeader } from "./components/hub-header"
import { ConnectionDetails } from "./components/connection-details"
import { StatCard } from "./components/stat-card"
import { DateRangeFilter } from "./components/date-range-filter"
import {
  DeliveryTrendChart,
  FailureReasons,
  StatusBreakdownChart,
  TemplatePerformanceChart,
} from "./components/analytics-charts"
import { useWhatsApp } from "./context/whatsapp-provider"
import { computeAnalytics } from "./lib/analytics"

function DashboardContent() {
  const { messages, messagesLoading, dateRange, setDateRange } = useWhatsApp()
  const stats = useMemo(() => computeAnalytics(messages), [messages])

  return (
    <>
      <HubHeader
        title="WhatsApp Hub"
        description="Your connection, delivery health and message performance in one place."
        actions={<DateRangeFilter value={dateRange} onChange={setDateRange} />}
      />

      <div className="space-y-6">
        <ConnectionDetails />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Messages sent"
            value={stats.total.toLocaleString()}
            hint={`${stats.queued.toLocaleString()} still queued`}
            icon={Send}
            tone="info"
            loading={messagesLoading}
          />
          <StatCard
            label="Delivered"
            value={`${stats.deliveryRate}%`}
            hint={`${(stats.delivered + stats.read).toLocaleString()} reached a device`}
            icon={CheckCheck}
            tone="success"
            progress={stats.deliveryRate}
            loading={messagesLoading}
          />
          <StatCard
            label="Read"
            value={`${stats.readRate}%`}
            hint={`${stats.read.toLocaleString()} opened by the recipient`}
            icon={Eye}
            tone="success"
            progress={stats.readRate}
            loading={messagesLoading}
          />
          <StatCard
            label="Failed"
            value={stats.failed.toLocaleString()}
            hint={`${stats.failureRate}% of everything sent`}
            icon={XCircle}
            tone={stats.failureRate > 5 ? "danger" : "default"}
            progress={stats.failureRate}
            loading={messagesLoading}
          />
        </div>

        <DeliveryTrendChart messages={messages} from={dateRange?.from} to={dateRange?.to} />

        <div className="grid gap-6 lg:grid-cols-2">
          <StatusBreakdownChart messages={messages} />
          <TemplatePerformanceChart messages={messages} />
        </div>

        <FailureReasons messages={messages} />
      </div>
    </>
  )
}

export default function WhatsAppDashboardPage() {
  return (
    <HubGate>
      <DashboardContent />
    </HubGate>
  )
}
