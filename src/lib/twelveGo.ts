import type { RouteId } from "@/data/routes";
import type { LocaleCode } from "@/data/routes";
import { getAffiliateRoute } from "@/data/affiliateRoutes";

export { getAffiliateRoute };

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

export function build12GoRouteUrl(
  routeId: RouteId,
  lang: LocaleCode,
  subIdPosition?: string,
  subIdOverride?: string,
  travelDate?: string,
) {
  const affiliateRoute = getAffiliateRoute(routeId, lang);

  if (!affiliateRoute) {
    return null;
  }

  const affiliateId =
    process.env.NEXT_PUBLIC_12GO_AFFILIATE_ID || fallbackAffiliateId;
  const url = new URL(affiliateRoute.deepLinkUrl);

  if (affiliateId) {
    url.searchParams.set("z", affiliateId);
  }

  if (travelDate && /^\d{4}-\d{2}-\d{2}$/.test(travelDate)) {
    url.searchParams.set("date", travelDate);
  }

  const subId =
    subIdOverride ??
    (subIdPosition
      ? `${affiliateRoute.subId}-${subIdPosition}`
      : affiliateRoute.subId);

  url.searchParams.set("sub_id", subId);

  return url.toString();
}
