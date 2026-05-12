import type { LocaleCode, RouteId } from "@/data/routes";

export type AffiliateRoute = {
  routeId: RouteId;
  from: string;
  to: string;
  lang: LocaleCode;
  provider: "12go";
  deepLinkUrl: string;
  subId: string;
};

const baseRoutes: Record<RouteId, { from: string; to: string }> = {
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

export const affiliateRoutes: AffiliateRoute[] = Object.entries(
  baseRoutes,
).flatMap(([routeId, route]) =>
  (["en", "th", "zh", "ru", "de", "fr", "pl"] as LocaleCode[]).map(
    (lang) => ({
      routeId: routeId as RouteId,
      from: route.from,
      to: route.to,
      lang,
      provider: "12go" as const,
      deepLinkUrl: `https://12go.asia/${lang}/travel/${route.from}/${route.to}`,
      subId: `bpb-${routeId}`,
    }),
  ),
);

export function getAffiliateRoute(routeId: RouteId, lang: LocaleCode) {
  return (
    affiliateRoutes.find(
      (route) => route.routeId === routeId && route.lang === lang,
    ) ??
    affiliateRoutes.find(
      (route) => route.routeId === routeId && route.lang === "en",
    )
  );
}
