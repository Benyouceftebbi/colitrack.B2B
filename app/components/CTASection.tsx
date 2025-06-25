"use client"
import { ArrowRight, CheckCircle2, Zap, Shield, Coins, Sparkles, Star } from "lucide-react"
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
    name: "plans.0.name",
    price: 10.99,
    tokens: 2400,
    bonus: null,
    tooltip: "plans.starter.tooltip",
    features: [
      "plans.starter.features.0",
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
  "https://andersonlogistique.com/medias/logo.png",
  "https://www.fret.direct/images/logoFRETs.png",
  "https://www.fastmaildz.com/images/logo.jpg",
  "https://www.rocket-dz.com/assets/img/logo_white.png",
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

      <section className="relative min-h-screen lg:h-[112vh] overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900/20" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-1/4 w-72 h-72 lg:w-96 lg:h-96 bg-indigo-200/30 dark:bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-1/4 w-64 h-64 lg:w-80 lg:h-80 bg-purple-200/30 dark:bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] bg-gradient-to-r from-indigo-100/20 to-purple-100/20 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen lg:h-full flex flex-col py-6 lg:py-6">
          {/* Compact Header */}
          <div className="text-center mb-6 lg:mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 backdrop-blur-sm px-3 py-1.5 lg:px-4 lg:py-2 rounded-full mb-3 lg:mb-4">
              <Star className="h-3 w-3 lg:h-4 lg:w-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xs lg:text-sm font-medium text-indigo-600 dark:text-indigo-400">
                Choose Your Plan
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 lg:mb-3">
              {t("title")}
            </h2>
            <p className="text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              {t("description")}
            </p>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Pricing Cards - Mobile Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
              {plans.map((plan, index) => (
                <div
                  key={plan.name}
                  className={`relative backdrop-blur-sm rounded-2xl p-4 lg:p-6 transition-all duration-500 hover:scale-105 ${
                    index === 1
                      ? "bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-2 border-indigo-300 dark:border-indigo-500 shadow-xl shadow-indigo-500/20 md:scale-105"
                      : "bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {index === 1 && (
                    <div className="absolute -top-2 lg:-top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 lg:px-6 py-1 lg:py-1.5 rounded-full text-xs font-medium">
                      <Sparkles className="inline w-3 h-3 mr-1" />
                      {t("mostPopular")}
                    </div>
                  )}

                  <div className="text-center mb-4 lg:mb-6">
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {t(`plans.${index}.name`)}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span
                        className={`text-2xl lg:text-3xl font-bold ${
                          index === 1
                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        ${plan.price}
                      </span>
                      <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">{t("perOneTime")}</span>
                    </div>
                  </div>

                  <div
                    className={`p-2.5 lg:p-3 rounded-xl mb-3 lg:mb-4 ${
                      index === 1
                        ? "bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50"
                        : "bg-gray-50 dark:bg-gray-700"
                    }`}
                  >
                    <div
                      className={`text-base lg:text-lg font-semibold ${
                        index === 1 ? "text-indigo-600 dark:text-indigo-400" : "text-gray-900 dark:text-white"
                      } text-center`}
                    >
                      {plan.tokens.toLocaleString()} {t("tokens")}
                      {plan.bonus && (
                        <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                          +{plan.bonus}% {t("bonusTokens")}
                        </div>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-1.5 lg:space-y-2 mb-4 lg:mb-6">
                    {plan.features.slice(0, 4).map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-2 text-xs lg:text-sm text-gray-700 dark:text-gray-300"
                      >
                        <CheckCircle2
                          className={`w-3.5 h-3.5 lg:w-4 lg:h-4 ${
                            index === 1 ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400 dark:text-gray-500"
                          } flex-shrink-0`}
                        />
                        {t(`plans.${index}.features.${featureIndex}`)}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={handleGetStarted}
                    className={`w-full py-2.5 lg:py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm lg:text-base ${
                      index === 1
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {t("getStarted")}
                    <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Benefits - Mobile Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center group">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 rounded-xl flex items-center justify-center mx-auto mb-2 lg:mb-3 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-4 h-4 lg:w-5 lg:h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-sm lg:text-base font-semibold text-gray-900 dark:text-white mb-1">
                    {t(`features.${index}.title`)}
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-300 px-2">
                    {t(`features.${index}.description`)}
                  </p>
                </div>
              ))}
            </div>

            {/* Shipping Partners - Mobile Enhanced */}
            <div className="mt-auto">
              <div className="text-center mb-4 lg:mb-6">
                <p className="text-xs lg:text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{t("trustedBy")}</p>
                <div className="w-16 lg:w-20 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto"></div>
              </div>

              <div className="relative w-full overflow-hidden py-3 lg:py-4">
                {/* Enhanced gradient overlays */}
                <div className="absolute left-0 top-0 w-12 lg:w-20 h-full bg-gradient-to-r from-indigo-50 via-white/90 to-transparent dark:from-gray-900 dark:via-gray-800/90 z-10" />
                <div className="absolute right-0 top-0 w-12 lg:w-20 h-full bg-gradient-to-l from-indigo-50 via-white/90 to-transparent dark:from-gray-900 dark:via-gray-800/90 z-10" />

                {/* Scrollable container with mobile optimization */}
                <div className="flex animate-infinite-scroll">
                  {/* First set of logos */}
                  {companyLogos.map((logo, index) => (
                    <div
                      key={`first-${index}`}
                      className="flex-shrink-0 mx-3 lg:mx-6 opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-110 group"
                    >
                      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-2 lg:p-3 shadow-sm hover:shadow-md transition-all duration-300 group-hover:bg-white dark:group-hover:bg-gray-700">
                        <img
                          src={logo || "/placeholder.svg"}
                          alt={`Partner ${index + 1}`}
                          className="h-6 lg:h-10 w-auto object-contain transition-all duration-300"
                        />
                      </div>
                    </div>
                  ))}

                  {/* Duplicate set for seamless loop */}
                  {companyLogos.map((logo, index) => (
                    <div
                      key={`second-${index}`}
                      className="flex-shrink-0 mx-3 lg:mx-6 opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-110 group"
                    >
                      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-2 lg:p-3 shadow-sm hover:shadow-md transition-all duration-300 group-hover:bg-white dark:group-hover:bg-gray-700">
                        <img
                          src={logo || "/placeholder.svg"}
                          alt={`Partner ${index + 1}`}
                          className="h-6 lg:h-10 w-auto object-contain transition-all duration-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
