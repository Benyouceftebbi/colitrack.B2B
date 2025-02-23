"use client"

import { Button } from "@/components/ui/button"
import { Modal, ModalContent, ModalDescription, ModalHeader, ModalTitle } from "@/components/ui/modal"
import { cn } from "@/lib/utils"
import { Eye, Star } from "lucide-react"
import { useState } from "react"
import { useTranslations } from "next-intl"

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
          className,
        )}
      >
        <div className="flex items-start gap-4">
          <span className="text-2xl">{template.icon}</span>
          <div className="flex-1">
            <h4 className="font-medium">{t("template.name", { name: template.name })}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {t("template.description", { description: template.description })}
            </p>

            <div className="mt-4 space-y-2">
              {template.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-cyan-400">✓</span>
                  {t("template.benefit", { benefit })}
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
              <span className="text-xs text-cyan-400 font-mono flex items-center">
                {t("template.tokens-per-message", { count: template.tokens })}
                <Star className="h-3 w-3 text-cyan-500 fill-current mx-1" />
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
                  {isSelected ? t("template.active") : t("template.activate")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal open={showModal} onOpenChange={setShowModal}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>{t("modal.account-linking-title")}</ModalTitle>
            <ModalDescription>{t("modal.account-linking-description")}</ModalDescription>
          </ModalHeader>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => setShowModal(false)} variant="destructive">
              {t("modal.close")}
            </Button>
            <Button variant="secondary" className="ml-2">
              {t("modal.link-account")}
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}