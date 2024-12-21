
import { SMSPreview } from "./sms-preview"
import { SMSTemplateCard } from "./sms-template-card"

interface SMSTemplatesProps {
  selectedFeatures: string[]
  onFeatureToggle: (id: string) => void
  previewTemplate: string | null
  onPreviewChange: (template: string | null) => void
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
export function SMSTemplates({
  selectedFeatures,
  onFeatureToggle,
  previewTemplate,
  onPreviewChange
}: SMSTemplatesProps) {
  return (
    <>
      <div className="lg:col-span-2">
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6 glow">SMS Templates</h3>
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
          <h3 className="text-lg font-semibold mb-6 glow">Preview</h3>
          <SMSPreview message={previewTemplate} />
        </div>
      </div>
    </>
  )
}