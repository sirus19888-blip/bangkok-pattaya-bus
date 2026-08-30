"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { HotelAffiliateInline } from "@/components/HotelAffiliateInline";
import { TravelDateAwareTwelveGoAffiliateButton } from "@/components/TravelDateAwareTwelveGoAffiliateButton";
import { TravelDateField } from "@/components/TravelDateContext";
import { type HotelCity } from "@/data/hotelAffiliate";
import type { LocaleCode, RouteId } from "@/data/routes";
import type { Schedule } from "@/data/schedules";
import { useNextDeparture } from "@/hooks/useNextDeparture";
import type { Translations } from "@/lib/i18n";
import {
  getMinutesUntilDeparture,
  isNextDepartureInTodaySchedule,
  type NextDepartureResult,
} from "@/lib/scheduleTime";
import { getUiTranslations } from "@/lib/uiTranslations";

type MobileRouteDecisionCardProps = {
  affiliateLabel: string;
  locale: LocaleCode;
  distance: string;
  routeId: RouteId;
  routeTitle: string;
  schedule: Schedule;
  // Najblizszy odjazd policzony na serwerze; ta sama wartosc trafia do HTML
  // i do stanu poczatkowego klienta, wiec hydratacja sie nie rozjezdza.
  initialNextDeparture: NextDepartureResult;
  sourceStatusLabel: string;
  labels: Translations["nextBus"] & {
    showAllDepartures: string;
    nextBus: string;
  };
  scheduleLabels: Translations["schedule"];
};

