// Sample data for demonstration purposes with the new structure
const wilayas = [
    { name_ar: "بومرداس", name_fr: "Boumerdes" },
    { name_ar: "الجزائر", name_fr: "Alger" },
    { name_ar: "وهران", name_fr: "Oran" },
    { name_ar: "قسنطينة", name_fr: "Constantine" },
    { name_ar: "تيزي وزو", name_fr: "Tizi Ouzou" },
  ];
  
  const communes = [
    { name_ar: "حي 350 مسكن", name_fr: "Hai 350 Maskan" },
    { name_ar: "حي النصر", name_fr: "Hai Ennasr" },
    { name_ar: "المدينة الجديدة", name_fr: "Nouvelle Ville" },
    { name_ar: "الطريق الوطني", name_fr: "Route Nationale" },
    { name_ar: "الزهراء", name_fr: "Zahra" },
  ];
  
  export const orders = Array.from({ length: 10 }, (_, i) => {
    const randomWilaya = wilayas[Math.floor(Math.random() * wilayas.length)];
    const randomCommune = communes[Math.floor(Math.random() * communes.length)];
    const randomPrice = Math.floor(Math.random() * (20000 - 10000 + 1)) + 10000; // Random price between 10000 and 20000
    const randomDeliveryCost = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000; // Random delivery cost between 2000 and 5000
  
    return {
      id: `ORD-${String(i + 1).padStart(3, "0")}`,
      source: "messenger",
      recipientId: `2912542849376981${i}`,
      senderId: `41429745843329${i}`,
      status: "retrieved",
      timestamp: `2025-04-05T00:${28 + i}:59+0100`,
      storePage: "SabyAnge Fashion",
      conversation: [
        {
          message: "Salam ch7al had produit?",
          sender: "client",
          sentAt: `2025-04-04T00:3${i}:29+0000`,
          type: "text",
        },
        {
          message: "سلام أختي مرحبا بيك 🌹",
          sender: "shop",
          sentAt: `2025-04-04T00:3${i + 1}:19+0000`,
          type: "text",
        },
        {
          message: `السعر ${140 + i * 10} الف`,
          sender: "shop",
          sentAt: `2025-04-04T00:3${i + 2}:23+0000`,
          type: "text",
        },
        {
          message: "و التوصيل؟",
          sender: "client",
          sentAt: `2025-04-04T00:3${i + 3}:51+0000`,
          type: "text",
        },
        {
          message: "كاين للمكتب أو للدار، على حساب الولاية",
          sender: "shop",
          sentAt: `2025-04-04T00:3${i + 4}:41+0000`,
          type: "text",
        },
        {
          message: "أنا من الجزائر العاصمة",
          sender: "client",
          sentAt: `2025-04-04T00:3${i + 5}:19+0000`,
          type: "text",
        },
        {
          message: "توصل للمكتب 35 الف و للمنزل 50 الف",
          sender: "shop",
          sentAt: `2025-04-04T00:3${i + 6}:41+0000`,
          type: "text",
        },
        {
          message: "Ok nrslk les infos",
          sender: "client",
          sentAt: `2025-04-04T00:3${i + 7}:25+0000`,
          type: "text",
        },
        {
          message: "بارك الله فيك، ننتظر معلوماتك 🌹",
          sender: "shop",
          sentAt: `2025-04-04T00:3${i + 8}:44+0000`,
          type: "text",
        },
      ],
      orderData: {
      additional_information: {
        confidence: 0.85,
        description: "توصيل متوقع خلال يومين.",
        value: "توصيل متوقع خلال يومين.",
      },
      address: {
        confidence: 0.9,
        value: `عنوان الزبون رقم ${i + 1}، ${randomCommune.name_ar}`,
      },
      articles: [
        {
          name: {
            confidence: 0.95,
            value: "مشد البطن",
          },
          colors: [],
          price_details: [
            {
              price: {
                confidence: 0.95,
                value: randomPrice,
              },
              quantity: {
                confidence: 0.95,
                value: 1,
              },
            },
          ],
          quantity: {
            confidence: 0.95,
            value: 1,
          },
          sizes: [
            {
              confidence: 0.85,
              value: "4 امتار",
            },
          ],
          total_article_price: {
            confidence: 0.95,
            value: randomPrice,
          },
        },
      ],
      client_name: {
        confidence: 0.99,
        value: `زبون رقم ${i + 1}`,
      },
      commune: {
        commune_probability: [
          {
            commune_name: randomCommune.name_ar,
            probability: 0.7,
          },
        ],
        name_ar: {
          confidence: 0.7,
          value: randomCommune.name_ar,
        },
        name_fr: {
          confidence: 0.7,
          value: randomCommune.name_fr,
        },
      },
      delivery_cost: {
        confidence: 0.9,
        value: randomDeliveryCost,
      },
      delivery_date: {
        confidence: 0.85,
        value: "الأحد",
      },
      delivery_type: {
        confidence: 0.9,
        value: i % 2 === 0 ? "stopdesk" : "home",
      },
      message_time: {
        confidence: 0.95,
        value: `2025-04-0${(i % 9) + 1}T0${(i + 1)}:04:30+0000`,
      },
      phone_number: {
        confidence: 0.99,
        value: `05500000${i + 1}`,
      },
      total_price: {
        confidence: 0.9,
        value: randomPrice + randomDeliveryCost,
      },
      wilaya: {
        name_ar: {
          confidence: 0.95,
          value: randomWilaya.name_ar,
        },
        name_fr: {
          confidence: 0.95,
          value: randomWilaya.name_fr,
        },
      },
    }};
  });
  
  // Define types for the order data structure
  export interface OrderConversation {
    message: string
    sender: "client" | "shop"
    sentAt: string
    type: "text" | "image"
    attachment?: string
  }
  
  export interface ConfidenceValue<T> {
    confidence: number
    value: T
  }
  
  export interface Article {
    name: ConfidenceValue<string>
    colors: Array<ConfidenceValue<string>>
    price_details: Array<{
      price: ConfidenceValue<number>
      quantity: ConfidenceValue<number>
    }>
    quantity: ConfidenceValue<number>
    sizes: Array<ConfidenceValue<string>>
    total_article_price: ConfidenceValue<number>
  }
  
  export interface Commune {
    commune_probability: Array<{
      commune_name: string
      probability: number
    }>
    name_ar: ConfidenceValue<string>
    name_fr: ConfidenceValue<string>
  }
  
  export interface OrderData {
    additional_information?: {
      confidence: number
      description: string
      value: string
    }
    address: ConfidenceValue<string>
    articles: Article[]
    client_name: ConfidenceValue<string>
    commune: Commune
    delivery_cost: ConfidenceValue<number>
    delivery_date?: ConfidenceValue<string>
    delivery_type: ConfidenceValue<string>
    message_time: ConfidenceValue<string>
    phone_number: ConfidenceValue<string>
    total_price: ConfidenceValue<number>
    wilaya: {
      name_ar: ConfidenceValue<string>
      name_fr: ConfidenceValue<string>
    }
  }
  
  export interface Order {
    id: string
    source: "messenger" | "instagram"
    recipientId: string
    senderId: string
    status: "retrived" | "pending" | "delivered"
    timestamp: string
    storePage: string
    conversation: OrderConversation[]
    orderData: OrderData
  }
  
  