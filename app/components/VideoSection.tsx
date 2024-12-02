"use client"
import React from 'react';
import { Play } from 'lucide-react';

export default function VideoSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">Smart SMS Automation</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Transform the way you engage with your customers. Watch our video to see how our SMS features streamline order updates, 
          enhance customer satisfaction, and drive conversions. With real-time notifications and retargeting campaigns, 
          you can revolutionize your communication strategy and keep customers informed, connected, and loyal.
          </p>
        </div>
        
        <div className="relative mt-16 group max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
              alt="SMS Automation Demo"
              className="w-full h-[400px] object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-white/90 dark:bg-white/80 hover:bg-white hover:scale-110 transform transition-all duration-300 rounded-full p-6 shadow-xl group-hover:shadow-2xl">
                <Play className="w-12 h-12 text-indigo-600 dark:text-indigo-500" fill="currentColor" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}