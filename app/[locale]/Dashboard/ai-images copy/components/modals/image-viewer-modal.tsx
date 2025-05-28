"use client"

import { useEffect } from "react"
import { X, ArrowLeft, ArrowRight, Edit3, Download, Share2, Heart } from "lucide-react"
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

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative max-w-7xl w-full h-full flex items-center justify-center">
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

        {/* Image */}
        <div className="relative max-w-full max-h-full">
          <img
            src={image || "/placeholder.svg"}
            alt={`Generated image ${imageIndex + 1}`}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />

          {/* Image Counter */}
          <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
            {imageIndex + 1} of {images.length}
          </div>
        </div>

        {/* Action Bar */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEnhance(imageIndex)}
              className="text-white hover:bg-white/20 flex items-center gap-2"
            >
              <Edit3 className="h-4 w-4" />
              Enhance
            </Button>
            <div className="w-px h-6 bg-white/30" />
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Like
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
