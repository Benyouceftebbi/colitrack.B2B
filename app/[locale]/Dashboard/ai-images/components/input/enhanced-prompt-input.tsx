"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Lightbulb, Wand2, Trash2, RotateCcw, X, Sparkles } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PromptBuilderModal } from "../modals/prompt-builder-modal" // Import the new modal

interface EnhancedPromptInputProps {
  prompt: string
  onPromptChange: (prompt: string) => void
  onGenerate: () => void
  isGenerating: boolean
  suggestions: string[]
  placeholder?: string
}

export function EnhancedPromptInput({
  prompt,
  onPromptChange,
  onGenerate,
  isGenerating,
  suggestions,
  placeholder,
}: EnhancedPromptInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showPromptHelperTip, setShowPromptHelperTip] = useState(false)
  const [isPromptBuilderModalOpen, setIsPromptBuilderModalOpen] = useState(false)
  const helperTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (helperTimeoutRef.current) {
      clearTimeout(helperTimeoutRef.current)
    }

    if (prompt.length > 0 && prompt.length < 30 && !isPromptBuilderModalOpen && !isGenerating) {
      helperTimeoutRef.current = setTimeout(() => {
        setShowPromptHelperTip(true)
      }, 1500) // Show after 1.5s of inactivity
    } else {
      setShowPromptHelperTip(false)
    }

    return () => {
      if (helperTimeoutRef.current) {
        clearTimeout(helperTimeoutRef.current)
      }
    }
  }, [prompt, isPromptBuilderModalOpen, isGenerating])

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
    setShowPromptHelperTip(false) // Hide tip when modal opens
  }

  const handlePromptFromBuilder = (newPrompt: string) => {
    onPromptChange(newPrompt)
    setIsPromptBuilderModalOpen(false)
  }

  const handleClearPrompt = () => {
    onPromptChange("")
  }

  const handleResetPrompt = () => {
    // This would ideally reset to a previous state or a default.
    // For now, let's just clear it as an example.
    onPromptChange("")
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
          onFocus={() => setShowSuggestions(true)}
          // onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // Hide suggestions on blur with delay
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

      {/* Prompt Builder Helper Tip */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleOpenPromptBuilder}
        className={cn(
          "w-full justify-start text-left border-primary/50 hover:border-primary bg-primary/5 hover:bg-primary/10 text-primary",
          "dark:border-primary/70 dark:hover:border-primary dark:bg-primary/900 dark:hover:bg-primary/800 dark:text-primary-400",
          "transition-all duration-500 ease-out",
          showPromptHelperTip ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none",
        )}
      >
        <Sparkles className="h-4 w-4 mr-2 text-primary" />
        Need help crafting a detailed prompt?
      </Button>

      {showSuggestions && suggestions.length > 0 && (
        <div className="bg-card dark:bg-slate-800 border border-border dark:border-slate-700 rounded-xl p-3 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-foreground">Smart Suggestions</span>
            </div>
            <button
              onClick={() => setShowSuggestions(false)}
              className="p-1 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  onPromptChange(prompt + (prompt ? " " : "") + suggestion.toLowerCase())
                  setShowSuggestions(false) // Optionally hide suggestions after click
                }}
                className="px-3 py-1.5 bg-accent dark:bg-slate-700 text-accent-foreground dark:text-slate-200 text-xs rounded-lg border border-border dark:border-slate-600 hover:border-primary dark:hover:border-primary-500 hover:bg-primary/10 dark:hover:bg-primary/900 transition-all duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Prompt Builder Modal */}
      <PromptBuilderModal
        isOpen={isPromptBuilderModalOpen}
        onClose={() => setIsPromptBuilderModalOpen(false)}
        currentPrompt={prompt}
        onPromptGenerated={handlePromptFromBuilder}
      />
    </div>
  )
}
