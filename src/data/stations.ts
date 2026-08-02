export type Station = {
  id: string;
  name: string;
  bestFor: string;
  tip: string;
  latitude: number;
  longitude: number;
  mapLabel: string;
  googleMapsUrl: string;
  openStreetMapUrl: string;
  walkingNote: {
    en: string;
    pl: string;
  };
};

export const stations: Station[] = [
  {
    id: "ekkamai",
    name: "Bangkok Ekkamai Bus Terminal",
    bestFor: "central Bangkok",
    tip: "arrive 20-30 minutes before departure",
    latitude: 13.7196,
    longitude: 100.5851,
    mapLabel: "Ekkamai Bus Terminal",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Bangkok%20Ekkamai%20Bus%20Terminal",
    openStreetMapUrl: "https://www.openstreetmap.org/?mlat=13.7196&mlon=100.5851#map=17/13.7196/100.5851",
    walkingNote: {
      en: "Use this map to recognize the area around the station.",
      pl: "Ta mapa pomoże rozpoznać okolice stacji.",
    },
  },
  {
    id: "mo-chit",
    name: "Mo Chit Bus Terminal",
    bestFor: "northern Bangkok",
    tip: "allow extra time to reach the terminal",
    latitude: 13.8139,
    longitude: 100.5498,
    mapLabel: "Mo Chit 2 Bus Terminal",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Mo%20Chit%202%20Bus%20Terminal",
    openStreetMapUrl: "https://www.openstreetmap.org/?mlat=13.8139&mlon=100.5498#map=17/13.8139/100.5498",
    walkingNote: {
      en: "Check signs at the station when you arrive.",
      pl: "Po przyjeździe sprawdź oznaczenia na miejscu.",
    },
  },
  {
    id: "north-pattaya",
    name: "North Pattaya Bus Terminal",
    bestFor: "Pattaya city",
    tip: "take a songthaew or taxi to your hotel",
    latitude: 12.9527,
    longitude: 100.903,
    mapLabel: "North Pattaya Bus Station",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=North%20Pattaya%20Bus%20Station",
    openStreetMapUrl: "https://www.openstreetmap.org/?mlat=12.9527&mlon=100.9030#map=17/12.9527/100.9030",
    walkingNote: {
      en: "Use this map to recognize the area around the station.",
      pl: "Ta mapa pomoże rozpoznać okolice stacji.",
    },
  },
  {
    id: "suvarnabhumi-airport",
    name: "Suvarnabhumi Airport Bus Counter",
    bestFor: "airport arrivals going straight to Pattaya",
    tip: "check the bus counter after arrivals and allow time for immigration",
    latitude: 13.69,
    longitude: 100.7501,
    mapLabel: "Suvarnabhumi Airport bus area",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Suvarnabhumi%20Airport%20bus%20area",
    openStreetMapUrl: "https://www.openstreetmap.org/?mlat=13.6900&mlon=100.7501#map=17/13.6900/100.7501",
    walkingNote: {
      en: "Check signs at the airport when you arrive.",
      pl: "Po przylocie sprawdź oznaczenia na lotnisku.",
    },
  },
  {
    id: "jomtien-bus-area",
    name: "Pattaya / Jomtien Airport Bus Area",
    bestFor: "airport buses from Pattaya",
    tip: "confirm the boarding point with Airport Pattaya Bus before travel",
    latitude: 12.9069,
    longitude: 100.8714,
    mapLabel: "Pattaya / Jomtien Airport Bus Area",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pattaya%20Jomtien%20Airport%20Bus",
    openStreetMapUrl: "https://www.openstreetmap.org/?mlat=12.9069&mlon=100.8714#map=17/12.9069/100.8714",
    walkingNote: {
      en: "Confirm the exact boarding point with the operator before travel.",
      pl: "Przed podróżą potwierdź dokładne miejsce odjazdu u operatora.",
    },
  },
  {
    id: "don-mueang-airport",
    name: "Don Mueang Airport",
    bestFor: "airport departures and arrivals",
    tip: "allow extra time for check-in, baggage, traffic, and airport navigation",
    latitude: 13.9125,
    longitude: 100.6067,
    mapLabel: "Don Mueang Airport",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Don%20Mueang%20Airport",
    openStreetMapUrl:
      "https://www.openstreetmap.org/?mlat=13.9125&mlon=100.6067#map=17/13.9125/100.6067",
    walkingNote: {
      en: "Use this map to recognize the airport area. Confirm the bus counter or pick-up point when you arrive.",
      pl: "Ta mapa pomoże rozpoznać okolice lotniska. Po przyjeździe potwierdź stanowisko autobusu lub miejsce odbioru.",
    },
  },
  {
    id: "pattaya-sukhumvit",
    name: "Pattaya Sukhumvit Road Bus Station",
    bestFor: "Pattaya to Don Mueang Airport",
    tip: "confirm the exact Pattaya boarding point before travel",
    latitude: 12.9328,
    longitude: 100.8981,
    mapLabel: "Pattaya Sukhumvit Road Bus Station",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Pattaya%20Sukhumvit%20Road%20Bus%20Station",
    openStreetMapUrl:
      "https://www.openstreetmap.org/?mlat=12.9328&mlon=100.8981#map=17/12.9328/100.8981",
    walkingNote: {
      en: "Confirm the exact Pattaya boarding point before travel.",
      pl: "Przed podróżą potwierdź dokładne miejsce odjazdu w Pattayi.",
    },
  },
];
