import {
    ShoppingCart, MessageSquare, SmilePlus, Truck, Globe,
    TrendingUp, Tags, Users, BarChart3, ShoppingBag,
    Edit,
    MapPin,
    Crop,
    MessageCircle,
    Mic,
    ShieldAlert,
    Gift,
    Calendar
  } from 'lucide-react'
  import { type Feature } from '../types/feature'
  
  export const features: Feature[] = [
    {
      title: "AI-Powered Order Retrieval from Social Media",
      description: "Automate the retrieval of orders from social media conversations with your customers. Our AI identifies product types, quantities, and even emojis, and seamlessly uploads the data into your delivery system.",
      icon: ShoppingCart,
      timeline: "Coming Q2 2024",
      gradient: "from-violet-600 to-pink-600",
      category: "Sales"
    },
    {
      title: "AI-Generated SMS Campaigns",
      description: "Automatically create personalized SMS campaigns based on advanced user segmentation. Boost engagement with promotional offers, retarget abandoned carts, and send timely reminders, all powered by AI.",
      icon: MessageSquare,
      timeline: "Beta Available Soon",
      gradient: "from-blue-600 to-cyan-600",
      category: "Marketing"
    },
    {
      title: "AI Customer Sentiment Analysis",
      description: "Analyze customer feedback and social media messages to identify sentiment trends. Tailor your responses and campaigns to meet customer expectations, improving satisfaction and loyalty.",
      icon: SmilePlus,
      timeline: "Coming Q3 2024",
      gradient: "from-green-600 to-emerald-600",
      category: "Analytics"
    },
    {
      title: "AI-Powered Multi-Language Customer Support",
      description: "Provide support in multiple languages, including dialects, with AI translation. Improve accessibility for customers worldwide.",
      icon: Globe,
      timeline: "Coming Q3 2025",
      gradient: "from-cyan-600 to-teal-600",
      category: "Support"
    },
    {
      title: "Predictive Sales and Inventory Management",
      description: "Use AI to predict sales trends and optimize inventory. Minimize overstock and stockouts while staying prepared for demand surges.",
      icon: TrendingUp,
      timeline: "Beta Testing",
      gradient: "from-blue-600 to-cyan-600",
      category: "Analytics"
    },
    {
      title: "Dynamic AI Pricing Suggestions",
      description: "Leverage AI to adjust pricing based on market trends, customer behavior, and competitor analysis. Maximize revenue while staying competitive.",
      icon: Tags,
      timeline: "Coming Q1 2025",
      gradient: "from-green-600 to-emerald-600",
      category: "Sales"
    },
    {
      title: "AI-Assisted Customer Retention Recommendations",
      description: "Receive actionable insights on how to retain your most valuable customers. Suggestions are based on AI analysis of engagement patterns and purchase history.",
      icon: Users,
      timeline: "In Development",
      gradient: "from-orange-600 to-red-600",
      category: "Marketing"
    },
    {
      title: "Social Media Ad Performance Optimizer",
      description: "Optimize your ad campaigns with AI. Predict performance, target the right audiences, and maximize ROI.",
      icon: BarChart3,
      timeline: "Coming Q2 2025",
      gradient: "from-violet-600 to-pink-600",
      category: "Marketing"
    },
    {
      title: "SMS-Based Loyalty Rewards System",
      description: "Reward your customers with loyalty points via SMS for every purchase, milestone, or engagement. Customers can redeem these points for discounts or special offers.",
      icon: Gift,
      timeline: "Coming Q4 2024",
      gradient: "from-yellow-600 to-orange-600",
      category: "Marketing"
    },
    {
      title: "Voice-to-Text Order Processing",
      description: "Enable customers to place orders through voice messages. AI transcribes and processes orders seamlessly.",
      icon: Mic,
      timeline: "Coming Q2 2025",
      gradient: "from-orange-600 to-red-600",
      category: "Sales"
    },
    {
      title: "AI Chatbot for Automated Customer Queries",
      description: "Deploy an AI chatbot to handle FAQs, order tracking, and basic inquiries, reducing the load on your customer support team.",
      icon: MessageCircle,
      timeline: "Beta Available Soon",
      gradient: "from-green-600 to-lime-600",
      category: "Support"
    },
    {
      title: "Social Media Automated Posting",
      description: "Streamline your social media management with AI-powered scheduling and posting. Automatically generate and post content tailored to your audience across multiple platforms, saving time and boosting engagement.",
      icon: Calendar,
      timeline: "Coming Q4 2024",
      gradient: "from-pink-600 to-purple-600",
      category: "Marketing"
    },
    {
      title: "Dynamic AI Content Suggestions",
      description: "Generate tailored blog posts, product descriptions, and social media captions based on trending topics and SEO data.",
      icon: Edit,
      timeline: "Coming Q2 2024",
      gradient: "from-teal-600 to-cyan-600",
      category: "Marketing"
    },
    {
      title: "AI Image and Video Creation",
      description: "Create stunning images and videos for your products using AI, tailored to resonate with the Algerian market and dialect. Enhance your marketing efforts with visually appealing content.",
      icon: SmilePlus, // You can choose a different icon if needed
      timeline: "Coming Q3 2025",
      gradient: "from-purple-600 to-pink-600",
      category: "Marketing"
    },
    {
      title: "AI-Powered Cross-Selling and Upselling Recommendations",
      description: "Increase your average order value with AI-driven product recommendations tailored to each customer's preferences.",
      icon: ShoppingBag,
      timeline: "Beta Available Soon",
      gradient: "from-blue-600 to-cyan-600",
      category: "Sales"
    }
  ]