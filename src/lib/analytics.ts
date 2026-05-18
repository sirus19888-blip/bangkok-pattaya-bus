export type AnalyticsEventParameters = Record<
  string,
  string | number | boolean | null | undefined
>;

export type AffiliateClickEvent = AnalyticsEventParameters & {
  cta_position: string;
  from: string;
  href: string;
  lang: string;
  provider: string;
  route_id: string;
  sub_id?: string;
  to: string;
};

const GA_ID = "G-0DYTH1TLGB";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: {
      (
        command: "event",
        eventName: string,
        parameters: AnalyticsEventParameters,
      ): void;
      (
        command: "config",
        measurementId: string,
        parameters?: AnalyticsEventParameters,
      ): void;
      (command: "js", date: Date): void;
    };
  }
}

export function trackEvent(
  eventName: string,
  parameters: AnalyticsEventParameters = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, {
    send_to: GA_ID,
    ...parameters,
  });
}

export function trackAffiliateClick(params: AffiliateClickEvent) {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "affiliate_click", {
    send_to: "G-0DYTH1TLGB",
    ...params,
  });
}
