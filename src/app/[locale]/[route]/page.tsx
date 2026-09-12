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
// zamrozona na czas builda. ISR zamiast trybu dynamicznego dla 154 adresow.
//
// 3600 s, nie 300. Pomiar z 2026-09-12: ISR Writes 150 348 / 200 000 przy okolo
// 11 000 zapisow na dobe wobec budzetu 6 667/dobe (200k na 30 dni). Przy tym
// tempie plan Hobby wstrzymuje projekt okolo 16 wrzesnia.
//
// Dlaczego poprzednie podniesienie z 60 na 300 s nie dalo NIC (wykres zapisow
// po 4 wrzesnia sie nie zmienil): 11 000 zapisow na 162 strony z ISR to jedna
// regeneracja na strone co okolo 21 minut. Okno krotsze niz odstep miedzy
// zadaniami nigdy nie jest wiazace - kazde zadanie i tak zastaje strone
// przeterminowana. Zeby limit dzialal, musi ten odstep przekroczyc.
// Przy 3600 s sufit wynosi 24 regeneracje na strone na dobe: 162 x 24 = 3 888.
//
// Czytelnik nie traci nic: useNextDeparture przelicza odliczanie w przegladarce
// zaraz po hydratacji i potem co minute, a TravelDateContext koryguje date (T82).
// Koszt ponosza wylacznie crawlery nieuruchamiajace JavaScriptu - one zobacza
// w HTML wartosc starsza nawet o godzine.
export const revalidate = 3600;

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
