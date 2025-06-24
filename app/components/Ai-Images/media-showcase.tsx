"use client"

import { useState, useEffect, useRef } from "react"
import { Pause } from "lucide-react"

interface MediaItem {
  id: string
  type: "image" | "video"
  src: string
}

const mediaItems: MediaItem[] = [
  {
    id: "1",
    type: "image",
    src: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "2",
    type: "video",
    src: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "3",
    type: "image",
    src: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "4",
    type: "image",
    src: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "5",
    type: "video",
    src: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "6",
    type: "image",
    src: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "7",
    type: "image",
    src: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "8",
    type: "video",
    src: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "9",
    type: "image",
    src: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "10",
    type: "image",
    src: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "11",
    type: "video",
    src: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "12",
    type: "image",
    src: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "13",
    type: "image",
    src: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "14",
    type: "video",
    src: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "15",
    type: "image",
    src: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "16",
    type: "image",
    src: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "17",
    type: "video",
    src: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "18",
    type: "image",
    src: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "19",
    type: "image",
    src: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "20",
    type: "video",
    src: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "21",
    type: "image",
    src: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "22",
    type: "image",
    src: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "23",
    type: "video",
    src: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "24",
    type: "image",
    src: "/placeholder.svg?height=300&width=300",
  },
]

export function MediaShowcase() {
  const [isHovered, setIsHovered] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const animate = () => {
      if (!isHovered && containerRef.current) {
        setScrollPosition((prev) => {
          const container = containerRef.current!
          const maxScroll = container.scrollHeight - container.clientHeight
          const newPosition = prev + 2 // Faster scroll speed

          if (newPosition >= maxScroll) {
            return 0 // Reset to top when reaching bottom
          }

          container.scrollTop = newPosition
          return newPosition
        })
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHovered])

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div className="relative w-full">
      <div
        ref={containerRef}
        className="h-[800px] overflow-hidden bg-gray-50 relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Pause Overlay */}
        {isHovered && (
          <div className="absolute top-6 left-6 z-10 bg-black/80 text-white px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-sm">
            <Pause size={16} />
            <span className="text-sm font-medium">Scroll paused</span>
          </div>
        )}

        {/* Media Grid */}
        <div className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {mediaItems.map((item) => (
              <div
                key={item.id}
                className="aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {item.type === "image" ? (
                  <img
                    src={item.src || "/placeholder.svg"}
                    alt="AI Generated Content"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="relative w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent ml-0.5" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
