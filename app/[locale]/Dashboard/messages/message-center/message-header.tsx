"use client"

import { useShop } from "@/app/context/ShopContext"
import { useRouter } from "@/i18n/routing"
import { Settings, Info, Bell, MessageSquare, Truck, Package, Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { HoverCard, HoverCardContent } from "@/components/ui/hover-card"
import { Separator } from "@/components/ui/separator"
import { useTranslations } from "next-intl"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// ⬇️ use shadcn single-date Calendar (not the range picker)
import { Calendar } from "@/components/ui/calendar"
import React from "react"
import { Label } from "@/components/ui/label"

interface MessageHeaderProps {
  token: string | null
  senderId: string | null
  onSenderChange?: (senderId: string | null) => void
}

function atStartOfDay(d: Date | null | undefined) {
  if (!d) return null
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

export default function MessageHeader({ token, senderId, onSenderChange }: MessageHeaderProps) {
  const t = useTranslations("messages")
  const { shopData, dateRange, setDateRange } = useShop()
  const router = useRouter()
  const currentDate = new Date()
  const currentWeek = `${currentDate.getFullYear()}-W${String(Math.ceil(currentDate.getDate() / 7)).padStart(2, "0")}`

  const [draftStart, setDraftStart] = React.useState<Date | null>(null)
  const [draftEnd, setDraftEnd] = React.useState<Date | null>(null)

  // initialize draft from global range (once)
  React.useEffect(() => {
    if (dateRange?.from) setDraftStart(dateRange.from)
    if (dateRange?.to) setDraftEnd(dateRange.to)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const canSearch = React.useMemo(() => {
    const s = atStartOfDay(draftStart)
    const e = atStartOfDay(draftEnd)
    return !!(s && e && e.getTime() > s.getTime())
  }, [draftStart, draftEnd])

  const handleApplySearch = () => {
    const s = atStartOfDay(draftStart)!
    const eExclusive = atStartOfDay(draftEnd)! // end EXCLUSIVE at 00:00
    if (eExclusive.getTime() <= s.getTime()) return
    setDateRange({ from: s, to: eExclusive })
  }

  const filteredSms =
    senderId && senderId !== "all"
      ? shopData?.sms?.filter((sms) => sms.senderId === senderId) || []
      : shopData?.sms || []

  const deliveredCount = shopData?.tracking?.reduce(
    (count, item) => (item.lastStatus === "delivered" ? count + 1 : count),
    0,
  )
  const smsCount = filteredSms.reduce((count, item) => count + 1, 0)

  const handleSenderChange = (value: string) => {
    let selectedSenderId: string | null = value === "all" ? null : value


    // إذا القيمة worldexpress نحذف آخر s
    if (selectedSenderId === "worldexpres") {
      selectedSenderId = "worldexpress"
    }

    onSenderChange?.(selectedSenderId)
  }

  return (
    <div className="glass rounded-xl p-6 shadow-lg">
      <div className="flex flex-col space-y-6">
        {/* Header Section */}
        <div className="grid w-full items-end gap-3 md:grid-cols-6">
  {/* Preset */}
  <div className="flex flex-col gap-1">
    <Label className="text-xs text-muted-foreground">Preset</Label>
    <Button
      variant="outline"
      className="h-10 glass hover:neon-border transition-all duration-300 bg-transparent"
      onClick={() => {
        // All time: from 2025-08-01 00:00 inclusive, to tomorrow 00:00 exclusive
        const from = new Date(2025, 7, 1, 0, 0, 0, 0) // Aug = 7
        const todayStart = new Date()
        todayStart.setHours(0, 0, 0, 0)
        const toExclusive = new Date(todayStart)
        toExclusive.setDate(toExclusive.getDate() + 1) // tomorrow 00:00
        setDraftStart(from)
        setDraftEnd(toExclusive)
        setDateRange({ from, to: toExclusive })
      }}
      title="All Time"
    >
      All Time
    </Button>
  </div>

  {/* Start Date (inclusive) */}
  <div className="flex flex-col gap-1">
    <Label className="text-xs text-muted-foreground">Start Date (Inclusive)</Label>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-10 w-full justify-start glass flex items-center gap-2 bg-transparent"
          title="Select Start Date"
        >
          <CalendarIcon className="h-4 w-4 text-primary" />
          <span className="truncate">
            {draftStart ? draftStart.toLocaleDateString() : "Select Start Date"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 glass" align="start">
        <Calendar
          mode="single"
          selected={draftStart ?? undefined}
          onSelect={(d) => setDraftStart(d ?? null)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  </div>

  {/* End Date (exclusive) */}
  <div className="flex flex-col gap-1">
    <Label className="text-xs text-muted-foreground">End Date (Exclusive)</Label>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-10 w-full justify-start glass flex items-center gap-2 bg-transparent"
          title="Select End Date"
        >
          <CalendarIcon className="h-4 w-4 text-primary" />
          <span className="truncate">
            {draftEnd ? draftEnd.toLocaleDateString() : "Select End Date"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 glass" align="start">
        <Calendar
          mode="single"
          selected={draftEnd ?? undefined}
          onSelect={(d) => setDraftEnd(d ?? null)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  </div>

  {/* Search / Apply */}
  <div className="flex flex-col gap-1">
    <Label className="text-xs text-muted-foreground">Actions</Label>
    <Button
      variant="outline"
      className="h-10 glass hover:neon-border transition-all duration-300 bg-transparent"
      disabled={!canSearch}
      onClick={handleApplySearch}
      title="Search"
    >
      Search
    </Button>
  </div>

  {/* Sender */}
  <div className="flex flex-col gap-1">
    <Label className="text-xs text-muted-foreground">Sender</Label>
    <Select value={senderId || "all"} onValueChange={handleSenderChange}>
      <SelectTrigger className="h-10 glass w-full bg-transparent" title="Sender">
        <SelectValue placeholder="Select Sender" />
      </SelectTrigger>
      <SelectContent className="glass">
        <SelectItem value="all">All Senders</SelectItem>
        {shopData?.senders?.map((sender) => {
          const value =
            sender.senderId === "worldexpress" ? "worldexpres" :
            sender.senderId === "worldexpres" ? "worldexpres" :
            sender.senderId
          return (
            <SelectItem key={sender.senderId} value={value}>
              {value}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  </div>

</div>

        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="glass rounded-lg p-4 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t("messages-sent-today")}</p>
                <p className="text-2xl font-bold text-primary"> {smsCount || 0}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-primary opacity-50" />
            </div>
          </div>

          <div className="glass rounded-lg p-4 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t("success-rate")}</p>
                <p className="text-2xl font-bold text-primary">
                  {(() => {
                    const smsList = filteredSms
                    const total = smsList.length
                    if (total === 0) return "0%"

                    const sentCount = smsList.filter((sms) => sms.status === "sent").length
                    const successRate = (sentCount / total) * 100

                    return `${successRate.toFixed(1)}%`
                  })()}
                </p>
              </div>
              <Bell className="h-8 w-8 text-primary opacity-50" />
            </div>
          </div>

          <div className="glass rounded-lg p-4 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t("failed-messages")}</p>
                <p className="text-2xl font-bold text-destructive">
                  {(() => {
                    const smsList = filteredSms
                    const total = smsList.length
                    if (total === 0) return "0 (0%)"

                    const failedCount = smsList.filter((sms) => sms.status === "failed").length
                    const failureRate = (failedCount / total) * 100

                    return `${failedCount} (${failureRate.toFixed(1)}%)`
                  })()}
                </p>
              </div>
              <MessageSquare className="h-8 w-8 text-destructive opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}