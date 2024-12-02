"use client"
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import {useTranslations} from 'next-intl';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const  t  = useTranslations();

  const navItems = [
    { label: t('nav.features'), sectionId: 'features' },
    { label: t('nav.smsAutomation'), sectionId: 'sms-automation' },
    { label: t('nav.analytics'), sectionId: 'analytics' },
    { label: t('nav.demo'), sectionId: 'sms-demo' },
    { label: t('nav.pricing'), sectionId: 'pricing' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.map(item => document.getElementById(item.sectionId));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(navItems[index].sectionId);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      setIsMenuOpen(false);

      setTimeout(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm' : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">Colitrack</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button 
                key={item.sectionId}
                onClick={() => scrollToSection(item.sectionId)}
                className={`text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors relative ${
                  activeSection === item.sectionId ? 'text-indigo-600 dark:text-indigo-400' : ''
                }`}
              >
                {item.label}
                {activeSection === item.sectionId && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
                )}
              </button>
            ))}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all duration-300"
            >
              {t('nav.startTrial')}
            </button>
          </div>
          
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <LanguageSwitcher />
            <button 
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-x-0 top-16 bg-white dark:bg-gray-900 shadow-lg md:hidden ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
        style={{ zIndex: 9999 }}
      >
        <div className="px-4 py-6 space-y-4">
          {navItems.map(item => (
            <button
              key={item.sectionId}
              onClick={() => scrollToSection(item.sectionId)}
              className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                activeSection === item.sectionId
                  ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => scrollToSection('pricing')}
            className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            {t('nav.startTrial')}
          </button>
        </div>
      </div>
    </nav>
  );
}