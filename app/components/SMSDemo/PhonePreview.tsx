"use client"
import StatusBar from "./StatusBar"
import MessageHeader from "./MessageHeader"
import MessageBubble from "./MessageBubble"

interface PhonePreviewProps {
  isMessageSent: boolean
  messageTemplate: string
  senderId: string
}

export default function PhonePreview({ isMessageSent, messageTemplate, senderId }: PhonePreviewProps) {
  return (
    <div className="relative w-full">
      {/* iPhone Frame */}
      <div className="relative w-full h-[480px] md:h-[520px] bg-gradient-to-b from-gray-800 to-black rounded-[2.5rem] p-2 shadow-2xl ring-1 ring-gray-900/10">
        <div className="w-full h-full bg-white dark:bg-gray-900 rounded-[2.2rem] overflow-hidden shadow-inner">
          <StatusBar />
          <MessageHeader senderId={senderId} />

          {/* Messages Container */}
          <div className="h-full overflow-y-auto px-4 py-3 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="text-center mb-4">
              <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200/50 dark:bg-gray-700/50 px-3 py-1 rounded-full inline-block">
                Today 11:24
              </div>
            </div>
            <MessageBubble isVisible={isMessageSent} message={messageTemplate} />
          </div>
        </div>
      </div>

      {/* Phone shadow/glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-indigo-500/20 rounded-[2.5rem] blur-xl -z-10 scale-105" />
    </div>
  )
}
