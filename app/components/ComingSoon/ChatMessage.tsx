"use client"
import type { SafeMessage } from "./types"
import { useTranslations } from "next-intl"

interface ChatMessageProps {
  message: SafeMessage
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const t = useTranslations("ai.Messages")

  if (!message?.sender || !message?.content || !message?.timestamp) {
    return null
  }

  const isSenderCustomer = message.sender === "customer"

  return (
    <div className={`flex ${isSenderCustomer ? "justify-start" : "justify-end"} mb-4`}>
      <div className={`flex flex-col ${isSenderCustomer ? "items-start" : "items-end"} max-w-[85%]`}>
        <div
          className={`rounded-2xl px-5 py-3 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl ${
            isSenderCustomer
              ? "bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-gray-100 rounded-tl-md border border-gray-200/50 dark:border-gray-600/50"
              : "bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white rounded-tr-md shadow-indigo-500/25"
          }`}
        >
          <p className="break-words leading-relaxed font-medium">{t(message.content)}</p>
        </div>

        <div
          className={`text-xs mt-2 px-2 ${
            isSenderCustomer ? "text-gray-500 dark:text-gray-400" : "text-gray-400 dark:text-gray-500"
          }`}
        >
          {message.timestamp}
        </div>
      </div>
    </div>
  )
}
