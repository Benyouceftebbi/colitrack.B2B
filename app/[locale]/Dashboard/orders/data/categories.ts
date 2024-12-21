import { type Category } from '../types/feature'
import {
  MessageSquare, BarChart3, Truck, Globe,
  Tags, ShoppingBag,
  Shield,
  HeadphonesIcon
} from 'lucide-react'

export const categories: Category[] = [
  {
    name: "Marketing",
    icon: MessageSquare,
    gradient: "from-violet-600 to-pink-600"
  },
  {
    name: "Analytics",
    icon: BarChart3,
    gradient: "from-blue-600 to-cyan-600"
  },
  {
    name: "Support",
    icon: HeadphonesIcon,
    gradient: "from-orange-600 to-red-600"
  },

  {
    name: "Sales",
    icon: ShoppingBag,
    gradient: "from-blue-600 to-cyan-600"
  }
]