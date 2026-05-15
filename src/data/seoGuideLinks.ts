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
];

const routeGuideSlugs: Partial<Record<RouteId, string[]>> = {
  "bangkok-to-pattaya": [
    "ekkamai-bus-terminal-to-pattaya-guide",
    "bangkok-to-pattaya-bus-vs-taxi",
    "bangkok-to-pattaya-after-midnight",
  ],
  "pattaya-to-bangkok": ["pattaya-to-bangkok-before-flight"],
  "suvarnabhumi-airport-to-pattaya": [
    "suvarnabhumi-airport-gate-8-pattaya-bus",
  ],
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
