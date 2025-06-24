"use client"
import type React from "react"
import { useState } from "react"
import { Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"

interface PhoneInputProps {
  onSubmit: (phoneNumber: string, senderId: string) => void
  onSenderIdChange: (senderId: string) => void
  label: string
  isMultiNumber?: boolean
}

export default function PhoneInput({ onSubmit, onSenderIdChange, label, isMultiNumber = false }: PhoneInputProps) {
  const t = useTranslations("smsDemo")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [senderId, setSenderId] = useState("Colitrack")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(phoneNumber, senderId)
  }

  const handleSenderIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSenderId = e.target.value
    setSenderId(newSenderId)
    onSenderIdChange(newSenderId)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="senderId" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {t("senderId")}
          </label>
          <input
            type="text"
            id="senderId"
            maxLength={11}
            placeholder="Colitrack"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 hover:bg-white dark:hover:bg-gray-800"
            value={senderId}
            onChange={handleSenderIdChange}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {label}
          </label>
          {isMultiNumber ? (
            <textarea
              id="phone"
              placeholder="Enter phone numbers, separated by commas"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 hover:bg-white dark:hover:bg-gray-800 h-28 resize-none"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          ) : (
            <input
              type="tel"
              id="phone"
              placeholder="(555) 000-0000"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 hover:bg-white dark:hover:bg-gray-800"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          )}
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] shadow-md"
        >
          <Sparkles className="w-5 h-5" />
          {t("sendButton")}
        </button>
      </form>
      <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-800/30 rounded-lg p-3 border border-gray-200/50 dark:border-gray-700/50">
        {t("disclaimer")}
      </div>
    </div>
  )
}
