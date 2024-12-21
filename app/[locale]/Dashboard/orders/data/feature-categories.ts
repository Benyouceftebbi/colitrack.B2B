import { type FeatureCategory } from '../types/feature'
import {
  Sparkles, Brain, CircuitBoard, Network
} from 'lucide-react'

export const categories: FeatureCategory[] = [
  {
    name: "Quantum AI",
    icon: Sparkles,
    gradient: "from-purple-600 to-pink-600"
  },
  {
    name: "Neural Networks",
    icon: Brain,
    gradient: "from-blue-600 to-cyan-600"
  },
  {
    name: "Autonomous Systems",
    icon: CircuitBoard,
    gradient: "from-green-600 to-emerald-600"
  },
  {
    name: "Edge Computing",
    icon: Network,
    gradient: "from-orange-600 to-red-600"
  }
]