"use client"

import { useState } from "react"
import { X, Eye, Target } from "lucide-react"
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
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="container mx-auto space-y-6 md:space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950/50 dark:to-purple-950/50 p-3 rounded-lg shadow-sm">
              <Target className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                {t("retargetingCampaign")}
              </h1>
              <div className="space-y-0.5">
                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                {t("createCustomMessages")} 
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                {t("createCustomMessagess")}        
              </p>
              </div>
            </div>
          </div>
        </div>

        {!showInfoDiv && (
          <div className="flex justify-end mb-4 mt-2">
            <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowInfoDiv(true)}>
              <Eye className="h-4 w-4" />
              Show Info Section
            </Button>
          </div>
        )}

        {showInfoDiv && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-5 rounded-lg relative shadow-sm border border-indigo-100 dark:border-indigo-900/50">
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-3 right-3 z-10 h-7 w-7 rounded-full bg-white/90 hover:bg-white dark:bg-slate-800/90 dark:hover:bg-slate-800 shadow-sm"
              onClick={() => setShowInfoDiv(false)}
              aria-label="Close info section"
            >
              <X className="h-3 w-3" />
            </Button>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="w-full sm:w-1/6">
                <div className="aspect-video rounded-lg overflow-hidden bg-black shadow-md">
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
                <h3 className="text-lg font-semibold mb-2 text-indigo-700 dark:text-indigo-300">{t("messages")}</h3>
                <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">{t("messages-description")}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-6">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300 flex items-center gap-2">
            <span>Campaign History</span>
          </h2>
          <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md transition-all duration-200 hover:shadow-lg">
                {t("createNewCampaign")}
              </Button>
            </DialogTrigger>
            <CampaignDialog onClose={() => setIsPopupOpen(false)} onAddCampaign={handleAddCampaign} />
          </Dialog>
        </div>

        <div className="bg-white dark:bg-slate-800/50 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
          <MessageHistory sentMessages={shopData.smsCampaign || []} exportToExcel={exportToExcel} />
        </div>
      </div>
    </div>
  )
}

