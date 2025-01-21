"use client"
import {Crown, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/app/components/ThemeToggle"
import React from "react"
import { useShop } from "@/app/context/ShopContext"







export default function Header() {

  const {shopData}=useShop()
 return (
   
    <div className="flex items-center gap-2 text-sm">
    <div className="font-medium text-muted-foreground flex items-center gap-1">
    <span className="font-medium">{shopData.tokens}</span>
    <Star className="h-4 w-4 text-yellow-500 fill-current" />
    </div>
    <div className="h-4 w-px bg-border" />
        <div className="text-muted-foreground">
          <div className=" text-muted-foreground md:inline-block hidden">
          Sender ID:
          </div>
       <span className="font-medium text-foreground">{" "}{shopData.senderId?shopData.senderId:"Colitrack"}</span>
        </div>
        <Button 
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
        size="sm"
      >
        <Crown className="h-4 w-4 " />
        <div className="ml-1 md:inline-block hidden">
        Upgrade
        </div>
      </Button>

      <ThemeToggle/>
  </div>
  )
}

