"use client"
import React from 'react';
import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl'; // Import useTranslations

export default function AIResponse() {
  const t = useTranslations('ai.AIResponse'); // Initialize translations

  return (
<div className="border border-indigo-200 dark:border-indigo-800 rounded-xl p-4 bg-indigo-50 dark:bg-indigo-900/20 animate-fade-in-up">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 bg-indigo-600 dark:bg-indigo-500 rounded-full flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-indigo-600 dark:text-indigo-400">{t('title')}</span> {/* Translated title */}
      </div>
      <div className="space-y-2 text-sm">
        <p className="font-medium text-gray-900 dark:text-white">{t('orderDetails')}</p> {/* Translated order details header */}
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
          <li>{t('product')}: {t("productName")}</li> {/* Translated product */}
          <li>{t('size')}: {t("sizeValue")}</li> {/* Translated size */}
          <li>{t('deliveryAddress')}: {t("deliveryAddressValue")}</li> {/* Translated delivery address */}
          <li>{t('status')}: {t("statusValue")}</li> {/* Translated status */}
        </ul>
      </div>
    </div>
  );
}