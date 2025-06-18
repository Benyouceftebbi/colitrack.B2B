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

// Declare the getDefaultImageSettings and getDefaultReelSettings functions

const getDefaultImageSettings = (): any => {
    return { model: "DreamShaper XL", aspectRatio: "3:4", creativity: 8, quality: "Ultra", language: "en", outputs: 1 }
  }
  
  const getDefaultReelSettings = (): any => {
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
    aspectRatio: string
  }
  
  const sampleInspirationItems: CreationDetail[] = [
    {
      id: "101",
      image: "/placeholder.svg?height=400&width=300",
      beforeImage: "/placeholder.svg?height=400&width=300",
      user: "ArtisanAI",
      avatar: "/placeholder.svg?height=32&width=32&text=AI",
      prompt: "A majestic fantasy landscape with floating islands and glowing waterfalls, digital painting style.",
      likes: 1250,
      type: "image",
      settings: { model: "DreamShaper XL", aspectRatio: "3:4", creativity: 8, quality: "Ultra" },
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000 * 5),
    },
    {
      id: "102",
      image: "/placeholder.svg?height=300&width=400",
      user: "TechDreamer",
      avatar: "/placeholder.svg?height=32&width=32&text=TD",
      prompt: "Close-up portrait of a futuristic robot with intricate details and glowing blue eyes, cinematic lighting.",
      likes: 980,
      type: "image",
      settings: { model: "Stable Diffusion 2.1", aspectRatio: "4:3", creativity: 7, quality: "HD" },
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000 * 3),
    },
    {
      id: "103",
      image: "/placeholder.svg?height=400&width=300",
      beforeImage: "/placeholder.svg?height=400&width=300",
      user: "MotionMagic",
      avatar: "/placeholder.svg?height=32&width=32&text=MM",
      prompt: "A character running through a forest, smooth animation, dynamic camera angle.",
      likes: 750,
      type: "reel",
      settings: { reelModel: "expert", quality: "Pro", creativity: 9 },
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000 * 2),
    },
    {
      id: "104",
      image: "/placeholder.svg?height=300&width=400",
      user: "ColorBurst",
      avatar: "/placeholder.svg?height=32&width=32&text=CB",
      prompt: "An abstract explosion of vibrant colors, high energy, dynamic particles.",
      likes: 600,
      type: "image",
      settings: { model: "Kandinsky 2.2", aspectRatio: "16:9", creativity: 9, quality: "4K" },
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000 * 1),
    },
  ]
  
  export default function AICreativePage() {
    const { creativeAiItems, creativeAiLoading } = useShop()
    const [currentView, setCurrentView] = useState<"welcome" | "output">("welcome")
    const [activeMode, setActiveMode] = useState<CreativeMode>("image")
    const [currentGenerationType, setCurrentGenerationType] = useState<"image" | "reel" | null>(null)
    const [pendingImageId, setPendingImageId] = useState<string | null>(null)
    const { shopData } = useShop()
  
    const [isGenerating, setIsGenerating] = useState(false)
    const [generationProgress, setGenerationProgress] = useState(0)
    const [generatedOutputs, setGeneratedOutputs] = useState<string[]>([])
    const [currentPromptForOutput, setCurrentPromptForOutput] = useState("")
    const [currentBatchTimestamp, setCurrentBatchTimestamp] = useState<Date | undefined>(undefined)
    const [currentProductUrlForOutput, setCurrentProductUrlForOutput] = useState<string | undefined>(undefined)
  
    const { toast } = useToast()
    const [userHistory, setUserHistory] = useState<HistoryItem[]>([])
  
    useEffect(() => {
      if (shopData.imageai) {
        const transformedHistory = shopData.imageai.map((item: any) => ({
          id: item.id || String(Date.now() + Math.random()),
          type: item.type || "image",
          prompt: item.prompt || "",
          results: Array.isArray(item.imagesUrl) ? item.imagesUrl : Array.isArray(item.results) ? item.results : [],
          settings: typeof item.settings === "object" && item.settings !== null ? item.settings : {},
          createdAt: item.createdAt?.toDate ? item.createdAt.toDate() : new Date(item.createdAt || Date.now()),
          status: item.status || "completed",
          productUrl: item.productUrl,
        }))
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
    const [generatedItemViewerData, setGeneratedItemViewerData] = useState<{ image: string; index: number } | null>(null)
    const [historyViewerData, setHistoryViewerData] = useState<{
      images: string[]
      prompt: string
      createdAt: Date | undefined
      type: "image" | "reel"
      productUrl?: string
    } | null>(null)
    const [historyViewerIndex, setHistoryViewerIndex] = useState<number>(0)
  
    const handleStartCreation = useCallback((type: "image" | "reel") => {
      setCurrentGenerationType(type)
      setActiveMode(type)
      setGeneratedOutputs([])
      setIsGenerating(false)
      setCurrentView("output")
      setWizardInitialPrompt("")
      if (type === "image") setWizardInitialImageSettings(getDefaultImageSettings())
      else if (type === "reel") setWizardInitialReelSettings(getDefaultReelSettings())
    }, [])
  
    const handleInitiateNewGenerationWizard = useCallback(() => {
      const typeToUse = currentGenerationType || activeMode || "image"
      setCurrentGenerationType(typeToUse as "image" | "reel")
      setWizardInitialPrompt("")
      if (typeToUse === "image") setWizardInitialImageSettings(getDefaultImageSettings())
      else setWizardInitialReelSettings(getDefaultReelSettings())
      setIsWizardOpen(true)
    }, [currentGenerationType, activeMode])
  
    function fileToDataUrlObject(file: File) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve({ name: file.name, type: file.type, base64: reader.result })
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    }
  
    const downloadFile = useCallback(
        async (imageUrl: string, fileName: string = "image.png") => {
          try {
            const downloadImage = httpsCallable(functions, "downloadImage");
      
            const result = await downloadImage({ url: imageUrl });
            const { base64, mimeType } = result.data;
      
            // Construct a Blob from the base64 string
            const response = await fetch(`data:${mimeType};base64,${base64}`);
            const blob = await response.blob();
      
            const blobUrl = URL.createObjectURL(blob);
      
            // Create a temporary download link
            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
      
            // Revoke the blob URL to free memory
            URL.revokeObjectURL(blobUrl);
      
            toast({
              title: "Téléchargement lancé",
              description: `${fileName} est en cours de téléchargement.`,
            });
          } catch (error) {
            console.error("Error downloading image via Firebase function:", error);
            toast({
              title: "Erreur",
              description: "Impossible de télécharger l'image.",
              variant: "destructive",
            });
          }
        },
        [toast]
      );
      
    const handleWizardSubmit = useCallback(
      async (data: any) => {
        const typeToUse =
          currentGenerationType || (activeMode === "image" || activeMode === "reel" ? activeMode : "image")
        if (!typeToUse) return
  
        setIsWizardOpen(false)
        setIsGenerating(true)
        setGeneratedOutputs([])
        setGenerationProgress(0)
        setCurrentPromptForOutput(data.prompt)
        setCurrentProductUrlForOutput(data.productImage ? URL.createObjectURL(data.productImage) : undefined)
        setActiveMode(typeToUse)
        setCurrentView("output")
        setCurrentBatchTimestamp(new Date())
  
        let currentProgress = 0
        let progressInterval: NodeJS.Timeout
        const isReelGeneration = typeToUse === "reel"
        const TARGET_DURATION = isReelGeneration ? 90000 : 15000
        const TOTAL_TICKS = 100
        const INTERVAL_MS = TARGET_DURATION / TOTAL_TICKS
  
        progressInterval = setInterval(() => {
          currentProgress += 1
          if (currentProgress >= 95 && !pendingImageId) setGenerationProgress(95)
          else if (currentProgress < 100) setGenerationProgress(currentProgress)
        }, INTERVAL_MS)
  
        try {
          const generateImageAd = httpsCallable(functions, "generateImageAd")
          const productData = data.productImage ? await fileToDataUrlObject(data.productImage as File) : null
          const adStyleData = data.inspirationImage ? await fileToDataUrlObject(data.inspirationImage as File) : null
          const settingsForGeneration = typeToUse === "image" ? data.settings : { ...data.settings }
  
          const result = await generateImageAd({
            productFile: productData,
            adInsiprationFile: adStyleData,
            prompt: data.prompt,
            shopId: shopData.id,
            n: settingsForGeneration.outputs || 1,
            size: settingsForGeneration.aspectRatio || (typeToUse === "image" ? "1024x1024" : "1024x576"),
            type: typeToUse === "image" ? "image" : "video",
            language: settingsForGeneration.language || "en",
          })
  
          if (result.data && result.data.imageId) setPendingImageId(result.data.imageId)
          else throw new Error("Image ID not returned from function")
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
        }
        setTimeout(() => clearInterval(progressInterval), TARGET_DURATION + 10000)
      },
      [currentGenerationType, activeMode, toast, shopData.id, pendingImageId],
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
              setGeneratedOutputs(data.imagesUrl)
              setGenerationProgress(100)
              setIsGenerating(false)
              setCurrentBatchTimestamp(data.createdAt?.toDate ? data.createdAt.toDate() : new Date())
              setCurrentProductUrlForOutput(data.productUrl)
  
              const newHistoryItem: HistoryItem = {
                id: pendingImageId,
                type: typeToUse,
                prompt: data.prompt || currentPromptForOutput,
                results: Array.isArray(data.imagesUrl) ? data.imagesUrl : [],
                settings: typeof data.settings === "object" && data.settings !== null ? data.settings : {},
                createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
                status: "completed",
                productUrl: data.productUrl,
              }
              setUserHistory((prev) => [newHistoryItem, ...prev.filter((item) => item.id !== newHistoryItem.id)])
              toast({ title: "Success!", description: `${typeToUse} generation completed!` })
              setPendingImageId(null)
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
  
    const handleImageAction = useCallback(
      (action: string, imageIndex: number) => {
        const typeForAction = currentGenerationType || activeMode
        const url = generatedOutputs[imageIndex]
        if (!url) return
  
        if (action === "download") {
          let extension = typeForAction === "reel" ? ".mp4" : ".png"
          if (url.includes(".svg")) extension = ".svg"
          else if (url.includes(".jpg") || url.includes(".jpeg")) extension = ".jpg"
          else if (url.includes(".mp4")) extension = ".mp4"
          const filename = `${typeForAction}_${Date.now()}_${imageIndex + 1}${extension}`
          downloadFile(url, filename)
        } else if (action === "view") {
          setGeneratedItemViewerData({ image: url, index: imageIndex })
        }
      },
      [generatedOutputs, currentGenerationType, activeMode, downloadFile, toast],
    )
  
    const handleDownloadAllGenerated = useCallback(() => {
      if (generatedOutputs.length === 0) {
        toast({ title: "Nothing to Download", description: "No items have been generated yet." })
        return
      }
      const typeForAction = currentGenerationType || activeMode
      generatedOutputs.forEach((url, index) => {
        if (url) {
          let extension = typeForAction === "reel" ? ".mp4" : ".png"
          if (url.includes(".svg")) extension = ".svg"
          else if (url.includes(".jpg") || url.includes(".jpeg")) extension = ".jpg"
          else if (url.includes(".mp4")) extension = ".mp4"
          const filename = `${typeForAction}_batch_${Date.now()}_${index + 1}${extension}`
          setTimeout(() => downloadFile(url, filename), index * 500)
        }
      })
    }, [generatedOutputs, currentGenerationType, activeMode, downloadFile, toast])
  
    const handleOpenHistoryItemDetail = useCallback((item: HistoryItem) => {
      setHistoryViewerData({
        images: item.results,
        prompt: item.prompt,
        createdAt: item.createdAt,
        type: item.type,
        productUrl: item.productUrl,
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
  
    const handleNextGeneratedItem = useCallback(() => {
      if (generatedItemViewerData && generatedItemViewerData.index < generatedOutputs.length - 1) {
        const nextIndex = generatedItemViewerData.index + 1
        setGeneratedItemViewerData({ image: generatedOutputs[nextIndex], index: nextIndex })
      }
    }, [generatedItemViewerData, generatedOutputs])
  
    const handlePreviousGeneratedItem = useCallback(() => {
      if (generatedItemViewerData && generatedItemViewerData.index > 0) {
        const prevIndex = generatedItemViewerData.index - 1
        setGeneratedItemViewerData({ image: generatedOutputs[prevIndex], index: prevIndex })
      }
    }, [generatedItemViewerData, generatedOutputs])
  
    const handleCloseGeneratedItemViewer = useCallback(() => {
      setGeneratedItemViewerData(null)
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
        setCurrentGenerationType(item.type)
        setActiveMode(item.type)
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
          item.prompt
        setWizardInitialPrompt(shortPromptGuess)
        if (item.type === "image") {
          setWizardInitialImageSettings({ ...getDefaultImageSettings(), ...(item.settings as Settings) })
        } else if (item.type === "reel") {
          setWizardInitialReelSettings({ ...getDefaultReelSettings(), ...(item.settings as ReelSettings) })
        }
        setIsWizardOpen(true)
      }
    }, [])
  
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
                inspirationItems={creativeAiItems || sampleInspirationItems}
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
                mode={activeMode}
                originalPrompt={currentPromptForOutput}
                userHistory={userHistory}
                onOpenHistoryItem={handleOpenHistoryItemDetail}
                onDeleteHistoryItem={handleDeleteHistoryItem}
                onRegenerateFromHistory={handleRegenerateFromHistory}
                onInitiateNewGeneration={handleInitiateNewGenerationWizard}
                onNavigateBack={navigateToWelcome}
                onDownloadAll={handleDownloadAllGenerated}
                currentBatchTimestamp={currentBatchTimestamp}
              />
            )}
          </div>
        </div>
  
        {isWizardOpen && (
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
            originalPrompt={historyViewerData.prompt}
            createdAt={historyViewerData.createdAt}
            isReel={historyViewerData.type === "reel"}
            productUrl={historyViewerData.productUrl}
            onDownloadFile={downloadFile}
          />
        )}
  
        {generatedItemViewerData && (
          <ImageViewerModal
            image={generatedItemViewerData.image}
            imageIndex={generatedItemViewerData.index}
            images={generatedOutputs}
            onClose={handleCloseGeneratedItemViewer}
            onNext={handleNextGeneratedItem}
            onPrevious={handlePreviousGeneratedItem}
            originalPrompt={currentPromptForOutput}
            createdAt={currentBatchTimestamp}
            isReel={activeMode === "reel"}
            productUrl={currentProductUrlForOutput}
            onDownloadFile={downloadFile}
          />
        )}
        <Toaster />
      </div>
    )
  }
  