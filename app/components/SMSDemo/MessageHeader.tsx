"use client"
import { ChevronLeft } from "lucide-react"

interface MessageHeaderProps {
  senderId: string
}

export default function MessageHeader({ senderId }: MessageHeaderProps) {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-4 pb-3 border-b border-gray-200 dark:border-gray-600">
      <div className="flex items-center gap-4 py-3">
        <ChevronLeft className="w-5 h-5 text-blue-500 hover:text-blue-600 transition-colors cursor-pointer" />
        <div className="flex-1 text-center">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full mx-auto mb-1 shadow-md flex items-center justify-center">
            <span className="text-white font-semibold text-sm">{(senderId || "C")[0].toUpperCase()}</span>
          </div>
          <div className="font-semibold text-gray-900 dark:text-white text-sm">{senderId || "Colitrack"}</div>
        </div>
        <div className="w-5" />
      </div>
    </div>
  )
}
