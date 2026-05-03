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
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-8 pt-4 sm:gap-8 sm:px-6 sm:pb-12 sm:pt-5 lg:px-8">
        <Header
          labels={{
            ...t.app,
            chooseLanguage: t.navigation.chooseLanguage,
          }}
          currentLocale="en"
          routeSlug={defaultRouteId}
        />

        <section id="top" className="grid gap-4 sm:gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="rounded-lg border border-[#eadcc7] bg-[#fffaf2] p-4 shadow-sm sm:p-7">
            <h1 className="text-3xl font-black leading-tight text-[#13233a] sm:text-5xl">
              Bangkok Pattaya Bus Guide
            </h1>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-[#4f5d6c] sm:text-lg">
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

        <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
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

        <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
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
