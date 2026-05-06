import type { RouteId } from "@/data/routes";

const fallbackAffiliateId = "15791301";

export function build12GoRouteUrl(_routeId?: RouteId) {
  const affiliateId =
    process.env.NEXT_PUBLIC_12GO_AFFILIATE_ID ?? fallbackAffiliateId;
  const url = new URL("https://agent.12go.asia/");

  if (affiliateId) {
    url.searchParams.set("referer", affiliateId);
  }

  return url.toString();
}
