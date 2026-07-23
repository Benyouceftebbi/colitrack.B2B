"use client"

import type React from "react"

import { useState } from "react"
import { Sparkles, Zap, ArrowRight } from "lucide-react"

interface AIFeatureCardProps {
  title: string
  description: string
  gradient: string
  icon: React.ElementType
  onClick?: () => void
}

export function AIFeatureCard({ title, description, gradient, icon: Icon, onClick }: AIFeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Animated border */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-lg p-[2px] transition-all duration-300 ${isHovered ? "scale-105" : "scale-100"}`}
      >
        <div className="bg-background rounded-lg h-full w-full"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 rounded-lg bg-background">
        <div className="flex items-center justify-between mb-2">
          <div
            className={`p-2 rounded-lg bg-gradient-to-r ${gradient} text-white transition-transform duration-300 ${isHovered ? "rotate-12 scale-110" : ""}`}
          >
            <Icon size={20} />
          </div>
          <ArrowRight
            size={16}
            className={`text-muted-foreground transition-all duration-300 ${isHovered ? "translate-x-1 text-foreground" : ""}`}
          />
        </div>

        <h3 className="font-semibold text-sm mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>

        {/* Floating elements */}
        {isHovered && (
          <>
            <Sparkles size={12} className="absolute top-2 right-2 text-yellow-400 animate-pulse" />
            <Zap size={10} className="absolute bottom-2 left-2 text-blue-400 animate-bounce" />
          </>
        )}
      </div>

      {/* Glow effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-lg blur-xl opacity-0 transition-opacity duration-300 ${isHovered ? "opacity-20" : ""} -z-10`}
      ></div>
    </div>
  )
}
