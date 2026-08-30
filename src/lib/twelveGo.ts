import type { AffiliateCTAPosition } from "@/components/AffiliateCTA";
import type { RouteId } from "@/data/routes";
import type { LocaleCode } from "@/data/routes";
import { getAffiliateRoute } from "@/data/affiliateRoutes";

export { getAffiliateRoute };

const fallbackAffiliateId = "15791301";

// Pozycje CTA, ktorych tresc juz argumentuje, ze autobus nie jest odpowiedzia:
// luka po ostatnim autobusie, pelny autobus, porownanie z taksowka, transfer
// z lotniska i po miescie oraz blok transferowy w przewodnikach. Tylko one
// prowadza na liste przefiltrowana do przewozow charter.
//
// Celowo NIE ma tu CTA "kup bilet na autobus" - route_after_schedule, route_top,
// desktop_sidebar, mobile_sticky, guide_mobile_sticky, guide_short_answer,
// guide_body, route_help_online_vs_station, route_commercial_help i homepage_*.
// Wyslanie kogos, kto szuka autobusu za 148 THB, na liste zaczynajaca sie od
// dziesieciokrotnosci tej ceny byloby zlamaniem obietnicy, ktora sklada tekst
// nad przyciskiem. Wiarygodnosc jest tu jedyna realna przewaga.
const charterCtaPositions = new Set<AffiliateCTAPosition>([
  "guide_transfer",
  "route_airport_transfer",
  "route_charter_gap",
  "route_city_transfer",
  "route_help_after_last",
  "route_help_bus_full",
  "route_help_vs_taxi",
]);

/**
 * Czy dana pozycja CTA ma prowadzic na przefiltrowana liste przewozow charter.
 * Eksportowane, zeby straznik w scripts/check-affiliate-links.mjs sprawdzal
 * dokladnie te sama liste, a nie jej kopie.
 */
export function usesCharterFilter(ctaPosition?: string) {
  return Boolean(
    ctaPosition && charterCtaPositions.has(ctaPosition as AffiliateCTAPosition),
  );
}

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

  // Potwierdzone w T64 na zywym 12go.asia: parametr przelacza liste wynikow na
  // przewozy charter, a zakladki pozostalych kategorii zostaja widoczne, wiec
  // czytelnik jednym klikniecem wraca do autobusu. Atrybucja dziala tak samo
  // jak na adresie ogolnym - z i sub_id nadal ladują w ciasteczkach 12Go.
  if (usesCharterFilter(subIdPosition)) {
    url.searchParams.set("vehclasses_tab", "charter");
  }

  const subId =
    subIdOverride ??
    (subIdPosition
      ? `${affiliateRoute.subId}-${subIdPosition}`
      : affiliateRoute.subId);

  url.searchParams.set("sub_id", subId);

  return url.toString();
}
