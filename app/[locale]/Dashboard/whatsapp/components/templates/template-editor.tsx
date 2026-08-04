"use client"

import * as React from "react"
import { AlertCircle, Info, Loader2, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

import { TEMPLATE_CATEGORIES, TEMPLATE_LANGUAGES } from "../../lib/constants"
import type {
  TemplateButton,
  TemplateCategory,
  TemplateComponent,
  TemplateDraft,
  TemplateHeaderFormat,
  WhatsAppTemplate,
} from "../../types"
import { TemplatePreview } from "./template-preview"

const MAX_BODY = 1024
const MAX_HEADER = 60
const MAX_FOOTER = 60
const MAX_BUTTONS = 3

type HeaderMode = "NONE" | TemplateHeaderFormat

interface EditorState {
  name: string
  language: string
  category: TemplateCategory
  headerMode: HeaderMode
  headerText: string
  headerExample: string
  body: string
  bodyExamples: string[]
  footer: string
  buttons: TemplateButton[]
}

const EMPTY: EditorState = {
  name: "",
  language: "ar",
  category: "UTILITY",
  headerMode: "NONE",
  headerText: "",
  headerExample: "",
  body: "",
  bodyExamples: [],
  footer: "",
  buttons: [],
}

/** {{1}}, {{2}}… in order of first appearance. */
const countVariables = (text: string) => {
  const found = new Set<number>()
  for (const match of text.matchAll(/\{\{(\d+)\}\}/g)) found.add(Number(match[1]))
  return Array.from(found).sort((a, b) => a - b)
}

function templateToState(template: WhatsAppTemplate): EditorState {
  const header = template.components.find((c) => c.type === "HEADER")
  const body = template.components.find((c) => c.type === "BODY")
  const footer = template.components.find((c) => c.type === "FOOTER")
  const buttons = template.components.find((c) => c.type === "BUTTONS")

  return {
    name: template.name,
    language: template.language,
    category: template.category,
    headerMode: (header?.format as HeaderMode) ?? "NONE",
    headerText: header?.text ?? "",
    headerExample: header?.example?.header_text?.[0] ?? "",
    body: body?.text ?? "",
    bodyExamples: body?.example?.body_text?.[0] ?? [],
    footer: footer?.text ?? "",
    buttons: buttons?.buttons ?? [],
  }
}

/** Builds the exact `components` array the Graph API expects. */
function stateToComponents(state: EditorState): TemplateComponent[] {
  const components: TemplateComponent[] = []

  if (state.headerMode === "TEXT" && state.headerText.trim()) {
    const header: TemplateComponent = { type: "HEADER", format: "TEXT", text: state.headerText.trim() }
    if (countVariables(state.headerText).length > 0) {
      header.example = { header_text: [state.headerExample] }
    }
    components.push(header)
  } else if (state.headerMode !== "NONE" && state.headerMode !== "TEXT") {
    // Media headers need a resumable-upload handle, which the Cloud Function
    // attaches; we only declare the format here.
    components.push({ type: "HEADER", format: state.headerMode })
  }

  const bodyVars = countVariables(state.body)
  const body: TemplateComponent = { type: "BODY", text: state.body.trim() }
  if (bodyVars.length > 0) {
    body.example = { body_text: [bodyVars.map((_, i) => state.bodyExamples[i] || "")] }
  }
  components.push(body)

  if (state.footer.trim()) components.push({ type: "FOOTER", text: state.footer.trim() })

  if (state.buttons.length > 0) {
    components.push({
      type: "BUTTONS",
      buttons: state.buttons.map((b) => {
        if (b.type === "URL") return { type: "URL", text: b.text, url: b.url }
        if (b.type === "PHONE_NUMBER") return { type: "PHONE_NUMBER", text: b.text, phone_number: b.phone_number }
        return { type: "QUICK_REPLY", text: b.text }
      }),
    })
  }

  return components
}

function validate(state: EditorState, isEdit: boolean): string[] {
  const errors: string[] = []

  if (!isEdit) {
    if (!state.name.trim()) errors.push("Give the template a name.")
    else if (!/^[a-z0-9_]{1,512}$/.test(state.name))
      errors.push("The name may only contain lowercase letters, numbers and underscores.")
  }

  if (!state.body.trim()) errors.push("The message body cannot be empty.")
  if (state.body.length > MAX_BODY) errors.push(`The body is limited to ${MAX_BODY} characters.`)

  const bodyVars = countVariables(state.body)
  // Meta rejects non-sequential variables outright.
  if (bodyVars.some((v, i) => v !== i + 1))
    errors.push("Body variables must start at {{1}} and run in order with no gaps.")
  if (bodyVars.some((_, i) => !state.bodyExamples[i]?.trim()))
    errors.push("Every variable needs an example value — Meta rejects templates without them.")

  if (state.headerMode === "TEXT") {
    if (!state.headerText.trim()) errors.push("The header text cannot be empty.")
    if (state.headerText.length > MAX_HEADER) errors.push(`The header is limited to ${MAX_HEADER} characters.`)
    const headerVars = countVariables(state.headerText)
    if (headerVars.length > 1) errors.push("A header can contain at most one variable.")
    if (headerVars.length === 1 && !state.headerExample.trim())
      errors.push("The header variable needs an example value.")
  }

  if (state.footer.length > MAX_FOOTER) errors.push(`The footer is limited to ${MAX_FOOTER} characters.`)

  state.buttons.forEach((b, i) => {
    if (!b.text?.trim()) errors.push(`Button ${i + 1} needs a label.`)
    if (b.type === "URL" && !b.url?.trim()) errors.push(`Button ${i + 1} needs a URL.`)
    if (b.type === "PHONE_NUMBER" && !b.phone_number?.trim())
      errors.push(`Button ${i + 1} needs a phone number in international format.`)
  })

  return errors
}

interface TemplateEditorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Present when editing; absent when creating. */
  template?: WhatsAppTemplate | null
  onSubmit: (draft: TemplateDraft, templateId?: string) => Promise<boolean>
  submitting?: boolean
}

