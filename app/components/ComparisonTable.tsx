"use client"
import React from 'react';
import { Check, X, AlertCircle } from 'lucide-react';

const features = [
  {
    "category": "Tracking & Delivery Updates",
    "features": [
      {
        "name": "Real-Time Order Tracking Link",
        "tooltip": "Auto tracking link with real-time updates",
        "colitrack": true,
        "competitorA": false,
        "competitorB": false
      },
      {
        "name": "Automated Delivery Updates",
        "tooltip": "Automated SMS notifications for order and delivery updates",
        "colitrack": true,
        "competitorA": false,
        "competitorB": false
      },
      {
        "name": "Delivery Companies Integration",
        "tooltip": "Seamless integration with delivery companies for real-time updates",
        "colitrack": true,
        "competitorA": false,
        "competitorB": false
      }
    ]
  },
  {
    "category": "SMS & Communication",
    "features": [
      {
        "name": "SMS Notifications",
        "tooltip": "Personalized order and delivery SMS",
        "colitrack": true,
        "competitorA": true,
        "competitorB": true
      },
      {
        "name": "SMS Retargeting Campaigns",
        "tooltip": "Automated SMS retargeting campaigns",
        "colitrack": true,
        "competitorA": false,
        "competitorB": true
      },
      {
        "name": "Custom Sender ID",
        "tooltip": "Customizable sender ID (brand name)",
        "colitrack": true,
        "competitorA": true,
        "competitorB": true
      }
    ]
  },
  {
    "category": "AI & Automation",
    "features": [
      {
        "name": "AI Order Automation",
        "tooltip": "AI-driven automation for orders",
        "colitrack": true,
        "competitorA": false,
        "competitorB": false
      }
    ]
  },
  {
    "category": "Pricing & Support",
    "features": [
      {
        "name": "Pricing",
        "tooltip": "Flexible pricing plans",
        "colitrack": true,
        "competitorA": false,
        "competitorB": false
      },
      {
        "name": "Customer Support",
        "tooltip": "24/7 support",
        "colitrack": true,
        "competitorA": false,
        "competitorB": true
      }
    ]
  }
];



const ComparisonTable = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Why Choose Colitrack?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See how we compare to traditional solutions in the market
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
          {/* Header */}
          <div className="grid grid-cols-4 gap-4 p-6 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
            <div className="font-semibold">Features</div>
            <div className="text-center font-semibold">Colitrack</div>
            <div className="text-center font-semibold">Twilio</div>
            <div className="text-center font-semibold">SMS pro+</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {features.map((category) => (
              <div key={category.category}>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 font-semibold text-gray-700 dark:text-gray-300">
                  {category.category}
                </div>
                {category.features.map((feature) => (
                  <div
                    key={feature.name}
                    className="grid grid-cols-4 gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors items-center"
                  >
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      {feature.name}
                      <div className="group relative">
                        <AlertCircle className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-48 p-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                          {feature.tooltip}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      {feature.colitrack ? (
                        <Check className="w-6 h-6 text-green-500" />
                      ) : (
                        <X className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                    <div className="flex justify-center">
                      {feature.competitorA ? (
                        <Check className="w-6 h-6 text-green-500" />
                      ) : (
                        <X className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                    <div className="flex justify-center">
                      {feature.competitorB ? (
                        <Check className="w-6 h-6 text-green-500" />
                      ) : (
                        <X className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Start Your Free Trial
          </button>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;