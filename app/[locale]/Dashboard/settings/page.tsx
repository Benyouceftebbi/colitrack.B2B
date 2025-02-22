"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Steps } from "./components/steps"
import { PlusCircle, Trash2 } from "lucide-react"
import { useShop } from "@/app/context/ShopContext"
import { useToast } from "@/hooks/use-toast"
import { useTranslations } from "next-intl"

export default function Component() {
  const { shopData } = useShop()
  console.log("shop", shopData)
  const t = useTranslations("settings")
  const { toast } = useToast()
  const [shippingProviders, setShippingProviders] = useState<
    Array<{ provider: string; language: string }>
  >(() => {
    if (shopData.deliveryCompany && shopData.lng) {
      return [
        {
          provider: shopData.deliveryCompany,
          language: shopData.lng,
        },
      ]
    }
    return []
  })
  const [keywords, setKeywords] = useState("")
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState("")
  const [showSetupModal, setShowSetupModal] = useState(false)

  const providerImages = {
    DHD: "https://dhd-dz.com/assets/img/logo.png",
    "Yalidin Express": "https://yalidine.com/assets/img/yalidine-logo.png",
    UPS: "https://www.ups.com/assets/resources/webcontent/images/ups-logo.svg",
    "Go livri": "https://www.golivri.dz/assets/img/logo.png",
    "Maystero Delivery": "https://maystro-delivery.com/img/logo.svg",
  }

  const addShippingProvider = () => {
    if (shippingProviders.length === 0) {
      setSelectedProvider("")
      setShowSetupModal(true)
    } else {
      toast({
        title: "Provider already set",
        description: "You can only have one shipping provider. Please remove the existing one to add a new one.",
        variant: "destructive",
      })
    }
  }

  const updateShippingProvider = (index, field, value) => {
    const updatedProviders = [...shippingProviders]
    updatedProviders[index][field] = value
    setShippingProviders(updatedProviders)
  }

  const removeShippingProvider = (index) => {
    const updatedProviders = [...shippingProviders]
    updatedProviders.splice(index, 1)
    setShippingProviders(updatedProviders)
  }

  const handleSetupComplete = (provider: string, data: { lng: string }) => {
    setShippingProviders([...shippingProviders, { ...data, provider }])
    setShowSetupModal(false)
  }

  const handleApiTokenChange = (index, value) => {
    const updatedProviders = [...shippingProviders]
    updatedProviders[index] = { ...updatedProviders[index] }
    setShippingProviders(updatedProviders)
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto space-y-8">
        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <div className="grid gap-8">
            <h1 className="text-4xl font-bold">{t("title-settings")}</h1>
            <div className="bg-[#faf5ff] p-4 rounded-lg">
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="w-full sm:w-1/6">
                  <div className="aspect-video rounded-lg overflow-hidden bg-black">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/jNQXAC9IVRw"
                      title="Delivery Update Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                </div>
                <div className="w-full sm:w-5/6">
                  <h3 className="text-lg font-semibold mb-2">{t("title-settings")}</h3>
                  <p className="text-sm text-gray-600">{t("description-settings")}</p>
                </div>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>{t("title-settings")}</CardTitle>
                <CardDescription>{t("description-info")}</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="name">{t("name")}</Label>
                      <Input id="name" defaultValue={shopData.firstName} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">{t("email")}</Label>
                      <Input id="email" type="email" defaultValue={shopData.email} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="company">{t("shopName")}</Label>
                      <Input id="company" defaultValue={shopData.companyName} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">{t("phone")}</Label>
                      <Input id="phone" defaultValue={shopData.phoneNumber} />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="language">{t("language")}</Label>
                    <Select id="language" defaultValue="en">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">{t("en")}</SelectItem>
                        <SelectItem value="es">{t("es")}</SelectItem>
                        <SelectItem value="fr">{t("fr")}</SelectItem>
                        <SelectItem value="de">{t("de")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("title-shipping")}</CardTitle>
                <CardDescription>{t("description-shipping")}</CardDescription>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={addShippingProvider}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  {t("addProvider")}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {shippingProviders.length > 0 ? (
                    shippingProviders.map((provider, index) => (
                      <div key={index} className="bg-muted p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-lg font-semibold">{provider.provider}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive/90"
                            onClick={() => removeShippingProvider(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor={`api-token-${index}`}>API Token</Label>
                            <Input
                              id={`api-token-${index}`}
                              value={"************************"}
                              type="password"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor={`language-${index}`}>{t("language")}</Label>
                            <Input
                              id={`language-${index}`}
                              value={provider.language}
                             // onChange={(e) => updateShippingProvider(index, "language", e.target.value)}
                              placeholder={t("language")}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">{t("noProvider")}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <Dialog open={showSetupModal} onOpenChange={setShowSetupModal}>
        <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden">
          {!selectedProvider ? (
            <div className="p-6 space-y-6">
              <DialogHeader>
                <DialogTitle className="text-2xl">{t("title")}</DialogTitle>
                <DialogDescription>{t("description")}</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                {["DHD", "Yalidin Express", "UPS", "Go livri", "Maystero Delivery"].map((provider) => (
                  <Button
                    key={provider}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center gap-2"
                    onClick={() => setSelectedProvider(provider)}
                  >
                    <div className="w-16 h-16 flex items-center justify-center overflow-hidden">
                      <img
                        src={providerImages[provider] || `/placeholder.svg?height=64&width=64`}
                        alt={provider}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <span>{provider}</span>
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 z-10"
                onClick={() => setShowSetupModal(false)}
              ></Button>
              <Steps shopData={shopData} provider={selectedProvider} onComplete={handleSetupComplete} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}