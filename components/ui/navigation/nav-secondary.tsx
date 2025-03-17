"use client"

import * as React from "react"
import { Coins, HelpCircle, MessageSquare } from "lucide-react"
import { useTranslations } from "next-intl"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { AffiliateDialog } from "./affiliate-dialog"
import { FeedbackDialog } from "./feedback-dialog"
import { SupportDialog } from "./support-dialog"

export function NavSecondaryWithDialogs({ ...props }: {} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const t = useTranslations("navigation")
  const [feedbackOpen, setFeedbackOpen] = React.useState(false)
  const [supportOpen, setSupportOpen] = React.useState(false)
  const [affiliateOpen, setAffiliateOpen] = React.useState(false)

  return (
    <>
      {/* Affiliate Marketing Button */}
      <div className="mx-2 my-3 overflow-hidden rounded-lg">
        <button
          onClick={() => setAffiliateOpen(true)}
          className="group relative w-full overflow-hidden rounded-lg p-0.5 transition-all duration-300 hover:shadow-lg"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600 opacity-90 transition-all duration-300 group-hover:opacity-100" />

          {/* Animated shine effect */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Content */}
          <div className="relative flex items-center gap-3 rounded-md bg-black/10 px-3 py-3 backdrop-blur-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500/90 text-white shadow-inner">
              <Coins className="h-5 w-5" />
            </div>
            <div className="text-left">
              <div className="font-bold text-white">{t("becomeAffiliate")}</div>
              <div className="text-xs text-white/80">{t("earnRewardsReferrals")}</div>
            </div>
          </div>
        </button>
      </div>

      <SidebarSeparator />

      <SidebarGroup>
        <SidebarGroupLabel>{t("helpAndSupport")}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="sm" onClick={() => setFeedbackOpen(true)}>
                <MessageSquare />
                <span>{t("submitFeedback")}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton size="sm" onClick={() => setSupportOpen(true)}>
                <HelpCircle />
                <span>{t("getSupport")}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <FeedbackDialog open={feedbackOpen} onOpenChange={setFeedbackOpen} />
      <SupportDialog open={supportOpen} onOpenChange={setSupportOpen} />
      <AffiliateDialog open={affiliateOpen} onOpenChange={setAffiliateOpen} />
    </>
  )
}

