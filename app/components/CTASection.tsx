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
    price: 10,
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
    tokens: 24000,
    bonus: 15,
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
    bonus: 5,
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
 
  "https://www.golivri.dz/assets/img/logo.png",
  "https://maystro-delivery.com/img/logo.svg",
  "https://noest-dz.com/assets/img/logo_colors_new.png",
  "https://yalidine.com/assets/img/yalidine-logo.png",
  "https://dhd-dz.com/assets/img/logo.png",
  "https://www.ups.com/assets/resources/webcontent/images/ups-logo.svg",
  "https://scontent.falg7-1.fna.fbcdn.net/v/t39.30808-6/475111862_1099808351946474_2343518860893375878_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=qxQrg2l_5eYQ7kNvgGEYoQA&_nc_oc=AdhlWPB_h1C3oHJHXEYv-lQVYD0YUsnE4x07NEY699RZAqANI1YXUOig9WnONcvNr4U&_nc_zt=23&_nc_ht=scontent.falg7-1.fna&_nc_gid=AP_mcxO85CCInjpgEXNpflH&oh=00_AYCFOO8o2CffLeECa53RclQ89IVcMDpyS1lEyEwEgZPRZg&oe=67C95F1D",
  "https://andersonlogistique.com/medias/logo.png",
  "https://scontent.falg6-1.fna.fbcdn.net/v/t39.30808-1/434769415_722458340089641_9012205629968470051_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=108&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=r7YAOB2MUKsQ7kNvgHPaYRv&_nc_oc=AdiPLPfeUG4jpAz78iSdJY5CMHJEUClR8CazFK4JAzO0gaq4qM2EFqrlQf7dMjj7PJU&_nc_zt=24&_nc_ht=scontent.falg6-1.fna&_nc_gid=A-Dh7X3mD9NpMUpY-InAs11&oh=00_AYCEi_whG4ICiL88FJ2-F2M6R5CyG1DylFlxQaTQ2og70w&oe=67C93AE7",
  "https://www.fret.direct/images/logoFRETs.png",
  "https://scontent.falg7-1.fna.fbcdn.net/v/t39.30808-1/305769282_479708007506758_5994560203379088099_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=105&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=c3B2jxsWBS4Q7kNvgFn1IXW&_nc_oc=AdiYdW9zEBWfxhyhtPLfe7W0rBEIQ2k3FN6uH2tof6xVrXwk0DT5wJPo2EDLaPhTyH4&_nc_zt=24&_nc_ht=scontent.falg7-1.fna&_nc_gid=AYTFCCYI08wEpTejTO0FFRx&oh=00_AYBB02yaGJ_SwRRbnK8u0Pp-jKN7lbvWhoxw940VOqioLQ&oe=67C93DDC",
  "https://scontent.falg7-6.fna.fbcdn.net/v/t39.30808-1/293208422_413753410769695_2061037653088408367_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=106&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=t9Qwk0E9ABcQ7kNvgGdOtDZ&_nc_oc=AdioRj-gRvJA16BnTfdSemytVF6oxEEYhHfu5nqwe1_xi10JM16Eut5CH3b4ic4vR90&_nc_zt=24&_nc_ht=scontent.falg7-6.fna&_nc_gid=AEkoZBxmG1aBh5Wm3eY7ZuR&oh=00_AYCrZuHie8h5fsDyt5fRRsPwJqQts8geYtDbHyWaxBOjvA&oe=67C9388F",
  "https://www.fastmaildz.com/images/logo.jpg",
  "https://scontent.falg6-2.fna.fbcdn.net/v/t39.30808-1/263758272_435108671603514_5845124433874265577_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=109&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=eRlOxHGFug0Q7kNvgH4AFoZ&_nc_oc=AdgMpI8HCcRae6ogXJUDNDeVHoI6gO3OSNi1Dg1HTXAxq0Vi04BFX6wWxUmqx0CO3jQ&_nc_zt=24&_nc_ht=scontent.falg6-2.fna&_nc_gid=A-Knn4X9gtpZx7HhTMiZx4L&oh=00_AYB2oAXqcrULM4BaBr2oD1y7vcENvvKJtqxQoRceHYf3LA&oe=67C947CA",
  "https://scontent.falg7-1.fna.fbcdn.net/v/t39.30808-1/402021614_327699743341843_5588031550523391196_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=105&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=yWZGgWUhbQgQ7kNvgFNgN7G&_nc_oc=Adi1mC-9Aju87tsnq8k-yTMie68fTvtcE3XRRenHKdCI5ngstJPiR9ZATKxkCMtDyf0&_nc_zt=24&_nc_ht=scontent.falg7-1.fna&_nc_gid=A8RILBFur7JuAeyc7euhg-E&oh=00_AYBTUQxbtP99GEu24IOfWOdoEijZBDHi5ABPYo2RV-Dd3g&oe=67C96550",
  "https://www.rocket-dz.com/assets/img/logo_white.png",
  "https://scontent.falg6-2.fna.fbcdn.net/v/t39.30808-1/458740709_938179221669263_4771285373707372818_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=103&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=Y47KFaocfDcQ7kNvgGKmLpV&_nc_oc=AdiNNYeI7HBjQHc7jv1e5jQ_2tas4HokjZYzw9v8zwyQ10gcEdFXQp1X3lpwxJR9Qxo&_nc_zt=24&_nc_ht=scontent.falg6-2.fna&_nc_gid=AOi1SolIIVlf2Mkfs-mA55L&oh=00_AYAIqt7FwxvBrHijnaZmTCKwNdYmj6-BhadOoKECddHK3w&oe=67C968BE",
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

