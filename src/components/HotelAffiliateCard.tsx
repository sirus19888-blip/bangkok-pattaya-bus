"use client";

import { buildAgodaUrl, type HotelCity } from "@/data/hotelAffiliate";
import type { LocaleCode, RouteId } from "@/data/routes";
import { trackAffiliateClick } from "@/lib/analytics";
import { getUiTranslations } from "@/lib/uiTranslations";

export function HotelAffiliateCard({
  city,
  locale,
  routeId,
  ctaPosition = "route_hotel",
}: {
  city: HotelCity;
  locale: LocaleCode;
  routeId: RouteId;
  ctaPosition?: string;
}) {
  const text = getUiTranslations(locale).hotel;
  const cityName = text.cityNames[city];
  const href = buildAgodaUrl(city, locale);

  return (
    <article className="rounded-2xl border border-[#eadcc7] bg-[#fffaf2] p-4">
      <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#0e7b6b]">
        {text.eyebrow}
      </p>
      <h2 className="mt-1 text-base font-black leading-tight text-[#13233a]">
        {text.title.replace("{city}", cityName)}
      </h2>
      <p className="mt-2 text-sm font-semibold leading-6 text-[#4f5d6c]">
        {text.body}
      </p>
      <a
        href={href}
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
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
        className="mt-4 flex min-h-11 items-center justify-center rounded-xl border border-[#e8b05a] bg-white px-4 text-center text-sm font-black text-[#13233a] shadow-sm transition hover:bg-[#fff8ec]"
      >
        {text.cta.replace("{city}", cityName)}
      </a>
      <p className="mt-2 text-xs font-semibold leading-5 text-[#5f6874]">
        {text.disclosure}
      </p>
    </article>
  );
}
