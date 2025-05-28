"use client"

import type React from "react"

import { useRef } from "react"
import { ImageIcon, Upload, X, Video, Play } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { EnhancedPromptInput } from "../input/enhanced-prompt-input"
import { ProgressRing } from "@/components/ui/progress-ring"

interface ReelControlPanelProps {
  prompt: string
  onPromptChange: (prompt: string) => void
  settings: any
  onSettingsChange: (settings: any) => void
  onGenerate: () => void
  isGenerating: boolean
  uploadedFile: File | null
  onFileUpload: (file: File) => void
  onRemoveFile: () => void
  suggestions: string[]
  onSuggestionClick: (suggestion: string) => void
  generationProgress: number
}

export function ReelControlPanel({
  prompt,
  onPromptChange,
  settings,
  onSettingsChange,
  onGenerate,
  isGenerating,
  uploadedFile,
  onFileUpload,
  onRemoveFile,
  suggestions,
  onSuggestionClick,
  generationProgress,
}: ReelControlPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const videoLengths = [
    { value: "3", label: "3 seconds" },
    { value: "5", label: "5 seconds" },
    { value: "10", label: "10 seconds" },
    { value: "15", label: "15 seconds" },
    { value: "30", label: "30 seconds" },
  ]

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileUpload(file)
    }
  }

  return (
    <div className="w-96 bg-background/90 backdrop-blur-xl border-r border-border flex-shrink-0 flex flex-col relative">
      {/* Floating gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-accent/5 -z-10" />

      {/* Header */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-center gap-1">
          <Video className="h-3 w-3 text-primary" />
          <span className="text-sm font-semibold">Colitrack AI</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-6">
          {/* Source Image Upload */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">
              Source Image <span className="text-destructive">*</span>
            </Label>

            {uploadedFile ? (
              <div className="bg-card border-2 border-border rounded-xl p-4 relative group">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-10 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                    <ImageIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{uploadedFile.name}</p>
                    <p className="text-xs text-muted-foreground">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onRemoveFile}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="h-32 bg-gradient-to-br from-muted/50 to-muted border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary hover:bg-gradient-to-br hover:from-primary/5 hover:to-accent/5 transition-all duration-300 cursor-pointer group"
              >
                <div className="p-3 bg-card rounded-xl mb-3 mx-auto w-fit group-hover:scale-110 transition-transform duration-200">
                  <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                </div>
                <p className="text-sm font-medium mb-1">Upload your source image</p>
                <p className="text-xs text-muted-foreground">JPG, PNG up to 10MB • Required for reel generation</p>
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </div>

          {/* Enhanced Prompt Input */}
          <EnhancedPromptInput
            prompt={prompt}
            onPromptChange={onPromptChange}
            onGenerate={onGenerate}
            isGenerating={isGenerating}
            suggestions={suggestions}
            placeholder="Describe the motion and animation you want: dancing, spinning, walking, flying..."
          />

          {/* Video Length and Number of Outputs - Side by Side */}
          <div className="grid grid-cols-2 gap-4">
            {/* Video Length Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Video Length</Label>
              <Select
                value={settings.length}
                onValueChange={(value) => onSettingsChange({ ...settings, length: value })}
              >
                <SelectTrigger className="bg-background/70 border-input h-11 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border rounded-xl">
                  {videoLengths.map((length) => (
                    <SelectItem key={length.value} value={length.value} className="hover:bg-accent">
                      <span className="font-medium text-sm">{length.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Number of Outputs */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Number of Reels</Label>
              <Select
                value={settings.outputs.toString()}
                onValueChange={(value) => onSettingsChange({ ...settings, outputs: Number.parseInt(value) })}
              >
                <SelectTrigger className="bg-background/70 border-input h-11 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border rounded-xl">
                  {[1, 2, 3, 4].map((num) => (
                    <SelectItem key={num} value={num.toString()} className="hover:bg-accent">
                      <span className="text-sm">
                        {num} Reel{num > 1 ? "s" : ""}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Generate Button */}
      <div className="p-6 border-t border-border">
        <Button
          onClick={onGenerate}
          disabled={!prompt.trim() || !uploadedFile || isGenerating}
          className="w-full font-bold py-4 text-base shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] rounded-xl relative overflow-hidden"
          size="lg"
        >
          {isGenerating ? (
            <div className="flex items-center justify-center gap-3">
              <ProgressRing progress={generationProgress} size={24} />
              <span>Creating Reel...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Play className="h-5 w-5" />
              <span>Generate Reel</span>
              <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
                <span className="text-sm">🎬</span>
                <span className="font-bold text-sm">{settings.outputs}</span>
              </div>
            </div>
          )}

          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-pulse" />
        </Button>

        {/* Credits info */}
        <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
          <span>Credits: 47 remaining</span>
          <span>~5 credits per reel</span>
        </div>
      </div>
    </div>
  )
}
