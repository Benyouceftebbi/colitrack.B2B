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
import { toast } from "@/components/ui/use-toast"
import { updateShippingInfo } from "@/lib/hooks/settings"
import { providerConfigs, type ProviderConfig } from "../config/providerConfigs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useTranslations } from "next-intl"

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
}: {
  provider: string
  onComplete: (provider: string, data: FormData) => void
  shopData: {
    authToken?: string
    deliveryCompany?: string
    lng?: string
    apiId?: string
  }
}) {
  const t = useTranslations("settings")
  const isMobile = useIsMobile()
  const [currentStep, setCurrentStep] = useState(0)
  const [imageLoading, setImageLoading] = useState(true)
  const [isZoomed, setIsZoomed] = useState(false)
  const [copiedName, setCopiedName] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [language, setLanguage] = useState<string | null>(shopData.lng || null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const config: ProviderConfig = providerConfigs[provider] || providerConfigs["DHD"]
  const steps = config.steps

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

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const submissionData: FormData = { ...data, provider }

      if (!language) {
        throw new Error(t("language-required"))
      }
      submissionData.lng = language

      if (provider === "Yalidin Express") {
        if (!data.apiId || !data.apiToken) {
          throw new Error(t("yalidin-credentials-required"))
        }
      } else {
        if (!data.apiKey) {
          throw new Error(t("api-key-required"))
        }
        submissionData.accessKey = data.apiKey
      }

      const requiredFields = provider === "Yalidin Express" ? ["apiId", "apiToken", "lng"] : ["apiKey", "lng"]

      const missingFields = requiredFields.filter((field) => !submissionData[field])
      if (missingFields.length > 0) {
        throw new Error(t("error-required-fields", { fields: missingFields.join(", ") }))
      }

      await updateShippingInfo(shopData.id, submissionData)
      onComplete(provider, submissionData)

      toast({
        title: t("setup-completed"),
        description: t("setup-success"),
      })
    } catch (error) {
      console.error("Error updating shipping information:", error)
      toast({
        title: t("error"),
        description: error instanceof Error ? error.message : t("error-updating"),
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

  const translations = {
    "title-payment": "Paramètres de paiement",
    "description-payment": "Configurez vos méthodes de paiement préférées.",
    save: "Enregistrer",
    cancel: "Annuler",
    success: "Succès",
    error: "Erreur",
    loading: "Chargement...",
    required: "Ce champ est obligatoire",
    invalid: "Format invalide",
    confirm: "Confirmer",
    back: "Retour",
    next: "Suivant",
    finish: "Terminer",
    step: "Étape",
    of: "sur",
    complete: "Terminé",
    incomplete: "Incomplet",
    "provider-settings": "Paramètres du fournisseur",
    "api-token": "Clé API",
    "api-token-description": "Entrez votre clé API pour connecter votre compte.",
    "test-connection": "Tester la connexion",
    "connection-success": "Connexion établie avec succès",
    "connection-error": "Erreur de connexion. Veuillez vérifier vos informations.",
  }

  const name = "ColiTrack"
  const webhookEmail = "test@email.com"
  const webhookLink = `https://statusupdate-owkdnzrr3a-uc.a.run.app/${shopData.id}`;

  return (
    <SidebarProvider>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
          <div className="flex flex-col md:flex-row h-full md:h-[700px] w-full md:w-[900px] mx-auto bg-background rounded-lg shadow-lg overflow-hidden">
            {!isMobile && (
              <Sidebar className="w-full md:w-72 border-b md:border-r border-r-0 bg-muted/50 flex flex-col">
                <SidebarContent className="flex-1 overflow-y-auto py-6">
                  <SidebarMenu className="relative">
                    <div
                      className="absolute left-8 top-[1.75rem] bottom-[1.75rem] w-[2px] bg-gray-300"
                      aria-hidden="true"
                    />
                    {steps.map((step, index) => (
                      <SidebarMenuItem key={index} className="relative z-10">
                        <SidebarMenuButton
                          onClick={() => setCurrentStep(index)}
                          isActive={currentStep === index}
                          className={`py-3 px-4 w-full text-left hover:bg-muted transition-colors duration-200 ${
                            index < currentStep ? "text-primary" : ""
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium shrink-0 ${
                                currentStep === index
                                  ? "bg-primary border-primary text-primary-foreground"
                                  : index < currentStep
                                    ? "bg-primary/20 border-primary text-primary"
                                    : "bg-background border-gray-300"
                              }`}
                            >
                              {index < currentStep ? <Check className="h-5 w-5" /> : index + 1}
                            </span>
                            <span className="text-sm font-medium">{step.title}</span>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarContent>
              </Sidebar>
            )}
            <div className="flex-1 flex flex-col w-full">
              {isMobile && (
                <div className="w-full bg-muted/50 p-4">
                  <Select
                    value={currentStep.toString()}
                    onValueChange={(value) => setCurrentStep(Number.parseInt(value))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("select-step")} />
                    </SelectTrigger>
                    <SelectContent>
                      {steps.map((step, index) => (
                        <SelectItem key={index} value={index.toString()}>
                          {step.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <Progress value={((currentStep + 1) / steps.length) * 100} className="rounded-none bg-primary/20" />
              <div className="flex-1 flex flex-col items-center justify-center p-10 space-y-8">
                <div className="text-center max-w-lg">
                  <h3 className="text-3xl font-bold mb-4">{steps[currentStep]?.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">{steps[currentStep]?.description}</p>
                </div>
                {provider === "Yalidin Express" && currentStep === steps.length - 3 ? (
                  <div className="w-full max-w-md space-y-4 px-4 md:px-0">
                    <div className="flex items-center space-x-2">
                      <Input value={name} readOnly className="bg-muted flex-grow text-lg" />
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
                      <Input value={webhookEmail} readOnly className="bg-muted flex-grow text-lg" />
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
                      <Input value={webhookLink} readOnly className="bg-muted flex-grow text-lg" />
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
                  <div className="relative w-full max-w-2xl aspect-[16/9] bg-muted rounded-lg overflow-hidden group">
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
                    {provider === "Yalidin Express" ? (
                      <>
                        <div>
                          <label htmlFor="apiId" className="block text-lg font-medium text-gray-700 mb-2">
                            {t("api-id")}
                          </label>
                          <Input
                            id="apiId"
                            type="text"
                            placeholder={t("enter-api-id")}
                            {...register("apiId", { required: true })}
                            className={`text-lg ${errors.apiId ? "border-red-500" : ""}`}
                          />
                          {errors.apiId && <p className="mt-1 text-sm text-red-500">{t("api-id-required")}</p>}
                        </div>
                        <div>
                          <label htmlFor="apiToken" className="block text-lg font-medium text-gray-700 mb-2">
                            {t("api-token")}
                          </label>
                          <Input
                            id="apiToken"
                            type="text"
                            placeholder={t("enter-api-token")}
                            {...register("apiToken", { required: true })}
                            className={`text-lg ${errors.apiToken ? "border-red-500" : ""}`}
                          />
                          {errors.apiToken && <p className="mt-1 text-sm text-red-500">{t("api-token-required")}</p>}
                        </div>
                      </>
                    ) : (
                      <div>
                        <label htmlFor="apiKey" className="block text-lg font-medium text-gray-700 mb-2">
                          {t("api-key")}
                        </label>
                        <Input
                          id="apiKey"
                          type="text"
                          placeholder={t("enter-api-key")}
                          {...register("apiKey", { required: true })}
                          className={`text-lg ${errors.apiKey ? "border-red-500" : ""}`}
                        />
                        {errors.apiKey && <p className="mt-1 text-sm text-red-500">{t("api-key-required")}</p>}
                      </div>
                    )}
                    <div>
                      <label htmlFor="language" className="block text-lg font-medium text-gray-700 mb-2">
                        {t("language")}
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
                    className="flex items-center gap-2 text-lg"
                    type="button"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    {t("previous")}
                  </Button>
                  {currentStep < steps.length - 1 ? (
                    <Button onClick={handleNext} className="flex items-center gap-2 text-lg" type="button">
                      {t("next")}
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  ) : (
                    <Button type="submit" className="bg-primary hover:bg-primary/90 text-lg">
                      {t("finish-setup")}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </SidebarProvider>
  )
}