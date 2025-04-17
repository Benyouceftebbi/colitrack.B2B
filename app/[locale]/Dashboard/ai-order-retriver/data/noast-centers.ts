// Data structure for Noast Express centers

interface NoastCenter {
    code:string
    name: string
    address: string
    map:string
    phones:any
    email:string
    key:string
  }
  
  interface NoastCommune {
    id: number
    commune_name_ascii: string
    commune_name: string
    daira_name_ascii: string
    daira_name: string
    wilaya_code: string
    wilaya_name_ascii: string
    wilaya_name: string
    centers: NoastCenter[]
  }
  
  // Sample data for Noast Express centers
  export const noastCenters: Record<string, NoastCommune> =[
    {
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
          "code": "1A",
          "name": "Adrar",
          "address": "Cité les palmier en face l'hopital",
          "map": "https://maps.app.goo.gl/2Nrh9EFjphQwNJxXA",
          "phones": {
            "0": "0550602181",
            "1": "0561623531",
            "2": "",
            "3": ""
          },
          "email": "adrar@noest-dz.com",
          "key": "01A"
        }
      ]
    },
    {
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
          "code": "49A",
          "name": "Timimoun ",
          "address": "cité MAHDJOUB N° de la porte 16 , Timimoun en face le stade et SAA",
          "map": "https://maps.app.goo.gl/NXKZEjzRWWA4b4aA6",
          "phones": {
            "0": "0555518628",
            "1": "",
            "2": "",
            "3": ""
          },
          "email": "timimoun@noest-dz.com",
          "key": "49A"
        }
      ]
    },
    {
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
          "code": "2A",
          "name": "Chlef",
          "address": "Rue Lac des Forêts (À côté du CNRC)",
          "map": "https://maps.app.goo.gl/ej8xXgs4uzC227ke6",
          "phones": {
            "0": "0770582116",
            "1": "0561686360",
            "2": "",
            "3": ""
          },
          "email": "chlef@noest-dz.com",
          "key": "02A"
        }
      ]
    },
    {
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
          "code": "3A",
          "name": "Laghouat",
          "address": "Cité Al Ouiam (En face la mosquée Hammani )",
          "map": "https://maps.app.goo.gl/n2sXZSeYmxJdFopLA",
          "phones": {
            "0": "0550600359",
            "1": "0770611585",
            "2": "",
            "3": ""
          },
          "email": "laghouat@noest-dz.com",
          "key": "03A"
        },
        {
          "code": "3B",
          "name": "Laghouat (Aflou)",
          "address": "Rue Al-Gaada, à côté de la boulangerie Belkhair",
          "map": "",
          "phones": {
            "0": "0550314898",
            "1": "",
            "2": "",
            "3": ""
          },
          "email": "aflou@noest-dz.com",
          "key": "03B"
        }
      ]
    },
    {
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
          "code": "4A",
          "name": "Oum El Bouaghi (Ain Mlila)",
          "address": "Ain Mlila Cité 12 logements en face CEM belaabed",
          "map": "https://maps.app.goo.gl/TvYS8rxto21wJDh2A",
          "phones": {
            "0": "0561848298",
            "1": "",
            "2": "",
            "3": ""
          },
          "email": "oeb@noest-dz.com",
          "key": "04A"
        },
        {
          "code": "4B",
          "name": "OUM EL BOUAGHI",
          "address": "Cité 176 logements LSP Batiment 13 – Oum El Bouaghi",
          "map": "https://maps.app.goo.gl/uNV57wKUxH1g5ZwK8",
          "phones": {
            "0": "0560445954",
            "1": "0560445855",
            "2": "",
            "3": ""
          },
          "email": "-",
          "key": "04B"
        }
      ]
    },
    {
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
          "code": "5A",
          "name": "Batna",
          "address": "Cité meddour kchida en face les batiments 500",
          "map": "https://maps.app.goo.gl/fS4yobMdauC9yyxYA",
          "phones": {
            "0": "0560105318",
            "1": "0561929074",
            "2": "0770605118",
            "3": ""
          },
          "email": "batna@noest-dz.com",
          "key": "05A"
        },
        {
          "code": "5B",
          "name": "Batna (Barika)",
          "address": "Quartier CHAABANI , en face notaire Bachir Farhani, a coté Algerie Telecom",
          "map": "https://maps.app.goo.gl/dKCKkRS6XXreRWki8",
          "phones": {
            "0": "0560183389",
            "1": "0560183413",
            "2": "0560183206",
            "3": ""
          },
          "email": "barika@noest-dz.com",
          "key": "05B"
        }
      ]
    },
    {
      "id": 229,
      "commune_name_ascii": "Toudja",
      "commune_name": "توجة",
      "daira_name_ascii": "El Kseur",
      "daira_name": "القصر",
      "wilaya_code": "06",
      "wilaya_name_ascii": "Béjaïa",
      "wilaya_name": " بجاية",
      "centers": [
        {
          "code": "6A",
          "name": "Bejaïa",
          "address": "rue des frères Tabet ,a 20 mètres de l’hôtel Golden H en face la nouvelle promotion nid d’abeille.",
          "map": "",
          "phones": {
            "0": "0561686346",
            "1": "0550429286",
            "2": "0561871121",
            "3": ""
          },
          "email": "bejaia@noest-dz.com",
          "key": "06A"
        },
        {
          "code": "6B",
          "name": "Bejaïa (Akbou)",
          "address": "Rue hibouche – arafou En face de djurdjura cars et alliance assurance - https://maps.app.goo.gl/vXDun2BF2keToN4HA",
          "map": "https://maps.app.goo.gl/viKPQgksLQ26xPVd8",
          "phones": {
            "0": "0555589102",
            "1": "0555589207",
            "2": "",
            "3": ""
          },
          "email": "akbou@noest-dz.com",
          "key": "06B"
        }
      ]
    },
    {
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
          "code": "7A",
          "name": "Biskra",
          "address": "Cite 70 logement block 04 devant hotel Morris",
          "map": "https://maps.app.goo.gl/tZsTNYKWGXNf6bSF9",
          "phones": {
            "0": "0770608890",
            "1": "",
            "2": "",
            "3": ""
          },
          "email": "biskra@noest-dz.com",
          "key": "07A"
        }
      ]
    },
    {
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
          "code": "51A",
          "name": "Ouled Djellal",
          "address": "تحت فندق ترنزيت نجانبة الحماية المدنية ولاد جلال /   Rez-de-chaussée de l'hôtel Transit, à côté de la protection civile d'Ouled Djellal.",
          "map": "https://maps.app.goo.gl/NhyzzqPmKrJRgs1b9",
          "phones": {
            "0": "0770749651",
            "1": "",
            "2": "",
            "3": ""
          },
          "email": "ouleddjellal@noest-dz.com",
          "key": "51A"
        }
      ]
    },
    {
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
          "code": "8A",
          "name": "Béchar",
          "address": "Cité 622 Logement Al Badr N°02 - Bloc 52 (derière la radio EL SAOURA / En face la protection civile)",
          "map": "https://maps.app.goo.gl/W6zQbC9oQnMk6Kcm9",
          "phones": {
            "0": "0561686335",
            "1": "0550429404",
            "2": "",
            "3": ""
          },
          "email": "bechar@noest-dz.com",
          "key": "08A"
        }
      ]
    },
    {
      "id": 265,
      "commune_name_ascii": "Beni-Abbes",
      "commune_name": "بني عباس",
      "daira_name_ascii": "Beni Abbes",
      "daira_name": "بني عباس",
      "wilaya_code": "52",
      "wilaya_name_ascii": "Béni Abbès",
      "wilaya_name": "بني عباس",
      "centers": [
        {
          "code": "52A",
          "name": "BENI ABBES",
          "address": "A coté la wilaya BENI ABBES , en face LAPIWI ( المجلس الشعبي الولائي  (",
          "map": "https://maps.app.goo.gl/27WiRCQt9ZAZ2Xbj9",
          "phones": {
            "0": "0561906728",
            "1": "",
            "2": "",
            "3": ""
          },
          "email": "beniabbes@noest-dz.com",
          "key": "52A"
        }
      ]
    },
    {
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
          "code": "9A",
          "name": "Blida",
          "address": "El ramoule à côté de la nouvelle gare routière",
          "map": "https://maps.app.goo.gl/cNpbAjGRrumo5EDi6",
          "phones": {
            "0": "0561686325",
            "1": "0550600998",
            "2": "0561638691",
            "3": ""
          },
          "email": "blida@noest-dz.com",
          "key": "09A"
        },
        {
          "code": "9B",
          "name": "Blida « Boufarik »",
          "address": " La résidence Belkbir en face la salle des fetes Layalina ",
          "map": "https://maps.app.goo.gl/YXN6FUhboxnTBxRS7",
          "phones": {
            "0": "0555589398",
            "1": "0555589395",
            "2": "",
            "3": ""
          },
          "email": "boufarik@noest-dz.com",
          "key": "09B"
        }
      ]
    },
    {
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
          "code": "10A",
          "name": "Bouira",
          "address": "Villa hamzaoui, ammar khodja , bouira",
          "map": "https://maps.app.goo.gl/bJQYAUTLNyEnhpUA8",
          "phones": {
            "0": "0770801024",
            "1": "0550428219",
            "2": "",
            "3": ""
          },
          "email": "bouira@noest-dz.com",
          "key": "10A"
        }
      ]
    },
    {
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
          "code": "53A",
          "name": "In Salah",
          "address": "Centre-Ville (Entre la poste et lle CNRC)",
          "map": "https://maps.app.goo.gl/K87WhPBkdSoTX5eS9",
          "phones": {
            "0": "0770612328",
            "1": "",
            "2": "",
            "3": ""
          },
          "email": "insalah@noest-dz.com",
          "key": "53A"
        }
      ]
    },
    {
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
          "code": "11A",
          "name": "Tamanrasset",
          "address": "مولاي عومار طريق دائرة مقابل العشاب – مالطا",
          "map": "https://maps.app.goo.gl/g2ewPChs2HaC9FSA6",
          "phones": {
            "0": "0662343499",
            "1": "0675176027",
            "2": "",
            "3": ""
          },
          "email": "tamanrasset@noest-dz.com",
          "key": "11A"
        }
      ]
    },
    {
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
          "code": "12A",
          "name": "Tébessa",
          "address": "Boulvard Houari Boumedien( proche de la banque AGB), Tébessa",
          "map": "https://maps.app.goo.gl/TYj4nbnxL5NksZMM9",
          "phones": {
            "0": "0770613002",
            "1": "0550602622",
            "2": "",
            "3": ""
          },
          "email": "tebessa@noest-dz.com",
          "key": "12A"
        }
      ]
    },
    {
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
          "code": "13A",
          "name": "Tlemcen",
          "address": "Les Dhalias 426 El kiffane, tlemcen",
          "map": "https://maps.app.goo.gl/VdCwkoHHZGabbjfx9",
          "phones": {
            "0": "0561660040",
            "1": "0561808143",
            "2": "0770750242",
            "3": ""
          },
          "email": "tlemcen@noest-dz.com",
          "key": "13A"
        },
        {
          "code": "13B",
          "name": "Tlemcen (Maghnia)",
          "address": "Ouled ben saber, À côté restaurant Rais ",
          "map": "https://maps.app.goo.gl/bJsoBcyp6G5ydp747",
          "phones": {
            "0": "0560851262",
            "1": "0560857684",
            "2": "0560912307",
            "3": ""
          },
          "email": "maghnia@noest-dz.com",
          "key": "13B"
        }
      ]
    },
    {
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
          "code": "14A",
          "name": "Tiaret",
          "address": "Cité 180 logements CNT local 01 N° 63 – Tiaret",
          "map": "https://maps.app.goo.gl/1LrM2edmMH8mSMnV8",
          "phones": {
            "0": "0550429624",
            "1": "0560350227",
            "2": "",
            "3": ""
          },
          "email": "tiaret@noest-dz.com",
          "key": "14A"
        }
      ]
    },
    {
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
          "code": "15A",
          "name": "Tizi Ouzou",
          "address": "Cité 450 Logements, Nouvelle Ville enface la salle des fetes lilya",
          "map": "https://maps.app.goo.gl/rUxomC9VwyAd4MS16",
          "phones": {
            "0": "0561623528",
            "1": "0550429176",
            "2": "",
            "3": ""
          },
          "email": "tiziouzou@noest-dz.com",
          "key": "15A"
        },
        {
          "code": "15B",
          "name": "Tizi Ouzou (Azazga)",
          "address": "Route nationale N= 12 taddart",
          "map": "https://maps.app.goo.gl/PD37mvfqqr1NXkDy8",
          "phones": {
            "0": "0561906076",
            "1": "0561906289",
            "2": "",
            "3": ""
          },
          "email": "azazga@noest-dz.com",
          "key": "15B"
        }
      ]
    },
    {
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
          "code": "16A",
          "name": "Alger « Bir mourad Rais »",
          "address": "02, Lotissement Beau Séjour, Bir Mourad Raïs",
          "map": "https://maps.app.goo.gl/B1hsjSttffH5GSQK9",
          "phones": {
            "0": "0770610277",
            "1": "0561660023",
            "2": "0560158799",
            "3": ""
          },
          "email": "birmouradrais@noest-dz.com",
          "key": "16A"
        },
        {
          "code": "16B",
          "name": "Alger « Bab Ezzouar »",
          "address": "Cite 2038 Logements - Batiment 43 - RDC, Bab Ezzouar",
          "map": "https://maps.app.goo.gl/qG22tYtJ4WuWX6W6A",
          "phones": {
            "0": "0560301762",
            "1": "0770608746",
            "2": "0770615054",
            "3": ""
          },
          "email": "babezzouar@noest-dz.com",
          "key": "16B"
        },
        {
          "code": "16C",
          "name": "Alger « Chéraga »",
          "address": "Place Iben Badis N° 03 - RDC , Chéraga",
          "map": "https://maps.app.goo.gl/qLBhYaVRskR6K7XN9",
          "phones": {
            "0": "0560846037",
            "1": "0560812936",
            "2": "",
            "3": ""
          },
          "email": "cheraga@noest-dz.com",
          "key": "16C"
        },
        {
          "code": "16D",
          "name": "Alger « Reghaia »",
          "address": "822 Logmts LPP Amirouche Batiment A7 N°04 rez-de-chaussée ,Reghaia",
          "map": "https://maps.app.goo.gl/HC8KvHRuviDoZj6h8",
          "phones": {
            "0": "0560441770",
            "1": "0560441926",
            "2": "0561680248",
            "3": ""
          },
          "email": "reghaia@noest-dz.com",
          "key": "16D"
        },
        {
          "code": "16E",
          "name": "Alger « Centre - Sacré-Cœur »",
          "address": "22 Rue Hocine BELADJEL, Sacré-Cœur, Alger Centre, (En face la banque BADR)",
          "map": "https://maps.app.goo.gl/TXhvnMmKxGW4qMxs7",
          "phones": {
            "0": "0560181237",
            "1": "0560181433",
            "2": "0560181730",
            "3": "0560181471"
          },
          "email": "alger@noest-dz.com",
          "key": "16E"
        },
        {
          "code": "16F",
          "name": "Alger « Baba Hassen »",
          "address": "Cité Cherchali Boualam, À côté de croissant rouge, Baba Hassen",
          "map": "https://maps.app.goo.gl/EdXbRxRZW2EuGMrN6",
          "phones": {
            "0": "0560182594",
            "1": "0560182915",
            "2": "0560183036",
            "3": ""
          },
          "email": "babahassen@noest-dz.com",
          "key": "16F"
        },
        {
          "code": "16G",
          "name": "Alger « Baraki »",
          "address": "Baraki, route de Larbaâ, entre la mosquée El Bachir El Ibrahimi et le commissariat de la circonscription administrative.",
          "map": "https://maps.app.goo.gl/jvqQ9P4ffjtir5en8",
          "phones": {
            "0": "0560158882",
            "1": "0560158961",
            "2": "0560158953",
            "3": ""
          },
          "email": "-",
          "key": "16G"
        },
        {
          "code": "16H",
          "name": "Alger « BAB EZZOUAR - DOUZI »",
          "address": "Devant clinique médicale, En face Ecole Hilal School",
          "map": "https://maps.app.goo.gl/S9zYAkBBBwRviCPE7",
          "phones": {
            "0": "0555589394",
            "1": "0560301762",
            "2": "",
            "3": ""
          },
          "email": "-",
          "key": "16H"
        }
      ]
    },
    {
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
          "code": "17A",
          "name": "Djelfa",
          "address": "Cité BOUTRIFIS en face la gendarmerie",
          "map": "https://maps.app.goo.gl/DWTdfbkLH7ckpkS1A",
          "phones": {
            "0": "0770580860",
            "1": "0550429422",
            "2": "",
            "3": ""
          },
          "email": "djelfa@noest-dz.com",
          "key": "17A"
        },
        {
          "code": "17B",
          "name": "Djelfa (Ain Ouassara)",
          "address": "Quartier Mohamed Boudiaf, Section 23, Local n° 30 Bisi, Commune de Ain Oussera.",
          "map": "https://maps.app.goo.gl/vT6iVZfJrZv8ZgRXA",
          "phones": {
            "0": "0549746237",
            "1": "027941332",
            "2": "0778550473",
            "3": ""
          },
          "email": "-",
          "key": "17B"
        }
      ]
    },
    {
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
          "code": "18A",
          "name": "Jijel",
          "address": "rue26, Avenue Kaoula Mokhtar, cita sans intérdit , Hay IDARI",
          "map": "https://maps.app.goo.gl/Xd69qa4VBgX63ZXMA",
          "phones": {
            "0": "0770613439",
            "1": "0561660019",
            "2": "",
            "3": ""
          },
          "email": "jijel@noest-dz.com",
          "key": "18A"
        }
      ]
    },
    {
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
          "code": "19A",
          "name": "Sétif",
          "address": "Cité Mesoudi Edhouadi 1014-614 Logement (En face la gare Didouche Mourad)",
          "map": "https://maps.app.goo.gl/6hq9NN4VUM5BAj7D8",
          "phones": {
            "0": "0550428220",
            "1": "0561638678",
            "2": "",
            "3": ""
          },
          "email": "setif@noest-dz.com",
          "key": "19A"
        },
        {
          "code": "19B",
          "name": "Sétif (El Eulma)",
          "address": "Cité Tassahoumi, 160 Logements - Bâtiment 11, el eulma Caffé Wahib",
          "map": "https://maps.app.goo.gl/TxH9Q6Tds8xtMxJG7",
          "phones": {
            "0": "0561864463",
            "1": "0550428625",
            "2": "0770608717",
            "3": ""
          },
          "email": "eulma@noest-dz.com",
          "key": "19B"
        },
        {
          "code": "19C",
          "name": "Sétif (Ain Oulmene)",
          "address": "En face CEM Douhil Abdul Hamid,",
          "map": "https://maps.app.goo.gl/QDG27DsQddAXCgUG6",
          "phones": {
            "0": "0770749621",
            "1": "0770749618",
            "2": "",
            "3": ""
          },
          "email": "ainoulmene@noest-dz.com",
          "key": "19C"
        },
        {
          "code": "19RE",
          "name": "Sétif (Guidjel)",
          "address": "La zone industrielle, en face du groupe SADI et à côté de la moussala d’El Takwa",
          "map": "https://maps.app.goo.gl/cpCLJ2TQe36sg7SK6",
          "phones": {
            "0": "0770749653",
            "1": "0555506670",
            "2": "",
            "3": ""
          },
          "email": "-",
          "key": "19RE"
        }
      ]
    },
    {
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
          "code": "20A",
          "name": "Saïda",
          "address": "Cité Riad en face Maison de l'Environnement",
          "map": "https://maps.app.goo.gl/VviCNGfZ5paDP6Yg8",
          "phones": {
            "0": "0550428481",
            "1": "0560421128",
            "2": "",
            "3": ""
          },
          "email": "saida@noest-dz.com",
          "key": "20A"
        }
      ]
    },
    {
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
          "code": "21A",
          "name": "Skikda",
          "address": "Rue Mohammed Namou,en face la direction sonalgaz fobor la monté de hammam deradji",
          "map": "https://maps.app.goo.gl/pzoFxAFLmiWw9GYT7",
          "phones": {
            "0": "0770773555",
            "1": "0561759686",
            "2": "",
            "3": ""
          },
          "email": "skikda@noest-dz.com",
          "key": "21A"
        }
      ]
    },
    {
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
          "code": "22A",
          "name": "Sidi bel abbès",
          "address": "Rue CPR , En face Masjid El Ansar - حي بني عامر ، مقابل مسجد الانصار",
          "map": "https://maps.app.goo.gl/etRK49tRiqgm2jM89",
          "phones": {
            "0": "0770610413",
            "1": "0560419987",
            "2": "",
            "3": ""
          },
          "email": "sba@noest-dz.com",
          "key": "22A"
        }
      ]
    },
    {
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
          "code": "23A",
          "name": "Annaba",
          "address": "Rue Djemila, Saint Claud (À côté de la mosqué Badr)",
          "map": "https://maps.app.goo.gl/6yKATA45oXvHHihk9",
          "phones": {
            "0": "0561623524",
            "1": "0770582366",
            "2": "0770582331",
            "3": "0770610699"
          },
          "email": "annaba@noest-dz.com",
          "key": "23A"
        },
        {
          "code": "23B",
          "name": "Annaba (EL BOUNI)",
          "address": "Fractionnement de la Bouni 2, zone urbaine n° 43, rez-de-chaussée, section 40, groupe de propriété 02, Bouni",
          "map": "https://maps.app.goo.gl/z5TMRRUV6awNv3dRA",
          "phones": {
            "0": "0770932016",
            "1": "0560777653",
            "2": "",
            "3": ""
          },
          "email": "-",
          "key": "23B"
        }
      ]
    },
    {
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
          "code": "24A",
          "name": "Guelma",
          "address": "Cité 19 Juin - Numéro 02, en face marché Elbaraka",
          "map": "https://maps.app.goo.gl/8gi3VUh2aasGbGQT7",
          "phones": {
            "0": "0659698421",
            "1": "0770610741",
            "2": "",
            "3": ""
          },
          "email": "guelma@noest-dz.com",
          "key": "24A"
        }
      ]
    },
    {
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
          "code": "25A",
          "name": "Constantine (Zouaghi)",
          "address": "Cité Tlemcen Zouaghi (En face de la gendarmerie)",
          "map": "https://maps.app.goo.gl/hCfjk81JdYZe1kLt8",
          "phones": {
            "0": "0561850861",
            "1": "0550429556",
            "2": "0556910802",
            "3": "0560005537"
          },
          "email": "zouaghi@noest-dz.com",
          "key": "25A"
        },
        {
          "code": "25B",
          "name": "Constantine (Ali Mendjeli)",
          "address": "En face de Sarl Natura pro Algérie/entre deux salles des fêtés el baraka et méga",
          "map": "https://maps.app.goo.gl/qk8oJNE96vvU2kzM7",
          "phones": {
            "0": "0561623523",
            "1": "0770570921",
            "2": "0559006598",
            "3": "0560183481"
          },
          "email": "alimendjeli@noest-dz.com",
          "key": "25B"
        },
        {
          "code": "25C",
          "name": "Constantine",
          "address": "rue bouleli ahcéne  BELLE VUE a coté de la banque BNP Paribas",
          "map": "https://maps.app.goo.gl/ZFBJESGBHFQTVkHf7",
          "phones": {
            "0": "0560459167",
            "1": "0560463858",
            "2": "0555508343",
            "3": "0561906766"
          },
          "email": "constantine@noest-dz.com",
          "key": "25C"
        }
      ]
    },
    {
      "id": 943,
      "commune_name_ascii": "Ouled Hellal",
      "commune_name": "أولاد هلال",
      "daira_name_ascii": "Ouled Antar",
      "daira_name": "أولاد عنتر",
      "wilaya_code": "26",
      "wilaya_name_ascii": "Médéa",
      "wilaya_name": "المدية",
      "centers": [
        {
          "code": "26A",
          "name": "Médéa",
          "address": "Cité Ennasr (Près du pôle universitaire et Sonelgaz)",
          "map": "https://maps.app.goo.gl/u1nnLgz6wQABnUt19",
          "phones": {
            "0": "0770605318",
            "1": "0550429981",
            "2": "",
            "3": ""
          },
          "email": "medea@noest-dz.com",
          "key": "26A"
        }
      ]
    },
    {
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
          "code": "27A",
          "name": "Mostaganem",
          "address": "La pépinière en face la glacière juste à côté de la libraire BENALIOUA ( cité AKID AMIROUCHE boulevard NAFOUSSI OTHMAN)",
          "map": "https://maps.app.goo.gl/1a83AMSY4JicE49U8",
          "phones": {
            "0": "0561772345",
            "1": "0561827231",
            "2": "",
            "3": ""
          },
          "email": "mostaghanem@noest-dz.com",
          "key": "27A"
        }
      ]
    },
    {
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
          "code": "28A",
          "name": "M'sila",
          "address": "Rue Ichbilia (En face l’université de M’Sila)",
          "map": "https://maps.app.goo.gl/GPxraSKTwr6gqPdF6",
          "phones": {
            "0": "0770754014",
            "1": "0561821829",
            "2": "",
            "3": ""
          },
          "email": "msila@noest-dz.com",
          "key": "28A"
        },
        {
          "code": "28B",
          "name": "M'sila (Bousaada)",
          "address": " Cité El Bader (ESTTIH) a coté de L'annexe de L'APC ,Bousaada",
          "map": "https://maps.app.goo.gl/Fq9e9wroyanPQ7CA9",
          "phones": {
            "0": "0559270829",
            "1": "",
            "2": "",
            "3": ""
          },
          "email": "bousaada@noest-dz.com",
          "key": "28B"
        }
      ]
    },
    {
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
          "code": "29A",
          "name": "Mascara (Mohammadia)",
          "address": "Rue Larbi Ben M’hidi, a coté de l'agence de Barigou,",
          "map": "https://maps.app.goo.gl/8qccid2Pesg8FtpR8",
          "phones": {
            "0": "0770582372",
            "1": "0550602272",
            "2": "",
            "3": ""
          },
          "email": "mohammadia@noest-dz.com",
          "key": "29A"
        },
        {
          "code": "29B",
          "name": "Mascara (Ville)",
          "address": "Rue d'oran , colonel Amirouche , lot 112 N° 07 local 06 ,a coté de hadj Grrifa",
          "map": "",
          "phones": {
            "0": "0561680241",
            "1": "0561680236",
            "2": "0561680238",
            "3": ""
          },
          "email": "mascara@noest-dz.com",
          "key": "29B"
        }
      ]
    },
    {
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
          "code": "30A",
          "name": "Ouargla",
          "address": "Sidi Abdelkader, derrière la maison de jeune",
          "map": "https://maps.app.goo.gl/Eeq8SWYKwXZVu2XV6",
          "phones": {
            "0": "0550602271",
            "1": "0770938789",
            "2": "",
            "3": ""
          },
          "email": "ouargla@noest-dz.com",
          "key": "30A"
        }
      ]
    },
    {
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
          "code": "55A",
          "name": "Touggourt",
          "address": "Cité Sidi Abdeslam (Prés de la banque BEA), Touggourt",
          "map": "https://maps.app.goo.gl/K87WhPBkdSoTX5eS9",
          "phones": {
            "0": "0770610683",
            "1": "",
            "2": "",
            "3": ""
          },
          "email": "touggourt@noest-dz.com",
          "key": "55A"
        }
      ]
    },
    {
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
          "code": "31A",
          "name": "Oran (Maraval)",
          "address": "Cité 1004 Logements SN B/T1 - Rez-De- Chaussée - Coté Droit 1, en face stade la radieuse maraval, oran",
          "map": "https://maps.app.goo.gl/MJkcWEFigrjrsMzz5",
          "phones": {
            "0": "0560449927",
            "1": "0561623534",
            "2": "",
            "3": ""
          },
          "email": "maraval@noest-dz.com",
          "key": "31A"
        },
        {
          "code": "31B",
          "name": "Oran (Bir El Djir)",
          "address": "Coopérative Immobilière Dar El Amel - N°14 - Local1 RC",
          "map": "https://maps.app.goo.gl/YyNEn3FWzMchRyLK9",
          "phones": {
            "0": "0550429662",
            "1": "0550429661",
            "2": "",
            "3": ""
          },
          "email": "bireldjir@noest-dz.com",
          "key": "31B"
        },
        {
          "code": "31C",
          "name": "Oran (Gambita)",
          "address": "Gambetta En face arrêt de bus 51 et 11 de (dispensaire cave-gay)",
          "map": "https://maps.app.goo.gl/832PTz4ngWYMxzkf6",
          "phones": {
            "0": "0560181020",
            "1": "0560181117",
            "2": "0560181125",
            "3": ""
          },
          "email": "oran@noest-dz.com",
          "key": "31C"
        }
      ]
    },
    {
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
          "code": "32A",
          "name": "El Bayadh ",
          "address": "Cité jolie vue (Al-Mandhar Al-Jamil), à côté de la Direction de la distribution d'électricité et de gaz",
          "map": "https://maps.app.goo.gl/qbL18AuxDX4iTosx9",
          "phones": {
            "0": "0560481886",
            "1": "",
            "2": "",
            "3": ""
          },
          "email": "elbayadh@noest-dz.com",
          "key": "32A"
        }
      ]
    },
    {
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
          "code": "33A",
          "name": "Illizi",
          "address": "(À côté de la wilaya / Près de boulangerie Ben Ziar)",
          "map": "https://maps.app.goo.gl/EYsD2SuG2x9e1e6N6",
          "phones": {
            "0": "0560892842",
            "1": "",
            "2": "",
            "3": ""
          },
          "email": "illizi@noest-dz.com",
          "key": "33A"
        }
      ]
    },
    {
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
          "code": "34A",
          "name": "Bordj Bou Arreridj",
          "address": "Rue Tabet Salah Bordj Bou Arreridj (Devant la maison de finance)",
          "map": "https://maps.app.goo.gl/tndtMs9TUTZ4XPgk7",
          "phones": {
            "0": "0550428634",
            "1": "0770773018",
            "2": "",
            "3": ""
          },
          "email": "bba@noest-dz.com",
          "key": "34A"
        }
      ]
    },
    {
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
          "code": "35A",
          "name": "Boumerdès ",
          "address": "Cité mimouza en face la piscine olympique Boumerdes",
          "map": "https://maps.app.goo.gl/TemVvkYXig6VyEpz5",
          "phones": {
            "0": "0770754064",
            "1": "0770570924",
            "2": "",
            "3": ""
          },
          "email": "boumerdes@noest-dz.com",
          "key": "35A"
        },
        {
          "code": "35B",
          "name": "Boumerdès (Ouled Moussa) ",
          "address": "La zone industrielle d'Ouled Moussa",
          "map": "https://maps.app.goo.gl/mZAQoLAj3uJnvEPr8",
          "phones": {
            "0": "0550430051",
            "1": "0560665086",
            "2": "",
            "3": ""
          },
          "email": "ouledmoussa@noest-dz.com",
          "key": "35B"
        }
      ]
    },
    {
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
          "code": "36A",
          "name": "El Taref",
          "address": "City center ( centre commerciale zaydi 1er étage N°10 )wilaya etEl taref",
          "map": "https://maps.app.goo.gl/GJF8NyCrQDXd5w73A",
          "phones": {
            "0": "0550522421",
            "1": "0550523464",
            "2": "",
            "3": ""
          },
          "email": "tarfef@noest-dz.com",
          "key": "36A"
        }
      ]
    },
    {
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
          "code": "37A",
          "name": "Tindouf",
          "address": "Magasin N°03 cité Al-Qasabi, Section 14, Groupement Immobilier N° 165, Commune de Tindouf",
          "map": "https://maps.app.goo.gl/vgeDr2zF5wiC8GUh7",
          "phones": {
            "0": "0560555395",
            "1": "",
            "2": "",
            "3": ""
          },
          "email": "tindouf@noest-dz.com",
          "key": "37A"
        }
      ]
    },
    {
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
          "code": "38A",
          "name": "Tissemsilt",
          "address": "Résidence kaidi (promotion) ancien arrêt des taxis",
          "map": "https://maps.app.goo.gl/qBX7DVgH2dBAZfKu6",
          "phones": {
            "0": "0560650819",
            "1": "0555589197",
            "2": "",
            "3": ""
          },
          "email": "tissemsilt@noest-dz.com",
          "key": "38A"
        }
      ]
    },
    {
      "id": 1285,
      "commune_name_ascii": "El-Oued",
      "commune_name": "الوادي",
      "daira_name_ascii": "El Oued",
      "daira_name": "الوادي",
      "wilaya_code": "39",
      "wilaya_name_ascii": "El Oued",
      "wilaya_name": "الوادي",
      "centers": [
        {
          "code": "39A",
          "name": "El Oued",
          "address": "Cité Al-Rimal, Commune El Oued wilaya El Ouadi (la route menant au tribunal)",
          "map": "https://maps.app.goo.gl/2GeaAQvQotEyjsg28",
          "phones": {
            "0": "0550520770",
            "1": "0550521485",
            "2": "",
            "3": ""
          },
          "email": "eloued@noest-dz.com",
          "key": "39A"
        }
      ]
    },
    {
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
          "code": "40A",
          "name": "Khenchela",
          "address": "Rue du poid lourd à coté de la clinique du dialyse Messai -Khenchela-",
          "map": "https://maps.app.goo.gl/2MmLNCuoL7szc1YA8",
          "phones": {
            "0": "0561759173",
            "1": "0560469790",
            "2": "0555562589",
            "3": ""
          },
          "email": "khenchela@noest-dz.com",
          "key": "40A"
        }
      ]
    },
    {
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
          "code": "41A",
          "name": "Souk ahres",
          "address": "En face radio souk ahras et l laboratoire des analyses Taghest",
          "map": "https://maps.app.goo.gl/8sKTN9kvbPMbhF3G8",
          "phones": {
            "0": "0560030559",
            "1": "0560039852",
            "2": "",
            "3": ""
          },
          "email": "soukahres@noest-dz.com",
          "key": "41A"
        }
      ]
    },
    {
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
          "code": "42A",
          "name": "Tipaza",
          "address": "Cité Mohammed Bougara, a coté de ecole privé DAYA Shcool",
          "map": "https://maps.app.goo.gl/QZb88fQCQ4Gs34M78",
          "phones": {
            "0": "0770580690",
            "1": "0550602568",
            "2": "",
            "3": ""
          },
          "email": "tipaza@noest-dz.com",
          "key": "42A"
        }
      ]
    },
    {
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
          "code": "43A",
          "name": "Mila ",
          "address": "chateau d'eau en face protection civile",
          "map": "https://maps.app.goo.gl/UVcD63ANz8Zxi1hc8",
          "phones": {
            "0": "0550518508",
            "1": "0550518509",
            "2": "",
            "3": ""
          },
          "email": "mila@noest-dz.com",
          "key": "43A"
        },
        {
          "code": "43B",
          "name": "Mila (Chelghoum El aid)",
          "address": "Rue 1er Nouvembre 1954 Chelghoum El aid (hotel Rhumel)",
          "map": "",
          "phones": {
            "0": "0550523511",
            "1": "",
            "2": "",
            "3": ""
          },
          "email": "chelghoumelaid@noest-dz.com",
          "key": "43B"
        }
      ]
    },
    {
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
          "code": "44A",
          "name": "Ain Defla",
          "address": "Cité Nadjem (En face de Taxi Aissam)",
          "map": "https://maps.app.goo.gl/8gXvsm4oS9gTGP3r8",
          "phones": {
            "0": "0561770486",
            "1": "0560607115",
            "2": "0560889758",
            "3": ""
          },
          "email": "aindefla@noest-dz.com",
          "key": "44A"
        },
        {
          "code": "44B",
          "name": "Ain Defla (Khemis miliana)",
          "address": "Cité Ahmed ben Abd Allah commune khemismiliana wilaya de Ain defla",
          "map": "https://maps.app.goo.gl/yEUeJychPyp9VZoJ9",
          "phones": {
            "0": "0556069297",
            "1": "0553011878",
            "2": "",
            "3": ""
          },
          "email": "khemismiliana@noest-dz.com",
          "key": "44B"
        }
      ]
    },
    {
      "id": 1460,
      "commune_name_ascii": "Naama",
      "commune_name": "النعامة",
      "daira_name_ascii": "Naama",
      "daira_name": "النعامة",
      "wilaya_code": "45",
      "wilaya_name_ascii": "Naâma",
      "wilaya_name": "النعامة",
      "centers": [
        {
          "code": "45A",
          "name": "Naâma (Mécheria)",
          "address": "Centre-Ville (En face de de la Daira), Mécheria",
          "map": "https://maps.app.goo.gl/MHS8Yc1TvvphUsW56",
          "phones": {
            "0": "0560294576",
            "1": "0770615202",
            "2": "",
            "3": ""
          },
          "email": "naama@noest-dz.com",
          "key": "45A"
        }
      ]
    },
    {
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
          "code": "46A",
          "name": "Aïn Témouchent",
          "address": "22A cité des oliviers ain témouchnet 46000(en face du parking de la  wilaya)",
          "map": "https://maps.app.goo.gl/V6HZrwBBZgsW5sjx8",
          "phones": {
            "0": "0560908785",
            "1": "0550428624",
            "2": "",
            "3": ""
          },
          "email": "aintemouchent@noest-dz.com",
          "key": "46A"
        }
      ]
    },
    {
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
          "code": "58A",
          "name": "El Meniaa",
          "address": "Rue de l’unite African (À côté de la boulangerie Boussaid) Il se trouve à 20 mètres de la mosquée saad beno abi elouas",
          "map": "https://maps.app.goo.gl/q2u9ijWUoQymwa7dA",
          "phones": {
            "0": "0770602445",
            "1": "",
            "2": "",
            "3": ""
          },
          "email": "elmeniaa@noest-dz.com",
          "key": "58A"
        }
      ]
    },
    {
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
          "code": "47A",
          "name": "Ghardaïa",
          "address": "Rue principale Hadj Messaoud en face la branche municipale, Haj Masoud",
          "map": "https://maps.app.goo.gl/o8LUFLQj796inkPe8",
          "phones": {
            "0": "0561686305",
            "1": "0561638680",
            "2": "",
            "3": ""
          },
          "email": "ghardaia@noest-dz.com",
          "key": "47A"
        }
      ]
    },
    {
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
          "code": "48A",
          "name": "Relizane",
          "address": "Cité 31 logmt en face la justice, a coté de la banque societé général algerie",
          "map": "https://maps.app.goo.gl/TVkvkzx9DSXGLyc26",
          "phones": {
            "0": "0560754029",
            "1": "0560791527",
            "2": "",
            "3": ""
          },
          "email": "relizane@noest-dz.com",
          "key": "48A"
        }
      ]
    }
  ]
  
  // Helper function to get centers for a specific commune
  function normalizeString(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }
  
  // Helper function to get centers for a specific commune
  export function getNoastCentersForCommune(communeName: string): NoastCenter[] {
    // Normalize the commune name for comparison
    const normalizedCommuneName = communeName.toLowerCase().trim()
  
    // Find the commune in the data
    const commune = Object.values(noastCenters).find(
      (commune) => commune.commune_name_ascii.toLowerCase() === normalizedCommuneName,
    )
  
    return commune?.centers || []
  }
  
  // Add a new function to get centers by wilaya
  export function getNoastCentersByWilaya(wilayaName: string): NoastCenter[] {
    if (!wilayaName) return []
  
    const normalizedWilayaName = normalizeString(wilayaName).toLowerCase().trim()
    let centers: NoastCenter[] = []
  
    // Try exact match first
    const exactMatches = Object.values(noastCenters).filter(
      (commune) => normalizeString(commune.wilaya_name_ascii).toLowerCase() === normalizedWilayaName,
    )
  
    if (exactMatches.length > 0) {
      exactMatches.forEach((commune) => {
        centers = [...centers, ...commune.centers]
      })
      return centers
    }
  
    // If no exact match, try partial matching
    const partialMatches = Object.values(noastCenters).filter((commune) => {
      const normalizedCommuneWilaya = normalizeString(commune.wilaya_name_ascii).toLowerCase()
      return (
        normalizedCommuneWilaya.includes(normalizedWilayaName) || normalizedWilayaName.includes(normalizedCommuneWilaya)
      )
    })
  
    if (partialMatches.length > 0) {
      partialMatches.forEach((commune) => {
        centers = [...centers, ...commune.centers]
      })
    }
  
    return centers
  }
  
  // Helper function to check if a commune has NOAST centers
  export function hasNoastCenters(communeName: string): boolean {
    const centers = getNoastCentersForCommune(communeName)
    return centers.length > 0
  }
  
  // Helper function to get a center by ID
  export function getNoastCenterById(centerId: string): NoastCenter | undefined {
    for (const commune of Object.values(noastCenters)) {
      const center = commune.centers.find((center) => center.key === centerId || center.code === centerId)
      if (center) return center
    }
  
    return undefined
  }
  
  // Helper function to get commune ID by wilaya name
  export function getNoastCommuneIdByWilaya(wilayaName: string): string | undefined {
    if (!wilayaName) return undefined
  
    const normalizedWilayaName = normalizeString(wilayaName).toLowerCase().trim()
  
    // Try to find an exact match first
    for (const [communeId, commune] of Object.entries(noastCenters)) {
      if (normalizeString(commune.wilaya_name_ascii).toLowerCase() === normalizedWilayaName) {
        return communeId
      }
    }
  
    // If no exact match, try partial matching
    for (const [communeId, commune] of Object.entries(noastCenters)) {
      // Check if the normalized wilaya name contains or is contained in the normalized commune wilaya name
      const normalizedCommuneWilaya = normalizeString(commune.wilaya_name_ascii).toLowerCase()
      if (
        normalizedCommuneWilaya.includes(normalizedWilayaName) ||
        normalizedWilayaName.includes(normalizedCommuneWilaya)
      ) {
        return communeId
      }
  
      // Also check Arabic name
      const normalizedCommuneWilayaAr = normalizeString(commune.wilaya_name).toLowerCase()
      if (
        normalizedCommuneWilayaAr.includes(normalizedWilayaName) ||
        normalizedWilayaName.includes(normalizedCommuneWilayaAr)
      ) {
        return communeId
      }
    }
  
    return undefined
  }
  
  // Helper function to get commune ID for a specific wilaya and commune
  export function getNoastCommuneId(wilayaName: string, communeName?: string): string | undefined {
    if (!wilayaName) return undefined
  
    const normalizedWilayaName = normalizeString(wilayaName).toLowerCase().trim()
  
    // If commune name is provided, try to find exact match
    if (communeName) {
      const normalizedCommuneName = normalizeString(communeName).toLowerCase().trim()
  
      // Try exact match first
      for (const [communeId, commune] of Object.entries(noastCenters)) {
        if (
          normalizeString(commune.wilaya_name_ascii).toLowerCase() === normalizedWilayaName &&
          normalizeString(commune.commune_name_ascii).toLowerCase() === normalizedCommuneName
        ) {
          return communeId
        }
      }
  
      // Try partial match
      for (const [communeId, commune] of Object.entries(noastCenters)) {
        const normalizedCommuneWilaya = normalizeString(commune.wilaya_name_ascii).toLowerCase()
        const normalizedCommune = normalizeString(commune.commune_name_ascii).toLowerCase()
  
        if (
          (normalizedCommuneWilaya.includes(normalizedWilayaName) ||
            normalizedWilayaName.includes(normalizedCommuneWilaya)) &&
          (normalizedCommune.includes(normalizedCommuneName) || normalizedCommuneName.includes(normalizedCommune))
        ) {
          return communeId
        }
      }
    }
  
    // If no commune name provided or no exact match found, return the first commune ID for this wilaya
    return getNoastCommuneIdByWilaya(wilayaName)
  }
  