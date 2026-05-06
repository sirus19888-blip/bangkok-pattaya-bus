import type { RouteId } from "@/data/routes";

const fallbackAffiliateId = "15791301";

const twelveGoSlugs: Record<RouteId, { from: string; to: string }> = {
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

export function build12GoRouteUrl(routeId: RouteId) {
  const slugs = twelveGoSlugs[routeId];
  const affiliateId =
    process.env.NEXT_PUBLIC_12GO_AFFILIATE_ID ?? fallbackAffiliateId;
  const url = new URL(
    `https://12go.asia/en/travel/${slugs.from}/${slugs.to}`,
  );

  if (affiliateId) {
    url.searchParams.set("z", affiliateId);
    url.searchParams.set("referer", affiliateId);
  }

  return url.toString();
}
