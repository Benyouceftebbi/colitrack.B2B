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
  Users,
  MagnetIcon as Magic,
  Video,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProgressRing } from "@/components/ui/progress-ring"
import { ImageViewerModal } from "../modals/image-viewer-modal"
import { ImageEnhancementModal } from "../modals/image-enhancement-modal"
import { CreationDetailModal } from "../modals/creation-detail-modal"
import type { CreationDetail } from "@/types"

interface OutputPanelProps {
  generatedImages: string[]
  isGenerating: boolean
  onImageAction: (action: string, imageIndex: number) => void
  onRegenerateVariation: (imageIndex: number) => void
  generationProgress: number
  mode?: "image" | "reel"
  originalPrompt: string
}

export function OutputPanel({
  generatedImages,
  isGenerating,
  onImageAction,
  onRegenerateVariation,
  generationProgress,
  mode = "image",
  originalPrompt,
}: OutputPanelProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedImages, setSelectedImages] = useState<number[]>([])
  const [selectedCreation, setSelectedCreation] = useState<CreationDetail | null>(null)
  const [viewerImage, setViewerImage] = useState<{ image: string; index: number } | null>(null)
  const [enhancementModal, setEnhancementModal] = useState<{ image: string; index: number } | null>(null)
  const [isEnhancing, setIsEnhancing] = useState(false)

  const isReel = mode === "reel"

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
      // Here you would typically update the image with the enhanced version
      // For now, we'll just close the modal
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

  // Sample user creations data with before/after images
  const userImages: CreationDetail[] = [
    {
      id: 1,
      image: "/placeholder.svg?height=300&width=300&text=Portrait+Art",
      beforeImage: "/placeholder.svg?height=300&width=300&text=Original+Photo",
      user: "Sarah Chen",
      avatar: "/placeholder.svg?height=32&width=32&text=SC",
      prompt: "Professional portrait with cinematic lighting, dramatic shadows, high-end fashion photography style",
      likes: 234,
      type: "image",
      settings: {
        model: "DALL-E 3",
        aspectRatio: "1:1",
        creativity: 8,
        quality: "HD",
      },
    },
    {
      id: 2,
      image: "/placeholder.svg?height=300&width=300&text=Fantasy+Art",
      beforeImage: "/placeholder.svg?height=300&width=300&text=Simple+Sketch",
      user: "Maya Patel",
      avatar: "/placeholder.svg?height=32&width=32&text=MP",
      prompt: "Magical forest with glowing creatures, ethereal lighting, fantasy art style with vibrant colors",
      likes: 312,
      type: "image",
      settings: {
        model: "Midjourney",
        aspectRatio: "9:16",
        creativity: 9,
        quality: "Pro",
      },
    },
    // Add more sample data as needed...
  ]

  const userReels: CreationDetail[] = [
    {
      id: 1,
      image: "/placeholder.svg?height=300&width=300&text=Dancing+Reel",
      beforeImage: "/placeholder.svg?height=300&width=300&text=Static+Pose",
      user: "Alex Rivera",
      avatar: "/placeholder.svg?height=32&width=32&text=AR",
      prompt: "Smooth dancing animation with flowing movements, elegant ballet poses, graceful motion",
      likes: 189,
      type: "reel",
      duration: "5s",
      settings: {
        quality: "Pro",
        creativity: 6,
      },
    },
    // Add more sample data as needed...
  ]

  const handleCreationClick = (creation: CreationDetail) => {
    setSelectedCreation(creation)
  }

  const handleNextCreation = () => {
    if (!selectedCreation) return
    const currentList = isReel ? userReels : userImages
    const currentIndex = currentList.findIndex((c) => c.id === selectedCreation.id)
    const nextIndex = (currentIndex + 1) % currentList.length
    setSelectedCreation(currentList[nextIndex])
  }

  const handlePreviousCreation = () => {
    if (!selectedCreation) return
    const currentList = isReel ? userReels : userImages
    const currentIndex = currentList.findIndex((c) => c.id === selectedCreation.id)
    const previousIndex = currentIndex === 0 ? currentList.length - 1 : currentIndex - 1
    setSelectedCreation(currentList[previousIndex])
  }

  if (isGenerating) {
    return (
      <div className="flex-1 bg-white dark:bg-slate-950 p-8 relative">
        <div className="h-full flex flex-col">
          <div className="mb-8 text-center">
            <div className="mb-4">
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
                className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-2xl animate-pulse flex items-center justify-center border-2 border-slate-200 dark:border-slate-800 relative overflow-hidden"
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

                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-slate-700/20 to-transparent -translate-x-full animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (generatedImages.length === 0) {
    return (
      <div className="flex-1 bg-white dark:bg-slate-950 relative overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-8 pb-4">
            <div className="relative mb-6">
              <div
                className={`p-6 bg-slate-100 dark:bg-slate-900 ${isReel ? "border-2 border-blue-500/30" : "border-2 border-purple-500/30"} rounded-full w-20 h-20 mx-auto flex items-center justify-center relative`}
              >
                {isReel ? (
                  <Play className="h-10 w-10 text-blue-500" />
                ) : (
                  <Magic className="h-10 w-10 text-purple-500" />
                )}
                {/* Floating particles */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-bounce" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-300" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-50 mb-2 text-center">
              {isReel ? "Ready to Create Amazing Reels?" : "Ready to Create Magic?"}
            </h3>
            <p className="text-gray-600 dark:text-slate-400 mb-6 text-center max-w-2xl mx-auto">
              {isReel
                ? "Upload an image and describe the motion you want. Watch your static images come to life with AI-powered animation."
                : "Transform your imagination into stunning visuals with the power of AI. Describe your vision and watch it come to life."}
            </p>

            <div className="text-center mb-6">
              <h4 className="font-bold text-gray-900 dark:text-slate-50 mb-2 flex items-center justify-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                Community Creations
              </h4>
              <p className="text-sm text-gray-600 dark:text-slate-400">Discover what our community has been creating</p>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-8 pb-8">
            <div className="space-y-8">
              {/* Images Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <ImageIcon className="h-5 w-5 text-purple-500" />
                  <h5 className="font-semibold text-gray-900 dark:text-slate-50">Generated Images</h5>
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 dark:bg-purple-900/50 dark:text-purple-300 text-purple-700"
                  >
                    {userImages.length} creations
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {userImages.map((creation) => (
                    <div
                      key={creation.id}
                      onClick={() => handleCreationClick(creation)}
                      className="group relative bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
                    >
                      <div className="aspect-square relative overflow-hidden">
                        <img
                          src={creation.image || "/placeholder.svg"}
                          alt={creation.prompt}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                        {creation.beforeImage && (
                          <div className="absolute top-2 left-2">
                            <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                              Before/After
                            </Badge>
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="h-8 w-8 p-0 bg-white/90 hover:bg-white text-gray-700 shadow-lg"
                            >
                              <Heart className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              className="h-8 w-8 p-0 bg-white/90 hover:bg-white text-gray-700 shadow-lg"
                            >
                              <Share2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <img
                            src={creation.avatar || "/placeholder.svg"}
                            alt={creation.user}
                            className="w-5 h-5 rounded-full"
                          />
                          <span className="text-xs font-medium text-gray-700 dark:text-slate-300 truncate">
                            {creation.user}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-slate-400 line-clamp-2 mb-2">{creation.prompt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3 text-red-500" />
                            <span className="text-xs text-gray-500 dark:text-slate-500">{creation.likes}</span>
                          </div>
                          <Badge
                            variant="secondary"
                            className="text-xs bg-purple-100 dark:bg-purple-900/50 dark:text-purple-300 text-purple-700"
                          >
                            Image
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reels Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Video className="h-5 w-5 text-blue-500" />
                  <h5 className="font-semibold text-gray-900 dark:text-slate-50">Generated Reels</h5>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 dark:bg-blue-900/50 dark:text-blue-300 text-blue-700"
                  >
                    {userReels.length} creations
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {userReels.map((creation) => (
                    <div
                      key={creation.id}
                      onClick={() => handleCreationClick(creation)}
                      className="group relative bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
                    >
                      <div className="aspect-square relative overflow-hidden">
                        <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative">
                          <Play className="h-8 w-8 text-blue-500" />
                          <div className="absolute top-2 right-2 bg-black/70 text-white px-1.5 py-0.5 rounded text-xs">
                            {creation.duration}
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                        {creation.beforeImage && (
                          <div className="absolute top-2 left-2">
                            <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                              Before/After
                            </Badge>
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="h-8 w-8 p-0 bg-white/90 hover:bg-white text-gray-700 shadow-lg"
                            >
                              <Heart className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              className="h-8 w-8 p-0 bg-white/90 hover:bg-white text-gray-700 shadow-lg"
                            >
                              <Share2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <img
                            src={creation.avatar || "/placeholder.svg"}
                            alt={creation.user}
                            className="w-5 h-5 rounded-full"
                          />
                          <span className="text-xs font-medium text-gray-700 dark:text-slate-300 truncate">
                            {creation.user}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-slate-400 line-clamp-2 mb-2">{creation.prompt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3 text-red-500" />
                            <span className="text-xs text-gray-500 dark:text-slate-500">{creation.likes}</span>
                          </div>
                          <Badge
                            variant="secondary"
                            className="text-xs bg-blue-100 dark:bg-blue-900/50 dark:text-blue-300 text-blue-700"
                          >
                            Reel
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {selectedCreation && (
          <CreationDetailModal
            creation={selectedCreation}
            onClose={() => setSelectedCreation(null)}
            onNext={handleNextCreation}
            onPrevious={handlePreviousCreation}
            hasNext={true}
            hasPrevious={true}
          />
        )}
      </div>
    )
  }

  return (
    <div className="flex-1 bg-white dark:bg-slate-950 p-8 relative">
      <div className="h-full flex flex-col">
        <div className="mb-8 flex items-center justify-between">
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
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="border-gray-300 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 text-gray-700 hover:bg-gray-100"
            >
              <Grid3X3 className="h-4 w-4 mr-2" />
              {viewMode === "grid" ? "List View" : "Grid View"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 text-gray-700 hover:bg-gray-100"
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
                className={`group relative bg-white dark:bg-slate-900 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl ${isReel ? "hover:border-blue-300" : "hover:border-purple-300 dark:hover:border-purple-600"} transition-all duration-300 transform hover:scale-[1.02] cursor-pointer`}
                onClick={() => handleImageClick(image, index)}
              >
                <div className="aspect-video bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                  {isReel ? (
                    <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative">
                      <Play className="h-16 w-16 text-blue-500" />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        5s
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
                      {isReel ? "Pro" : "HD"}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        className="h-10 w-10 p-0 bg-white/90 hover:bg-white text-gray-700 shadow-lg backdrop-blur-sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleImageClick(image, index)
                        }}
                      >
                        <Maximize className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="h-10 w-10 p-0 bg-white/90 hover:bg-white text-gray-700 shadow-lg backdrop-blur-sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEnhanceClick(index)
                        }}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="h-10 w-10 p-0 bg-white/90 hover:bg-white text-gray-700 shadow-lg backdrop-blur-sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          onImageAction("download", index)
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="h-10 w-10 p-0 bg-white/90 hover:bg-white text-gray-700 shadow-lg backdrop-blur-sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          onImageAction("favorite", index)
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
                          isReel ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {isReel ? `Reel ${index + 1}` : `Creative ${index + 1}`}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs border-gray-300 text-gray-600 dark:border-slate-700 dark:text-slate-400"
                      >
                        {isReel ? "1080×1920" : "1024×576"}
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
                      className={`flex-1 h-8 text-xs text-gray-600 dark:text-slate-300 ${isReel ? "hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/50" : "hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/50"}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        onRegenerateVariation(index)
                      }}
                    >
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Variation
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 h-8 text-xs text-gray-600 dark:text-slate-300 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/50"
                      onClick={(e) => {
                        e.stopPropagation()
                        onImageAction("share", index)
                      }}
                    >
                      <Share2 className="h-3 w-3 mr-1" />
                      Share
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
