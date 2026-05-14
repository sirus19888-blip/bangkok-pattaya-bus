"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { TwelveGoAffiliateButton } from "@/components/TwelveGoAffiliateButton";
import type { LocaleCode, RouteId } from "@/data/routes";
import type { Schedule } from "@/data/schedules";
import { useNextDeparture } from "@/hooks/useNextDeparture";
import type { Translations } from "@/lib/i18n";
import { getMinutesUntilDeparture } from "@/lib/scheduleTime";
import { getUiTranslations } from "@/lib/uiTranslations";

type MobileRouteDecisionCardProps = {
  affiliateLabel: string;
  locale: LocaleCode;
  distance: string;
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
  distance,
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
  const scheduleStatusLabels = getUiTranslations(locale).scheduleStatus;
  const verificationStatus = getScheduleStatusLabel(
    schedule.verificationStatus,
    scheduleStatusLabels,
  );

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
    <section className="rounded-2xl border border-[#c8dbe9] bg-white p-3 shadow-sm md:grid md:grid-cols-[minmax(0,0.95fr)_minmax(23rem,1.05fr)] md:gap-4 md:p-5 lg:block">
      <div className="md:flex md:min-w-0 md:flex-col">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-wide text-[#2f6f93]">
            {sourceStatusLabel}
          </p>
          <h1 className="mt-1 text-[1.45rem] font-black leading-[1.08] text-[#13233a] md:text-[2.35rem] md:leading-[1.02] lg:text-[2.75rem]">
            {routeTitle}
          </h1>
        </div>
        <span className="shrink-0 rounded-full bg-[#f3d77b] px-3 py-1 text-xs font-black text-[#3f3413] md:mt-1">
          {labels.title.replace(":", "")}
        </span>
      </div>

      <div className="mt-2.5 rounded-2xl bg-[#eaf5fb] p-3 md:mt-4 md:p-4 lg:hidden">
        <p className="text-xs font-bold text-[#4f5d6c]">
          {labels.timeZoneNote}
        </p>
        <p className="mt-1 text-4xl font-black leading-none text-[#13233a] md:text-5xl">
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

      <div className="mt-2 grid grid-cols-2 gap-2 md:mt-3 lg:hidden">
        <DecisionFact
          label={labels.travelTime}
          value={`${schedule.travelTime} â€˘ ${distance}`}
        />
        <DecisionFact label={labels.ticketPrice} value={schedule.price} />
      </div>

      </div>

      <div className="relative md:col-start-2 md:row-span-3 md:row-start-1 md:min-w-0 md:rounded-2xl md:border md:border-[#eadcc7] md:bg-[#fffaf2] md:p-4 lg:mt-5 lg:pb-14">
      <p className="mt-2.5 text-xs font-black uppercase tracking-wide text-[#2f6f93] md:mt-0">
        {scheduleLabels.title}
      </p>
      <div id="mobile-departures" className="mt-1.5 grid grid-cols-3 gap-1.5 md:grid-cols-5 md:gap-2 lg:grid-cols-6">
        {hasDepartures ? (
          departures.map((departure) => (
            <span
              key={departure}
              className={`flex min-h-9 flex-col items-center justify-center rounded-xl border px-1 text-sm font-black md:min-h-11 md:text-base ${
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
      <ScheduleDataDetails
        schedule={schedule}
        scheduleLabels={scheduleLabels}
        verificationStatus={verificationStatus}
      />
      </div>

      <div className="md:col-start-1 md:row-start-2 lg:hidden">
      <a
        href="#mobile-related-routes"
        onClick={handleShowRelatedRoutesClick}
        className="mt-2.5 flex min-h-11 w-full items-center justify-center rounded-xl bg-[#13233a] px-5 text-center text-sm font-black text-white shadow-sm md:mt-0 md:max-w-sm"
      >
        {labels.showAllDepartures}
      </a>
      <TwelveGoAffiliateButton
        ctaPosition="mobile_sticky"
        label={affiliateLabel}
        locale={locale}
        routeId={routeId}
        variant="stickyMobile"
      />

      </div>
    </section>
  );
}

export function DesktopRouteBookingPanel({
  affiliateLabel,
  compareAlternativesLabel,
  distance,
  locale,
  reportHref,
  reportLabel,
  routeId,
  sidebarTitle,
  schedule,
  scheduleLabels,
  nextDeparture,
  sourceStatusLabel,
  labels,
}: MobileRouteDecisionCardProps & {
  compareAlternativesLabel: string;
  reportHref: string;
  reportLabel: string;
  sidebarTitle: string;
}) {
  const calculatedNextDeparture = useNextDeparture(schedule, nextDeparture);
  const [minutesUntilDeparture, setMinutesUntilDeparture] = useState<
    number | null
  >(() =>
    getMinutesUntilDeparture(
      calculatedNextDeparture.time,
      calculatedNextDeparture.isTomorrow,
    ),
  );
  const countdownText = formatCountdown(minutesUntilDeparture, labels);
  const isUrgentCountdown =
    minutesUntilDeparture !== null &&
    minutesUntilDeparture > 0 &&
    minutesUntilDeparture <= 15;

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

  return (
    <aside
      className="hidden rounded-2xl border border-[#eadcc7] bg-white p-5 shadow-sm lg:block"
      data-desktop-booking-panel="true"
    >
      <h2 className="text-xl font-black leading-tight text-[#13233a]">
        {sidebarTitle}
      </h2>
      <p className="text-xs font-black uppercase tracking-wide text-[#2f6f93]">
        {sourceStatusLabel}
      </p>
      <div className="mt-3 rounded-2xl bg-[#eaf5fb] p-4">
        <p className="text-xs font-bold text-[#4f5d6c]">
          {labels.timeZoneNote}
        </p>
        <div className="mt-3 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#2f6f93]">
              {labels.title.replace(":", "")}
            </p>
            <p className="mt-1 text-5xl font-black leading-none text-[#13233a]">
              {calculatedNextDeparture.time}
            </p>
          </div>
          {calculatedNextDeparture.isTomorrow ? (
            <p className="rounded-xl bg-white px-3 py-2 text-xs font-black text-[#4f5d6c]">
              {labels.nextServiceTomorrow}
            </p>
          ) : null}
        </div>
        {countdownText ? (
          <div className="mt-4 rounded-xl border border-[#13233a]/10 bg-[#13233a] px-3 py-2 text-white shadow-sm">
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
      </div>

      <div className="mt-4 grid gap-3">
        <DecisionFact
          label={labels.travelTime}
          value={`${schedule.travelTime} â€˘ ${distance}`}
        />
        <DecisionFact label={labels.ticketPrice} value={schedule.price} />
      </div>

      <TwelveGoAffiliateButton
        ctaPosition="desktop_sidebar"
        label={affiliateLabel}
        locale={locale}
        routeId={routeId}
        variant="top"
      />
      <TwelveGoAffiliateButton
        ctaPosition="route_after_schedule"
        disclosureMode="none"
        label={compareAlternativesLabel}
        locale={locale}
        routeId={routeId}
        variant="afterSchedule"
      />

      <div className="mt-4 rounded-xl border border-[#eadcc7] bg-[#fffaf2] p-3 text-xs font-semibold leading-5 text-[#4f5d6c]">
        <p>
          <span className="font-black text-[#13233a]">
            {trimTrailingColon(scheduleLabels.lastVerified)}:
          </span>{" "}
          {schedule.lastVerified}
        </p>
        <p className="mt-1">
          <span className="font-black text-[#13233a]">
            {trimTrailingColon(scheduleLabels.source)}:
          </span>{" "}
          {schedule.sourceName}
        </p>
      </div>

      <a
        href={reportHref}
        className="mt-3 flex min-h-11 items-center justify-center rounded-xl border border-[#7fb7d8] bg-[#f4fbff] px-4 text-center text-sm font-black text-[#13233a] transition hover:bg-white"
      >
        {reportLabel}
      </a>
    </aside>
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

function ScheduleDataDetails({
  schedule,
  scheduleLabels,
  verificationStatus,
}: {
  schedule: Schedule;
  scheduleLabels: Translations["schedule"];
  verificationStatus: string;
}) {
  return (
    <div className="mt-2 flex items-start justify-end gap-2 md:mt-3 lg:absolute lg:bottom-3 lg:right-3 lg:mt-0">
      <details
        className="group relative shrink-0"
        data-schedule-data="true"
      >
        <summary
          aria-label={scheduleLabels.dataTitle}
          className="flex h-9 w-9 cursor-pointer list-none items-center justify-center overflow-hidden rounded-xl border border-[#eadcc7] bg-[#fffaf2] shadow-sm ring-1 ring-[#13233a]/5 transition group-open:ring-2 group-open:ring-[#e8b05a] lg:h-10 lg:w-10 lg:bg-white [&::-webkit-details-marker]:hidden"
        >
          <Image
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
            height={40}
            src="/images/icons/icon-schedule-data.png"
            width={40}
          />
        </summary>
        <div className="absolute right-0 top-[calc(100%+0.45rem)] z-30 w-[17.5rem] max-w-[calc(100vw-2rem)] rounded-2xl border border-[#eadcc7] bg-[#fffaf2] p-3 text-left text-xs leading-5 text-[#4f5d6c] shadow-2xl shadow-[#13233a]/20 lg:bottom-[calc(100%+0.55rem)] lg:top-auto lg:w-[23rem] lg:max-w-[calc(100vw-3rem)] lg:p-4 lg:font-semibold">
          <p className="text-sm font-black text-[#13233a]">
            {scheduleLabels.dataTitle}
          </p>
          <dl className="mt-2 grid gap-1.5 lg:mt-3 lg:gap-2">
            <MobileScheduleInfoRow label={scheduleLabels.source}>
              {schedule.sourceName}
            </MobileScheduleInfoRow>
            <MobileScheduleInfoRow label={scheduleLabels.lastVerified}>
              {schedule.lastVerified}
            </MobileScheduleInfoRow>
            <MobileScheduleInfoRow label={scheduleLabels.sourceType}>
              {schedule.sourceType}
            </MobileScheduleInfoRow>
            <MobileScheduleInfoRow label={scheduleLabels.verification}>
              {verificationStatus}
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
          <p className="mt-2 rounded-xl bg-white px-3 py-2 font-bold text-[#13233a] lg:mt-3">
            {schedule.operatorNote}
          </p>
        </div>
      </details>
    </div>
  );
}

function getScheduleStatusLabel(
  status: Schedule["verificationStatus"],
  labels: ReturnType<typeof getUiTranslations>["scheduleStatus"],
) {
  if (status === "needs official confirmation") {
    return labels.needsOfficialConfirmation;
  }

  return labels.partiallyVerified;
}

function trimTrailingColon(label: string) {
  return label.replace(/\s*:+$/, "");
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
