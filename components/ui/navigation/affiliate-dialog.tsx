"use client"

import * as React from "react"
import { Check, Copy, Share2, Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/hooks/use-toast"

// Mock data - replace with actual data from your backend
const AFFILIATE_DATA = {
  code: "GOLD2024",
  referrals: 12,
  nextLevelAt: 20,
  currentLevel: 2,
  maxLevel: 5,
  earnings: "$240.00",
  unlockedRewards: ["5% commission on all referrals", "Custom affiliate dashboard"],
  upcomingRewards: [
    "10% commission on all referrals",
    "Priority support",
    "Monthly bonus rewards",
    "Exclusive training materials",
  ],
}

export function AffiliateDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [copied, setCopied] = React.useState(false)

  // Calculate progress percentage
  const progressPercentage = Math.min(Math.round((AFFILIATE_DATA.referrals / AFFILIATE_DATA.nextLevelAt) * 100), 100)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(AFFILIATE_DATA.code)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: `Affiliate code ${AFFILIATE_DATA.code} copied!`,
    })

    setTimeout(() => setCopied(false), 2000)
  }

  const shareAffiliate = () => {
    // This would typically open a share dialog or prepare a message
    // For now, we'll just copy a pre-formatted message
    const shareMessage = `Join using my affiliate code ${AFFILIATE_DATA.code} and get a special discount!`
    navigator.clipboard.writeText(shareMessage)

    toast({
      title: "Share message copied",
      description: "Share message copied to clipboard. Paste it anywhere to share!",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">Your Affiliate Dashboard</DialogTitle>
          <DialogDescription className="text-center">
            Share your code and earn rewards for every new referral
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Affiliate Code Section */}
          <div className="rounded-lg border bg-muted/50 p-4">
            <div className="mb-2 text-sm font-medium text-muted-foreground">Your Affiliate Code</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 rounded-md bg-background p-3 text-center text-xl font-bold tracking-wider">
                {AFFILIATE_DATA.code}
              </div>
              <Button variant="outline" size="icon" onClick={copyToClipboard} className="h-10 w-10 rounded-md">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="icon" onClick={shareAffiliate} className="h-10 w-10 rounded-md">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Progress Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                <span className="font-medium">Level {AFFILIATE_DATA.currentLevel} Affiliate</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {AFFILIATE_DATA.referrals}/{AFFILIATE_DATA.nextLevelAt} Referrals
              </span>
            </div>

            <Progress value={progressPercentage} className="h-2" />

            <div className="text-center text-sm text-muted-foreground">
              {AFFILIATE_DATA.nextLevelAt - AFFILIATE_DATA.referrals} more referrals to reach Level{" "}
              {AFFILIATE_DATA.currentLevel + 1}
            </div>
          </div>

          {/* Earnings Section */}
          <div className="rounded-lg border p-4">
            <div className="text-center">
              <div className="text-sm font-medium text-muted-foreground">Total Earnings</div>
              <div className="text-3xl font-bold text-green-600">{AFFILIATE_DATA.earnings}</div>
            </div>
          </div>

          {/* Rewards Section */}
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-medium">Unlocked Rewards</h3>
              <ul className="space-y-1">
                {AFFILIATE_DATA.unlockedRewards.map((reward, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>{reward}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-2 font-medium">Next Level Rewards</h3>
              <ul className="space-y-1">
                {AFFILIATE_DATA.upcomingRewards.map((reward, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-4 w-4 rounded-full border border-muted-foreground/30" />
                    <span>{reward}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

