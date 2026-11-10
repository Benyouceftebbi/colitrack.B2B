"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { httpsCallable } from "firebase/functions"
import { useTranslations } from "next-intl"
import { KeyRound, Loader2, MessageSquare, Plus } from "lucide-react"

import { db, functions } from "@/firebase/firebase"
import { useShop } from "@/app/context/ShopContext"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { calculateMessageStats } from "../../retargeting/utils/message"

// Kept out of the message files: ICU treats braces as arguments.
const CODE_PLACEHOLDER = "{{code}}"
const SAMPLE_CODE = "482915"
const MAX_LENGTH = 480
const DEFAULT_SMS_TEMPLATE = "Votre code de vérification est {{code}}. Ne le partagez avec personne."
const NONE = "__none__"

type AuthTemplate = { name: string; language: string }
type WaState = "loading" | "ready" | "notConnected"

const choiceOf = (t: AuthTemplate) => `${t.name}::${t.language}`

/** Mirrors the server's checks so mistakes show up before Save. */
function templateError(text: string) {
  const trimmed = text.trim()
  if (!trimmed) return "errEmpty"
  if (trimmed.length > MAX_LENGTH) return "errTooLong"
  const count = trimmed.split(CODE_PLACEHOLDER).length - 1
  if (count === 0) return "errMissing"
  if (count > 1) return "errMultiple"
  if (/\{\{(?!code\}\})[^}]*\}\}/.test(trimmed)) return "errOther"
  return null
}

