import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/HomePage";
import {
  isSupportedLocale,
  supportedLocaleCodes,
  type LocaleCode,
} from "@/data/routes";
import { getTranslations } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";

type LocaleHomeProps = {
  params: Promise<{
    locale: string;
  }>;
};

function homeUrl(locale: string) {
  return absoluteUrl(`/${locale}`);
}

export function generateStaticParams() {
  return supportedLocaleCodes.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({
  params,
}: LocaleHomeProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    return {
      title: "Home not found | Bangkok Pattaya Bus Guide",
    };
  }

  const t = getTranslations(locale);
  const languages = Object.fromEntries(
    supportedLocaleCodes.map((localeCode) => [
      localeCode,
      homeUrl(localeCode),
    ]),
  );

  return {
    title:
      locale === "en"
        ? "Bangkok Pattaya Bus Guide - Bus Times, Prices & Stations"
        : `${t.app.brandPrimary} - ${t.app.brandSecondary}`,
    description:
      locale === "en"
        ? "Check Bangkok to Pattaya, Pattaya to Bangkok, and airport bus times, ticket prices, travel time, stations, and practical travel tips."
        : t.disclaimer.text,
    alternates: {
      canonical: homeUrl(locale),
      languages: {
        "x-default": absoluteUrl("/"),
        ...languages,
      },
    },
  };
}

export default async function LocaleHome({ params }: LocaleHomeProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return <HomePage locale={locale as LocaleCode} />;
}
