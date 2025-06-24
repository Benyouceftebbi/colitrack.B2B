"use client"
import { useTranslations } from "next-intl"

export default function ChatHeader() {
  const t = useTranslations("ai.ChatHeader")

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-5 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>

      <div className="flex items-center gap-3 relative">
        <div className="relative">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 flex items-center justify-center">
            <div className="w-4 h-4 bg-white/40 rounded-full"></div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
        </div>

        <div>
          <div className="font-semibold text-base">{t("customerService")}</div>
          <div className="text-sm text-indigo-200 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            {t("statusOnline")}
          </div>
        </div>
      </div>
    </div>
  )
}
