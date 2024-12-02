"use client"
import React from 'react';
import { ArrowRight, CheckCircle2, Zap, Shield, Coins } from 'lucide-react';
import {useRouter} from '@/i18n/routing';
 

const plans = [
  {
    name: 'Starter',
    price: 10,
    tokens: 2400,
    bonus: null,
    features: [
      "160 Orders Link Track and SMS sent",
      "Real-time Order Tracking Link",
      "Automated Delivery Updates",
      "SMS Notifications",
      "Custom Sender ID"
    ]
  },
  {
    name: 'Enterprise',
    price: 100,
    tokens: 24000,
    bonus: 15,
    features: [
      "1840 Orders Link Track and SMS sent",
      "Real-time Order Tracking Link",
      "Automated Delivery Updates",
      "SMS Notifications",
      "Custom Sender ID",
      "SMS Retargeting Campaigns",
      "AI Order Automation",
      "Advanced Analytics",
      "Priority Customer Support"
    ]
  },
  {
    name: 'Business',
    price: 80,
    tokens: 19200,
    bonus: 5,
    features: [
      "1344 Orders Link Track and SMS sent",
      "Real-time Order Tracking Link",
      "Automated Delivery Updates",
      "SMS Notifications",
      "Custom Sender ID",
      "SMS Retargeting Campaigns",
      "AI Order Automation"
    ]
  }
];

const benefits = [
  {
    icon: Zap,
    title: 'Instant Token Credit',
    description: 'Tokens are credited to your account immediately after purchase'
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with 99.9% uptime guarantee'
  },
  {
    icon: Coins,
    title: 'Flexible Usage',
    description: 'Tokens never expire, use them at your own pace'
  }
];

const companyLogos = [
  "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80",
  "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80",
  "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80",
  "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80",
  "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80",
  "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80",
  "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80",
  "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80",
  "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80",
  "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80",
  "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80",
  "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80",
  "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80",
  "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80",
  "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80",
];

export default function CTASection() {
  const router = useRouter();


  const handleGetStarted = () => {
    router.push('/Auth/SignIn');
     
  };
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-50/50 dark:bg-indigo-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-50/50 dark:bg-blue-900/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get the tokens you need to power your SMS communications
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[plans[0], plans[1], plans[2]].map((plan, index) => (
            <div key={plan.name} className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 ${
              index === 1 ? 'md:scale-105 md:-translate-y-4 border-2 border-indigo-500 dark:border-indigo-400' : ''
            }`}>
              {index === 1 && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-indigo-600 dark:bg-indigo-500 text-white px-8 py-2 rounded-full text-sm font-medium whitespace-nowrap">
                  Most Popular
                </div>
              )}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-bold ${index === 1 ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-900 dark:text-white'}`}>
                      ${plan.price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">/one-time</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div className={`p-4 ${index === 1 ? 'bg-indigo-100 dark:bg-indigo-900/50' : 'bg-gray-50 dark:bg-gray-700'} rounded-xl`}>
                  <div className={`text-lg font-semibold ${index === 1 ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-900 dark:text-white'} mb-1`}>
                    {plan.tokens.toLocaleString()} Tokens
                  </div>
                  {plan.bonus && (
                    <div className={`text-sm ${index === 1 ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-300'}`}>
                      +{plan.bonus}% Bonus Tokens FREE
                    </div>
                  )}
                </div>

                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle2 className={`w-5 h-5 ${index === 1 ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500'} flex-shrink-0`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button 
                onClick={handleGetStarted} // Update to use the handleGetStarted function
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 ${
                  index === 1
                    ? 'bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}>
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-8 text-center">
            TRUSTED BY INDUSTRY LEADERS
          </p>
          <div className="relative w-full overflow-hidden">
            <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10" />
            <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10" />
            <div className="flex animate-infinite-scroll">
              {[...companyLogos, ...companyLogos].map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[200px] mx-8 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                >
                  <img
                    src={logo}
                    alt={`Company logo ${index + 1}`}
                    className="w-full h-12 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}