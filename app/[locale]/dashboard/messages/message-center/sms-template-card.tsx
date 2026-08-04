"use client"

import { Button } from "@/components/ui/button"
import { Modal, ModalContent, ModalDescription, ModalHeader, ModalTitle } from "@/components/ui/modal"
import { cn } from "@/lib/utils"
import { Eye, Star } from "lucide-react"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/routing"

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
  shopData: any
  className?: string
}

export function SMSTemplateCard({
  template,
  isSelected,
  onSelect,
  onPreview,
  shopData,
  className,
}: SMSTemplateCardProps) {
  const t = useTranslations("messages")
  const [showModal, setShowModal] = useState(false)
  const router =useRouter()
  const handleActivate = () => {
    if (!shopData.deliveryCompany) {
      setShowModal(true)
    } else {
      onSelect()
    }
  }
  const [phoneNumbers, setPhoneNumbers] = useState("")
  const [messageContent, setMessageContent] = useState("")

  const calculateSMSCount = (text: string) => Math.ceil(text.length / 160)

  const handleSendMessages = () => {
    const numbersArray = phoneNumbers
      .split(",")
      .map((number) => number.trim())
      .filter((number) => number.length > 0)

    if (numbersArray.length === 0 || messageContent.trim().length === 0) {
      alert("Please enter phone numbers and a message.")
      return
    }

    // Implement sending logic here
    console.log("Sending message to:", numbersArray)
    console.log("Message content:", messageContent)

    setPhoneNumbers("")
    setMessageContent("")
  }
  return (
    <>
      <div
        className={cn(
          "glass p-4 rounded-xl transition-all duration-300",
          isSelected ? "neon-border" : "hover:border-white/20",
          className,
        )}
      >
        <div className="flex items-start gap-4">
          <span className="text-2xl">{template.icon}</span>
          <div className="flex-1">
            <h4 className="font-medium">{t("template.name", { name: "Send SMS" })}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {t("template.description", { description: "Send instant sms for your clients" })}
            </p>
  
      <h4 className="font-medium text-xl mb-4"></h4>
      <textarea
        className="w-full p-2 glass rounded-md mb-2"
        placeholder="Enter phone numbers separated by commas"
        value={phoneNumbers}
        onChange={(e) => setPhoneNumbers(e.target.value)}
      />
      <textarea
        className="w-full p-2 glass rounded-md mb-2"
        placeholder="Type your message here"
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
      />
      <div className="text-sm text-muted-foreground mb-2">
        Characters: {messageContent.length} | SMS Count: {calculateSMSCount(messageContent)}
      </div>
     

            <div className="mt-4 flex items-center justify-between gap-4">
              <span className="text-xs text-cyan-400 font-mono flex items-center">
      
              </span>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" className="glass hover:neon-border" onClick={onPreview}>
                  <Eye className="w-4 h-4 mr-1" />
                  {t("template.preview")}
                </Button>
                <Button
                  size="sm"
                  variant={isSelected ? "default" : "secondary"}
                  className={isSelected ? "bg-cyan-500" : "glass"}
                  onClick={handleActivate}
                >
                  send SMS 
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}