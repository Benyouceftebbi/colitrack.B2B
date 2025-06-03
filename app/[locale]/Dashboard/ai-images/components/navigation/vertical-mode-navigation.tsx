"use client"

import { ImageIcon, Video, History } from "lucide-react"
import { cn } from "@/lib/utils"
import type { CreativeMode } from "../types"

interface VerticalModeNavigationProps {
  activeMode: CreativeMode
  onModeChange: (mode: CreativeMode) => void
}

export function VerticalModeNavigation({ activeMode, onModeChange }: VerticalModeNavigationProps) {
  const modes = [
    {
      id: "image" as CreativeMode,
      icon: ImageIcon,
      label: "Images",
      color: "text-primary", // Base color for the icon and text if active
      activeBg: "bg-primary/10 dark:bg-primary/20", // Background when active
      activeBorderColor: "border-primary dark:border-primary-600", // Border color when active
    },
    {
      id: "reel" as CreativeMode,
      icon: Video,
      label: "Reels",
      color: "text-primary",
      activeBg: "bg-primary/10 dark:bg-primary/20",
      activeBorderColor: "border-primary dark:border-primary-600",
    },
    {
      id: "history" as CreativeMode,
      icon: History,
      label: "History",
      color: "text-primary",
      activeBg: "bg-primary/10 dark:bg-primary/20",
      activeBorderColor: "border-primary dark:border-primary-600",
    },
  ]

  return (
    <div className="w-12 bg-white dark:bg-slate-950 border-r border-border flex flex-col items-center justify-center py-6 gap-3 relative">
      {/* Mode Icons - centered */}
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onModeChange(mode.id)}
          aria-label={mode.label}
          className={cn(
            "relative p-2.5 rounded-lg transition-all duration-300 transform hover:scale-110 group w-10 h-10 flex items-center justify-center", // Adjusted padding and ensured fixed size for consistency
            activeMode === mode.id
              ? `${mode.activeBg} ${mode.color} shadow-md border-2 ${mode.activeBorderColor}`
              : "text-muted-foreground hover:text-foreground hover:bg-accent/50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50 border-2 border-transparent",
          )}
        >
          <mode.icon className="h-5 w-5" /> {/* Increased icon size */}
          {/* Active indicator div removed, relying on button style changes */}
          {/* Tooltip on hover */}
          <div
            className={cn(
              "absolute left-full ml-3 top-1/2 transform -translate-y-1/2", // Adjusted margin for tooltip
              "bg-popover text-popover-foreground text-xs px-2.5 py-1.5 rounded-md shadow-lg", // Enhanced tooltip style
              "opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50",
            )}
          >
            {mode.label}
          </div>
        </button>
      ))}
    </div>
  )
}
