"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useWhatsApp } from "../context/whatsapp-provider"
import { useWhatsAppAccount } from "../hooks/use-whatsapp-account"

const CONFIRM_WORD = "DISCONNECT"

/**
 * Disconnecting revokes our token and unsubscribes the webhook — outgoing
 * campaigns stop immediately — so it asks for typed confirmation.
 */
export function DisconnectDialog({ children }: { children: React.ReactNode }) {
  const { activePhone } = useWhatsApp()
  const { disconnect, busy } = useWhatsAppAccount()
  const [open, setOpen] = React.useState(false)
  const [confirmation, setConfirmation] = React.useState("")

  const canConfirm = confirmation.trim().toUpperCase() === CONFIRM_WORD

  const handleDisconnect = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!canConfirm) return
    const ok = await disconnect()
    if (ok) {
      setOpen(false)
      setConfirmation("")
    }
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) setConfirmation("")
      }}
    >
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Disconnect WhatsApp?</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-3">
              <p>
                Colitrack will stop sending and receiving messages on{" "}
                <span className="font-medium text-foreground">{activePhone?.displayPhoneNumber || "this number"}</span>{" "}
                straight away. Any scheduled WhatsApp campaign will fail.
              </p>
              <ul className="list-disc space-y-1 pl-5 text-sm">
                <li>Your templates and number stay on Meta — nothing is deleted there.</li>
                <li>Message history already in Colitrack is kept, but statuses stop updating.</li>
                <li>You can reconnect at any time with the same number.</li>
              </ul>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-2">
          <Label htmlFor="disconnect-confirm" className="text-sm">
            Type <span className="font-mono font-semibold">{CONFIRM_WORD}</span> to confirm
          </Label>
          <Input
            id="disconnect-confirm"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            placeholder={CONFIRM_WORD}
            autoComplete="off"
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={busy === "disconnect"}>Keep connected</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDisconnect}
            disabled={!canConfirm || busy === "disconnect"}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {busy === "disconnect" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Disconnect
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
