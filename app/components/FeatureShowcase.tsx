"use client"
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

const features = [
  {
    title: "features.feature5.title",
    description: "features.feature5.description",
    image: "https://firebasestorage.googleapis.com/v0/b/test-swi3a.appspot.com/o/image%20AI%20colitrack.png?alt=media&token=35a70eac-e4e2-4cf7-96b6-4beff9b4386dhttps://firebasestorage.googleapis.com/v0/b/test-swi3a.appspot.com/o/feature-reels.jpg?alt=media&token=your-token-here",
  },
  {
    title: "features.feature6.title",
    description: "features.feature6.description",
    image: "https://firebasestorage.googleapis.com/v0/b/test-swi3a.appspot.com/o/ai%20order%20retrival.png?alt=media&token=a9ebf96a-5ee7-4978-a15e-f70f3f7c1263https://firebasestorage.googleapis.com/v0/b/test-swi3a.appspot.com/o/feature-reels.jpg?alt=media&token=your-token-here",
  },
  {
    title: "features.feature1.title",
    description:"features.feature1.description",
    image: "https://firebasestorage.googleapis.com/v0/b/test-swi3a.appspot.com/o/74a668d9-4004-4eef-a25e-5ef4051b18f7.jpg?alt=media&token=f52435d1-341f-472b-b930-f313cbc88eeb"
  },
  {
    title: "features.feature2.title",
    description:"features.feature2.description",
    image: "https://firebasestorage.googleapis.com/v0/b/test-swi3a.appspot.com/o/ddf06444-c75c-4f8e-a916-b5cbb00b36fa.jpg?alt=media&token=71693a3b-3949-4ff7-8fd1-b1a6db145421"
  },
  {
    title: "features.feature3.title",
    description:"features.feature3.description",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
  },
  {
    title: "features.feature4.title",
    description:"features.feature4.description",
    image: "https://firebasestorage.googleapis.com/v0/b/test-swi3a.appspot.com/o/9f4ef0c6-98ab-4eea-bdf5-8a8b8ace4678.jpg?alt=media&token=4e64081f-3963-4a7e-a3b7-7f8e95de604e"
  }
];

export default function FeatureShowcase() {
  const [activeFeature, setActiveFeature] = useState(0);
  const t =useTranslations("featureShowcase")
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" id="showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t("mainHeader")}<br /> {t("secondaryHeader")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {t("mainDescription")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Features List */}
          <div className="space-y-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`cursor-pointer group transition-all duration-500 ${
                  index === activeFeature ? 'transform translate-x-4' : ''
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-1 self-stretch rounded transition-all duration-300 ${
                    index === activeFeature ? 'bg-indigo-600 dark:bg-indigo-400' : 'bg-gray-200 dark:bg-gray-700 group-hover:bg-indigo-300 dark:group-hover:bg-indigo-600'
                  }`} />
                  <div>
                    <h3 className={`text-2xl font-semibold mb-3 flex items-center gap-2 transition-colors duration-300 ${
                      index === activeFeature ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-800 dark:text-gray-200'
                    }`}>
                      {t(feature.title)}
                      <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${
                        index === activeFeature ? 'translate-x-1' : ''
                      }`} />
                    </h3>
                    <p className={`text-gray-600 dark:text-gray-300 leading-relaxed transition-all duration-500 ${
                      index === activeFeature 
                        ? 'opacity-100 max-h-32' 
                        : 'opacity-0 max-h-0 overflow-hidden'
                    }`}>
                      {t(feature.description)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Preview */}
          <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`absolute inset-0 transition-all duration-700 transform ${
                  index === activeFeature
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-full opacity-0'
                }`}
              >
                <img 
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">   {t(feature.title)}</h3>
                  <p className="text-white/90">          {t(feature.description)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}