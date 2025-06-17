"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Upload,
  X,
  ImageIcon as ImageIconLucide,
  VideoIcon as VideoIconLucide,
  ArrowRight,
  Check,
  Sparkles,
  Lightbulb,
  FileText,
  CopySlash,
} from "lucide-react"
import { cn } from "@/lib/utils"
// import type { Settings as ImageSettingsFromApp, ReelSettings as ReelSettingsFromAppPage } from "@/app/page"
import { PromptBuilderModal } from "./prompt-builder-modal"
import { httpsCallable } from "firebase/functions"
import { functions } from "@/firebase/firebase"
import { useToast } from "@/hooks/use-toast"

// Define ImageSettings based on the structure expected within this modal
interface ImageSettings {
  aspectRatio: string
  outputs: number
  model: string
  creativity: number[]
  language: string
}

// Define ReelSettings based on the structure expected within this modal
interface ReelSettings {
  aspectRatio: string
  quality: string
  creativity: number[]
  outputs: number
  model: "normal" | "expert" | "" // Allow empty string for "not selected"
}

type GenerationType = "image" | "reel"

const DEFAULT_IMAGE_SETTINGS: ImageSettings = {
  aspectRatio: "",
  outputs: 0, // 0 signifies not selected
  model: "KOLORS 1.5",
  creativity: [7],
  language: "", // Empty string signifies not selected
}

const DEFAULT_REEL_SETTINGS: ReelSettings = {
  aspectRatio: "",
  quality: "standard", // Can keep a default or make it mandatory too
  outputs: 0, // 0 signifies not selected
  model: "", // Empty string signifies not selected
  creativity: [5],
}

interface GenerationWizardModalProps {
  isOpen: boolean
  onClose: () => void
  generationType: GenerationType
  onSubmit: (data: any) => void
  initialImageSettings?: Partial<ImageSettings>
  initialReelSettings?: Partial<ReelSettings>
  initialPrompt?: string
}

const STEPS = {
  image: [
    { id: "uploadImages", title: "Upload Images" },
    { id: "detailsSettings", title: "Details & Settings" },
    { id: "adConceptBrief", title: "Ad Concept Brief" },
    { id: "review", title: "Review & Generate" },
  ],
  reel: [
    { id: "sourceImage", title: "Source Image" },
    { id: "detailsSettings", title: "Details & Settings" },
    { id: "adConceptBrief", title: "Ad Concept Brief" },
    { id: "review", title: "Review & Generate" },
  ],
}

const languageOptions = [
  { value: "en", label: "English" },
  { value: "es", label: "Español (Spanish)" },
  { value: "fr", label: "Français (French)" },
  { value: "de", label: "Deutsch (German)" },
  { value: "ja", label: "日本語 (Japanese)" },
  { value: "ko", label: "한국어 (Korean)" },
  { value: "zh", label: "中文 (Chinese)" },
]

