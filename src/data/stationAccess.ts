import type { LocaleCode, RouteId } from "@/data/routes";

type LocalizedText = Record<"en" | "pl", string>;

export type StationAccessGuide = {
  routeId: RouteId;
  title: LocalizedText;
  items: LocalizedText[];
  note: LocalizedText;
};

export const stationAccessGuides: Record<RouteId, StationAccessGuide> = {
  "bangkok-to-pattaya": {
    routeId: "bangkok-to-pattaya",
    title: {
      en: "How to get to Ekkamai Bus Terminal",
      pl: "Jak dotrzeć na dworzec Ekkamai",
    },
    items: [
      {
        en: "By BTS: Take the BTS Sukhumvit Line to Ekkamai Station. The bus terminal is usually about a 5-minute walk from the station.",
        pl: "BTS: Jedź linią BTS Sukhumvit do stacji Ekkamai. Dworzec autobusowy jest zwykle około 5 minut pieszo od stacji.",
      },
      {
        en: "By taxi or Grab: Good if you have luggage. Price depends on traffic and pickup location. Check the app fare before you book.",
        pl: "Taxi lub Grab: Dobre rozwiązanie, jeśli masz bagaż. Cena zależy od korków i miejsca odbioru. Sprawdź cenę w aplikacji przed zamówieniem.",
      },
      {
        en: "Avoid tuk-tuks for this trip unless you agree on the price first. Around tourist areas, tuk-tuks can be more expensive than expected.",
        pl: "Unikaj tuk-tuka na tej trasie, chyba że wcześniej ustalisz cenę. W miejscach turystycznych tuk-tuki mogą być droższe, niż się wydaje.",
      },
      {
        en: "Tip: Arrive 20-30 minutes before departure to buy your ticket and find the correct platform.",
        pl: "Wskazówka: Przyjdź 20-30 minut przed odjazdem, żeby kupić bilet i znaleźć właściwe stanowisko.",
      },
    ],
    note: {
      en: "Transport prices can change. App-based ride prices vary by traffic, demand, and pickup point.",
      pl: "Ceny transportu mogą się zmieniać. Ceny przejazdów w aplikacjach zależą od korków, popytu i miejsca odbioru.",
    },
  },
  "pattaya-to-bangkok": {
    routeId: "pattaya-to-bangkok",
    title: {
      en: "How to get to North Pattaya Bus Station",
      pl: "Jak dotrzeć na North Pattaya Bus Station",
    },
    items: [
      {
        en: "By songthaew: A shared songthaew can be a cheap option if it goes in the right direction, but routes may not be obvious for first-time visitors.",
        pl: "Songthaew: Wspólny songthaew może być tanią opcją, jeśli jedzie w dobrą stronę, ale trasy mogą być niejasne dla osób pierwszy raz w Pattayi.",
      },
      {
        en: "By taxi or Grab: The easiest option from hotels or beach areas. Price varies by distance, traffic, and demand. Check the app fare before booking.",
        pl: "Taxi lub Grab: Najłatwiejsza opcja z hotelu albo okolic plaży. Cena zależy od dystansu, korków i popytu. Sprawdź cenę w aplikacji przed zamówieniem.",
      },
      {
        en: "From central Pattaya: Leave extra time, especially in the afternoon or during weekends.",
        pl: "Z centrum Pattayi: Zostaw dodatkowy czas, szczególnie po południu i w weekendy.",
      },
      {
        en: "Tip: Check whether your bus goes to Ekkamai or Mo Chit before buying the ticket.",
        pl: "Wskazówka: Przed zakupem biletu sprawdź, czy autobus jedzie do Ekkamai czy Mo Chit.",
      },
    ],
    note: {
      en: "Transport prices can change. App-based ride prices vary by traffic, demand, and pickup point.",
      pl: "Ceny transportu mogą się zmieniać. Ceny przejazdów w aplikacjach zależą od korków, popytu i miejsca odbioru.",
    },
  },
  "suvarnabhumi-airport-to-pattaya": {
    routeId: "suvarnabhumi-airport-to-pattaya",
    title: {
      en: "How to find the airport bus counter",
      pl: "Jak znaleźć stanowisko autobusu na lotnisku",
    },
    items: [
      {
        en: "After arrival: Allow time for immigration, baggage claim, and walking through the airport.",
        pl: "Po przylocie: Zostaw czas na kontrolę paszportową, odbiór bagażu i przejście przez lotnisko.",
      },
      {
        en: "Bus counter: Current route data says the bus counter is on Level 1 near Gate 8. Follow airport signs and confirm at the counter.",
        pl: "Stanowisko autobusu: Z aktualnych danych trasy wynika, że stanowisko jest na poziomie 1 w pobliżu bramki 8. Kieruj się oznaczeniami na lotnisku i potwierdź przy stanowisku.",
      },
      {
        en: "Airport Rail Link: Not needed for this bus route, but useful if you are going into Bangkok. Airport Rail Link fares are usually 15-45 THB depending on distance.",
        pl: "Airport Rail Link: Nie jest potrzebny na tej trasie autobusowej, ale przydaje się, jeśli jedziesz do Bangkoku. Przejazd Airport Rail Link zwykle kosztuje 15-45 THB zależnie od odległości.",
      },
      {
        en: "Taxi or Grab: Useful if you miss the bus or travel late. Price varies by traffic, tolls, and demand. Check the app or taxi queue price before you go.",
        pl: "Taxi lub Grab: Przydatne, jeśli spóźnisz się na autobus albo jedziesz późno. Cena zależy od korków, opłat drogowych i popytu. Sprawdź cenę w aplikacji albo na postoju taxi.",
      },
      {
        en: "Tip: The late 22:00 bus may go to North Pattaya Bus Station rather than Jomtien. Confirm before buying the ticket.",
        pl: "Wskazówka: Późny autobus o 22:00 może jechać do North Pattaya Bus Station, a nie do Jomtien. Potwierdź przed zakupem biletu.",
      },
    ],
    note: {
      en: "Transport prices can change. App-based ride prices vary by traffic, demand, and pickup point.",
      pl: "Ceny transportu mogą się zmieniać. Ceny przejazdów w aplikacjach zależą od korków, popytu i miejsca odbioru.",
    },
  },
  "pattaya-to-suvarnabhumi-airport": {
    routeId: "pattaya-to-suvarnabhumi-airport",
    title: {
      en: "How to get to the Pattaya airport bus area",
      pl: "Jak dotrzeć do strefy autobusu lotniskowego w Pattayi",
    },
    items: [
      {
        en: "From your hotel: Taxi or Grab is usually the easiest option if you have luggage. Price varies by distance, traffic, and demand.",
        pl: "Z hotelu: Taxi lub Grab to zwykle najłatwiejsza opcja, jeśli masz bagaż. Cena zależy od dystansu, korków i popytu.",
      },
      {
        en: "By songthaew: It may be cheap if the route is convenient, but first-time visitors should allow extra time.",
        pl: "Songthaew: Może być tani, jeśli trasa jest wygodna, ale osoby pierwszy raz w Pattayi powinny zostawić dodatkowy czas.",
      },
      {
        en: "Jomtien bus station: The operator shows tickets as available at the counter service there. Confirm the exact boarding point before you go.",
        pl: "Dworzec Jomtien: Według informacji operatora bilety można kupić przy stanowisku obsługi. Przed wyjazdem potwierdź dokładne miejsce odjazdu.",
      },
      {
        en: "Tip: Leave a generous buffer for traffic, check-in, security, and immigration at the airport.",
        pl: "Wskazówka: Zostaw duży zapas czasu na ruch drogowy, odprawę, kontrolę bezpieczeństwa i paszportową na lotnisku.",
      },
    ],
    note: {
      en: "Transport prices can change. App-based ride prices vary by traffic, demand, and pickup point.",
      pl: "Ceny transportu mogą się zmieniać. Ceny przejazdów w aplikacjach zależą od korków, popytu i miejsca odbioru.",
    },
  },
  "don-mueang-airport-to-pattaya": {
    routeId: "don-mueang-airport-to-pattaya",
    title: {
      en: "How to find the Don Mueang bus area",
      pl: "Jak znaleźć autobus na lotnisku Don Mueang",
    },
    items: [
      {
        en: "After arrival: Allow time for baggage, airport navigation, and walking to the bus counter or pick-up point.",
        pl: "Po przylocie: Zostaw czas na bagaż, przejście przez lotnisko i dojście do stanowiska autobusu.",
      },
      {
        en: "Bus counter: The airport page shows service counters in Terminal 1 Gate 1 and Terminal 2 Gate 11. Confirm the Pattaya bus when you arrive.",
        pl: "Stanowisko autobusu: Strona lotniska pokazuje stanowiska w Terminalu 1 przy bramce 1 i Terminalu 2 przy bramce 11. Potwierdź autobus do Pattaya na miejscu.",
      },
      {
        en: "Pick-up point: The airport page lists Service Hall Building as the pick-up point. Follow airport signs and ask at the counter.",
        pl: "Miejsce odjazdu: Strona lotniska wskazuje Service Hall Building. Kieruj się oznaczeniami i zapytaj przy stanowisku.",
      },
      {
        en: "Tip: Bangkok traffic can be unpredictable, so keep your arrival plans flexible.",
        pl: "Wskazówka: Ruch w Bangkoku bywa nieprzewidywalny, więc zostaw elastyczny plan po przyjeździe.",
      },
    ],
    note: {
      en: "Transport prices can change. App-based ride prices vary by traffic, demand, and pickup point.",
      pl: "Ceny transportu mogą się zmieniać. Ceny przejazdów w aplikacjach zależą od korków, popytu i miejsca odbioru.",
    },
  },
  "pattaya-to-don-mueang-airport": {
    routeId: "pattaya-to-don-mueang-airport",
    title: {
      en: "How to get to the Pattaya Don Mueang bus stop",
      pl: "Jak dotrzeć do autobusu Pattaya - Don Mueang",
    },
    items: [
      {
        en: "From your hotel: Taxi or Grab is usually easiest with luggage. Price varies by distance, traffic, and demand.",
        pl: "Z hotelu: Taxi lub Grab to zwykle najłatwiejsza opcja z bagażem. Cena zależy od dystansu, korków i popytu.",
      },
      {
        en: "By songthaew: It can be cheap if the route works for you, but first-time visitors should allow extra time.",
        pl: "Songthaew: Może być tani, jeśli trasa jest wygodna, ale osoby pierwszy raz w Pattayi powinny zostawić dodatkowy czas.",
      },
      {
        en: "Boarding point: Secondary sources point to Pattaya Sukhumvit Road Bus Station. Confirm the exact stop before travel.",
        pl: "Miejsce odjazdu: Źródła dodatkowe wskazują Pattaya Sukhumvit Road Bus Station. Potwierdź dokładne miejsce przed podróżą.",
      },
      {
        en: "Tip: Do not rely on the last possible bus before a flight. Leave a backup option in case of traffic or delays.",
        pl: "Wskazówka: Nie opieraj planu na ostatnim możliwym autobusie przed lotem. Zostaw opcję awaryjną na wypadek korków lub opóźnień.",
      },
    ],
    note: {
      en: "Transport prices can change. App-based ride prices vary by traffic, demand, and pickup point.",
      pl: "Ceny transportu mogą się zmieniać. Ceny przejazdów w aplikacjach zależą od korków, popytu i miejsca odbioru.",
    },
  },
};

export function getStationAccessGuide(routeId: RouteId, locale: LocaleCode) {
  const guide = stationAccessGuides[routeId];
  const textLocale = locale === "pl" ? "pl" : "en";

  return {
    title: guide.title[textLocale],
    items: guide.items.map((item) => item[textLocale]),
    note: guide.note[textLocale],
  };
}

export function getStationAccessSectionTitle(locale: LocaleCode) {
  return locale === "pl" ? "Jak dotrzeć na dworzec" : "How to get to the station";
}
