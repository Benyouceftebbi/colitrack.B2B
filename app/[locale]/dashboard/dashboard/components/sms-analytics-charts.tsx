"use client"

import { useState, useMemo } from "react"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, LineChartIcon, Loader2 } from "lucide-react"

type TimePeriod = "day" | "week" | "month"
type ChartType = "bar" | "line"

// 🔹 Aggregated analytics object saved in Firestore
// Clients/{clientId} -> field: smsAnalytics
type SmsAnalytics = Record<string /* yyyy-mm-dd */, Record<string /* senderId */, number>>

interface ProcessedData {
  period: string
  sortDate: Date
  [key: string]: string | number | Date
}

// --- Mock aggregated data (replace with your real shopData.smsAnalytics) ---
const mockSmsAnalytics: SmsAnalytics = {
  "2025-10-01": { },
  "2025-10-02": {},
  "2025-10-03": { },
  "2025-10-04": {},
}

// --- Helpers ---
const parseYYYYMMDD = (key: string): Date => {
  // key is like "2025-10-02"
  const [y, m, d] = key.split("-").map(Number)
  return new Date(y, (m ?? 1) - 1, d ?? 1)
}

const formatDateByPeriod = (date: Date, period: TimePeriod): string => {
  switch (period) {
    case "day":
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    case "week": {
      const weekStart = new Date(date)
      weekStart.setDate(date.getDate() - date.getDay()) // Sun as start
      return `Week of ${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
    }
    case "month":
      return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
    default:
      return date.toLocaleDateString()
  }
}

// Unique senders across the whole analytics object
const getUniqueSendersFromAnalytics = (analytics: SmsAnalytics): string[] => {
  const set = new Set<string>()
  for (const day of Object.values(analytics)) {
    for (const senderId of Object.keys(day)) set.add(senderId)
  }
  return Array.from(set)
}

// Optionally cap to top N frequent senders
const getTopSendersFromAnalytics = (analytics: SmsAnalytics, limit = 10): string[] => {
  const counts = new Map<string, number>()
  for (const day of Object.values(analytics)) {
    for (const [senderId, n] of Object.entries(day)) {
      counts.set(senderId, (counts.get(senderId) || 0) + (Number(n) || 0))
    }
  }
  return Array.from(counts.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([id]) => id)
}

const generateColors = (senders: string[]) => {
  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ]
  return senders.reduce(
    (acc, sender, i) => {
      acc[sender] = { label: sender, color: colors[i % colors.length] }
      return acc
    },
    {} as Record<string, { label: string; color: string }>
  )
}

// 🔹 Core: roll up the daily analytics into day/week/month rows for Recharts
const processAnalytics = (analytics: SmsAnalytics, period: TimePeriod, topSenders: string[]): ProcessedData[] => {
  const grouped = new Map<string /* periodKey */, { counts: Map<string, number>; sortDate: Date }>()
  const senderSet = new Set(topSenders)

  for (const [dateKey, senders] of Object.entries(analytics)) {
    const date = parseYYYYMMDD(dateKey)
    const periodKey = formatDateByPeriod(date, period)

    if (!grouped.has(periodKey)) {
      grouped.set(periodKey, { counts: new Map(), sortDate: date })
    }
    const g = grouped.get(periodKey)!

    // Sum only top senders (keeps charts readable)
    for (const [senderId, n] of Object.entries(senders)) {
      if (!senderSet.has(senderId)) continue
      g.counts.set(senderId, (g.counts.get(senderId) || 0) + (Number(n) || 0))
    }

    // keep earliest date for stable chronological sort
    if (date < g.sortDate) g.sortDate = date
  }

  return Array.from(grouped.entries())
    .map(([period, data]) => {
      const row: ProcessedData = { period, sortDate: data.sortDate }
      for (const [senderId, count] of data.counts) row[senderId] = count
      return row
    })
    .sort((a, b) => a.sortDate.getTime() - b.sortDate.getTime())
}

interface SmsAnalyticsChartProps {
  smsAnalytics?: SmsAnalytics // <= pass your aggregated object here
}

export default function SmsAnalyticsChart({ smsAnalytics = mockSmsAnalytics }: SmsAnalyticsChartProps) {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("day")
  const [chartType, setChartType] = useState<ChartType>("bar")
  const [isProcessing, setIsProcessing] = useState(false)

  // total messages across all days
  const totalSms = useMemo(() => {
    let sum = 0
    for (const day of Object.values(smsAnalytics)) {
      for (const n of Object.values(day)) sum += Number(n) || 0
    }
    return sum
  }, [smsAnalytics])

  // choose senders (top 10 by default)
  const topSenders = useMemo(() => getTopSendersFromAnalytics(smsAnalytics, 10), [smsAnalytics])
  const chartConfig = useMemo(() => generateColors(topSenders), [topSenders])

  const processedData = useMemo(() => {
    // tiny debounce for very large maps (optional)
    if (Object.keys(smsAnalytics).length > 2000) {
      setIsProcessing(true)
      setTimeout(() => setIsProcessing(false), 80)
    }
    return processAnalytics(smsAnalytics, timePeriod, topSenders)
  }, [smsAnalytics, timePeriod, topSenders])

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              SMS Analytics
              {isProcessing && <Loader2 className="h-4 w-4 animate-spin" />}
            </CardTitle>
            <CardDescription>
              SMS sent by sender ID over time • Total: {totalSms.toLocaleString()} messages
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timePeriod} onValueChange={(v: TimePeriod) => setTimePeriod(v)}>
              <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex rounded-md border">
              <Button
                variant={chartType === "bar" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("bar")}
                className="rounded-r-none"
                disabled={isProcessing}
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
              <Button
                variant={chartType === "line" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("line")}
                className="rounded-l-none"
                disabled={isProcessing}
              >
                <LineChartIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isProcessing ? (
          <div className="h-[300px] w-full flex items-center justify-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin" />
              Processing large dataset...
            </div>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "bar" ? (
                <BarChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  {topSenders.map((senderId) => (
                    <Bar key={senderId} dataKey={senderId} fill={chartConfig[senderId]?.color} radius={4} />
                  ))}
                </BarChart>
              ) : (
                <LineChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  {topSenders.map((senderId) => (
                    <Line
                      key={senderId}
                      type="monotone"
                      dataKey={senderId}
                      stroke={chartConfig[senderId]?.color}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  ))}
                </LineChart>
              )}
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
