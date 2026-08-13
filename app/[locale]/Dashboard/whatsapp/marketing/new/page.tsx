"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight, Check, Loader2, Rocket, Send, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
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
import { cn } from "@/lib/utils"
import { useRouter } from "@/i18n/routing"

import { HubGate } from "../../components/hub-gate"
import { HubHeader } from "../../components/hub-header"
import { TemplatePreview } from "../../components/templates/template-preview"
import { AudienceUpload } from "../../components/marketing/audience-upload"
import { useWhatsAppTemplates } from "../../hooks/use-whatsapp-templates"
import { useLaunchCampaign } from "../../hooks/use-campaigns"
import { useWhatsAppSend } from "../../hooks/use-whatsapp-send"
import { buildAudience, parseSheet, type AudienceSummary, type ParsedSheet } from "../../lib/audience"
import { getBodyText, getTemplateVariables, normaliseWhatsAppPhone } from "../../lib/template-variables"
import { formatForDisplay } from "../../lib/phone"
import type { ColumnMapping, TemplateComponent, WhatsAppTemplate } from "../../types"

const EMPTY_MAPPING: ColumnMapping = {
  phoneColumn: "",
  headerColumns: [],
  bodyColumns: [],
  buttonColumns: [],
}

const STEPS = ["Template", "Audience", "Review & send"] as const

