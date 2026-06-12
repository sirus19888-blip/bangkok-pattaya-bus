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
import {
  getTranslations,
  localizeRoutePage,
  localizeSchedule,
  localizeStations,
} from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";

type RoutePageProps = {
  params: Promise<{
    locale: string;
    route: string;
  }>;
};

function routeUrl(locale: string, slug: string) {
  return absoluteUrl(`/${locale}/${slug}`);
}

export function generateStaticParams() {
  return [
    ...supportedLocaleCodes.flatMap((locale) =>
      routePages.map((page) => ({
        locale,
        route: page.slug,
      })),
    ),
    ...seoGuides.map((guide) => ({
      locale: "en",
      route: guide.slug,
    })),
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

  const guide = locale === "en" ? getSeoGuide(slug) : undefined;

  if (guide) {
    return {
      title: guide.title,
      description: guide.description,
      alternates: {
        canonical: routeUrl("en", guide.slug),
      },
      openGraph: {
        title: guide.title,
        description: guide.description,
        url: routeUrl("en", guide.slug),
        siteName: "Bangkok Pattaya Bus Guide",
        type: "article",
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
  };
}

export default async function Page({ params }: RoutePageProps) {
  const { locale, route: slug } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const guide = locale === "en" ? getSeoGuide(slug) : undefined;

  if (guide) {
    return <SeoGuidePage guide={guide} />;
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
  const nextDeparture = schedule.nextDeparture;
  const t = getTranslations(locale);
  const localizedRoutePage = localizeRoutePage(routePage, t);
  const localizedSchedule = localizeSchedule(schedule, t);
  const localizedStations = localizeStations(routeStations, t);

  return (
    <RoutePageLayout
      routePage={localizedRoutePage}
      schedule={localizedSchedule}
      stations={localizedStations}
      nextDeparture={nextDeparture}
      t={t}
      locale={locale}
    />
  );
}
