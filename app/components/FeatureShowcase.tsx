"use client"
import { useState } from "react"
import { ChevronRight, Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"

const features = [
  {
    title: "features.feature5.title",
    description: "features.feature5.description",
    image:
      "https://firebasestorage.googleapis.com/v0/b/test-swi3a.appspot.com/o/image%20AI%20colitrack.png?alt=media&token=35a70eac-e4e2-4cf7-96b6-4beff9b4386d",
  },
  {
    title: "features.feature6.title",
    description: "features.feature6.description",
    image:
      "https://firebasestorage.googleapis.com/v0/b/test-swi3a.appspot.com/o/ai%20order%20retrival.png?alt=media&token=a9ebf96a-5ee7-4978-a15e-f70f3f7c1263",
  },
  {
    title: "features.feature1.title",
    description: "features.feature1.description",
    image:
      "https://firebasestorage.googleapis.com/v0/b/test-swi3a.appspot.com/o/74a668d9-4004-4eef-a25e-5ef4051b18f7.jpg?alt=media&token=f52435d1-341f-472b-b930-f313cbc88eeb",
  },
  {
    title: "features.feature2.title",
    description: "features.feature2.description",
    image:
      "https://firebasestorage.googleapis.com/v0/b/test-swi3a.appspot.com/o/ddf06444-c75c-4f8e-a916-b5cbb00b36fa.jpg?alt=media&token=71693a3b-3949-4ff7-8fd1-b1a6db145421",
  },
  {
    title: "features.feature3.title",
    description: "features.feature3.description",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
  },
  {
    title: "features.feature4.title",
    description: "features.feature4.description",
    image:
      "https://firebasestorage.googleapis.com/v0/b/test-swi3a.appspot.com/o/9f4ef0c6-98ab-4eea-bdf5-8a8b8ace4678.jpg?alt=media&token=4e64081f-3963-4a7e-a3b7-7f8e95de604e",
  },
]

export default function FeatureShowcase() {
  const [activeFeature, setActiveFeature] = useState(0)
  const t = useTranslations("featureShowcase")

  return (
    <section
      className="min-h-screen lg:h-[90vh] bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/20 dark:from-gray-900 dark:via-indigo-900/20 dark:to-purple-900/10 relative overflow-hidden"
      id="showcase"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-20 w-48 h-48 lg:w-72 lg:h-72 bg-indigo-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 lg:w-96 lg:h-96 bg-purple-400/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen lg:h-full flex flex-col justify-center py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-100/80 dark:bg-indigo-900/50 backdrop-blur-sm px-3 py-1.5 lg:px-4 lg:py-2 rounded-full mb-4 lg:mb-6">
            <Sparkles className="h-3 w-3 lg:h-4 lg:w-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs lg:text-sm font-medium text-indigo-600 dark:text-indigo-400">
              Advanced Features
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6 leading-tight">
            {t("mainHeader")}
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {t("secondaryHeader")}
            </span>
          </h2>
          <p className="text-base lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            {t("mainDescription")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start flex-1">
          {/* Features List */}
          <div className="space-y-4 lg:space-y-6 h-full overflow-y-auto pr-2 pl-4 pb-6 lg:pb-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`cursor-pointer transition-all duration-500 hover:scale-[1.02] ${
                  index === activeFeature
                    ? "p-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"
                    : ""
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div
                  className={`relative p-3 lg:p-4 rounded-xl backdrop-blur-sm transition-all duration-500 ${
                    index === activeFeature
                      ? "bg-white/90 dark:bg-gray-800/90 shadow-xl shadow-indigo-500/20"
                      : "bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/70 dark:hover:bg-gray-800/70"
                  }`}
                >
                  {/* Feature number */}
                  <div
                    className={`absolute -top-1.5 lg:-top-2 -left-0.5 lg:-left-1 w-5 h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      index === activeFeature
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </div>

                  <div className="ml-2 lg:ml-3">
                    <h3
                      className={`text-base lg:text-lg font-bold mb-1.5 lg:mb-2 flex items-center gap-2 transition-all duration-300 ${
                        index === activeFeature
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {t(feature.title)}
                      <ChevronRight
                        className={`w-3.5 h-3.5 lg:w-4 lg:h-4 transition-all duration-300 ${
                          index === activeFeature ? "translate-x-1 text-indigo-500" : "text-gray-400"
                        }`}
                      />
                    </h3>
                    <p
                      className={`text-xs lg:text-sm text-gray-600 dark:text-gray-300 leading-relaxed transition-all duration-500 ${
                        index === activeFeature
                          ? "opacity-100 max-h-16 lg:max-h-20 transform translate-y-0"
                          : "opacity-60 max-h-0 overflow-hidden transform -translate-y-1"
                      }`}
                    >
                      {t(feature.description)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Preview */}
          <div className="relative h-64 sm:h-80 lg:h-full flex flex-col">
            <div className="relative flex-1 rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-white/20 dark:border-gray-700/50">
              {/* Floating elements */}
              <div className="absolute -top-2 lg:-top-3 -right-2 lg:-right-3 w-4 h-4 lg:w-6 lg:h-6 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-2 lg:-bottom-3 -left-2 lg:-left-3 w-3 h-3 lg:w-4 lg:h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60 animate-pulse delay-1000"></div>

              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`absolute inset-0 transition-all duration-1000 transform ${
                    index === activeFeature
                      ? "translate-x-0 opacity-100 scale-100"
                      : index < activeFeature
                        ? "-translate-x-full opacity-0 scale-95"
                        : "translate-x-full opacity-0 scale-95"
                  }`}
                >
                  <img
                    src={feature.image || "/placeholder.svg"}
                    alt={t(feature.title)}
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                  />

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20" />

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                    <div className="backdrop-blur-sm bg-white/10 dark:bg-black/20 rounded-xl p-3 lg:p-4 border border-white/20">
                      <h3 className="text-base lg:text-xl font-bold text-white mb-1 lg:mb-2 flex items-center gap-2">
                        <span className="w-1 h-1 lg:w-1.5 lg:h-1.5 bg-indigo-400 rounded-full animate-pulse"></span>
                        {t(feature.title)}
                      </h3>
                      <p className="text-white/90 text-xs lg:text-sm leading-relaxed">{t(feature.description)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress indicators */}
            <div className="flex justify-center mt-3 lg:mt-4 gap-1.5 lg:gap-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full transition-all duration-300 ${
                    index === activeFeature
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 scale-125"
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
