"use client"
import * as React from "react"
import { X, Eye } from "lucide-react"


import { MessageHeader } from "./message-center/message-header"
import { SMSTemplatePanel } from "./message-center/sms-template-panel"
import { SMSHistory } from "./message-center/sms-history"
import { useMessageCenter } from "@/hooks/use-message-center"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"

export default function MessageCenter() {
  const { token, senderId, selectedTemplates, toggleTemplate, previewTemplate, setPreviewTemplate } = useMessageCenter()
  const t = useTranslations("messages")
  const [showInfoDiv, setShowInfoDiv] = React.useState(true)

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="container mx-auto space-y-6">

        <MessageHeader token={token} senderId={senderId} />
        {/*<MessageStats />*/}

        <SMSTemplatePanel
          selectedTemplates={selectedTemplates}
          onTemplateToggle={toggleTemplate}
          onPreviewTemplate={setPreviewTemplate}
        />

        <SMSHistory />
      </div>
    </div>
  )
}

