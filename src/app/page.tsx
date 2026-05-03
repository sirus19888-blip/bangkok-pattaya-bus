import type { Metadata } from "next";
import { FAQ } from "@/components/FAQ";
import { Header } from "@/components/Header";
import { NextBusCard } from "@/components/NextBusCard";
import { PopularRoutes } from "@/components/PopularRoutes";
import { RouteSearch } from "@/components/RouteSearch";
import { ScheduleList } from "@/components/ScheduleList";
import { StationCard } from "@/components/StationCard";
import { SupportButton } from "@/components/SupportButton";
import { TravelGuide } from "@/components/TravelGuide";
import { faqs, guideTips } from "@/data/faqs";
import { defaultRouteId, routePages, routes } from "@/data/routes";
import { getScheduleByRoute, schedules } from "@/data/schedules";
import { stations } from "@/data/stations";
import { getTranslations } from "@/lib/i18n";

const selectedRoute = routes.find((route) => route.id === defaultRouteId) ?? routes[0];
const selectedSchedule = getScheduleByRoute(selectedRoute.id) ?? schedules[0];
const nextDeparture = selectedSchedule.nextDeparture;
const t = getTranslations("en");

export const metadata: Metadata = {
  title: "Bangkok Pattaya Bus Guide – Bus Times, Prices & Stations",
  description:
    "Check Bangkok to Pattaya, Pattaya to Bangkok, and Suvarnabhumi Airport to Pattaya bus times, ticket prices, travel time, stations, and practical travel tips.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f0e3] text-[#13233a]">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-10 pt-3 sm:gap-8 sm:px-6 sm:pb-12 sm:pt-5 lg:px-8">
        <Header
          labels={{
            ...t.app,
            chooseLanguage: t.navigation.chooseLanguage,
          }}
          currentLocale="en"
          routeSlug={defaultRouteId}
        />

        <section id="top" className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="rounded-2xl border border-[#eadcc7] bg-[#fffaf2] p-5 shadow-sm sm:p-7">
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#2f6f93] sm:text-sm">
              Bus times, stations and travel tips
            </p>
            <h1 className="max-w-3xl text-[2.15rem] font-black leading-[1.08] text-[#13233a] sm:text-5xl">
              Bangkok Pattaya Bus Guide
            </h1>
            <p className="mt-3 max-w-2xl text-[0.95rem] font-semibold leading-7 text-[#4f5d6c] sm:mt-4 sm:text-lg">
              Check bus routes between Bangkok and Pattaya, the Pattaya to
              Bangkok return route, and the Suvarnabhumi Airport to Pattaya
              bus. Times are shown in Thailand local time. Schedules may
              change, so confirm at the station or with the operator before
              travel.
            </p>

            <RouteSearch labels={t.routeSelector} />
          </div>

          <NextBusCard
            schedule={selectedSchedule}
            nextDeparture={nextDeparture}
            labels={{
              ...t.nextBus,
              showAllDepartures: t.common.showAllDepartures,
            }}
          />
        </section>

        <PopularRoutes routePages={routePages} schedules={schedules} />

        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <ScheduleList
            route={selectedRoute}
            schedule={selectedSchedule}
            nextDeparture={nextDeparture}
            labels={t.schedule}
          />
          <StationCard
            stations={stations}
            labels={{
              ...t.station,
              openInGoogleMaps: t.common.openInGoogleMaps,
            }}
          />
        </section>

        <section className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <TravelGuide tips={guideTips} labels={t.travelTips} />
          <FAQ faqs={faqs} labels={t.faq} />
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
