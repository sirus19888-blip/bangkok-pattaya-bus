"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ANALYTICS_CONSENT_DENIED,
  ANALYTICS_CONSENT_GRANTED,
  ANALYTICS_CONSENT_OPEN_EVENT,
  type AnalyticsConsentState,
  getAnalyticsConsentCopy,
  readAnalyticsConsent,
  writeAnalyticsConsent,
} from "@/lib/analyticsConsent";
import { GA_ID } from "@/lib/analytics";

const GOOGLE_TAG_SRC = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
const deniedConsent = {
  ad_personalization: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  analytics_storage: "denied",
};

type AnalyticsConsentProps = {
  lang: string;
};

type ConsentUiState = AnalyticsConsentState | "unknown" | null;

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];

  if (typeof window.gtag !== "function") {
    function gtag() {
      window.dataLayer?.push(arguments);
    }

    window.gtag = gtag as Window["gtag"];
  }
}

function loadGoogleAnalytics() {
  ensureGtag();
  window.gtag?.("consent", "default", deniedConsent);
  window.gtag?.("consent", "update", {
    ...deniedConsent,
    analytics_storage: "granted",
  });

  if (window.__bpbGa4Loaded) {
    return;
  }

  if (!document.querySelector(`script[src="${GOOGLE_TAG_SRC}"]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.src = GOOGLE_TAG_SRC;
    document.head.appendChild(script);
  }

  window.gtag?.("js", new Date());
  window.gtag?.("config", GA_ID);
  window.__bpbGa4Loaded = true;
}

function denyGoogleAnalytics() {
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", deniedConsent);
  }

  clearGoogleAnalyticsCookies();
}

function clearGoogleAnalyticsCookies() {
  const cookieNames = document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0]?.trim())
    .filter((name): name is string => Boolean(name))
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));

  const domains = [
    undefined,
    window.location.hostname,
    `.${window.location.hostname}`,
  ];

  for (const name of cookieNames) {
    for (const domain of domains) {
      document.cookie = [
        `${name}=`,
        "Max-Age=0",
        "path=/",
        "SameSite=Lax",
        domain ? `domain=${domain}` : "",
      ]
        .filter(Boolean)
        .join("; ");
    }
  }
}

export function AnalyticsConsent({ lang }: AnalyticsConsentProps) {
  const copy = useMemo(() => getAnalyticsConsentCopy(lang), [lang]);
  const [consent, setConsent] = useState<ConsentUiState>("unknown");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedConsent = readAnalyticsConsent();
    setConsent(storedConsent);
    setIsOpen(storedConsent === null);

    if (storedConsent === ANALYTICS_CONSENT_GRANTED) {
      loadGoogleAnalytics();
    }

    if (storedConsent === ANALYTICS_CONSENT_DENIED) {
      denyGoogleAnalytics();
    }
  }, []);

  useEffect(() => {
    const openSettings = () => setIsOpen(true);

    window.addEventListener(ANALYTICS_CONSENT_OPEN_EVENT, openSettings);

    return () => {
      window.removeEventListener(ANALYTICS_CONSENT_OPEN_EVENT, openSettings);
    };
  }, []);

  function handleConsentChoice(nextConsent: AnalyticsConsentState) {
    writeAnalyticsConsent(nextConsent);
    setConsent(nextConsent);
    setIsOpen(false);

    if (nextConsent === ANALYTICS_CONSENT_GRANTED) {
      loadGoogleAnalytics();
      return;
    }

    denyGoogleAnalytics();
  }

  return (
    <>
      {consent !== "unknown" && isOpen ? (
        <div
          className="fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+8.5rem)] z-[70] mx-auto max-w-md rounded-2xl border border-[#eadcc7] bg-white p-4 text-[#13233a] shadow-2xl shadow-[#13233a]/20 md:bottom-4"
          data-analytics-consent="banner"
          role="dialog"
          aria-live="polite"
          aria-label={copy.title}
        >
          <div className="space-y-2">
            <h2 className="text-sm font-black">{copy.title}</h2>
            <p className="text-xs font-semibold leading-5 text-[#4f5d6c]">
              {copy.body}
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              className="min-h-11 rounded-xl border border-[#d8c8b4] bg-white px-3 text-sm font-black text-[#13233a] transition hover:bg-[#fffaf2]"
              onClick={() => handleConsentChoice(ANALYTICS_CONSENT_DENIED)}
            >
              {copy.reject}
            </button>
            <button
              type="button"
              className="min-h-11 rounded-xl bg-[#13233a] px-3 text-sm font-black text-white transition hover:bg-[#1d3455]"
              onClick={() => handleConsentChoice(ANALYTICS_CONSENT_GRANTED)}
            >
              {copy.accept}
            </button>
          </div>
          <Link
            className="mt-3 inline-flex min-h-8 items-center text-xs font-black text-[#0e7b6b] underline-offset-4 hover:underline"
            href="/privacy"
          >
            {copy.privacy}
          </Link>
        </div>
      ) : null}
    </>
  );
}
