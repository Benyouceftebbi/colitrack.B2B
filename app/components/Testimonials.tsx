"use client"
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';

const testimonials = [
  {
    name: "Walid",
    role: "E-commerce Manager",
    company: "GRIFA SHOP",
    content: "Colitrack has transformed how we handle order communications. Our customer satisfaction rates have increased by 45% since implementing their SMS automation.",
    rating: 5,
    image: "https://cdn.youcan.shop/stores/230271aba0fb1bc2371a08268a122484/others/vGyDOIW04QW8sA9MpPZlYzhinEEdBkUc4FcsblcJ.png"
  },
  {
    name: "Salah Eddine",
    role: "Manager",
    company: "SABY ANGE",
    content: "The automated tracking updates have significantly reduced our customer service workload.  It is like having an extra team member handling all our shipping communications.",
    rating: 5,
    image: "https://scontent.falg7-1.fna.fbcdn.net/v/t39.30808-1/399351345_347994467908078_257039728288009651_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=107&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=SBF65LcGFGMQ7kNvgEYaggG&_nc_oc=Adjd4jIXuD1SyjBQANcABSwLCF3GaUa-d9Q2XqModjJeavl7_zKJxwgqrw7pVS4fbVc&_nc_zt=24&_nc_ht=scontent.falg7-1.fna&_nc_gid=AtI0CyFwH8sEvsUN2rmzcBY&oh=00_AYE-0TelDpcorIpM4pZkuYcHugU5WKBlQXB22uc1rxMzSQ&oe=67D0D83A"
  },
  {
    name: "Ben Youcef",
    role: "Founder",
    company: "BRUSH MASTER",
    content: "As a small business owner, Colitrack has been a game-changer. The personalized tracking links and automated SMS have given us an enterprise-level customer experience.",
    rating: 5,
    image: "https://scontent.falg6-2.fna.fbcdn.net/v/t39.30808-1/468664651_122111790902600599_3477962108437721999_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=MPXDFwXzYG0Q7kNvgFPndV0&_nc_oc=AdhBHb2wWYDl6SfSGnNaEjnWybEAFZ_j3EOSxniv5OPvt06iut6R6K4BIO5QfvQOf84&_nc_zt=24&_nc_ht=scontent.falg6-2.fna&_nc_gid=AdgeucUjNq6ErCUQxrqNRDk&oh=00_AYHeNDbYBQv-GivhpkNrM07vGiYpDiMfJkPDQ6RDQlNtRg&oe=67D10CB2"
  }
];

export default function Testimonials() {
  const t=useTranslations("testimonials")
  const router =useRouter()
  const handleGetStarted = () => {
    router.push('/Auth/SignIn');
     
  };
  return (
<section className="py-20 bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("trusted_by")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {t("customer_experience")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" />
                ))}
              </div>
              
              <Quote className="w-10 h-10 text-indigo-200 dark:text-indigo-600/20 mb-4" />
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {t(`testimonials.${index}.content`)}
              </p>
              
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                 // alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                  {testimonial.role} {t("at")} {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center bg-indigo-600 dark:bg-indigo-500 rounded-2xl p-12 shadow-xl relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500 dark:bg-indigo-400 rounded-full" />
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-indigo-700 dark:bg-indigo-600 rounded-full" />
          </div>
          
          <div className="relative">
            <h3 className="text-3xl font-bold text-white mb-4">
            {t("ready_to_transform")}
            </h3>
            <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
            {t("join_thousands")}
            </p>
            <button  onClick={handleGetStarted} className="px-8 py-4 bg-white text-indigo-600 dark:text-indigo-500 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
            {t("start_free_trial")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}