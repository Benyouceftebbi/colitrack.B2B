"use client"

import * as React from "react"
import { AlertCircle, ExternalLink, KeyRound, Loader2, ShieldCheck } from "lucide-react"

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

import { useWhatsAppAccount } from "../hooks/use-whatsapp-account"
import type { WhatsAppPhoneNumber } from "../types"

/** Where the business confirms ownership of the number with a code. */
const WHATSAPP_MANAGER_URL = "https://business.facebook.com/wa/manage/phone-numbers/"

/**
 * Algerian fixed lines start 02x/03x/04x after the country code. They cannot
 * receive the verification SMS, so the code has to come by voice call.
 */
const isLandline = (display?: string) => /^213[234]/.test(String(display || "").replace(/\D/g, ""))

interface RegisterNumberDialogProps {
  phone: WhatsAppPhoneNumber
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Activates a number for sending and receiving.
 *
 * Two separate steps exist on Meta's side and people routinely confuse them:
 *
 *   1. Verification — proving you own the number with a code by SMS or call.
 *      This can only happen in WhatsApp Manager; we cannot do it for them.
 *   2. Activation — switching the verified number on, protected by a 6-digit
 *      PIN. This is what this dialog does.
 *
 * So the dialog first checks which state the number is in, and only offers
 * the PIN once step 1 is done — otherwise activation fails with a confusing
 * error from Meta.
 */
export function RegisterNumberDialog({ phone, open, onOpenChange }: RegisterNumberDialogProps) {
  const { registerPhoneNumber, refresh, busy } = useWhatsAppAccount()
  const [pin, setPin] = React.useState("")
  const [confirm, setConfirm] = React.useState("")

  React.useEffect(() => {
    if (!open) {
      setPin("")
      setConfirm("")
    }
  }, [open])

  const verified = phone.codeVerificationStatus === "VERIFIED"
  const landline = isLandline(phone.displayPhoneNumber)

  const pinValid = /^\d{6}$/.test(pin)
  const matches = pin === confirm
  const canSubmit = verified && pinValid && matches && busy !== "register"

  const handleActivate = async () => {
    if (!canSubmit) return
    const ok = await registerPhoneNumber(phone.id, pin)
    if (ok) onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Activate {phone.displayPhoneNumber}</DialogTitle>
          <DialogDescription>
            Once active, this number can send notifications and receive your customers&apos; replies here.
          </DialogDescription>
        </DialogHeader>

        {!verified ? (
          /* ---------------- step 1 still outstanding: send them to Meta --------------- */
          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>First, confirm you own this number</AlertTitle>
              <AlertDescription className="space-y-2">
                <p>
                  WhatsApp needs to send a code to this number before it can be activated. This step is done on the
                  WhatsApp Business website, not here.
                </p>
                {landline && (
                  <p className="font-medium">
                    This is a fixed line, so choose <span className="underline">voice call</span> — a landline cannot
                    receive the code by SMS.
                  </p>
                )}
              </AlertDescription>
            </Alert>

            <ol className="list-decimal space-y-1.5 pl-5 text-sm text-muted-foreground">
              <li>Open WhatsApp Manager → Phone numbers.</li>
              <li>Select {phone.displayPhoneNumber} and request a verification code.</li>
              <li>Enter the code you receive.</li>
              <li>Come back here and press Check again.</li>
            </ol>

            <Button asChild variant="outline" className="w-full gap-2">
              <a href={WHATSAPP_MANAGER_URL} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" /> Open WhatsApp Manager
              </a>
            </Button>
          </div>
        ) : (
          /* ----------------------- step 2: choose / enter the PIN ---------------------- */
          <div className="space-y-4">
            <Alert>
              <ShieldCheck className="h-4 w-4" />
              <AlertTitle>Number confirmed — one step left</AlertTitle>
              <AlertDescription>
                Choose a 6-digit PIN. It protects this number: anyone moving it elsewhere will need it.
              </AlertDescription>
            </Alert>

            <div className="space-y-1.5">
              <Label htmlFor="reg-pin">6-digit PIN</Label>
              <Input
                id="reg-pin"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
                inputMode="numeric"
                autoComplete="off"
                placeholder="••••••"
                className="font-mono tracking-[0.4em]"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="reg-pin-confirm">Confirm PIN</Label>
              <Input
                id="reg-pin-confirm"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value.replace(/\D/g, "").slice(0, 6))}
                inputMode="numeric"
                autoComplete="off"
                placeholder="••••••"
                className="font-mono tracking-[0.4em]"
              />
              {confirm.length === 6 && !matches && <p className="text-xs text-destructive">The PINs don&apos;t match.</p>}
            </div>

            <div className="rounded-md border bg-muted/30 p-3 text-xs text-muted-foreground">
              <p className="flex items-start gap-1.5">
                <KeyRound className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>
                  If a two-step verification PIN was already set for this number in WhatsApp Manager, you must enter{" "}
                  <span className="font-medium text-foreground">that same PIN</span> — a different one will be refused.
                  Write the PIN down; it cannot be recovered from here.
                </span>
              </p>
            </div>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          {!verified ? (
            <Button onClick={() => refresh()} disabled={busy === "refresh"} className="gap-2">
              {busy === "refresh" && <Loader2 className="h-4 w-4 animate-spin" />}
              Check again
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)} disabled={busy === "register"}>
                Cancel
              </Button>
              <Button onClick={handleActivate} disabled={!canSubmit} className="gap-2">
                {busy === "register" && <Loader2 className="h-4 w-4 animate-spin" />}
                Activate number
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
