"use client"
import { type LucideIcon } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "@/i18n/routing"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon | string
    isActive?: boolean
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
      {items.map((item) => (
         
         
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link href={item.url} className={` mb-1 ${
            item.isActive
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          }`}>
          <item.icon className="w-7 h-7 "/> 
                  <span className="truncate font-semibold">{item.title}</span> 
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>


        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
