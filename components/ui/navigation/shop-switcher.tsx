"use client"
import { ChevronsUpDown, Command } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { useShop } from "@/app/context/ShopContext"
import { AddShopModal } from "./addShop"

export function ShopSwitcher() {
  const { isMobile } = useSidebar()
  const { shopData, shops, setShopData } = useShop()

  // If no shop data is available, don't render anything
  if (!shopData) {
    return null
  }

  // Handle shop selection
  const handleShopSelect = (shop: any) => {
    setShopData(shop)
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Command className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{shopData.companyName}</span>
                <span className="truncate text-xs">sender ID: {shopData.senderId || "Colitrack"}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">SHOPS</DropdownMenuLabel>
            {shops.map((shop: any, index: number) => (
              <DropdownMenuItem
                key={shop.id || index}
                onClick={() => handleShopSelect(shop)}
                className={`gap-2 p-2 ${shop.id === shopData.id ? "bg-accent" : ""}`}
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <Command className="size-4 shrink-0" />
                </div>
                {shop.companyName}
                {shop.id === shopData.id && <DropdownMenuShortcut>✓</DropdownMenuShortcut>}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <AddShopModal />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}