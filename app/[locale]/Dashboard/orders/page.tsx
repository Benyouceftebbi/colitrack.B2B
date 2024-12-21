"use client"
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { features } from './data/features'
import { FeatureCard } from './components/feature-card'
import { FeatureFilters } from './components/feature-filters'


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredFeatures = selectedCategory
    ? features.filter(feature => feature.category === selectedCategory)
    : features

  return (

    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="container mx-auto space-y-6 sm:space-y-8">
        


        
        <div className="relative max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-cyan-600">
              The Future of AI is Here
            </h1>
            <p className="text-xl dark:text-gray-400 text-gray-600 max-w-3xl mx-auto">
              Experience the next evolution of business intelligence with our quantum-powered AI solutions
            </p>
          </motion.div>

          <FeatureFilters
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory || 'all'}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredFeatures.map((feature, index) => (
                <FeatureCard key={feature.title} feature={feature} variants={itemVariants} />
              ))}
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-20 text-center"
          >
            <div className="inline-block p-1 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full">
              <div className="flex gap-2 dark:bg-black bg-white rounded-full p-1">
                <Button size="lg" className="bg-gradient-to-r from-violet-500 to-cyan-500 text-white border-0 rounded-full hover:opacity-90">
                  Join the Quantum Program
                </Button>
                <Button size="lg" variant="outline" className="rounded-full dark:border-white/10 border-black/10 dark:hover:bg-white/5 hover:bg-black/5">
                  Get Feature Updates
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      </div>

  )
}