function BuilderContent() {
  const router = useRouter()
  const { templates, loading: templatesLoading } = useWhatsAppTemplates()
  const { launch, launching } = useLaunchCampaign()
  const { sendTemplate, sending: sendingTest } = useWhatsAppSend()

  const [step, setStep] = React.useState(0)
  const [name, setName] = React.useState("")
  const [templateId, setTemplateId] = React.useState<string>("")
  const [sheet, setSheet] = React.useState<ParsedSheet | null>(null)
  const [mapping, setMapping] = React.useState<ColumnMapping>(EMPTY_MAPPING)
  const [parsing, setParsing] = React.useState(false)
  const [parseError, setParseError] = React.useState<string | null>(null)
  const [previewRow, setPreviewRow] = React.useState(0)
  const [testPhone, setTestPhone] = React.useState("")
  const [confirmOpen, setConfirmOpen] = React.useState(false)

  const approved = React.useMemo(() => templates.filter((t) => t.status === "APPROVED"), [templates])
  const template = React.useMemo<WhatsAppTemplate | null>(
    () => approved.find((t) => t.id === templateId) ?? null,
    [approved, templateId],
  )
  const variables = template ? getTemplateVariables(template) : null

  // Reset the variable mapping whenever the template changes — the old columns
  // refer to a different set of placeholders.
  React.useEffect(() => {
    if (!template) return
    const vars = getTemplateVariables(template)
    setMapping((m) => ({
      phoneColumn: m.phoneColumn,
      headerColumns: new Array(vars.header.length).fill(""),
      bodyColumns: new Array(vars.body.length).fill(""),
      buttonColumns: new Array(vars.buttons.length).fill(""),
    }))
  }, [template?.id])

  const handleFile = async (file: File) => {
    setParsing(true)
    setParseError(null)
    try {
      const parsed = await parseSheet(file)
      if (!parsed.headers.length) throw new Error("That file has no header row.")
      if (!parsed.rows.length) throw new Error("That file has headers but no data rows.")
      setSheet(parsed)

      // Guess the phone column so the common case needs no clicking.
      const guess = parsed.headers.find((h) => /phone|tel|mobile|gsm|num|contact/i.test(h))
      if (guess) setMapping((m) => ({ ...m, phoneColumn: guess }))
    } catch (err: any) {
      setParseError(err?.message ?? "The file could not be read.")
      setSheet(null)
    } finally {
      setParsing(false)
    }
  }

  const summary: AudienceSummary | null = React.useMemo(() => {
    if (!sheet || !mapping.phoneColumn) return null
    return buildAudience(sheet, mapping, template)
  }, [sheet, mapping, template])

  const bodyText = template ? getBodyText(template) : ""
  const sampleRow = summary?.recipients[previewRow] ?? summary?.recipients[0] ?? null

  /** Feeds the chosen row's real values into the preview bubble. */
  const previewComponents: TemplateComponent[] = React.useMemo(() => {
    if (!template) return []
    return template.components.map((component) => {
      if (component.type === "HEADER" && component.format === "TEXT") {
        return { ...component, example: { header_text: sampleRow?.headerParams ?? [] } }
      }
      if (component.type === "BODY") {
        return { ...component, example: { body_text: [sampleRow?.bodyParams ?? []] } }
      }
      return component
    })
  }, [template, sampleRow])

  const mappingComplete =
    Boolean(mapping.phoneColumn) &&
    (mapping.headerColumns.every(Boolean) &&
      mapping.bodyColumns.every(Boolean) &&
      mapping.buttonColumns.every(Boolean))

  const canContinue = step === 0 ? Boolean(template && name.trim()) : step === 1 ? mappingComplete && (summary?.recipients.length ?? 0) > 0 : true

  const handleTest = async () => {
    if (!template || !sampleRow) return
    const to = normaliseWhatsAppPhone(testPhone)
    if (!to) return

    await sendTemplate({
      to,
      templateName: template.name,
      templateLanguage: template.language,
      headerParameters: sampleRow.headerParams,
      bodyParameters: sampleRow.bodyParams,
      buttonParameters: sampleRow.buttonParams.map((text, i) => ({
        subType: "url",
        index: variables?.buttons[i]?.buttonIndex ?? i,
        text,
      })),
      bodyText,
      isTest: true,
    })
  }

  const handleLaunch = async () => {
    if (!template || !summary) return
    const result = await launch({
      name: name.trim(),
      templateName: template.name,
      templateLanguage: template.language,
      bodyText,
      recipients: summary.recipients,
    })
    setConfirmOpen(false)
    if (result?.campaignId) router.push(`/Dashboard/whatsapp/marketing/${result.campaignId}`)
  }

  return (
    <>
      <HubHeader
        title="New campaign"
        description="Send an approved template to a list of customers from a spreadsheet."
        actions={
          <Button variant="outline" onClick={() => router.push("/Dashboard/whatsapp/marketing")} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        }
      />

      {/* step indicator */}
      <div className="mb-6 flex items-center gap-2">
        {STEPS.map((label, i) => (
          <React.Fragment key={label}>
            <button
              onClick={() => i < step && setStep(i)}
              disabled={i > step}
              className={cn(
                "flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors",
                i === step && "bg-primary text-primary-foreground",
                i < step && "cursor-pointer text-muted-foreground hover:bg-muted",
                i > step && "text-muted-foreground/50",
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold",
                  i === step ? "bg-primary-foreground/20" : "bg-muted",
                )}
              >
                {i < step ? <Check className="h-3 w-3" /> : i + 1}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </button>
            {i < STEPS.length - 1 && <div className="h-px flex-1 bg-border" />}
          </React.Fragment>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <Card>
          <CardContent className="pt-6">
            {/* ---------------------------- step 1 ---------------------------- */}
            {step === 0 && (
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="campaign-name">Campaign name</Label>
                  <Input
                    id="campaign-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Soldes d'été — août 2026"
                  />
                  <p className="text-xs text-muted-foreground">Only you see this. It labels the campaign report.</p>
                </div>

                <Separator />

                <div className="space-y-1.5">
                  <Label>Template</Label>
                  {templatesLoading ? (
                    <Skeleton className="h-10 w-full" />
                  ) : approved.length === 0 ? (
                    <Alert>
                      <AlertTitle>No approved templates</AlertTitle>
                      <AlertDescription>
                        Only approved templates can start a conversation. Create one on the Templates page and wait for
                        Meta to approve it.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Select value={templateId} onValueChange={setTemplateId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an approved template" />
                      </SelectTrigger>
                      <SelectContent>
                        {approved.map((t) => (
                          <SelectItem key={t.id} value={t.id}>
                            {t.name} · {t.language.toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                {template && variables && variables.total > 0 && (
                  <Alert>
                    <AlertTitle>
                      This template has {variables.total} value{variables.total === 1 ? "" : "s"} to fill
                    </AlertTitle>
                    <AlertDescription>
                      You&apos;ll pick a spreadsheet column for each one in the next step.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {/* ---------------------------- step 2 ---------------------------- */}
            {step === 1 && (
              <AudienceUpload
                sheet={sheet}
                onFile={handleFile}
                onClear={() => {
                  setSheet(null)
                  setMapping({ ...EMPTY_MAPPING })
                }}
                mapping={mapping}
                onMapping={setMapping}
                template={template}
                summary={summary}
                parsing={parsing}
                parseError={parseError}
              />
            )}

            {/* ---------------------------- step 3 ---------------------------- */}
            {step === 2 && summary && template && (
              <div className="space-y-5">
                <div className="rounded-xl border bg-gradient-to-br from-emerald-500/5 to-transparent p-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <Users className="h-3.5 w-3.5" /> Recipients
                  </div>
                  <p className="mt-1 text-3xl font-bold tabular-nums">
                    {summary.recipients.length.toLocaleString()}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {summary.invalid.length > 0 && `${summary.invalid.length} skipped · `}
                    {summary.duplicatesRemoved > 0 && `${summary.duplicatesRemoved} duplicates removed · `}
                    template <span className="font-medium">{template.name}</span>
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Send a test first</Label>
                  <p className="text-xs text-muted-foreground">
                    Uses the values from the recipient shown in the preview. Strongly recommended — a template that
                    reads badly cannot be recalled once the campaign goes out.
                  </p>
                  <div className="flex gap-2">
                    <Input
                      value={testPhone}
                      onChange={(e) => setTestPhone(e.target.value)}
                      placeholder="213555001122"
                      inputMode="tel"
                    />
                    <Button
                      variant="outline"
                      onClick={handleTest}
                      disabled={sendingTest || !normaliseWhatsAppPhone(testPhone)}
                      className="shrink-0 gap-2"
                    >
                      {sendingTest ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      Send test
                    </Button>
                  </div>
                </div>

                <Separator />

                <Alert>
                  <Rocket className="h-4 w-4" />
                  <AlertTitle>Before you launch</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc space-y-1 pl-4 text-sm">
                      <li>Every recipient must have opted in to hear from you.</li>
                      <li>Marketing conversations are billed per recipient.</li>
                      <li>Sending cannot be undone or recalled.</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </CardContent>
        </Card>

        {/* preview rail */}
        <div className="space-y-3">
          <Card className="sticky top-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Preview</CardTitle>
              <CardDescription>
                {sampleRow
                  ? `Showing ${formatForDisplay(sampleRow.phone)}`
                  : "Upload your list to see real values"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {template ? (
                <TemplatePreview components={previewComponents} />
              ) : (
                <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                  <p className="text-sm text-muted-foreground">Choose a template</p>
                </div>
              )}

              {summary && summary.recipients.length > 1 && (
                <div className="flex items-center justify-between gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={previewRow === 0}
                    onClick={() => setPreviewRow((p) => p - 1)}
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    Recipient {previewRow + 1} of {summary.recipients.length.toLocaleString()}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={previewRow >= summary.recipients.length - 1}
                    onClick={() => setPreviewRow((p) => p + 1)}
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* navigation */}
      <div className="mt-6 flex items-center justify-between">
        <Button variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
          Back
        </Button>

        {step < STEPS.length - 1 ? (
          <Button onClick={() => setStep((s) => s + 1)} disabled={!canContinue} className="gap-2">
            Continue <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={() => setConfirmOpen(true)}
            disabled={launching || !summary?.recipients.length}
            className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
          >
            {launching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Rocket className="h-4 w-4" />}
            Send to {summary?.recipients.length.toLocaleString() ?? 0}
          </Button>
        )}
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Send this campaign?</AlertDialogTitle>
            <AlertDialogDescription>
              This sends &quot;{template?.name}&quot; to{" "}
              <span className="font-semibold text-foreground">
                {summary?.recipients.length.toLocaleString()} recipients
              </span>{" "}
              and will be billed as marketing conversations. It cannot be stopped once started.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={launching}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                void handleLaunch()
              }}
              disabled={launching}
              className="bg-emerald-600 text-white hover:bg-emerald-700"
            >
              {launching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send now
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default function NewCampaignPage() {
  return (
    <HubGate>
      <BuilderContent />
    </HubGate>
  )
}
