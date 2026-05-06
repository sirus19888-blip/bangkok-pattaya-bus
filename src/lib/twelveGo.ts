import type { RouteId } from "@/data/routes";

const fallbackAffiliateId = "15791301";

const routesWithTickets: RouteId[] = [
  "bangkok-to-pattaya",
  "pattaya-to-bangkok",
  "suvarnabhumi-airport-to-pattaya",
  "pattaya-to-suvarnabhumi-airport",
  "don-mueang-airport-to-pattaya",
  "pattaya-to-don-mueang-airport",
];

const routeSlugs: Record<RouteId, { from: string; to: string }> = {
  "bangkok-to-pattaya": {
    from: "bangkok",
    to: "pattaya",
  },
  "pattaya-to-bangkok": {
    from: "pattaya",
    to: "bangkok",
  },
  "suvarnabhumi-airport-to-pattaya": {
    from: "suvarnabhumi-airport",
    to: "pattaya",
  },
  "pattaya-to-suvarnabhumi-airport": {
    from: "pattaya",
    to: "suvarnabhumi-airport",
  },
  "don-mueang-airport-to-pattaya": {
    from: "don-mueang-airport",
    to: "pattaya",
  },
  "pattaya-to-don-mueang-airport": {
    from: "pattaya",
    to: "don-mueang-airport",
  },
};

export function hasTwelveGoTickets(routeId: RouteId) {
  return routesWithTickets.includes(routeId);
}

export function build12GoRouteUrl(routeId?: RouteId) {
  const affiliateId =
    process.env.NEXT_PUBLIC_12GO_AFFILIATE_ID ?? fallbackAffiliateId;
  const route = routeId ? routeSlugs[routeId] : null;
  const url = new URL(
    route
      ? `https://12go.asia/en/travel/${route.from}/${route.to}`
      : "https://12go.asia/en",
  );

  if (affiliateId) {
    url.searchParams.set("z", affiliateId);
  }

  return url.toString();
}
