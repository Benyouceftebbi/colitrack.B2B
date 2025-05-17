"use client"

import {
Dialog,
DialogContent,
DialogDescription,
DialogHeader,
DialogTitle,
DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Bot, Facebook, Instagram } from 'lucide-react'
import { useTranslations } from "next-intl"

interface LearnMoreDialogProps {
isOpen: boolean
onClose: () => void
}

export function LearnMoreDialog({ isOpen, onClose }: LearnMoreDialogProps) {
const t = useTranslations("ai-order-retriever")

return (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-2xl dark:border-gray-700" >
      <DialogHeader>
        <DialogTitle className="text-xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
          <Bot className="h-5 w-5" /> {t("automaticOrderRetrieval")}
        </DialogTitle>
        <DialogDescription className="text-base">
          {t("learnHowAiRetrievesOrders")}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6 py-4">
        <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg border dark:border-gray-700">
          <h3 className="font-semibold text-lg mb-3 dark:text-gray-200">{t("howItWorks")}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {t("onceConnectedToFacebook")}
          </p>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
              <Facebook className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium dark:text-gray-200">{t("oneTimeSetup")}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {t("connectFacebookAccountOnce")}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5 text-lg">✅</div>
              <div>
                <h4 className="font-medium dark:text-gray-200">{t("ordersThatWillBeRetrieved")}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {t("whenYouSendCheckEmoji")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5 text-lg">❌</div>
              <div>
                <h4 className="font-medium dark:text-gray-200">{t("ordersThatWontBeRetrieved")}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {t("ifYouSendCrossEmoji")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg dark:text-gray-200">{t("exampleScenarios")}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-lg">✅</div>
                <h4 className="font-medium text-green-800 dark:text-green-400">{t("willBeRetrieved")}</h4>
              </div>
              <div className="space-y-3 pl-7">
                <div className="flex gap-2">
                  <Facebook className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                  <p className="text-gray-700 dark:text-gray-300 text-sm">"✅"</p>
                </div>
                <div className="flex gap-2">
                  <Instagram className="h-4 w-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                  <p className="text-gray-700 dark:text-gray-300 text-sm">"✅"</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-100 dark:border-red-800">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-lg">❌</div>
                <h4 className="font-medium text-red-800 dark:text-red-400">{t("wontBeRetrieved")}</h4>
              </div>
              <div className="space-y-3 pl-7">
                <div className="flex gap-2">
                  <Facebook className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                  <p className="text-gray-700 dark:text-gray-300 text-sm">"Sorry, this item is out of stock ❌"</p>
                </div>
                <div className="flex gap-2">
                  <Instagram className="h-4 w-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    "Thank you for your inquiry. We'll get back to you soon." (no emoji)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button onClick={onClose}>{t("gotItThanks")}</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)
}