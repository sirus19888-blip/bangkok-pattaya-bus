export type LocaleCode = "en" | "th" | "zh" | "ru" | "de" | "fr" | "pl";

export type RouteId =
  | "bangkok-to-pattaya"
  | "pattaya-to-bangkok"
  | "suvarnabhumi-airport-to-pattaya"
  | "pattaya-to-suvarnabhumi-airport"
  | "don-mueang-airport-to-pattaya"
  | "pattaya-to-don-mueang-airport";

export type Route = {
  id: RouteId;
  label: string;
  shortLabel: string;
  distance: string;
  duration: string;
};

export type RoutePage = {
  slug: RouteId;
  title: string;
  intro: string;
  relatedDescription: string;
  from: string;
  to: string;
  stationIds: string[];
  metadata: {
    title: string;
    description: string;
  };
};

export const supportedLocales: { code: LocaleCode; label: string }[] = [
  { code: "en", label: "English" },
  { code: "th", label: "Thai" },
  { code: "zh", label: "Chinese" },
  { code: "ru", label: "Russian" },
  { code: "de", label: "German" },
  { code: "fr", label: "French" },
  { code: "pl", label: "Polish" },
];

export const supportedLocaleCodes = supportedLocales.map((locale) => locale.code);

export function isSupportedLocale(locale: string): locale is LocaleCode {
  return supportedLocaleCodes.includes(locale as LocaleCode);
}

export const routes: Route[] = [
  {
    id: "bangkok-to-pattaya",
    label: "Bangkok to Pattaya",
    shortLabel: "BKK -> Pattaya",
    distance: "150 km",
    duration: "2h 30m to 3h",
  },
  {
    id: "pattaya-to-bangkok",
    label: "Pattaya to Bangkok",
    shortLabel: "Pattaya -> BKK",
    distance: "150 km",
    duration: "2h 30m to 3h",
  },
  {
    id: "suvarnabhumi-airport-to-pattaya",
    label: "Suvarnabhumi Airport to Pattaya",
    shortLabel: "BKK Airport -> Pattaya",
    distance: "120 km",
    duration: "2h to 2h 30m",
  },
  {
    id: "pattaya-to-suvarnabhumi-airport",
    label: "Pattaya to Suvarnabhumi Airport",
    shortLabel: "Pattaya -> BKK Airport",
    distance: "120 km",
    duration: "2h to 2h 30m",
  },
  {
    id: "don-mueang-airport-to-pattaya",
    label: "Don Mueang Airport to Pattaya",
    shortLabel: "DMK -> Pattaya",
    distance: "155 km",
    duration: "3h to 3h 30m",
  },
  {
    id: "pattaya-to-don-mueang-airport",
    label: "Pattaya to Don Mueang Airport",
    shortLabel: "Pattaya -> DMK",
    distance: "155 km",
    duration: "3h to 3h 30m",
  },
];

export const defaultRouteId: RouteId = "bangkok-to-pattaya";

export const routePages: RoutePage[] = [
  {
    slug: "bangkok-to-pattaya",
    title: "Bangkok to Pattaya Bus",
    intro:
      "A simple guide for tourists taking the bus from central Bangkok to Pattaya, with departure times, station tips, and practical travel notes.",
    relatedDescription:
      "Check Bangkok to Pattaya bus times, ticket price, stations, and travel tips.",
    from: "Bangkok",
    to: "Pattaya",
    stationIds: ["ekkamai", "north-pattaya"],
    metadata: {
      title: "Bangkok to Pattaya Bus Times | Bangkok Pattaya Bus Guide",
      description:
        "Check Bangkok to Pattaya bus departures, travel time, ticket price, station information, and useful tourist tips.",
    },
  },
  {
    slug: "pattaya-to-bangkok",
    title: "Pattaya to Bangkok Bus",
    intro:
      "Plan the return trip from Pattaya to Bangkok with easy-to-read departure times, station details, and travel advice.",
    relatedDescription:
      "Plan the return trip from Pattaya to Bangkok with departure times and station tips.",
    from: "Pattaya",
    to: "Bangkok",
    stationIds: ["north-pattaya", "mo-chit", "ekkamai"],
    metadata: {
      title: "Pattaya to Bangkok Bus Times | Bangkok Pattaya Bus Guide",
      description:
        "Find Pattaya to Bangkok bus times, travel duration, ticket price, station information, and FAQ for tourists.",
    },
  },
  {
    slug: "suvarnabhumi-airport-to-pattaya",
    title: "Suvarnabhumi Airport to Pattaya Bus",
    intro:
      "Useful information for travelers going directly from Suvarnabhumi Airport to Pattaya by bus after arriving in Thailand.",
    relatedDescription:
      "Useful airport bus information from Suvarnabhumi to Pattaya after arrival.",
    from: "Suvarnabhumi Airport",
    to: "Pattaya",
    stationIds: ["suvarnabhumi-airport", "north-pattaya"],
    metadata: {
      title:
        "Suvarnabhumi Airport to Pattaya Bus Times | Bangkok Pattaya Bus Guide",
      description:
        "Check Suvarnabhumi Airport to Pattaya bus times, travel time, ticket price, station details, and practical travel tips.",
    },
  },
  {
    slug: "pattaya-to-suvarnabhumi-airport",
    title: "Pattaya to Suvarnabhumi Airport Bus",
    intro:
      "Check bus times from Pattaya/Jomtien to Suvarnabhumi Airport, including ticket price, travel time, boarding information, and tips before your flight.",
    relatedDescription:
      "Check Pattaya to Suvarnabhumi Airport bus times, price, and boarding tips.",
    from: "Pattaya / Jomtien bus area",
    to: "Suvarnabhumi Airport",
    stationIds: ["jomtien-bus-area", "suvarnabhumi-airport"],
    metadata: {
      title:
        "Pattaya to Suvarnabhumi Airport Bus | Times, Price & Boarding Info",
      description:
        "Check Pattaya to Suvarnabhumi Airport bus times, ticket price, travel time, boarding area, and practical airport travel tips.",
    },
  },
  {
    slug: "don-mueang-airport-to-pattaya",
    title: "Don Mueang Airport to Pattaya Bus",
    intro:
      "Check bus information from Don Mueang Airport to Pattaya, including departure times, travel time, station notes, and source information.",
    relatedDescription:
      "Check Don Mueang Airport to Pattaya bus information and station notes.",
    from: "Don Mueang Airport",
    to: "Pattaya",
    stationIds: ["don-mueang-airport", "north-pattaya"],
    metadata: {
      title: "Don Mueang Airport to Pattaya Bus | Schedule & Travel Info",
      description:
        "Check Don Mueang Airport to Pattaya bus information, departure times, travel time, station notes, and source status.",
    },
  },
  {
    slug: "pattaya-to-don-mueang-airport",
    title: "Pattaya to Don Mueang Airport Bus",
    intro:
      "Check bus information from Pattaya to Don Mueang Airport, including travel time, source notes, and tips before your flight.",
    relatedDescription:
      "Check Pattaya to Don Mueang Airport bus information and flight-day tips.",
    from: "Pattaya",
    to: "Don Mueang Airport",
    stationIds: ["pattaya-sukhumvit", "don-mueang-airport"],
    metadata: {
      title: "Pattaya to Don Mueang Airport Bus | Schedule & Travel Info",
      description:
        "Check Pattaya to Don Mueang Airport bus information, travel time, departure notes, source status, and airport travel tips.",
    },
  },
];

export function getRoutePage(slug: string) {
  return routePages.find((page) => page.slug === slug);
}
