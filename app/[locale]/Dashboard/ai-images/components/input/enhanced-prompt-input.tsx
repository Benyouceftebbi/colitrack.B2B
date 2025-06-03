"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Wand2, Trash2, RotateCcw, Sparkles } from "lucide-react" // Removed Lightbulb, X
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PromptBuilderModal } from "../modals/prompt-builder-modal"

interface EnhancedPromptInputProps {
  prompt: string
  onPromptChange: (prompt: string) => void
  onGenerate: () => void
  isGenerating: boolean
  // suggestions: string[] // Removed suggestions prop
  placeholder?: string
}

export function EnhancedPromptInput({
  prompt,
  onPromptChange,
  onGenerate,
  isGenerating,
  // suggestions, // Prop no longer used
  placeholder,
}: EnhancedPromptInputProps) {
  // const [showSuggestions, setShowSuggestions] = useState(false) // State no longer needed
  const [isPromptBuilderModalOpen, setIsPromptBuilderModalOpen] = useState(false)
  // const helperTimeoutRef = useRef<NodeJS.Timeout | null>(null) // Ref no longer needed for tip timeout

  // useEffect for prompt helper tip (always visible, but with initial animation)
  // This effect can be simplified or removed if the button is always meant to be static
  // For now, let's keep a simple logic to ensure it's "active" for animation purposes
  const [promptHelperTipActive, setPromptHelperTipActive] = useState(false)
  useEffect(() => {
    // Set to true after a short delay to allow animation
    const timer = setTimeout(() => {
      setPromptHelperTipActive(true)
    }, 100) // Short delay for animation trigger
    return () => clearTimeout(timer)
  }, [])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      onGenerate()
    }
  }

  const enhancePrompt = () => {
    const enhancements = [
      "highly detailed, professional photography",
      "8k resolution, cinematic lighting",
      "award-winning composition, vibrant colors",
      "studio quality, perfect lighting",
    ]
    const randomEnhancement = enhancements[Math.floor(Math.random() * enhancements.length)]
    onPromptChange(prompt + (prompt ? ", " : "") + randomEnhancement)
  }

  const handleOpenPromptBuilder = () => {
    setIsPromptBuilderModalOpen(true)
  }

  const handlePromptFromBuilder = (newPrompt: string) => {
    onPromptChange(newPrompt)
    setIsPromptBuilderModalOpen(false)
  }

  const handleClearPrompt = () => {
    onPromptChange("")
  }

  const handleResetPrompt = () => {
    onPromptChange("") // Simple reset, could be more complex if needed
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">Describe Your Vision</Label>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={enhancePrompt} className="h-8 px-3">
            <Wand2 className="h-3 w-3 mr-1" />
            Enhance
          </Button>
        </div>
      </div>

      <div className="relative">
        <Textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          onKeyDown={handleKeyPress}
          // onFocus={() => setShowSuggestions(true)} // Removed focus handler for suggestions
          placeholder={placeholder || "A futuristic cityscape at sunset with flying cars and neon lights..."}
          className={cn(
            "h-24 resize-none border-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 text-sm rounded-xl transition-all duration-200",
          )}
        />

        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">{prompt.length}/500</div>

        <div className="absolute top-2 right-2 flex gap-1">
          <button
            onClick={handleClearPrompt}
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
            title="Clear prompt"
          >
            <Trash2 className="h-3 w-3" />
          </button>
          <button
            onClick={handleResetPrompt}
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
            title="Reset prompt"
          >
            <RotateCcw className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Prompt Builder Helper Button - Always visible */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleOpenPromptBuilder}
        className={cn(
          "w-full justify-start text-left border-primary/50 hover:border-primary bg-primary/5 hover:bg-primary/10 text-primary",
          "dark:border-primary/70 dark:hover:border-primary dark:bg-primary/900 dark:hover:bg-primary/800 dark:text-primary-400",
          "transition-all duration-500 ease-out",
          promptHelperTipActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none", // Keep animation
        )}
      >
        <Sparkles className="h-4 w-4 mr-2 text-primary" />
        Need help crafting a detailed prompt?
      </Button>

      {/* Smart Suggestions section removed */}

      <PromptBuilderModal
        isOpen={isPromptBuilderModalOpen}
        onClose={() => setIsPromptBuilderModalOpen(false)}
        currentPrompt={prompt}
        onPromptGenerated={handlePromptFromBuilder}
      />
    </div>
  )
}
