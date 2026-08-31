"use client"

import * as React from "react"
import {
  AlertCircle,
  ArrowDownLeft,
  ArrowUpRight,
  CheckCheck,
  Download,
  Eye,
  Inbox,
  Search,
  Send,
  X,
  XCircle,
} from "lucide-react"
import { format } from "date-fns"
import { arDZ, enUS, fr } from "date-fns/locale"
import { useLocale } from "next-intl"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

import { HubGate } from "../components/hub-gate"
import { HubHeader } from "../components/hub-header"
import { DateRangeFilter } from "../components/date-range-filter"
import { StatCard } from "../components/stat-card"
import { MessageStatusPill } from "../components/status-pill"
import { MessageDetail } from "../components/messages/message-detail"
import { useWhatsApp } from "../context/whatsapp-provider"
import { useWhatsAppTemplates } from "../hooks/use-whatsapp-templates"
import { useCampaigns } from "../hooks/use-campaigns"
import { computeAnalytics } from "../lib/analytics"
import { MESSAGE_STATUS_OPTIONS, TEMPLATE_CATEGORIES } from "../lib/constants"
import type { WhatsAppMessage } from "../types"

const PAGE_SIZE = 25
const LOCALES: Record<string, typeof enUS> = { en: enUS, fr, ar: arDZ }

