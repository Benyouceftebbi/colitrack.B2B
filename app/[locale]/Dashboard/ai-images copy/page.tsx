"use client"

import { useState, useCallback, useEffect } from "react" // Import useCallback and useMemo
import { OutputPanel } from "./components/panels/output-panel"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import type { CreativeMode, HistoryItem, CreationDetail } from "./components/types"
import { GenerationWizardModal } from "./components/modals/generation-wizard-modal"
import { WelcomeScreen } from "./components/core/welcome-screen"
import { CreationDetailModal } from "./components/modals/creation-detail-modal"
import { useShop } from "@/app/context/ShopContext"
import { doc, onSnapshot } from "firebase/firestore"
import { db, functions } from "@/firebase/firebase"
import { httpsCallable } from "firebase/functions"
// Add this import at the top of the file if it's missing
import { ImageViewerModal } from "./components/modals/image-viewer-modal"
// Declare the getDefaultImageSettings and getDefaultReelSettings functions
const getDefaultImageSettings = (): any => {
  // Return default settings for image
  return { model: "DreamShaper XL", aspectRatio: "3:4", creativity: 8, quality: "Ultra", language: "en", outputs: 1 }
}

const getDefaultReelSettings = (): any => {
  // Return default settings for reel
  return { reelModel: "expert", quality: "Pro", creativity: 9, outputs: 1, model: "expert" }
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
  model: "normal" | "expert" | ""
  aspectRatio: string // Added aspectRatio to ReelSettings
}

// This data would typically be fetched from a backend.
// For now, it's static.
const sampleInspirationItems: CreationDetail[] = [
  {
    id: "101", // Changed to string for consistency
    image: "/placeholder.svg?height=400&width=300",
    beforeImage: "/placeholder.svg?height=400&width=300",
    user: "ArtisanAI",
    avatar: "/placeholder.svg?height=32&width=32&text=AI",
    prompt: "A majestic fantasy landscape with floating islands and glowing waterfalls, digital painting style.",
    likes: 1250,
    type: "image",
    settings: { model: "DreamShaper XL", aspectRatio: "3:4", creativity: 8, quality: "Ultra" },
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000 * 5), // Sample past date
  },
  {
    id: "102", // Changed to string for consistency
    image: "/placeholder.svg?height=300&width=400",
    user: "TechDreamer",
    avatar: "/placeholder.svg?height=32&width=32&text=TD",
    prompt: "Close-up portrait of a futuristic robot with intricate details and glowing blue eyes, cinematic lighting.",
    likes: 980,
    type: "image",
    settings: { model: "Stable Diffusion 2.1", aspectRatio: "4:3", creativity: 7, quality: "HD" },
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000 * 3), // Sample past date
  },
  {
    id: "103", // Changed to string for consistency
    image: "/placeholder.svg?height=400&width=300", // Placeholder for reel thumbnail
    beforeImage: "/placeholder.svg?height=400&width=300",
    user: "MotionMagic",
    avatar: "/placeholder.svg?height=32&width=32&text=MM",
    prompt: "A character running through a forest, smooth animation, dynamic camera angle.",
    likes: 750,
    type: "reel",
    settings: { reelModel: "expert", quality: "Pro", creativity: 9 },
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000 * 2), // Sample past date
  },
  {
    id: "104", // Changed to string for consistency
    image: "/placeholder.svg?height=300&width=400",
    user: "ColorBurst",
    avatar: "/placeholder.svg?height=32&width=32&text=CB",
    prompt: "An abstract explosion of vibrant colors, high energy, dynamic particles.",
    likes: 600,
    type: "image",
    settings: { model: "Kandinsky 2.2", aspectRatio: "16:9", creativity: 9, quality: "4K" },
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000 * 1), // Sample past date
  },
]

