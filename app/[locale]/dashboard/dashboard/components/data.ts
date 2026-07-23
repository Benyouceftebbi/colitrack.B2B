export const algeriaStatesData = {
  "Adrar": { users: 120, bounceRate: "4.2%" },
  "Alger": { users: 430, bounceRate: "5.9%" },
  "Annaba": { users: 291, bounceRate: "2.3%" },
  "Batna": { users: 265, bounceRate: "3.5%" },
  "Béchar": { users: 145, bounceRate: "3.8%" },
  "Béjaïa": { users: 278, bounceRate: "4.1%" },
  "Constantine": { users: 342, bounceRate: "4.8%" },
  "Oran": { users: 385, bounceRate: "3.2%" },
  // Add more states as needed
} as const;

export type StateData = {
  users: number;
  bounceRate: string;
};

export type AlgeriaStatesData = typeof algeriaStatesData;