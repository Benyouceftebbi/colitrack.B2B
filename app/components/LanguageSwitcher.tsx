"use client"
import React, { useState, startTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Globe } from 'lucide-react';
import {useRouter, usePathname,} from '@/i18n/routing';
import {useParams} from 'next/navigation';
export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'ar', name: 'العربية' }
  ];
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();
  const router = useRouter();

  function onSelectChange(event: string) {
    const nextLocale = event;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        {pathname, params},
        {locale: nextLocale}
      );
    });
  }
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Change language"
      >
        <Globe className="w-5 h-5 text-gray-600" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code} 
              onClick={() => {
                onSelectChange(lang.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm ${
                locale=== lang.code
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}