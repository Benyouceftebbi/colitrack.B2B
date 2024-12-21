import { LucideIcon } from 'lucide-react'

export interface Feature {
  title: string
  description: string
  icon: LucideIcon
  timeline: string
  gradient: string
  category: string
}

export interface Category {
  name: string
  icon: LucideIcon
  gradient: string
}