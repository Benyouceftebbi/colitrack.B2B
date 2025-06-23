"use client"
import { useState } from "react"
import { Play } from "lucide-react"
import { useTranslations } from "next-intl"

export default function VideoSection() {
  const t = useTranslations("videoSection")
  const [isPlaying, setIsPlaying] = useState(false)

  // Google Drive direct video link format https://drive.google.com/file/d/1igoCOn1TvALIcksn9nthVLbbdWk7lGiS/view
  const videoId = "1igoCOn1TvALIcksn9nthVLbbdWk7lGiS"
  const videoUrl = `https://drive.google.com/file/d/${videoId}/preview`

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying)

    // If we have a ref to the iframe, we could potentially control it
    // But Google Drive's embedded player doesn't support direct JS control
    // So we're just toggling the overlay visibility
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">{t("title")}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </div>

        <div className="relative mt-16 group max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden aspect-video">
            <iframe
              src={videoUrl}
              className="w-full h-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              title="SMS Automation Demo"
            ></iframe>

            {!isPlaying && (
              <div className="absolute inset-0 bg-black/20 dark:bg-black/40 flex items-center justify-center">
                <button
                  onClick={handlePlayClick}
                  className="bg-white/90 dark:bg-white/80 hover:bg-white hover:scale-110 transform transition-all duration-300 rounded-full p-6 shadow-xl group-hover:shadow-2xl"
                >
                  <Play className="w-12 h-12 text-indigo-600 dark:text-indigo-500" fill="currentColor" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

