"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ClientGroupSelector } from "./ClientGroupSelector"
import { ExcelFileUploader } from "./ExcelFileUploader"
import type { RetargetingCampaignHook } from "../../../types"
import { useTranslations } from "next-intl"
import { Input } from "@/components/ui/input"
import { Star } from "lucide-react"

type SelectAudienceProps = {
  campaign: RetargetingCampaignHook
}

export function SelectAudience({ campaign }: SelectAudienceProps) {
  const t = useTranslations("retargeting")

  const [totalRecipients, setTotalRecipients] = useState(0)
  const [estimatedCost, setEstimatedCost] = useState(0)

  useEffect(() => {
    setTotalRecipients(campaign.totalRecipients)
    setEstimatedCost(campaign.totalCost)
  }, [campaign.totalRecipients, campaign.totalCost])

  useEffect(() => {
    setTotalRecipients(0)
    setEstimatedCost(0)

    if (campaign.audienceSource === "group") {
      campaign.selectedClientGroup = null
    } else {
      campaign.excelFile = null
    }
  }, [campaign.audienceSource, campaign])

  const handleAudienceSourceChange = (value: "group" | "excel") => {
    campaign.setAudienceSource(value)
  }

  return (
    <div className="space-y-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">{t("campaignName")}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="relative">
            <Input
              id="campaign-name"
              value={campaign.campaignName}
              onChange={(e) => campaign.setCampaignName(e.target.value)}
              placeholder={t("enterCampaignName")}
              className="pr-8 font-medium text-primary"
            />
            <Star className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <span>{t("selectAudienceSource")}</span>
            {campaign.campaignName && (
              <span className="ml-2 text-sm font-normal text-muted-foreground">{`for "${campaign.campaignName}"`}</span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-6">
          <RadioGroup
            value={campaign.audienceSource}
            onValueChange={handleAudienceSourceChange}
            className="space-y-2 pt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="group" id="group" />
              <Label htmlFor="group">{t("selectClientGroup")}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="excel" id="excel" />
              <Label htmlFor="excel">{t("uploadExcelFile")}</Label>
            </div>
          </RadioGroup>

          <div className="pt-2">
            {campaign.audienceSource === "group" ? (
              <ClientGroupSelector campaign={campaign} />
            ) : (
              <ExcelFileUploader campaign={campaign} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

