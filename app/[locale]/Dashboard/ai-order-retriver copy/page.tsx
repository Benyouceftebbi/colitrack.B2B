'use client'
import { OrderDashboard } from "./components/order-dashboard"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { X, Eye } from "lucide-react"
import { useTranslations } from "next-intl"

export default function AIOrderRetrieverPage() {
const [showInfoDiv, setShowInfoDiv] = React.useState(true)
const t = useTranslations("ai-order-retriever")

  return (
    <main className="min-h-screen bg-background p-4 sm:p-8"> 
    <div className="container mx-auto space-y-6">
        {!showInfoDiv && (
          <div className="flex justify-end mb-4">
            <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowInfoDiv(true)}>
              <Eye className="h-4 w-4" />
              Show Info Section
            </Button>
          </div>
        )}
        {showInfoDiv && (
          <div className="bg-[#faf5ff] dark:bg-slate-800/50 p-4 rounded-lg relative">
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-2 right-2 z-10 h-6 w-6 rounded-full bg-white/80 hover:bg-white dark:bg-slate-700/80 dark:hover:bg-slate-700"
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
                    src="https://www.youtube.com/embed/ri_KCngsaYc"
                    title="Delivery Update Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
              <div className="w-full sm:w-5/6">
                <h3 className="text-lg font-semibold mb-2"> {t("aiOrderRetriever")}</h3>
                <p className="text-sm text-gray-600 dark:text-slate-300">{t("enhanceParcelCreation")}</p>
                <p className="text-sm text-gray-600 dark:text-slate-300">{t("fromMetaConversations")}</p>

              </div>
            </div>
          </div>
        )}
      <OrderDashboard />
      </div>
    </main>
 )}