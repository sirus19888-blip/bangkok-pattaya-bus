import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoutePageLayout } from "@/components/RoutePageLayout";
import {
  getRoutePage,
  isSupportedLocale,
  routePages,
  routes,
  supportedLocaleCodes,
} from "@/data/routes";
import { getScheduleByRoute } from "@/data/schedules";
import { stations } from "@/data/stations";
import {
  getTranslations,
  localizeRoute,
  localizeRoutePage,
  localizeSchedule,
  localizeStations,
} from "@/lib/i18n";

type RoutePageProps = {
  params: Promise<{
    locale: string;
    route: string;
  }>;
};

export function generateStaticParams() {
  return supportedLocaleCodes.flatMap((locale) =>
    routePages.map((page) => ({
      locale,
      route: page.slug,
    })),
  );
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

  const routePage = getRoutePage(slug);

  if (!routePage) {
    return {
      title: "Route not found | Bangkok Pattaya Bus Guide",
    };
  }
  const t = getTranslations(locale);
  const localizedRoutePage = localizeRoutePage(routePage, t);

  return {
    title: localizedRoutePage.metadata.title,
    description: localizedRoutePage.metadata.description,
  };
}

export default async function Page({ params }: RoutePageProps) {
  const { locale, route: slug } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const routePage = getRoutePage(slug);

  if (!routePage) {
    notFound();
  }

  const route = routes.find((item) => item.id === routePage.slug);
  const schedule = getScheduleByRoute(routePage.slug);

  if (!route || !schedule) {
    notFound();
  }

  const routeStations = routePage.stationIds
    .map((stationId) => stations.find((station) => station.id === stationId))
    .filter((station) => station !== undefined);
  const nextDeparture = schedule.nextDeparture;
  const t = getTranslations(locale);
  const localizedRoutePage = localizeRoutePage(routePage, t);
  const localizedRoute = localizeRoute(route, t);
  const localizedSchedule = localizeSchedule(schedule, t);
  const localizedStations = localizeStations(routeStations, t);

  return (
    <RoutePageLayout
      routePage={localizedRoutePage}
      route={localizedRoute}
      schedule={localizedSchedule}
      stations={localizedStations}
      nextDeparture={nextDeparture}
      t={t}
      locale={locale}
    />
  );
}
