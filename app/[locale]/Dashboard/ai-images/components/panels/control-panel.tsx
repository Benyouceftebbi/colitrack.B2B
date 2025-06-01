"use client"

import type React from "react"
import { useRef, useState } from "react"
import { Upload, X, Sparkles } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { EnhancedPromptInput } from "../input/enhanced-prompt-input"
import { ProgressRing } from "@/components/ui/progress-ring"
import { cn } from "@/lib/utils"

interface ControlPanelProps {
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

export function ControlPanel({
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
}: ControlPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragActive, setIsDragActive] = useState(false)

  const aspectRatios = [
    {
      value: "1:1",
      label: "Square (1:1)",
      icon: <div className="w-4 h-4 border-2 border-foreground rounded-xs bg-transparent" />,
    },
    {
      value: "16:9",
      label: "Landscape (16:9)",
      icon: <div className="w-5 h-3 border-2 border-foreground rounded-xs bg-transparent" />,
    },
    {
      value: "9:16",
      label: "Portrait (9:16)",
      icon: <div className="w-3 h-5 border-2 border-foreground rounded-xs bg-transparent" />,
    },
    {
      value: "4:3",
      label: "Standard (4:3)",
      icon: <div className="w-4 h-3 border-2 border-foreground rounded-xs bg-transparent" />,
    },
    {
      value: "3:4",
      label: "Portrait (3:4)",
      icon: <div className="w-3 h-4 border-2 border-foreground rounded-xs bg-transparent" />,
    },
    {
      value: "3:2",
      label: "Photo (3:2)",
      icon: <div className="w-5 h-3.5 border-2 border-foreground rounded-xs bg-transparent" />,
    },
    {
      value: "2:3",
      label: "Photo Portrait (2:3)",
      icon: <div className="w-3.5 h-5 border-2 border-foreground rounded-xs bg-transparent" />,
    },
    {
      value: "5:4",
      label: "Landscape (5:4)",
      icon: (
        <div className="w-4 h-3.2 border-2 border-foreground rounded-xs bg-transparent" style={{ height: "0.8rem" }} />
      ),
    },
    {
      value: "4:5",
      label: "Portrait (4:5)",
      icon: (
        <div className="w-3.2 h-4 border-2 border-foreground rounded-xs bg-transparent" style={{ width: "0.8rem" }} />
      ),
    },
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileUpload(file)
    }
  }

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true)
    } else if (e.type === "dragleave") {
      setIsDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      onFileUpload(file)
    }
  }

  return (
    <div className="w-96 bg-white dark:bg-slate-950 border-r border-border flex-shrink-0 relative">
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-center gap-1">
          <Sparkles className="h-3 w-3 text-primary" />
          <span className="text-sm font-semibold">Colitrack AI Images</span>
        </div>
      </div>

      <div className="p-4 overflow-y-auto pb-32" style={{ height: "calc(100vh - 55px - 48px)" }}>
        <div className="space-y-4">
          <div className="space-y-3">
            <Label className="text-sm font-semibold">
              Reference Image <span className="text-muted-foreground font-normal">(Optional)</span>
            </Label>

            {uploadedFile ? (
              <div className="bg-card border-2 border-border rounded-xl p-4 relative group">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={URL.createObjectURL(uploadedFile) || "/placeholder.svg"}
                      alt="Uploaded preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium truncate">{uploadedFile.name}</p>
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
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "h-32 bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary dark:hover:border-primary-600 hover:bg-primary/5 dark:hover:bg-primary/900 transition-all duration-300 cursor-pointer group",
                  isDragActive && "border-primary bg-primary/10 dark:border-primary-500 dark:bg-primary/900",
                )}
              >
                <div
                  className={cn(
                    "p-3 bg-white dark:bg-slate-800 rounded-xl mb-3 mx-auto w-fit group-hover:scale-110 transition-transform duration-200",
                    isDragActive && "scale-110",
                  )}
                >
                  <Upload
                    className={cn(
                      "h-6 w-6 text-muted-foreground group-hover:text-primary dark:group-hover:text-primary-400",
                      isDragActive && "text-primary dark:text-primary-400",
                    )}
                  />
                </div>
                <p className="text-sm font-medium mb-1 text-foreground">
                  {isDragActive ? "Drop image here" : "Drop your image here"}
                </p>
                <p className="text-xs text-muted-foreground">or click to browse • JPG, PNG up to 10MB</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <EnhancedPromptInput
            prompt={prompt}
            onPromptChange={onPromptChange}
            onGenerate={onGenerate}
            isGenerating={isGenerating}
            suggestions={suggestions || []}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Image Size</Label>
              <Select
                value={settings.aspectRatio}
                onValueChange={(value) => onSettingsChange({ ...settings, aspectRatio: value })}
              >
                <SelectTrigger className="bg-white dark:bg-slate-900 border-input h-11 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border rounded-xl">
                  {aspectRatios.map((ratio) => (
                    <SelectItem key={ratio.value} value={ratio.value} className="hover:bg-accent">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-6 h-6">{ratio.icon}</div>
                        <span className="font-medium text-sm">{ratio.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold">Number of Images</Label>
              <Select
                value={settings.outputs.toString()}
                onValueChange={(value) => onSettingsChange({ ...settings, outputs: Number.parseInt(value) })}
              >
                <SelectTrigger className="bg-white dark:bg-slate-900 border-input h-11 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border rounded-xl">
                  {[1, 2, 3, 4, 6, 8].map((num) => (
                    <SelectItem key={num} value={num.toString()} className="hover:bg-accent">
                      <span className="text-sm">
                        {num} Image{num > 1 ? "s" : ""}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-white dark:bg-slate-950"
        style={{ width: "384px" }}
      >
        <Button
          onClick={onGenerate}
          disabled={!prompt.trim() || isGenerating}
          className="w-full font-bold py-4 text-base shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] rounded-xl relative overflow-hidden"
          size="lg"
        >
          {isGenerating ? (
            <div className="flex items-center justify-center gap-3">
              <ProgressRing progress={generationProgress} size={24} />
              <span>Generating Magic...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5" />
              <span>Generate</span>
              <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
                <span className="text-sm">🔥</span>
                <span className="font-bold text-sm">{settings.outputs}</span>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-pulse" />
        </Button>
        <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
          <span>Credits: 47 remaining</span>
          <span>~2 credits per generation</span>
        </div>
      </div>
    </div>
  )
}
