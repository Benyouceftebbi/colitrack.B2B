"use client"
import * as React from "react"
import { X, Eye } from "lucide-react"



import { SMSTemplatePanel } from "./message-center/sms-template-panel"
import { SMSHistory } from "./message-center/sms-history"
import { useMessageCenter } from "@/hooks/use-message-center"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { SMSAnalyzer } from "./message-center/message-analyzer"
import MessageHeader from "./message-center/message-header"

export default function MessageCenter() {
  const { token, senderId, selectedTemplates, toggleTemplate, previewTemplate, setPreviewTemplate } = useMessageCenter()
  const t = useTranslations("messages")
  const [showInfoDiv, setShowInfoDiv] = React.useState(true)
  const [senderIdd,setSenderId]=React.useState(senderId)
  const onSenderChange=(sender:any)=>{
    console.log(sender);
    
    setSenderId(sender)
  }

  
  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="container mx-auto space-y-6">

      
       <MessageHeader token={token} senderId={senderIdd} onSenderChange={onSenderChange}/>
        <SMSAnalyzer />


        <SMSHistory  senderId={senderIdd}/>
      </div>
    </div>
  )
}

