"use client"
import { Bot, MessageSquare, Sparkles, ArrowRight } from "lucide-react"
import ChatPreview from "./ChatPreview"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"

const features = [
  {
    icon: Bot,
    title: "AI Order Processing",
    description: "Automatically detect and process orders from social media conversations",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    icon: MessageSquare,
    title: "Smart Conversation Analysis",
    description: "Understand customer intent and extract order details from natural conversations",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: Sparkles,
    title: "Automated Order Creation",
    description: "Instantly create orders when confirmation emoji is detected",
    gradient: "from-emerald-500 to-teal-600",
  },
]

export default function ComingSoon() {
  const t = useTranslations("ai")

  return (
    <section className="py-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-indigo-200/50 dark:border-indigo-700/50 px-4 py-2 rounded-full mb-4 shadow-lg hover:shadow-xl transition-all duration-300">
            <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400 animate-pulse" />
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 tracking-wide">
              {t("comingSoon")}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 dark:from-white dark:via-indigo-200 dark:to-purple-200 bg-clip-text text-transparent mb-4 leading-tight">
            {t("aiPoweredSocialCommerce")}
          </h2>

          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            {t("transformSocialMedia")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group flex gap-4 p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/80 dark:hover:bg-gray-800/80"
              >
                <div className="flex-shrink-0">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    {t(feature.title)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{t(feature.description)}</p>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <Link
                href="/Auth/SignIn"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white rounded-xl font-semibold text-base hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-600 dark:hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {t("joinWaitlist")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* Interactive Demo */}
          <div className="lg:order-first flex justify-center">
            <ChatPreview />
          </div>
        </div>
      </div>
    </section>
  )
}
