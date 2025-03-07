"use client"

import type * as React from "react"
import { Command, CreditCard, Home, MessageSquare, Settings, Target, Brain } from "lucide-react"

import { NavMain } from "@/components/ui/navigation/nav-main"
import { NavUser } from "@/components/ui/navigation/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Link, usePathname } from "@/i18n/routing"
import { useShop } from "@/app/context/ShopContext"
import { useTranslations } from "next-intl"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname().split("/").filter(Boolean)
  const { shopData } = useShop()
  const t = useTranslations("sidebar")

  const data = {
    teams: [
      {
        name: "Colitrack",
        logo: Command,
        plan: t("platform"),
      },
    ],
    user: {
      name: shopData.shopName,
      email: shopData.email,
      avatar: "/avatars/shadcn.jpg",
    },

    navMain: [
      {
        url: "/dashboard",
        icon: Home,
        title: t("nav.dashboard"),
        isActive: pathname[0] === "dashboard" && !pathname[1],
      },
      {
        url: "/dashboard/messages",
        icon: MessageSquare,
        title: t("nav.messages"),
        isActive: pathname[1] === "messages",
      },
      {
        url: "/dashboard/retargeting",
        icon: Target,
        title: t("nav.retargeting"),
        isActive: pathname[1] === "retargeting",
      },
      { url: "/dashboard/orders", icon: Brain, title: t("nav.ai-orders"), isActive: pathname[1] === "orders" },
    //  { url: "/dashboard/billing", icon: CreditCard, title: t("nav.billing"), isActive: pathname[1] === "billing" },
      { url: "/dashboard/settings", icon: Settings, title: t("nav.settings"), isActive: pathname[1] === "settings" },
    ],
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Colitrack</span>
                  <span className="truncate text-xs">{t("platform")}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} shopData={shopData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

