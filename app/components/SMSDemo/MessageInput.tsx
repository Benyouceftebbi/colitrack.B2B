"use client"
import React from 'react';
import { Plus, ChevronUp } from 'lucide-react';

export default function MessageInput() {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-200 p-2">
      <div className="flex items-end gap-2">
        <button className="p-2">
          <Plus className="w-6 h-6 text-blue-500" />
        </button>
        <div className="flex-1 bg-white rounded-3xl px-4 py-2 min-h-[36px] text-gray-400">
          iMessage
        </div>
        <button className="p-2">
          <ChevronUp className="w-6 h-6 text-blue-500" />
        </button>
      </div>
      <div className="flex justify-center gap-1 mt-1">
        <div className="w-[80px] h-1 bg-black rounded-full" />
      </div>
    </div>
  );
}