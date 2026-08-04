"use client"

import type * as React from "react"
import { Command, Home, MessageSquare, Settings, Target, Brain, Squirrel,IceCreamCone, Sparkles, Bot  } from "lucide-react"

import { NavMain } from "@/components/ui/navigation/nav-main"
import { NavUser } from "@/components/ui/navigation/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { usePathname } from "@/i18n/routing"
import { useShop } from "@/app/context/ShopContext"
import { useTranslations } from "next-intl"
import { ShopSwitcher } from "./shop-switcher"
import { NavSecondaryWithDialogs } from "./nav-secondary"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname().split("/").filter(Boolean)
  const { shopData } = useShop()
  const { shops } = useShop()
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

      ...(shopData?.id === "EqBryQTkpV52bZKTUFB34nLt3psWzQaP6cBzUy1jUHdqOQneBlx8Ib9YEr9bce5n" || shopData?.id === "5fb2444c1dbbc5ff1f159a86ac48b2a13c80ea1ccb7449a80ad9d58ec09da7fc"
        ? [
            {
              url: "/dashboard/analytics",
              icon: Target,
              title: t("nav.analytics"),
              isActive: pathname[1] === "analytics",
            },
          ]
        : []),
    

        ...(shopData?.id === "5fb2444c1dbbc5ff1f159a86ac48b2a13c80ea1ccb7449a80ad9d58ec09da7fc"
          ? [
              {
                url: "/dashboard/stopdesks",
                icon: Target,
                title:"Stopdesks",
                isActive: pathname[1] === "stopdesks",
              },
            ]
          : []),
      { url: "/dashboard/settings", icon: Settings, title: t("nav.settings"), isActive: pathname[1] === "settings" },
    ],
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ShopSwitcher teams={shops} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavSecondaryWithDialogs className="mt-auto" />
        <NavUser user={data.user} shopData={shopData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
