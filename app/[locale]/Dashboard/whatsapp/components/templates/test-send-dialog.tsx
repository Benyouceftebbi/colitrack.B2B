"use client"

import * as React from "react"
import { AlertCircle, ImageIcon, Loader2, Send } from "lucide-react"

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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

import { useWhatsAppSend } from "../../hooks/use-whatsapp-send"
import {
  getBodyText,
  getMediaHeaderFormat,
  getTemplateVariables,
  normaliseWhatsAppPhone,
} from "../../lib/template-variables"
import type { TemplateComponent, WhatsAppTemplate } from "../../types"
import { TemplatePreview } from "./template-preview"

interface TestSendDialogProps {
  template: WhatsAppTemplate | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TestSendDialog({ template, open, onOpenChange }: TestSendDialogProps) {
  const { sendTemplate, sending } = useWhatsAppSend()

  const [phone, setPhone] = React.useState("")
  const [headerValues, setHeaderValues] = React.useState<string[]>([])
  const [bodyValues, setBodyValues] = React.useState<string[]>([])
  const [buttonValues, setButtonValues] = React.useState<string[]>([])
  const [errors, setErrors] = React.useState<string[]>([])

  const variables = React.useMemo(
    () => (template ? getTemplateVariables(template) : null),
    [template],
  )
  const mediaHeader = template ? getMediaHeaderFormat(template) : null

  // Reset on every open so one test never leaks values into the next.
  React.useEffect(() => {
    if (!open) return
    setPhone("")
    setHeaderValues([])
    setBodyValues([])
    setButtonValues([])
    setErrors([])
  }, [open, template?.id])

  /** Feeds the entered values into the preview's example slots. */
  const previewComponents: TemplateComponent[] = React.useMemo(() => {
    if (!template) return []
    return template.components.map((component) => {
      if (component.type === "HEADER" && component.format === "TEXT") {
        return { ...component, example: { header_text: headerValues } }
      }
      if (component.type === "BODY") {
        return { ...component, example: { body_text: [bodyValues] } }
      }
      return component
    })
  }, [template, headerValues, bodyValues])

  const validate = () => {
    const found: string[] = []

    if (!phone.trim()) found.push("Enter the phone number to send the test to.")
    else if (!normaliseWhatsAppPhone(phone))
      found.push("That does not look like a valid international number. Include the country code.")

    variables?.header.forEach((_, i) => {
      if (!headerValues[i]?.trim()) found.push(`Fill the header variable {{${i + 1}}}.`)
    })
    variables?.body.forEach((_, i) => {
      if (!bodyValues[i]?.trim()) found.push(`Fill the body variable {{${i + 1}}}.`)
    })
    variables?.buttons.forEach((button, i) => {
      if (!buttonValues[i]?.trim()) found.push(`Fill the URL value for the "${button.label}" button.`)
    })

    return found
  }

  const handleSend = async () => {
    if (!template) return

    const found = validate()
    setErrors(found)
    if (found.length) return

    const result = await sendTemplate({
      to: normaliseWhatsAppPhone(phone) as string,
      templateName: template.name,
      templateLanguage: template.language,
      headerParameters: variables?.header.map((_, i) => headerValues[i]) ?? [],
      bodyParameters: variables?.body.map((_, i) => bodyValues[i]) ?? [],
      buttonParameters:
        variables?.buttons.map((button, i) => ({
          subType: "url",
          index: button.buttonIndex,
          text: buttonValues[i],
        })) ?? [],
      bodyText: getBodyText(template),
      isTest: true,
    })

    if (result) onOpenChange(false)
  }

  const notApproved = template && template.status !== "APPROVED"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-3xl overflow-hidden p-0">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle>Send a test</DialogTitle>
          <DialogDescription>
            Sends &quot;{template?.name}&quot; to one number. It appears in Messages tagged as a test, with the same
            delivery tracking as a real send.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[62vh]">
          <div className="space-y-5 px-6 py-5">
            {notApproved && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>This template is not approved</AlertTitle>
                <AlertDescription>
                  Meta only delivers approved templates. This send will be rejected while the status is{" "}
                  {template?.status}.
                </AlertDescription>
              </Alert>
            )}

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

            <div className="space-y-1.5">
              <Label htmlFor="test-phone">Recipient phone number</Label>
              <Input
                id="test-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="213555001122"
                inputMode="tel"
                autoComplete="off"
              />
              <p className="text-xs text-muted-foreground">
                Full international format with the country code, no leading zero. Spaces and{" "}
                <code className="text-[11px]">+</code> are fine — they are stripped automatically.
              </p>
            </div>

            {variables && variables.total > 0 && (
              <>
                <Separator />
                <div className="space-y-3">
                  <div>
                    <Label>Template values</Label>
                    <p className="text-xs text-muted-foreground">
                      Every placeholder must be filled — Meta rejects a send whose value count does not match the
                      approved template.
                    </p>
                  </div>

                  {variables.header.length > 0 && (
                    <div className="space-y-2 rounded-lg border bg-muted/30 p-3">
                      <p className="text-xs font-medium">Header</p>
                      {variables.header.map((v, i) => (
                        <div key={`h-${v}`} className="flex items-center gap-2">
                          <span className="w-12 shrink-0 font-mono text-xs text-muted-foreground">{`{{${v}}}`}</span>
                          <Input
                            className="h-8"
                            value={headerValues[i] ?? ""}
                            onChange={(e) => {
                              const next = [...headerValues]
                              next[i] = e.target.value
                              setHeaderValues(next)
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {variables.body.length > 0 && (
                    <div className="space-y-2 rounded-lg border bg-muted/30 p-3">
                      <p className="text-xs font-medium">Body</p>
                      {variables.body.map((v, i) => (
                        <div key={`b-${v}`} className="flex items-center gap-2">
                          <span className="w-12 shrink-0 font-mono text-xs text-muted-foreground">{`{{${v}}}`}</span>
                          <Input
                            className="h-8"
                            value={bodyValues[i] ?? ""}
                            onChange={(e) => {
                              const next = [...bodyValues]
                              next[i] = e.target.value
                              setBodyValues(next)
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {variables.buttons.length > 0 && (
                    <div className="space-y-2 rounded-lg border bg-muted/30 p-3">
                      <p className="text-xs font-medium">Button links</p>
                      {variables.buttons.map((button, i) => (
                        <div key={`btn-${button.buttonIndex}`} className="space-y-1">
                          <p className="text-xs text-muted-foreground">
                            {button.label} — <span className="font-mono">{button.url}</span>
                          </p>
                          <Input
                            className="h-8"
                            placeholder="Value replacing the {{1}} in the URL"
                            value={buttonValues[i] ?? ""}
                            onChange={(e) => {
                              const next = [...buttonValues]
                              next[i] = e.target.value
                              setButtonValues(next)
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {mediaHeader && (
              <Alert>
                <ImageIcon className="h-4 w-4" />
                <AlertTitle>This template has a {mediaHeader.toLowerCase()} header</AlertTitle>
                <AlertDescription>
                  Test sends do not attach media, so the header will be missing from the message you receive. The text
                  and buttons still send normally.
                </AlertDescription>
              </Alert>
            )}

            <Separator />

            <div className="space-y-2">
              <Label>Preview</Label>
              <TemplatePreview components={previewComponents} />
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="border-t px-6 py-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={sending}>
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={sending} className="gap-2">
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Send test
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
