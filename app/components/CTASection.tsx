"use client"
import { ArrowRight, CheckCircle2, Zap, Shield, Coins, AlertCircle } from "lucide-react"
import { useRouter } from "@/i18n/routing"
import { useTranslations } from "next-intl"

// CSS styles for the component
const styles = {
  animateInfiniteScroll: `
    animation: infinite-scroll 30s linear infinite;
  `,
  keyframesInfiniteScroll: `
    @keyframes infinite-scroll {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-50%);
      }
    }
  `,
  pauseOnHover: `
    animation-play-state: paused;
  `,
}

const plans = [
  {
    name: "plans.0.name", // Translated name
    price: 10.99,
    tokens: 2400,
    bonus: null,
    tooltip: "plans.starter.tooltip", // Translated tooltip
    features: [
      "plans.starter.features.0", // Translated feature
      "plans.starter.features.1",
      "plans.starter.features.2",
      "plans.starter.features.3",
    ],
  },
  {
    name: "plans.enterprise.name",
    price: 100,
    tokens: 25200,
    bonus: 5,
    tooltip: "plans.enterprise.tooltip",
    features: [
      "plans.enterprise.features.0",
      "plans.enterprise.features.1",
      "plans.enterprise.features.2",
      "plans.enterprise.features.3",
      "plans.enterprise.features.4",
      "plans.enterprise.features.5",
      "plans.enterprise.features.6",
      "plans.enterprise.features.7",
    ],
  },
  {
    name: "plans.business.name",
    price: 80,
    tokens: 19200,
    tooltip: "plans.business.tooltip",
    features: [
      "plans.business.features.0",
      "plans.business.features.1",
      "plans.business.features.2",
      "plans.business.features.3",
      "plans.business.features.4",
      "plans.business.features.5",
    ],
  },
]

const benefits = [
  {
    icon: Zap,
    title: "Instant Token Credit",
    description: "Tokens are credited to your account immediately after purchase",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security with 99.9% uptime guarantee",
  },
  {
    icon: Coins,
    title: "Flexible Usage",
    description: "Tokens never expire, use them at your own pace",
  },
]

const companyLogos = [
 
  "https://dhd-dz.com/assets/img/logo.png",  
"https://yalidine.com/assets/img/yalidine-logo.png",  
"https://www.guepex.com/assets/images/logo/logo-dark.webp",  
"https://www.ups.com/assets/resources/webcontent/images/ups-logo.svg",  
"https://www.golivri.dz/assets/img/logo.png",  
"https://maystro-delivery.com/img/logo.svg",  
"https://noest-dz.com/assets/img/logo_colors_new.png",  
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2D63PFOQPrtLtQ2xZVR-BRByg9blYiqm4vA&s",  
"https://dhd-dz.com/assets/img/logo.png",  
"https://yalidine.com/assets/img/yalidine-logo.png",  
"https://www.guepex.com/assets/images/logo/logo-dark.webp",  
"https://www.ups.com/assets/resources/webcontent/images/ups-logo.svg",  
"https://www.golivri.dz/assets/img/logo.png",  
"https://maystro-delivery.com/img/logo.svg", 
"https://andersonlogistique.com/medias/logo.png",  
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLZY6x8DaDX_SOfkyJX06QDjFdkZpL45vRwTdSPPqKROHsCQFqYC0o6B_IL0AJBmXJ6Uk&usqp=CAU",  
"https://www.fret.direct/images/logoFRETs.png",  
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw8WbXWF7NuJKeikuhF98ZI58fJ5_kJLH_om3qE_HMRYayXZJxQXx2Qn56CpF6jTDfCzs&usqp=CAU",  
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpvBI5915GAHfwbfd0K0cJkj7Ai5uAkVjLDA&s",  
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ2VUy_Kw0lnmKeo-GgtTnsUy2NZvYkO86Dw&s",  
"https://www.fastmaildz.com/images/logo.jpg",  
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPLpbiZjfLvVR71s-OEV8iTbHJxuT02xQ26w&s",  
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRol7hWuJm6Szh9barkJdXuIJH_f_I8CYigg&s",  
"https://www.rocket-dz.com/assets/img/logo_white.png",  
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYAQJ8l-R2I2lii4WQ6bkZ7dySXLgMflsivg&s",

]

