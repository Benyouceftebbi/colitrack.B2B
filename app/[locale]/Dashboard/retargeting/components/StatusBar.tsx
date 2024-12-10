import React from 'react';
import { Battery, Signal, Wifi } from 'lucide-react';

export default function StatusBar() {
  return (
    <div className="h-11 bg-gray-100 dark:bg-gray-800 flex justify-between items-center px-6 pt-2 text-sm font-medium text-gray-900 dark:text-white">
      <span>11:24</span>
      <div className="absolute left-1/2 -translate-x-1/2 w-[126px] h-[22px] bg-black rounded-full" />
      <div className="flex items-center gap-1.5">
        <Signal className="w-4 h-4" />
        <Wifi className="w-4 h-4" />
        <Battery className="w-5 h-5" />
      </div>
    </div>
  );
}

