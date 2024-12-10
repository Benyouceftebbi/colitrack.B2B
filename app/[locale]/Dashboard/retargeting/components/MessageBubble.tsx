import React from 'react';

interface MessageBubbleProps {
  isVisible: boolean;
  message: string;
}

export default function MessageBubble({ isVisible, message }: MessageBubbleProps) {
  if (!isVisible) return null;

  return (
    <div className="flex justify-end mb-4">
      <div className="bg-blue-500 text-white rounded-lg py-2 px-4 max-w-[70%]">
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}

