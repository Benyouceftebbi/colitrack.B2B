"use client"
import { useState, useEffect } from "react"
import { Play, X } from "lucide-react"
import { useTranslations } from "next-intl"

export default function FloatingVideoPlayer() {
  const t = useTranslations("videoSection")
  const [isOpen, setIsOpen] = useState(false)

  // Google Drive direct video link
  const videoId = "1igoCOn1TvALIcksn9nthVLbbdWk7lGiS"
  const videoUrl = `https://www.youtube.com/embed/2H0C-mnBG48`

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <>
      {/* Floating Button */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 group">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center gap-2 group-hover:pr-6"
        >
          <Play className="w-6 h-6" fill="currentColor" />
          <span className="hidden group-hover:block text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300">
            Watch Demo
          </span>
        </button>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          {t("title")}
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
        </div>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors duration-200 z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Video Player */}
          <div className="w-full max-w-sm mx-auto">
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
              {/* Video Container - 9:16 format */}
              <div className="aspect-[9/16]">
                <iframe
                  src={videoUrl}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  title="SMS Automation Demo"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
