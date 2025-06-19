"use client"

import type React from "react"

import { useState } from "react"
import { Edit3, X, Wand2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ImageEnhancementModalProps {
  image: string
  originalPrompt: string
  onClose: () => void
  onEnhance: (enhancementPrompt: string) => void
  isEnhancing: boolean
}

export function ImageEnhancementModal({
  image,
  originalPrompt,
  onClose,
  onEnhance,
  isEnhancing,
}: ImageEnhancementModalProps) {
  const [enhancementPrompt, setEnhancementPrompt] = useState("")

  const handleEnhance = () => {
    if (enhancementPrompt.trim()) {
      onEnhance(enhancementPrompt)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleEnhance()
    }
  }

  const enhancementSuggestions = [
    "make it more vibrant",
    "add dramatic lighting",
    "increase detail",
    "make it photorealistic",
    "add cinematic effects",
    "enhance colors",
    "add depth of field",
    "make it more artistic",
  ]

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">

            
            <div className="p-2 bg-primary/10 rounded-lg">
              <Edit3 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Enhance Image</h3>
              <p className="text-sm text-muted-foreground">Add details to improve your image</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row h-[calc(90vh-120px)]">
          {/* Image Preview - Left Side */}
          <div className="flex-1 bg-muted flex items-center justify-center p-6">
            <div className="relative max-w-full max-h-full">
              <img
                src={image || "/placeholder.svg"}
                alt="Generated image"
                className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
                style={{ maxWidth: "500px", maxHeight: "500px" }}
              />
              <div className="absolute top-3 left-3">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Original
                </Badge>
              </div>
            </div>
          </div>

          {/* Enhancement Panel - Right Side */}
          <div className="w-full lg:w-96 border-l border-border flex flex-col">
            {/* Original Prompt */}
            <div className="p-6 border-b border-border">
              <h4 className="font-semibold mb-3">Original Prompt</h4>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-sm">{originalPrompt}</p>
              </div>
            </div>

            {/* Enhancement Input */}
            <div className="flex-1 p-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-semibold mb-3 block">Enhancement Instructions</Label>
                  <Textarea
                    value={enhancementPrompt}
                    onChange={(e) => setEnhancementPrompt(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Describe how you want to enhance this image..."
                    className="h-24 resize-none border-2 border-input text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 text-sm rounded-xl transition-all duration-200"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-muted-foreground">{enhancementPrompt.length}/200</span>
                    <span className="text-xs text-muted-foreground">Ctrl+Enter to enhance</span>
                  </div>
                </div>

                {/* Quick Enhancement Suggestions */}
                <div>
                  <Label className="text-sm font-medium text-muted-foreground mb-2 block">Quick Enhancements</Label>
                  <div className="flex flex-wrap gap-2">
                    {enhancementSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setEnhancementPrompt(suggestion)}
                        className="px-3 py-1.5 bg-muted text-foreground text-xs rounded-lg border border-border hover:border-primary hover:bg-primary/10 transition-all duration-200"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 border-t border-border">
              <div className="flex gap-3">
                <Button variant="outline" onClick={onClose} className="flex-1" disabled={isEnhancing}>
                  Cancel
                </Button>
                <Button onClick={handleEnhance} disabled={!enhancementPrompt.trim() || isEnhancing} className="flex-1">
                  {isEnhancing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Enhancing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Wand2 className="h-4 w-4" />
                      Enhance
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
