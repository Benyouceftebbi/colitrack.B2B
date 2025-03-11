"use client"

import { useState, useEffect } from "react"
import { X, Eye, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Steps } from "./components/steps"
import { useShop } from "@/app/context/ShopContext"
import { useToast } from "@/hooks/use-toast"
import { useTranslations } from "next-intl"

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

export default function Component() {
  const { shopData } = useShop()
  console.log("shop", shopData)
  const t = useTranslations("settings")
  const { toast } = useToast()
  const [showInfoDiv, setShowInfoDiv] = useState(false)
  const [shippingProviders, setShippingProviders] = useState<Array<{ provider: string; language: string }>>(() => {
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
  const isMobile = useIsMobile()
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check if user prefers dark mode
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    document.documentElement.classList.toggle("dark", prefersDarkMode)
    setIsDarkMode(prefersDarkMode)

    // Listen for changes in color scheme preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e) => {
      document.documentElement.classList.toggle("dark", e.matches)
      setIsDarkMode(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const providerImages = {
    DHD: "https://dhd-dz.com/assets/img/logo.png",
    "Yalidin Express": "https://yalidine.com/assets/img/yalidine-logo.png",
    Gupex: "https://www.guepex.com/assets/images/logo/logo-dark.webp",
    UPS: "https://www.ups.com/assets/resources/webcontent/images/ups-logo.svg",
    "Go livri": "https://www.golivri.dz/assets/img/logo.png",
    "Maystero Delivery": "https://maystro-delivery.com/img/logo.svg",
    "NOEST Express": "https://noest-dz.com/assets/img/logo_colors_new.png",
    "BA CONSULT":
      "https://scontent.falg7-1.fna.fbcdn.net/v/t39.30808-6/475111862_1099808351946474_2343518860893375878_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=qxQrg2l_5eYQ7kNvgGEYoQA&_nc_oc=AdhlWPB_h1C3oHJHXEYv-lQVYD0YUsnE4x07NEY699RZAqANI1YXUOig9WnONcvNr4U&_nc_zt=23&_nc_ht=scontent.falg7-1.fna&_nc_gid=AP_mcxO85CCInjpgEXNpflH&oh=00_AYCFOO8o2CffLeECa53RclQ89IVcMDpyS1lEyEwEgZPRZg&oe=67C95F1D",
    Anderson: "https://andersonlogistique.com/medias/logo.png",
    "WORLD Express":
      "https://scontent.falg6-1.fna.fbcdn.net/v/t39.30808-1/434769415_722458340089641_9012205629968470051_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=108&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=r7YAOB2MUKsQ7kNvgHPaYRv&_nc_oc=AdiPLPfeUG4jpAz78iSdJY5CMHJEUClR8CazFK4JAzO0gaq4qM2EFqrlQf7dMjj7PJU&_nc_zt=24&_nc_ht=scontent.falg6-1.fna&_nc_gid=A-Dh7X3mD9NpMUpY-InAs11&oh=00_AYCEi_whG4ICiL88FJ2-F2M6R5CyG1DylFlxQaTQ2og70w&oe=67C93AE7",
    FRET: "https://www.fret.direct/images/logoFRETs.png",
    "48H":
      "https://scontent.falg7-1.fna.fbcdn.net/v/t39.30808-1/305769282_479708007506758_5994560203379088099_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=105&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=c3B2jxsWBS4Q7kNvgFn1IXW&_nc_oc=AdiYdW9zEBWfxhyhtPLfe7W0rBEIQ2k3FN6uH2tof6xVrXwk0DT5wJPo2EDLaPhTyH4&_nc_zt=24&_nc_ht=scontent.falg7-1.fna&_nc_gid=AYTFCCYI08wEpTejTO0FFRx&oh=00_AYBB02yaGJ_SwRRbnK8u0Pp-jKN7lbvWhoxw940VOqioLQ&oe=67C93DDC",
    Packers:
      "https://scontent.falg7-6.fna.fbcdn.net/v/t39.30808-1/293208422_413753410769695_2061037653088408367_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=106&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=t9Qwk0E9ABcQ7kNvgGdOtDZ&_nc_oc=AdioRj-gRvJA16BnTfdSemytVF6oxEEYhHfu5nqwe1_xi10JM16Eut5CH3b4ic4vR90&_nc_zt=24&_nc_ht=scontent.falg7-6.fna&_nc_gid=AEkoZBxmG1aBh5Wm3eY7ZuR&oh=00_AYCrZuHie8h5fsDyt5fRRsPwJqQts8geYtDbHyWaxBOjvA&oe=67C9388F",
    "Fast mail": "https://www.fastmaildz.com/images/logo.jpg",
    "NEGMAR Express":
      "https://scontent.falg6-2.fna.fbcdn.net/v/t39.30808-1/263758272_435108671603514_5845124433874265577_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=109&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=eRlOxHGFug0Q7kNvgH4AFoZ&_nc_oc=AdgMpI8HCcRae6ogXJUDNDeVHoI6gO3OSNi1Dg1HTXAxq0Vi04BFX6wWxUmqx0CO3jQ&_nc_zt=24&_nc_ht=scontent.falg6-2.fna&_nc_gid=A-Knn4X9gtpZx7HhTMiZx4L&oh=00_AYB2oAXqcrULM4BaBr2oD1y7vcENvvKJtqxQoRceHYf3LA&oe=67C947CA",
    Expedia:
      "https://scontent.falg7-1.fna.fbcdn.net/v/t39.30808-1/402021614_327699743341843_5588031550523391196_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=105&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=yWZGgWUhbQgQ7kNvgFNgN7G&_nc_oc=Adi1mC-9Aju87tsnq8k-yTMie68fTvtcE3XRRenHKdCI5ngstJPiR9ZATKxkCMtDyf0&_nc_zt=24&_nc_ht=scontent.falg7-1.fna&_nc_gid=A8RILBFur7JuAeyc7euhg-E&oh=00_AYBTUQxbtP99GEu24IOfWOdoEijZBDHi5ABPYo2RV-Dd3g&oe=67C96550",
    "Rocket Delivery": "https://www.rocket-dz.com/assets/img/logo_white.png",
    "MSM GO":
      "https://scontent.falg6-2.fna.fbcdn.net/v/t39.30808-1/458740709_938179221669263_4771285373707372818_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=103&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=Y47KFaocfDcQ7kNvgGKmLpV&_nc_oc=AdiNNYeI7HBjQHc7jv1e5jQ_2tas4HokjZYzw9v8zwyQ10gcEdFXQp1X3lpwxJR9Qxo&_nc_zt=24&_nc_ht=scontent.falg6-2.fna&_nc_gid=AOi1SolIIVlf2Mkfs-mA55L&oh=00_AYAIqt7FwxvBrHijnaZmTCKwNdYmj6-BhadOoKECddHK3w&oe=67C968BE",
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
    <div className="min-h-screen bg-background dark:bg-background p-4 md:p-8">
      <div className="container mx-auto space-y-6 md:space-y-8">
        <main className="flex-1 px-2 py-4 sm:px-6 sm:py-8">
          <div className="grid gap-6 md:gap-8">
            <h1 className="text-3xl md:text-4xl font-bold">{t("title-settings")}</h1>

            {!showInfoDiv && (
              <div className="flex justify-end mb-2 md:mb-4">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-sm md:text-base"
                  onClick={() => setShowInfoDiv(true)}
                >
                  <Eye className="h-4 w-4" />
                  <span className="hidden sm:inline">Show Info Section</span>
                  <span className="sm:hidden">Info</span>
                </Button>
              </div>
            )}

            {showInfoDiv && (
              <div className="bg-[#faf5ff] dark:bg-purple-900/20 p-4 rounded-lg relative">
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-2 right-2 z-10 h-6 w-6 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800"
                  onClick={() => setShowInfoDiv(false)}
                  aria-label="Close info section"
                >
                  <X className="h-3 w-3" />
                </Button>
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
                    <p className="text-sm text-gray-600 dark:text-gray-300">{t("description-settings")}</p>
                  </div>
                </div>
              </div>
            )}

            <Card className="border dark:border-border">
              <CardHeader>
                <CardTitle>{t("title-settings")}</CardTitle>
                <CardDescription>{t("description-info")}</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="name">{t("name")}</Label>
                      <Input id="name" defaultValue={shopData.firstName} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">{t("email")}</Label>
                      <Input id="email" type="email" defaultValue={shopData.email} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="company">{t("shopName")}</Label>
                      <Input id="company" defaultValue={shopData.companyName} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">{t("phone")}</Label>
                      <Input id="phone" defaultValue={shopData.phoneNumber} />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="border dark:border-border">
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
                      <div key={index} className="bg-muted dark:bg-muted/30 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-lg font-semibold">{provider.provider}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive/90"
                            //onClick={() => removeShippingProvider(index)}
                          >
                            {/* <Trash2 className="h-4 w-4" />*/}
                          </Button>
                        </div>
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor={`api-token-${index}`}>API Token</Label>
                            <Input id={`api-token-${index}`} value={"************************"} type="password" />
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
        <DialogContent className={`${isMobile ? "max-w-[95%]" : "max-w-[60%]"} p-0 gap-0 overflow-hidden`}>
          {!selectedProvider ? (
            <div className="p-4 md:p-8 space-y-4 md:space-y-8">
              <DialogHeader>
                <DialogTitle className="text-xl md:text-2xl">{t("title")}</DialogTitle>
                <DialogDescription>{t("description")}</DialogDescription>
              </DialogHeader>
              <div
                className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 ${isMobile ? "max-h-[70vh] overflow-y-auto pr-2" : ""}`}
              >
                {[
                  "Yalidin Express",
                  "Gupex",
                  "DHD",
                  "UPS",
                  "Go livri",
                  "Maystero Delivery",
                  "NOEST Express",
                  "BA CONSULT",
                  "Anderson",
                  "WORLD Express",
                  "FRET",
                  "48H",
                  "Packers",
                  "Fast mail",
                  "NEGMAR Express",
                  "Expedia",
                  "Rocket Delivery",
                  "MSM GO",
                ].map((provider) => (
                  <Button
                    key={provider}
                    variant="outline"
                    className="h-auto p-2 md:p-4 flex flex-col items-center gap-1 md:gap-2 border dark:border-border"
                    onClick={() => setSelectedProvider(provider)}
                  >
                    <div className="w-10 h-10 md:w-16 md:h-16 flex items-center justify-center overflow-hidden">
                      <img
                        src={providerImages[provider] || `/placeholder.svg?height=64&width=64`}
                        alt={provider}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <span className="text-xs md:text-sm text-center">{provider}</span>
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

