"use client"

import { cn } from "@/lib/utils"
import { Phone } from "lucide-react"

interface PhonePreviewProps {
  message?: string
  className?: string
  theme?: "light" | "dark"
}

export function PhonePreview({ message, className, theme = "light" }: PhonePreviewProps) {
  const formattedMessage = message || "Type a message to preview"

  return (
    <div className={cn("relative w-[300px] h-[600px] mx-auto", className)}>
      {/* iPhone Frame */}
      <div
        className={cn(
          "absolute inset-0 rounded-[3rem] shadow-xl transition-colors duration-300",
          theme === "dark" ? "bg-gray-900" : "bg-gray-200",
        )}
      >
        {/* Notch */}
        <div
          className={cn(
            "absolute top-0 left-1/2 -translate-x-1/2 h-6 w-40 rounded-b-xl transition-colors duration-300",
            theme === "dark" ? "bg-black" : "bg-gray-800",
          )}
        />

        {/* Screen */}
        <div
          className={cn(
            "absolute inset-2 rounded-[2.5rem] overflow-hidden transition-colors duration-300",
            theme === "dark" ? "bg-black" : "bg-white",
          )}
        >
          {/* Status Bar */}
          <div
            className={cn(
              "h-12 flex items-center justify-between px-6 transition-colors duration-300",
              theme === "dark" ? "bg-gray-900" : "bg-gray-100",
            )}
          >
            <span className={theme === "dark" ? "text-white" : "text-gray-900"}>9:41</span>
            <div className="flex items-center gap-2">
              <Phone className={cn("w-4 h-4", theme === "dark" ? "text-white" : "text-gray-900")} />
              <span className={theme === "dark" ? "text-white" : "text-gray-900"}>5G</span>
            </div>
          </div>

          {/* Message */}
          <div className="p-4">
            <div
              className={cn(
                "p-3 rounded-2xl rounded-tl-sm max-w-[85%] text-sm transition-colors duration-300 break-words whitespace-pre-wrap",
                theme === "dark" ? "bg-green-600 text-white" : "bg-blue-500 text-white",
              )}
            >
              {formattedMessage}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
