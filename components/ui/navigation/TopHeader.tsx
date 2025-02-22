"use client"
import {Crown, RefreshCw, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/app/components/ThemeToggle"
import React, { useState } from "react"
import { useShop } from "@/app/context/ShopContext"
import { PricingModal } from '../pricingModal'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/firebase'







export default function Header() {

  const {shopData,setShopData}=useShop()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshTokens = async () => {
    setIsRefreshing(true)
    // Simulate API call to refresh tokens
    const docRef=await getDoc(doc(db,"Shops",shopData.id))
    const newTokens=docRef.data().tokens
    setShopData((prev:any)=>({...prev,tokens:newTokens}))

    setIsRefreshing(false)
  }

 return (
   
  <div className="flex items-center gap-2 text-sm">
      <Button
    variant="outline"
    size="icon"
    onClick={refreshTokens}
    className={`p-0 h-8 w-8 ${isRefreshing ? "animate-spin" : ""}`}
    disabled={isRefreshing}
  >
    <RefreshCw className="h-4 w-4" />
    <span className="sr-only">Refresh tokens</span>
  </Button>
  <div className="font-medium text-muted-foreground flex items-center gap-1">
    <span className="font-medium">{shopData.tokens}</span>
    <Star className="h-4 w-4 text-yellow-500 fill-current" />
  </div>

  <div className="h-4 w-px bg-border" />
  <div className="text-muted-foreground">
    <div className="text-muted-foreground md:inline-block hidden">Sender ID:</div>
    <span className="font-medium text-foreground"> {shopData.senderId ? shopData.senderId : "Colitrack"}</span>
  </div>
  <PricingModal />
  <ThemeToggle />
</div>
  )
}

