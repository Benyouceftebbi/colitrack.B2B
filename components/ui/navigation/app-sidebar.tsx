"use client"

import type * as React from "react"
import { Command, Home, MessageSquare, Settings, Target, Brain, Squirrel,IceCreamCone, Sparkles, Bot, LayoutDashboard, FileText, Send  } from "lucide-react"
import { WhatsAppIcon } from "@/components/ui/navigation/whatsapp-icon"

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
  // Route segments keep their original casing ("Dashboard"), so compare lowercased.
  const whatsappSegment = pathname[1]?.toLowerCase()
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
        url: "/Dashboard",
        icon: Home,
        title: t("nav.dashboard"),
        isActive: pathname[0] === "dashboard" && !pathname[1],
      },
      
      {
        url: "/Dashboard/messages",
        icon: MessageSquare,
        title: t("nav.messages"),
        isActive: pathname[1] === "messages",

        
      },

            {
              url: "/Dashboard/retargeting",
              icon: Target,
              title: t("nav.retargeting"),
              isActive: pathname[1] === "retargeting",
            },

      {
        url: "/Dashboard/whatsapp",
        icon: WhatsAppIcon,
        title: t("nav.whatsapp"),
        isActive: whatsappSegment === "whatsapp",
        items: [
          {
            url: "/Dashboard/whatsapp",
            icon: LayoutDashboard,
            title: t("nav.whatsapp-dashboard"),
            isActive: whatsappSegment === "whatsapp" && !pathname[2],
          },
          {
            url: "/Dashboard/whatsapp/templates",
            icon: FileText,
            title: t("nav.whatsapp-templates"),
            isActive: whatsappSegment === "whatsapp" && pathname[2]?.toLowerCase() === "templates",
          },
          {
            url: "/Dashboard/whatsapp/messages",
            icon: Send,
            title: t("nav.whatsapp-messages"),
            isActive: whatsappSegment === "whatsapp" && pathname[2]?.toLowerCase() === "messages",
          },
        ],
      },

      ...(shopData?.id === "EqBryQTkpV52bZKTUFB34nLt3psWzQaP6cBzUy1jUHdqOQneBlx8Ib9YEr9bce5n" || shopData?.id === "5fb2444c1dbbc5ff1f159a86ac48b2a13c80ea1ccb7449a80ad9d58ec09da7fc"
        ? [
            {
              url: "/Dashboard/analytics",
              icon: Target,
              title: t("nav.analytics"),
              isActive: pathname[1] === "analytics",
            },
          ]
        : []),
    

        ...(shopData?.id === "5fb2444c1dbbc5ff1f159a86ac48b2a13c80ea1ccb7449a80ad9d58ec09da7fc"
          ? [
              {
                url: "/Dashboard/stopdesks",
                icon: Target,
                title:"Stopdesks",
                isActive: pathname[1] === "stopdesks",
              },
            ]
          : []),
      { url: "/Dashboard/settings", icon: Settings, title: t("nav.settings"), isActive: pathname[1] === "settings" },
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
