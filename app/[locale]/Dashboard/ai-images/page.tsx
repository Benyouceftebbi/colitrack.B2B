"use client"

import { useState, useCallback, useMemo, useEffect } from "react" // Import useCallback and useMemo
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
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000 * 5), // Sample past date
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
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000 * 3), // Sample past date
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
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000 * 2), // Sample past date
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
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000 * 1), // Sample past date
    },
  ]
  
  export default function AICreativePage() {
    const { creativeAiItems, creativeAiLoading, creativeAiError } = useShop()
    const [currentView, setCurrentView] = useState<"welcome" | "output">("welcome")
    const [activeMode, setActiveMode] = useState<CreativeMode>("image")
    const [currentGenerationType, setCurrentGenerationType] = useState<"image" | "reel" | null>(null)
  const [pendingImageId, setPendingImageId] = useState<string | null>(null);
const { shopData } = useShop()
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
          "## Ad Concept Brief\n\n**Objective:** Create a compelling image ad.\n\n**Core Message/Theme:** A serene zen garden with a koi pond, cherry blossoms, and a stone lantern. Photorealistic, soft morning light.\n\n**Visual Style & Elements:**\n- Desired Aspect Ratio: 16:9\n- Language for any text overlay (if applicable): English\n- Overall aesthetic should be peaceful and natural.\n\n**Key Considerations:**\n- High-resolution output.\n\n**Generated Prompt Guidance (for AI):**\nBased on the above, construct a detailed prompt focusing on: A serene zen garden with a koi pond, cherry blossoms, and a stone lantern. Photorealistic, soft morning light. Incorporate elements like aspect ratio (16:9), desired model (KOLORS 1.5), and 2 variations. The creative level should be around 7/10.",
        results: [
          "/placeholder.svg?height=400&width=600&text=Zen+Garden+1",
          "/placeholder.svg?height=400&width=600&text=Zen+Garden+2",
        ],
        settings: { aspectRatio: "16:9", creativity: [7], outputs: 2, model: "KOLORS 1.5", language: "en" } as Settings,
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        status: "completed",
        metadata: { model: "KOLORS 1.5", aspectRatio: "16:9", creativity: 7, language: "en" },
      },
    ])
  
    const [isWizardOpen, setIsWizardOpen] = useState(false)
    const [wizardInitialPrompt, setWizardInitialPrompt] = useState("")
    const [wizardInitialImageSettings, setWizardInitialImageSettings] = useState<Partial<Settings>>(() =>
      getDefaultImageSettings(),
    )
    const [wizardInitialReelSettings, setWizardInitialReelSettings] = useState<Partial<ReelSettings>>(() =>
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
   function fileToDataUrlObject(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      resolve({
        name: file.name,
        type: file.type,
        base64: reader.result, // full data:image/...;base64,xxx
      });
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
} 
const handleWizardSubmit = useCallback(
  async (data: any) => {
    if (!currentGenerationType) return;

    setIsWizardOpen(false);
    setIsGenerating(true);
    setGeneratedOutputs([]);
    setGenerationProgress(0);
    setCurrentPromptForOutput(data.prompt);
    setActiveMode(currentGenerationType);
    setCurrentView("output");

    const progressInterval = setInterval(() => {
      setGenerationProgress((prev) => (prev >= 100 ? 100 : prev + Math.random() * 1));
    }, 200);

    const generateImageAd = httpsCallable(functions, "generateImageAd");

    const productData = await fileToDataUrlObject(data.productImage);
    const adStyleData = data.inspirationImage ? await fileToDataUrlObject(data.inspirationImage) : null;

    const result = await generateImageAd({
      productFile: productData,
      adInsiprationFile: adStyleData,
      prompt: data.prompt,
      shopId: shopData.id,
      n: data.settings.outputs || 1,
      size: "1024x1024",
      language: "English",
    });

    setPendingImageId(result.data.imageId);
  },
  [currentGenerationType, toast]
);
useEffect(() => {
  if (!pendingImageId) return;

  const imageDocRef = doc(db, "Shops", shopData.id, "ImageAi", pendingImageId);
  const unsubscribe = onSnapshot(imageDocRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.imagesUrl?.length) {
        console.log("🎉 Image Ad Ready:", data);
        setGeneratedOutputs(data.imagesUrl);
        setGenerationProgress(100);
        setIsGenerating(false);
        setPendingImageId(null);

        const newHistoryItem: HistoryItem = {
          id: pendingImageId,
          type: currentGenerationType,
          prompt: data.prompt,
          results: data.imagesUrl,
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
                  duration: "5s",
                },
        };

        setUserHistory((prev) => [newHistoryItem, ...prev]);
        toast({ title: "Success!", description: `${currentGenerationType} generation completed!` });

        unsubscribe(); // Stop listening once complete
      }
    }
  });

  return () => unsubscribe(); // Clean up on unmount
}, [pendingImageId]);
    const handleOpenHistoryItemDetail = useCallback((item: HistoryItem) => {
      const creationDetail: CreationDetail = {
        id: Number.parseInt(item.id.replace("hist_", ""), 10) || Date.now(),
        image: item.results[0],
        user: "You",
        avatar: "/placeholder.svg?height=32&width=32&text=U",
        prompt: item.prompt,
        likes: 0, // Likes are not stored in history items
        type: item.type,
        duration: item.metadata?.duration,
        settings: item.settings,
        createdAt: item.timestamp, // Pass the timestamp here
      }
      setSelectedInspiration(creationDetail)
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
          })
        } else if (item.type === "reel") {
          setWizardInitialReelSettings({
            ...getDefaultReelSettings(),
            ...(item.settings as ReelSettings),
          })
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
      },
      [generatedOutputs, currentGenerationType, toast],
    )
  
    const handleRegenerateVariation = useCallback(
      (imageIndex: number) => {
        console.log(`Regenerate variation for ${currentGenerationType} ${imageIndex}`)
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
                inspirationItems={creativeAiItems}
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
                originalPrompt={currentPromptForOutput}
                userHistory={activeUserHistory} // Pass the filtered history for the active mode
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
            initialPrompt={wizardInitialPrompt}
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
  