"use client"

import * as React from "react"
import {
  AlertCircle,
  Copy,
  Eye,
  FileText,
  Loader2,
  MoreHorizontal,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Send,
  Trash2,
  X,
} from "lucide-react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useToast } from "@/hooks/use-toast"

import { HubGate } from "../components/hub-gate"
import { HubHeader } from "../components/hub-header"
import { DateRangeFilter } from "../components/date-range-filter"
import { QualityPill, TemplateStatusPill } from "../components/status-pill"
import { TemplateEditor } from "../components/templates/template-editor"
import { TemplatePreview } from "../components/templates/template-preview"
import { TestSendDialog } from "../components/templates/test-send-dialog"
import { useWhatsAppTemplates } from "../hooks/use-whatsapp-templates"
import { TEMPLATE_CATEGORIES, TEMPLATE_STATUS_OPTIONS } from "../lib/constants"
import type { TemplateDraft, WhatsAppTemplate } from "../types"

const PAGE_SIZE = 12

function bodyOf(template: WhatsAppTemplate) {
  return template.components.find((c) => c.type === "BODY")?.text ?? ""
}

function TemplatesContent() {
  const { templates, loading, error, mutating, refetch, createTemplate, updateTemplate, deleteTemplate } =
    useWhatsAppTemplates()
  const { toast } = useToast()

  const [search, setSearch] = React.useState("")
  const [status, setStatus] = React.useState<string>("all")
  const [category, setCategory] = React.useState<string>("all")
  const [range, setRange] = React.useState<DateRange | undefined>(undefined)
  const [page, setPage] = React.useState(0)

  const [editorOpen, setEditorOpen] = React.useState(false)
  const [editing, setEditing] = React.useState<WhatsAppTemplate | null>(null)
  const [previewing, setPreviewing] = React.useState<WhatsAppTemplate | null>(null)
  const [pendingDelete, setPendingDelete] = React.useState<WhatsAppTemplate | null>(null)
  const [testing, setTesting] = React.useState<WhatsAppTemplate | null>(null)

  const filtered = React.useMemo(() => {
    const needle = search.trim().toLowerCase()
    return templates.filter((t) => {
      if (status !== "all" && t.status !== status) return false
      if (category !== "all" && t.category !== category) return false

      if (range?.from) {
        const stamp = t.updatedAt ?? t.createdAt
        if (!stamp) return false
        const start = new Date(range.from)
        start.setHours(0, 0, 0, 0)
        if (stamp < start) return false
        if (range.to) {
          const end = new Date(range.to)
          end.setHours(23, 59, 59, 999)
          if (stamp > end) return false
        }
      }

      if (!needle) return true
      return (
        t.name.toLowerCase().includes(needle) ||
        t.language.toLowerCase().includes(needle) ||
        t.category.toLowerCase().includes(needle) ||
        bodyOf(t).toLowerCase().includes(needle)
      )
    })
  }, [templates, search, status, category, range])

  React.useEffect(() => setPage(0), [search, status, category, range])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const visible = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
  const isFiltered = search !== "" || status !== "all" || category !== "all" || Boolean(range?.from)

  const resetFilters = () => {
    setSearch("")
    setStatus("all")
    setCategory("all")
    setRange(undefined)
  }

  const handleSubmit = async (draft: TemplateDraft, templateId?: string) => {
    if (templateId) {
      return updateTemplate(templateId, { category: draft.category, components: draft.components })
    }
    return createTemplate(draft)
  }

  const counts = React.useMemo(
    () => ({
      approved: templates.filter((t) => t.status === "APPROVED").length,
      pending: templates.filter((t) => t.status === "PENDING").length,
      rejected: templates.filter((t) => t.status === "REJECTED").length,
    }),
    [templates],
  )

  return (
    <>
      <HubHeader
        title="Templates"
        description="Message templates approved by Meta. Only approved templates can start a conversation."
        actions={
          <>
            <Button variant="outline" onClick={() => refetch()} disabled={loading} className="gap-2">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Refresh
            </Button>
            <Button
              onClick={() => {
                setEditing(null)
                setEditorOpen(true)
              }}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              New template
            </Button>
          </>
        }
      />

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Could not load templates</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mb-4 flex flex-wrap gap-2 text-sm">
        <Badge variant="outline" className="gap-1.5 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {counts.approved} approved
        </Badge>
        <Badge variant="outline" className="gap-1.5 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> {counts.pending} pending
        </Badge>
        <Badge variant="outline" className="gap-1.5 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" /> {counts.rejected} rejected
        </Badge>
      </div>

      {/* filters */}
      <div className="mb-4 flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1 lg:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, language or content…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full lg:w-[170px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TEMPLATE_STATUS_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full lg:w-[170px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {TEMPLATE_CATEGORIES.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DateRangeFilter value={range} onChange={setRange} className="w-full lg:w-auto" />

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
                  <TableHead className="min-w-[220px]">Template</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Quality</TableHead>
                  <TableHead>Last updated</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={7}>
                        <Skeleton className="h-9 w-full" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : visible.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-40 text-center">
                      <FileText className="mx-auto mb-2 h-8 w-8 text-muted-foreground/50" />
                      <p className="text-sm font-medium">
                        {isFiltered ? "No templates match your filters" : "No templates yet"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {isFiltered
                          ? "Try widening the date range or clearing the search."
                          : "Create your first template to start messaging customers."}
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  visible.map((t) => (
                    <TableRow key={t.id} className="group">
                      <TableCell>
                        <button
                          className="block w-full text-left"
                          onClick={() => setPreviewing(t)}
                          title="Open preview"
                        >
                          <p className="font-medium">{t.name}</p>
                          <p className="line-clamp-1 max-w-md text-xs text-muted-foreground">{bodyOf(t)}</p>
                          {t.rejectedReason && (
                            <p className="mt-0.5 text-xs text-destructive">Reason: {t.rejectedReason}</p>
                          )}
                        </button>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-normal">
                          {TEMPLATE_CATEGORIES.find((c) => c.value === t.category)?.label ?? t.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs uppercase">{t.language}</TableCell>
                      <TableCell>
                        <TemplateStatusPill status={t.status} />
                      </TableCell>
                      <TableCell>
                        <QualityPill quality={t.quality} />
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                        {t.updatedAt ? format(t.updatedAt, "d MMM yyyy") : "—"}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setPreviewing(t)}>
                              <Eye className="mr-2 h-4 w-4" /> Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setTesting(t)}
                              disabled={t.status !== "APPROVED"}
                            >
                              <Send className="mr-2 h-4 w-4" /> Send test
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setEditing(t)
                                setEditorOpen(true)
                              }}
                              disabled={t.status === "PENDING" || t.status === "PENDING_DELETION"}
                            >
                              <Pencil className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                navigator.clipboard.writeText(t.name)
                                toast({ title: "Template name copied" })
                              }}
                            >
                              <Copy className="mr-2 h-4 w-4" /> Copy name
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={() => setPendingDelete(t)}>
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
                Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filtered.length)} of {filtered.length}
              </p>
              <div className="flex gap-2">
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

      <TemplateEditor
        open={editorOpen}
        onOpenChange={setEditorOpen}
        template={editing}
        onSubmit={handleSubmit}
        submitting={mutating}
      />

      {/* preview drawer */}
      <Sheet open={Boolean(previewing)} onOpenChange={(o) => !o && setPreviewing(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{previewing?.name}</SheetTitle>
            <SheetDescription>
              {previewing?.language.toUpperCase()} ·{" "}
              {TEMPLATE_CATEGORIES.find((c) => c.value === previewing?.category)?.label ?? previewing?.category}
            </SheetDescription>
          </SheetHeader>

          {previewing && (
            <div className="mt-5 space-y-5">
              <div className="flex flex-wrap gap-2">
                <TemplateStatusPill status={previewing.status} />
                <QualityPill quality={previewing.quality} />
              </div>

              {previewing.rejectedReason && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Rejected</AlertTitle>
                  <AlertDescription>{previewing.rejectedReason}</AlertDescription>
                </Alert>
              )}

              <TemplatePreview components={previewing.components} />

              <div className="space-y-1 rounded-lg border bg-muted/30 p-3 text-xs">
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Template ID</span>
                  <span className="font-mono">{previewing.id}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Last updated</span>
                  <span>{previewing.updatedAt ? format(previewing.updatedAt, "d MMM yyyy HH:mm") : "—"}</span>
                </p>
              </div>

              <div className="grid gap-2">
                <Button
                  className="w-full gap-2"
                  disabled={previewing.status !== "APPROVED"}
                  onClick={() => {
                    setTesting(previewing)
                    setPreviewing(null)
                  }}
                >
                  <Send className="h-4 w-4" /> Send test message
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                  disabled={previewing.status === "PENDING"}
                  onClick={() => {
                    setEditing(previewing)
                    setPreviewing(null)
                    setEditorOpen(true)
                  }}
                >
                  <Pencil className="mr-2 h-4 w-4" /> Edit template
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <TestSendDialog template={testing} open={Boolean(testing)} onOpenChange={(o) => !o && setTesting(null)} />

      <AlertDialog open={Boolean(pendingDelete)} onOpenChange={(o) => !o && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete &quot;{pendingDelete?.name}&quot;?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes the template from your WhatsApp Business account. Any campaign still using it will start
              failing. Deleted names can be reused after 30 days.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={mutating}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={mutating}
              onClick={async (e) => {
                e.preventDefault()
                if (!pendingDelete) return
                const ok = await deleteTemplate(pendingDelete)
                if (ok) setPendingDelete(null)
              }}
            >
              {mutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default function WhatsAppTemplatesPage() {
  return (
    <HubGate>
      <TemplatesContent />
    </HubGate>
  )
}
