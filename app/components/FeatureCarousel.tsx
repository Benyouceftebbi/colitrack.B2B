"use client"
import React from 'react';
import { ArrowRight, MessageSquare, TrendingUp, ShieldCheck } from 'lucide-react';

const solutions = [
  {
    problem: "Lack of real-time updates",
    solution: "Automated SMS order status alerts",
    description: "Customers often called manually to ask about the status of their orders, leading to frustration and a surge in inquiries. Additionally, many parcels were returned due to delivery companies failing to contact clients about their orders, resulting in wasted time and resources. Our automated SMS notifications keep customers informed every step of the way, significantly reducing support requests, improving delivery success rates, and enhancing overall satisfaction.",
    image: "https://firebasestorage.googleapis.com/v0/b/test-swi3a.appspot.com/o/Youcef_Tebbi_Two_contrasting_scenes_of_an_e-commerce_business_o_7c976dda-cfe5-4820-9c91-03e7eabfb4a8.png?alt=media&token=10290f3c-b501-4de8-b3b7-729567a95286",
    icon: MessageSquare,
    stats: {
      before: "High volume of inquiries",
      after: "50% reduction in inquiries"
    }
  },
  {
    problem: "Low customer retention",
    solution: "SMS Retargeting Campaigns",
    description: "Don’t let your customers forget your brand. With SMS retargeting, you can reignite their interest with timely and personalized messages. Share irresistible promo codes, announce stunning new collections, and remind them why they fell in love with your products in the first place. Build excitement, nurture loyalty, and watch your audience return with renewed enthusiasm. Every message is a chance to reconnect and inspire.",
    image: "https://firebasestorage.googleapis.com/v0/b/test-swi3a.appspot.com/o/IMG_0530.jpeg?alt=media&token=3f607ab2-6b85-4a30-a892-934a0d84d25c",
    icon: TrendingUp,
    stats: {
      before: "+5% loss of monthly customers",
      after: "+30% customer retention"
    }
  },
  {
    problem: "Manual order entry from social media",
    solution: "AI automation for order extraction",
    description: "Our AI solution streamlines order processing by automatically extracting details from social media chats, using advanced natural language processing to detect order information from emojis, keywords, and conversation context. It seamlessly integrates with websites, retrieving data directly from online checkout forms and order databases. This ensures accurate, real-time updates in the delivery system, eliminating manual entry errors, saving time, and optimizing efficiency for delivery companies.",
    image: "https://firebasestorage.googleapis.com/v0/b/test-swi3a.appspot.com/o/88561217-dd9f-4487-b8f5-9fbb643456eb.jpg?alt=media&token=7ff2ed8b-3487-4d4c-8d11-0067de7f6319",
    icon: ShieldCheck,
    stats: {
        before: "2+ hours",
       after: "< 1 minute"
    }
  }
];

export default function FeatureSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Transform Your E-commerce Operations
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See how our solutions address common e-commerce challenges and revolutionize your business
          </p>
        </div>

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
                      <div className="text-sm opacity-75">Before</div>
                      <div className="text-2xl font-bold">{item.stats.before}</div>
                    </div>
                    <div>
                      <div className="text-sm opacity-75">After</div>
                      <div className="text-2xl font-bold text-indigo-400">{item.stats.after}</div>
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
                  <span className="text-gray-700 dark:text-gray-300">The Problem:</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{item.problem}</span>
                </div>

                <div className="inline-flex items-center gap-2 bg-indigo-600 dark:bg-indigo-500 px-4 py-2 rounded-xl text-sm font-medium shadow-lg">
                  <div className="w-8 h-8 bg-indigo-500 dark:bg-indigo-400 rounded-lg flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-indigo-200">Our Solution:</span>
                  <span className="text-white font-semibold">{item.solution}</span>
                </div>

                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>

                {/*<button className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold group">
                  Learn more about {item.solution}
                  <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                </button>*/}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}