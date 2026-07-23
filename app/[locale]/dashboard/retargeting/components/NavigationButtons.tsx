"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
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
import type { RetargetingCampaignHook } from "../types"
import { useTranslations } from "next-intl"

type NavigationButtonsProps = {
  campaign: RetargetingCampaignHook
  currentStep: number
  totalSteps: number
  onPrevStep: () => void
  onNextStep: () => void
  onClose: () => void
  onSendCampaign: () => void
}

export function NavigationButtons({
  campaign,
  currentStep,
  totalSteps,
  onPrevStep,
  onNextStep,
  onClose,
  onSendCampaign,
}: NavigationButtonsProps) {
  const t = useTranslations("retargeting")

  // Last step is send campaign (totalSteps - 1)
  const isLastStep = currentStep >= totalSteps - 1

  // Validation for step 1 (Message Type)
  const canProceedFromStep1 = () => {
    if (campaign.messageType === "custom") return true
    if (campaign.messageType === "unique") {
      return campaign.excelData?.messageColumn && campaign.uniqueMessageStats
    }
    return false
  }

  // Check if next button should be disabled
  const isNextDisabled = () => {
    if (currentStep === 1) {
      return !canProceedFromStep1()
    }
    return false
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 flex justify-end items-center space-x-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Button onClick={onPrevStep} disabled={currentStep === 0} variant="outline">
        {t("previous")}
      </Button>

      {!isLastStep ? (
        <Button onClick={onNextStep} disabled={isNextDisabled()}>{t("next")}</Button>
      ) : (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>{t("sendCampaign")}</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("sendCampaignQuestion")}</AlertDialogTitle>
              <AlertDialogDescription>
              {t("sendCampaignDescription", {
                  messageCount: '1',
                  recipients: campaign.totalRecipients,
                  group: campaign.groupName || "All Contacts", // Add the missing group parameter
                  totalMessages: campaign.totalRecipients,
                  totalCost: campaign.messageCount * campaign.totalRecipients * 10,
                  costPerMessage: campaign.messageCount * 10,
                })}
                {campaign.hasArabic && (
                  <p className="mt-2 text-amber-600 font-medium">
                    Note: Your message contains Arabic text which uses 80 characters per message segment.
                  </p>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
              <AlertDialogAction onClick={onSendCampaign} disabled={campaign.isSending}>
                {campaign.isSending ? (
                  <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    {t("sending")}
                  </motion.div>
                ) : (
                  t("sendCampaign")
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </motion.div>
  )
}

