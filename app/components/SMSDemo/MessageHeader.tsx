"use client"
import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface MessageHeaderProps {
  senderId: string;
}

export default function MessageHeader({ senderId }: MessageHeaderProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 px-4 pb-2">
      <div className="flex items-center gap-4 py-2">
        <ChevronLeft className="w-5 h-5 text-blue-500" />
        <div className="flex-1 text-center">
          <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-1" />
          <div className="font-semibold text-gray-900 dark:text-white">{senderId || 'Colitrack'}</div>
        </div>
        <div className="w-5" /> {/* Spacer for alignment */}
      </div>
    </div>
  );
}