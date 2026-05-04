"use client";

import type { Schedule } from "@/data/schedules";
import { useNextDeparture } from "@/hooks/useNextDeparture";
import type { Translations } from "@/lib/i18n";

type NextBusCardProps = {
  schedule: Schedule;
  nextDeparture: string;
  labels: Translations["nextBus"] & {
    showAllDepartures: string;
  };
};

export function NextBusCard({
  schedule,
  nextDeparture,
  labels,
}: NextBusCardProps) {
  const calculatedNextDeparture = useNextDeparture(schedule, nextDeparture);
  const hasMultipleNextSubRoutes = calculatedNextDeparture.subRoutes.length > 1;
  const nextSubRouteText = hasMultipleNextSubRoutes
    ? `${labels.availableTo} ${calculatedNextDeparture.subRoutes
        .map((subRoute) => subRoute.to.replace(/^Bangkok\s+/i, ""))
        .join(" / ")}`
    : calculatedNextDeparture.subRoutes[0]?.label;

  return (
    <aside className="rounded-2xl border border-[#c8dbe9] bg-[#eaf5fb] p-4 shadow-sm sm:p-6 md:p-4 lg:sticky lg:top-5 lg:self-start">
      <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6 md:p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-black text-[#13233a]">{labels.title}</p>
            <p className="mt-1 text-xs font-bold leading-5 text-[#4f5d6c]">
              {labels.timeZoneNote}
            </p>
          </div>
          <span className="rounded-full bg-[#f3d77b] px-3 py-1 text-xs font-black text-[#3f3413]">
            {labels.title.replace(":", "")}
          </span>
        </div>
        <p className="mt-4 text-5xl font-black leading-none text-[#13233a] sm:text-6xl md:mt-3 md:text-5xl lg:text-[3.25rem]">
          {calculatedNextDeparture.time}
        </p>
        {calculatedNextDeparture.isTomorrow ? (
          <p className="mt-2 text-sm font-black text-[#4f5d6c]">
            {labels.nextServiceTomorrow}
          </p>
        ) : null}
        {nextSubRouteText ? (
          <p className="mt-3 rounded-xl border border-[#eadcc7] bg-[#fffaf2] px-3 py-2 text-sm font-black leading-5 text-[#13233a] sm:text-base">
            {nextSubRouteText}
          </p>
        ) : null}

        <div className="mt-5 grid grid-cols-1 gap-3 sm:mt-6 md:mt-4 md:gap-2.5">
          <MiniFact label={labels.travelTime} value={schedule.travelTime} />
          <MiniFact label={labels.ticketPrice} value={schedule.price} />
        </div>

        <a
          href="#schedule"
          className="mt-5 flex min-h-14 w-full items-center justify-center rounded-xl bg-[#13233a] px-5 text-center text-base font-black text-white shadow-sm transition hover:bg-[#1d3455] sm:mt-6 md:mt-4 md:min-h-12 md:text-sm"
        >
          {labels.showAllDepartures}
        </a>
      </div>
    </aside>
  );
}

function MiniFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#c8dbe9] bg-[#f8fcff] p-4 md:p-3">
      <p className="text-xs font-bold uppercase tracking-wide text-[#5f6874]">
        {label}
      </p>
      <p className="mt-1 text-base font-black leading-snug text-[#13233a] sm:text-lg md:text-base">{value}</p>
    </div>
  );
}
