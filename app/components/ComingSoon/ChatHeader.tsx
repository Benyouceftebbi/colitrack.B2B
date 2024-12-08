"use client"
import { useTranslations } from 'next-intl';
import React from 'react';

export default function ChatHeader() {
  const t=useTranslations("ai.ChatHeader")
  return (
    <div className="bg-indigo-600 p-4 text-white">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full" />
        <div>
          <div className="font-semibold">{t("customerService")}</div>
          <div className="text-xs text-indigo-200">{t("statusOnline")}</div>
        </div>
      </div>
    </div>
  );
}