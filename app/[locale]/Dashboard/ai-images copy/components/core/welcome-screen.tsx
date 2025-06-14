"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { CreationDetail } from "@/components/types"
import { ImageIcon, Video, Sparkles, Users, Eye, Heart } from "lucide-react" // Added Heart
import { cn } from "@/lib/utils"

interface WelcomeScreenProps {
  onStartCreation: (type: "image" | "reel") => void
  inspirationItems: CreationDetail[]
  onInspirationClick: (creation: CreationDetail) => void
}

export function WelcomeScreen({ onStartCreation, inspirationItems, onInspirationClick }: WelcomeScreenProps) {
  return (
    <div className="flex-1 bg-white dark:bg-slate-950 p-8 flex flex-col overflow-y-auto">
      {/* Header Section */}
      <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-8 duration-500 ease-out">
        <div className="inline-block p-4 bg-primary/10 rounded-full mb-4 animate-in fade-in zoom-in-90 delay-200 duration-500">
          <Sparkles className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-50 mb-3 animate-in fade-in slide-in-from-bottom-4 delay-100 duration-500">
          Welcome to Colitrack AI Suite
        </h1>
        <p className="text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 delay-200 duration-500">
          Unleash your creativity. Generate stunning images or dynamic reels with the power of AI.
        </p>
      </div>

      {/* Creation Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto w-full">
        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-xl shadow-lg border border-border hover:shadow-primary/20 transition-all duration-300 hover:scale-[1.02] animate-in fade-in slide-in-from-left-10 delay-300 duration-500 ease-out">
          <div className="flex items-center mb-4">
            <ImageIcon className="h-8 w-8 text-purple-500 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-slate-200">Image Generator</h2>
          </div>
          <p className="text-gray-600 dark:text-slate-400 mb-6">
            Craft eye-catching static visuals, from artistic concepts to photorealistic scenes.
          </p>
          <Button
            size="lg"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-transform hover:scale-105"
            onClick={() => onStartCreation("image")}
          >
            <Sparkles className="h-5 w-5 mr-2" /> Create Image
          </Button>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-xl shadow-lg border border-border hover:shadow-primary/20 transition-all duration-300 hover:scale-[1.02] animate-in fade-in slide-in-from-right-10 delay-400 duration-500 ease-out">
          <div className="flex items-center mb-4">
            <Video className="h-8 w-8 text-blue-500 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-slate-200">Reel Generator</h2>
          </div>
          <p className="text-gray-600 dark:text-slate-400 mb-6">
            Bring your images to life by animating them into short, engaging video reels.
          </p>
          <Button
            size="lg"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-transform hover:scale-105"
            onClick={() => onStartCreation("reel")}
          >
            <Sparkles className="h-5 w-5 mr-2" /> Create Reel
          </Button>
        </div>
      </div>

      {/* Inspirations Section */}
      <div className="mt-8 border-t border-border pt-8 animate-in fade-in slide-in-from-bottom-8 delay-500 duration-500 ease-out">
        <div className="flex items-center gap-3 mb-6">
          <Users className="h-6 w-6 text-primary" /> {/* Changed icon color to primary */}
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-slate-200">Community Inspirations</h2>
        </div>
        {inspirationItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {inspirationItems.map((creation, index) => (
              <div
                key={creation.id}
                onClick={() => onInspirationClick(creation)}
                className={cn(
                  "group relative bg-card dark:bg-slate-800/50 rounded-xl border border-border overflow-hidden transition-all duration-300 cursor-pointer",
                  "hover:shadow-xl hover:border-primary/70 hover:-translate-y-1", // Enhanced hover effects
                  "animate-in fade-in zoom-in-95 ease-out",
                )}
                style={{ animationDelay: `${500 + index * 100}ms`, animationFillMode: "both" }}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  {creation.type === "reel" ? (
                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                      <Video className="h-12 w-12 text-primary opacity-70 animate-pulse" /> {/* Pulsing video icon */}
                      {creation.duration && (
                        <Badge
                          variant="secondary"
                          className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5"
                        >
                          {creation.duration}
                        </Badge>
                      )}
                    </div>
                  ) : (
                    <img
                      src={creation.image || "/placeholder.svg?height=300&width=400&text=Inspiration"}
                      alt={creation.prompt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" // Slightly reduced scale for subtlety
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-full bg-white/90 hover:bg-white text-gray-800 dark:bg-slate-200/90 dark:hover:bg-slate-200 dark:text-slate-800 backdrop-blur-sm shadow-md"
                    >
                      <Eye className="h-4 w-4 mr-2" /> View Details
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={creation.avatar || "/placeholder.svg?height=24&width=24&text=U"}
                      alt={creation.user}
                      className="w-6 h-6 rounded-full border border-border"
                    />
                    <span className="text-sm font-semibold text-gray-800 dark:text-slate-200 truncate">
                      {creation.user}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-slate-400 line-clamp-2 mb-3 h-8 leading-relaxed">
                    {creation.prompt}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <Badge
                      variant="outline"
                      className={cn(
                        "border-transparent px-2 py-1",
                        creation.type === "image"
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
                      )}
                    >
                      {creation.type === "image" ? (
                        <ImageIcon className="h-3 w-3 mr-1.5" />
                      ) : (
                        <Video className="h-3 w-3 mr-1.5" />
                      )}
                      {creation.type.charAt(0).toUpperCase() + creation.type.slice(1)}
                    </Badge>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Heart className="h-3.5 w-3.5 text-red-500/80" />
                      {creation.likes}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-slate-400 text-center py-8 animate-in fade-in duration-500">
            No community inspirations to display at the moment.
          </p>
        )}
      </div>
    </div>
  )
}
