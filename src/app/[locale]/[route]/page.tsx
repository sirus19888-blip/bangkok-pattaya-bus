import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoutePageLayout } from "@/components/RoutePageLayout";
import { SeoGuidePage } from "@/components/SeoGuidePage";
import {
  getRoutePage,
  isSupportedLocale,
  routePages,
  supportedLocaleCodes,
} from "@/data/routes";
import { getScheduleByRoute } from "@/data/schedules";
import { getSeoGuide, seoGuides } from "@/data/seoGuides";
import { stations } from "@/data/stations";
import { getGuideLocales, isGuideTranslated } from "@/data/translatedGuides";
import {
  getTranslations,
  localizeRoutePage,
  localizeSchedule,
  localizeStations,
  localizeSeoGuide,
} from "@/lib/i18n";
import { getNextDeparture } from "@/lib/scheduleTime";
import { absoluteUrl } from "@/lib/site";

// Najblizszy odjazd jest liczony przy renderowaniu, wiec strona nie moze byc
// zamrozona na czas builda. 300 s to kompromis: przy odjazdach co godzine wartosc
// w HTML jest praktycznie zawsze aktualna, a strony zostaja statyczne (ISR),
// zamiast przechodzic w tryb dynamiczny dla 151 adresow.
// Bylo 60 s. Podniesione po pomiarze z 2026-09-04: Fast Origin Transfer wzrosl
// z ~90 MB na dobe przed ISR do ~150 MB, czyli do progu, przy ktorym mielismy
// zareagowac. Piec razy mniej regeneracji, koszt to 5 min nieaktualnosci kafelka.
export const revalidate = 300;

type RoutePageProps = {
  params: Promise<{
    locale: string;
    route: string;
  }>;
};

function routeUrl(locale: string, slug: string) {
  return absoluteUrl(`/${locale}/${slug}`);
}

const ogImageUrl = absoluteUrl("/images/hero/home-og-bus-guide.jpg");

export function generateStaticParams() {
  return [
    ...supportedLocaleCodes.flatMap((locale) =>
      routePages.map((page) => ({
        locale,
        route: page.slug,
      })),
    ),
    ...supportedLocaleCodes.flatMap((locale) =>
      seoGuides.map((guide) => ({
        locale,
        route: guide.slug,
      })),
    ),
  ];
}

export async function generateMetadata({
  params,
}: RoutePageProps): Promise<Metadata> {
  const { locale, route: slug } = await params;

  if (!isSupportedLocale(locale)) {
    return {
      title: "Route not found | Bangkok Pattaya Bus Guide",
    };
  }

  const baseGuide = getSeoGuide(slug);
  const guide = baseGuide
    ? localizeSeoGuide(baseGuide, getTranslations(locale), locale)
    : undefined;

  if (guide) {
    const guideCanonical = isGuideTranslated(guide.slug, locale)
      ? routeUrl(locale, guide.slug)
      : routeUrl("en", guide.slug);
    const guideLanguages = {
      "x-default": routeUrl("en", guide.slug),
      ...Object.fromEntries(
        getGuideLocales(guide.slug).map((guideLocale) => [
          guideLocale,
          routeUrl(guideLocale, guide.slug),
        ]),
      ),
    };

    return {
      title: guide.title,
      description: guide.description,
      alternates: {
        canonical: guideCanonical,
        languages: guideLanguages,
      },
      openGraph: {
        title: guide.title,
        description: guide.description,
        url: routeUrl(locale, guide.slug),
        siteName: "Bangkok Pattaya Bus Guide",
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: guide.title,
          },
        ],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: guide.title,
        description: guide.description,
        images: [ogImageUrl],
      },
    };
  }

  const routePage = getRoutePage(slug);

  if (!routePage) {
    return {
      title: "Route not found | Bangkok Pattaya Bus Guide",
    };
  }
  const t = getTranslations(locale);
  const localizedRoutePage = localizeRoutePage(routePage, t);
  const languages = Object.fromEntries(
    supportedLocaleCodes.map((localeCode) => [
      localeCode,
      routeUrl(localeCode, routePage.slug),
    ]),
  );

  return {
    title: localizedRoutePage.metadata.title,
    description: localizedRoutePage.metadata.description,
    alternates: {
      canonical: routeUrl(locale, routePage.slug),
      languages: {
        "x-default": routeUrl("en", routePage.slug),
        ...languages,
      },
    },
    openGraph: {
      title: localizedRoutePage.metadata.title,
      description: localizedRoutePage.metadata.description,
      url: routeUrl(locale, routePage.slug),
      siteName: "Bangkok Pattaya Bus Guide",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: localizedRoutePage.metadata.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: localizedRoutePage.metadata.title,
      description: localizedRoutePage.metadata.description,
      images: [ogImageUrl],
    },
  };
}

export default async function Page({ params }: RoutePageProps) {
  const { locale, route: slug } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const baseGuide = getSeoGuide(slug);

  if (baseGuide) {
    const guideTranslations = getTranslations(locale);
    const localizedGuide = localizeSeoGuide(
      baseGuide,
      guideTranslations,
      locale,
    );
    return <SeoGuidePage guide={localizedGuide} locale={locale} />;
  }

  const routePage = getRoutePage(slug);

  if (!routePage) {
    notFound();
  }

  const schedule = getScheduleByRoute(routePage.slug);

  if (!schedule) {
    notFound();
  }

  const routeStations = routePage.stationIds
    .map((stationId) => stations.find((station) => station.id === stationId))
    .filter((station) => station !== undefined);
  const t = getTranslations(locale);
  const localizedRoutePage = localizeRoutePage(routePage, t);
  const localizedSchedule = localizeSchedule(schedule, t, locale);
  const localizedStations = localizeStations(routeStations, t, locale);
  // Liczone z localizedSchedule, nie z surowego: subRoutes niosa etykiety zalezne
  // od jezyka, a klient uzywa tego samego obiektu. Inne zrodlo = rozjazd hydratacji.
  const initialNextDeparture = getNextDeparture(localizedSchedule);

  return (
    <RoutePageLayout
      routePage={localizedRoutePage}
      schedule={localizedSchedule}
      stations={localizedStations}
      initialNextDeparture={initialNextDeparture}
      t={t}
      locale={locale}
    />
  );
}
