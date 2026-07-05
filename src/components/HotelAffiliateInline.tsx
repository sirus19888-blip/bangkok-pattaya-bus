"use client";

import Image from "next/image";
import { buildAgodaUrl, type HotelCity } from "@/data/hotelAffiliate";
import type { LocaleCode } from "@/data/routes";
import { trackAffiliateClick } from "@/lib/analytics";
import { getUiTranslations } from "@/lib/uiTranslations";

export function HotelAffiliateInline({
  city,
  locale,
  routeId,
  ctaPosition,
  className,
}: {
  city: HotelCity;
  locale: LocaleCode;
  routeId: string;
  ctaPosition: string;
  className?: string;
}) {
  const text = getUiTranslations(locale).hotel;
  const label = text.inlineCta.replace("{city}", text.cityNames[city]);
  const href = buildAgodaUrl(city, locale);

  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      aria-label={label}
      onClick={() =>
        trackAffiliateClick({
          cta_position: ctaPosition,
          from: routeId,
          href,
          lang: locale,
          provider: "agoda",
          route_id: routeId,
          to: city,
        })
      }
      className={
        className ??
        "flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#e8b05a] bg-[#fff8ec] px-4 text-center text-sm font-black text-[#13233a] shadow-sm transition hover:bg-[#f8e7c6]"
      }
    >
      <Image
        alt=""
        aria-hidden="true"
        className="h-5 w-auto object-contain"
        height={20}
        src="/images/partners/agoda-icon.png"
        width={39}
      />
      <span>{label}</span>
      <span aria-hidden="true">→</span>
    </a>
  );
}
