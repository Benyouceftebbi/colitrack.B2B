"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Check, ArrowRight, ArrowLeft, ZoomIn, ZoomOut, Copy, CheckCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

import { providerConfigs, type ProviderConfig } from "../config/providerConfigs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useTranslations } from "next-intl"
import { httpsCallable } from "firebase/functions"
import { functions } from "@/firebase/firebase"
import { LoadingButton } from "@/components/ui/LoadingButton"

interface FormData {
  apiToken: string
  language: string
  apiKey?: string
  apiId?: string
  lng?: string
  accessKey?: string
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768)
    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  return isMobile
}

export function Steps({
  provider,
  onComplete,
  shopData,
  setShopData,
}: {
  provider: string
  onComplete: (provider: string, data: FormData) => void
  shopData: {
    authToken?: string
    deliveryCompany?: string
    lng?: string
    apiId?: string
    id?: string
  }
  setShopData: any
}) {
  const { toast } = useToast()
  const t = useTranslations("settings")
  const isMobile = useIsMobile()
  const [currentStep, setCurrentStep] = useState(0)
  const [imageLoading, setImageLoading] = useState(true)
  const [isZoomed, setIsZoomed] = useState(false)
  const [copiedName, setCopiedName] = useState(false)
  const [copiedtextEmail, setCopidTextEamil] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [language, setLanguage] = useState<string | null>(shopData.lng || null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const config: ProviderConfig = providerConfigs[provider] || providerConfigs["DHD"]
  const steps = config.steps

  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Only detect the initial preference, don't modify the DOM
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    setIsDarkMode(prefersDarkMode)

    // Listen for changes in color scheme preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e) => {
      setIsDarkMode(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      setImageLoading(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setImageLoading(true)
    }
  }

  const isStepAccessible = (stepIndex: number) => {
    // Logic to determine if a step is accessible
    // For example, only allow accessing steps that are completed or the next step
    return stepIndex <= currentStep + 1
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const storeDeliveryToken = httpsCallable(functions, "storeDeliveryToken")

      const submissionData: FormData = { ...data, provider }

      if (!language) {
        throw new Error(t("language-required"))
      }
      submissionData.lng = language

      if (provider === "ZR express" || provider === "E-COM Delivery") {
        if (!data.apiId || !data.apiToken) {
          throw new Error("Token and Clé are required for ZR Express")
        }
      } else if (provider === "Yalidin Express" || provider === "Guepex" || provider === "NOEST Express" ) {
        if (!data.apiId || !data.apiToken) {
          throw new Error(t("yalidin-credentials-required"))
        }
      } else {
        if (!data.apiKey) {
          throw new Error(t("api-key-required"))
        }
        submissionData.accessKey = data.apiKey
      }

      // Determine required fields based on provider
      let requiredFields: string[] = []
      if (provider === "ZR express" || provider === "E-COM Delivery") {
        requiredFields = ["apiId", "apiToken", "lng"]
      } else if (provider === "Yalidin Express" || provider === "Guepex" || provider === "NOEST Express") {
        requiredFields = ["apiId", "apiToken", "lng"]
      } else {
        requiredFields = ["apiKey", "lng"]
      }

      const missingFields = requiredFields.filter((field) => !submissionData[field])
      if (missingFields.length > 0) {
        throw new Error(t("error-required-fields", { fields: missingFields.join(", ") }))
      }

      // Call Firebase Cloud Function to store delivery credentials
      
        // For other providers, use the existing logic
        await storeDeliveryToken({
          deliveryCompany: provider,
          apiToken: submissionData.apiToken || null,
          apiKey: submissionData.apiId || submissionData.apiKey,
          lng: submissionData.lng,
          shopId: shopData.id,
        })

        setShopData((prev) => ({
          ...prev,
          deliveryCompany: provider,
          apiToken: submissionData.apiToken || null,
          apiKey: submissionData.apiId || submissionData.apiKey,
          lng: submissionData.lng,
        }))
      
      
      onComplete(provider, submissionData)

      toast({
        title: t("setup-completed"),
        description: t("setup-success"),
      })
    } catch (error) {
      console.error("Error updating shipping information:", error)

      toast({
        title: t("error"),
        description: "wrong shipping information", // Ensure it's a string
        variant: "destructive",
      })
    }
  }
  

  const copyToClipboard = (text: string, setCopiedState: (value: boolean) => void) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedState(true)
      toast({
        title: t("copied-title"),
        description: t("copied-description"),
      })
      setTimeout(() => setCopiedState(false), 3000)
    })
  }

  useEffect(() => {
    if (shopData.deliveryCompany && shopData.authToken && shopData.lng) {
      setCurrentStep(steps.length - 1) // Set to the last step
    }
  }, [shopData, steps.length])

  const name = "ColiTrack"
  const webhookEmail = "colitrackdz@gmail.com"
  const webhookLink = `https://statusupdate-owkdnzrr3a-uc.a.run.app/${shopData.id}`

  const email = `Subject: Urgent: Webhook Not Triggering Issue

Dear Yalidine Support Team,

I hope this email finds you well. I am reaching out regarding an issue with the webhook setup on my Yalidine account. While the webhook has been successfully created and activated, it is not being triggered when expected.

Here are the details of my setup:

Account Name/ID: ${shopData.id}


Expected Events: parcel_status_updated

Issue Faced: The webhook is not being triggered despite being activated. I have tested the endpoint separately, and it is receiving requests correctly from other sources.

Despite these steps, the webhook is still not triggering. I would appreciate your assistance in resolving this issue as soon as possible.

Please let me know if you need any additional information from my side. Looking forward to your prompt response.

Best regards,
**${shopData.companyName},**
**${shopData.firstName},**
`

  return (
    <SidebarProvider>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
          <div className="flex flex-col md:flex-row h-full md:h-[700px] w-full md:w-[900px] mx-auto bg-background rounded-lg shadow-lg overflow-hidden border">
            {!isMobile && (
              <Sidebar className="w-full md:w-72 border-b md:border-r border-r-0 bg-muted/50 dark:bg-muted/20 flex flex-col">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold">{t("setup-process")}</h2>
                  <p className="text-sm text-muted-foreground">{t("complete-all-steps")}</p>
                </div>
                <SidebarContent className="flex-1 overflow-y-auto py-6 flex items-center justify-center">
                  <SidebarMenu className="relative w-full max-w-xs">
                    {steps.map((step, index) => (
                      <SidebarMenuItem key={index} className="relative z-10 mb-2">
                        <SidebarMenuButton
                          onClick={() => (isStepAccessible(index) ? setCurrentStep(index) : null)}
                          isActive={currentStep === index}
                          className={`py-3 px-4 w-full text-left hover:bg-muted transition-colors duration-200 ${
                            !isStepAccessible(index) ? "opacity-50 cursor-not-allowed" : ""
                          } ${index < currentStep ? "text-primary" : ""}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative flex items-center justify-center h-12">
                              {index > 0 && (
                                <div
                                  className={`absolute left-1/2 -top-[22px] w-[2px] h-[22px] transform -translate-x-1/2 ${
                                    index <= currentStep ? "bg-primary" : "bg-gray-300"
                                  }`}
                                  aria-hidden="true"
                                />
                              )}
                              <span
                                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium shrink-0 ${
                                  currentStep === index
                                    ? "bg-primary border-primary text-primary-foreground"
                                    : index < currentStep
                                      ? "bg-primary border-primary text-primary-foreground"
                                      : "bg-background dark:bg-muted border-gray-300 dark:border-gray-600"
                                }`}
                              >
                                {index < currentStep ? <Check className="h-5 w-5" /> : index + 1}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className={`text-sm font-medium ${index < currentStep ? "text-primary" : ""}`}>
                                {step.title}
                              </span>
                              {step.subtitle && (
                                <span
                                  className={`text-xs ${index < currentStep ? "text-primary/70" : "text-muted-foreground"}`}
                                >
                                  {step.subtitle}
                                </span>
                              )}
                            </div>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarContent>
                <div className="p-4 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{t("progress")}</span>
                    <span className="text-xs font-medium">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
                  </div>
                  <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
                </div>
              </Sidebar>
            )}
            <div className="flex-1 flex flex-col w-full">
              {isMobile && (
                <div className="w-full bg-muted/50 dark:bg-muted/20 p-4 border-b">
                  <div className="mb-2 flex justify-between items-center">
                    <h3 className="text-sm font-medium">
                      {t("current-step")}: {currentStep + 1}/{steps.length}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {Math.round(((currentStep + 1) / steps.length) * 100)}% {t("complete")}
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-2 mb-3 overflow-x-auto pb-2 no-scrollbar"
                    style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
                  >
                    {steps.map((step, index) => (
                      <Button
                        key={index}
                        variant={currentStep === index ? "default" : index < currentStep ? "outline" : "ghost"}
                        size="sm"
                        className={`rounded-full min-w-[32px] h-8 px-2 ${
                          currentStep === index
                            ? "bg-primary text-primary-foreground"
                            : index < currentStep
                              ? "border-primary text-primary"
                              : !isStepAccessible(index)
                                ? "opacity-50 cursor-not-allowed"
                                : "text-muted-foreground"
                        }`}
                        onClick={() => (isStepAccessible(index) ? setCurrentStep(index) : null)}
                      >
                        {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
                      </Button>
                    ))}
                  </div>
                  <Select
                    value={currentStep.toString()}
                    onValueChange={(value) => setCurrentStep(Number.parseInt(value))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                            {currentStep + 1}
                          </span>
                          {steps[currentStep]?.title || t("select-step")}
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {steps.map((step, index) => (
                        <SelectItem key={index} value={index.toString()}>
                          <div className="flex items-center gap-2">
                            <span
                              className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                                currentStep === index
                                  ? "bg-primary text-primary-foreground"
                                  : index < currentStep
                                    ? "bg-primary/20 text-primary"
                                    : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {index + 1}
                            </span>
                            {step.title}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex-1 flex flex-col items-center justify-center p-10 space-y-8">
                <div className="text-center max-w-lg">
                  <h3 className="text-3xl font-bold mb-4">{steps[currentStep]?.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">{steps[currentStep]?.description}</p>
                </div>
                {(provider === "Yalidin Express" || provider === "Guepex") && currentStep === steps.length - 4 ? (
                  <div className="w-full max-w-md space-y-4 px-4 md:px-0">
                    <div className="flex items-center space-x-2">
                      <Input
                        value={name}
                        readOnly
                        className="bg-muted dark:bg-muted/30 flex-grow text-base md:text-lg"
                      />
                      <Button
                        onClick={() => copyToClipboard(name, setCopiedName)}
                        className="flex items-center justify-center"
                        size="icon"
                        type="button"
                      >
                        {copiedName ? <CheckCircle className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={webhookEmail}
                        readOnly
                        className="bg-muted dark:bg-muted/30 flex-grow text-base md:text-lg"
                      />
                      <Button
                        onClick={() => copyToClipboard(webhookEmail, setCopiedEmail)}
                        className="flex items-center justify-center"
                        size="icon"
                        type="button"
                      >
                        {copiedEmail ? <CheckCircle className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={webhookLink}
                        readOnly
                        className="bg-muted dark:bg-muted/30 flex-grow text-base md:text-lg"
                      />
                      <Button
                        onClick={() => copyToClipboard(webhookLink, setCopiedLink)}
                        className="flex items-center justify-center"
                        size="icon"
                        type="button"
                      >
                        {copiedLink ? <CheckCircle className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                      </Button>
                    </div>
                  </div>
                ) : steps[currentStep]?.image ? (
                  <div className="relative w-full max-w-2xl aspect-[16/9] bg-muted dark:bg-muted/30 rounded-lg overflow-hidden group">
                    {imageLoading && <Skeleton className="absolute inset-0 z-10" />}
                    <Image
                      src={steps[currentStep].image || "/placeholder.svg"}
                      alt={t("step-image-alt", { step: currentStep + 1, title: steps[currentStep].title })}
                      fill
                      className={`object-contain transition-transform duration-300 ${
                        isZoomed ? "scale-150" : "scale-100"
                      }`}
                      priority
                      onLoad={() => setImageLoading(false)}
                    />
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                          size="icon"
                          variant="secondary"
                        >
                          <ZoomIn className="h-5 w-5" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <div className="relative aspect-[16/9]">
                          <Image
                            src={steps[currentStep].image || "/placeholder.svg"}
                            alt={t("step-image-alt", { step: currentStep + 1, title: steps[currentStep].title })}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      size="icon"
                      variant="secondary"
                      onClick={() => setIsZoomed(!isZoomed)}
                    >
                      {isZoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
                    </Button>
                  </div>
                ) : null}
              

                {currentStep === steps.length - 1 && (
                  <div className="w-full max-w-md space-y-4 px-4 md:px-0">
                    {provider === "Yalidin Express" || provider === "Guepex" || provider === "NOEST Express" || provider === "ZR express" || provider === "E-COM Delivery"? (
                      <>
                        <div>
                          <label htmlFor="apiId" className="block text-lg font-medium mb-2">
                            {provider === "NOEST Express" ? t("token") : ''}
                            {provider === "ZR express" || provider ==="E-COM Delivery" ? t("token") : ''}
                          </label>
                          <Input
                            id={"apiId"}
                            type="text"
                            placeholder={t("enter-api-id")}
                            {...register("apiId", { required: true })}
                            className={`text-base md:text-lg ${errors.apiId ? "border-red-500" : ""}`}
                          />
                          {errors.apiId && <p className="mt-1 text-sm text-red-500">{t("api-id-required")}</p>}
                        </div>
                        <div>
                          <label htmlFor="apiToken" className="block text-lg font-medium mb-2">
                            {provider === "NOEST Express" ? t("guid") : ''}
                            {provider === "ZR express" || provider ==="E-COM Delivery" ? t("cle") : ''}

                          </label>
                          <Input
                            id="apiToken"
                            type="text"
                            placeholder={t("enter-api-token")}
                            {...register("apiToken", { required: true })}
                            className={`text-base md:text-lg ${errors.apiToken ? "border-red-500" : ""}`}
                          />
                          {errors.apiToken && <p className="mt-1 text-sm text-red-500">{t("api-token-required")}</p>}
                        </div>
                      </>
                    ) : (
                      <div>
                        <label htmlFor="apiKey" className="block text-lg font-medium mb-2">
                          {t("api-key")}
                        </label>
                        <Input
                          id="apiKey"
                          type="text"
                          placeholder={t("enter-api-key")}
                          {...register("apiKey", { required: true })}
                          className={`text-base md:text-lg ${errors.apiKey ? "border-red-500" : ""}`}
                        />
                        {errors.apiKey && <p className="mt-1 text-sm text-red-500">{t("api-key-required")}</p>}
                      </div>
                    )}
                    <div>
                      <label htmlFor="language" className="block text-lg font-medium mb-2">
                        SMS {t("language")}
                      </label>
                      <Select value={language || ""} onValueChange={(value) => setLanguage(value)}>
                        <SelectTrigger className="w-full text-lg">
                          <SelectValue placeholder={t("select-language")} />
                        </SelectTrigger>
                        <SelectContent>
                          {config.languageOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {!language && <p className="mt-1 text-sm text-red-500">{t("language-required")}</p>}
                    </div>
                  </div>
                )}
                <div className="flex justify-between w-full max-w-md pt-6 px-4 md:px-0">
                  <Button
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    variant="outline"
                    className="flex items-center gap-1 md:gap-2 text-sm md:text-lg"
                    type="button"
                  >
                    <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="hidden sm:inline">{t("previous")}</span>
                  </Button>
                  {currentStep < steps.length - 1 ? (
                    <Button
                      onClick={handleNext}
                      className="flex items-center gap-1 md:gap-2 text-sm md:text-lg"
                      type="button"
                    >
                      <span className="hidden sm:inline">{t("next")}</span>
                      <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                    </Button>
                  ) : (
                    <LoadingButton
                      loading={isSubmitting}
                      type="submit"
                      className="bg-primary hover:bg-primary/90 text-sm md:text-lg"
                    >
                      {t("finish-setup")}
                    </LoadingButton>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </SidebarProvider>
  )
}
