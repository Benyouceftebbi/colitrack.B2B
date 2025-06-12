"use client"

import { useState } from "react"
import {
  Sparkles,
  Download,
  Heart,
  Grid3X3,
  Play,
  ImageIcon,
  Star,
  Maximize,
  Edit3,
  Share2,
  TrendingUp,
  MoreHorizontal,
  RefreshCw,
  Video,
  History,
  ArrowLeft,
  PlusCircle,
  Trash2,
  RotateCw,
  ExternalLink,
  ChevronRight,
  Cpu,
  Wand2,
  Clock,
  Search,
  Calendar,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProgressRing } from "@/components/ui/progress-ring"
import { ImageViewerModal } from "../modals/image-viewer-modal"
import { ImageEnhancementModal } from "../modals/image-enhancement-modal"
import type { HistoryItem } from "@/types" // HistoryItem import
import { Input } from "@/components/ui/input" // For history search
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // For history sort/filter
import { cn } from "@/lib/utils" // Import cn

interface OutputPanelProps {
  generatedImages: string[]
  isGenerating: boolean
  onImageAction: (action: string, imageIndex: number) => void
  onRegenerateVariation: (imageIndex: number) => void
  generationProgress: number
  mode: "image" | "reel" // Changed from optional
  originalPrompt: string
  userHistory: HistoryItem[] // Added for displaying user's past generations
  onOpenHistoryItem: (item: HistoryItem) => void // To handle click on a history item
  onDeleteHistoryItem: (id: string) => void
  onRegenerateFromHistory: (item: HistoryItem) => void
  onInitiateNewGeneration: () => void // To open the wizard for new generation
  onNavigateBack: () => void // To go back to welcome screen
}

