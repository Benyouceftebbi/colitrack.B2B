"use client"
import React from 'react';
import { LucideIcon} from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: string;
}

export default function FeatureCard({ icon: Icon, title, description, delay = '0' }: FeatureCardProps) {
  return (
    <div 
      className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
      style={{ animationDelay: delay }}
    >
      <div className="h-14 w-14 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-100 transition-colors duration-300">
        <Icon className="h-7 w-7 text-indigo-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}