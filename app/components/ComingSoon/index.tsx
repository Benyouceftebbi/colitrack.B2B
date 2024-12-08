"use client"
import React from 'react';
import { Bot, MessageSquare, Sparkles } from 'lucide-react';
import ChatPreview from './ChatPreview';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';


const features = [
  {
    icon: Bot,
    title: 'AI Order Processing',
    description: 'Automatically detect and process orders from social media conversations'
  },
  {
    icon: MessageSquare,
    title: 'Smart Conversation Analysis',
    description: 'Understand customer intent and extract order details from natural conversations'
  },
  {
    icon: Sparkles,
    title: 'Automated Order Creation',
    description: 'Instantly create orders when confirmation emoji is detected'
  }
];

export default function ComingSoon() {
  const t = useTranslations("ai");

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/50 px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{t('comingSoon')}</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {t('aiPoweredSocialCommerce')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('transformSocialMedia')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Features */}
          <div className="space-y-8">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t(feature.title)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t(feature.description)}
                  </p>
                </div>
              </div>
            ))}

            <div className="pt-8">
            <Link 
                href='/Auth/SignIn' className="px-8 py-4 bg-indigo-600 dark:bg-indigo-500 text-white rounded-xl font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                {t('joinWaitlist')}
              </Link>
            </div>
          </div>

          {/* Interactive Demo */}
          <div className="lg:order-first">
            <ChatPreview />
          </div>
        </div>
      </div>
    </section>
  );
}