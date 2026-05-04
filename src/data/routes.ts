export type LocaleCode = "en" | "th" | "zh" | "ru" | "de" | "fr" | "pl";

export type RouteId =
  | "bangkok-to-pattaya"
  | "pattaya-to-bangkok"
  | "suvarnabhumi-airport-to-pattaya"
  | "pattaya-to-suvarnabhumi-airport";

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
];

export const defaultRouteId: RouteId = "bangkok-to-pattaya";

export const routePages: RoutePage[] = [
  {
    slug: "bangkok-to-pattaya",
    title: "Bangkok to Pattaya Bus",
    intro:
      "A simple guide for tourists taking the bus from central Bangkok to Pattaya, with departure times, station tips, and practical travel notes.",
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
      "Check the Pattaya to Suvarnabhumi Airport bus route, including travel time, boarding information, and schedule verification status.",
    from: "Pattaya / Jomtien bus area",
    to: "Suvarnabhumi Airport",
    stationIds: ["jomtien-bus-area", "suvarnabhumi-airport"],
    metadata: {
      title:
        "Pattaya to Suvarnabhumi Airport Bus | Schedule Verification & Travel Tips",
      description:
        "Check Pattaya to Suvarnabhumi Airport bus information, travel time, boarding area, and practical airport travel tips. Schedule times need confirmation before travel.",
    },
  },
];

export function getRoutePage(slug: string) {
  return routePages.find((page) => page.slug === slug);
}
