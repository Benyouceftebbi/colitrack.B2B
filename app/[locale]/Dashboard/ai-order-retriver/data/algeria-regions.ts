// This file contains the 58 Wilayas of Algeria and their respective Communes

export interface Commune {
    id: number
    namefr: string
    namear: string
  }
  
  export interface Wilaya {
    id: number
    namefr: string
    namear: string
    communes: Commune[]
  }
  
  export const wilayas: Wilaya[] = [
    {
      id: 1,
      namefr: "Adrar",
      namear: "أدرار",
      communes: [
        { id: 101, namefr: "Adrar", namear: "أدرار" },
        { id: 102, namefr: "Tamest", namear: "تامست" },
        { id: 103, namefr: "Reggane", namear: "رقان" },
        { id: 104, namefr: "In Zghmir", namear: "إن زغمير" },
        { id: 105, namefr: "Tit", namear: "تيت" },
        { id: 106, namefr: "Sali", namear: "سالي" },
        { id: 107, namefr: "Akabli", namear: "أكابلي" },
        { id: 108, namefr: "Ouled Ahmed Tammi", namear: "أولاد أحمد تمي" },
        { id: 109, namefr: "Bouda", namear: "بودة" },
        { id: 110, namefr: "Aoulef", namear: "أولف" },
        { id: 111, namefr: "Timekten", namear: "تيمقتن" },
        { id: 112, namefr: "Tamentit", namear: "تمنطيط" },
        { id: 113, namefr: "Fenoughil", namear: "فنوغيل" },
        { id: 114, namefr: "Tit", namear: "تيت" },
        { id: 115, namefr: "Tsabit", namear: "تسابيت" },
        { id: 116, namefr: "Sebaa", namear: "سبع" },
        { id: 117, namefr: "Ouled Saïd", namear: "أولاد سعيد" },
        { id: 118, namefr: "Timiaouine", namear: "تيمياوين" },
        { id: 119, namefr: "Zaouiet Kounta", namear: "زاوية كنتة" },
      ],
    },
    {
      id: 2,
      namefr: "Chlef",
      namear: "الشلف",
      communes: [
        { id: 201, namefr: "Chlef", namear: "الشلف" },
        { id: 202, namefr: "Ténès", namear: "تنس" },
        { id: 203, namefr: "Bénairia", namear: "بناريا" },
        { id: 204, namefr: "El Karimia", namear: "الكريمية" },
        { id: 205, namefr: "Tadjena", namear: "تاجنة" },
        { id: 206, namefr: "Taougrite", namear: "تاوقريت" },
        { id: 207, namefr: "Beni Haoua", namear: "بني حواء" },
        { id: 208, namefr: "Sobha", namear: "صبحة" },
        { id: 209, namefr: "Harchoun", namear: "حرشون" },
        { id: 210, namefr: "Ouled Fares", namear: "أولاد فارس" },
        { id: 211, namefr: "Sidi Akkacha", namear: "سيدي عكاشة" },
        { id: 212, namefr: "Boukadir", namear: "بوقادير" },
        { id: 213, namefr: "Beni Rached", namear: "بني راشد" },
        { id: 214, namefr: "Talassa", namear: "تلاسة" },
        { id: 215, namefr: "Harenfa", namear: "حرنفة" },
        { id: 216, namefr: "Oued Goussine", namear: "وادي قوسين" },
        { id: 217, namefr: "Dahra", namear: "الظهرة" },
        { id: 218, namefr: "Ouled Abbes", namear: "أولاد عباس" },
        { id: 219, namefr: "Sendjas", namear: "سنجاس" },
        { id: 220, namefr: "Zeboudja", namear: "الزبوجة" },
        { id: 221, namefr: "Oued Sly", namear: "وادي سلي" },
        { id: 222, namefr: "Abou El Hassan", namear: "أبو الحسن" },
        { id: 223, namefr: "El Marsa", namear: "المرسى" },
        { id: 224, namefr: "Chettia", namear: "الشطية" },
        { id: 225, namefr: "Sidi Abderrahmane", namear: "سيدي عبد الرحمن" },
        { id: 226, namefr: "Moussadek", namear: "مصدق" },
        { id: 227, namefr: "El Hadjadj", namear: "الحجاج" },
        { id: 228, namefr: "Labiod Medjadja", namear: "الأبيض مجاجة" },
        { id: 229, namefr: "Oued Fodda", namear: "وادي الفضة" },
        { id: 230, namefr: "Ouled Ben Abdelkader", namear: "أولاد بن عبد القادر" },
        { id: 231, namefr: "Bouzeghaia", namear: "بوزغاية" },
        { id: 232, namefr: "Aïn Merane", namear: "عين مران" },
        { id: 233, namefr: "Oum Drou", namear: "أم الدروع" },
        { id: 234, namefr: "Breira", namear: "بريرة" },
        { id: 235, namefr: "Beni Bouateb", namear: "بني بوعتب" },
      ],
    },
    {
      id: 3,
      namefr: "Laghouat",
      namear: "الأغواط",
      communes: [
        { id: 301, namefr: "Laghouat", namear: "الأغواط" },
        { id: 302, namefr: "Ksar El Hirane", namear: "قصر الحيران" },
        { id: 303, namefr: "Bennasser Benchohra", namear: "بن ناصر بن شهرة" },
        { id: 304, namefr: "Sidi Makhlouf", namear: "سيدي مخلوف" },
        { id: 305, namefr: "Hassi Delaa", namear: "حاسي الدلاعة" },
        { id: 306, namefr: "Hassi R'Mel", namear: "حاسي الرمل" },
        { id: 307, namefr: "Aïn Madhi", namear: "عين ماضي" },
        { id: 308, namefr: "Tadjemout", namear: "تاجموت" },
        { id: 309, namefr: "Kheneg", namear: "الخنق" },
        { id: 310, namefr: "Gueltat Sidi Saad", namear: "قلتة سيدي سعد" },
        { id: 311, namefr: "Aïn Sidi Ali", namear: "عين سيدي علي" },
        { id: 312, namefr: "Beidha", namear: "البيضاء" },
        { id: 313, namefr: "Brida", namear: "بريدة" },
        { id: 314, namefr: "El Ghicha", namear: "الغيشة" },
        { id: 315, namefr: "Hadj Mechri", namear: "الحاج مشري" },
        { id: 316, namefr: "Sebgag", namear: "سبقاق" },
        { id: 317, namefr: "Taouiala", namear: "الطويلة" },
        { id: 318, namefr: "Tadjrouna", namear: "تاجرونة" },
        { id: 319, namefr: "Aflou", namear: "أفلو" },
        { id: 320, namefr: "El Assafia", namear: "العسافية" },
        { id: 321, namefr: "Oued Morra", namear: "وادي مرة" },
        { id: 322, namefr: "Oued M'Zi", namear: "وادي مزي" },
        { id: 323, namefr: "El Houaita", namear: "الحويطة" },
        { id: 324, namefr: "Sidi Bouzid", namear: "سيدي بوزيد" },
      ],
    },
    {
      id: 4,
      namefr: "Oum El Bouaghi",
      namear: "أم البواقي",
      communes: [
        { id: 401, namefr: "Oum El Bouaghi", namear: "أم البواقي" },
        { id: 402, namefr: "Aïn Beïda", namear: "عين البيضاء" },
        { id: 403, namefr: "Aïn M'lila", namear: "عين مليلة" },
      ],
    },
    {
      id: 5,
      namefr: "Batna",
      namear: "باتنة",
      communes: [
        { id: 501, namefr: "Batna", namear: "باتنة" },
        { id: 502, namefr: "Barika", namear: "بريكة" },
        { id: 503, namefr: "Arris", namear: "أريس" },
      ],
    },
    {
      id: 6,
      namefr: "Béjaïa",
      namear: "بجاية",
      communes: [
        { id: 601, namefr: "Béjaïa", namear: "بجاية" },
        { id: 602, namefr: "Akbou", namear: "أقبو" },
        { id: 603, namefr: "Souk El Ténine", namear: "سوق الإثنين" },
      ],
    },
    {
      id: 7,
      namefr: "Biskra",
      namear: "بسكرة",
      communes: [
        { id: 701, namefr: "Biskra", namear: "بسكرة" },
        { id: 702, namefr: "Tolga", namear: "طولقة" },
        { id: 703, namefr: "Ouled Djellal", namear: "أولاد جلال" },
      ],
    },
    {
      id: 8,
      namefr: "Béchar",
      namear: "بشار",
      communes: [
        { id: 801, namefr: "Béchar", namear: "بشار" },
        { id: 802, namefr: "Abadla", namear: "العبادلة" },
        { id: 803, namefr: "Béni Abbès", namear: "بني عباس" },
      ],
    },
    {
      id: 9,
      namefr: "Blida",
      namear: "البليدة",
      communes: [
        { id: 901, namefr: "Blida", namear: "البليدة" },
        { id: 902, namefr: "Boufarik", namear: "بوفاريك" },
        { id: 903, namefr: "Mouzaïa", namear: "موزاية" },
      ],
    },
    {
      id: 10,
      namefr: "Bouira",
      namear: "البويرة",
      communes: [
        { id: 1001, namefr: "Bouira", namear: "البويرة" },
        { id: 1002, namefr: "Lakhdaria", namear: "الأخضرية" },
        { id: 1003, namefr: "Sour El Ghozlane", namear: "سور الغزلان" },
      ],
    },
    {
      id: 11,
      namefr: "Tamanrasset",
      namear: "تمنراست",
      communes: [
        { id: 1101, namefr: "Tamanrasset", namear: "تمنراست" },
        { id: 1102, namefr: "In Salah", namear: "عين صالح" },
        { id: 1103, namefr: "In Guezzam", namear: "عين قزام" },
      ],
    },
    {
      id: 12,
      namefr: "Tébessa",
      namear: "تبسة",
      communes: [
        { id: 1201, namefr: "Tébessa", namear: "تبسة" },
        { id: 1202, namefr: "Bir el-Ater", namear: "بئر العاتر" },
        { id: 1203, namefr: "Cheria", namear: "الشريعة" },
      ],
    },
    {
      id: 13,
      namefr: "Tlemcen",
      namear: "تلمسان",
      communes: [
        { id: 1301, namefr: "Tlemcen", namear: "تلمسان" },
        { id: 1302, namefr: "Maghnia", namear: "مغنية" },
        { id: 1303, namefr: "Ghazaouet", namear: "الغزوات" },
      ],
    },
    {
      id: 14,
      namefr: "Tiaret",
      namear: "تيارت",
      communes: [
        { id: 1401, namefr: "Tiaret", namear: "تيارت" },
        { id: 1402, namefr: "Frenda", namear: "فرندة" },
        { id: 1403, namefr: "Ksar Chellala", namear: "قصر الشلالة" },
      ],
    },
    {
      id: 15,
      namefr: "Tizi Ouzou",
      namear: "تيزي وزو",
      communes: [
        { id: 1501, namefr: "Tizi Ouzou", namear: "تيزي وزو" },
        { id: 1502, namefr: "Azazga", namear: "عزازقة" },
        { id: 1503, namefr: "Draâ El Mizan", namear: "ذراع الميزان" },
      ],
    },
    {
      id: 16,
      namefr: "Alger",
      namear: "الجزائر",
      communes: [
        { id: 1601, namefr: "Alger Centre", namear: "الجزائر الوسطى" },
        { id: 1602, namefr: "Bab El Oued", namear: "باب الوادي" },
        { id: 1603, namefr: "Hussein Dey", namear: "حسين داي" },
        { id: 1604, namefr: "El Harrach", namear: "الحراش" },
        { id: 1605, namefr: "Bab Ezzouar", namear: "باب الزوار" },
        { id: 1606, namefr: "Dar El Beïda", namear: "الدار البيضاء" },
        { id: 1607, namefr: "Birtouta", namear: "بئر توتة" },
        { id: 1608, namefr: "Zeralda", namear: "زرالدة" },
      ],
    },
    {
      id: 17,
      namefr: "Djelfa",
      namear: "الجلفة",
      communes: [
        { id: 1701, namefr: "Djelfa", namear: "الجلفة" },
        { id: 1702, namefr: "Aïn Oussera", namear: "عين وسارة" },
        { id: 1703, namefr: "Messaad", namear: "مسعد" },
      ],
    },
    {
      id: 18,
      namefr: "Jijel",
      namear: "جيجل",
      communes: [
        { id: 1801, namefr: "Jijel", namear: "جيجل" },
        { id: 1802, namefr: "Taher", namear: "الطاهير" },
        { id: 1803, namefr: "El Milia", namear: "الميلية" },
      ],
    },
    {
      id: 19,
      namefr: "Sétif",
      namear: "سطيف",
      communes: [
        { id: 1901, namefr: "Sétif", namear: "سطيف" },
        { id: 1902, namefr: "El Eulma", namear: "العلمة" },
        { id: 1903, namefr: "Aïn Oulmene", namear: "عين ولمان" },
      ],
    },
    {
      id: 20,
      namefr: "Saïda",
      namear: "سعيدة",
      communes: [
        { id: 2001, namefr: "Saïda", namear: "سعيدة" },
        { id: 2002, namefr: "Youb", namear: "يوب" },
        { id: 2003, namefr: "Aïn El Hadjar", namear: "عين الحجر" },
      ],
    },
    {
      id: 21,
      namefr: "Skikda",
      namear: "سكيكدة",
      communes: [
        { id: 2101, namefr: "Skikda", namear: "سكيكدة" },
        { id: 2102, namefr: "Collo", namear: "القل" },
        { id: 2103, namefr: "Azzaba", namear: "عزابة" },
      ],
    },
    {
      id: 22,
      namefr: "Sidi Bel Abbès",
      namear: "سيدي بلعباس",
      communes: [
        { id: 2201, namefr: "Sidi Bel Abbès", namear: "سيدي بلعباس" },
        { id: 2202, namefr: "Telagh", namear: "تلاغ" },
        { id: 2203, namefr: "Sfisef", namear: "سفيزف" },
      ],
    },
    {
      id: 23,
      namefr: "Annaba",
      namear: "عنابة",
      communes: [
        { id: 2301, namefr: "Annaba", namear: "عنابة" },
        { id: 2302, namefr: "El Bouni", namear: "البوني" },
        { id: 2303, namefr: "Berrahal", namear: "برحال" },
      ],
    },
    {
      id: 24,
      namefr: "Guelma",
      namear: "قالمة",
      communes: [
        { id: 2401, namefr: "Guelma", namear: "قالمة" },
        { id: 2402, namefr: "Oued Zenati", namear: "وادي الزناتي" },
        { id: 2403, namefr: "Bouchegouf", namear: "بوشقوف" },
      ],
    },
    {
      id: 25,
      namefr: "Constantine",
      namear: "قسنطينة",
      communes: [
        { id: 2501, namefr: "Constantine", namear: "قسنطينة" },
        { id: 2502, namefr: "El Khroub", namear: "الخروب" },
        { id: 2503, namefr: "Hamma Bouziane", namear: "حامة بوزيان" },
        { id: 2504, namefr: "Didouche Mourad", namear: "ديدوش مراد" },
        { id: 2505, namefr: "Zighoud Youcef", namear: "زيغود يوسف" },
      ],
    },
    {
      id: 26,
      namefr: "Médéa",
      namear: "المدية",
      communes: [
        { id: 2601, namefr: "Médéa", namear: "المدية" },
        { id: 2602, namefr: "Berrouaghia", namear: "البرواقية" },
        { id: 2603, namefr: "Ksar El Boukhari", namear: "قصر البخاري" },
      ],
    },
    {
      id: 27,
      namefr: "Mostaganem",
      namear: "مستغانم",
      communes: [
        { id: 2701, namefr: "Mostaganem", namear: "مستغانم" },
        { id: 2702, namefr: "Aïn Tédelès", namear: "عين تادلس" },
        { id: 2703, namefr: "Sidi Ali", namear: "سيدي علي" },
      ],
    },
    {
      id: 28,
      namefr: "M'Sila",
      namear: "المسيلة",
      communes: [
        { id: 2801, namefr: "M'Sila", namear: "المسيلة" },
        { id: 2802, namefr: "Bou Saâda", namear: "بوسعادة" },
        { id: 2803, namefr: "Sidi Aïssa", namear: "سيدي عيسى" },
      ],
    },
    {
      id: 29,
      namefr: "Mascara",
      namear: "معسكر",
      communes: [
        { id: 2901, namefr: "Mascara", namear: "معسكر" },
        { id: 2902, namefr: "Sig", namear: "سيق" },
        { id: 2903, namefr: "Mohammadia", namear: "المحمدية" },
      ],
    },
    {
      id: 30,
      namefr: "Ouargla",
      namear: "ورقلة",
      communes: [
        { id: 3001, namefr: "Ouargla", namear: "ورقلة" },
        { id: 3002, namefr: "Hassi Messaoud", namear: "حاسي مسعود" },
        { id: 3003, namefr: "Touggourt", namear: "تقرت" },
      ],
    },
    {
      id: 31,
      namefr: "Oran",
      namear: "وهران",
      communes: [
        { id: 3101, namefr: "Oran", namear: "وهران" },
        { id: 3102, namefr: "Bir El Djir", namear: "بئر الجير" },
        { id: 3103, namefr: "Es Sénia", namear: "السانية" },
        { id: 3104, namefr: "Arzew", namear: "أرزيو" },
        { id: 3105, namefr: "Bethioua", namear: "بطيوة" },
      ],
    },
    {
      id: 32,
      namefr: "El Bayadh",
      namear: "البيض",
      communes: [
        { id: 3201, namefr: "El Bayadh", namear: "البيض" },
        { id: 3202, namefr: "Labiodh Sidi Cheikh", namear: "الأبيض سيدي الشيخ" },
        { id: 3203, namefr: "Brezina", namear: "بريزينة" },
      ],
    },
    {
      id: 33,
      namefr: "Illizi",
      namear: "إليزي",
      communes: [
        { id: 3301, namefr: "Illizi", namear: "إليزي" },
        { id: 3302, namefr: "Djanet", namear: "جانت" },
        { id: 3303, namefr: "In Amenas", namear: "عين أمناس" },
      ],
    },
    {
      id: 34,
      namefr: "Bordj Bou Arreridj",
      namear: "برج بوعريريج",
      communes: [
        { id: 3401, namefr: "Bordj Bou Arreridj", namear: "برج بوعريريج" },
        { id: 3402, namefr: "Ras El Oued", namear: "رأس الوادي" },
        { id: 3403, namefr: "Mansourah", namear: "المنصورة" },
      ],
    },
    {
      id: 35,
      namefr: "Boumerdès",
      namear: "بومرداس",
      communes: [
        { id: 3501, namefr: "Boumerdès", namear: "بومرداس" },
        { id: 3502, namefr: "Bordj Menaïel", namear: "برج منايل" },
        { id: 3503, namefr: "Dellys", namear: "دلس" },
        { id: 3504, namefr: "Thénia", namear: "الثنية" },
        { id: 3505, namefr: "Boudouaou", namear: "بودواو" },
        { id: 3506, namefr: "Khemis El Khechna", namear: "خميس الخشنة" },
        { id: 3507, namefr: "Corso", namear: "قورصو" },
        { id: 3508, namefr: "Tidjelabine", namear: "تيج��ابين" },
        { id: 3509, namefr: "Isser", namear: "يسر" },
        { id: 3510, namefr: "Naciria", namear: "الناصرية" },
        { id: 3511, namefr: "Hammedi", namear: "حمادي" },
        { id: 3512, namefr: "Ouled Moussa", namear: "أولاد موسى" },
      ],
    },
    {
      id: 36,
      namefr: "El Tarf",
      namear: "الطارف",
      communes: [
        { id: 3601, namefr: "El Tarf", namear: "الطارف" },
        { id: 3602, namefr: "El Kala", namear: "القالة" },
        { id: 3603, namefr: "Bouhadjar", namear: "بوحجار" },
      ],
    },
    {
      id: 37,
      namefr: "Tindouf",
      namear: "تندوف",
      communes: [
        { id: 3701, namefr: "Tindouf", namear: "تندوف" },
        { id: 3702, namefr: "Oum El Assel", namear: "أم العسل" },
      ],
    },
    {
      id: 38,
      namefr: "Tissemsilt",
      namear: "تيسمسيلت",
      communes: [
        { id: 3801, namefr: "Tissemsilt", namear: "تيسمسيلت" },
        { id: 3802, namefr: "Theniet El Had", namear: "ثنية الأحد" },
        { id: 3803, namefr: "Bordj Bou Naama", namear: "برج بونعامة" },
      ],
    },
    {
      id: 39,
      namefr: "El Oued",
      namear: "الوادي",
      communes: [
        { id: 3901, namefr: "El Oued", namear: "الوادي" },
        { id: 3902, namefr: "Djamaa", namear: "جامعة" },
        { id: 3903, namefr: "Debila", namear: "الدبيلة" },
      ],
    },
    {
      id: 40,
      namefr: "Khenchela",
      namear: "خنشلة",
      communes: [
        { id: 4001, namefr: "Khenchela", namear: "خنشلة" },
        { id: 4002, namefr: "Kais", namear: "قايس" },
        { id: 4003, namefr: "Chechar", namear: "ششار" },
      ],
    },
    {
      id: 41,
      namefr: "Souk Ahras",
      namear: "سوق أهراس",
      communes: [
        { id: 4101, namefr: "Souk Ahras", namear: "سوق أهراس" },
        { id: 4102, namefr: "Sedrata", namear: "سدراتة" },
        { id: 4103, namefr: "Taoura", namear: "تاورة" },
      ],
    },
    {
      id: 42,
      namefr: "Tipaza",
      namear: "تيبازة",
      communes: [
        { id: 4201, namefr: "Tipaza", namear: "تيبازة" },
        { id: 4202, namefr: "Cherchell", namear: "شرشال" },
        { id: 4203, namefr: "Hadjout", namear: "حجوط" },
      ],
    },
    {
      id: 43,
      namefr: "Mila",
      namear: "ميلة",
      communes: [
        { id: 4301, namefr: "Mila", namear: "ميلة" },
        { id: 4302, namefr: "Chelghoum Laid", namear: "شلغوم العيد" },
        { id: 4303, namefr: "Ferdjioua", namear: "فرجيوة" },
      ],
    },
    {
      id: 44,
      namefr: "Aïn Defla",
      namear: "عين الدفلى",
      communes: [
        { id: 4401, namefr: "Aïn Defla", namear: "عين الدفلى" },
        { id: 4402, namefr: "Khemis Miliana", namear: "خميس مليانة" },
        { id: 4403, namefr: "Miliana", namear: "مليانة" },
      ],
    },
    {
      id: 45,
      namefr: "Naâma",
      namear: "النعامة",
      communes: [
        { id: 4501, namefr: "Naâma", namear: "النعامة" },
        { id: 4502, namefr: "Mécheria", namear: "المشرية" },
        { id: 4503, namefr: "Aïn Sefra", namear: "عين الصفراء" },
      ],
    },
    {
      id: 46,
      namefr: "Aïn Témouchent",
      namear: "عين تموشنت",
      communes: [
        { id: 4601, namefr: "Aïn Témouchent", namear: "عين تموشنت" },
        { id: 4602, namefr: "Hammam Bouhadjar", namear: "حمام بوحجر" },
        { id: 4603, namefr: "Beni Saf", namear: "بني صاف" },
      ],
    },
    {
      id: 47,
      namefr: "Ghardaïa",
      namear: "غرداية",
      communes: [
        { id: 4701, namefr: "Ghardaïa", namear: "غرداية" },
        { id: 4702, namefr: "Metlili", namear: "متليلي" },
        { id: 4703, namefr: "El Meniaa", namear: "المنيعة" },
      ],
    },
    {
      id: 48,
      namefr: "Relizane",
      namear: "غليزان",
      communes: [
        { id: 4801, namefr: "Relizane", namear: "غليزان" },
        { id: 4802, namefr: "Oued Rhiou", namear: "وادي رهيو" },
        { id: 4803, namefr: "Mazouna", namear: "مازونة" },
      ],
    },
    {
      id: 49,
      namefr: "Timimoun",
      namear: "تيميمون",
      communes: [
        { id: 4901, namefr: "Timimoun", namear: "تيميمون" },
        { id: 4902, namefr: "Ouled Said", namear: "أولاد سعيد" },
        { id: 4903, namefr: "Aougrout", namear: "أوقروت" },
      ],
    },
    {
      id: 50,
      namefr: "Bordj Badji Mokhtar",
      namear: "برج باجي مختار",
      communes: [
        { id: 5001, namefr: "Bordj Badji Mokhtar", namear: "برج باجي مختار" },
        { id: 5002, namefr: "Timiaouine", namear: "تيمياوين" },
      ],
    },
    {
      id: 51,
      namefr: "Ouled Djellal",
      namear: "أولاد جلال",
      communes: [
        { id: 5101, namefr: "Ouled Djellal", namear: "أولاد جلال" },
        { id: 5102, namefr: "Sidi Khaled", namear: "سيدي خالد" },
        { id: 5103, namefr: "Doucen", namear: "الدوسن" },
      ],
    },
    {
      id: 52,
      namefr: "Béni Abbès",
      namear: "بني عباس",
      communes: [
        { id: 5201, namefr: "Béni Abbès", namear: "بني عباس" },
        { id: 5202, namefr: "Igli", namear: "إقلي" },
        { id: 5203, namefr: "Kerzaz", namear: "كرزاز" },
      ],
    },
    {
      id: 53,
      namefr: "In Salah",
      namear: "عين صالح",
      communes: [
        { id: 5301, namefr: "In Salah", namear: "عين صالح" },
        { id: 5302, namefr: "Foggaret Ezzaouia", namear: "فقارة الزوى" },
        { id: 5303, namefr: "In Ghar", namear: "عين غار" },
      ],
    },
    {
      id: 54,
      namefr: "In Guezzam",
      namear: "عين قزام",
      communes: [
        { id: 5401, namefr: "In Guezzam", namear: "عين قزام" },
        { id: 5402, namefr: "Tin Zaouatine", namear: "تين زواتين" },
      ],
    },
    {
      id: 55,
      namefr: "Touggourt",
      namear: "تقرت",
      communes: [
        { id: 5501, namefr: "Touggourt", namear: "تقرت" },
        { id: 5502, namefr: "Témacine", namear: "تماسين" },
        { id: 5503, namefr: "Megarine", namear: "المقارين" },
      ],
    },
    {
      id: 56,
      namefr: "Djanet",
      namear: "جانت",
      communes: [
        { id: 5601, namefr: "Djanet", namear: "جانت" },
        { id: 5602, namefr: "Bordj El Houasse", namear: "برج الحواس" },
      ],
    },
    {
      id: 57,
      namefr: "El Meghaier",
      namear: "المغير",
      communes: [
        { id: 5701, namefr: "El Meghaier", namear: "المغير" },
        { id: 5702, namefr: "Still", namear: "سطيل" },
        { id: 5703, namefr: "Djamaa", namear: "جامعة" },
      ],
    },
    {
      id: 58,
      namefr: "El Meniaa",
      namear: "المنيعة",
      communes: [
        { id: 5801, namefr: "El Meniaa", namear: "المنيعة" },
        { id: 5802, namefr: "Hassi Gara", namear: "حاسي القارة" },
      ],
    },
  ]
  
  // Helper function to find a wilaya by name
  export function findWilayaByName(name: string): Wilaya | undefined {
    return wilayas.find((wilaya) => wilaya.namefr.toLowerCase() === name.toLowerCase() || wilaya.namear === name)
  }
  
  // Helper function to find communes by wilaya name
  export function findCommunesByWilayaName(wilayaName: string): Commune[] {
    const wilaya = findWilayaByName(wilayaName)
    return wilaya ? wilaya.communes : []
  }
  
  // Helper function to find a commune by name within a specific wilaya
  export function findCommuneByName(wilayaName: string, communeName: string): Commune | undefined {
    const communes = findCommunesByWilayaName(wilayaName)
    return communes.find(
      (commune) => commune.namefr.toLowerCase() === communeName.toLowerCase() || commune.namear === communeName,
    )
  }
  
  