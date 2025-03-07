"use client"
import { useState } from "react"
import { X, Eye } from "lucide-react"
import { Header } from "./components/Header"
import { MessageHistory } from "./components/MessageHistory"
import { CampaignDialog } from "./components/CampaignDialog"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { useRetargetingCampaign } from "./hooks/useRetargetingCampaign"
import { useTranslations } from "next-intl"
import type { SentMessage } from "./types"
import { useShop } from "@/app/context/ShopContext"

export default function RetargetingCampaign() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [sentMessages, setSentMessages] = useState<SentMessage[]>([])
  const [showInfoDiv, setShowInfoDiv] = useState(true)
  const { exportToExcel } = useRetargetingCampaign()
  const t = useTranslations("retargeting")
  const { shopData } = useShop()

  const handleAddCampaign = (newMessage: SentMessage) => {
    setSentMessages((prev) => [newMessage, ...prev])
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto space-y-8">
        <Header token={shopData.tokens} senderId={shopData.senderId} />

        {!showInfoDiv && (
          <div className="flex justify-end mb-4">
            <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowInfoDiv(true)}>
              <Eye className="h-4 w-4" />
              Show Info Section
            </Button>
          </div>
        )}

        {showInfoDiv && (
          <div className="bg-[#faf5ff] p-4 rounded-lg relative">
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-2 right-2 z-10 h-6 w-6 rounded-full bg-white/80 hover:bg-white"
              onClick={() => setShowInfoDiv(false)}
              aria-label="Close info section"
            >
              <X className="h-3 w-3" />
            </Button>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="w-full sm:w-1/6">
                <div className="aspect-video rounded-lg overflow-hidden bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/jHAvt2gPTyM"
                    title="Delivery Update Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
              <div className="w-full sm:w-5/6">
                <h3 className="text-lg font-semibold mb-2">{t("messages")}</h3>
                <p className="text-sm text-gray-600">{t("messages-description")}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold neon-text">{t("messageHistory")}</h2>
          <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
            <DialogTrigger asChild>
              <Button variant="neon">{t("createNewCampaign")}</Button>
            </DialogTrigger>
            <CampaignDialog onClose={() => setIsPopupOpen(false)} onAddCampaign={handleAddCampaign} />
          </Dialog>
        </div>

        <MessageHistory sentMessages={shopData.smsCampaign} exportToExcel={exportToExcel} />
      </div>
    </div>
  )
}

