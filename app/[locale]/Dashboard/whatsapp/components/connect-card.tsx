"use client"

import { AlertCircle, CheckCircle2, Loader2, MessageCircle, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useWhatsApp } from "../context/whatsapp-provider"
import { useEmbeddedSignup } from "../hooks/use-embedded-signup"

const REQUIREMENTS = [
  "A Facebook account with admin access to your business.",
  "A phone number that is not currently registered on WhatsApp (or one you can migrate).",
  "Your business name and website — Meta asks for them during verification.",
]

const PHASE_LABEL: Record<string, string> = {
  "loading-sdk": "Preparing…",
  "awaiting-user": "Waiting for Facebook…",
  exchanging: "Finishing connection…",
}

/**
 * Landing state for a client with no WhatsApp account linked yet.
 * The whole Embedded Signup flow starts from the single button below.
 */
export function ConnectCard() {
  const { clientId } = useWhatsApp()
  const { launch, phase, error, isBusy, isConfigured, sdkReady, reset } = useEmbeddedSignup({ clientId })

  return (
    <div className="mx-auto w-full max-w-3xl">
      <Card className="overflow-hidden border-emerald-200/60 dark:border-emerald-500/20">
        <div className="bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent px-6 py-8 sm:px-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/25">
            <MessageCircle className="h-7 w-7" />
          </div>
          <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">Connect your WhatsApp Business account</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
            Link the WhatsApp number your customers already know. Once connected, Colitrack can send delivery updates
            and retargeting campaigns, and show you exactly what was delivered, read or failed.
          </p>
        </div>

        <CardContent className="space-y-6 pt-6">
          <div>
            <h3 className="text-sm font-semibold">Before you start</h3>
            <ul className="mt-3 space-y-2">
              {REQUIREMENTS.map((req) => (
                <li key={req} className="flex gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {!isConfigured && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Integration not configured</AlertTitle>
              <AlertDescription>
                <code className="text-xs">NEXT_PUBLIC_META_APP_ID</code> and{" "}
                <code className="text-xs">NEXT_PUBLIC_META_CONFIG_ID</code> are missing from the environment.
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Connection stopped</AlertTitle>
              <AlertDescription className="space-y-2">
                <p>{error}</p>
                <Button variant="outline" size="sm" onClick={reset}>
                  Try again
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              onClick={launch}
              disabled={!isConfigured || isBusy || !sdkReady}
              className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
            >
              {isBusy ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {PHASE_LABEL[phase] ?? "Working…"}
                </>
              ) : (
                <>
                  <MessageCircle className="h-4 w-4" />
                  Connect WhatsApp
                </>
              )}
            </Button>

            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" />
              Colitrack never sees your Facebook password. Access is granted directly by Meta and you can revoke it at
              any time.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">What happens when you connect</CardTitle>
          <CardDescription>Three steps, all handled inside the Facebook window.</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="space-y-4">
            {[
              {
                title: "Pick or create your WhatsApp Business account",
                body: "Meta shows the business portfolios you administer. Choose an existing WABA or create one.",
              },
              {
                title: "Add and verify your phone number",
                body: "You receive a code by SMS or call. The number is registered on the Cloud API automatically.",
              },
              {
                title: "Grant Colitrack permission",
                body: "We receive a permanent business token, subscribe to delivery webhooks, and pull your templates.",
              },
            ].map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-medium">{step.title}</p>
                  <p className="text-sm text-muted-foreground">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