export default function OtpSettings() {
  const t = useTranslations("settings.otp")
  const { toast } = useToast()
  const { shopData } = useShop()
  const clientId = shopData?.id

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [smsTemplate, setSmsTemplate] = useState(DEFAULT_SMS_TEMPLATE)
  const [waChoice, setWaChoice] = useState(NONE)
  const [savedWa, setSavedWa] = useState<AuthTemplate | null>(null)
  const [templates, setTemplates] = useState<AuthTemplate[]>([])
  const [waState, setWaState] = useState<WaState>("loading")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!clientId) return
    getDoc(doc(db, "Clients", clientId))
      .then((snap) => {
        const otp = snap.data()?.otp
        if (otp?.smsTemplate) setSmsTemplate(otp.smsTemplate)
        if (otp?.whatsappTemplateName) {
          const saved = { name: otp.whatsappTemplateName, language: otp.whatsappTemplateLanguage || "" }
          setSavedWa(saved)
          setWaChoice(choiceOf(saved))
        }
      })
      .catch(() => {
        /* the defaults stay in place */
      })
  }, [clientId])

  useEffect(() => {
    if (!clientId) return
    let alive = true
    httpsCallable(functions, "whatsappListTemplates")({ clientId })
      .then((res: any) => {
        if (!alive) return
        const approved = (res?.data?.templates || [])
          .filter((tpl: any) => tpl.category === "AUTHENTICATION" && tpl.status === "APPROVED")
          .map((tpl: any) => ({ name: tpl.name, language: tpl.language }))
        setTemplates(approved)
        setWaState("ready")
      })
      .catch(() => alive && setWaState("notConnected"))
    return () => {
      alive = false
    }
  }, [clientId])

  const error = templateError(smsTemplate)
  const preview = smsTemplate.split(CODE_PLACEHOLDER).join(SAMPLE_CODE)
  const stats = useMemo(() => calculateMessageStats(preview, 160), [preview])
  const hasCode = smsTemplate.includes(CODE_PLACEHOLDER)

  // A template saved earlier that is no longer approved still shows, labelled,
  // so the screen reflects what is actually configured.
  const staleSaved = savedWa && !templates.some((tpl) => choiceOf(tpl) === choiceOf(savedWa)) ? savedWa : null

  const insertCode = () => {
    const el = textareaRef.current
    const start = el?.selectionStart ?? smsTemplate.length
    const end = el?.selectionEnd ?? smsTemplate.length
    const next = smsTemplate.slice(0, start) + CODE_PLACEHOLDER + smsTemplate.slice(end)
    setSmsTemplate(next)
    requestAnimationFrame(() => {
      el?.focus()
      const caret = start + CODE_PLACEHOLDER.length
      el?.setSelectionRange(caret, caret)
    })
  }

  const save = async () => {
    if (!clientId || error) return
    setSaving(true)
    try {
      const chosen = waChoice === NONE ? null : waChoice.split("::")
      await httpsCallable(functions, "otpSaveSettings")({
        clientId,
        smsTemplate: smsTemplate.trim(),
        whatsappTemplateName: chosen?.[0] ?? null,
        whatsappTemplateLanguage: chosen?.[1] ?? null,
      })
      setSavedWa(chosen ? { name: chosen[0], language: chosen[1] } : null)
      toast({ title: t("saved") })
    } catch (err: any) {
      toast({ title: t("saveFailed"), description: err?.message, variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card className="border dark:border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <KeyRound className="h-5 w-5 text-primary" />
          {t("title")}
        </CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* SMS */}
        <div className="space-y-2">
          <Label htmlFor="otp-sms" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            {t("smsTitle")}
          </Label>
          <p className="text-xs text-muted-foreground">{t("smsHint", { placeholder: CODE_PLACEHOLDER })}</p>

          <Textarea
            id="otp-sms"
            ref={textareaRef}
            value={smsTemplate}
            onChange={(e) => setSmsTemplate(e.target.value)}
            rows={3}
            maxLength={MAX_LENGTH + 20}
            dir="auto"
          />

          <div className="flex flex-wrap items-center justify-between gap-2">
            <Button type="button" variant="outline" size="sm" onClick={insertCode} disabled={hasCode} className="gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              {t("insertCode")} <code className="text-xs">{CODE_PLACEHOLDER}</code>
            </Button>
            <span className="text-xs text-muted-foreground">
              {t("length", { chars: stats.characterCount, count: stats.messageCount })}
            </span>
          </div>

          {error && (
            <p className="text-xs text-destructive">
              {t(error, { placeholder: CODE_PLACEHOLDER, max: MAX_LENGTH })}
            </p>
          )}
          {stats.hasUnicode && <p className="text-xs text-amber-600 dark:text-amber-400">{t("unicodeNote")}</p>}

          <div className="space-y-1.5 rounded-lg border bg-muted/30 p-3">
            <p className="text-xs font-medium text-muted-foreground">{t("preview")}</p>
            <p className="whitespace-pre-wrap break-words text-sm" dir="auto">
              {preview}
            </p>
          </div>
        </div>

        <Separator />

        {/* WhatsApp */}
        <div className="space-y-2">
          <Label>{t("waTitle")}</Label>
          <p className="text-xs text-muted-foreground">{t("waHint")}</p>

          {waState === "loading" ? (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              {t("waLoading")}
            </p>
          ) : waState === "notConnected" ? (
            <p className="rounded-lg border bg-muted/30 p-3 text-sm text-muted-foreground">{t("waNotConnected")}</p>
          ) : (
            <>
              <Select value={waChoice} onValueChange={setWaChoice}>
                <SelectTrigger className="max-w-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE}>{t("waNone")}</SelectItem>
                  {templates.map((tpl) => (
                    <SelectItem key={choiceOf(tpl)} value={choiceOf(tpl)}>
                      {tpl.name} · {tpl.language.toUpperCase()}
                    </SelectItem>
                  ))}
                  {staleSaved && (
                    <SelectItem value={choiceOf(staleSaved)} disabled>
                      {t("waStale", { name: staleSaved.name })}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              {templates.length === 0 && <p className="text-xs text-muted-foreground">{t("waEmpty")}</p>}
              {waChoice !== NONE && <p className="text-xs text-muted-foreground">{t("fallbackNote")}</p>}
            </>
          )}
        </div>

        <div className="flex justify-end">
          <Button onClick={save} disabled={saving || Boolean(error) || !clientId} className="gap-2">
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {saving ? t("saving") : t("save")}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
