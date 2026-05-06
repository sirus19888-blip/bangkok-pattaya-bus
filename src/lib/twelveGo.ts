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

export function hasTwelveGoTickets(routeId: RouteId) {
  return routesWithTickets.includes(routeId);
}

export function build12GoRouteUrl(_routeId?: RouteId) {
  const affiliateId =
    process.env.NEXT_PUBLIC_12GO_AFFILIATE_ID ?? fallbackAffiliateId;
  const url = new URL("https://12go.asia/en");

  if (affiliateId) {
    url.searchParams.set("z", affiliateId);
  }

  return url.toString();
}
