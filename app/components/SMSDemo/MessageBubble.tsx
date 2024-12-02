"use client"
import React from 'react';

interface MessageBubbleProps {
  isVisible: boolean;
  message: string;
}

const urlRegex = /(https?:\/\/[^\s]+)/g;

export default function MessageBubble({ isVisible, message }: MessageBubbleProps) {
  const renderMessageWithLinks = (text: string) => {
    const parts = text.split(urlRegex);
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline"
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className={`transition-all duration-500 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}>
      <div className="bg-gray-300 dark:bg-gray-700 rounded-[1.3rem] rounded-tl-md px-4 py-3 max-w-[85%] mb-1">
        <p className="text-black dark:text-white text-[15px] leading-tight">
          {renderMessageWithLinks(message)}
        </p>
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 ml-2">
        Delivered
      </div>
    </div>
  );
}