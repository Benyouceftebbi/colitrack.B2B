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
import { getPathname, useRouter } from "@/i18n/routing"
import { useSearchParams } from "next/navigation"

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
  const { shopData,setShopData } = useShop()
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
  const router=useRouter()
  useEffect(() => {
    if (shopData.deliveryCompany && shopData.lng) {
      setShippingProviders([
        {
          provider: shopData.deliveryCompany,
          language: shopData.lng,
        },
      ])
    } else {
      setShippingProviders([])
    }
  }, [shopData.id]) // Update shippingProviders when shopData changes
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


    
    if(!shopData.lng){
      setSelectedProvider("")
      setShowSetupModal(true)
    }
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const providerImages = {
    DHD: "https://dhd-dz.com/assets/img/logo.png",
    "Yalidin Express": "https://yalidine.com/assets/img/yalidine-logo.png",
    Guepex: "https://www.guepex.com/assets/images/logo/logo-dark.webp",
    Yalitec:"https://scontent.falg7-1.fna.fbcdn.net/v/t39.30808-6/282808249_131726106126538_5020857691934777434_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=XdjpYaDWNxEQ7kNvwEOH7Bn&_nc_oc=Admnc8HhnunybSu7cDeDrpk58h29HUci7l8t_fTSAnxu_1VaIxlz8q7jwcFp1Je8s-s&_nc_zt=23&_nc_ht=scontent.falg7-1.fna&_nc_gid=Ic81mCkTw8AhaLhqCDELIQ&oh=00_AfEVgHnriRzsglBtYyzms64IOeQ0Bi7aUFTtflF4wBT6qg&oe=681C597E",
    "ZR express": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-bMOgnI9-8ouSZ3YXAKcdPVMKfElvleuonQ&s",
    "E-COM Delivery":"https://scontent.falg6-1.fna.fbcdn.net/v/t39.30808-6/366707195_281986314582684_2066889253023140481_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=aLFaIQ8420AQ7kNvwGB6AU7&_nc_oc=AdlwM1-Vijo6H_6NG4cw89XX5Hf-brYKE9KRTIDoTQyzqFIW-SKkyDrTCvwgYYeSSkM&_nc_zt=23&_nc_ht=scontent.falg6-1.fna&_nc_gid=GQDmiKP3zlYAdFjtO7RSYw&oh=00_AfGKgk74eQL-FRpdJVC3dBMeZUlVblV59JrX6EKh-6Ze7w&oe=681C461A",
    UPS: "https://www.ups.com/assets/resources/webcontent/images/ups-logo.svg",
    "Go livri":"https://www.golivri.dz/assets/img/logo.png",
    "Maystero Delivery":"https://maystro-delivery.com/img/logo.svg",
    weewee: "https://weeweedelivery.com/assets/weewee/logo/logo_horizontal_purple-tagline.png",
    "NOEST Express":"https://noest-dz.com/assets/img/logo_colors_new.png",
    "BA CONSULT":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2D63PFOQPrtLtQ2xZVR-BRByg9blYiqm4vA&s",
    Anderson:"https://andersonlogistique.com/medias/logo.png",
    "WORLD Express": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLZY6x8DaDX_SOfkyJX06QDjFdkZpL45vRwTdSPPqKROHsCQFqYC0o6B_IL0AJBmXJ6Uk&usqp=CAU",
    FRET: "https://www.fret.direct/images/logoFRETs.png",
    NAVEX:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw8WbXWF7NuJKeikuhF98ZI58fJ5_kJLH_om3qE_HMRYayXZJxQXx2Qn56CpF6jTDfCzs&usqp=CAU",
    "48H":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpvBI5915GAHfwbfd0K0cJkj7Ai5uAkVjLDA&s",
    Packers:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ2VUy_Kw0lnmKeo-GgtTnsUy2NZvYkO86Dw&s",
    "Fast mail": "https://www.fastmaildz.com/images/logo.jpg",
    "NEGMAR Express":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPLpbiZjfLvVR71s-OEV8iTbHJxuT02xQ26w&s",
    Expedia:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRol7hWuJm6Szh9barkJdXuIJH_f_I8CYigg&s",
    "Rocket Delivery":"https://www.rocket-dz.com/assets/img/logo_white.png",
    "MSM GO":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYAQJ8l-R2I2lii4WQ6bkZ7dySXLgMflsivg&s",
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

    router.push('/dashboard/messages')
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
                  onClick={() => setShowInfoDiv(false)}
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
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {shippingProviders.length > 0 ? (
                    shippingProviders.map((provider, index) => (
                      <div key={index} className="bg-muted dark:bg-muted/30 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                        </div>
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor={`api-token-${index}`}>API Token</Label>
                            <Input id={`api-token-${index}`} value={"************************"} type="password" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor={`senderId-${index}`}>{t("senderId")}</Label>
                            <Input
                              id={`senderId-${index}`}
                              value={provider.senderId}
                              // onChange={(e) => updateShippingProvider(index, "senderId", e.target.value)}
                              placeholder={t("senderId")}
                              disabled={true}
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
    </div>
  )
}

