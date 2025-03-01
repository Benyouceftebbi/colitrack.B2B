"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PricingPlans } from "./pricingPlans"
import { Crown, X } from "lucide-react"

export function PricingModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
      <Button 
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
        size="sm"
        
      >
        <Crown className="h-4 w-4 " />
        <div className="ml-1 md:inline-block hidden">
        Upgrade
        </div>
      </Button>

      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose Your Plan</DialogTitle>
          <DialogDescription>Select the plan that best fits your needs</DialogDescription>
        </DialogHeader>
       
        <PricingPlans className="max-h-[calc(90vh-100px)] overflow-y-auto pr-4" />
      </DialogContent>
    </Dialog>
  )
}