export default function AICreativePage() {
  const { creativeAiItems, creativeAiLoading, creativeAiError } = useShop()
  const [currentView, setCurrentView] = useState<"welcome" | "output">("welcome")
  const [activeMode, setActiveMode] = useState<CreativeMode>("image")
  const [currentGenerationType, setCurrentGenerationType] = useState<"image" | "reel" | null>(null)
  const [pendingImageId, setPendingImageId] = useState<string | null>(null)
  const { shopData } = useShop()
  console.log("coscos", shopData.imageai)

  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generatedOutputs, setGeneratedOutputs] = useState<string[]>([])
  const [currentPromptForOutput, setCurrentPromptForOutput] = useState("")

  const { toast } = useToast()

  const [userHistory, setUserHistory] = useState<HistoryItem[]>([]) // Initialize empty, populate from shopData

  useEffect(() => {
    if (shopData.imageai) {
      const transformedHistory = shopData.imageai.map((item: any) => {
        const resultsArray = Array.isArray(item.imagesUrl)
          ? item.imagesUrl
          : Array.isArray(item.results)
            ? item.results
            : []

        return {
          id: item.id || String(Date.now() + Math.random()),
          type: item.type || "image",
          prompt: item.prompt || "",
          results: resultsArray,
          settings: typeof item.settings === "object" && item.settings !== null ? item.settings : {},
          createdAt: item.createdAt?.toDate ? item.createdAt.toDate() : new Date(item.createdAt || Date.now()),
          status: item.status || "completed",
          productUrl: item.productUrl, // Ensure productUrl is mapped
        }
      })
      setUserHistory(transformedHistory as HistoryItem[])
    }
  }, [shopData.imageai])

  const [isWizardOpen, setIsWizardOpen] = useState(false)
  const [wizardInitialPrompt, setWizardInitialPrompt] = useState("")
  const [wizardInitialImageSettings, setWizardInitialImageSettings] = useState<Partial<Settings>>(() =>
    getDefaultImageSettings(),
  )
  const [wizardInitialReelSettings, setWizardInitialReelSettings] = useState<Partial<ReelSettings>>(() =>
    getDefaultReelSettings(),
  )

  const [selectedInspiration, setSelectedInspiration] = useState<CreationDetail | null>(null)

  const [historyViewerData, setHistoryViewerData] = useState<{
    images: string[]
    prompt: string
    createdAt: Date | undefined
    type: "image" | "reel"
    productUrl?: string // Add productUrl here
  } | null>(null)
  const [historyViewerIndex, setHistoryViewerIndex] = useState<number>(0)

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
    if (!currentGenerationType) {
      // If currentGenerationType is null (e.g. user is on history view and clicks "Generate New")
      // We should default to the activeMode to set the generation type.
      const typeToUse = activeMode === "image" || activeMode === "reel" ? activeMode : "image"
      setCurrentGenerationType(typeToUse)
      setWizardInitialPrompt("")
      if (typeToUse === "image") {
        setWizardInitialImageSettings(getDefaultImageSettings())
      } else {
        setWizardInitialReelSettings(getDefaultReelSettings())
      }
    } else {
      setWizardInitialPrompt("")
      if (currentGenerationType === "image") {
        setWizardInitialImageSettings(getDefaultImageSettings())
      } else if (currentGenerationType === "reel") {
        setWizardInitialReelSettings(getDefaultReelSettings())
      }
    }
    setIsWizardOpen(true)
  }, [currentGenerationType, activeMode])

  function fileToDataUrlObject(file: File) {
    // Added type for file
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () =>
        resolve({
          name: file.name,
          type: file.type,
          base64: reader.result,
        })
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }
  const handleWizardSubmit = useCallback(
    async (data: any) => {
      const typeToUse =
        currentGenerationType || (activeMode === "image" || activeMode === "reel" ? activeMode : "image")
      if (!typeToUse) return

      setIsWizardOpen(false)
      setIsGenerating(true)
      setGeneratedOutputs([])
      setGenerationProgress(0)
      setCurrentPromptForOutput(data.prompt) // This should be the final ad concept brief
      setActiveMode(typeToUse)
      setCurrentView("output")

      // Simulate progress
      let currentProgress = 0
      const progressInterval = setInterval(() => {
        currentProgress += Math.random() * 5 + 5 // Faster progress
        if (currentProgress >= 95 && !pendingImageId) {
          // Hold at 95% if pendingImageId not set yet
          setGenerationProgress(95)
        } else if (currentProgress < 100) {
          setGenerationProgress(currentProgress)
        } else {
          // will be set to 100 by useEffect when image is ready
        }
      }, 300) // Faster interval

      try {
        const generateImageAd = httpsCallable(functions, "generateImageAd")

        const productData = data.productImage ? await fileToDataUrlObject(data.productImage) : null
        const adStyleData = data.inspirationImage ? await fileToDataUrlObject(data.inspirationImage) : null

        // Ensure settings are passed correctly
        const settingsForGeneration =
          typeToUse === "image"
            ? data.settings
            : {
                ...data.settings, // Reel settings from wizard
                // Add any specific reel parameters if generateImageAd expects them differently
              }

        const result = await generateImageAd({
          productFile: productData,
          adInsiprationFile: adStyleData,
          prompt: data.prompt, // This is the adConcept from the wizard
          shopId: shopData.id,
          n: settingsForGeneration.outputs || 1,
          size: settingsForGeneration.aspectRatio || (typeToUse === "image" ? "1024x1024" : "1024x576"), // Default size if not in settings
          type:typeToUse === "image" ? "image" : "video",
          language: settingsForGeneration.language || "en", // Default language,
          // Pass other settings if your function expects them
          // e.g. model: settingsForGeneration.model
        })
        console.log("Function result:", result)
        if (result.data && result.data.imageId) {
          setPendingImageId(result.data.imageId)
        } else {
          throw new Error("Image ID not returned from function")
        }
      } catch (error) {
        console.error("Error during generation submission:", error)
        toast({
          title: "Generation Failed",
          description: (error as Error).message || "Could not submit generation request.",
          variant: "destructive",
        })
        setIsGenerating(false)
        setGenerationProgress(0)
        clearInterval(progressInterval)
      } finally {
        // Don't clear interval here if we expect pendingImageId to trigger completion
      }
      // Keep interval running, it will be cleared by useEffect or if generation fails early
      setTimeout(() => clearInterval(progressInterval), 30000) // Safety clear after 30s
    },
    [currentGenerationType, activeMode, toast, shopData.id],
  )

  useEffect(() => {
    const typeToUse = currentGenerationType || (activeMode === "image" || activeMode === "reel" ? activeMode : "image")
    if (!pendingImageId || !shopData.id || !typeToUse) return

    const imageDocRef = doc(db, "Shops", shopData.id, "ImageAi", pendingImageId)
    const unsubscribe = onSnapshot(
      imageDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data()
          if (data.imagesUrl?.length) {
            console.log("🎉 Ad Ready:", data)
            setGeneratedOutputs(data.imagesUrl)
            setGenerationProgress(100)
            setIsGenerating(false)

            const newHistoryItem: HistoryItem = {
              id: pendingImageId,
              type: typeToUse,
              prompt: data.prompt || currentPromptForOutput, // Use prompt from data or fallback
              results: Array.isArray(data.imagesUrl) ? data.imagesUrl : [],
              settings: typeof data.settings === "object" && data.settings !== null ? data.settings : {},
              createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
              status: "completed",
              productUrl: data.productUrl, // Ensure productUrl is saved from generation
            }

            setUserHistory((prev) => [newHistoryItem, ...prev.filter((item) => item.id !== newHistoryItem.id)])
            toast({ title: "Success!", description: `${typeToUse} generation completed!` })
            setPendingImageId(null) // Reset pendingImageId
            unsubscribe()
          } else if (data.status === "failed" || data.error) {
            console.error("Generation failed in Firestore:", data.error || "Unknown error")
            toast({
              title: "Generation Failed",
              description: data.error || `The ${typeToUse} could not be generated.`,
              variant: "destructive",
            })
            setIsGenerating(false)
            setGenerationProgress(0)
            setPendingImageId(null)
            unsubscribe()
          }
        }
      },
      (error) => {
        console.error("Error in Firestore snapshot listener:", error)
        toast({
          title: "Realtime Update Error",
          description: "Could not listen for generation updates.",
          variant: "destructive",
        })
        setIsGenerating(false)
        setGenerationProgress(0)
        setPendingImageId(null)
      },
    )

    return () => unsubscribe()
  }, [pendingImageId, shopData.id, currentGenerationType, activeMode, toast, currentPromptForOutput])

  const handleOpenHistoryItemDetail = useCallback((item: HistoryItem) => {
    setHistoryViewerData({
      images: item.results,
      prompt: item.prompt,
      createdAt: item.createdAt,
      type: item.type,
      productUrl: item.productUrl, // Pass productUrl
    })
    setHistoryViewerIndex(0)
  }, [])

  const handleNextHistoryImage = useCallback(() => {
    if (historyViewerData) {
      setHistoryViewerIndex((prev) => Math.min(prev + 1, historyViewerData.images.length - 1))
    }
  }, [historyViewerData])

  const handlePreviousHistoryImage = useCallback(() => {
    if (historyViewerData) {
      setHistoryViewerIndex((prev) => Math.max(prev - 1, 0))
    }
  }, [historyViewerData])

  const handleCloseHistoryViewer = useCallback(() => {
    setHistoryViewerData(null)
    setHistoryViewerIndex(0)
  }, [])

  const handleDeleteHistoryItem = useCallback(
    (id: string) => {
      setUserHistory((prev) => prev.filter((item) => item.id !== id))
      toast({ title: "Item deleted", description: "Item removed from your history." })
    },
    [toast],
  )

  const handleRegenerateFromHistory = useCallback((item: HistoryItem) => {
    if (item.type === "image" || item.type === "reel") {
      setCurrentGenerationType(item.type) // Set currentGenerationType
      setActiveMode(item.type) // Also set activeMode

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
        item.prompt // Fallback to full prompt if specific lines not found

      setWizardInitialPrompt(shortPromptGuess)

      if (item.type === "image") {
        const imageSettings = item.settings as Settings
        setWizardInitialImageSettings({
          ...getDefaultImageSettings(),
          ...imageSettings,
        })
      } else if (item.type === "reel") {
        const reelSettings = item.settings as ReelSettings
        setWizardInitialReelSettings({
          ...getDefaultReelSettings(),
          ...reelSettings,
        })
      }
      setIsWizardOpen(true)
    }
  }, [])

  const handleImageAction = useCallback(
    (action: string, imageIndex: number) => {
      const typeForAction = currentGenerationType || activeMode
      console.log(`Action: ${action} on ${typeForAction} ${imageIndex}`)
      if (action === "download" && generatedOutputs[imageIndex]) {
        const link = document.createElement("a")
        link.href = generatedOutputs[imageIndex]
        // Determine file extension (very basic, assuming svg or png for images, mp4 for reels)
        let extension = typeForAction === "reel" ? ".mp4" : ".png"
        if (generatedOutputs[imageIndex].includes(".svg")) extension = ".svg"

        link.download = `${typeForAction}_${Date.now()}_${imageIndex + 1}${extension}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        toast({ title: "Download Started" })
      }
    },
    [generatedOutputs, currentGenerationType, activeMode, toast],
  )

  const handleRegenerateVariation = useCallback(
    (imageIndex: number) => {
      const typeForVariation = currentGenerationType || activeMode
      console.log(`Regenerate variation for ${typeForVariation} ${imageIndex}`)
      toast({ title: "Variation Requested (Not Implemented)" })
    },
    [currentGenerationType, activeMode, toast],
  )

  const navigateToWelcome = useCallback(() => {
    setCurrentView("welcome")
    setGeneratedOutputs([])
    setIsGenerating(false)
    // setCurrentGenerationType(null); // Keep this to allow OutputPanel to show history based on activeMode
  }, [])

  const handleInspirationClick = useCallback((creation: CreationDetail) => {
    setSelectedInspiration(creation)
  }, [])

  return (
    <div className="h-screen bg-white dark:bg-slate-950 flex flex-col relative overflow-hidden border-t border-border">
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          {currentView === "welcome" ? (
            <WelcomeScreen
              onStartCreation={handleStartCreation}
              inspirationItems={creativeAiItems || sampleInspirationItems} // Fallback to sample
              onInspirationClick={handleInspirationClick}
              isLoadingInspirations={creativeAiLoading}
            />
          ) : (
            <OutputPanel
              generatedImages={generatedOutputs}
              isGenerating={isGenerating}
              onImageAction={handleImageAction}
              onRegenerateVariation={handleRegenerateVariation}
              generationProgress={generationProgress}
              mode={activeMode} // This determines if it's image or reel context
              originalPrompt={currentPromptForOutput}
              userHistory={userHistory}
              onOpenHistoryItem={handleOpenHistoryItemDetail}
              onDeleteHistoryItem={handleDeleteHistoryItem}
              onRegenerateFromHistory={handleRegenerateFromHistory}
              onInitiateNewGeneration={handleInitiateNewGenerationWizard}
              onNavigateBack={navigateToWelcome}
            />
          )}
        </div>
      </div>

      {isWizardOpen && ( // Conditionally render wizard based on isWizardOpen
        <GenerationWizardModal
          isOpen={isWizardOpen}
          onClose={() => setIsWizardOpen(false)}
          generationType={
            currentGenerationType || (activeMode === "image" || activeMode === "reel" ? activeMode : "image")
          }
          onSubmit={handleWizardSubmit}
          initialPrompt={wizardInitialPrompt}
          initialImageSettings={
            (currentGenerationType || activeMode) === "image" ? wizardInitialImageSettings : undefined
          }
          initialReelSettings={(currentGenerationType || activeMode) === "reel" ? wizardInitialReelSettings : undefined}
        />
      )}

      {selectedInspiration && (
        <CreationDetailModal creation={selectedInspiration} onClose={() => setSelectedInspiration(null)} />
      )}

      {historyViewerData && historyViewerData.images && historyViewerData.images.length > 0 && (
        <ImageViewerModal
          image={historyViewerData.images[historyViewerIndex]}
          imageIndex={historyViewerIndex}
          images={historyViewerData.images}
          onClose={handleCloseHistoryViewer}
          onNext={handleNextHistoryImage}
          onPrevious={handlePreviousHistoryImage}
          // onEnhance is removed as per request, but prop definition might still expect it
          // If ImageViewerModal is strictly typed, pass a dummy function or update its props
          onEnhance={() => {
            console.log("Enhance clicked for history item - not implemented / removed")
          }}
          originalPrompt={historyViewerData.prompt}
          createdAt={historyViewerData.createdAt}
          isReel={historyViewerData.type === "reel"}
          productUrl={historyViewerData.productUrl} // Pass productUrl
        />
      )}
      <Toaster />
    </div>
  )
}
