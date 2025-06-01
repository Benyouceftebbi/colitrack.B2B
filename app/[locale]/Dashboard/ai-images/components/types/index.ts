export type CreativeMode = "image" | "reel" | "history"

export interface HistoryItem {
  id: string
  type: "image" | "reel"
  prompt: string
  results: string[]
  settings: any
  timestamp: Date
  status: "completed" | "failed"
  metadata?: {
    model?: string // For images
    reelModel?: "normal" | "expert" // For reels
    quality?: string
    duration?: string // Made optional
    aspectRatio?: string
    creativity?: number
  }
}

export interface ChatMessage {
  id: string
  type: "user" | "assistant" | "system"
  content: string
  timestamp: Date
  suggestions?: string[]
  images?: string[]
  metadata?: any
}

export interface CreationDetail {
  id: number
  image: string
  beforeImage?: string
  user: string
  avatar: string
  prompt: string
  likes: number
  type: "image" | "reel"
  duration?: string // Made optional
  settings?: {
    model?: string
    reelModel?: "normal" | "expert"
    aspectRatio?: string
    creativity?: number
    quality?: string
  }
}
