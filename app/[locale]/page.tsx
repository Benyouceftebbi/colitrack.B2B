"use client"
import React from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Stats from '../components/Stats';
import FeatureSection from '../components/FeatureCarousel';
import VideoSection from '../components/VideoSection';
import FeatureShowcase from '../components/FeatureShowcase';
import SMSDemo from '../components/SMSDemo';
import CTASection from '../components/CTASection';
import ComingSoon from '../components/ComingSoon';
import ComparisonTable from '../components/ComparisonTable';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';


export default function App() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-50/30 dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      {/* Hero Section */}
      <header className="pt-32 pb-20 overflow-hidden bg-gradient-to-b from-white to-indigo-50/20 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/50 px-4 py-2 rounded-full mb-8">
              <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Empower Your E-Commerce Business</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
            Transform Your E-commerce Business With 
              <span className="text-indigo-600 dark:text-indigo-400"> Smart SMS Solutions </span>
               and AI Automation
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
            Real-time notifications, enhanced customer satisfaction, and seamless automation for e-commerce businesses.
            </p>
            <div className="flex justify-center gap-6 mb-16">
              <a 
                href="/signin"
                className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg"
              >
                Get Started <ChevronRight className="h-5 w-5" />
              </a>
              <button 
                onClick={() => {
                  const element = document.getElementById('sms-demo');
                  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="px-8 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 transform hover:scale-105"
              >
                Try Demo
              </button>
            </div>
          </div>
        </div>
      </header>
      <Stats />

<section id="features" className="bg-white dark:bg-gray-900">
  <FeatureSection />
</section>

<section id="sms-automation">
  <VideoSection />
</section>

<section id="analytics" className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
  <FeatureShowcase />
</section>

<section id="sms-demo" className="bg-white dark:bg-gray-900">
  <SMSDemo />
</section>

<ComparisonTable />

<ComingSoon />

<section id="pricing" className="bg-gradient-to-b from-white to-indigo-50/30 dark:from-gray-900 dark:to-gray-800">
  <CTASection />
</section>

<Testimonials />

<Footer />

    
    </div>
  );
}