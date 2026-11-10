"use client"

import { createContext, useContext, useRef, useState, type ReactNode } from "react"
import { flushSync } from "react-dom"
import { useLocale, useTranslations } from "next-intl"
import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  Check,
  Copy,
  FileDown,
  FileJson,
  Globe,
  KeyRound,
  LifeBuoy,
  Lightbulb,
  Send,
  ShieldAlert,
  Wallet,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const SMS_API_BASE_URL = "https://api2-owkdnzrr3a-uc.a.run.app"
const API_VERSION = "1.0"
const TOKEN = "YOUR_AUTH_TOKEN"
// Kept out of the message files: ICU treats braces as arguments.
const NAME_PLACEHOLDER = "{{name}}"

/** Set after the OTP service is deployed; until then the OTP tab says it isn't enabled. */
const OTP_API_BASE_URL = (process.env.NEXT_PUBLIC_OTP_API_BASE_URL || "").replace(/\/$/, "")
const OTP_BASE_FOR_EXAMPLES = OTP_API_BASE_URL || "https://YOUR_OTP_API_URL"
const SAMPLE_OTP_ID = "Xa81kQ2mZ9tRb3LcD0pF"

/** True while printing to PDF: every tab and every code sample renders at once. */
const PrintContext = createContext(false)

const snippets = {
  authHeader: `Authorization: ${TOKEN}`,
  authQuery: `${SMS_API_BASE_URL}/balance?authToken=${TOKEN}`,
  sendCurl: `curl -X POST "${SMS_API_BASE_URL}/sms/send" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: ${TOKEN}" \\
  -d '{
    "clients": [
      { "name": "Ahmed", "phoneNumber": "0550123456" },
      { "name": "Sara", "phoneNumber": "+213650987654" }
    ],
    "text": "Bonjour ${NAME_PLACEHOLDER}, votre commande est prête à être livrée.",
    "senderId": "WorldExpress",
    "type": "MARKETING"
  }'`,
  sendNode: `const res = await fetch("${SMS_API_BASE_URL}/sms/send", {
  method: "POST",
  headers: {
    "Authorization": "${TOKEN}",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    clients: [{ name: "Nadia", phoneNumber: "0560123456" }],
    text: "مرحبا ${NAME_PLACEHOLDER}، طلبيتك جاهزة للتأكيد.",
    senderId: "worldexpress",
  }),
});

const data = await res.json();
console.log(data);`,
  sendResponse: `{
  "success": true,
  "totalUsedTokens": 2,
  "results": [
    { "name": "Ahmed", "phoneNumber": "0550123456", "status": "sent", "cost": 1 },
    { "name": "Sara", "phoneNumber": "0650987654", "status": "sent", "cost": 1 }
  ]
}`,
  balanceCurl: `curl "${SMS_API_BASE_URL}/balance" \\
  -H "Authorization: ${TOKEN}"`,
  balanceResponse: `{
  "success": true,
  "balance": 500,
  "unit": "sms"
}`,
  reportCurl: `curl "${SMS_API_BASE_URL}/report" \\
  -H "Authorization: ${TOKEN}"`,
  reportResponse: `{
  "success": true,
  "report": [
    { "courier": "Ooredoo", "delivered": 230, "failed": 10, "success_rate": "95.8%" },
    { "courier": "Djezzy",  "delivered": 180, "failed": 20, "success_rate": "90.0%" },
    { "courier": "Mobilis", "delivered": 210, "failed": 15, "success_rate": "93.3%" }
  ]
}`,
  errorResponse: `{
  "reason": "Invalid authToken"
}`,
  otpSendCurl: `curl -X POST "${OTP_BASE_FOR_EXAMPLES}/otp/send" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: ${TOKEN}" \\
  -d '{
    "phoneNumber": "0550123456",
    "code": "482915",
    "channel": "whatsapp"
  }'`,
  otpSendNode: `import { randomInt } from "node:crypto";

// Generate the code on your server and keep it there with an expiry time.
const code = String(randomInt(100000, 1000000));

const res = await fetch("${OTP_BASE_FOR_EXAMPLES}/otp/send", {
  method: "POST",
  headers: {
    "Authorization": "${TOKEN}",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    phoneNumber: "0550123456",
    code,
    channel: "whatsapp", // sent by SMS if WhatsApp can't deliver
  }),
});

const data = await res.json();
if (res.status === 429) {
  // Asked again too soon: wait data.retryAfter seconds.
}`,
  otpSendResponse: `{
  "success": true,
  "otpId": "${SAMPLE_OTP_ID}",
  "channel": "whatsapp",
  "fallbackUsed": false,
  "status": "queued",
  "cost": 0
}`,
  otpCooldownResponse: `{
  "success": false,
  "error": "cooldown",
  "reason": "A code was already sent to this number less than 2 minutes ago.",
  "retryAfter": 87
}`,
  otpStatusCurl: `curl "${OTP_BASE_FOR_EXAMPLES}/otp/${SAMPLE_OTP_ID}" \\
  -H "Authorization: ${TOKEN}"`,
  otpStatusResponse: `{
  "success": true,
  "otpId": "${SAMPLE_OTP_ID}",
  "phoneNumber": "213550123456",
  "channelRequested": "whatsapp",
  "channel": "sms",
  "fallbackUsed": true,
  "status": "sent",
  "cost": 1,
  "error": null,
  "createdAt": "2026-11-09T10:00:00.000Z",
  "updatedAt": "2026-11-09T10:00:04.000Z"
}`,
  otpHistoryCurl: `curl "${OTP_BASE_FOR_EXAMPLES}/otp/history?phoneNumber=0550123456&from=2026-11-01&limit=20" \\
  -H "Authorization: ${TOKEN}"`,
  otpHistoryResponse: `{
  "success": true,
  "items": [
    {
      "otpId": "${SAMPLE_OTP_ID}",
      "phoneNumber": "213550123456",
      "channel": "sms",
      "status": "sent",
      "createdAt": "2026-11-09T10:00:00.000Z"
    }
  ],
  "nextCursor": "Lm4pQ8sT2vWx9YzA1bCd"
}`,
}

