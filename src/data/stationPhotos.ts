import type { LocaleCode, RouteId } from "@/data/routes";

export type StationPhotoStationId =
  | "ekkamai"
  | "north-pattaya"
  | "mo-chit"
  | "suvarnabhumi-airport"
  | "jomtien-bus-area"
  | "don-mueang-airport"
  | "pattaya-sukhumvit";

type LocalizedText = Record<"en" | "pl", string> & {
  de?: string;
  fr?: string;
  ru?: string;
  th?: string;
  zh?: string;
};

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
    de: "Busbahnhof Ekkamai",
    pl: "Dworzec Ekkamai",
    ru: "автовокзал Эккамай",
    th: "สถานีขนส่งเอกมัย",
  },
  "north-pattaya": {
    en: "North Pattaya Bus Station",
    de: "Busbahnhof Nord-Pattaya",
    pl: "North Pattaya Bus Station",
    ru: "автовокзал Северной Паттайи",
    th: "สถานีขนส่งพัทยาเหนือ",
  },
  "mo-chit": {
    en: "Mo Chit 2 Bus Terminal",
    de: "Busbahnhof Mo Chit 2",
    pl: "Dworzec Mo Chit 2",
    ru: "автовокзал Мо Чит 2",
    th: "สถานีขนส่งหมอชิต 2",
  },
  "suvarnabhumi-airport": {
    en: "Suvarnabhumi Airport bus area",
    de: "Busbereich am Flughafen Suvarnabhumi",
    pl: "Strefa autobusowa na lotnisku Suvarnabhumi",
    ru: "автобусная зона аэропорта Суварнабхуми",
    th: "จุดรถบัสท่าอากาศยานสุวรรณภูมิ",
  },
  "jomtien-bus-area": {
    en: "Pattaya / Jomtien airport bus area",
    de: "Busbereich Pattaya / Jomtien",
    pl: "Strefa autobusu lotniskowego Pattaya / Jomtien",
    ru: "автобусная зона Паттайя / Джомтьен",
    th: "จุดรถบัสสนามบินพัทยา / จอมเทียน",
  },
  "don-mueang-airport": {
    en: "Don Mueang Airport",
    de: "Flughafen Don Mueang",
    pl: "Lotnisko Don Mueang",
    ru: "аэропорт Дон Муанг",
    th: "ท่าอากาศยานดอนเมือง",
  },
  "pattaya-sukhumvit": {
    en: "Pattaya Sukhumvit Road Bus Station",
    de: "Busbahnhof an der Sukhumvit Road in Pattaya",
    pl: "Pattaya Sukhumvit Road Bus Station",
    ru: "автостанция на дороге Сукхумвит в Паттайе",
    th: "สถานีรถบัสถนนสุขุมวิทพัทยา",
  },
};

