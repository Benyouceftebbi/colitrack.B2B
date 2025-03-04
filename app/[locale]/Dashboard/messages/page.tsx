"use client"
import * as React from "react"
import { MessageHeader } from "./message-center/message-header"
import { MessageStats } from "./message-center/message-stats"
import { SMSTemplatePanel } from "./message-center/sms-template-panel"
import { SMSHistory } from "./message-center/sms-history"
import { useMessageCenter } from "@/hooks/use-message-center"
import { useTranslations } from 'next-intl';

export default function MessageCenter() {
  const {
    token,
    senderId,
    selectedTemplates,
    toggleTemplate,
    previewTemplate,
    setPreviewTemplate
  } = useMessageCenter()
  const t = useTranslations("messages");

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="container mx-auto space-y-6">
      <div className="bg-[#faf5ff] p-4 rounded-lg">
      <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="w-full sm:w-1/6">
                <div className="aspect-video rounded-lg overflow-hidden bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/NZ-DOz5WYGo"
                    title="Delivery Update Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
              <div className="w-full sm:w-5/6">
                <h3 className="text-lg font-semibold mb-2">{t('messages')}</h3>
                <p className="text-sm text-gray-600">{t('messages-description')}</p>
              </div>
            </div>
            </div>
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