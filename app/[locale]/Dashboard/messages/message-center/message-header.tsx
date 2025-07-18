"use client"

import { useShop } from "@/app/context/ShopContext"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "@/i18n/routing"
import { Settings, Info, Bell, MessageSquare, Truck, Package, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Separator } from "@/components/ui/separator"
import { useTranslations } from "next-intl"

import { DateRangePicker } from "@/components/ui/date-range-picker"

interface MessageHeaderProps {
  token: string | null
  senderId: string | null
}

export function MessageHeader({ token, senderId }: MessageHeaderProps) {
  const t = useTranslations("messages")
  const { shopData,dateRange,setDateRange} = useShop()
  const router = useRouter()
  const currentDate = new Date();
  const currentWeek = `${currentDate.getFullYear()}-W${String(Math.ceil(currentDate.getDate() / 7)).padStart(2, "0")}`;
  const deliveredCount = shopData?.tracking?.reduce((count, item) => 
    item.lastStatus === "delivered" ? count + 1 : count, 0);
  const smsCount = shopData?.sms?.reduce((count, item) =>  count + 1 , 0);


  return (
    <div className="glass rounded-xl p-6 shadow-lg">
      <div className="flex flex-col space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-8 w-8 text-primary self-center" />
              <h1 className="text-3xl font-bold text-primary">{t("message-center")}</h1>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="glass w-80 max-w-[95vw]">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">{t("smart-notifications")}</h3>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm">{t("automated-system")}</p>
                      <ul className="text-sm space-y-2">
                        <li className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-primary" />
                          <span>{t("order-tracking")}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Truck className="h-4 w-4 text-primary" />
                          <span>{t("delivery-updates")}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <p className="text-sm text-muted-foreground ml-11">{t("enhance-experience")}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">

            {/* Date Range Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="glass flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
                      </>
                    ) : (
                      dateRange.from.toLocaleDateString()
                    )
                  ) : (
                    t("select-date-range")
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 glass" align="start">
                <DateRangePicker
                  date={dateRange}
                  onSelect={(range) => {
                    setDateRange(range)
                    // You could add a function call here to update stats based on the new range
                  }}
                />
              </PopoverContent>
            </Popover>
            <HoverCard>
             
              <HoverCardContent className="glass w-80">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">{t("delivery-integration")}</h4>
                  </div>
                  <Separator />
                  <p className="text-sm">
                    {token ? t("connected-delivery", { company: shopData.deliveryCompany }) : t("connect-delivery")}
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>

            <Badge variant="secondary" className="slide-in hover:scale-105 transition-transform duration-200">
              {t("id")}: {senderId || "Colitrack"}
            </Badge>

            <Button
              variant="outline"
              size="icon"
              onClick={() => router.push("/dashboard/settings")}
              className="glass hover:neon-border transition-all duration-300"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="glass rounded-lg p-4 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t("messages-sent-today")}</p>
                <p className="text-2xl font-bold text-primary"> {smsCount || 0}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-primary opacity-50" />
            </div>
          </div>

          <div className="glass rounded-lg p-4 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t("delivery-updates-count")}</p>
                <p className="text-2xl font-bold text-primary">{deliveredCount}</p>
              </div>
              <Truck className="h-8 w-8 text-primary opacity-50" />
            </div>
          </div>

          <div className="glass rounded-lg p-4 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t("success-rate")}</p>
                <p className="text-2xl font-bold text-primary">
  {shopData?.analytics?.returnRateByWeek
    ? shopData.analytics.returnRateByWeek[currentWeek] || 0
    : 0}%
</p>
              </div>
              <Bell className="h-8 w-8 text-primary opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}