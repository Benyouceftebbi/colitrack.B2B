"use client"

import { useState, useMemo } from "react"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, LineChartIcon, Loader2 } from "lucide-react"

// Mock SMS data structure (replace with your actual shopData.sms)
const mockSmsData = [
  { senderId: "sender1", date: { seconds: 1704067200, nanoseconds: 0 } }, // Jan 1, 2024
  { senderId: "sender2", date: { seconds: 1704153600, nanoseconds: 0 } }, // Jan 2, 2024
  { senderId: "sender1", date: { seconds: 1704153600, nanoseconds: 0 } }, // Jan 2, 2024
  { senderId: "sender3", date: { seconds: 1704240000, nanoseconds: 0 } }, // Jan 3, 2024
  { senderId: "sender1", date: { seconds: 1704326400, nanoseconds: 0 } }, // Jan 4, 2024
  { senderId: "sender2", date: { seconds: 1704326400, nanoseconds: 0 } }, // Jan 4, 2024
  { senderId: "sender2", date: { seconds: 1704412800, nanoseconds: 0 } }, // Jan 5, 2024
  { senderId: "sender1", date: { seconds: 1704499200, nanoseconds: 0 } }, // Jan 6, 2024
  { senderId: "sender3", date: { seconds: 1704585600, nanoseconds: 0 } }, // Jan 7, 2024
  { senderId: "sender1", date: { seconds: 1704672000, nanoseconds: 0 } }, // Jan 8, 2024
]

type TimePeriod = "day" | "week" | "month"
type ChartType = "bar" | "line"

interface SmsData {
  senderId: string
  date: {
    seconds: number
    nanoseconds: number
  }
}

interface ProcessedData {
  period: string
  sortDate: Date // Added sortDate for proper chronological sorting
  [key: string]: string | number | Date
}

// Convert Firestore timestamp to Date
const firestoreToDate = (timestamp: { seconds: number; nanoseconds: number }): Date => {
  return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000)
}