export function OutputPanel({
  generatedImages,
  isGenerating,
  onImageAction,
  onRegenerateVariation,
  generationProgress,
  mode,
  originalPrompt,
  userHistory,
  onOpenHistoryItem,
  onDeleteHistoryItem,
  onRegenerateFromHistory,
  onInitiateNewGeneration,
  onNavigateBack,
}: OutputPanelProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid") // For newly generated images
  const [viewerImage, setViewerImage] = useState<{ image: string; index: number } | null>(null)
  const [enhancementModal, setEnhancementModal] = useState<{ image: string; index: number } | null>(null)
  const [isEnhancing, setIsEnhancing] = useState(false)

  // State for history browsing within OutputPanel
  const [historySearchQuery, setHistorySearchQuery] = useState("")
  const [historySortBy, setHistorySortBy] = useState<"newest" | "oldest">("newest")

  const isReel = mode === "reel"
  const panelTitle = isReel ? "Reel Creations" : "Image Creations"
  const generateButtonText = isReel ? "Generate New Reel" : "Generate New Image"

  const handleImageClick = (image: string, index: number) => {
    setViewerImage({ image, index })
  }

  const handleEnhanceClick = (imageIndex: number) => {
    setEnhancementModal({ image: generatedImages[imageIndex], index: imageIndex })
    setViewerImage(null)
  }

  const handleEnhanceImage = async (enhancementPrompt: string) => {
    setIsEnhancing(true)
    // Simulate enhancement process
    setTimeout(() => {
      setIsEnhancing(false)
      setEnhancementModal(null)
    }, 3000)
  }

  const handleNextImage = () => {
    if (viewerImage && viewerImage.index < generatedImages.length - 1) {
      const nextIndex = viewerImage.index + 1
      setViewerImage({ image: generatedImages[nextIndex], index: nextIndex })
    }
  }

  const handlePreviousImage = () => {
    if (viewerImage && viewerImage.index > 0) {
      const prevIndex = viewerImage.index - 1
      setViewerImage({ image: generatedImages[prevIndex], index: prevIndex })
    }
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  const filteredUserHistory = userHistory
    .filter((item) => item.prompt.toLowerCase().includes(historySearchQuery.toLowerCase()))
    .sort((a, b) => {
      if (historySortBy === "newest") {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      }
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    })

  // STATE 1: Actively Generating
  if (isGenerating) {
    return (
      <div className="flex-1 bg-white dark:bg-slate-950 p-8 relative animate-in fade-in duration-300">
        <div className="h-full flex flex-col">
          <div className="mb-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
            <div className="mb-4 inline-block">
              <ProgressRing progress={generationProgress} size={80} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-50 mb-2">
              {isReel ? "Creating Your Reel" : "Creating Your Masterpiece"}
            </h3>
            <p className="text-gray-600 dark:text-slate-400">
              {isReel ? "AI is bringing your image to life..." : "AI is painting your vision into reality..."}
            </p>
            <div className="mt-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm rounded-full px-4 py-2 inline-block border border-gray-200 dark:border-slate-700">
              <span className={`text-sm font-medium ${isReel ? "text-blue-600" : "text-purple-600"}`}>
                {Math.round(generationProgress)}% Complete
              </span>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "aspect-video bg-slate-100 dark:bg-slate-900 rounded-2xl flex items-center justify-center border-2 border-slate-200 dark:border-slate-800 relative overflow-hidden",
                  "animate-in fade-in zoom-in-95 duration-500 ease-out",
                )}
                style={{ animationDelay: `${200 + index * 100}ms`, animationFillMode: "both" }}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-3 mx-auto">
                    {isReel ? (
                      <Play className="h-6 w-6 text-gray-400 dark:text-slate-500" />
                    ) : (
                      <ImageIcon className="h-6 w-6 text-gray-400 dark:text-slate-500" />
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-600 dark:text-slate-400">
                    {isReel ? `Reel ${index + 1}` : `Image ${index + 1}`}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-slate-500">Processing...</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-slate-700/10 to-transparent shimmer-animation" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // STATE 2: Displaying Freshly Generated Outputs
  if (generatedImages.length > 0) {
    return (
      <div className="flex-1 bg-white dark:bg-slate-950 p-8 relative animate-in fade-in duration-300">
        <div className="h-full flex flex-col">
          <div className="mb-8 flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-500 ease-out">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-50 flex items-center gap-2">
                {isReel ? <Play className="h-6 w-6 text-blue-500" /> : <Sparkles className="h-6 w-6 text-purple-500" />}
                {isReel ? "Generated Reels" : "Generated Creatives"}
              </h3>
              <p className="text-gray-600 dark:text-slate-400 mt-1">
                {generatedImages.length} stunning results • Ready to download
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={onNavigateBack}
                className="border-gray-300 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 text-gray-700 hover:bg-gray-100 transition-all hover:scale-105"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Welcome
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="border-gray-300 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 text-gray-700 hover:bg-gray-100 transition-all hover:scale-105"
              >
                <Grid3X3 className="h-4 w-4 mr-2" />
                {viewMode === "grid" ? "List View" : "Grid View"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-300 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 text-gray-700 hover:bg-gray-100 transition-all hover:scale-105"
              >
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
              {generatedImages.map((image, index) => (
                <div
                  key={index}
                  className={cn(
                    `group relative bg-white dark:bg-slate-900 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl ${isReel ? "hover:border-blue-300" : "hover:border-purple-300 dark:hover:border-purple-600"} transition-all duration-300 transform hover:scale-[1.02] cursor-pointer`,
                    "animate-in fade-in zoom-in-95 ease-out",
                  )}
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
                  onClick={() => handleImageClick(image, index)}
                >
                  <div className="aspect-video bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                    {isReel ? (
                      <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative">
                        <Play className="h-16 w-16 text-blue-500" />
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          5s {/* TODO: Get actual duration */}
                        </div>
                      </div>
                    ) : (
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Generated creative ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute top-3 right-3">
                      <Badge className={`${isReel ? "bg-blue-500/90" : "bg-green-500/90"} text-white backdrop-blur-sm`}>
                        <Star className="h-3 w-3 mr-1" />
                        {isReel ? "Pro" : "HD"} {/* TODO: Get actual quality */}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-3">
                        <Button
                          size="sm"
                          className="h-10 w-10 p-0 bg-white/90 hover:bg-white text-gray-700 shadow-lg backdrop-blur-sm transition-transform hover:scale-110"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleImageClick(image, index)
                          }}
                        >
                          {" "}
                          <Maximize className="h-4 w-4" />{" "}
                        </Button>
                        <Button
                          size="sm"
                          className="h-10 w-10 p-0 bg-white/90 hover:bg-white text-gray-700 shadow-lg backdrop-blur-sm transition-transform hover:scale-110"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEnhanceClick(index)
                          }}
                        >
                          {" "}
                          <Edit3 className="h-4 w-4" />{" "}
                        </Button>
                        <Button
                          size="sm"
                          className="h-10 w-10 p-0 bg-white/90 hover:bg-white text-gray-700 shadow-lg backdrop-blur-sm transition-transform hover:scale-110"
                          onClick={(e) => {
                            e.stopPropagation()
                            onImageAction("download", index)
                          }}
                        >
                          {" "}
                          <Download className="h-4 w-4" />{" "}
                        </Button>
                        <Button
                          size="sm"
                          className="h-10 w-10 p-0 bg-white/90 hover:bg-white text-gray-700 shadow-lg backdrop-blur-sm transition-transform hover:scale-110"
                          onClick={(e) => {
                            e.stopPropagation()
                            onImageAction("favorite", index)
                          }}
                        >
                          {" "}
                          <Heart className="h-4 w-4" />{" "}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-t dark:border-slate-800">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className={`text-xs font-medium ${isReel ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}
                        >
                          {isReel ? `Reel ${index + 1}` : `Creative ${index + 1}`}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-xs border-gray-300 text-gray-600 dark:border-slate-700 dark:text-slate-400"
                        >
                          {isReel ? "1080×1920" : "1024×576"} {/* TODO: Get actual dimensions */}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-500">
                          <TrendingUp className="h-3 w-3" />
                          <span>98% quality</span> {/* TODO: Get actual quality score */}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`flex-1 h-8 text-xs text-gray-600 dark:text-slate-300 ${isReel ? "hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/50" : "hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/50"} transition-all`}
                        onClick={(e) => {
                          e.stopPropagation()
                          onRegenerateVariation(index)
                        }}
                      >
                        {" "}
                        <RefreshCw className="h-3 w-3 mr-1" /> Variation{" "}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 h-8 text-xs text-gray-600 dark:text-slate-300 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-all"
                        onClick={(e) => {
                          e.stopPropagation()
                          onImageAction("share", index)
                        }}
                      >
                        {" "}
                        <Share2 className="h-3 w-3 mr-1" /> Share{" "}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {viewerImage && (
          <ImageViewerModal
            image={viewerImage.image}
            imageIndex={viewerImage.index}
            images={generatedImages}
            onClose={() => setViewerImage(null)}
            onNext={handleNextImage}
            onPrevious={handlePreviousImage}
            onEnhance={handleEnhanceClick}
            originalPrompt={originalPrompt}
          />
        )}
        {enhancementModal && (
          <ImageEnhancementModal
            image={enhancementModal.image}
            originalPrompt={originalPrompt}
            onClose={() => setEnhancementModal(null)}
            onEnhance={handleEnhanceImage}
            isEnhancing={isEnhancing}
          />
        )}
      </div>
    )
  }

  // STATE 3: History Hub / Generate New
  return (
    <div className="flex-1 bg-white dark:bg-slate-950 p-8 relative animate-in fade-in duration-300">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-500 ease-out">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={onNavigateBack}
              className="h-10 w-10 transition-transform hover:scale-110"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-50 flex items-center gap-2">
                {isReel ? (
                  <Video className="h-6 w-6 text-blue-500" />
                ) : (
                  <ImageIcon className="h-6 w-6 text-purple-500" />
                )}
                {panelTitle}
              </h3>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                Review your past creations or start a new one.
              </p>
            </div>
          </div>
          <Button
            size="lg"
            onClick={onInitiateNewGeneration}
            className="font-semibold transition-transform hover:scale-105"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            {generateButtonText}
          </Button>
        </div>

        {/* History Search and Filter Controls */}
        <div className="flex gap-4 mb-6 animate-in fade-in slide-in-from-top-4 delay-100 duration-500 ease-out">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={`Search your ${mode}s...`}
              value={historySearchQuery}
              onChange={(e) => setHistorySearchQuery(e.target.value)}
              className="pl-10 bg-white/70 border-gray-300 text-gray-900 h-11 rounded-xl dark:bg-slate-900 dark:border-slate-700 dark:text-slate-50"
            />
          </div>
          <Select value={historySortBy} onValueChange={(value: any) => setHistorySortBy(value)}>
            <SelectTrigger className="w-48 bg-white/70 border-gray-300 text-gray-900 h-11 rounded-xl dark:bg-slate-900 dark:border-slate-700 dark:text-slate-50">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300 rounded-xl dark:bg-slate-800 dark:border-slate-700">
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* User's Past Generations */}
        <div className="flex-1 overflow-y-auto">
          {filteredUserHistory.length > 0 ? (
            <div className="space-y-4">
              {filteredUserHistory.map((item, index) => (
                <div
                  key={item.id}
                  className={cn(
                    "bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg transition-all duration-300 group dark:bg-slate-900 dark:border-slate-800",
                    "animate-in fade-in slide-in-from-bottom-4 ease-out",
                  )}
                  style={{ animationDelay: `${100 + index * 75}ms`, animationFillMode: "both" }}
                >
                  <div className="flex gap-4 items-start">
                    {/* Preview Thumbnails */}
                    <div className="flex-shrink-0">
                      <div className="grid grid-cols-2 gap-1.5 w-28 h-28">
                        {" "}
                        {/* Slightly larger thumbnails */}
                        {item.results.slice(0, 4).map((result, thumbIndex) => (
                          <div
                            key={thumbIndex}
                            className="bg-slate-100 dark:bg-slate-800 rounded-md overflow-hidden border border-gray-200 dark:border-slate-700 relative group-hover:scale-105 transition-transform duration-200 aspect-square"
                          >
                            {item.type === "reel" ? (
                              <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                <Play className="h-5 w-5 text-blue-500" />
                              </div>
                            ) : (
                              <img
                                src={result || "/placeholder.svg?height=60&width=60"}
                                alt={`Result ${thumbIndex + 1}`}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge
                            variant="secondary"
                            className={`text-xs font-medium ${item.type === "reel" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}
                          >
                            {item.type === "reel" ? (
                              <Video className="h-3 w-3 mr-1" />
                            ) : (
                              <ImageIcon className="h-3 w-3 mr-1" />
                            )}
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-xs border-gray-300 text-gray-600 dark:border-slate-700 dark:text-slate-400"
                          >
                            {item.results.length} result{item.results.length > 1 ? "s" : ""}
                          </Badge>
                          <span className="text-xs text-gray-500 dark:text-slate-500">
                            {formatDate(item.timestamp)}
                          </span>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onOpenHistoryItem(item)}
                            className="h-7 w-7 p-0 text-gray-400 hover:text-emerald-600 transition-colors"
                            title="View Details"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRegenerateFromHistory(item)}
                            className="h-7 w-7 p-0 text-gray-400 hover:text-blue-600 transition-colors"
                            title="Regenerate"
                          >
                            <RotateCw className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDeleteHistoryItem(item.id)}
                            className="h-7 w-7 p-0 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>

                      <h4
                        className="font-medium text-gray-900 dark:text-slate-50 mb-1.5 line-clamp-2 hover:text-primary cursor-pointer transition-colors"
                        onClick={() => onOpenHistoryItem(item)}
                      >
                        {item.prompt}
                      </h4>

                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-slate-400">
                        {item.metadata?.model && item.type === "image" && (
                          <span className="flex items-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            {item.metadata.model}
                          </span>
                        )}
                        {item.metadata?.reelModel && item.type === "reel" && (
                          <span className="flex items-center gap-1">
                            <Cpu className="h-3 w-3" />
                            {item.metadata.reelModel.charAt(0).toUpperCase() + item.metadata.reelModel.slice(1)} Model
                          </span>
                        )}
                        {item.metadata?.quality && (
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            {item.metadata.quality}
                          </span>
                        )}
                        {item.metadata?.duration && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.metadata.duration}
                          </span>
                        )}
                        {item.metadata?.aspectRatio && (
                          <span className="flex items-center gap-1">
                            <Grid3X3 className="h-3 w-3" />
                            {item.metadata.aspectRatio}
                          </span>
                        )}
                        {item.metadata?.creativity && (
                          <span className="flex items-center gap-1">
                            <Wand2 className="h-3 w-3" />
                            Creativity {item.metadata.creativity}/10
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onOpenHistoryItem(item)}
                        className="border-gray-300 text-gray-700 hover:bg-gray-100 group-hover:border-primary group-hover:text-primary dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition-all"
                      >
                        View
                        <ChevronRight className="h-3.5 w-3.5 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 animate-in fade-in duration-500 delay-200">
              <History className="h-16 w-16 text-gray-300 dark:text-slate-700 mx-auto mb-4 animate-bounce" />
              <h4 className="text-xl font-semibold text-gray-700 dark:text-slate-300 mb-2">
                No {mode}s in your history yet.
              </h4>
              <p className="text-gray-500 dark:text-slate-400">
                Click the "{generateButtonText}" button above to create your first one!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
