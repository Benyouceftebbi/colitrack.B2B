"use client"

import * as React from "react"
import { AlertCircle, ChevronRight, Megaphone, Plus, Search, X } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from "@/i18n/routing"
import { cn } from "@/lib/utils"

import { HubGate } from "../components/hub-gate"
import { HubHeader } from "../components/hub-header"
import { useCampaigns } from "../hooks/use-campaigns"
import type { CampaignStatus } from "../types"

const STATUS_META: Record<CampaignStatus, { label: string; className: string }> = {
  draft: { label: "Draft", className: "bg-muted text-muted-foreground" },
  sending: { label: "Sending", className: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400" },
  sent: { label: "Sent", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400" },
  partial: { label: "Partly sent", className: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400" },
  failed: { label: "Failed", className: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400" },
}

function MarketingContent() {
  const router = useRouter()
  const { campaigns, loading, error } = useCampaigns()
  const [search, setSearch] = React.useState("")

  const filtered = React.useMemo(() => {
    const needle = search.trim().toLowerCase()
    if (!needle) return campaigns
    return campaigns.filter(
      (c) => c.name.toLowerCase().includes(needle) || c.templateName.toLowerCase().includes(needle),
    )
  }, [campaigns, search])

  return (
    <>
      <HubHeader
        title="Marketing"
        description="Send an approved template to a list of customers, then track how it landed."
        actions={
          <Button onClick={() => router.push("/Dashboard/whatsapp/marketing/new")} className="gap-2">
            <Plus className="h-4 w-4" /> New campaign
          </Button>
        }
      />

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Could not load campaigns</AlertTitle>
          <AlertDescription className="break-all">{error}</AlertDescription>
        </Alert>
      )}

      {campaigns.length > 0 && (
        <div className="mb-4 flex items-center gap-2">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search campaigns…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          {search && (
            <Button variant="ghost" size="sm" onClick={() => setSearch("")} className="gap-1">
              <X className="h-3.5 w-3.5" /> Reset
            </Button>
          )}
        </div>
      )}

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[220px]">Campaign</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Recipients</TableHead>
                  <TableHead className="text-right">Accepted</TableHead>
                  <TableHead className="text-right">Rejected</TableHead>
                  <TableHead>Sent</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={7}>
                        <Skeleton className="h-9 w-full" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-48 text-center">
                      <Megaphone className="mx-auto mb-2 h-8 w-8 text-muted-foreground/50" />
                      <p className="text-sm font-medium">
                        {search ? "No campaigns match your search" : "No campaigns yet"}
                      </p>
                      <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
                        {search
                          ? "Try a different name."
                          : "Upload a customer list, pick an approved template, and send your first campaign."}
                      </p>
                      {!search && (
                        <Button
                          className="mt-4 gap-2"
                          onClick={() => router.push("/Dashboard/whatsapp/marketing/new")}
                        >
                          <Plus className="h-4 w-4" /> New campaign
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((c) => {
                    const meta = STATUS_META[c.status] ?? STATUS_META.draft
                    return (
                      <TableRow
                        key={c.id}
                        className="cursor-pointer"
                        onClick={() => router.push(`/Dashboard/whatsapp/marketing/${c.id}`)}
                      >
                        <TableCell>
                          <p className="font-medium">{c.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {c.templateName}
                            {c.templateLanguage ? ` · ${c.templateLanguage.toUpperCase()}` : ""}
                          </p>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn("font-normal", meta.className)}>
                            {meta.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {c.recipientCount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right tabular-nums text-emerald-600 dark:text-emerald-400">
                          {c.acceptedCount.toLocaleString()}
                        </TableCell>
                        <TableCell
                          className={cn(
                            "text-right tabular-nums",
                            c.rejectedCount > 0 && "text-red-600 dark:text-red-400",
                          )}
                        >
                          {c.rejectedCount.toLocaleString()}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                          {c.sentAt ? format(c.sentAt, "d MMM yyyy, HH:mm") : "—"}
                        </TableCell>
                        <TableCell>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default function MarketingPage() {
  return (
    <HubGate>
      <MarketingContent />
    </HubGate>
  )
}
