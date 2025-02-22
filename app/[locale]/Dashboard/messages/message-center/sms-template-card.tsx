import { Button } from "@/components/ui/button"
import { Modal, ModalContent, ModalDescription, ModalHeader, ModalTitle } from "@/components/ui/modal"
import { cn } from "@/lib/utils"
import { Eye, Star } from "lucide-react"
import { useState } from "react"

interface SMSTemplateCardProps {
  template: {
    id: string
    name: string
    description: string
    tokens: number
    icon: string
    template: string
    benefits: string[]
  }
  isSelected: boolean
  onSelect: () => void
  onPreview: () => void
  shopData:any
  className?: string
}

export function SMSTemplateCard({ 
  template, 
  isSelected, 
  onSelect, 
  onPreview,
  shopData,
  className 
}: SMSTemplateCardProps) {
  const [showModal, setShowModal] = useState(false)

  const handleActivate = () => {
    if (!shopData.deliveryCompany) {
      setShowModal(true)
    } else {
      onSelect()
    }
  }
  return (
    <>
    <div
      className={cn(
        "glass p-4 rounded-xl transition-all duration-300",
        isSelected ? "neon-border" : "hover:border-white/20",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <span className="text-2xl">{template.icon}</span>
        <div className="flex-1">
          <h4 className="font-medium">{template.name}</h4>
          <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
          
          <div className="mt-4 space-y-2">
            {template.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-cyan-400">✓</span>
                {benefit}
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <span className="text-xs text-cyan-400 font-mono flex items-center">
              {template.tokens} <Star className="h-3 w-3 text-cyan-500 fill-current mx-1" /> tokens per message
            </span>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="ghost" 
                className="glass hover:neon-border"
                onClick={onPreview}
              >
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </Button>
              <Button
                size="sm"
                variant={isSelected ? "default" : "secondary"}
                className={isSelected ? "bg-cyan-500" : "glass"}
                onClick={ handleActivate }
              >
                {isSelected ? 'Active' : 'Activate'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <Modal open={showModal} onOpenChange={setShowModal}>
    <ModalContent>
      <ModalHeader>
        <ModalTitle>Account Linking Required</ModalTitle>
        <ModalDescription>
          You can't activate this option. You need to first link up your delivery account.
        </ModalDescription>
      </ModalHeader>
      <div className="mt-4 flex justify-end">
        <Button onClick={() => setShowModal(false)} variant="destructive">Close</Button>
        <Button variant="secondary" className="ml-2">Link Account</Button>
      </div>
    </ModalContent>
  </Modal>
  </>
  )
}