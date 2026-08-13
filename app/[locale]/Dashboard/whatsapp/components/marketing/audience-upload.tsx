"use client"

import * as React from "react"
import { useDropzone } from "react-dropzone"
import { AlertTriangle, Download, FileSpreadsheet, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

import { invalidRowsToCsv, type AudienceSummary, type ParsedSheet } from "../../lib/audience"
import { formatForDisplay } from "../../lib/phone"
import type { ColumnMapping, WhatsAppTemplate } from "../../types"
import { getTemplateVariables } from "../../lib/template-variables"

interface AudienceUploadProps {
  sheet: ParsedSheet | null
  /** Parsing lives in the parent so the wizard owns all campaign state. */
  onFile: (file: File) => void
  onClear: () => void
  mapping: ColumnMapping
  onMapping: (mapping: ColumnMapping) => void
  template: WhatsAppTemplate | null
  summary: AudienceSummary | null
  parsing: boolean
  parseError: string | null
}

export function AudienceUpload({
  sheet,
  onFile,
  onClear,
  mapping,
  onMapping,
  template,
  summary,
  parsing,
  parseError,
}: AudienceUploadProps) {
  const variables = template ? getTemplateVariables(template) : null

  const onDrop = React.useCallback(
    (files: File[]) => {
      if (files[0]) onFile(files[0])
    },
    [onFile],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"],
      "text/csv": [".csv"],
    },
    maxFiles: 1,
  })

  const downloadInvalid = () => {
    if (!summary?.invalid.length) return
    const blob = new Blob([invalidRowsToCsv(summary.invalid)], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "rows-to-fix.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  /* --------------------------------- upload -------------------------------- */
  if (!sheet || !sheet.headers.length) {
    return (
      <div className="space-y-4">
        <div
          {...getRootProps()}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center transition-colors",
            isDragActive ? "border-emerald-500 bg-emerald-500/5" : "hover:border-muted-foreground/40",
          )}
        >
          <input {...getInputProps()} />
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
            {parsing ? (
              <Upload className="h-5 w-5 animate-pulse text-muted-foreground" />
            ) : (
              <FileSpreadsheet className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
          <p className="font-medium">{parsing ? "Reading your file…" : "Drop your contact list here"}</p>
          <p className="mt-1 text-sm text-muted-foreground">Excel (.xlsx, .xls) or CSV — first sheet is used</p>
        </div>

        {parseError && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Could not read that file</AlertTitle>
            <AlertDescription>{parseError}</AlertDescription>
          </Alert>
        )}

        <p className="text-xs text-muted-foreground">
          The first row must be your column headers. Phone numbers can be in any format — Colitrack converts
          <code className="mx-1 text-[11px]">0555…</code> and
          <code className="mx-1 text-[11px]">+213555…</code> to the format WhatsApp needs.
        </p>
      </div>
    )
  }

  /* -------------------------------- mapping -------------------------------- */
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <FileSpreadsheet className="h-4 w-4 shrink-0 text-emerald-600" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{sheet.fileName}</p>
            <p className="text-xs text-muted-foreground">
              {sheet.rows.length.toLocaleString()} rows · {sheet.headers.length} columns
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={onClear}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-1.5">
        <Label>Phone number column</Label>
        <Select
          value={mapping.phoneColumn || undefined}
          onValueChange={(v) => onMapping({ ...mapping, phoneColumn: v })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose the column with phone numbers" />
          </SelectTrigger>
          <SelectContent>
            {sheet.headers.map((h) => (
              <SelectItem key={h} value={h}>
                {h}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {variables && variables.total > 0 && (
        <div className="space-y-3">
          <div>
            <Label>Template values</Label>
            <p className="text-xs text-muted-foreground">
              Each placeholder is filled from a column, per recipient.
            </p>
          </div>

          {variables.header.map((v, i) => (
            <VariableRow
              key={`h-${v}`}
              label={`Header {{${v}}}`}
              headers={sheet.headers}
              value={mapping.headerColumns[i]}
              onChange={(col) => {
                const next = [...mapping.headerColumns]
                next[i] = col
                onMapping({ ...mapping, headerColumns: next })
              }}
            />
          ))}

          {variables.body.map((v, i) => (
            <VariableRow
              key={`b-${v}`}
              label={`Body {{${v}}}`}
              headers={sheet.headers}
              value={mapping.bodyColumns[i]}
              onChange={(col) => {
                const next = [...mapping.bodyColumns]
                next[i] = col
                onMapping({ ...mapping, bodyColumns: next })
              }}
            />
          ))}

          {variables.buttons.map((button, i) => (
            <VariableRow
              key={`btn-${button.buttonIndex}`}
              label={`Button "${button.label}"`}
              headers={sheet.headers}
              value={mapping.buttonColumns[i]}
              onChange={(col) => {
                const next = [...mapping.buttonColumns]
                next[i] = col
                onMapping({ ...mapping, buttonColumns: next })
              }}
            />
          ))}
        </div>
      )}

      {summary && mapping.phoneColumn && (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Rows in file" value={summary.totalRows} />
            <Stat label="Will be sent" value={summary.recipients.length} tone="success" />
            <Stat label="Duplicates removed" value={summary.duplicatesRemoved} />
            <Stat label="Problem rows" value={summary.invalid.length} tone={summary.invalid.length ? "danger" : undefined} />
          </div>

          {summary.invalid.length > 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>
                {summary.invalid.length.toLocaleString()} row
                {summary.invalid.length === 1 ? "" : "s"} will be skipped
              </AlertTitle>
              <AlertDescription className="space-y-3">
                <p className="text-sm">
                  These have an unusable phone number or a blank template value. The campaign will still send to
                  everyone else.
                </p>

                <div className="max-h-40 overflow-y-auto rounded-md border bg-background">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="h-8">Row</TableHead>
                        <TableHead className="h-8">Value in file</TableHead>
                        <TableHead className="h-8">Problem</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {summary.invalid.slice(0, 50).map((r) => (
                        <TableRow key={r.rowNumber}>
                          <TableCell className="py-1.5 text-xs">{r.rowNumber}</TableCell>
                          <TableCell className="py-1.5 font-mono text-xs">{r.rawPhone || "—"}</TableCell>
                          <TableCell className="py-1.5 text-xs text-muted-foreground">{r.issue}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <Button variant="outline" size="sm" onClick={downloadInvalid} className="gap-2">
                  <Download className="h-3.5 w-3.5" /> Download rows to fix
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {summary.recipients.length > 0 && (
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">First few recipients</Label>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="h-8">In your file</TableHead>
                      <TableHead className="h-8">Will send to</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {summary.recipients.slice(0, 5).map((r) => (
                      <TableRow key={r.rowNumber}>
                        <TableCell className="py-1.5 font-mono text-xs text-muted-foreground">{r.rawPhone}</TableCell>
                        <TableCell className="py-1.5 font-mono text-xs">{formatForDisplay(r.phone)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function VariableRow({
  label,
  headers,
  value,
  onChange,
}: {
  label: string
  headers: string[]
  value?: string
  onChange: (column: string) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-32 shrink-0 font-mono text-xs text-muted-foreground">{label}</span>
      <Select value={value || undefined} onValueChange={onChange}>
        <SelectTrigger className="h-8 flex-1">
          <SelectValue placeholder="Choose a column" />
        </SelectTrigger>
        <SelectContent>
          {headers.map((h) => (
            <SelectItem key={h} value={h}>
              {h}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone?: "success" | "danger"
}) {
  return (
    <div className="rounded-lg border p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        className={cn(
          "mt-0.5 text-xl font-bold tabular-nums",
          tone === "success" && "text-emerald-600 dark:text-emerald-400",
          tone === "danger" && "text-red-600 dark:text-red-400",
        )}
      >
        {value.toLocaleString()}
      </p>
    </div>
  )
}
