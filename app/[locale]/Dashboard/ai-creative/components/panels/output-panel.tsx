"use client"

import { useState, useCallback, useMemo } from "react"
import {
  Sparkles,
  Download,
  Heart,
  Grid3X3,
  Play,
  ImageIcon,
  Star,
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
  Eye,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProgressRing } from "@/components/ui/progress-ring"
import type { HistoryItem } from "@/components/types" // Corrected import path
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface OutputPanelProps {
  generatedImages: string[]
  isGenerating: boolean
  onImageAction: (action: string, imageIndex: number) => void
  onRegenerateVariation: (imageIndex: number) => void
  generationProgress: number
  mode: "image" | "reel" // This prop determines the context (image or reel)
  originalPrompt: string
  userHistory: HistoryItem[]
  onOpenHistoryItem: (item: HistoryItem) => void
  onDeleteHistoryItem: (id: string) => void
  onRegenerateFromHistory: (item: HistoryItem) => void
  onInitiateNewGeneration: () => void
  onNavigateBack: () => void
  onDownloadAll: () => void // New prop for downloading all
  currentBatchTimestamp?: Date // New prop for timestamp
}

export function OutputPanel({
  generatedImages,
  isGenerating,
  onImageAction,
  onRegenerateVariation,
  generationProgress,
  mode, // Use this 'mode' prop to filter history
  originalPrompt,
  userHistory,
  onOpenHistoryItem,
  onDeleteHistoryItem,
  onRegenerateFromHistory,
  onInitiateNewGeneration,
  onNavigateBack,
  onDownloadAll, // Destructure new prop
  currentBatchTimestamp, // Destructure new prop
}: OutputPanelProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  // viewerImage and enhancementModal states are removed as ImageViewerModal will be used directly from page.tsx
  // const [viewerImage, setViewerImage] = useState<{ image: string; index: number } | null>(null);
  // const [enhancementModal, setEnhancementModal] = useState<{ image: string; index: number } | null>(null);
  // const [isEnhancing, setIsEnhancing] = useState(false);

  const [historySearchQuery, setHistorySearchQuery] = useState("")
  const [historySortBy, setHistorySortBy] = useState<"newest" | "oldest">("newest")
  // Removed historyFilterType state

  const isReel = mode === "reel"
  // The panelTitle will now correctly reflect the current mode for history view
  const panelTitle = isReel ? "Reel History" : "Image History"
  const generateButtonText = isReel ? "Generate New Reel" : "Generate New Image"

  // handleImageClick will now call onImageAction with "view"
  const handleImageClick = useCallback(
    (imageIndex: number) => {
      onImageAction("view", imageIndex)
    },
    [onImageAction],
  )

  // handleEnhanceClick and handleEnhanceImage are removed as enhancement modal is separate
  // and not directly triggered from this panel's state in the same way.

  // handleNextImage and handlePreviousImage are removed as this logic is now in page.tsx for the generatedItemViewerData

  const formatDate = useCallback((date: Date | string) => {
    const d = new Date(date)
    const now = new Date()
    const diffInHours = (now.getTime() - d.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return d.toLocaleDateString()
  }, [])

  const formatFullDateTime = useCallback((date: Date | string | undefined) => {
    if (!date) return ""
    return new Date(date).toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }, [])

  const filteredUserHistory = useMemo(
    () =>
      userHistory
        .filter((item) => {
          const matchesSearch = item.prompt.toLowerCase().includes(historySearchQuery.toLowerCase())
          const matchesType = item.type === mode // Filter by the current mode
          return matchesSearch && matchesType
        })
        .sort((a, b) => {
          const dateA = new Date(a.createdAt)
          const dateB = new Date(b.createdAt)
          if (historySortBy === "newest") {
            return dateB.getTime() - dateA.getTime()
          }
          return dateA.getTime() - dateB.getTime()
        }),
    [userHistory, historySearchQuery, historySortBy, mode], // Added mode to dependency array
  )

  // currentBatchTimestamp is now passed as a prop
  // const currentBatchTimestamp = useMemo(() => { ... }) // Removed

  if (isGenerating) {
    // ... (isGenerating block remains the same)
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
            {Array.from({
              length:
                mode === "reel"
                  ? 1
                  : userHistory.find((item) => item.prompt === originalPrompt)?.settings?.outputs || 4,
            }).map(
              (
                _,
                index, // Adjust length based on outputs
              ) => (
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
              ),
            )}
          </div>
        </div>
      </div>
    )
  }

  if (generatedImages.length > 0) {
    // This block is for when new images/reels are generated and displayed
    const currentOutputTitle = mode === "reel" ? "Generated Reels" : "Generated Creatives"
    return (
      <div className="flex-1 bg-white dark:bg-slate-950 p-8 relative animate-in fade-in duration-300">
        <div className="h-full flex flex-col">
          <div className="mb-8 flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-500 ease-out">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-50 flex items-center gap-2">
                {mode === "reel" ? (
                  <Play className="h-6 w-6 text-blue-500" />
                ) : (
                  <Sparkles className="h-6 w-6 text-purple-500" />
                )}
                {currentOutputTitle}
              </h3>
              <p className="text-gray-600 dark:text-slate-400 mt-1">
                {generatedImages.length} stunning results.
                {currentBatchTimestamp && (
                  <span className="block text-xs text-gray-500 dark:text-slate-500 mt-0.5">
                    Created: {formatFullDateTime(currentBatchTimestamp)}
                  </span>
                )}
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
                onClick={onDownloadAll} // Use the new prop
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
                    `group relative bg-white dark:bg-slate-900 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl ${
                      mode === "reel" ? "hover:border-blue-300" : "hover:border-purple-300 dark:hover:border-purple-600"
                    } transition-all duration-300 transform hover:scale-[1.02] cursor-pointer`,
                    "animate-in fade-in zoom-in-95 ease-out",
                  )}
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
                  onClick={() => handleImageClick(index)} // Pass index to new handler
                >
                  <div className="aspect-video bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                    {mode === "reel" ? (
                      <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative">
                        <video key={image} className="w-full h-full object-cover" autoPlay loop muted playsInline>
                          <source src={image} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Play className="h-16 w-16 text-white/80 drop-shadow-lg" />
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
                      <Badge
                        className={`${mode === "reel" ? "bg-blue-500/90" : "bg-green-500/90"} text-white backdrop-blur-sm`}
                      >
                        <Star className="h-3 w-3 mr-1" />
                        {mode === "reel" ? "Pro" : "HD"}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-3">
                        <Button // This button now triggers the viewer
                          size="sm"
                          className="h-10 w-10 p-0 bg-white/90 hover:bg-white text-gray-700 shadow-lg backdrop-blur-sm transition-transform hover:scale-110"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleImageClick(index) // Open viewer
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {/* Enhancement button removed as per previous logic, can be re-added if needed */}
                        {/* <Button
                            size="sm"
                            className="h-10 w-10 p-0 bg-white/90 hover:bg-white text-gray-700 shadow-lg backdrop-blur-sm transition-transform hover:scale-110"
                            onClick={(e) => {
                              e.stopPropagation();
                              // handleEnhanceClick(index); // This would need re-evaluation
                            }}
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button> */}
                        <Button
                          size="sm"
                          className="h-10 w-10 p-0 bg-white/90 hover:bg-white text-gray-700 shadow-lg backdrop-blur-sm transition-transform hover:scale-110"
                          onClick={(e) => {
                            e.stopPropagation()
                            onImageAction("download", index)
                          }}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          className="h-10 w-10 p-0 bg-white/90 hover:bg-white text-gray-700 shadow-lg backdrop-blur-sm transition-transform hover:scale-110"
                          onClick={(e) => {
                            e.stopPropagation()
                            onImageAction("favorite", index) // Assuming 'favorite' is a valid action
                          }}
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-t dark:border-slate-800">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className={`text-xs font-medium ${
                            mode === "reel" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {mode === "reel" ? `Reel ${index + 1}` : `Creative ${index + 1}`}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-xs border-gray-300 text-gray-600 dark:border-slate-700 dark:text-slate-400"
                        >
                          {mode === "reel" ? "1080×1920" : "1024×576"}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-500">
                          <TrendingUp className="h-3 w-3" />
                          <span>98% quality</span>
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
                        className={`flex-1 h-8 text-xs text-gray-600 dark:text-slate-300 ${
                          mode === "reel"
                            ? "hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/50"
                            : "hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/50"
                        } transition-all`}
                        onClick={(e) => {
                          e.stopPropagation()
                          onRegenerateVariation(index)
                        }}
                      >
                        <RefreshCw className="h-3 w-3 mr-1" /> Variation
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 h-8 text-xs text-gray-600 dark:text-slate-300 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-all"
                        onClick={(e) => {
                          e.stopPropagation()
                          onImageAction("share", index) // Assuming 'share' is a valid action
                        }}
                      >
                        <Share2 className="h-3 w-3 mr-1" /> Share
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // This block is for when no new images are generated, showing history
  return (
    <div className="flex-1 bg-white dark:bg-slate-950 p-8 relative animate-in fade-in duration-300">
      <div className="h-full flex flex-col">
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
                {mode === "reel" ? (
                  <Video className="h-6 w-6 text-blue-500" />
                ) : (
                  <ImageIcon className="h-6 w-6 text-purple-500" />
                )}
                {panelTitle} {/* Uses the mode-dependent panelTitle */}
              </h3>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                Review your past {mode} creations or start a new one.
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

        <div className="flex gap-4 mb-6 animate-in fade-in slide-in-from-top-4 delay-100 duration-500 ease-out">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={`Search your ${mode}s...`} // Placeholder text reflects current mode
              value={historySearchQuery}
              onChange={(e) => setHistorySearchQuery(e.target.value)}
              className="pl-10 bg-white/70 border-gray-300 text-gray-900 h-11 rounded-xl dark:bg-slate-900 dark:border-slate-700 dark:text-slate-50"
            />
          </div>
          {/* Removed the history type filter Select dropdown */}
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
                    <div className="flex-shrink-0">
                      <div className="grid grid-cols-2 gap-1.5 w-28 h-28">
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

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge
                            variant="secondary"
                            className={`text-xs font-medium ${
                              item.type === "reel"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300"
                                : "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300"
                            }`}
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
                          <span className="text-xs text-gray-500 dark:text-slate-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDate(item.createdAt)}
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
                        {item.type === "image" && item.settings?.model && (
                          <span className="flex items-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            {item.settings.model}
                          </span>
                        )}
                        {item.type === "reel" && item.settings?.model && (
                          <span className="flex items-center gap-1">
                            <Cpu className="h-3 w-3" />
                            {String(item.settings.model).charAt(0).toUpperCase() + String(item.settings.model).slice(1)}{" "}
                            Model
                          </span>
                        )}
                        {item.settings?.quality && (
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            {item.settings.quality}
                          </span>
                        )}
                        {item.settings?.aspectRatio && (
                          <span className="flex items-center gap-1">
                            <Grid3X3 className="h-3 w-3" />
                            {item.settings.aspectRatio}
                          </span>
                        )}
                        {item.settings?.creativity && (
                          <span className="flex items-center gap-1">
                            <Wand2 className="h-3 w-3" />
                            Creativity{" "}
                            {Array.isArray(item.settings.creativity)
                              ? item.settings.creativity[0]
                              : item.settings.creativity}
                            /10
                          </span>
                        )}
                        {item.settings?.outputs && (
                          <span className="flex items-center gap-1">
                            <ImageIcon className="h-3 w-3" />
                            {item.settings.outputs} output{Number(item.settings.outputs) > 1 ? "s" : ""}
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
                No {mode}s in your history yet. {/* Message reflects current mode */}
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
