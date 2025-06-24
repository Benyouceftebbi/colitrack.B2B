"use client"
import { useState, useEffect, useRef } from "react"
import { initialMessages } from "./data"
import type { Message } from "./types"
import ChatHeader from "./ChatHeader"
import ChatMessage from "./ChatMessage"
import AIResponse from "./AIResponse"

export default function ChatPreview() {
  const [messages, setMessages] = useState<Message[]>([])
  const [showAIResponse, setShowAIResponse] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHighlighted, setIsHighlighted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let currentIndex = 0
    let mounted = true

    const showNextMessage = () => {
      if (!mounted || currentIndex >= initialMessages.length) return

      const nextMessage = initialMessages[currentIndex]
      if (nextMessage?.sender && nextMessage?.content && nextMessage?.timestamp) {
        setMessages((prev) => [...prev, nextMessage])

        setIsHighlighted(true)
        setTimeout(() => setIsHighlighted(false), 200)
      }

      if (currentIndex === initialMessages.length - 1) {
        setTimeout(() => {
          if (mounted) {
            setShowAIResponse(true)
          }
        }, 500)
      }

      currentIndex++
    }

    const interval = setInterval(showNextMessage, 1000)

    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [isVisible])

  return (
    <div
      ref={containerRef}
      className={`w-full max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden transition-all duration-300 border border-white/20 dark:border-gray-700/20 ${
        isHighlighted ? "scale-[1.02] shadow-2xl" : "scale-100"
      }`}
    >
      <ChatHeader />

      <div className="h-[350px] p-5 space-y-4 overflow-y-auto bg-gradient-to-b from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-800/50">
        <div className="text-center mb-6">
          <div className="inline-block px-3 py-1.5 bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full">
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Today 11:24</div>
          </div>
        </div>

        {messages.map((message, index) => (
          <div
            key={index}
            className="animate-slide-up"
            style={{
              animationDelay: `${index * 0.2}s`,
              animationDuration: "0.5s",
            }}
          >
            <ChatMessage message={message} />
          </div>
        ))}

        {showAIResponse && (
          <div className="animate-bounce-in">
            <AIResponse />
          </div>
        )}
      </div>
    </div>
  )
}
