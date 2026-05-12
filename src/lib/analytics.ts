export type AffiliateClickEvent = {
  cta_position: string;
  from: string;
  href: string;
  lang: string;
  provider: string;
  route_id: string;
  sub_id?: string;
  to: string;
};

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      parameters: AffiliateClickEvent,
    ) => void;
  }
}

export function trackAffiliateClick(event: AffiliateClickEvent) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "affiliate_click", event);
}
