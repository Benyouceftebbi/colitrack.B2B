"use client"
import type * as React from "react"
import { ChevronRight } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Link } from "@/i18n/routing"

/** Lucide icons and our own SVG components both satisfy this. */
export type NavIcon = React.ComponentType<{ className?: string }>

export type NavSubItem = {
  title: string
  url: string
  icon?: NavIcon
  isActive?: boolean
}

export type NavItem = {
  title: string
  url: string
  icon: NavIcon
  isActive?: boolean
  isSpecial?: boolean
  gradient?: string
  /** When present the entry renders as a collapsible section. */
  items?: NavSubItem[]
}

export function NavMain({ items }: { items: NavItem[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
      {items.map((item) => (


            <SidebarMenuItem key={item.url} className="overflow-hidden pb-2">
               {item.isSpecial ? (
                    <div className="relative group">
                      {/* Animated background glow */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-20 rounded-md blur-sm group-hover:opacity-40 transition-all duration-300 animate-pulse group-data-[collapsible=icon]:rounded-full`}
                      ></div>

                      {/* Sparkle effects */}
                      <div className="absolute inset-0 overflow-hidden rounded-md group-data-[collapsible=icon]:rounded-full">
                        <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full animate-ping opacity-60 group-data-[collapsible=icon]:top-0.5 group-data-[collapsible=icon]:right-0.5"></div>
                        <div className="absolute top-3 right-3 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-300 group-data-[collapsible=icon]:hidden"></div>
                        <div className="absolute bottom-2 left-2 w-0.5 h-0.5 bg-white rounded-full animate-ping delay-700 group-data-[collapsible=icon]:bottom-0.5 group-data-[collapsible=icon]:left-0.5"></div>
                      </div>

                      <SidebarMenuButton asChild className="relative z-10" tooltip={item.title}>
                        <Link
                          href={item.url}
                          className={`
          relative overflow-hidden bg-gradient-to-r ${item.gradient} text-white
          hover:scale-105 transition-all duration-300 group-hover:shadow-lg
          before:absolute before:inset-0 before:bg-white before:opacity-0 
          before:transition-opacity before:duration-300 hover:before:opacity-10
          after:absolute after:top-0 after:left-[-100%] after:w-full after:h-full 
          after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent 
          after:opacity-30 hover:after:left-[100%] after:transition-all after:duration-700
          group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8
        `}
                        >
                          <div className="flex items-center space-x-3 relative z-10 group-data-[collapsible=icon]:space-x-0">
                            <div className="relative">
                              <item.icon className="group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 group-data-[collapsible=icon]:w-4 group-data-[collapsible=icon]:h-4" />
                              {/* Icon glow effect */}
                              <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-20 blur-sm transition-all duration-300"></div>
                            </div>
                            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                              <span className="font-semibold group-hover:translate-x-1 transition-transform duration-300">
                                {item.title}
                              </span>
              
                            </div>
                          </div>

                          {/* Floating particles - adjusted for icon mode */}
                          <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-2 right-4 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500 delay-100 group-data-[collapsible=icon]:top-1 group-data-[collapsible=icon]:right-1"></div>
                            <div className="absolute bottom-3 left-6 w-0.5 h-0.5 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500 delay-300 group-data-[collapsible=icon]:bottom-1 group-data-[collapsible=icon]:left-1"></div>
                            <div className="absolute top-1/2 right-2 w-0.5 h-0.5 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-500 delay-500 group-data-[collapsible=icon]:hidden"></div>
                          </div>
                        </Link>
                      </SidebarMenuButton>

                      {/* Premium badge - adjusted for icon mode */}
                      <div className="absolute -top-1 -right-1 z-20 group-data-[collapsible=icon]:-top-0.5 group-data-[collapsible=icon]:-right-0.5">
                        <div
                          className={`w-3 h-3 bg-gradient-to-r ${item.gradient} rounded-full animate-pulse shadow-lg group-data-[collapsible=icon]:w-2 group-data-[collapsible=icon]:h-2`}
                        >
                          <div className="w-full h-full bg-white rounded-full animate-ping opacity-40"></div>
                        </div>
                      </div>
                    </div>
                  ) : item.items?.length ? (
                    // Section with sub-pages. Stays open while one of its
                    // children is the current route.
                    <Collapsible defaultOpen={item.isActive} className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          className={`mb-1 ${
                            item.isActive
                              ? "text-primary bg-primary/10"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          }`}
                        >
                          <item.icon className="w-7 h-7" />
                          <span className="truncate font-semibold">{item.title}</span>
                          <ChevronRight className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((sub) => (
                            <SidebarMenuSubItem key={sub.url}>
                              <SidebarMenuSubButton asChild isActive={sub.isActive}>
                                <Link href={sub.url}>
                                  {sub.icon && <sub.icon className="h-4 w-4" />}
                                  <span className="truncate">{sub.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
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
                  )}
            </SidebarMenuItem>


        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
