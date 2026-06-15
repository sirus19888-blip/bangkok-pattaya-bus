import type { RouteId } from "@/data/routes";

export type SeoGuideLink = {
  description: string;
  href: string;
  slug: string;
  title: string;
};

export const seoGuideLinks: SeoGuideLink[] = [
  {
    description:
      "Find the terminal, ticket counters, BTS access and practical boarding tips.",
    href: "/en/ekkamai-bus-terminal-to-pattaya-guide",
    slug: "ekkamai-bus-terminal-to-pattaya-guide",
    title: "Ekkamai Bus Terminal to Pattaya guide",
  },
  {
    description:
      "Compare Mo Chit 2 with Ekkamai and plan tickets, travel time and return options.",
    href: "/en/mo-chit-bus-terminal-to-pattaya",
    slug: "mo-chit-bus-terminal-to-pattaya",
    title: "Mo Chit Bus Terminal to Pattaya guide",
  },
  {
    description:
      "Use the Level 1 Gate 8 guide before taking the airport bus to Pattaya.",
    href: "/en/suvarnabhumi-airport-gate-8-pattaya-bus",
    slug: "suvarnabhumi-airport-gate-8-pattaya-bus",
    title: "Suvarnabhumi Airport Gate 8 to Pattaya bus",
  },
  {
    description:
      "Compare the cheapest bus with taxi and private transfer options.",
    href: "/en/bangkok-to-pattaya-bus-vs-taxi",
    slug: "bangkok-to-pattaya-bus-vs-taxi",
    title: "Bangkok to Pattaya bus vs taxi",
  },
  {
    description:
      "Plan safe alternatives when scheduled buses are no longer useful.",
    href: "/en/bangkok-to-pattaya-after-midnight",
    slug: "bangkok-to-pattaya-after-midnight",
    title: "Bangkok to Pattaya after midnight",
  },
  {
    description:
      "Leave enough time for Bangkok traffic, check-in, baggage and security.",
    href: "/en/pattaya-to-bangkok-before-flight",
    slug: "pattaya-to-bangkok-before-flight",
    title: "Pattaya to Bangkok before a flight",
  },
  {
    description:
      "Plan the local transfer from North Pattaya Bus Station to Jomtien or Thappraya.",
    href: "/en/pattaya-bus-station-to-jomtien",
    slug: "pattaya-bus-station-to-jomtien",
    title: "Pattaya Bus Station to Jomtien guide",
  },
  {
    description:
      "Take the direct Transport Co. bus from Don Mueang Airport to Pattaya - operator, fare, where to find the counter and travel tips.",
    href: "/en/don-mueang-airport-to-pattaya-bus",
    slug: "don-mueang-airport-to-pattaya-bus",
    title: "Don Mueang Airport to Pattaya bus guide",
  },
  {
    description:
      "Plan the direct Pattaya to Don Mueang Airport bus before a flight - departure point, fare, travel time and check-in buffer.",
    href: "/en/pattaya-to-don-mueang-airport-bus",
    slug: "pattaya-to-don-mueang-airport-bus",
    title: "Pattaya to Don Mueang Airport bus guide",
  },
  {
    description:
      "Plan the bus from Pattaya to Suvarnabhumi Airport before a flight - departure point, fare, travel time, baggage and how much buffer to leave.",
    href: "/en/pattaya-to-suvarnabhumi-airport-before-flight",
    slug: "pattaya-to-suvarnabhumi-airport-before-flight",
    title: "Pattaya to Suvarnabhumi before a flight guide",
  },
  {
    description:
      "Choosing between Ekkamai and Mo Chit for the bus from Pattaya to Bangkok - which terminal fits your destination and onward transport.",
    href: "/en/pattaya-to-bangkok-which-terminal",
    slug: "pattaya-to-bangkok-which-terminal",
    title: "Pattaya to Bangkok: which terminal guide",
  },
];

const routeGuideSlugs: Partial<Record<RouteId, string[]>> = {
  "don-mueang-airport-to-pattaya": ["don-mueang-airport-to-pattaya-bus"],
  "pattaya-to-don-mueang-airport": ["pattaya-to-don-mueang-airport-bus"],
  "bangkok-to-pattaya": [
    "ekkamai-bus-terminal-to-pattaya-guide",
    "mo-chit-bus-terminal-to-pattaya",
    "bangkok-to-pattaya-bus-vs-taxi",
    "bangkok-to-pattaya-after-midnight",
  ],
  "pattaya-to-bangkok": ["pattaya-to-bangkok-before-flight", "pattaya-to-bangkok-which-terminal"],
  "suvarnabhumi-airport-to-pattaya": [
    "suvarnabhumi-airport-gate-8-pattaya-bus",
  ],
  "pattaya-to-suvarnabhumi-airport": ["pattaya-bus-station-to-jomtien", "pattaya-to-suvarnabhumi-airport-before-flight"],
};

export function getHomepageSeoGuideLinks() {
  return seoGuideLinks;
}

export function getSeoGuideLinksForRoute(routeId: RouteId) {
  const slugs = routeGuideSlugs[routeId] ?? [];

  return slugs
    .map((slug) => seoGuideLinks.find((guide) => guide.slug === slug))
    .filter((guide) => guide !== undefined);
}
