"use client"
import React from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight, MessageSquare, TrendingUp, ShieldCheck } from 'lucide-react';

const solutions = [
  {
    problem: "solutions.solution4.problem",
    solution: "solutions.solution4.solution",
    description: "solutions.solution4.description",
    image: "https://firebasestorage.googleapis.com/v0/b/test-swi3a.appspot.com/o/creativeai_image.png?alt=media&token=4ee4588c-7331-45c5-9a13-dc76b39c8346https://firebasestorage.googleapis.com/v0/b/test-swi3a.appspot.com/o/88561217-dd9f-4487-b8f5-9fbb643456eb.jpg?alt=media&token=7ff2ed8b-3487-4d4c-8d11-0067de7f6319",
    icon: ShieldCheck,
    stats: {
      before: "solutions.solution4.stats.before",
      after: "solutions.solution4.stats.after"
    }
  },
  {
    problem: "solutions.solution3.problem",
    solution: "solutions.solution3.solution",
    description: "solutions.solution3.description",
    image: "https://firebasestorage.googleapis.com/v0/b/test-swi3a.appspot.com/o/88561217-dd9f-4487-b8f5-9fbb643456eb.jpg?alt=media&token=7ff2ed8b-3487-4d4c-8d11-0067de7f6319",
    icon: ShieldCheck,
    stats: {
      before: "solutions.solution3.stats.before",
      after: "solutions.solution3.stats.after"
    }
  },
  {
    problem: "solutions.solution1.problem",
    solution: "solutions.solution1.solution",
    description: "solutions.solution1.description",
    image: "https://firebasestorage.googleapis.com/v0/b/test-swi3a.appspot.com/o/Youcef_Tebbi_Two_contrasting_scenes_of_an_e-commerce_business_o_7c976dda-cfe5-4820-9c91-03e7eabfb4a8.png?alt=media&token=10290f3c-b501-4de8-b3b7-729567a95286",
    icon: MessageSquare,
    stats: {
      before: "solutions.solution1.stats.before",
      after: "solutions.solution1.stats.after"
    }
  },
  {
    problem: "solutions.solution2.problem",
    solution: "solutions.solution2.solution",
    description: "solutions.solution2.description",
    image: "https://firebasestorage.googleapis.com/v0/b/test-swi3a.appspot.com/o/IMG_0530.jpeg?alt=media&token=3f607ab2-6b85-4a30-a892-934a0d84d25c",
    icon: TrendingUp,
    stats: {
      before: "solutions.solution2.stats.before",
      after: "solutions.solution2.stats.after"
    }
  }
 
];

export default function FeatureSection() {
  const t = useTranslations('featureCarousel');

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        

        <div className="space-y-32">
          {solutions.map((item, index) => (
            <div 
              key={item.problem}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-12 items-center`}
            >
              {/* Image Section */}
              <div className="lg:w-1/2 relative group">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={item.image}
                    alt={item.solution}
                    className="w-full h-[400px] object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                
                {/* Stats Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <div className="text-sm opacity-75">{t("Before")}</div>
                      <div className="text-2xl font-bold">{t(item.stats.before)}</div>
                    </div>
                    <div>
                      <div className="text-sm opacity-75">{t("After")}</div>
                      <div className="text-2xl font-bold text-indigo-400">{t(item.stats.after)}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-1/2 space-y-6">
                <div className="inline-flex items-center gap-2 bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 px-4 py-2 rounded-xl text-sm font-medium">
                  <div className="w-8 h-8 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm">
                    <item.icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{t('theProblem')}</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{t(item.problem)}</span>
                </div>

                <div className="inline-flex items-center gap-2 bg-indigo-600 dark:bg-indigo-500 px-4 py-2 rounded-xl text-sm font-medium shadow-lg">
                  <div className="w-8 h-8 bg-indigo-500 dark:bg-indigo-400 rounded-lg flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-indigo-200">{t('ourSolution')}</span>
                  <span className="text-white font-semibold">{t(item.solution)}</span>
                </div>

                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t(item.description)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}