// Format date based on time period
const formatDateByPeriod = (date: Date, period: TimePeriod): string => {
  switch (period) {
    case "day":
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    case "week":
      const weekStart = new Date(date)
      weekStart.setDate(date.getDate() - date.getDay())
      return `Week of ${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
    case "month":
      return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
    default:
      return date.toLocaleDateString()
  }
}

// Process SMS data for chart
const processSmsData = (smsData: SmsData[], period: TimePeriod): ProcessedData[] => {
  const groupedData: { [key: string]: { [senderId: string]: number } } = {}

  smsData.forEach((sms) => {
    const date = firestoreToDate(sms.date)
    const periodKey = formatDateByPeriod(date, period)

    if (!groupedData[periodKey]) {
      groupedData[periodKey] = {}
    }

    if (!groupedData[periodKey][sms.senderId]) {
      groupedData[periodKey][sms.senderId] = 0
    }

    groupedData[periodKey][sms.senderId]++
  })

  return Object.entries(groupedData).map(([period, senders]) => ({
    period,
    ...senders,
  }))
}

// Get unique sender IDs for chart configuration
const getUniqueSenders = (smsData: SmsData[]): string[] => {
  return [...new Set(smsData.map((sms) => sms.senderId))]
}

// Generate colors for senders
const generateColors = (senders: string[]) => {
  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ]

  return senders.reduce(
    (acc, sender, index) => {
      acc[sender] = {
        label: sender,
        color: colors[index % colors.length],
      }
      return acc
    },
    {} as Record<string, { label: string; color: string }>,
  )
}

const MAX_SAMPLE_SIZE = 50000000 // Process max 50k records for performance
const MAX_SENDERS_DISPLAY = 10 // Limit to top 10 senders
const CHUNK_SIZE = 1000 // Process data in chunks

const sampleData = (data: SmsData[], maxSize: number): SmsData[] => {
  if (data.length <= maxSize) return data

  // Use systematic sampling to maintain temporal distribution
  const step = Math.floor(data.length / maxSize)
  const sampled: SmsData[] = []

  for (let i = 0; i < data.length; i += step) {
    sampled.push(data[i])
    if (sampled.length >= maxSize) break
  }

  return sampled
}

const getTopSenders = (smsData: SmsData[], limit: number = MAX_SENDERS_DISPLAY): string[] => {
  const senderCounts = new Map<string, number>()

  // Count occurrences efficiently
  for (const sms of smsData) {
    senderCounts.set(sms.senderId, (senderCounts.get(sms.senderId) || 0) + 1)
  }

  // Return top senders by frequency
  return Array.from(senderCounts.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([senderId]) => senderId)
}

const processSmsDataOptimized = (smsData: SmsData[], period: TimePeriod, topSenders: string[]): ProcessedData[] => {
  const groupedData = new Map<string, { senderCounts: Map<string, number>; sortDate: Date }>()
  const senderSet = new Set(topSenders)

  // Process in chunks to avoid blocking UI
  for (let i = 0; i < smsData.length; i += CHUNK_SIZE) {
    const chunk = smsData.slice(i, i + CHUNK_SIZE)

    for (const sms of chunk) {
      // Only process top senders for performance
      if (!senderSet.has(sms.senderId)) continue

      const date = firestoreToDate(sms.date)
      const periodKey = formatDateByPeriod(date, period)

      if (!groupedData.has(periodKey)) {
        groupedData.set(periodKey, {
          senderCounts: new Map(),
          sortDate: date, // Store the actual date for sorting
        })
      }

      const periodData = groupedData.get(periodKey)!
      periodData.senderCounts.set(sms.senderId, (periodData.senderCounts.get(sms.senderId) || 0) + 1)

      if (date < periodData.sortDate) {
        periodData.sortDate = date
      }
    }
  }

  // Convert to array format and sort by actual date (oldest first)
  return Array.from(groupedData.entries())
    .map(([period, data]) => {
      const result: ProcessedData = { period, sortDate: data.sortDate }
      for (const [senderId, count] of data.senderCounts) {
        result[senderId] = count
      }
      return result
    })
    .sort((a, b) => a.sortDate.getTime() - b.sortDate.getTime()) // Sort by actual date ascending (oldest first)
}

interface SmsAnalyticsChartProps {
  smsData?: SmsData[]
}

export default function SmsAnalyticsChart({ smsData = mockSmsData }: SmsAnalyticsChartProps) {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("day")
  const [chartType, setChartType] = useState<ChartType>("bar")
  const [isProcessing, setIsProcessing] = useState(false)

  const { sampledData, topSenders, totalSms, isLargeDataset } = useMemo(() => {
    const isLarge = smsData.length > MAX_SAMPLE_SIZE
    const sampled = isLarge ? sampleData(smsData, MAX_SAMPLE_SIZE) : smsData
    const senders = getTopSenders(sampled, MAX_SENDERS_DISPLAY)

    return {
      sampledData: sampled,
      topSenders: senders,
      totalSms: smsData.length,
      isLargeDataset: isLarge,
    }
  }, [smsData])

  const chartConfig = useMemo(() => generateColors(topSenders), [topSenders])

  const processedData = useMemo(() => {
    if (sampledData.length === 0) return []

    // For very large datasets, show loading state
    if (sampledData.length > 10000) {
      setIsProcessing(true)
      // Use setTimeout to allow UI to update
      setTimeout(() => setIsProcessing(false), 100)
    }

    return processSmsDataOptimized(sampledData, timePeriod, topSenders)
  }, [sampledData, timePeriod, topSenders])

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
              {isLargeDataset && (
                <span className="text-orange-600 dark:text-orange-400">
                  {" "}
                  • Showing sample of {sampledData.length.toLocaleString()} records for performance
                </span>
              )}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timePeriod} onValueChange={(value: TimePeriod) => setTimePeriod(value)}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
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
