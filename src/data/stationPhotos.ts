import type { LocaleCode, RouteId } from "@/data/routes";

export type StationPhotoStationId =
  | "ekkamai"
  | "north-pattaya"
  | "mo-chit"
  | "suvarnabhumi-airport"
  | "jomtien-bus-area"
  | "don-mueang-airport"
  | "pattaya-sukhumvit";

type LocalizedText = Record<"en" | "pl", string>;

export type StationPhoto = {
  stationId: StationPhotoStationId;
  src: string;
  title: string;
  displayTitle?: LocalizedText;
  caption: LocalizedText;
  alt: LocalizedText;
  author: string;
  sourceUrl: string;
  licenseName: string;
  licenseUrl: string;
};

export type StationPhotoGroup = {
  stationId: StationPhotoStationId;
  title: string;
  photos: StationPhoto[];
};

const stationTitles: Record<StationPhotoStationId, LocalizedText> = {
  ekkamai: {
    en: "Ekkamai Bus Terminal",
    pl: "Dworzec Ekkamai",
  },
  "north-pattaya": {
    en: "North Pattaya Bus Station",
    pl: "North Pattaya Bus Station",
  },
  "mo-chit": {
    en: "Mo Chit 2 Bus Terminal",
    pl: "Dworzec Mo Chit 2",
  },
  "suvarnabhumi-airport": {
    en: "Suvarnabhumi Airport bus area",
    pl: "Strefa autobusowa na lotnisku Suvarnabhumi",
  },
  "jomtien-bus-area": {
    en: "Pattaya / Jomtien airport bus area",
    pl: "Strefa autobusu lotniskowego Pattaya / Jomtien",
  },
  "don-mueang-airport": {
    en: "Don Mueang Airport",
    pl: "Lotnisko Don Mueang",
  },
  "pattaya-sukhumvit": {
    en: "Pattaya Sukhumvit Road Bus Station",
    pl: "Pattaya Sukhumvit Road Bus Station",
  },
};

const practicalCaptions = {
  entrance: {
    en: "Use this photo to recognize the terminal entrance.",
    pl: "To zdjęcie pomoże rozpoznać wejście do terminalu.",
  },
  counters: {
    en: "Look for the ticket counters inside the terminal.",
    pl: "Szukaj kas biletowych wewnątrz terminalu.",
  },
  boarding: {
    en: "Boarding areas may change. Check signs at the station.",
    pl: "Miejsca odjazdu mogą się zmieniać. Sprawdź oznaczenia na dworcu.",
  },
} satisfies Record<string, LocalizedText>;

