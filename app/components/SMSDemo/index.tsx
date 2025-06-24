"use client"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import PhoneInput from "./PhoneInput"
import PhonePreview from "./PhonePreview"
import { useTranslations } from "next-intl"

const services = [
  {
    id: "tracking",
    title: "services.tracking.title",
    description: "services.tracking.description",
    messageTemplate: "services.tracking.messageTemplate",
    inputLabel: "services.tracking.inputLabel",
  },
  {
    id: "delivery",
    title: "services.delivery.title",
    description: "services.delivery.description",
    messageTemplate: "services.delivery.messageTemplate",
    inputLabel: "services.delivery.inputLabel",
  },
  {
    id: "retargeting",
    title: "services.retargeting.title",
    description: "services.retargeting.description",
    messageTemplate: "services.retargeting.messageTemplate",
    inputLabel: "services.retargeting.inputLabel",
  },
]

export default function SMSDemo() {
  const [activeService, setActiveService] = useState(0)
  const [isMessageSent, setIsMessageSent] = useState(false)
  const [currentSenderId, setCurrentSenderId] = useState("Colitrack")
  const t = useTranslations("smsDemo")

  const handlePrevious = () => {
    setActiveService((prev) => (prev - 1 + services.length) % services.length)
    setIsMessageSent(false)
  }

  const handleNext = () => {
    setActiveService((prev) => (prev + 1) % services.length)
    setIsMessageSent(false)
  }

  const handleSubmit = async (phoneNumber: string, senderId: string) => {
    let newSms = ""

    if (activeService === 0) {
      newSms = `Cher client, votre colis est en route ! Suivez-le ici :  https://colitrack-v1.vercel.app/fr/t?tr=yal-AYET67. Merci !`
    } else if (activeService === 1) {
      newSms =
        "Votre commande est en cours de livraison ! Votre chauffeur John (555-0123) arrivera entre 14h00 et 16h00."
    } else if (activeService === 2) {
      newSms =
        "Bonjour, Profitez de -10% sur votre prochaine commande avec le code RETOUR10. Dépêchez-vous, l'offre expire bientôt ! 🌟 https://sabyange.com"
    }

    setIsMessageSent(true)
    setCurrentSenderId(senderId)
  }

  const handleSenderIdChange = (senderId: string) => {
    setCurrentSenderId(senderId)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/25 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-600 dark:from-white dark:via-blue-200 dark:to-indigo-300 bg-clip-text text-transparent mb-4">
            {t("title")}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 lg:-translate-x-24 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-full shadow-xl z-10 hover:bg-white dark:hover:bg-gray-700 hover:scale-110 transition-all duration-300 border border-white/20"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 lg:translate-x-24 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-full shadow-xl z-10 hover:bg-white dark:hover:bg-gray-700 hover:scale-110 transition-all duration-300 border border-white/20"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>

          {/* Service Content */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="w-full md:max-w-lg order-1 md:order-1">
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/30">
                <div className="mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    {t(services[activeService].title)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t(services[activeService].description)}
                  </p>
                </div>
                <PhoneInput
                  onSubmit={handleSubmit}
                  onSenderIdChange={handleSenderIdChange}
                  label={t(services[activeService].inputLabel)}
                  isMultiNumber={activeService === 2}
                />
              </div>
            </div>
            <div className="flex justify-center w-full order-2 md:order-2">
              <div className="w-[260px] md:w-[280px]">
                <PhonePreview
                  isMessageSent={isMessageSent}
                  messageTemplate={t(services[activeService].messageTemplate)}
                  senderId={currentSenderId}
                />
              </div>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-10">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveService(index)
                  setIsMessageSent(false)
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeService
                    ? "w-8 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg"
                    : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
