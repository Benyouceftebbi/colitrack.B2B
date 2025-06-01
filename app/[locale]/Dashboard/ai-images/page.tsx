"use client"

import { useState, useEffect } from "react" // Added useEffect
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
  const [previousMode, setPreviousMode] = useState<CreativeMode | null>(null) // To track mode changes
  const [prompt, setPrompt] = useState("")
  const [promptReel, setPromptReel] = useState("")

  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const { toast } = useToast()
  const [history, setHistory] = useState<HistoryItem[]>([
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
      settings: { aspectRatio: "16:9", creativity: [8], outputs: 4, model: "DALL-E 3" },
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
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
      settings: { quality: "pro", creativity: [6], outputs: 2, model: "expert" },
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: "completed",
      metadata: {
        reelModel: "expert",
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
      settings: { aspectRatio: "9:16", creativity: [9], outputs: 2, model: "Midjourney" },
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
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
      settings: { quality: "standard", creativity: [4], outputs: 1, model: "normal" },
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: "completed",
      metadata: {
        reelModel: "normal",
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
    model: "KOLORS 1.5",
  })
  const [reelSettings, setReelSettings] = useState({
    quality: "standard",
    creativity: [5],
    outputs: 2,
    model: "normal" as "normal" | "expert",
  })

  // Effect to clear generated images when mode changes (but not from history panel)
  useEffect(() => {
    if (previousMode !== null && previousMode !== activeMode && activeMode !== "history") {
      // Only clear if it's a direct mode switch, not when loading from history
      // or when initially loading the page.
      // Also, don't clear if switching TO history, as history panel has its own display logic.
      // And don't clear if switching FROM history to image/reel if we want to preserve loaded history item.
      // The current handleOpenHistoryItem already sets generatedImages.
      if (!(previousMode === "history" && (activeMode === "image" || activeMode === "reel"))) {
        setGeneratedImages([])
      }
    }
    setPreviousMode(activeMode)
  }, [activeMode, previousMode])

  const handleGenerate = async () => {
    const currentPrompt = activeMode === "reel" ? promptReel : prompt
    if (!currentPrompt.trim()) return
    if (activeMode === "reel" && !uploadedFile) {
      toast({
        title: "Missing Source Image",
        description: "Please upload a source image to generate a reel.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setGenerationProgress(0)

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

      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        type: activeMode,
        prompt: currentPrompt,
        results: mockImages,
        settings: currentSettings,
        timestamp: new Date(),
        status: "completed",
        metadata:
          activeMode === "reel"
            ? {
                reelModel: reelSettings.model,
                quality: reelSettings.quality,
                creativity: reelSettings.creativity[0],
                duration: reelSettings.model === "expert" ? "10" : "5", // Example duration
              }
            : {
                model: settings.model,
                aspectRatio: settings.aspectRatio,
                creativity: settings.creativity[0],
              },
      }

      setHistory((prev) => [newHistoryItem, ...prev])
      setGeneratedImages(mockImages) // Set generated images for the current mode
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
      description: `${file.name} has been uploaded successfully.`,
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
    if (activeMode === "reel") {
      setPromptReel((prev) => prev + (prev ? " " : "") + suggestion.toLowerCase())
    } else {
      setPrompt((prev) => prev + (prev ? " " : "") + suggestion.toLowerCase())
    }
  }

  const handleImageAction = (action: string, imageIndex: number) => {
    console.log(`Action: ${action} on ${activeMode} ${imageIndex}`)
    // Example: Download
    if (action === "download" && generatedImages[imageIndex]) {
      const link = document.createElement("a")
      link.href = generatedImages[imageIndex]
      link.download = `${activeMode}_${imageIndex + 1}.svg` // Placeholder, ideally get real filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      toast({ title: "Download Started", description: `Downloading ${activeMode} ${imageIndex + 1}` })
    }
  }

  const handleRegenerateVariation = (imageIndex: number) => {
    console.log(`Regenerate variation for ${activeMode} ${imageIndex}`)
    toast({ title: "Variation Requested", description: `Regenerating variation for ${activeMode} ${imageIndex + 1}` })
    // Implement actual variation logic here
  }

  const handleModeChange = (newMode: CreativeMode) => {
    // Clear generated images if switching between "image" and "reel" modes directly
    // but not if switching to/from "history" or if the mode isn't actually changing.
    if (
      activeMode !== newMode &&
      ((activeMode === "image" && newMode === "reel") || (activeMode === "reel" && newMode === "image"))
    ) {
      setGeneratedImages([])
      // Optionally, you might want to clear the specific prompt for the mode you are leaving
      // if (activeMode === "image") setPrompt("");
      // if (activeMode === "reel") setPromptReel("");
      // And uploaded file if it's only relevant to one mode (e.g. reels)
      // if (newMode === "image" && activeMode === "reel") setUploadedFile(null);
    }
    setActiveMode(newMode)
  }

  const handleOpenHistoryItem = (item: HistoryItem) => {
    // Set active mode first, this will trigger the useEffect if mode changes
    setActiveMode(item.type)

    // Then set the state based on the history item
    if (item.type === "reel") {
      setPromptReel(item.prompt)
      const { length, ...restOfReelSettings } = item.settings as any
      setReelSettings(restOfReelSettings as typeof reelSettings)
      // Check if history item has an associated uploaded file concept (if applicable)
      // For now, we assume reels might have had an uploaded file, but images might not.
      // This part needs more robust logic if history items should restore uploaded files.
      // setUploadedFile(null); // Or some logic to retrieve/restore it
    } else {
      setPrompt(item.prompt)
      setSettings(item.settings as typeof settings)
      // setUploadedFile(null); // Image mode might also use reference images
    }

    setGeneratedImages(item.results) // Display results from history
    toast({
      title: "History item opened",
      description: `Opened ${item.type}: "${item.prompt.substring(0, 30)}..."`,
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
    setActiveMode(item.type)

    if (item.type === "reel") {
      setPromptReel(item.prompt)
      const { length, ...restOfReelSettings } = item.settings as any
      setReelSettings(restOfReelSettings as typeof reelSettings)
      // Potentially setUploadedFile if the history item implies one was used
    } else {
      setPrompt(item.prompt)
      setSettings(item.settings as typeof settings)
    }

    setGeneratedImages([]) // Clear current output before regenerating
    toast({
      title: "Regenerating...",
      description: `Regenerating ${item.type} from: "${item.prompt.substring(0, 30)}..."`,
    })
    // Simulate delay then call handleGenerate
    // Ensure uploadedFile is set if needed for reel regeneration from history
    if (item.type === "reel" && !uploadedFile) {
      // This is a tricky part: if history item for reel needs an image,
      // we need a way to re-associate it or prompt the user.
      // For now, let's assume the user needs to re-upload if not already present.
      toast({
        title: "Source Image Needed",
        description: "Please ensure a source image is uploaded for reel regeneration if it was used.",
        variant: "destructive",
      })
      // Potentially don't proceed with handleGenerate or make it conditional
      // return;
    }

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
              prompt={promptReel}
              onPromptChange={setPromptReel}
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
              originalPrompt={promptReel}
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
    <div className="h-screen bg-white dark:bg-slate-950 flex relative overflow-hidden border-t border-border">
      <VerticalModeNavigation activeMode={activeMode} onModeChange={handleModeChange} />
      <div className="flex-1 overflow-hidden">{renderContent()}</div>
      <Toaster />
    </div>
  )
}