export const stationPhotos: StationPhoto[] = [
  {
    stationId: "ekkamai",
    src: "/images/stations/ekkamai/ekkamai-entrance.jpg",
    title: "Ekkamai Bus Station 20240824.jpg",
    caption: practicalCaptions.entrance,
    alt: {
      en: "Exterior entrance of Ekkamai Bus Terminal in Bangkok.",
      pl: "Zewnętrzne wejście do dworca autobusowego Ekkamai w Bangkoku.",
    },
    author: "Supanut Arunoprayote",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Ekkamai_Bus_Station_20240824.jpg",
    licenseName: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  },
  {
    stationId: "ekkamai",
    src: "/images/stations/ekkamai/ekkamai-terminal.jpg",
    title: "Bangkok Busbahnhof Ekkamai (2025) - img 04.jpg",
    caption: practicalCaptions.counters,
    alt: {
      en: "Inside area of Ekkamai Bus Terminal with counters and signs near the boarding lanes.",
      pl: "Wnętrze dworca Ekkamai z kasami, oznaczeniami i przejściem do autobusów.",
    },
    author: "Chainwit.",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Bangkok_Busbahnhof_Ekkamai_%E0%B8%AA%E0%B8%96%E0%B8%B2%E0%B8%99%E0%B8%B5%E0%B8%82%E0%B8%99%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B9%82%E0%B8%94%E0%B8%A2%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E_%28%E0%B9%80%E0%B8%AD%E0%B8%81%E0%B8%A1%E0%B8%B1%E0%B8%A2%29_%282025%29_-_img_04.jpg",
    licenseName: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  },
  {
    stationId: "ekkamai",
    src: "/images/stations/ekkamai/ekkamai-bus-area.jpg",
    title: "Bangkok Busbahnhof Ekkamai (2025) - img 06.jpg",
    caption: practicalCaptions.boarding,
    alt: {
      en: "Bus boarding area at Ekkamai Bus Terminal with platform signs and minibuses.",
      pl: "Strefa odjazdu autobusów na dworcu Ekkamai z oznaczeniami peronów.",
    },
    author: "Chainwit.",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Bangkok_Busbahnhof_Ekkamai_%E0%B8%AA%E0%B8%96%E0%B8%B2%E0%B8%99%E0%B8%B5%E0%B8%82%E0%B8%99%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B9%82%E0%B8%94%E0%B8%A2%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E_%28%E0%B9%80%E0%B8%AD%E0%B8%81%E0%B8%A1%E0%B8%B1%E0%B8%A2%29_%282025%29_-_img_06.jpg",
    licenseName: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  },
  {
    stationId: "north-pattaya",
    src: "/images/stations/pattaya-north/pattaya-station.jpg",
    title: "Pattaya, BusStation North str. - panoramio.jpg",
    displayTitle: {
      en: "North Pattaya Bus Station",
      pl: "North Pattaya Bus Station",
    },
    caption: {
      en: "Main bus station area in North Pattaya.",
      pl: "Główny dworzec autobusowy w North Pattaya.",
    },
    alt: {
      en: "North Pattaya Bus Station entrance and terminal driveway.",
      pl: "Wejście i podjazd przy North Pattaya Bus Station.",
    },
    author: "Serj Kras",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Pattaya,_BusStation_North_str._-_panoramio.jpg",
    licenseName: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  },
  {
    stationId: "north-pattaya",
    src: "/images/stations/pattaya-north/pattaya-ticket-area.jpg",
    title: "Pattaya Bus Station - panoramio.jpg",
    caption: practicalCaptions.boarding,
    alt: {
      en: "Buses and boarding area at Pattaya Bus Station.",
      pl: "Autobusy i strefa odjazdu na dworcu autobusowym w Pattayi.",
    },
    author: "Ilya Plekhanov",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Pattaya_Bus_Station_-_panoramio.jpg",
    licenseName: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  },
  {
    stationId: "north-pattaya",
    src: "/images/stations/pattaya-north/pattaya-bus-area.jpg",
    title: "MERCEDES COACH PATTAYA BUS STATION PATTAYA CITY THAILAND OCT 2010 (5145062181).jpg",
    caption: practicalCaptions.boarding,
    alt: {
      en: "Roong Reuang Coach bus at Pattaya Bus Station.",
      pl: "Autobus Roong Reuang Coach na dworcu autobusowym w Pattayi.",
    },
    author: "calflier001",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:MERCEDES_COACH_PATTAYA_BUS_STATION_PATTAYA_CITY_THAILAND_OCT_2010_(5145062181).jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
  },
  {
    stationId: "mo-chit",
    src: "/images/stations/mo-chit/mo-chit-front.jpg",
    title: "Mo Chit 2 Bus Terminal 1.jpg",
    caption: practicalCaptions.entrance,
    alt: {
      en: "Front entrance area of Mo Chit 2 Bus Terminal in Bangkok.",
      pl: "Przednia część dworca autobusowego Mo Chit 2 w Bangkoku.",
    },
    author: "Mapleonade",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Mo_Chit_2_Bus_Terminal_1.jpg",
    licenseName: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  },
  {
    stationId: "mo-chit",
    src: "/images/stations/mo-chit/mo-chit-terminal.jpg",
    title: "Mo Chit 2 floor 3 Ticket booth awaiting demolition 1.jpg",
    caption: practicalCaptions.counters,
    alt: {
      en: "Ticket booth area inside Mo Chit 2 Bus Terminal.",
      pl: "Strefa kas biletowych wewnątrz dworca Mo Chit 2.",
    },
    author: "Mapleonade",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Mo_Chit_2_floor_3_Ticket_booth_awaiting_demolition_1.jpg",
    licenseName: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  },
  {
    stationId: "mo-chit",
    src: "/images/stations/mo-chit/mo-chit-bus-area.jpg",
    title: "Mo Chit 2 departure platform 2 4.jpg",
    caption: practicalCaptions.boarding,
    alt: {
      en: "Departure platform area at Mo Chit 2 Bus Terminal.",
      pl: "Strefa peronów odjazdowych na dworcu Mo Chit 2.",
    },
    author: "Mapleonade",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Mo_Chit_2_departure_platform_2_4.jpg",
    licenseName: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  },
  {
    stationId: "suvarnabhumi-airport",
    src: "/images/stations/suvarnabhumi/suvarnabhumi-bus-terminal.jpg",
    title: "Buses in Suvarnabhumi Airport Bus Terminal (1).jpg",
    caption: practicalCaptions.entrance,
    alt: {
      en: "Buses inside the public transportation center at Suvarnabhumi Airport.",
      pl: "Autobusy w centrum transportu publicznego na lotnisku Suvarnabhumi.",
    },
    author: "Patiparn.Nice2002bkk",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Buses_in_Suvarnabhumi_Airport_Bus_Terminal_(1).jpg",
    licenseName: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  {
    stationId: "suvarnabhumi-airport",
    src: "/images/stations/suvarnabhumi/suvarnabhumi-bus-area.jpg",
    title: "Buses in Suvarnabhumi Airport Bus Terminal (4).jpg",
    caption: practicalCaptions.counters,
    alt: {
      en: "Bus area inside Suvarnabhumi Airport public transportation center.",
      pl: "Strefa autobusowa w centrum transportu publicznego lotniska Suvarnabhumi.",
    },
    author: "Patiparn.Nice2002bkk",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Buses_in_Suvarnabhumi_Airport_Bus_Terminal_(4).jpg",
    licenseName: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  {
    stationId: "suvarnabhumi-airport",
    src: "/images/stations/suvarnabhumi/suvarnabhumi-buses.jpg",
    title: "Buses in Suvarnabhumi Airport Bus Terminal (7).jpg",
    caption: practicalCaptions.boarding,
    alt: {
      en: "Buses and bay signs at Suvarnabhumi Airport bus terminal.",
      pl: "Autobusy i oznaczenia stanowisk na terminalu autobusowym lotniska Suvarnabhumi.",
    },
    author: "Patiparn.Nice2002bkk",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Buses_in_Suvarnabhumi_Airport_Bus_Terminal_(7).jpg",
    licenseName: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  {
    stationId: "don-mueang-airport",
    src: "/images/stations/don-mueang/don-mueang-bus-station.jpg",
    title: "Bus station at Don Mueang Airport 2019.jpg",
    caption: {
      en: "Bus station area at Don Mueang Airport",
      pl: "Strefa autobusowa na lotnisku Don Mueang",
    },
    alt: {
      en: "Bus station area at Don Mueang Airport with buses and passenger shelter.",
      pl: "Strefa autobusowa na lotnisku Don Mueang z autobusami i zadaszeniem dla pasażerów.",
    },
    author: "Athikhun.suw",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Bus_station_at_Don_Mueang_Airport_2019.jpg",
    licenseName: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  {
    stationId: "don-mueang-airport",
    src: "/images/stations/don-mueang/don-mueang-terminal-2.jpg",
    title: "Don Mueang Airport Terminal 2 front.jpg",
    caption: {
      en: "Terminal 2 front area",
      pl: "Wejście do Terminalu 2",
    },
    alt: {
      en: "Front area of Don Mueang Airport Terminal 2.",
      pl: "Przednia część Terminalu 2 na lotnisku Don Mueang.",
    },
    author: "Bebiezaza",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Don_Mueang_Airport_Terminal_2_front.jpg",
    licenseName: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  {
    stationId: "don-mueang-airport",
    src: "/images/stations/don-mueang/don-mueang-terminal-1.jpg",
    title: "Don Mueang International Airport Terminal 1.JPG",
    caption: {
      en: "Terminal 1 building",
      pl: "Budynek Terminalu 1",
    },
    alt: {
      en: "Don Mueang International Airport Terminal 1 building.",
      pl: "Budynek Terminalu 1 na lotnisku Don Mueang.",
    },
    author: "Redakie",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Don_Mueang_International_Airport_Terminal_1.JPG",
    licenseName: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  },
];

const routeStationPhotoOrder: Record<RouteId, StationPhotoStationId[]> = {
  "bangkok-to-pattaya": ["ekkamai", "north-pattaya"],
  "pattaya-to-bangkok": ["north-pattaya", "ekkamai", "mo-chit"],
  "suvarnabhumi-airport-to-pattaya": [
    "suvarnabhumi-airport",
    "north-pattaya",
  ],
  "pattaya-to-suvarnabhumi-airport": [
    "jomtien-bus-area",
    "suvarnabhumi-airport",
  ],
  "don-mueang-airport-to-pattaya": [
    "don-mueang-airport",
    "north-pattaya",
  ],
  "pattaya-to-don-mueang-airport": [
    "pattaya-sukhumvit",
    "don-mueang-airport",
  ],
};

function textForLocale(text: LocalizedText, locale: LocaleCode) {
  return locale === "pl" ? text.pl : text.en;
}

export function getStationPhotoGroupsForRoute(
  routeId: RouteId,
  locale: LocaleCode,
): StationPhotoGroup[] {
  return routeStationPhotoOrder[routeId].map((stationId) => ({
    stationId,
    title: textForLocale(stationTitles[stationId], locale),
    photos: stationPhotos.filter((photo) => photo.stationId === stationId),
  }));
}

export function getStationPhotoText(photo: StationPhoto, locale: LocaleCode) {
  return {
    caption: textForLocale(photo.caption, locale),
    alt: textForLocale(photo.alt, locale),
  };
}

export function getStationPhotoGalleryTitle(locale: LocaleCode) {
  return locale === "pl"
    ? "Jak wyglądają stacje"
    : "What the stations look like";
}

export function getStationPhotoAttributionLabel(locale: LocaleCode) {
  return locale === "pl" ? "Zdjęcie" : "Photo";
}