function toCsv(rows: WhatsAppMessage[]) {
  const head = ["Date", "Direction", "Phone", "Contact", "Template", "Status", "Error", "Content"]
  const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`
  const body = rows.map((m) =>
    [
      m.createdAt ? format(m.createdAt, "yyyy-MM-dd HH:mm:ss") : "",
      m.direction,
      m.phoneNumber,
      m.contactName ?? "",
      m.templateName ?? "",
      m.status,
      m.error?.title ?? m.error?.message ?? "",
      m.content ?? "",
    ]
      .map(escape)
      .join(","),
  )
  return [head.join(","), ...body].join("\n")
}

function MessagesContent() {
  const { messages, messagesLoading, error, dateRange, setDateRange } = useWhatsApp()
  const locale = LOCALES[useLocale()] ?? enUS

  const { templates } = useWhatsAppTemplates()
  const { campaigns } = useCampaigns()

  const [search, setSearch] = React.useState("")
  const [status, setStatus] = React.useState<string>("all")
  const [direction, setDirection] = React.useState<string>("all")
  const [templateName, setTemplateName] = React.useState<string>("all")
  const [category, setCategory] = React.useState<string>("all")
  const [campaignId, setCampaignId] = React.useState<string>("all")
  const [page, setPage] = React.useState(0)
  const [selected, setSelected] = React.useState<WhatsAppMessage | null>(null)

  /**
   * Messages store the template name but not its category, so the category is
   * resolved by joining against the live template list. A template deleted
   * since the send has no category — those rows fall into "Uncategorised"
   * rather than disappearing from the results.
   */
  const categoryByTemplate = React.useMemo(() => {
    const map = new Map<string, string>()
    for (const t of templates) map.set(t.name, t.category)
    return map
  }, [templates])

  /** Only offer templates that actually appear in the loaded messages. */
  const templateOptions = React.useMemo(() => {
    const names = new Set<string>()
    for (const m of messages) if (m.templateName) names.add(m.templateName)
    return Array.from(names).sort((a, b) => a.localeCompare(b))
  }, [messages])

  /** Same for campaigns — a filter that returns nothing is noise. */
  const campaignOptions = React.useMemo(() => {
    const used = new Set<string>()
    for (const m of messages) if (m.campaignId) used.add(m.campaignId)
    return campaigns.filter((c) => used.has(c.id))
  }, [campaigns, messages])

  const filtered = React.useMemo(() => {
    const needle = search.trim().toLowerCase()
    return messages.filter((m) => {
      if (status !== "all" && m.status !== status) return false
      if (direction !== "all" && m.direction !== direction) return false
      if (templateName !== "all" && m.templateName !== templateName) return false
      if (campaignId !== "all") {
        if (campaignId === "none" ? Boolean(m.campaignId) : m.campaignId !== campaignId) return false
      }
      if (category !== "all") {
        const resolved = m.templateName ? categoryByTemplate.get(m.templateName) : undefined
        if (category === "UNKNOWN" ? Boolean(resolved) : resolved !== category) return false
      }
      if (!needle) return true
      return (
        m.phoneNumber?.toLowerCase().includes(needle) ||
        m.contactName?.toLowerCase().includes(needle) ||
        m.templateName?.toLowerCase().includes(needle) ||
        m.content?.toLowerCase().includes(needle) ||
        m.wamid?.toLowerCase().includes(needle)
      )
    })
  }, [messages, search, status, direction, templateName, category, campaignId, categoryByTemplate])

  React.useEffect(
    () => setPage(0),
    [search, status, direction, templateName, category, campaignId, dateRange],
  )

  const stats = React.useMemo(() => computeAnalytics(filtered), [filtered])
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const visible = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
  const isFiltered =
    search !== "" ||
    status !== "all" ||
    direction !== "all" ||
    templateName !== "all" ||
    category !== "all" ||
    campaignId !== "all"

  const resetFilters = () => {
    setSearch("")
    setStatus("all")
    setDirection("all")
    setTemplateName("all")
    setCategory("all")
    setCampaignId("all")
  }

  const exportCsv = () => {
    const blob = new Blob([toCsv(filtered)], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `whatsapp-messages-${format(new Date(), "yyyy-MM-dd")}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <HubHeader
        title="Messages"
        description="Every WhatsApp message Colitrack sent or received, with its live delivery status."
        actions={
          <>
            <DateRangeFilter value={dateRange} onChange={setDateRange} />
            <Button variant="outline" onClick={exportCsv} disabled={filtered.length === 0} className="gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </>
        }
      />

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Could not load messages</AlertTitle>
          <AlertDescription className="break-all">{error}</AlertDescription>
        </Alert>
      )}

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total" value={stats.total.toLocaleString()} icon={Send} loading={messagesLoading} />
        <StatCard
          label="Delivered"
          value={(stats.delivered + stats.read).toLocaleString()}
          hint={`${stats.deliveryRate}% of everything sent`}
          icon={CheckCheck}
          tone="success"
          progress={stats.deliveryRate}
          loading={messagesLoading}
        />
        <StatCard
          label="Read"
          value={stats.read.toLocaleString()}
          hint={`${stats.readRate}% of delivered`}
          icon={Eye}
          tone="success"
          progress={stats.readRate}
          loading={messagesLoading}
        />
        <StatCard
          label="Not delivered"
          value={stats.undelivered.toLocaleString()}
          hint={`${stats.failed.toLocaleString()} failed, ${stats.sent.toLocaleString()} still in transit`}
          icon={XCircle}
          tone={stats.failureRate > 5 ? "danger" : "warning"}
          loading={messagesLoading}
        />
      </div>

      {/* filters */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative w-full sm:w-auto sm:min-w-[260px] sm:flex-1 lg:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search phone, name, template or text…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MESSAGE_STATUS_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={direction} onValueChange={setDirection}>
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All messages</SelectItem>
            <SelectItem value="outbound">Outgoing</SelectItem>
            <SelectItem value="inbound">Incoming</SelectItem>
          </SelectContent>
        </Select>

        <Select value={templateName} onValueChange={setTemplateName}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All templates" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All templates</SelectItem>
            {templateOptions.map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            {TEMPLATE_CATEGORIES.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
            <SelectItem value="UNKNOWN">Uncategorised</SelectItem>
          </SelectContent>
        </Select>

        <Select value={campaignId} onValueChange={setCampaignId}>
          <SelectTrigger className="w-full sm:w-[190px]">
            <SelectValue placeholder="All campaigns" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All campaigns</SelectItem>
            <SelectItem value="none">Not from a campaign</SelectItem>
            {campaignOptions.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {isFiltered && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="gap-1">
            <X className="h-3.5 w-3.5" /> Reset
          </Button>
        )}
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10" />
                  <TableHead className="min-w-[160px]">Recipient</TableHead>
                  <TableHead className="min-w-[220px]">Message</TableHead>
                  <TableHead>Template</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="whitespace-nowrap">Sent at</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messagesLoading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={6}>
                        <Skeleton className="h-9 w-full" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : visible.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-40 text-center">
                      <Inbox className="mx-auto mb-2 h-8 w-8 text-muted-foreground/50" />
                      <p className="text-sm font-medium">No messages found</p>
                      <p className="text-sm text-muted-foreground">
                        {isFiltered
                          ? "Try clearing the filters."
                          : "Nothing was sent in this period. Widen the date range to look further back."}
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  visible.map((m) => (
                    <TableRow
                      key={m.id}
                      className="cursor-pointer"
                      onClick={() => setSelected(m)}
                    >
                      <TableCell>
                        {m.direction === "inbound" ? (
                          <ArrowDownLeft className="h-4 w-4 text-blue-500" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                        )}
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{m.contactName || m.phoneNumber}</p>
                        {m.contactName && <p className="text-xs text-muted-foreground">{m.phoneNumber}</p>}
                      </TableCell>
                      <TableCell>
                        <p className="line-clamp-2 max-w-sm text-sm text-muted-foreground">{m.content || "—"}</p>
                        {m.error && (
                          <p className="mt-0.5 line-clamp-1 text-xs text-destructive">
                            {m.error.title || m.error.message}
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap items-center gap-1">
                          {m.templateName ? (
                            <Badge variant="secondary" className="max-w-[140px] truncate font-normal">
                              {m.templateName}
                            </Badge>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                          {m.isTest && (
                            <Badge variant="outline" className="font-normal text-[10px] uppercase tracking-wide">
                              Test
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <MessageStatusPill status={m.status} />
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                        {m.createdAt ? format(m.createdAt, "d MMM, HH:mm", { locale }) : "—"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {filtered.length > PAGE_SIZE && (
            <div className="flex items-center justify-between border-t px-4 py-3">
              <p className="text-sm text-muted-foreground">
                Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filtered.length)} of{" "}
                {filtered.length.toLocaleString()}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Page {page + 1} of {pageCount}
                </span>
                <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= pageCount - 1}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <MessageDetail
        message={selected}
        allMessages={messages}
        onOpenChange={(open) => !open && setSelected(null)}
      />
    </>
  )
}

export default function WhatsAppMessagesPage() {
  return (
    <HubGate>
      <MessagesContent />
    </HubGate>
  )
}
