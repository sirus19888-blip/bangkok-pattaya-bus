"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  getTwelveGoDisclosure,
  TwelveGoAffiliateButton,
} from "@/components/TwelveGoAffiliateButton";
import type { LocaleCode, RouteId } from "@/data/routes";
import type { Schedule } from "@/data/schedules";
import { useNextDeparture } from "@/hooks/useNextDeparture";
import type { Translations } from "@/lib/i18n";
import { getMinutesUntilDeparture } from "@/lib/scheduleTime";

type MobileRouteDecisionCardProps = {
  affiliateLabel: string;
  locale: LocaleCode;
  routeId: RouteId;
  routeTitle: string;
  schedule: Schedule;
  nextDeparture: string;
  sourceStatusLabel: string;
  labels: Translations["nextBus"] & {
    showAllDepartures: string;
    nextBus: string;
  };
  scheduleLabels: Translations["schedule"];
};

export function MobileRouteDecisionCard({
  affiliateLabel,
  locale,
  routeId,
  routeTitle,
  schedule,
  scheduleLabels,
  nextDeparture,
  sourceStatusLabel,
  labels,
}: MobileRouteDecisionCardProps) {
  const calculatedNextDeparture = useNextDeparture(schedule, nextDeparture);
  const [minutesUntilDeparture, setMinutesUntilDeparture] = useState<
    number | null
  >(() =>
    getMinutesUntilDeparture(
      calculatedNextDeparture.time,
      calculatedNextDeparture.isTomorrow,
    ),
  );
  const hasMultipleNextSubRoutes = calculatedNextDeparture.subRoutes.length > 1;
  const nextSubRouteText = hasMultipleNextSubRoutes
    ? `${labels.availableTo} ${calculatedNextDeparture.subRoutes
        .map((subRoute) => subRoute.to.replace(/^Bangkok\s+/i, ""))
        .join(" / ")}`
    : calculatedNextDeparture.subRoutes[0]?.label;
  const countdownText = formatCountdown(minutesUntilDeparture, labels);
  const isUrgentCountdown =
    minutesUntilDeparture !== null &&
    minutesUntilDeparture > 0 &&
    minutesUntilDeparture <= 15;
  const departures = schedule.departures;
  const hasDepartures = departures.length > 0;

  useEffect(() => {
    function updateCountdown() {
      setMinutesUntilDeparture(
        getMinutesUntilDeparture(
          calculatedNextDeparture.time,
          calculatedNextDeparture.isTomorrow,
        ),
      );
    }

    updateCountdown();
    const intervalId = window.setInterval(updateCountdown, 30_000);

    return () => window.clearInterval(intervalId);
  }, [calculatedNextDeparture.isTomorrow, calculatedNextDeparture.time]);

  function handleShowRelatedRoutesClick(
    event: React.MouseEvent<HTMLAnchorElement>,
  ) {
    const relatedRoutes = document.getElementById("mobile-related-routes");

    if (!relatedRoutes) {
      return;
    }

    event.preventDefault();
    relatedRoutes.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    window.history.replaceState(null, "", "#mobile-related-routes");
  }

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
        {countdownText ? (
          <div className="mt-2 rounded-xl border border-[#13233a]/10 bg-[#13233a] px-3 py-2 text-white shadow-sm">
            <span className="block text-[0.62rem] font-black uppercase tracking-wide text-[#f3d77b]">
              {labels.remainingTime}
            </span>
            <span
              className={`mt-0.5 block text-lg font-black leading-tight ${
                isUrgentCountdown ? "text-[#c81e1e]" : ""
              }`}
            >
              {countdownText}
            </span>
          </div>
        ) : null}
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
        href="#mobile-related-routes"
        onClick={handleShowRelatedRoutesClick}
        className="mt-2.5 flex min-h-11 w-full items-center justify-center rounded-xl bg-[#13233a] px-5 text-center text-sm font-black text-white shadow-sm"
      >
        {labels.showAllDepartures}
      </a>
      <TwelveGoAffiliateButton
        className="mt-2 flex min-h-11 w-full items-center justify-center rounded-xl border border-[#e8b05a] bg-[#fff8ec] px-5 text-center text-sm font-black text-[#13233a] shadow-sm"
        label={affiliateLabel}
        locale={locale}
        routeId={routeId}
      />
      <div className="relative mt-1.5 flex items-start justify-between gap-2">
        <p className="min-w-0 flex-1 text-xs font-semibold leading-5 text-[#5f6874]">
          {getTwelveGoDisclosure(locale)}
        </p>
        <details className="group relative shrink-0">
          <summary
            aria-label={scheduleLabels.dataTitle}
            className="flex h-11 w-11 cursor-pointer list-none items-center justify-center overflow-hidden rounded-2xl border border-[#eadcc7] bg-[#fffaf2] shadow-sm ring-1 ring-[#13233a]/5 transition group-open:ring-2 group-open:ring-[#e8b05a] [&::-webkit-details-marker]:hidden"
          >
            <Image
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
              height={44}
              src="/images/icons/icon-schedule-data.png"
              width={44}
            />
          </summary>
          <div className="absolute right-0 top-[calc(100%+0.45rem)] z-30 w-[17.5rem] max-w-[calc(100vw-2rem)] rounded-2xl border border-[#eadcc7] bg-[#fffaf2] p-3 text-left text-xs leading-5 text-[#4f5d6c] shadow-2xl shadow-[#13233a]/20">
            <p className="text-sm font-black text-[#13233a]">
              {scheduleLabels.dataTitle}
            </p>
            <dl className="mt-2 grid gap-1.5">
              <MobileScheduleInfoRow label={scheduleLabels.source}>
                {schedule.sourceName}
              </MobileScheduleInfoRow>
              <MobileScheduleInfoRow label={scheduleLabels.lastVerified}>
                {schedule.lastVerified}
              </MobileScheduleInfoRow>
              <MobileScheduleInfoRow label={scheduleLabels.sourceType}>
                {schedule.sourceType}
              </MobileScheduleInfoRow>
              <MobileScheduleInfoRow label={scheduleLabels.fareNote}>
                {schedule.fareNote}
              </MobileScheduleInfoRow>
              {schedule.boardingNote ? (
                <MobileScheduleInfoRow label={scheduleLabels.boardingNote}>
                  {schedule.boardingNote}
                </MobileScheduleInfoRow>
              ) : null}
              <MobileScheduleInfoRow label={scheduleLabels.dataQuality}>
                {schedule.dataQuality}
              </MobileScheduleInfoRow>
            </dl>
            <p className="mt-2 rounded-xl bg-white px-3 py-2 font-bold text-[#13233a]">
              {schedule.operatorNote}
            </p>
          </div>
        </details>
      </div>
    </section>
  );
}

function MobileScheduleInfoRow({
  children,
  label,
}: {
  children: string;
  label: string;
}) {
  return (
    <div className="grid gap-0.5">
      <dt className="font-black text-[#13233a]">{label}</dt>
      <dd className="font-semibold">{children}</dd>
    </div>
  );
}

function formatCountdown(
  minutesUntilDeparture: number | null,
  labels: MobileRouteDecisionCardProps["labels"],
) {
  if (minutesUntilDeparture === null) {
    return null;
  }

  if (minutesUntilDeparture <= 0) {
    return labels.leavingNow;
  }

  if (minutesUntilDeparture < 60) {
    return `${minutesUntilDeparture} ${labels.minutesShort}`;
  }

  const hours = Math.floor(minutesUntilDeparture / 60);
  const minutes = minutesUntilDeparture % 60;

  if (minutes === 0) {
    return `${hours} ${labels.hoursShort}`;
  }

  return `${hours} ${labels.hoursShort} ${minutes} ${labels.minutesShort}`;
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
