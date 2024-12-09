"use client"

import { useState, useEffect} from "react"

import {BadgeDollarSign, Crown, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/app/components/ThemeToggle"
import React from "react"

import {
  ArrowDown,
  ArrowUp,
  Bell,
  Copy,
  CornerUpLeft,
  CornerUpRight,
  FileText,
  GalleryVerticalEnd,
  LineChart,
  Link,
  MoreHorizontal,
  Settings2,
  Trash,
  Trash2,
} from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
const data = [
  [
    {
      label: "Customize Page",
      icon: Settings2,
    },
    {
      label: "Turn into wiki",
      icon: FileText,
    },
  ],
  [
    {
      label: "Copy Link",
      icon: Link,
    },
    {
      label: "Duplicate",
      icon: Copy,
    },
    {
      label: "Move to",
      icon: CornerUpRight,
    },
    {
      label: "Move to Trash",
      icon: Trash2,
    },
  ],
  [
    {
      label: "Undo",
      icon: CornerUpLeft,
    },
    {
      label: "View analytics",
      icon: LineChart,
    },
    {
      label: "Version History",
      icon: GalleryVerticalEnd,
    },
    {
      label: "Show delete pages",
      icon: Trash,
    },
    {
      label: "Notifications",
      icon: Bell,
    },
  ],
  [
    {
      label: "Import",
      icon: ArrowUp,
    },
    {
      label: "Export",
      icon: ArrowDown,
    },
  ],
]






export default function Header() {


  const [tokens, setTokens] = useState(0)
  const [senderId, setSenderId] = useState("")
  const [isOpen, setIsOpen] = React.useState(false)
  React.useEffect(() => {
    setIsOpen(true)
  }, [])
  useEffect(() => {
    const fetchUserData = async () => {
      setTokens(36000)
      setSenderId("colitrack")
    }

    fetchUserData()
  }, [])


  return (
   
    <div className="flex items-center gap-2 text-sm">
    <div className="font-medium text-muted-foreground flex items-center gap-1">
    <span className="font-medium">{tokens}</span>
    <Star className="h-4 w-4 text-yellow-500 fill-current" />
    </div>
    <div className="h-4 w-px bg-border" />
        <div className="text-muted-foreground">
          <div className=" text-muted-foreground md:inline-block hidden">
          Sender ID:
          </div>
       <span className="font-medium text-foreground">{" "}{senderId}</span>
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

