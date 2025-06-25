"use client"
import { Sparkles, ChevronRight } from "lucide-react"
import Navbar from "../components/Navbar"
import Stats from "../components/Stats"
import FeatureSection from "../components/FeatureCarousel"
import FloatingVideoPlayer from "../components/FloatingVideoPlayer"
import FeatureShowcase from "../components/FeatureShowcase"
import SMSDemo from "../components/SMSDemo"
import { HeroWithMediaBackground } from "../components/Ai-Images/hero-with-media-background"
import CTASection from "../components/CTASection"
import ComingSoon from "../components/ComingSoon"
import Testimonials from "../components/Testimonials"
import Footer from "../components/Footer"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"

export default function App() {
  const t = useTranslations("header")

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-50/30 dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      {/* Hero Section */}
      <header className="pt-32 pb-20 overflow-hidden bg-gradient-to-b from-white to-indigo-50/20 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/50 px-4 py-2 rounded-full mb-8">
              <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{t("badge")}</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
              {t("title")}
              <span className="text-indigo-600 dark:text-indigo-400">{t("highlight")}</span> {t("and")} {t("subtitle")}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">{t("description")}</p>
            <div className="flex justify-center gap-6 mb-16">
              <Link
                href="/Auth/SignIn"
                className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg"
              >
                {t("getStarted")} <ChevronRight className="h-5 w-5" />
              </Link>
              <button
                onClick={() => {
                  const element = document.getElementById("sms-demo")
                  element?.scrollIntoView({ behavior: "smooth", block: "start" })
                }}
                className="px-8 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 transform hover:scale-105"
              >
                {t("tryDemo")}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Video Player */}
      <FloatingVideoPlayer />

      <Stats />

      <section
        id="features"
        className="bg-white dark:bg-gray-900 bg-gradient-to-b from-white to-indigo-50/20 dark:from-gray-900 dark:to-gray-800"
      >
        <FeatureSection />
      </section>

     

      <section id="ai-images" className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <HeroWithMediaBackground />
      </section>

      <section id="ai">
        <ComingSoon />
      </section>

      <section id="sms-demo" className="bg-white dark:bg-gray-900">
        <SMSDemo />
      </section>

      <section id="pricing" className="bg-gradient-to-b from-white to-indigo-50/30 dark:from-gray-900 dark:to-gray-800">
        <CTASection />
      </section>

      <section id="analytics" className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <FeatureShowcase />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>

      <Footer />
    </div>
  )
}
