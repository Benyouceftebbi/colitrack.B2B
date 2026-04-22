"use client"

import { motion } from "framer-motion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, Users, Hash, AlertTriangle, FileText, TrendingUp } from "lucide-react"
import type { RetargetingCampaignHook } from "../../types"

type MessageStatsProps = {
  campaign: RetargetingCampaignHook
}

export function MessageStats({ campaign }: MessageStatsProps) {
  const stats = campaign.uniqueMessageStats

  if (!stats) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center py-8"
      >
        <AlertTriangle className="h-10 w-10 text-amber-500 mb-3" />
        <h3 className="text-base font-medium">No Statistics Available</h3>
        <p className="text-sm text-muted-foreground text-center mt-1">
          Please go back and select a message column.
        </p>
      </motion.div>
    )
  }

  const totalEstimatedSms = Math.ceil(stats.totalCharacters / (campaign.hasUnicode ? 80 : 160))
  const estimatedCost = totalEstimatedSms * 10

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-3"
    >
      {/* Compact Header */}
      <div className="flex items-center gap-2 p-3 rounded-lg border border-primary/20 bg-primary/5">
        <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Unique Messages Ready</span> - Review stats below
        </p>
      </div>

      {/* Compact Stats Grid */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-3 rounded-lg bg-muted/50 text-center">
          <Users className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
          <p className="text-lg font-bold">{stats.totalRecipients.toLocaleString()}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Recipients</p>
        </div>
        <div className="p-3 rounded-lg bg-muted/50 text-center">
          <Hash className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
          <p className="text-lg font-bold">{stats.totalCharacters.toLocaleString()}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Characters</p>
        </div>
        <div className="p-3 rounded-lg bg-muted/50 text-center">
          <FileText className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
          <p className="text-lg font-bold">{totalEstimatedSms.toLocaleString()}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Total SMS</p>
        </div>
      </div>

      {/* Character Distribution - Inline */}
      <div className="p-3 rounded-lg border bg-card">
        <p className="text-xs font-medium text-muted-foreground mb-2">Character Distribution</p>
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 text-center p-2 rounded bg-muted/30">
            <p className="text-sm font-semibold">{stats.minCharacters}</p>
            <p className="text-[10px] text-muted-foreground">Min</p>
          </div>
          <div className="flex-1 text-center p-2 rounded bg-primary/10 border border-primary/20">
            <p className="text-sm font-semibold text-primary">{stats.averageCharacters}</p>
            <p className="text-[10px] text-muted-foreground">Avg</p>
          </div>
          <div className="flex-1 text-center p-2 rounded bg-muted/30">
            <p className="text-sm font-semibold">{stats.maxCharacters}</p>
            <p className="text-[10px] text-muted-foreground">Max</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-right px-2">
            <p className="text-xs text-muted-foreground">Limit</p>
            <p className="text-sm font-medium">{campaign.hasUnicode ? 80 : 160}/SMS</p>
          </div>
        </div>
      </div>

      {/* Warning - Compact */}
      {stats.messagesOverLimit > 0 && (
        <Alert variant="destructive" className="py-2">
          <AlertTriangle className="h-3 w-3" />
          <AlertDescription className="text-xs ml-1">
            {stats.messagesOverLimit} message(s) over limit - will cost extra
          </AlertDescription>
        </Alert>
      )}

      {/* Cost Estimate - Compact */}
      <div className="flex items-center justify-between p-3 rounded-lg border border-green-200 bg-green-50/50">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium text-green-900">Estimated Cost</span>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-green-700">{estimatedCost.toLocaleString()} Tkn</p>
        </div>
      </div>
    </motion.div>
  )
}
