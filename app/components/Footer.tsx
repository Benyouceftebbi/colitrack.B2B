"use client"
import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, } from 'lucide-react';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t= useTranslations("footer")
  const [isScrolled, setIsScrolled] = useState(false);
  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: t('nav.features'), sectionId: 'features' },
    { label: t('nav.smsAutomation'), sectionId: 'sms-automation' },
    { label: t('nav.analytics'), sectionId: 'analytics' },
    { label: t('nav.demo'), sectionId: 'sms-demo' },
    { label: t('nav.comparison'), sectionId: 'comparison-table' },
    { label: t('nav.ai'), sectionId: 'ai' },
    { label: t('nav.pricing'), sectionId: 'pricing' },
    { label: t('nav.testimonials'), sectionId: 'testimonials' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', sectionId: '#' },
        { label: 'Contact', sectionId: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', sectionId: '#' },
        { label: 'Terms of Service', sectionId: '#' },
      ]
    }
  ];

  const contactInfo = [
    { icon: Mail, text: 'colitrackdz@gmail.com' },
    { icon: Phone, text: '+1 (740) 971-2396' },
    { icon: MapPin, text: "1111B S Governors Ave STE 26234, DoverDE ,19904" }
  ];
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = footerSections[0].links.map(item => document.getElementById(item.sectionId));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [footerSections[0].links]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      setTimeout(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 dark:bg-indigo-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">{t('companyName')}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
            {t('companyDescription')}
            </p>
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-gray-600 dark:text-gray-400">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-gray-900 dark:text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      onClick={() => scrollToSection(link.sectionId)}
                      className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {t('copyright')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;