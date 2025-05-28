"use client"

import { useEffect } from "react"
import { X, ArrowLeft, ArrowRight, Video, ImageIcon, Heart, Play, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { CreationDetail } from "../types"

interface CreationDetailModalProps {
  creation: CreationDetail
  onClose: () => void
  onNext?: () => void
  onPrevious?: () => void
  hasNext?: boolean
  hasPrevious?: boolean
}

export function CreationDetailModal({
  creation,
  onClose,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
}: CreationDetailModalProps) {
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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <img src={creation.avatar || "/placeholder.svg"} alt={creation.user} className="w-10 h-10 rounded-full" />
            <div>
              <h3 className="font-semibold">{creation.user}</h3>
              <div className="flex items-center gap-2">
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
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Heart className="h-3 w-3 text-destructive" />
                  <span>{creation.likes}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Navigation buttons */}
            {hasPrevious && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onPrevious}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            {hasNext && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onNext}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}

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
                <div className="flex-1 relative bg-muted flex flex-col items-center justify-center border-r border-border">
                  <div className="absolute top-4 left-4 z-10">
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      Before
                    </Badge>
                  </div>

                  {creation.type === "reel" ? (
                    <div className="w-80 h-80 bg-gradient-to-br from-muted to-muted rounded-xl flex items-center justify-center relative shadow-lg">
                      <ImageIcon className="h-20 w-20 text-muted-foreground" />
                    </div>
                  ) : (
                    <img
                      src={creation.beforeImage || "/placeholder.svg"}
                      alt="Before"
                      className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
                      style={{ maxWidth: "400px", maxHeight: "400px" }}
                    />
                  )}
                </div>

                {/* After Image - Right Side */}
                <div className="flex-1 relative bg-muted flex flex-col items-center justify-center">
                  <div className="absolute top-4 left-4 z-10">
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      After
                    </Badge>
                  </div>

                  {creation.type === "reel" ? (
                    <div className="w-80 h-80 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center relative shadow-lg">
                      <Play className="h-20 w-20 text-primary" />
                      {creation.duration && (
                        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                          {creation.duration}
                        </div>
                      )}
                    </div>
                  ) : (
                    <img
                      src={creation.image || "/placeholder.svg"}
                      alt="After"
                      className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
                      style={{ maxWidth: "400px", maxHeight: "400px" }}
                    />
                  )}
                </div>
              </>
            ) : (
              /* Single Image - Full Width */
              <div className="flex-1 relative bg-muted flex items-center justify-center">
                {creation.type === "reel" ? (
                  <div className="w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center relative shadow-lg">
                    <Play className="h-20 w-20 text-primary" />
                    {creation.duration && (
                      <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                        {creation.duration}
                      </div>
                    )}
                  </div>
                ) : (
                  <img
                    src={creation.image || "/placeholder.svg"}
                    alt={creation.prompt}
                    className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
                    style={{ maxWidth: "600px", maxHeight: "600px" }}
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
