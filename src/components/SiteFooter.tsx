"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buildAgodaBadgeUrl } from "@/data/hotelAffiliate";
import { isSupportedLocale, type LocaleCode } from "@/data/routes";
import { trackAffiliateClick } from "@/lib/analytics";
import {
  ANALYTICS_CONSENT_OPEN_EVENT,
  getAnalyticsConsentCopy,
} from "@/lib/analyticsConsent";
import { getUiTranslations } from "@/lib/uiTranslations";

function getLocaleFromPath(pathname: string | null): LocaleCode {
  const segment = pathname?.split("/").filter(Boolean)[0];
  return segment && isSupportedLocale(segment) ? segment : "en";
}

export function SiteFooter() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const text = getUiTranslations(locale).footer;
  const consentText = getAnalyticsConsentCopy(locale);
  const agodaBadgeHref = buildAgodaBadgeUrl(locale);

  return (
    <footer className="border-t border-[#eadcc7] bg-[#f7f0e3]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 pb-[calc(env(safe-area-inset-bottom)+8.5rem)] pt-6 text-sm font-semibold text-[#4f5d6c] sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:pb-6 lg:px-8">
        <p>{text.title}</p>
        <nav aria-label={text.ariaLabel} className="flex flex-wrap gap-2 sm:gap-3">
          <Link
            href="/about"
            className="inline-flex min-h-11 items-center rounded-lg px-2 text-[#13233a] underline-offset-4 hover:underline"
          >
            {text.about}
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center rounded-lg px-2 text-[#13233a] underline-offset-4 hover:underline"
          >
            {text.contact}
          </Link>
          <Link
            href="/privacy"
            className="inline-flex min-h-11 items-center rounded-lg px-2 text-[#13233a] underline-offset-4 hover:underline"
          >
            {text.privacy}
          </Link>
          <button
            type="button"
            className="inline-flex min-h-11 items-center rounded-lg px-2 text-left text-[#13233a] underline-offset-4 hover:underline"
            onClick={() =>
              window.dispatchEvent(new Event(ANALYTICS_CONSENT_OPEN_EVENT))
            }
          >
            {consentText.settings}
          </button>
        </nav>
        <a
          href={agodaBadgeHref}
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
          aria-label="Agoda Verified Affiliate"
          onClick={() =>
            trackAffiliateClick({
              cta_position: "footer_badge",
              from: "footer",
              href: agodaBadgeHref,
              lang: locale,
              provider: "agoda",
              route_id: "footer",
              to: "agoda",
            })
          }
          className="shrink-0"
        >
          <Image
            src="/images/partners/agoda-verified-affiliate.png"
            alt="Agoda Verified Affiliate"
            width={90}
            height={40}
            className="h-10 w-auto"
          />
        </a>
      </div>
    </footer>
  );
}