const practicalCaptions = {
  entrance: {
    en: "Use this photo to recognize the terminal entrance.",
    de: "Dieses Foto hilft dir, den Eingang zum Terminal zu erkennen.",
    pl: "To zdjęcie pomoże rozpoznać wejście do terminalu.",
    ru: "Это фото поможет узнать вход в терминал.",
    th: "ใช้ภาพนี้ช่วยจำทางเข้าสถานี",
  },
  counters: {
    en: "Look for the ticket counters inside the terminal.",
    de: "Suche die Ticketschalter im Terminal.",
    pl: "Szukaj kas biletowych wewnątrz terminalu.",
    ru: "Ищите кассы внутри терминала.",
    th: "มองหาเคาน์เตอร์จำหน่ายตั๋วภายในสถานี",
  },
  boarding: {
    en: "Boarding areas may change. Check signs at the station.",
    de: "Einstiegsbereiche können sich ändern. Prüfe die Schilder an der Station.",
    pl: "Miejsca odjazdu mogą się zmieniać. Sprawdź oznaczenia na dworcu.",
    ru: "Места посадки могут меняться. Проверьте указатели на станции.",
    th: "จุดขึ้นรถอาจเปลี่ยนได้ โปรดดูป้ายที่สถานี",
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
      th: "ทางเข้าด้านนอกของสถานีขนส่งเอกมัยในกรุงเทพฯ",
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
      th: "พื้นที่ภายในสถานีขนส่งเอกมัย มีเคาน์เตอร์และป้ายใกล้จุดขึ้นรถ",
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
      th: "จุดขึ้นรถที่สถานีขนส่งเอกมัย มีป้ายชานชาลาและรถโดยสาร",
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
      de: "Busbahnhof Nord-Pattaya",
      pl: "North Pattaya Bus Station",
      ru: "автовокзал Северной Паттайи",
      th: "สถานีขนส่งพัทยาเหนือ",
    },
    caption: {
      en: "Main bus station area in North Pattaya.",
      de: "Hauptbereich des Busbahnhofs Nord-Pattaya.",
      pl: "Główny dworzec autobusowy w North Pattaya.",
      ru: "Основная зона автовокзала Северной Паттайи.",
      th: "บริเวณสถานีขนส่งหลักในพัทยาเหนือ",
    },
    alt: {
      en: "North Pattaya Bus Station entrance and terminal driveway.",
      pl: "Wejście i podjazd przy North Pattaya Bus Station.",
      th: "ทางเข้าและทางรถเข้าของสถานีขนส่งพัทยาเหนือ",
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
      th: "รถบัสและจุดขึ้นรถที่สถานีขนส่งพัทยา",
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
      th: "รถ Roong Reuang Coach ที่สถานีขนส่งพัทยา",
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
      th: "บริเวณด้านหน้าของสถานีขนส่งหมอชิต 2 ในกรุงเทพฯ",
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
      th: "บริเวณเคาน์เตอร์จำหน่ายตั๋วภายในสถานีขนส่งหมอชิต 2",
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
      th: "บริเวณชานชาลาออกเดินทางที่สถานีขนส่งหมอชิต 2",
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
      th: "รถบัสภายในศูนย์ขนส่งสาธารณะที่ท่าอากาศยานสุวรรณภูมิ",
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
      th: "พื้นที่รถบัสภายในศูนย์ขนส่งสาธารณะของท่าอากาศยานสุวรรณภูมิ",
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
      th: "รถบัสและป้ายจุดจอดที่สถานีรถบัสท่าอากาศยานสุวรรณภูมิ",
    },
    author: "Patiparn.Nice2002bkk",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Buses_in_Suvarnabhumi_Airport_Bus_Terminal_(7).jpg",
    licenseName: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  {
    stationId: "pattaya-sukhumvit",
    src: "/images/stations/pattaya-sukhumvit/pattaya-sukhumvit-road.jpg",
    title: "E8664-Pattaya-Sukhumvit-Road.jpg",
    displayTitle: {
      en: "Pattaya Sukhumvit Road Bus Station",
      de: "Busbahnhof an der Sukhumvit Road in Pattaya",
      pl: "Pattaya Sukhumvit Road Bus Station",
      ru: "Đ°Đ˛Ń‚ĐľŃŃ‚Đ°Đ˝Ń†Đ¸ŃŹ Đ˝Đ° Đ´ĐľŃ€ĐľĐłĐµ ĐˇŃĐşŃ…ŃĐĽĐ˛Đ¸Ń‚ Đ˛ ĐźĐ°Ń‚Ń‚Đ°ĐąĐµ",
      th: "ŕ¸Şŕ¸–ŕ¸˛ŕ¸™ŕ¸µŕ¸Łŕ¸–ŕ¸šŕ¸±ŕ¸Şŕ¸–ŕ¸™ŕ¸™ŕ¸Şŕ¸¸ŕ¸‚ŕ¸¸ŕ¸ˇŕ¸§ŕ¸´ŕ¸—ŕ¸žŕ¸±ŕ¸—ŕ¸˘ŕ¸˛",
    },
    caption: {
      en: "Sukhumvit Road area near the Pattaya bus boarding point. Confirm the exact stop before travel.",
      de: "Bereich der Sukhumvit Road nahe dem Bus-Einstiegspunkt in Pattaya. Bitte den genauen Halt vor der Reise bestätigen.",
      pl: "Okolica Sukhumvit Road w Pattayi przy wskazywanym miejscu odjazdu. Przed podróżą potwierdź dokładny przystanek.",
      ru: "Đ Đ°ĐąĐľĐ˝ Sukhumvit Road Ń€ŃŹĐ´ĐľĐĽ Ń ĐĽĐµŃŃ‚ĐľĐĽ ĐżĐľŃĐ°Đ´ĐşĐ¸ Đ˝Đ° Đ°Đ˛Ń‚ĐľĐ±ŃŃ Đ˛ ĐźĐ°Ń‚Ń‚Đ°ĐąĐµ. ĐźĐľĐ´Ń‚Đ˛ĐµŃ€Đ´Đ¸Ń‚Đµ Ń‚ĐľŃ‡Đ˝ŃŃŽ ĐľŃŃ‚Đ°Đ˝ĐľĐ˛ĐşŃ ĐżĐµŃ€ĐµĐ´ ĐżĐľĐµĐ·Đ´ĐşĐľĐą.",
      th: "ŕ¸žŕ¸·ŕą‰ŕ¸™ŕ¸—ŕ¸µŕąŕ¸–ŕ¸™ŕ¸™ŕ¸Şŕ¸¸ŕ¸‚ŕ¸¸ŕ¸ˇŕ¸§ŕ¸´ŕ¸—ŕąŕ¸™ŕ¸žŕ¸±ŕ¸—ŕ¸˘ŕ¸˛ ŕąŕ¸ŕ¸Ąŕą‰ŕ¸ŕ¸¸ŕ¸”ŕ¸‚ŕ¸¶ŕą‰ŕ¸™ŕ¸Łŕ¸–ŕ¸šŕ¸±ŕ¸Ş ŕą‚ŕ¸›ŕ¸Łŕ¸”ŕ¸˘ŕ¸·ŕ¸™ŕ¸˘ŕ¸±ŕ¸™ŕ¸ŕ¸¸ŕ¸”ŕ¸‚ŕ¸¶ŕą‰ŕ¸™ŕ¸Łŕ¸–ŕ¸ŕąŕ¸­ŕ¸™ŕą€ŕ¸”ŕ¸´ŕ¸™ŕ¸—ŕ¸˛ŕ¸‡",
    },
    alt: {
      en: "Sukhumvit Road in Pattaya near the bus boarding area.",
      pl: "Sukhumvit Road w Pattayi w pobliżu strefy odjazdu autobusu.",
      th: "ŕ¸–ŕ¸™ŕ¸™ŕ¸Şŕ¸¸ŕ¸‚ŕ¸¸ŕ¸ˇŕ¸§ŕ¸´ŕ¸—ŕąŕ¸™ŕ¸žŕ¸±ŕ¸—ŕ¸˘ŕ¸˛ ŕąŕ¸ŕ¸Ąŕą‰ŕ¸ŕ¸¸ŕ¸”ŕ¸‚ŕ¸¶ŕą‰ŕ¸™ŕ¸Łŕ¸–ŕ¸šŕ¸±ŕ¸Ş",
    },
    author: "Vmenkov",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:E8664-Pattaya-Sukhumvit-Road.jpg",
    licenseName: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  {
    stationId: "pattaya-sukhumvit",
    src: "/images/stations/pattaya-sukhumvit/pattaya-sukhumvit-songthaew.jpg",
    title: "Songthaew on Sukhumvit Pattaya 02.JPG",
    caption: {
      en: "Songthaew on Sukhumvit Road in Pattaya. Local pick-up points can change, so check the exact stop.",
      de: "Songthaew auf der Sukhumvit Road in Pattaya. Lokale Haltepunkte können sich ändern, bitte den genauen Halt prüfen.",
      pl: "Songthaew na Sukhumvit Road w Pattayi. Lokalne miejsca odbioru mogą się zmieniać, więc sprawdź dokładny przystanek.",
      ru: "ĐˇĐľĐ˝ĐłŃ‚ŃŤĐľ Đ˝Đ° Sukhumvit Road Đ˛ ĐźĐ°Ń‚Ń‚Đ°ĐąĐµ. ĐśĐµŃŃ‚Đ° ĐżĐľŃĐ°Đ´ĐşĐ¸ ĐĽĐľĐłŃŃ‚ ĐĽĐµĐ˝ŃŹŃ‚ŃŚŃŃŹ, ĐżŃ€ĐľĐ˛ĐµŃ€ŃŚŃ‚Đµ Ń‚ĐľŃ‡Đ˝ŃŃŽ ĐľŃŃ‚Đ°Đ˝ĐľĐ˛ĐşŃ.",
      th: "ŕ¸Şŕ¸­ŕ¸‡ŕąŕ¸–ŕ¸§ŕ¸šŕ¸™ŕ¸–ŕ¸™ŕ¸™ŕ¸Şŕ¸¸ŕ¸‚ŕ¸¸ŕ¸ˇŕ¸§ŕ¸´ŕ¸—ŕąŕ¸™ŕ¸žŕ¸±ŕ¸—ŕ¸˘ŕ¸˛ ŕ¸ŕ¸¸ŕ¸”ŕ¸Łŕ¸±ŕ¸šŕ¸­ŕ¸˛ŕ¸ŕą€ŕ¸›ŕ¸Ąŕ¸µŕąŕ¸˘ŕ¸™ŕą„ŕ¸”ŕą‰ ŕą‚ŕ¸›ŕ¸Łŕ¸”ŕ¸•ŕ¸Łŕ¸§ŕ¸ŕ¸Şŕ¸­ŕ¸šŕ¸ŕ¸¸ŕ¸”ŕ¸—ŕ¸µŕąŕąŕ¸™ŕąŕ¸™ŕ¸­ŕ¸™",
    },
    alt: {
      en: "Songthaew vehicle on Sukhumvit Road in Pattaya.",
      pl: "Songthaew na Sukhumvit Road w Pattayi.",
      th: "ŕ¸Łŕ¸–ŕ¸Şŕ¸­ŕ¸‡ŕąŕ¸–ŕ¸§ŕ¸šŕ¸™ŕ¸–ŕ¸™ŕ¸™ŕ¸Şŕ¸¸ŕ¸‚ŕ¸¸ŕ¸ˇŕ¸§ŕ¸´ŕ¸—ŕąŕ¸™ŕ¸žŕ¸±ŕ¸—ŕ¸˘ŕ¸˛",
    },
    author: "Ilya Plekhanov",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Songthaew_on_Sukhumvit_Pattaya_02.JPG",
    licenseName: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  },
  {
    stationId: "pattaya-sukhumvit",
    src: "/images/stations/pattaya-sukhumvit/pattaya-sukhumvit-songthaew-crowded.jpg",
    title: "Songthaew on Sukhumvit Pattaya.JPG",
    caption: {
      en: "Local transport on Sukhumvit Road in Pattaya. Use this as area context, not a confirmed platform.",
      de: "Nahverkehr auf der Sukhumvit Road in Pattaya. Nutze das Foto als Orientierung, nicht als bestätigten Bahnsteig.",
      pl: "Lokalny transport na Sukhumvit Road w Pattayi. To zdjęcie pokazuje okolicę, ale nie potwierdzony peron.",
      ru: "ĐśĐµŃŃ‚Đ˝Ń‹Đą Ń‚Ń€Đ°Đ˝ŃĐżĐľŃ€Ń‚ Đ˝Đ° Sukhumvit Road Đ˛ ĐźĐ°Ń‚Ń‚Đ°ĐąĐµ. ĐŃĐżĐľĐ»ŃŚĐ·ŃĐąŃ‚Đµ Ń„ĐľŃ‚Đľ Đ´Đ»ŃŹ ĐľŃ€Đ¸ĐµĐ˝Ń‚Đ¸Ń€Đ°, Đ° Đ˝Đµ ĐşĐ°Đş ĐżĐľĐ´Ń‚Đ˛ĐµŃ€Đ¶Đ´ĐµĐ˝Đ˝Ń‹Đą ĐżĐµŃ€Ń€ĐľĐ˝.",
      th: "ŕ¸Łŕ¸–ŕ¸—ŕą‰ŕ¸­ŕ¸‡ŕ¸–ŕ¸´ŕąŕ¸™ŕ¸šŕ¸™ŕ¸–ŕ¸™ŕ¸™ŕ¸Şŕ¸¸ŕ¸‚ŕ¸¸ŕ¸ˇŕ¸§ŕ¸´ŕ¸—ŕąŕ¸™ŕ¸žŕ¸±ŕ¸—ŕ¸˘ŕ¸˛ ŕąŕ¸Šŕą‰ŕ¸ ŕ¸˛ŕ¸žŕ¸™ŕ¸µŕą‰ŕą€ŕ¸žŕ¸·ŕąŕ¸­ŕ¸ŕ¸łŕ¸šŕ¸Łŕ¸Łŕ¸˘ŕ¸˛ŕ¸ŕ¸˛ŕ¸¨ŕ¸žŕ¸·ŕą‰ŕ¸™ŕ¸—ŕ¸µŕą ŕą„ŕ¸ˇŕąŕąŕ¸Šŕąŕ¸Šŕ¸˛ŕ¸™ŕ¸Šŕ¸˛ŕ¸Ąŕ¸˛ŕ¸—ŕ¸µŕąŕ¸˘ŕ¸·ŕ¸™ŕ¸˘ŕ¸±ŕ¸™ŕąŕ¸Ąŕą‰ŕ¸§",
    },
    alt: {
      en: "Local songthaew transport on Sukhumvit Road in Pattaya.",
      pl: "Lokalny songthaew na Sukhumvit Road w Pattayi.",
      th: "ŕ¸Łŕ¸–ŕ¸Şŕ¸­ŕ¸‡ŕąŕ¸–ŕ¸§ŕ¸—ŕą‰ŕ¸­ŕ¸‡ŕ¸–ŕ¸´ŕąŕ¸™ŕ¸šŕ¸™ŕ¸–ŕ¸™ŕ¸™ŕ¸Şŕ¸¸ŕ¸‚ŕ¸¸ŕ¸ˇŕ¸§ŕ¸´ŕ¸—ŕąŕ¸™ŕ¸žŕ¸±ŕ¸—ŕ¸˘ŕ¸˛",
    },
    author: "Ilya Plekhanov",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Songthaew_on_Sukhumvit_Pattaya.JPG",
    licenseName: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  },
  {
    stationId: "don-mueang-airport",
    src: "/images/stations/don-mueang/don-mueang-bus-station.jpg",
    title: "Bus station at Don Mueang Airport 2019.jpg",
    caption: {
      en: "Bus station area at Don Mueang Airport",
      de: "Busbereich am Flughafen Don Mueang",
      pl: "Strefa autobusowa na lotnisku Don Mueang",
      ru: "Автобусная зона в аэропорту Дон Муанг",
      th: "บริเวณสถานีรถบัสที่ท่าอากาศยานดอนเมือง",
    },
    alt: {
      en: "Bus station area at Don Mueang Airport with buses and passenger shelter.",
      pl: "Strefa autobusowa na lotnisku Don Mueang z autobusami i zadaszeniem dla pasażerów.",
      th: "บริเวณสถานีรถบัสที่ท่าอากาศยานดอนเมือง มีรถบัสและที่พักผู้โดยสาร",
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
      de: "Vorderer Bereich von Terminal 2",
      pl: "Wejście do Terminalu 2",
      ru: "Входная зона терминала 2",
      th: "บริเวณด้านหน้าอาคารผู้โดยสาร 2",
    },
    alt: {
      en: "Front area of Don Mueang Airport Terminal 2.",
      pl: "Przednia część Terminalu 2 na lotnisku Don Mueang.",
      th: "บริเวณด้านหน้าอาคารผู้โดยสาร 2 ของท่าอากาศยานดอนเมือง",
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
      de: "Gebäude von Terminal 1",
      pl: "Budynek Terminalu 1",
      ru: "Здание терминала 1",
      th: "อาคารผู้โดยสาร 1",
    },
    alt: {
      en: "Don Mueang International Airport Terminal 1 building.",
      pl: "Budynek Terminalu 1 na lotnisku Don Mueang.",
      th: "อาคารผู้โดยสาร 1 ของท่าอากาศยานดอนเมือง",
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
  if (locale === "pl") {
    return text.pl;
  }

  if (locale === "ru") {
    return text.ru ?? "Фото станции";
  }

  if (locale === "de") {
    return text.de ?? "Stationsfoto";
  }

  if (locale === "th") {
    return text.th ?? "ภาพสถานี";
  }

  if (locale === "zh") {
    return text.zh ?? "车站照片";
  }

  if (locale === "fr") {
    return text.fr ?? "Photo de la station";
  }

  return text.en;
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
  if (locale === "th") {
    return "ภาพสถานี";
  }
  if (locale === "ru") {
    return "Фото станций";
  }
  if (locale === "de") {
    return "Stationsfotos";
  }
  if (locale === "zh") {
    return "车站照片";
  }
  if (locale === "fr") {
    return "Photos des stations";
  }
  return locale === "pl"
    ? "Jak wyglądają stacje"
    : "What the stations look like";
}

export function getStationPhotoAttributionLabel(locale: LocaleCode) {
  if (locale === "th") {
    return "ภาพถ่าย";
  }
  if (locale === "ru") {
    return "Фото";
  }
  if (locale === "de") {
    return "Foto";
  }
  if (locale === "zh") {
    return "照片";
  }
  if (locale === "fr") {
    return "Photo";
  }
  return locale === "pl" ? "Zdjęcie" : "Photo";
}
