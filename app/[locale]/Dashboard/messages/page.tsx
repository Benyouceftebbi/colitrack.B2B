"use client"
import * as React from "react"
import { MessageHeader } from "./message-center/message-header"
import { MessageStats } from "./message-center/message-stats"
import { SMSTemplatePanel } from "./message-center/sms-template-panel"
import { SMSHistory } from "./message-center/sms-history"
import { useMessageCenter } from "@/hooks/use-message-center"

export default function MessageCenter() {
  const {
    token,
    senderId,
    selectedTemplates,
    toggleTemplate,
    previewTemplate,
    setPreviewTemplate
  } = useMessageCenter()

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="container mx-auto space-y-6">
        <MessageHeader token={token} senderId={senderId} />
        <MessageStats />
        
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