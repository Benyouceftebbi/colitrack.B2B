"use client"

import * as React from "react"
import {
  Command,
  CreditCard,
  Home,
  MessageSquare,
  Package,
  Settings,
  Target,
  TimerIcon,
  Brain
} from "lucide-react"

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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname= usePathname().split('/').filter(Boolean);

  const data = {
    teams: [
      {
        name: "Colitrack",
        logo: Command,
        plan: "Platform",
      },
    ],
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
  
    navMain: [
      { url: "/dashboard", icon: Home, title: "Dashboard", isActive:pathname[1]==="Dashboard"},
      { url: "/dashboard/messages", icon: MessageSquare, title: "Messages", isActive:pathname[1]==="messages" },
      { url: "/dashboard/retargeting", icon: Target, title: "Retargeting" , isActive:pathname[1]==="retargeting"},
      { url: "/dashboard/orders", icon: Brain, title: "AI Orders", isActive:pathname[1]==="orders" },
      { url: "/dashboard/products", icon: Package, title: "Products", isActive:pathname[1]==="products" },
      { url: "/dashboard/history", icon: TimerIcon, title: "History", isActive:pathname[1]==="history" },
      { url: "/dashboard/billing", icon: CreditCard, title: "Billing", isActive:pathname[1]==="billing" },
      { url: "/dashboard/settings", icon: Settings, title: "Settings", isActive:pathname[1]==="settings" },
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
                  <span className="truncate text-xs">Platform</span>
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
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
