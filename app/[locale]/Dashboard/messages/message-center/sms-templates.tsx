"use client"

import { SMSPreview } from "./sms-preview"
import { SMSTemplateCard } from "./sms-template-card"
import { useTranslations } from "next-intl"

interface SMSTemplatesProps {
  selectedFeatures: string[]
  onFeatureToggle: (id: string) => void
  previewTemplate: string | null
  onPreviewChange: (template: string | null) => void
}





export function SMSTemplates({
  selectedFeatures,
  onFeatureToggle,
  previewTemplate,
  onPreviewChange,
}: SMSTemplatesProps) {
  const t = useTranslations("messages")

  const smsTemplates = [
    {
      id: "expedited",
      name: t("templates.expedited.name"),
      description: t("templates.expedited.description"),
      tokens: 5,
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
      tokens: 2,
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
      tokens: 2,
      icon: "🏪",
      template: t("templates.pickup.template"),
      benefits: [
        t("templates.pickup.benefits.instructions"),
        t("templates.pickup.benefits.hours"),
        t("templates.pickup.benefits.verification"),
      ],
    },
  ]

  return (
    <>
      <div className="lg:col-span-2">
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6 glow">{t("templates.section-title")}</h3>
          <div className="space-y-4">
            {smsTemplates.map((template) => (
              <SMSTemplateCard
                key={template.id}
                template={template}
                isSelected={selectedFeatures.includes(template.id)}
                onSelect={() => onFeatureToggle(template.id)}
                onPreview={() => onPreviewChange(template.template)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6 glow">{t("templates.preview-title")}</h3>
          <SMSPreview message={previewTemplate} />
        </div>
      </div>
    </>
  )
}