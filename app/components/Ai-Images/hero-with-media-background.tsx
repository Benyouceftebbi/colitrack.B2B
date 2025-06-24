"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../../firebase/firebase"
import { Sparkles, Brain, Zap, Target, ArrowRight, Pause } from "lucide-react"


interface MediaItem {
  id: string
  type: "image" | "reel"
  image: string
  beforeImage?: string
  user: string
  prompt: string
  duration?: string
  createdAt: Date
}

const fallbackMediaItems: MediaItem[] = [
  {
    id: "1",
    type: "image",
    image: "/placeholder.svg?height=300&width=300",
    user: "AI Studio",
    prompt: "Beautiful landscape",
    createdAt: new Date(),
  },
  {
    id: "2",
    type: "reel",
    image: "/placeholder.svg?height=300&width=300",
    user: "AI Studio",
    prompt: "Creative video",
    createdAt: new Date(),
  },
  {
    id: "3",
    type: "image",
    image: "/placeholder.svg?height=300&width=300",
    user: "AI Studio",
    prompt: "Abstract art",
    createdAt: new Date(),
  },
  {
    id: "4",
    type: "image",
    image: "/placeholder.svg?height=300&width=300",
    user: "AI Studio",
    prompt: "Digital painting",
    createdAt: new Date(),
  },
  {
    id: "5",
    type: "reel",
    image: "/placeholder.svg?height=300&width=300",
    user: "AI Studio",
    prompt: "Motion graphics",
    createdAt: new Date(),
  },
  {
    id: "6",
    type: "image",
    image: "/placeholder.svg?height=300&width=300",
    user: "AI Studio",
    prompt: "Portrait art",
    createdAt: new Date(),
  },
  {
    id: "7",
    type: "image",
    image: "/placeholder.svg?height=300&width=300",
    user: "AI Studio",
    prompt: "Fantasy scene",
    createdAt: new Date(),
  },
  {
    id: "8",
    type: "reel",
    image: "/placeholder.svg?height=300&width=300",
    user: "AI Studio",
    prompt: "Animation loop",
    createdAt: new Date(),
  },
  {
    id: "9",
    type: "image",
    image: "/placeholder.svg?height=300&width=300",
    user: "AI Studio",
    prompt: "Sci-fi concept",
    createdAt: new Date(),
  },
  {
    id: "10",
    type: "image",
    image: "/placeholder.svg?height=300&width=300",
    user: "AI Studio",
    prompt: "Nature photography",
    createdAt: new Date(),
  },
  {
    id: "11",
    type: "reel",
    image: "/placeholder.svg?height=300&width=300",
    user: "AI Studio",
    prompt: "Dynamic transition",
    createdAt: new Date(),
  },
  {
    id: "12",
    type: "image",
    image: "/placeholder.svg?height=300&width=300",
    user: "AI Studio",
    prompt: "Minimalist design",
    createdAt: new Date(),
  },
  {
    id: "13",
    type: "image",
    image: "/placeholder.svg?height=300&width=300",
    user: "AI Studio",
    prompt: "Vintage style",
    createdAt: new Date(),
  },
  {
    id: "14",
    type: "reel",
    image: "/placeholder.svg?height=300&width=300",
    user: "AI Studio",
    prompt: "Color explosion",
    createdAt: new Date(),
  },
  {
    id: "15",
    type: "image",
    image: "/placeholder.svg?height=300&width=300",
    user: "AI Studio",
    prompt: "Geometric patterns",
    createdAt: new Date(),
  },
  {
    id: "16",
    type: "image",
    image: "/placeholder.svg?height=300&width=300",
    user: "AI Studio",
    prompt: "Watercolor effect",
    createdAt: new Date(),
  },
  {
    id: "17",
    type: "reel",
    image: "/placeholder.svg?height=300&width=300",
    user: "AI Studio",
    prompt: "Particle system",
    createdAt: new Date(),
  },
  {
    id: "18",
    type: "image",
    image: "/placeholder.svg?height=300&width=300",
    user: "AI Studio",
    prompt: "Urban architecture",
    createdAt: new Date(),
  },
  {
    id: "19",
    type: "image",
    image: "/placeholder.svg?height=300&width=300",
    user: "AI Studio",
    prompt: "Ocean waves",
    createdAt: new Date(),
  },
  {
    id: "20",
    type: "reel",
    image: "/placeholder.svg?height=300&width=300",
    user: "AI Studio",
    prompt: "Light effects",
    createdAt: new Date(),
  },
  {
    id: "21",
    type: "image",
    image: "/placeholder.svg?height=300&width=300",
    user: "AI Studio",
    prompt: "Space exploration",
    createdAt: new Date(),
  },
  {
    id: "22",
    type: "image",
    image: "/placeholder.svg?height=300&width=300",
    user: "AI Studio",
    prompt: "Food photography",
    createdAt: new Date(),
  },
  {
    id: "23",
    type: "reel",
    image: "/placeholder.svg?height=300&width=300",
    user: "AI Studio",
    prompt: "Morphing shapes",
    createdAt: new Date(),
  },
  {
    id: "24",
    type: "image",
    image: "/placeholder.svg?height=300&width=300",
    user: "AI Studio",
    prompt: "Character design",
    createdAt: new Date(),
  },
]

