"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PhonePreview } from "../PhonePreview"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { RetargetingCampaignHook } from "../../types"
import { useTranslations } from "next-intl"
import { useShop } from "@/app/context/ShopContext"
import { Hash, FileText, ChevronLeft, ChevronRight } from "lucide-react"

type PreviewAndTestProps = {
  campaign: RetargetingCampaignHook
}

export function PreviewAndTest({ campaign }: PreviewAndTestProps) {
  const [showPhonePreview, setShowPhonePreview] = useState(false)
  const [selectedRecipientIndex, setSelectedRecipientIndex] = useState(0)
  const t = useTranslations("retargeting")
  const { shopData } = useShop()

  const isUniqueMessage = campaign.messageType === "unique" && campaign.excelData?.messageColumn
  
  // Get the preview message based on message type
  const getPreviewMessage = () => {
    if (isUniqueMessage && campaign.processedData && campaign.processedData[selectedRecipientIndex]) {
      return campaign.processedData[selectedRecipientIndex].message || "No message found"
    }
    return campaign.message
  }

  const previewMessage = getPreviewMessage()
  const currentRecipient = campaign.processedData?.[selectedRecipientIndex]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-4">
      {/* Unique Message Recipient Selector */}
      {isUniqueMessage && campaign.processedData && campaign.processedData.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Preview Unique Messages
            </CardTitle>
            <CardDescription>
              Browse through individual messages for each recipient
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSelectedRecipientIndex(prev => Math.max(0, prev - 1))}
                disabled={selectedRecipientIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Select
                value={selectedRecipientIndex.toString()}
                onValueChange={(value) => setSelectedRecipientIndex(parseInt(value))}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select recipient" />
                </SelectTrigger>
                <SelectContent>
                  {campaign.processedData.slice(0, 50).map((recipient, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {recipient.name} ({recipient.number})
                    </SelectItem>
                  ))}
                  {campaign.processedData.length > 50 && (
                    <SelectItem value="" disabled>
                      ... and {campaign.processedData.length - 50} more
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setSelectedRecipientIndex(prev => Math.min(campaign.processedData!.length - 1, prev + 1))}
                disabled={selectedRecipientIndex === campaign.processedData.length - 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Recipient {selectedRecipientIndex + 1} of {campaign.processedData.length}</span>
              {currentRecipient && (
                <span className="flex items-center gap-1">
                  <Hash className="h-3 w-3" />
                  {previewMessage.length} characters
                </span>
              )}
            </div>

            {currentRecipient && (
              <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-muted/50">
                <div>
                  <span className="text-xs text-muted-foreground">Name</span>
                  <p className="font-medium">{currentRecipient.name}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Phone</span>
                  <p className="font-medium">{currentRecipient.number}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}



      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">{t("messagePreview")}</h3>
          <div className="space-y-2 max-h-[250px] overflow-y-auto">
            <motion.div
              key={selectedRecipientIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 rounded-lg neon-border"
              dir={campaign.hasArabic ? "rtl" : "ltr"}
            >
              <p className="text-sm whitespace-pre-wrap">{previewMessage}</p>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button onClick={() => setShowPhonePreview(true)} disabled={!previewMessage} className="neon-hover">
          {t("previewOnPhone")}
        </Button>
      </div>

      {showPhonePreview && (
        <PhonePreview
          messageTemplate={previewMessage}
          senderId={shopData.senderId || "Colitrack"}
          onClose={() => setShowPhonePreview(false)}
        />
      )}
    </motion.div>
  )
}

