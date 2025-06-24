"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, Brain, Zap, Target, ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20 px-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles size={16} />
            Available Now!
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                AI-Powered
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Creative Studio
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Transform your creative workflow with advanced AI technology. Generate stunning visuals, create engaging
                content, and bring your ideas to life with our intelligent creative platform.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                Try It Now
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-gray-200">
              <div>
                <div className="text-2xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600">Images Generated</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Video Previews</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <Brain className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Intelligent Content Generation</h3>
                  <p className="text-gray-600">
                    Advanced AI algorithms create high-quality images and videos tailored to your specific needs and
                    brand requirements.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <Zap className="text-purple-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning-Fast Processing</h3>
                  <p className="text-gray-600">
                    Generate professional-quality content in seconds, not hours. Our optimized AI models deliver results
                    at unprecedented speed.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <Target className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Precision & Customization</h3>
                  <p className="text-gray-600">
                    Fine-tune every aspect of your content with advanced controls and parameters for pixel-perfect
                    results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-20 text-center">
          <p className="text-gray-500 mb-8">Explore our AI-generated content showcase below</p>
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-300 rounded-full mx-auto">
              <div className="w-1 h-3 bg-gray-400 rounded-full mx-auto mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
