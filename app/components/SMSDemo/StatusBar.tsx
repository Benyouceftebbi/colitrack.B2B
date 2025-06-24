"use client"
import { Battery, Signal, Wifi } from "lucide-react"

export default function StatusBar() {
  return (
    <div className="h-10 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 flex justify-between items-center px-6 pt-2 text-sm font-semibold text-gray-900 dark:text-white">
      <span>11:24</span>
      <div className="absolute left-1/2 -translate-x-1/2 w-[120px] h-[20px] bg-black rounded-full shadow-inner" />
      <div className="flex items-center gap-1.5">
        <Signal className="w-3.5 h-3.5" />
        <Wifi className="w-3.5 h-3.5" />
        <Battery className="w-4 h-4" />
      </div>
    </div>
  )
}
