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
  sendGtagEvent(eventName, withOptionalDebugMode(parameters));
}

export function trackPageView(event: PageViewEvent) {
  sendGtagEvent("page_view", withOptionalDebugMode(event));
}

export function trackAffiliateClick(event: AffiliateClickEvent) {
  sendGtagEvent("affiliate_click", withOptionalDebugMode(event));
}

function sendGtagEvent(
  eventName: string,
  parameters: AnalyticsEventParameters,
) {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, parameters);
    debugGaEvent(eventName, parameters);
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(["event", eventName, parameters]);
  debugGaEvent(eventName, parameters);
}

function withOptionalDebugMode(
  parameters: AnalyticsEventParameters,
): AnalyticsEventParameters {
  if (!isGaDebugEnabled()) {
    return parameters;
  }

  return {
    ...parameters,
    debug_mode: true,
  };
}

function debugGaEvent(
  eventName: string,
  parameters: AnalyticsEventParameters,
) {
  if (!isGaDebugEnabled() || typeof console === "undefined") {
    return;
  }

  console.debug(`GA4 ${eventName} sent`, parameters);
}

function isGaDebugEnabled() {
  return (
    typeof process !== "undefined" &&
    (process.env.NODE_ENV === "development" ||
      process.env.NEXT_PUBLIC_GA_DEBUG === "true")
  );
}
