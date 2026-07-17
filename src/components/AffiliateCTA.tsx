"use client";

import Image from "next/image";
import type { LocaleCode, RouteId } from "@/data/routes";
import { trackAffiliateClick } from "@/lib/analytics";

export type AffiliateCTAVariant =
  | "top"
  | "afterSchedule"
  | "stickyMobile"
  | "afterFaq";

export type AffiliateCTAPosition =
  | "homepage_hero"
  | "homepage_airport_highlight"
  | "homepage_mobile_sticky"
  | "homepage_route_card"
  | "guide_body"
  | "guide_short_answer"
  | "guide_sidebar"
  | "guide_mobile_sticky"
  | "route_top"
  | "desktop_sidebar"
  | "route_after_schedule"
  | "route_charter_gap"
  | "route_commercial_help"
  | "route_help_online_vs_station"
  | "route_help_bus_full"
  | "route_help_after_last"
  | "route_help_vs_taxi"
  | "route_airport_transfer"
  | "route_city_transfer"
  | "mobile_sticky";

type AffiliateCTAProps = {
  ariaLabel?: string;
  className?: string;
  ctaPosition?: AffiliateCTAPosition;
  disclosureMode?: "full" | "short" | "none";
  disclosureText?: string;
  href: string | null;
  label: string;
  lang: LocaleCode;
  provider: "12go";
  routeId: RouteId;
  from: string;
  shortDisclosureText?: string;
  subId?: string;
  to: string;
  variant?: AffiliateCTAVariant;
  wrapperClassName?: string;
};

const variantClasses: Record<AffiliateCTAVariant, string> = {
  top: "mt-3",
  afterSchedule: "mt-4",
  stickyMobile:
    "sticky bottom-3 z-30 mt-3 pb-[env(safe-area-inset-bottom)] md:static md:bottom-auto md:pb-0",
  afterFaq: "mt-4",
};

const buttonClasses: Record<AffiliateCTAVariant, string> = {
  top: "min-h-12 rounded-xl bg-[#e8b05a] px-5 text-sm text-[#13233a] shadow-sm transition hover:bg-[#dca23f]",
  afterSchedule:
    "min-h-12 rounded-xl border border-[#e8b05a] bg-[#fff8ec] px-5 text-sm text-[#13233a] shadow-sm transition hover:bg-[#f8e7c6]",
  stickyMobile:
    "min-h-12 rounded-2xl bg-[#13233a] px-5 text-sm text-white shadow-xl shadow-[#13233a]/20 ring-1 ring-white/20",
  afterFaq:
    "min-h-12 rounded-xl border border-[#e8b05a] bg-[#fff8ec] px-5 text-sm text-[#13233a] shadow-sm transition hover:bg-[#f8e7c6]",
};

export function AffiliateCTA({
  ariaLabel,
  className,
  ctaPosition,
  disclosureMode,
  disclosureText,
  href,
  label,
  lang,
  provider,
  routeId,
  from,
  shortDisclosureText,
  subId,
  to,
  variant = "top",
  wrapperClassName,
}: AffiliateCTAProps) {
  if (!href) {
    return null;
  }

  const effectiveDisclosureMode =
    disclosureMode ?? (variant === "stickyMobile" ? "short" : "full");

  return (
    <div
      className={wrapperClassName ?? variantClasses[variant]}
      data-affiliate-provider={provider}
      data-affiliate-lang={lang}
      data-affiliate-route={routeId}
      data-affiliate-sub-id={subId}
      data-affiliate-cta-position={ctaPosition ?? variant}
    >
      <a
        aria-label={ariaLabel ?? label}
        className={
          className ??
          `flex w-full items-center justify-center text-center font-black ${buttonClasses[variant]}`
        }
        data-affiliate-cta-position={ctaPosition ?? variant}
        data-affiliate-provider={provider}
        data-affiliate-route={routeId}
        data-affiliate-sub-id={subId}
        href={href}
        onClick={() =>
          trackAffiliateClick({
            cta_position: ctaPosition ?? variant,
            from,
            href,
            lang,
            provider,
            route_id: routeId,
            sub_id: subId,
            to,
          })
        }
        rel="sponsored nofollow"
        target="_blank"
      >
        <Image
          alt=""
          aria-hidden="true"
          className="mr-2 h-5 w-5 object-contain"
          height={20}
          src="/images/partners/12go-icon.png"
          width={20}
        />
        {label}
      </a>
      {effectiveDisclosureMode === "none" ? null : (
        <p className="mt-2 text-xs font-semibold leading-5 text-[#5f6874]">
          {effectiveDisclosureMode === "short"
            ? shortDisclosureText
            : disclosureText}
        </p>
      )}
    </div>
  );
}
