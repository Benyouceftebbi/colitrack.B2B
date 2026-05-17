export interface WorkingDay {
    day: string;
    openTime: string;
    closeTime: string;
  }
  
  export interface StopDesk {
    id: string; // document ID (same as desk_url_code/stopdesk_code)
    name: string;
    adress: string; // Keeping both spellings as per Firebase schema
    adresse: string;
    wilaya: string;
    wilayaId: number;
    code_wilaya: string;
    commune: string;
    company: string;
    phone: string;
    phone2: string;
    map: string; // Short Google Maps link
    iframeMap: string; // Embedded iframe URL
    desk_url_code: string;
    stopdesk_code: string;
    lng: string;
    hub_working_days: WorkingDay[];
    updatedAt?: Date;
  }
  
  export const DEFAULT_WORKING_DAYS: WorkingDay[] = [
    { day: "Dimanche", openTime: "09:00", closeTime: "17:00" },
    { day: "Lundi", openTime: "09:00", closeTime: "17:00" },
    { day: "Mardi", openTime: "09:00", closeTime: "17:00" },
    { day: "Mercredi", openTime: "09:00", closeTime: "17:00" },
    { day: "Jeudi", openTime: "09:00", closeTime: "17:00" },
    { day: "Vendredi", openTime: "09:00", closeTime: "17:00" },
    { day: "Samedi", openTime: "09:00", closeTime: "17:00" },
  ];
  // Generate time options from 6:00 to 23:00 in 30-minute increments
export const TIME_OPTIONS: string[] = [];
for (let hour = 6; hour <= 23; hour++) {
  TIME_OPTIONS.push(`${hour.toString().padStart(2, "0")}:00`);
  if (hour < 23) {
    TIME_OPTIONS.push(`${hour.toString().padStart(2, "0")}:30`);
  }
}

  export const WILAYA_LIST = [
    { id: 1, name: "Adrar" },
    { id: 2, name: "Chlef" },
    { id: 3, name: "Laghouat" },
    { id: 4, name: "Oum El Bouaghi" },
    { id: 5, name: "Batna" },
    { id: 6, name: "Béjaïa" },
    { id: 7, name: "Biskra" },
    { id: 8, name: "Béchar" },
    { id: 9, name: "Blida" },
    { id: 10, name: "Bouira" },
    { id: 11, name: "Tamanrasset" },
    { id: 12, name: "Tébessa" },
    { id: 13, name: "Tlemcen" },
    { id: 14, name: "Tiaret" },
    { id: 15, name: "Tizi Ouzou" },
    { id: 16, name: "Alger" },
    { id: 17, name: "Djelfa" },
    { id: 18, name: "Jijel" },
    { id: 19, name: "Sétif" },
    { id: 20, name: "Saïda" },
    { id: 21, name: "Skikda" },
    { id: 22, name: "Sidi Bel Abbès" },
    { id: 23, name: "Annaba" },
    { id: 24, name: "Guelma" },
    { id: 25, name: "Constantine" },
    { id: 26, name: "Médéa" },
    { id: 27, name: "Mostaganem" },
    { id: 28, name: "M'Sila" },
    { id: 29, name: "Mascara" },
    { id: 30, name: "Ouargla" },
    { id: 31, name: "Oran" },
    { id: 32, name: "El Bayadh" },
    { id: 33, name: "Illizi" },
    { id: 34, name: "Bordj Bou Arreridj" },
    { id: 35, name: "Boumerdès" },
    { id: 36, name: "El Tarf" },
    { id: 37, name: "Tindouf" },
    { id: 38, name: "Tissemsilt" },
    { id: 39, name: "El Oued" },
    { id: 40, name: "Khenchela" },
    { id: 41, name: "Souk Ahras" },
    { id: 42, name: "Tipaza" },
    { id: 43, name: "Mila" },
    { id: 44, name: "Aïn Defla" },
    { id: 45, name: "Naâma" },
    { id: 46, name: "Aïn Témouchent" },
    { id: 47, name: "Ghardaïa" },
    { id: 48, name: "Relizane" },
    { id: 49, name: "El M'Ghair" },
    { id: 50, name: "El Meniaa" },
    { id: 51, name: "Ouled Djellal" },
    { id: 52, name: "Bordj Badji Mokhtar" },
    { id: 53, name: "Béni Abbès" },
    { id: 54, name: "Timimoun" },
    { id: 55, name: "Touggourt" },
    { id: 56, name: "Djanet" },
    { id: 57, name: "In Salah" },
    { id: 58, name: "In Guezzam" },
  ];
  
  export function createEmptyStopDesk(code: string): StopDesk {
    return {
      id: code,
      name: "",
      adress: "",
      adresse: "",
      wilaya: "",
      wilayaId: 0,
      code_wilaya: "",
      commune: "",
      company: "DHD",
      phone: "",
      phone2: "",
      map: "",
      iframeMap: "",
      desk_url_code: code,
      stopdesk_code: code,
      lng: "ar",
      hub_working_days: [...DEFAULT_WORKING_DAYS],
    };
  }
  