function CopyButton({ value, className }: { value: string; className?: string }) {
  const t = useTranslations("settings.apiDocs")
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={copy}
      aria-label={t("copy")}
      className={cn("h-7 gap-1.5 px-2 text-xs", className)}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? t("copied") : t("copy")}
    </Button>
  )
}

function CodeBlock({ code, label }: { code: string; label: string }) {
  return (
    <div
      className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 [-webkit-print-color-adjust:exact] [print-color-adjust:exact] print:break-inside-avoid"
      dir="ltr"
    >
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-3 py-1.5">
        <span className="font-mono text-xs text-zinc-400">{label}</span>
        <CopyButton value={code} className="text-zinc-300 hover:bg-zinc-800 hover:text-white print:hidden" />
      </div>
      <pre className="overflow-x-auto p-4 text-left text-xs leading-relaxed text-zinc-100 sm:text-sm print:overflow-visible print:whitespace-pre-wrap print:break-words">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function CodeTabs({ items }: { items: Array<{ id: string; label: string; code: string }> }) {
  const printing = useContext(PrintContext)
  // On paper there are no tabs to click, so every language is printed.
  if (printing) {
    return (
      <div className="space-y-2">
        {items.map((item) => (
          <CodeBlock key={item.id} code={item.code} label={item.label} />
        ))}
      </div>
    )
  }
  return (
    <Tabs defaultValue={items[0].id} dir="ltr">
      <TabsList className="h-8">
        {items.map((item) => (
          <TabsTrigger key={item.id} value={item.id} className="text-xs">
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((item) => (
        <TabsContent key={item.id} value={item.id} className="mt-2">
          <CodeBlock code={item.code} label={item.label} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

function Endpoint({
  method,
  path,
  baseUrl = SMS_API_BASE_URL,
}: {
  method: "GET" | "POST"
  path: string
  baseUrl?: string
}) {
  return (
    <div
      className="flex flex-wrap items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2 font-mono text-sm"
      dir="ltr"
    >
      <span
        className={cn(
          "rounded px-2 py-0.5 text-xs font-bold text-white",
          method === "POST" ? "bg-emerald-600" : "bg-sky-600",
        )}
      >
        {method}
      </span>
      <span className="font-semibold">{path}</span>
      {baseUrl && (
        <span className="hidden truncate text-xs text-muted-foreground sm:inline">
          {baseUrl}
          {path}
        </span>
      )}
    </div>
  )
}

function Section({ title, icon, children }: { title: string; icon?: ReactNode; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h4 className="flex items-center gap-2 text-sm font-semibold">
        {icon}
        {title}
      </h4>
      {children}
    </section>
  )
}

function Callout({ variant, children }: { variant: "warning" | "info"; children: ReactNode }) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-lg border p-3 text-sm",
        variant === "warning"
          ? "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200"
          : "border-sky-300 bg-sky-50 text-sky-900 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-200",
      )}
    >
      {variant === "warning" ? (
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
      ) : (
        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0" />
      )}
      <div>{children}</div>
    </div>
  )
}

function DataTable({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border print:overflow-visible">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            {headers.map((h) => (
              <th key={h} className="whitespace-nowrap px-3 py-2 text-start font-medium text-muted-foreground">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t align-top">
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Mono({ children }: { children: ReactNode }) {
  return (
    <code className="whitespace-nowrap rounded bg-muted px-1.5 py-0.5 font-mono text-xs" dir="ltr">
      {children}
    </code>
  )
}

function PrintHeading({ children }: { children: ReactNode }) {
  return <h2 className="hidden border-b pb-2 text-lg font-bold print:block">{children}</h2>
}

/**
 * Hides everything on the page except the docs for printing, and marks their
 * containers so they can grow across pages instead of clipping at one screen.
 * Returns what was marked so it can be undone.
 */
function markForPrint(root: HTMLElement) {
  const marked: Array<[Element, string]> = []
  let node: HTMLElement = root
  while (node.parentElement) {
    const parent = node.parentElement
    for (const sibling of Array.from(parent.children)) {
      if (sibling === node) continue
      sibling.setAttribute("data-print-hide", "")
      marked.push([sibling, "data-print-hide"])
    }
    parent.setAttribute("data-print-ancestor", "")
    marked.push([parent, "data-print-ancestor"])
    if (parent === document.body) break
    node = parent
  }
  return marked
}

export default function ApiDocumentation() {
  const t = useTranslations("settings.apiDocs")
  const dir = useLocale() === "ar" ? "rtl" : "ltr"
  const [printing, setPrinting] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const printAll = printing ? ({ forceMount: true } as const) : {}

  /** Prints every tab to the browser's "Save as PDF". */
  const exportPdf = () => {
    const root = rootRef.current
    if (!root) return
    const html = document.documentElement
    const wasDark = html.classList.contains("dark")
    const previousTitle = document.title
    const marked = markForPrint(root)

    let restored = false
    const restore = () => {
      if (restored) return
      restored = true
      window.removeEventListener("afterprint", restore)
      for (const [el, attr] of marked) el.removeAttribute(attr)
      if (wasDark) html.classList.add("dark")
      document.title = previousTitle
      setPrinting(false)
    }
    window.addEventListener("afterprint", restore)

    // Light colours on paper: dark-theme text without its dark background is unreadable.
    if (wasDark) html.classList.remove("dark")
    // The browser uses the page title as the PDF's default file name.
    document.title = t("pdfTitle")
    flushSync(() => setPrinting(true))
    window.print()
  }

  const requiredBadge = (required: boolean) => (
    <span
      className={cn(
        "whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium",
        required
          ? "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300"
          : "bg-muted text-muted-foreground",
      )}
    >
      {required ? t("params.required") : t("params.optional")}
    </span>
  )

  const paramHeaders = [t("params.field"), t("params.type"), t("params.status"), t("params.description")]

  return (
    <PrintContext.Provider value={printing}>
    <div ref={rootRef}>
    <Card className="border dark:border-border print:border-0 print:shadow-none" dir={dir}>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="space-y-1.5">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              {t("title")}
            </CardTitle>
            <CardDescription>{t("description")}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              {t("version", { version: API_VERSION })}
            </span>
            <Button type="button" variant="outline" size="sm" onClick={exportPdf} className="h-7 gap-1.5 text-xs print:hidden">
              <FileDown className="h-3.5 w-3.5" />
              {t("exportPdf")}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="overview" dir={dir}>
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 print:hidden">
            <TabsTrigger value="overview" className="gap-1.5">
              <Globe className="h-3.5 w-3.5" />
              {t("tabs.overview")}
            </TabsTrigger>
            <TabsTrigger value="send" className="gap-1.5">
              <Send className="h-3.5 w-3.5" />
              {t("tabs.send")}
            </TabsTrigger>
            <TabsTrigger value="otp" className="gap-1.5">
              <KeyRound className="h-3.5 w-3.5" />
              {t("tabs.otp")}
            </TabsTrigger>
            <TabsTrigger value="balance" className="gap-1.5">
              <Wallet className="h-3.5 w-3.5" />
              {t("tabs.balance")}
            </TabsTrigger>
            <TabsTrigger value="report" className="gap-1.5">
              <BarChart3 className="h-3.5 w-3.5" />
              {t("tabs.report")}
            </TabsTrigger>
            <TabsTrigger value="errors" className="gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5" />
              {t("tabs.errors")}
            </TabsTrigger>
            <TabsTrigger value="bestPractices" className="gap-1.5">
              <Lightbulb className="h-3.5 w-3.5" />
              {t("tabs.bestPractices")}
            </TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="mt-6 space-y-6" {...printAll}>
            <PrintHeading>{t("tabs.overview")}</PrintHeading>
            <p className="text-sm text-muted-foreground">{t("overview.intro")}</p>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border p-4 md:col-span-3">
                <div className="mb-1 flex items-center gap-2 text-sm font-semibold">
                  <Globe className="h-4 w-4 text-primary" />
                  {t("overview.baseUrl")}
                </div>
                <p className="mb-3 text-xs text-muted-foreground">{t("overview.baseUrlHint")}</p>
                <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-2" dir="ltr">
                  <code className="flex-1 truncate font-mono text-sm">{SMS_API_BASE_URL}</code>
                  <CopyButton value={SMS_API_BASE_URL} />
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="mb-1 flex items-center gap-2 text-sm font-semibold">
                  <KeyRound className="h-4 w-4 text-primary" />
                  {t("overview.auth")}
                </div>
                <p className="text-xs text-muted-foreground">{t("overview.authHint")}</p>
              </div>
              <div className="rounded-lg border p-4">
                <div className="mb-1 flex items-center gap-2 text-sm font-semibold">
                  <FileJson className="h-4 w-4 text-primary" />
                  {t("overview.format")}
                </div>
                <p className="text-xs text-muted-foreground">{t("overview.formatHint")}</p>
              </div>
              <div className="rounded-lg border p-4">
                <div className="mb-1 flex items-center gap-2 text-sm font-semibold">
                  <Send className="h-4 w-4 text-primary" />
                  {t("overview.languages")}
                </div>
                <p className="text-xs text-muted-foreground">{t("overview.languagesHint")}</p>
              </div>
            </div>

            <Section title={t("overview.authTitle")} icon={<KeyRound className="h-4 w-4" />}>
              <p className="text-sm text-muted-foreground">{t("overview.authDescription")}</p>
              <div className="grid gap-3 lg:grid-cols-2">
                <CodeBlock code={snippets.authHeader} label={t("overview.authHeader")} />
                <CodeBlock code={snippets.authQuery} label={t("overview.authQuery")} />
              </div>
              <Callout variant="warning">{t("overview.authWarning")}</Callout>
            </Section>

            <Section title={t("overview.flowTitle")}>
              <ol className="space-y-2">
                {(["flow1", "flow2", "flow3", "flow4", "flow5"] as const).map((key, i) => (
                  <li key={key} className="flex items-start gap-3 text-sm">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{t(`overview.${key}`)}</span>
                  </li>
                ))}
              </ol>
            </Section>
          </TabsContent>

          {/* POST /sms/send */}
          <TabsContent value="send" className="mt-6 space-y-6 print:break-before-page" {...printAll}>
            <PrintHeading>{t("tabs.send")}</PrintHeading>
            <Endpoint method="POST" path="/sms/send" />
            <div className="space-y-1">
              <p className="text-sm font-medium">{t("send.summary")}</p>
              <p className="text-sm text-muted-foreground">{t("send.description")}</p>
            </div>

            <Section title={t("params.title")}>
              <DataTable
                headers={paramHeaders}
                rows={[
                  [<Mono key="f">clients</Mono>, <Mono key="t">object | array</Mono>, requiredBadge(true), t("send.clients")],
                  [<Mono key="f">clients[].phoneNumber</Mono>, <Mono key="t">string</Mono>, requiredBadge(true), t("send.phoneNumber")],
                  [<Mono key="f">clients[].name</Mono>, <Mono key="t">string</Mono>, requiredBadge(false), t("send.name")],
                  [<Mono key="f">text</Mono>, <Mono key="t">string</Mono>, requiredBadge(true), t("send.text", { placeholder: NAME_PLACEHOLDER })],
                  [<Mono key="f">senderId</Mono>, <Mono key="t">string</Mono>, requiredBadge(false), t("send.senderId")],
                  [<Mono key="f">type</Mono>, <Mono key="t">string</Mono>, requiredBadge(false), t("send.type")],
                  [<Mono key="f">authToken</Mono>, <Mono key="t">string</Mono>, requiredBadge(false), t("send.authToken")],
                ]}
              />
            </Section>

            <Section title={t("params.requestExample")}>
              <CodeTabs
                items={[
                  { id: "send-curl", label: "cURL", code: snippets.sendCurl },
                  { id: "send-node", label: "Node.js", code: snippets.sendNode },
                ]}
              />
            </Section>

            <Section title={t("params.response")}>
              <CodeBlock code={snippets.sendResponse} label="200 OK · application/json" />
              <Callout variant="info">{t("send.costNote")}</Callout>
            </Section>
          </TabsContent>

          {/* Verification codes (OTP) */}
          <TabsContent value="otp" className="mt-6 space-y-8 print:break-before-page" {...printAll}>
            <PrintHeading>{t("tabs.otp")}</PrintHeading>

            {OTP_API_BASE_URL ? (
              <Section title={t("otp.baseUrl")}>
                <CodeBlock code={OTP_API_BASE_URL} label="Base URL" />
              </Section>
            ) : (
              <Callout variant="warning">{t("otp.notConfigured")}</Callout>
            )}
            <Callout variant="warning">{t("otp.serverOnly")}</Callout>

            {/* POST /otp/send */}
            <div className="space-y-6">
              <Endpoint method="POST" path="/otp/send" baseUrl={OTP_API_BASE_URL} />
              <div className="space-y-1">
                <p className="text-sm font-medium">{t("otp.sendSummary")}</p>
                <p className="text-sm text-muted-foreground">{t("otp.sendDescription")}</p>
              </div>

              <Section title={t("otp.howTitle")}>
                <ol className="list-decimal space-y-1.5 ps-5 text-sm">
                  {(["how1", "how2", "how3", "how4"] as const).map((key) => (
                    <li key={key}>{t(`otp.${key}`)}</li>
                  ))}
                </ol>
              </Section>

              <Section title={t("otp.rulesTitle")}>
                <ul className="space-y-2">
                  {(["ruleCooldown", "ruleLimits", "ruleFallback", "rulePrivacy", "ruleSetup"] as const).map((key) => (
                    <li key={key} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{t(`otp.${key}`)}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title={t("params.title")}>
                <DataTable
                  headers={paramHeaders}
                  rows={[
                    [<Mono key="f">phoneNumber</Mono>, <Mono key="t">string</Mono>, requiredBadge(true), t("otp.phoneNumber")],
                    [<Mono key="f">code</Mono>, <Mono key="t">string</Mono>, requiredBadge(true), t("otp.code")],
                    [<Mono key="f">channel</Mono>, <Mono key="t">string</Mono>, requiredBadge(false), t("otp.channel")],
                    [<Mono key="f">fallback</Mono>, <Mono key="t">boolean</Mono>, requiredBadge(false), t("otp.fallback")],
                  ]}
                />
              </Section>

              <Section title={t("params.requestExample")}>
                <CodeTabs
                  items={[
                    { id: "otp-curl", label: "cURL", code: snippets.otpSendCurl },
                    { id: "otp-node", label: "Node.js", code: snippets.otpSendNode },
                  ]}
                />
              </Section>

              <Section title={t("params.response")}>
                <CodeBlock code={snippets.otpSendResponse} label="200 OK · application/json" />
                <Callout variant="info">{t("otp.costNote")}</Callout>
              </Section>

              <Section title={t("otp.tooSoonTitle")}>
                <CodeBlock code={snippets.otpCooldownResponse} label="429 Too Many Requests · application/json" />
              </Section>
            </div>

            {/* GET /otp/{otpId} */}
            <div className="space-y-6 border-t pt-8">
              <Endpoint method="GET" path="/otp/{otpId}" baseUrl={OTP_API_BASE_URL} />
              <div className="space-y-1">
                <p className="text-sm font-medium">{t("otp.statusSummary")}</p>
                <p className="text-sm text-muted-foreground">{t("otp.statusDescription")}</p>
              </div>

              <Section title={t("otp.statusValues")}>
                <DataTable
                  headers={[t("otp.statusColumn"), t("params.description")]}
                  rows={(
                    [
                      ["queued", "sQueued"],
                      ["sent", "sSent"],
                      ["delivered", "sDelivered"],
                      ["read", "sRead"],
                      ["failed", "sFailed"],
                    ] as const
                  ).map(([value, key]) => [<Mono key="s">{value}</Mono>, t(`otp.${key}`)])}
                />
                <Callout variant="info">{t("otp.smsNote")}</Callout>
              </Section>

              <Section title={t("params.requestExample")}>
                <CodeBlock code={snippets.otpStatusCurl} label="cURL" />
              </Section>
              <Section title={t("params.response")}>
                <CodeBlock code={snippets.otpStatusResponse} label="200 OK · application/json" />
              </Section>
            </div>

            {/* GET /otp/history */}
            <div className="space-y-6 border-t pt-8">
              <Endpoint method="GET" path="/otp/history" baseUrl={OTP_API_BASE_URL} />
              <div className="space-y-1">
                <p className="text-sm font-medium">{t("otp.historySummary")}</p>
                <p className="text-sm text-muted-foreground">{t("otp.historyDescription")}</p>
              </div>

              <Section title={t("otp.queryParams")}>
                <DataTable
                  headers={paramHeaders}
                  rows={[
                    [<Mono key="f">phoneNumber</Mono>, <Mono key="t">string</Mono>, requiredBadge(false), t("otp.hPhone")],
                    [<Mono key="f">channel</Mono>, <Mono key="t">string</Mono>, requiredBadge(false), t("otp.hChannel")],
                    [<Mono key="f">status</Mono>, <Mono key="t">string</Mono>, requiredBadge(false), t("otp.hStatus")],
                    [<Mono key="f">from</Mono>, <Mono key="t">date</Mono>, requiredBadge(false), t("otp.hFrom")],
                    [<Mono key="f">to</Mono>, <Mono key="t">date</Mono>, requiredBadge(false), t("otp.hTo")],
                    [<Mono key="f">limit</Mono>, <Mono key="t">number</Mono>, requiredBadge(false), t("otp.hLimit")],
                    [<Mono key="f">cursor</Mono>, <Mono key="t">string</Mono>, requiredBadge(false), t("otp.hCursor")],
                  ]}
                />
                <Callout variant="info">{t("otp.pageNote")}</Callout>
              </Section>

              <Section title={t("params.requestExample")}>
                <CodeBlock code={snippets.otpHistoryCurl} label="cURL" />
              </Section>
              <Section title={t("params.response")}>
                <CodeBlock code={snippets.otpHistoryResponse} label="200 OK · application/json" />
              </Section>
            </div>

            {/* OTP errors */}
            <div className="space-y-4 border-t pt-8">
              <Section title={t("otp.errorsTitle")}>
                <p className="text-sm text-muted-foreground">{t("otp.errorsIntro")}</p>
                <DataTable
                  headers={[t("errors.status"), t("errors.meaning")]}
                  rows={(["400", "402", "404", "405", "422", "429", "502"] as const).map((code) => [
                    <span
                      key="c"
                      className={cn(
                        "rounded px-2 py-0.5 font-mono text-xs font-bold",
                        code === "502"
                          ? "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
                      )}
                    >
                      {code}
                    </span>,
                    t(`otp.e${code}`),
                  ])}
                />
              </Section>
            </div>
          </TabsContent>

          {/* GET /balance */}
          <TabsContent value="balance" className="mt-6 space-y-6 print:break-before-page" {...printAll}>
            <PrintHeading>{t("tabs.balance")}</PrintHeading>
            <Endpoint method="GET" path="/balance" />
            <div className="space-y-1">
              <p className="text-sm font-medium">{t("balance.summary")}</p>
              <p className="text-sm text-muted-foreground">{t("balance.description")}</p>
            </div>
            <Section title={t("params.requestExample")}>
              <CodeBlock code={snippets.balanceCurl} label="cURL" />
            </Section>
            <Section title={t("params.response")}>
              <CodeBlock code={snippets.balanceResponse} label="200 OK · application/json" />
            </Section>
          </TabsContent>

          {/* GET /report */}
          <TabsContent value="report" className="mt-6 space-y-6 print:break-before-page" {...printAll}>
            <PrintHeading>{t("tabs.report")}</PrintHeading>
            <Endpoint method="GET" path="/report" />
            <div className="space-y-1">
              <p className="text-sm font-medium">{t("report.summary")}</p>
              <p className="text-sm text-muted-foreground">{t("report.description")}</p>
            </div>
            <Section title={t("report.operatorsTitle")}>
              <DataTable
                headers={[t("report.prefix"), t("report.operator")]}
                rows={[
                  [<Mono key="p">05</Mono>, "Ooredoo"],
                  [<Mono key="p">06</Mono>, "Djezzy"],
                  [<Mono key="p">07</Mono>, "Mobilis"],
                ]}
              />
            </Section>
            <Section title={t("params.requestExample")}>
              <CodeBlock code={snippets.reportCurl} label="cURL" />
            </Section>
            <Section title={t("params.response")}>
              <CodeBlock code={snippets.reportResponse} label="200 OK · application/json" />
            </Section>
          </TabsContent>

          {/* Errors */}
          <TabsContent value="errors" className="mt-6 space-y-6 print:break-before-page" {...printAll}>
            <PrintHeading>{t("tabs.errors")}</PrintHeading>
            <p className="text-sm text-muted-foreground">{t("errors.intro")}</p>
            <DataTable
              headers={[t("errors.status"), t("errors.meaning")]}
              rows={(["400", "401", "403", "500"] as const).map((code) => [
                <span
                  key="c"
                  className={cn(
                    "rounded px-2 py-0.5 font-mono text-xs font-bold",
                    code === "500"
                      ? "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300"
                      : "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
                  )}
                >
                  {code}
                </span>,
                t(`errors.e${code}`),
              ])}
            />
            <Section title={t("errors.exampleTitle")}>
              <CodeBlock code={snippets.errorResponse} label="403 Forbidden · application/json" />
            </Section>
          </TabsContent>

          {/* Best practices */}
          <TabsContent value="bestPractices" className="mt-6 space-y-6 print:break-before-page" {...printAll}>
            <PrintHeading>{t("tabs.bestPractices")}</PrintHeading>
            <ul className="space-y-3">
              {(["bp1", "bp2", "bp3", "bp4", "bp5", "bp6", "bp7"] as const).map((key) => (
                <li key={key} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{t(`bestPractices.${key}`, { placeholder: NAME_PLACEHOLDER })}</span>
                </li>
              ))}
            </ul>
            <div className="flex gap-3 rounded-lg border bg-muted/40 p-4">
              <LifeBuoy className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div className="space-y-1">
                <p className="text-sm font-semibold">{t("bestPractices.supportTitle")}</p>
                <p className="text-sm text-muted-foreground">{t("bestPractices.support")}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
    </div>
    </PrintContext.Provider>
  )
}
