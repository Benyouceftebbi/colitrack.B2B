"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PhoneInput from './PhoneInput';
import PhonePreview from './PhonePreview';
import { useTranslations } from 'next-intl';
import axios from 'axios';

const services = [
  {
    id: 'tracking',
    title: 'services.tracking.title',
    description: 'services.tracking.description',
    messageTemplate: 'services.tracking.messageTemplate',
    inputLabel: 'services.tracking.inputLabel'
  },
  {
    id: 'delivery',
    title: 'services.delivery.title',
    description: 'services.delivery.description',
    messageTemplate: 'services.delivery.messageTemplate',
    inputLabel: 'services.delivery.inputLabel'
  },
  {
    id: 'retargeting',
    title: 'services.retargeting.title',
    description: 'services.retargeting.description',
    messageTemplate: 'services.retargeting.messageTemplate',
    inputLabel: 'services.retargeting.inputLabel'
  }
];

export default function SMSDemo() {
  const [activeService, setActiveService] = useState(0);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [currentSenderId, setCurrentSenderId] = useState('Colitrack');
  const t=useTranslations('smsDemo')

  const handlePrevious = () => {
    setActiveService((prev) => (prev - 1 + services.length) % services.length);
    setIsMessageSent(false);
  };

  const handleNext = () => {
    setActiveService((prev) => (prev + 1) % services.length);
    setIsMessageSent(false);
  };

  const handleSubmit = async (phoneNumber: string, senderId: string) => {
    let newSms = "";
  
    if (activeService === 0) {
      newSms = `Cher client, votre colis est en route ! Suivez-le ici :  https://colitrack-v1.vercel.app/fr/t?tr=yal-AYET67. Merci !`;
    } else if (activeService === 1) {
      newSms = "Votre commande est en cours de livraison ! Votre chauffeur John (555-0123) arrivera entre 14h00 et 16h00.";
    } else if (activeService === 2) {
      newSms = "Bonjour, Profitez de -10% sur votre prochaine commande avec le code RETOUR10. Dépêchez-vous, l’offre expire bientôt ! 🌟 https://sabyange.com";
    }

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
            {t("title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("description")}
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
                  {t(services[activeService].title)}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {t(services[activeService].description)}
                </p>
              </div>
              <PhoneInput 
                onSubmit={handleSubmit}
                onSenderIdChange={handleSenderIdChange}
                label={t(services[activeService].inputLabel)}
                isMultiNumber={activeService === 2}
              />
            </div>
            <div className="flex justify-center w-full order-2 md:order-2">
              <div className="w-[280px] md:w-[320px]">
                <PhonePreview 
                  isMessageSent={isMessageSent}
                  messageTemplate={t(services[activeService].messageTemplate)}
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