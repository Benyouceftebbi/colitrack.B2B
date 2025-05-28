"use client"

import type React from "react"

import { useState } from "react"
import { Lightbulb, Wand2, Trash2, RotateCcw, X } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      onGenerate()
    }
  }

  const enhancePrompt = () => {
    // Simulate AI prompt enhancement
    const enhancements = [
      "highly detailed, professional photography",
      "8k resolution, cinematic lighting",
      "award-winning composition, vibrant colors",
      "studio quality, perfect lighting",
    ]
    const randomEnhancement = enhancements[Math.floor(Math.random() * enhancements.length)]
    onPromptChange(prompt + (prompt ? ", " : "") + randomEnhancement)
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
          placeholder={placeholder || "A futuristic cityscape at sunset with flying cars and neon lights..."}
          className={cn(
            "h-24 resize-none border-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 text-sm rounded-xl transition-all duration-200",
          )}
        />

        {/* Character count */}
        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">{prompt.length}/500</div>

        {/* Action buttons */}
        <div className="absolute top-2 right-2 flex gap-1">
          <button className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent">
            <Trash2 className="h-3 w-3" />
          </button>
          <button className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent">
            <RotateCcw className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Smart Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-3 shadow-lg">
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
                onClick={() => onPromptChange(prompt + (prompt ? " " : "") + suggestion.toLowerCase())}
                className="px-3 py-1.5 bg-accent text-accent-foreground text-xs rounded-lg border border-border hover:border-primary hover:bg-primary/10 transition-all duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
