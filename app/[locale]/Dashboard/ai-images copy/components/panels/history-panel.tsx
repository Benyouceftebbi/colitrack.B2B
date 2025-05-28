"use client"

import { useState } from "react"
import {
  History,
  Sparkles,
  ImageIcon,
  Video,
  Clock,
  RefreshCw,
  Search,
  Filter,
  Calendar,
  ExternalLink,
  RotateCw,
  Trash2,
  ChevronRight,
  Play,
  Star,
  Grid3X3,
  Wand2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { HistoryItem } from "../components/types"

interface HistoryPanelProps {
  history: HistoryItem[]
  onOpenHistoryItem: (item: HistoryItem) => void
  onDeleteHistoryItem: (id: string) => void
  onRegenerateFromHistory: (item: HistoryItem) => void
}

export function HistoryPanel({
  history,
  onOpenHistoryItem,
  onDeleteHistoryItem,
  onRegenerateFromHistory,
}: HistoryPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "image" | "reel">("all")
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest")

  const filteredHistory = history
    .filter((item) => {
      const matchesSearch = item.prompt.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = filterType === "all" || item.type === filterType
      return matchesSearch && matchesType
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      }
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    })

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)}d ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  if (history.length === 0) {
    return (
      <div className="flex-1 bg-white/90 backdrop-blur-xl flex items-center justify-center p-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-blue-50/30 -z-10" />
        <div className="text-center max-w-lg">
          <div className="relative mb-8">
            <div className="p-8 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full w-32 h-32 mx-auto flex items-center justify-center border-2 border-emerald-500/30 relative">
              <History className="h-16 w-16 text-emerald-500" />
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce" />
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-300" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Your Creative Journey Starts Here</h3>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Generate your first images or reels to see them appear in your history. Track your creative evolution and
            revisit your favorite generations.
          </p>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              What You'll See Here
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <ImageIcon className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                <span>All your generated images</span>
              </div>
              <div className="flex items-start gap-2">
                <Video className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>Created reels and animations</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>Timestamps and settings used</span>
              </div>
              <div className="flex items-start gap-2">
                <RefreshCw className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>Easy regeneration options</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-white/90 backdrop-blur-xl p-8 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-blue-50/30 -z-10" />

      <div className="h-full flex flex-col">
        {/* Header with Search and Filters */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <History className="h-6 w-6 text-emerald-500" />
                Generation History
              </h3>
              <p className="text-gray-600 mt-1">
                {history.length} generations • {filteredHistory.length} shown
              </p>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search your generations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/70 border-gray-300 text-gray-900 h-11 rounded-xl"
              />
            </div>

            <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
              <SelectTrigger className="w-40 bg-white/70 border-gray-300 text-gray-900 h-11 rounded-xl">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300 rounded-xl">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="image">Images Only</SelectItem>
                <SelectItem value="reel">Reels Only</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-40 bg-white/70 border-gray-300 text-gray-900 h-11 rounded-xl">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300 rounded-xl">
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* History Items */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-4">
            {filteredHistory.map((item) => (
              <div
                key={item.id}
                className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex gap-4">
                  {/* Preview Thumbnails */}
                  <div className="flex-shrink-0">
                    <div className="grid grid-cols-2 gap-2 w-24 h-24">
                      {item.results.slice(0, 4).map((result, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 rounded-lg overflow-hidden border border-gray-200 relative group-hover:scale-105 transition-transform duration-200"
                        >
                          {item.type === "reel" ? (
                            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                              <Play className="h-3 w-3 text-blue-500" />
                            </div>
                          ) : (
                            <img
                              src={result || "/placeholder.svg?height=50&width=50"}
                              alt={`Result ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className={`text-xs font-medium ${
                            item.type === "reel" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {item.type === "reel" ? (
                            <Video className="h-3 w-3 mr-1" />
                          ) : (
                            <ImageIcon className="h-3 w-3 mr-1" />
                          )}
                          {item.type === "reel" ? "Reel" : "Image"}
                        </Badge>
                        <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">
                          {item.results.length} result{item.results.length > 1 ? "s" : ""}
                        </Badge>
                        <span className="text-xs text-gray-500">{formatDate(item.timestamp)}</span>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onOpenHistoryItem(item)}
                          className="h-8 w-8 p-0 text-gray-400 hover:text-emerald-600"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRegenerateFromHistory(item)}
                          className="h-8 w-8 p-0 text-gray-400 hover:text-blue-600"
                        >
                          <RotateCw className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteHistoryItem(item.id)}
                          className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">{item.prompt}</h4>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                      {item.metadata?.model && (
                        <span className="flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          {item.metadata.model}
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
                          {item.metadata.duration}s
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

                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onOpenHistoryItem(item)}
                      className="border-gray-300 text-gray-700 hover:bg-gray-100 group-hover:border-emerald-300 group-hover:text-emerald-700"
                    >
                      Open
                      <ChevronRight className="h-3 w-3 ml-1" />
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