// Utility function to convert Firestore timestamp to Date
const timestampToDate = (timestamp: any): Date => {
  if (timestamp && timestamp.toDate) {
    return timestamp.toDate()
  }
  return new Date()
}

export function HeroWithMediaBackground() {
  const [creativeAiItems, setCreativeAiItems] = useState<MediaItem[]>([])
  const [creativeAiLoading, setCreativeAiLoading] = useState(true)
  const [creativeAiError, setCreativeAiError] = useState<string | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()

  // Fetch data from Firebase
  useEffect(() => {
    const fetchCreativeAiInspirations = async () => {
      setCreativeAiLoading(true)
      setCreativeAiError(null)
      try {
        const creativeAiCollectionRef = collection(db, "CreativeAi")
        const querySnapshot = await getDocs(creativeAiCollectionRef)
        const fetchedItems: MediaItem[] = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          if (data.prompt && data.image && data.type && data.user) {
            fetchedItems.push({
              id: doc.id,
              image: data.image as string,
              beforeImage: data.beforeImage as string | undefined,
              user: data.user as string,
              prompt: data.prompt as string,
              type: data.type as "image" | "reel",
              duration: data.duration as string | undefined,
              createdAt: data.createdAt ? timestampToDate(data.createdAt) : new Date(),
            })
          }
        })
        setCreativeAiItems(fetchedItems)
      } catch (error) {
        console.error("Error fetching CreativeAI inspirations:", error)
        setCreativeAiError("Could not load community inspirations.")
      } finally {
        setCreativeAiLoading(false)
      }
    }
    fetchCreativeAiInspirations()
  }, [])

  // Use creativeAiItems if available, otherwise fallback to placeholder items
  const mediaItems =
    creativeAiItems && Array.isArray(creativeAiItems) && creativeAiItems.length > 0
      ? creativeAiItems
      : fallbackMediaItems

  // Duplicate media items for infinite scroll
  const duplicatedMediaItems = [...mediaItems, ...mediaItems, ...mediaItems]

  useEffect(() => {
    const animate = () => {
      if (!isHovered && containerRef.current) {
        setScrollPosition((prev) => {
          const container = containerRef.current!
          const itemHeight = 300 + 16 // item height + gap
          const totalOriginalHeight = Math.ceil(mediaItems.length / 8) * itemHeight // assuming 8 columns on xl
          const newPosition = prev + 2

          // Reset position when we've scrolled through one complete set
          if (newPosition >= totalOriginalHeight) {
            container.scrollTop = 0
            return 0
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
  }, [isHovered, mediaItems.length])

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div className="relative">
      {/* Available Now Badge - Outside of shadow */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-30">
        <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
          <Sparkles size={16} />
          Available Now!
        </div>
      </div>

      <section className="relative w-full h-[70vh] overflow-hidden">
        {/* Background Media Showcase */}
        <div
          ref={containerRef}
          className="absolute inset-0 overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Media Grid */}
          <div className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {duplicatedMediaItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  {item.type === "image" ? (
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.prompt || "AI Generated Content"}
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

        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70" />

        {/* Pause Overlay */}
        {isHovered && (
          <div className="absolute top-20 left-6 z-20 bg-black/80 dark:bg-white/90 text-white dark:text-black px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-sm">
            <Pause size={16} />
            <span className="text-sm font-medium">Scroll paused</span>
          </div>
        )}

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <div className="max-w-7xl mx-auto w-full">
            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Text Content */}
              <div className="space-y-8 text-center lg:text-left">
                <div className="space-y-6">
                  <h1 className="text-5xl lg:text-6xl font-bold text-white dark:text-gray-100 leading-tight">
                    AI-Powered
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-300 dark:to-purple-300">
                      Creative Studio
                    </span>
                  </h1>

                  <p className="text-xl text-gray-200 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    Transform your creative workflow with advanced AI technology. Generate stunning visuals, create
                    engaging content, and bring your ideas to life with our intelligent creative platform.
                  </p>
                </div>

                {/* CTA Button */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-4 text-lg shadow-xl"
                  >
                    Try It Now
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </div>

                {/* Stats */}
                <div className="flex gap-8 pt-8 border-t border-white/20 dark:border-gray-300/20 justify-center lg:justify-start">
                  <div className="text-center lg:text-left">
                    <div className="text-2xl font-bold text-white dark:text-gray-100">
                      {creativeAiLoading ? "..." : `${mediaItems.length * 10}+`}
                    </div>
                    <div className="text-sm text-gray-300 dark:text-gray-400">Images Generated</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-2xl font-bold text-white dark:text-gray-100">
                      {creativeAiLoading ? "..." : `${mediaItems.filter((item) => item.type === "reel").length * 5}+`}
                    </div>
                    <div className="text-sm text-gray-300 dark:text-gray-400">Reel Previews</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-2xl font-bold text-white dark:text-gray-100">99.9%</div>
                    <div className="text-sm text-gray-300 dark:text-gray-400">Uptime</div>
                  </div>
                </div>
              </div>

              {/* Right Column - Features */}
              <div className="space-y-6">
                <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-white/10 hover:bg-white/15 dark:hover:bg-black/30 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-500/20 dark:bg-blue-400/30 backdrop-blur-sm p-3 rounded-xl border border-blue-400/30 dark:border-blue-300/40">
                      <Brain className="text-blue-300 dark:text-blue-200" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white dark:text-gray-100 mb-2">
                        Intelligent Content Generation
                      </h3>
                      <p className="text-gray-300 dark:text-gray-400">
                        Advanced AI algorithms create high-quality images and reels tailored to your specific needs and
                        brand requirements.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-white/10 hover:bg-white/15 dark:hover:bg-black/30 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-500/20 dark:bg-purple-400/30 backdrop-blur-sm p-3 rounded-xl border border-purple-400/30 dark:border-purple-300/40">
                      <Zap className="text-purple-300 dark:text-purple-200" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white dark:text-gray-100 mb-2">
                        Lightning-Fast Processing
                      </h3>
                      <p className="text-gray-300 dark:text-gray-400">
                        Generate professional-quality content in seconds, not hours. Our optimized AI models deliver
                        results at unprecedented speed.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-white/10 hover:bg-white/15 dark:hover:bg-black/30 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500/20 dark:bg-green-400/30 backdrop-blur-sm p-3 rounded-xl border border-green-400/30 dark:border-green-300/40">
                      <Target className="text-green-300 dark:text-green-200" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white dark:text-gray-100 mb-2">
                        Precision & Customization
                      </h3>
                      <p className="text-gray-300 dark:text-gray-400">
                        Fine-tune every aspect of your content with advanced controls and parameters for pixel-perfect
                        results.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
