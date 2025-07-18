"use client"

import { motion } from "framer-motion"
import { InfoIcon, AlertTriangle } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CampaignIdeasCarousel } from "../campaign-ideas/CampaignIdeasCarousel"
import type { RetargetingCampaignHook } from "../../types"
import { useTranslations } from "next-intl"

type CraftMessageProps = {
  campaign: RetargetingCampaignHook
}

export function CraftMessage({ campaign }: CraftMessageProps) {
  const t = useTranslations("retargeting")

  const showPersonalizationTip =
    campaign.audienceSource === "excel" && campaign.excelData?.nameColumn && !campaign.message.includes("{{name}}")

  // Calculate progress percentage based on the effective character limit
  const progressPercentage = (campaign.message.length / campaign.effectiveCharLimit) * 100

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-3 overflow-hidden"
    >
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">{t("campaignIdeas")}</h3>
        <p className="text-sm text-muted-foreground">{t("selectTemplateOrCreate")}</p>
        <CampaignIdeasCarousel onSelectIdea={(idea) => campaign.setMessage(idea)} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="message" className="block text-sm font-medium">
            {t("retargetingMessage")}
          </label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("bestPractices")}</p>
                <ul className="list-disc pl-4 mt-2">
                  <li>{t("conciseAndClear")}</li>
                  <li>{t("useNamePlaceholder")}</li>
                  <li>{t("strongCTA")}</li>
                  <li>{t("highlightValue")}</li>
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {showPersonalizationTip && (
          <Alert>
            <AlertDescription>{t("personalizationTip")}</AlertDescription>
          </Alert>
        )}

        {campaign.hasArabic && (
          <Alert variant="warning" className="bg-amber-50 border-amber-200">
            <AlertTriangle className="h-4 w-4 text-amber-600 mr-2" />
            <AlertDescription className="text-amber-600">
              Arabic text detected. Character limit reduced to 70 per message segment.
            </AlertDescription>
          </Alert>
        )}

        <Textarea
          id="message"
          placeholder={t("messagePlaceholder")}
          value={campaign.message}
          onChange={(e) => campaign.setMessage(e.target.value)}
          rows={4}
          className="w-full resize-none"
          dir={campaign.hasArabic ? "rtl" : "ltr"}
        />

        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>
            {t("charactersRemaining")} {campaign.remainingCharacters} / {campaign.effectiveCharLimit}
          </span>
          <span>
            {t("messageCount")} {campaign.messageCount} × {campaign.totalRecipients} {t("recipients")}
          </span>
        </div>

        <Progress value={progressPercentage} className={progressPercentage > 90 ? "bg-amber-100" : ""} />

        <p className="text-sm text-muted-foreground">
          {t("estimatedCost")} {campaign.totalCost} Tkn
        </p>

        <div className="text-xs text-muted-foreground">
          <p>
            Character Limit: {campaign.effectiveCharLimit} {campaign.hasArabic ? "(Arabic)" : "(Latin)"}
          </p>
          <p>Message Count = {campaign.messageCount}</p>
          <p>Total Recipients = {campaign.totalRecipients}</p>
          <p>Total Cost = {campaign.totalCost}</p>
        </div>
      </div>
    </motion.div>
  )
}

