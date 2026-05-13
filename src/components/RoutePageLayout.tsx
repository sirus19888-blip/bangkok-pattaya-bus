import type { ReactNode } from "react";
import { FAQ } from "@/components/FAQ";
import { Header } from "@/components/Header";
import { MobileRouteDecisionCard } from "@/components/MobileRouteDecisionCard";
import { RelatedRoutes } from "@/components/RelatedRoutes";
import { RouteJsonLd } from "@/components/RouteJsonLd";
import { RouteSummary } from "@/components/RouteSummary";
import { StationCard } from "@/components/StationCard";
import { TravelerFeedback } from "@/components/TravelerFeedback";
import { getTwelveGoButtonLabel } from "@/components/TwelveGoAffiliateButton";
import { routePages } from "@/data/routes";
import type { LocaleCode, Route, RoutePage } from "@/data/routes";
import type { Schedule } from "@/data/schedules";
import type { Station } from "@/data/stations";
import { getStationPhotoGroupsForRoute } from "@/data/stationPhotos";
import {
  getLocalizedFaqs,
  type Translations,
} from "@/lib/i18n";

type RoutePageLayoutProps = {
  routePage: RoutePage;
  route: Route;
  schedule: Schedule;
  stations: Station[];
  nextDeparture: string;
  t: Translations;
  locale: LocaleCode;
};

export function RoutePageLayout({
  routePage,
  route,
  schedule,
  stations,
  nextDeparture,
  t,
  locale,
}: RoutePageLayoutProps) {
  const localizedFaqs = getLocalizedFaqs(t, routePage.slug);
  const stationPhotoGroups = getStationPhotoGroupsForRoute(
    routePage.slug,
    locale,
  );
  const sourceStatusLabel =
    schedule.verificationStatus === "needs official confirmation"
      ? t.schedule.needsOfficialConfirmationShort
      : t.schedule.partiallyVerifiedShort;

  return (
    <main className="min-h-screen bg-[#f7f0e3] text-[#13233a]">
      <RouteJsonLd
        faqs={localizedFaqs}
        locale={locale}
        routePage={routePage}
        schedule={schedule}
      />
      <section className="mx-auto flex w-full max-w-[92rem] flex-col gap-5 px-4 pb-10 pt-3 sm:gap-8 sm:px-6 sm:pb-12 sm:pt-5 md:gap-4 md:pb-8 md:pt-4 lg:px-6 xl:px-8">
        <Header
          labels={{
            ...t.app,
            chooseLanguage: t.navigation.chooseLanguage,
          }}
          currentLocale={locale}
          routeSlug={routePage.slug}
          showDesktopRouteIcons
        />

        <MobileRouteDecisionCard
          affiliateLabel={getTwelveGoButtonLabel(locale)}
          locale={locale}
          routeId={routePage.slug}
          routeTitle={routePage.title}
          schedule={schedule}
          nextDeparture={nextDeparture}
          sourceStatusLabel={sourceStatusLabel}
          labels={{
            ...t.nextBus,
            nextBus: t.schedule.nextBus,
            showAllDepartures:
              locale === "pl" ? "Pokaż wszystkie trasy" : t.common.showAllDepartures,
          }}
          scheduleLabels={t.schedule}
        />

        <RouteSummary
          route={route}
          schedule={schedule}
          from={routePage.from}
          to={routePage.to}
          labels={{
            ...t.common,
            ...t.routeSelector,
            travelTime: t.nextBus.travelTime,
          }}
        />

        <MobileDetailsSection title={t.station.title}>
          <StationCard
            stations={stations}
            locale={locale}
            routeId={routePage.slug}
            photoGroups={stationPhotoGroups}
            labels={{
              ...t.station,
              openInGoogleMaps: t.common.openInGoogleMaps,
            }}
          />
        </MobileDetailsSection>

        <MobileDetailsSection title={t.faq.title}>
          <FAQ faqs={localizedFaqs} labels={t.faq} />
        </MobileDetailsSection>

        <div
          id="mobile-related-routes"
          className="scroll-mt-6 md:hidden"
        >
          <RelatedRoutes
            currentRoute={routePage.slug}
            heading={t.common.relatedRoutes}
            locale={locale}
            routePages={routePages.map((page) => {
              const routeText = t.routePages[page.slug];
              const endpoints = routeText as { from?: string; to?: string };

              return {
                ...page,
                title: routeText.title,
                from: endpoints.from ?? page.from,
                to: endpoints.to ?? page.to,
              };
            })}
          />
        </div>

        <TravelerFeedback
          locale={locale}
          routeTitle={routePage.title}
        />
      </section>
    </main>
  );
}

function MobileDetailsSection({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <details className="group rounded-2xl border border-[#eadcc7] bg-white p-4 shadow-sm md:border-0 md:bg-transparent md:p-0 md:shadow-none">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-base font-black text-[#13233a] md:hidden">
        <span>{title}</span>
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#d8c8b4] bg-[#fffaf2] text-lg leading-none"
        >
          <span className="group-open:hidden">+</span>
          <span className="hidden group-open:inline">-</span>
        </span>
      </summary>
      <div className="mt-4 md:mt-0 md:block">{children}</div>
    </details>
  );
}
