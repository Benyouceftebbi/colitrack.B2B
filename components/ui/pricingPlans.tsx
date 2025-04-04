"use client"

import type React from "react"

import { CheckCircle2, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { useShop } from "@/app/context/ShopContext"
import { collection, addDoc, onSnapshot } from "firebase/firestore"
import { db, functions } from "@/firebase/firebase"
import { LoadingButton } from "@/components/ui/LoadingButton"
import { httpsCallable } from "firebase/functions"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Calculate the final price with tax using the formula (Y+0.3)/0.956
const calculateTaxedPrice = (price: number) => {
  return ((price + 0.3) / 0.956).toFixed(2)
}

// Define the price tiers with token amounts based on $10 = 2,400 tokens
const priceTiers = [
  {
    id: "price_tier_1",
    price: 10,
    tokens: "2,400", // 10/10 * 2,400 = 2,400
    hasSenderId: false,
  },
  {
    id: "price_tier_2",
    price: 20,
    tokens: "4,800", // 20/10 * 2,400 = 4,800
    hasSenderId: false,
  },
  {
    id: "price_tier_3",
    price: 50,
    tokens: "12,000", // 50/10 * 2,400 = 12,000
    hasSenderId: false,
  },
  {
    id: "price_tier_4",
    price: 80,
    tokens: "19,200", // 80/10 * 2,400 = 19,200
    hasSenderId: false,
  },
  {
    id: "price_tier_5",
    price: 100,
    tokens: "24,000", // 100/10 * 2,400 = 24,000
    hasSenderId: true,
    popular: true,
  },
  {
    id: "price_tier_6",
    price: 150,
    tokens: "36,000", // 150/10 * 2,400 = 36,000
    hasSenderId: true,
  },
  {
    id: "price_tier_7",
    price: 200,
    tokens: "48,000", // 200/10 * 2,400 = 48,000
    hasSenderId: true,
  },
  {
    id: "price_tier_8",
    price: 300,
    tokens: "72,000", // 300/10 * 2,400 = 72,000
    hasSenderId: true,
  },
]

// Define the sender ID plan
const senderIdPlan = {
  id: "senderId",
  name: "sender-id",
  pricet: 10000,
  features: ["custom-sender-id", "improved-brand-recognition", "higher-open-rates", "priority-support", "per-year"],
  customInput: true,
  special: true,
}

export function PricingPlans({ className }: { className?: string }) {
  const [senderID, setSenderID] = useState("")
  const [selectedTierIndex, setSelectedTierIndex] = useState(4) // Default to the 100 tier (index 4)
  const [customSenderID, setCustomSenderID] = useState("")
  const t = useTranslations("billing")
  const { shopData, setShopData } = useShop()
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})

  const handleSenderIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenderID(e.target.value.slice(0, 11))
  }

  const handleCustomSenderIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomSenderID(e.target.value.slice(0, 11))
  }

  const createCheckoutSession = async (id: string) => {
    if (id === "senderId") {
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
    } else {
      // Handle price tier checkout
      const selectedTier = priceTiers[selectedTierIndex]

      // Validate sender ID if needed
      if (selectedTier.hasSenderId && !customSenderID.trim()) {
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
          price_data: {
            currency: "usd",
            product_data: {
              name: `${t("plan")} $${selectedTier.price}`,
              description: selectedTier.hasSenderId
                ? `${t("tokens-amount", { amount: selectedTier.tokens })} ${t("with-sender-id")}: ${customSenderID}`
                : t("tokens-amount", { amount: selectedTier.tokens }),
            },
            unit_amount: Math.round(selectedTier.price * 100), // Convert to cents
          },
          success_url: window.location.href,
          cancel_url: window.location.href,
          allow_promotion_codes: true,
          client_reference_id: `${shopData.id}-tier-${selectedTier.id}`,
          metadata: selectedTier.hasSenderId ? { senderId: customSenderID } : undefined,
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
    }
  }

  // Custom tooltip content for price information
  const PriceTooltip = ({ price }: { price: number }) => (
    <div className="p-1">
      <div className="font-medium text-sm mb-1 text-black">
        {t("final-price")}: <span className="text-primary">${calculateTaxedPrice(price)}</span>
      </div>
      <div className="text-xs mt-1 text-muted-foreground">
        {t("Additional-charges")}
      </div>
    </div>
  )

  return (
    <TooltipProvider>
      <div className={`py-2 ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Price Tiers Selection */}
          <div className="bg-white rounded-lg border shadow-md p-5 md:col-span-2">
            <h2 className="text-xl font-bold mb-4">{t("select-plan")}</h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {priceTiers.map((tier, index) => (
                <div
                  key={tier.id}
                  className={cn(
                    "border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md",
                    selectedTierIndex === index
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-gray-200 hover:border-gray-300",
                  )}
                  onClick={() => setSelectedTierIndex(index)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-bold">
                        ${tier.price} <span className="text-xs font-normal text-muted-foreground">+ VAT</span>
                      </span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 text-primary/70 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-white border shadow-md text-black">
                          <PriceTooltip price={tier.price} />
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    {tier.popular && (
                      <Badge className="bg-primary text-primary-foreground text-xs">{t("popular")}</Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">
                    {t("tokens-amount", { amount: tier.tokens })}
                  </div>
                  {tier.hasSenderId && (
                    <div className="flex items-center text-xs text-primary font-medium">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      {t("free-senderID")}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Selected Plan Details */}
            <div className="bg-muted/30 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold">{t("selected-plan")}</h3>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-bold">
                    ${priceTiers[selectedTierIndex].price}{" "}
                    <span className="text-xs font-normal text-muted-foreground">+ VAT</span>
                  </span>
                  <span className="text-xs text-primary cursor-help ml-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="underline">Learn more</span>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-white border shadow-md text-black">
                        <PriceTooltip price={priceTiers[selectedTierIndex].price} />
                      </TooltipContent>
                    </Tooltip>
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm">
                    {t("tokens-amount", { amount: priceTiers[selectedTierIndex].tokens })}
                  </span>
                </div>

                {priceTiers[selectedTierIndex].hasSenderId ? (
                  <>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">{t("free-senderID")}</span>
                    </div>

                    <div className="mt-3">
                      <label className="text-xs font-medium mb-1 block">{t("enter-sender-id")}</label>
                      <Input
                        type="text"
                        placeholder={t("enter-sender-id")}
                        value={customSenderID}
                        onChange={handleCustomSenderIDChange}
                        maxLength={11}
                        className="w-full text-sm h-9"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {t("characters-remaining", { count: 11 - customSenderID.length })}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center text-muted-foreground">
                  </div>
                )}
              </div>
            </div>

            <LoadingButton
              className="w-full h-10 text-sm font-medium"
              variant="default"
              onClick={() => createCheckoutSession("price_tier")}
              loading={loadingStates["price_tier"] || false}
              disabled={priceTiers[selectedTierIndex].hasSenderId && !customSenderID.trim()}
            >
              <span>{t("proceed-to-checkout")}</span>
            </LoadingButton>
          </div>

          {/* Sender ID Plan */}
          <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white h-full flex flex-col">
            <CardHeader className="pb-2 pt-5 px-5">
              <CardTitle className="text-xl font-bold text-white flex items-center gap-1">
                {t(`plan-${senderIdPlan.name}`)}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-white/80 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-white border shadow-md text-black">
                    <div className="p-1">
                      <div className="font-medium text-sm mb-1 text-black">
                        {t("token-cost")}: <span className="text-primary">{senderIdPlan.pricet} Tokens</span>
                      </div>
                      <div className="bg-muted/40 px-2 py-1 rounded text-xs font-mono text-black">
                        {t("equivalent-to")}: ${(senderIdPlan.pricet / 240).toFixed(2)}
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
              <CardDescription className="flex items-baseline gap-1 mt-2 text-white/80">
                <span className="text-3xl font-bold">{`${senderIdPlan.pricet} Tokens`}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="px-5 pb-5 flex-grow flex flex-col justify-between">
              <div>
                <ul className="space-y-2 mb-4">
                  {senderIdPlan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                      <span className="text-white/90 text-sm font-medium">{t(feature)}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4">
                  <label className="text-xs font-medium mb-1 block text-white/90">{t("enter-sender-id")}</label>
                  <Input
                    type="text"
                    placeholder={t("enter-sender-id")}
                    value={senderID}
                    onChange={handleSenderIDChange}
                    maxLength={11}
                    className="w-full bg-white/20 text-white placeholder-white/50 border-white/30 text-sm h-9"
                  />
                  <p className="text-xs text-white/80 mt-1">
                    {t("characters-remaining", { count: 11 - senderID.length })}
                  </p>
                </div>
              </div>

              <LoadingButton
                className="w-full bg-white text-blue-600 hover:bg-white/90 h-10 text-sm font-medium mt-6"
                variant="secondary"
                onClick={() => createCheckoutSession(senderIdPlan.id)}
                loading={loadingStates[senderIdPlan.id] || false}
                disabled={!senderID.trim() || shopData.senderId || shopData.senderIdRequest}
              >
                <span>{t("proceed")}</span>
              </LoadingButton>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}

