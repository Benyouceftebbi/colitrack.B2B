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
      color: "text-primary",
      bgColor: "bg-primary/10",
      activeBg: "bg-primary/20",
      borderColor: "border-primary",
    },
    {
      id: "reel" as CreativeMode,
      icon: Video,
      color: "text-primary",
      bgColor: "bg-primary/10",
      activeBg: "bg-primary/20",
      borderColor: "border-primary",
    },
    {
      id: "history" as CreativeMode,
      icon: History,
      color: "text-primary",
      bgColor: "bg-primary/10",
      activeBg: "bg-primary/20",
      borderColor: "border-primary",
    },
  ]

  return (
    <div className="w-12 bg-white dark:bg-slate-950 border-r border-border flex flex-col items-center justify-center py-6 gap-3 relative">
      {/* Mode Icons - centered */}
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onModeChange(mode.id)}
          className={cn(
            "relative p-2 rounded-lg transition-all duration-300 transform hover:scale-110 group",
            activeMode === mode.id
              ? `${mode.activeBg} ${mode.color} shadow-lg border-2 ${mode.borderColor} dark:bg-primary/30 dark:border-primary-600`
              : "text-muted-foreground hover:text-foreground hover:bg-accent/50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50 border-2 border-transparent",
          )}
        >
          <mode.icon className="h-4 w-4" />

          {/* Active indicator */}
          {activeMode === mode.id && (
            <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-0.5 h-4 bg-current rounded-full" />
          )}

          {/* Tooltip on hover */}
          <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
            {mode.id === "image" && "Images"}
            {mode.id === "reel" && "Reels"}
            {mode.id === "history" && "History"}
          </div>
        </button>
      ))}
    </div>
  )
}
