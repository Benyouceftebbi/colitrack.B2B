"use client"

import { useState, useEffect } from "react" // Added useEffect
// Removed VerticalModeNavigation import
import { OutputPanel } from "./components/panels/output-panel"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import type { CreativeMode, HistoryItem, CreationDetail } from "./components/types" // Added CreationDetail
import {
  GenerationWizardModal,
  // getDefaultImageSettings, // Will be modified in GenerationWizardModal itself
  // getDefaultReelSettings,
} from "./components/modals/generation-wizard-modal"
import { WelcomeScreen } from "./components/core/welcome-screen"
import { CreationDetailModal } from "./components/modals/creation-detail-modal" // Added CreationDetailModal import

// Define settings types here or import from a dedicated types file
export interface Settings {
  aspectRatio: string
  creativity: number[]
  outputs: number
  model: string
  language: string // Added language
}
export interface ReelSettings {
  quality: string
  creativity: number[]
  outputs: number
  model: "normal" | "expert"
  // No language for reels as per current request
}

const sampleInspirationItems: CreationDetail[] = [
  {
    id: 101,
    image: "/placeholder.svg?height=400&width=300",
    beforeImage: "/placeholder.svg?height=400&width=300",
    user: "ArtisanAI",
    avatar: "/placeholder.svg?height=32&width=32&text=AI",
    prompt: "A majestic fantasy landscape with floating islands and glowing waterfalls, digital painting style.",
    likes: 1250,
    type: "image",
    settings: { model: "DreamShaper XL", aspectRatio: "3:4", creativity: 8, quality: "Ultra" },
  },
  {
    id: 102,
    image: "/placeholder.svg?height=300&width=400",
    user: "TechDreamer",
    avatar: "/placeholder.svg?height=32&width=32&text=TD",
    prompt: "Close-up portrait of a futuristic robot with intricate details and glowing blue eyes, cinematic lighting.",
    likes: 980,
    type: "image",
    settings: { model: "Stable Diffusion 2.1", aspectRatio: "4:3", creativity: 7, quality: "HD" },
  },
  {
    id: 103,
    image: "/placeholder.svg?height=400&width=300", // Placeholder for reel thumbnail
    beforeImage: "/placeholder.svg?height=400&width=300",
    user: "MotionMagic",
    avatar: "/placeholder.svg?height=32&width=32&text=MM",
    prompt: "A character running through a forest, smooth animation, dynamic camera angle.",
    likes: 750,
    type: "reel",
    duration: "8s",
    settings: { reelModel: "expert", quality: "Pro", creativity: 9 },
  },
  {
    id: 104,
    image: "/placeholder.svg?height=300&width=400",
    user: "ColorBurst",
    avatar: "/placeholder.svg?height=32&width=32&text=CB",
    prompt: "An abstract explosion of vibrant colors, high energy, dynamic particles.",
    likes: 600,
    type: "image",
    settings: { model: "Kandinsky 2.2", aspectRatio: "16:9", creativity: 9, quality: "4K" },
  },
]

