"use client"

import { useState, useCallback, useMemo } from "react" // Import useCallback and useMemo
import { OutputPanel } from "./components/panels/output-panel"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import type { CreativeMode, HistoryItem, CreationDetail } from "./components/types"
import { GenerationWizardModal } from "./components/modals/generation-wizard-modal"
import { WelcomeScreen } from "./components/core/welcome-screen"
import { CreationDetailModal } from "./components/modals/creation-detail-modal"

// Declare the getDefaultImageSettings and getDefaultReelSettings functions
const getDefaultImageSettings = (): any => {
  // Return default settings for image
  return { model: "DreamShaper XL", aspectRatio: "3:4", creativity: 8, quality: "Ultra" }
}

const getDefaultReelSettings = (): any => {
  // Return default settings for reel
  return { reelModel: "expert", quality: "Pro", creativity: 9 }
}

export interface Settings {
  aspectRatio: string
  creativity: number[]
  outputs: number
  model: string
  language: string
}
export interface ReelSettings {
  quality: string
  creativity: number[]
  outputs: number
  model: "normal" | "expert"
}

// This data would typically be fetched from a backend.
// For now, it's static.
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
  const [activeMode, setActiveMode] = useState<CreativeMode>("image")
  const [currentGenerationType, setCurrentGenerationType] = useState<"image" | "reel" | null>(null)

  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generatedOutputs, setGeneratedOutputs] = useState<string[]>([])
  const [currentPromptForOutput, setCurrentPromptForOutput] = useState("")

  const { toast } = useToast()

  // --- COMMENT: Backend Integration Point ---
  // The initial state for userHistory should be fetched from your backend API.
  // Example:
  // useEffect(() => {
  //   fetch('/api/history')
  //     .then(res => res.json())
  //     .then(data => setUserHistory(data.history))
  // }, [])
  const [userHistory, setUserHistory] = useState<HistoryItem[]>([
    {
      id: "hist_1",
      type: "image",
      prompt:
        "## Ad Concept Brief\n\n**Objective:** Create a compelling image ad.\n\n**Core Message/Theme:** A serene zen garden with a koi pond, cherry blossoms, and a stone lantern. Photorealistic, soft morning light.\n\n**Visual Style & Elements:**\n- Desired Aspect Ratio: 16:9\n- Language for any text overlay (if applicable): English\n- Overall aesthetic should be peaceful and natural.\n\n**Key Considerations:**\n- High-resolution output.\n\n**Generated Prompt Guidance (for AI):**\nBased on the above, construct a detailed prompt focusing on: A serene zen garden with a koi pond, cherry blossoms, and a stone lantern. Photorealistic, soft morning light. Incorporate elements like aspect ratio (16:9), desired model (KOLORS 1.5), and 2 variations. The creative level should be around 7/10.",
      results: [
        "/placeholder.svg?height=400&width=600&text=Zen+Garden+1",
        "/placeholder.svg?height=400&width=600&text=Zen+Garden+2",
      ],
      settings: { aspectRatio: "16:9", creativity: [7], outputs: 2, model: "KOLORS 1.5", language: "en" } as Settings,
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      status: "completed",
      metadata: { model: "KOLORS 1.5", aspectRatio: "16:9", creativity: 7, language: "en" },
    },
    // ... other history items
  ])

  const [isWizardOpen, setIsWizardOpen] = useState(false)
  const [wizardInitialPrompt, setWizardInitialPrompt] = useState("") // This is the user's short initial prompt
  const [wizardInitialImageSettings, setWizardInitialImageSettings] = useState<Settings>(() =>
    getDefaultImageSettings(),
  )
  const [wizardInitialReelSettings, setWizardInitialReelSettings] = useState<ReelSettings>(() =>
    getDefaultReelSettings(),
  )

  const [selectedInspiration, setSelectedInspiration] = useState<CreationDetail | null>(null)

  const handleStartCreation = useCallback((type: "image" | "reel") => {
    setCurrentGenerationType(type)
    setActiveMode(type)
    setGeneratedOutputs([])
    setIsGenerating(false)
    setCurrentView("output")
    setWizardInitialPrompt("")
    if (type === "image") {
      setWizardInitialImageSettings(getDefaultImageSettings())
    } else if (type === "reel") {
      setWizardInitialReelSettings(getDefaultReelSettings())
    }
  }, [])

  const handleInitiateNewGenerationWizard = useCallback(() => {
    if (!currentGenerationType) return
    setWizardInitialPrompt("")
    if (currentGenerationType === "image") {
      setWizardInitialImageSettings(getDefaultImageSettings())
    } else if (currentGenerationType === "reel") {
      setWizardInitialReelSettings(getDefaultReelSettings())
    }
    setIsWizardOpen(true)
  }, [currentGenerationType])

  const handleWizardSubmit = useCallback(
    (data: any) => {
      // data.prompt is now the detailed AdConcept
      // data.originalUserPrompt is the short prompt from the "Details & Settings" step
      if (!currentGenerationType) return

      setIsWizardOpen(false)
      setIsGenerating(true)
      setGeneratedOutputs([])
      setGenerationProgress(0)
      setCurrentPromptForOutput(data.prompt) // Store the AdConcept for display in OutputPanel
      setActiveMode(currentGenerationType)
      setCurrentView("output")

      // --- COMMENT: Backend Integration Point ---
      // This is where you would call your backend API to start the generation process.
      // The `data` object contains the prompt, settings, and any uploaded files.
      // You would typically use FormData to send files.
      //
      // Example:
      // const formData = new FormData();
      // formData.append('prompt', data.prompt);
      // formData.append('settings', JSON.stringify(data.settings));
      // if (data.productImage) formData.append('productImage', data.productImage);
      //
      // fetch(`/api/generate/${currentGenerationType}`, {
      //   method: 'POST',
      //   body: formData,
      // })
      // .then(res => res.json())
      // .then(generationResult => {
      //   setGeneratedOutputs(generationResult.outputs);
      //   // Add to history, etc.
      // })
      // .catch(err => console.error(err))
      // .finally(() => setIsGenerating(false));

      // Simulating API call with progress updates
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
            `/placeholder.svg?height=400&width=600&text=${currentGenerationType}+Res+${i + 1}&query=${encodeURIComponent(data.originalUserPrompt)}`, // Use original prompt for placeholder query for simplicity
        )
        setGeneratedOutputs(mockResults)

        const newHistoryItem: HistoryItem = {
          id: Date.now().toString(),
          type: currentGenerationType,
          prompt: data.prompt, // Save the detailed AdConcept as the main prompt
          results: mockResults,
          settings: data.settings,
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
                  language: data.settings.language,
                }
              : {
                  reelModel: data.settings.model,
                  quality: data.settings.quality,
                  creativity: Array.isArray(data.settings.creativity)
                    ? data.settings.creativity[0]
                    : data.settings.creativity,
                  duration: "5s", // Placeholder
                },
        }
        // --- COMMENT: Backend Integration Point ---
        // After a successful generation, you would also save the new history item to your database.
        // fetch('/api/history', { method: 'POST', body: JSON.stringify(newHistoryItem) });
        setUserHistory((prev) => [newHistoryItem, ...prev])
        setIsGenerating(false)
        toast({ title: "Success!", description: `${currentGenerationType} generation completed!` })
      }, 3000)
    },
    [currentGenerationType, toast],
  )

  const handleOpenHistoryItemDetail = useCallback((item: HistoryItem) => {
    const creationDetail: CreationDetail = {
      id: Number.parseInt(item.id.replace("hist_", ""), 10) || Date.now(),
      image: item.results[0],
      user: "You",
      avatar: "/placeholder.svg?height=32&width=32&text=U",
      prompt: item.prompt, // This will be the detailed AdConcept
      likes: 0,
      type: item.type,
      duration: item.metadata?.duration,
      settings: item.settings,
    }
    setSelectedInspiration(creationDetail)
  }, [])

  const handleDeleteHistoryItem = useCallback(
    (id: string) => {
      // --- COMMENT: Backend Integration Point ---
      // Call your backend to delete the history item from the database.
      // fetch(`/api/history/${id}`, { method: 'DELETE' });
      setUserHistory((prev) => prev.filter((item) => item.id !== id))
      toast({ title: "Item deleted", description: "Item removed from your history." })
    },
    [toast],
  )

  const handleRegenerateFromHistory = useCallback((item: HistoryItem) => {
    // When regenerating, we should use the *original* short prompt if available,
    // or let the user edit the detailed AdConcept.
    // For simplicity now, we'll pre-fill the wizard's initial prompt field with a shortened version
    // or a note, and the AdConcept will be regenerated.
    // A more advanced approach would be to store originalUserPrompt in HistoryItem.
    if (item.type === "image" || item.type === "reel") {
      setCurrentGenerationType(item.type)
      // Try to extract a shorter prompt if the history item's prompt is a full AdConcept.
      // This is a simple heuristic.
      const adConceptLines = item.prompt.split("\n")
      const shortPromptGuess =
        adConceptLines
          .find((line) => line.startsWith("**Core Message/Theme:**"))
          ?.replace("**Core Message/Theme:**", "")
          .trim() ||
        adConceptLines
          .find((line) => line.startsWith("**Generated Prompt Guidance (for AI):**"))
          ?.split("focusing on:")[1]
          ?.split(".")[0]
          ?.trim() ||
        "Revisiting: " + item.prompt.substring(0, 50) + "..."

      setWizardInitialPrompt(shortPromptGuess)

      if (item.type === "image") {
        const imageSettings = item.settings as Settings
        setWizardInitialImageSettings({
          ...getDefaultImageSettings(),
          ...imageSettings,
          language: imageSettings.language || "en",
        })
      } else if (item.type === "reel") {
        setWizardInitialReelSettings(item.settings as ReelSettings)
      }
      setIsWizardOpen(true)
    }
  }, [])

  const handleImageAction = useCallback(
    (action: string, imageIndex: number) => {
      console.log(`Action: ${action} on ${currentGenerationType} ${imageIndex}`)
      if (action === "download" && generatedOutputs[imageIndex]) {
        const link = document.createElement("a")
        link.href = generatedOutputs[imageIndex]
        link.download = `${currentGenerationType}_${imageIndex + 1}.svg`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        toast({ title: "Download Started" })
      }
      // --- COMMENT: Backend Integration Point ---
      // Other actions like 'favorite' would trigger a backend call.
      // if (action === 'favorite') {
      //   fetch(`/api/outputs/${generatedOutputs[imageIndex]}/favorite`, { method: 'POST' });
      // }
    },
    [generatedOutputs, currentGenerationType, toast],
  )

  const handleRegenerateVariation = useCallback(
    (imageIndex: number) => {
      console.log(`Regenerate variation for ${currentGenerationType} ${imageIndex}`)
      // --- COMMENT: Backend Integration Point ---
      // This would be an API call to generate a variation of a specific output.
      // fetch(`/api/generate/variation`, {
      //   method: 'POST',
      //   body: JSON.stringify({ sourceImage: generatedOutputs[imageIndex], prompt: currentPromptForOutput })
      // });
      toast({ title: "Variation Requested" })
    },
    [currentGenerationType, toast],
  )

  const navigateToWelcome = useCallback(() => {
    setCurrentView("welcome")
    setGeneratedOutputs([])
    setIsGenerating(false)
    setCurrentGenerationType(null)
  }, [])

  const handleInspirationClick = useCallback((creation: CreationDetail) => {
    setSelectedInspiration(creation)
  }, [])

  // Memoize the filtered history for the OutputPanel
  const activeUserHistory = useMemo(
    () => userHistory.filter((item) => item.type === activeMode),
    [userHistory, activeMode],
  )

  return (
    <div className="h-screen bg-white dark:bg-slate-950 flex flex-col relative overflow-hidden border-t border-border">
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          {currentView === "welcome" ? (
            <WelcomeScreen
              onStartCreation={handleStartCreation}
              inspirationItems={sampleInspirationItems}
              onInspirationClick={handleInspirationClick}
            />
          ) : (
            <OutputPanel
              generatedImages={generatedOutputs}
              isGenerating={isGenerating}
              onImageAction={handleImageAction}
              onRegenerateVariation={handleRegenerateVariation}
              generationProgress={generationProgress}
              mode={activeMode}
              originalPrompt={currentPromptForOutput} // This is the AdConcept
              userHistory={activeUserHistory}
              onOpenHistoryItem={handleOpenHistoryItemDetail}
              onDeleteHistoryItem={handleDeleteHistoryItem}
              onRegenerateFromHistory={handleRegenerateFromHistory}
              onInitiateNewGeneration={handleInitiateNewGenerationWizard}
              onNavigateBack={navigateToWelcome}
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
          initialPrompt={wizardInitialPrompt} // User's short initial prompt
          initialImageSettings={currentGenerationType === "image" ? wizardInitialImageSettings : undefined}
          initialReelSettings={currentGenerationType === "reel" ? wizardInitialReelSettings : undefined}
        />
      )}

      {selectedInspiration && (
        <CreationDetailModal creation={selectedInspiration} onClose={() => setSelectedInspiration(null)} />
      )}
      <Toaster />
    </div>
  )
}
