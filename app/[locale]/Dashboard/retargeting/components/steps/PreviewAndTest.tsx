"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PhonePreview } from "../PhonePreview"
import type { RetargetingCampaignHook } from "../../types"
import { useTranslations } from "next-intl"
import { useShop } from "@/app/context/ShopContext"
import { splitMessageIntoChunks } from "../../utils/message"

type PreviewAndTestProps = {
  campaign: RetargetingCampaignHook
}

export function PreviewAndTest({ campaign }: PreviewAndTestProps) {
  const [showPhonePreview, setShowPhonePreview] = useState(false)
  const t = useTranslations("retargeting")
  const { shopData } = useShop()

  // Use the utility function to split the message into chunks based on character limit
  const messageChunks = splitMessageIntoChunks(campaign.message, campaign.effectiveCharLimit)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">{t("messagePreview")}</h3>
          <div className="space-y-2 max-h-[250px] overflow-y-auto">
            {messageChunks.map((chunk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-4 rounded-lg neon-border"
                dir={campaign.hasArabic ? "rtl" : "ltr"}
              >
                <p className="text-sm whitespace-pre-wrap">{chunk}</p>
                <p className="text-xs text-muted-foreground mt-2 text-right">
                  {t("segment")} {index + 1}/{messageChunks.length}
                </p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button onClick={() => setShowPhonePreview(true)} disabled={!campaign.message} className="neon-hover">
          {t("previewOnPhone")}
        </Button>
      </div>

      {showPhonePreview && (
        <PhonePreview
          messageTemplate={campaign.message}
          senderId={shopData.senderId || "Colitrack"}
          onClose={() => setShowPhonePreview(false)}
        />
      )}
    </motion.div>
  )
}

