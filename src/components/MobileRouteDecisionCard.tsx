"use client";

import type { Schedule } from "@/data/schedules";
import { useNextDeparture } from "@/hooks/useNextDeparture";
import type { Translations } from "@/lib/i18n";

type MobileRouteDecisionCardProps = {
  routeTitle: string;
  schedule: Schedule;
  nextDeparture: string;
  sourceStatusLabel: string;
  labels: Translations["nextBus"] & {
    showAllDepartures: string;
    nextBus: string;
  };
};

export function MobileRouteDecisionCard({
  routeTitle,
  schedule,
  nextDeparture,
  sourceStatusLabel,
  labels,
}: MobileRouteDecisionCardProps) {
  const calculatedNextDeparture = useNextDeparture(schedule, nextDeparture);
  const hasMultipleNextSubRoutes = calculatedNextDeparture.subRoutes.length > 1;
  const nextSubRouteText = hasMultipleNextSubRoutes
    ? `${labels.availableTo} ${calculatedNextDeparture.subRoutes
        .map((subRoute) => subRoute.to.replace(/^Bangkok\s+/i, ""))
        .join(" / ")}`
    : calculatedNextDeparture.subRoutes[0]?.label;
  const departures = schedule.departures;
  const hasDepartures = departures.length > 0;

  return (
    <section className="rounded-2xl border border-[#c8dbe9] bg-white p-3 shadow-sm md:hidden">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-wide text-[#2f6f93]">
            {sourceStatusLabel}
          </p>
          <h1 className="mt-1 text-[1.45rem] font-black leading-[1.08] text-[#13233a]">
            {routeTitle}
          </h1>
        </div>
        <span className="shrink-0 rounded-full bg-[#f3d77b] px-3 py-1 text-xs font-black text-[#3f3413]">
          {labels.title.replace(":", "")}
        </span>
      </div>

      <div className="mt-2.5 rounded-2xl bg-[#eaf5fb] p-3">
        <p className="text-xs font-bold text-[#4f5d6c]">
          {labels.timeZoneNote}
        </p>
        <p className="mt-1 text-4xl font-black leading-none text-[#13233a]">
          {calculatedNextDeparture.time}
        </p>
        {calculatedNextDeparture.isTomorrow ? (
          <p className="mt-2 text-sm font-black text-[#4f5d6c]">
            {labels.nextServiceTomorrow}
          </p>
        ) : null}
        {nextSubRouteText ? (
          <p className="mt-2 rounded-xl border border-[#c8dbe9] bg-white px-3 py-1.5 text-xs font-black leading-5 text-[#13233a]">
            {nextSubRouteText}
          </p>
        ) : null}
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <DecisionFact label={labels.travelTime} value={schedule.travelTime} />
        <DecisionFact label={labels.ticketPrice} value={schedule.price} />
      </div>

      <div id="mobile-departures" className="mt-2.5 grid grid-cols-3 gap-1.5">
        {hasDepartures ? (
          departures.map((departure) => (
            <span
              key={departure}
              className={`flex min-h-9 flex-col items-center justify-center rounded-xl border px-1 text-sm font-black ${
                departure === calculatedNextDeparture.time
                  ? "border-[#13233a] bg-[#13233a] text-white ring-2 ring-[#f3d77b]"
                  : "border-[#eadcc7] bg-[#fffaf2] text-[#13233a]"
              }`}
            >
              {departure}
              {departure === calculatedNextDeparture.time ? (
                <span className="max-w-full truncate text-[0.56rem] uppercase leading-none tracking-wide text-[#f3d77b]">
                  {labels.nextBus}
                </span>
              ) : null}
            </span>
          ))
        ) : (
          <p className="col-span-3 rounded-xl border border-[#eadcc7] bg-[#fffaf2] p-3 text-sm font-black leading-5 text-[#13233a]">
            {calculatedNextDeparture.time}
          </p>
        )}
      </div>

      <a
        href="#mobile-departures"
        className="mt-2.5 flex min-h-11 w-full items-center justify-center rounded-xl bg-[#13233a] px-5 text-center text-sm font-black text-white shadow-sm"
      >
        {labels.showAllDepartures}
      </a>
    </section>
  );
}

function DecisionFact({ label, value }: { label: string; value: string }) {
  const cleanLabel = label.replace(":", "");

  return (
    <div className="rounded-xl border border-[#eadcc7] bg-[#fffaf2] p-2.5">
      <p className="text-[0.68rem] font-black uppercase tracking-wide text-[#5f6874]">
        {cleanLabel}
      </p>
      <p className="mt-1 text-sm font-black leading-snug text-[#13233a]">
        {value}
      </p>
    </div>
  );
}