export default function CTASection() {
  const router = useRouter()
  const t = useTranslations("pricing")

  const handleGetStarted = () => {
    router.push("/Auth/SignIn")
  }

  return (
    <>
      {/* Include the CSS styles */}
      <style jsx global>{`
        ${styles.keyframesInfiniteScroll}
        .animate-infinite-scroll {
          ${styles.animateInfiniteScroll}
        }
        .animate-infinite-scroll:hover {
          ${styles.pauseOnHover}
        }
      `}</style>

      <section className="relative py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-50/50 dark:bg-indigo-900/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-50/50 dark:bg-blue-900/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">{t("title")}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t("description")}</p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 ${
                  index === 1 ? "md:scale-105 md:-translate-y-4 border-2 border-indigo-500 dark:border-indigo-400" : ""
                }`}
              >
                {index === 1 && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-indigo-600 dark:bg-indigo-500 text-white px-8 py-2 rounded-full text-sm font-medium whitespace-nowrap">
                    {t("mostPopular")}
                  </div>
                )}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {t(`plans.${index}.name`)}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`text-4xl font-bold ${index === 1 ? "text-indigo-600 dark:text-indigo-400" : "text-gray-900 dark:text-white"}`}
                      >
                        ${plan.price}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">{t("perOneTime")}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  <div
                    className={`p-4 ${index === 1 ? "bg-indigo-100 dark:bg-indigo-900/50" : "bg-gray-50 dark:bg-gray-700"} rounded-xl`}
                  >
                    <div
                      className={`text-lg font-semibold ${index === 1 ? "text-indigo-600 dark:text-indigo-400" : "text-gray-900 dark:text-white"} mb-1`}
                    >
                      {plan.tokens.toLocaleString()} {t("tokens")}
                      <div className="group relative inline-block ml-2">
                        <AlertCircle className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-48 p-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                          {t(`plans.${index}.tooltip`)}
                        </div>
                      </div>
                    </div>
                    {plan.bonus && (
                      <div
                        className={`text-sm ${index === 1 ? "text-indigo-600 dark:text-indigo-400" : "text-gray-600 dark:text-gray-300"}`}
                      >
                        +{plan.bonus}% {t("bonusTokens")}
                      </div>
                    )}
                  </div>

                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <CheckCircle2
                          className={`w-5 h-5 ${index === 1 ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400 dark:text-gray-500"} flex-shrink-0`}
                        />
                        {t(`plans.${index}.features.${featureIndex}`)}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={handleGetStarted}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 ${
                    index === 1
                      ? "bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 shadow-lg hover:shadow-xl"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {t("getStarted")}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t(`features.${index}.title`)}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{t(`features.${index}.description`)}</p>
              </div>
            ))}
          </div>

          {/* Shipping Partners */}
          <div className="mt-20">
            <div className="text-center mb-6">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t("trustedBy")}</p>
            </div>

            <div className="relative w-full overflow-hidden py-4">
              {/* Gradient overlays */}
              <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10" />
              <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10" />

              {/* Scrollable container with automatic animation */}
              <div className="flex animate-infinite-scroll">
                {/* First set of logos */}
                {companyLogos.map((logo, index) => (
                  <div
                    key={`first-${index}`}
                    className="flex-shrink-0 mx-6 opacity-70 hover:opacity-100 transition-opacity duration-300"
                  >
                    <img
                      src={logo || "/placeholder.svg"}
                      alt={`Shipping partner ${index + 1}`}
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                ))}

                {/* Duplicate set of logos for seamless looping */}
                {companyLogos.map((logo, index) => (
                  <div
                    key={`second-${index}`}
                    className="flex-shrink-0 mx-6 opacity-70 hover:opacity-100 transition-opacity duration-300"
                  >
                    <img
                      src={logo || "/placeholder.svg"}
                      alt={`Shipping partner ${index + 1}`}
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

