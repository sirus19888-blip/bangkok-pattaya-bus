"use client";

import Link from "next/link";
import { TravelDateAwareTwelveGoAffiliateButton } from "@/components/TravelDateAwareTwelveGoAffiliateButton";
import { TravelDateField } from "@/components/TravelDateContext";
import type { LocaleCode } from "@/data/routes";
import { getUiTranslations } from "@/lib/uiTranslations";

export function HomepageRevenueHeroCard({ locale }: { locale: LocaleCode }) {
  const uiText = getUiTranslations(locale).homepageRevenue;

  return (
    <div className="rounded-[1.45rem] border border-[#eadcc7] bg-white p-4 text-[#13233a] shadow-sm lg:mt-4 lg:border-[#e8b05a]/70 lg:bg-[#fff8ec]">
      <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#0e7b6b]">
        {uiText.title}
      </p>
      <h2 className="mt-1 text-xl font-black leading-tight">
        {uiText.heading}
      </h2>
      <p className="mt-2 text-sm font-semibold leading-5 text-[#5f6874]">
        {uiText.text}
      </p>
      <TravelDateField locale={locale} />
      <TravelDateAwareTwelveGoAffiliateButton
        ariaLabel={uiText.primaryAria}
        className="mt-4 flex min-h-11 items-center justify-center rounded-xl bg-[#13233a] px-4 text-sm font-black text-white shadow-sm transition hover:bg-[#1d3455]"
        ctaPosition="homepage_hero"
        disclosureMode="short"
        label={uiText.primaryCta}
        locale={locale}
        routeId="bangkok-to-pattaya"
        variant="top"
      />
      <Link
        className="mt-3 flex min-h-11 items-center justify-center rounded-xl border border-[#d8c8b4] bg-white px-4 text-sm font-black text-[#13233a] transition hover:bg-[#fffaf2]"
        href="#popular-routes"
      >
        {uiText.secondaryCta}
      </Link>
    </div>
  );
}
