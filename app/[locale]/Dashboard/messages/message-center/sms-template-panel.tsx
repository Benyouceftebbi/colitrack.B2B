import * as React from "react"
import { SMSTemplateCard } from "./sms-template-card"
import { SMSPreview } from "./sms-preview"


interface SMSTemplatePanelProps {
  selectedTemplates: string[]
  onTemplateToggle: (id: string) => void
  onPreviewTemplate: (template: string | null) => void
}
const smsTemplates = [
  {
    id: 'expedited',
    name: 'Real-Time Tracking',
    description: 'Send instant tracking links for expedited deliveries',
    tokens: 5,
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
    id: 'out_for_delivery',
    name: 'Out for Delivery Alert',
    description: 'Notify customers when their package is out for delivery',
    tokens: 2,
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
    id: 'stop_desk',
    name: 'Stop Desk Pickup',
    description: 'Alert customers when packages arrive at pickup locations',
    tokens: 2,
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

  const handlePreview = (template: string) => {
    setActiveTemplate(template)
    onPreviewTemplate(template)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="glass rounded-xl p-6 h-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold glow">Automated SMS Templates</h3>
            <span className="text-sm text-muted-foreground">
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
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="lg:col-span-1">
        <div className="glass rounded-xl p-6 sticky top-6">
          <h3 className="text-lg font-semibold mb-6 glow">Live Preview</h3>
          <SMSPreview message={activeTemplate} />
        </div>
      </div>
    </div>
  )
}