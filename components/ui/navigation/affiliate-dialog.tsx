"use client"

import * as React from "react"
import { Check, Copy, Share2, Trophy } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/hooks/use-toast"

// Custom scrollable content component
const ScrollableContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`overflow-y-auto pr-1 ${className}`}
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(155, 155, 155, 0.5) transparent",
      }}
      {...props}
    />
  ),
)
ScrollableContent.displayName = "ScrollableContent"

// Define affiliate levels data
const affiliateLevels = [
  {
    level: 1,
    name: "Bronze",
    requiredReferrals: 5,
    commission: 5,
    rewards: ["rewards.bronze.1", "rewards.bronze.2", "rewards.bronze.3"],
  },
  {
    level: 2,
    name: "Silver",
    requiredReferrals: 15,
    commission: 10,
    rewards: ["rewards.silver.1", "rewards.silver.2", "rewards.silver.3"],
  },
  {
    level: 3,
    name: "Gold",
    requiredReferrals: 50,
    commission: 15,
    rewards: [
      "rewards.gold.1",
      "rewards.gold.2",
      "rewards.gold.3",
      "rewards.gold.4",
    ],
  },
]

export function AffiliateDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const  t  = useTranslations('affiliate')
  const [copied, setCopied] = React.useState(false)

  // State to manage affiliate data
  const [affiliateData, setAffiliateData] = React.useState<{
    code: string | null
    referrals: number
    earnings: number
  }>({
    code: null,
    referrals: 0,
    earnings: 0,
  })

  // Check if code has been generated
  const hasGeneratedCode = affiliateData.code !== null

  // Function to generate a random affiliate code
  const generateAffiliateCode = () => {
    const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789" // Removed similar looking characters
    let result = ""

    // Generate a 2-letter prefix
    for (let i = 0; i < 2; i++) {
      result += characters.charAt(Math.floor(Math.random() * 26)) // Only letters for prefix
    }

    // Add a separator
    result += "-"

    // Generate a 4-character alphanumeric code
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    setAffiliateData((prev) => ({
      ...prev,
      code: result,
    }))

    toast({
      title: t("toast.codeGenerated"),
      description: t("toast.codeGeneratedDesc", { code: result }),
    })
  }

  // Use our state instead of the static data
  const affiliate = {
    ...affiliateData,
    levels: affiliateLevels.map((level) => ({
      ...level,
      name: t(`levels.${level.name.toLowerCase()}`),
    })),
  }

  // Determine current level and next level
  const currentLevelIndex = affiliate.levels.findIndex((level) => affiliate.referrals < level.requiredReferrals) - 1

  const currentLevel = currentLevelIndex >= 0 ? affiliate.levels[currentLevelIndex] : affiliate.levels[0]

  const nextLevelIndex = currentLevelIndex + 2
  const nextLevel = nextLevelIndex < affiliate.levels.length ? affiliate.levels[nextLevelIndex] : null

  // If user has reached max level, set current level to the highest
  const isMaxLevel = nextLevel === null
  const displayLevel = isMaxLevel ? affiliate.levels[affiliate.levels.length - 1] : currentLevel

  // Calculate progress percentage
  const progressPercentage = nextLevel
    ? Math.min(
        Math.round(
          ((affiliate.referrals - displayLevel.requiredReferrals) /
            (nextLevel.requiredReferrals - displayLevel.requiredReferrals)) *
            100,
        ),
        100,
      )
    : 100

  const copyToClipboard = () => {
    if (!affiliateData.code) return

    navigator.clipboard.writeText(affiliateData.code)
    setCopied(true)
    toast({
      title: t("toast.copied"),
      description: t("toast.copiedDesc", { code: affiliateData.code }),
    })

    setTimeout(() => setCopied(false), 2000)
  }

  const shareAffiliate = () => {
    if (!affiliateData.code) return

    // This would typically open a share dialog or prepare a message
    // For now, we'll just copy a pre-formatted message
    const shareMessage = t("shareMessage", { code: affiliateData.code })
    navigator.clipboard.writeText(shareMessage)

    toast({
      title: t("toast.shareCopied"),
      description: t("toast.shareCopiedDesc"),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-center text-2xl font-bold">{t("title")}</DialogTitle>
          <DialogDescription className="text-center">{t("description")}</DialogDescription>
        </DialogHeader>

        <ScrollableContent className="mt-4 space-y-6">
          {/* Affiliate Code Section */}
          {hasGeneratedCode ? (
            <div className="rounded-lg border bg-muted/50 p-4">
              <div className="mb-2 text-sm font-medium text-muted-foreground">{t("yourCode")}</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 rounded-md bg-background p-3 text-center text-xl font-bold tracking-wider">
                  {affiliateData.code}
                </div>
                <Button variant="outline" size="icon" onClick={copyToClipboard} className="h-10 w-10 rounded-md">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="icon" onClick={shareAffiliate} className="h-10 w-10 rounded-md">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border bg-muted/50 p-6 text-center space-y-4">
              <div className="text-lg font-medium">{t("welcome")}</div>
              <p className="text-muted-foreground">{t("generatePrompt")}</p>
              <Button onClick={generateAffiliateCode} className="mt-2">
                {t("generateButton")}
              </Button>
            </div>
          )}

          {hasGeneratedCode && (
            <>
              {/* Level Badge */}
              <div className="flex justify-center">
                <div
                  className={`
                  flex items-center gap-2 rounded-full px-4 py-2 font-semibold
                  ${displayLevel.level === 1 ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" : ""}
                  ${displayLevel.level === 2 ? "bg-slate-200 text-slate-800 dark:bg-slate-800/50 dark:text-slate-300" : ""}
                  ${displayLevel.level === 3 ? "bg-gradient-to-r from-amber-300 to-yellow-500 text-amber-900 dark:text-amber-950" : ""}
                `}
                >
                  <Trophy className="h-5 w-5" />
                  <span>{t("levelBadge", { level: displayLevel.name, number: displayLevel.level })}</span>
                </div>
              </div>

              {/* Progress Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {t("commissionRate", { rate: displayLevel.commission })}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {t("referralsCount", { count: affiliate.referrals })}
                  </span>
                </div>

                {!isMaxLevel && (
                  <>
                    <Progress value={progressPercentage} className="h-2" />

                    <div className="flex justify-between text-sm">
                      <span>{t("level", { number: displayLevel.level })}</span>
                      <span className="text-muted-foreground">
                        {t("nextLevelProgress", {
                          remaining: nextLevel.requiredReferrals - affiliate.referrals,
                          nextLevel: nextLevel.level,
                          commission: nextLevel.commission,
                        })}
                      </span>
                    </div>
                  </>
                )}

                {isMaxLevel && (
                  <div className="text-center text-sm font-medium text-green-600">{t("maxLevelReached")}</div>
                )}
              </div>

              {/* Earnings Section */}
              <div className="rounded-lg border p-4">
                <div className="text-center">
                  <div className="text-sm font-medium text-muted-foreground">{t("totalEarnings")}</div>
                  <div className="text-3xl font-bold text-green-600">TKN {affiliate.earnings.toFixed(2)}</div>
                </div>
              </div>

              {/* Current Level Rewards */}
              <div className="rounded-lg border p-4 space-y-4">
                <div>
                  <h3 className="font-medium flex items-center gap-2">
                    <div
                      className={`
                      flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold
                      ${displayLevel.level === 1 ? "bg-amber-200 text-amber-800 dark:bg-amber-900/70 dark:text-amber-300" : ""}
                      ${displayLevel.level === 2 ? "bg-slate-300 text-slate-800 dark:bg-slate-800 dark:text-slate-300" : ""}
                      ${displayLevel.level === 3 ? "bg-amber-400 text-amber-900 dark:bg-amber-700 dark:text-amber-200" : ""}
                    `}
                    >
                      {displayLevel.level}
                    </div>
                    {t("currentLevel", { level: displayLevel.name })}
                  </h3>
                  <div className="mt-2 text-sm">
                    <div className="flex justify-between mb-1">
                      <span>{t("commissionRateLabel")}:</span>
                      <span className="font-medium">{displayLevel.commission}%</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>{t("requiredReferrals")}:</span>
                      <span className="font-medium">{displayLevel.requiredReferrals}</span>
                    </div>
                    <div className="mt-2">
                      <span className="font-medium">{t("yourRewards")}:</span>
                      <ul className="mt-1 space-y-1">
                        {displayLevel.rewards.map((rewardKey, index) => (
                          <li key={index} className="flex items-start gap-1">
                            <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>{t(rewardKey)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Level Rewards */}
              {!isMaxLevel && (
                <div className="rounded-lg border border-dashed p-4 space-y-4">
                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                      <div
                        className={`
                        flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold bg-muted text-muted-foreground
                      `}
                      >
                        {nextLevel.level}
                      </div>
                      {t("nextLevel", { level: nextLevel.name })}
                    </h3>
                    <div className="mt-2 text-sm">
                      <div className="flex justify-between mb-1">
                        <span>{t("commissionRateLabel")}:</span>
                        <span className="font-medium">{nextLevel.commission}%</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>{t("requiredReferrals")}:</span>
                        <span className="font-medium">{nextLevel.requiredReferrals}</span>
                      </div>
                      <div className="mt-2">
                        <span className="font-medium">{t("unlockRewards")}:</span>
                        <ul className="mt-1 space-y-1">
                          {nextLevel.rewards.map((rewardKey, index) => (
                            <li key={index} className="flex items-start gap-1 text-muted-foreground">
                              <div className="mt-1 block h-3 w-3 rounded-full border border-muted-foreground/30 flex-shrink-0" />
                              <span>{t(rewardKey)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* How to Earn More */}
              <div className="rounded-lg bg-muted/30 p-4">
                <h3 className="font-medium mb-2">{t("howToEarnMore")}</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <span>{t("earnTips.1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <span>{t("earnTips.2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <span>{t("earnTips.3")}</span>
                  </li>
                </ul>
              </div>
            </>
          )}
        </ScrollableContent>
      </DialogContent>
    </Dialog>
  )
}