"use client"

import { useState } from "react"
import { VerticalModeNavigation } from "./components/navigation/vertical-mode-navigation"
import { ControlPanel } from "./components/panels/control-panel"
import { ReelControlPanel } from "./components/panels/reel-control-panel"
import { OutputPanel } from "./components/panels/output-panel"
import { HistoryPanel } from "./components/panels/history-panel"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import type { CreativeMode, HistoryItem } from "./components/types"

export default function AICreativePage() {
  const [activeMode, setActiveMode] = useState<CreativeMode>("image")
  const [prompt, setPrompt] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const { toast } = useToast()
  const [history, setHistory] = useState<HistoryItem[]>([
    // Sample history data
    {
      id: "1",
      type: "image",
      prompt: "A futuristic cityscape at sunset with flying cars and neon lights, cyberpunk style, highly detailed",
      results: [
        "/placeholder.svg?height=400&width=600&text=Cyberpunk+City+1",
        "/placeholder.svg?height=400&width=600&text=Cyberpunk+City+2",
        "/placeholder.svg?height=400&width=600&text=Cyberpunk+City+3",
        "/placeholder.svg?height=400&width=600&text=Cyberpunk+City+4",
      ],
      settings: { aspectRatio: "16:9", creativity: [8], outputs: 4 },
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      status: "completed",
      metadata: {
        model: "DALL-E 3",
        aspectRatio: "16:9",
        creativity: 8,
      },
    },
    {
      id: "2",
      type: "reel",
      prompt: "Dancing character with smooth movements, elegant ballet poses, graceful motion",
      results: [
        "/placeholder.svg?height=400&width=600&text=Dancing+Reel+1",
        "/placeholder.svg?height=400&width=600&text=Dancing+Reel+2",
      ],
      settings: { quality: "pro", length: "10", creativity: [6], outputs: 2 },
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      status: "completed",
      metadata: {
        quality: "Pro",
        duration: "10",
        creativity: 6,
      },
    },
    {
      id: "3",
      type: "image",
      prompt: "Magical forest with glowing mushrooms and fairy lights, fantasy art style, enchanted atmosphere",
      results: [
        "/placeholder.svg?height=400&width=600&text=Magic+Forest+1",
        "/placeholder.svg?height=400&width=600&text=Magic+Forest+2",
      ],
      settings: { aspectRatio: "9:16", creativity: [9], outputs: 2 },
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      status: "completed",
      metadata: {
        model: "Midjourney",
        aspectRatio: "9:16",
        creativity: 9,
      },
    },
    {
      id: "4",
      type: "reel",
      prompt: "Ocean waves crashing on rocks, dramatic slow motion, cinematic lighting",
      results: ["/placeholder.svg?height=400&width=600&text=Ocean+Waves+1"],
      settings: { quality: "standard", length: "5", creativity: [4], outputs: 1 },
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      status: "completed",
      metadata: {
        quality: "Standard",
        duration: "5",
        creativity: 4,
      },
    },
  ])
  const [suggestions] = useState<string[]>([
    "vibrant colors",
    "professional lighting",
    "high resolution",
    "cinematic style",
    "detailed textures",
    "dramatic shadows",
  ])
  const [reelSuggestions] = useState<string[]>([
    "smooth motion",
    "dynamic movement",
    "flowing animation",
    "cinematic transition",
    "natural physics",
    "dramatic effect",
  ])
  const [settings, setSettings] = useState({
    aspectRatio: "9:16",
    creativity: [7],
    outputs: 4,
  })
  const [reelSettings, setReelSettings] = useState({
    quality: "standard",
    length: "5",
    creativity: [5],
    outputs: 2,
  })

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    if (activeMode === "reel" && !uploadedFile) return

    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate progressive generation
    const progressInterval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    setTimeout(() => {
      const currentSettings = activeMode === "reel" ? reelSettings : settings
      const mockImages = Array.from(
        { length: currentSettings.outputs },
        (_, i) => `/placeholder.svg?height=400&width=600&text=${activeMode === "reel" ? "Reel" : "Generated"}+${i + 1}`,
      )

      // Add to history
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        type: activeMode,
        prompt: prompt,
        results: mockImages,
        settings: currentSettings,
        timestamp: new Date(),
        status: "completed",
        metadata:
          activeMode === "reel"
            ? {
                quality: reelSettings.quality,
                duration: reelSettings.length,
                creativity: reelSettings.creativity[0],
              }
            : {
                model: "KOLORS 1.5",
                aspectRatio: settings.aspectRatio,
                creativity: settings.creativity[0],
              },
      }

      setHistory((prev) => [newHistoryItem, ...prev])
      setGeneratedImages(mockImages)
      setIsGenerating(false)
      setGenerationProgress(100)
      toast({
        title: "Success!",
        description: activeMode === "reel" ? "Reels generated successfully!" : "Images generated successfully!",
      })
      clearInterval(progressInterval)
    }, 4000)
  }

  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
    toast({
      title: "Image uploaded!",
      description: "Your image has been uploaded successfully.",
    })
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
    toast({
      title: "Image removed",
      description: "The uploaded image has been removed.",
    })
  }

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt((prev) => prev + (prev ? " " : "") + suggestion.toLowerCase())
  }

  const handleImageAction = (action: string, imageIndex: number) => {
    console.log(`Action: ${action} on ${activeMode} ${imageIndex}`)
    // Handle image/reel actions like download, view, etc.
  }

  const handleRegenerateVariation = (imageIndex: number) => {
    console.log(`Regenerate variation for ${activeMode} ${imageIndex}`)
    // Handle variation generation
  }

  const handleOpenHistoryItem = (item: HistoryItem) => {
    // Switch to the appropriate mode
    setActiveMode(item.type)

    // Load the prompt and settings
    setPrompt(item.prompt)
    if (item.type === "reel") {
      setReelSettings(item.settings)
    } else {
      setSettings(item.settings)
    }

    // Load the generated results
    setGeneratedImages(item.results)

    toast({
      title: "History item opened",
      description: `Opened ${item.type} from history`,
    })
  }

  const handleDeleteHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id))
    toast({
      title: "Item deleted",
      description: "Item deleted from history",
    })
  }

  const handleRegenerateFromHistory = (item: HistoryItem) => {
    // Switch to the appropriate mode
    setActiveMode(item.type)

    // Load the prompt and settings
    setPrompt(item.prompt)
    if (item.type === "reel") {
      setReelSettings(item.settings)
    } else {
      setSettings(item.settings)
    }

    // Clear current results and trigger generation
    setGeneratedImages([])

    toast({
      title: "Regenerating...",
      description: `Regenerating ${item.type}...`,
    })

    // Auto-trigger generation after a short delay
    setTimeout(() => {
      handleGenerate()
    }, 500)
  }

  const renderContent = () => {
    switch (activeMode) {
      case "image":
        return (
          <div className="flex h-full">
            <ControlPanel
              prompt={prompt}
              onPromptChange={setPrompt}
              settings={settings}
              onSettingsChange={setSettings}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              uploadedFile={uploadedFile}
              onFileUpload={handleFileUpload}
              onRemoveFile={handleRemoveFile}
              suggestions={suggestions}
              onSuggestionClick={handleSuggestionClick}
              generationProgress={generationProgress}
            />
            <OutputPanel
              generatedImages={generatedImages}
              isGenerating={isGenerating}
              onImageAction={handleImageAction}
              onRegenerateVariation={handleRegenerateVariation}
              generationProgress={generationProgress}
              mode="image"
              originalPrompt={prompt}
            />
          </div>
        )

      case "reel":
        return (
          <div className="flex h-full">
            <ReelControlPanel
              prompt={prompt}
              onPromptChange={setPrompt}
              settings={reelSettings}
              onSettingsChange={setReelSettings}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              uploadedFile={uploadedFile}
              onFileUpload={handleFileUpload}
              onRemoveFile={handleRemoveFile}
              suggestions={reelSuggestions}
              onSuggestionClick={handleSuggestionClick}
              generationProgress={generationProgress}
            />
            <OutputPanel
              generatedImages={generatedImages}
              isGenerating={isGenerating}
              onImageAction={handleImageAction}
              onRegenerateVariation={handleRegenerateVariation}
              generationProgress={generationProgress}
              mode="reel"
              originalPrompt={prompt}
            />
          </div>
        )

      case "history":
        return (
          <HistoryPanel
            history={history}
            onOpenHistoryItem={handleOpenHistoryItem}
            onDeleteHistoryItem={handleDeleteHistoryItem}
            onRegenerateFromHistory={handleRegenerateFromHistory}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-background to-secondary/20 dark:from-background dark:to-secondary/10 flex relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-300 dark:bg-primary-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-300 dark:bg-accent-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000" />
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-secondary-300 dark:bg-secondary-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500" />
      </div>

      <VerticalModeNavigation activeMode={activeMode} onModeChange={setActiveMode} />

      <div className="flex-1 overflow-hidden">{renderContent()}</div>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  )
}
