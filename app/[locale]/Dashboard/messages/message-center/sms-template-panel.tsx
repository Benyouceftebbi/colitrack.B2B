"use client"

import * as React from "react"
import { SMSTemplateCard } from "./sms-template-card"
import { SMSPreview } from "./sms-preview"
import { useShop } from "@/app/context/ShopContext"
import { useTranslations } from "next-intl"
import { Star } from "lucide-react"

interface SMSTemplatePanelProps {
  selectedTemplates: string[]
  onTemplateToggle: (id: string) => void
  onPreviewTemplate: (template: string | null) => void
}

export function SMSTemplatePanel({ selectedTemplates, onTemplateToggle, onPreviewTemplate }: SMSTemplatePanelProps) {
  const t = useTranslations("messages")
  const [activeTemplate, setActiveTemplate] = React.useState<string | null>(null)
  const { shopData } = useShop()

  const smsTemplates = [
    {
      id: "expedited",
      name: t("templates.expedited.name"),
      description: t("templates.expedited.description"),
      tokens: 15,
      icon: "🚀",
      template: t("templates.expedited.template"),
      benefits: [
        t("templates.expedited.benefits.support"),
        t("templates.expedited.benefits.updates"),
        t("templates.expedited.benefits.status"),
      ],
    },
    {
      id: "out_for_delivery",
      name: t("templates.delivery.name"),
      description: t("templates.delivery.description"),
      tokens: 10,
      icon: "📦",
      template: t("templates.delivery.template"),
      benefits: [
        t("templates.delivery.benefits.failed"),
        t("templates.delivery.benefits.contact"),
        t("templates.delivery.benefits.confirmation"),
      ],
    },
    {
      id: "stop_desk",
      name: t("templates.pickup.name"),
      description: t("templates.pickup.description"),
      tokens: 10,
      icon: "🏪",
      template: t("templates.pickup.template"),
      benefits: [
        t("templates.pickup.benefits.instructions"),
        t("templates.pickup.benefits.hours"),
        t("templates.pickup.benefits.verification"),
      ],
    },
  ]

  const handlePreview = (template: string) => {
    setActiveTemplate(template)
    onPreviewTemplate(template)
  }

  // Calculate total activated tokens based on delivery type logic
  const calculateTotalTokens = () => {
    const hasStopDesk = selectedTemplates.includes("stop_desk")
    const hasExpedited = selectedTemplates.includes("expedited")
    const hasOutForDelivery = selectedTemplates.includes("out_for_delivery")
    const hasHouseDelivery = hasExpedited || hasOutForDelivery

    // If both shipping types are selected (stop desk and a domicile delivery), return exactly 25
    if (hasStopDesk && hasHouseDelivery) {
      return 25
    }

    let totalTokens = 0

    // Add tokens for stop desk if selected
    if (hasStopDesk) {
      totalTokens += 10 // stop_desk tokens
    }

    // Add tokens for expedited if selected
    if (hasExpedited) {
      totalTokens += 15 // expedited tokens
    }

    // Add tokens for out_for-delivery if selected
    if (hasOutForDelivery) {
      totalTokens += 10 // out_for_delivery tokens
    }

    return totalTokens
  }

  const totalActivatedTokens = calculateTotalTokens()


  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-2/3">
        <div className="glass rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold glow">{t("panel.title")}</h3>
            <span className="text-xs sm:text-sm text-muted-foreground">
              {t("panel.active-count", { count: selectedTemplates.length })}
            </span>
          </div>
          <div className="space-y-4">
            {smsTemplates.map((template) => (
              <SMSTemplateCard
                key={template.id}
                template={template}
                isSelected={selectedTemplates.includes(template.id)}
                isPreviewActive={template.template === activeTemplate}
                onSelect={() => onTemplateToggle(template.id)}
                onPreview={() => handlePreview(template.template)}
                shopData={shopData}
              />
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-cyan-900/30">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">Cost spent per parcel:</span>
              <div className="flex items-center gap-1">
                <span className="text-sm font-mono text-cyan-400">{totalActivatedTokens}</span>
                <Star className="h-3 w-3 text-cyan-500 fill-current" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/3">
        <div className="glass rounded-xl p-4 sm:p-6 lg:sticky lg:top-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 glow">{t("panel.preview")}</h3>
          <SMSPreview message={activeTemplate} />
        </div>
      </div>
    </div>
  )
}

