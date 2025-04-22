"use client"

import { ArrowUpRight, Box, CheckCircle, Clock, Package, Truck } from "lucide-react"
import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing...")

  useEffect(() => {
    const texts = [
      "Initializing...",
      "Loading delivery analytics...",
      "Preparing optimization tools...",
      "Setting up tracking dashboard...",
      "Almost ready...",
    ]

    let interval: NodeJS.Timeout

    // Simulate loading progress
    interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }

        // Update loading text based on progress
        const textIndex = Math.min(Math.floor(prev / 20), texts.length - 1)
        setLoadingText(texts[textIndex])

        return prev + 1
      })
    }, 40)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        {/* Logo and Name */}
        <div className="mb-8 flex items-center justify-center">
          <div className="relative mr-3">
            <div className="absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-20"></div>
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white">
              <Package className="h-6 w-6" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            Coli<span className="text-blue-500">track</span>
          </h1>
        </div>

        {/* Description */}
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-xl font-medium text-slate-700">Elevate Your E-Commerce Delivery Performance</h2>
          <p className="text-slate-600">
            Comprehensive tools to optimize delivery rates, track packages, and enhance customer satisfaction
          </p>
        </div>

        {/* Features */}
        <div className="mb-8 grid grid-cols-2 gap-4">
          {[
            { icon: Truck, text: "Delivery Optimization" },
            { icon: CheckCircle, text: "Success Rate Analytics" },
            { icon: Clock, text: "Real-time Tracking" },
            { icon: Box, text: "Inventory Management" },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex items-center rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition-all hover:shadow"
            >
              <feature.icon className="mr-2 h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium text-slate-700">{feature.text}</span>
              <ArrowUpRight className="ml-auto h-4 w-4 text-slate-400" />
            </div>
          ))}
        </div>

        {/* Loading Bar */}
        <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-blue-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Loading Text */}
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">{loadingText}</span>
          <span className="font-medium text-slate-700">{progress}%</span>
        </div>
      </div>
    </div>
  )
}
