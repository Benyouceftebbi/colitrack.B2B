"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PhoneInput from './PhoneInput';
import PhonePreview from './PhonePreview';

const services = [
  {
    id: 'tracking',
    title: 'Order Tracking',
    description: 'Keep customers informed about their package location and estimated delivery time.',
    messageTemplate: 'Your package (#CT12345) is on its way! Estimated delivery: 2:00 PM - 4:00 PM today. Track here: https://track.co/CT12345',
    inputLabel: 'Enter your phone number to receive a tracking update'
  },
  {
    id: 'delivery',
    title: 'Delivery Updates',
    description: 'Notify customers when their order is out for delivery with driver contact information.',
    messageTemplate: 'Your order is out for delivery! Your driver John (555-0123) will arrive between 2:00 PM - 4:00 PM. Questions? Reply to this message.',
    inputLabel: 'Enter your phone number to receive a delivery update'
  },
  {
    id: 'retargeting',
    title: 'SMS Retargeting',
    description: 'Re-engage customers with personalized promotional messages and offers.',
    messageTemplate: 'Special offer just for you! Get 20% off your next purchase with code WELCOME20. Shop now: https://shop.co/special',
    inputLabel: 'Enter phone numbers (comma-separated) for bulk messaging'
  }
];

export default function SMSDemo() {
  const [activeService, setActiveService] = useState(0);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [currentSenderId, setCurrentSenderId] = useState('Colitrack');

  const handlePrevious = () => {
    setActiveService((prev) => (prev - 1 + services.length) % services.length);
    setIsMessageSent(false);
  };

  const handleNext = () => {
    setActiveService((prev) => (prev + 1) % services.length);
    setIsMessageSent(false);
  };

  const handleSubmit = (phoneNumber: string, senderId: string) => {
    setIsMessageSent(true);
    setCurrentSenderId(senderId);
  };

  const handleSenderIdChange = (senderId: string) => {
    setCurrentSenderId(senderId);
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Experience Our SMS Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Try our different SMS services and see how they can help your business grow
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 lg:-translate-x-24 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg z-10 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 lg:translate-x-24 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg z-10 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Service Content */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="w-full md:max-w-lg order-1 md:order-1">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {services[activeService].title}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {services[activeService].description}
                </p>
              </div>
              <PhoneInput 
                onSubmit={handleSubmit}
                onSenderIdChange={handleSenderIdChange}
                label={services[activeService].inputLabel}
                isMultiNumber={activeService === 2}
              />
            </div>
            <div className="flex justify-center w-full order-2 md:order-2">
              <div className="w-[280px] md:w-[320px]">
                <PhonePreview 
                  isMessageSent={isMessageSent}
                  messageTemplate={services[activeService].messageTemplate}
                  senderId={currentSenderId}
                />
              </div>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-12">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveService(index);
                  setIsMessageSent(false);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeService ? 'w-8 bg-indigo-600 dark:bg-indigo-400' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}