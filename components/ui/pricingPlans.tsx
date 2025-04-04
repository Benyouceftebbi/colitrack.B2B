"use client"

import type React from "react"

import { CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { useShop } from "@/app/context/ShopContext"
import { collection, addDoc, onSnapshot } from "firebase/firestore"
import { db, functions } from "@/firebase/firebase"
import { LoadingButton } from "@/components/ui/LoadingButton"
import { httpsCallable } from "firebase/functions"
import { toast } from "@/hooks/use-toast"

const plans = [
  {
    id: "price_1Qze0MDIpjCcuDeHIOR6NxQH",
    name: "starter",
    price: 10.99,
    tokens: "2,400",
    bonus: "",
    features: ["basic-sms-notifications", "standard-delivery-tracking", "email-support", "api-access"],
  },
  {
    id: "price_1Qze0MDIpjCcuDeHYaGrnSlE",
    name: "enterprise",
    price: 100,
    tokens: "25,200",
    bonus: "enterprise-bonus",
    customSenderId: true,
    features: [
      "free-senderID",
      "enterprise-sms-automation",
      "premium-delivery-tracking",
      "24-7-priority-support",
      "advanced-api-access",
      "custom-analytics",
      "dedicated-account-manager",
      "custom-integrations",
      "sla-guarantee",
    ],
    popular: true,
  },
  {
    id: "price_1Qze0MDIpjCcuDeH18DmcHen",
    name: "business",
    price: 80,
    tokens: "19,200",
    bonus: "",
    features: [
      "advanced-sms-automation",
      "priority-delivery-tracking",
      "priority-email-chat-support",
      "advanced-api-access",
      "analytics-dashboard",
      "custom-integrations",
    ],
  },
  {
    id: "custom",
    name: "custom",
    customPrice: true,
    customSenderId: true,
    minPrice: 110,
    maxPrice: 300,
    bonus: "enterprise-bonus",
    features: [
      "free-senderID",
      "enterprise-sms-automation",
      "premium-delivery-tracking",
      "24-7-priority-support",
      "advanced-api-access",
      "custom-analytics",
      "dedicated-account-manager",
      "custom-integrations",
      "sla-guarantee",
      "flexible-pricing",
    ],
  },
  {
    id: "senderId",
    name: "sender-id",
    pricet: 10000,
    features: ["custom-sender-id", "improved-brand-recognition", "higher-open-rates", "priority-support", "per-year"],
    customInput: true,
    special: true,
  },
]

export function PricingPlans({ className }: { className?: string }) {
  const [senderID, setSenderID] = useState("")
  const [enterpriseSenderID, setEnterpriseSenderID] = useState("")
  const [customSenderID, setCustomSenderID] = useState("")
  const [customPrice, setCustomPrice] = useState("110")
  const t = useTranslations("billing")
  const { shopData, setShopData } = useShop()
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})

  // Predefined price options for the custom plan
  const priceOptions = [150, 200, 250, 300]
  const [selectedPriceIndex, setSelectedPriceIndex] = useState(0)

  const handleSenderIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenderID(e.target.value.slice(0, 11))
  }

  const handleEnterpriseSenderIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnterpriseSenderID(e.target.value.slice(0, 11))
  }

  const handleCustomSenderIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomSenderID(e.target.value.slice(0, 11))
  }

  // Update custom price when price option changes
  useEffect(() => {
    setCustomPrice(priceOptions[selectedPriceIndex].toString())
  }, [selectedPriceIndex])

  const selectPriceOption = (index: number) => {
    setSelectedPriceIndex(index)
  }

  const createCheckoutSession = async (id: string) => {
    if (id === "custom") {
      // Validate custom price
      const priceValue = Number.parseInt(customPrice, 10)
      if (isNaN(priceValue) || priceValue < 110 || priceValue > 300) {
        toast({
          title: "error",
          description: t("invalid-price-range"),
          variant: "destructive",
        })
        return
      }

      // Validate custom sender ID
      if (!customSenderID.trim()) {
        toast({
          title: "error",
          description: t("sender-id-required"),
          variant: "destructive",
        })
        return
      }

      setLoadingStates((prev) => ({ ...prev, [id]: true }))

      try {
        // Create checkout session with custom price
        const checkoutSessionRef = collection(db, "Customers", shopData.id, "checkout_sessions")
        const docRef = await addDoc(checkoutSessionRef, {
          mode: "payment",
          price_data: {
            currency: "usd",
            product_data: {
              name: `Custom Plan ($${priceValue})`,
              description: `Custom plan with Sender ID: ${customSenderID}`,
            },
            unit_amount: priceValue * 100, // Convert to cents
          },
          success_url: window.location.href,
          cancel_url: window.location.href,
          allow_promotion_codes: true,
          client_reference_id: `${shopData.id}-custom-${priceValue}-${customSenderID}`,
          metadata: {
            senderId: customSenderID,
          },
        })

        onSnapshot(docRef, (snap) => {
          const { error, url } = snap.data() || {}
          if (error) {
            toast({
              title: "error",
              description: error.message,
              variant: "destructive",
            })
            setLoadingStates((prev) => ({ ...prev, [id]: false }))
          }
          if (url) {
            window.location.assign(url)
            setLoadingStates((prev) => ({ ...prev, [id]: false }))
          }
        })
      } catch (error) {
        toast({
          title: "error",
          description: t("something-went-wrong"),
          variant: "destructive",
        })
        setLoadingStates((prev) => ({ ...prev, [id]: false }))
      }
    } else if (id === "price_1Qze0MDIpjCcuDeHYaGrnSlE") {
      // Enterprise plan
      if (!enterpriseSenderID.trim()) {
        toast({
          title: "error",
          description: t("sender-id-required"),
          variant: "destructive",
        })
        return
      }

      setLoadingStates((prev) => ({ ...prev, [id]: true }))

      try {
        const checkoutSessionRef = collection(db, "Customers", shopData.id, "checkout_sessions")
        const docRef = await addDoc(checkoutSessionRef, {
          mode: "payment",
          price: id,
          success_url: window.location.href,
          cancel_url: window.location.href,
          allow_promotion_codes: true,
          client_reference_id: `${shopData.id}-${id}`,
          metadata: {
            senderId: enterpriseSenderID,
          },
        })

        onSnapshot(docRef, (snap) => {
          const { error, url } = snap.data() || {}
          if (error) {
            toast({
              title: "error",
              description: error.message,
              variant: "destructive",
            })
            setLoadingStates((prev) => ({ ...prev, [id]: false }))
          }
          if (url) {
            window.location.assign(url)
            setLoadingStates((prev) => ({ ...prev, [id]: false }))
          }
        })
      } catch (error) {
        toast({
          title: "error",
          description: t("something-went-wrong"),
          variant: "destructive",
        })
        setLoadingStates((prev) => ({ ...prev, [id]: false }))
      }
    } else if (id !== "senderId") {
      setLoadingStates((prev) => ({ ...prev, [id]: true }))
      const checkoutSessionRef = collection(db, "Customers", shopData.id, "checkout_sessions")
      const docRef = await addDoc(checkoutSessionRef, {
        mode: "payment",
        price: id,
        success_url: window.location.href,
        cancel_url: window.location.href,
        allow_promotion_codes: true,
        client_reference_id: `${shopData.id}-${id}`,
      })

      onSnapshot(docRef, (snap) => {
        const { error, url } = snap.data() || {}
        if (error) {
          toast({
            title: "error",
            description: error.message,
            variant: "destructive",
          })
          setLoadingStates((prev) => ({ ...prev, [id]: false }))
        }
        if (url) {
          window.location.assign(url)
          setLoadingStates((prev) => ({ ...prev, [id]: false }))
        }
      })
    } else {
      try {
        setLoadingStates((prev) => ({ ...prev, [id]: true }))
        const requestSenderId = httpsCallable(functions, "requestSenderId")
        const result = await requestSenderId({ senderId: senderID })
        const response = result.data as any

        if (response.status === "success") {
          setShopData((prev) => ({
            ...prev,
            tokens: response.data.newTokens,
            senderIdRequest: {
              status: "pending",
              requestDate: new Date(),
              expectedDeliveryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
              senderId: senderID,
            },
          }))
          toast({
            title: "success",
            description: response.message,
            variant: "default",
          })
        } else {
          toast({
            title: "error",
            description: response.message,
            variant: "destructive",
          })
        }
      } catch (error) {
        toast({
          title: "error",
          description: t("something-went-wrong"),
          variant: "destructive",
        })
      } finally {
        setLoadingStates((prev) => ({ ...prev, [id]: false }))
      }
    }
  }

  // Calculate tokens based on custom price
  function calculateCustomTokens() {
    const price = Number.parseInt(customPrice, 10) || 110
    // Calculate tokens based on the price ratio (similar to enterprise plan)
    return Math.floor((price / 100) * 25200).toLocaleString()
  }

  return (
    <div className={`py-2 ${className}`}>
      <div className="grid md:grid-cols-1 lg:grid-cols-5 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative ${plan.popular ? "border-primary shadow-lg" : ""} ${plan.special ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white" : ""} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
          >
            {plan.popular && (
              <Badge className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 text-sm py-1 px-3 z-10 bg-primary text-primary-foreground font-medium">
                {t("most-popular")}
              </Badge>
            )}
            <CardHeader className="pb-3 pt-5 px-5">
              <CardTitle className={`text-xl font-bold ${plan.special ? "text-white" : ""}`}>
                {t(`plan-${plan.name}`)}
              </CardTitle>
              <CardDescription className={`flex items-baseline gap-1 mt-2 ${plan.special ? "text-white/80" : ""}`}>
                {plan.customPrice ? (
                  <div className="flex flex-col gap-2 w-full">
                    <span className="text-sm font-medium">{t("custom-price")}</span>

                    {/* Price selector buttons */}
                    <div className="grid grid-cols-4 gap-1 mb-1">
                      {priceOptions.map((price, index) => (
                        <button
                          key={price}
                          type="button"
                          onClick={() => selectPriceOption(index)}
                          className={`py-1 px-2 text-sm rounded-md transition-colors ${
                            selectedPriceIndex === index
                              ? "bg-primary text-primary-foreground font-medium"
                              : "bg-muted/50 hover:bg-muted"
                          }`}
                        >
                          ${price}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center bg-muted/30 rounded-md p-2 pl-3">
                      <span className="text-2xl font-bold">${customPrice}</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="text-3xl font-bold">
                      {plan.price ? `$${plan.price}` : `${plan.pricet} Tokens`}
                    </span>
                    <span className={`text-sm ${plan.special ? "text-white/80" : "text-muted-foreground"}`}></span>
                  </>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              {!plan.special && (
                <div className="bg-muted/50 rounded-md p-3 mb-4 text-sm">
                  <div className="font-semibold text-base">
                    {plan.customPrice
                      ? t("tokens-amount", { amount: calculateCustomTokens() })
                      : t("tokens-amount", { amount: plan.tokens })}
                  </div>
                  {plan.bonus && <div className="text-primary text-sm mt-1">{t(plan.bonus)}</div>}
                </div>
              )}
              <ul className="space-y-2 mb-4 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckCircle2 className={`h-5 w-5 ${plan.special ? "text-white" : "text-primary"}`} />
                    <span className={`${plan.special ? "text-white/90" : ""} font-medium`}>{t(feature)}</span>
                  </li>
                ))}
              </ul>

              {plan.customInput && (
                <div className="mt-3 mb-4">
                  <Input
                    type="text"
                    placeholder={t("enter-sender-id")}
                    value={senderID}
                    onChange={handleSenderIDChange}
                    maxLength={11}
                    className="w-full bg-white/20 text-white placeholder-white/50 border-white/30 text-sm h-10"
                  />
                  <p className="text-xs text-white/80 mt-1">
                    {t("characters-remaining", { count: 11 - senderID.length })}
                  </p>
                </div>
              )}

              {plan.customSenderId && plan.name === "enterprise" && (
                <div className="mt-3 mb-4">
                  <label className="text-sm font-medium mb-1 block">{t("enter-sender-id")}</label>
                  <Input
                    type="text"
                    placeholder={t("enter-sender-id")}
                    value={enterpriseSenderID}
                    onChange={handleEnterpriseSenderIDChange}
                    maxLength={11}
                    className="w-full text-sm h-10"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("characters-remaining", { count: 11 - enterpriseSenderID.length })}
                  </p>
                </div>
              )}

              {plan.customSenderId && plan.name === "custom" && (
                <div className="mt-3 mb-4">
                  <label className="text-sm font-medium mb-1 block">{t("enter-sender-id")}</label>
                  <Input
                    type="text"
                    placeholder={t("enter-sender-id")}
                    value={customSenderID}
                    onChange={handleCustomSenderIDChange}
                    maxLength={11}
                    className="w-full text-sm h-10"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("characters-remaining", { count: 11 - customSenderID.length })}
                  </p>
                </div>
              )}

              <LoadingButton
                className={`w-full ${plan.special ? "bg-white text-blue-600 hover:bg-white/90" : ""} h-11 text-base font-medium`}
                variant={plan.popular ? "default" : plan.special ? "secondary" : "outline"}
                onClick={() => createCheckoutSession(plan.id)}
                loading={loadingStates[plan.id] || false}
                disabled={
                  (plan.id === "senderId" && (shopData.senderId || shopData.senderIdRequest)) ||
                  (plan.id === "custom" && !customSenderID.trim()) ||
                  (plan.id === "price_1Qze0MDIpjCcuDeHYaGrnSlE" && !enterpriseSenderID.trim())
                }
              >
                <span className="text-sm">{t("proceed")}</span>
              </LoadingButton>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

