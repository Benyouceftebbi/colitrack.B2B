"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MessageSquare, FileText, AlertTriangle, CheckCircle2 } from "lucide-react"
import type { RetargetingCampaignHook, MessageType } from "../../types"
import { useTranslations } from "next-intl"

type MessageTypeSelectorProps = {
  campaign: RetargetingCampaignHook
}

export function MessageTypeSelector({ campaign }: MessageTypeSelectorProps) {
  const t = useTranslations("retargeting")

  const handleMessageTypeChange = (value: MessageType) => {
    campaign.setMessageType(value)
    if (value === "custom") {
      // Clear message column selection when switching to custom
      if (campaign.excelData) {
        campaign.setExcelData({
          ...campaign.excelData,
          messageColumn: undefined,
        })
      }
      campaign.setUniqueMessageStats(null)
    }
  }

  const handleMessageColumnSelect = (value: string) => {
    if (campaign.excelData) {
      campaign.setExcelData({
        ...campaign.excelData,
        messageColumn: value,
      })
    }
  }

  const isExcelSource = campaign.audienceSource === "excel"
  const hasMessageColumn = campaign.excelData?.messageColumn

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Choose Message Type</CardTitle>
          <CardDescription>
            Select how you want to send messages to your recipients
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup
            value={campaign.messageType}
            onValueChange={handleMessageTypeChange}
            className="space-y-3"
          >
            <div className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="custom" id="custom" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="custom" className="flex items-center gap-2 font-medium cursor-pointer">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  Custom Text (Same for All)
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Write one message that will be sent to all recipients. You can personalize with {"{{name}}"} placeholder.
                </p>
              </div>
            </div>

            <div className={`flex items-start space-x-3 p-4 rounded-lg border transition-colors ${!isExcelSource ? 'opacity-50' : 'hover:bg-muted/50'}`}>
              <RadioGroupItem value="unique" id="unique" className="mt-1" disabled={!isExcelSource} />
              <div className="flex-1">
                <Label htmlFor="unique" className="flex items-center gap-2 font-medium cursor-pointer">
                  <FileText className="h-4 w-4 text-primary" />
                  Unique Text (From Excel Column)
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Each recipient receives a unique message from a column in your Excel file.
                </p>
                {!isExcelSource && (
                  <p className="text-sm text-amber-600 mt-2">
                    This option is only available when uploading an Excel file.
                  </p>
                )}
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Unique Message Column Selection */}
      {campaign.messageType === "unique" && isExcelSource && campaign.excelData && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Select Message Column</CardTitle>
              <CardDescription>
                Choose the column containing unique messages for each recipient
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                value={campaign.excelData.messageColumn || ""}
                onValueChange={handleMessageColumnSelect}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select message column" />
                </SelectTrigger>
                <SelectContent>
                  {campaign.excelData.headers
                    .filter(header => 
                      header !== campaign.excelData?.phoneColumn && 
                      header !== campaign.excelData?.nameColumn
                    )
                    .map((header) => (
                      <SelectItem key={header} value={header}>
                        {header}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              {!hasMessageColumn && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Please select a column that contains the unique messages for each recipient.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Success indicator when message column is selected */}
      {campaign.messageType === "unique" && hasMessageColumn && campaign.uniqueMessageStats && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Message column selected successfully. {campaign.uniqueMessageStats.totalRecipients} unique messages found. 
              Click Next to review detailed statistics.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </motion.div>
  )
}
