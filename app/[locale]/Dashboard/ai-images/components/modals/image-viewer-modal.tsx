"use client"

import { useEffect } from "react"
import { X, ArrowLeft, ArrowRight, Edit3, Download, Share2, Heart, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageViewerModalProps {
  image: string
  imageIndex: number
  images: string[]
  onClose: () => void
  onNext?: () => void
  onPrevious?: () => void
  onEnhance: (imageIndex: number) => void
  originalPrompt: string
  createdAt?: Date // Added prop for creation timestamp
}

export function ImageViewerModal({
  image,
  imageIndex,
  images,
  onClose,
  onNext,
  onPrevious,
  onEnhance,
  originalPrompt,
  createdAt, // Destructure createdAt
}: ImageViewerModalProps) {
  const hasNext = imageIndex < images.length - 1
  const hasPrevious = imageIndex > 0

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
      if (e.key === "ArrowRight" && hasNext && onNext) {
        onNext()
      }
      if (e.key === "ArrowLeft" && hasPrevious && onPrevious) {
        onPrevious()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [onClose, onNext, onPrevious, hasNext, hasPrevious])

  const formattedCreationDate = createdAt
    ? new Date(createdAt).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative max-w-7xl w-full h-full flex flex-col items-center justify-center">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:bg-white/20 h-10 w-10 p-0"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Navigation Buttons */}
        {hasPrevious && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20 h-12 w-12 p-0"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        )}
        {hasNext && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20 h-12 w-12 p-0"
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
        )}

        {/* Image Counter and Creation Date */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          <div className="bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
            {imageIndex + 1} of {images.length}
          </div>
        </div>

        {/* Image */}
        <div className="relative max-w-full max-h-[calc(100%-120px)]">
          {" "}
          {/* Adjusted max height for bottom bar */}
          <img
            src={image || "/placeholder.svg"}
            alt={`Generated image ${imageIndex + 1}`}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
        </div>

        {/* Creation Timestamp and Action Bar Container */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-auto max-w-[90%]">
          {formattedCreationDate && (
            <div className="text-center mb-2">
              <span className="bg-black/70 text-white px-3 py-1.5 rounded-lg text-xs flex items-center justify-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                Created: {formattedCreationDate}
              </span>
            </div>
          )}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4">
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEnhance(imageIndex)}
                className="text-white hover:bg-white/20 flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm"
              >
                <Edit3 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Enhance
              </Button>
              <div className="w-px h-5 sm:h-6 bg-white/30" />
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm"
              >
                <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Download
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm"
              >
                <Share2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Share
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm"
              >
                <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Like
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
