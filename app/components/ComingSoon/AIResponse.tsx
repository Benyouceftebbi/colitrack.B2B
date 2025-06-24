"use client"
import { Check, Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"

export default function AIResponse() {
  const t = useTranslations("ai.AIResponse")

  return (
    <div className="relative border-2 border-gradient-to-r from-indigo-200 to-purple-200 dark:from-indigo-800 dark:to-purple-800 rounded-2xl p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-900/30 dark:via-gray-800/50 dark:to-purple-900/30 backdrop-blur-sm animate-fade-in-up shadow-xl">
      {/* Decorative elements */}
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
        <Sparkles className="w-3 h-3 text-white" />
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 rounded-full flex items-center justify-center shadow-lg">
          <Check className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
          {t("title")}
        </span>
      </div>

      <div className="space-y-4">
        <p className="font-bold text-gray-900 dark:text-white text-lg">{t("orderDetails")}</p>

        <div className="grid grid-cols-1 gap-3">
          <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-700/60 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50">
            <span className="font-medium text-gray-700 dark:text-gray-300">{t("product")}:</span>
            <span className="font-semibold text-gray-900 dark:text-white">{t("productName")}</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-700/60 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50">
            <span className="font-medium text-gray-700 dark:text-gray-300">{t("size")}:</span>
            <span className="font-semibold text-gray-900 dark:text-white">{t("sizeValue")}</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-700/60 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50">
            <span className="font-medium text-gray-700 dark:text-gray-300">{t("deliveryAddress")}:</span>
            <span className="font-semibold text-gray-900 dark:text-white">{t("deliveryAddressValue")}</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl border border-green-200/50 dark:border-green-700/50">
            <span className="font-medium text-gray-700 dark:text-gray-300">{t("status")}:</span>
            <span className="font-bold text-green-600 dark:text-green-400 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              {t("statusValue")}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
