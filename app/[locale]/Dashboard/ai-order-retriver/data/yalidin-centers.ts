interface YalidinCenter {
    center_id: number
    name: string
    address: string
    gps: string
    commune_id: number
    commune_name: string
    wilaya_id: number
    wilaya_name: string
  }
  
  interface YalidinCommune {
    id: number
    commune_name_ascii: string
    commune_name: string
    daira_name_ascii: string
    daira_name: string
    wilaya_code: string
    wilaya_name_ascii: string
    wilaya_name: string
    centers: YalidinCenter[]
  }
  
  // Sample data for Yalidin Express centers
  export const yalidinCenters: Record<string, YalidinCommune> = {
    "1": {
      "id": 1,
      "commune_name_ascii": "Adrar",
      "commune_name": "أدرار",
      "daira_name_ascii": "Adrar",
      "daira_name": "أدرار",
      "wilaya_code": "01",
      "wilaya_name_ascii": "Adrar",
      "wilaya_name": "أدرار",
      "centers": [
        {
          "center_id": 10101,
          "name": "Agence de Adrar Yalidine",
          "address": "Rue Benhachem Maamar",
          "gps": "27.875695678434518,-0.28488572885492014",
          "commune_id": 101,
          "commune_name": "Adrar",
          "wilaya_id": 1,
          "wilaya_name": "Adrar"
        }
      ]
    },
    "2": {
      "id": 2,
      "commune_name_ascii": "Akabli",
      "commune_name": "اقبلي",
      "daira_name_ascii": "Aoulef",
      "daira_name": "أولف",
      "wilaya_code": "01",
      "wilaya_name_ascii": "Adrar",
      "wilaya_name": "أدرار",
      "centers": []
    },
    "3": {
      "id": 3,
      "commune_name_ascii": "Aougrout",
      "commune_name": "أوقروت",
      "daira_name_ascii": "Aougrout",
      "daira_name": "أوقروت",
      "wilaya_code": "49",
      "wilaya_name_ascii": "Timimoun",
      "wilaya_name": "تيميمون",
      "centers": []
    },
    "4": {
      "id": 4,
      "commune_name_ascii": "Aoulef",
      "commune_name": "أولف",
      "daira_name_ascii": "Aoulef",
      "daira_name": "أولف",
      "wilaya_code": "01",
      "wilaya_name_ascii": "Adrar",
      "wilaya_name": "أدرار",
      "centers": []
    },
    "5": {
      "id": 5,
      "commune_name_ascii": "Bordj Badji Mokhtar",
      "commune_name": "برج باجي مختار",
      "daira_name_ascii": "Bordj Badji Mokhtar",
      "daira_name": "برج باجي مختار",
      "wilaya_code": "50",
      "wilaya_name_ascii": "Bordj Badji Mokhtar",
      "wilaya_name": "برج باجي مختار",
      "centers": []
    },
    "6": {
      "id": 6,
      "commune_name_ascii": "Bouda",
      "commune_name": "بودة",
      "daira_name_ascii": "Adrar",
      "daira_name": "أدرار",
      "wilaya_code": "01",
      "wilaya_name_ascii": "Adrar",
      "wilaya_name": "أدرار",
      "centers": []
    },
    "7": {
      "id": 7,
      "commune_name_ascii": "Charouine",
      "commune_name": "شروين",
      "daira_name_ascii": "Charouine",
      "daira_name": "شروين",
      "wilaya_code": "49",
      "wilaya_name_ascii": "Timimoun",
      "wilaya_name": "تيميمون",
      "centers": []
    },
    "8": {
      "id": 8,
      "commune_name_ascii": "Deldoul",
      "commune_name": "دلدول",
      "daira_name_ascii": "Aougrout",
      "daira_name": "أوقروت",
      "wilaya_code": "49",
      "wilaya_name_ascii": "Timimoun",
      "wilaya_name": "تيميمون",
      "centers": []
    },
    "9": {
      "id": 9,
      "commune_name_ascii": "Fenoughil",
      "commune_name": "فنوغيل",
      "daira_name_ascii": "Fenoughil",
      "daira_name": "فنوغيل",
      "wilaya_code": "01",
      "wilaya_name_ascii": "Adrar",
      "wilaya_name": "أدرار",
      "centers": []
    },
    "10": {
      "id": 10,
      "commune_name_ascii": "In Zghmir",
      "commune_name": "إن زغمير",
      "daira_name_ascii": "Zaouiat Kounta",
      "daira_name": "زاوية كنتة",
      "wilaya_code": "01",
      "wilaya_name_ascii": "Adrar",
      "wilaya_name": "أدرار",
      "centers": []
    },
    "11": {
      "id": 11,
      "commune_name_ascii": "Ksar Kaddour",
      "commune_name": "قصر قدور",
      "daira_name_ascii": "Tinerkouk",
      "daira_name": "تنركوك",
      "wilaya_code": "49",
      "wilaya_name_ascii": "Timimoun",
      "wilaya_name": "تيميمون",
      "centers": []
    },
    "12": {
      "id": 12,
      "commune_name_ascii": "Metarfa",
      "commune_name": "المطارفة",
      "daira_name_ascii": "Aougrout",
      "daira_name": "أوقروت",
      "wilaya_code": "49",
      "wilaya_name_ascii": "Timimoun",
      "wilaya_name": "تيميمون",
      "centers": []
    },
    "13": {
      "id": 13,
      "commune_name_ascii": "Ouled Ahmed Timmi",
      "commune_name": "أولاد أحمد تيمي",
      "daira_name_ascii": "Adrar",
      "daira_name": "أدرار",
      "wilaya_code": "01",
      "wilaya_name_ascii": "Adrar",
      "wilaya_name": "أدرار",
      "centers": []
    },
    "14": {
      "id": 14,
      "commune_name_ascii": "Ouled Aissa",
      "commune_name": "أولاد عيسى",
      "daira_name_ascii": "Charouine",
      "daira_name": "شروين",
      "wilaya_code": "49",
      "wilaya_name_ascii": "Timimoun",
      "wilaya_name": "تيميمون",
      "centers": []
    },
    "15": {
      "id": 15,
      "commune_name_ascii": "Ouled Said",
      "commune_name": "أولاد السعيد",
      "daira_name_ascii": "Timimoun",
      "daira_name": "تيميمون",
      "wilaya_code": "49",
      "wilaya_name_ascii": "Timimoun",
      "wilaya_name": "تيميمون",
      "centers": []
    },
    "16": {
      "id": 16,
      "commune_name_ascii": "Reggane",
      "commune_name": "رقان",
      "daira_name_ascii": "Reggane",
      "daira_name": "رقان",
      "wilaya_code": "01",
      "wilaya_name_ascii": "Adrar",
      "wilaya_name": "أدرار",
      "centers": []
    },
    "17": {
      "id": 17,
      "commune_name_ascii": "Sali",
      "commune_name": "سالي",
      "daira_name_ascii": "Reggane",
      "daira_name": "رقان",
      "wilaya_code": "01",
      "wilaya_name_ascii": "Adrar",
      "wilaya_name": "أدرار",
      "centers": []
    },
    "18": {
      "id": 18,
      "commune_name_ascii": "Sebaa",
      "commune_name": "السبع",
      "daira_name_ascii": "Tsabit",
      "daira_name": "تسابيت",
      "wilaya_code": "01",
      "wilaya_name_ascii": "Adrar",
      "wilaya_name": "أدرار",
      "centers": []
    },
    "19": {
      "id": 19,
      "commune_name_ascii": "Talmine",
      "commune_name": "طالمين",
      "daira_name_ascii": "Charouine",
      "daira_name": "شروين",
      "wilaya_code": "49",
      "wilaya_name_ascii": "Timimoun",
      "wilaya_name": "تيميمون",
      "centers": []
    },
    "20": {
      "id": 20,
      "commune_name_ascii": "Tamantit",
      "commune_name": "تامنطيط",
      "daira_name_ascii": "Fenoughil",
      "daira_name": "فنوغيل",
      "wilaya_code": "01",
      "wilaya_name_ascii": "Adrar",
      "wilaya_name": "أدرار",
      "centers": []
    },
    "21": {
      "id": 21,
      "commune_name_ascii": "Tamest",
      "commune_name": "تامست",
      "daira_name_ascii": "Fenoughil",
      "daira_name": "فنوغيل",
      "wilaya_code": "01",
      "wilaya_name_ascii": "Adrar",
      "wilaya_name": "أدرار",
      "centers": []
    },
    "22": {
      "id": 22,
      "commune_name_ascii": "Timekten",
      "commune_name": "تيمقتن",
      "daira_name_ascii": "Aoulef",
      "daira_name": "أولف",
      "wilaya_code": "01",
      "wilaya_name_ascii": "Adrar",
      "wilaya_name": "أدرار",
      "centers": []
    },
    "23": {
      "id": 23,
      "commune_name_ascii": "Timiaouine",
      "commune_name": "تيمياوين",
      "daira_name_ascii": "Bordj Badji Mokhtar",
      "daira_name": "برج باجي مختار",
      "wilaya_code": "50",
      "wilaya_name_ascii": "Bordj Badji Mokhtar",
      "wilaya_name": "برج باجي مختار",
      "centers": []
    },
    "24": {
      "id": 24,
      "commune_name_ascii": "Timimoun",
      "commune_name": "تيميمون",
      "daira_name_ascii": "Timimoun",
      "daira_name": "تيميمون",
      "wilaya_code": "49",
      "wilaya_name_ascii": "Timimoun",
      "wilaya_name": "تيميمون",
      "centers": [
        {
          "center_id": 490901,
          "name": "Agence de Timimoun [Yalidine]",
          "address": "Rue Mohamed El Hashemi",
          "gps": "29.25928043831401,0.23095582639144044",
          "commune_id": 4909,
          "commune_name": "Timimoun",
          "wilaya_id": 49,
          "wilaya_name": "Timimoun"
        }
      ]
    },
    "25": {
      "id": 25,
      "commune_name_ascii": "Tinerkouk",
      "commune_name": "تنركوك",
      "daira_name_ascii": "Tinerkouk",
      "daira_name": "تنركوك",
      "wilaya_code": "49",
      "wilaya_name_ascii": "Timimoun",
      "wilaya_name": "تيميمون",
      "centers": []
    },
    "26": {
      "id": 26,
      "commune_name_ascii": "Tit",
      "commune_name": "تيت",
      "daira_name_ascii": "Aoulef",
      "daira_name": "أولف",
      "wilaya_code": "01",
      "wilaya_name_ascii": "Adrar",
      "wilaya_name": "أدرار",
      "centers": []
    },
    "27": {
      "id": 27,
      "commune_name_ascii": "Tsabit",
      "commune_name": "تسابيت",
      "daira_name_ascii": "Tsabit",
      "daira_name": "تسابيت",
      "wilaya_code": "01",
      "wilaya_name_ascii": "Adrar",
      "wilaya_name": "أدرار",
      "centers": []
    },
    "28": {
      "id": 28,
      "commune_name_ascii": "Zaouiet Kounta",
      "commune_name": "زاوية كنتة",
      "daira_name_ascii": "Zaouiat Kounta",
      "daira_name": "زاوية كنتة",
      "wilaya_code": "01",
      "wilaya_name_ascii": "Adrar",
      "wilaya_name": "أدرار",
      "centers": []
    },
    "29": {
      "id": 29,
      "commune_name_ascii": "Abou El Hassane",
      "commune_name": "أبو الحسن",
      "daira_name_ascii": "Abou El Hassane",
      "daira_name": "أبو الحسن",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "30": {
      "id": 30,
      "commune_name_ascii": "Ain Merane",
      "commune_name": "عين مران",
      "daira_name_ascii": "Ain Merane",
      "daira_name": "عين مران",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "31": {
      "id": 31,
      "commune_name_ascii": "Benairia",
      "commune_name": "بنايرية",
      "daira_name_ascii": "Zeboudja",
      "daira_name": "الزبوجة",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "32": {
      "id": 32,
      "commune_name_ascii": "Beni  Bouattab",
      "commune_name": "بني بوعتاب",
      "daira_name_ascii": "El Karimia",
      "daira_name": "الكريمية",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "33": {
      "id": 33,
      "commune_name_ascii": "Beni Haoua",
      "commune_name": "بني حواء",
      "daira_name_ascii": "Beni Haoua",
      "daira_name": "بني حواء",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "34": {
      "id": 34,
      "commune_name_ascii": "Beni Rached",
      "commune_name": "بني راشد",
      "daira_name_ascii": "Oued Fodda",
      "daira_name": "وادي الفضة",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "35": {
      "id": 35,
      "commune_name_ascii": "Boukadir",
      "commune_name": "بوقادير",
      "daira_name_ascii": "Boukadir",
      "daira_name": "بوقادير",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "36": {
      "id": 36,
      "commune_name_ascii": "Bouzeghaia",
      "commune_name": "بوزغاية",
      "daira_name_ascii": "Zeboudja",
      "daira_name": "الزبوجة",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "37": {
      "id": 37,
      "commune_name_ascii": "Breira",
      "commune_name": "بريرة",
      "daira_name_ascii": "Beni Haoua",
      "daira_name": "بني حواء",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "38": {
      "id": 38,
      "commune_name_ascii": "Chettia",
      "commune_name": "الشطية",
      "daira_name_ascii": "Ouled Fares",
      "daira_name": "أولاد فارس",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "39": {
      "id": 39,
      "commune_name_ascii": "Chlef",
      "commune_name": "الشلف",
      "daira_name_ascii": "Chlef",
      "daira_name": "الشلف",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": [
        {
          "center_id": 21101,
          "name": "Agence de Chlef Yalidine",
          "address": "route national N4 Chlef",
          "gps": "36.1707130,1.3349650",
          "commune_id": 211,
          "commune_name": "Chlef",
          "wilaya_id": 2,
          "wilaya_name": "Chlef"
        },
        {
          "center_id": 21102,
          "name": "Agence de Chlef Guepex",
          "address": "Cité Cherifi Kadour, 113",
          "gps": "36.16073470034724,1.3307245621473522",
          "commune_id": 211,
          "commune_name": "Chlef",
          "wilaya_id": 2,
          "wilaya_name": "Chlef"
        }
      ]
    },
    "40": {
      "id": 40,
      "commune_name_ascii": "Dahra",
      "commune_name": "الظهرة",
      "daira_name_ascii": "Taougrit",
      "daira_name": "تاوقريت",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "41": {
      "id": 41,
      "commune_name_ascii": "El Hadjadj",
      "commune_name": "الحجاج",
      "daira_name_ascii": "Ouled Ben Abdelkader",
      "daira_name": "أولاد بن عبد القادر",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "42": {
      "id": 42,
      "commune_name_ascii": "El Karimia",
      "commune_name": "الكريمية",
      "daira_name_ascii": "El Karimia",
      "daira_name": "الكريمية",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "43": {
      "id": 43,
      "commune_name_ascii": "El Marsa",
      "commune_name": "المرسى",
      "daira_name_ascii": "El Marsa",
      "daira_name": "المرسى",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "44": {
      "id": 44,
      "commune_name_ascii": "Harchoun",
      "commune_name": "حرشون",
      "daira_name_ascii": "El Karimia",
      "daira_name": "الكريمية",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "45": {
      "id": 45,
      "commune_name_ascii": "Herenfa",
      "commune_name": "الهرانفة",
      "daira_name_ascii": "Ain Merane",
      "daira_name": "عين مران",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "46": {
      "id": 46,
      "commune_name_ascii": "Labiod Medjadja",
      "commune_name": "الأبيض مجاجة",
      "daira_name_ascii": "Ouled Fares",
      "daira_name": "أولاد فارس",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "47": {
      "id": 47,
      "commune_name_ascii": "Moussadek",
      "commune_name": "مصدق",
      "daira_name_ascii": "El Marsa",
      "daira_name": "المرسى",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "48": {
      "id": 48,
      "commune_name_ascii": "Oued Fodda",
      "commune_name": "وادي الفضة",
      "daira_name_ascii": "Oued Fodda",
      "daira_name": "وادي الفضة",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "49": {
      "id": 49,
      "commune_name_ascii": "Oued Goussine",
      "commune_name": "وادي قوسين",
      "daira_name_ascii": "Beni Haoua",
      "daira_name": "بني حواء",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "50": {
      "id": 50,
      "commune_name_ascii": "Oued Sly",
      "commune_name": "وادي سلي",
      "daira_name_ascii": "Boukadir",
      "daira_name": "بوقادير",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "51": {
      "id": 51,
      "commune_name_ascii": "Ouled Abbes",
      "commune_name": "أولاد عباس",
      "daira_name_ascii": "Oued Fodda",
      "daira_name": "وادي الفضة",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "52": {
      "id": 52,
      "commune_name_ascii": "Ouled Ben Abdelkader",
      "commune_name": "أولاد بن عبد القادر",
      "daira_name_ascii": "Ouled Ben Abdelkader",
      "daira_name": "أولاد بن عبد القادر",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "53": {
      "id": 53,
      "commune_name_ascii": "Ouled Fares",
      "commune_name": "أولاد فارس",
      "daira_name_ascii": "Ouled Fares",
      "daira_name": "أولاد فارس",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "54": {
      "id": 54,
      "commune_name_ascii": "Oum Drou",
      "commune_name": "أم الدروع",
      "daira_name_ascii": "Chlef",
      "daira_name": "الشلف",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "55": {
      "id": 55,
      "commune_name_ascii": "Sendjas",
      "commune_name": "سنجاس",
      "daira_name_ascii": "Chlef",
      "daira_name": "الشلف",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "56": {
      "id": 56,
      "commune_name_ascii": "Sidi Abderrahmane",
      "commune_name": "سيدي عبد الرحمن",
      "daira_name_ascii": "Tenes",
      "daira_name": "تنس",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "57": {
      "id": 57,
      "commune_name_ascii": "Sidi Akkacha",
      "commune_name": "سيدي عكاشة",
      "daira_name_ascii": "Tenes",
      "daira_name": "تنس",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "58": {
      "id": 58,
      "commune_name_ascii": "Sobha",
      "commune_name": "الصبحة",
      "daira_name_ascii": "Boukadir",
      "daira_name": "بوقادير",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "59": {
      "id": 59,
      "commune_name_ascii": "Tadjena",
      "commune_name": "تاجنة",
      "daira_name_ascii": "Abou El Hassane",
      "daira_name": "أبو الحسن",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "60": {
      "id": 60,
      "commune_name_ascii": "Talassa",
      "commune_name": "تلعصة",
      "daira_name_ascii": "Abou El Hassane",
      "daira_name": "أبو الحسن",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "61": {
      "id": 61,
      "commune_name_ascii": "Taougrit",
      "commune_name": "تاوقريت",
      "daira_name_ascii": "Taougrit",
      "daira_name": "تاوقريت",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "62": {
      "id": 62,
      "commune_name_ascii": "Tenes",
      "commune_name": "تنس",
      "daira_name_ascii": "Tenes",
      "daira_name": "تنس",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": [
        {
          "center_id": 23401,
          "name": "Agence de Ténès Guepex",
          "address": "Bt A2 Rdc Local 28, Sortie Ouest Route De Mostaganem",
          "gps": "36.50473150265476,1.286761899576662",
          "commune_id": 234,
          "commune_name": "Ténès",
          "wilaya_id": 2,
          "wilaya_name": "Chlef"
        }
      ]
    },
    "63": {
      "id": 63,
      "commune_name_ascii": "Zeboudja",
      "commune_name": "الزبوجة",
      "daira_name_ascii": "Zeboudja",
      "daira_name": "الزبوجة",
      "wilaya_code": "02",
      "wilaya_name_ascii": "Chlef",
      "wilaya_name": " الشلف",
      "centers": []
    },
    "64": {
      "id": 64,
      "commune_name_ascii": "Aflou",
      "commune_name": "أفلو",
      "daira_name_ascii": "Aflou",
      "daira_name": "أفلو",
      "wilaya_code": "03",
      "wilaya_name_ascii": "Laghouat",
      "wilaya_name": "الأغواط",
      "centers": [
        {
          "center_id": 31901,
          "name": "Agence de Aflou Yalidine",
          "address": "Hai Zahi Ben Aissa, Route El Bayadh (à coté de la centrale de police)",
          "gps": "34.11114198779646,2.0961174596054004",
          "commune_id": 319,
          "commune_name": "Aflou",
          "wilaya_id": 3,
          "wilaya_name": "Laghouat"
        }
      ]
    },
    "65": {
      "id": 65,
      "commune_name_ascii": "Ain Madhi",
      "commune_name": "عين ماضي",
      "daira_name_ascii": "Ain Madhi",
      "daira_name": "عين ماضي",
      "wilaya_code": "03",
      "wilaya_name_ascii": "Laghouat",
      "wilaya_name": "الأغواط",
      "centers": []
    },
    "66": {
      "id": 66,
      "commune_name_ascii": "Ain Sidi Ali",
      "commune_name": "عين سيدي علي",
      "daira_name_ascii": "Gueltat Sidi Saad",
      "daira_name": "قتلة سيدي سعيد",
      "wilaya_code": "03",
      "wilaya_name_ascii": "Laghouat",
      "wilaya_name": "الأغواط",
      "centers": []
    },
    "67": {
      "id": 67,
      "commune_name_ascii": "El Beidha",
      "commune_name": "البيضاء",
      "daira_name_ascii": "Gueltat Sidi Saad",
      "daira_name": "قتلة سيدي سعيد",
      "wilaya_code": "03",
      "wilaya_name_ascii": "Laghouat",
      "wilaya_name": "الأغواط",
      "centers": []
    },
    "68": {
      "id": 68,
      "commune_name_ascii": "Benacer Benchohra",
      "commune_name": "بن ناصر بن شهرة",
      "daira_name_ascii": "Ksar El Hirane",
      "daira_name": "قصر الحيران",
      "wilaya_code": "03",
      "wilaya_name_ascii": "Laghouat",
      "wilaya_name": "الأغواط",
      "centers": []
    },
    "69": {
      "id": 69,
      "commune_name_ascii": "Brida",
      "commune_name": "بريدة",
      "daira_name_ascii": "Brida",
      "daira_name": "بريدة",
      "wilaya_code": "03",
      "wilaya_name_ascii": "Laghouat",
      "wilaya_name": "الأغواط",
      "centers": []
    },
    "70": {
      "id": 70,
      "commune_name_ascii": "El Assafia",
      "commune_name": "العسافية",
      "daira_name_ascii": "Sidi Makhlouf",
      "daira_name": "سيدي مخلوف",
      "wilaya_code": "03",
      "wilaya_name_ascii": "Laghouat",
      "wilaya_name": "الأغواط",
      "centers": []
    },
    "71": {
      "id": 71,
      "commune_name_ascii": "El Ghicha",
      "commune_name": "الغيشة",
      "daira_name_ascii": "El Ghicha",
      "daira_name": "الغيشة",
      "wilaya_code": "03",
      "wilaya_name_ascii": "Laghouat",
      "wilaya_name": "الأغواط",
      "centers": []
    },
    "72": {
      "id": 72,
      "commune_name_ascii": "El Haouaita",
      "commune_name": "الحويطة",
      "daira_name_ascii": "Ain Madhi",
      "daira_name": "عين ماضي",
      "wilaya_code": "03",
      "wilaya_name_ascii": "Laghouat",
      "wilaya_name": "الأغواط",
      "centers": []
    },
    "73": {
      "id": 73,
      "commune_name_ascii": "Gueltat Sidi Saad",
      "commune_name": "قلتة سيدي سعد",
      "daira_name_ascii": "Gueltat Sidi Saad",
      "daira_name": "قتلة سيدي سعيد",
      "wilaya_code": "03",
      "wilaya_name_ascii": "Laghouat",
      "wilaya_name": "الأغواط",
      "centers": []
    },
    "74": {
      "id": 74,
      "commune_name_ascii": "Hadj Mechri",
      "commune_name": "الحاج مشري",
      "daira_name_ascii": "Brida",
      "daira_name": "بريدة",
      "wilaya_code": "03",
      "wilaya_name_ascii": "Laghouat",
      "wilaya_name": "الأغواط",
      "centers": []
    },
    "75": {
      "id": 75,
      "commune_name_ascii": "Hassi Delaa",
      "commune_name": "حاسي الدلاعة",
      "daira_name_ascii": "Hassi R'mel",
      "daira_name": "حاسي الرمل",
      "wilaya_code": "03",
      "wilaya_name_ascii": "Laghouat",
      "wilaya_name": "الأغواط",
      "centers": []
    },
    "76": {
      "id": 76,
      "commune_name_ascii": "Hassi R'mel",
      "commune_name": "حاسي الرمل",
      "daira_name_ascii": "Hassi R'mel",
      "daira_name": "حاسي الرمل",
      "wilaya_code": "03",
      "wilaya_name_ascii": "Laghouat",
      "wilaya_name": "الأغواط",
      "centers": []
    },
    "77": {
      "id": 77,
      "commune_name_ascii": "Kheneg",
      "commune_name": "الخنق",
      "daira_name_ascii": "Ain Madhi",
      "daira_name": "عين ماضي",
      "wilaya_code": "03",
      "wilaya_name_ascii": "Laghouat",
      "wilaya_name": "الأغواط",
      "centers": []
    },
    "78": {
      "id": 78,
      "commune_name_ascii": "Ksar El Hirane",
      "commune_name": "قصر الحيران",
      "daira_name_ascii": "Ksar El Hirane",
      "daira_name": "قصر الحيران",
      "wilaya_code": "03",
      "wilaya_name_ascii": "Laghouat",
      "wilaya_name": "الأغواط",
      "centers": []
    },
    "79": {
      "id": 79,
      "commune_name_ascii": "Laghouat",
      "commune_name": "الأغواط",
      "daira_name_ascii": "Laghouat",
      "daira_name": "الأغواط",
      "wilaya_code": "03",
      "wilaya_name_ascii": "Laghouat",
      "wilaya_name": "الأغواط",
      "centers": [
        {
          "center_id": 30102,
          "name": "Agence Laghouat Cité OASIS Easy and speed",
          "address": "Cité l'OASIS, centre ville Laghouat, Laghouat.",
          "gps": "33.811561602108206,2.8597337097525823",
          "commune_id": 301,
          "commune_name": "Laghouat",
          "wilaya_id": 3,
          "wilaya_name": "Laghouat"
        }
      ]
    },
    "80": {
      "id": 80,
      "commune_name_ascii": "Oued Morra",
      "commune_name": "وادي مرة",
      "daira_name_ascii": "Oued Morra",
      "daira_name": "وادي مرة",
      "wilaya_code": "03",
      "wilaya_name_ascii": "Laghouat",
      "wilaya_name": "الأغواط",
      "centers": []
    },
    "81": {
      "id": 81,
      "commune_name_ascii": "Oued M'zi",
      "commune_name": "وادي مزي",
      "daira_name_ascii": "Oued Morra",
      "daira_name": "وادي مرة",
      "wilaya_code": "03",
      "wilaya_name_ascii": "Laghouat",
      "wilaya_name": "الأغواط",
      "centers": []
    },
    "82": {
      "id": 82,
      "commune_name_ascii": "Sebgag",
      "commune_name": "سبقاق",
      "daira_name_ascii": "Aflou",
      "daira_name": "أفلو",
      "wilaya_code": "03",
      "wilaya_name_ascii": "Laghouat",
      "wilaya_name": "الأغواط",
      "centers": []
    },
    "83": {
      "id": 83,
      "commune_name_ascii": "Sidi Bouzid",
      "commune_name": "سيدي بوزيد",
      "daira_name_ascii": "Aflou",
      "daira_name": "أفلو",
      "wilaya_code": "03",
      "wilaya_name_ascii": "Laghouat",
      "wilaya_name": "الأغواط",
      "centers": []
    },
    "84": {
      "id": 84,
      "commune_name_ascii": "Sidi Makhlouf",
      "commune_name": "سيدي مخلوف",
      "daira_name_ascii": "Sidi Makhlouf",
      "daira_name": "سيدي مخلوف",
      "wilaya_code": "03",
      "wilaya_name_ascii": "Laghouat",
      "wilaya_name": "الأغواط",
      "centers": []
    },
    "85": {
      "id": 85,
      "commune_name_ascii": "Tadjemout",
      "commune_name": "تاجموت",
      "daira_name_ascii": "Ain Madhi",
      "daira_name": "عين ماضي",
      "wilaya_code": "03",
      "wilaya_name_ascii": "Laghouat",
      "wilaya_name": "الأغواط",
      "centers": []
    },
    "86": {
      "id": 86,
      "commune_name_ascii": "Tadjrouna",
      "commune_name": "تاجرونة",
      "daira_name_ascii": "Ain Madhi",
      "daira_name": "عين ماضي",
      "wilaya_code": "03",
      "wilaya_name_ascii": "Laghouat",
      "wilaya_name": "الأغواط",
      "centers": []
    },
    "87": {
      "id": 87,
      "commune_name_ascii": "Taouiala",
      "commune_name": "تاويالة",
      "daira_name_ascii": "Brida",
      "daira_name": "بريدة",
      "wilaya_code": "03",
      "wilaya_name_ascii": "Laghouat",
      "wilaya_name": "الأغواط",
      "centers": []
    },
    "88": {
      "id": 88,
      "commune_name_ascii": "Ain Babouche",
      "commune_name": "عين ببوش",
      "daira_name_ascii": "Ain Babouche",
      "daira_name": "عين ببوش",
      "wilaya_code": "04",
      "wilaya_name_ascii": "Oum El Bouaghi",
      "wilaya_name": "أم البواقي",
      "centers": []
    },
    "89": {
      "id": 89,
      "commune_name_ascii": "Ain Beida",
      "commune_name": "عين البيضاء",
      "daira_name_ascii": "Ain Beida",
      "daira_name": "عين البيضاء",
      "wilaya_code": "04",
      "wilaya_name_ascii": "Oum El Bouaghi",
      "wilaya_name": "أم البواقي",
      "centers": []
    },
    "90": {
      "id": 90,
      "commune_name_ascii": "Ain Diss",
      "commune_name": "عين الديس",
      "daira_name_ascii": "Ain Babouche",
      "daira_name": "عين ببوش",
      "wilaya_code": "04",
      "wilaya_name_ascii": "Oum El Bouaghi",
      "wilaya_name": "أم البواقي",
      "centers": []
    },
    "91": {
      "id": 91,
      "commune_name_ascii": "Ain Fekroun",
      "commune_name": "عين فكرون",
      "daira_name_ascii": "Ain Fekroun",
      "daira_name": "عين فكرون",
      "wilaya_code": "04",
      "wilaya_name_ascii": "Oum El Bouaghi",
      "wilaya_name": "أم البواقي",
      "centers": []
    },
    "92": {
      "id": 92,
      "commune_name_ascii": "Ain Kercha",
      "commune_name": "عين كرشة",
      "daira_name_ascii": "Ain Kercha",
      "daira_name": "عين كرشة",
      "wilaya_code": "04",
      "wilaya_name_ascii": "Oum El Bouaghi",
      "wilaya_name": "أم البواقي",
      "centers": []
    },
    "93": {
      "id": 93,
      "commune_name_ascii": "Ain M'lila",
      "commune_name": "عين مليلة",
      "daira_name_ascii": "Ain M'lila",
      "daira_name": "عين مليلة",
      "wilaya_code": "04",
      "wilaya_name_ascii": "Oum El Bouaghi",
      "wilaya_name": "أم البواقي",
      "centers": [
        {
          "center_id": 40301,
          "name": "Agence de Aïn M'lila Yalidine",
          "address": "Route Messas (à coté superette Amiche)",
          "gps": "36.04672082846558,6.568678708926481",
          "commune_id": 403,
          "commune_name": "Aïn M'lila",
          "wilaya_id": 4,
          "wilaya_name": "Oum El Bouaghi"
        }
      ]
    },
    "94": {
      "id": 94,
      "commune_name_ascii": "Ain Zitoun",
      "commune_name": "عين الزيتون",
      "daira_name_ascii": "Oum El Bouaghi",
      "daira_name": "أم البواقي",
      "wilaya_code": "04",
      "wilaya_name_ascii": "Oum El Bouaghi",
      "wilaya_name": "أم البواقي",
      "centers": []
    },
    "95": {
      "id": 95,
      "commune_name_ascii": "Behir Chergui",
      "commune_name": "بحير الشرقي",
      "daira_name_ascii": "Meskiana",
      "daira_name": "مسكيانة",
      "wilaya_code": "04",
      "wilaya_name_ascii": "Oum El Bouaghi",
      "wilaya_name": "أم البواقي",
      "centers": []
    },
    "96": {
      "id": 96,
      "commune_name_ascii": "Berriche",
      "commune_name": "بريش",
      "daira_name_ascii": "Ain Beida",
      "daira_name": "عين البيضاء",
      "wilaya_code": "04",
      "wilaya_name_ascii": "Oum El Bouaghi",
      "wilaya_name": "أم البواقي",
      "centers": []
    },
    "97": {
      "id": 97,
      "commune_name_ascii": "Bir Chouhada",
      "commune_name": "بئر الشهداء",
      "daira_name_ascii": "Souk Naamane",
      "daira_name": "سوق نعمان",
      "wilaya_code": "04",
      "wilaya_name_ascii": "Oum El Bouaghi",
      "wilaya_name": "أم البواقي",
      "centers": []
    },
    "98": {
      "id": 98,
      "commune_name_ascii": "Dhalaa",
      "commune_name": "الضلعة",
      "daira_name_ascii": "Dhalaa",
      "daira_name": "الضلعة",
      "wilaya_code": "04",
      "wilaya_name_ascii": "Oum El Bouaghi",
      "wilaya_name": "أم البواقي",
      "centers": []
    },
    "99": {
      "id": 99,
      "commune_name_ascii": "El Amiria",
      "commune_name": "العامرية",
      "daira_name_ascii": "Sigus",
      "daira_name": "سيقوس",
      "wilaya_code": "04",
      "wilaya_name_ascii": "Oum El Bouaghi",
      "wilaya_name": "أم البواقي",
      "centers": []
    },
    "100": {
      "id": 100,
      "commune_name_ascii": "El Belala",
      "commune_name": "البلالة",
      "daira_name_ascii": "Meskiana",
      "daira_name": "مسكيانة",
      "wilaya_code": "04",
      "wilaya_name_ascii": "Oum El Bouaghi",
      "wilaya_name": "أم البواقي",
      "centers": []
    },
    "101": {
      "id": 101,
      "commune_name_ascii": "El Djazia",
      "commune_name": "الجازية",
      "daira_name_ascii": "Dhalaa",
      "daira_name": "الضلعة",
      "wilaya_code": "04",
      "wilaya_name_ascii": "Oum El Bouaghi",
      "wilaya_name": "أم البواقي",
      "centers": []
    },
    "102": {
      "id": 102,
      "commune_name_ascii": "El Fedjoudj Boughrara Sa",
      "commune_name": "الفجوج بوغرارة سعودي",
      "daira_name_ascii": "Ain Fekroun",
      "daira_name": "عين فكرون",
      "wilaya_code": "04",
      "wilaya_name_ascii": "Oum El Bouaghi",
      "wilaya_name": "أم البواقي",
      "centers": []
    },
    "103": {
      "id": 103,
      "commune_name_ascii": "El Harmilia",
      "commune_name": "الحرملية",
      "daira_name_ascii": "Ain Kercha",
      "daira_name": "عين كرشة",
      "wilaya_code": "04",
      "wilaya_name_ascii": "Oum El Bouaghi",
      "wilaya_name": "أم البواقي",
      "centers": []
    },
    "104": {
      "id": 104,
      "commune_name_ascii": "Fkirina",
      "commune_name": "فكيرينة",
      "daira_name_ascii": "F'kirina",
      "daira_name": "فكيرينة",
      "wilaya_code": "04",
      "wilaya_name_ascii": "Oum El Bouaghi",
      "wilaya_name": "أم البواقي",
      "centers": []
    },
    "105": {
      "id": 105,
      "commune_name_ascii": "Hanchir Toumghani",
      "commune_name": "هنشير تومغني",
      "daira_name_ascii": "Ain Kercha",
      "daira_name": "عين كرشة",
      "wilaya_code": "04",
      "wilaya_name_ascii": "Oum El Bouaghi",
      "wilaya_name": "أم البواقي",
      "centers": []
    },
    "106": {
      "id": 106,
      "commune_name_ascii": "Ksar Sbahi",
      "commune_name": "قصر الصباحي",
      "daira_name_ascii": "Ksar Sbahi",
      "daira_name": "قصر الصباحي",
      "wilaya_code": "04",
      "wilaya_name_ascii": "Oum El Bouaghi",
      "wilaya_name": "أم البواقي",
      "centers": []
    },
    "107": {
      "id": 107,
      "commune_name_ascii": "Meskiana",
      "commune_name": "مسكيانة",
      "daira_name_ascii": "Meskiana",
      "daira_name": "مسكيانة",
      "wilaya_code": "04",
      "wilaya_name_ascii": "Oum El Bouaghi",
      "wilaya_name": "أم البواقي",
      "centers": []
    },
    "108": {
      "id": 108,
      "commune_name_ascii": "Oued Nini",
      "commune_name": "وادي نيني",
      "daira_name_ascii": "F'kirina",
      "daira_name": "فكيرينة",
      "wilaya_code": "04",
      "wilaya_name_ascii": "Oum El Bouaghi",
      "wilaya_name": "أم البواقي",
      "centers": []
    },
    "109": {
      "id": 109,
      "commune_name_ascii": "Ouled Gacem",
      "commune_name": "أولاد قاسم",
      "daira_name_ascii": "Ain M'lila",
      "daira_name": "عين مليلة",
      "wilaya_code": "04",
      "wilaya_name_ascii": "Oum El Bouaghi",
      "wilaya_name": "أم البواقي",
      "centers": []
    },
    "110": {
      "id": 110,
      "commune_name_ascii": "Ouled Hamla",
      "commune_name": "أولاد حملة",
      "daira_name_ascii": "Ain M'lila",
      "daira_name": "عين مليلة",
      "wilaya_code": "04",
      "wilaya_name_ascii": "Oum El Bouaghi",
      "wilaya_name": "أم البواقي",
      "centers": []
    },
    "111": {
      "id": 111,
      "commune_name_ascii": "Ouled Zouai",
      "commune_name": "أولاد زواي",
      "daira_name_ascii": "Souk Naamane",
      "daira_name": "سوق نعمان",
      "wilaya_code": "04",
      "wilaya_name_ascii": "Oum El Bouaghi",
      "wilaya_name": "أم البواقي",
      "centers": []
    },
    "112": {
      "id": 112,
      "commune_name_ascii": "Oum El Bouaghi",
      "commune_name": "أم البواقي",
      "daira_name_ascii": "Oum El Bouaghi",
      "daira_name": "أم البواقي",
      "wilaya_code": "04",
      "wilaya_name_ascii": "Oum El Bouaghi",
      "wilaya_name": "أم البواقي",
      "centers": [
        {
          "center_id": 40101,
          "name": "Agence de Oum el Bouaghi Yalidine",
          "address": "Cité El Moustakbel",
          "gps": "35.871998629133536,7.1077427693234645",
          "commune_id": 401,
          "commune_name": "Oum el Bouaghi",
          "wilaya_id": 4,
          "wilaya_name": "Oum El Bouaghi"
        }
      ]
    },
    "113": {
      "id": 113,
      "commune_name_ascii": "Rahia",
      "commune_name": "الرحية",
      "daira_name_ascii": "Meskiana",
      "daira_name": "مسكيانة",
      "wilaya_code": "04",
      "wilaya_name_ascii": "Oum El Bouaghi",
      "wilaya_name": "أم البواقي",
      "centers": []
    },
    "114": {
      "id": 114,
      "commune_name_ascii": "Sigus",
      "commune_name": "سيقوس",
      "daira_name_ascii": "Sigus",
      "daira_name": "سيقوس",
      "wilaya_code": "04",
      "wilaya_name_ascii": "Oum El Bouaghi",
      "wilaya_name": "أم البواقي",
      "centers": []
    },
    "115": {
      "id": 115,
      "commune_name_ascii": "Souk Naamane",
      "commune_name": "سوق نعمان",
      "daira_name_ascii": "Souk Naamane",
      "daira_name": "سوق نعمان",
      "wilaya_code": "04",
      "wilaya_name_ascii": "Oum El Bouaghi",
      "wilaya_name": "أم البواقي",
      "centers": []
    },
    "116": {
      "id": 116,
      "commune_name_ascii": "Zorg",
      "commune_name": "الزرق",
      "daira_name_ascii": "Ain Beida",
      "daira_name": "عين البيضاء",
      "wilaya_code": "04",
      "wilaya_name_ascii": "Oum El Bouaghi",
      "wilaya_name": "أم البواقي",
      "centers": []
    },
    "117": {
      "id": 117,
      "commune_name_ascii": "Ain Djasser",
      "commune_name": "عين جاسر",
      "daira_name_ascii": "Ain Djasser",
      "daira_name": "عين جاسر",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "118": {
      "id": 118,
      "commune_name_ascii": "Ain Touta",
      "commune_name": "عين التوتة",
      "daira_name_ascii": "Ain Touta",
      "daira_name": "عين التوتة",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "119": {
      "id": 119,
      "commune_name_ascii": "Ain Yagout",
      "commune_name": "عين ياقوت",
      "daira_name_ascii": "El Madher",
      "daira_name": "المعذر",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "120": {
      "id": 120,
      "commune_name_ascii": "Arris",
      "commune_name": "أريس",
      "daira_name_ascii": "Arris",
      "daira_name": "أريس",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "121": {
      "id": 121,
      "commune_name_ascii": "Azil Abedelkader",
      "commune_name": "عزيل عبد القادر",
      "daira_name_ascii": "Djezzar",
      "daira_name": "الجزار",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "122": {
      "id": 122,
      "commune_name_ascii": "Barika",
      "commune_name": "بريكة",
      "daira_name_ascii": "Barika",
      "daira_name": "بريكة",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": [
        {
          "center_id": 54201,
          "name": "Agence de Barika Guepex",
          "address": "Boulevard Azil Abdul Rahman, Rue Les Freres Debache, Route De Batna",
          "gps": "35.3798441310065,5.378196883423196",
          "commune_id": 542,
          "commune_name": "Barika",
          "wilaya_id": 5,
          "wilaya_name": "Batna"
        }
      ]
    },
    "123": {
      "id": 123,
      "commune_name_ascii": "Batna",
      "commune_name": "باتنة",
      "daira_name_ascii": "Batna",
      "daira_name": "باتنة",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": [
        {
          "center_id": 50101,
          "name": "Agence des 500 Logements Yalidine",
          "address": "Lotissement Meddour (En Face Lycee 500 Logements)",
          "gps": "35.55062452513792,6.154746735050948",
          "commune_id": 501,
          "commune_name": "Batna",
          "wilaya_id": 5,
          "wilaya_name": "Batna"
        },
        {
          "center_id": 50103,
          "name": "Agence du CHU Route de Tazoult Guepex",
          "address": "Cité frères Lombarkia, ex parc à fourrage",
          "gps": "35.53111052619345,6.19182254228705",
          "commune_id": 501,
          "commune_name": "Batna",
          "wilaya_id": 5,
          "wilaya_name": "Batna"
        }
      ]
    },
    "124": {
      "id": 124,
      "commune_name_ascii": "Beni Foudhala El Hakania",
      "commune_name": "بني فضالة الحقانية",
      "daira_name_ascii": "Ain Touta",
      "daira_name": "عين التوتة",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "125": {
      "id": 125,
      "commune_name_ascii": "Bitam",
      "commune_name": "بيطام",
      "daira_name_ascii": "Barika",
      "daira_name": "بريكة",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "126": {
      "id": 126,
      "commune_name_ascii": "Boulhilat",
      "commune_name": "بولهيلات",
      "daira_name_ascii": "Chemora",
      "daira_name": "الشمرة",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "127": {
      "id": 127,
      "commune_name_ascii": "Boumagueur",
      "commune_name": "بومقر",
      "daira_name_ascii": "N'gaous",
      "daira_name": "نقاوس",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "128": {
      "id": 128,
      "commune_name_ascii": "Boumia",
      "commune_name": "بومية",
      "daira_name_ascii": "El Madher",
      "daira_name": "المعذر",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "129": {
      "id": 129,
      "commune_name_ascii": "Bouzina",
      "commune_name": "بوزينة",
      "daira_name_ascii": "Bouzina",
      "daira_name": "بوزينة",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "130": {
      "id": 130,
      "commune_name_ascii": "Chemora",
      "commune_name": "الشمرة",
      "daira_name_ascii": "Chemora",
      "daira_name": "الشمرة",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "131": {
      "id": 131,
      "commune_name_ascii": "Chir",
      "commune_name": "شير",
      "daira_name_ascii": "Theniet El Abed",
      "daira_name": "ثنية العابد",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "132": {
      "id": 132,
      "commune_name_ascii": "Djerma",
      "commune_name": "جرمة",
      "daira_name_ascii": "El Madher",
      "daira_name": "المعذر",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "133": {
      "id": 133,
      "commune_name_ascii": "Djezzar",
      "commune_name": "الجزار",
      "daira_name_ascii": "Djezzar",
      "daira_name": "الجزار",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "134": {
      "id": 134,
      "commune_name_ascii": "El Hassi",
      "commune_name": "الحاسي",
      "daira_name_ascii": "Ain Djasser",
      "daira_name": "عين جاسر",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "135": {
      "id": 135,
      "commune_name_ascii": "El Madher",
      "commune_name": "المعذر",
      "daira_name_ascii": "El Madher",
      "daira_name": "المعذر",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "136": {
      "id": 136,
      "commune_name_ascii": "Fesdis",
      "commune_name": "فسديس",
      "daira_name_ascii": "Batna",
      "daira_name": "باتنة",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "137": {
      "id": 137,
      "commune_name_ascii": "Foum Toub",
      "commune_name": "فم الطوب",
      "daira_name_ascii": "Ichemoul",
      "daira_name": "إشمول",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "138": {
      "id": 138,
      "commune_name_ascii": "Ghassira",
      "commune_name": "غسيرة",
      "daira_name_ascii": "Tkout",
      "daira_name": "تكوت",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "139": {
      "id": 139,
      "commune_name_ascii": "Gosbat",
      "commune_name": "القصبات",
      "daira_name_ascii": "Ras El Aioun",
      "daira_name": "رأس العيون",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "140": {
      "id": 140,
      "commune_name_ascii": "Guigba",
      "commune_name": "القيقبة",
      "daira_name_ascii": "Ras El Aioun",
      "daira_name": "رأس العيون",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "141": {
      "id": 141,
      "commune_name_ascii": "Hidoussa",
      "commune_name": "حيدوسة",
      "daira_name_ascii": "Merouana",
      "daira_name": "مروانة",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "142": {
      "id": 142,
      "commune_name_ascii": "Ichemoul",
      "commune_name": "إشمول",
      "daira_name_ascii": "Ichemoul",
      "daira_name": "إشمول",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "143": {
      "id": 143,
      "commune_name_ascii": "Inoughissen",
      "commune_name": "إينوغيسن",
      "daira_name_ascii": "Ichemoul",
      "daira_name": "إشمول",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "144": {
      "id": 144,
      "commune_name_ascii": "Kimmel",
      "commune_name": "كيمل",
      "daira_name_ascii": "Tkout",
      "daira_name": "تكوت",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "145": {
      "id": 145,
      "commune_name_ascii": "Ksar Bellezma",
      "commune_name": "قصر بلزمة",
      "daira_name_ascii": "Merouana",
      "daira_name": "مروانة",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "146": {
      "id": 146,
      "commune_name_ascii": "Larbaa",
      "commune_name": "لارباع",
      "daira_name_ascii": "Bouzina",
      "daira_name": "بوزينة",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": [
        {
          "center_id": 92101,
          "name": "Agence de Larbaa [Zimou-Express]\t",
          "address": "Rue El Emir Khaled",
          "gps": "36.5666270734497, 3.1543977163459918",
          "commune_id": 921,
          "commune_name": "Larbaa",
          "wilaya_id": 9,
          "wilaya_name": "Blida"
        }
      ]
    },
    "147": {
      "id": 147,
      "commune_name_ascii": "Lazrou",
      "commune_name": "لازرو",
      "daira_name_ascii": "Seriana",
      "daira_name": "سريانة",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "148": {
      "id": 148,
      "commune_name_ascii": "Lemcene",
      "commune_name": "لمسان",
      "daira_name_ascii": "Ouled Si Slimane",
      "daira_name": "أولاد سي سليمان",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "149": {
      "id": 149,
      "commune_name_ascii": "M Doukal",
      "commune_name": "إمدوكل",
      "daira_name_ascii": "Barika",
      "daira_name": "بريكة",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "150": {
      "id": 150,
      "commune_name_ascii": "Maafa",
      "commune_name": "معافة",
      "daira_name_ascii": "Ain Touta",
      "daira_name": "عين التوتة",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "151": {
      "id": 151,
      "commune_name_ascii": "Menaa",
      "commune_name": "منعة",
      "daira_name_ascii": "Menaa",
      "daira_name": "منعة",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "152": {
      "id": 152,
      "commune_name_ascii": "Merouana",
      "commune_name": "مروانة",
      "daira_name_ascii": "Merouana",
      "daira_name": "مروانة",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "153": {
      "id": 153,
      "commune_name_ascii": "N Gaous",
      "commune_name": "نقاوس",
      "daira_name_ascii": "N'gaous",
      "daira_name": "نقاوس",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "154": {
      "id": 154,
      "commune_name_ascii": "Oued Chaaba",
      "commune_name": "وادي الشعبة",
      "daira_name_ascii": "Batna",
      "daira_name": "باتنة",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "155": {
      "id": 155,
      "commune_name_ascii": "Oued El Ma",
      "commune_name": "وادي الماء",
      "daira_name_ascii": "Merouana",
      "daira_name": "مروانة",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "156": {
      "id": 156,
      "commune_name_ascii": "Oued Taga",
      "commune_name": "وادي الطاقة",
      "daira_name_ascii": "Theniet El Abed",
      "daira_name": "ثنية العابد",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "157": {
      "id": 157,
      "commune_name_ascii": "Ouled Ammar",
      "commune_name": "أولاد عمار",
      "daira_name_ascii": "Djezzar",
      "daira_name": "الجزار",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "158": {
      "id": 158,
      "commune_name_ascii": "Ouled Aouf",
      "commune_name": "أولاد عوف",
      "daira_name_ascii": "Ain Touta",
      "daira_name": "عين التوتة",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "159": {
      "id": 159,
      "commune_name_ascii": "Ouled Fadel",
      "commune_name": "أولاد فاضل",
      "daira_name_ascii": "Timgad",
      "daira_name": "تيمقاد",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "160": {
      "id": 160,
      "commune_name_ascii": "Ouled Sellem",
      "commune_name": "أولاد سلام",
      "daira_name_ascii": "Ras El Aioun",
      "daira_name": "رأس العيون",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "161": {
      "id": 161,
      "commune_name_ascii": "Ouled Si Slimane",
      "commune_name": "أولاد سي سليمان",
      "daira_name_ascii": "Ouled Si Slimane",
      "daira_name": "أولاد سي سليمان",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "162": {
      "id": 162,
      "commune_name_ascii": "Ouyoun El Assafir",
      "commune_name": "عيون العصافير",
      "daira_name_ascii": "Tazoult",
      "daira_name": "تازولت",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "163": {
      "id": 163,
      "commune_name_ascii": "Rahbat",
      "commune_name": "الرحبات",
      "daira_name_ascii": "Ras El Aioun",
      "daira_name": "رأس العيون",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "164": {
      "id": 164,
      "commune_name_ascii": "Ras El Aioun",
      "commune_name": "رأس العيون",
      "daira_name_ascii": "Ras El Aioun",
      "daira_name": "رأس العيون",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "165": {
      "id": 165,
      "commune_name_ascii": "Sefiane",
      "commune_name": "سفيان",
      "daira_name_ascii": "N'gaous",
      "daira_name": "نقاوس",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "166": {
      "id": 166,
      "commune_name_ascii": "Seggana",
      "commune_name": "سقانة",
      "daira_name_ascii": "Seggana",
      "daira_name": "سقانة",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "167": {
      "id": 167,
      "commune_name_ascii": "Seriana",
      "commune_name": "سريانة",
      "daira_name_ascii": "Seriana",
      "daira_name": "سريانة",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "168": {
      "id": 168,
      "commune_name_ascii": "T Kout",
      "commune_name": "تكوت",
      "daira_name_ascii": "Tkout",
      "daira_name": "تكوت",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "169": {
      "id": 169,
      "commune_name_ascii": "Talkhamt",
      "commune_name": "تالخمت",
      "daira_name_ascii": "Ras El Aioun",
      "daira_name": "رأس العيون",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "170": {
      "id": 170,
      "commune_name_ascii": "Taxlent",
      "commune_name": "تاكسلانت",
      "daira_name_ascii": "Ouled Si Slimane",
      "daira_name": "أولاد سي سليمان",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "171": {
      "id": 171,
      "commune_name_ascii": "Tazoult",
      "commune_name": "تازولت",
      "daira_name_ascii": "Tazoult",
      "daira_name": "تازولت",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "172": {
      "id": 172,
      "commune_name_ascii": "Teniet El Abed",
      "commune_name": "ثنية العابد",
      "daira_name_ascii": "Theniet El Abed",
      "daira_name": "ثنية العابد",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "173": {
      "id": 173,
      "commune_name_ascii": "Tighanimine",
      "commune_name": "تيغانمين",
      "daira_name_ascii": "Arris",
      "daira_name": "أريس",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "174": {
      "id": 174,
      "commune_name_ascii": "Tigharghar",
      "commune_name": "تغرغار",
      "daira_name_ascii": "Menaa",
      "daira_name": "منعة",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "175": {
      "id": 175,
      "commune_name_ascii": "Tilatou",
      "commune_name": "تيلاطو",
      "daira_name_ascii": "Seggana",
      "daira_name": "سقانة",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "176": {
      "id": 176,
      "commune_name_ascii": "Timgad",
      "commune_name": "تيمقاد",
      "daira_name_ascii": "Timgad",
      "daira_name": "تيمقاد",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "177": {
      "id": 177,
      "commune_name_ascii": "Zanet El Beida",
      "commune_name": "زانة البيضاء",
      "daira_name_ascii": "Seriana",
      "daira_name": "سريانة",
      "wilaya_code": "05",
      "wilaya_name_ascii": "Batna",
      "wilaya_name": "باتنة",
      "centers": []
    },
    "178": {
      "id": 178,
      "commune_name_ascii": "Adekar",
      "commune_name": "أدكار",
      "daira_name_ascii": "Adekar",
      "daira_name": "أدكار",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "179": {
      "id": 179,
      "commune_name_ascii": "Ait R'zine",
      "commune_name": "أيت رزين",
      "daira_name_ascii": "Ighil Ali",
      "daira_name": "إغيل علي",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "180": {
      "id": 180,
      "commune_name_ascii": "Ait-Smail",
      "commune_name": "أيت إسماعيل",
      "daira_name_ascii": "Darguina",
      "daira_name": "درقينة",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "181": {
      "id": 181,
      "commune_name_ascii": "Akbou",
      "commune_name": "أقبو",
      "daira_name_ascii": "Akbou",
      "daira_name": "أقبو",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": [
        {
          "center_id": 62501,
          "name": "Agence de Akbou Yalidine",
          "address": "Cite 16 Logement Eplf",
          "gps": "36.45941780427994,4.536392157727091",
          "commune_id": 625,
          "commune_name": "Akbou",
          "wilaya_id": 6,
          "wilaya_name": "Béjaïa"
        }
      ]
    },
    "182": {
      "id": 182,
      "commune_name_ascii": "Akfadou",
      "commune_name": "أكفادو",
      "daira_name_ascii": "Chemini",
      "daira_name": "شميني",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "183": {
      "id": 183,
      "commune_name_ascii": "Amalou",
      "commune_name": "أمالو",
      "daira_name_ascii": "Seddouk",
      "daira_name": "صدوق",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "184": {
      "id": 184,
      "commune_name_ascii": "Amizour",
      "commune_name": "أميزور",
      "daira_name_ascii": "Amizour",
      "daira_name": "أميزور",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "185": {
      "id": 185,
      "commune_name_ascii": "Aokas",
      "commune_name": "أوقاس",
      "daira_name_ascii": "Aokas",
      "daira_name": "أوقاس",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "186": {
      "id": 186,
      "commune_name_ascii": "Barbacha",
      "commune_name": "برباشة",
      "daira_name_ascii": "Barbacha",
      "daira_name": "برباشة",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "187": {
      "id": 187,
      "commune_name_ascii": "Bejaia",
      "commune_name": "بجاية",
      "daira_name_ascii": "Bejaia",
      "daira_name": "بجاية",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": [
        {
          "center_id": 60101,
          "name": "Agence de Béjaïa El Qods Guepex",
          "address": "5 Rue Des Freres Taguelmint El Qods En Face De La Gare Routiere",
          "gps": "36.75306773907594,5.080083740770594",
          "commune_id": 601,
          "commune_name": "Béjaïa",
          "wilaya_id": 6,
          "wilaya_name": "Béjaïa"
        },
        {
          "center_id": 60102,
          "name": "Agence de Béjaïa Edimco Yalidine",
          "address": "Zone Industrielle, Rue Mahfoudi Fateh, EDIMCO, (Derrière le centre commercial Ritadj-Mall)",
          "gps": "36.74500763190776,5.056510728863536",
          "commune_id": 601,
          "commune_name": "Béjaïa",
          "wilaya_id": 6,
          "wilaya_name": "Béjaïa"
        }
      ]
    },
    "188": {
      "id": 188,
      "commune_name_ascii": "Beni Djellil",
      "commune_name": "بني جليل",
      "daira_name_ascii": "Amizour",
      "daira_name": "أميزور",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "189": {
      "id": 189,
      "commune_name_ascii": "Beni K'sila",
      "commune_name": "بني كسيلة",
      "daira_name_ascii": "Adekar",
      "daira_name": "أدكار",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "190": {
      "id": 190,
      "commune_name_ascii": "Beni-Mallikeche",
      "commune_name": "بني مليكش",
      "daira_name_ascii": "Tazmalt",
      "daira_name": "تازملت",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "191": {
      "id": 191,
      "commune_name_ascii": "Benimaouche",
      "commune_name": "بني معوش",
      "daira_name_ascii": "Beni Maouche",
      "daira_name": "بني معوش",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "192": {
      "id": 192,
      "commune_name_ascii": "Boudjellil",
      "commune_name": "بو جليل",
      "daira_name_ascii": "Tazmalt",
      "daira_name": "تازملت",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "193": {
      "id": 193,
      "commune_name_ascii": "Bouhamza",
      "commune_name": "بوحمزة",
      "daira_name_ascii": "Seddouk",
      "daira_name": "صدوق",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "194": {
      "id": 194,
      "commune_name_ascii": "Boukhelifa",
      "commune_name": "بوخليفة",
      "daira_name_ascii": "Tichy",
      "daira_name": "تيشي",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "195": {
      "id": 195,
      "commune_name_ascii": "Chellata",
      "commune_name": "شلاطة",
      "daira_name_ascii": "Akbou",
      "daira_name": "أقبو",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "196": {
      "id": 196,
      "commune_name_ascii": "Chemini",
      "commune_name": "شميني",
      "daira_name_ascii": "Chemini",
      "daira_name": "شميني",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "197": {
      "id": 197,
      "commune_name_ascii": "Darguina",
      "commune_name": "درقينة",
      "daira_name_ascii": "Darguina",
      "daira_name": "درقينة",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "198": {
      "id": 198,
      "commune_name_ascii": "Dra El Caid",
      "commune_name": "ذراع القايد",
      "daira_name_ascii": "Kherrata",
      "daira_name": "خراطة",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "199": {
      "id": 199,
      "commune_name_ascii": "Leflaye",
      "commune_name": "الفلاي",
      "daira_name_ascii": "Sidi Aich",
      "daira_name": "سيدي عيش",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "200": {
      "id": 200,
      "commune_name_ascii": "El Kseur",
      "commune_name": "القصر",
      "daira_name_ascii": "El Kseur",
      "daira_name": "القصر",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": [
        {
          "center_id": 64001,
          "name": "Agence de El Kseur Guepex\t",
          "address": "Rue Meziane Hmimi",
          "gps": "36.68152543555525,4.853047853275546",
          "commune_id": 640,
          "commune_name": "El Kseur",
          "wilaya_id": 6,
          "wilaya_name": "Béjaïa"
        }
      ]
    },
    "201": {
      "id": 201,
      "commune_name_ascii": "Fenaia Il Maten",
      "commune_name": "فناية الماثن",
      "daira_name_ascii": "El Kseur",
      "daira_name": "القصر",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "202": {
      "id": 202,
      "commune_name_ascii": "Feraoun",
      "commune_name": "فرعون",
      "daira_name_ascii": "Amizour",
      "daira_name": "أميزور",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "203": {
      "id": 203,
      "commune_name_ascii": "Ouzellaguen",
      "commune_name": "أوزلاقن",
      "daira_name_ascii": "Ifri Ouzellaguene",
      "daira_name": "إفري أوزلاقن",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "204": {
      "id": 204,
      "commune_name_ascii": "Ighil-Ali",
      "commune_name": "إغيل علي",
      "daira_name_ascii": "Ighil Ali",
      "daira_name": "إغيل علي",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "205": {
      "id": 205,
      "commune_name_ascii": "Ighram",
      "commune_name": "اغرم",
      "daira_name_ascii": "Akbou",
      "daira_name": "أقبو",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "206": {
      "id": 206,
      "commune_name_ascii": "Kendira",
      "commune_name": "كنديرة",
      "daira_name_ascii": "Barbacha",
      "daira_name": "برباشة",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "207": {
      "id": 207,
      "commune_name_ascii": "Kherrata",
      "commune_name": "خراطة",
      "daira_name_ascii": "Kherrata",
      "daira_name": "خراطة",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "208": {
      "id": 208,
      "commune_name_ascii": "M'cisna",
      "commune_name": "مسيسنة",
      "daira_name_ascii": "Seddouk",
      "daira_name": "صدوق",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "209": {
      "id": 209,
      "commune_name_ascii": "Melbou",
      "commune_name": "مالبو",
      "daira_name_ascii": "Souk El Tenine",
      "daira_name": "سوق الإثنين",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "210": {
      "id": 210,
      "commune_name_ascii": "Oued Ghir",
      "commune_name": "وادي غير",
      "daira_name_ascii": "Bejaia",
      "daira_name": "بجاية",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "211": {
      "id": 211,
      "commune_name_ascii": "Seddouk",
      "commune_name": "صدوق",
      "daira_name_ascii": "Seddouk",
      "daira_name": "صدوق",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "212": {
      "id": 212,
      "commune_name_ascii": "Sidi Ayad",
      "commune_name": "سيدي عياد",
      "daira_name_ascii": "Sidi Aich",
      "daira_name": "سيدي عيش",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "213": {
      "id": 213,
      "commune_name_ascii": "Sidi-Aich",
      "commune_name": "سيدي عيش",
      "daira_name_ascii": "Sidi Aich",
      "daira_name": "سيدي عيش",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "214": {
      "id": 214,
      "commune_name_ascii": "Smaoun",
      "commune_name": "سمعون",
      "daira_name_ascii": "Amizour",
      "daira_name": "أميزور",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "215": {
      "id": 215,
      "commune_name_ascii": "Souk El Tenine",
      "commune_name": "سوق لإثنين",
      "daira_name_ascii": "Souk El Tenine",
      "daira_name": "سوق الإثنين",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "216": {
      "id": 216,
      "commune_name_ascii": "Souk Oufella",
      "commune_name": "سوق اوفلا",
      "daira_name_ascii": "Chemini",
      "daira_name": "شميني",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "217": {
      "id": 217,
      "commune_name_ascii": "Tala Hamza",
      "commune_name": "تالة حمزة",
      "daira_name_ascii": "Tichy",
      "daira_name": "تيشي",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "218": {
      "id": 218,
      "commune_name_ascii": "Tamokra",
      "commune_name": "تامقرة",
      "daira_name_ascii": "Akbou",
      "daira_name": "أقبو",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "219": {
      "id": 219,
      "commune_name_ascii": "Tamridjet",
      "commune_name": "تامريجت",
      "daira_name_ascii": "Souk El Tenine",
      "daira_name": "سوق الإثنين",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "220": {
      "id": 220,
      "commune_name_ascii": "Taourit Ighil",
      "commune_name": "تاوريرت إغيل",
      "daira_name_ascii": "Adekar",
      "daira_name": "أدكار",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "221": {
      "id": 221,
      "commune_name_ascii": "Taskriout",
      "commune_name": "تاسكريوت",
      "daira_name_ascii": "Darguina",
      "daira_name": "درقينة",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "222": {
      "id": 222,
      "commune_name_ascii": "Tazmalt",
      "commune_name": "تازمالت",
      "daira_name_ascii": "Tazmalt",
      "daira_name": "تازملت",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "223": {
      "id": 223,
      "commune_name_ascii": "Tibane",
      "commune_name": "طيبان",
      "daira_name_ascii": "Chemini",
      "daira_name": "شميني",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "224": {
      "id": 224,
      "commune_name_ascii": "Tichy",
      "commune_name": "تيشي",
      "daira_name_ascii": "Tichy",
      "daira_name": "تيشي",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "225": {
      "id": 225,
      "commune_name_ascii": "Tifra",
      "commune_name": "تيفرة",
      "daira_name_ascii": "Sidi Aich",
      "daira_name": "سيدي عيش",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "226": {
      "id": 226,
      "commune_name_ascii": "Timezrit",
      "commune_name": "تيمزريت",
      "daira_name_ascii": "Timezrit",
      "daira_name": "تيمزريت",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "227": {
      "id": 227,
      "commune_name_ascii": "Tinebdar",
      "commune_name": "تينبدار",
      "daira_name_ascii": "Sidi Aich",
      "daira_name": "سيدي عيش",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "228": {
      "id": 228,
      "commune_name_ascii": "Tizi-N'berber",
      "commune_name": "تيزي نبربر",
      "daira_name_ascii": "Aokas",
      "daira_name": "أوقاس",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "229": {
      "id": 229,
      "commune_name_ascii": "Toudja",
      "commune_name": "توجة",
      "daira_name_ascii": "El Kseur",
      "daira_name": "القصر",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": []
    },
    "230": {
      "id": 230,
      "commune_name_ascii": "Ain Naga",
      "commune_name": "عين الناقة",
      "daira_name_ascii": "Sidi Okba",
      "daira_name": "سيدي عقبة",
      "wilaya_code": "07",
      "wilaya_name_ascii": "Biskra",
      "wilaya_name": "بسكرة",
      "centers": []
    },
    "231": {
      "id": 231,
      "commune_name_ascii": "Ain Zaatout",
      "commune_name": "عين زعطوط",
      "daira_name_ascii": "El Kantara",
      "daira_name": "القنطرة",
      "wilaya_code": "07",
      "wilaya_name_ascii": "Biskra",
      "wilaya_name": "بسكرة",
      "centers": []
    },
    "232": {
      "id": 232,
      "commune_name_ascii": "Besbes",
      "commune_name": "بسباس",
      "daira_name_ascii": "Sidi Khaled",
      "daira_name": "سيدي  خالد",
      "wilaya_code": "51",
      "wilaya_name_ascii": "Ouled Djellal",
      "wilaya_name": "أولاد جلال",
      "centers": []
    },
    "233": {
      "id": 233,
      "commune_name_ascii": "Biskra",
      "commune_name": "بسكرة",
      "daira_name_ascii": "Biskra",
      "daira_name": "بسكرة",
      "wilaya_code": "07",
      "wilaya_name_ascii": "Biskra",
      "wilaya_name": "بسكرة",
      "centers": [
        {
          "center_id": 70402,
          "name": "Agence zone ouest Biskra Easy and speed",
          "address": "coopératif du verger N°22 zone ouest Biskra ",
          "gps": "34.86410253083451,5.715919862126138",
          "commune_id": 704,
          "commune_name": "Biskra",
          "wilaya_id": 7,
          "wilaya_name": "Biskra"
        }
      ]
    },
    "234": {
      "id": 234,
      "commune_name_ascii": "Bordj Ben Azzouz",
      "commune_name": "برج بن عزوز",
      "daira_name_ascii": "Tolga",
      "daira_name": "طولقة",
      "wilaya_code": "07",
      "wilaya_name_ascii": "Biskra",
      "wilaya_name": "بسكرة",
      "centers": []
    },
    "235": {
      "id": 235,
      "commune_name_ascii": "Bouchakroun",
      "commune_name": "بوشقرون",
      "daira_name_ascii": "Tolga",
      "daira_name": "طولقة",
      "wilaya_code": "07",
      "wilaya_name_ascii": "Biskra",
      "wilaya_name": "بسكرة",
      "centers": []
    },
    "236": {
      "id": 236,
      "commune_name_ascii": "Branis",
      "commune_name": "برانيس",
      "daira_name_ascii": "Djemorah",
      "daira_name": "جمورة",
      "wilaya_code": "07",
      "wilaya_name_ascii": "Biskra",
      "wilaya_name": "بسكرة",
      "centers": []
    },
    "237": {
      "id": 237,
      "commune_name_ascii": "Chaiba",
      "commune_name": "الشعيبة",
      "daira_name_ascii": "Ouled Djellal",
      "daira_name": "أولاد جلال",
      "wilaya_code": "51",
      "wilaya_name_ascii": "Ouled Djellal",
      "wilaya_name": "أولاد جلال",
      "centers": []
    },
    "238": {
      "id": 238,
      "commune_name_ascii": "Chetma",
      "commune_name": "شتمة",
      "daira_name_ascii": "Sidi Okba",
      "daira_name": "سيدي عقبة",
      "wilaya_code": "07",
      "wilaya_name_ascii": "Biskra",
      "wilaya_name": "بسكرة",
      "centers": []
    },
    "239": {
      "id": 239,
      "commune_name_ascii": "Djemorah",
      "commune_name": "جمورة",
      "daira_name_ascii": "Djemorah",
      "daira_name": "جمورة",
      "wilaya_code": "07",
      "wilaya_name_ascii": "Biskra",
      "wilaya_name": "بسكرة",
      "centers": []
    },
    "240": {
      "id": 240,
      "commune_name_ascii": "Doucen",
      "commune_name": "الدوسن",
      "daira_name_ascii": "Ouled Djellal",
      "daira_name": "أولاد جلال",
      "wilaya_code": "51",
      "wilaya_name_ascii": "Ouled Djellal",
      "wilaya_name": "أولاد جلال",
      "centers": []
    },
    "241": {
      "id": 241,
      "commune_name_ascii": "El Feidh",
      "commune_name": "الفيض",
      "daira_name_ascii": "Zeribet El Oued",
      "daira_name": "زريبة الوادي",
      "wilaya_code": "07",
      "wilaya_name_ascii": "Biskra",
      "wilaya_name": "بسكرة",
      "centers": []
    },
    "242": {
      "id": 242,
      "commune_name_ascii": "El Ghrous",
      "commune_name": "الغروس",
      "daira_name_ascii": "Foughala",
      "daira_name": "فوغالة",
      "wilaya_code": "07",
      "wilaya_name_ascii": "Biskra",
      "wilaya_name": "بسكرة",
      "centers": []
    },
    "243": {
      "id": 243,
      "commune_name_ascii": "El Hadjab",
      "commune_name": "الحاجب",
      "daira_name_ascii": "Biskra",
      "daira_name": "بسكرة",
      "wilaya_code": "07",
      "wilaya_name_ascii": "Biskra",
      "wilaya_name": "بسكرة",
      "centers": []
    },
    "244": {
      "id": 244,
      "commune_name_ascii": "El Haouch",
      "commune_name": "الحوش",
      "daira_name_ascii": "Sidi Okba",
      "daira_name": "سيدي عقبة",
      "wilaya_code": "07",
      "wilaya_name_ascii": "Biskra",
      "wilaya_name": "بسكرة",
      "centers": [
       
      ]
    },
    "245": {
      "id": 245,
      "commune_name_ascii": "El Kantara",
      "commune_name": "القنطرة",
      "daira_name_ascii": "El Kantara",
      "daira_name": "القنطرة",
      "wilaya_code": "07",
      "wilaya_name_ascii": "Biskra",
      "wilaya_name": "بسكرة",
      "centers": []
    },
    "246": {
      "id": 246,
      "commune_name_ascii": "El Outaya",
      "commune_name": "الوطاية",
      "daira_name_ascii": "El Outaya",
      "daira_name": "الوطاية",
      "wilaya_code": "07",
      "wilaya_name_ascii": "Biskra",
      "wilaya_name": "بسكرة",
      "centers": []
    },
    "247": {
      "id": 247,
      "commune_name_ascii": "Foughala",
      "commune_name": "فوغالة",
      "daira_name_ascii": "Foughala",
      "daira_name": "فوغالة",
      "wilaya_code": "07",
      "wilaya_name_ascii": "Biskra",
      "wilaya_name": "بسكرة",
      "centers": []
    },
    "248": {
      "id": 248,
      "commune_name_ascii": "Khenguet Sidi Nadji",
      "commune_name": "خنقة سيدي ناجي",
      "daira_name_ascii": "Zeribet El Oued",
      "daira_name": "زريبة الوادي",
      "wilaya_code": "07",
      "wilaya_name_ascii": "Biskra",
      "wilaya_name": "بسكرة",
      "centers": []
    },
    "249": {
      "id": 249,
      "commune_name_ascii": "Lichana",
      "commune_name": "ليشانة",
      "daira_name_ascii": "Tolga",
      "daira_name": "طولقة",
      "wilaya_code": "07",
      "wilaya_name_ascii": "Biskra",
      "wilaya_name": "بسكرة",
      "centers": []
    },
    "250": {
      "id": 250,
      "commune_name_ascii": "Lioua",
      "commune_name": "ليوة",
      "daira_name_ascii": "Ourlal",
      "daira_name": "أورلال",
      "wilaya_code": "07",
      "wilaya_name_ascii": "Biskra",
      "wilaya_name": "بسكرة",
      "centers": []
    },
    "251": {
      "id": 251,
      "commune_name_ascii": "M'chouneche",
      "commune_name": "مشونش",
      "daira_name_ascii": "Mechouneche",
      "daira_name": "مشونش",
      "wilaya_code": "07",
      "wilaya_name_ascii": "Biskra",
      "wilaya_name": "بسكرة",
      "centers": []
    },
    "252": {
      "id": 252,
      "commune_name_ascii": "Mekhadma",
      "commune_name": "مخادمة",
      "daira_name_ascii": "Ourlal",
      "daira_name": "أورلال",
      "wilaya_code": "07",
      "wilaya_name_ascii": "Biskra",
      "wilaya_name": "بسكرة",
      "centers": []
    },
    "253": {
      "id": 253,
      "commune_name_ascii": "Meziraa",
      "commune_name": "المزيرعة",
      "daira_name_ascii": "Zeribet El Oued",
      "daira_name": "زريبة الوادي",
      "wilaya_code": "07",
      "wilaya_name_ascii": "Biskra",
      "wilaya_name": "بسكرة",
      "centers": []
    },
    "254": {
      "id": 254,
      "commune_name_ascii": "M'lili",
      "commune_name": "مليلي",
      "daira_name_ascii": "Ourlal",
      "daira_name": "أورلال",
      "wilaya_code": "07",
      "wilaya_name_ascii": "Biskra",
      "wilaya_name": "بسكرة",
      "centers": []
    },
    "255": {
      "id": 255,
      "commune_name_ascii": "Ouled Djellal",
      "commune_name": "أولاد جلال",
      "daira_name_ascii": "Ouled Djellal",
      "daira_name": "أولاد جلال",
      "wilaya_code": "51",
      "wilaya_name_ascii": "Ouled Djellal",
      "wilaya_name": "أولاد جلال",
      "centers": [
        {
          "center_id": 512601,
          "name": "Agence de Ouled Djellal [Yalidine]\t",
          "address": "Rue Gasmi Ibrahim (En Face Ecole Mazen School)",
          "gps": "34.43692622498558,5.069068600603627",
          "commune_id": 5126,
          "commune_name": "Ouled Djellal",
          "wilaya_id": 51,
          "wilaya_name": "Ouled Djellal"
        }
      ]
    },
    "256": {
      "id": 256,
      "commune_name_ascii": "Oumache",
      "commune_name": "أوماش",
      "daira_name_ascii": "Ourlal",
      "daira_name": "أورلال",
      "wilaya_code": "07",
      "wilaya_name_ascii": "Biskra",
      "wilaya_name": "بسكرة",
      "centers": []
    },
    "257": {
      "id": 257,
      "commune_name_ascii": "Ourlal",
      "commune_name": "أورلال",
      "daira_name_ascii": "Ourlal",
      "daira_name": "أورلال",
      "wilaya_code": "07",
      "wilaya_name_ascii": "Biskra",
      "wilaya_name": "بسكرة",
      "centers": []
    },
    "258": {
      "id": 258,
      "commune_name_ascii": "Ras El Miad",
      "commune_name": "رأس الميعاد",
      "daira_name_ascii": "Sidi Khaled",
      "daira_name": "سيدي  خالد",
      "wilaya_code": "51",
      "wilaya_name_ascii": "Ouled Djellal",
      "wilaya_name": "أولاد جلال",
      "centers": []
    },
    "259": {
      "id": 259,
      "commune_name_ascii": "Sidi Khaled",
      "commune_name": "سيدي  خالد",
      "daira_name_ascii": "Sidi Khaled",
      "daira_name": "سيدي  خالد",
      "wilaya_code": "51",
      "wilaya_name_ascii": "Ouled Djellal",
      "wilaya_name": "أولاد جلال",
      "centers": []
    },
    "260": {
      "id": 260,
      "commune_name_ascii": "Sidi Okba",
      "commune_name": "سيدي عقبة",
      "daira_name_ascii": "Sidi Okba",
      "daira_name": "سيدي عقبة",
      "wilaya_code": "07",
      "wilaya_name_ascii": "Biskra",
      "wilaya_name": "بسكرة",
      "centers": []
    },
    "261": {
      "id": 261,
      "commune_name_ascii": "Tolga",
      "commune_name": "طولقة",
      "daira_name_ascii": "Tolga",
      "daira_name": "طولقة",
      "wilaya_code": "07",
      "wilaya_name_ascii": "Biskra",
      "wilaya_name": "بسكرة",
      "centers": [
        {
          "center_id": 73201,
          "name": "Agence de Tolga Guepex",
          "address": "Cité Sidi Rouak rue Soltani Ahmed",
          "gps": "34.73467307145867,5.381802271145784",
          "commune_id": 732,
          "commune_name": "Tolga",
          "wilaya_id": 7,
          "wilaya_name": "Biskra"
        }
      ]
    },
    "262": {
      "id": 262,
      "commune_name_ascii": "Zeribet El Oued",
      "commune_name": "زريبة الوادي",
      "daira_name_ascii": "Zeribet El Oued",
      "daira_name": "زريبة الوادي",
      "wilaya_code": "07",
      "wilaya_name_ascii": "Biskra",
      "wilaya_name": "بسكرة",
      "centers": []
    },
    "263": {
      "id": 263,
      "commune_name_ascii": "Abadla",
      "commune_name": "العبادلة",
      "daira_name_ascii": "Abadla",
      "daira_name": "العبادلة",
      "wilaya_code": "08",
      "wilaya_name_ascii": "Béchar",
      "wilaya_name": "بشار",
      "centers": []
    },
    "264": {
      "id": 264,
      "commune_name_ascii": "Bechar",
      "commune_name": "بشار",
      "daira_name_ascii": "Bechar",
      "daira_name": "بشار",
      "wilaya_code": "08",
      "wilaya_name_ascii": "Béchar",
      "wilaya_name": "بشار",
      "centers": [
        {
          "center_id": 80101,
          "name": "Agence de Béchar Yalidine",
          "address": "Cite Hai El Badr, Lot N°50, Secteur N°49, Local 01.",
          "gps": "31.605981803220686,-2.232912635019772",
          "commune_id": 801,
          "commune_name": "Béchar",
          "wilaya_id": 8,
          "wilaya_name": "Béchar"
        }
      ]
    },
    "265": {
      "id": 265,
      "commune_name_ascii": "Beni-Abbes",
      "commune_name": "بني عباس",
      "daira_name_ascii": "Beni Abbes",
      "daira_name": "بني عباس",
      "wilaya_code": "52",
      "wilaya_name_ascii": "Béni Abbès",
      "wilaya_name": "بني عباس",
      "centers": []
    },
    "266": {
      "id": 266,
      "commune_name_ascii": "Beni-Ikhlef",
      "commune_name": "بن يخلف",
      "daira_name_ascii": "Kerzaz",
      "daira_name": "كرزاز",
      "wilaya_code": "52",
      "wilaya_name_ascii": "Béni Abbès",
      "wilaya_name": "بني عباس",
      "centers": []
    },
    "267": {
      "id": 267,
      "commune_name_ascii": "Beni-Ounif",
      "commune_name": "بني ونيف",
      "daira_name_ascii": "Beni Ounif",
      "daira_name": "بني ونيف",
      "wilaya_code": "08",
      "wilaya_name_ascii": "Béchar",
      "wilaya_name": "بشار",
      "centers": []
    },
    "268": {
      "id": 268,
      "commune_name_ascii": "Boukais",
      "commune_name": "بوكايس",
      "daira_name_ascii": "Lahmar",
      "daira_name": "لحمر",
      "wilaya_code": "08",
      "wilaya_name_ascii": "Béchar",
      "wilaya_name": "بشار",
      "centers": []
    },
    "269": {
      "id": 269,
      "commune_name_ascii": "El Ouata",
      "commune_name": "الواتة",
      "daira_name_ascii": "El Ouata",
      "daira_name": "الواتة",
      "wilaya_code": "52",
      "wilaya_name_ascii": "Béni Abbès",
      "wilaya_name": "بني عباس",
      "centers": []
    },
    "270": {
      "id": 270,
      "commune_name_ascii": "Erg-Ferradj",
      "commune_name": "عرق فراج",
      "daira_name_ascii": "Abadla",
      "daira_name": "العبادلة",
      "wilaya_code": "08",
      "wilaya_name_ascii": "Béchar",
      "wilaya_name": "بشار",
      "centers": []
    },
    "271": {
      "id": 271,
      "commune_name_ascii": "Igli",
      "commune_name": "إقلي",
      "daira_name_ascii": "Igli",
      "daira_name": "إقلي",
      "wilaya_code": "52",
      "wilaya_name_ascii": "Béni Abbès",
      "wilaya_name": "بني عباس",
      "centers": []
    },
    "272": {
      "id": 272,
      "commune_name_ascii": "Kenadsa",
      "commune_name": "القنادسة",
      "daira_name_ascii": "Kenadsa",
      "daira_name": "القنادسة",
      "wilaya_code": "08",
      "wilaya_name_ascii": "Béchar",
      "wilaya_name": "بشار",
      "centers": []
    },
    "273": {
      "id": 273,
      "commune_name_ascii": "Kerzaz",
      "commune_name": "كرزاز",
      "daira_name_ascii": "Kerzaz",
      "daira_name": "كرزاز",
      "wilaya_code": "52",
      "wilaya_name_ascii": "Béni Abbès",
      "wilaya_name": "بني عباس",
      "centers": []
    },
    "274": {
      "id": 274,
      "commune_name_ascii": "Ksabi",
      "commune_name": "القصابي",
      "daira_name_ascii": "Ouled Khodeir",
      "daira_name": "أولاد خضير",
      "wilaya_code": "52",
      "wilaya_name_ascii": "Béni Abbès",
      "wilaya_name": "بني عباس",
      "centers": []
    },
    "275": {
      "id": 275,
      "commune_name_ascii": "Lahmar",
      "commune_name": "لحمر",
      "daira_name_ascii": "Lahmar",
      "daira_name": "لحمر",
      "wilaya_code": "08",
      "wilaya_name_ascii": "Béchar",
      "wilaya_name": "بشار",
      "centers": []
    },
    "276": {
      "id": 276,
      "commune_name_ascii": "Machraa-Houari-Boumediene",
      "commune_name": "مشرع هواري بومدين",
      "daira_name_ascii": "Abadla",
      "daira_name": "العبادلة",
      "wilaya_code": "08",
      "wilaya_name_ascii": "Béchar",
      "wilaya_name": "بشار",
      "centers": []
    },
    "277": {
      "id": 277,
      "commune_name_ascii": "Meridja",
      "commune_name": "المريجة",
      "daira_name_ascii": "Kenadsa",
      "daira_name": "القنادسة",
      "wilaya_code": "08",
      "wilaya_name_ascii": "Béchar",
      "wilaya_name": "بشار",
      "centers": []
    },
    "278": {
      "id": 278,
      "commune_name_ascii": "Mogheul",
      "commune_name": "موغل",
      "daira_name_ascii": "Lahmar",
      "daira_name": "لحمر",
      "wilaya_code": "08",
      "wilaya_name_ascii": "Béchar",
      "wilaya_name": "بشار",
      "centers": []
    },
    "279": {
      "id": 279,
      "commune_name_ascii": "Ouled-Khodeir",
      "commune_name": "أولاد خضير",
      "daira_name_ascii": "Ouled Khodeir",
      "daira_name": "أولاد خضير",
      "wilaya_code": "52",
      "wilaya_name_ascii": "Béni Abbès",
      "wilaya_name": "بني عباس",
      "centers": []
    },
    "280": {
      "id": 280,
      "commune_name_ascii": "Tabelbala",
      "commune_name": "تبلبالة",
      "daira_name_ascii": "Tabelbala",
      "daira_name": "تبلبالة",
      "wilaya_code": "08",
      "wilaya_name_ascii": "Béchar",
      "wilaya_name": "بشار",
      "centers": []
    },
    "281": {
      "id": 281,
      "commune_name_ascii": "Taghit",
      "commune_name": "تاغيت",
      "daira_name_ascii": "Taghit",
      "daira_name": "تاغيت",
      "wilaya_code": "08",
      "wilaya_name_ascii": "Béchar",
      "wilaya_name": "بشار",
      "centers": []
    },
    "282": {
      "id": 282,
      "commune_name_ascii": "Tamtert",
      "commune_name": "تامترت",
      "daira_name_ascii": "Beni Abbes",
      "daira_name": "بني عباس",
      "wilaya_code": "52",
      "wilaya_name_ascii": "Béni Abbès",
      "wilaya_name": "بني عباس",
      "centers": []
    },
    "283": {
      "id": 283,
      "commune_name_ascii": "Timoudi",
      "commune_name": "تيمودي",
      "daira_name_ascii": "Kerzaz",
      "daira_name": "كرزاز",
      "wilaya_code": "52",
      "wilaya_name_ascii": "Béni Abbès",
      "wilaya_name": "بني عباس",
      "centers": []
    },
    "284": {
      "id": 284,
      "commune_name_ascii": "Ain Romana",
      "commune_name": "عين الرمانة",
      "daira_name_ascii": "Mouzaia",
      "daira_name": "موزاية",
      "wilaya_code": "09",
      "wilaya_name_ascii": "Blida",
      "wilaya_name": "البليدة",
      "centers": []
    },
    "285": {
      "id": 285,
      "commune_name_ascii": "Beni Mered",
      "commune_name": "بني مراد",
      "daira_name_ascii": "Ouled Yaich",
      "daira_name": "أولاد يعيش",
      "wilaya_code": "09",
      "wilaya_name_ascii": "Blida",
      "wilaya_name": "البليدة",
      "centers": []
    },
    "286": {
      "id": 286,
      "commune_name_ascii": "Beni-Tamou",
      "commune_name": "بني تامو",
      "daira_name_ascii": "Oued El Alleug",
      "daira_name": "وادي العلايق",
      "wilaya_code": "09",
      "wilaya_name_ascii": "Blida",
      "wilaya_name": "البليدة",
      "centers": []
    },
    "287": {
      "id": 287,
      "commune_name_ascii": "Benkhelil",
      "commune_name": "بن خليل",
      "daira_name_ascii": "Oued El Alleug",
      "daira_name": "وادي العلايق",
      "wilaya_code": "09",
      "wilaya_name_ascii": "Blida",
      "wilaya_name": "البليدة",
      "centers": []
    },
    "288": {
      "id": 288,
      "commune_name_ascii": "Blida",
      "commune_name": "البليدة",
      "daira_name_ascii": "Blida",
      "daira_name": "البليدة",
      "wilaya_code": "09",
      "wilaya_name_ascii": "Blida",
      "wilaya_name": "البليدة",
      "centers": [
        {
          "center_id": 90101,
          "name": "Agence de Blida [Yalidine]",
          "address": "La zone indistruelle Ben Boulaid (devant Family Shop)",
          "gps": "36.49196812851148, 2.8424850849082146",
          "commune_id": 901,
          "commune_name": "Blida",
          "wilaya_id": 9,
          "wilaya_name": "Blida"
        },
        {
          "center_id": 90102,
          "name": "Agence de Bab Dzair [Guepex]\t",
          "address": "21 centre d'artisans, rue d'Alger",
          "gps": "36.472777177490215,2.8313255422774586",
          "commune_id": 901,
          "commune_name": "Blida",
          "wilaya_id": 9,
          "wilaya_name": "Blida"
        }
      ]
    },
    "289": {
      "id": 289,
      "commune_name_ascii": "Bouarfa",
      "commune_name": "بوعرفة",
      "daira_name_ascii": "Blida",
      "daira_name": "البليدة",
      "wilaya_code": "09",
      "wilaya_name_ascii": "Blida",
      "wilaya_name": "البليدة",
      "centers": [
        {
          "center_id": 92401,
          "name": "Agence de Bouarfa [Yalidine]",
          "address": "Rue Principale, N°24.",
          "gps": "36.46731845758894, 2.8186531568146003",
          "commune_id": 924,
          "commune_name": "Bouarfa",
          "wilaya_id": 9,
          "wilaya_name": "Blida"
        }
      ]
    },
    "290": {
      "id": 290,
      "commune_name_ascii": "Boufarik",
      "commune_name": "بوفاريك",
      "daira_name_ascii": "Boufarik",
      "daira_name": "بوفاريك",
      "wilaya_code": "09",
      "wilaya_name_ascii": "Blida",
      "wilaya_name": "البليدة",
      "centers": [
        {
          "center_id": 92001,
          "name": "Agence de Boufarik [Guepex]\t",
          "address": "64 Rue Si Ben Youcef",
          "gps": "36.57409336434954,2.9140737574757805",
          "commune_id": 920,
          "commune_name": "Boufarik",
          "wilaya_id": 9,
          "wilaya_name": "Blida"
        }
      ]
    },
    "291": {
      "id": 291,
      "commune_name_ascii": "Bougara",
      "commune_name": "بوقرة",
      "daira_name_ascii": "Bougara",
      "daira_name": "بوقرة",
      "wilaya_code": "09",
      "wilaya_name_ascii": "Blida",
      "wilaya_name": "البليدة",
      "centers": []
    },
    "292": {
      "id": 292,
      "commune_name_ascii": "Bouinan",
      "commune_name": "بوعينان",
      "daira_name_ascii": "Bouinan",
      "daira_name": "بوعينان",
      "wilaya_code": "09",
      "wilaya_name_ascii": "Blida",
      "wilaya_name": "البليدة",
      "centers": []
    },
    "293": {
      "id": 293,
      "commune_name_ascii": "Chebli",
      "commune_name": "الشبلي",
      "daira_name_ascii": "Bouinan",
      "daira_name": "بوعينان",
      "wilaya_code": "09",
      "wilaya_name_ascii": "Blida",
      "wilaya_name": "البليدة",
      "centers": []
    },
    "294": {
      "id": 294,
      "commune_name_ascii": "Chiffa",
      "commune_name": "الشفة",
      "daira_name_ascii": "Mouzaia",
      "daira_name": "موزاية",
      "wilaya_code": "09",
      "wilaya_name_ascii": "Blida",
      "wilaya_name": "البليدة",
      "centers": []
    },
    "295": {
      "id": 295,
      "commune_name_ascii": "Chrea",
      "commune_name": "الشريعة",
      "daira_name_ascii": "Ouled Yaich",
      "daira_name": "أولاد يعيش",
      "wilaya_code": "09",
      "wilaya_name_ascii": "Blida",
      "wilaya_name": "البليدة",
      "centers": []
    },
    "296": {
      "id": 296,
      "commune_name_ascii": "Djebabra",
      "commune_name": "جبابرة",
      "daira_name_ascii": "Meftah",
      "daira_name": "مفتاح",
      "wilaya_code": "09",
      "wilaya_name_ascii": "Blida",
      "wilaya_name": "البليدة",
      "centers": []
    },
    "297": {
      "id": 297,
      "commune_name_ascii": "El-Affroun",
      "commune_name": "العفرون",
      "daira_name_ascii": "El Affroun",
      "daira_name": "العفرون",
      "wilaya_code": "09",
      "wilaya_name_ascii": "Blida",
      "wilaya_name": "البليدة",
      "centers": []
    },
    "298": {
      "id": 298,
      "commune_name_ascii": "Guerrouaou",
      "commune_name": "قرواو",
      "daira_name_ascii": "Boufarik",
      "daira_name": "بوفاريك",
      "wilaya_code": "09",
      "wilaya_name_ascii": "Blida",
      "wilaya_name": "البليدة",
      "centers": []
    },
    "299": {
      "id": 299,
      "commune_name_ascii": "Hammam Elouane",
      "commune_name": "حمام ملوان",
      "daira_name_ascii": "Bougara",
      "daira_name": "بوقرة",
      "wilaya_code": "09",
      "wilaya_name_ascii": "Blida",
      "wilaya_name": "البليدة",
      "centers": []
    },
    "300": {
      "id": 300,
      "commune_name_ascii": "Larbaa",
      "commune_name": "الأربعاء",
      "daira_name_ascii": "Larbaa",
      "daira_name": "الأربعاء",
      "wilaya_code": "09",
      "wilaya_name_ascii": "Blida",
      "wilaya_name": "البليدة",
      "centers": []
    },
    "301": {
      "id": 301,
      "commune_name_ascii": "Meftah",
      "commune_name": "مفتاح",
      "daira_name_ascii": "Meftah",
      "daira_name": "مفتاح",
      "wilaya_code": "09",
      "wilaya_name_ascii": "Blida",
      "wilaya_name": "البليدة",
      "centers": []
    },
    "302": {
      "id": 302,
      "commune_name_ascii": "Mouzaia",
      "commune_name": "موزاية",
      "daira_name_ascii": "Mouzaia",
      "daira_name": "موزاية",
      "wilaya_code": "09",
      "wilaya_name_ascii": "Blida",
      "wilaya_name": "البليدة",
      "centers": []
    },
    "303": {
      "id": 303,
      "commune_name_ascii": "Oued  Djer",
      "commune_name": "وادي جر",
      "daira_name_ascii": "El Affroun",
      "daira_name": "العفرون",
      "wilaya_code": "09",
      "wilaya_name_ascii": "Blida",
      "wilaya_name": "البليدة",
      "centers": []
    },
    "304": {
      "id": 304,
      "commune_name_ascii": "Oued El Alleug",
      "commune_name": "وادي العلايق",
      "daira_name_ascii": "Oued El Alleug",
      "daira_name": "وادي العلايق",
      "wilaya_code": "09",
      "wilaya_name_ascii": "Blida",
      "wilaya_name": "البليدة",
      "centers": []
    },
    "305": {
      "id": 305,
      "commune_name_ascii": "Ouled Slama",
      "commune_name": "اولاد سلامة",
      "daira_name_ascii": "Bougara",
      "daira_name": "بوقرة",
      "wilaya_code": "09",
      "wilaya_name_ascii": "Blida",
      "wilaya_name": "البليدة",
      "centers": []
    },
    "306": {
      "id": 306,
      "commune_name_ascii": "Ouled Yaich",
      "commune_name": "أولاد يعيش",
      "daira_name_ascii": "Ouled Yaich",
      "daira_name": "أولاد يعيش",
      "wilaya_code": "09",
      "wilaya_name_ascii": "Blida",
      "wilaya_name": "البليدة",
      "centers": [
        {
          "center_id": 90701,
          "name": "Agence Ouled Yaich Yalidine",
          "address": "Rue de la mosquée ",
          "gps": "36.495598820799735,2.8604034367518314",
          "commune_id": 907,
          "commune_name": "Ouled Yaïch",
          "wilaya_id": 9,
          "wilaya_name": "Blida"
        }
      ]
    },
    "307": {
      "id": 307,
      "commune_name_ascii": "Souhane",
      "commune_name": "صوحان",
      "daira_name_ascii": "Larbaa",
      "daira_name": "الأربعاء",
      "wilaya_code": "09",
      "wilaya_name_ascii": "Blida",
      "wilaya_name": "البليدة",
      "centers": []
    },
    "308": {
      "id": 308,
      "commune_name_ascii": "Soumaa",
      "commune_name": "الصومعة",
      "daira_name_ascii": "Boufarik",
      "daira_name": "بوفاريك",
      "wilaya_code": "09",
      "wilaya_name_ascii": "Blida",
      "wilaya_name": "البليدة",
      "centers": []
    },
    "309": {
      "id": 309,
      "commune_name_ascii": "Aghbalou",
      "commune_name": "أغبالو",
      "daira_name_ascii": "M'chedallah",
      "daira_name": "مشد الله",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "310": {
      "id": 310,
      "commune_name_ascii": "Ahl El Ksar",
      "commune_name": "أهل القصر",
      "daira_name_ascii": "Bechloul",
      "daira_name": "بشلول",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "311": {
      "id": 311,
      "commune_name_ascii": "Ain El Hadjar",
      "commune_name": "عين الحجر",
      "daira_name_ascii": "Ain Bessem",
      "daira_name": "عين بسام",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "312": {
      "id": 312,
      "commune_name_ascii": "Ain Laloui",
      "commune_name": "عين العلوي",
      "daira_name_ascii": "Ain Bessem",
      "daira_name": "عين بسام",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "313": {
      "id": 313,
      "commune_name_ascii": "Ain Turk",
      "commune_name": "عين الترك",
      "daira_name_ascii": "Bouira",
      "daira_name": "البويرة",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "314": {
      "id": 314,
      "commune_name_ascii": "Ain-Bessem",
      "commune_name": "عين بسام",
      "daira_name_ascii": "Ain Bessem",
      "daira_name": "عين بسام",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "315": {
      "id": 315,
      "commune_name_ascii": "Ait Laaziz",
      "commune_name": "أيت لعزيز",
      "daira_name_ascii": "Bouira",
      "daira_name": "البويرة",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "316": {
      "id": 316,
      "commune_name_ascii": "Aomar",
      "commune_name": "أعمر",
      "daira_name_ascii": "Kadiria",
      "daira_name": "القادرية",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "317": {
      "id": 317,
      "commune_name_ascii": "Bechloul",
      "commune_name": "بشلول",
      "daira_name_ascii": "Bechloul",
      "daira_name": "بشلول",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "318": {
      "id": 318,
      "commune_name_ascii": "Bir Ghbalou",
      "commune_name": "بئر غبالو",
      "daira_name_ascii": "Bir Ghbalou",
      "daira_name": "بئر غبالو",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "319": {
      "id": 319,
      "commune_name_ascii": "Bordj Okhriss",
      "commune_name": "برج أوخريص",
      "daira_name_ascii": "Bordj Okhriss",
      "daira_name": "برج أوخريص",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "320": {
      "id": 320,
      "commune_name_ascii": "Bouderbala",
      "commune_name": "بودربالة",
      "daira_name_ascii": "Lakhdaria",
      "daira_name": "الأخضرية",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "321": {
      "id": 321,
      "commune_name_ascii": "Bouira",
      "commune_name": "البويرة",
      "daira_name_ascii": "Bouira",
      "daira_name": "البويرة",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": [
        {
          "center_id": 101601,
          "name": "Agence de Bouira [Yalidine]\t",
          "address": "Lotissement Amar Khoudja B0 (A Gauche Du Nouveau Rond Point D'Aigle En Allant Vers Le Boulevard)",
          "gps": "36.37042045017322,3.8758492313266446",
          "commune_id": 1016,
          "commune_name": "Bouira",
          "wilaya_id": 10,
          "wilaya_name": "Bouira"
        }
      ]
    },
    "322": {
      "id": 322,
      "commune_name_ascii": "Boukram",
      "commune_name": "بوكرم",
      "daira_name_ascii": "Lakhdaria",
      "daira_name": "الأخضرية",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "323": {
      "id": 323,
      "commune_name_ascii": "Chorfa",
      "commune_name": "شرفة",
      "daira_name_ascii": "M'chedallah",
      "daira_name": "مشد الله",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "324": {
      "id": 324,
      "commune_name_ascii": "Dechmia",
      "commune_name": "الدشمية",
      "daira_name_ascii": "Sour El Ghozlane",
      "daira_name": "سور الغزلان",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "325": {
      "id": 325,
      "commune_name_ascii": "Dirah",
      "commune_name": "ديرة",
      "daira_name_ascii": "Sour El Ghozlane",
      "daira_name": "سور الغزلان",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "326": {
      "id": 326,
      "commune_name_ascii": "Djebahia",
      "commune_name": "جباحية",
      "daira_name_ascii": "Kadiria",
      "daira_name": "القادرية",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "327": {
      "id": 327,
      "commune_name_ascii": "El Adjiba",
      "commune_name": "العجيبة",
      "daira_name_ascii": "Bechloul",
      "daira_name": "بشلول",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "328": {
      "id": 328,
      "commune_name_ascii": "El Asnam",
      "commune_name": "الأسنام",
      "daira_name_ascii": "Bechloul",
      "daira_name": "بشلول",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "329": {
      "id": 329,
      "commune_name_ascii": "El Hachimia",
      "commune_name": "الهاشمية",
      "daira_name_ascii": "El Hachimia",
      "daira_name": "الهاشمية",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "330": {
      "id": 330,
      "commune_name_ascii": "El Khabouzia",
      "commune_name": "الخبوزية",
      "daira_name_ascii": "Bir Ghbalou",
      "daira_name": "بئر غبالو",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "331": {
      "id": 331,
      "commune_name_ascii": "El-Hakimia",
      "commune_name": "الحاكمية",
      "daira_name_ascii": "Sour El Ghozlane",
      "daira_name": "سور الغزلان",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "332": {
      "id": 332,
      "commune_name_ascii": "El-Mokrani",
      "commune_name": "المقراني",
      "daira_name_ascii": "Souk El Khemis",
      "daira_name": "سوق الخميس",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "333": {
      "id": 333,
      "commune_name_ascii": "Guerrouma",
      "commune_name": "قرومة",
      "daira_name_ascii": "Lakhdaria",
      "daira_name": "الأخضرية",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "334": {
      "id": 334,
      "commune_name_ascii": "Hadjera Zerga",
      "commune_name": "الحجرة الزرقاء",
      "daira_name_ascii": "Bordj Okhriss",
      "daira_name": "برج أوخريص",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "335": {
      "id": 335,
      "commune_name_ascii": "Haizer",
      "commune_name": "حيزر",
      "daira_name_ascii": "Haizer",
      "daira_name": "الحيزر",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "336": {
      "id": 336,
      "commune_name_ascii": "Hanif",
      "commune_name": "حنيف",
      "daira_name_ascii": "M'chedallah",
      "daira_name": "مشد الله",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "337": {
      "id": 337,
      "commune_name_ascii": "Kadiria",
      "commune_name": "قادرية",
      "daira_name_ascii": "Kadiria",
      "daira_name": "القادرية",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "338": {
      "id": 338,
      "commune_name_ascii": "Lakhdaria",
      "commune_name": "الأخضرية",
      "daira_name_ascii": "Lakhdaria",
      "daira_name": "الأخضرية",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": [
        {
          "center_id": 103101,
          "name": "Agence de Lakhdaria [Yalidine]",
          "address": "Rue du 5 JUILLET",
          "gps": "36.57239754079146, 3.595086635968176",
          "commune_id": 1031,
          "commune_name": "Lakhdaria",
          "wilaya_id": 10,
          "wilaya_name": "Bouira"
        }
      ]
    },
    "339": {
      "id": 339,
      "commune_name_ascii": "M Chedallah",
      "commune_name": "أمشدالة",
      "daira_name_ascii": "M'chedallah",
      "daira_name": "مشد الله",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "340": {
      "id": 340,
      "commune_name_ascii": "Maala",
      "commune_name": "معلة",
      "daira_name_ascii": "Lakhdaria",
      "daira_name": "الأخضرية",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "341": {
      "id": 341,
      "commune_name_ascii": "Maamora",
      "commune_name": "المعمورة",
      "daira_name_ascii": "Sour El Ghozlane",
      "daira_name": "سور الغزلان",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "342": {
      "id": 342,
      "commune_name_ascii": "Mezdour",
      "commune_name": "مزدور",
      "daira_name_ascii": "Bordj Okhriss",
      "daira_name": "برج أوخريص",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "343": {
      "id": 343,
      "commune_name_ascii": "Oued El Berdi",
      "commune_name": "وادي البردي",
      "daira_name_ascii": "El Hachimia",
      "daira_name": "الهاشمية",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "344": {
      "id": 344,
      "commune_name_ascii": "Ouled Rached",
      "commune_name": "أولاد راشد",
      "daira_name_ascii": "Bechloul",
      "daira_name": "بشلول",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "345": {
      "id": 345,
      "commune_name_ascii": "Raouraoua",
      "commune_name": "روراوة",
      "daira_name_ascii": "Bir Ghbalou",
      "daira_name": "بئر غبالو",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "346": {
      "id": 346,
      "commune_name_ascii": "Ridane",
      "commune_name": "ريدان",
      "daira_name_ascii": "Sour El Ghozlane",
      "daira_name": "سور الغزلان",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "347": {
      "id": 347,
      "commune_name_ascii": "Saharidj",
      "commune_name": "سحاريج",
      "daira_name_ascii": "M'chedallah",
      "daira_name": "مشد الله",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "348": {
      "id": 348,
      "commune_name_ascii": "Souk El Khemis",
      "commune_name": "سوق الخميس",
      "daira_name_ascii": "Souk El Khemis",
      "daira_name": "سوق الخميس",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "349": {
      "id": 349,
      "commune_name_ascii": "Sour El Ghozlane",
      "commune_name": "سور الغزلان",
      "daira_name_ascii": "Sour El Ghozlane",
      "daira_name": "سور الغزلان",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": [
        {
          "center_id": 104101,
          "name": "Agence de Sour El Ghouzlane [Guepex]\t",
          "address": "N°03 Cite Sayeh, Section 13",
          "gps": "36.143071573354455,3.6951283180568684",
          "commune_id": 1041,
          "commune_name": "Sour El Ghouzlane",
          "wilaya_id": 10,
          "wilaya_name": "Bouira"
        }
      ]
    },
    "350": {
      "id": 350,
      "commune_name_ascii": "Taghzout",
      "commune_name": "تاغزوت",
      "daira_name_ascii": "Haizer",
      "daira_name": "الحيزر",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "351": {
      "id": 351,
      "commune_name_ascii": "Taguedite",
      "commune_name": "تاقديت",
      "daira_name_ascii": "Bordj Okhriss",
      "daira_name": "برج أوخريص",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "352": {
      "id": 352,
      "commune_name_ascii": "Ath Mansour",
      "commune_name": "آث  منصور",
      "daira_name_ascii": "M'chedallah",
      "daira_name": "مشد الله",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "353": {
      "id": 353,
      "commune_name_ascii": "Z'barbar (El Isseri )",
      "commune_name": "زبربر",
      "daira_name_ascii": "Lakhdaria",
      "daira_name": "الأخضرية",
      "wilaya_code": "10",
      "wilaya_name_ascii": "Bouira",
      "wilaya_name": "البويرة",
      "centers": []
    },
    "354": {
      "id": 354,
      "commune_name_ascii": "Abelsa",
      "commune_name": "ابلسة",
      "daira_name_ascii": "Silet",
      "daira_name": "سيلت",
      "wilaya_code": "11",
      "wilaya_name_ascii": "Tamanrasset",
      "wilaya_name": "تمنراست",
      "centers": []
    },
    "355": {
      "id": 355,
      "commune_name_ascii": "Ain Amguel",
      "commune_name": "عين امقل",
      "daira_name_ascii": "Tamanrasset",
      "daira_name": "تمنراست",
      "wilaya_code": "11",
      "wilaya_name_ascii": "Tamanrasset",
      "wilaya_name": "تمنراست",
      "centers": []
    },
    "356": {
      "id": 356,
      "commune_name_ascii": "Ain Guezzam",
      "commune_name": "عين قزام",
      "daira_name_ascii": "In Guezzam",
      "daira_name": "عين قزام",
      "wilaya_code": "54",
      "wilaya_name_ascii": "In Guezzam",
      "wilaya_name": "عين قزام",
      "centers": []
    },
    "357": {
      "id": 357,
      "commune_name_ascii": "Ain Salah",
      "commune_name": "عين صالح",
      "daira_name_ascii": "In Salah",
      "daira_name": "عين صالح",
      "wilaya_code": "53",
      "wilaya_name_ascii": "In Salah",
      "wilaya_name": "عين صالح",
      "centers": [
        {
          "center_id": 530801,
          "name": "Agence de In Salah [Yalidine]\t",
          "address": "Centre ville (à coté de la poste et la maison de jeune)",
          "gps": "27.1977485821485,2.4788359630505163",
          "commune_id": 5308,
          "commune_name": "In Salah",
          "wilaya_id": 53,
          "wilaya_name": "In Salah"
        }
      ]
    },
    "358": {
      "id": 358,
      "commune_name_ascii": "Foggaret Ezzoua",
      "commune_name": "فقارة الزوى",
      "daira_name_ascii": "In Salah",
      "daira_name": "عين صالح",
      "wilaya_code": "53",
      "wilaya_name_ascii": "In Salah",
      "wilaya_name": "عين صالح",
      "centers": []
    },
    "359": {
      "id": 359,
      "commune_name_ascii": "Idles",
      "commune_name": "أدلس",
      "daira_name_ascii": "Tazrouk",
      "daira_name": "تاظروك",
      "wilaya_code": "11",
      "wilaya_name_ascii": "Tamanrasset",
      "wilaya_name": "تمنراست",
      "centers": []
    },
    "360": {
      "id": 360,
      "commune_name_ascii": "Inghar",
      "commune_name": "إينغر",
      "daira_name_ascii": "In Ghar",
      "daira_name": "إينغر",
      "wilaya_code": "53",
      "wilaya_name_ascii": "In Salah",
      "wilaya_name": "عين صالح",
      "centers": []
    },
    "361": {
      "id": 361,
      "commune_name_ascii": "Tamanrasset",
      "commune_name": "تمنراست",
      "daira_name_ascii": "Tamanrasset",
      "daira_name": "تمنراست",
      "wilaya_code": "11",
      "wilaya_name_ascii": "Tamanrasset",
      "wilaya_name": "تمنراست",
      "centers": [
        {
          "center_id": 110101,
          "name": "Agence de Tamanrasset(Gataa Elouad) [Guepex]\t",
          "address": "Cité Guet Elouad N 742 743 commune Tamanrasset",
          "gps": "22.78495481213817,5.517133685352839",
          "commune_id": 1101,
          "commune_name": "Tamanrasset",
          "wilaya_id": 11,
          "wilaya_name": "Tamanrasset"
        },
        {
          "center_id": 110102,
          "name": "Agence Tamanrasset(TAHAGART) [YALIDINE]",
          "address": "TAHAGART CHARKIA EN FACE MOSQUEE F.ZAHRAA ",
          "gps": "22.791772342647075,5.519063835582057",
          "commune_id": 1101,
          "commune_name": "Tamanrasset",
          "wilaya_id": 11,
          "wilaya_name": "Tamanrasset"
        }
      ]
    },
    "362": {
      "id": 362,
      "commune_name_ascii": "Tazrouk",
      "commune_name": "تاظروك",
      "daira_name_ascii": "Tazrouk",
      "daira_name": "تاظروك",
      "wilaya_code": "11",
      "wilaya_name_ascii": "Tamanrasset",
      "wilaya_name": "تمنراست",
      "centers": []
    },
    "363": {
      "id": 363,
      "commune_name_ascii": "Tin Zouatine",
      "commune_name": "تين زواتين",
      "daira_name_ascii": "Tin Zouatine",
      "daira_name": "تين زواتين",
      "wilaya_code": "54",
      "wilaya_name_ascii": "In Guezzam",
      "wilaya_name": "عين قزام",
      "centers": []
    },
    "364": {
      "id": 364,
      "commune_name_ascii": "Ain Zerga",
      "commune_name": "عين الزرقاء",
      "daira_name_ascii": "Ouenza",
      "daira_name": "الونزة",
      "wilaya_code": "12",
      "wilaya_name_ascii": "Tébessa",
      "wilaya_name": "تبسة",
      "centers": []
    },
    "365": {
      "id": 365,
      "commune_name_ascii": "Bedjene",
      "commune_name": "بجن",
      "daira_name_ascii": "El Ogla",
      "daira_name": "العقلة",
      "wilaya_code": "12",
      "wilaya_name_ascii": "Tébessa",
      "wilaya_name": "تبسة",
      "centers": []
    },
    "366": {
      "id": 366,
      "commune_name_ascii": "Bekkaria",
      "commune_name": "بكارية",
      "daira_name_ascii": "El Kouif",
      "daira_name": "الكويف",
      "wilaya_code": "12",
      "wilaya_name_ascii": "Tébessa",
      "wilaya_name": "تبسة",
      "centers": []
    },
    "367": {
      "id": 367,
      "commune_name_ascii": "Bir Dheheb",
      "commune_name": "بئر الذهب",
      "daira_name_ascii": "Morsott",
      "daira_name": "مرسط",
      "wilaya_code": "12",
      "wilaya_name_ascii": "Tébessa",
      "wilaya_name": "تبسة",
      "centers": []
    },
    "368": {
      "id": 368,
      "commune_name_ascii": "Bir Mokkadem",
      "commune_name": "بئر مقدم",
      "daira_name_ascii": "Bir Mokadem",
      "daira_name": "بئر مقدم",
      "wilaya_code": "12",
      "wilaya_name_ascii": "Tébessa",
      "wilaya_name": "تبسة",
      "centers": []
    },
    "369": {
      "id": 369,
      "commune_name_ascii": "Bir-El-Ater",
      "commune_name": "بئر العاتر",
      "daira_name_ascii": "Bir El Ater",
      "daira_name": "بئر العاتر",
      "wilaya_code": "12",
      "wilaya_name_ascii": "Tébessa",
      "wilaya_name": "تبسة",
      "centers": []
    },
    "370": {
      "id": 370,
      "commune_name_ascii": "Boukhadra",
      "commune_name": "بوخضرة",
      "daira_name_ascii": "El Aouinet",
      "daira_name": "العوينات",
      "wilaya_code": "12",
      "wilaya_name_ascii": "Tébessa",
      "wilaya_name": "تبسة",
      "centers": []
    },
    "371": {
      "id": 371,
      "commune_name_ascii": "Boulhaf Dyr",
      "commune_name": "بولحاف الدير",
      "daira_name_ascii": "El Kouif",
      "daira_name": "الكويف",
      "wilaya_code": "12",
      "wilaya_name_ascii": "Tébessa",
      "wilaya_name": "تبسة",
      "centers": []
    },
    "372": {
      "id": 372,
      "commune_name_ascii": "Cheria",
      "commune_name": "الشريعة",
      "daira_name_ascii": "Cheria",
      "daira_name": "الشريعة",
      "wilaya_code": "12",
      "wilaya_name_ascii": "Tébessa",
      "wilaya_name": "تبسة",
      "centers": [
        {
          "center_id": 120301,
          "name": "Agence Cheria Tébessa [GUEPEX]",
          "address": "رقم 10مكرر التحصيص البلدي رقم 02",
          "gps": "35.27905616702475,7.757957548028531",
          "commune_id": 1203,
          "commune_name": "Cheria",
          "wilaya_id": 12,
          "wilaya_name": "Tébessa"
        }
      ]
    },
    "373": {
      "id": 373,
      "commune_name_ascii": "El Kouif",
      "commune_name": "الكويف",
      "daira_name_ascii": "El Kouif",
      "daira_name": "الكويف",
      "wilaya_code": "12",
      "wilaya_name_ascii": "Tébessa",
      "wilaya_name": "تبسة",
      "centers": []
    },
    "374": {
      "id": 374,
      "commune_name_ascii": "El Malabiod",
      "commune_name": "الماء الابيض",
      "daira_name_ascii": "El Malabiod",
      "daira_name": "الماء الابيض",
      "wilaya_code": "12",
      "wilaya_name_ascii": "Tébessa",
      "wilaya_name": "تبسة",
      "centers": []
    },
    "375": {
      "id": 375,
      "commune_name_ascii": "El Meridj",
      "commune_name": "المريج",
      "daira_name_ascii": "Ouenza",
      "daira_name": "الونزة",
      "wilaya_code": "12",
      "wilaya_name_ascii": "Tébessa",
      "wilaya_name": "تبسة",
      "centers": []
    },
    "376": {
      "id": 376,
      "commune_name_ascii": "El Mezeraa",
      "commune_name": "المزرعة",
      "daira_name_ascii": "El Ogla",
      "daira_name": "العقلة",
      "wilaya_code": "12",
      "wilaya_name_ascii": "Tébessa",
      "wilaya_name": "تبسة",
      "centers": []
    },
    "377": {
      "id": 377,
      "commune_name_ascii": "El Ogla",
      "commune_name": "العقلة",
      "daira_name_ascii": "El Ogla",
      "daira_name": "العقلة",
      "wilaya_code": "12",
      "wilaya_name_ascii": "Tébessa",
      "wilaya_name": "تبسة",
      "centers": []
    },
    "378": {
      "id": 378,
      "commune_name_ascii": "El Ogla El Malha",
      "commune_name": "العقلة المالحة",
      "daira_name_ascii": "Bir El Ater",
      "daira_name": "بئر العاتر",
      "wilaya_code": "12",
      "wilaya_name_ascii": "Tébessa",
      "wilaya_name": "تبسة",
      "centers": []
    },
    "379": {
      "id": 379,
      "commune_name_ascii": "El-Aouinet",
      "commune_name": "العوينات",
      "daira_name_ascii": "El Aouinet",
      "daira_name": "العوينات",
      "wilaya_code": "12",
      "wilaya_name_ascii": "Tébessa",
      "wilaya_name": "تبسة",
      "centers": []
    },
    "380": {
      "id": 380,
      "commune_name_ascii": "El-Houidjbet",
      "commune_name": "الحويجبات",
      "daira_name_ascii": "El Malabiod",
      "daira_name": "الماء الابيض",
      "wilaya_code": "12",
      "wilaya_name_ascii": "Tébessa",
      "wilaya_name": "تبسة",
      "centers": []
    },
    "381": {
      "id": 381,
      "commune_name_ascii": "Ferkane",
      "commune_name": "فركان",
      "daira_name_ascii": "Negrine",
      "daira_name": "نقرين",
      "wilaya_code": "12",
      "wilaya_name_ascii": "Tébessa",
      "wilaya_name": "تبسة",
      "centers": []
    },
    "382": {
      "id": 382,
      "commune_name_ascii": "Guorriguer",
      "commune_name": "قريقر",
      "daira_name_ascii": "Bir Mokadem",
      "daira_name": "بئر مقدم",
      "wilaya_code": "12",
      "wilaya_name_ascii": "Tébessa",
      "wilaya_name": "تبسة",
      "centers": []
    },
    "383": {
      "id": 383,
      "commune_name_ascii": "Hammamet",
      "commune_name": "الحمامات",
      "daira_name_ascii": "Bir Mokadem",
      "daira_name": "بئر مقدم",
      "wilaya_code": "12",
      "wilaya_name_ascii": "Tébessa",
      "wilaya_name": "تبسة",
      "centers": []
    },
    "384": {
      "id": 384,
      "commune_name_ascii": "Morsott",
      "commune_name": "مرسط",
      "daira_name_ascii": "Morsott",
      "daira_name": "مرسط",
      "wilaya_code": "12",
      "wilaya_name_ascii": "Tébessa",
      "wilaya_name": "تبسة",
      "centers": []
    },
    "385": {
      "id": 385,
      "commune_name_ascii": "Negrine",
      "commune_name": "نقرين",
      "daira_name_ascii": "Negrine",
      "daira_name": "نقرين",
      "wilaya_code": "12",
      "wilaya_name_ascii": "Tébessa",
      "wilaya_name": "تبسة",
      "centers": []
    },
    "386": {
      "id": 386,
      "commune_name_ascii": "Ouenza",
      "commune_name": "الونزة",
      "daira_name_ascii": "Ouenza",
      "daira_name": "الونزة",
      "wilaya_code": "12",
      "wilaya_name_ascii": "Tébessa",
      "wilaya_name": "تبسة",
      "centers": []
    },
    "387": {
      "id": 387,
      "commune_name_ascii": "Oum Ali",
      "commune_name": "أم علي",
      "daira_name_ascii": "Oum Ali",
      "daira_name": "أم علي",
      "wilaya_code": "12",
      "wilaya_name_ascii": "Tébessa",
      "wilaya_name": "تبسة",
      "centers": []
    },
    "388": {
      "id": 388,
      "commune_name_ascii": "Saf Saf El Ouesra",
      "commune_name": "صفصاف الوسرى",
      "daira_name_ascii": "Oum Ali",
      "daira_name": "أم علي",
      "wilaya_code": "12",
      "wilaya_name_ascii": "Tébessa",
      "wilaya_name": "تبسة",
      "centers": []
    },
    "389": {
      "id": 389,
      "commune_name_ascii": "Stah Guentis",
      "commune_name": "سطح قنطيس",
      "daira_name_ascii": "El Ogla",
      "daira_name": "العقلة",
      "wilaya_code": "12",
      "wilaya_name_ascii": "Tébessa",
      "wilaya_name": "تبسة",
      "centers": []
    },
    "390": {
      "id": 390,
      "commune_name_ascii": "Tebessa",
      "commune_name": "تبسة",
      "daira_name_ascii": "Tebessa",
      "daira_name": "تبسة",
      "wilaya_code": "12",
      "wilaya_name_ascii": "Tébessa",
      "wilaya_name": "تبسة",
      "centers": [
        {
          "center_id": 120101,
          "name": "Agence de Tébessa [Yalidine]\t",
          "address": "Boulevard Houari Boumediene (En Face De La Pharmacie Hazourli)",
          "gps": "35.396636906679085,8.109079713415683",
          "commune_id": 1201,
          "commune_name": "Tébessa",
          "wilaya_id": 12,
          "wilaya_name": "Tébessa"
        },
        {
          "center_id": 120103,
          "name": "Centre de tri Skanska Tébessa [Yalidine]",
          "address": "Cité El Amel",
          "gps": "35.40498213138372,8.100629186509849",
          "commune_id": 1201,
          "commune_name": "Tébessa",
          "wilaya_id": 12,
          "wilaya_name": "Tébessa"
        }
      ]
    },
    "391": {
      "id": 391,
      "commune_name_ascii": "Telidjen",
      "commune_name": "ثليجان",
      "daira_name_ascii": "Cheria",
      "daira_name": "الشريعة",
      "wilaya_code": "12",
      "wilaya_name_ascii": "Tébessa",
      "wilaya_name": "تبسة",
      "centers": []
    },
    "392": {
      "id": 392,
      "commune_name_ascii": "Ain Fetah",
      "commune_name": "عين فتاح",
      "daira_name_ascii": "Fellaoucene",
      "daira_name": "فلاوسن",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "393": {
      "id": 393,
      "commune_name_ascii": "Ain Fezza",
      "commune_name": "عين فزة",
      "daira_name_ascii": "Chetouane",
      "daira_name": "شتوان",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "394": {
      "id": 394,
      "commune_name_ascii": "Ain Ghoraba",
      "commune_name": "عين غرابة",
      "daira_name_ascii": "Mansourah",
      "daira_name": "منصورة",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "395": {
      "id": 395,
      "commune_name_ascii": "Ain Kebira",
      "commune_name": "عين الكبيرة",
      "daira_name_ascii": "Fellaoucene",
      "daira_name": "فلاوسن",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "396": {
      "id": 396,
      "commune_name_ascii": "Ain Nehala",
      "commune_name": "عين النحالة",
      "daira_name_ascii": "Ain Tellout",
      "daira_name": "عين تالوت",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "397": {
      "id": 397,
      "commune_name_ascii": "Ain Tellout",
      "commune_name": "عين تالوت",
      "daira_name_ascii": "Ain Tellout",
      "daira_name": "عين تالوت",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "398": {
      "id": 398,
      "commune_name_ascii": "Ain Youcef",
      "commune_name": "عين يوسف",
      "daira_name_ascii": "Remchi",
      "daira_name": "الرمشي",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "399": {
      "id": 399,
      "commune_name_ascii": "Amieur",
      "commune_name": "عمير",
      "daira_name_ascii": "Chetouane",
      "daira_name": "شتوان",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "400": {
      "id": 400,
      "commune_name_ascii": "Bab El Assa",
      "commune_name": "باب العسة",
      "daira_name_ascii": "Bab El Assa",
      "daira_name": "باب العسة",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "401": {
      "id": 401,
      "commune_name_ascii": "Beni Bahdel",
      "commune_name": "بني بهدل",
      "daira_name_ascii": "Beni Snous",
      "daira_name": "بني سنوس",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "402": {
      "id": 402,
      "commune_name_ascii": "Beni Boussaid",
      "commune_name": "بني بوسعيد",
      "daira_name_ascii": "Beni Boussaid",
      "daira_name": "بني بوسعيد",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "403": {
      "id": 403,
      "commune_name_ascii": "Beni Khellad",
      "commune_name": "بني خلاد",
      "daira_name_ascii": "Honnaine",
      "daira_name": "هنين",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "404": {
      "id": 404,
      "commune_name_ascii": "Beni Mester",
      "commune_name": "بني مستر",
      "daira_name_ascii": "Mansourah",
      "daira_name": "منصورة",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "405": {
      "id": 405,
      "commune_name_ascii": "Beni Ouarsous",
      "commune_name": "بني وارسوس",
      "daira_name_ascii": "Remchi",
      "daira_name": "الرمشي",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "406": {
      "id": 406,
      "commune_name_ascii": "Beni Smiel",
      "commune_name": "بني صميل",
      "daira_name_ascii": "Ouled Mimoun",
      "daira_name": "أولاد ميمون",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "407": {
      "id": 407,
      "commune_name_ascii": "Beni Snous",
      "commune_name": "بني سنوس",
      "daira_name_ascii": "Beni Snous",
      "daira_name": "بني سنوس",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "408": {
      "id": 408,
      "commune_name_ascii": "Bensekrane",
      "commune_name": "بن سكران",
      "daira_name_ascii": "Bensekrane",
      "daira_name": "بن سكران",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "409": {
      "id": 409,
      "commune_name_ascii": "Bouhlou",
      "commune_name": "بوحلو",
      "daira_name_ascii": "Sabra",
      "daira_name": "صبرة",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "410": {
      "id": 410,
      "commune_name_ascii": "Bouihi",
      "commune_name": "البويهي",
      "daira_name_ascii": "Sidi Djillali",
      "daira_name": "سيدي الجيلالي",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "411": {
      "id": 411,
      "commune_name_ascii": "Chetouane",
      "commune_name": "شتوان",
      "daira_name_ascii": "Chetouane",
      "daira_name": "شتوان",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": [
        {
          "center_id": 135001,
          "name": "Agence Chetouane [Yalidine]\t",
          "address": "Zone indistruelle",
          "gps": "34.90893882311112, -1.2930467499547136",
          "commune_id": 1350,
          "commune_name": "Chetouane",
          "wilaya_id": 13,
          "wilaya_name": "Tlemcen"
        }
      ]
    },
    "412": {
      "id": 412,
      "commune_name_ascii": "Dar Yaghmoracen",
      "commune_name": "دار يغمراسن",
      "daira_name_ascii": "Ghazaouet",
      "daira_name": "الغزوات",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "413": {
      "id": 413,
      "commune_name_ascii": "Djebala",
      "commune_name": "جبالة",
      "daira_name_ascii": "Nedroma",
      "daira_name": "ندرومة",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "414": {
      "id": 414,
      "commune_name_ascii": "El Aricha",
      "commune_name": "العريشة",
      "daira_name_ascii": "Sebdou",
      "daira_name": "سبدو",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "415": {
      "id": 415,
      "commune_name_ascii": "Azail",
      "commune_name": "العزايل",
      "daira_name_ascii": "Beni Snous",
      "daira_name": "بني سنوس",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "416": {
      "id": 416,
      "commune_name_ascii": "El Fehoul",
      "commune_name": "الفحول",
      "daira_name_ascii": "Remchi",
      "daira_name": "الرمشي",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "417": {
      "id": 417,
      "commune_name_ascii": "El Gor",
      "commune_name": "القور",
      "daira_name_ascii": "Sebdou",
      "daira_name": "سبدو",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "418": {
      "id": 418,
      "commune_name_ascii": "Fellaoucene",
      "commune_name": "فلاوسن",
      "daira_name_ascii": "Fellaoucene",
      "daira_name": "فلاوسن",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "419": {
      "id": 419,
      "commune_name_ascii": "Ghazaouet",
      "commune_name": "الغزوات",
      "daira_name_ascii": "Ghazaouet",
      "daira_name": "الغزوات",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "420": {
      "id": 420,
      "commune_name_ascii": "Hammam Boughrara",
      "commune_name": "حمام بوغرارة",
      "daira_name_ascii": "Maghnia",
      "daira_name": "مغنية",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "421": {
      "id": 421,
      "commune_name_ascii": "Hennaya",
      "commune_name": "الحناية",
      "daira_name_ascii": "Hennaya",
      "daira_name": "الحناية",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "422": {
      "id": 422,
      "commune_name_ascii": "Honnaine",
      "commune_name": "هنين",
      "daira_name_ascii": "Honnaine",
      "daira_name": "هنين",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "423": {
      "id": 423,
      "commune_name_ascii": "Maghnia",
      "commune_name": "مغنية",
      "daira_name_ascii": "Maghnia",
      "daira_name": "مغنية",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": [
        {
          "center_id": 132701,
          "name": "Agence de Maghnia [Yalidine]\t",
          "address": "Tafna N°4 Cite Perri",
          "gps": "34.844893260256576,-1.721598911713723",
          "commune_id": 1327,
          "commune_name": "Maghnia",
          "wilaya_id": 13,
          "wilaya_name": "Tlemcen"
        }
      ]
    },
    "424": {
      "id": 424,
      "commune_name_ascii": "Mansourah",
      "commune_name": "منصورة",
      "daira_name_ascii": "Mansourah",
      "daira_name": "منصورة",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "425": {
      "id": 425,
      "commune_name_ascii": "Marsa Ben M'hidi",
      "commune_name": "مرسى بن مهيدي",
      "daira_name_ascii": "Marsa Ben Mehdi",
      "daira_name": "مرسى بن مهيدي",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "426": {
      "id": 426,
      "commune_name_ascii": "M'sirda Fouaga",
      "commune_name": "مسيردة الفواقة",
      "daira_name_ascii": "Marsa Ben Mehdi",
      "daira_name": "مرسى بن مهيدي",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "427": {
      "id": 427,
      "commune_name_ascii": "Nedroma",
      "commune_name": "ندرومة",
      "daira_name_ascii": "Nedroma",
      "daira_name": "ندرومة",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "428": {
      "id": 428,
      "commune_name_ascii": "Oued Lakhdar",
      "commune_name": "وادي الخضر",
      "daira_name_ascii": "Ouled Mimoun",
      "daira_name": "أولاد ميمون",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "429": {
      "id": 429,
      "commune_name_ascii": "Ouled Mimoun",
      "commune_name": "أولاد ميمون",
      "daira_name_ascii": "Ouled Mimoun",
      "daira_name": "أولاد ميمون",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "430": {
      "id": 430,
      "commune_name_ascii": "Ouled Riyah",
      "commune_name": "أولاد رياح",
      "daira_name_ascii": "Hennaya",
      "daira_name": "الحناية",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "431": {
      "id": 431,
      "commune_name_ascii": "Remchi",
      "commune_name": "الرمشي",
      "daira_name_ascii": "Remchi",
      "daira_name": "الرمشي",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": [
        {
          "center_id": 130401,
          "name": "Agence Remchi [Yalidine]\t",
          "address": "Rue Adjedir Mohamed",
          "gps": "35.06107475206156, -1.4348535740830457",
          "commune_id": 1304,
          "commune_name": "Remchi",
          "wilaya_id": 13,
          "wilaya_name": "Tlemcen"
        }
      ]
    },
    "432": {
      "id": 432,
      "commune_name_ascii": "Sabra",
      "commune_name": "صبرة",
      "daira_name_ascii": "Sabra",
      "daira_name": "صبرة",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "433": {
      "id": 433,
      "commune_name_ascii": "Sebbaa Chioukh",
      "commune_name": "سبعة شيوخ",
      "daira_name_ascii": "Remchi",
      "daira_name": "الرمشي",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "434": {
      "id": 434,
      "commune_name_ascii": "Sebdou",
      "commune_name": "سبدو",
      "daira_name_ascii": "Sebdou",
      "daira_name": "سبدو",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "435": {
      "id": 435,
      "commune_name_ascii": "Sidi Abdelli",
      "commune_name": "سيدي العبدلي",
      "daira_name_ascii": "Bensekrane",
      "daira_name": "بن سكران",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "436": {
      "id": 436,
      "commune_name_ascii": "Sidi Djillali",
      "commune_name": "سيدي الجيلالي",
      "daira_name_ascii": "Sidi Djillali",
      "daira_name": "سيدي الجيلالي",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "437": {
      "id": 437,
      "commune_name_ascii": "Sidi Medjahed",
      "commune_name": "سيدي مجاهد",
      "daira_name_ascii": "Beni Boussaid",
      "daira_name": "بني بوسعيد",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "438": {
      "id": 438,
      "commune_name_ascii": "Souahlia",
      "commune_name": "السواحلية",
      "daira_name_ascii": "Ghazaouet",
      "daira_name": "الغزوات",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "439": {
      "id": 439,
      "commune_name_ascii": "Souani",
      "commune_name": "السواني",
      "daira_name_ascii": "Bab El Assa",
      "daira_name": "باب العسة",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "440": {
      "id": 440,
      "commune_name_ascii": "Souk Tleta",
      "commune_name": "سوق الثلاثاء",
      "daira_name_ascii": "Bab El Assa",
      "daira_name": "باب العسة",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "441": {
      "id": 441,
      "commune_name_ascii": "Terny Beni Hediel",
      "commune_name": "تيرني بني هديل",
      "daira_name_ascii": "Mansourah",
      "daira_name": "منصورة",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "442": {
      "id": 442,
      "commune_name_ascii": "Tianet",
      "commune_name": "تيانت",
      "daira_name_ascii": "Ghazaouet",
      "daira_name": "الغزوات",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "443": {
      "id": 443,
      "commune_name_ascii": "Tlemcen",
      "commune_name": "تلمسان",
      "daira_name_ascii": "Tlemcen",
      "daira_name": "تلمسان",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": [
        {
          "center_id": 130101,
          "name": "Agence de Tlemcen(Bel-Air) [guepex]\t",
          "address": "Rue Des Freres Bouafia N°3 (A Cote De La Banque Natexis)",
          "gps": "34.876402141040735,-1.3186714345855781",
          "commune_id": 1301,
          "commune_name": "Tlemcen",
          "wilaya_id": 13,
          "wilaya_name": "Tlemcen"
        },
        {
          "center_id": 130103,
          "name": "Agence de Tlemcen (Mansourah) [Yalidine]",
          "address": "Boulevard Imama (en face la piscine olympique)",
          "gps": "34.88115577405357,-1.332723451208682",
          "commune_id": 1301,
          "commune_name": "Tlemcen",
          "wilaya_id": 13,
          "wilaya_name": "Tlemcen"
        }
      ]
    },
    "444": {
      "id": 444,
      "commune_name_ascii": "Zenata",
      "commune_name": "زناتة",
      "daira_name_ascii": "Hennaya",
      "daira_name": "الحناية",
      "wilaya_code": "13",
      "wilaya_name_ascii": "Tlemcen",
      "wilaya_name": "تلمسان",
      "centers": []
    },
    "445": {
      "id": 445,
      "commune_name_ascii": "Ain Bouchekif",
      "commune_name": "عين بوشقيف",
      "daira_name_ascii": "Dahmouni",
      "daira_name": "دحموني",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "446": {
      "id": 446,
      "commune_name_ascii": "Ain Deheb",
      "commune_name": "عين الذهب",
      "daira_name_ascii": "Ain Deheb",
      "daira_name": "عين الذهب",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "447": {
      "id": 447,
      "commune_name_ascii": "Ain Dzarit",
      "commune_name": "عين دزاريت",
      "daira_name_ascii": "Mahdia",
      "daira_name": "مهدية",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "448": {
      "id": 448,
      "commune_name_ascii": "Ain El Hadid",
      "commune_name": "عين الحديد",
      "daira_name_ascii": "Frenda",
      "daira_name": "فرندة",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "449": {
      "id": 449,
      "commune_name_ascii": "Ain Kermes",
      "commune_name": "عين كرمس",
      "daira_name_ascii": "Ain Kermes",
      "daira_name": "عين كرمس",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "450": {
      "id": 450,
      "commune_name_ascii": "Bougara",
      "commune_name": "بوقرة",
      "daira_name_ascii": "Hamadia",
      "daira_name": "حمادية",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "451": {
      "id": 451,
      "commune_name_ascii": "Chehaima",
      "commune_name": "شحيمة",
      "daira_name_ascii": "Ain Deheb",
      "daira_name": "عين الذهب",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "452": {
      "id": 452,
      "commune_name_ascii": "Dahmouni",
      "commune_name": "دحموني",
      "daira_name_ascii": "Dahmouni",
      "daira_name": "دحموني",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "453": {
      "id": 453,
      "commune_name_ascii": "Djebilet Rosfa",
      "commune_name": "جبيلات الرصفاء",
      "daira_name_ascii": "Ain Kermes",
      "daira_name": "عين كرمس",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "454": {
      "id": 454,
      "commune_name_ascii": "Djillali Ben Amar",
      "commune_name": "جيلالي بن عمار",
      "daira_name_ascii": "Mechraa Sfa",
      "daira_name": "مشرع الصفا",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "455": {
      "id": 455,
      "commune_name_ascii": "Faidja",
      "commune_name": "الفايجة",
      "daira_name_ascii": "Sougueur",
      "daira_name": "السوقر",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "456": {
      "id": 456,
      "commune_name_ascii": "Frenda",
      "commune_name": "فرندة",
      "daira_name_ascii": "Frenda",
      "daira_name": "فرندة",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "457": {
      "id": 457,
      "commune_name_ascii": "Guertoufa",
      "commune_name": "قرطوفة",
      "daira_name_ascii": "Rahouia",
      "daira_name": "رحوية",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "458": {
      "id": 458,
      "commune_name_ascii": "Hamadia",
      "commune_name": "حمادية",
      "daira_name_ascii": "Hamadia",
      "daira_name": "حمادية",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "459": {
      "id": 459,
      "commune_name_ascii": "Ksar Chellala",
      "commune_name": "قصر الشلالة",
      "daira_name_ascii": "Ksar Chellala",
      "daira_name": "قصر الشلالة",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "460": {
      "id": 460,
      "commune_name_ascii": "Madna",
      "commune_name": "مادنة",
      "daira_name_ascii": "Ain Kermes",
      "daira_name": "عين كرمس",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "461": {
      "id": 461,
      "commune_name_ascii": "Mahdia",
      "commune_name": "مهدية",
      "daira_name_ascii": "Mahdia",
      "daira_name": "مهدية",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "462": {
      "id": 462,
      "commune_name_ascii": "Mechraa Safa",
      "commune_name": "مشرع الصفا",
      "daira_name_ascii": "Mechraa Sfa",
      "daira_name": "مشرع الصفا",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "463": {
      "id": 463,
      "commune_name_ascii": "Medrissa",
      "commune_name": "مدريسة",
      "daira_name_ascii": "Ain Kermes",
      "daira_name": "عين كرمس",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "464": {
      "id": 464,
      "commune_name_ascii": "Medroussa",
      "commune_name": "مدروسة",
      "daira_name_ascii": "Medroussa",
      "daira_name": "مدروسة",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "465": {
      "id": 465,
      "commune_name_ascii": "Meghila",
      "commune_name": "مغيلة",
      "daira_name_ascii": "Meghila",
      "daira_name": "مغيلة",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "466": {
      "id": 466,
      "commune_name_ascii": "Mellakou",
      "commune_name": "ملاكو",
      "daira_name_ascii": "Medroussa",
      "daira_name": "مدروسة",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "467": {
      "id": 467,
      "commune_name_ascii": "Nadorah",
      "commune_name": "الناظورة",
      "daira_name_ascii": "Mahdia",
      "daira_name": "مهدية",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "468": {
      "id": 468,
      "commune_name_ascii": "Naima",
      "commune_name": "النعيمة",
      "daira_name_ascii": "Ain Deheb",
      "daira_name": "عين الذهب",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "469": {
      "id": 469,
      "commune_name_ascii": "Oued Lilli",
      "commune_name": "وادي ليلي",
      "daira_name_ascii": "Oued Lili",
      "daira_name": "وادي ليلي",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "470": {
      "id": 470,
      "commune_name_ascii": "Rahouia",
      "commune_name": "الرحوية",
      "daira_name_ascii": "Rahouia",
      "daira_name": "رحوية",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "471": {
      "id": 471,
      "commune_name_ascii": "Rechaiga",
      "commune_name": "الرشايقة",
      "daira_name_ascii": "Hamadia",
      "daira_name": "حمادية",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "472": {
      "id": 472,
      "commune_name_ascii": "Sebaine",
      "commune_name": "السبعين",
      "daira_name_ascii": "Mahdia",
      "daira_name": "مهدية",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "473": {
      "id": 473,
      "commune_name_ascii": "Sebt",
      "commune_name": "السبت",
      "daira_name_ascii": "Meghila",
      "daira_name": "مغيلة",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "474": {
      "id": 474,
      "commune_name_ascii": "Serghine",
      "commune_name": "سرغين",
      "daira_name_ascii": "Ksar Chellala",
      "daira_name": "قصر الشلالة",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "475": {
      "id": 475,
      "commune_name_ascii": "Si Abdelghani",
      "commune_name": "سي عبد الغني",
      "daira_name_ascii": "Sougueur",
      "daira_name": "السوقر",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "476": {
      "id": 476,
      "commune_name_ascii": "Sidi Abderrahmane",
      "commune_name": "سيدي عبد الرحمن",
      "daira_name_ascii": "Ain Kermes",
      "daira_name": "عين كرمس",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "477": {
      "id": 477,
      "commune_name_ascii": "Sidi Ali Mellal",
      "commune_name": "سيدي علي ملال",
      "daira_name_ascii": "Oued Lili",
      "daira_name": "وادي ليلي",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "478": {
      "id": 478,
      "commune_name_ascii": "Sidi Bakhti",
      "commune_name": "سيدي بختي",
      "daira_name_ascii": "Medroussa",
      "daira_name": "مدروسة",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "479": {
      "id": 479,
      "commune_name_ascii": "Sidi Hosni",
      "commune_name": "سيدي حسني",
      "daira_name_ascii": "Meghila",
      "daira_name": "مغيلة",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "480": {
      "id": 480,
      "commune_name_ascii": "Sougueur",
      "commune_name": "السوقر",
      "daira_name_ascii": "Sougueur",
      "daira_name": "السوقر",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "481": {
      "id": 481,
      "commune_name_ascii": "Tagdempt",
      "commune_name": "تاقدمت",
      "daira_name_ascii": "Mechraa Sfa",
      "daira_name": "مشرع الصفا",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "482": {
      "id": 482,
      "commune_name_ascii": "Takhemaret",
      "commune_name": "تخمرت",
      "daira_name_ascii": "Frenda",
      "daira_name": "فرندة",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "483": {
      "id": 483,
      "commune_name_ascii": "Tiaret",
      "commune_name": "تيارت",
      "daira_name_ascii": "Tiaret",
      "daira_name": "تيارت",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": [
        {
          "center_id": 143901,
          "name": "Agence de Tiaret [Yalidine]\t",
          "address": "Rue police Amer, n 161",
          "gps": "35.36817378579679, 1.3328889101032386",
          "commune_id": 1439,
          "commune_name": "Tiaret",
          "wilaya_id": 14,
          "wilaya_name": "Tiaret"
        }
      ]
    },
    "484": {
      "id": 484,
      "commune_name_ascii": "Tidda",
      "commune_name": "تيدة",
      "daira_name_ascii": "Oued Lili",
      "daira_name": "وادي ليلي",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "485": {
      "id": 485,
      "commune_name_ascii": "Tousnina",
      "commune_name": "توسنينة",
      "daira_name_ascii": "Sougueur",
      "daira_name": "السوقر",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "486": {
      "id": 486,
      "commune_name_ascii": "Zmalet El Emir Abdelkade",
      "commune_name": "زمالة  الأمير عبد القادر",
      "daira_name_ascii": "Ksar Chellala",
      "daira_name": "قصر الشلالة",
      "wilaya_code": "14",
      "wilaya_name_ascii": "Tiaret",
      "wilaya_name": "تيارت",
      "centers": []
    },
    "487": {
      "id": 487,
      "commune_name_ascii": "Abi-Youcef",
      "commune_name": "أبي يوسف",
      "daira_name_ascii": "Ain El Hammam",
      "daira_name": "عين الحمام",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "488": {
      "id": 488,
      "commune_name_ascii": "Aghribs",
      "commune_name": "أغريب",
      "daira_name_ascii": "Azeffoun",
      "daira_name": "أزفون",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "489": {
      "id": 489,
      "commune_name_ascii": "Agouni-Gueghrane",
      "commune_name": "أقني قغران",
      "daira_name_ascii": "Ouadhias",
      "daira_name": "واضية",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "490": {
      "id": 490,
      "commune_name_ascii": "Ain-El-Hammam",
      "commune_name": "عين الحمام",
      "daira_name_ascii": "Ain El Hammam",
      "daira_name": "عين الحمام",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "491": {
      "id": 491,
      "commune_name_ascii": "Ain-Zaouia",
      "commune_name": "عين الزاوية",
      "daira_name_ascii": "Draa El Mizan",
      "daira_name": "ذراع الميزان",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "492": {
      "id": 492,
      "commune_name_ascii": "Ait Aggouacha",
      "commune_name": "أيت عقـواشة",
      "daira_name_ascii": "Larbaa Nath Iraten",
      "daira_name": "الأربعاء ناث إيراثن",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "493": {
      "id": 493,
      "commune_name_ascii": "Ait Bouaddou",
      "commune_name": "أيت بــوادو",
      "daira_name_ascii": "Ouadhias",
      "daira_name": "واضية",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "494": {
      "id": 494,
      "commune_name_ascii": "Ait Boumahdi",
      "commune_name": "أيت بومهدي",
      "daira_name_ascii": "Ouacif",
      "daira_name": "واسيف",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "495": {
      "id": 495,
      "commune_name_ascii": "Ait Khellili",
      "commune_name": "أيت خليلي",
      "daira_name_ascii": "Mekla",
      "daira_name": "مقلع",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "496": {
      "id": 496,
      "commune_name_ascii": "Ait Yahia Moussa",
      "commune_name": "أيت يحي موسى",
      "daira_name_ascii": "Draa El Mizan",
      "daira_name": "ذراع الميزان",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "497": {
      "id": 497,
      "commune_name_ascii": "Ait-Aissa-Mimoun",
      "commune_name": "أيت عيسى ميمون",
      "daira_name_ascii": "Ouaguenoun",
      "daira_name": "واقنون",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "498": {
      "id": 498,
      "commune_name_ascii": "Ait-Chafaa",
      "commune_name": "أيت شافع",
      "daira_name_ascii": "Azeffoun",
      "daira_name": "أزفون",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "499": {
      "id": 499,
      "commune_name_ascii": "Ait-Mahmoud",
      "commune_name": "أيت محمود",
      "daira_name_ascii": "Beni Douala",
      "daira_name": "بني دوالة",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "500": {
      "id": 500,
      "commune_name_ascii": "Ait-Oumalou",
      "commune_name": "أيت  أومالو",
      "daira_name_ascii": "Tizi Rached",
      "daira_name": "تيزي راشد",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "501": {
      "id": 501,
      "commune_name_ascii": "Ait-Toudert",
      "commune_name": "أيت تودرت",
      "daira_name_ascii": "Ouacif",
      "daira_name": "واسيف",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "502": {
      "id": 502,
      "commune_name_ascii": "Ait-Yahia",
      "commune_name": "أيت يحيى",
      "daira_name_ascii": "Ain El Hammam",
      "daira_name": "عين الحمام",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "503": {
      "id": 503,
      "commune_name_ascii": "Akbil",
      "commune_name": "اقبيل",
      "daira_name_ascii": "Ain El Hammam",
      "daira_name": "عين الحمام",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "504": {
      "id": 504,
      "commune_name_ascii": "Akerrou",
      "commune_name": "أقرو",
      "daira_name_ascii": "Azeffoun",
      "daira_name": "أزفون",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "505": {
      "id": 505,
      "commune_name_ascii": "Assi-Youcef",
      "commune_name": "أسي يوسف",
      "daira_name_ascii": "Boghni",
      "daira_name": "بوغني",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "506": {
      "id": 506,
      "commune_name_ascii": "Azazga",
      "commune_name": "عزازقة",
      "daira_name_ascii": "Azazga",
      "daira_name": "عزازقة",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": [
        {
          "center_id": 151801,
          "name": "Agence de Azazga [Yalidine]\t",
          "address": "01 Rue Djurdjura, Immeuble Ait Amara (Dépôt)",
          "gps": "36.74390989580551,4.367373988328014",
          "commune_id": 1518,
          "commune_name": "Azazga",
          "wilaya_id": 15,
          "wilaya_name": "Tizi Ouzou"
        }
      ]
    },
    "507": {
      "id": 507,
      "commune_name_ascii": "Azeffoun",
      "commune_name": "أزفون",
      "daira_name_ascii": "Azeffoun",
      "daira_name": "أزفون",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "508": {
      "id": 508,
      "commune_name_ascii": "Beni Zmenzer",
      "commune_name": "بنــــي زمنزار",
      "daira_name_ascii": "Beni Douala",
      "daira_name": "بني دوالة",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "509": {
      "id": 509,
      "commune_name_ascii": "Beni-Aissi",
      "commune_name": "بني عيسي",
      "daira_name_ascii": "Beni Douala",
      "daira_name": "بني دوالة",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "510": {
      "id": 510,
      "commune_name_ascii": "Beni-Douala",
      "commune_name": "بني دوالة",
      "daira_name_ascii": "Beni Douala",
      "daira_name": "بني دوالة",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "511": {
      "id": 511,
      "commune_name_ascii": "Beni-Yenni",
      "commune_name": "بني يني",
      "daira_name_ascii": "Benni Yenni",
      "daira_name": "بني يني",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "512": {
      "id": 512,
      "commune_name_ascii": "Beni-Zikki",
      "commune_name": "بني زيكــي",
      "daira_name_ascii": "Bouzeguene",
      "daira_name": "بوزقن",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "513": {
      "id": 513,
      "commune_name_ascii": "Boghni",
      "commune_name": "بوغني",
      "daira_name_ascii": "Boghni",
      "daira_name": "بوغني",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "514": {
      "id": 514,
      "commune_name_ascii": "Boudjima",
      "commune_name": "بوجيمة",
      "daira_name_ascii": "Makouda",
      "daira_name": "ماكودة",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "515": {
      "id": 515,
      "commune_name_ascii": "Bounouh",
      "commune_name": "بونوح",
      "daira_name_ascii": "Boghni",
      "daira_name": "بوغني",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "516": {
      "id": 516,
      "commune_name_ascii": "Bouzeguene",
      "commune_name": "بوزقــن",
      "daira_name_ascii": "Bouzeguene",
      "daira_name": "بوزقن",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "517": {
      "id": 517,
      "commune_name_ascii": "Draa-Ben-Khedda",
      "commune_name": "ذراع بن خدة",
      "daira_name_ascii": "Draa Ben Khedda",
      "daira_name": "ذراع بن خدة",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": [
        {
          "center_id": 154701,
          "name": "Agence de Draâ Ben Khedda [Guepex]\t",
          "address": "Touares 01",
          "gps": "36.728128393643594, 3.9659861144322925",
          "commune_id": 1547,
          "commune_name": "Draâ Ben Khedda",
          "wilaya_id": 15,
          "wilaya_name": "Tizi Ouzou"
        }
      ]
    },
    "518": {
      "id": 518,
      "commune_name_ascii": "Draa-El-Mizan",
      "commune_name": "ذراع الميزان",
      "daira_name_ascii": "Draa El Mizan",
      "daira_name": "ذراع الميزان",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "519": {
      "id": 519,
      "commune_name_ascii": "Freha",
      "commune_name": "فريحة",
      "daira_name_ascii": "Azazga",
      "daira_name": "عزازقة",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "520": {
      "id": 520,
      "commune_name_ascii": "Frikat",
      "commune_name": "فريقات",
      "daira_name_ascii": "Draa El Mizan",
      "daira_name": "ذراع الميزان",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "521": {
      "id": 521,
      "commune_name_ascii": "Iboudrarene",
      "commune_name": "إبودرارن",
      "daira_name_ascii": "Benni Yenni",
      "daira_name": "بني يني",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "522": {
      "id": 522,
      "commune_name_ascii": "Idjeur",
      "commune_name": "إيجــار",
      "daira_name_ascii": "Bouzeguene",
      "daira_name": "بوزقن",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "523": {
      "id": 523,
      "commune_name_ascii": "Iferhounene",
      "commune_name": "إفــرحــونان",
      "daira_name_ascii": "Iferhounene",
      "daira_name": "إفرحونان",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "524": {
      "id": 524,
      "commune_name_ascii": "Ifigha",
      "commune_name": "إيفيغاء",
      "daira_name_ascii": "Azazga",
      "daira_name": "عزازقة",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "525": {
      "id": 525,
      "commune_name_ascii": "Iflissen",
      "commune_name": "إفليـــسن",
      "daira_name_ascii": "Tigzirt",
      "daira_name": "تيقزيرت",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "526": {
      "id": 526,
      "commune_name_ascii": "Illilten",
      "commune_name": "إيلـيــلتـن",
      "daira_name_ascii": "Iferhounene",
      "daira_name": "إفرحونان",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "527": {
      "id": 527,
      "commune_name_ascii": "Illoula Oumalou",
      "commune_name": "إيلولة أومـــالو",
      "daira_name_ascii": "Bouzeguene",
      "daira_name": "بوزقن",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "528": {
      "id": 528,
      "commune_name_ascii": "Imsouhal",
      "commune_name": "إمســوحال",
      "daira_name_ascii": "Iferhounene",
      "daira_name": "إفرحونان",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "529": {
      "id": 529,
      "commune_name_ascii": "Irdjen",
      "commune_name": "إيرجـــن",
      "daira_name_ascii": "Larbaa Nath Iraten",
      "daira_name": "الأربعاء ناث إيراثن",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "530": {
      "id": 530,
      "commune_name_ascii": "Larbaa Nath Irathen",
      "commune_name": "الأربعــاء ناث إيراثن",
      "daira_name_ascii": "Larbaa Nath Iraten",
      "daira_name": "الأربعاء ناث إيراثن",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "531": {
      "id": 531,
      "commune_name_ascii": "Maatkas",
      "commune_name": "معـــاتقة",
      "daira_name_ascii": "Maatkas",
      "daira_name": "معاتقة",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "532": {
      "id": 532,
      "commune_name_ascii": "Makouda",
      "commune_name": "ماكودة",
      "daira_name_ascii": "Makouda",
      "daira_name": "ماكودة",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "533": {
      "id": 533,
      "commune_name_ascii": "Mechtras",
      "commune_name": "مشطراس",
      "daira_name_ascii": "Boghni",
      "daira_name": "بوغني",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "534": {
      "id": 534,
      "commune_name_ascii": "Mekla",
      "commune_name": "مقــلع",
      "daira_name_ascii": "Mekla",
      "daira_name": "مقلع",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "535": {
      "id": 535,
      "commune_name_ascii": "Mizrana",
      "commune_name": "ميزرانـــة",
      "daira_name_ascii": "Tigzirt",
      "daira_name": "تيقزيرت",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "536": {
      "id": 536,
      "commune_name_ascii": "M'kira",
      "commune_name": "مكيرة",
      "daira_name_ascii": "Tizi-Ghenif",
      "daira_name": "تيزي غنيف",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "537": {
      "id": 537,
      "commune_name_ascii": "Ouacif",
      "commune_name": "واسيف",
      "daira_name_ascii": "Ouacif",
      "daira_name": "واسيف",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "538": {
      "id": 538,
      "commune_name_ascii": "Ouadhias",
      "commune_name": "واضية",
      "daira_name_ascii": "Ouadhias",
      "daira_name": "واضية",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "539": {
      "id": 539,
      "commune_name_ascii": "Ouaguenoun",
      "commune_name": "واقنون",
      "daira_name_ascii": "Ouaguenoun",
      "daira_name": "واقنون",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "540": {
      "id": 540,
      "commune_name_ascii": "Sidi Namane",
      "commune_name": "سيدي نعمان",
      "daira_name_ascii": "Draa Ben Khedda",
      "daira_name": "ذراع بن خدة",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "541": {
      "id": 541,
      "commune_name_ascii": "Souama",
      "commune_name": "صوامـــع",
      "daira_name_ascii": "Mekla",
      "daira_name": "مقلع",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "542": {
      "id": 542,
      "commune_name_ascii": "Souk-El-Tenine",
      "commune_name": "سوق الإثنين",
      "daira_name_ascii": "Maatkas",
      "daira_name": "معاتقة",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "543": {
      "id": 543,
      "commune_name_ascii": "Tadmait",
      "commune_name": "تادمايت",
      "daira_name_ascii": "Draa Ben Khedda",
      "daira_name": "ذراع بن خدة",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "544": {
      "id": 544,
      "commune_name_ascii": "Tigzirt",
      "commune_name": "تيقـزيرت",
      "daira_name_ascii": "Tigzirt",
      "daira_name": "تيقزيرت",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "545": {
      "id": 545,
      "commune_name_ascii": "Timizart",
      "commune_name": "تيمـيزار",
      "daira_name_ascii": "Ouaguenoun",
      "daira_name": "واقنون",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "546": {
      "id": 546,
      "commune_name_ascii": "Tirmitine",
      "commune_name": "تيرمتين",
      "daira_name_ascii": "Draa Ben Khedda",
      "daira_name": "ذراع بن خدة",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "547": {
      "id": 547,
      "commune_name_ascii": "Tizi N'tleta",
      "commune_name": "تيزي نثلاثة",
      "daira_name_ascii": "Ouadhias",
      "daira_name": "واضية",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "548": {
      "id": 548,
      "commune_name_ascii": "Tizi-Gheniff",
      "commune_name": "تيزي غنيف",
      "daira_name_ascii": "Tizi-Ghenif",
      "daira_name": "تيزي غنيف",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": [
        {
          "center_id": 151101,
          "name": "Agence de Tizi Gheniff [Guepex]\t",
          "address": "Rue Fatoum Amar, Rez-De-Chaussee Btm 17, N° 02",
          "gps": "36.59031892958808,3.7745891447025954",
          "commune_id": 1511,
          "commune_name": "Tizi Gheniff",
          "wilaya_id": 15,
          "wilaya_name": "Tizi Ouzou"
        }
      ]
    },
    "549": {
      "id": 549,
      "commune_name_ascii": "Tizi-Ouzou",
      "commune_name": "تيزي وزو",
      "daira_name_ascii": "Tizi Ouzou",
      "daira_name": "تيزي وزو",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": [
        {
          "center_id": 150101,
          "name": "Agence de Bekkar [Guepex]\t",
          "address": "Cite Bekkar Classe 78 Propriete Groupe 137 (En Face Placette)",
          "gps": "36.70517616666733,4.058703310312472",
          "commune_id": 1501,
          "commune_name": "Tizi Ouzou",
          "wilaya_id": 15,
          "wilaya_name": "Tizi Ouzou"
        },
        {
          "center_id": 150102,
          "name": "Agence de nouvelle ville [Yalidine]\t",
          "address": "Nouvelle ville",
          "gps": "36.69298682328048, 4.051372364416736",
          "commune_id": 1501,
          "commune_name": "Tizi Ouzou",
          "wilaya_id": 15,
          "wilaya_name": "Tizi Ouzou"
        }
      ]
    },
    "550": {
      "id": 550,
      "commune_name_ascii": "Tizi-Rached",
      "commune_name": "تيزي راشد",
      "daira_name_ascii": "Tizi Rached",
      "daira_name": "تيزي راشد",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "551": {
      "id": 551,
      "commune_name_ascii": "Yakourene",
      "commune_name": "إعــكورن",
      "daira_name_ascii": "Azazga",
      "daira_name": "عزازقة",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "552": {
      "id": 552,
      "commune_name_ascii": "Yatafene",
      "commune_name": "يطــافن",
      "daira_name_ascii": "Benni Yenni",
      "daira_name": "بني يني",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "553": {
      "id": 553,
      "commune_name_ascii": "Zekri",
      "commune_name": "زكري",
      "daira_name_ascii": "Azazga",
      "daira_name": "عزازقة",
      "wilaya_code": "15",
      "wilaya_name_ascii": "Tizi Ouzou",
      "wilaya_name": "تيزي وزو",
      "centers": []
    },
    "554": {
      "id": 554,
      "commune_name_ascii": "Ain Benian",
      "commune_name": "عين بنيان",
      "daira_name_ascii": "Cheraga",
      "daira_name": "الشراقة",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": [
        {
          "center_id": 164401,
          "name": "Agence de Aïn Benian [Guepex]\t",
          "address": "19 Route Al-Jamilah, Division Kargon",
          "gps": "36.80041848415821,2.9025755690190453",
          "commune_id": 1644,
          "commune_name": "Aïn Benian",
          "wilaya_id": 16,
          "wilaya_name": "Alger"
        }
      ]
    },
    "555": {
      "id": 555,
      "commune_name_ascii": "Ain Taya",
      "commune_name": "عين طاية",
      "daira_name_ascii": "Dar El Beida",
      "daira_name": "الدار البيضاء",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "556": {
      "id": 556,
      "commune_name_ascii": "Alger Centre",
      "commune_name": "الجزائر الوسطى",
      "daira_name_ascii": "Sidi M'hamed",
      "daira_name": "سيدي امحمد",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": [
        {
          "center_id": 160101,
          "name": "Sacré-Cœur [Guepex]\t",
          "address": "116 Didouche Mourad,  Sacre Cœur",
          "gps": "36.7635831801555,3.0471151913967005",
          "commune_id": 1601,
          "commune_name": "Alger Centre",
          "wilaya_id": 16,
          "wilaya_name": "Alger"
        }
      ]
    },
    "557": {
      "id": 557,
      "commune_name_ascii": "Bab El Oued",
      "commune_name": "باب الوادي",
      "daira_name_ascii": "Bab El Oued",
      "daira_name": "باب الوادي",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": [
        {
          "center_id": 160501,
          "name": "Agence de Bab El Oued [Guepex]\t",
          "address": "107 Rue Colonel Lotfi",
          "gps": "36.788921063414854, 3.0485394932807495",
          "commune_id": 1605,
          "commune_name": "Bab El Oued",
          "wilaya_id": 16,
          "wilaya_name": "Alger"
        },
        {
          "center_id": 390101,
          "name": "Agence de El Oued [Yalidine]",
          "address": "Cite El Moudjahidine (en face Pharmacie Daghoum)",
          "gps": "33.35200172931514,6.853196485244896",
          "commune_id": 3901,
          "commune_name": "El Oued",
          "wilaya_id": 39,
          "wilaya_name": "El Oued"
        }
      ]
    },
    "558": {
      "id": 558,
      "commune_name_ascii": "Bab Ezzouar",
      "commune_name": "باب الزوار",
      "daira_name_ascii": "Dar El Beida",
      "daira_name": "الدار البيضاء",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": [
        {
          "center_id": 162102,
          "name": "Agence BAB EZZOUAR [Yalitec]",
          "address": "EPLF - BAB EZZOUAR",
          "gps": "36.720456069053455,3.1842058696201057",
          "commune_id": 1621,
          "commune_name": "Bab Ezzouar",
          "wilaya_id": 16,
          "wilaya_name": "Alger"
        }
      ]
    },
    "559": {
      "id": 559,
      "commune_name_ascii": "Baba Hassen",
      "commune_name": "بابا حسن",
      "daira_name_ascii": "Draria",
      "daira_name": "الدرارية",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "560": {
      "id": 560,
      "commune_name_ascii": "Bachedjerah",
      "commune_name": "باش جراح",
      "daira_name_ascii": "El Harrach",
      "daira_name": "الحراش",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "561": {
      "id": 561,
      "commune_name_ascii": "Baraki",
      "commune_name": "براقي",
      "daira_name_ascii": "Baraki",
      "daira_name": "براقي",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": [
        {
          "center_id": 161401,
          "name": "Agence de Baraki [Guepex]\t",
          "address": "Route de Larbâa (à coté de la supérette Promo+)",
          "gps": "36.665013766367615, 3.091836877210686",
          "commune_id": 1614,
          "commune_name": "Baraki",
          "wilaya_id": 16,
          "wilaya_name": "Alger"
        }
      ]
    },
    "562": {
      "id": 562,
      "commune_name_ascii": "Ben Aknoun",
      "commune_name": "ابن عكنون",
      "daira_name_ascii": "Bouzareah",
      "daira_name": "بوزريعة",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "563": {
      "id": 563,
      "commune_name_ascii": "Beni Messous",
      "commune_name": "بني مسوس",
      "daira_name_ascii": "Bouzareah",
      "daira_name": "بوزريعة",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "564": {
      "id": 564,
      "commune_name_ascii": "Bir Mourad Rais",
      "commune_name": "بئر مراد رايس",
      "daira_name_ascii": "Bir Mourad Rais",
      "daira_name": "بئر مراد رايس",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": [
        {
          "center_id": 160902,
          "name": "Agence BIRMOURADRAIS [Easy &amp; Speed]",
          "address": "14 rue des trois, Rue des Frères Bouadou, Bir Mourad Raïs 16005",
          "gps": "36.738515044397246,3.0539694576708545",
          "commune_id": 1609,
          "commune_name": "Bir Mourad Raïs",
          "wilaya_id": 16,
          "wilaya_name": "Alger"
        }
      ]
    },
    "565": {
      "id": 565,
      "commune_name_ascii": "Birkhadem",
      "commune_name": "بئر خادم",
      "daira_name_ascii": "Bir Mourad Rais",
      "daira_name": "بئر مراد رايس",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": [
        {
          "center_id": 161201,
          "name": "Agence de Birkhadem [Yalidine]\t",
          "address": "Cite Vergers Villa N°1",
          "gps": "36.728714872725824,3.0553242452285136",
          "commune_id": 1612,
          "commune_name": "Birkhadem",
          "wilaya_id": 16,
          "wilaya_name": "Alger"
        }
      ]
    },
    "566": {
      "id": 566,
      "commune_name_ascii": "Bir Touta",
      "commune_name": "بئر توتة",
      "daira_name_ascii": "Birtouta",
      "daira_name": "بئر توتة",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": [
        {
          "center_id": 163401,
          "name": "Agence de Birtouta [Guepex]\t",
          "address": "06 rue El Moudjahid Hamida Mouhamed (à côté de Supermarquet Saadi)",
          "gps": "36.645369231973724, 3.0043017206575358",
          "commune_id": 1634,
          "commune_name": "Birtouta",
          "wilaya_id": 16,
          "wilaya_name": "Alger"
        }
      ]
    },
    "567": {
      "id": 567,
      "commune_name_ascii": "Bologhine Ibnou Ziri",
      "commune_name": "بولوغين بن زيري",
      "daira_name_ascii": "Bab El Oued",
      "daira_name": "باب الوادي",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "568": {
      "id": 568,
      "commune_name_ascii": "Bordj El Bahri",
      "commune_name": "برج البحري",
      "daira_name_ascii": "Dar El Beida",
      "daira_name": "الدار البيضاء",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": [
        {
          "center_id": 163901,
          "name": "Agence Bordj El Bahri [Yalidine]",
          "address": "Projet 1000 LSP 47, lot 96, 97 et 98",
          "gps": "36.79153544229604, 3.2395998020724757",
          "commune_id": 1639,
          "commune_name": "Bordj El Bahri",
          "wilaya_id": 16,
          "wilaya_name": "Alger"
        }
      ]
    },
    "569": {
      "id": 569,
      "commune_name_ascii": "Bordj El Kiffan",
      "commune_name": "برج الكيفان",
      "daira_name_ascii": "Dar El Beida",
      "daira_name": "الدار البيضاء",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": [
        {
          "center_id": 163001,
          "name": "Agence de Bordj El Kiffan [Yalidine]",
          "address": "Rue 1Er Novembre 26 Cite Mimouni N 04",
          "gps": "36.74863150288901,3.20052947265849",
          "commune_id": 1630,
          "commune_name": "Bordj El Kiffan",
          "wilaya_id": 16,
          "wilaya_name": "Alger"
        }
      ]
    },
    "570": {
      "id": 570,
      "commune_name_ascii": "Bourouba",
      "commune_name": "بوروبة",
      "daira_name_ascii": "El Harrach",
      "daira_name": "الحراش",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "571": {
      "id": 571,
      "commune_name_ascii": "Bouzareah",
      "commune_name": "بوزريعة",
      "daira_name_ascii": "Bouzareah",
      "daira_name": "بوزريعة",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "572": {
      "id": 572,
      "commune_name_ascii": "Casbah",
      "commune_name": "القصبة",
      "daira_name_ascii": "Bab El Oued",
      "daira_name": "باب الوادي",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "573": {
      "id": 573,
      "commune_name_ascii": "Cheraga",
      "commune_name": "الشراقة",
      "daira_name_ascii": "Cheraga",
      "daira_name": "الشراقة",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": [
        {
          "center_id": 165001,
          "name": "Dar Diaf [Yalidine]\t",
          "address": "Dar Diaf (à Côté De La Supérette Sedda)",
          "gps": "36.76825125970716,2.964346070388397",
          "commune_id": 1650,
          "commune_name": "Cheraga",
          "wilaya_id": 16,
          "wilaya_name": "Alger"
        },
        {
          "center_id": 165002,
          "name": "Amara [Yalidine]",
          "address": "10 Rue Ain benian partie 192 c2 Cheraga",
          "gps": "36.77481037187472,2.9545400288360257",
          "commune_id": 1650,
          "commune_name": "Cheraga",
          "wilaya_id": 16,
          "wilaya_name": "Alger"
        }
      ]
    },
    "574": {
      "id": 574,
      "commune_name_ascii": "Dar El Beida",
      "commune_name": "الدار البيضاء",
      "daira_name_ascii": "Dar El Beida",
      "daira_name": "الدار البيضاء",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": [
        {
          "center_id": 162003,
          "name": "Agence d'El Hamiz [Easy &amp; Speed]",
          "address": "Cité les orangers Groupe A villa N°431, El Hamiz (en face le stade)",
          "gps": "36.724635189426365,3.2386747288555875",
          "commune_id": 1620,
          "commune_name": "Dar El Beïda",
          "wilaya_id": 16,
          "wilaya_name": "Alger"
        }
      ]
    },
    "575": {
      "id": 575,
      "commune_name_ascii": "Dely Ibrahim",
      "commune_name": "دالي ابراهيم",
      "daira_name_ascii": "Cheraga",
      "daira_name": "الشراقة",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "576": {
      "id": 576,
      "commune_name_ascii": "Djasr Kasentina",
      "commune_name": "جسر قسنطينة",
      "daira_name_ascii": "Bir Mourad Rais",
      "daira_name": "بئر مراد رايس",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": [
        {
          "center_id": 162602,
          "name": "Agence Gué de Constantine [SpeedMail]",
          "address": "Cite Sonelgaz 2 Villa 184 Alger",
          "gps": "36.70882313554841,3.104031971163384",
          "commune_id": 1626,
          "commune_name": "Djasr Kasentina",
          "wilaya_id": 16,
          "wilaya_name": "Alger"
        }
      ]
    },
    "577": {
      "id": 577,
      "commune_name_ascii": "Douira",
      "commune_name": "الدويرة",
      "daira_name_ascii": "Draria",
      "daira_name": "الدرارية",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": [
        {
          "center_id": 165401,
          "name": "Agence de Douera [SpeedMail]\t",
          "address": "cité 3746 LOGTS AADL-BT 88 Local 01",
          "gps": "36.68891832783761, 2.944341438715307",
          "commune_id": 1654,
          "commune_name": "Douera",
          "wilaya_id": 16,
          "wilaya_name": "Alger"
        }
      ]
    },
    "578": {
      "id": 578,
      "commune_name_ascii": "Draria",
      "commune_name": "الدرارية",
      "daira_name_ascii": "Draria",
      "daira_name": "الدرارية",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": [
        {
          "center_id": 165301,
          "name": "Agence de Draria [Guepex]\t",
          "address": "Cite Darbush 145, Habitation 400, Batiment 2",
          "gps": "36.72112076655928, 2.9899307253169414",
          "commune_id": 1653,
          "commune_name": "Draria",
          "wilaya_id": 16,
          "wilaya_name": "Alger"
        }
      ]
    },
    "579": {
      "id": 579,
      "commune_name_ascii": "El Achour",
      "commune_name": "العاشور",
      "daira_name_ascii": "Draria",
      "daira_name": "الدرارية",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "580": {
      "id": 580,
      "commune_name_ascii": "El Biar",
      "commune_name": "الابيار",
      "daira_name_ascii": "Bouzareah",
      "daira_name": "بوزريعة",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "581": {
      "id": 581,
      "commune_name_ascii": "El Harrach",
      "commune_name": "الحراش",
      "daira_name_ascii": "El Harrach",
      "daira_name": "الحراش",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "582": {
      "id": 582,
      "commune_name_ascii": "El Madania",
      "commune_name": "المدنية",
      "daira_name_ascii": "Sidi M'hamed",
      "daira_name": "سيدي امحمد",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "583": {
      "id": 583,
      "commune_name_ascii": "El Magharia",
      "commune_name": "المغارية",
      "daira_name_ascii": "Hussein Dey",
      "daira_name": "حسين داي",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "584": {
      "id": 584,
      "commune_name_ascii": "El Marsa",
      "commune_name": "المرسى",
      "daira_name_ascii": "Dar El Beida",
      "daira_name": "الدار البيضاء",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "585": {
      "id": 585,
      "commune_name_ascii": "El Mouradia",
      "commune_name": "المرادية",
      "daira_name_ascii": "Sidi M'hamed",
      "daira_name": "سيدي امحمد",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "586": {
      "id": 586,
      "commune_name_ascii": "Hammamet",
      "commune_name": "الحمامات",
      "daira_name_ascii": "Cheraga",
      "daira_name": "الشراقة",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "587": {
      "id": 587,
      "commune_name_ascii": "Herraoua",
      "commune_name": "هراوة",
      "daira_name_ascii": "Rouiba",
      "daira_name": "الرويبة",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "588": {
      "id": 588,
      "commune_name_ascii": "Hussein Dey",
      "commune_name": "حسين داي",
      "daira_name_ascii": "Hussein Dey",
      "daira_name": "حسين داي",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": [
        {
          "center_id": 161701,
          "name": "Hussein Dey [Yalidine]\t",
          "address": "Route Tripoli N°152",
          "gps": "36.73593184624371,3.117008726064961",
          "commune_id": 1617,
          "commune_name": "Hussein Dey",
          "wilaya_id": 16,
          "wilaya_name": "Alger"
        }
      ]
    },
    "589": {
      "id": 589,
      "commune_name_ascii": "Hydra",
      "commune_name": "حيدرة",
      "daira_name_ascii": "Bir Mourad Rais",
      "daira_name": "بئر مراد رايس",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "590": {
      "id": 590,
      "commune_name_ascii": "Khraissia",
      "commune_name": "الخرايسية",
      "daira_name_ascii": "Draria",
      "daira_name": "الدرارية",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "591": {
      "id": 591,
      "commune_name_ascii": "Kouba",
      "commune_name": "القبة",
      "daira_name_ascii": "Hussein Dey",
      "daira_name": "حسين داي",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "592": {
      "id": 592,
      "commune_name_ascii": "Les Eucalyptus",
      "commune_name": "الكاليتوس",
      "daira_name_ascii": "Baraki",
      "daira_name": "براقي",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": [
        {
          "center_id": 163302,
          "name": "Agence Les Eucalyptus [Zimou-Express]\t",
          "address": "Rue Les Eucalyptus, N°56, palais rouge",
          "gps": "36.66934276333799, 3.151980839588873",
          "commune_id": 1633,
          "commune_name": "Les Eucalyptus",
          "wilaya_id": 16,
          "wilaya_name": "Alger"
        }
      ]
    },
    "593": {
      "id": 593,
      "commune_name_ascii": "Maalma",
      "commune_name": "المعالمة",
      "daira_name_ascii": "Zeralda",
      "daira_name": "زرالدة",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "594": {
      "id": 594,
      "commune_name_ascii": "Mohamed Belouzdad",
      "commune_name": "محمد بلوزداد",
      "daira_name_ascii": "Hussein Dey",
      "daira_name": "حسين داي",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "595": {
      "id": 595,
      "commune_name_ascii": "Mohammadia",
      "commune_name": "المحمدية",
      "daira_name_ascii": "Dar El Beida",
      "daira_name": "الدار البيضاء",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": [
        {
          "center_id": 162902,
          "name": "Agence des Pins Maritime [Yalitec]",
          "address": "Rue; Les Pins Maritime Alger",
          "gps": "36.733535044609994,3.1662373966231194",
          "commune_id": 1629,
          "commune_name": "Mohammadia",
          "wilaya_id": 16,
          "wilaya_name": "Alger"
        }
      ]
    },
    "596": {
      "id": 596,
      "commune_name_ascii": "Oued Koriche",
      "commune_name": "وادي قريش",
      "daira_name_ascii": "Bab El Oued",
      "daira_name": "باب الوادي",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "597": {
      "id": 597,
      "commune_name_ascii": "Oued Smar",
      "commune_name": "وادي السمار",
      "daira_name_ascii": "El Harrach",
      "daira_name": "الحراش",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": [
        {
          "center_id": 161503,
          "name": "Agence El harach-Beaulieu WeCanServices",
          "address": "128 RUE BOUBAGHLA Lot 08 GPE MTE N°229 Lot N°02 RDC (BEAULIEU - OUED SEMAR)",
          "gps": "36.71195511661799,3.1575034000000004",
          "commune_id": 1615,
          "commune_name": "Oued Smar",
          "wilaya_id": 16,
          "wilaya_name": "Alger"
        }
      ]
    },
    "598": {
      "id": 598,
      "commune_name_ascii": "Ouled Chebel",
      "commune_name": "اولاد شبل",
      "daira_name_ascii": "Birtouta",
      "daira_name": "بئر توتة",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "599": {
      "id": 599,
      "commune_name_ascii": "Ouled Fayet",
      "commune_name": "اولاد فايت",
      "daira_name_ascii": "Cheraga",
      "daira_name": "الشراقة",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": [
        {
          "center_id": 165101,
          "name": "Agence de Ouled Fayet [Guepex]\t",
          "address": "19 route du stade communal",
          "gps": "36.731778405827896,2.9569217546192674",
          "commune_id": 1651,
          "commune_name": "Ouled Fayet",
          "wilaya_id": 16,
          "wilaya_name": "Alger"
        }
      ]
    },
    "600": {
      "id": 600,
      "commune_name_ascii": "Rahmania",
      "commune_name": "الرحمانية",
      "daira_name_ascii": "Zeralda",
      "daira_name": "زرالدة",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "601": {
      "id": 601,
      "commune_name_ascii": "Rais Hamidou",
      "commune_name": "الرايس حميدو",
      "daira_name_ascii": "Bab El Oued",
      "daira_name": "باب الوادي",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "602": {
      "id": 602,
      "commune_name_ascii": "Reghaia",
      "commune_name": "رغاية",
      "daira_name_ascii": "Rouiba",
      "daira_name": "الرويبة",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": [
        {
          "center_id": 164301,
          "name": "Agence de DNC [Yalidine]\t",
          "address": "Cité El Ouancharis, DNC, Route de Ain Taya (En face Société générale)",
          "gps": "36.74734575091702, 3.3423594000001984",
          "commune_id": 1643,
          "commune_name": "Reghaïa",
          "wilaya_id": 16,
          "wilaya_name": "Alger"
        }
      ]
    },
    "603": {
      "id": 603,
      "commune_name_ascii": "Rouiba",
      "commune_name": "الرويبة",
      "daira_name_ascii": "Rouiba",
      "daira_name": "الرويبة",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": [
        {
          "center_id": 164201,
          "name": "Agence de Rouiba [Zimou-Express]\t",
          "address": "Rue Hassiba Ben Bouali (chemin polyclinique)",
          "gps": "36.73755329601874, 3.280255195985044",
          "commune_id": 1642,
          "commune_name": "Rouïba",
          "wilaya_id": 16,
          "wilaya_name": "Alger"
        }
      ]
    },
    "604": {
      "id": 604,
      "commune_name_ascii": "Sehaoula",
      "commune_name": "السحاولة",
      "daira_name_ascii": "Bir Mourad Rais",
      "daira_name": "بئر مراد رايس",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "605": {
      "id": 605,
      "commune_name_ascii": "Sidi M'hamed",
      "commune_name": "سيدي امحمد",
      "daira_name_ascii": "Sidi M'hamed",
      "daira_name": "سيدي امحمد",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "606": {
      "id": 606,
      "commune_name_ascii": "Sidi Moussa",
      "commune_name": "سيدي موسى",
      "daira_name_ascii": "Baraki",
      "daira_name": "براقي",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "607": {
      "id": 607,
      "commune_name_ascii": "Souidania",
      "commune_name": "سويدانية",
      "daira_name_ascii": "Zeralda",
      "daira_name": "زرالدة",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "608": {
      "id": 608,
      "commune_name_ascii": "Staoueli",
      "commune_name": "سطاوالي",
      "daira_name_ascii": "Zeralda",
      "daira_name": "زرالدة",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "609": {
      "id": 609,
      "commune_name_ascii": "Tessala El Merdja",
      "commune_name": "تسالة المرجة",
      "daira_name_ascii": "Birtouta",
      "daira_name": "بئر توتة",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": []
    },
    "610": {
      "id": 610,
      "commune_name_ascii": "Zeralda",
      "commune_name": "زرالدة",
      "daira_name_ascii": "Zeralda",
      "daira_name": "زرالدة",
      "wilaya_code": "16",
      "wilaya_name_ascii": "Alger",
      "wilaya_name": "الجزائر",
      "centers": [
        {
          "center_id": 164601,
          "name": "Agence de Zeralda [Guepex]\t",
          "address": "Local Commercial Rez De Chausser , Cite Yesswel Kouider N°01",
          "gps": "36.71270234813457,2.8343161757238713",
          "commune_id": 1646,
          "commune_name": "Zeralda",
          "wilaya_id": 16,
          "wilaya_name": "Alger"
        }
      ]
    },
    "611": {
      "id": 611,
      "commune_name_ascii": "Ain Chouhada",
      "commune_name": "عين الشهداء",
      "daira_name_ascii": "El Idrissia",
      "daira_name": "الادريسية",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "612": {
      "id": 612,
      "commune_name_ascii": "Ain El Ibel",
      "commune_name": "عين الإبل",
      "daira_name_ascii": "Ain El Ibel",
      "daira_name": "عين الإبل",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "613": {
      "id": 613,
      "commune_name_ascii": "Ain Fekka",
      "commune_name": "عين فقه",
      "daira_name_ascii": "Had Sahary",
      "daira_name": "حد الصحاري",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "614": {
      "id": 614,
      "commune_name_ascii": "Ain Maabed",
      "commune_name": "عين معبد",
      "daira_name_ascii": "Hassi Bahbah",
      "daira_name": "حاسي بحبح",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "615": {
      "id": 615,
      "commune_name_ascii": "Ain Oussera",
      "commune_name": "عين وسارة",
      "daira_name_ascii": "Ain Oussera",
      "daira_name": "عين وسارة",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "616": {
      "id": 616,
      "commune_name_ascii": "Amourah",
      "commune_name": "عمورة",
      "daira_name_ascii": "Faidh El Botma",
      "daira_name": "فيض البطمة",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "617": {
      "id": 617,
      "commune_name_ascii": "Benhar",
      "commune_name": "بنهار",
      "daira_name_ascii": "Birine",
      "daira_name": "بيرين",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "618": {
      "id": 618,
      "commune_name_ascii": "Benyagoub",
      "commune_name": "بن يعقوب",
      "daira_name_ascii": "Charef",
      "daira_name": "الشارف",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "619": {
      "id": 619,
      "commune_name_ascii": "Birine",
      "commune_name": "بيرين",
      "daira_name_ascii": "Birine",
      "daira_name": "بيرين",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "620": {
      "id": 620,
      "commune_name_ascii": "Bouira Lahdab",
      "commune_name": "بويرة الأحداب",
      "daira_name_ascii": "Had Sahary",
      "daira_name": "حد الصحاري",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "621": {
      "id": 621,
      "commune_name_ascii": "Charef",
      "commune_name": "الشارف",
      "daira_name_ascii": "Charef",
      "daira_name": "الشارف",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "622": {
      "id": 622,
      "commune_name_ascii": "Dar Chioukh",
      "commune_name": "دار الشيوخ",
      "daira_name_ascii": "Dar Chioukh",
      "daira_name": "دار الشيوخ",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "623": {
      "id": 623,
      "commune_name_ascii": "Deldoul",
      "commune_name": "دلدول",
      "daira_name_ascii": "Messaad",
      "daira_name": "مسعد",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "624": {
      "id": 624,
      "commune_name_ascii": "Djelfa",
      "commune_name": "الجلفة",
      "daira_name_ascii": "Djelfa",
      "daira_name": "الجلفة",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": [
        {
          "center_id": 171401,
          "name": "Agence de Djelfa [Yalidine]",
          "address": "Cité Boutrifis, route de Boussaâda, lotissement 137 N 06 Immeuble Djouaf Ameur",
          "gps": "34.6810443367391,3.277842246383707",
          "commune_id": 1714,
          "commune_name": "Djelfa",
          "wilaya_id": 17,
          "wilaya_name": "Djelfa"
        }
  
  
      ]
    },
    "625": {
      "id": 625,
      "commune_name_ascii": "Douis",
      "commune_name": "دويس",
      "daira_name_ascii": "El Idrissia",
      "daira_name": "الادريسية",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "626": {
      "id": 626,
      "commune_name_ascii": "El Guedid",
      "commune_name": "القديد",
      "daira_name_ascii": "Charef",
      "daira_name": "الشارف",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "627": {
      "id": 627,
      "commune_name_ascii": "El Idrissia",
      "commune_name": "الادريسية",
      "daira_name_ascii": "El Idrissia",
      "daira_name": "الادريسية",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "628": {
      "id": 628,
      "commune_name_ascii": "El Khemis",
      "commune_name": "الخميس",
      "daira_name_ascii": "Sidi Laadjel",
      "daira_name": "سيدي لعجال",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "629": {
      "id": 629,
      "commune_name_ascii": "Faidh El Botma",
      "commune_name": "فيض البطمة",
      "daira_name_ascii": "Faidh El Botma",
      "daira_name": "فيض البطمة",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "630": {
      "id": 630,
      "commune_name_ascii": "Guernini",
      "commune_name": "قرنيني",
      "daira_name_ascii": "Ain Oussera",
      "daira_name": "عين وسارة",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": [
        {
          "center_id": 170501,
          "name": "Agence de Aïn Oussara [Yalidine]",
          "address": "Cité Mohamed Boudiaf (rue en face la BNA, à coté de douche Rebhi)",
          "gps": "35.44999644877334, 2.9044317099914543",
          "commune_id": 1705,
          "commune_name": "Aïn Oussara",
          "wilaya_id": 17,
          "wilaya_name": "Djelfa"
        }
      ]
    },
    "631": {
      "id": 631,
      "commune_name_ascii": "Guettara",
      "commune_name": "قطارة",
      "daira_name_ascii": "Messaad",
      "daira_name": "مسعد",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "632": {
      "id": 632,
      "commune_name_ascii": "Had Sahary",
      "commune_name": "حد الصحاري",
      "daira_name_ascii": "Had Sahary",
      "daira_name": "حد الصحاري",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "633": {
      "id": 633,
      "commune_name_ascii": "Hassi Bahbah",
      "commune_name": "حاسي بحبح",
      "daira_name_ascii": "Hassi Bahbah",
      "daira_name": "حاسي بحبح",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "634": {
      "id": 634,
      "commune_name_ascii": "Hassi El Euch",
      "commune_name": "حاسي العش",
      "daira_name_ascii": "Hassi Bahbah",
      "daira_name": "حاسي بحبح",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "635": {
      "id": 635,
      "commune_name_ascii": "Hassi Fedoul",
      "commune_name": "حاسي فدول",
      "daira_name_ascii": "Sidi Laadjel",
      "daira_name": "سيدي لعجال",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "636": {
      "id": 636,
      "commune_name_ascii": "Messaad",
      "commune_name": "مسعد",
      "daira_name_ascii": "Messaad",
      "daira_name": "مسعد",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "637": {
      "id": 637,
      "commune_name_ascii": "M'liliha",
      "commune_name": "مليليحة",
      "daira_name_ascii": "Dar Chioukh",
      "daira_name": "دار الشيوخ",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "638": {
      "id": 638,
      "commune_name_ascii": "Moudjebara",
      "commune_name": "مجبارة",
      "daira_name_ascii": "Ain El Ibel",
      "daira_name": "عين الإبل",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "639": {
      "id": 639,
      "commune_name_ascii": "Oum Laadham",
      "commune_name": "أم العظام",
      "daira_name_ascii": "Faidh El Botma",
      "daira_name": "فيض البطمة",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "640": {
      "id": 640,
      "commune_name_ascii": "Sed Rahal",
      "commune_name": "سد الرحال",
      "daira_name_ascii": "Messaad",
      "daira_name": "مسعد",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "641": {
      "id": 641,
      "commune_name_ascii": "Selmana",
      "commune_name": "سلمانة",
      "daira_name_ascii": "Messaad",
      "daira_name": "مسعد",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "642": {
      "id": 642,
      "commune_name_ascii": "Sidi Baizid",
      "commune_name": "سيدي بايزيد",
      "daira_name_ascii": "Dar Chioukh",
      "daira_name": "دار الشيوخ",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "643": {
      "id": 643,
      "commune_name_ascii": "Sidi Laadjel",
      "commune_name": "سيدي لعجال",
      "daira_name_ascii": "Sidi Laadjel",
      "daira_name": "سيدي لعجال",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "644": {
      "id": 644,
      "commune_name_ascii": "Taadmit",
      "commune_name": "تعظميت",
      "daira_name_ascii": "Ain El Ibel",
      "daira_name": "عين الإبل",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "645": {
      "id": 645,
      "commune_name_ascii": "Zaafrane",
      "commune_name": "زعفران",
      "daira_name_ascii": "Hassi Bahbah",
      "daira_name": "حاسي بحبح",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "646": {
      "id": 646,
      "commune_name_ascii": "Zaccar",
      "commune_name": "زكار",
      "daira_name_ascii": "Ain El Ibel",
      "daira_name": "عين الإبل",
      "wilaya_code": "17",
      "wilaya_name_ascii": "Djelfa",
      "wilaya_name": "الجلفة",
      "centers": []
    },
    "647": {
      "id": 647,
      "commune_name_ascii": "Bordj T'har",
      "commune_name": "برج الطهر",
      "daira_name_ascii": "Chekfa",
      "daira_name": "الشقفة",
      "wilaya_code": "18",
      "wilaya_name_ascii": "Jijel",
      "wilaya_name": "جيجل",
      "centers": []
    },
    "648": {
      "id": 648,
      "commune_name_ascii": "Boudria Beniyadjis",
      "commune_name": "بودريعة بني  ياجيس",
      "daira_name_ascii": "Djimla",
      "daira_name": "جيملة",
      "wilaya_code": "18",
      "wilaya_name_ascii": "Jijel",
      "wilaya_name": "جيجل",
      "centers": []
    },
    "649": {
      "id": 649,
      "commune_name_ascii": "Bouraoui Belhadef",
      "commune_name": "بوراوي بلهادف",
      "daira_name_ascii": "El Ancer",
      "daira_name": "العنصر",
      "wilaya_code": "18",
      "wilaya_name_ascii": "Jijel",
      "wilaya_name": "جيجل",
      "centers": []
    },
    "650": {
      "id": 650,
      "commune_name_ascii": "Boussif Ouled Askeur",
      "commune_name": "بوسيف أولاد عسكر",
      "daira_name_ascii": "Taher",
      "daira_name": "الطاهير",
      "wilaya_code": "18",
      "wilaya_name_ascii": "Jijel",
      "wilaya_name": "جيجل",
      "centers": []
    },
    "651": {
      "id": 651,
      "commune_name_ascii": "Chahna",
      "commune_name": "الشحنة",
      "daira_name_ascii": "Taher",
      "daira_name": "الطاهير",
      "wilaya_code": "18",
      "wilaya_name_ascii": "Jijel",
      "wilaya_name": "جيجل",
      "centers": []
    },
    "652": {
      "id": 652,
      "commune_name_ascii": "Chekfa",
      "commune_name": "الشقفة",
      "daira_name_ascii": "Chekfa",
      "daira_name": "الشقفة",
      "wilaya_code": "18",
      "wilaya_name_ascii": "Jijel",
      "wilaya_name": "جيجل",
      "centers": []
    },
    "653": {
      "id": 653,
      "commune_name_ascii": "Djemaa Beni Habibi",
      "commune_name": "الجمعة بني حبيبي",
      "daira_name_ascii": "El Ancer",
      "daira_name": "العنصر",
      "wilaya_code": "18",
      "wilaya_name_ascii": "Jijel",
      "wilaya_name": "جيجل",
      "centers": []
    },
    "654": {
      "id": 654,
      "commune_name_ascii": "Djimla",
      "commune_name": "جيملة",
      "daira_name_ascii": "Djimla",
      "daira_name": "جيملة",
      "wilaya_code": "18",
      "wilaya_name_ascii": "Jijel",
      "wilaya_name": "جيجل",
      "centers": []
    },
    "655": {
      "id": 655,
      "commune_name_ascii": "El Ancer",
      "commune_name": "العنصر",
      "daira_name_ascii": "El Ancer",
      "daira_name": "العنصر",
      "wilaya_code": "18",
      "wilaya_name_ascii": "Jijel",
      "wilaya_name": "جيجل",
      "centers": []
    },
    "656": {
      "id": 656,
      "commune_name_ascii": "El Aouana",
      "commune_name": "العوانة",
      "daira_name_ascii": "El Aouana",
      "daira_name": "العوانة",
      "wilaya_code": "18",
      "wilaya_name_ascii": "Jijel",
      "wilaya_name": "جيجل",
      "centers": []
    },
    "657": {
      "id": 657,
      "commune_name_ascii": "El Kennar Nouchfi",
      "commune_name": "القنار نشفي",
      "daira_name_ascii": "Chekfa",
      "daira_name": "الشقفة",
      "wilaya_code": "18",
      "wilaya_name_ascii": "Jijel",
      "wilaya_name": "جيجل",
      "centers": []
    },
    "658": {
      "id": 658,
      "commune_name_ascii": "El Milia",
      "commune_name": "الميلية",
      "daira_name_ascii": "El Milia",
      "daira_name": "الميلية",
      "wilaya_code": "18",
      "wilaya_name_ascii": "Jijel",
      "wilaya_name": "جيجل",
      "centers": [
        {
          "center_id": 180901,
          "name": "Agence de El Milia [Guepex]",
          "address": "Rue Boulakirba Zidane",
          "gps": "36.74812705604037, 6.27440627114814",
          "commune_id": 1809,
          "commune_name": "El Milia",
          "wilaya_id": 18,
          "wilaya_name": "Jijel"
        }
      ]
    },
    "659": {
      "id": 659,
      "commune_name_ascii": "Emir Abdelkader",
      "commune_name": "الامير عبد القادر",
      "daira_name_ascii": "Taher",
      "daira_name": "الطاهير",
      "wilaya_code": "18",
      "wilaya_name_ascii": "Jijel",
      "wilaya_name": "جيجل",
      "centers": []
    },
    "660": {
      "id": 660,
      "commune_name_ascii": "Erraguene Souissi",
      "commune_name": "أراقن سويسي",
      "daira_name_ascii": "Ziamah Mansouriah",
      "daira_name": "زيامة منصورية",
      "wilaya_code": "18",
      "wilaya_name_ascii": "Jijel",
      "wilaya_name": "جيجل",
      "centers": []
    },
    "661": {
      "id": 661,
      "commune_name_ascii": "Ghebala",
      "commune_name": "غبالة",
      "daira_name_ascii": "Settara",
      "daira_name": "السطارة",
      "wilaya_code": "18",
      "wilaya_name_ascii": "Jijel",
      "wilaya_name": "جيجل",
      "centers": []
    },
    "662": {
      "id": 662,
      "commune_name_ascii": "Jijel",
      "commune_name": "جيجل",
      "daira_name_ascii": "Jijel",
      "daira_name": "جيجل",
      "wilaya_code": "18",
      "wilaya_name_ascii": "Jijel",
      "wilaya_name": "جيجل",
      "centers": [
        {
          "center_id": 180101,
          "name": "Agence de Jijel [Yalidine]",
          "address": "Village Mustapha RDC ROUTE SOUMMAM N°24",
          "gps": "36.82170292619886,5.758994169977939",
          "commune_id": 1801,
          "commune_name": "Jijel",
          "wilaya_id": 18,
          "wilaya_name": "Jijel"
        }
      ]
    },
    "663": {
      "id": 663,
      "commune_name_ascii": "Kaous",
      "commune_name": "قاوس",
      "daira_name_ascii": "Texenna",
      "daira_name": "تاكسنة",
      "wilaya_code": "18",
      "wilaya_name_ascii": "Jijel",
      "wilaya_name": "جيجل",
      "centers": [
        {
          "center_id": 181401,
          "name": "Agence Jijel kaous [Yalidine]",
          "address": "CITÉ AMOURA MESSAOUD N°02 COMMUNE KAOUS",
          "gps": "36.77631535560025,5.8116844576712765",
          "commune_id": 1814,
          "commune_name": "Kaous",
          "wilaya_id": 18,
          "wilaya_name": "Jijel"
        }
      ]
    },
    "664": {
      "id": 664,
      "commune_name_ascii": "Khiri Oued Adjoul",
      "commune_name": "خيري واد عجول",
      "daira_name_ascii": "El Ancer",
      "daira_name": "العنصر",
      "wilaya_code": "18",
      "wilaya_name_ascii": "Jijel",
      "wilaya_name": "جيجل",
      "centers": []
    },
    "665": {
      "id": 665,
      "commune_name_ascii": "Oudjana",
      "commune_name": "وجانة",
      "daira_name_ascii": "Taher",
      "daira_name": "الطاهير",
      "wilaya_code": "18",
      "wilaya_name_ascii": "Jijel",
      "wilaya_name": "جيجل",
      "centers": []
    },
    "666": {
      "id": 666,
      "commune_name_ascii": "Ouled Rabah",
      "commune_name": "أولاد رابح",
      "daira_name_ascii": "Sidi Marouf",
      "daira_name": "سيدي معروف",
      "wilaya_code": "18",
      "wilaya_name_ascii": "Jijel",
      "wilaya_name": "جيجل",
      "centers": []
    },
    "667": {
      "id": 667,
      "commune_name_ascii": "Ouled Yahia Khadrouch",
      "commune_name": "أولاد يحيى خدروش",
      "daira_name_ascii": "El Milia",
      "daira_name": "الميلية",
      "wilaya_code": "18",
      "wilaya_name_ascii": "Jijel",
      "wilaya_name": "جيجل",
      "centers": []
    },
    "668": {
      "id": 668,
      "commune_name_ascii": "Selma Benziada",
      "commune_name": "سلمى بن زيادة",
      "daira_name_ascii": "El Aouana",
      "daira_name": "العوانة",
      "wilaya_code": "18",
      "wilaya_name_ascii": "Jijel",
      "wilaya_name": "جيجل",
      "centers": []
    },
    "669": {
      "id": 669,
      "commune_name_ascii": "Settara",
      "commune_name": "السطارة",
      "daira_name_ascii": "Settara",
      "daira_name": "السطارة",
      "wilaya_code": "18",
      "wilaya_name_ascii": "Jijel",
      "wilaya_name": "جيجل",
      "centers": []
    },
    "670": {
      "id": 670,
      "commune_name_ascii": "Sidi Abdelaziz",
      "commune_name": "سيدي عبد العزيز",
      "daira_name_ascii": "Chekfa",
      "daira_name": "الشقفة",
      "wilaya_code": "18",
      "wilaya_name_ascii": "Jijel",
      "wilaya_name": "جيجل",
      "centers": []
    },
    "671": {
      "id": 671,
      "commune_name_ascii": "Sidi Marouf",
      "commune_name": "سيدي معروف",
      "daira_name_ascii": "Sidi Marouf",
      "daira_name": "سيدي معروف",
      "wilaya_code": "18",
      "wilaya_name_ascii": "Jijel",
      "wilaya_name": "جيجل",
      "centers": []
    },
    "672": {
      "id": 672,
      "commune_name_ascii": "Taher",
      "commune_name": "الطاهير",
      "daira_name_ascii": "Taher",
      "daira_name": "الطاهير",
      "wilaya_code": "18",
      "wilaya_name_ascii": "Jijel",
      "wilaya_name": "جيجل",
      "centers": [
        {
          "center_id": 180501,
          "name": "Agence de Taher [Guepex]",
          "address": "Immeuble Des Bailleurs, Section 58, Groupement De Propriete N°111, Quartier Zemouch",
          "gps": "36.77014887982159,5.8945063102513835",
          "commune_id": 1805,
          "commune_name": "Taher",
          "wilaya_id": 18,
          "wilaya_name": "Jijel"
        }
      ]
    },
    "673": {
      "id": 673,
      "commune_name_ascii": "Texenna",
      "commune_name": "تاكسنة",
      "daira_name_ascii": "Texenna",
      "daira_name": "تاكسنة",
      "wilaya_code": "18",
      "wilaya_name_ascii": "Jijel",
      "wilaya_name": "جيجل",
      "centers": []
    },
    "674": {
      "id": 674,
      "commune_name_ascii": "Ziama Mansouriah",
      "commune_name": "زيامة منصورية",
      "daira_name_ascii": "Ziamah Mansouriah",
      "daira_name": "زيامة منصورية",
      "wilaya_code": "18",
      "wilaya_name_ascii": "Jijel",
      "wilaya_name": "جيجل",
      "centers": []
    },
    "675": {
      "id": 675,
      "commune_name_ascii": "Ain Abessa",
      "commune_name": "عين عباسة",
      "daira_name_ascii": "Ain Arnat",
      "daira_name": "عين أرنات",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "676": {
      "id": 676,
      "commune_name_ascii": "Ain Arnat",
      "commune_name": "عين أرنات",
      "daira_name_ascii": "Ain Arnat",
      "daira_name": "عين أرنات",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": [
        {
          "center_id": 190201,
          "name": "Agence Ain Arnat SpeedMail",
          "address": "Cité 400 Logements local 12 Bt 10 ",
          "gps": "36.19172039376498,5.329206094678563",
          "commune_id": 1902,
          "commune_name": "Aïn Arnat",
          "wilaya_id": 19,
          "wilaya_name": "Sétif"
        }
      ]
    },
    "677": {
      "id": 677,
      "commune_name_ascii": "Ain Azel",
      "commune_name": "عين أزال",
      "daira_name_ascii": "Ain Azel",
      "daira_name": "عين أزال",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "678": {
      "id": 678,
      "commune_name_ascii": "Ain El Kebira",
      "commune_name": "عين الكبيرة",
      "daira_name_ascii": "Ain El Kebira",
      "daira_name": "عين الكبيرة",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "679": {
      "id": 679,
      "commune_name_ascii": "Ain Lahdjar",
      "commune_name": "عين الحجر",
      "daira_name_ascii": "Ain Azel",
      "daira_name": "عين أزال",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "680": {
      "id": 680,
      "commune_name_ascii": "Ain Oulmene",
      "commune_name": "عين ولمان",
      "daira_name_ascii": "Ain Oulmene",
      "daira_name": "عين ولمان",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": [
        {
          "center_id": 190701,
          "name": "Agence de Aïn Oulmene [Guepex]",
          "address": "Cite 113, Immeuble Residentiel 63, Batiment 1 Rez-De-Chaussee, Entree 3",
          "gps": "35.917576158809716,5.292095298694284",
          "commune_id": 1907,
          "commune_name": "Aïn Oulmene",
          "wilaya_id": 19,
          "wilaya_name": "Sétif"
        }
      ]
    },
    "681": {
      "id": 681,
      "commune_name_ascii": "Ain-Legradj",
      "commune_name": "عين لقراج",
      "daira_name_ascii": "Beni Ourtilane",
      "daira_name": "بني ورتيلان",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "682": {
      "id": 682,
      "commune_name_ascii": "Ain-Roua",
      "commune_name": "عين الروى",
      "daira_name_ascii": "Bougaa",
      "daira_name": "بوقاعة",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "683": {
      "id": 683,
      "commune_name_ascii": "Ain-Sebt",
      "commune_name": "عين السبت",
      "daira_name_ascii": "Beni Aziz",
      "daira_name": "بني عزيز",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "684": {
      "id": 684,
      "commune_name_ascii": "Ait Naoual Mezada",
      "commune_name": "أيت نوال مزادة",
      "daira_name_ascii": "Bouandas",
      "daira_name": "بوعنداس",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "685": {
      "id": 685,
      "commune_name_ascii": "Ait-Tizi",
      "commune_name": "ايت تيزي",
      "daira_name_ascii": "Bouandas",
      "daira_name": "بوعنداس",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "686": {
      "id": 686,
      "commune_name_ascii": "Amoucha",
      "commune_name": "عموشة",
      "daira_name_ascii": "Amoucha",
      "daira_name": "عموشة",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "687": {
      "id": 687,
      "commune_name_ascii": "Babor",
      "commune_name": "بابور",
      "daira_name_ascii": "Babor",
      "daira_name": "بابور",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "688": {
      "id": 688,
      "commune_name_ascii": "Bazer-Sakra",
      "commune_name": "بازر سكرة",
      "daira_name_ascii": "El Eulma",
      "daira_name": "العلمة",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "689": {
      "id": 689,
      "commune_name_ascii": "Beidha Bordj",
      "commune_name": "بيضاء برج",
      "daira_name_ascii": "Ain Azel",
      "daira_name": "عين أزال",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "690": {
      "id": 690,
      "commune_name_ascii": "Bellaa",
      "commune_name": "بلاعة",
      "daira_name_ascii": "Bir El Arch",
      "daira_name": "بئر العرش",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "691": {
      "id": 691,
      "commune_name_ascii": "Beni Chebana",
      "commune_name": "بني شبانة",
      "daira_name_ascii": "Beni Ourtilane",
      "daira_name": "بني ورتيلان",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "692": {
      "id": 692,
      "commune_name_ascii": "Beni Fouda",
      "commune_name": "بني فودة",
      "daira_name_ascii": "Djemila",
      "daira_name": "جميلة",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "693": {
      "id": 693,
      "commune_name_ascii": "Beni Ourtilane",
      "commune_name": "بني ورتيلان",
      "daira_name_ascii": "Beni Ourtilane",
      "daira_name": "بني ورتيلان",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "694": {
      "id": 694,
      "commune_name_ascii": "Beni Oussine",
      "commune_name": "بني وسين",
      "daira_name_ascii": "Bougaa",
      "daira_name": "بوقاعة",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "695": {
      "id": 695,
      "commune_name_ascii": "Beni-Aziz",
      "commune_name": "بني عزيز",
      "daira_name_ascii": "Beni Aziz",
      "daira_name": "بني عزيز",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "696": {
      "id": 696,
      "commune_name_ascii": "Beni-Mouhli",
      "commune_name": "بني موحلي",
      "daira_name_ascii": "Beni Ourtilane",
      "daira_name": "بني ورتيلان",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "697": {
      "id": 697,
      "commune_name_ascii": "Bir Haddada",
      "commune_name": "بئر حدادة",
      "daira_name_ascii": "Ain Azel",
      "daira_name": "عين أزال",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "698": {
      "id": 698,
      "commune_name_ascii": "Bir-El-Arch",
      "commune_name": "بئر العرش",
      "daira_name_ascii": "Bir El Arch",
      "daira_name": "بئر العرش",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "699": {
      "id": 699,
      "commune_name_ascii": "Bouandas",
      "commune_name": "بوعنداس",
      "daira_name_ascii": "Bouandas",
      "daira_name": "بوعنداس",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "700": {
      "id": 700,
      "commune_name_ascii": "Bougaa",
      "commune_name": "بوقاعة",
      "daira_name_ascii": "Bougaa",
      "daira_name": "بوقاعة",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": [
        {
          "center_id": 192601,
          "name": "Agence de Bougaa [Guepex]",
          "address": "Rue Mohamed Chinoune",
          "gps": "36.33332614477243, 5.0910191674128775",
          "commune_id": 1926,
          "commune_name": "Bougaa",
          "wilaya_id": 19,
          "wilaya_name": "Sétif"
        }
      ]
    },
    "701": {
      "id": 701,
      "commune_name_ascii": "Bousselam",
      "commune_name": "بوسلام",
      "daira_name_ascii": "Bouandas",
      "daira_name": "بوعنداس",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "702": {
      "id": 702,
      "commune_name_ascii": "Boutaleb",
      "commune_name": "بوطالب",
      "daira_name_ascii": "Salah Bey",
      "daira_name": "صالح باي",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "703": {
      "id": 703,
      "commune_name_ascii": "Dehamcha",
      "commune_name": "الدهامشة",
      "daira_name_ascii": "Ain El Kebira",
      "daira_name": "عين الكبيرة",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "704": {
      "id": 704,
      "commune_name_ascii": "Djemila",
      "commune_name": "جميلة",
      "daira_name_ascii": "Djemila",
      "daira_name": "جميلة",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "705": {
      "id": 705,
      "commune_name_ascii": "Draa-Kebila",
      "commune_name": "ذراع قبيلة",
      "daira_name_ascii": "Hammam Guergour",
      "daira_name": "حمام قرقور",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "706": {
      "id": 706,
      "commune_name_ascii": "El Eulma",
      "commune_name": "العلمة",
      "daira_name_ascii": "El Eulma",
      "daira_name": "العلمة",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": [
        {
          "center_id": 193202,
          "name": "Desk El Eulma [Yalidine]",
          "address": "Rue Abdelaziz Khaled, n°119 (à côté du hôtel El Bez)",
          "gps": "36.15225059777369, 5.695548728857927",
          "commune_id": 1932,
          "commune_name": "El Eulma",
          "wilaya_id": 19,
          "wilaya_name": "Sétif"
        }
      ]
    },
    "707": {
      "id": 707,
      "commune_name_ascii": "El Ouricia",
      "commune_name": "أوريسيا",
      "daira_name_ascii": "Ain Arnat",
      "daira_name": "عين أرنات",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "708": {
      "id": 708,
      "commune_name_ascii": "El-Ouldja",
      "commune_name": "الولجة",
      "daira_name_ascii": "Bir El Arch",
      "daira_name": "بئر العرش",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "709": {
      "id": 709,
      "commune_name_ascii": "Guellal",
      "commune_name": "قلال",
      "daira_name_ascii": "Ain Oulmene",
      "daira_name": "عين ولمان",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "710": {
      "id": 710,
      "commune_name_ascii": "Guelta Zerka",
      "commune_name": "قلتة زرقاء",
      "daira_name_ascii": "El Eulma",
      "daira_name": "العلمة",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "711": {
      "id": 711,
      "commune_name_ascii": "Guenzet",
      "commune_name": "قنزات",
      "daira_name_ascii": "Guenzet",
      "daira_name": "قنزات",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "712": {
      "id": 712,
      "commune_name_ascii": "Guidjel",
      "commune_name": "قجال",
      "daira_name_ascii": "Guidjel",
      "daira_name": "قجال",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "713": {
      "id": 713,
      "commune_name_ascii": "Hamam Soukhna",
      "commune_name": "حمام السخنة",
      "daira_name_ascii": "Hammam Sokhna",
      "daira_name": "حمام السخنة",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "714": {
      "id": 714,
      "commune_name_ascii": "Hamma",
      "commune_name": "الحامة",
      "daira_name_ascii": "Salah Bey",
      "daira_name": "صالح باي",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "715": {
      "id": 715,
      "commune_name_ascii": "Hammam Guergour",
      "commune_name": "حمام قرقور",
      "daira_name_ascii": "Hammam Guergour",
      "daira_name": "حمام قرقور",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "716": {
      "id": 716,
      "commune_name_ascii": "Harbil",
      "commune_name": "حربيل",
      "daira_name_ascii": "Guenzet",
      "daira_name": "قنزات",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "717": {
      "id": 717,
      "commune_name_ascii": "Kasr El Abtal",
      "commune_name": "قصر الابطال",
      "daira_name_ascii": "Ain Oulmene",
      "daira_name": "عين ولمان",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "718": {
      "id": 718,
      "commune_name_ascii": "Maaouia",
      "commune_name": "معاوية",
      "daira_name_ascii": "Beni Aziz",
      "daira_name": "بني عزيز",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "719": {
      "id": 719,
      "commune_name_ascii": "Maouaklane",
      "commune_name": "ماوكلان",
      "daira_name_ascii": "Maoklane",
      "daira_name": "ماوكلان",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "720": {
      "id": 720,
      "commune_name_ascii": "Mezloug",
      "commune_name": "مزلوق",
      "daira_name_ascii": "Ain Arnat",
      "daira_name": "عين أرنات",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "721": {
      "id": 721,
      "commune_name_ascii": "Oued El Bared",
      "commune_name": "واد البارد",
      "daira_name_ascii": "Amoucha",
      "daira_name": "عموشة",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "722": {
      "id": 722,
      "commune_name_ascii": "Ouled Addouane",
      "commune_name": "أولاد عدوان",
      "daira_name_ascii": "Ain El Kebira",
      "daira_name": "عين الكبيرة",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "723": {
      "id": 723,
      "commune_name_ascii": "Ouled Sabor",
      "commune_name": "أولاد صابر",
      "daira_name_ascii": "Guidjel",
      "daira_name": "قجال",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": [
        {
          "center_id": 194901,
          "name": "Agence de Sétif Tinar [ZIMOU]",
          "address": "Cité 600 logts Tinar,cité N°04,Bt N°19,local N°17",
          "gps": "36.17157923395763,5.499381416584906",
          "commune_id": 1949,
          "commune_name": "Ouled Sabor",
          "wilaya_id": 19,
          "wilaya_name": "Sétif"
        }
      ]
    },
    "724": {
      "id": 724,
      "commune_name_ascii": "Ouled Si Ahmed",
      "commune_name": "أولاد سي أحمد",
      "daira_name_ascii": "Ain Oulmene",
      "daira_name": "عين ولمان",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "725": {
      "id": 725,
      "commune_name_ascii": "Ouled Tebben",
      "commune_name": "أولاد تبان",
      "daira_name_ascii": "Salah Bey",
      "daira_name": "صالح باي",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "726": {
      "id": 726,
      "commune_name_ascii": "Rosfa",
      "commune_name": "الرصفة",
      "daira_name_ascii": "Salah Bey",
      "daira_name": "صالح باي",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "727": {
      "id": 727,
      "commune_name_ascii": "Salah Bey",
      "commune_name": "صالح باي",
      "daira_name_ascii": "Salah Bey",
      "daira_name": "صالح باي",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "728": {
      "id": 728,
      "commune_name_ascii": "Serdj-El-Ghoul",
      "commune_name": "سرج الغول",
      "daira_name_ascii": "Babor",
      "daira_name": "بابور",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "729": {
      "id": 729,
      "commune_name_ascii": "Setif",
      "commune_name": "سطيف",
      "daira_name_ascii": "Setif",
      "daira_name": "سطيف",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": [
        {
          "center_id": 195501,
          "name": "Maabouda [Yalidine]",
          "address": "Cite D'Al-Ma'Bouda, Escalier 1 Du Batiment B Section 203 Groupe 77 Parcelle 5",
          "gps": "36.18965846309601,5.391857886372733",
          "commune_id": 1955,
          "commune_name": "Sétif",
          "wilaya_id": 19,
          "wilaya_name": "Sétif"
        },
        {
          "center_id": 195502,
          "name": "El Hidhab [Guepex]",
          "address": "Cité El Hidhab, 110 Logements Participatifs, Bâtiment B, Classe 71",
          "gps": "36.21033727296476,5.445401329161286",
          "commune_id": 1955,
          "commune_name": "Sétif",
          "wilaya_id": 19,
          "wilaya_name": "Sétif"
        }
      ]
    },
    "730": {
      "id": 730,
      "commune_name_ascii": "Tachouda",
      "commune_name": "تاشودة",
      "daira_name_ascii": "Bir El Arch",
      "daira_name": "بئر العرش",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "731": {
      "id": 731,
      "commune_name_ascii": "Tala-Ifacene",
      "commune_name": "تالة إيفاسن",
      "daira_name_ascii": "Maoklane",
      "daira_name": "ماوكلان",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "732": {
      "id": 732,
      "commune_name_ascii": "Taya",
      "commune_name": "الطاية",
      "daira_name_ascii": "Hammam Sokhna",
      "daira_name": "حمام السخنة",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "733": {
      "id": 733,
      "commune_name_ascii": "Tella",
      "commune_name": "التلة",
      "daira_name_ascii": "Hammam Sokhna",
      "daira_name": "حمام السخنة",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "734": {
      "id": 734,
      "commune_name_ascii": "Tizi N'bechar",
      "commune_name": "تيزي نبشار",
      "daira_name_ascii": "Amoucha",
      "daira_name": "عموشة",
      "wilaya_code": "19",
      "wilaya_name_ascii": "Sétif",
      "wilaya_name": "سطيف",
      "centers": []
    },
    "735": {
      "id": 735,
      "commune_name_ascii": "Ain El Hadjar",
      "commune_name": "عين الحجر",
      "daira_name_ascii": "Ain El Hadjar",
      "daira_name": "عين الحجر",
      "wilaya_code": "20",
      "wilaya_name_ascii": "Saïda",
      "wilaya_name": "سعيدة",
      "centers": []
    },
    "736": {
      "id": 736,
      "commune_name_ascii": "Ain Sekhouna",
      "commune_name": "عين السخونة",
      "daira_name_ascii": "El Hassasna",
      "daira_name": "الحساسنة",
      "wilaya_code": "20",
      "wilaya_name_ascii": "Saïda",
      "wilaya_name": "سعيدة",
      "centers": []
    },
    "737": {
      "id": 737,
      "commune_name_ascii": "Ain Soltane",
      "commune_name": "عين السلطان",
      "daira_name_ascii": "Ouled Brahim",
      "daira_name": "أولاد ابراهيم",
      "wilaya_code": "20",
      "wilaya_name_ascii": "Saïda",
      "wilaya_name": "سعيدة",
      "centers": []
    },
    "738": {
      "id": 738,
      "commune_name_ascii": "Doui Thabet",
      "commune_name": "دوي ثابت",
      "daira_name_ascii": "Youb",
      "daira_name": "يوب",
      "wilaya_code": "20",
      "wilaya_name_ascii": "Saïda",
      "wilaya_name": "سعيدة",
      "centers": []
    },
    "739": {
      "id": 739,
      "commune_name_ascii": "El Hassasna",
      "commune_name": "الحساسنة",
      "daira_name_ascii": "El Hassasna",
      "daira_name": "الحساسنة",
      "wilaya_code": "20",
      "wilaya_name_ascii": "Saïda",
      "wilaya_name": "سعيدة",
      "centers": []
    },
    "740": {
      "id": 740,
      "commune_name_ascii": "Hounet",
      "commune_name": "هونت",
      "daira_name_ascii": "Sidi Boubekeur",
      "daira_name": "سيدي بوبكر",
      "wilaya_code": "20",
      "wilaya_name_ascii": "Saïda",
      "wilaya_name": "سعيدة",
      "centers": []
    },
    "741": {
      "id": 741,
      "commune_name_ascii": "Maamora",
      "commune_name": "المعمورة",
      "daira_name_ascii": "El Hassasna",
      "daira_name": "الحساسنة",
      "wilaya_code": "20",
      "wilaya_name_ascii": "Saïda",
      "wilaya_name": "سعيدة",
      "centers": []
    },
    "742": {
      "id": 742,
      "commune_name_ascii": "Moulay Larbi",
      "commune_name": "مولاي العربي",
      "daira_name_ascii": "Ain El Hadjar",
      "daira_name": "عين الحجر",
      "wilaya_code": "20",
      "wilaya_name_ascii": "Saïda",
      "wilaya_name": "سعيدة",
      "centers": []
    },
    "743": {
      "id": 743,
      "commune_name_ascii": "Ouled Brahim",
      "commune_name": "أولاد إبراهيم",
      "daira_name_ascii": "Ouled Brahim",
      "daira_name": "أولاد ابراهيم",
      "wilaya_code": "20",
      "wilaya_name_ascii": "Saïda",
      "wilaya_name": "سعيدة",
      "centers": []
    },
    "744": {
      "id": 744,
      "commune_name_ascii": "Ouled Khaled",
      "commune_name": "أولاد خالد",
      "daira_name_ascii": "Sidi Boubekeur",
      "daira_name": "سيدي بوبكر",
      "wilaya_code": "20",
      "wilaya_name_ascii": "Saïda",
      "wilaya_name": "سعيدة",
      "centers": []
    },
    "745": {
      "id": 745,
      "commune_name_ascii": "Saida",
      "commune_name": "سعيدة",
      "daira_name_ascii": "Saida",
      "daira_name": "سعيدة",
      "wilaya_code": "20",
      "wilaya_name_ascii": "Saïda",
      "wilaya_name": "سعيدة",
      "centers": [
        {
          "center_id": 201101,
          "name": "Agence de Saïda [Yalidine]",
          "address": "cité Riadh (à coté de la mosquée Riadh)",
          "gps": "34.84330195332345, 0.15648539493396532",
          "commune_id": 2011,
          "commune_name": "Saïda",
          "wilaya_id": 20,
          "wilaya_name": "Saïda"
        }
      ]
    },
    "746": {
      "id": 746,
      "commune_name_ascii": "Sidi Ahmed",
      "commune_name": "سيدي احمد",
      "daira_name_ascii": "Ain El Hadjar",
      "daira_name": "عين الحجر",
      "wilaya_code": "20",
      "wilaya_name_ascii": "Saïda",
      "wilaya_name": "سعيدة",
      "centers": []
    },
    "747": {
      "id": 747,
      "commune_name_ascii": "Sidi Amar",
      "commune_name": "سيدي عمر",
      "daira_name_ascii": "Sidi Boubekeur",
      "daira_name": "سيدي بوبكر",
      "wilaya_code": "20",
      "wilaya_name_ascii": "Saïda",
      "wilaya_name": "سعيدة",
      "centers": []
    },
    "748": {
      "id": 748,
      "commune_name_ascii": "Sidi Boubekeur",
      "commune_name": "سيدي بوبكر",
      "daira_name_ascii": "Sidi Boubekeur",
      "daira_name": "سيدي بوبكر",
      "wilaya_code": "20",
      "wilaya_name_ascii": "Saïda",
      "wilaya_name": "سعيدة",
      "centers": []
    },
    "749": {
      "id": 749,
      "commune_name_ascii": "Tircine",
      "commune_name": "تيرسين",
      "daira_name_ascii": "Ouled Brahim",
      "daira_name": "أولاد ابراهيم",
      "wilaya_code": "20",
      "wilaya_name_ascii": "Saïda",
      "wilaya_name": "سعيدة",
      "centers": []
    },
    "750": {
      "id": 750,
      "commune_name_ascii": "Youb",
      "commune_name": "يوب",
      "daira_name_ascii": "Youb",
      "daira_name": "يوب",
      "wilaya_code": "20",
      "wilaya_name_ascii": "Saïda",
      "wilaya_name": "سعيدة",
      "centers": []
    },
    "751": {
      "id": 751,
      "commune_name_ascii": "Ain Bouziane",
      "commune_name": "عين بوزيان",
      "daira_name_ascii": "Sidi Mezghiche",
      "daira_name": "سيدي مزغيش",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "752": {
      "id": 752,
      "commune_name_ascii": "Ain Charchar",
      "commune_name": "عين شرشار",
      "daira_name_ascii": "Azzaba",
      "daira_name": "عزابة",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "753": {
      "id": 753,
      "commune_name_ascii": "Ain Kechra",
      "commune_name": "عين قشرة",
      "daira_name_ascii": "Ain Kechra",
      "daira_name": "عين قشرة",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "754": {
      "id": 754,
      "commune_name_ascii": "Ain Zouit",
      "commune_name": "عين زويت",
      "daira_name_ascii": "El Hadaiek",
      "daira_name": "الحدائق",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "755": {
      "id": 755,
      "commune_name_ascii": "Azzaba",
      "commune_name": "عزابة",
      "daira_name_ascii": "Azzaba",
      "daira_name": "عزابة",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": [
        {
          "center_id": 210501,
          "name": "Agence de Azzaba [Guepex]",
          "address": "Enseigne Cite Za'Af Rabeh",
          "gps": "36.73820784300283,7.103309891478236",
          "commune_id": 2105,
          "commune_name": "Azzaba",
          "wilaya_id": 21,
          "wilaya_name": "Skikda"
        }
      ]
    },
    "756": {
      "id": 756,
      "commune_name_ascii": "Bekkouche Lakhdar",
      "commune_name": "بكوش لخضر",
      "daira_name_ascii": "Ben Azzouz",
      "daira_name": "بن عزوز",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "757": {
      "id": 757,
      "commune_name_ascii": "Ben Azzouz",
      "commune_name": "بن عزوز",
      "daira_name_ascii": "Ben Azzouz",
      "daira_name": "بن عزوز",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "758": {
      "id": 758,
      "commune_name_ascii": "Beni Bechir",
      "commune_name": "بني بشير",
      "daira_name_ascii": "Ramdane Djamel",
      "daira_name": "رمضان جمال",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "759": {
      "id": 759,
      "commune_name_ascii": "Beni Oulbane",
      "commune_name": "بني ولبان",
      "daira_name_ascii": "Sidi Mezghiche",
      "daira_name": "سيدي مزغيش",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "760": {
      "id": 760,
      "commune_name_ascii": "Beni Zid",
      "commune_name": "بني زيد",
      "daira_name_ascii": "Collo",
      "daira_name": "القل",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "761": {
      "id": 761,
      "commune_name_ascii": "Bin El Ouiden",
      "commune_name": "بين الويدان",
      "daira_name_ascii": "Tamalous",
      "daira_name": "تمالوس",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "762": {
      "id": 762,
      "commune_name_ascii": "Bouchetata",
      "commune_name": "بوشطاطة",
      "daira_name_ascii": "El Hadaiek",
      "daira_name": "الحدائق",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "763": {
      "id": 763,
      "commune_name_ascii": "Cheraia",
      "commune_name": "الشرايع",
      "daira_name_ascii": "Collo",
      "daira_name": "القل",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "764": {
      "id": 764,
      "commune_name_ascii": "Collo",
      "commune_name": "القل",
      "daira_name_ascii": "Collo",
      "daira_name": "القل",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": [
        {
          "center_id": 211401,
          "name": "Agence de Collo [Guepex]",
          "address": "Boulevard  Ruwaibah Taher",
          "gps": "37.00947083691242,6.56541830758666",
          "commune_id": 2114,
          "commune_name": "Collo",
          "wilaya_id": 21,
          "wilaya_name": "Skikda"
        }
      ]
    },
    "765": {
      "id": 765,
      "commune_name_ascii": "Djendel Saadi Mohamed",
      "commune_name": "جندل سعدي محمد",
      "daira_name_ascii": "Azzaba",
      "daira_name": "عزابة",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "766": {
      "id": 766,
      "commune_name_ascii": "El Arrouch",
      "commune_name": "الحروش",
      "daira_name_ascii": "El Harrouch",
      "daira_name": "الحروش",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": [
        {
          "center_id": 211801,
          "name": "Agence de El Harrouch [Guepex]",
          "address": "Cite 24 Logements Sociaux Covalent Sonatiba",
          "gps": "36.652696909280046,6.842743529091004",
          "commune_id": 2118,
          "commune_name": "El Harrouch",
          "wilaya_id": 21,
          "wilaya_name": "Skikda"
        }
      ]
    },
    "767": {
      "id": 767,
      "commune_name_ascii": "El Ghedir",
      "commune_name": "الغدير",
      "daira_name_ascii": "Azzaba",
      "daira_name": "عزابة",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "768": {
      "id": 768,
      "commune_name_ascii": "El Hadaiek",
      "commune_name": "الحدائق",
      "daira_name_ascii": "El Hadaiek",
      "daira_name": "الحدائق",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "769": {
      "id": 769,
      "commune_name_ascii": "El Marsa",
      "commune_name": "المرسى",
      "daira_name_ascii": "Ben Azzouz",
      "daira_name": "بن عزوز",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "770": {
      "id": 770,
      "commune_name_ascii": "Emjez Edchich",
      "commune_name": "مجاز الدشيش",
      "daira_name_ascii": "El Harrouch",
      "daira_name": "الحروش",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "771": {
      "id": 771,
      "commune_name_ascii": "Es Sebt",
      "commune_name": "السبت",
      "daira_name_ascii": "Azzaba",
      "daira_name": "عزابة",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "772": {
      "id": 772,
      "commune_name_ascii": "Filfila",
      "commune_name": "فلفلة",
      "daira_name_ascii": "Skikda",
      "daira_name": "سكيكدة",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "773": {
      "id": 773,
      "commune_name_ascii": "Hammadi Krouma",
      "commune_name": "حمادي كرومة",
      "daira_name_ascii": "Skikda",
      "daira_name": "سكيكدة",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "774": {
      "id": 774,
      "commune_name_ascii": "Kanoua",
      "commune_name": "قنواع",
      "daira_name_ascii": "Zitouna",
      "daira_name": "الزيتونة",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "775": {
      "id": 775,
      "commune_name_ascii": "Kerkara",
      "commune_name": "الكركرة",
      "daira_name_ascii": "Tamalous",
      "daira_name": "تمالوس",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "776": {
      "id": 776,
      "commune_name_ascii": "Khenag Maoune",
      "commune_name": "خناق مايو",
      "daira_name_ascii": "Ouled Attia",
      "daira_name": "أولاد عطية",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "777": {
      "id": 777,
      "commune_name_ascii": "Oued Zhour",
      "commune_name": "وادي الزهور",
      "daira_name_ascii": "Ouled Attia",
      "daira_name": "أولاد عطية",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "778": {
      "id": 778,
      "commune_name_ascii": "Ouldja Boulbalout",
      "commune_name": "الولجة بولبلوط",
      "daira_name_ascii": "Ain Kechra",
      "daira_name": "عين قشرة",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "779": {
      "id": 779,
      "commune_name_ascii": "Ouled Attia",
      "commune_name": "أولاد عطية",
      "daira_name_ascii": "Ouled Attia",
      "daira_name": "أولاد عطية",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "780": {
      "id": 780,
      "commune_name_ascii": "Ouled Habbaba",
      "commune_name": "أولاد حبابة",
      "daira_name_ascii": "El Harrouch",
      "daira_name": "الحروش",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "781": {
      "id": 781,
      "commune_name_ascii": "Oum Toub",
      "commune_name": "أم الطوب",
      "daira_name_ascii": "Oum Toub",
      "daira_name": "أم الطوب",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "782": {
      "id": 782,
      "commune_name_ascii": "Ramdane Djamel",
      "commune_name": "رمضان جمال",
      "daira_name_ascii": "Ramdane Djamel",
      "daira_name": "رمضان جمال",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "783": {
      "id": 783,
      "commune_name_ascii": "Salah Bouchaour",
      "commune_name": "صالح بو الشعور",
      "daira_name_ascii": "El Harrouch",
      "daira_name": "الحروش",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "784": {
      "id": 784,
      "commune_name_ascii": "Sidi Mezghiche",
      "commune_name": "سيدي مزغيش",
      "daira_name_ascii": "Sidi Mezghiche",
      "daira_name": "سيدي مزغيش",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "785": {
      "id": 785,
      "commune_name_ascii": "Skikda",
      "commune_name": "سكيكدة",
      "daira_name_ascii": "Skikda",
      "daira_name": "سكيكدة",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": [
        {
          "center_id": 213502,
          "name": "Nouvelle Agence Skikda L'espérance [Yalidine]",
          "address": "Rue El Reboua El Djamila, partie N°01 rez-de-chaussée",
          "gps": "36.873354511972565,6.904929615263629",
          "commune_id": 2135,
          "commune_name": "Skikda",
          "wilaya_id": 21,
          "wilaya_name": "Skikda"
        },
        {
          "center_id": 213503,
          "name": "Agence de Skikda Faubourg [Guepex]",
          "address": "Rue Bachir BOUKADOUM BT 06 local N° 1",
          "gps": "36.86915957909143,6.907464813490152",
          "commune_id": 2135,
          "commune_name": "Skikda",
          "wilaya_id": 21,
          "wilaya_name": "Skikda"
        }
      ]
    },
    "786": {
      "id": 786,
      "commune_name_ascii": "Tamalous",
      "commune_name": "تمالوس",
      "daira_name_ascii": "Tamalous",
      "daira_name": "تمالوس",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "787": {
      "id": 787,
      "commune_name_ascii": "Zerdezas",
      "commune_name": "زردازة",
      "daira_name_ascii": "El Harrouch",
      "daira_name": "الحروش",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "788": {
      "id": 788,
      "commune_name_ascii": "Zitouna",
      "commune_name": "الزيتونة",
      "daira_name_ascii": "Zitouna",
      "daira_name": "الزيتونة",
      "wilaya_code": "21",
      "wilaya_name_ascii": "Skikda",
      "wilaya_name": "سكيكدة",
      "centers": []
    },
    "789": {
      "id": 789,
      "commune_name_ascii": "Ain El Berd",
      "commune_name": "عين البرد",
      "daira_name_ascii": "Ain El Berd",
      "daira_name": "عين البرد",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "790": {
      "id": 790,
      "commune_name_ascii": "Ain Kada",
      "commune_name": "عين قادة",
      "daira_name_ascii": "Sidi Ali Boussidi",
      "daira_name": "سيدي علي بوسيدي",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "791": {
      "id": 791,
      "commune_name_ascii": "Ain Thrid",
      "commune_name": "عين الثريد",
      "daira_name_ascii": "Tessala",
      "daira_name": "تسالة",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "792": {
      "id": 792,
      "commune_name_ascii": "Ain Tindamine",
      "commune_name": "عين تندمين",
      "daira_name_ascii": "Moulay Slissen",
      "daira_name": "مولاي سليسن",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "793": {
      "id": 793,
      "commune_name_ascii": "Ain- Adden",
      "commune_name": "عين أدن",
      "daira_name_ascii": "Sfisef",
      "daira_name": "سفيزف",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "794": {
      "id": 794,
      "commune_name_ascii": "Amarnas",
      "commune_name": "العمارنة",
      "daira_name_ascii": "Sidi Lahcene",
      "daira_name": "سيدي لحسن",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "795": {
      "id": 795,
      "commune_name_ascii": "Bedrabine El Mokrani",
      "commune_name": "بضرابين المقراني",
      "daira_name_ascii": "Ben Badis",
      "daira_name": "بن باديس",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "796": {
      "id": 796,
      "commune_name_ascii": "Belarbi",
      "commune_name": "بلعربي",
      "daira_name_ascii": "Mostefa  Ben Brahim",
      "daira_name": "مصطفى بن ابراهيم",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "797": {
      "id": 797,
      "commune_name_ascii": "Ben Badis",
      "commune_name": "بن باديس",
      "daira_name_ascii": "Ben Badis",
      "daira_name": "بن باديس",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "798": {
      "id": 798,
      "commune_name_ascii": "Benachiba Chelia",
      "commune_name": "بن عشيبة شلية",
      "daira_name_ascii": "Tenira",
      "daira_name": "تنيرة",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "799": {
      "id": 799,
      "commune_name_ascii": "Bir El Hammam",
      "commune_name": "بئر الحمام",
      "daira_name_ascii": "Marhoum",
      "daira_name": "مرحوم",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "800": {
      "id": 800,
      "commune_name_ascii": "Boudjebaa El Bordj",
      "commune_name": "بوجبهة البرج",
      "daira_name_ascii": "Sfisef",
      "daira_name": "سفيزف",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "801": {
      "id": 801,
      "commune_name_ascii": "Boukhanefis",
      "commune_name": "بوخنفيس",
      "daira_name_ascii": "Sidi Ali Ben Youb",
      "daira_name": "سيدي علي بن يوب",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "802": {
      "id": 802,
      "commune_name_ascii": "Chetouane Belaila",
      "commune_name": "شيطوان البلايلة",
      "daira_name_ascii": "Ben Badis",
      "daira_name": "بن باديس",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "803": {
      "id": 803,
      "commune_name_ascii": "Dhaya",
      "commune_name": "الضاية",
      "daira_name_ascii": "Telagh",
      "daira_name": "تلاغ",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "804": {
      "id": 804,
      "commune_name_ascii": "El Hacaiba",
      "commune_name": "الحصيبة",
      "daira_name_ascii": "Moulay Slissen",
      "daira_name": "مولاي سليسن",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "805": {
      "id": 805,
      "commune_name_ascii": "Hassi Dahou",
      "commune_name": "حاسي دحو",
      "daira_name_ascii": "Tenira",
      "daira_name": "تنيرة",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "806": {
      "id": 806,
      "commune_name_ascii": "Hassi Zahana",
      "commune_name": "حاسي زهانة",
      "daira_name_ascii": "Ben Badis",
      "daira_name": "بن باديس",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "807": {
      "id": 807,
      "commune_name_ascii": "Lamtar",
      "commune_name": "لمطار",
      "daira_name_ascii": "Sidi Ali Boussidi",
      "daira_name": "سيدي علي بوسيدي",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "808": {
      "id": 808,
      "commune_name_ascii": "Makedra",
      "commune_name": "مكدرة",
      "daira_name_ascii": "Ain El Berd",
      "daira_name": "عين البرد",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "809": {
      "id": 809,
      "commune_name_ascii": "Marhoum",
      "commune_name": "مرحوم",
      "daira_name_ascii": "Marhoum",
      "daira_name": "مرحوم",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "810": {
      "id": 810,
      "commune_name_ascii": "M'cid",
      "commune_name": "مسيد",
      "daira_name_ascii": "Sfisef",
      "daira_name": "سفيزف",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "811": {
      "id": 811,
      "commune_name_ascii": "Merine",
      "commune_name": "مرين",
      "daira_name_ascii": "Merine",
      "daira_name": "مرين",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "812": {
      "id": 812,
      "commune_name_ascii": "Mezaourou",
      "commune_name": "مزاورو",
      "daira_name_ascii": "Telagh",
      "daira_name": "تلاغ",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "813": {
      "id": 813,
      "commune_name_ascii": "Mostefa  Ben Brahim",
      "commune_name": "مصطفى بن ابراهيم",
      "daira_name_ascii": "Mostefa  Ben Brahim",
      "daira_name": "مصطفى بن ابراهيم",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "814": {
      "id": 814,
      "commune_name_ascii": "Moulay Slissen",
      "commune_name": "مولاي سليسن",
      "daira_name_ascii": "Moulay Slissen",
      "daira_name": "مولاي سليسن",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "815": {
      "id": 815,
      "commune_name_ascii": "Oued Sebaa",
      "commune_name": "وادي السبع",
      "daira_name_ascii": "Ras El Ma",
      "daira_name": "راس الماء",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "816": {
      "id": 816,
      "commune_name_ascii": "Oued Sefioun",
      "commune_name": "وادي سفيون",
      "daira_name_ascii": "Tenira",
      "daira_name": "تنيرة",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "817": {
      "id": 817,
      "commune_name_ascii": "Oued Taourira",
      "commune_name": "وادي تاوريرة",
      "daira_name_ascii": "Merine",
      "daira_name": "مرين",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "818": {
      "id": 818,
      "commune_name_ascii": "Ras El Ma",
      "commune_name": "راس الماء",
      "daira_name_ascii": "Ras El Ma",
      "daira_name": "راس الماء",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "819": {
      "id": 819,
      "commune_name_ascii": "Redjem Demouche",
      "commune_name": "رجم دموش",
      "daira_name_ascii": "Ras El Ma",
      "daira_name": "راس الماء",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "820": {
      "id": 820,
      "commune_name_ascii": "Sehala Thaoura",
      "commune_name": "السهالة الثورة",
      "daira_name_ascii": "Tessala",
      "daira_name": "تسالة",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "821": {
      "id": 821,
      "commune_name_ascii": "Sfisef",
      "commune_name": "سفيزف",
      "daira_name_ascii": "Sfisef",
      "daira_name": "سفيزف",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "822": {
      "id": 822,
      "commune_name_ascii": "Sidi Ali Benyoub",
      "commune_name": "سيدي علي بن يوب",
      "daira_name_ascii": "Sidi Ali Ben Youb",
      "daira_name": "سيدي علي بن يوب",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "823": {
      "id": 823,
      "commune_name_ascii": "Sidi Ali Boussidi",
      "commune_name": "سيدي علي بوسيدي",
      "daira_name_ascii": "Sidi Ali Boussidi",
      "daira_name": "سيدي علي بوسيدي",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "824": {
      "id": 824,
      "commune_name_ascii": "Sidi Bel-Abbes",
      "commune_name": "سيدي بلعباس",
      "daira_name_ascii": "Sidi Bel Abbes",
      "daira_name": "سيدي بلعباس",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": [
        {
          "center_id": 223601,
          "name": "Agence de Sidi Bel Abbes [Yalidine]",
          "address": "Rue Mascara, (à cote de l'hotel Beni Talla)",
          "gps": "35.18434154452605,-0.6141983368596451",
          "commune_id": 2236,
          "commune_name": "Sidi Bel Abbes",
          "wilaya_id": 22,
          "wilaya_name": "Sidi Bel Abbès"
        },
        {
          "center_id": 223602,
          "name": "Benhamouda [Guepex]",
          "address": "Benhamouda, (monté Sogral avant la mosquée El Safaa)",
          "gps": "35.22229568347109, -0.6257365146791259",
          "commune_id": 2236,
          "commune_name": "Sidi Bel Abbes",
          "wilaya_id": 22,
          "wilaya_name": "Sidi Bel Abbès"
        }
      ]
    },
    "825": {
      "id": 825,
      "commune_name_ascii": "Sidi Brahim",
      "commune_name": "سيدي ابراهيم",
      "daira_name_ascii": "Ain El Berd",
      "daira_name": "عين البرد",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "826": {
      "id": 826,
      "commune_name_ascii": "Sidi Chaib",
      "commune_name": "سيدي شعيب",
      "daira_name_ascii": "Marhoum",
      "daira_name": "مرحوم",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "827": {
      "id": 827,
      "commune_name_ascii": "Sidi Dahou Zairs",
      "commune_name": "سيدي دحو الزاير",
      "daira_name_ascii": "Sidi Ali Boussidi",
      "daira_name": "سيدي علي بوسيدي",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "828": {
      "id": 828,
      "commune_name_ascii": "Sidi Hamadouche",
      "commune_name": "سيدي حمادوش",
      "daira_name_ascii": "Ain El Berd",
      "daira_name": "عين البرد",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "829": {
      "id": 829,
      "commune_name_ascii": "Sidi Khaled",
      "commune_name": "سيدي خالد",
      "daira_name_ascii": "Sidi Lahcene",
      "daira_name": "سيدي لحسن",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "830": {
      "id": 830,
      "commune_name_ascii": "Sidi Lahcene",
      "commune_name": "سيدي لحسن",
      "daira_name_ascii": "Sidi Lahcene",
      "daira_name": "سيدي لحسن",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "831": {
      "id": 831,
      "commune_name_ascii": "Sidi Yacoub",
      "commune_name": "سيدي يعقوب",
      "daira_name_ascii": "Sidi Lahcene",
      "daira_name": "سيدي لحسن",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "832": {
      "id": 832,
      "commune_name_ascii": "Tabia",
      "commune_name": "طابية",
      "daira_name_ascii": "Sidi Ali Ben Youb",
      "daira_name": "سيدي علي بن يوب",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "833": {
      "id": 833,
      "commune_name_ascii": "Taoudmout",
      "commune_name": "تاودموت",
      "daira_name_ascii": "Merine",
      "daira_name": "مرين",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "834": {
      "id": 834,
      "commune_name_ascii": "Tefessour",
      "commune_name": "تفسور",
      "daira_name_ascii": "Merine",
      "daira_name": "مرين",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "835": {
      "id": 835,
      "commune_name_ascii": "Teghalimet",
      "commune_name": "تغاليمت",
      "daira_name_ascii": "Telagh",
      "daira_name": "تلاغ",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "836": {
      "id": 836,
      "commune_name_ascii": "Telagh",
      "commune_name": "تلاغ",
      "daira_name_ascii": "Telagh",
      "daira_name": "تلاغ",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "837": {
      "id": 837,
      "commune_name_ascii": "Tenira",
      "commune_name": "تنيرة",
      "daira_name_ascii": "Tenira",
      "daira_name": "تنيرة",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "838": {
      "id": 838,
      "commune_name_ascii": "Tessala",
      "commune_name": "تسالة",
      "daira_name_ascii": "Tessala",
      "daira_name": "تسالة",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "839": {
      "id": 839,
      "commune_name_ascii": "Tilmouni",
      "commune_name": "تلموني",
      "daira_name_ascii": "Mostefa  Ben Brahim",
      "daira_name": "مصطفى بن ابراهيم",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "840": {
      "id": 840,
      "commune_name_ascii": "Zerouala",
      "commune_name": "زروالة",
      "daira_name_ascii": "Mostefa  Ben Brahim",
      "daira_name": "مصطفى بن ابراهيم",
      "wilaya_code": "22",
      "wilaya_name_ascii": "Sidi Bel Abbès",
      "wilaya_name": "سيدي بلعباس",
      "centers": []
    },
    "841": {
      "id": 841,
      "commune_name_ascii": "Ain El Berda",
      "commune_name": "عين الباردة",
      "daira_name_ascii": "Ain El Berda",
      "daira_name": "عين الباردة",
      "wilaya_code": "23",
      "wilaya_name_ascii": "Annaba",
      "wilaya_name": "عنابة",
      "centers": []
    },
    "842": {
      "id": 842,
      "commune_name_ascii": "Annaba",
      "commune_name": "عنابة",
      "daira_name_ascii": "Annaba",
      "daira_name": "عنابة",
      "wilaya_code": "23",
      "wilaya_name_ascii": "Annaba",
      "wilaya_name": "عنابة",
      "centers": [
        {
          "center_id": 230101,
          "name": "Agence de Valmascort [Yalidine]",
          "address": "avenue Seddik Benyahia Résidence * Fadi el Djamal *",
          "gps": "36.917000917596404,7.7527438280073016",
          "commune_id": 2301,
          "commune_name": "Annaba",
          "wilaya_id": 23,
          "wilaya_name": "Annaba"
        },
        {
          "center_id": 230102,
          "name": "Agence de Sidi Brahim [Guepex]",
          "address": "Champs de mars numéro n°3",
          "gps": "36.89262144958703,7.752825084569422",
          "commune_id": 2301,
          "commune_name": "Annaba",
          "wilaya_id": 23,
          "wilaya_name": "Annaba"
        }
      ]
    },
    "843": {
      "id": 843,
      "commune_name_ascii": "Berrahal",
      "commune_name": "برحال",
      "daira_name_ascii": "Berrahal",
      "daira_name": "برحال",
      "wilaya_code": "23",
      "wilaya_name_ascii": "Annaba",
      "wilaya_name": "عنابة",
      "centers": []
    },
    "844": {
      "id": 844,
      "commune_name_ascii": "Chetaibi",
      "commune_name": "شطايبي",
      "daira_name_ascii": "Chetaibi",
      "daira_name": "شطايبي",
      "wilaya_code": "23",
      "wilaya_name_ascii": "Annaba",
      "wilaya_name": "عنابة",
      "centers": []
    },
    "845": {
      "id": 845,
      "commune_name_ascii": "Cheurfa",
      "commune_name": "الشرفة",
      "daira_name_ascii": "Ain El Berda",
      "daira_name": "عين الباردة",
      "wilaya_code": "23",
      "wilaya_name_ascii": "Annaba",
      "wilaya_name": "عنابة",
      "centers": []
    },
    "846": {
      "id": 846,
      "commune_name_ascii": "El Bouni",
      "commune_name": "البوني",
      "daira_name_ascii": "El Bouni",
      "daira_name": "البوني",
      "wilaya_code": "23",
      "wilaya_name_ascii": "Annaba",
      "wilaya_name": "عنابة",
      "centers": [
        {
          "center_id": 230501,
          "name": "Agence de El Bouni [Guepex]",
          "address": "Section 1 Groupe 63 Propriete 246",
          "gps": "36.85634274671219,7.7483953860755985",
          "commune_id": 2305,
          "commune_name": "El Bouni",
          "wilaya_id": 23,
          "wilaya_name": "Annaba"
        }
      ]
    },
    "847": {
      "id": 847,
      "commune_name_ascii": "El Eulma",
      "commune_name": "العلمة",
      "daira_name_ascii": "Ain El Berda",
      "daira_name": "عين الباردة",
      "wilaya_code": "23",
      "wilaya_name_ascii": "Annaba",
      "wilaya_name": "عنابة",
      "centers": []
    },
    "848": {
      "id": 848,
      "commune_name_ascii": "El Hadjar",
      "commune_name": "الحجار",
      "daira_name_ascii": "El Hadjar",
      "daira_name": "الحجار",
      "wilaya_code": "23",
      "wilaya_name_ascii": "Annaba",
      "wilaya_name": "عنابة",
      "centers": []
    },
    "849": {
      "id": 849,
      "commune_name_ascii": "Oued El Aneb",
      "commune_name": "واد العنب",
      "daira_name_ascii": "Berrahal",
      "daira_name": "برحال",
      "wilaya_code": "23",
      "wilaya_name_ascii": "Annaba",
      "wilaya_name": "عنابة",
      "centers": []
    },
    "850": {
      "id": 850,
      "commune_name_ascii": "Seraidi",
      "commune_name": "سرايدي",
      "daira_name_ascii": "Annaba",
      "daira_name": "عنابة",
      "wilaya_code": "23",
      "wilaya_name_ascii": "Annaba",
      "wilaya_name": "عنابة",
      "centers": []
    },
    "851": {
      "id": 851,
      "commune_name_ascii": "Sidi Amar",
      "commune_name": "سيدي عمار",
      "daira_name_ascii": "El Hadjar",
      "daira_name": "الحجار",
      "wilaya_code": "23",
      "wilaya_name_ascii": "Annaba",
      "wilaya_name": "عنابة",
      "centers": []
    },
    "852": {
      "id": 852,
      "commune_name_ascii": "Treat",
      "commune_name": "التريعات",
      "daira_name_ascii": "Berrahal",
      "daira_name": "برحال",
      "wilaya_code": "23",
      "wilaya_name_ascii": "Annaba",
      "wilaya_name": "عنابة",
      "centers": []
    },
    "853": {
      "id": 853,
      "commune_name_ascii": "Ain Ben Beida",
      "commune_name": "عين بن بيضاء",
      "daira_name_ascii": "Bouchegouf",
      "daira_name": "بوشقوف",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "854": {
      "id": 854,
      "commune_name_ascii": "Ain Larbi",
      "commune_name": "عين العربي",
      "daira_name_ascii": "Ain Makhlouf",
      "daira_name": "عين مخلوف",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "855": {
      "id": 855,
      "commune_name_ascii": "Ain Makhlouf",
      "commune_name": "عين مخلوف",
      "daira_name_ascii": "Ain Makhlouf",
      "daira_name": "عين مخلوف",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "856": {
      "id": 856,
      "commune_name_ascii": "Ain Regada",
      "commune_name": "عين رقادة",
      "daira_name_ascii": "Oued Zenati",
      "daira_name": "وادي الزناتي",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "857": {
      "id": 857,
      "commune_name_ascii": "Ain Sandel",
      "commune_name": "عين صندل",
      "daira_name_ascii": "Khezaras",
      "daira_name": "خزارة",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "858": {
      "id": 858,
      "commune_name_ascii": "Belkheir",
      "commune_name": "بلخير",
      "daira_name_ascii": "Guelaat Bousbaa",
      "daira_name": "قلعة بوصبع",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "859": {
      "id": 859,
      "commune_name_ascii": "Bendjarah",
      "commune_name": "بن جراح",
      "daira_name_ascii": "Guelma",
      "daira_name": "قالمة",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "860": {
      "id": 860,
      "commune_name_ascii": "Beni Mezline",
      "commune_name": "بني مزلين",
      "daira_name_ascii": "Guelaat Bousbaa",
      "daira_name": "قلعة بوصبع",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "861": {
      "id": 861,
      "commune_name_ascii": "Bordj Sabath",
      "commune_name": "برج صباط",
      "daira_name_ascii": "Oued Zenati",
      "daira_name": "وادي الزناتي",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "862": {
      "id": 862,
      "commune_name_ascii": "Bou Hachana",
      "commune_name": "بوحشانة",
      "daira_name_ascii": "Khezaras",
      "daira_name": "خزارة",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "863": {
      "id": 863,
      "commune_name_ascii": "Bou Hamdane",
      "commune_name": "بوحمدان",
      "daira_name_ascii": "Hammam Debagh",
      "daira_name": "حمام دباغ",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "864": {
      "id": 864,
      "commune_name_ascii": "Bouati Mahmoud",
      "commune_name": "بوعاتي محمود",
      "daira_name_ascii": "Heliopolis",
      "daira_name": "هيليوبوليس",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "865": {
      "id": 865,
      "commune_name_ascii": "Bouchegouf",
      "commune_name": "بوشقوف",
      "daira_name_ascii": "Bouchegouf",
      "daira_name": "بوشقوف",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "866": {
      "id": 866,
      "commune_name_ascii": "Boumahra Ahmed",
      "commune_name": "بومهرة أحمد",
      "daira_name_ascii": "Guelaat Bousbaa",
      "daira_name": "قلعة بوصبع",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "867": {
      "id": 867,
      "commune_name_ascii": "Dahouara",
      "commune_name": "الدهوارة",
      "daira_name_ascii": "Hammam N'bails",
      "daira_name": "حمام النبايل",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "868": {
      "id": 868,
      "commune_name_ascii": "Djeballah Khemissi",
      "commune_name": "جبالة الخميسي",
      "daira_name_ascii": "Guelaat Bousbaa",
      "daira_name": "قلعة بوصبع",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "869": {
      "id": 869,
      "commune_name_ascii": "El Fedjoudj",
      "commune_name": "الفجوج",
      "daira_name_ascii": "Heliopolis",
      "daira_name": "هيليوبوليس",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "870": {
      "id": 870,
      "commune_name_ascii": "Guelaat Bou Sbaa",
      "commune_name": "قلعة بوصبع",
      "daira_name_ascii": "Guelaat Bousbaa",
      "daira_name": "قلعة بوصبع",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "871": {
      "id": 871,
      "commune_name_ascii": "Guelma",
      "commune_name": "قالمة",
      "daira_name_ascii": "Guelma",
      "daira_name": "قالمة",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": [
        {
          "center_id": 241901,
          "name": "Nouvelle Agence Guelma [Yalidine]",
          "address": "route Ain Larbi, local N°01",
          "gps": "36.45597784442608, 7.426379566015017",
          "commune_id": 2419,
          "commune_name": "Guelma",
          "wilaya_id": 24,
          "wilaya_name": "Guelma"
        }
      ]
    },
    "872": {
      "id": 872,
      "commune_name_ascii": "Hammam Debagh",
      "commune_name": "حمام دباغ",
      "daira_name_ascii": "Hammam Debagh",
      "daira_name": "حمام دباغ",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "873": {
      "id": 873,
      "commune_name_ascii": "Hammam N'bail",
      "commune_name": "حمام النبايل",
      "daira_name_ascii": "Hammam N'bails",
      "daira_name": "حمام النبايل",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "874": {
      "id": 874,
      "commune_name_ascii": "Heliopolis",
      "commune_name": "هيليوبوليس",
      "daira_name_ascii": "Heliopolis",
      "daira_name": "هيليوبوليس",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "875": {
      "id": 875,
      "commune_name_ascii": "Nechmaya",
      "commune_name": "نشماية",
      "daira_name_ascii": "Guelaat Bousbaa",
      "daira_name": "قلعة بوصبع",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "876": {
      "id": 876,
      "commune_name_ascii": "Khezaras",
      "commune_name": "لخزارة",
      "daira_name_ascii": "Khezaras",
      "daira_name": "خزارة",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "877": {
      "id": 877,
      "commune_name_ascii": "Medjez Amar",
      "commune_name": "مجاز عمار",
      "daira_name_ascii": "Ain Hessainia",
      "daira_name": "عين حساينية",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "878": {
      "id": 878,
      "commune_name_ascii": "Medjez Sfa",
      "commune_name": "مجاز الصفاء",
      "daira_name_ascii": "Bouchegouf",
      "daira_name": "بوشقوف",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "879": {
      "id": 879,
      "commune_name_ascii": "Houari Boumedienne",
      "commune_name": "هواري بومدين",
      "daira_name_ascii": "Ain Hessainia",
      "daira_name": "عين حساينية",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "880": {
      "id": 880,
      "commune_name_ascii": "Oued Cheham",
      "commune_name": "وادي الشحم",
      "daira_name_ascii": "Hammam N'bails",
      "daira_name": "حمام النبايل",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "881": {
      "id": 881,
      "commune_name_ascii": "Oued Ferragha",
      "commune_name": "وادي فراغة",
      "daira_name_ascii": "Bouchegouf",
      "daira_name": "بوشقوف",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "882": {
      "id": 882,
      "commune_name_ascii": "Oued Zenati",
      "commune_name": "وادي الزناتي",
      "daira_name_ascii": "Oued Zenati",
      "daira_name": "وادي الزناتي",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": [
        {
          "center_id": 243001,
          "name": "Agence de Oued Zenati [Guepex]",
          "address": "Magasin Num 02",
          "gps": "36.30792321013235,7.160464035448827",
          "commune_id": 2430,
          "commune_name": "Oued Zenati",
          "wilaya_id": 24,
          "wilaya_name": "Guelma"
        }
      ]
    },
    "883": {
      "id": 883,
      "commune_name_ascii": "Ras El Agba",
      "commune_name": "رأس العقبة",
      "daira_name_ascii": "Ain Hessainia",
      "daira_name": "عين حساينية",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "884": {
      "id": 884,
      "commune_name_ascii": "Roknia",
      "commune_name": "الركنية",
      "daira_name_ascii": "Hammam Debagh",
      "daira_name": "حمام دباغ",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "885": {
      "id": 885,
      "commune_name_ascii": "Sellaoua Announa",
      "commune_name": "سلاوة عنونة",
      "daira_name_ascii": "Ain Hessainia",
      "daira_name": "عين حساينية",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "886": {
      "id": 886,
      "commune_name_ascii": "Tamlouka",
      "commune_name": "تاملوكة",
      "daira_name_ascii": "Ain Makhlouf",
      "daira_name": "عين مخلوف",
      "wilaya_code": "24",
      "wilaya_name_ascii": "Guelma",
      "wilaya_name": "قالمة",
      "centers": []
    },
    "887": {
      "id": 887,
      "commune_name_ascii": "Ain Abid",
      "commune_name": "عين عبيد",
      "daira_name_ascii": "Ain Abid",
      "daira_name": "عين عبيد",
      "wilaya_code": "25",
      "wilaya_name_ascii": "Constantine",
      "wilaya_name": "قسنطينة",
      "centers": []
    },
    "888": {
      "id": 888,
      "commune_name_ascii": "Ain Smara",
      "commune_name": "عين السمارة",
      "daira_name_ascii": "El Khroub",
      "daira_name": "الخروب",
      "wilaya_code": "25",
      "wilaya_name_ascii": "Constantine",
      "wilaya_name": "قسنطينة",
      "centers": []
    },
    "889": {
      "id": 889,
      "commune_name_ascii": "Ben Badis",
      "commune_name": "أبن باديس الهرية",
      "daira_name_ascii": "Ain Abid",
      "daira_name": "عين عبيد",
      "wilaya_code": "25",
      "wilaya_name_ascii": "Constantine",
      "wilaya_name": "قسنطينة",
      "centers": []
    },
    "890": {
      "id": 890,
      "commune_name_ascii": "Beni Hamidane",
      "commune_name": "بني حميدان",
      "daira_name_ascii": "Zighoud Youcef",
      "daira_name": "زيغود يوسف",
      "wilaya_code": "25",
      "wilaya_name_ascii": "Constantine",
      "wilaya_name": "قسنطينة",
      "centers": []
    },
    "891": {
      "id": 891,
      "commune_name_ascii": "Constantine",
      "commune_name": "قسنطينة",
      "daira_name_ascii": "Constantine",
      "daira_name": "قسنطينة",
      "wilaya_code": "25",
      "wilaya_name_ascii": "Constantine",
      "wilaya_name": "قسنطينة",
      "centers": [
        {
          "center_id": 250401,
          "name": "Agence Belle vue [Yalidine]",
          "address": "70 Rue Belle Vue, Les Combattants (Ancienne Ville)",
          "gps": "36.3529999173718,6.608103735250445",
          "commune_id": 2504,
          "commune_name": "Constantine",
          "wilaya_id": 25,
          "wilaya_name": "Constantine"
        },
        {
          "center_id": 250402,
          "name": "Agence Sidi Mabrouk [Guepex]",
          "address": "نهج لعراقب احمد رقم 09",
          "gps": "36.36117011786894, 6.636566271164361",
          "commune_id": 2504,
          "commune_name": "Constantine",
          "wilaya_id": 25,
          "wilaya_name": "Constantine"
        }
      ]
    },
    "892": {
      "id": 892,
      "commune_name_ascii": "Didouche Mourad",
      "commune_name": "ديدوش مراد",
      "daira_name_ascii": "Hamma Bouziane",
      "daira_name": "حامة بوزيان",
      "wilaya_code": "25",
      "wilaya_name_ascii": "Constantine",
      "wilaya_name": "قسنطينة",
      "centers": [
        {
          "center_id": 250501,
          "name": "Agence de Didouche Mourad [Yalidine]",
          "address": "El Riadh n°10",
          "gps": "36.44833167015881, 6.630756215108476",
          "commune_id": 2505,
          "commune_name": "Didouche Mourad",
          "wilaya_id": 25,
          "wilaya_name": "Constantine"
        }
      ]
    },
    "893": {
      "id": 893,
      "commune_name_ascii": "El Khroub",
      "commune_name": "الخروب",
      "daira_name_ascii": "El Khroub",
      "daira_name": "الخروب",
      "wilaya_code": "25",
      "wilaya_name_ascii": "Constantine",
      "wilaya_name": "قسنطينة",
      "centers": [
        {
          "center_id": 250601,
          "name": "Agence d'El Khroub [Guepex]",
          "address": "Cité Bouhali Mohamed Said El Khroub",
          "gps": "36.264496940142756, 6.689403542328722",
          "commune_id": 2506,
          "commune_name": "El Khroub",
          "wilaya_id": 25,
          "wilaya_name": "Constantine"
        },
        {
          "center_id": 250602,
          "name": "Agence Ali Mendjeli [Yalidine]",
          "address": "Zone d'Activité N°47 Nouvelle Ville, Ali MENDJLI",
          "gps": "36.25992159231852, 6.593449177806023",
          "commune_id": 2506,
          "commune_name": "El Khroub",
          "wilaya_id": 25,
          "wilaya_name": "Constantine"
        },
        {
          "center_id": 250605,
          "name": "Agence de Ali Mendjli [Guepex]",
          "address": "650 lpa عمارة 24 زاوية محل 145 ",
          "gps": "36.22914576332777, 6.5751325423287215",
          "commune_id": 2506,
          "commune_name": "El Khroub",
          "wilaya_id": 25,
          "wilaya_name": "Constantine"
        }
      ]
    },
    "894": {
      "id": 894,
      "commune_name_ascii": "Hamma Bouziane",
      "commune_name": "حامة بوزيان",
      "daira_name_ascii": "Hamma Bouziane",
      "daira_name": "حامة بوزيان",
      "wilaya_code": "25",
      "wilaya_name_ascii": "Constantine",
      "wilaya_name": "قسنطينة",
      "centers": []
    },
    "895": {
      "id": 895,
      "commune_name_ascii": "Ibn Ziad",
      "commune_name": "ابن زياد",
      "daira_name_ascii": "Ibn Ziad",
      "daira_name": "ابن زياد",
      "wilaya_code": "25",
      "wilaya_name_ascii": "Constantine",
      "wilaya_name": "قسنطينة",
      "centers": []
    },
    "896": {
      "id": 896,
      "commune_name_ascii": "Messaoud Boudjeriou",
      "commune_name": "بوجريو مسعود",
      "daira_name_ascii": "Ibn Ziad",
      "daira_name": "ابن زياد",
      "wilaya_code": "25",
      "wilaya_name_ascii": "Constantine",
      "wilaya_name": "قسنطينة",
      "centers": []
    },
    "897": {
      "id": 897,
      "commune_name_ascii": "Ouled Rahmoun",
      "commune_name": "أولاد رحمون",
      "daira_name_ascii": "El Khroub",
      "daira_name": "الخروب",
      "wilaya_code": "25",
      "wilaya_name_ascii": "Constantine",
      "wilaya_name": "قسنطينة",
      "centers": []
    },
    "898": {
      "id": 898,
      "commune_name_ascii": "Zighoud Youcef",
      "commune_name": "زيغود يوسف",
      "daira_name_ascii": "Zighoud Youcef",
      "daira_name": "زيغود يوسف",
      "wilaya_code": "25",
      "wilaya_name_ascii": "Constantine",
      "wilaya_name": "قسنطينة",
      "centers": []
    },
    "899": {
      "id": 899,
      "commune_name_ascii": "Ain Boucif",
      "commune_name": "عين بوسيف",
      "daira_name_ascii": "Ain Boucif",
      "daira_name": "عين بوسيف",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "900": {
      "id": 900,
      "commune_name_ascii": "Ain Ouksir",
      "commune_name": "عين اقصير",
      "daira_name_ascii": "Chellalat El Adhaoura",
      "daira_name": "شلالة العذاورة",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "901": {
      "id": 901,
      "commune_name_ascii": "Aissaouia",
      "commune_name": "العيساوية",
      "daira_name_ascii": "Tablat",
      "daira_name": "تابلاط",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "902": {
      "id": 902,
      "commune_name_ascii": "Aziz",
      "commune_name": "عزيز",
      "daira_name_ascii": "Aziz",
      "daira_name": "عزيز",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "903": {
      "id": 903,
      "commune_name_ascii": "Baata",
      "commune_name": "بعطة",
      "daira_name_ascii": "El Omaria",
      "daira_name": "العمارية",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "904": {
      "id": 904,
      "commune_name_ascii": "Ben Chicao",
      "commune_name": "بن شكاو",
      "daira_name_ascii": "Ouzera",
      "daira_name": "وزرة",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "905": {
      "id": 905,
      "commune_name_ascii": "Beni Slimane",
      "commune_name": "بني سليمان",
      "daira_name_ascii": "Beni Slimane",
      "daira_name": "بني سليمان",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": [
        {
          "center_id": 260701,
          "name": "Agence Médéa Beni Slimane [Yalidine]",
          "address": "مجموعة ملكية رقم 44 قسم 44 بالتجزئة 55 حصة بني سليمان",
          "gps": "36.228267439084156,3.310825256843856",
          "commune_id": 2607,
          "commune_name": "Beni Slimane",
          "wilaya_id": 26,
          "wilaya_name": "Médéa"
        }
      ]
    },
    "906": {
      "id": 906,
      "commune_name_ascii": "Berrouaghia",
      "commune_name": "البرواقية",
      "daira_name_ascii": "Berrouaghia",
      "daira_name": "البرواقية",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "907": {
      "id": 907,
      "commune_name_ascii": "Bir Ben Laabed",
      "commune_name": "بئر بن عابد",
      "daira_name_ascii": "Guelb El Kebir",
      "daira_name": "القلب الكبير",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "908": {
      "id": 908,
      "commune_name_ascii": "Boghar",
      "commune_name": "بوغار",
      "daira_name_ascii": "Ouled Antar",
      "daira_name": "أولاد عنتر",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "909": {
      "id": 909,
      "commune_name_ascii": "Bouaiche",
      "commune_name": "بوعيش",
      "daira_name_ascii": "Chahbounia",
      "daira_name": "الشهبونية",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "910": {
      "id": 910,
      "commune_name_ascii": "Bouaichoune",
      "commune_name": "بوعيشون",
      "daira_name_ascii": "Si Mahdjoub",
      "daira_name": "سي المحجوب",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "911": {
      "id": 911,
      "commune_name_ascii": "Bouchrahil",
      "commune_name": "بوشراحيل",
      "daira_name_ascii": "Sidi Naamane",
      "daira_name": "سيدي نعمان",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "912": {
      "id": 912,
      "commune_name_ascii": "Boughzoul",
      "commune_name": "بوغزول",
      "daira_name_ascii": "Chahbounia",
      "daira_name": "الشهبونية",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "913": {
      "id": 913,
      "commune_name_ascii": "Bouskene",
      "commune_name": "بوسكن",
      "daira_name_ascii": "Beni Slimane",
      "daira_name": "بني سليمان",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "914": {
      "id": 914,
      "commune_name_ascii": "Chabounia",
      "commune_name": "الشهبونية",
      "daira_name_ascii": "Chahbounia",
      "daira_name": "الشهبونية",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "915": {
      "id": 915,
      "commune_name_ascii": "Chelalet El Adhaoura",
      "commune_name": "شلالة العذاورة",
      "daira_name_ascii": "Chellalat El Adhaoura",
      "daira_name": "شلالة العذاورة",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "916": {
      "id": 916,
      "commune_name_ascii": "Cheniguel",
      "commune_name": "شنيقل",
      "daira_name_ascii": "Chellalat El Adhaoura",
      "daira_name": "شلالة العذاورة",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "917": {
      "id": 917,
      "commune_name_ascii": "Derrag",
      "commune_name": "دراق",
      "daira_name_ascii": "Aziz",
      "daira_name": "عزيز",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "918": {
      "id": 918,
      "commune_name_ascii": "Djouab",
      "commune_name": "جواب",
      "daira_name_ascii": "Souaghi",
      "daira_name": "السواقي",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "919": {
      "id": 919,
      "commune_name_ascii": "Draa Esmar",
      "commune_name": "ذراع السمار",
      "daira_name_ascii": "Medea",
      "daira_name": "المدية",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "920": {
      "id": 920,
      "commune_name_ascii": "El Azizia",
      "commune_name": "العزيزية",
      "daira_name_ascii": "El Azizia",
      "daira_name": "العزيزية",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "921": {
      "id": 921,
      "commune_name_ascii": "El Guelbelkebir",
      "commune_name": "القلب الكبير",
      "daira_name_ascii": "Guelb El Kebir",
      "daira_name": "القلب الكبير",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "922": {
      "id": 922,
      "commune_name_ascii": "El Hamdania",
      "commune_name": "الحمدانية",
      "daira_name_ascii": "Ouzera",
      "daira_name": "وزرة",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "923": {
      "id": 923,
      "commune_name_ascii": "El Haoudane",
      "commune_name": "الحوضان",
      "daira_name_ascii": "Tablat",
      "daira_name": "تابلاط",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "924": {
      "id": 924,
      "commune_name_ascii": "El Omaria",
      "commune_name": "العمارية",
      "daira_name_ascii": "El Omaria",
      "daira_name": "العمارية",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "925": {
      "id": 925,
      "commune_name_ascii": "El Ouinet",
      "commune_name": "العوينات",
      "daira_name_ascii": "Ain Boucif",
      "daira_name": "عين بوسيف",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "926": {
      "id": 926,
      "commune_name_ascii": "Hannacha",
      "commune_name": "حناشة",
      "daira_name_ascii": "Ouamri",
      "daira_name": "عوامري",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "927": {
      "id": 927,
      "commune_name_ascii": "Kef Lakhdar",
      "commune_name": "الكاف الاخضر",
      "daira_name_ascii": "Ain Boucif",
      "daira_name": "عين بوسيف",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "928": {
      "id": 928,
      "commune_name_ascii": "Khams Djouamaa",
      "commune_name": "خمس جوامع",
      "daira_name_ascii": "Sidi Naamane",
      "daira_name": "سيدي نعمان",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "929": {
      "id": 929,
      "commune_name_ascii": "Ksar El Boukhari",
      "commune_name": "قصر البخاري",
      "daira_name_ascii": "Ksar El Boukhari",
      "daira_name": "قصر البخاري",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "930": {
      "id": 930,
      "commune_name_ascii": "Maghraoua",
      "commune_name": "مغراوة",
      "daira_name_ascii": "El Azizia",
      "daira_name": "العزيزية",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "931": {
      "id": 931,
      "commune_name_ascii": "Medea",
      "commune_name": "المدية",
      "daira_name_ascii": "Medea",
      "daira_name": "المدية",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": [
        {
          "center_id": 263301,
          "name": "Agence de Médéa [El Koutab] [Yalidine]",
          "address": "Hai El Koutab Médéa (En face boutique Dyelna Shop)",
          "gps": "36.275393392468935, 2.7702085400567786",
          "commune_id": 2633,
          "commune_name": "Médéa",
          "wilaya_id": 26,
          "wilaya_name": "Médéa"
        },
        {
          "center_id": 263302,
          "name": "Agence de Médéa [Pole Urbain] [Guepex]",
          "address": "Cité 80 Logs LSP Pole Urbain (à coté de la station de service Benhafri)",
          "gps": "36.267663838556054, 2.7906953509033734",
          "commune_id": 2633,
          "commune_name": "Médéa",
          "wilaya_id": 26,
          "wilaya_name": "Médéa"
        }
      ]
    },
    "932": {
      "id": 932,
      "commune_name_ascii": "Medjebar",
      "commune_name": "مجبر",
      "daira_name_ascii": "Seghouane",
      "daira_name": "سغوان",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "933": {
      "id": 933,
      "commune_name_ascii": "Mezerana",
      "commune_name": "مزغنة",
      "daira_name_ascii": "Tablat",
      "daira_name": "تابلاط",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "934": {
      "id": 934,
      "commune_name_ascii": "M'fatha",
      "commune_name": "مفاتحة",
      "daira_name_ascii": "Ksar El Boukhari",
      "daira_name": "قصر البخاري",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "935": {
      "id": 935,
      "commune_name_ascii": "Mihoub",
      "commune_name": "ميهوب",
      "daira_name_ascii": "El Azizia",
      "daira_name": "العزيزية",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "936": {
      "id": 936,
      "commune_name_ascii": "Ouamri",
      "commune_name": "عوامري",
      "daira_name_ascii": "Ouamri",
      "daira_name": "عوامري",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "937": {
      "id": 937,
      "commune_name_ascii": "Oued Harbil",
      "commune_name": "وادي حربيل",
      "daira_name_ascii": "Ouamri",
      "daira_name": "عوامري",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "938": {
      "id": 938,
      "commune_name_ascii": "Ouled Antar",
      "commune_name": "أولاد عنتر",
      "daira_name_ascii": "Ouled Antar",
      "daira_name": "أولاد عنتر",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "939": {
      "id": 939,
      "commune_name_ascii": "Ouled Bouachra",
      "commune_name": "أولاد بوعشرة",
      "daira_name_ascii": "Si Mahdjoub",
      "daira_name": "سي المحجوب",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "940": {
      "id": 940,
      "commune_name_ascii": "Ouled Brahim",
      "commune_name": "أولاد إبراهيم",
      "daira_name_ascii": "El Omaria",
      "daira_name": "العمارية",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "941": {
      "id": 941,
      "commune_name_ascii": "Ouled Deid",
      "commune_name": "أولاد دايد",
      "daira_name_ascii": "Berrouaghia",
      "daira_name": "البرواقية",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "942": {
      "id": 942,
      "commune_name_ascii": "Ouled Emaaraf",
      "commune_name": "أولاد امعرف",
      "daira_name_ascii": "Ain Boucif",
      "daira_name": "عين بوسيف",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "943": {
      "id": 943,
      "commune_name_ascii": "Ouled Hellal",
      "commune_name": "أولاد هلال",
      "daira_name_ascii": "Ouled Antar",
      "daira_name": "أولاد عنتر",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "944": {
      "id": 944,
      "commune_name_ascii": "Oum El Djellil",
      "commune_name": "أم الجليل",
      "daira_name_ascii": "Aziz",
      "daira_name": "عزيز",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "945": {
      "id": 945,
      "commune_name_ascii": "Ouzera",
      "commune_name": "وزرة",
      "daira_name_ascii": "Ouzera",
      "daira_name": "وزرة",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "946": {
      "id": 946,
      "commune_name_ascii": "Rebaia",
      "commune_name": "الربعية",
      "daira_name_ascii": "Berrouaghia",
      "daira_name": "البرواقية",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "947": {
      "id": 947,
      "commune_name_ascii": "Saneg",
      "commune_name": "السانق",
      "daira_name_ascii": "Ksar El Boukhari",
      "daira_name": "قصر البخاري",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "948": {
      "id": 948,
      "commune_name_ascii": "Sedraya",
      "commune_name": "سدراية",
      "daira_name_ascii": "Guelb El Kebir",
      "daira_name": "القلب الكبير",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "949": {
      "id": 949,
      "commune_name_ascii": "Seghouane",
      "commune_name": "سغوان",
      "daira_name_ascii": "Seghouane",
      "daira_name": "سغوان",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "950": {
      "id": 950,
      "commune_name_ascii": "Si Mahdjoub",
      "commune_name": "سي المحجوب",
      "daira_name_ascii": "Si Mahdjoub",
      "daira_name": "سي المحجوب",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "951": {
      "id": 951,
      "commune_name_ascii": "Sidi Demed",
      "commune_name": "سيدي دامد",
      "daira_name_ascii": "Ain Boucif",
      "daira_name": "عين بوسيف",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "952": {
      "id": 952,
      "commune_name_ascii": "Sidi Naamane",
      "commune_name": "سيدي نعمان",
      "daira_name_ascii": "Sidi Naamane",
      "daira_name": "سيدي نعمان",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "953": {
      "id": 953,
      "commune_name_ascii": "Sidi Rabie",
      "commune_name": "سيدي الربيع",
      "daira_name_ascii": "Beni Slimane",
      "daira_name": "بني سليمان",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "954": {
      "id": 954,
      "commune_name_ascii": "Sidi Zahar",
      "commune_name": "سيدي زهار",
      "daira_name_ascii": "Souaghi",
      "daira_name": "السواقي",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "955": {
      "id": 955,
      "commune_name_ascii": "Sidi Ziane",
      "commune_name": "سيدي زيان",
      "daira_name_ascii": "Souaghi",
      "daira_name": "السواقي",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "956": {
      "id": 956,
      "commune_name_ascii": "Souagui",
      "commune_name": "السواقي",
      "daira_name_ascii": "Souaghi",
      "daira_name": "السواقي",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "957": {
      "id": 957,
      "commune_name_ascii": "Tablat",
      "commune_name": "تابلاط",
      "daira_name_ascii": "Tablat",
      "daira_name": "تابلاط",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": [
        {
          "center_id": 265901,
          "name": "Agence Tablat [Yalidine]",
          "address": "rue nationale N 08",
          "gps": "36.40665669612093, 3.3224722",
          "commune_id": 2659,
          "commune_name": "Tablat",
          "wilaya_id": 26,
          "wilaya_name": "Médéa"
        }
      ]
    },
    "958": {
      "id": 958,
      "commune_name_ascii": "Tafraout",
      "commune_name": "تفراوت",
      "daira_name_ascii": "Chellalat El Adhaoura",
      "daira_name": "شلالة العذاورة",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "959": {
      "id": 959,
      "commune_name_ascii": "Tamesguida",
      "commune_name": "تمسقيدة",
      "daira_name_ascii": "Medea",
      "daira_name": "المدية",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "960": {
      "id": 960,
      "commune_name_ascii": "Tizi Mahdi",
      "commune_name": "تيزي مهدي",
      "daira_name_ascii": "Ouzera",
      "daira_name": "وزرة",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "961": {
      "id": 961,
      "commune_name_ascii": "Tletat Ed Douair",
      "commune_name": "ثلاث دوائر",
      "daira_name_ascii": "Seghouane",
      "daira_name": "سغوان",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "962": {
      "id": 962,
      "commune_name_ascii": "Zoubiria",
      "commune_name": "الزبيرية",
      "daira_name_ascii": "Seghouane",
      "daira_name": "سغوان",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": []
    },
    "963": {
      "id": 963,
      "commune_name_ascii": "Achaacha",
      "commune_name": "عشعاشة",
      "daira_name_ascii": "Achaacha",
      "daira_name": "عشعاشة",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "964": {
      "id": 964,
      "commune_name_ascii": "Ain-Boudinar",
      "commune_name": "عين بودينار",
      "daira_name_ascii": "Kheir Eddine",
      "daira_name": "خير الدين",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "965": {
      "id": 965,
      "commune_name_ascii": "Ain-Nouissy",
      "commune_name": "عين نويسي",
      "daira_name_ascii": "Ain Nouicy",
      "daira_name": "عين نويسي",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "966": {
      "id": 966,
      "commune_name_ascii": "Ain-Sidi Cherif",
      "commune_name": "عين سيدي الشريف",
      "daira_name_ascii": "Mesra",
      "daira_name": "ماسرة",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "967": {
      "id": 967,
      "commune_name_ascii": "Ain-Tedles",
      "commune_name": "عين تادلس",
      "daira_name_ascii": "Ain Tedeles",
      "daira_name": "عين تادلس",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "968": {
      "id": 968,
      "commune_name_ascii": "Benabdelmalek Ramdane",
      "commune_name": "بن عبد المالك رمضان",
      "daira_name_ascii": "Sidi Lakhdar",
      "daira_name": "سيدي لخضر",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "969": {
      "id": 969,
      "commune_name_ascii": "Bouguirat",
      "commune_name": "بوقيراط",
      "daira_name_ascii": "Bouguirat",
      "daira_name": "بوقيراط",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "970": {
      "id": 970,
      "commune_name_ascii": "Fornaka",
      "commune_name": "فرناقة",
      "daira_name_ascii": "Ain Nouicy",
      "daira_name": "عين نويسي",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "971": {
      "id": 971,
      "commune_name_ascii": "Hadjadj",
      "commune_name": "حجاج",
      "daira_name_ascii": "Sidi Lakhdar",
      "daira_name": "سيدي لخضر",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "972": {
      "id": 972,
      "commune_name_ascii": "Hassi Mameche",
      "commune_name": "حاسي ماماش",
      "daira_name_ascii": "Hassi Mameche",
      "daira_name": "حاسي ماماش",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "973": {
      "id": 973,
      "commune_name_ascii": "Hassiane",
      "commune_name": "الحسيان (بني ياحي",
      "daira_name_ascii": "Ain Nouicy",
      "daira_name": "عين نويسي",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "974": {
      "id": 974,
      "commune_name_ascii": "Khadra",
      "commune_name": "خضرة",
      "daira_name_ascii": "Achaacha",
      "daira_name": "عشعاشة",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "975": {
      "id": 975,
      "commune_name_ascii": "Kheir-Eddine",
      "commune_name": "خير الدين",
      "daira_name_ascii": "Kheir Eddine",
      "daira_name": "خير الدين",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "976": {
      "id": 976,
      "commune_name_ascii": "Mansourah",
      "commune_name": "منصورة",
      "daira_name_ascii": "Mesra",
      "daira_name": "ماسرة",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "977": {
      "id": 977,
      "commune_name_ascii": "Mazagran",
      "commune_name": "مزغران",
      "daira_name_ascii": "Hassi Mameche",
      "daira_name": "حاسي ماماش",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "978": {
      "id": 978,
      "commune_name_ascii": "Mesra",
      "commune_name": "ماسرة",
      "daira_name_ascii": "Mesra",
      "daira_name": "ماسرة",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "979": {
      "id": 979,
      "commune_name_ascii": "Mostaganem",
      "commune_name": "مستغانم",
      "daira_name_ascii": "Mostaganem",
      "daira_name": "مستغانم",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": [
        {
          "center_id": 271801,
          "name": "Salamandre [Yalidine]",
          "address": "Salamandre (Rond Point De La Douane)",
          "gps": "35.9213552114013,0.07318708477898198",
          "commune_id": 2718,
          "commune_name": "Mostaganem",
          "wilaya_id": 27,
          "wilaya_name": "Mostaganem"
        },
        {
          "center_id": 271802,
          "name": "Kharouba [Guepex]",
          "address": "Cité 144 logement",
          "gps": "35.96974548538955, 0.10728168375911737",
          "commune_id": 2718,
          "commune_name": "Mostaganem",
          "wilaya_id": 27,
          "wilaya_name": "Mostaganem"
        }
      ]
    },
    "980": {
      "id": 980,
      "commune_name_ascii": "Nekmaria",
      "commune_name": "نكمارية",
      "daira_name_ascii": "Achaacha",
      "daira_name": "عشعاشة",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "981": {
      "id": 981,
      "commune_name_ascii": "Oued El Kheir",
      "commune_name": "وادي الخير",
      "daira_name_ascii": "Ain Tedeles",
      "daira_name": "عين تادلس",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "982": {
      "id": 982,
      "commune_name_ascii": "Ouled Boughalem",
      "commune_name": "أولاد بوغالم",
      "daira_name_ascii": "Achaacha",
      "daira_name": "عشعاشة",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "983": {
      "id": 983,
      "commune_name_ascii": "Ouled-Maalah",
      "commune_name": "أولاد مع الله",
      "daira_name_ascii": "Sidi Ali",
      "daira_name": "سيدي علي",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "984": {
      "id": 984,
      "commune_name_ascii": "Safsaf",
      "commune_name": "صفصاف",
      "daira_name_ascii": "Bouguirat",
      "daira_name": "بوقيراط",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "985": {
      "id": 985,
      "commune_name_ascii": "Sayada",
      "commune_name": "صيادة",
      "daira_name_ascii": "Kheir Eddine",
      "daira_name": "خير الدين",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "986": {
      "id": 986,
      "commune_name_ascii": "Sidi Ali",
      "commune_name": "سيدي علي",
      "daira_name_ascii": "Sidi Ali",
      "daira_name": "سيدي علي",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "987": {
      "id": 987,
      "commune_name_ascii": "Sidi Belaattar",
      "commune_name": "سيدي بلعطار",
      "daira_name_ascii": "Ain Tedeles",
      "daira_name": "عين تادلس",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "988": {
      "id": 988,
      "commune_name_ascii": "Sidi-Lakhdar",
      "commune_name": "سيدي لخضر",
      "daira_name_ascii": "Sidi Lakhdar",
      "daira_name": "سيدي لخضر",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "989": {
      "id": 989,
      "commune_name_ascii": "Sirat",
      "commune_name": "سيرات",
      "daira_name_ascii": "Bouguirat",
      "daira_name": "بوقيراط",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "990": {
      "id": 990,
      "commune_name_ascii": "Souaflia",
      "commune_name": "السوافلية",
      "daira_name_ascii": "Bouguirat",
      "daira_name": "بوقيراط",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "991": {
      "id": 991,
      "commune_name_ascii": "Sour",
      "commune_name": "سور",
      "daira_name_ascii": "Ain Tedeles",
      "daira_name": "عين تادلس",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "992": {
      "id": 992,
      "commune_name_ascii": "Stidia",
      "commune_name": "ستيدية",
      "daira_name_ascii": "Hassi Mameche",
      "daira_name": "حاسي ماماش",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "993": {
      "id": 993,
      "commune_name_ascii": "Tazgait",
      "commune_name": "تزقايت",
      "daira_name_ascii": "Sidi Ali",
      "daira_name": "سيدي علي",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "994": {
      "id": 994,
      "commune_name_ascii": "Touahria",
      "commune_name": "الطواهرية",
      "daira_name_ascii": "Mesra",
      "daira_name": "ماسرة",
      "wilaya_code": "27",
      "wilaya_name_ascii": "Mostaganem",
      "wilaya_name": "مستغانم",
      "centers": []
    },
    "995": {
      "id": 995,
      "commune_name_ascii": "Ain El Hadjel",
      "commune_name": "عين الحجل",
      "daira_name_ascii": "Ain El Hadjel",
      "daira_name": "عين الحجل",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "996": {
      "id": 996,
      "commune_name_ascii": "Ain El Melh",
      "commune_name": "عين الملح",
      "daira_name_ascii": "Ain El Melh",
      "daira_name": "عين الملح",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "997": {
      "id": 997,
      "commune_name_ascii": "Ain Fares",
      "commune_name": "عين فارس",
      "daira_name_ascii": "Ain El Melh",
      "daira_name": "عين الملح",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "998": {
      "id": 998,
      "commune_name_ascii": "Ain Khadra",
      "commune_name": "عين الخضراء",
      "daira_name_ascii": "Magra",
      "daira_name": "مقرة",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "999": {
      "id": 999,
      "commune_name_ascii": "Ain Rich",
      "commune_name": "عين الريش",
      "daira_name_ascii": "Ain El Melh",
      "daira_name": "عين الملح",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1000": {
      "id": 1000,
      "commune_name_ascii": "Belaiba",
      "commune_name": "بلعايبة",
      "daira_name_ascii": "Magra",
      "daira_name": "مقرة",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1001": {
      "id": 1001,
      "commune_name_ascii": "Ben Srour",
      "commune_name": "بن سرور",
      "daira_name_ascii": "Ben Srour",
      "daira_name": "بن سرور",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1002": {
      "id": 1002,
      "commune_name_ascii": "Beni Ilmane",
      "commune_name": "بني يلمان",
      "daira_name_ascii": "Sidi Aissa",
      "daira_name": "سيدي عيسى",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1003": {
      "id": 1003,
      "commune_name_ascii": "Benzouh",
      "commune_name": "بن زوه",
      "daira_name_ascii": "Ouled Sidi Brahim",
      "daira_name": "أولاد سيدي ابراهيم",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1004": {
      "id": 1004,
      "commune_name_ascii": "Berhoum",
      "commune_name": "برهوم",
      "daira_name_ascii": "Magra",
      "daira_name": "مقرة",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": [
        {
          "center_id": 281001,
          "name": "Agence de Berhoum Guepex",
          "address": "محل رقم 03 مجموعة ملكية 333 قسم 02 حي زيغود يوسف بلدية برهوم",
          "gps": "35.65709385298696,5.030348826732219",
          "commune_id": 2810,
          "commune_name": "Berhoum",
          "wilaya_id": 28,
          "wilaya_name": "M'Sila"
        }
      ]
    },
    "1005": {
      "id": 1005,
      "commune_name_ascii": "Bir Foda",
      "commune_name": "بئر فضة",
      "daira_name_ascii": "Ain El Melh",
      "daira_name": "عين الملح",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1006": {
      "id": 1006,
      "commune_name_ascii": "Bou Saada",
      "commune_name": "بوسعادة",
      "daira_name_ascii": "Bousaada",
      "daira_name": "بوسعادة",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": [
        {
          "center_id": 281201,
          "name": "Agence de Bou Saâda Yalidine",
          "address": "Cite 20 Aout 636/N°05 A",
          "gps": "35.22031324045397,4.178352103974209",
          "commune_id": 2812,
          "commune_name": "Bou Saâda",
          "wilaya_id": 28,
          "wilaya_name": "M'Sila"
        }
      ]
    },
    "1007": {
      "id": 1007,
      "commune_name_ascii": "Bouti Sayeh",
      "commune_name": "بوطي السايح",
      "daira_name_ascii": "Sidi Aissa",
      "daira_name": "سيدي عيسى",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1008": {
      "id": 1008,
      "commune_name_ascii": "Chellal",
      "commune_name": "شلال",
      "daira_name_ascii": "Chellal",
      "daira_name": "شلال",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1009": {
      "id": 1009,
      "commune_name_ascii": "Dehahna",
      "commune_name": "دهاهنة",
      "daira_name_ascii": "Magra",
      "daira_name": "مقرة",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1010": {
      "id": 1010,
      "commune_name_ascii": "Djebel Messaad",
      "commune_name": "جبل مساعد",
      "daira_name_ascii": "Djebel Messaad",
      "daira_name": "جبل مساعد",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1011": {
      "id": 1011,
      "commune_name_ascii": "El Hamel",
      "commune_name": "الهامل",
      "daira_name_ascii": "Bousaada",
      "daira_name": "بوسعادة",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1012": {
      "id": 1012,
      "commune_name_ascii": "El Houamed",
      "commune_name": "الحوامد",
      "daira_name_ascii": "Khoubana",
      "daira_name": "خبانة",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1013": {
      "id": 1013,
      "commune_name_ascii": "Hammam Dalaa",
      "commune_name": "حمام الضلعة",
      "daira_name_ascii": "Hammam Dalaa",
      "daira_name": "حمام الضلعة",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1014": {
      "id": 1014,
      "commune_name_ascii": "Khettouti Sed-El-Jir",
      "commune_name": "خطوطي سد الجير",
      "daira_name_ascii": "Chellal",
      "daira_name": "شلال",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1015": {
      "id": 1015,
      "commune_name_ascii": "Khoubana",
      "commune_name": "خبانة",
      "daira_name_ascii": "Khoubana",
      "daira_name": "خبانة",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1016": {
      "id": 1016,
      "commune_name_ascii": "Maadid",
      "commune_name": "المعاضيد",
      "daira_name_ascii": "Ouled Derradj",
      "daira_name": "أولاد دراج",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1017": {
      "id": 1017,
      "commune_name_ascii": "Maarif",
      "commune_name": "معاريف",
      "daira_name_ascii": "Chellal",
      "daira_name": "شلال",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1018": {
      "id": 1018,
      "commune_name_ascii": "Magra",
      "commune_name": "مقرة",
      "daira_name_ascii": "Magra",
      "daira_name": "مقرة",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1019": {
      "id": 1019,
      "commune_name_ascii": "M'cif",
      "commune_name": "مسيف",
      "daira_name_ascii": "Khoubana",
      "daira_name": "خبانة",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1020": {
      "id": 1020,
      "commune_name_ascii": "Medjedel",
      "commune_name": "امجدل",
      "daira_name_ascii": "Medjedel",
      "daira_name": "امجدل",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1021": {
      "id": 1021,
      "commune_name_ascii": "Menaa",
      "commune_name": "مناعة",
      "daira_name_ascii": "Medjedel",
      "daira_name": "امجدل",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1022": {
      "id": 1022,
      "commune_name_ascii": "Mohamed Boudiaf",
      "commune_name": "محمد بوضياف",
      "daira_name_ascii": "Ben Srour",
      "daira_name": "بن سرور",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1023": {
      "id": 1023,
      "commune_name_ascii": "M'sila",
      "commune_name": "المسيلة",
      "daira_name_ascii": "M'sila",
      "daira_name": "المسيلة",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": [
        {
          "center_id": 282802,
          "name": "Agence Salem Shopping Mall Yalidine",
          "address": "Salem Shopping Mall, centre commercial (en face la daïra)",
          "gps": "35.711826195939764,4.533467813415232",
          "commune_id": 2828,
          "commune_name": "M'Sila",
          "wilaya_id": 28,
          "wilaya_name": "M'Sila"
        }
      ]
    },
    "1024": {
      "id": 1024,
      "commune_name_ascii": "M'tarfa",
      "commune_name": "المطارفة",
      "daira_name_ascii": "Ouled Derradj",
      "daira_name": "أولاد دراج",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1025": {
      "id": 1025,
      "commune_name_ascii": "Ouanougha",
      "commune_name": "ونوغة",
      "daira_name_ascii": "Hammam Dalaa",
      "daira_name": "حمام الضلعة",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1026": {
      "id": 1026,
      "commune_name_ascii": "Ouled Addi Guebala",
      "commune_name": "أولاد عدي لقبالة",
      "daira_name_ascii": "Ouled Derradj",
      "daira_name": "أولاد دراج",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1027": {
      "id": 1027,
      "commune_name_ascii": "Ouled Derradj",
      "commune_name": "أولاد دراج",
      "daira_name_ascii": "Ouled Derradj",
      "daira_name": "أولاد دراج",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1028": {
      "id": 1028,
      "commune_name_ascii": "Ouled Madhi",
      "commune_name": "أولاد ماضي",
      "daira_name_ascii": "Chellal",
      "daira_name": "شلال",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1029": {
      "id": 1029,
      "commune_name_ascii": "Ouled Mansour",
      "commune_name": "أولاد منصور",
      "daira_name_ascii": "Hammam Dalaa",
      "daira_name": "حمام الضلعة",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1030": {
      "id": 1030,
      "commune_name_ascii": "Ouled Sidi Brahim",
      "commune_name": "أولاد سيدي ابراهيم",
      "daira_name_ascii": "Ouled Sidi Brahim",
      "daira_name": "أولاد سيدي ابراهيم",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1031": {
      "id": 1031,
      "commune_name_ascii": "Ouled Slimane",
      "commune_name": "أولاد سليمان",
      "daira_name_ascii": "Ben Srour",
      "daira_name": "بن سرور",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1032": {
      "id": 1032,
      "commune_name_ascii": "Oulteme",
      "commune_name": "ولتام",
      "daira_name_ascii": "Bousaada",
      "daira_name": "بوسعادة",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1033": {
      "id": 1033,
      "commune_name_ascii": "Sidi Aissa",
      "commune_name": "سيدي عيسى",
      "daira_name_ascii": "Sidi Aissa",
      "daira_name": "سيدي عيسى",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": [
        {
          "center_id": 283901,
          "name": "Agence Sidi Aîssa Guepex",
          "address": "بلدية سيدي عيسى E03 محل 07 حي الوئام المدني مجموعة ملكية 05 قسم 46 عمارة",
          "gps": "35.872334331109606,3.7830036541912944",
          "commune_id": 2839,
          "commune_name": "Sidi Aïssa",
          "wilaya_id": 28,
          "wilaya_name": "M'Sila"
        }
      ]
    },
    "1034": {
      "id": 1034,
      "commune_name_ascii": "Sidi Ameur",
      "commune_name": "سيدي عامر",
      "daira_name_ascii": "Sidi Ameur",
      "daira_name": "سيدي عامر",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1035": {
      "id": 1035,
      "commune_name_ascii": "Sidi Hadjeres",
      "commune_name": "سيدي هجرس",
      "daira_name_ascii": "Ain El Hadjel",
      "daira_name": "عين الحجل",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1036": {
      "id": 1036,
      "commune_name_ascii": "Sidi M'hamed",
      "commune_name": "سيدي امحمد",
      "daira_name_ascii": "Ain El Melh",
      "daira_name": "عين الملح",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1037": {
      "id": 1037,
      "commune_name_ascii": "Slim",
      "commune_name": "سليم",
      "daira_name_ascii": "Djebel Messaad",
      "daira_name": "جبل مساعد",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1038": {
      "id": 1038,
      "commune_name_ascii": "Souamaa",
      "commune_name": "السوامع",
      "daira_name_ascii": "Ouled Derradj",
      "daira_name": "أولاد دراج",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1039": {
      "id": 1039,
      "commune_name_ascii": "Tamsa",
      "commune_name": "تامسة",
      "daira_name_ascii": "Sidi Ameur",
      "daira_name": "سيدي عامر",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1040": {
      "id": 1040,
      "commune_name_ascii": "Tarmount",
      "commune_name": "تارمونت",
      "daira_name_ascii": "Hammam Dalaa",
      "daira_name": "حمام الضلعة",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1041": {
      "id": 1041,
      "commune_name_ascii": "Zarzour",
      "commune_name": "زرزور",
      "daira_name_ascii": "Ben Srour",
      "daira_name": "بن سرور",
      "wilaya_code": "28",
      "wilaya_name_ascii": "M'Sila",
      "wilaya_name": "المسيلة",
      "centers": []
    },
    "1042": {
      "id": 1042,
      "commune_name_ascii": "Ain Fares",
      "commune_name": "عين فارس",
      "daira_name_ascii": "Ain Fares",
      "daira_name": "عين فارس",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1043": {
      "id": 1043,
      "commune_name_ascii": "Ain Fekan",
      "commune_name": "عين فكان",
      "daira_name_ascii": "Ain Fekan",
      "daira_name": "عين فكان",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1044": {
      "id": 1044,
      "commune_name_ascii": "Ain Ferah",
      "commune_name": "عين فراح",
      "daira_name_ascii": "Oued El Abtal",
      "daira_name": "وادي الأبطال",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1045": {
      "id": 1045,
      "commune_name_ascii": "Ain Frass",
      "commune_name": "عين أفرص",
      "daira_name_ascii": "Ain Fekan",
      "daira_name": "عين فكان",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1046": {
      "id": 1046,
      "commune_name_ascii": "Alaimia",
      "commune_name": "العلايمية",
      "daira_name_ascii": "Oggaz",
      "daira_name": "عقاز",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1047": {
      "id": 1047,
      "commune_name_ascii": "Aouf",
      "commune_name": "عوف",
      "daira_name_ascii": "Aouf",
      "daira_name": "عوف",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1048": {
      "id": 1048,
      "commune_name_ascii": "Benian",
      "commune_name": "بنيان",
      "daira_name_ascii": "Aouf",
      "daira_name": "عوف",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": [
        
      ]
    },
    "1049": {
      "id": 1049,
      "commune_name_ascii": "Bou Henni",
      "commune_name": "بوهني",
      "daira_name_ascii": "Sig",
      "daira_name": "سيق",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1050": {
      "id": 1050,
      "commune_name_ascii": "Bouhanifia",
      "commune_name": "بوحنيفية",
      "daira_name_ascii": "Bouhanifia",
      "daira_name": "بوحنيفية",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1051": {
      "id": 1051,
      "commune_name_ascii": "Chorfa",
      "commune_name": "الشرفاء",
      "daira_name_ascii": "Sig",
      "daira_name": "سيق",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1052": {
      "id": 1052,
      "commune_name_ascii": "El Bordj",
      "commune_name": "البرج",
      "daira_name_ascii": "El Bordj",
      "daira_name": "البرج",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1053": {
      "id": 1053,
      "commune_name_ascii": "El Gaada",
      "commune_name": "القعدة",
      "daira_name_ascii": "Zahana",
      "daira_name": "زهانة",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1054": {
      "id": 1054,
      "commune_name_ascii": "El Ghomri",
      "commune_name": "الغمري",
      "daira_name_ascii": "Mohammadia",
      "daira_name": "المحمدية",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1055": {
      "id": 1055,
      "commune_name_ascii": "El Gueitena",
      "commune_name": "القطنة",
      "daira_name_ascii": "Bouhanifia",
      "daira_name": "بوحنيفية",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1056": {
      "id": 1056,
      "commune_name_ascii": "El Hachem",
      "commune_name": "الحشم",
      "daira_name_ascii": "Hachem",
      "daira_name": "الحشم",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1057": {
      "id": 1057,
      "commune_name_ascii": "El Keurt",
      "commune_name": "القرط",
      "daira_name_ascii": "Tizi",
      "daira_name": "تيزي",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1058": {
      "id": 1058,
      "commune_name_ascii": "El Mamounia",
      "commune_name": "المأمونية",
      "daira_name_ascii": "Ain Fares",
      "daira_name": "عين فارس",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1059": {
      "id": 1059,
      "commune_name_ascii": "El Menaouer",
      "commune_name": "المنور",
      "daira_name_ascii": "El Bordj",
      "daira_name": "البرج",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1060": {
      "id": 1060,
      "commune_name_ascii": "Ferraguig",
      "commune_name": "فراقيق",
      "daira_name_ascii": "Mohammadia",
      "daira_name": "المحمدية",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1061": {
      "id": 1061,
      "commune_name_ascii": "Froha",
      "commune_name": "فروحة",
      "daira_name_ascii": "Tizi",
      "daira_name": "تيزي",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1062": {
      "id": 1062,
      "commune_name_ascii": "Gharrous",
      "commune_name": "غروس",
      "daira_name_ascii": "Aouf",
      "daira_name": "عوف",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1063": {
      "id": 1063,
      "commune_name_ascii": "Ghriss",
      "commune_name": "غريس",
      "daira_name_ascii": "Ghriss",
      "daira_name": "غريس",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1064": {
      "id": 1064,
      "commune_name_ascii": "Guerdjoum",
      "commune_name": "قرجوم",
      "daira_name_ascii": "Oued Taria",
      "daira_name": "وادي التاغية",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1065": {
      "id": 1065,
      "commune_name_ascii": "Hacine",
      "commune_name": "حسين",
      "daira_name_ascii": "Bouhanifia",
      "daira_name": "بوحنيفية",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1066": {
      "id": 1066,
      "commune_name_ascii": "Khalouia",
      "commune_name": "خلوية",
      "daira_name_ascii": "El Bordj",
      "daira_name": "البرج",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1067": {
      "id": 1067,
      "commune_name_ascii": "Makhda",
      "commune_name": "ماقضة",
      "daira_name_ascii": "Ghriss",
      "daira_name": "غريس",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1068": {
      "id": 1068,
      "commune_name_ascii": "Maoussa",
      "commune_name": "ماوسة",
      "daira_name_ascii": "Ghriss",
      "daira_name": "غريس",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1069": {
      "id": 1069,
      "commune_name_ascii": "Mascara",
      "commune_name": "معسكر",
      "daira_name_ascii": "Mascara",
      "daira_name": "معسكر",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": [
        {
          "center_id": 292801,
          "name": "Agence de Mascara [Yalidine]",
          "address": "Rue Hamdani Adda  Rue Khasibiya No. 9, Magasin 1 Et 2",
          "gps": "35.388937086543486,0.12859032938468315",
          "commune_id": 2928,
          "commune_name": "Mascara",
          "wilaya_id": 29,
          "wilaya_name": "Mascara"
        }
      ]
    },
    "1070": {
      "id": 1070,
      "commune_name_ascii": "Matemore",
      "commune_name": "المطمور",
      "daira_name_ascii": "Ghriss",
      "daira_name": "غريس",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1071": {
      "id": 1071,
      "commune_name_ascii": "Mocta-Douz",
      "commune_name": "مقطع الدوز",
      "daira_name_ascii": "Mohammadia",
      "daira_name": "المحمدية",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1072": {
      "id": 1072,
      "commune_name_ascii": "Mohammadia",
      "commune_name": "المحمدية",
      "daira_name_ascii": "Mohammadia",
      "daira_name": "المحمدية",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1073": {
      "id": 1073,
      "commune_name_ascii": "Nesmot",
      "commune_name": "نسمط",
      "daira_name_ascii": "Hachem",
      "daira_name": "الحشم",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1074": {
      "id": 1074,
      "commune_name_ascii": "Oggaz",
      "commune_name": "عقاز",
      "daira_name_ascii": "Oggaz",
      "daira_name": "عقاز",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1075": {
      "id": 1075,
      "commune_name_ascii": "Oued El Abtal",
      "commune_name": "وادي الأبطال",
      "daira_name_ascii": "Oued El Abtal",
      "daira_name": "وادي الأبطال",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1076": {
      "id": 1076,
      "commune_name_ascii": "Oued Taria",
      "commune_name": "وادي التاغية",
      "daira_name_ascii": "Oued Taria",
      "daira_name": "وادي التاغية",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1077": {
      "id": 1077,
      "commune_name_ascii": "Ras El Ain Amirouche",
      "commune_name": "رأس عين عميروش",
      "daira_name_ascii": "Oggaz",
      "daira_name": "عقاز",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1078": {
      "id": 1078,
      "commune_name_ascii": "Sedjerara",
      "commune_name": "سجرارة",
      "daira_name_ascii": "Mohammadia",
      "daira_name": "المحمدية",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1079": {
      "id": 1079,
      "commune_name_ascii": "Sehailia",
      "commune_name": "السهايلية",
      "daira_name_ascii": "Tighennif",
      "daira_name": "تيغنيف",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1080": {
      "id": 1080,
      "commune_name_ascii": "Sidi Abdeldjebar",
      "commune_name": "سيدي عبد الجبار",
      "daira_name_ascii": "Oued El Abtal",
      "daira_name": "وادي الأبطال",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1081": {
      "id": 1081,
      "commune_name_ascii": "Sidi Abdelmoumene",
      "commune_name": "سيدي عبد المومن",
      "daira_name_ascii": "Mohammadia",
      "daira_name": "المحمدية",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1082": {
      "id": 1082,
      "commune_name_ascii": "Sidi Boussaid",
      "commune_name": "سيدي بوسعيد",
      "daira_name_ascii": "Ghriss",
      "daira_name": "غريس",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1083": {
      "id": 1083,
      "commune_name_ascii": "Sidi Kada",
      "commune_name": "سيدي قادة",
      "daira_name_ascii": "Tighennif",
      "daira_name": "تيغنيف",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1084": {
      "id": 1084,
      "commune_name_ascii": "Sig",
      "commune_name": "سيق",
      "daira_name_ascii": "Sig",
      "daira_name": "سيق",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1085": {
      "id": 1085,
      "commune_name_ascii": "Tighennif",
      "commune_name": "تيغنيف",
      "daira_name_ascii": "Tighennif",
      "daira_name": "تيغنيف",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1086": {
      "id": 1086,
      "commune_name_ascii": "Tizi",
      "commune_name": "تيزي",
      "daira_name_ascii": "Tizi",
      "daira_name": "تيزي",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1087": {
      "id": 1087,
      "commune_name_ascii": "Zahana",
      "commune_name": "زهانة",
      "daira_name_ascii": "Zahana",
      "daira_name": "زهانة",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1088": {
      "id": 1088,
      "commune_name_ascii": "Zelamta",
      "commune_name": "زلامطة",
      "daira_name_ascii": "Hachem",
      "daira_name": "الحشم",
      "wilaya_code": "29",
      "wilaya_name_ascii": "Mascara",
      "wilaya_name": "معسكر",
      "centers": []
    },
    "1089": {
      "id": 1089,
      "commune_name_ascii": "Ain Beida",
      "commune_name": "عين البيضاء",
      "daira_name_ascii": "Sidi Khouiled",
      "daira_name": "سيدي خويلد",
      "wilaya_code": "30",
      "wilaya_name_ascii": "Ouargla",
      "wilaya_name": "ورقلة",
      "centers": []
    },
    "1090": {
      "id": 1090,
      "commune_name_ascii": "Benaceur",
      "commune_name": "بن ناصر",
      "daira_name_ascii": "Taibet",
      "daira_name": "الطيبات",
      "wilaya_code": "55",
      "wilaya_name_ascii": "Touggourt",
      "wilaya_name": "تقرت",
      "centers": []
    },
    "1091": {
      "id": 1091,
      "commune_name_ascii": "Blidet Amor",
      "commune_name": "بلدة اعمر",
      "daira_name_ascii": "Temacine",
      "daira_name": "تماسين",
      "wilaya_code": "55",
      "wilaya_name_ascii": "Touggourt",
      "wilaya_name": "تقرت",
      "centers": []
    },
    "1092": {
      "id": 1092,
      "commune_name_ascii": "El Alia",
      "commune_name": "العالية",
      "daira_name_ascii": "El-Hadjira",
      "daira_name": "الحجيرة",
      "wilaya_code": "55",
      "wilaya_name_ascii": "Touggourt",
      "wilaya_name": "تقرت",
      "centers": []
    },
    "1093": {
      "id": 1093,
      "commune_name_ascii": "El Borma",
      "commune_name": "البرمة",
      "daira_name_ascii": "El Borma",
      "daira_name": "البرمة",
      "wilaya_code": "30",
      "wilaya_name_ascii": "Ouargla",
      "wilaya_name": "ورقلة",
      "centers": []
    },
    "1094": {
      "id": 1094,
      "commune_name_ascii": "El-Hadjira",
      "commune_name": "الحجيرة",
      "daira_name_ascii": "El-Hadjira",
      "daira_name": "الحجيرة",
      "wilaya_code": "55",
      "wilaya_name_ascii": "Touggourt",
      "wilaya_name": "تقرت",
      "centers": []
    },
    "1095": {
      "id": 1095,
      "commune_name_ascii": "Hassi Ben Abdellah",
      "commune_name": "حاسي بن عبد الله",
      "daira_name_ascii": "Sidi Khouiled",
      "daira_name": "سيدي خويلد",
      "wilaya_code": "30",
      "wilaya_name_ascii": "Ouargla",
      "wilaya_name": "ورقلة",
      "centers": []
    },
    "1096": {
      "id": 1096,
      "commune_name_ascii": "Hassi Messaoud",
      "commune_name": "حاسي مسعود",
      "daira_name_ascii": "Hassi Messaoud",
      "daira_name": "حاسي مسعود",
      "wilaya_code": "30",
      "wilaya_name_ascii": "Ouargla",
      "wilaya_name": "ورقلة",
      "centers": [
        {
          "center_id": 300801,
          "name": "Agence de Hassi Messaoud [Yalidine]",
          "address": "Derrière la CNAS, à coté de la clinique Ibn Sina",
          "gps": "31.688989360431812, 6.068568678310962",
          "commune_id": 3008,
          "commune_name": "Hassi Messaoud",
          "wilaya_id": 30,
          "wilaya_name": "Ouargla"
        }
      ]
    },
    "1097": {
      "id": 1097,
      "commune_name_ascii": "Megarine",
      "commune_name": "المقارين",
      "daira_name_ascii": "Megarine",
      "daira_name": "المقارين",
      "wilaya_code": "55",
      "wilaya_name_ascii": "Touggourt",
      "wilaya_name": "تقرت",
      "centers": []
    },
    "1098": {
      "id": 1098,
      "commune_name_ascii": "M'naguer",
      "commune_name": "المنقر",
      "daira_name_ascii": "Taibet",
      "daira_name": "الطيبات",
      "wilaya_code": "55",
      "wilaya_name_ascii": "Touggourt",
      "wilaya_name": "تقرت",
      "centers": []
    },
    "1099": {
      "id": 1099,
      "commune_name_ascii": "Nezla",
      "commune_name": "النزلة",
      "daira_name_ascii": "Touggourt",
      "daira_name": "تقرت",
      "wilaya_code": "55",
      "wilaya_name_ascii": "Touggourt",
      "wilaya_name": "تقرت",
      "centers": []
    },
    "1100": {
      "id": 1100,
      "commune_name_ascii": "N'goussa",
      "commune_name": "انقوسة",
      "daira_name_ascii": "N'goussa",
      "daira_name": "انقوسة",
      "wilaya_code": "30",
      "wilaya_name_ascii": "Ouargla",
      "wilaya_name": "ورقلة",
      "centers": []
    },
    "1101": {
      "id": 1101,
      "commune_name_ascii": "Ouargla",
      "commune_name": "ورقلة",
      "daira_name_ascii": "Ouargla",
      "daira_name": "ورقلة",
      "wilaya_code": "30",
      "wilaya_name_ascii": "Ouargla",
      "wilaya_name": "ورقلة",
      "centers": [
        {
          "center_id": 301301,
          "name": "Agence de Ouargla (Dar el moualim)[Guepex]",
          "address": "Rue Lahreche Bachir (en face Dr. Abdelkader Beddiaf et la pharmacie Hakoum)",
          "gps": "31.945900615685254,5.315087870212104",
          "commune_id": 3013,
          "commune_name": "Ouargla",
          "wilaya_id": 30,
          "wilaya_name": "Ouargla"
        },
        {
          "center_id": 301302,
          "name": "Agence de Ouargla (Chetti el wekal) [Yalidine]",
          "address": "Ave 1er novembre 1954, El Mkhadma, (Arrêt de tram Chatte El Wakla)",
          "gps": "31.942699293799976,5.312770721210608",
          "commune_id": 3013,
          "commune_name": "Ouargla",
          "wilaya_id": 30,
          "wilaya_name": "Ouargla"
        }
      ]
    },
    "1102": {
      "id": 1102,
      "commune_name_ascii": "Rouissat",
      "commune_name": "الرويسات",
      "daira_name_ascii": "Ouargla",
      "daira_name": "ورقلة",
      "wilaya_code": "30",
      "wilaya_name_ascii": "Ouargla",
      "wilaya_name": "ورقلة",
      "centers": []
    },
    "1103": {
      "id": 1103,
      "commune_name_ascii": "Sidi Khouiled",
      "commune_name": "سيدي خويلد",
      "daira_name_ascii": "Sidi Khouiled",
      "daira_name": "سيدي خويلد",
      "wilaya_code": "30",
      "wilaya_name_ascii": "Ouargla",
      "wilaya_name": "ورقلة",
      "centers": []
    },
    "1104": {
      "id": 1104,
      "commune_name_ascii": "Sidi Slimane",
      "commune_name": "سيدي سليمان",
      "daira_name_ascii": "Megarine",
      "daira_name": "المقارين",
      "wilaya_code": "55",
      "wilaya_name_ascii": "Touggourt",
      "wilaya_name": "تقرت",
      "centers": []
    },
    "1105": {
      "id": 1105,
      "commune_name_ascii": "Taibet",
      "commune_name": "الطيبات",
      "daira_name_ascii": "Taibet",
      "daira_name": "الطيبات",
      "wilaya_code": "55",
      "wilaya_name_ascii": "Touggourt",
      "wilaya_name": "تقرت",
      "centers": []
    },
    "1106": {
      "id": 1106,
      "commune_name_ascii": "Tebesbest",
      "commune_name": "تبسبست",
      "daira_name_ascii": "Touggourt",
      "daira_name": "تقرت",
      "wilaya_code": "55",
      "wilaya_name_ascii": "Touggourt",
      "wilaya_name": "تقرت",
      "centers": []
    },
    "1107": {
      "id": 1107,
      "commune_name_ascii": "Temacine",
      "commune_name": "تماسين",
      "daira_name_ascii": "Temacine",
      "daira_name": "تماسين",
      "wilaya_code": "55",
      "wilaya_name_ascii": "Touggourt",
      "wilaya_name": "تقرت",
      "centers": []
    },
    "1108": {
      "id": 1108,
      "commune_name_ascii": "Touggourt",
      "commune_name": "تقرت",
      "daira_name_ascii": "Touggourt",
      "daira_name": "تقرت",
      "wilaya_code": "55",
      "wilaya_name_ascii": "Touggourt",
      "wilaya_name": "تقرت",
      "centers": [
        {
          "center_id": 552001,
          "name": "Agence de Touggourt [Yalidine]",
          "address": "Cite Rimal 01 (A Cote De La Pharmacie Harkati Route Nationale N°03)",
          "gps": "33.10026087453198,6.052441603706706",
          "commune_id": 5520,
          "commune_name": "Touggourt",
          "wilaya_id": 55,
          "wilaya_name": "Touggourt"
        }
      ]
    },
    "1109": {
      "id": 1109,
      "commune_name_ascii": "Zaouia El Abidia",
      "commune_name": "الزاوية العابدية",
      "daira_name_ascii": "Touggourt",
      "daira_name": "تقرت",
      "wilaya_code": "55",
      "wilaya_name_ascii": "Touggourt",
      "wilaya_name": "تقرت",
      "centers": []
    },
    "1110": {
      "id": 1110,
      "commune_name_ascii": "Ain Biya",
      "commune_name": "عين البية",
      "daira_name_ascii": "Bethioua",
      "daira_name": "بطيوة",
      "wilaya_code": "31",
      "wilaya_name_ascii": "Oran",
      "wilaya_name": "وهران",
      "centers": []
    },
    "1111": {
      "id": 1111,
      "commune_name_ascii": "Ain Kerma",
      "commune_name": "عين الكرمة",
      "daira_name_ascii": "Boutlelis",
      "daira_name": "بوتليليس",
      "wilaya_code": "31",
      "wilaya_name_ascii": "Oran",
      "wilaya_name": "وهران",
      "centers": []
    },
    "1112": {
      "id": 1112,
      "commune_name_ascii": "Ain Turk",
      "commune_name": "عين الترك",
      "daira_name_ascii": "Ain Turk",
      "daira_name": "عين الترك",
      "wilaya_code": "31",
      "wilaya_name_ascii": "Oran",
      "wilaya_name": "وهران",
      "centers": []
    },
    "1113": {
      "id": 1113,
      "commune_name_ascii": "Arzew",
      "commune_name": "أرزيو",
      "daira_name_ascii": "Arzew",
      "daira_name": "أرزيو",
      "wilaya_code": "31",
      "wilaya_name_ascii": "Oran",
      "wilaya_name": "وهران",
      "centers": [
        {
          "center_id": 310601,
          "name": "Agence de Arzew [Guepex]",
          "address": " 17 Lotissement N 66 Plan Lot 167",
          "gps": "35.84733672313886,-0.31784657704458",
          "commune_id": 3106,
          "commune_name": "Arzew",
          "wilaya_id": 31,
          "wilaya_name": "Oran"
        }
      ]
    },
    "1114": {
      "id": 1114,
      "commune_name_ascii": "Ben Freha",
      "commune_name": "بن فريحة",
      "daira_name_ascii": "Gdyel",
      "daira_name": "قديل",
      "wilaya_code": "31",
      "wilaya_name_ascii": "Oran",
      "wilaya_name": "وهران",
      "centers": []
    },
    "1115": {
      "id": 1115,
      "commune_name_ascii": "Bethioua",
      "commune_name": "بطيوة",
      "daira_name_ascii": "Bethioua",
      "daira_name": "بطيوة",
      "wilaya_code": "31",
      "wilaya_name_ascii": "Oran",
      "wilaya_name": "وهران",
      "centers": []
    },
    "1116": {
      "id": 1116,
      "commune_name_ascii": "Bir El Djir",
      "commune_name": "بئر الجير",
      "daira_name_ascii": "Bir El Djir",
      "daira_name": "بئر الجير",
      "wilaya_code": "31",
      "wilaya_name_ascii": "Oran",
      "wilaya_name": "وهران",
      "centers": [
        {
          "center_id": 310301,
          "name": "El Morchid [Yalidine]",
          "address": "Cooperative Immobiliere Dar El Amel N°68",
          "gps": "35.710492588656976,-0.5869307488573879",
          "commune_id": 3103,
          "commune_name": "Bir El Djir",
          "wilaya_id": 31,
          "wilaya_name": "Oran"
        },
        {
          "center_id": 310302,
          "name": "Agence Fernand Ville [Yalidine]",
          "address": "65 Rue 1er Novembre Hai Khemisti ,part 4 (Mosquée el kods)",
          "gps": "35.730398307760176, -0.5790437244693557",
          "commune_id": 3103,
          "commune_name": "Bir El Djir",
          "wilaya_id": 31,
          "wilaya_name": "Oran"
        }
      ]
    },
    "1117": {
      "id": 1117,
      "commune_name_ascii": "Boufatis",
      "commune_name": "بوفاتيس",
      "daira_name_ascii": "Oued Tlelat",
      "daira_name": "وادي تليلات",
      "wilaya_code": "31",
      "wilaya_name_ascii": "Oran",
      "wilaya_name": "وهران",
      "centers": []
    },
    "1118": {
      "id": 1118,
      "commune_name_ascii": "Bousfer",
      "commune_name": "بوسفر",
      "daira_name_ascii": "Ain Turk",
      "daira_name": "عين الترك",
      "wilaya_code": "31",
      "wilaya_name_ascii": "Oran",
      "wilaya_name": "وهران",
      "centers": []
    },
    "1119": {
      "id": 1119,
      "commune_name_ascii": "Boutlelis",
      "commune_name": "بوتليليس",
      "daira_name_ascii": "Boutlelis",
      "daira_name": "بوتليليس",
      "wilaya_code": "31",
      "wilaya_name_ascii": "Oran",
      "wilaya_name": "وهران",
      "centers": []
    },
    "1120": {
      "id": 1120,
      "commune_name_ascii": "El Ancor",
      "commune_name": "العنصر",
      "daira_name_ascii": "Ain Turk",
      "daira_name": "عين الترك",
      "wilaya_code": "31",
      "wilaya_name_ascii": "Oran",
      "wilaya_name": "وهران",
      "centers": []
    },
    "1121": {
      "id": 1121,
      "commune_name_ascii": "El Braya",
      "commune_name": "البراية",
      "daira_name_ascii": "Oued Tlelat",
      "daira_name": "وادي تليلات",
      "wilaya_code": "31",
      "wilaya_name_ascii": "Oran",
      "wilaya_name": "وهران",
      "centers": []
    },
    "1122": {
      "id": 1122,
      "commune_name_ascii": "El Kerma",
      "commune_name": "الكرمة",
      "daira_name_ascii": "Es Senia",
      "daira_name": "السانية",
      "wilaya_code": "31",
      "wilaya_name_ascii": "Oran",
      "wilaya_name": "وهران",
      "centers": []
    },
    "1123": {
      "id": 1123,
      "commune_name_ascii": "Es Senia",
      "commune_name": "السانية",
      "daira_name_ascii": "Es Senia",
      "daira_name": "السانية",
      "wilaya_code": "31",
      "wilaya_name_ascii": "Oran",
      "wilaya_name": "وهران",
      "centers": []
    },
    "1124": {
      "id": 1124,
      "commune_name_ascii": "Gdyel",
      "commune_name": "قديل",
      "daira_name_ascii": "Gdyel",
      "daira_name": "قديل",
      "wilaya_code": "31",
      "wilaya_name_ascii": "Oran",
      "wilaya_name": "وهران",
      "centers": []
    },
    "1125": {
      "id": 1125,
      "commune_name_ascii": "Hassi Ben Okba",
      "commune_name": "حاسي بن عقبة",
      "daira_name_ascii": "Bir El Djir",
      "daira_name": "بئر الجير",
      "wilaya_code": "31",
      "wilaya_name_ascii": "Oran",
      "wilaya_name": "وهران",
      "centers": []
    },
    "1126": {
      "id": 1126,
      "commune_name_ascii": "Hassi Bounif",
      "commune_name": "حاسي بونيف",
      "daira_name_ascii": "Bir El Djir",
      "daira_name": "بئر الجير",
      "wilaya_code": "31",
      "wilaya_name_ascii": "Oran",
      "wilaya_name": "وهران",
      "centers": []
    },
    "1127": {
      "id": 1127,
      "commune_name_ascii": "Hassi Mefsoukh",
      "commune_name": "حاسي مفسوخ",
      "daira_name_ascii": "Gdyel",
      "daira_name": "قديل",
      "wilaya_code": "31",
      "wilaya_name_ascii": "Oran",
      "wilaya_name": "وهران",
      "centers": []
    },
    "1128": {
      "id": 1128,
      "commune_name_ascii": "Marsat El Hadjadj",
      "commune_name": "مرسى الحجاج",
      "daira_name_ascii": "Bethioua",
      "daira_name": "بطيوة",
      "wilaya_code": "31",
      "wilaya_name_ascii": "Oran",
      "wilaya_name": "وهران",
      "centers": []
    },
    "1129": {
      "id": 1129,
      "commune_name_ascii": "Mers El Kebir",
      "commune_name": "المرسى الكبير",
      "daira_name_ascii": "Ain Turk",
      "daira_name": "عين الترك",
      "wilaya_code": "31",
      "wilaya_name_ascii": "Oran",
      "wilaya_name": "وهران",
      "centers": []
    },
    "1130": {
      "id": 1130,
      "commune_name_ascii": "Messerghin",
      "commune_name": "مسرغين",
      "daira_name_ascii": "Boutlelis",
      "daira_name": "بوتليليس",
      "wilaya_code": "31",
      "wilaya_name_ascii": "Oran",
      "wilaya_name": "وهران",
      "centers": []
    },
    "1131": {
      "id": 1131,
      "commune_name_ascii": "Oran",
      "commune_name": "وهران",
      "daira_name_ascii": "Oran",
      "daira_name": "وهران",
      "wilaya_code": "31",
      "wilaya_name_ascii": "Oran",
      "wilaya_name": "وهران",
      "centers": [
        {
          "center_id": 310101,
          "name": "Saint Hubert [Yalidine]",
          "address": "Rue de l'ANP Projet rue 153 GV 50-89 part 2 et 3 (Entre CPA ET CASNOS)",
          "gps": "35.67576049674193, -0.6399573752101966",
          "commune_id": 3101,
          "commune_name": "Oran",
          "wilaya_id": 31,
          "wilaya_name": "Oran"
        },
        {
          "center_id": 310102,
          "name": "Cité Djamel [Guepex]",
          "address": "Rond-point cité Djamel (en allant vers Hai Sabah)",
          "gps": "35.69672884038709, -0.6024611501953713",
          "commune_id": 3101,
          "commune_name": "Oran",
          "wilaya_id": 31,
          "wilaya_name": "Oran"
        },
        {
          "center_id": 310103,
          "name": "Agence de Gambetta [Zimou-Express]",
          "address": "54 avenue d'arcole, Bouguerri Khelifa, Gambetta",
          "gps": "35.70584160555386, -0.6116408828756563",
          "commune_id": 3101,
          "commune_name": "Oran",
          "wilaya_id": 31,
          "wilaya_name": "Oran"
        },
        {
          "center_id": 310104,
          "name": "Agence Canastel [speedmail]",
          "address": "25, Rue Akid Lotfi Local N° 02",
          "gps": "35.7453859649244,-0.5692101104496627",
          "commune_id": 3101,
          "commune_name": "Oran",
          "wilaya_id": 31,
          "wilaya_name": "Oran"
        }
      ]
    },
    "1132": {
      "id": 1132,
      "commune_name_ascii": "Oued Tlelat",
      "commune_name": "وادي تليلات",
      "daira_name_ascii": "Oued Tlelat",
      "daira_name": "وادي تليلات",
      "wilaya_code": "31",
      "wilaya_name_ascii": "Oran",
      "wilaya_name": "وهران",
      "centers": []
    },
    "1133": {
      "id": 1133,
      "commune_name_ascii": "Sidi Ben Yebka",
      "commune_name": "سيدي بن يبقى",
      "daira_name_ascii": "Arzew",
      "daira_name": "أرزيو",
      "wilaya_code": "31",
      "wilaya_name_ascii": "Oran",
      "wilaya_name": "وهران",
      "centers": []
    },
    "1134": {
      "id": 1134,
      "commune_name_ascii": "Sidi Chami",
      "commune_name": "سيدي الشحمي",
      "daira_name_ascii": "Es Senia",
      "daira_name": "السانية",
      "wilaya_code": "31",
      "wilaya_name_ascii": "Oran",
      "wilaya_name": "وهران",
      "centers": []
    },
    "1135": {
      "id": 1135,
      "commune_name_ascii": "Tafraoui",
      "commune_name": "طفراوي",
      "daira_name_ascii": "Oued Tlelat",
      "daira_name": "وادي تليلات",
      "wilaya_code": "31",
      "wilaya_name_ascii": "Oran",
      "wilaya_name": "وهران",
      "centers": []
    },
    "1136": {
      "id": 1136,
      "commune_name_ascii": "Ain El Orak",
      "commune_name": "عين العراك",
      "daira_name_ascii": "Labiodh Sidi Cheikh",
      "daira_name": "الأبيض سيدي الشيخ",
      "wilaya_code": "32",
      "wilaya_name_ascii": "El Bayadh",
      "wilaya_name": "البيض",
      "centers": []
    },
    "1137": {
      "id": 1137,
      "commune_name_ascii": "Arbaouat",
      "commune_name": "اربوات",
      "daira_name_ascii": "Labiodh Sidi Cheikh",
      "daira_name": "الأبيض سيدي الشيخ",
      "wilaya_code": "32",
      "wilaya_name_ascii": "El Bayadh",
      "wilaya_name": "البيض",
      "centers": []
    },
    "1138": {
      "id": 1138,
      "commune_name_ascii": "Boualem",
      "commune_name": "بوعلام",
      "daira_name_ascii": "Boualem",
      "daira_name": "بوعلام",
      "wilaya_code": "32",
      "wilaya_name_ascii": "El Bayadh",
      "wilaya_name": "البيض",
      "centers": []
    },
    "1139": {
      "id": 1139,
      "commune_name_ascii": "Bougtoub",
      "commune_name": "بوقطب",
      "daira_name_ascii": "Bougtoub",
      "daira_name": "بوقطب",
      "wilaya_code": "32",
      "wilaya_name_ascii": "El Bayadh",
      "wilaya_name": "البيض",
      "centers": []
    },
    "1140": {
      "id": 1140,
      "commune_name_ascii": "Boussemghoun",
      "commune_name": "بوسمغون",
      "daira_name_ascii": "Boussemghoun",
      "daira_name": "بوسمغون",
      "wilaya_code": "32",
      "wilaya_name_ascii": "El Bayadh",
      "wilaya_name": "البيض",
      "centers": []
    },
    "1141": {
      "id": 1141,
      "commune_name_ascii": "Brezina",
      "commune_name": "بريزينة",
      "daira_name_ascii": "Brezina",
      "daira_name": "بريزينة",
      "wilaya_code": "32",
      "wilaya_name_ascii": "El Bayadh",
      "wilaya_name": "البيض",
      "centers": []
    },
    "1142": {
      "id": 1142,
      "commune_name_ascii": "Cheguig",
      "commune_name": "الشقيق",
      "daira_name_ascii": "Rogassa",
      "daira_name": "رقاصة",
      "wilaya_code": "32",
      "wilaya_name_ascii": "El Bayadh",
      "wilaya_name": "البيض",
      "centers": []
    },
    "1143": {
      "id": 1143,
      "commune_name_ascii": "Chellala",
      "commune_name": "شلالة",
      "daira_name_ascii": "Chellala",
      "daira_name": "شلالة",
      "wilaya_code": "32",
      "wilaya_name_ascii": "El Bayadh",
      "wilaya_name": "البيض",
      "centers": []
    },
    "1144": {
      "id": 1144,
      "commune_name_ascii": "El Bayadh",
      "commune_name": "البيض",
      "daira_name_ascii": "El Bayadh",
      "daira_name": "البيض",
      "wilaya_code": "32",
      "wilaya_name_ascii": "El Bayadh",
      "wilaya_name": "البيض",
      "centers": [
        {
          "center_id": 320101,
          "name": "Agence de El Bayadh [Yalidine]",
          "address": "Rue Mohamed Touil (A Cote Auberge Hanna)",
          "gps": "33.68182465412115,1.0147081430506253",
          "commune_id": 3201,
          "commune_name": "El Bayadh",
          "wilaya_id": 32,
          "wilaya_name": "El Bayadh"
        }
      ]
    },
    "1145": {
      "id": 1145,
      "commune_name_ascii": "Labiodh Sidi Cheikh",
      "commune_name": "الأبيض سيدي الشيخ",
      "daira_name_ascii": "Labiodh Sidi Cheikh",
      "daira_name": "الأبيض سيدي الشيخ",
      "wilaya_code": "32",
      "wilaya_name_ascii": "El Bayadh",
      "wilaya_name": "البيض",
      "centers": []
    },
    "1146": {
      "id": 1146,
      "commune_name_ascii": "El Bnoud",
      "commune_name": "البنود",
      "daira_name_ascii": "Labiodh Sidi Cheikh",
      "daira_name": "الأبيض سيدي الشيخ",
      "wilaya_code": "32",
      "wilaya_name_ascii": "El Bayadh",
      "wilaya_name": "البيض",
      "centers": []
    },
    "1147": {
      "id": 1147,
      "commune_name_ascii": "El Kheiter",
      "commune_name": "الخيثر",
      "daira_name_ascii": "Bougtoub",
      "daira_name": "بوقطب",
      "wilaya_code": "32",
      "wilaya_name_ascii": "El Bayadh",
      "wilaya_name": "البيض",
      "centers": []
    },
    "1148": {
      "id": 1148,
      "commune_name_ascii": "El Mehara",
      "commune_name": "المحرة",
      "daira_name_ascii": "Chellala",
      "daira_name": "شلالة",
      "wilaya_code": "32",
      "wilaya_name_ascii": "El Bayadh",
      "wilaya_name": "البيض",
      "centers": []
    },
    "1149": {
      "id": 1149,
      "commune_name_ascii": "Ghassoul",
      "commune_name": "الغاسول",
      "daira_name_ascii": "Brezina",
      "daira_name": "بريزينة",
      "wilaya_code": "32",
      "wilaya_name_ascii": "El Bayadh",
      "wilaya_name": "البيض",
      "centers": []
    },
    "1150": {
      "id": 1150,
      "commune_name_ascii": "Kef El Ahmar",
      "commune_name": "الكاف الأحمر",
      "daira_name_ascii": "Rogassa",
      "daira_name": "رقاصة",
      "wilaya_code": "32",
      "wilaya_name_ascii": "El Bayadh",
      "wilaya_name": "البيض",
      "centers": []
    },
    "1151": {
      "id": 1151,
      "commune_name_ascii": "Krakda",
      "commune_name": "كراكدة",
      "daira_name_ascii": "Brezina",
      "daira_name": "بريزينة",
      "wilaya_code": "32",
      "wilaya_name_ascii": "El Bayadh",
      "wilaya_name": "البيض",
      "centers": []
    },
    "1152": {
      "id": 1152,
      "commune_name_ascii": "Rogassa",
      "commune_name": "رقاصة",
      "daira_name_ascii": "Rogassa",
      "daira_name": "رقاصة",
      "wilaya_code": "32",
      "wilaya_name_ascii": "El Bayadh",
      "wilaya_name": "البيض",
      "centers": []
    },
    "1153": {
      "id": 1153,
      "commune_name_ascii": "Sidi Ameur",
      "commune_name": "سيدي عامر",
      "daira_name_ascii": "Boualem",
      "daira_name": "بوعلام",
      "wilaya_code": "32",
      "wilaya_name_ascii": "El Bayadh",
      "wilaya_name": "البيض",
      "centers": []
    },
    "1154": {
      "id": 1154,
      "commune_name_ascii": "Sidi Slimane",
      "commune_name": "سيدي سليمان",
      "daira_name_ascii": "Boualem",
      "daira_name": "بوعلام",
      "wilaya_code": "32",
      "wilaya_name_ascii": "El Bayadh",
      "wilaya_name": "البيض",
      "centers": []
    },
    "1155": {
      "id": 1155,
      "commune_name_ascii": "Sidi Tiffour",
      "commune_name": "سيدي طيفور",
      "daira_name_ascii": "Boualem",
      "daira_name": "بوعلام",
      "wilaya_code": "32",
      "wilaya_name_ascii": "El Bayadh",
      "wilaya_name": "البيض",
      "centers": []
    },
    "1156": {
      "id": 1156,
      "commune_name_ascii": "Stitten",
      "commune_name": "ستيتن",
      "daira_name_ascii": "Boualem",
      "daira_name": "بوعلام",
      "wilaya_code": "32",
      "wilaya_name_ascii": "El Bayadh",
      "wilaya_name": "البيض",
      "centers": []
    },
    "1157": {
      "id": 1157,
      "commune_name_ascii": "Tousmouline",
      "commune_name": "توسمولين",
      "daira_name_ascii": "Bougtoub",
      "daira_name": "بوقطب",
      "wilaya_code": "32",
      "wilaya_name_ascii": "El Bayadh",
      "wilaya_name": "البيض",
      "centers": []
    },
    "1158": {
      "id": 1158,
      "commune_name_ascii": "Bordj El Haouass",
      "commune_name": "برج الحواس",
      "daira_name_ascii": "Djanet",
      "daira_name": "جانت",
      "wilaya_code": "56",
      "wilaya_name_ascii": "Djanet",
      "wilaya_name": "جانت",
      "centers": []
    },
    "1159": {
      "id": 1159,
      "commune_name_ascii": "Bordj Omar Driss",
      "commune_name": "برج عمر إدريس",
      "daira_name_ascii": "In Amenas",
      "daira_name": "إن أمناس",
      "wilaya_code": "33",
      "wilaya_name_ascii": "Illizi",
      "wilaya_name": "إليزي",
      "centers": []
    },
    "1160": {
      "id": 1160,
      "commune_name_ascii": "Debdeb",
      "commune_name": "دبداب",
      "daira_name_ascii": "In Amenas",
      "daira_name": "إن أمناس",
      "wilaya_code": "33",
      "wilaya_name_ascii": "Illizi",
      "wilaya_name": "إليزي",
      "centers": []
    },
    "1161": {
      "id": 1161,
      "commune_name_ascii": "Djanet",
      "commune_name": "جانت",
      "daira_name_ascii": "Djanet",
      "daira_name": "جانت",
      "wilaya_code": "56",
      "wilaya_name_ascii": "Djanet",
      "wilaya_name": "جانت",
      "centers": [
        {
          "center_id": 560201,
          "name": "Agence de Djanet [Guepex]",
          "address": "Tin Khatma",
          "gps": "24.55986182082406, 9.481856717098914",
          "commune_id": 5602,
          "commune_name": "Djanet",
          "wilaya_id": 56,
          "wilaya_name": "Djanet"
        }
      ]
    },
    "1162": {
      "id": 1162,
      "commune_name_ascii": "Illizi",
      "commune_name": "إيليزي",
      "daira_name_ascii": "Illizi",
      "daira_name": "إيليزي",
      "wilaya_code": "33",
      "wilaya_name_ascii": "Illizi",
      "wilaya_name": "إليزي",
      "centers": [
        {
          "center_id": 330101,
          "name": "Agence de Illizi [Guepex]",
          "address": "Chemin Ain El Kours Cite Salam",
          "gps": "26.506170413905355,8.489622372352972",
          "commune_id": 3301,
          "commune_name": "Illizi",
          "wilaya_id": 33,
          "wilaya_name": "Illizi"
        }
      ]
    },
    "1163": {
      "id": 1163,
      "commune_name_ascii": "In Amenas",
      "commune_name": "إن أمناس",
      "daira_name_ascii": "In Amenas",
      "daira_name": "إن أمناس",
      "wilaya_code": "33",
      "wilaya_name_ascii": "Illizi",
      "wilaya_name": "إليزي",
      "centers": [
        {
          "center_id": 330601,
          "name": "Agence In Amenas Geupex",
          "address": "القسم 12 مجموعة ملكية 56-342 مسكن بلدية ان اميناس",
          "gps": "28.050180003262113,9.578835500000002",
          "commune_id": 3306,
          "commune_name": "In Amenas",
          "wilaya_id": 33,
          "wilaya_name": "Illizi"
        }
      ]
    },
    "1164": {
      "id": 1164,
      "commune_name_ascii": "Ain Taghrout",
      "commune_name": "عين تاغروت",
      "daira_name_ascii": "Ain Taghrout",
      "daira_name": "عين تاغروت",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1165": {
      "id": 1165,
      "commune_name_ascii": "Ain Tesra",
      "commune_name": "عين تسرة",
      "daira_name_ascii": "Ras El Oued",
      "daira_name": "رأس الوادي",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1166": {
      "id": 1166,
      "commune_name_ascii": "B. B. Arreridj",
      "commune_name": "برج بوعريرج",
      "daira_name_ascii": "Bordj Bou Arreridj",
      "daira_name": "برج بوعريريج",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": [
        {
          "center_id": 340601,
          "name": "Agence de El Djebasse [Yalidine]",
          "address": "cite 1er novembre 1954, 90 logements numéro 42",
          "gps": "36.07358095544724, 4.769126075519668",
          "commune_id": 3406,
          "commune_name": "Bordj Bou Arreridj",
          "wilaya_id": 34,
          "wilaya_name": "Bordj Bou Arreridj"
        },
        {
          "center_id": 340602,
          "name": "Agence Cité Soualem [Guepex]",
          "address": "Cité 01 novembre, rue de Sétif",
          "gps": "36.06221859090565, 4.774595953993218",
          "commune_id": 3406,
          "commune_name": "Bordj Bou Arreridj",
          "wilaya_id": 34,
          "wilaya_name": "Bordj Bou Arreridj"
        }
      ]
    },
    "1167": {
      "id": 1167,
      "commune_name_ascii": "Belimour",
      "commune_name": "بليمور",
      "daira_name_ascii": "Bordj Ghedir",
      "daira_name": "برج الغدير",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1168": {
      "id": 1168,
      "commune_name_ascii": "Ben Daoud",
      "commune_name": "بن داود",
      "daira_name_ascii": "Mansourah",
      "daira_name": "المنصورة",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1169": {
      "id": 1169,
      "commune_name_ascii": "Bir Kasdali",
      "commune_name": "بئر قاصد علي",
      "daira_name_ascii": "Bir Kasdali",
      "daira_name": "بئر قاصد علي",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1170": {
      "id": 1170,
      "commune_name_ascii": "Bordj Ghedir",
      "commune_name": "برج الغدير",
      "daira_name_ascii": "Bordj Ghedir",
      "daira_name": "برج الغدير",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1171": {
      "id": 1171,
      "commune_name_ascii": "Bordj Zemmoura",
      "commune_name": "برج زمورة",
      "daira_name_ascii": "Bordj Zemmoura",
      "daira_name": "برج زمورة",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1172": {
      "id": 1172,
      "commune_name_ascii": "Colla",
      "commune_name": "القلة",
      "daira_name_ascii": "Djaafra",
      "daira_name": "جعافرة",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1173": {
      "id": 1173,
      "commune_name_ascii": "Djaafra",
      "commune_name": "جعافرة",
      "daira_name_ascii": "Djaafra",
      "daira_name": "جعافرة",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1174": {
      "id": 1174,
      "commune_name_ascii": "El Euch",
      "commune_name": "العش",
      "daira_name_ascii": "El Hamadia",
      "daira_name": "الحمادية",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1175": {
      "id": 1175,
      "commune_name_ascii": "El Achir",
      "commune_name": "الياشير",
      "daira_name_ascii": "Medjana",
      "daira_name": "مجانة",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1176": {
      "id": 1176,
      "commune_name_ascii": "El Annasseur",
      "commune_name": "العناصر",
      "daira_name_ascii": "Bordj Ghedir",
      "daira_name": "برج الغدير",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1177": {
      "id": 1177,
      "commune_name_ascii": "Elhammadia",
      "commune_name": "الحمادية",
      "daira_name_ascii": "El Hamadia",
      "daira_name": "الحمادية",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1178": {
      "id": 1178,
      "commune_name_ascii": "El Main",
      "commune_name": "الماين",
      "daira_name_ascii": "Djaafra",
      "daira_name": "جعافرة",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1179": {
      "id": 1179,
      "commune_name_ascii": "El M'hir",
      "commune_name": "المهير",
      "daira_name_ascii": "Mansourah",
      "daira_name": "المنصورة",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1180": {
      "id": 1180,
      "commune_name_ascii": "Ghailasa",
      "commune_name": "غيلاسة",
      "daira_name_ascii": "Bordj Ghedir",
      "daira_name": "برج الغدير",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1181": {
      "id": 1181,
      "commune_name_ascii": "Haraza",
      "commune_name": "حرازة",
      "daira_name_ascii": "Mansourah",
      "daira_name": "المنصورة",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1182": {
      "id": 1182,
      "commune_name_ascii": "Hasnaoua",
      "commune_name": "حسناوة",
      "daira_name_ascii": "Medjana",
      "daira_name": "مجانة",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1183": {
      "id": 1183,
      "commune_name_ascii": "Khelil",
      "commune_name": "خليل",
      "daira_name_ascii": "Bir Kasdali",
      "daira_name": "بئر قاصد علي",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1184": {
      "id": 1184,
      "commune_name_ascii": "Ksour",
      "commune_name": "القصور",
      "daira_name_ascii": "El Hamadia",
      "daira_name": "الحمادية",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1185": {
      "id": 1185,
      "commune_name_ascii": "Mansoura",
      "commune_name": "المنصورة",
      "daira_name_ascii": "Mansourah",
      "daira_name": "المنصورة",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1186": {
      "id": 1186,
      "commune_name_ascii": "Medjana",
      "commune_name": "مجانة",
      "daira_name_ascii": "Medjana",
      "daira_name": "مجانة",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1187": {
      "id": 1187,
      "commune_name_ascii": "Ouled Brahem",
      "commune_name": "أولاد أبراهم",
      "daira_name_ascii": "Ras El Oued",
      "daira_name": "رأس الوادي",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1188": {
      "id": 1188,
      "commune_name_ascii": "Ouled Dahmane",
      "commune_name": "أولاد دحمان",
      "daira_name_ascii": "Bordj Zemmoura",
      "daira_name": "برج زمورة",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1189": {
      "id": 1189,
      "commune_name_ascii": "Ouled Sidi-Brahim",
      "commune_name": "أولاد سيدي ابراهيم",
      "daira_name_ascii": "Mansourah",
      "daira_name": "المنصورة",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1190": {
      "id": 1190,
      "commune_name_ascii": "Rabta",
      "commune_name": "الرابطة",
      "daira_name_ascii": "El Hamadia",
      "daira_name": "الحمادية",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1191": {
      "id": 1191,
      "commune_name_ascii": "Ras El Oued",
      "commune_name": "رأس الوادي",
      "daira_name_ascii": "Ras El Oued",
      "daira_name": "رأس الوادي",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1192": {
      "id": 1192,
      "commune_name_ascii": "Sidi-Embarek",
      "commune_name": "سيدي أمبارك",
      "daira_name_ascii": "Bir Kasdali",
      "daira_name": "بئر قاصد علي",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1193": {
      "id": 1193,
      "commune_name_ascii": "Tefreg",
      "commune_name": "تفرق",
      "daira_name_ascii": "Djaafra",
      "daira_name": "جعافرة",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1194": {
      "id": 1194,
      "commune_name_ascii": "Taglait",
      "commune_name": "تقلعيت",
      "daira_name_ascii": "Bordj Ghedir",
      "daira_name": "برج الغدير",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1195": {
      "id": 1195,
      "commune_name_ascii": "Tassamert",
      "commune_name": "تسامرت",
      "daira_name_ascii": "Bordj Zemmoura",
      "daira_name": "برج زمورة",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1196": {
      "id": 1196,
      "commune_name_ascii": "Teniet En Nasr",
      "commune_name": "ثنية النصر",
      "daira_name_ascii": "Medjana",
      "daira_name": "مجانة",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1197": {
      "id": 1197,
      "commune_name_ascii": "Tixter",
      "commune_name": "تيكستار",
      "daira_name_ascii": "Ain Taghrout",
      "daira_name": "عين تاغروت",
      "wilaya_code": "34",
      "wilaya_name_ascii": "Bordj Bou Arreridj",
      "wilaya_name": "برج بوعريريج",
      "centers": []
    },
    "1198": {
      "id": 1198,
      "commune_name_ascii": "Afir",
      "commune_name": "أعفير",
      "daira_name_ascii": "Dellys",
      "daira_name": "دلس",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": []
    },
    "1199": {
      "id": 1199,
      "commune_name_ascii": "Ammal",
      "commune_name": "عمال",
      "daira_name_ascii": "Thenia",
      "daira_name": "الثنية",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": []
    },
    "1200": {
      "id": 1200,
      "commune_name_ascii": "Baghlia",
      "commune_name": "بغلية",
      "daira_name_ascii": "Baghlia",
      "daira_name": "بغلية",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": []
    },
    "1201": {
      "id": 1201,
      "commune_name_ascii": "Ben Choud",
      "commune_name": "بن شود",
      "daira_name_ascii": "Dellys",
      "daira_name": "دلس",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": []
    },
    "1202": {
      "id": 1202,
      "commune_name_ascii": "Beni Amrane",
      "commune_name": "بني عمران",
      "daira_name_ascii": "Thenia",
      "daira_name": "الثنية",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": []
    },
    "1203": {
      "id": 1203,
      "commune_name_ascii": "Bordj Menaiel",
      "commune_name": "برج منايل",
      "daira_name_ascii": "Bordj Menaiel",
      "daira_name": "برج منايل",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": [
        {
          "center_id": 350501,
          "name": "Agence de Bordj Menaiel [Guepex]",
          "address": "Rue Bouira Boualem, Section 02 Magasin 02",
          "gps": "36.73815152136307,3.7220183039667347",
          "commune_id": 3505,
          "commune_name": "Bordj Menaiel",
          "wilaya_id": 35,
          "wilaya_name": "Boumerdès"
        }
      ]
    },
    "1204": {
      "id": 1204,
      "commune_name_ascii": "Boudouaou",
      "commune_name": "بودواو",
      "daira_name_ascii": "Boudouaou",
      "daira_name": "بودواو",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": []
    },
    "1205": {
      "id": 1205,
      "commune_name_ascii": "Boudouaou El Bahri",
      "commune_name": "بودواو البحري",
      "daira_name_ascii": "Boudouaou",
      "daira_name": "بودواو",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": []
    },
    "1206": {
      "id": 1206,
      "commune_name_ascii": "Boumerdes",
      "commune_name": "بومرداس",
      "daira_name_ascii": "Boumerdes",
      "daira_name": "بومرداس",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": [
        {
          "center_id": 350101,
          "name": "Agence de Boumerdes [Yalidine]",
          "address": "Cité Foés bâtiment B local N°04 ",
          "gps": "36.75100407593048,3.457471537963522",
          "commune_id": 3501,
          "commune_name": "Boumerdes",
          "wilaya_id": 35,
          "wilaya_name": "Boumerdès"
        }
      ]
    },
    "1207": {
      "id": 1207,
      "commune_name_ascii": "Bouzegza Keddara",
      "commune_name": "بوزقزة قدارة",
      "daira_name_ascii": "Boudouaou",
      "daira_name": "بودواو",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": []
    },
    "1208": {
      "id": 1208,
      "commune_name_ascii": "Chabet El Ameur",
      "commune_name": "شعبة العامر",
      "daira_name_ascii": "Isser",
      "daira_name": "يسر",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": []
    },
    "1209": {
      "id": 1209,
      "commune_name_ascii": "Corso",
      "commune_name": "قورصو",
      "daira_name_ascii": "Boumerdes",
      "daira_name": "بومرداس",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": []
    },
    "1210": {
      "id": 1210,
      "commune_name_ascii": "Dellys",
      "commune_name": "دلس",
      "daira_name_ascii": "Dellys",
      "daira_name": "دلس",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": []
    },
    "1211": {
      "id": 1211,
      "commune_name_ascii": "Djinet",
      "commune_name": "جنات",
      "daira_name_ascii": "Bordj Menaiel",
      "daira_name": "برج منايل",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": []
    },
    "1212": {
      "id": 1212,
      "commune_name_ascii": "El Kharrouba",
      "commune_name": "الخروبة",
      "daira_name_ascii": "Boudouaou",
      "daira_name": "بودواو",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": []
    },
    "1213": {
      "id": 1213,
      "commune_name_ascii": "Hammedi",
      "commune_name": "حمادي",
      "daira_name_ascii": "Khemis El Khechna",
      "daira_name": "خميس الخشنة",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": []
    },
    "1214": {
      "id": 1214,
      "commune_name_ascii": "Isser",
      "commune_name": "يسر",
      "daira_name_ascii": "Isser",
      "daira_name": "يسر",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": []
    },
    "1215": {
      "id": 1215,
      "commune_name_ascii": "Khemis El Khechna",
      "commune_name": "خميس الخشنة",
      "daira_name_ascii": "Khemis El Khechna",
      "daira_name": "خميس الخشنة",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": []
    },
    "1216": {
      "id": 1216,
      "commune_name_ascii": "Larbatache",
      "commune_name": "الاربعطاش",
      "daira_name_ascii": "Khemis El Khechna",
      "daira_name": "خميس الخشنة",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": []
    },
    "1217": {
      "id": 1217,
      "commune_name_ascii": "Leghata",
      "commune_name": "لقاطة",
      "daira_name_ascii": "Bordj Menaiel",
      "daira_name": "برج منايل",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": []
    },
    "1218": {
      "id": 1218,
      "commune_name_ascii": "Naciria",
      "commune_name": "الناصرية",
      "daira_name_ascii": "Naciria",
      "daira_name": "الناصرية",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": []
    },
    "1219": {
      "id": 1219,
      "commune_name_ascii": "Ouled Aissa",
      "commune_name": "أولاد عيسى",
      "daira_name_ascii": "Naciria",
      "daira_name": "الناصرية",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": []
    },
    "1220": {
      "id": 1220,
      "commune_name_ascii": "Ouled Hedadj",
      "commune_name": "أولاد هداج",
      "daira_name_ascii": "Boudouaou",
      "daira_name": "بودواو",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": []
    },
    "1221": {
      "id": 1221,
      "commune_name_ascii": "Ouled Moussa",
      "commune_name": "أولاد موسى",
      "daira_name_ascii": "Khemis El Khechna",
      "daira_name": "خميس الخشنة",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": []
    },
    "1222": {
      "id": 1222,
      "commune_name_ascii": "Si Mustapha",
      "commune_name": "سي مصطفى",
      "daira_name_ascii": "Isser",
      "daira_name": "يسر",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": []
    },
    "1223": {
      "id": 1223,
      "commune_name_ascii": "Sidi Daoud",
      "commune_name": "سيدي داود",
      "daira_name_ascii": "Baghlia",
      "daira_name": "بغلية",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": []
    },
    "1224": {
      "id": 1224,
      "commune_name_ascii": "Souk El Had",
      "commune_name": "سوق الحد",
      "daira_name_ascii": "Thenia",
      "daira_name": "الثنية",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": []
    },
    "1225": {
      "id": 1225,
      "commune_name_ascii": "Taourga",
      "commune_name": "تاورقة",
      "daira_name_ascii": "Baghlia",
      "daira_name": "بغلية",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": []
    },
    "1226": {
      "id": 1226,
      "commune_name_ascii": "Thenia",
      "commune_name": "الثنية",
      "daira_name_ascii": "Thenia",
      "daira_name": "الثنية",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": []
    },
    "1227": {
      "id": 1227,
      "commune_name_ascii": "Tidjelabine",
      "commune_name": "تيجلابين",
      "daira_name_ascii": "Boumerdes",
      "daira_name": "بومرداس",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": []
    },
    "1228": {
      "id": 1228,
      "commune_name_ascii": "Timezrit",
      "commune_name": "تيمزريت",
      "daira_name_ascii": "Isser",
      "daira_name": "يسر",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": []
    },
    "1229": {
      "id": 1229,
      "commune_name_ascii": "Zemmouri",
      "commune_name": "زموري",
      "daira_name_ascii": "Bordj Menaiel",
      "daira_name": "برج منايل",
      "wilaya_code": "35",
      "wilaya_name_ascii": "Boumerdès",
      "wilaya_name": "بومرداس",
      "centers": []
    },
    "1230": {
      "id": 1230,
      "commune_name_ascii": "Ain El Assel",
      "commune_name": "عين العسل",
      "daira_name_ascii": "El Tarf",
      "daira_name": "الطارف",
      "wilaya_code": "36",
      "wilaya_name_ascii": "El Tarf",
      "wilaya_name": "الطارف",
      "centers": []
    },
    "1231": {
      "id": 1231,
      "commune_name_ascii": "Ain Kerma",
      "commune_name": "عين الكرمة",
      "daira_name_ascii": "Bouhadjar",
      "daira_name": "بوحجار",
      "wilaya_code": "36",
      "wilaya_name_ascii": "El Tarf",
      "wilaya_name": "الطارف",
      "centers": []
    },
    "1232": {
      "id": 1232,
      "commune_name_ascii": "Asfour",
      "commune_name": "عصفور",
      "daira_name_ascii": "Besbes",
      "daira_name": "البسباس",
      "wilaya_code": "36",
      "wilaya_name_ascii": "El Tarf",
      "wilaya_name": "الطارف",
      "centers": []
    },
    "1233": {
      "id": 1233,
      "commune_name_ascii": "Ben M Hidi",
      "commune_name": "بن مهيدي",
      "daira_name_ascii": "Ben M'hidi",
      "daira_name": "بن مهيدي",
      "wilaya_code": "36",
      "wilaya_name_ascii": "El Tarf",
      "wilaya_name": "الطارف",
      "centers": []
    },
    "1234": {
      "id": 1234,
      "commune_name_ascii": "Berrihane",
      "commune_name": "بريحان",
      "daira_name_ascii": "Ben M'hidi",
      "daira_name": "بن مهيدي",
      "wilaya_code": "36",
      "wilaya_name_ascii": "El Tarf",
      "wilaya_name": "الطارف",
      "centers": []
    },
    "1235": {
      "id": 1235,
      "commune_name_ascii": "Besbes",
      "commune_name": "البسباس",
      "daira_name_ascii": "Besbes",
      "daira_name": "البسباس",
      "wilaya_code": "36",
      "wilaya_name_ascii": "El Tarf",
      "wilaya_name": "الطارف",
      "centers": []
    },
    "1236": {
      "id": 1236,
      "commune_name_ascii": "Bougous",
      "commune_name": "بوقوس",
      "daira_name_ascii": "El Tarf",
      "daira_name": "الطارف",
      "wilaya_code": "36",
      "wilaya_name_ascii": "El Tarf",
      "wilaya_name": "الطارف",
      "centers": []
    },
    "1237": {
      "id": 1237,
      "commune_name_ascii": "Bouhadjar",
      "commune_name": "بوحجار",
      "daira_name_ascii": "Bouhadjar",
      "daira_name": "بوحجار",
      "wilaya_code": "36",
      "wilaya_name_ascii": "El Tarf",
      "wilaya_name": "الطارف",
      "centers": []
    },
    "1238": {
      "id": 1238,
      "commune_name_ascii": "Bouteldja",
      "commune_name": "بوثلجة",
      "daira_name_ascii": "Bouteldja",
      "daira_name": "بوثلجة",
      "wilaya_code": "36",
      "wilaya_name_ascii": "El Tarf",
      "wilaya_name": "الطارف",
      "centers": []
    },
    "1239": {
      "id": 1239,
      "commune_name_ascii": "Chebaita Mokhtar",
      "commune_name": "شبيطة مختار",
      "daira_name_ascii": "Drean",
      "daira_name": "الذرعان",
      "wilaya_code": "36",
      "wilaya_name_ascii": "El Tarf",
      "wilaya_name": "الطارف",
      "centers": [
        {
          "center_id": 361301,
          "name": "Agence Dréan El Tarf [Yalidine]",
          "address": "Rue lmzaouda al-arbi el dréan",
          "gps": "36.684014174423325,7.748788786509849",
          "commune_id": 3613,
          "commune_name": "Dréan",
          "wilaya_id": 36,
          "wilaya_name": "El Tarf"
        }
      ]
    },
    "1240": {
      "id": 1240,
      "commune_name_ascii": "Chefia",
      "commune_name": "الشافية",
      "daira_name_ascii": "Bouteldja",
      "daira_name": "بوثلجة",
      "wilaya_code": "36",
      "wilaya_name_ascii": "El Tarf",
      "wilaya_name": "الطارف",
      "centers": []
    },
    "1241": {
      "id": 1241,
      "commune_name_ascii": "Chihani",
      "commune_name": "شحاني",
      "daira_name_ascii": "Drean",
      "daira_name": "الذرعان",
      "wilaya_code": "36",
      "wilaya_name_ascii": "El Tarf",
      "wilaya_name": "الطارف",
      "centers": []
    },
    "1242": {
      "id": 1242,
      "commune_name_ascii": "Drean",
      "commune_name": "الذرعـان",
      "daira_name_ascii": "Drean",
      "daira_name": "الذرعان",
      "wilaya_code": "36",
      "wilaya_name_ascii": "El Tarf",
      "wilaya_name": "الطارف",
      "centers": []
    },
    "1243": {
      "id": 1243,
      "commune_name_ascii": "Echatt",
      "commune_name": "الشط",
      "daira_name_ascii": "Ben M'hidi",
      "daira_name": "بن مهيدي",
      "wilaya_code": "36",
      "wilaya_name_ascii": "El Tarf",
      "wilaya_name": "الطارف",
      "centers": []
    },
    "1244": {
      "id": 1244,
      "commune_name_ascii": "El Aioun",
      "commune_name": "العيون",
      "daira_name_ascii": "El Kala",
      "daira_name": "القالة",
      "wilaya_code": "36",
      "wilaya_name_ascii": "El Tarf",
      "wilaya_name": "الطارف",
      "centers": []
    },
    "1245": {
      "id": 1245,
      "commune_name_ascii": "El Kala",
      "commune_name": "القالة",
      "daira_name_ascii": "El Kala",
      "daira_name": "القالة",
      "wilaya_code": "36",
      "wilaya_name_ascii": "El Tarf",
      "wilaya_name": "الطارف",
      "centers": []
    },
    "1246": {
      "id": 1246,
      "commune_name_ascii": "El Tarf",
      "commune_name": "الطارف",
      "daira_name_ascii": "El Tarf",
      "daira_name": "الطارف",
      "wilaya_code": "36",
      "wilaya_name_ascii": "El Tarf",
      "wilaya_name": "الطارف",
      "centers": [
        {
          "center_id": 361701,
          "name": "Agence de El Tarf [Yalidine]",
          "address": "Rue N°44 Cite Les Vergers",
          "gps": "36.7670884594558,8.308140442356349",
          "commune_id": 3617,
          "commune_name": "El Tarf",
          "wilaya_id": 36,
          "wilaya_name": "El Tarf"
        }
      ]
    },
    "1247": {
      "id": 1247,
      "commune_name_ascii": "Hammam Beni Salah",
      "commune_name": "حمام بني صالح",
      "daira_name_ascii": "Bouhadjar",
      "daira_name": "بوحجار",
      "wilaya_code": "36",
      "wilaya_name_ascii": "El Tarf",
      "wilaya_name": "الطارف",
      "centers": []
    },
    "1248": {
      "id": 1248,
      "commune_name_ascii": "Lac Des Oiseaux",
      "commune_name": "بحيرة الطيور",
      "daira_name_ascii": "Bouteldja",
      "daira_name": "بوثلجة",
      "wilaya_code": "36",
      "wilaya_name_ascii": "El Tarf",
      "wilaya_name": "الطارف",
      "centers": []
    },
    "1249": {
      "id": 1249,
      "commune_name_ascii": "Oued Zitoun",
      "commune_name": "وادي الزيتون",
      "daira_name_ascii": "Bouhadjar",
      "daira_name": "بوحجار",
      "wilaya_code": "36",
      "wilaya_name_ascii": "El Tarf",
      "wilaya_name": "الطارف",
      "centers": []
    },
    "1250": {
      "id": 1250,
      "commune_name_ascii": "Raml Souk",
      "commune_name": "رمل السوق",
      "daira_name_ascii": "El Kala",
      "daira_name": "القالة",
      "wilaya_code": "36",
      "wilaya_name_ascii": "El Tarf",
      "wilaya_name": "الطارف",
      "centers": []
    },
    "1251": {
      "id": 1251,
      "commune_name_ascii": "Souarekh",
      "commune_name": "السوارخ",
      "daira_name_ascii": "El Kala",
      "daira_name": "القالة",
      "wilaya_code": "36",
      "wilaya_name_ascii": "El Tarf",
      "wilaya_name": "الطارف",
      "centers": []
    },
    "1252": {
      "id": 1252,
      "commune_name_ascii": "Zerizer",
      "commune_name": "زريزر",
      "daira_name_ascii": "Besbes",
      "daira_name": "البسباس",
      "wilaya_code": "36",
      "wilaya_name_ascii": "El Tarf",
      "wilaya_name": "الطارف",
      "centers": []
    },
    "1253": {
      "id": 1253,
      "commune_name_ascii": "Zitouna",
      "commune_name": "الزيتونة",
      "daira_name_ascii": "El Tarf",
      "daira_name": "الطارف",
      "wilaya_code": "36",
      "wilaya_name_ascii": "El Tarf",
      "wilaya_name": "الطارف",
      "centers": []
    },
    "1254": {
      "id": 1254,
      "commune_name_ascii": "Oum El Assel",
      "commune_name": "أم العسل",
      "daira_name_ascii": "Tindouf",
      "daira_name": "تندوف",
      "wilaya_code": "37",
      "wilaya_name_ascii": "Tindouf",
      "wilaya_name": "تندوف",
      "centers": []
    },
    "1255": {
      "id": 1255,
      "commune_name_ascii": "Tindouf",
      "commune_name": "تندوف",
      "daira_name_ascii": "Tindouf",
      "daira_name": "تندوف",
      "wilaya_code": "37",
      "wilaya_name_ascii": "Tindouf",
      "wilaya_name": "تندوف",
      "centers": [
        {
          "center_id": 370201,
          "name": "Agence de Tindouf [Yalidine]",
          "address": "Cites Moussani (A Cote De La Radio)",
          "gps": "27.66861750577877,-8.142957799721954",
          "commune_id": 3702,
          "commune_name": "Tindouf",
          "wilaya_id": 37,
          "wilaya_name": "Tindouf"
        }
      ]
    },
    "1256": {
      "id": 1256,
      "commune_name_ascii": "Ammari",
      "commune_name": "عماري",
      "daira_name_ascii": "Ammari",
      "daira_name": "عماري",
      "wilaya_code": "38",
      "wilaya_name_ascii": "Tissemsilt",
      "wilaya_name": "تيسمسيلت",
      "centers": []
    },
    "1257": {
      "id": 1257,
      "commune_name_ascii": "Beni Chaib",
      "commune_name": "بني شعيب",
      "daira_name_ascii": "Bordj Bounaama",
      "daira_name": "برج بونعامة",
      "wilaya_code": "38",
      "wilaya_name_ascii": "Tissemsilt",
      "wilaya_name": "تيسمسيلت",
      "centers": []
    },
    "1258": {
      "id": 1258,
      "commune_name_ascii": "Beni Lahcene",
      "commune_name": "بني لحسن",
      "daira_name_ascii": "Bordj Bounaama",
      "daira_name": "برج بونعامة",
      "wilaya_code": "38",
      "wilaya_name_ascii": "Tissemsilt",
      "wilaya_name": "تيسمسيلت",
      "centers": []
    },
    "1259": {
      "id": 1259,
      "commune_name_ascii": "Bordj Bounaama",
      "commune_name": "برج بونعامة",
      "daira_name_ascii": "Bordj Bounaama",
      "daira_name": "برج بونعامة",
      "wilaya_code": "38",
      "wilaya_name_ascii": "Tissemsilt",
      "wilaya_name": "تيسمسيلت",
      "centers": []
    },
    "1260": {
      "id": 1260,
      "commune_name_ascii": "Bordj El Emir Abdelkader",
      "commune_name": "برج الأمير عبد القادر",
      "daira_name_ascii": "Bordj Emir Abdelkader",
      "daira_name": "برج الأمير عبد القادر",
      "wilaya_code": "38",
      "wilaya_name_ascii": "Tissemsilt",
      "wilaya_name": "تيسمسيلت",
      "centers": []
    },
    "1261": {
      "id": 1261,
      "commune_name_ascii": "Boucaid",
      "commune_name": "بوقائد",
      "daira_name_ascii": "Lazharia",
      "daira_name": "الأزهرية",
      "wilaya_code": "38",
      "wilaya_name_ascii": "Tissemsilt",
      "wilaya_name": "تيسمسيلت",
      "centers": []
    },
    "1262": {
      "id": 1262,
      "commune_name_ascii": "Khemisti",
      "commune_name": "خميستي",
      "daira_name_ascii": "Khemisti",
      "daira_name": "خميستي",
      "wilaya_code": "38",
      "wilaya_name_ascii": "Tissemsilt",
      "wilaya_name": "تيسمسيلت",
      "centers": []
    },
    "1263": {
      "id": 1263,
      "commune_name_ascii": "Larbaa",
      "commune_name": "الأربعاء",
      "daira_name_ascii": "Lazharia",
      "daira_name": "الأزهرية",
      "wilaya_code": "38",
      "wilaya_name_ascii": "Tissemsilt",
      "wilaya_name": "تيسمسيلت",
      "centers": []
    },
    "1264": {
      "id": 1264,
      "commune_name_ascii": "Lardjem",
      "commune_name": "لرجام",
      "daira_name_ascii": "Lardjem",
      "daira_name": "لرجام",
      "wilaya_code": "38",
      "wilaya_name_ascii": "Tissemsilt",
      "wilaya_name": "تيسمسيلت",
      "centers": []
    },
    "1265": {
      "id": 1265,
      "commune_name_ascii": "Layoune",
      "commune_name": "العيون",
      "daira_name_ascii": "Khemisti",
      "daira_name": "خميستي",
      "wilaya_code": "38",
      "wilaya_name_ascii": "Tissemsilt",
      "wilaya_name": "تيسمسيلت",
      "centers": []
    },
    "1266": {
      "id": 1266,
      "commune_name_ascii": "Lazharia",
      "commune_name": "الأزهرية",
      "daira_name_ascii": "Lazharia",
      "daira_name": "الأزهرية",
      "wilaya_code": "38",
      "wilaya_name_ascii": "Tissemsilt",
      "wilaya_name": "تيسمسيلت",
      "centers": []
    },
    "1267": {
      "id": 1267,
      "commune_name_ascii": "Maacem",
      "commune_name": "المعاصم",
      "daira_name_ascii": "Ammari",
      "daira_name": "عماري",
      "wilaya_code": "38",
      "wilaya_name_ascii": "Tissemsilt",
      "wilaya_name": "تيسمسيلت",
      "centers": []
    },
    "1268": {
      "id": 1268,
      "commune_name_ascii": "Melaab",
      "commune_name": "الملعب",
      "daira_name_ascii": "Lardjem",
      "daira_name": "لرجام",
      "wilaya_code": "38",
      "wilaya_name_ascii": "Tissemsilt",
      "wilaya_name": "تيسمسيلت",
      "centers": []
    },
    "1269": {
      "id": 1269,
      "commune_name_ascii": "Ouled Bessam",
      "commune_name": "أولاد بسام",
      "daira_name_ascii": "Tissemsilt",
      "daira_name": "تيسمسيلت",
      "wilaya_code": "38",
      "wilaya_name_ascii": "Tissemsilt",
      "wilaya_name": "تيسمسيلت",
      "centers": []
    },
    "1270": {
      "id": 1270,
      "commune_name_ascii": "Sidi Abed",
      "commune_name": "سيدي عابد",
      "daira_name_ascii": "Ammari",
      "daira_name": "عماري",
      "wilaya_code": "38",
      "wilaya_name_ascii": "Tissemsilt",
      "wilaya_name": "تيسمسيلت",
      "centers": []
    },
    "1271": {
      "id": 1271,
      "commune_name_ascii": "Sidi Boutouchent",
      "commune_name": "سيدي بوتوشنت",
      "daira_name_ascii": "Theniet El Had",
      "daira_name": "ثنية الاحد",
      "wilaya_code": "38",
      "wilaya_name_ascii": "Tissemsilt",
      "wilaya_name": "تيسمسيلت",
      "centers": []
    },
    "1272": {
      "id": 1272,
      "commune_name_ascii": "Sidi Lantri",
      "commune_name": "سيدي العنتري",
      "daira_name_ascii": "Lardjem",
      "daira_name": "لرجام",
      "wilaya_code": "38",
      "wilaya_name_ascii": "Tissemsilt",
      "wilaya_name": "تيسمسيلت",
      "centers": []
    },
    "1273": {
      "id": 1273,
      "commune_name_ascii": "Sidi Slimane",
      "commune_name": "سيدي سليمان",
      "daira_name_ascii": "Bordj Bounaama",
      "daira_name": "برج بونعامة",
      "wilaya_code": "38",
      "wilaya_name_ascii": "Tissemsilt",
      "wilaya_name": "تيسمسيلت",
      "centers": []
    },
    "1274": {
      "id": 1274,
      "commune_name_ascii": "Tamellahet",
      "commune_name": "تملاحت",
      "daira_name_ascii": "Lardjem",
      "daira_name": "لرجام",
      "wilaya_code": "38",
      "wilaya_name_ascii": "Tissemsilt",
      "wilaya_name": "تيسمسيلت",
      "centers": []
    },
    "1275": {
      "id": 1275,
      "commune_name_ascii": "Theniet El Had",
      "commune_name": "ثنية الاحد",
      "daira_name_ascii": "Theniet El Had",
      "daira_name": "ثنية الاحد",
      "wilaya_code": "38",
      "wilaya_name_ascii": "Tissemsilt",
      "wilaya_name": "تيسمسيلت",
      "centers": []
    },
    "1276": {
      "id": 1276,
      "commune_name_ascii": "Tissemsilt",
      "commune_name": "تيسمسيلت",
      "daira_name_ascii": "Tissemsilt",
      "daira_name": "تيسمسيلت",
      "wilaya_code": "38",
      "wilaya_name_ascii": "Tissemsilt",
      "wilaya_name": "تيسمسيلت",
      "centers": [
        {
          "center_id": 382101,
          "name": "Agence de Tissemsilt [Yalidine]",
          "address": "Rue Bouis Ali Num 33  B Section 067 Groupe De Propriete 048",
          "gps": "35.60941808703387,1.8098678288304073",
          "commune_id": 3821,
          "commune_name": "Tissemsilt",
          "wilaya_id": 38,
          "wilaya_name": "Tissemsilt"
        }
      ]
    },
    "1277": {
      "id": 1277,
      "commune_name_ascii": "Youssoufia",
      "commune_name": "اليوسفية",
      "daira_name_ascii": "Bordj Emir Abdelkader",
      "daira_name": "برج الأمير عبد القادر",
      "wilaya_code": "38",
      "wilaya_name_ascii": "Tissemsilt",
      "wilaya_name": "تيسمسيلت",
      "centers": []
    },
    "1278": {
      "id": 1278,
      "commune_name_ascii": "Bayadha",
      "commune_name": "البياضة",
      "daira_name_ascii": "Bayadha",
      "daira_name": "البياضة",
      "wilaya_code": "39",
      "wilaya_name_ascii": "El Oued",
      "wilaya_name": "الوادي",
      "centers": []
    },
    "1279": {
      "id": 1279,
      "commune_name_ascii": "Ben Guecha",
      "commune_name": "بن  قشة",
      "daira_name_ascii": "Taleb Larbi",
      "daira_name": "الطالب العربي",
      "wilaya_code": "39",
      "wilaya_name_ascii": "El Oued",
      "wilaya_name": "الوادي",
      "centers": []
    },
    "1280": {
      "id": 1280,
      "commune_name_ascii": "Debila",
      "commune_name": "الدبيلة",
      "daira_name_ascii": "Debila",
      "daira_name": "الدبيلة",
      "wilaya_code": "39",
      "wilaya_name_ascii": "El Oued",
      "wilaya_name": "الوادي",
      "centers": []
    },
    "1281": {
      "id": 1281,
      "commune_name_ascii": "Djamaa",
      "commune_name": "جامعة",
      "daira_name_ascii": "Djamaa",
      "daira_name": "جامعة",
      "wilaya_code": "57",
      "wilaya_name_ascii": "El Meghaier",
      "wilaya_name": "المغير",
      "centers": [
        {
          "center_id": 572801,
          "name": "Agence de Djamaa [Guepex]",
          "address": "Cite Essalam (A Cote Du Clinique Douaa)",
          "gps": "33.53384327436235,5.983139975719593",
          "commune_id": 5728,
          "commune_name": "Djamaa",
          "wilaya_id": 57,
          "wilaya_name": "El M'Ghair"
        }
      ]
    },
    "1282": {
      "id": 1282,
      "commune_name_ascii": "Douar El Maa",
      "commune_name": "دوار الماء",
      "daira_name_ascii": "Taleb Larbi",
      "daira_name": "الطالب العربي",
      "wilaya_code": "39",
      "wilaya_name_ascii": "El Oued",
      "wilaya_name": "الوادي",
      "centers": []
    },
    "1283": {
      "id": 1283,
      "commune_name_ascii": "El Ogla",
      "commune_name": "العقلة",
      "daira_name_ascii": "Robbah",
      "daira_name": "الرباح",
      "wilaya_code": "39",
      "wilaya_name_ascii": "El Oued",
      "wilaya_name": "الوادي",
      "centers": []
    },
    "1284": {
      "id": 1284,
      "commune_name_ascii": "El-M'ghaier",
      "commune_name": "المغير",
      "daira_name_ascii": "El Meghaier",
      "daira_name": "المغير",
      "wilaya_code": "57",
      "wilaya_name_ascii": "El Meghaier",
      "wilaya_name": "المغير",
      "centers": [
        {
          "center_id": 572701,
          "name": "Agence de El M'Ghair [Yalidine]",
          "address": "Lotissement 360 Logements Nouvelle Zone Urbaine",
          "gps": "33.95575864498291,5.908902723517538",
          "commune_id": 5727,
          "commune_name": "El M'Ghair",
          "wilaya_id": 57,
          "wilaya_name": "El M'Ghair"
        }
      ]
    },
    "1285": {
      "id": 1285,
      "commune_name_ascii": "El-Oued",
      "commune_name": "الوادي",
      "daira_name_ascii": "El Oued",
      "daira_name": "الوادي",
      "wilaya_code": "39",
      "wilaya_name_ascii": "El Oued",
      "wilaya_name": "الوادي",
      "centers": []
    },
    "1286": {
      "id": 1286,
      "commune_name_ascii": "Guemar",
      "commune_name": "قمار",
      "daira_name_ascii": "Guemar",
      "daira_name": "قمار",
      "wilaya_code": "39",
      "wilaya_name_ascii": "El Oued",
      "wilaya_name": "الوادي",
      "centers": []
    },
    "1287": {
      "id": 1287,
      "commune_name_ascii": "Hamraia",
      "commune_name": "الحمراية",
      "daira_name_ascii": "Reguiba",
      "daira_name": "الرقيبة",
      "wilaya_code": "39",
      "wilaya_name_ascii": "El Oued",
      "wilaya_name": "الوادي",
      "centers": []
    },
    "1288": {
      "id": 1288,
      "commune_name_ascii": "Hassani Abdelkrim",
      "commune_name": "حساني عبد الكريم",
      "daira_name_ascii": "Debila",
      "daira_name": "الدبيلة",
      "wilaya_code": "39",
      "wilaya_name_ascii": "El Oued",
      "wilaya_name": "الوادي",
      "centers": []
    },
    "1289": {
      "id": 1289,
      "commune_name_ascii": "Hassi Khalifa",
      "commune_name": "حاسي خليفة",
      "daira_name_ascii": "Hassi Khalifa",
      "daira_name": "حاسي خليفة",
      "wilaya_code": "39",
      "wilaya_name_ascii": "El Oued",
      "wilaya_name": "الوادي",
      "centers": []
    },
    "1290": {
      "id": 1290,
      "commune_name_ascii": "Kouinine",
      "commune_name": "كوينين",
      "daira_name_ascii": "El Oued",
      "daira_name": "الوادي",
      "wilaya_code": "39",
      "wilaya_name_ascii": "El Oued",
      "wilaya_name": "الوادي",
      "centers": []
    },
    "1291": {
      "id": 1291,
      "commune_name_ascii": "Magrane",
      "commune_name": "المقرن",
      "daira_name_ascii": "Magrane",
      "daira_name": "المقرن",
      "wilaya_code": "39",
      "wilaya_name_ascii": "El Oued",
      "wilaya_name": "الوادي",
      "centers": []
    },
    "1292": {
      "id": 1292,
      "commune_name_ascii": "Mih Ouansa",
      "commune_name": "اميه وانسة",
      "daira_name_ascii": "Mih Ouensa",
      "daira_name": "اميه وانسة",
      "wilaya_code": "39",
      "wilaya_name_ascii": "El Oued",
      "wilaya_name": "الوادي",
      "centers": []
    },
    "1293": {
      "id": 1293,
      "commune_name_ascii": "M'rara",
      "commune_name": "المرارة",
      "daira_name_ascii": "Djamaa",
      "daira_name": "جامعة",
      "wilaya_code": "57",
      "wilaya_name_ascii": "El Meghaier",
      "wilaya_name": "المغير",
      "centers": []
    },
    "1294": {
      "id": 1294,
      "commune_name_ascii": "Nakhla",
      "commune_name": "النخلة",
      "daira_name_ascii": "Robbah",
      "daira_name": "الرباح",
      "wilaya_code": "39",
      "wilaya_name_ascii": "El Oued",
      "wilaya_name": "الوادي",
      "centers": []
    },
    "1295": {
      "id": 1295,
      "commune_name_ascii": "Oued El Alenda",
      "commune_name": "وادي العلندة",
      "daira_name_ascii": "Mih Ouensa",
      "daira_name": "اميه وانسة",
      "wilaya_code": "39",
      "wilaya_name_ascii": "El Oued",
      "wilaya_name": "الوادي",
      "centers": []
    },
    "1296": {
      "id": 1296,
      "commune_name_ascii": "Oum Touyour",
      "commune_name": "أم الطيور",
      "daira_name_ascii": "El Meghaier",
      "daira_name": "المغير",
      "wilaya_code": "57",
      "wilaya_name_ascii": "El Meghaier",
      "wilaya_name": "المغير",
      "centers": []
    },
    "1297": {
      "id": 1297,
      "commune_name_ascii": "Ourmes",
      "commune_name": "ورماس",
      "daira_name_ascii": "Guemar",
      "daira_name": "قمار",
      "wilaya_code": "39",
      "wilaya_name_ascii": "El Oued",
      "wilaya_name": "الوادي",
      "centers": []
    },
    "1298": {
      "id": 1298,
      "commune_name_ascii": "Reguiba",
      "commune_name": "الرقيبة",
      "daira_name_ascii": "Reguiba",
      "daira_name": "الرقيبة",
      "wilaya_code": "39",
      "wilaya_name_ascii": "El Oued",
      "wilaya_name": "الوادي",
      "centers": []
    },
    "1299": {
      "id": 1299,
      "commune_name_ascii": "Robbah",
      "commune_name": "الرباح",
      "daira_name_ascii": "Robbah",
      "daira_name": "الرباح",
      "wilaya_code": "39",
      "wilaya_name_ascii": "El Oued",
      "wilaya_name": "الوادي",
      "centers": []
    },
    "1300": {
      "id": 1300,
      "commune_name_ascii": "Sidi Amrane",
      "commune_name": "سيدي عمران",
      "daira_name_ascii": "Djamaa",
      "daira_name": "جامعة",
      "wilaya_code": "57",
      "wilaya_name_ascii": "El Meghaier",
      "wilaya_name": "المغير",
      "centers": []
    },
    "1301": {
      "id": 1301,
      "commune_name_ascii": "Sidi Aoun",
      "commune_name": "سيدي عون",
      "daira_name_ascii": "Magrane",
      "daira_name": "المقرن",
      "wilaya_code": "39",
      "wilaya_name_ascii": "El Oued",
      "wilaya_name": "الوادي",
      "centers": []
    },
    "1302": {
      "id": 1302,
      "commune_name_ascii": "Sidi Khelil",
      "commune_name": "سيدي خليل",
      "daira_name_ascii": "El Meghaier",
      "daira_name": "المغير",
      "wilaya_code": "57",
      "wilaya_name_ascii": "El Meghaier",
      "wilaya_name": "المغير",
      "centers": []
    },
    "1303": {
      "id": 1303,
      "commune_name_ascii": "Still",
      "commune_name": "سطيل",
      "daira_name_ascii": "El Meghaier",
      "daira_name": "المغير",
      "wilaya_code": "57",
      "wilaya_name_ascii": "El Meghaier",
      "wilaya_name": "المغير",
      "centers": []
    },
    "1304": {
      "id": 1304,
      "commune_name_ascii": "Taghzout",
      "commune_name": "تغزوت",
      "daira_name_ascii": "Guemar",
      "daira_name": "قمار",
      "wilaya_code": "39",
      "wilaya_name_ascii": "El Oued",
      "wilaya_name": "الوادي",
      "centers": []
    },
    "1305": {
      "id": 1305,
      "commune_name_ascii": "Taleb Larbi",
      "commune_name": "الطالب العربي",
      "daira_name_ascii": "Taleb Larbi",
      "daira_name": "الطالب العربي",
      "wilaya_code": "39",
      "wilaya_name_ascii": "El Oued",
      "wilaya_name": "الوادي",
      "centers": []
    },
    "1306": {
      "id": 1306,
      "commune_name_ascii": "Tenedla",
      "commune_name": "تندلة",
      "daira_name_ascii": "Djamaa",
      "daira_name": "جامعة",
      "wilaya_code": "57",
      "wilaya_name_ascii": "El Meghaier",
      "wilaya_name": "المغير",
      "centers": []
    },
    "1307": {
      "id": 1307,
      "commune_name_ascii": "Trifaoui",
      "commune_name": "الطريفاوي",
      "daira_name_ascii": "Hassi Khalifa",
      "daira_name": "حاسي خليفة",
      "wilaya_code": "39",
      "wilaya_name_ascii": "El Oued",
      "wilaya_name": "الوادي",
      "centers": []
    },
    "1308": {
      "id": 1308,
      "commune_name_ascii": "Ain Touila",
      "commune_name": "عين الطويلة",
      "daira_name_ascii": "Ain Touila",
      "daira_name": "عين الطويلة",
      "wilaya_code": "40",
      "wilaya_name_ascii": "Khenchela",
      "wilaya_name": "خنشلة",
      "centers": []
    },
    "1309": {
      "id": 1309,
      "commune_name_ascii": "Babar",
      "commune_name": "بابار",
      "daira_name_ascii": "Babar",
      "daira_name": "بابار",
      "wilaya_code": "40",
      "wilaya_name_ascii": "Khenchela",
      "wilaya_name": "خنشلة",
      "centers": []
    },
    "1310": {
      "id": 1310,
      "commune_name_ascii": "Baghai",
      "commune_name": "بغاي",
      "daira_name_ascii": "El Hamma",
      "daira_name": "الحامة",
      "wilaya_code": "40",
      "wilaya_name_ascii": "Khenchela",
      "wilaya_name": "خنشلة",
      "centers": []
    },
    "1311": {
      "id": 1311,
      "commune_name_ascii": "Bouhmama",
      "commune_name": "بوحمامة",
      "daira_name_ascii": "Bouhmama",
      "daira_name": "بوحمامة",
      "wilaya_code": "40",
      "wilaya_name_ascii": "Khenchela",
      "wilaya_name": "خنشلة",
      "centers": []
    },
    "1312": {
      "id": 1312,
      "commune_name_ascii": "Chechar",
      "commune_name": "ششار",
      "daira_name_ascii": "Chechar",
      "daira_name": "ششار",
      "wilaya_code": "40",
      "wilaya_name_ascii": "Khenchela",
      "wilaya_name": "خنشلة",
      "centers": []
    },
    "1313": {
      "id": 1313,
      "commune_name_ascii": "Chelia",
      "commune_name": "شلية",
      "daira_name_ascii": "Bouhmama",
      "daira_name": "بوحمامة",
      "wilaya_code": "40",
      "wilaya_name_ascii": "Khenchela",
      "wilaya_name": "خنشلة",
      "centers": []
    },
    "1314": {
      "id": 1314,
      "commune_name_ascii": "Djellal",
      "commune_name": "جلال",
      "daira_name_ascii": "Chechar",
      "daira_name": "ششار",
      "wilaya_code": "40",
      "wilaya_name_ascii": "Khenchela",
      "wilaya_name": "خنشلة",
      "centers": []
    },
    "1315": {
      "id": 1315,
      "commune_name_ascii": "El Hamma",
      "commune_name": "الحامة",
      "daira_name_ascii": "El Hamma",
      "daira_name": "الحامة",
      "wilaya_code": "40",
      "wilaya_name_ascii": "Khenchela",
      "wilaya_name": "خنشلة",
      "centers": []
    },
    "1316": {
      "id": 1316,
      "commune_name_ascii": "El Mahmal",
      "commune_name": "المحمل",
      "daira_name_ascii": "Ouled Rechache",
      "daira_name": "أولاد رشاش",
      "wilaya_code": "40",
      "wilaya_name_ascii": "Khenchela",
      "wilaya_name": "خنشلة",
      "centers": []
    },
    "1317": {
      "id": 1317,
      "commune_name_ascii": "El Oueldja",
      "commune_name": "الولجة",
      "daira_name_ascii": "Chechar",
      "daira_name": "ششار",
      "wilaya_code": "40",
      "wilaya_name_ascii": "Khenchela",
      "wilaya_name": "خنشلة",
      "centers": []
    },
    "1318": {
      "id": 1318,
      "commune_name_ascii": "Ensigha",
      "commune_name": "انسيغة",
      "daira_name_ascii": "El Hamma",
      "daira_name": "الحامة",
      "wilaya_code": "40",
      "wilaya_name_ascii": "Khenchela",
      "wilaya_name": "خنشلة",
      "centers": []
    },
    "1319": {
      "id": 1319,
      "commune_name_ascii": "Kais",
      "commune_name": "قايس",
      "daira_name_ascii": "Kais",
      "daira_name": "قايس",
      "wilaya_code": "40",
      "wilaya_name_ascii": "Khenchela",
      "wilaya_name": "خنشلة",
      "centers": []
    },
    "1320": {
      "id": 1320,
      "commune_name_ascii": "Khenchela",
      "commune_name": "خنشلة",
      "daira_name_ascii": "Khenchela",
      "daira_name": "خنشلة",
      "wilaya_code": "40",
      "wilaya_name_ascii": "Khenchela",
      "wilaya_name": "خنشلة",
      "centers": [
        {
          "center_id": 401301,
          "name": "Centre de tri Khenchela [Yalidine]",
          "address": "Cite Du 1Er Novembre Route Des Poids Lourds (En Face Sonelgaz)",
          "gps": "35.43063810424386,7.1375864753864935",
          "commune_id": 4013,
          "commune_name": "Khenchela",
          "wilaya_id": 40,
          "wilaya_name": "Khenchela"
        },
        {
          "center_id": 401302,
          "name": "Agence route de Meskiana [Yalidine]",
          "address": "Route de Meskiana N°30 lot 66 Khenchela",
          "gps": "35.43154087131633,7.150444186509847",
          "commune_id": 4013,
          "commune_name": "Khenchela",
          "wilaya_id": 40,
          "wilaya_name": "Khenchela"
        }
      ]
    },
    "1321": {
      "id": 1321,
      "commune_name_ascii": "Khirane",
      "commune_name": "خيران",
      "daira_name_ascii": "Chechar",
      "daira_name": "ششار",
      "wilaya_code": "40",
      "wilaya_name_ascii": "Khenchela",
      "wilaya_name": "خنشلة",
      "centers": []
    },
    "1322": {
      "id": 1322,
      "commune_name_ascii": "M'sara",
      "commune_name": "مصارة",
      "daira_name_ascii": "Bouhmama",
      "daira_name": "بوحمامة",
      "wilaya_code": "40",
      "wilaya_name_ascii": "Khenchela",
      "wilaya_name": "خنشلة",
      "centers": []
    },
    "1323": {
      "id": 1323,
      "commune_name_ascii": "M'toussa",
      "commune_name": "متوسة",
      "daira_name_ascii": "Ain Touila",
      "daira_name": "عين الطويلة",
      "wilaya_code": "40",
      "wilaya_name_ascii": "Khenchela",
      "wilaya_name": "خنشلة",
      "centers": []
    },
    "1324": {
      "id": 1324,
      "commune_name_ascii": "Ouled Rechache",
      "commune_name": "أولاد رشاش",
      "daira_name_ascii": "Ouled Rechache",
      "daira_name": "أولاد رشاش",
      "wilaya_code": "40",
      "wilaya_name_ascii": "Khenchela",
      "wilaya_name": "خنشلة",
      "centers": []
    },
    "1325": {
      "id": 1325,
      "commune_name_ascii": "Remila",
      "commune_name": "الرميلة",
      "daira_name_ascii": "Kais",
      "daira_name": "قايس",
      "wilaya_code": "40",
      "wilaya_name_ascii": "Khenchela",
      "wilaya_name": "خنشلة",
      "centers": []
    },
    "1326": {
      "id": 1326,
      "commune_name_ascii": "Tamza",
      "commune_name": "طامزة",
      "daira_name_ascii": "El Hamma",
      "daira_name": "الحامة",
      "wilaya_code": "40",
      "wilaya_name_ascii": "Khenchela",
      "wilaya_name": "خنشلة",
      "centers": []
    },
    "1327": {
      "id": 1327,
      "commune_name_ascii": "Taouzianat",
      "commune_name": "تاوزيانت",
      "daira_name_ascii": "Kais",
      "daira_name": "قايس",
      "wilaya_code": "40",
      "wilaya_name_ascii": "Khenchela",
      "wilaya_name": "خنشلة",
      "centers": []
    },
    "1328": {
      "id": 1328,
      "commune_name_ascii": "Yabous",
      "commune_name": "يابوس",
      "daira_name_ascii": "Bouhmama",
      "daira_name": "بوحمامة",
      "wilaya_code": "40",
      "wilaya_name_ascii": "Khenchela",
      "wilaya_name": "خنشلة",
      "centers": []
    },
    "1329": {
      "id": 1329,
      "commune_name_ascii": "Ain Soltane",
      "commune_name": "عين سلطان",
      "daira_name_ascii": "Sedrata",
      "daira_name": "سدراتة",
      "wilaya_code": "41",
      "wilaya_name_ascii": "Souk Ahras",
      "wilaya_name": "سوق أهراس",
      "centers": []
    },
    "1330": {
      "id": 1330,
      "commune_name_ascii": "Ain Zana",
      "commune_name": "عين الزانة",
      "daira_name_ascii": "Ouled Driss",
      "daira_name": "أولاد إدريس",
      "wilaya_code": "41",
      "wilaya_name_ascii": "Souk Ahras",
      "wilaya_name": "سوق أهراس",
      "centers": []
    },
    "1331": {
      "id": 1331,
      "commune_name_ascii": "Bir Bouhouche",
      "commune_name": "بئر بوحوش",
      "daira_name_ascii": "Bir Bouhouche",
      "daira_name": "بئر بوحوش",
      "wilaya_code": "41",
      "wilaya_name_ascii": "Souk Ahras",
      "wilaya_name": "سوق أهراس",
      "centers": []
    },
    "1332": {
      "id": 1332,
      "commune_name_ascii": "Drea",
      "commune_name": "الدريعة",
      "daira_name_ascii": "Taoura",
      "daira_name": "تاورة",
      "wilaya_code": "41",
      "wilaya_name_ascii": "Souk Ahras",
      "wilaya_name": "سوق أهراس",
      "centers": []
    },
    "1333": {
      "id": 1333,
      "commune_name_ascii": "Haddada",
      "commune_name": "الحدادة",
      "daira_name_ascii": "Haddada",
      "daira_name": "الحدادة",
      "wilaya_code": "41",
      "wilaya_name_ascii": "Souk Ahras",
      "wilaya_name": "سوق أهراس",
      "centers": []
    },
    "1334": {
      "id": 1334,
      "commune_name_ascii": "Hanencha",
      "commune_name": "الحنانشة",
      "daira_name_ascii": "Mechroha",
      "daira_name": "المشروحة",
      "wilaya_code": "41",
      "wilaya_name_ascii": "Souk Ahras",
      "wilaya_name": "سوق أهراس",
      "centers": []
    },
    "1335": {
      "id": 1335,
      "commune_name_ascii": "Khedara",
      "commune_name": "الخضارة",
      "daira_name_ascii": "Haddada",
      "daira_name": "الحدادة",
      "wilaya_code": "41",
      "wilaya_name_ascii": "Souk Ahras",
      "wilaya_name": "سوق أهراس",
      "centers": []
    },
    "1336": {
      "id": 1336,
      "commune_name_ascii": "Khemissa",
      "commune_name": "خميسة",
      "daira_name_ascii": "Sedrata",
      "daira_name": "سدراتة",
      "wilaya_code": "41",
      "wilaya_name_ascii": "Souk Ahras",
      "wilaya_name": "سوق أهراس",
      "centers": []
    },
    "1337": {
      "id": 1337,
      "commune_name_ascii": "Machroha",
      "commune_name": "المشروحة",
      "daira_name_ascii": "Mechroha",
      "daira_name": "المشروحة",
      "wilaya_code": "41",
      "wilaya_name_ascii": "Souk Ahras",
      "wilaya_name": "سوق أهراس",
      "centers": []
    },
    "1338": {
      "id": 1338,
      "commune_name_ascii": "M'daourouche",
      "commune_name": "مداوروش",
      "daira_name_ascii": "M'daourouche",
      "daira_name": "مداوروش",
      "wilaya_code": "41",
      "wilaya_name_ascii": "Souk Ahras",
      "wilaya_name": "سوق أهراس",
      "centers": []
    },
    "1339": {
      "id": 1339,
      "commune_name_ascii": "Merahna",
      "commune_name": "المراهنة",
      "daira_name_ascii": "Merahna",
      "daira_name": "المراهنة",
      "wilaya_code": "41",
      "wilaya_name_ascii": "Souk Ahras",
      "wilaya_name": "سوق أهراس",
      "centers": []
    },
    "1340": {
      "id": 1340,
      "commune_name_ascii": "Oued Kebrit",
      "commune_name": "وادي الكبريت",
      "daira_name_ascii": "Oum El Adhaim",
      "daira_name": "أم العظايم",
      "wilaya_code": "41",
      "wilaya_name_ascii": "Souk Ahras",
      "wilaya_name": "سوق أهراس",
      "centers": []
    },
    "1341": {
      "id": 1341,
      "commune_name_ascii": "Ouled Driss",
      "commune_name": "أولاد إدريس",
      "daira_name_ascii": "Ouled Driss",
      "daira_name": "أولاد إدريس",
      "wilaya_code": "41",
      "wilaya_name_ascii": "Souk Ahras",
      "wilaya_name": "سوق أهراس",
      "centers": []
    },
    "1342": {
      "id": 1342,
      "commune_name_ascii": "Ouled Moumen",
      "commune_name": "أولاد مومن",
      "daira_name_ascii": "Haddada",
      "daira_name": "الحدادة",
      "wilaya_code": "41",
      "wilaya_name_ascii": "Souk Ahras",
      "wilaya_name": "سوق أهراس",
      "centers": []
    },
    "1343": {
      "id": 1343,
      "commune_name_ascii": "Oum El Adhaim",
      "commune_name": "أم العظايم",
      "daira_name_ascii": "Oum El Adhaim",
      "daira_name": "أم العظايم",
      "wilaya_code": "41",
      "wilaya_name_ascii": "Souk Ahras",
      "wilaya_name": "سوق أهراس",
      "centers": []
    },
    "1344": {
      "id": 1344,
      "commune_name_ascii": "Ouillen",
      "commune_name": "ويلان",
      "daira_name_ascii": "Merahna",
      "daira_name": "المراهنة",
      "wilaya_code": "41",
      "wilaya_name_ascii": "Souk Ahras",
      "wilaya_name": "سوق أهراس",
      "centers": []
    },
    "1345": {
      "id": 1345,
      "commune_name_ascii": "Ragouba",
      "commune_name": "الراقوبة",
      "daira_name_ascii": "M'daourouche",
      "daira_name": "مداوروش",
      "wilaya_code": "41",
      "wilaya_name_ascii": "Souk Ahras",
      "wilaya_name": "سوق أهراس",
      "centers": []
    },
    "1346": {
      "id": 1346,
      "commune_name_ascii": "Safel El Ouiden",
      "commune_name": "سافل الويدان",
      "daira_name_ascii": "Bir Bouhouche",
      "daira_name": "بئر بوحوش",
      "wilaya_code": "41",
      "wilaya_name_ascii": "Souk Ahras",
      "wilaya_name": "سوق أهراس",
      "centers": []
    },
    "1347": {
      "id": 1347,
      "commune_name_ascii": "Sedrata",
      "commune_name": "سدراتة",
      "daira_name_ascii": "Sedrata",
      "daira_name": "سدراتة",
      "wilaya_code": "41",
      "wilaya_name_ascii": "Souk Ahras",
      "wilaya_name": "سوق أهراس",
      "centers": []
    },
    "1348": {
      "id": 1348,
      "commune_name_ascii": "Sidi Fredj",
      "commune_name": "سيدي فرج",
      "daira_name_ascii": "Merahna",
      "daira_name": "المراهنة",
      "wilaya_code": "41",
      "wilaya_name_ascii": "Souk Ahras",
      "wilaya_name": "سوق أهراس",
      "centers": []
    },
    "1349": {
      "id": 1349,
      "commune_name_ascii": "Souk Ahras",
      "commune_name": "سوق أهراس",
      "daira_name_ascii": "Souk Ahras",
      "daira_name": "سوق أهراس",
      "wilaya_code": "41",
      "wilaya_name_ascii": "Souk Ahras",
      "wilaya_name": "سوق أهراس",
      "centers": [
        {
          "center_id": 410101,
          "name": "Agence de Souk Ahras [Yalidine]",
          "address": "Cité El Louz Lot 64 (les amandiers)",
          "gps": "36.27400574751086, 7.954879870917144",
          "commune_id": 4101,
          "commune_name": "Souk Ahras",
          "wilaya_id": 41,
          "wilaya_name": "Souk Ahras"
        }
      ]
    },
    "1350": {
      "id": 1350,
      "commune_name_ascii": "Taoura",
      "commune_name": "تاورة",
      "daira_name_ascii": "Taoura",
      "daira_name": "تاورة",
      "wilaya_code": "41",
      "wilaya_name_ascii": "Souk Ahras",
      "wilaya_name": "سوق أهراس",
      "centers": []
    },
    "1351": {
      "id": 1351,
      "commune_name_ascii": "Terraguelt",
      "commune_name": "ترقالت",
      "daira_name_ascii": "Oum El Adhaim",
      "daira_name": "أم العظايم",
      "wilaya_code": "41",
      "wilaya_name_ascii": "Souk Ahras",
      "wilaya_name": "سوق أهراس",
      "centers": []
    },
    "1352": {
      "id": 1352,
      "commune_name_ascii": "Tiffech",
      "commune_name": "تيفاش",
      "daira_name_ascii": "M'daourouche",
      "daira_name": "مداوروش",
      "wilaya_code": "41",
      "wilaya_name_ascii": "Souk Ahras",
      "wilaya_name": "سوق أهراس",
      "centers": []
    },
    "1353": {
      "id": 1353,
      "commune_name_ascii": "Zaarouria",
      "commune_name": "الزعرورية",
      "daira_name_ascii": "Taoura",
      "daira_name": "تاورة",
      "wilaya_code": "41",
      "wilaya_name_ascii": "Souk Ahras",
      "wilaya_name": "سوق أهراس",
      "centers": []
    },
    "1354": {
      "id": 1354,
      "commune_name_ascii": "Zouabi",
      "commune_name": "الزوابي",
      "daira_name_ascii": "Bir Bouhouche",
      "daira_name": "بئر بوحوش",
      "wilaya_code": "41",
      "wilaya_name_ascii": "Souk Ahras",
      "wilaya_name": "سوق أهراس",
      "centers": []
    },
    "1355": {
      "id": 1355,
      "commune_name_ascii": "Aghbal",
      "commune_name": "أغبال",
      "daira_name_ascii": "Gouraya",
      "daira_name": "قوراية",
      "wilaya_code": "42",
      "wilaya_name_ascii": "Tipaza",
      "wilaya_name": "تيبازة",
      "centers": []
    },
    "1356": {
      "id": 1356,
      "commune_name_ascii": "Ahmer El Ain",
      "commune_name": "أحمر العين",
      "daira_name_ascii": "Ahmar El Ain",
      "daira_name": "أحمر العين",
      "wilaya_code": "42",
      "wilaya_name_ascii": "Tipaza",
      "wilaya_name": "تيبازة",
      "centers": []
    },
    "1357": {
      "id": 1357,
      "commune_name_ascii": "Ain Tagourait",
      "commune_name": "عين تاقورايت",
      "daira_name_ascii": "Bou Ismail",
      "daira_name": "بواسماعيل",
      "wilaya_code": "42",
      "wilaya_name_ascii": "Tipaza",
      "wilaya_name": "تيبازة",
      "centers": []
    },
    "1358": {
      "id": 1358,
      "commune_name_ascii": "Attatba",
      "commune_name": "الحطاطبة",
      "daira_name_ascii": "Kolea",
      "daira_name": "القليعة",
      "wilaya_code": "42",
      "wilaya_name_ascii": "Tipaza",
      "wilaya_name": "تيبازة",
      "centers": [
        
    {
      "center_id": 423501,
      "name": "agence De Kolea [GUEPEX]",
      "address": "N 03 Rue Mohamed addam",
      "gps": "36.63996315472693,2.7694844",
      "commune_id": 4235,
      "commune_name": "Koléa",
      "wilaya_id": 42,
      "wilaya_name": "Tipaza"
    }
      ]
    },
    "1359": {
      "id": 1359,
      "commune_name_ascii": "Beni Mileuk",
      "commune_name": "بني ميلك",
      "daira_name_ascii": "Damous",
      "daira_name": "الداموس",
      "wilaya_code": "42",
      "wilaya_name_ascii": "Tipaza",
      "wilaya_name": "تيبازة",
      "centers": []
    },
    "1360": {
      "id": 1360,
      "commune_name_ascii": "Bou Haroun",
      "commune_name": "بوهارون",
      "daira_name_ascii": "Bou Ismail",
      "daira_name": "بواسماعيل",
      "wilaya_code": "42",
      "wilaya_name_ascii": "Tipaza",
      "wilaya_name": "تيبازة",
      "centers": []
    },
    "1361": {
      "id": 1361,
      "commune_name_ascii": "Bou Ismail",
      "commune_name": "بواسماعيل",
      "daira_name_ascii": "Bou Ismail",
      "daira_name": "بواسماعيل",
      "wilaya_code": "42",
      "wilaya_name_ascii": "Tipaza",
      "wilaya_name": "تيبازة",
      "centers": []
    },
    "1362": {
      "id": 1362,
      "commune_name_ascii": "Bourkika",
      "commune_name": "بورقيقة",
      "daira_name_ascii": "Ahmar El Ain",
      "daira_name": "أحمر العين",
      "wilaya_code": "42",
      "wilaya_name_ascii": "Tipaza",
      "wilaya_name": "تيبازة",
      "centers": []
    },
    "1363": {
      "id": 1363,
      "commune_name_ascii": "Chaiba",
      "commune_name": "الشعيبة",
      "daira_name_ascii": "Kolea",
      "daira_name": "القليعة",
      "wilaya_code": "42",
      "wilaya_name_ascii": "Tipaza",
      "wilaya_name": "تيبازة",
      "centers": []
    },
    "1364": {
      "id": 1364,
      "commune_name_ascii": "Cherchell",
      "commune_name": "شرشال",
      "daira_name_ascii": "Cherchell",
      "daira_name": "شرشال",
      "wilaya_code": "42",
      "wilaya_name_ascii": "Tipaza",
      "wilaya_name": "تيبازة",
      "centers": [
        {
          "center_id": 422201,
          "name": "Agence Cherchell [Guepex]",
          "address": "N°05 Rue MELHANI ABDERRAHMAN ",
          "gps": "36.60585555938602,2.1906684576712783",
          "commune_id": 4222,
          "commune_name": "Cherchell",
          "wilaya_id": 42,
          "wilaya_name": "Tipaza"
        }
      ]
    },
    "1365": {
      "id": 1365,
      "commune_name_ascii": "Damous",
      "commune_name": "الداموس",
      "daira_name_ascii": "Damous",
      "daira_name": "الداموس",
      "wilaya_code": "42",
      "wilaya_name_ascii": "Tipaza",
      "wilaya_name": "تيبازة",
      "centers": []
    },
    "1366": {
      "id": 1366,
      "commune_name_ascii": "Douaouda",
      "commune_name": "دواودة",
      "daira_name_ascii": "Fouka",
      "daira_name": "فوكة",
      "wilaya_code": "42",
      "wilaya_name_ascii": "Tipaza",
      "wilaya_name": "تيبازة",
      "centers": []
    },
    "1367": {
      "id": 1367,
      "commune_name_ascii": "Fouka",
      "commune_name": "فوكة",
      "daira_name_ascii": "Fouka",
      "daira_name": "فوكة",
      "wilaya_code": "42",
      "wilaya_name_ascii": "Tipaza",
      "wilaya_name": "تيبازة",
      "centers": []
    },
    "1368": {
      "id": 1368,
      "commune_name_ascii": "Gouraya",
      "commune_name": "قوراية",
      "daira_name_ascii": "Gouraya",
      "daira_name": "قوراية",
      "wilaya_code": "42",
      "wilaya_name_ascii": "Tipaza",
      "wilaya_name": "تيبازة",
      "centers": []
    },
    "1369": {
      "id": 1369,
      "commune_name_ascii": "Hadjout",
      "commune_name": "حجوط",
      "daira_name_ascii": "Hadjout",
      "daira_name": "حجوط",
      "wilaya_code": "42",
      "wilaya_name_ascii": "Tipaza",
      "wilaya_name": "تيبازة",
      "centers": [
        {
          "center_id": 421201,
          "name": "Agence Hadjout [EasyAndspeed]",
          "address": "Rue de stade RDC Hadjout, Tipaza",
          "gps": "36.516211255024885,2.4099873153425557",
          "commune_id": 4212,
          "commune_name": "Hadjout",
          "wilaya_id": 42,
          "wilaya_name": "Tipaza"
        }
      ]
    },
    "1370": {
      "id": 1370,
      "commune_name_ascii": "Hadjret Ennous",
      "commune_name": "حجرة النص",
      "daira_name_ascii": "Cherchell",
      "daira_name": "شرشال",
      "wilaya_code": "42",
      "wilaya_name_ascii": "Tipaza",
      "wilaya_name": "تيبازة",
      "centers": []
    },
    "1371": {
      "id": 1371,
      "commune_name_ascii": "Khemisti",
      "commune_name": "خميستي",
      "daira_name_ascii": "Bou Ismail",
      "daira_name": "بواسماعيل",
      "wilaya_code": "42",
      "wilaya_name_ascii": "Tipaza",
      "wilaya_name": "تيبازة",
      "centers": []
    },
    "1372": {
      "id": 1372,
      "commune_name_ascii": "Kolea",
      "commune_name": "القليعة",
      "daira_name_ascii": "Kolea",
      "daira_name": "القليعة",
      "wilaya_code": "42",
      "wilaya_name_ascii": "Tipaza",
      "wilaya_name": "تيبازة",
      "centers": []
    },
    "1373": {
      "id": 1373,
      "commune_name_ascii": "Larhat",
      "commune_name": "الأرهاط",
      "daira_name_ascii": "Damous",
      "daira_name": "الداموس",
      "wilaya_code": "42",
      "wilaya_name_ascii": "Tipaza",
      "wilaya_name": "تيبازة",
      "centers": []
    },
    "1374": {
      "id": 1374,
      "commune_name_ascii": "Menaceur",
      "commune_name": "مناصر",
      "daira_name_ascii": "Sidi Amar",
      "daira_name": "سيدي أعمر",
      "wilaya_code": "42",
      "wilaya_name_ascii": "Tipaza",
      "wilaya_name": "تيبازة",
      "centers": []
    },
    "1375": {
      "id": 1375,
      "commune_name_ascii": "Merad",
      "commune_name": "مراد",
      "daira_name_ascii": "Hadjout",
      "daira_name": "حجوط",
      "wilaya_code": "42",
      "wilaya_name_ascii": "Tipaza",
      "wilaya_name": "تيبازة",
      "centers": []
    },
    "1376": {
      "id": 1376,
      "commune_name_ascii": "Messelmoun",
      "commune_name": "مسلمون",
      "daira_name_ascii": "Gouraya",
      "daira_name": "قوراية",
      "wilaya_code": "42",
      "wilaya_name_ascii": "Tipaza",
      "wilaya_name": "تيبازة",
      "centers": []
    },
    "1377": {
      "id": 1377,
      "commune_name_ascii": "Nador",
      "commune_name": "الناظور",
      "daira_name_ascii": "Sidi Amar",
      "daira_name": "سيدي أعمر",
      "wilaya_code": "42",
      "wilaya_name_ascii": "Tipaza",
      "wilaya_name": "تيبازة",
      "centers": []
    },
    "1378": {
      "id": 1378,
      "commune_name_ascii": "Sidi Ghiles",
      "commune_name": "سيدي غيلاس",
      "daira_name_ascii": "Cherchell",
      "daira_name": "شرشال",
      "wilaya_code": "42",
      "wilaya_name_ascii": "Tipaza",
      "wilaya_name": "تيبازة",
      "centers": []
    },
    "1379": {
      "id": 1379,
      "commune_name_ascii": "Sidi Rached",
      "commune_name": "سيدي راشد",
      "daira_name_ascii": "Ahmar El Ain",
      "daira_name": "أحمر العين",
      "wilaya_code": "42",
      "wilaya_name_ascii": "Tipaza",
      "wilaya_name": "تيبازة",
      "centers": []
    },
    "1380": {
      "id": 1380,
      "commune_name_ascii": "Sidi Semiane",
      "commune_name": "سيدي سميان",
      "daira_name_ascii": "Cherchell",
      "daira_name": "شرشال",
      "wilaya_code": "42",
      "wilaya_name_ascii": "Tipaza",
      "wilaya_name": "تيبازة",
      "centers": []
    },
    "1381": {
      "id": 1381,
      "commune_name_ascii": "Sidi-Amar",
      "commune_name": "سيدي عامر",
      "daira_name_ascii": "Sidi Amar",
      "daira_name": "سيدي أعمر",
      "wilaya_code": "42",
      "wilaya_name_ascii": "Tipaza",
      "wilaya_name": "تيبازة",
      "centers": []
    },
    "1382": {
      "id": 1382,
      "commune_name_ascii": "Tipaza",
      "commune_name": "تيبازة",
      "daira_name_ascii": "Tipaza",
      "daira_name": "تيبازة",
      "wilaya_code": "42",
      "wilaya_name_ascii": "Tipaza",
      "wilaya_name": "تيبازة",
      "centers": [
        {
          "center_id": 420101,
          "name": "Agence de Tipaza [Yalidine]",
          "address": "24 cite M'hamed Bougara (El Garari)",
          "gps": "36.5878925852878,2.439693415722701",
          "commune_id": 4201,
          "commune_name": "Tipaza",
          "wilaya_id": 42,
          "wilaya_name": "Tipaza"
        }
      ]
    },
    "1383": {
      "id": 1383,
      "commune_name_ascii": "Ahmed Rachedi",
      "commune_name": "أحمد راشدي",
      "daira_name_ascii": "Oued Endja",
      "daira_name": "وادي النجاء",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": []
    },
    "1384": {
      "id": 1384,
      "commune_name_ascii": "Ain Beida Harriche",
      "commune_name": " عين البيضاء أحريش",
      "daira_name_ascii": "Ain Beida Harriche",
      "daira_name": "عين البيضاء أحريش",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": []
    },
    "1385": {
      "id": 1385,
      "commune_name_ascii": "Ain Mellouk",
      "commune_name": "عين الملوك",
      "daira_name_ascii": "Chelghoum Laid",
      "daira_name": "شلغوم العيد",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": []
    },
    "1386": {
      "id": 1386,
      "commune_name_ascii": "Ain Tine",
      "commune_name": "عين التين",
      "daira_name_ascii": "Mila",
      "daira_name": "ميلة",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": []
    },
    "1387": {
      "id": 1387,
      "commune_name_ascii": "Amira Arres",
      "commune_name": "اعميرة اراس",
      "daira_name_ascii": "Terrai Bainen",
      "daira_name": "ترعي باينان",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": []
    },
    "1388": {
      "id": 1388,
      "commune_name_ascii": "Benyahia Abderrahmane",
      "commune_name": "بن يحي عبد الرحمن",
      "daira_name_ascii": "Tadjenanet",
      "daira_name": "تاجنانت",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": []
    },
    "1389": {
      "id": 1389,
      "commune_name_ascii": "Bouhatem",
      "commune_name": "بوحاتم",
      "daira_name_ascii": "Bouhatem",
      "daira_name": "بوحاتم",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": []
    },
    "1390": {
      "id": 1390,
      "commune_name_ascii": "Chelghoum Laid",
      "commune_name": "شلغوم العيد",
      "daira_name_ascii": "Chelghoum Laid",
      "daira_name": "شلغوم العيد",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": [
        {
          "center_id": 430801,
          "name": "Agence de Chelghoum Laid [Yalidine]",
          "address": "Rue 01 Novembre, A Côté D'Hôtel El Rhumel",
          "gps": "36.1590068466165,6.160283164642531",
          "commune_id": 4308,
          "commune_name": "Chelghoum Laid",
          "wilaya_id": 43,
          "wilaya_name": "Mila"
        }
      ]
    },
    "1391": {
      "id": 1391,
      "commune_name_ascii": "Chigara",
      "commune_name": "الشيقارة",
      "daira_name_ascii": "Sidi Merouane",
      "daira_name": "سيدي مروان",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": []
    },
    "1392": {
      "id": 1392,
      "commune_name_ascii": "Derrahi Bousselah",
      "commune_name": "دراحي بوصلاح",
      "daira_name_ascii": "Bouhatem",
      "daira_name": "بوحاتم",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": []
    },
    "1393": {
      "id": 1393,
      "commune_name_ascii": "El Ayadi Barbes",
      "commune_name": "العياضي برباس",
      "daira_name_ascii": "Ain Beida Harriche",
      "daira_name": "عين البيضاء أحريش",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": []
    },
    "1394": {
      "id": 1394,
      "commune_name_ascii": "El Mechira",
      "commune_name": "مشيرة",
      "daira_name_ascii": "Teleghma",
      "daira_name": "التلاغمة",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": []
    },
    "1395": {
      "id": 1395,
      "commune_name_ascii": "Ferdjioua",
      "commune_name": "فرجيوة",
      "daira_name_ascii": "Ferdjioua",
      "daira_name": "فرجيوة",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": []
    },
    "1396": {
      "id": 1396,
      "commune_name_ascii": "Grarem Gouga",
      "commune_name": "القرارم قوقة",
      "daira_name_ascii": "Grarem Gouga",
      "daira_name": "القرارم قوقة",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": []
    },
    "1397": {
      "id": 1397,
      "commune_name_ascii": "Hamala",
      "commune_name": "حمالة",
      "daira_name_ascii": "Grarem Gouga",
      "daira_name": "القرارم قوقة",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": []
    },
    "1398": {
      "id": 1398,
      "commune_name_ascii": "Mila",
      "commune_name": "ميلة",
      "daira_name_ascii": "Mila",
      "daira_name": "ميلة",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": [
        {
          "center_id": 431601,
          "name": "Agence de Mila [Yalidine]",
          "address": "Rue De Zerghia (A Coté Du Point De Vente Iris Et Gam Assurance)",
          "gps": "36.45296552261307,6.2564604692148205",
          "commune_id": 4316,
          "commune_name": "Mila",
          "wilaya_id": 43,
          "wilaya_name": "Mila"
        }
      ]
    },
    "1399": {
      "id": 1399,
      "commune_name_ascii": "Minar Zarza",
      "commune_name": "مينار زارزة",
      "daira_name_ascii": "Tassadane Haddada",
      "daira_name": "تسدان حدادة",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": []
    },
    "1400": {
      "id": 1400,
      "commune_name_ascii": "Oued Athmenia",
      "commune_name": "وادي العثمانية",
      "daira_name_ascii": "Chelghoum Laid",
      "daira_name": "شلغوم العيد",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": []
    },
    "1401": {
      "id": 1401,
      "commune_name_ascii": "Oued Endja",
      "commune_name": "وادي النجاء",
      "daira_name_ascii": "Oued Endja",
      "daira_name": "وادي النجاء",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": []
    },
    "1402": {
      "id": 1402,
      "commune_name_ascii": "Oued Seguen",
      "commune_name": "وادي سقان",
      "daira_name_ascii": "Teleghma",
      "daira_name": "التلاغمة",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": []
    },
    "1403": {
      "id": 1403,
      "commune_name_ascii": "Ouled Khalouf",
      "commune_name": "أولاد اخلوف",
      "daira_name_ascii": "Tadjenanet",
      "daira_name": "تاجنانت",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": []
    },
    "1404": {
      "id": 1404,
      "commune_name_ascii": "Rouached",
      "commune_name": "الرواشد",
      "daira_name_ascii": "Rouached",
      "daira_name": "الرواشد",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": []
    },
    "1405": {
      "id": 1405,
      "commune_name_ascii": "Sidi Khelifa",
      "commune_name": "سيدي خليفة",
      "daira_name_ascii": "Mila",
      "daira_name": "ميلة",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": []
    },
    "1406": {
      "id": 1406,
      "commune_name_ascii": "Sidi Merouane",
      "commune_name": "سيدي مروان",
      "daira_name_ascii": "Sidi Merouane",
      "daira_name": "سيدي مروان",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": []
    },
    "1407": {
      "id": 1407,
      "commune_name_ascii": "Tadjenanet",
      "commune_name": "تاجنانت",
      "daira_name_ascii": "Tadjenanet",
      "daira_name": "تاجنانت",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": []
    },
    "1408": {
      "id": 1408,
      "commune_name_ascii": "Tassadane Haddada",
      "commune_name": "تسدان حدادة",
      "daira_name_ascii": "Tassadane Haddada",
      "daira_name": "تسدان حدادة",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": []
    },
    "1409": {
      "id": 1409,
      "commune_name_ascii": "Teleghma",
      "commune_name": "التلاغمة",
      "daira_name_ascii": "Teleghma",
      "daira_name": "التلاغمة",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": []
    },
    "1410": {
      "id": 1410,
      "commune_name_ascii": "Terrai Bainen",
      "commune_name": "ترعي باينان",
      "daira_name_ascii": "Terrai Bainen",
      "daira_name": "ترعي باينان",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": []
    },
    "1411": {
      "id": 1411,
      "commune_name_ascii": "Tassala Lematai",
      "commune_name": "تسالة لمطاعي",
      "daira_name_ascii": "Terrai Bainen",
      "daira_name": "ترعي باينان",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": []
    },
    "1412": {
      "id": 1412,
      "commune_name_ascii": "Tiberguent",
      "commune_name": "تيبرقنت",
      "daira_name_ascii": "Rouached",
      "daira_name": "الرواشد",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": []
    },
    "1413": {
      "id": 1413,
      "commune_name_ascii": "Yahia Beniguecha",
      "commune_name": "يحي بني قشة",
      "daira_name_ascii": "Ferdjioua",
      "daira_name": "فرجيوة",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": []
    },
    "1414": {
      "id": 1414,
      "commune_name_ascii": "Zeghaia",
      "commune_name": "زغاية",
      "daira_name_ascii": "Oued Endja",
      "daira_name": "وادي النجاء",
      "wilaya_code": "43",
      "wilaya_name_ascii": "Mila",
      "wilaya_name": "ميلة",
      "centers": []
    },
    "1415": {
      "id": 1415,
      "commune_name_ascii": "Ain-Benian",
      "commune_name": "عين البنيان",
      "daira_name_ascii": "Hammam Righa",
      "daira_name": "حمام ريغة",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1416": {
      "id": 1416,
      "commune_name_ascii": "Ain-Bouyahia",
      "commune_name": "عين بويحيى",
      "daira_name_ascii": "El Abadia",
      "daira_name": "العبادية",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1417": {
      "id": 1417,
      "commune_name_ascii": "Ain-Defla",
      "commune_name": "عين الدفلى",
      "daira_name_ascii": "Ain Defla",
      "daira_name": "عين الدفلى",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": [
        {
          "center_id": 440101,
          "name": "Agence de Aïn Defla [Guepex]",
          "address": "Cite Khyat Mohammed (L’Arret De La Zone Industrielle En Face La Pompe d'essence)",
          "gps": "36.25140783716136,1.9415038000000007",
          "commune_id": 4401,
          "commune_name": "Aïn Defla",
          "wilaya_id": 44,
          "wilaya_name": "Aïn Defla"
        }
      ]
    },
    "1418": {
      "id": 1418,
      "commune_name_ascii": "Ain-Lechiakh",
      "commune_name": "عين الاشياخ",
      "daira_name_ascii": "Ain Lechiakh",
      "daira_name": "عين الاشياخ",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1419": {
      "id": 1419,
      "commune_name_ascii": "Ain-Soltane",
      "commune_name": "عين السلطان",
      "daira_name_ascii": "Ain Lechiakh",
      "daira_name": "عين الاشياخ",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1420": {
      "id": 1420,
      "commune_name_ascii": "Ain-Torki",
      "commune_name": "عين التركي",
      "daira_name_ascii": "Hammam Righa",
      "daira_name": "حمام ريغة",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1421": {
      "id": 1421,
      "commune_name_ascii": "Arib",
      "commune_name": "عريب",
      "daira_name_ascii": "El Amra",
      "daira_name": "العامرة",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1422": {
      "id": 1422,
      "commune_name_ascii": "Birbouche",
      "commune_name": "بربوش",
      "daira_name_ascii": "Djendel",
      "daira_name": "جندل",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1423": {
      "id": 1423,
      "commune_name_ascii": "Bathia",
      "commune_name": "بطحية",
      "daira_name_ascii": "Bathia",
      "daira_name": "بطحية",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1424": {
      "id": 1424,
      "commune_name_ascii": "Belaas",
      "commune_name": "بلعاص",
      "daira_name_ascii": "Bathia",
      "daira_name": "بطحية",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1425": {
      "id": 1425,
      "commune_name_ascii": "Ben Allal",
      "commune_name": "بن علال",
      "daira_name_ascii": "Miliana",
      "daira_name": "مليانة",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1426": {
      "id": 1426,
      "commune_name_ascii": "Bir-Ould-Khelifa",
      "commune_name": "بئر ولد خليفة",
      "daira_name_ascii": "Bordj El Emir Khaled",
      "daira_name": "برج الأمير خالد",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1427": {
      "id": 1427,
      "commune_name_ascii": "Bordj-Emir-Khaled",
      "commune_name": "برج الأمير خالد",
      "daira_name_ascii": "Bordj El Emir Khaled",
      "daira_name": "برج الأمير خالد",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1428": {
      "id": 1428,
      "commune_name_ascii": "Boumedfaa",
      "commune_name": "بومدفع",
      "daira_name_ascii": "Boumedfaa",
      "daira_name": "بومدفع",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1429": {
      "id": 1429,
      "commune_name_ascii": "Bourached",
      "commune_name": "بوراشد",
      "daira_name_ascii": "Djelida",
      "daira_name": "جليدة",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1430": {
      "id": 1430,
      "commune_name_ascii": "Djelida",
      "commune_name": "جليدة",
      "daira_name_ascii": "Djelida",
      "daira_name": "جليدة",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1431": {
      "id": 1431,
      "commune_name_ascii": "Djemaa Ouled Cheikh",
      "commune_name": "جمعة أولاد الشيخ",
      "daira_name_ascii": "Djelida",
      "daira_name": "جليدة",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1432": {
      "id": 1432,
      "commune_name_ascii": "Djendel",
      "commune_name": "جندل",
      "daira_name_ascii": "Djendel",
      "daira_name": "جندل",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1433": {
      "id": 1433,
      "commune_name_ascii": "El-Abadia",
      "commune_name": "العبادية",
      "daira_name_ascii": "El Abadia",
      "daira_name": "العبادية",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1434": {
      "id": 1434,
      "commune_name_ascii": "El-Amra",
      "commune_name": "العامرة",
      "daira_name_ascii": "El Amra",
      "daira_name": "العامرة",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1435": {
      "id": 1435,
      "commune_name_ascii": "El-Attaf",
      "commune_name": "العطاف",
      "daira_name_ascii": "El Attaf",
      "daira_name": "العطاف",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1436": {
      "id": 1436,
      "commune_name_ascii": "El-Maine",
      "commune_name": "الماين",
      "daira_name_ascii": "Rouina",
      "daira_name": "الروينة",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1437": {
      "id": 1437,
      "commune_name_ascii": "Hammam-Righa",
      "commune_name": "حمام ريغة",
      "daira_name_ascii": "Hammam Righa",
      "daira_name": "حمام ريغة",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1438": {
      "id": 1438,
      "commune_name_ascii": "Hassania",
      "commune_name": "الحسانية",
      "daira_name_ascii": "Bathia",
      "daira_name": "بطحية",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1439": {
      "id": 1439,
      "commune_name_ascii": "Hoceinia",
      "commune_name": "الحسينية",
      "daira_name_ascii": "Boumedfaa",
      "daira_name": "بومدفع",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1440": {
      "id": 1440,
      "commune_name_ascii": "Khemis-Miliana",
      "commune_name": "خميس مليانة",
      "daira_name_ascii": "Khemis",
      "daira_name": "خميس",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": [
        {
          "center_id": 442601,
          "name": "Agence de Khemis Miliana [Guepex]",
          "address": "Le Cote Ouest Du Quartier La Cadette Route Nationale",
          "gps": "36.26046455568064,2.202986246810656",
          "commune_id": 4426,
          "commune_name": "Khemis Miliana",
          "wilaya_id": 44,
          "wilaya_name": "Aïn Defla"
        }
      ]
    },
    "1441": {
      "id": 1441,
      "commune_name_ascii": "Mekhatria",
      "commune_name": "المخاطرية",
      "daira_name_ascii": "El Amra",
      "daira_name": "العامرة",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1442": {
      "id": 1442,
      "commune_name_ascii": "Miliana",
      "commune_name": "مليانة",
      "daira_name_ascii": "Miliana",
      "daira_name": "مليانة",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1443": {
      "id": 1443,
      "commune_name_ascii": "Oued Chorfa",
      "commune_name": "وادي الشرفاء",
      "daira_name_ascii": "Djendel",
      "daira_name": "جندل",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1444": {
      "id": 1444,
      "commune_name_ascii": "Oued Djemaa",
      "commune_name": "واد الجمعة",
      "daira_name_ascii": "Ain Lechiakh",
      "daira_name": "عين الاشياخ",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1445": {
      "id": 1445,
      "commune_name_ascii": "Rouina",
      "commune_name": "الروينة",
      "daira_name_ascii": "Rouina",
      "daira_name": "الروينة",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1446": {
      "id": 1446,
      "commune_name_ascii": "Sidi-Lakhdar",
      "commune_name": "سيدي الأخضر",
      "daira_name_ascii": "Khemis",
      "daira_name": "خميس",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1447": {
      "id": 1447,
      "commune_name_ascii": "Tacheta Zegagha",
      "commune_name": "تاشتة زقاغة",
      "daira_name_ascii": "El Abadia",
      "daira_name": "العبادية",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1448": {
      "id": 1448,
      "commune_name_ascii": "Tarik-Ibn-Ziad",
      "commune_name": "طارق بن زياد",
      "daira_name_ascii": "Bordj El Emir Khaled",
      "daira_name": "برج الأمير خالد",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1449": {
      "id": 1449,
      "commune_name_ascii": "Tiberkanine",
      "commune_name": "تبركانين",
      "daira_name_ascii": "El Attaf",
      "daira_name": "العطاف",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1450": {
      "id": 1450,
      "commune_name_ascii": "Zeddine",
      "commune_name": "زدين",
      "daira_name_ascii": "Rouina",
      "daira_name": "الروينة",
      "wilaya_code": "44",
      "wilaya_name_ascii": "Aïn Defla",
      "wilaya_name": "عين الدفلة",
      "centers": []
    },
    "1451": {
      "id": 1451,
      "commune_name_ascii": "Ain Ben Khelil",
      "commune_name": "عين بن خليل",
      "daira_name_ascii": "Mecheria",
      "daira_name": "المشرية",
      "wilaya_code": "45",
      "wilaya_name_ascii": "Naâma",
      "wilaya_name": "النعامة",
      "centers": []
    },
    "1452": {
      "id": 1452,
      "commune_name_ascii": "Ain Sefra",
      "commune_name": "عين الصفراء",
      "daira_name_ascii": "Ain Sefra",
      "daira_name": "عين الصفراء",
      "wilaya_code": "45",
      "wilaya_name_ascii": "Naâma",
      "wilaya_name": "النعامة",
      "centers": []
    },
    "1453": {
      "id": 1453,
      "commune_name_ascii": "Asla",
      "commune_name": "عسلة",
      "daira_name_ascii": "Asla",
      "daira_name": "عسلة",
      "wilaya_code": "45",
      "wilaya_name_ascii": "Naâma",
      "wilaya_name": "النعامة",
      "centers": []
    },
    "1454": {
      "id": 1454,
      "commune_name_ascii": "Djenienne Bourezg",
      "commune_name": "جنين بورزق",
      "daira_name_ascii": "Moghrar",
      "daira_name": "مغرار",
      "wilaya_code": "45",
      "wilaya_name_ascii": "Naâma",
      "wilaya_name": "النعامة",
      "centers": []
    },
    "1455": {
      "id": 1455,
      "commune_name_ascii": "El Biodh",
      "commune_name": "البيوض",
      "daira_name_ascii": "Mecheria",
      "daira_name": "المشرية",
      "wilaya_code": "45",
      "wilaya_name_ascii": "Naâma",
      "wilaya_name": "النعامة",
      "centers": []
    },
    "1456": {
      "id": 1456,
      "commune_name_ascii": "Kasdir",
      "commune_name": "القصدير",
      "daira_name_ascii": "Mekmen Ben Amar",
      "daira_name": "مكمن بن عمار",
      "wilaya_code": "45",
      "wilaya_name_ascii": "Naâma",
      "wilaya_name": "النعامة",
      "centers": []
    },
    "1457": {
      "id": 1457,
      "commune_name_ascii": "Makmen Ben Amar",
      "commune_name": "مكمن بن عمار",
      "daira_name_ascii": "Mekmen Ben Amar",
      "daira_name": "مكمن بن عمار",
      "wilaya_code": "45",
      "wilaya_name_ascii": "Naâma",
      "wilaya_name": "النعامة",
      "centers": []
    },
    "1458": {
      "id": 1458,
      "commune_name_ascii": "Mecheria",
      "commune_name": "المشرية",
      "daira_name_ascii": "Mecheria",
      "daira_name": "المشرية",
      "wilaya_code": "45",
      "wilaya_name_ascii": "Naâma",
      "wilaya_name": "النعامة",
      "centers": [
        {
          "center_id": 450201,
          "name": "Agence de Mecheria [Guepex]",
          "address": "Rue Abdellaoui Mohammed Cité Iben Badis  (Connue Hadj Taleb, Près De Pharmacie Abbad Amina Et École Primaire)",
          "gps": "33.54236058678445,-0.28489289145698227",
          "commune_id": 4502,
          "commune_name": "Mecheria",
          "wilaya_id": 45,
          "wilaya_name": "Naâma"
        }
      ]
    },
    "1459": {
      "id": 1459,
      "commune_name_ascii": "Moghrar",
      "commune_name": "مغرار",
      "daira_name_ascii": "Moghrar",
      "daira_name": "مغرار",
      "wilaya_code": "45",
      "wilaya_name_ascii": "Naâma",
      "wilaya_name": "النعامة",
      "centers": []
    },
    "1460": {
      "id": 1460,
      "commune_name_ascii": "Naama",
      "commune_name": "النعامة",
      "daira_name_ascii": "Naama",
      "daira_name": "النعامة",
      "wilaya_code": "45",
      "wilaya_name_ascii": "Naâma",
      "wilaya_name": "النعامة",
      "centers": []
    },
    "1461": {
      "id": 1461,
      "commune_name_ascii": "Sfissifa",
      "commune_name": "سفيسيفة",
      "daira_name_ascii": "Sfissifa",
      "daira_name": "سفيسيفة",
      "wilaya_code": "45",
      "wilaya_name_ascii": "Naâma",
      "wilaya_name": "النعامة",
      "centers": []
    },
    "1462": {
      "id": 1462,
      "commune_name_ascii": "Tiout",
      "commune_name": "تيوت",
      "daira_name_ascii": "Ain Sefra",
      "daira_name": "عين الصفراء",
      "wilaya_code": "45",
      "wilaya_name_ascii": "Naâma",
      "wilaya_name": "النعامة",
      "centers": []
    },
    "1463": {
      "id": 1463,
      "commune_name_ascii": "Aghlal",
      "commune_name": "أغلال",
      "daira_name_ascii": "Ain Kihel",
      "daira_name": "عين الكيحل",
      "wilaya_code": "46",
      "wilaya_name_ascii": "Aïn Témouchent",
      "wilaya_name": "عين تيموشنت",
      "centers": []
    },
    "1464": {
      "id": 1464,
      "commune_name_ascii": "Ain El Arbaa",
      "commune_name": "عين الأربعاء",
      "daira_name_ascii": "Ain Larbaa",
      "daira_name": "عين الأربعاء",
      "wilaya_code": "46",
      "wilaya_name_ascii": "Aïn Témouchent",
      "wilaya_name": "عين تيموشنت",
      "centers": []
    },
    "1465": {
      "id": 1465,
      "commune_name_ascii": "Ain Kihal",
      "commune_name": "عين الكيحل",
      "daira_name_ascii": "Ain Kihel",
      "daira_name": "عين الكيحل",
      "wilaya_code": "46",
      "wilaya_name_ascii": "Aïn Témouchent",
      "wilaya_name": "عين تيموشنت",
      "centers": []
    },
    "1466": {
      "id": 1466,
      "commune_name_ascii": "Ain Temouchent",
      "commune_name": "عين تموشنت",
      "daira_name_ascii": "Ain Temouchent",
      "daira_name": "عين تموشنت",
      "wilaya_code": "46",
      "wilaya_name_ascii": "Aïn Témouchent",
      "wilaya_name": "عين تيموشنت",
      "centers": [
        {
          "center_id": 460401,
          "name": "Agence de Aïn Témouchent [Yalidine]",
          "address": "Sonne n5/ n 605/ d 228 logements, Hai Zitoun (à coté de la nouvelle agence de transport)",
          "gps": "35.31160813323017, -1.1468406674238103",
          "commune_id": 4604,
          "commune_name": "Aïn Témouchent",
          "wilaya_id": 46,
          "wilaya_name": "Aïn Témouchent"
        }
      ]
    },
    "1467": {
      "id": 1467,
      "commune_name_ascii": "Ain Tolba",
      "commune_name": "عين الطلبة",
      "daira_name_ascii": "Ain Kihel",
      "daira_name": "عين الكيحل",
      "wilaya_code": "46",
      "wilaya_name_ascii": "Aïn Témouchent",
      "wilaya_name": "عين تيموشنت",
      "centers": []
    },
    "1468": {
      "id": 1468,
      "commune_name_ascii": "Aoubellil",
      "commune_name": "عقب الليل",
      "daira_name_ascii": "Ain Kihel",
      "daira_name": "عين الكيحل",
      "wilaya_code": "46",
      "wilaya_name_ascii": "Aïn Témouchent",
      "wilaya_name": "عين تيموشنت",
      "centers": []
    },
    "1469": {
      "id": 1469,
      "commune_name_ascii": "Beni Saf",
      "commune_name": "بني صاف",
      "daira_name_ascii": "Beni Saf",
      "daira_name": "بني صاف",
      "wilaya_code": "46",
      "wilaya_name_ascii": "Aïn Témouchent",
      "wilaya_name": "عين تيموشنت",
      "centers": [
        {
          "center_id": 460701,
          "name": "Agence de Beni Saf [Guepex]",
          "address": "Cité Sohbi, zone urbaine (en face de la pompe d'essence)",
          "gps": "35.30573507836949, -1.3524657019668493",
          "commune_id": 4607,
          "commune_name": "Beni Saf",
          "wilaya_id": 46,
          "wilaya_name": "Aïn Témouchent"
        }
      ]
    },
    "1470": {
      "id": 1470,
      "commune_name_ascii": "Bouzedjar",
      "commune_name": "بوزجار",
      "daira_name_ascii": "El Amria",
      "daira_name": "العامرية",
      "wilaya_code": "46",
      "wilaya_name_ascii": "Aïn Témouchent",
      "wilaya_name": "عين تيموشنت",
      "centers": []
    },
    "1471": {
      "id": 1471,
      "commune_name_ascii": "Chaabat El Ham",
      "commune_name": "شعبة اللحم",
      "daira_name_ascii": "El Maleh",
      "daira_name": "المالح",
      "wilaya_code": "46",
      "wilaya_name_ascii": "Aïn Témouchent",
      "wilaya_name": "عين تيموشنت",
      "centers": []
    },
    "1472": {
      "id": 1472,
      "commune_name_ascii": "Chentouf",
      "commune_name": "شنتوف",
      "daira_name_ascii": "Hammam Bou Hadjar",
      "daira_name": "حمام بوحجر",
      "wilaya_code": "46",
      "wilaya_name_ascii": "Aïn Témouchent",
      "wilaya_name": "عين تيموشنت",
      "centers": []
    },
    "1473": {
      "id": 1473,
      "commune_name_ascii": "El Amria",
      "commune_name": "العامرية",
      "daira_name_ascii": "El Amria",
      "daira_name": "العامرية",
      "wilaya_code": "46",
      "wilaya_name_ascii": "Aïn Témouchent",
      "wilaya_name": "عين تيموشنت",
      "centers": []
    },
    "1474": {
      "id": 1474,
      "commune_name_ascii": "El Maleh",
      "commune_name": "المالح",
      "daira_name_ascii": "El Maleh",
      "daira_name": "المالح",
      "wilaya_code": "46",
      "wilaya_name_ascii": "Aïn Témouchent",
      "wilaya_name": "عين تيموشنت",
      "centers": []
    },
    "1475": {
      "id": 1475,
      "commune_name_ascii": "El Messaid",
      "commune_name": "المساعيد",
      "daira_name_ascii": "El Amria",
      "daira_name": "العامرية",
      "wilaya_code": "46",
      "wilaya_name_ascii": "Aïn Témouchent",
      "wilaya_name": "عين تيموشنت",
      "centers": []
    },
    "1476": {
      "id": 1476,
      "commune_name_ascii": "Emir Abdelkader",
      "commune_name": "الأمير عبد القادر",
      "daira_name_ascii": "Beni Saf",
      "daira_name": "بني صاف",
      "wilaya_code": "46",
      "wilaya_name_ascii": "Aïn Témouchent",
      "wilaya_name": "عين تيموشنت",
      "centers": []
    },
    "1477": {
      "id": 1477,
      "commune_name_ascii": "Hammam Bou Hadjar",
      "commune_name": "حمام بوحجر",
      "daira_name_ascii": "Hammam Bou Hadjar",
      "daira_name": "حمام بوحجر",
      "wilaya_code": "46",
      "wilaya_name_ascii": "Aïn Témouchent",
      "wilaya_name": "عين تيموشنت",
      "centers": []
    },
    "1478": {
      "id": 1478,
      "commune_name_ascii": "Hassasna",
      "commune_name": "الحساسنة",
      "daira_name_ascii": "Hammam Bou Hadjar",
      "daira_name": "حمام بوحجر",
      "wilaya_code": "46",
      "wilaya_name_ascii": "Aïn Témouchent",
      "wilaya_name": "عين تيموشنت",
      "centers": []
    },
    "1479": {
      "id": 1479,
      "commune_name_ascii": "Hassi El Ghella",
      "commune_name": "حاسي الغلة",
      "daira_name_ascii": "El Amria",
      "daira_name": "العامرية",
      "wilaya_code": "46",
      "wilaya_name_ascii": "Aïn Témouchent",
      "wilaya_name": "عين تيموشنت",
      "centers": []
    },
    "1480": {
      "id": 1480,
      "commune_name_ascii": "Oued Berkeche",
      "commune_name": "وادي برقش",
      "daira_name_ascii": "Hammam Bou Hadjar",
      "daira_name": "حمام بوحجر",
      "wilaya_code": "46",
      "wilaya_name_ascii": "Aïn Témouchent",
      "wilaya_name": "عين تيموشنت",
      "centers": []
    },
    "1481": {
      "id": 1481,
      "commune_name_ascii": "Oued Sebbah",
      "commune_name": "وادي الصباح",
      "daira_name_ascii": "Ain Larbaa",
      "daira_name": "عين الأربعاء",
      "wilaya_code": "46",
      "wilaya_name_ascii": "Aïn Témouchent",
      "wilaya_name": "عين تيموشنت",
      "centers": []
    },
    "1482": {
      "id": 1482,
      "commune_name_ascii": "Ouled Boudjemaa",
      "commune_name": "أولاد بوجمعة",
      "daira_name_ascii": "El Amria",
      "daira_name": "العامرية",
      "wilaya_code": "46",
      "wilaya_name_ascii": "Aïn Témouchent",
      "wilaya_name": "عين تيموشنت",
      "centers": []
    },
    "1483": {
      "id": 1483,
      "commune_name_ascii": "Ouled Kihal",
      "commune_name": "أولاد الكيحل",
      "daira_name_ascii": "El Maleh",
      "daira_name": "المالح",
      "wilaya_code": "46",
      "wilaya_name_ascii": "Aïn Témouchent",
      "wilaya_name": "عين تيموشنت",
      "centers": []
    },
    "1484": {
      "id": 1484,
      "commune_name_ascii": "Oulhaca El Gheraba",
      "commune_name": "ولهاصة الغرابة",
      "daira_name_ascii": "Oulhassa Gheraba",
      "daira_name": "ولهاصة الغرابة",
      "wilaya_code": "46",
      "wilaya_name_ascii": "Aïn Témouchent",
      "wilaya_name": "عين تيموشنت",
      "centers": []
    },
    "1485": {
      "id": 1485,
      "commune_name_ascii": "Sidi Ben Adda",
      "commune_name": "سيدي بن عدة",
      "daira_name_ascii": "Ain Temouchent",
      "daira_name": "عين تموشنت",
      "wilaya_code": "46",
      "wilaya_name_ascii": "Aïn Témouchent",
      "wilaya_name": "عين تيموشنت",
      "centers": []
    },
    "1486": {
      "id": 1486,
      "commune_name_ascii": "Sidi Boumediene",
      "commune_name": "سيدي بومدين",
      "daira_name_ascii": "Ain Larbaa",
      "daira_name": "عين الأربعاء",
      "wilaya_code": "46",
      "wilaya_name_ascii": "Aïn Témouchent",
      "wilaya_name": "عين تيموشنت",
      "centers": []
    },
    "1487": {
      "id": 1487,
      "commune_name_ascii": "Sidi Ouriache",
      "commune_name": "سيدي ورياش",
      "daira_name_ascii": "Oulhassa Gheraba",
      "daira_name": "ولهاصة الغرابة",
      "wilaya_code": "46",
      "wilaya_name_ascii": "Aïn Témouchent",
      "wilaya_name": "عين تيموشنت",
      "centers": []
    },
    "1488": {
      "id": 1488,
      "commune_name_ascii": "Sidi Safi",
      "commune_name": "سيدي صافي",
      "daira_name_ascii": "Beni Saf",
      "daira_name": "بني صاف",
      "wilaya_code": "46",
      "wilaya_name_ascii": "Aïn Témouchent",
      "wilaya_name": "عين تيموشنت",
      "centers": []
    },
    "1489": {
      "id": 1489,
      "commune_name_ascii": "Tamzoura",
      "commune_name": "تامزورة",
      "daira_name_ascii": "Ain Larbaa",
      "daira_name": "عين الأربعاء",
      "wilaya_code": "46",
      "wilaya_name_ascii": "Aïn Témouchent",
      "wilaya_name": "عين تيموشنت",
      "centers": []
    },
    "1490": {
      "id": 1490,
      "commune_name_ascii": "Terga",
      "commune_name": "تارقة",
      "daira_name_ascii": "El Maleh",
      "daira_name": "المالح",
      "wilaya_code": "46",
      "wilaya_name_ascii": "Aïn Témouchent",
      "wilaya_name": "عين تيموشنت",
      "centers": []
    },
    "1491": {
      "id": 1491,
      "commune_name_ascii": "Berriane",
      "commune_name": "بريان",
      "daira_name_ascii": "Berriane",
      "daira_name": "بريان",
      "wilaya_code": "47",
      "wilaya_name_ascii": "Ghardaïa",
      "wilaya_name": "غرداية",
      "centers": []
    },
    "1492": {
      "id": 1492,
      "commune_name_ascii": "Bounoura",
      "commune_name": "بونورة",
      "daira_name_ascii": "Bounoura",
      "daira_name": "بونورة",
      "wilaya_code": "47",
      "wilaya_name_ascii": "Ghardaïa",
      "wilaya_name": "غرداية",
      "centers": []
    },
    "1493": {
      "id": 1493,
      "commune_name_ascii": "Dhayet Bendhahoua",
      "commune_name": "ضاية بن ضحوة",
      "daira_name_ascii": "Dhayet Ben Dhahoua",
      "daira_name": "ضاية بن ضحوة",
      "wilaya_code": "47",
      "wilaya_name_ascii": "Ghardaïa",
      "wilaya_name": "غرداية",
      "centers": []
    },
    "1494": {
      "id": 1494,
      "commune_name_ascii": "El Atteuf",
      "commune_name": "العطف",
      "daira_name_ascii": "Bounoura",
      "daira_name": "بونورة",
      "wilaya_code": "47",
      "wilaya_name_ascii": "Ghardaïa",
      "wilaya_name": "غرداية",
      "centers": []
    },
    "1495": {
      "id": 1495,
      "commune_name_ascii": "El Meniaa",
      "commune_name": "المنيعة",
      "daira_name_ascii": "El Menia",
      "daira_name": "المنيعة",
      "wilaya_code": "58",
      "wilaya_name_ascii": "El Menia",
      "wilaya_name": "المنيعة",
      "centers": [
        {
          "center_id": 580601,
          "name": "Agence de El Menia [Yalidine]",
          "address": "Route Unite Africaine",
          "gps": "30.578857742061352,2.8802528030169148",
          "commune_id": 5806,
          "commune_name": "El Menia",
          "wilaya_id": 58,
          "wilaya_name": "El Menia"
        }
      ]
    },
    "1496": {
      "id": 1496,
      "commune_name_ascii": "Ghardaia",
      "commune_name": "غرداية",
      "daira_name_ascii": "Ghardaia",
      "daira_name": "غرداية",
      "wilaya_code": "47",
      "wilaya_name_ascii": "Ghardaïa",
      "wilaya_name": "غرداية",
      "centers": [
        {
          "center_id": 470701,
          "name": "Agence de Ghardaïa [Guepex]",
          "address": "Cité Djamel Bouhraoua (en face palais des expositions)",
          "gps": "32.51422379314845, 3.680928631621788",
          "commune_id": 4707,
          "commune_name": "Ghardaïa",
          "wilaya_id": 47,
          "wilaya_name": "Ghardaïa"
        },
        {
          "center_id": 470702,
          "name": "Agence de Bouhraoua [Yalidine]",
          "address": "Bouhraoua (en face centre d'exposition)",
          "gps": "32.518556971150865, 3.6696240790628734",
          "commune_id": 4707,
          "commune_name": "Ghardaïa",
          "wilaya_id": 47,
          "wilaya_name": "Ghardaïa"
        }
      ]
    },
    "1497": {
      "id": 1497,
      "commune_name_ascii": "El Guerrara",
      "commune_name": "القرارة",
      "daira_name_ascii": "El Guerrara",
      "daira_name": "القرارة",
      "wilaya_code": "47",
      "wilaya_name_ascii": "Ghardaïa",
      "wilaya_name": "غرداية",
      "centers": []
    },
    "1498": {
      "id": 1498,
      "commune_name_ascii": "Hassi Fehal",
      "commune_name": "حاسي الفحل",
      "daira_name_ascii": "Mansourah",
      "daira_name": "المنصورة",
      "wilaya_code": "58",
      "wilaya_name_ascii": "El Menia",
      "wilaya_name": "المنيعة",
      "centers": []
    },
    "1499": {
      "id": 1499,
      "commune_name_ascii": "Hassi Gara",
      "commune_name": "حاسي القارة",
      "daira_name_ascii": "El Menia",
      "daira_name": "المنيعة",
      "wilaya_code": "58",
      "wilaya_name_ascii": "El Menia",
      "wilaya_name": "المنيعة",
      "centers": []
    },
    "1500": {
      "id": 1500,
      "commune_name_ascii": "Mansoura",
      "commune_name": "المنصورة",
      "daira_name_ascii": "Mansourah",
      "daira_name": "المنصورة",
      "wilaya_code": "47",
      "wilaya_name_ascii": "Ghardaïa",
      "wilaya_name": "غرداية",
      "centers": []
    },
    "1501": {
      "id": 1501,
      "commune_name_ascii": "Metlili",
      "commune_name": "متليلي",
      "daira_name_ascii": "Metlili",
      "daira_name": "متليلي",
      "wilaya_code": "47",
      "wilaya_name_ascii": "Ghardaïa",
      "wilaya_name": "غرداية",
      "centers": []
    },
    "1502": {
      "id": 1502,
      "commune_name_ascii": "Sebseb",
      "commune_name": "سبسب",
      "daira_name_ascii": "Metlili",
      "daira_name": "متليلي",
      "wilaya_code": "47",
      "wilaya_name_ascii": "Ghardaïa",
      "wilaya_name": "غرداية",
      "centers": []
    },
    "1503": {
      "id": 1503,
      "commune_name_ascii": "Zelfana",
      "commune_name": "زلفانة",
      "daira_name_ascii": "Zelfana",
      "daira_name": "زلفانة",
      "wilaya_code": "47",
      "wilaya_name_ascii": "Ghardaïa",
      "wilaya_name": "غرداية",
      "centers": []
    },
    "1504": {
      "id": 1504,
      "commune_name_ascii": "Ain Rahma",
      "commune_name": "عين الرحمة",
      "daira_name_ascii": "Yellel",
      "daira_name": "يلل",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1505": {
      "id": 1505,
      "commune_name_ascii": "Ain-Tarek",
      "commune_name": "عين طارق",
      "daira_name_ascii": "Ain Tarek",
      "daira_name": "عين طارق",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1506": {
      "id": 1506,
      "commune_name_ascii": "Ammi Moussa",
      "commune_name": "عمي موسى",
      "daira_name_ascii": "Ammi Moussa",
      "daira_name": "عمي موسى",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1507": {
      "id": 1507,
      "commune_name_ascii": "Belaassel Bouzagza",
      "commune_name": "بلعسل بوزقزة",
      "daira_name_ascii": "El Matmar",
      "daira_name": "المطمر",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1508": {
      "id": 1508,
      "commune_name_ascii": "Bendaoud",
      "commune_name": "بن داود",
      "daira_name_ascii": "Relizane",
      "daira_name": "غليزان",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1509": {
      "id": 1509,
      "commune_name_ascii": "Beni Dergoun",
      "commune_name": "بني درقن",
      "daira_name_ascii": "Zemmoura",
      "daira_name": "زمورة",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1510": {
      "id": 1510,
      "commune_name_ascii": "Beni Zentis",
      "commune_name": "بني زنطيس",
      "daira_name_ascii": "Sidi M'hamed Ben Ali",
      "daira_name": "سيدي أمحمد بن علي",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1511": {
      "id": 1511,
      "commune_name_ascii": "Dar Ben Abdelah",
      "commune_name": "دار بن عبد الله",
      "daira_name_ascii": "Zemmoura",
      "daira_name": "زمورة",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1512": {
      "id": 1512,
      "commune_name_ascii": "Djidiouia",
      "commune_name": "جديوية",
      "daira_name_ascii": "Djidiouia",
      "daira_name": "جديوية",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1513": {
      "id": 1513,
      "commune_name_ascii": "El Hassi",
      "commune_name": "الحاسي",
      "daira_name_ascii": "Ammi Moussa",
      "daira_name": "عمي موسى",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1514": {
      "id": 1514,
      "commune_name_ascii": "El H'madna",
      "commune_name": "الحمادنة",
      "daira_name_ascii": "El H'madna",
      "daira_name": "الحمادنة",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1515": {
      "id": 1515,
      "commune_name_ascii": "El Ouldja",
      "commune_name": "الولجة",
      "daira_name_ascii": "Ammi Moussa",
      "daira_name": "عمي موسى",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1516": {
      "id": 1516,
      "commune_name_ascii": "El-Guettar",
      "commune_name": "القطار",
      "daira_name_ascii": "Mazouna",
      "daira_name": "مازونة",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1517": {
      "id": 1517,
      "commune_name_ascii": "El-Matmar",
      "commune_name": "المطمر",
      "daira_name_ascii": "El Matmar",
      "daira_name": "المطمر",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1518": {
      "id": 1518,
      "commune_name_ascii": "Had Echkalla",
      "commune_name": "حد الشكالة",
      "daira_name_ascii": "Ain Tarek",
      "daira_name": "عين طارق",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1519": {
      "id": 1519,
      "commune_name_ascii": "Hamri",
      "commune_name": "حمري",
      "daira_name_ascii": "Djidiouia",
      "daira_name": "جديوية",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1520": {
      "id": 1520,
      "commune_name_ascii": "Kalaa",
      "commune_name": "القلعة",
      "daira_name_ascii": "Yellel",
      "daira_name": "يلل",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1521": {
      "id": 1521,
      "commune_name_ascii": "Lahlef",
      "commune_name": "لحلاف",
      "daira_name_ascii": "Oued Rhiou",
      "daira_name": "وادي رهيو",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1522": {
      "id": 1522,
      "commune_name_ascii": "Mazouna",
      "commune_name": "مازونة",
      "daira_name_ascii": "Mazouna",
      "daira_name": "مازونة",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1523": {
      "id": 1523,
      "commune_name_ascii": "Mediouna",
      "commune_name": "مديونة",
      "daira_name_ascii": "Sidi M'hamed Ben Ali",
      "daira_name": "سيدي أمحمد بن علي",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1524": {
      "id": 1524,
      "commune_name_ascii": "Mendes",
      "commune_name": "منداس",
      "daira_name_ascii": "Mendes",
      "daira_name": "منداس",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1525": {
      "id": 1525,
      "commune_name_ascii": "Merdja Sidi Abed",
      "commune_name": "مرجة سيدي عابد",
      "daira_name_ascii": "Oued Rhiou",
      "daira_name": "وادي رهيو",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1526": {
      "id": 1526,
      "commune_name_ascii": "Ouarizane",
      "commune_name": "واريزان",
      "daira_name_ascii": "Oued Rhiou",
      "daira_name": "وادي رهيو",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1527": {
      "id": 1527,
      "commune_name_ascii": "Oued El Djemaa",
      "commune_name": "وادي الجمعة",
      "daira_name_ascii": "El H'madna",
      "daira_name": "الحمادنة",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1528": {
      "id": 1528,
      "commune_name_ascii": "Oued Essalem",
      "commune_name": "وادي السلام",
      "daira_name_ascii": "Mendes",
      "daira_name": "منداس",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1529": {
      "id": 1529,
      "commune_name_ascii": "Oued-Rhiou",
      "commune_name": "وادي رهيو",
      "daira_name_ascii": "Oued Rhiou",
      "daira_name": "وادي رهيو",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1530": {
      "id": 1530,
      "commune_name_ascii": "Ouled Aiche",
      "commune_name": "أولاد يعيش",
      "daira_name_ascii": "Ammi Moussa",
      "daira_name": "عمي موسى",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1531": {
      "id": 1531,
      "commune_name_ascii": "Ouled Sidi Mihoub",
      "commune_name": "أولاد سيدي الميهوب",
      "daira_name_ascii": "Djidiouia",
      "daira_name": "جديوية",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1532": {
      "id": 1532,
      "commune_name_ascii": "Ramka",
      "commune_name": "الرمكة",
      "daira_name_ascii": "Ramka",
      "daira_name": "الرمكة",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1533": {
      "id": 1533,
      "commune_name_ascii": "Relizane",
      "commune_name": "غليزان",
      "daira_name_ascii": "Relizane",
      "daira_name": "غليزان",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": [
        {
          "center_id": 483001,
          "name": "Agence de Relizane [Yalidine]",
          "address": "Boulevard 69 Zaghloul (en face la banque d'Algérie)",
          "gps": "35.74256254570214,0.5546923698242852",
          "commune_id": 4830,
          "commune_name": "Relizane",
          "wilaya_id": 48,
          "wilaya_name": "Relizane"
        }
      ]
    },
    "1534": {
      "id": 1534,
      "commune_name_ascii": "Sidi Khettab",
      "commune_name": "سيدي  خطاب",
      "daira_name_ascii": "El Matmar",
      "daira_name": "المطمر",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1535": {
      "id": 1535,
      "commune_name_ascii": "Sidi Lazreg",
      "commune_name": "سيدي لزرق",
      "daira_name_ascii": "Mendes",
      "daira_name": "منداس",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1536": {
      "id": 1536,
      "commune_name_ascii": "Sidi M'hamed Benali",
      "commune_name": "سيدي أمحمد بن علي",
      "daira_name_ascii": "Sidi M'hamed Ben Ali",
      "daira_name": "سيدي أمحمد بن علي",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1537": {
      "id": 1537,
      "commune_name_ascii": "Sidi M'hamed Benaouda",
      "commune_name": "سيدي امحمد بن عودة",
      "daira_name_ascii": "El Matmar",
      "daira_name": "المطمر",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1538": {
      "id": 1538,
      "commune_name_ascii": "Sidi Saada",
      "commune_name": "سيدي سعادة",
      "daira_name_ascii": "Yellel",
      "daira_name": "يلل",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1539": {
      "id": 1539,
      "commune_name_ascii": "Souk El Had",
      "commune_name": "سوق الحد",
      "daira_name_ascii": "Ramka",
      "daira_name": "الرمكة",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1540": {
      "id": 1540,
      "commune_name_ascii": "Yellel",
      "commune_name": "يلل",
      "daira_name_ascii": "Yellel",
      "daira_name": "يلل",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    },
    "1541": {
      "id": 1541,
      "commune_name_ascii": "Zemmoura",
      "commune_name": "زمورة",
      "daira_name_ascii": "Zemmoura",
      "daira_name": "زمورة",
      "wilaya_code": "48",
      "wilaya_name_ascii": "Relizane",
      "wilaya_name": "غليزان",
      "centers": []
    }
  }

// Helper function to get centers for a specific commune
export function getYalidinCentersForCommune(communeName: string): YalidinCenter[] {
  // Normalize the commune name for comparison
  const normalizedCommuneName = communeName.toLowerCase().trim()

  // Find the commune in the data
  const commune = Object.values(yalidinCenters).find(
    (commune) => commune.commune_name_ascii.toLowerCase() === normalizedCommuneName,
  )

  return commune?.centers || []
}

// Helper function to check if a commune has Yalidin centers
export function hasYalidinCenters(communeName: string): boolean {
  const centers = getYalidinCentersForCommune(communeName)
  return centers.length > 0
}

// Helper function to get a center by ID
export function getYalidinCenterById(centerId: string | number): YalidinCenter | undefined {
  const id = typeof centerId === "string" ? Number.parseInt(centerId, 10) : centerId

  for (const commune of Object.values(yalidinCenters)) {
    const center = commune.centers.find((center) => center.center_id === id)
    if (center) return center
  }

  return undefined
}

// Add a helper function to get commune ID from a center
export function getYalidinCommuneIdFromCenter(centerId: string | number): number | undefined {
  const center = getYalidinCenterById(centerId)
  return center?.commune_id
}

// Add a helper function to get wilaya code from a center
export function getYalidinWilayaCodeFromCenter(centerId: string | number): string | undefined {
  const center = getYalidinCenterById(centerId)
  if (center) {
    // Convert wilaya_id to string and pad with leading zero if needed
    const wilayaId = center.wilaya_id.toString()
    return wilayaId.length === 1 ? `0${wilayaId}` : wilayaId
  }
  return undefined
}

// Add a helper function to get all centers for a wilaya
export function getYalidinCentersByWilaya(wilayaName: string): YalidinCenter[] {
  if (!wilayaName) return []

  const normalizedWilayaName = wilayaName.toLowerCase().trim()
  let centers: YalidinCenter[] = []

  // Find all communes in this wilaya
  for (const commune of Object.values(yalidinCenters)) {
    if (commune.wilaya_name_ascii.toLowerCase() === normalizedWilayaName) {
      centers = [...centers, ...commune.centers]
    }
  }

  return centers
}
