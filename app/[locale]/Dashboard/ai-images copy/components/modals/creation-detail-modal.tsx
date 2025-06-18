"use client"

import type React from "react"

import { useEffect, useState } from "react" // Added useState
import { X, Video, ImageIcon, Heart, Wand2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { CreationDetail } from "../types"

interface CreationDetailModalProps {
  creation: CreationDetail
  onClose: () => void
  // Removed: onNext, onPrevious, hasNext, hasPrevious
}

// Helper to handle image errors and switch to placeholder
const ImageWithFallback = ({
  src,
  alt,
  className,
  style,
  fallbackText,
}: {
  src: string | undefined
  alt: string
  className?: string
  style?: React.CSSProperties
  fallbackText: string
}) => {
  const [imgSrc, setImgSrc] = useState(src)
  const placeholderUrl = `/placeholder.svg?height=${style?.maxHeight || 200}&width=${style?.maxWidth || 300}&text=${encodeURIComponent(fallbackText)}`

  useEffect(() => {
    setImgSrc(src) // Reset src if the prop changes
  }, [src])

  const handleError = () => {
    setImgSrc(placeholderUrl)
  }

  return <img src={imgSrc || placeholderUrl} alt={alt} className={className} style={style} onError={handleError} />
}

export function CreationDetailModal({
  creation,
  onClose,
  // Removed: onNext, onPrevious, hasNext, hasPrevious
}: CreationDetailModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
      // Removed keyboard navigation for next/previous as it's for single item
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [onClose]) // Dependency array updated

  const formattedCreationDate = creation.createdAt
    ? new Date(creation.createdAt).toLocaleString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null

  const renderReelContent = (videoUrl: string | undefined, baseAltText: string) => {
    if (!videoUrl) {
      return (
        <ImageWithFallback
          src="/placeholder.svg"
          alt="Missing video"
          fallbackText="Video Missing"
          className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
          style={{ maxWidth: "600px", maxHeight: "600px" }}
        />
      )
    }

    return (
      <div className="relative w-full h-full flex items-center justify-center bg-black">
        <video
          controls
          playsInline
          preload="metadata"
          className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
          style={{ maxWidth: "600px", maxHeight: "600px" }}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {creation.duration && (
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
            {creation.duration}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <ImageWithFallback
              src={creation.avatar || "/placeholder.svg"}
              alt={creation.user}
              className="w-10 h-10 rounded-full"
              fallbackText="U"
              style={{ maxWidth: 40, maxHeight: 40 }}
            />
            <div>
              <h3 className="font-semibold">{creation.user}</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge
                  variant="secondary"
                  className={`text-xs ${
                    creation.type === "reel" ? "bg-primary/10 text-primary" : "bg-primary/10 text-primary"
                  }`}
                >
                  {creation.type === "reel" ? (
                    <Video className="h-3 w-3 mr-1" />
                  ) : (
                    <ImageIcon className="h-3 w-3 mr-1" />
                  )}
                  {creation.type === "reel" ? "Reel" : "Image"}
                </Badge>
                <div className="flex items-center gap-1">
                  <Heart className="h-3 w-3 text-destructive" />
                  <span>{creation.likes}</span>
                </div>
                {formattedCreationDate && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{formattedCreationDate}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Removed navigation buttons */}
            <Button variant="ghost" size="sm" onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col h-[calc(90vh-120px)]">
          {/* Before/After Images Section */}
          <div className="flex-1 flex">
            {creation.beforeImage ? (
              <>
                {/* Before Image - Left Side */}
                <div className="flex-1 relative bg-muted flex flex-col items-center justify-center border-r border-border p-4">
                  <div className="absolute top-4 left-4 z-10">
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      Before
                    </Badge>
                  </div>

                  <ImageWithFallback
                    src={creation.beforeImage || "/placeholder.svg"}
                    alt="Before"
                    className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    fallbackText="Before Image"
                  />
                </div>

                {/* After Image - Right Side */}
                <div className="flex-1 relative bg-muted flex flex-col items-center justify-center p-4">
                  <div className="absolute top-4 left-4 z-10">
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      After
                    </Badge>
                  </div>
                  {creation.type === "reel" ? (
                    renderReelContent(creation.image, creation.prompt) // Removed extra boolean arg
                  ) : (
                    <ImageWithFallback
                      src={creation.image || "/placeholder.svg"}
                      alt="After"
                      className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
                      style={{ maxWidth: "400px", maxHeight: "400px" }}
                      fallbackText="After Image"
                    />
                  )}
                </div>
              </>
            ) : (
              /* Single Image - Full Width */
              <div className="flex-1 relative bg-muted flex items-center justify-center p-4">
                {creation.type === "reel" ? (
                  renderReelContent(creation.image, creation.prompt) // Removed extra boolean arg
                ) : (
                  <ImageWithFallback
                    src={creation.image || "/placeholder.svg"}
                    alt={creation.prompt}
                    className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
                    style={{ maxWidth: "600px", maxHeight: "600px" }}
                    fallbackText="Image"
                  />
                )}
              </div>
            )}
          </div>

          {/* Prompt Section - Bottom */}
          <div className="p-6 border-t border-border bg-background">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Wand2 className="h-4 w-4 text-primary" />
              Prompt Used
            </h4>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-foreground leading-relaxed">{creation.prompt}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
