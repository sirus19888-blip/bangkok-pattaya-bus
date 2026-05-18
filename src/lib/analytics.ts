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

export type PageViewEvent = AnalyticsEventParameters & {
  page_location: string;
  page_path: string;
  page_title: string;
};

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

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
  sendGtagEvent(eventName, parameters);
}

export function trackAffiliateClick(event: AffiliateClickEvent) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "affiliate_click", withGaDestination(event));
  }
}

export function trackPageView(event: PageViewEvent) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "page_view", withGaDestination(event));
  }
}

function sendGtagEvent(
  eventName: string,
  parameters: AnalyticsEventParameters,
) {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, withGaDestination(parameters));
  }
}

function withGaDestination(
  parameters: AnalyticsEventParameters,
): AnalyticsEventParameters {
  if (!gaMeasurementId) {
    return parameters;
  }

  return {
    ...parameters,
    send_to: gaMeasurementId,
  };
}