export default function AICreativePage() {
  const [currentView, setCurrentView] = useState<"welcome" | "output">("welcome")
  const [activeMode, setActiveMode] = useState<CreativeMode>("image") // Default, will be set by creation type
  const [currentGenerationType, setCurrentGenerationType] = useState<"image" | "reel" | null>(null)

  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generatedOutputs, setGeneratedOutputs] = useState<string[]>([])
  const [currentPromptForOutput, setCurrentPromptForOutput] = useState("")

  const { toast } = useToast()
  const [userHistory, setUserHistory] = useState<HistoryItem[]>([
    {
      id: "hist_1",
      type: "image",
      prompt:
        "A serene zen garden with a koi pond, cherry blossoms, and a stone lantern. Photorealistic, soft morning light.",
      results: [
        "/placeholder.svg?height=400&width=600&text=Zen+Garden+1",
        "/placeholder.svg?height=400&width=600&text=Zen+Garden+2",
      ],
      settings: { aspectRatio: "16:9", creativity: [7], outputs: 2, model: "KOLORS 1.5" } as Settings,
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      status: "completed",
      metadata: { model: "KOLORS 1.5", aspectRatio: "16:9", creativity: 7 },
    },
    {
      id: "hist_2",
      type: "reel",
      prompt:
        "A cat playfully chasing a laser pointer across a wooden floor. Fast-paced, dynamic camera following the cat.",
      results: ["/placeholder.svg?height=400&width=600&text=Cat+Laser+Reel"],
      settings: { quality: "standard", creativity: [5], outputs: 1, model: "normal" } as ReelSettings,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      status: "completed",
      metadata: { reelModel: "normal", quality: "Standard", duration: "7s", creativity: 5 },
    },
    {
      id: "hist_3",
      type: "image",
      prompt:
        "An astronaut discovering an ancient alien artifact on a desolate moon. Cinematic, dramatic lighting, wide shot.",
      results: ["/placeholder.svg?height=600&width=400&text=Astronaut+Artifact"],
      settings: { aspectRatio: "2:3", creativity: [9], outputs: 1, model: "Playground v2.5" } as Settings,
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      status: "completed",
      metadata: { model: "Playground v2.5", aspectRatio: "2:3", creativity: 9 },
    },
  ])

  const [isWizardOpen, setIsWizardOpen] = useState(false)
  const [wizardInitialPrompt, setWizardInitialPrompt] = useState("")
  const [wizardInitialImageSettings, setWizardInitialImageSettings] = useState<Settings>(() => ({
    aspectRatio: "1:1", // Default or from a new getDefaultImageSettings
    creativity: [7],
    outputs: 1,
    model: "KOLORS 1.5",
    language: "en", // Default language
  }))

  const [wizardInitialReelSettings, setWizardInitialReelSettings] = useState<ReelSettings>(() => ({
    quality: "standard",
    creativity: [5],
    outputs: 1,
    model: "normal",
  }))

  const [selectedInspiration, setSelectedInspiration] = useState<CreationDetail | null>(null)
  const [selectedHistoryItemForDetail, setSelectedHistoryItemForDetail] = useState<HistoryItem | null>(null)

  // Effect to clear generated outputs when switching views or types, unless viewing history
  useEffect(() => {
    if (
      currentView === "welcome" ||
      (currentView === "output" && !isGenerating && generatedOutputs.length > 0 && !selectedHistoryItemForDetail)
    ) {
      // If going to welcome, or if in output view but not actively generating/viewing new results,
      // and not specifically viewing a history item's details, then we are likely in the "history hub" state.
      // We might not want to clear generatedOutputs here if the intent is to show history.
      // This logic needs to be careful.
      // Let's clear only if we are explicitly moving away from showing fresh results.
    }
  }, [currentView, currentGenerationType, isGenerating, selectedHistoryItemForDetail])

  const handleStartCreation = (type: "image" | "reel") => {
    setCurrentGenerationType(type)
    setActiveMode(type)
    setGeneratedOutputs([])
    setIsGenerating(false)
    setCurrentView("output")

    setWizardInitialPrompt("") // Reset prompt for new creation
    if (type === "image") {
      setWizardInitialImageSettings({
        aspectRatio: "1:1",
        creativity: [7],
        outputs: 1,
        model: "KOLORS 1.5",
        language: "en", // Ensure language is part of default
      })
    } else if (type === "reel") {
      setWizardInitialReelSettings({
        quality: "standard",
        creativity: [5],
        outputs: 1,
        model: "normal",
      })
    }
    // Wizard is opened by OutputPanel's button, so no change here for opening it.
  }

  const handleInitiateNewGenerationWizard = () => {
    if (!currentGenerationType) return

    setWizardInitialPrompt("")
    if (currentGenerationType === "image") {
      setWizardInitialImageSettings({
        aspectRatio: "1:1",
        creativity: [7],
        outputs: 1,
        model: "KOLORS 1.5",
        language: "en", // Default language
      })
    } else if (currentGenerationType === "reel") {
      setWizardInitialReelSettings({
        quality: "standard",
        creativity: [5],
        outputs: 1,
        model: "normal",
      })
    }
    setIsWizardOpen(true)
  }

  const handleWizardSubmit = (data: any) => {
    if (!currentGenerationType) return

    setIsWizardOpen(false)
    setIsGenerating(true)
    setGeneratedOutputs([])
    setGenerationProgress(0)
    setCurrentPromptForOutput(data.prompt)
    setActiveMode(currentGenerationType)
    setCurrentView("output")

    console.log("Wizard submitted data:", data) // Log to see the new structure

    // productImageFile and inspirationImageFile would be in data.productImage, data.inspirationImage
    // language would be in data.settings.language for images

    const progressInterval = setInterval(() => {
      setGenerationProgress((prev) => (prev >= 100 ? 100 : prev + Math.random() * 15))
    }, 200)

    setTimeout(() => {
      clearInterval(progressInterval)
      setGenerationProgress(100)
      const numOutputs = data.settings.outputs || 1
      const mockResults = Array.from(
        { length: numOutputs },
        (_, i) =>
          `/placeholder.svg?height=400&width=600&text=${currentGenerationType}+Res+${i + 1}&query=${encodeURIComponent(data.prompt)}`,
      )
      setGeneratedOutputs(mockResults)

      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        type: currentGenerationType,
        prompt: data.prompt,
        results: mockResults,
        settings: data.settings, // This now includes language for images
        timestamp: new Date(),
        status: "completed",
        metadata:
          currentGenerationType === "image"
            ? {
                model: data.settings.model,
                aspectRatio: data.settings.aspectRatio,
                creativity: Array.isArray(data.settings.creativity)
                  ? data.settings.creativity[0]
                  : data.settings.creativity,
                language: data.settings.language, // Add language to metadata
              }
            : {
                reelModel: data.settings.model,
                quality: data.settings.quality,
                creativity: Array.isArray(data.settings.creativity)
                  ? data.settings.creativity[0]
                  : data.settings.creativity,
                duration: "5s",
              },
        // Store file names or placeholders if needed, actual files require upload logic
        // productImageName: data.productImage?.name,
        // inspirationImageName: data.inspirationImage?.name,
      }
      setUserHistory((prev) => [newHistoryItem, ...prev])
      setIsGenerating(false)
      toast({ title: "Success!", description: `${currentGenerationType} generation started!` })
    }, 3000)
  }

  const handleOpenHistoryItemDetail = (item: HistoryItem) => {
    setSelectedHistoryItemForDetail(item)
    // The CreationDetailModal will be used. We need to map HistoryItem to CreationDetail.
    // This is a bit of a workaround as CreationDetailModal expects CreationDetail.
    // For now, let's assume we can adapt or pass necessary fields.
    // Or, OutputPanel can show its own detail view for history items.
    // For now, let's use the existing CreationDetailModal for inspirations.
    // And for history, OutputPanel will show the results directly.
    // If a modal is needed for history items, it would be a separate state.
    // Let's simplify: clicking a history item in OutputPanel might just load its results into the main view.

    // For now, let's assume clicking a history item in OutputPanel will show its results in the main area
    // and potentially open a modal if we enhance this.
    // The prompt asks for history to be visible, and then a button to generate.
    // So, clicking a history item might just "select" it, and OutputPanel can show its details.
    // Let's refine this: OutputPanel will show a list. Clicking an item opens CreationDetailModal.
    const creationDetail: CreationDetail = {
      id: Number.parseInt(item.id.replace("hist_", ""), 10) || Date.now(), // Ensure ID is number
      image: item.results[0], // Show first result as primary image
      // beforeImage: undefined, // History items don't have before/after in this structure
      user: "You", // Or some other identifier for user's own creations
      avatar: "/placeholder.svg?height=32&width=32&text=U",
      prompt: item.prompt,
      likes: 0, // User history items don't have likes
      type: item.type,
      duration: item.metadata?.duration,
      settings: item.settings,
    }
    setSelectedInspiration(creationDetail) // Re-using inspiration modal for now
  }

  const handleDeleteHistoryItem = (id: string) => {
    setUserHistory((prev) => prev.filter((item) => item.id !== id))
    toast({ title: "Item deleted", description: "Item deleted from history" })
  }

  const handleRegenerateFromHistory = (item: HistoryItem) => {
    if (item.type === "image" || item.type === "reel") {
      setCurrentGenerationType(item.type)
      setWizardInitialPrompt(item.prompt)
      if (item.type === "image") {
        // Ensure item.settings is cast correctly and includes language
        const imageSettings = item.settings as Settings
        setWizardInitialImageSettings({
          ...getDefaultImageSettings(), // Get all defaults
          ...imageSettings, // Override with history settings
          language: imageSettings.language || "en", // Ensure language is present
        })
        // Potentially set product/inspiration image previews if paths were stored
      } else if (item.type === "reel") {
        setWizardInitialReelSettings(item.settings as ReelSettings)
        // Potentially set product image preview
      }
      setIsWizardOpen(true)
    }
  }

  const handleImageAction = (action: string, imageIndex: number) => {
    console.log(`Action: ${action} on ${currentGenerationType} ${imageIndex}`)
    if (action === "download" && generatedOutputs[imageIndex]) {
      const link = document.createElement("a")
      link.href = generatedOutputs[imageIndex]
      link.download = `${currentGenerationType}_${imageIndex + 1}.svg` // Assuming SVG, adjust if PNG/JPG
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      toast({ title: "Download Started" })
    }
  }

  const handleRegenerateVariation = (imageIndex: number) => {
    console.log(`Regenerate variation for ${currentGenerationType} ${imageIndex}`)
    toast({ title: "Variation Requested" })
  }

  const navigateToWelcome = () => {
    setCurrentView("welcome")
    setGeneratedOutputs([])
    setIsGenerating(false)
    setCurrentGenerationType(null) // Reset generation type context
  }

  const handleInspirationClick = (creation: CreationDetail) => {
    setSelectedInspiration(creation)
  }

  return (
    <div className="h-screen bg-white dark:bg-slate-950 flex flex-col relative overflow-hidden border-t border-border">
      {/* Optional Global Header can go here */}
      {/* <header className="p-4 border-b border-border text-center">
        <h1 className="text-xl font-bold">AI Creative Suite</h1>
      </header> */}
      <div className="flex flex-1 overflow-hidden">
        {/* VerticalModeNavigation removed */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {currentView === "welcome" ? (
            <WelcomeScreen
              onStartCreation={handleStartCreation}
              inspirationItems={sampleInspirationItems}
              onInspirationClick={handleInspirationClick}
            /> // currentView === "output"
          ) : (
            <OutputPanel
              generatedImages={generatedOutputs}
              isGenerating={isGenerating}
              onImageAction={handleImageAction}
              onRegenerateVariation={handleRegenerateVariation}
              generationProgress={generationProgress}
              mode={activeMode} // This will be 'image' or 'reel'
              originalPrompt={currentPromptForOutput}
              userHistory={userHistory.filter((item) => item.type === activeMode)} // Pass filtered history
              onOpenHistoryItem={handleOpenHistoryItemDetail} // For viewing details of a history item
              onDeleteHistoryItem={handleDeleteHistoryItem}
              onRegenerateFromHistory={handleRegenerateFromHistory}
              onInitiateNewGeneration={handleInitiateNewGenerationWizard} // New prop
              onNavigateBack={navigateToWelcome} // Prop to go back to welcome
            />
          )}
        </div>
      </div>

      {currentGenerationType && isWizardOpen && (
        <GenerationWizardModal
          isOpen={isWizardOpen}
          onClose={() => setIsWizardOpen(false)}
          generationType={currentGenerationType}
          onSubmit={handleWizardSubmit}
          initialPrompt={wizardInitialPrompt}
          initialImageSettings={currentGenerationType === "image" ? wizardInitialImageSettings : undefined}
          initialReelSettings={currentGenerationType === "reel" ? wizardInitialReelSettings : undefined}
        />
      )}

      {selectedInspiration && (
        <CreationDetailModal
          creation={selectedInspiration}
          onClose={() => setSelectedInspiration(null)}
          // Add next/prev for inspirations if needed
        />
      )}
      <Toaster />
    </div>
  )
}

// Add getDefaultImageSettings here or ensure it's imported if moved
export const getDefaultImageSettings = (): Settings => ({
  aspectRatio: "1:1",
  creativity: [7],
  outputs: 1,
  model: "KOLORS 1.5",
  language: "en",
})

export const getDefaultReelSettings = (): ReelSettings => ({
  quality: "standard",
  creativity: [5],
  outputs: 1,
  model: "normal",
})
