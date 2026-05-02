export type Station = {
  id: string;
  name: string;
  bestFor: string;
  tip: string;
};

export const stations: Station[] = [
  {
    id: "ekkamai",
    name: "Bangkok Ekkamai Bus Terminal",
    bestFor: "central Bangkok",
    tip: "arrive 20-30 minutes before departure",
  },
  {
    id: "mo-chit",
    name: "Mo Chit Bus Terminal",
    bestFor: "northern Bangkok",
    tip: "allow extra time to reach the terminal",
  },
  {
    id: "north-pattaya",
    name: "North Pattaya Bus Terminal",
    bestFor: "Pattaya city",
    tip: "take a songthaew or taxi to your hotel",
  },
  {
    id: "suvarnabhumi-airport",
    name: "Suvarnabhumi Airport Bus Counter",
    bestFor: "airport arrivals going straight to Pattaya",
    tip: "check the bus counter after arrivals and allow time for immigration",
  },
];