export function TemplateEditor({ open, onOpenChange, template, onSubmit, submitting }: TemplateEditorProps) {
  const isEdit = Boolean(template)
  const [state, setState] = React.useState<EditorState>(EMPTY)
  const [errors, setErrors] = React.useState<string[]>([])

  React.useEffect(() => {
    if (!open) return
    setState(template ? templateToState(template) : EMPTY)
    setErrors([])
  }, [open, template])

  const patch = (partial: Partial<EditorState>) => setState((s) => ({ ...s, ...partial }))

  const bodyVars = countVariables(state.body)
  const components = React.useMemo(() => stateToComponents(state), [state])

  const addVariable = () => {
    const next = bodyVars.length + 1
    patch({ body: `${state.body}{{${next}}}` })
  }

  const updateButton = (index: number, partial: Partial<TemplateButton>) =>
    patch({ buttons: state.buttons.map((b, i) => (i === index ? { ...b, ...partial } : b)) })

  const handleSubmit = async () => {
    const found = validate(state, isEdit)
    setErrors(found)
    if (found.length) return

    const draft: TemplateDraft = {
      name: state.name,
      language: state.language,
      category: state.category,
      components: stateToComponents(state),
    }

    const ok = await onSubmit(draft, template?.id)
    if (ok) onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-5xl overflow-hidden p-0">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle>{isEdit ? `Edit "${template?.name}"` : "New template"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Editing sends the template back to Meta for review. The name and language cannot be changed."
              : "Templates are reviewed by Meta before you can send them — usually within minutes."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid max-h-[70vh] grid-cols-1 overflow-hidden lg:grid-cols-[1fr_340px]">
          <ScrollArea className="max-h-[70vh]">
            <div className="space-y-5 px-6 py-5">
              {errors.length > 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <ul className="list-disc space-y-0.5 pl-4 text-sm">
                      {errors.map((e) => (
                        <li key={e}>{e}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {/* identity */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="tpl-name">Name</Label>
                  <Input
                    id="tpl-name"
                    value={state.name}
                    disabled={isEdit}
                    placeholder="order_shipped_update"
                    onChange={(e) => patch({ name: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "_") })}
                  />
                  <p className="text-xs text-muted-foreground">Lowercase, numbers and underscores only.</p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="tpl-lang">Language</Label>
                  <Select
                    value={state.language}
                    onValueChange={(v) => patch({ language: v })}
                    disabled={isEdit}
                  >
                    <SelectTrigger id="tpl-lang">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TEMPLATE_LANGUAGES.map((l) => (
                        <SelectItem key={l.value} value={l.value}>
                          {l.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="tpl-category">Category</Label>
                <Select value={state.category} onValueChange={(v) => patch({ category: v as TemplateCategory })}>
                  <SelectTrigger id="tpl-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TEMPLATE_CATEGORIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {TEMPLATE_CATEGORIES.find((c) => c.value === state.category)?.hint}
                </p>
              </div>

              <Separator />

              {/* header */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Header (optional)</Label>
                  <Select value={state.headerMode} onValueChange={(v) => patch({ headerMode: v as HeaderMode })}>
                    <SelectTrigger className="h-8 w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NONE">None</SelectItem>
                      <SelectItem value="TEXT">Text</SelectItem>
                      <SelectItem value="IMAGE">Image</SelectItem>
                      <SelectItem value="VIDEO">Video</SelectItem>
                      <SelectItem value="DOCUMENT">Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {state.headerMode === "TEXT" && (
                  <div className="space-y-2">
                    <Input
                      value={state.headerText}
                      maxLength={MAX_HEADER}
                      placeholder="Your order is on its way"
                      onChange={(e) => patch({ headerText: e.target.value })}
                    />
                    {countVariables(state.headerText).length === 1 && (
                      <Input
                        value={state.headerExample}
                        placeholder="Example value for {{1}}"
                        onChange={(e) => patch({ headerExample: e.target.value })}
                      />
                    )}
                  </div>
                )}

                {state.headerMode !== "NONE" && state.headerMode !== "TEXT" && (
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      You supply the actual {state.headerMode.toLowerCase()} when you send the message. Meta only needs
                      to know the header type at approval time.
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <Separator />

              {/* body */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="tpl-body">Body</Label>
                  <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs" onClick={addVariable}>
                    <Plus className="h-3 w-3" /> Add variable
                  </Button>
                </div>
                <Textarea
                  id="tpl-body"
                  value={state.body}
                  maxLength={MAX_BODY}
                  rows={5}
                  placeholder="Hello {{1}}, your order {{2}} has shipped and will arrive within 48 hours."
                  onChange={(e) => patch({ body: e.target.value })}
                />
                <p className="text-right text-xs text-muted-foreground">
                  {state.body.length} / {MAX_BODY}
                </p>

                {bodyVars.length > 0 && (
                  <div className="space-y-2 rounded-lg border bg-muted/30 p-3">
                    <p className="text-xs font-medium">Example values</p>
                    <p className="text-xs text-muted-foreground">
                      Meta reviews the template with these values filled in. Use realistic samples.
                    </p>
                    {bodyVars.map((v, i) => (
                      <div key={v} className="flex items-center gap-2">
                        <span className="w-12 shrink-0 font-mono text-xs text-muted-foreground">{`{{${v}}}`}</span>
                        <Input
                          value={state.bodyExamples[i] ?? ""}
                          placeholder={i === 0 ? "Ahmed" : "CT-10245"}
                          className="h-8"
                          onChange={(e) => {
                            const next = [...state.bodyExamples]
                            next[i] = e.target.value
                            patch({ bodyExamples: next })
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              {/* footer */}
              <div className="space-y-1.5">
                <Label htmlFor="tpl-footer">Footer (optional)</Label>
                <Input
                  id="tpl-footer"
                  value={state.footer}
                  maxLength={MAX_FOOTER}
                  placeholder="Reply STOP to unsubscribe"
                  onChange={(e) => patch({ footer: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">No variables allowed in the footer.</p>
              </div>

              <Separator />

              {/* buttons */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Buttons (optional)</Label>
                    <p className="text-xs text-muted-foreground">Up to {MAX_BUTTONS} buttons.</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1"
                    disabled={state.buttons.length >= MAX_BUTTONS}
                    onClick={() => patch({ buttons: [...state.buttons, { type: "QUICK_REPLY", text: "" }] })}
                  >
                    <Plus className="h-3.5 w-3.5" /> Add
                  </Button>
                </div>

                {state.buttons.map((btn, i) => (
                  <div key={i} className="space-y-2 rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <Select
                        value={btn.type}
                        onValueChange={(v) =>
                          updateButton(i, { type: v as TemplateButton["type"], url: undefined, phone_number: undefined })
                        }
                      >
                        <SelectTrigger className="h-8 w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="QUICK_REPLY">Quick reply</SelectItem>
                          <SelectItem value="URL">Visit website</SelectItem>
                          <SelectItem value="PHONE_NUMBER">Call phone number</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        value={btn.text}
                        maxLength={25}
                        placeholder="Button label"
                        className="h-8 flex-1"
                        onChange={(e) => updateButton(i, { text: e.target.value })}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                        onClick={() => patch({ buttons: state.buttons.filter((_, idx) => idx !== i) })}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>

                    {btn.type === "URL" && (
                      <Input
                        value={btn.url ?? ""}
                        placeholder="https://colitrack.com/track/{{1}}"
                        className="h-8"
                        onChange={(e) => updateButton(i, { url: e.target.value })}
                      />
                    )}
                    {btn.type === "PHONE_NUMBER" && (
                      <Input
                        value={btn.phone_number ?? ""}
                        placeholder="+213555001122"
                        className="h-8"
                        onChange={(e) => updateButton(i, { phone_number: e.target.value })}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>

          {/* live preview */}
          <div className="hidden border-l bg-muted/20 lg:block">
            <div className="sticky top-0 space-y-3 p-5">
              <p className="text-sm font-medium">Preview</p>
              <TemplatePreview components={components} />
              <p className="text-xs text-muted-foreground">
                This is roughly what the customer sees. Variables show your example values.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="border-t px-6 py-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEdit ? "Save and resubmit" : "Submit for review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
