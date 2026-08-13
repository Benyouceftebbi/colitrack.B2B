"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { AlertCircle, ArrowLeft, CheckCheck, Download, Eye, Search, Send, X, XCircle } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from "@/i18n/routing"

import { HubGate } from "../../components/hub-gate"
import { HubHeader } from "../../components/hub-header"
import { StatCard } from "../../components/stat-card"
import { MessageStatusPill } from "../../components/status-pill"
import { MessageDetail } from "../../components/messages/message-detail"
import { DeliveryTrendChart, FailureReasons, StatusBreakdownChart } from "../../components/analytics-charts"
import { useCampaign } from "../../hooks/use-campaigns"
import { computeAnalytics } from "../../lib/analytics"
import { normalisePhone, formatForDisplay } from "../../lib/phone"
import { MESSAGE_STATUS_OPTIONS } from "../../lib/constants"
import type { WhatsAppMessage } from "../../types"

const PAGE_SIZE = 25

function CampaignContent({ campaignId }: { campaignId: string }) {
  const router = useRouter()
  const { campaign, messages, loading, messagesLoading, error } = useCampaign(campaignId)

  const [search, setSearch] = React.useState("")
  const [status, setStatus] = React.useState("all")
  const [page, setPage] = React.useState(0)
  const [selected, setSelected] = React.useState<WhatsAppMessage | null>(null)

  const stats = React.useMemo(() => computeAnalytics(messages), [messages])

  /**
   * Phone search normalises the query the same way the audience was built, so
   * typing 0555001122 finds the recipient stored as 213555001122.
   */
  const filtered = React.useMemo(() => {
    const needle = search.trim().toLowerCase()
    const asPhone = needle ? normalisePhone(needle).value : null

    return messages.filter((m) => {
      if (status !== "all" && m.status !== status) return false
      if (!needle) return true
      return (
        m.phoneNumber?.includes(needle) ||
        (asPhone ? m.phoneNumber?.includes(asPhone) : false) ||
        m.contactName?.toLowerCase().includes(needle) ||
        m.content?.toLowerCase().includes(needle)
      )
    })
  }, [messages, search, status])

  React.useEffect(() => setPage(0), [search, status])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const visible = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  const exportCsv = () => {
    const head = ["Phone", "Status", "Sent", "Delivered", "Read", "Error"]
    const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`
    const rows = filtered.map((m) =>
      [
        m.phoneNumber,
        m.status,
        m.sentAt ? format(m.sentAt, "yyyy-MM-dd HH:mm:ss") : "",
        m.deliveredAt ? format(m.deliveredAt, "yyyy-MM-dd HH:mm:ss") : "",
        m.readAt ? format(m.readAt, "yyyy-MM-dd HH:mm:ss") : "",
        m.error?.title ?? m.error?.message ?? "",
      ]
        .map(escape)
        .join(","),
    )
    const blob = new Blob([[head.join(","), ...rows].join("\n")], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${campaign?.name ?? "campaign"}-recipients.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-9 w-72" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
        <Skeleton className="h-72" />
      </div>
    )
  }

  if (!campaign) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Campaign not found</AlertTitle>
        <AlertDescription>
          It may have been deleted.{" "}
          <button className="underline" onClick={() => router.push("/Dashboard/whatsapp/marketing")}>
            Back to campaigns
          </button>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <>
      <HubHeader
        title={campaign.name}
        description={`${campaign.templateName}${
          campaign.templateLanguage ? ` · ${campaign.templateLanguage.toUpperCase()}` : ""
        }${campaign.sentAt ? ` · sent ${format(campaign.sentAt, "d MMM yyyy 'at' HH:mm")}` : ""}`}
        actions={
          <>
            <Button
              variant="outline"
              onClick={() => router.push("/Dashboard/whatsapp/marketing")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button variant="outline" onClick={exportCsv} disabled={!filtered.length} className="gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </>
        }
      />

      {campaign.error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>This campaign failed</AlertTitle>
          <AlertDescription>{campaign.error}</AlertDescription>
        </Alert>
      )}

      {campaign.rejectedCount > 0 && (
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>
            {campaign.rejectedCount.toLocaleString()} message
            {campaign.rejectedCount === 1 ? "" : "s"} rejected at send time
          </AlertTitle>
          <AlertDescription>
            Meta refused these before they were queued — usually an invalid number or a billing problem. They appear
            below as failed.
          </AlertDescription>
        </Alert>
      )}

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Sent"
          value={campaign.recipientCount.toLocaleString()}
          hint={`${campaign.acceptedCount.toLocaleString()} accepted by Meta`}
          icon={Send}
          tone="info"
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
          hint={`${stats.read.toLocaleString()} opened`}
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

      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <StatusBreakdownChart messages={messages} />
        <FailureReasons messages={messages} />
      </div>

      <div className="mb-6">
        <DeliveryTrendChart messages={messages} />
      </div>

      {/* per-recipient lookup */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search a phone number in this campaign…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full sm:w-[190px]">
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

        {(search || status !== "all") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearch("")
              setStatus("all")
            }}
            className="gap-1"
          >
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
                  <TableHead className="min-w-[160px]">Recipient</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Delivered</TableHead>
                  <TableHead>Read</TableHead>
                  <TableHead className="min-w-[180px]">Problem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messagesLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={5}>
                        <Skeleton className="h-9 w-full" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : visible.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-sm text-muted-foreground">
                      {search || status !== "all"
                        ? "No recipient matches that search."
                        : "No messages recorded for this campaign yet."}
                    </TableCell>
                  </TableRow>
                ) : (
                  visible.map((m) => (
                    <TableRow key={m.id} className="cursor-pointer" onClick={() => setSelected(m)}>
                      <TableCell className="font-mono text-sm">{formatForDisplay(m.phoneNumber)}</TableCell>
                      <TableCell>
                        <MessageStatusPill status={m.status} />
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                        {m.deliveredAt ? format(m.deliveredAt, "d MMM, HH:mm") : "—"}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                        {m.readAt ? format(m.readAt, "d MMM, HH:mm") : "—"}
                      </TableCell>
                      <TableCell>
                        {m.error ? (
                          <Badge variant="outline" className="max-w-[200px] truncate font-normal text-destructive">
                            {m.error.title || m.error.message}
                          </Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
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

      <MessageDetail message={selected} onOpenChange={(open) => !open && setSelected(null)} />
    </>
  )
}

export default function CampaignDetailPage() {
  const params = useParams()
  const campaignId = String(params?.campaignId ?? "")

  return (
    <HubGate>
      <CampaignContent campaignId={campaignId} />
    </HubGate>
  )
}
