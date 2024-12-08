"use client"
import React from 'react';
import { SafeMessage } from './types';
import { useTranslations } from 'next-intl';

interface ChatMessageProps {
  message: SafeMessage;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const t=useTranslations("ai.Messages")
  // Early return if message or required properties are missing
  if (!message?.sender || !message?.content || !message?.timestamp) {
    return null;
  }

  const isSenderCustomer = message.sender === 'customer';

  return (
    <div className={`flex ${isSenderCustomer ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
          isSenderCustomer
            ? 'bg-gray-100 dark:bg-gray-800 rounded-tl-none'
            : 'bg-indigo-600 dark:bg-indigo-500 text-white rounded-tr-none'
        }`}
      >
        <p className="break-words text-gray-900 dark:text-gray-100">
          {t(message.content)}
        </p>
        <div className={`text-xs mt-1 ${
          isSenderCustomer ? 'text-gray-500 dark:text-gray-400' : 'text-indigo-200'
        }`}>
          {message.timestamp}
        </div>
      </div>
    </div>
  );
}