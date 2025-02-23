"use client"

import * as React from "react"
import { SMSTemplateCard } from "./sms-template-card"
import { SMSPreview } from "./sms-preview"
import { useShop } from "@/app/context/ShopContext"
import { useTranslations } from "next-intl"

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
      id: "shippedSms",
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
      id: "outForDeliverySms",
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
      id: "readyToBePickedSms",
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