import Image from "next/image";
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

        <section className="hidden gap-4 md:grid min-[1180px]:grid-cols-[minmax(0,1.18fr)_minmax(19rem,0.82fr)] min-[1180px]:items-stretch">
          <div className="rounded-2xl border border-[#eadcc7] bg-[#fffaf2] p-5 shadow-sm sm:p-7 md:p-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#2f6f93] sm:text-sm md:mb-2">
              {t.app.title}
            </p>
            <h1 className="max-w-3xl text-[2.15rem] font-black leading-[1.08] text-[#13233a] sm:text-5xl md:text-[clamp(2.1rem,3.1vw,2.7rem)]">
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
            <div className="mt-4">
              <ScheduleList
                route={route}
                schedule={schedule}
                nextDeparture={nextDeparture}
                labels={t.schedule}
                showSourceInfo
                sourceInfoMode="popover"
              />
            </div>
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

        <section className="hidden gap-4 md:grid min-[1180px]:grid-cols-[minmax(0,1.18fr)_minmax(19rem,0.82fr)]">
          <div className="space-y-4">
            <div className="grid gap-4 min-[1360px]:grid-cols-2">
              <TravelGuide tips={localizedGuideTips} labels={t.travelTips} />
              <FAQ faqs={localizedFaqs} labels={t.faq} />
            </div>
            <StationAccessGuide
              sectionTitle={stationAccessSectionTitle}
              title={stationAccessGuide.title}
              items={stationAccessGuide.items}
              note={stationAccessGuide.note}
              swipeHint={stationAccessSwipeHint}
            />
          </div>
          <div className="hidden space-y-4 min-[1180px]:block">
            <StationCard
              stations={stations}
              locale={locale}
              photoGroups={stationPhotoGroups}
              labels={{
                ...t.station,
                openInGoogleMaps: t.common.openInGoogleMaps,
              }}
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
        </MobileDetailsSection>

        <section className="hidden justify-end md:flex">
          <details className="group relative">
            <summary
              aria-label={`${t.lastUpdated.label} ${schedule.lastUpdated}`}
              className="flex h-14 w-14 cursor-pointer list-none items-center justify-center overflow-hidden rounded-2xl border border-[#eadcc7] bg-[#fffaf2] shadow-sm ring-1 ring-[#13233a]/5 transition hover:-translate-y-0.5 hover:shadow-md group-open:ring-2 group-open:ring-[#e8b05a] [&::-webkit-details-marker]:hidden"
            >
              <Image
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover"
                height={56}
                src="/images/icons/icon-last-updated-info.png"
                width={56}
              />
            </summary>
            <div className="absolute right-0 top-[calc(100%+0.6rem)] z-30 w-[24rem] max-w-[calc(100vw-4rem)] rounded-2xl border border-[#eadcc7] bg-white p-4 text-sm font-semibold leading-6 text-[#4f5d6c] shadow-2xl shadow-[#13233a]/15">
              <p className="font-black text-[#13233a]">
                {t.lastUpdated.label} {schedule.lastUpdated}
              </p>
              <p className="mt-2">{schedule.disclaimer}</p>
            </div>
          </details>
        </section>

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
