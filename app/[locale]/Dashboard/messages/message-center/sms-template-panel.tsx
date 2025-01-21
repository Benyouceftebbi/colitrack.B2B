import * as React from "react"
import { SMSTemplateCard } from "./sms-template-card"
import { SMSPreview } from "./sms-preview"
import { useShop } from "@/app/context/ShopContext"


interface SMSTemplatePanelProps {
  selectedTemplates: string[]
  onTemplateToggle: (id: string) => void
  onPreviewTemplate: (template: string | null) => void
}
const smsTemplates = [
  {
    id: 'shippedSms',
    name: 'Real-Time Tracking',
    description: 'Send instant tracking links for expedited deliveries',
    tokens: 15,
    icon: '🚀',
    template: `Your package ({{trackingNumber}}) is being expedited!

Track in real-time: {{trackingLink}}

Reply HELP for support`,
    benefits: [
      'Reduce support inquiries',
      'Real-time location updates',
      'Instant delivery status'
    ]
  },
  {
    id: 'outForDeliverySms',
    name: 'Out for Delivery Alert',
    description: 'Notify customers when their package is out for delivery',
    tokens: 10,
    icon: '📦',
    template: `Your package ({{trackingNumber}}) is out for delivery today!

Driver: {{driverName}}
Contact: {{driverPhone}}

Reply OK to confirm availability`,
    benefits: [
      'Reduce failed deliveries',
      'Direct driver contact',
      'Delivery confirmation'
    ]
  },
  {
    id: 'readyToBePickedSms',
    name: 'Stop Desk Pickup',
    description: 'Alert customers when packages arrive at pickup locations',
    tokens: 10,
    icon: '🏪',
    template: `Your package ({{trackingNumber}}) is ready for pickup!

Location: {{stopDeskAddress}}
Hours: {{businessHours}}

Show this SMS at pickup`,
    benefits: [
      'Clear pickup instructions',
      'Business hours included',
      'Quick verification'
    ]
  }
]
export function SMSTemplatePanel({
  selectedTemplates,
  onTemplateToggle,
  onPreviewTemplate
}: SMSTemplatePanelProps) {
  const [activeTemplate, setActiveTemplate] = React.useState<string | null>(null)
  const {shopData}=useShop()

  const handlePreview = (template: string) => {
    setActiveTemplate(template)
    onPreviewTemplate(template)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-2/3">
        <div className="glass rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold glow">Automated SMS Templates</h3>
            <span className="text-xs sm:text-sm text-muted-foreground">
              {selectedTemplates.length} Active
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
          <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 glow">Live Preview</h3>
          <SMSPreview message={activeTemplate} />
        </div>
      </div>
    </div>
  )
}