export function GenerationWizardModal({
  isOpen,
  onClose,
  generationType,
  onSubmit,
  initialImageSettings,
  initialReelSettings,
  initialPrompt = "",
}: GenerationWizardModalProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [prompt, setPrompt] = useState(initialPrompt)
  const [adConcept, setAdConcept] = useState("")
  const [isGeneratingBrief, setIsGeneratingBrief] = useState(false)

  const [productImageFile, setProductImageFile] = useState<File | null>(null)
  const [inspirationImageFile, setInspirationImageFile] = useState<File | null>(null)

  const [imageSettings, setImageSettings] = useState<ImageSettings>(DEFAULT_IMAGE_SETTINGS)
  const [reelSettings, setReelSettings] = useState<ReelSettings>(DEFAULT_REEL_SETTINGS)

  const [isDragActiveProduct, setIsDragActiveProduct] = useState(false)
  const [isDragActiveInspiration, setIsDragActiveInspiration] = useState(false)
  const productFileInputRef = useRef<HTMLInputElement>(null)
  const inspirationFileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const [isPromptBuilderModalOpen, setIsPromptBuilderModalOpen] = useState(false)

  const steps = useMemo(() => STEPS[generationType], [generationType])

  useEffect(() => {
    if (isOpen) {
      setCurrentStepIndex(0)
      setPrompt(initialPrompt)
      setAdConcept("")
      if (generationType === "image") {
        setImageSettings({ ...DEFAULT_IMAGE_SETTINGS, ...(initialImageSettings || {}) })
      }
      if (generationType === "reel") {
        setReelSettings({ ...DEFAULT_REEL_SETTINGS, ...(initialReelSettings || {}) })
      }
      setProductImageFile(null)
      setInspirationImageFile(null)
    }
  }, [isOpen, generationType, initialPrompt, initialImageSettings, initialReelSettings])

  const fileToBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        resolve(reader.result)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })

  const handleNext = useCallback(async () => {
    if (currentStepIndex === steps.length - 1) {
      const data =
        generationType === "image"
          ? {
              prompt: adConcept,
              settings: imageSettings,
              productImage: productImageFile,
              inspirationImage: inspirationImageFile,
              originalUserPrompt: prompt,
            }
          : {
              prompt: adConcept,
              settings: reelSettings,
              productImage: productImageFile,
              originalUserPrompt: prompt,
            }
      onSubmit(data)
      return
    }

    const isMovingToAdConcept = steps[currentStepIndex + 1].id === "adConceptBrief"

    if (isMovingToAdConcept) {
      setIsGeneratingBrief(true)
      try {
        const productImageBase64 = productImageFile ? await fileToBase64(productImageFile) : null
        // For image generation, product image is mandatory for brief generation at this stage
        if (generationType === "image" && !productImageBase64) {
          toast({
            title: "Product Image Required",
            description: "Please upload a product image to generate the ad brief.",
            variant: "destructive",
          })
          setIsGeneratingBrief(false)
          return
        }
        // For reel generation, product image is optional for brief generation
        // If not provided, the brief will be based on the prompt alone.

        const adStyleImageBase64 = inspirationImageFile ? await fileToBase64(inspirationImageFile) : null

        const generateAdBrief = httpsCallable(functions, "generateImageAdBrief")

        const result = await generateAdBrief({
          userPrompt: prompt,
          productImageBase64, // Can be null for reels
          adStyleImageBase64,
        })

        if (result.data.success) {
          setAdConcept(result.data.brief)
          toast({
            title: "Brief Generated",
            description: "The AI has created an ad concept brief for you to review.",
          })
          setCurrentStepIndex(currentStepIndex + 1)
        } else {
          console.error("Failed to generate brief:", result.data.error)
          toast({
            title: "Error Generating Brief",
            description: result.data.error || "An unknown error occurred. Please try again.",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error calling Firebase function:", error)
        toast({
          title: "Generation Failed",
          description: "Could not connect to the generation service. Please check your connection and try again.",
          variant: "destructive",
        })
      } finally {
        setIsGeneratingBrief(false)
      }
    } else if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }, [
    currentStepIndex,
    steps,
    generationType,
    imageSettings,
    reelSettings,
    prompt,
    productImageFile,
    inspirationImageFile,
    adConcept,
    onSubmit,
    toast,
  ])

  const FileUploadArea = useCallback(
    ({
      file,
      onFileChange,
      isDragActive,
      setIsDragActive,
      inputRef,
      title,
      isRequired,
      idPrefix,
    }: {
      file: File | null
      onFileChange: (file: File | null) => void
      isDragActive: boolean
      setIsDragActive: (isActive: boolean) => void
      inputRef: React.RefObject<HTMLInputElement>
      title: string
      isRequired?: boolean
      idPrefix: string
    }) => {
      const handleDragEvent = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") setIsDragActive(true)
        else if (e.type === "dragleave") setIsDragActive(false)
      }
      const handleDropEvent = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragActive(false)
        onFileChange(e.dataTransfer.files?.[0] || null)
      }
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFileChange(e.target.files?.[0] || null)
      }

      return (
        <div className="space-y-2">
          <Label htmlFor={`${idPrefix}-upload`} className="text-md font-semibold">
            {title} {isRequired && <span className="text-destructive">*</span>}
          </Label>
          {file ? (
            <div className="bg-muted border rounded-xl p-3 relative group">
              <div className="flex items-center gap-3">
                <img
                  src={URL.createObjectURL(file) || "/placeholder.svg"}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-md border"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onFileChange(null)}
                  className="opacity-50 group-hover:opacity-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div
              onDragEnter={handleDragEvent}
              onDragLeave={handleDragEvent}
              onDragOver={handleDragEvent}
              onDrop={handleDropEvent}
              onClick={() => inputRef.current?.click()}
              className={cn(
                "h-36 bg-muted/50 border-2 border-dashed border-border rounded-xl p-4 text-center hover:border-primary transition-all cursor-pointer flex flex-col items-center justify-center",
                isDragActive && "border-primary bg-primary/10",
              )}
            >
              <Upload className={cn("h-8 w-8 text-muted-foreground mb-2", isDragActive && "text-primary")} />
              <p className="text-sm font-medium mb-1">
                {isDragActive ? "Drop image here" : "Drag & drop or click to upload"}
              </p>
              <p className="text-xs text-muted-foreground">PNG, JPG, up to 5MB</p>
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg"
            onChange={handleInputChange}
            className="hidden"
          />
        </div>
      )
    },
    [],
  )

  const handleAdConceptInteraction = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    toast({
      title: "Action Disabled",
      description: "Copying and cutting text from the Ad Concept Brief is not allowed.",
      variant: "default",
      icon: <CopySlash className="h-5 w-5" />,
    })
  }

  const renderStepContent = useCallback(() => {
    const stepId = steps[currentStepIndex].id
    switch (stepId) {
      case "uploadImages": // Image Generation - Step 1
        return (
          <div className="space-y-6">
            <FileUploadArea
              file={productImageFile}
              onFileChange={setProductImageFile}
              isDragActive={isDragActiveProduct}
              setIsDragActive={setIsDragActiveProduct}
              inputRef={productFileInputRef}
              title="Product Picture"
              isRequired // Mandatory for image brief generation
              idPrefix="product"
            />
            <FileUploadArea
              file={inspirationImageFile}
              onFileChange={setInspirationImageFile}
              isDragActive={isDragActiveInspiration}
              setIsDragActive={setIsDragActiveInspiration}
              inputRef={inspirationFileInputRef}
              title="Inspiration Picture (Optional)"
              idPrefix="inspiration"
            />
          </div>
        )
      case "detailsSettings":
        if (generationType === "image") {
          return (
            <div className="space-y-6">
              <div>
                <Label htmlFor="prompt-wizard" className="text-md font-semibold">
                  Describe Your Vision (Initial Prompt) <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="prompt-wizard"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., A vibrant studio shot of the product on a clean background..."
                  className="h-28 resize-none text-sm mt-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPromptBuilderModalOpen(true)}
                  className="w-full justify-start text-left mt-2 text-sm"
                >
                  <Lightbulb className="h-4 w-4 mr-2 text-yellow-400" />
                  Need help with the prompt? Click here!
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="language-wizard">
                    Language <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={imageSettings.language}
                    onValueChange={(value) => setImageSettings((s) => ({ ...s, language: value }))}
                  >
                    <SelectTrigger id="language-wizard" className="mt-1">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languageOptions.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="outputs-wizard">
                    Number of Pictures <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={imageSettings.outputs > 0 ? String(imageSettings.outputs) : ""}
                    onValueChange={(value) => setImageSettings((s) => ({ ...s, outputs: Number(value) }))}
                  >
                    <SelectTrigger id="outputs-wizard" className="mt-1">
                      <SelectValue placeholder="Select count" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 6, 8].map((n) => (
                        <SelectItem key={n} value={String(n)}>
                          {n} Picture{n > 1 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="aspectRatio-wizard">
                    Aspect Ratio <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={imageSettings.aspectRatio}
                    onValueChange={(value) => setImageSettings((s) => ({ ...s, aspectRatio: value }))}
                  >
                    <SelectTrigger id="aspectRatio-wizard" className="mt-1">
                      <SelectValue placeholder="Select ratio" />
                    </SelectTrigger>
                    <SelectContent>
                      {["1024x1024", "1024x1536", "1536x1024"].map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )
        } else {
          // Reel Generation
          return (
            <div className="space-y-6">
              <div>
                <Label htmlFor="prompt-wizard-reel" className="text-md font-semibold">
                  Describe Desired Motion/Style (Initial Prompt) <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="prompt-wizard-reel"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Product rotating slowly, dynamic zoom effects, particles appearing..."
                  className="h-28 resize-none text-sm mt-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPromptBuilderModalOpen(true)}
                  className="w-full justify-start text-left mt-2 text-sm"
                >
                  <Lightbulb className="h-4 w-4 mr-2 text-yellow-400" />
                  Need help with the prompt? Click here!
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="model-wizard-reel">
                    Model Type <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={reelSettings.model}
                    onValueChange={(value: "normal" | "expert" | "") =>
                      setReelSettings((s) => ({ ...s, model: value }))
                    }
                  >
                    <SelectTrigger id="model-wizard-reel" className="mt-1">
                      <SelectValue placeholder="Select model type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal Model</SelectItem>
                      <SelectItem value="expert">Expert Model (Higher Quality)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="aspectRatio-wizard">
                    Aspect Ratio <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={reelSettings.aspectRatio} // Use reelSettings.aspectRatio
                    onValueChange={(value) => setReelSettings((s) => ({ ...s, aspectRatio: value }))} // Update reelSettings
                  >
                    <SelectTrigger id="aspectRatio-wizard" className="mt-1">
                      <SelectValue placeholder="Select ratio" />
                    </SelectTrigger>
                    <SelectContent>
                      {["16:9", "9:16"].map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="outputs-wizard-reel">
                    Number of Reels <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={reelSettings.outputs > 0 ? String(reelSettings.outputs) : ""}
                    onValueChange={(value) => setReelSettings((s) => ({ ...s, outputs: Number(value) }))}
                  >
                    <SelectTrigger id="outputs-wizard-reel" className="mt-1">
                      <SelectValue placeholder="Select count" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4].map((n) => (
                        <SelectItem key={n} value={String(n)}>
                          {n} Reel{n > 1 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )
        }
      case "sourceImage": // Reel Generation - Step 1 (Source image is optional for reels)
        return (
          <div className="space-y-6">
            <FileUploadArea
              file={productImageFile}
              onFileChange={setProductImageFile}
              isDragActive={isDragActiveProduct}
              setIsDragActive={setIsDragActiveProduct}
              inputRef={productFileInputRef}
              title="Refrence image (Optional for Reels)"
              idPrefix="reel-source"
            />
            <p className="text-sm text-muted-foreground">
              Upload an image if you want the reel to be based on a specific product. Otherwise, the AI will generate
              the brief and reel based on the prompt alone.
            </p>
          </div>
        )
      case "adConceptBrief":
        return (
          <div className="space-y-3">
            <Label htmlFor="ad-concept-brief" className="text-md font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Refine Ad Concept Brief <span className="text-destructive">*</span>
            </Label>
            <p className="text-sm text-muted-foreground">
              Review and edit the auto-generated brief. This final brief will be used for generation. (Copy/Cut
              disabled)
            </p>
            <Textarea
              id="ad-concept-brief"
              value={adConcept}
              onChange={(e) => setAdConcept(e.target.value)}
              onCopy={handleAdConceptInteraction}
              onCut={handleAdConceptInteraction}
              placeholder="Detailed ad concept brief will appear here..."
              className="h-80 resize-none text-sm mt-1 leading-relaxed"
            />
            <p className="text-xs text-muted-foreground text-right">Length: {adConcept.length} characters</p>
          </div>
        )
      case "review":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review Your Configuration</h3>
            <div className="p-4 bg-muted rounded-md space-y-2 text-sm border max-h-80 overflow-y-auto">
              <p>
                <strong>Type:</strong> <Badge variant="outline">{generationType === "image" ? "Image" : "Reel"}</Badge>
              </p>
              {productImageFile && (
                <p>
                  <strong>{generationType === "reel" ? "Source Picture:" : "Product Picture:"}</strong>{" "}
                  {productImageFile.name} ({(productImageFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
              {generationType === "image" && inspirationImageFile && (
                <p>
                  <strong>Inspiration Picture:</strong> {inspirationImageFile.name} (
                  {(inspirationImageFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
              <div>
                <strong>Final Ad Concept Brief:</strong>
                <pre className="mt-1 p-2 bg-background/50 rounded text-xs whitespace-pre-wrap font-sans leading-relaxed border">
                  {adConcept || "(No ad concept provided)"}
                </pre>
              </div>
              {generationType === "image" && (
                <>
                  <p>
                    <strong>Language:</strong>{" "}
                    {languageOptions.find((l) => l.value === imageSettings.language)?.label || imageSettings.language}
                  </p>
                  <p>
                    <strong>Number of Pictures:</strong> {imageSettings.outputs}
                  </p>
                  <p>
                    <strong>Aspect Ratio:</strong> {imageSettings.aspectRatio}
                  </p>
                </>
              )}
              {generationType === "reel" && (
                <>
                  <p>
                    <strong>Model:</strong> {reelSettings.model || "Not Selected"}
                  </p>
                  <p>
                    <strong>Number of Reels:</strong> {reelSettings.outputs || "Not Selected"}
                  </p>
                  <p>
                    <strong>Aspect Ratio:</strong> {reelSettings.aspectRatio}
                  </p>
                </>
              )}
            </div>
          </div>
        )
      default:
        return null
    }
  }, [
    steps,
    currentStepIndex,
    FileUploadArea,
    productImageFile,
    isDragActiveProduct,
    inspirationImageFile,
    isDragActiveInspiration,
    generationType,
    prompt,
    imageSettings,
    reelSettings,
    adConcept,
  ])

  const isNextDisabled = useMemo(() => {
    const stepId = steps[currentStepIndex].id
    if (generationType === "image") {
      if (stepId === "uploadImages" && !productImageFile) return true
      if (
        stepId === "detailsSettings" &&
        (!prompt.trim() || !imageSettings.language || !imageSettings.aspectRatio || imageSettings.outputs === 0)
      ) {
        return true
      }
      if (stepId === "adConceptBrief" && !adConcept.trim()) return true
    } else {
      // Reel generation
      // Source image is optional for reels, so no check in 'sourceImage' step.
      if (
        stepId === "detailsSettings" &&
        (!prompt.trim() ||
          !reelSettings.model || // Check for empty string
          !reelSettings.aspectRatio || // Check for aspect ratio
          reelSettings.outputs === 0) // Check for 0
      ) {
        return true
      }
      if (stepId === "adConceptBrief" && !adConcept.trim()) return true
    }
    return false
  }, [steps, currentStepIndex, generationType, productImageFile, prompt, adConcept, imageSettings, reelSettings])

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-xl md:max-w-2xl lg:max-w-3xl max-h-[90vh] flex flex-col p-0">
          <DialogHeader className="p-6 border-b">
            <DialogTitle className="flex items-center gap-2 text-xl">
              {generationType === "image" ? (
                <ImageIconLucide
                  className={cn(
                    "h-6 w-6 text-primary",
                    isOpen && "animate-in fade-in zoom-in-95 duration-300 ease-out",
                  )}
                />
              ) : (
                <VideoIconLucide
                  className={cn(
                    "h-6 w-6 text-primary",
                    isOpen && "animate-in fade-in zoom-in-95 duration-300 ease-out",
                  )}
                />
              )}
              Create New {generationType === "image" ? "Image" : "Reel"}
            </DialogTitle>
            <div className="flex items-center justify-center space-x-1 sm:space-x-2 pt-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border-2 transition-all",
                      index === currentStepIndex
                        ? "bg-primary border-primary text-primary-foreground animate-in zoom-in-105 duration-200 ease-out"
                        : index < currentStepIndex
                          ? "bg-primary/20 border-primary/50 text-primary"
                          : "bg-muted border-border text-muted-foreground",
                    )}
                  >
                    {index < currentStepIndex ? (
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 animate-in fade-in zoom-in-100 duration-300 ease-out" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <p
                    className={cn(
                      "text-xs sm:text-sm mt-1.5 text-center w-20 sm:w-24 truncate",
                      index === currentStepIndex ? "text-primary font-semibold" : "text-muted-foreground",
                    )}
                  >
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto p-6 space-y-6 min-h-[400px]">{renderStepContent()}</div>
          <DialogFooter className="p-6 border-t flex justify-end items-center">
            <div className="flex items-center gap-3">
              <Button
                onClick={handleNext}
                disabled={isNextDisabled || isGeneratingBrief}
                className="flex items-center gap-1"
              >
                {isGeneratingBrief ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    <span>Generating Brief...</span>
                  </>
                ) : currentStepIndex === steps.length - 1 ? (
                  <>
                    <Sparkles className="h-4 w-4" /> Generate
                  </>
                ) : (
                  <>
                    <span>Next</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <PromptBuilderModal
        isOpen={isPromptBuilderModalOpen}
        onClose={() => setIsPromptBuilderModalOpen(false)}
        currentPrompt={prompt}
        onPromptGenerated={(newPrompt) => {
          setPrompt(newPrompt)
          setIsPromptBuilderModalOpen(false)
        }}
      />
    </>
  )
}
