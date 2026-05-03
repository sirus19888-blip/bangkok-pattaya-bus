import { FAQ } from "@/components/FAQ";
import { FAQJsonLd } from "@/components/FAQJsonLd";
import { Header } from "@/components/Header";
import { NextBusCard } from "@/components/NextBusCard";
import { RouteSearch } from "@/components/RouteSearch";
import { RouteSummary } from "@/components/RouteSummary";
import { ScheduleList } from "@/components/ScheduleList";
import { StationCard } from "@/components/StationCard";
import { SupportButton } from "@/components/SupportButton";
import { TravelGuide } from "@/components/TravelGuide";
import type { LocaleCode, Route, RoutePage } from "@/data/routes";
import type { Schedule } from "@/data/schedules";
import type { Station } from "@/data/stations";
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

  return (
    <main className="min-h-screen bg-[#f7f0e3] text-[#13233a]">
      <FAQJsonLd faqs={localizedFaqs} />
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-8 pt-4 sm:gap-8 sm:px-6 sm:pb-12 sm:pt-5 lg:px-8">
        <Header
          labels={{
            ...t.app,
            chooseLanguage: t.navigation.chooseLanguage,
          }}
          currentLocale={locale}
          routeSlug={routePage.slug}
        />

        <section className="grid gap-4 sm:gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="rounded-lg border border-[#eadcc7] bg-[#fffaf2] p-4 shadow-sm sm:p-7">
            <p className="mb-3 text-sm font-bold uppercase tracking-wide text-[#2f6f93]">
              {t.app.title}
            </p>
            <h1 className="text-3xl font-black leading-tight text-[#13233a] sm:text-5xl">
              {routePage.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#4f5d6c] sm:text-lg">
              {routePage.intro}
            </p>

            <RouteSearch
              from={routePage.from}
              to={routePage.to}
              labels={t.routeSelector}
            />
          </div>

          <NextBusCard
            schedule={schedule}
            nextDeparture={nextDeparture}
            labels={{
              ...t.nextBus,
              showAllDepartures: t.common.showAllDepartures,
            }}
          />
        </section>

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

        <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <ScheduleList
            route={route}
            schedule={schedule}
            nextDeparture={nextDeparture}
            labels={t.schedule}
            showSourceInfo
          />
          <StationCard
            stations={stations}
            labels={{
              ...t.station,
              openInGoogleMaps: t.common.openInGoogleMaps,
            }}
          />
        </section>

        <section className="rounded-lg border border-[#eadcc7] bg-white p-4 text-sm font-semibold leading-6 text-[#4f5d6c] shadow-sm sm:p-5">
          <p className="font-black text-[#13233a]">
            {t.lastUpdated.label} {schedule.lastUpdated}
          </p>
          <p className="mt-2">{schedule.disclaimer}</p>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
          <TravelGuide tips={localizedGuideTips} labels={t.travelTips} />
          <FAQ faqs={localizedFaqs} labels={t.faq} />
        </section>

        <SupportButton
          labels={{
            ...t.support,
            buyMeCoffee: t.common.buyMeCoffee,
          }}
        />
      </section>
    </main>
  );
}
