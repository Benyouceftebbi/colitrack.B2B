"use client"

import { useState, type ReactNode } from "react"
import { useLocale, useTranslations } from "next-intl"
import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  Check,
  Copy,
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
    <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950" dir="ltr">
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-3 py-1.5">
        <span className="font-mono text-xs text-zinc-400">{label}</span>
        <CopyButton value={code} className="text-zinc-300 hover:bg-zinc-800 hover:text-white" />
      </div>
      <pre className="overflow-x-auto p-4 text-left text-xs leading-relaxed text-zinc-100 sm:text-sm">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function CodeTabs({ items }: { items: Array<{ id: string; label: string; code: string }> }) {
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

function Endpoint({ method, path }: { method: "GET" | "POST"; path: string }) {
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
      <span className="hidden truncate text-xs text-muted-foreground sm:inline">
        {SMS_API_BASE_URL}
        {path}
      </span>
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
    <div className="overflow-x-auto rounded-lg border">
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

export default function ApiDocumentation() {
  const t = useTranslations("settings.apiDocs")
  const dir = useLocale() === "ar" ? "rtl" : "ltr"

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
    <Card className="border dark:border-border" dir={dir}>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="space-y-1.5">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              {t("title")}
            </CardTitle>
            <CardDescription>{t("description")}</CardDescription>
          </div>
          <span className="rounded-full border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            {t("version", { version: API_VERSION })}
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="overview" dir={dir}>
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
            <TabsTrigger value="overview" className="gap-1.5">
              <Globe className="h-3.5 w-3.5" />
              {t("tabs.overview")}
            </TabsTrigger>
            <TabsTrigger value="send" className="gap-1.5">
              <Send className="h-3.5 w-3.5" />
              {t("tabs.send")}
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
          <TabsContent value="overview" className="mt-6 space-y-6">
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
          <TabsContent value="send" className="mt-6 space-y-6">
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

          {/* GET /balance */}
          <TabsContent value="balance" className="mt-6 space-y-6">
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
          <TabsContent value="report" className="mt-6 space-y-6">
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
          <TabsContent value="errors" className="mt-6 space-y-6">
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
          <TabsContent value="bestPractices" className="mt-6 space-y-6">
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
  )
}
