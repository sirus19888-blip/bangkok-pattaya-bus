"use client";

import Image from "next/image";
import type { LocaleCode, RouteId } from "@/data/routes";
import { trackAffiliateClick } from "@/lib/analytics";

export type AffiliateCTAVariant =
  | "top"
  | "afterSchedule"
  | "stickyMobile"
  | "afterFaq";

type AffiliateCTAProps = {
  className?: string;
  href: string | null;
  label: string;
  lang: LocaleCode;
  provider: "12go";
  routeId: RouteId;
  from: string;
  subId?: string;
  to: string;
  variant?: AffiliateCTAVariant;
};

const affiliateDisclosure =
  "Some booking links may be affiliate links. Timetable information stays independent.";

const variantClasses: Record<AffiliateCTAVariant, string> = {
  top: "mt-3",
  afterSchedule: "mt-4",
  stickyMobile:
    "sticky bottom-3 z-30 mt-3 pb-[env(safe-area-inset-bottom)] md:static md:bottom-auto md:pb-0",
  afterFaq: "mt-4",
};

const buttonClasses: Record<AffiliateCTAVariant, string> = {
  top: "min-h-12 rounded-xl border border-[#e8b05a] bg-[#fff8ec] px-5 text-sm text-[#13233a] shadow-sm transition hover:bg-[#f8e7c6]",
  afterSchedule:
    "min-h-12 rounded-xl border border-[#e8b05a] bg-[#fff8ec] px-5 text-sm text-[#13233a] shadow-sm transition hover:bg-[#f8e7c6]",
  stickyMobile:
    "min-h-12 rounded-2xl bg-[#13233a] px-5 text-sm text-white shadow-xl shadow-[#13233a]/20 ring-1 ring-white/20",
  afterFaq:
    "min-h-12 rounded-xl border border-[#e8b05a] bg-[#fff8ec] px-5 text-sm text-[#13233a] shadow-sm transition hover:bg-[#f8e7c6]",
};

export function AffiliateCTA({
  className,
  href,
  label,
  lang,
  provider,
  routeId,
  from,
  subId,
  to,
  variant = "top",
}: AffiliateCTAProps) {
  if (!href) {
    return null;
  }

  return (
    <div
      className={variantClasses[variant]}
      data-affiliate-provider={provider}
      data-affiliate-lang={lang}
      data-affiliate-route={routeId}
      data-affiliate-sub-id={subId}
    >
      <a
        aria-label={label}
        className={
          className ??
          `flex w-full items-center justify-center text-center font-black ${buttonClasses[variant]}`
        }
        href={href}
        onClick={() =>
          trackAffiliateClick({
            cta_position: variant,
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
      <p className="mt-2 text-xs font-semibold leading-5 text-[#5f6874]">
        {affiliateDisclosure}
      </p>
    </div>
  );
}
