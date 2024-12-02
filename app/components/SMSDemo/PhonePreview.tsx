"use client"
import React from 'react';
import StatusBar from './StatusBar';
import MessageHeader from './MessageHeader';
import MessageBubble from './MessageBubble';

interface PhonePreviewProps {
  isMessageSent: boolean;
  messageTemplate: string;
  senderId: string;
}

export default function PhonePreview({ isMessageSent, messageTemplate, senderId }: PhonePreviewProps) {
  return (
    <div className="relative w-full">
      {/* iPhone Frame */}
      <div className="relative w-full h-[600px] md:h-[680px] bg-black rounded-[3rem] p-3 shadow-2xl">
        <div className="w-full h-full bg-gray-100 dark:bg-gray-900 rounded-[2.7rem] overflow-hidden">
          <StatusBar />
          <MessageHeader senderId={senderId} />
          
          {/* Messages Container */}
          <div className="h-full overflow-y-auto px-4 py-2">
            <div className="text-center mb-6">
              <div className="text-xs text-gray-500 dark:text-gray-400">Today 11:24</div>
            </div>
            <MessageBubble isVisible={isMessageSent} message={messageTemplate} />
          </div>
        </div>
      </div>
    </div>
  );
}