export function MobileRouteDecisionCard({
  locale,
  distance,
  routeId,
  routeTitle,
  schedule,
  scheduleLabels,
  initialNextDeparture,
  sourceStatusLabel,
  labels,
}: MobileRouteDecisionCardProps) {
  const calculatedNextDeparture = useNextDeparture(schedule, initialNextDeparture);
  const [minutesUntilDeparture, setMinutesUntilDeparture] = useState<
    number | null
  >(null);
  const hasMultipleNextSubRoutes = calculatedNextDeparture.subRoutes.length > 1;
  const nextSubRouteDestinations = [
    ...new Set(
      calculatedNextDeparture.subRoutes.map((subRoute) =>
        subRoute.to.replace(/^Bangkok\s+/i, ""),
      ),
    ),
  ];
  const nextSubRouteText = !hasMultipleNextSubRoutes
    ? calculatedNextDeparture.subRoutes[0]?.label
    : nextSubRouteDestinations.length > 1
      ? `${labels.availableTo} ${nextSubRouteDestinations.join(" / ")}`
      : calculatedNextDeparture.subRoutes
          .map((subRoute) => subRoute.label)
          .join(" / ");
  const countdownText = formatCountdown(minutesUntilDeparture, labels);
  const isUrgentCountdown =
    minutesUntilDeparture !== null &&
    minutesUntilDeparture > 0 &&
    minutesUntilDeparture <= 15;
  const departures = schedule.departures;
  const hasDepartures = departures.length > 0;
  const hasSubRoutes = Boolean(schedule.subRoutes?.length);
  const nextDepartureDisplay =
    schedule.departureWindow ?? calculatedNextDeparture.time;
  const scheduleStatusLabels = getUiTranslations(locale).scheduleStatus;
  const commercialText = getUiTranslations(locale).commercial;
  const verificationStatus = getScheduleStatusLabel(
    schedule.verificationStatus,
    scheduleStatusLabels,
  );

  useEffect(() => {
    if (schedule.departureWindow) {
      // Stan startowy to juz null, a ta galaz konczy efekt przy kazdym przebiegu,
      // wiec ustawianie null bylo bez skutku - i lamalo react-hooks/set-state-in-effect.
      return;
    }

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
  }, [
    calculatedNextDeparture.isTomorrow,
    calculatedNextDeparture.time,
    schedule.departureWindow,
  ]);

  function handleShowDeparturesClick(
    event: React.MouseEvent<HTMLAnchorElement>,
  ) {
    const departuresSection = document.getElementById("mobile-departures");

    if (!departuresSection) {
      return;
    }

    event.preventDefault();
    departuresSection.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    window.history.replaceState(null, "", "#mobile-departures");
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
        <p
          className={`mt-1 font-black text-[#13233a] ${
            schedule.departureWindow
              ? "text-xl leading-tight md:text-2xl"
              : "text-4xl leading-none md:text-5xl"
          }`}
        >
          <span data-next-bus-hero={calculatedNextDeparture.time}>
            {nextDepartureDisplay || "\u00a0"}
          </span>
        </p>
        {countdownText && !schedule.departureWindow ? (
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
        {calculatedNextDeparture.isTomorrow && !schedule.departureWindow ? (
          <p className="mt-2 text-sm font-black text-[#4f5d6c]">
            {labels.nextServiceTomorrow}
          </p>
        ) : null}
        {nextSubRouteText ? (
          <p className="mt-2 rounded-xl border border-[#c8dbe9] bg-white px-3 py-1.5 text-xs font-black leading-5 text-[#13233a]">
            {nextSubRouteText}
          </p>
        ) : null}
        {commercialText.charterGapTitle &&
        commercialText.charterGapBody &&
        commercialText.charterGapCta ? (
          <article className="mt-3 rounded-2xl border border-[#eadcc7] bg-[#fffaf2] p-4">
            <h2 className="text-base font-black leading-tight text-[#13233a]">
              {commercialText.charterGapTitle}
            </h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-[#4f5d6c]">
              {commercialText.charterGapBody}
            </p>
            <TravelDateAwareTwelveGoAffiliateButton
              ctaPosition="route_charter_gap"
              disclosureMode="short"
              label={commercialText.charterGapCta}
              locale={locale}
              routeId={routeId}
              variant="afterSchedule"
            />
          </article>
        ) : null}
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2 md:mt-3 lg:hidden">
        <TravelTimeDistanceFact
          distance={distance}
          label={labels.travelTime}
          travelTime={schedule.travelTime}
        />
        <DecisionFact label={labels.ticketPrice} value={schedule.price} />
      </div>

      </div>

      <div className="relative md:col-start-2 md:row-span-3 md:row-start-1 md:min-w-0 md:rounded-2xl md:border md:border-[#eadcc7] md:bg-[#fffaf2] md:p-4 lg:mt-5 lg:pb-14">
      <p className="mt-2.5 text-xs font-black uppercase tracking-wide text-[#2f6f93] md:mt-0">
        {scheduleLabels.title}
      </p>
      <div
        id="mobile-departures"
        className={
          hasSubRoutes
            ? "mt-1.5 grid gap-2"
            : "mt-1.5 grid grid-cols-3 gap-1.5 md:grid-cols-5 md:gap-2 lg:grid-cols-6"
        }
        data-visual-qa={hasSubRoutes ? undefined : "schedule-grid"}
      >
        {hasSubRoutes ? (
          schedule.subRoutes?.map((subRoute, index) => (
            <div
              key={subRoute.id}
              className="rounded-xl border border-[#eadcc7] bg-white p-2"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h3 className="text-sm font-black leading-tight text-[#13233a]">
                  {subRoute.label}
                </h3>
                <p className="text-xs font-black leading-tight text-[#5f6874]">
                  {subRoute.price}
                </p>
              </div>
              <div
                className="mt-2 grid grid-cols-3 gap-1.5 md:grid-cols-5 md:gap-2 lg:grid-cols-6"
                data-visual-qa={index === 0 ? "schedule-grid" : undefined}
              >
                {subRoute.departures.map((departure) => {
                  const isNextDeparture =
                    isNextDepartureInTodaySchedule(
                      departure,
                      calculatedNextDeparture,
                    ) &&
                    calculatedNextDeparture.subRoutes.some(
                      (nextSubRoute) => nextSubRoute.id === subRoute.id,
                    );

                  return (
                    <DepartureChip
                      departure={departure}
                      isNextDeparture={isNextDeparture}
                      key={`${subRoute.id}-${departure}`}
                      labels={labels}
                    />
                  );
                })}
              </div>
            </div>
          ))
        ) : hasDepartures ? (
          departures.map((departure) => {
            const isNextDeparture = isNextDepartureInTodaySchedule(
              departure,
              calculatedNextDeparture,
            );

            return (
              <DepartureChip
                departure={departure}
                isNextDeparture={isNextDeparture}
                key={departure}
                labels={labels}
              />
            );
          })
        ) : (
          <p className="col-span-3 rounded-xl border border-[#eadcc7] bg-[#fffaf2] p-3 text-sm font-black leading-5 text-[#13233a]">
            {nextDepartureDisplay || "\u00a0"}
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
        href="#mobile-departures"
        onClick={handleShowDeparturesClick}
        className="mt-2.5 flex min-h-11 w-full items-center justify-center rounded-xl bg-[#13233a] px-5 text-center text-sm font-black text-white shadow-sm md:mt-0 md:max-w-sm"
      >
        {labels.showAllDepartures}
      </a>
      </div>
    </section>
  );
}

function DepartureChip({
  departure,
  isNextDeparture,
  labels,
}: {
  departure: string;
  isNextDeparture: boolean;
  labels: MobileRouteDecisionCardProps["labels"];
}) {
  return (
    <span
      className={`flex min-h-11 flex-col items-center justify-center rounded-xl border px-1 text-sm font-black md:text-base ${
        isNextDeparture
          ? "border-[#13233a] bg-[#13233a] text-white ring-2 ring-[#f3d77b]"
          : "border-[#eadcc7] bg-[#fffaf2] text-[#13233a]"
      }`}
      data-next-bus-chip={isNextDeparture ? departure : undefined}
    >
      {isNextDeparture ? (
        <span className="max-w-full truncate text-[0.56rem] uppercase leading-none tracking-wide text-[#f3d77b]">
          {labels.nextBus}
        </span>
      ) : null}
      <span>{departure}</span>
    </span>
  );
}

export function DesktopRouteBookingPanel({
  affiliateLabel,
  compareAlternativesLabel,
  distance,
  hotelCity,
  locale,
  reportHref,
  reportLabel,
  routeId,
  sidebarTitle,
  schedule,
  scheduleLabels,
  initialNextDeparture,
  sourceStatusLabel,
  labels,
}: MobileRouteDecisionCardProps & {
  compareAlternativesLabel: string;
  hotelCity?: HotelCity;
  reportHref: string;
  reportLabel: string;
  sidebarTitle: string;
}) {
  const calculatedNextDeparture = useNextDeparture(schedule, initialNextDeparture);
  const [minutesUntilDeparture, setMinutesUntilDeparture] = useState<
    number | null
  >(null);
  const countdownText = formatCountdown(minutesUntilDeparture, labels);
  const isUrgentCountdown =
    minutesUntilDeparture !== null &&
    minutesUntilDeparture > 0 &&
    minutesUntilDeparture <= 15;

  const nextDepartureDisplay =
    schedule.departureWindow ?? calculatedNextDeparture.time;

  useEffect(() => {
    if (schedule.departureWindow) {
      // Stan startowy to juz null, a ta galaz konczy efekt przy kazdym przebiegu,
      // wiec ustawianie null bylo bez skutku - i lamalo react-hooks/set-state-in-effect.
      return;
    }

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
  }, [
    calculatedNextDeparture.isTomorrow,
    calculatedNextDeparture.time,
    schedule.departureWindow,
  ]);

  return (
    <div
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
            <p
              className={`mt-1 font-black text-[#13233a] ${
                schedule.departureWindow
                  ? "text-2xl leading-tight"
                  : "text-5xl leading-none"
              }`}
            >
              <span data-next-bus-sidebar={calculatedNextDeparture.time}>
                {nextDepartureDisplay || "\u00a0"}
              </span>
            </p>
          </div>
          {calculatedNextDeparture.isTomorrow && !schedule.departureWindow ? (
            <p className="rounded-xl bg-white px-3 py-2 text-xs font-black text-[#4f5d6c]">
              {labels.nextServiceTomorrow}
            </p>
          ) : null}
        </div>
        {countdownText && !schedule.departureWindow ? (
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

      <TravelDateField locale={locale} />
      <TravelDateAwareTwelveGoAffiliateButton
        ctaPosition="desktop_sidebar"
        label={affiliateLabel}
        locale={locale}
        routeId={routeId}
        variant="top"
      />
      <TravelDateAwareTwelveGoAffiliateButton
        ctaPosition="route_after_schedule"
        disclosureMode="none"
        label={compareAlternativesLabel}
        locale={locale}
        routeId={routeId}
        variant="afterSchedule"
      />

      <div className="mt-4 grid gap-3">
        <TravelTimeDistanceFact
          distance={distance}
          label={labels.travelTime}
          travelTime={schedule.travelTime}
        />
        <DecisionFact label={labels.ticketPrice} value={schedule.price} />
      </div>

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

      {hotelCity ? (
        <div className="mt-4 rounded-xl border border-[#e8b05a]/60 bg-[#fff8ec] p-3">
          <p className="text-xs font-black uppercase tracking-wide text-[#8a5b12]">
            {getUiTranslations(locale).hotel.eyebrow}
          </p>
          <HotelAffiliateInline
            city={hotelCity}
            locale={locale}
            routeId={routeId}
            ctaPosition="route_hotel_sidebar"
            className="mt-2 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#e8b05a] px-4 text-center text-sm font-black text-[#13233a] shadow-sm transition hover:bg-[#dca23f]"
          />
        </div>
      ) : null}

      <a
        href={reportHref}
        className="mt-3 flex min-h-11 items-center justify-center rounded-xl border border-[#7fb7d8] bg-[#f4fbff] px-4 text-center text-sm font-black text-[#13233a] transition hover:bg-white"
      >
        {reportLabel}
      </a>
    </div>
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
          className="flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center overflow-hidden rounded-xl border border-[#eadcc7] bg-[#fffaf2] shadow-sm ring-1 ring-[#13233a]/5 transition group-open:ring-2 group-open:ring-[#e8b05a] lg:bg-white [&::-webkit-details-marker]:hidden"
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

function TravelTimeDistanceFact({
  distance,
  label,
  travelTime,
}: {
  distance: string;
  label: string;
  travelTime: string;
}) {
  return (
    <DecisionFact label={label}>
      <span>{travelTime}</span>
      <span aria-hidden="true">{" • "}</span>
      <span>{distance}</span>
    </DecisionFact>
  );
}

function DecisionFact({
  children,
  label,
  value,
}: {
  children?: ReactNode;
  label: string;
  value?: string;
}) {
  const cleanLabel = label.replace(":", "");

  return (
    <div className="rounded-xl border border-[#eadcc7] bg-[#fffaf2] p-2.5">
      <p className="text-[0.68rem] font-black uppercase tracking-wide text-[#5f6874]">
        {cleanLabel}
      </p>
      <div className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-0 text-sm font-black leading-snug text-[#13233a]">
        {children ?? value}
      </div>
    </div>
  );
}
