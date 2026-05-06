import type { ReactNode } from "react";
import { FAQ } from "@/components/FAQ";
import { Header } from "@/components/Header";
import { MobileRouteDecisionCard } from "@/components/MobileRouteDecisionCard";
import { NextBusCard } from "@/components/NextBusCard";
import { RelatedRoutes } from "@/components/RelatedRoutes";
import { RouteJsonLd } from "@/components/RouteJsonLd";
import { RouteSearch } from "@/components/RouteSearch";
import { RouteSummary } from "@/components/RouteSummary";
import { ScheduleList } from "@/components/ScheduleList";
import { StationAccessGuide } from "@/components/StationAccessGuide";
import { StationCard } from "@/components/StationCard";
import { TravelGuide } from "@/components/TravelGuide";
import { TravelerFeedback } from "@/components/TravelerFeedback";
import { getTwelveGoButtonLabel } from "@/components/TwelveGoAffiliateButton";
import { routePages } from "@/data/routes";
import type { LocaleCode, Route, RoutePage } from "@/data/routes";
import type { Schedule } from "@/data/schedules";
import {
  getStationAccessGuide,
  getStationAccessSectionTitle,
} from "@/data/stationAccess";
import type { Station } from "@/data/stations";
import { getStationPhotoGroupsForRoute } from "@/data/stationPhotos";
import {
  getLocalizedFaqs,
  getLocalizedGuideTips,
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
  const localizedGuideTips = getLocalizedGuideTips(t, routePage.slug);
  const localizedFaqs = getLocalizedFaqs(t, routePage.slug);
  const stationPhotoGroups = getStationPhotoGroupsForRoute(
    routePage.slug,
    locale,
  );
  const stationAccessGuide = getStationAccessGuide(routePage.slug, locale);
  const stationAccessSectionTitle = getStationAccessSectionTitle(locale);
  const stationAccessSwipeHint =
    locale === "pl"
      ? "Przesuń, aby zobaczyć więcej"
      : locale === "ru"
        ? "Проведите, чтобы увидеть больше"
      : locale === "de"
        ? "Wische, um mehr zu sehen"
      : locale === "th"
        ? "เลื่อนเพื่อดูเพิ่มเติม"
        : "Swipe to see more";
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
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-10 pt-3 sm:gap-8 sm:px-6 sm:pb-12 sm:pt-5 md:gap-4 md:pb-8 md:pt-4 lg:px-8">
        <Header
          labels={{
            ...t.app,
            chooseLanguage: t.navigation.chooseLanguage,
          }}
          currentLocale={locale}
          routeSlug={routePage.slug}
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
            showAllDepartures: t.common.showAllDepartures,
          }}
        />

        <div className="md:hidden">
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

        <section className="hidden gap-4 md:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <div className="rounded-2xl border border-[#eadcc7] bg-[#fffaf2] p-5 shadow-sm sm:p-7 md:p-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#2f6f93] sm:text-sm md:mb-2">
              {t.app.title}
            </p>
            <h1 className="max-w-3xl text-[2.15rem] font-black leading-[1.08] text-[#13233a] sm:text-5xl md:text-4xl lg:text-[2.6rem]">
              {routePage.title}
            </h1>
            <p className="mt-3 max-w-2xl text-[0.95rem] font-semibold leading-7 text-[#4f5d6c] sm:mt-4 sm:text-lg md:mt-3 md:text-base md:leading-6">
              {routePage.intro}
            </p>

            <RouteSearch
              from={routePage.from}
              labels={t.routeSelector}
              locale={locale}
              currentRoute={routePage.slug}
              routePages={routePages.map((page) => {
                const routeText = t.routePages[page.slug];
                const endpoints = routeText as { from?: string; to?: string };

                return {
                  slug: page.slug,
                  from: endpoints.from ?? page.from,
                  to: endpoints.to ?? page.to,
                };
              })}
              to={routePage.to}
            />
          </div>

          <NextBusCard
            locale={locale}
            routeId={routePage.slug}
            schedule={schedule}
            nextDeparture={nextDeparture}
            labels={{
              ...t.nextBus,
              showAllDepartures: t.common.showAllDepartures,
            }}
          />
        </section>

        <div className="hidden md:block">
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
        </div>

        <section className="hidden gap-4 md:grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <ScheduleList
              route={route}
              schedule={schedule}
              nextDeparture={nextDeparture}
              labels={t.schedule}
              showSourceInfo
            />
            <div className="grid gap-4 lg:grid-cols-2">
              <TravelGuide tips={localizedGuideTips} labels={t.travelTips} />
              <FAQ faqs={localizedFaqs} labels={t.faq} />
            </div>
          </div>
          <div className="hidden space-y-4 lg:block">
            <StationCard
              stations={stations}
              locale={locale}
              photoGroups={stationPhotoGroups}
              labels={{
                ...t.station,
                openInGoogleMaps: t.common.openInGoogleMaps,
              }}
            />
            <StationAccessGuide
              sectionTitle={stationAccessSectionTitle}
              title={stationAccessGuide.title}
              items={stationAccessGuide.items}
              note={stationAccessGuide.note}
              swipeHint={stationAccessSwipeHint}
            />
          </div>
        </section>

        <MobileDetailsSection title={t.station.title}>
          <StationCard
            stations={stations}
            locale={locale}
            photoGroups={stationPhotoGroups}
            labels={{
              ...t.station,
              openInGoogleMaps: t.common.openInGoogleMaps,
            }}
          />
          <div className="mt-4">
            <StationAccessGuide
              sectionTitle={stationAccessSectionTitle}
              title={stationAccessGuide.title}
              items={stationAccessGuide.items}
              note={stationAccessGuide.note}
              swipeHint={stationAccessSwipeHint}
            />
          </div>
        </MobileDetailsSection>

        <MobileDetailsSection title={t.schedule.dataTitle}>
          <ScheduleList
            route={route}
            schedule={schedule}
            nextDeparture={nextDeparture}
            labels={t.schedule}
            sourceOnly
          />
        </MobileDetailsSection>

        <section className="hidden rounded-2xl border border-[#eadcc7] bg-white p-4 text-sm font-semibold leading-6 text-[#4f5d6c] shadow-sm md:block md:p-4">
          <p className="font-black text-[#13233a]">
            {t.lastUpdated.label} {schedule.lastUpdated}
          </p>
          <p className="mt-2">{schedule.disclaimer}</p>
        </section>

        <MobileDetailsSection title={t.travelTips.title}>
          <TravelGuide tips={localizedGuideTips} labels={t.travelTips} />
        </MobileDetailsSection>

        <MobileDetailsSection title={t.faq.title}>
          <FAQ faqs={localizedFaqs} labels={t.faq} />
        </MobileDetailsSection>

        <TravelerFeedback
          buyMeCoffeeLabel={t.common.buyMeCoffee}
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
    <details className="group rounded-2xl border border-[#eadcc7] bg-white p-4 shadow-sm md:hidden">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-base font-black text-[#13233a]">
        <span>{title}</span>
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#d8c8b4] bg-[#fffaf2] text-lg leading-none"
        >
          <span className="group-open:hidden">+</span>
          <span className="hidden group-open:inline">-</span>
        </span>
      </summary>
      <div className="mt-4">{children}</div>
    </details>
  );
}
