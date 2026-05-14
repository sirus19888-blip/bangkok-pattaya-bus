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

export type AnalyticsEventParameters = Record<
  string,
  string | number | boolean | null | undefined
>;

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      parameters: AnalyticsEventParameters,
    ) => void;
  }
}

export function trackEvent(
  eventName: string,
  parameters: AnalyticsEventParameters = {},
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, parameters);
}

export function trackAffiliateClick(event: AffiliateClickEvent) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "affiliate_click", event);
}
