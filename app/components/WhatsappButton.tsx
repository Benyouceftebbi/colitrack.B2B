"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X } from "lucide-react"

interface WhatsAppSupportProps {
  phoneNumber: string
  message?: string
  className?: string
}

export function WhatsAppSupport({
  phoneNumber,
  message = "Hi! I need help with your service.",
  className = "",
}: WhatsAppSupportProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    // Entrance animation delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    // Show tooltip after a delay
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true)
      // Hide tooltip after 3 seconds
      setTimeout(() => setShowTooltip(false), 3000)
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearTimeout(tooltipTimer)
    }
  }, [])

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  const handleTooltipClose = () => {
    setShowTooltip(false)
  }

  return (
    <>
      {/* WhatsApp Button */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-out ${
          isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-16 opacity-0 scale-75"
        } ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={handleWhatsAppClick}
          className={`
            relative group bg-green-500 hover:bg-green-600 text-white 
            rounded-full p-4 shadow-2xl transition-all duration-300 ease-out
            hover:scale-110 active:scale-95
            ${isHovered ? "shadow-green-500/50" : "shadow-black/20"}
          `}
          aria-label="Contact us on WhatsApp"
        >
          {/* Pulse Animation */}
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
          <div className="absolute inset-0 rounded-full bg-green-500 animate-pulse opacity-30"></div>

          {/* WhatsApp Icon */}
          <div className="relative z-10">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="transition-transform duration-300 group-hover:rotate-12"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488" />
            </svg>
          </div>

          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
            <MessageCircle size={12} />
          </div>
        </button>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div
          className={`fixed bottom-24 right-6 z-50 transition-all duration-300 ease-out ${
            showTooltip ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95"
          }`}
        >
          <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-4 py-3 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-w-xs relative">
            <button
              onClick={handleTooltipClose}
              className="absolute -top-2 -right-2 bg-gray-500 hover:bg-gray-600 text-white rounded-full p-1 transition-colors duration-200"
              aria-label="Close tooltip"
            >
              <X size={12} />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-sm font-medium">Need help? Chat with us!</p>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">We typically reply within minutes</p>
            {/* Arrow pointing to button */}
            <div className="absolute bottom-0 right-8 transform translate-y-full">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white dark:border-t-gray-800"></div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
