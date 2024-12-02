"use client"
import React from 'react';

const stats = [
  { number: '100%', label: 'Real-time updates' },
  { number: '+30%', label: 'Customer satisfaction' },
  { number: '50%', label: 'Fewer inquiries' },
  { number: '+23%', label: 'Conversion boost' },

];

export default function Stats() {
  return (
    <div className="bg-gradient-to-b from-indigo-50/20 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {stats.map((stat, index) => (
          <div key={index} className="text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">{stat.number}</div>
            <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}