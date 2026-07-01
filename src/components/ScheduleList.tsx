"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import type { Route } from "@/data/routes";
import type { Schedule, ScheduleSource } from "@/data/schedules";
import { useNextDeparture } from "@/hooks/useNextDeparture";
import {
  getLocalizedSubRoutePrice,
  type Translations,
} from "@/lib/i18n";
import { isNextDepartureInTodaySchedule } from "@/lib/scheduleTime";

type ScheduleListProps = {
  route: Route;
  schedule: Schedule;
  nextDeparture: string;
  t: Translations;
  labels: Translations["schedule"];
  sourceOnly?: boolean;
  showSourceInfo?: boolean;
  sourceInfoMode?: "inline" | "popover";
};

export function ScheduleList({
  route,
  schedule,
  nextDeparture,
  t,
  labels,
  sourceOnly = false,
  showSourceInfo = false,
  sourceInfoMode = "inline",
}: ScheduleListProps) {
  const hasSubRoutes = Boolean(schedule.subRoutes?.length);
  const calculatedNextDeparture = useNextDeparture(schedule, nextDeparture);

  if (sourceOnly) {
    return (
      <section className="rounded-2xl border border-[#eadcc7] bg-white p-0 shadow-none">
        <ScheduleSourceInfo
          boardingNote={schedule.boardingNote}
          labels={labels}
          source={schedule}
        />
      </section>
    );
  }

  return (
    <section id="schedule" className="rounded-2xl border border-[#eadcc7] bg-white p-3.5 shadow-sm sm:p-5 md:p-4">
      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wide text-[#2f6f93] sm:text-sm">
            {labels.title}
          </p>
          <h2 className="mt-1 text-xl font-black leading-tight text-[#13233a] sm:text-2xl md:text-xl">{route.label}</h2>
          <p className="mt-1 text-xs font-bold text-[#5f6874]">
            {labels.timeZoneNote}
          </p>
        </div>
        <p className="text-xs font-bold text-[#5f6874] sm:text-right sm:text-sm">
          {labels.updated} {schedule.lastUpdated}
        </p>
      </div>
      {hasSubRoutes ? (
        <div className="mt-3 grid gap-3 sm:mt-5 sm:gap-4 md:mt-4 md:gap-3">
          {schedule.subRoutes?.map((subRoute) => (
            <div
              key={subRoute.id}
              className="rounded-2xl border border-[#eadcc7] bg-[#fffaf2] p-3 sm:p-4 md:p-3"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-[#5f6874]">
                {labels.subRoute}
              </p>
              <h3 className="mt-1 text-base font-black leading-tight text-[#13233a] sm:text-lg">
                {subRoute.label}
              </h3>
              <p className="mt-1 text-xs font-black leading-tight text-[#5f6874]">
                {getLocalizedSubRoutePrice(
                  schedule.id,
                  subRoute.id,
                  t,
                  subRoute.price,
                )}
              </p>
              <div className="mt-2.5 grid grid-cols-3 gap-2 min-[390px]:grid-cols-4 sm:mt-3 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-2 lg:grid-cols-4 xl:grid-cols-5">
                {subRoute.departures.map((departure) => (
                  <DepartureTile
                    key={`${subRoute.id}-${departure}`}
                    departure={departure}
                    isNext={
                      isNextDepartureInTodaySchedule(
                        departure,
                        calculatedNextDeparture,
                      ) &&
                      calculatedNextDeparture.subRoutes.some(
                        (nextSubRoute) => nextSubRoute.id === subRoute.id,
                      )
                    }
                    labels={labels}
                  />
                ))}
              </div>
              {showSourceInfo ? (
                <ScheduleSourceInfo
                  boardingNote={subRoute.boardingNote}
                  disclaimer={schedule.disclaimer}
                  labels={labels}
                  lastUpdated={schedule.lastUpdated}
                  mode={sourceInfoMode}
                  source={subRoute}
                />
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <>
          {schedule.departures.length > 0 ? (
            <div className="mt-3 grid grid-cols-3 gap-2 min-[390px]:grid-cols-4 sm:mt-5 sm:grid-cols-3 sm:gap-3 md:mt-4 md:grid-cols-5 md:gap-2 lg:grid-cols-5 xl:grid-cols-6">
              {schedule.departures.map((departure) => (
                <DepartureTile
                  key={departure}
                  departure={departure}
                  isNext={isNextDepartureInTodaySchedule(
                    departure,
                    calculatedNextDeparture,
                  )}
                  labels={labels}
                />
              ))}
            </div>
          ) : schedule.departureWindow ? (
            <p className="mt-3 rounded-xl border border-[#eadcc7] bg-[#fffaf2] p-3 text-sm font-black leading-6 text-[#13233a] sm:mt-5 sm:p-4">
              {schedule.departureWindow}
            </p>
          ) : (
            <p className="mt-3 rounded-xl border border-[#eadcc7] bg-[#fffaf2] p-3 text-sm font-black leading-6 text-[#13233a] sm:mt-5 sm:p-4">
              {labels.needsOfficialConfirmationNotice}
            </p>
          )}
        </>
      )}
      <p className="mt-3 rounded-xl bg-[#fffaf2] p-3 text-sm font-semibold leading-6 text-[#4f5d6c] sm:mt-5 sm:p-4 md:mt-4 md:p-3 md:text-xs md:leading-5">
        {schedule.disclaimer}
      </p>
      {showSourceInfo && !hasSubRoutes ? (
        <ScheduleSourceInfo
          boardingNote={schedule.boardingNote}
          disclaimer={schedule.disclaimer}
          labels={labels}
          lastUpdated={schedule.lastUpdated}
          mode={sourceInfoMode}
          source={schedule}
        />
      ) : null}
    </section>
  );
}

function DepartureTile({
  departure,
  isNext,
  labels,
}: {
  departure: string;
  isNext: boolean;
  labels: Translations["schedule"];
}) {
  return (
    <article
      className={`flex min-h-11 flex-col items-center justify-center rounded-xl border px-1.5 py-1.5 text-center shadow-sm sm:min-h-24 sm:items-start sm:p-4 sm:text-left md:min-h-14 md:items-center md:p-2 md:text-center ${
        isNext
          ? "border-[#13233a] bg-[#13233a] text-white ring-2 ring-[#f3d77b]"
          : "border-[#eadcc7] bg-white text-[#13233a]"
      }`}
    >
      <p
        className={`text-[0.65rem] font-black uppercase tracking-wide sm:text-xs md:text-[0.65rem] ${
          isNext ? "text-[#f3d77b]" : "text-[#5f6874]"
        }`}
      >
        {isNext ? labels.nextBus : null}
      </p>
      <p className="text-base font-black leading-none sm:mt-2 sm:text-3xl md:mt-1 md:text-xl lg:text-2xl">
        {departure}
      </p>
    </article>
  );
}

function ScheduleSourceInfo({
  boardingNote,
  disclaimer,
  labels,
  lastUpdated,
  mode = "inline",
  source,
}: {
  boardingNote?: string;
  disclaimer?: string;
  labels: Translations["schedule"];
  lastUpdated?: string;
  mode?: "inline" | "popover";
  source: ScheduleSource;
}) {
  const verificationNotice =
    source.verificationStatus === "needs official confirmation"
      ? labels.needsOfficialConfirmationNotice
      : source.verificationStatus === "partially verified"
        ? labels.partiallyVerifiedNotice
        : null;

  const content = (
    <>
      {lastUpdated || disclaimer ? (
        <div className="mb-3 rounded-xl border border-[#eadcc7] bg-white px-3 py-2">
          {lastUpdated ? (
            <p className="font-black text-[#13233a]">
              {labels.updated} {lastUpdated}
            </p>
          ) : null}
          {disclaimer ? <p className="mt-1 font-semibold">{disclaimer}</p> : null}
        </div>
      ) : null}
      <p className="font-black text-[#13233a]">{labels.dataTitle}</p>
      <dl className="mt-2 grid gap-1.5">
        <InfoRow label={labels.source}>
          {source.sourceName === "Pattaya Bus / Roong Reuang Coach" ? (
            source.sourceName
          ) : source.sourceUrl && source.sourceUrl !== "#" ? (
            <a
              href={source.sourceUrl}
              className="underline underline-offset-4"
              rel="noreferrer"
              target="_blank"
            >
              {source.sourceName}
            </a>
          ) : (
            source.sourceName
          )}
        </InfoRow>
        <InfoRow label={labels.lastVerified}>{source.lastVerified}</InfoRow>
      </dl>
      {verificationNotice ? (
        <p className="mt-2 rounded-xl bg-[#f9e8a8] px-3 py-2 font-bold text-[#13233a]">
          {verificationNotice}
        </p>
      ) : null}
      <details className="group mt-2">
        <summary className="flex min-h-11 w-full cursor-pointer list-none items-center justify-center rounded-xl border border-[#eadcc7] bg-white px-3 text-sm font-black text-[#13233a] sm:inline-flex sm:w-auto">
          <span className="group-open:hidden">{labels.showDetails}</span>
          <span className="hidden group-open:inline">{labels.hideDetails}</span>
        </summary>
        <dl className="mt-3 grid gap-1.5">
          <InfoRow label={labels.sourceType}>{source.sourceType}</InfoRow>
          <InfoRow label={labels.verification}>
            {formatVerificationStatus(source.verificationStatus, labels)}
          </InfoRow>
          <InfoRow label={labels.fareNote}>{source.fareNote}</InfoRow>
          {boardingNote ? (
            <InfoRow label={labels.boardingNote}>{boardingNote}</InfoRow>
          ) : null}
          <InfoRow label={labels.dataQuality}>{source.dataQuality}</InfoRow>
          <InfoRow label={labels.note}>{source.operatorNote}</InfoRow>
        </dl>
      </details>
    </>
  );

  if (mode === "popover") {
    return (
      <div className="group relative mt-3 flex justify-end">
        <button
          type="button"
          aria-label={labels.dataTitle}
          className="flex min-h-11 min-w-11 items-center justify-center overflow-hidden rounded-xl border border-[#eadcc7] bg-[#fffaf2] shadow-sm ring-1 ring-[#13233a]/5 transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b05a]"
        >
          <Image
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
            height={36}
            src="/images/icons/icon-last-updated-info.png"
            width={36}
          />
        </button>
        <div className="absolute right-0 top-12 z-20 hidden w-80 rounded-xl border border-[#eadcc7] bg-[#fffaf2] p-3.5 text-left text-sm leading-6 text-[#4f5d6c] shadow-xl sm:p-4 md:p-3 md:text-xs md:leading-5 group-hover:block group-focus-within:block">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3 rounded-xl border border-[#eadcc7] bg-[#fffaf2] p-3.5 text-sm leading-6 text-[#4f5d6c] sm:p-4 md:p-3 md:text-xs md:leading-5">
      {content}
    </div>
  );
}

function formatVerificationStatus(
  status: ScheduleSource["verificationStatus"],
  labels: Translations["schedule"],
) {
  const translations: Record<string, Record<ScheduleSource["verificationStatus"], string>> = {
    "Typ źródła:": {
      "needs official confirmation": "Wymaga oficjalnego potwierdzenia",
      "partially verified": "Częściowo sprawdzone",
    },
    "Type de source :": {
      "needs official confirmation": "Confirmation officielle nécessaire",
      "partially verified": "Partiellement vérifié",
    },
    Quellentyp: {
      "needs official confirmation": "Offizielle Bestätigung nötig",
      "partially verified": "Teilweise geprüft",
    },
    "Тип источника": {
      "needs official confirmation": "Требуется официальное подтверждение",
      "partially verified": "Частично проверено",
    },
    "ประเภทแหล่งข้อมูล": {
      "needs official confirmation": "ต้องยืนยันกับแหล่งข้อมูลทางการ",
      "partially verified": "ตรวจสอบบางส่วนแล้ว",
    },
    来源类型: {
      "needs official confirmation": "需要官方确认",
      "partially verified": "部分已验证",
    },
  };

  return (
    translations[labels.sourceType]?.[status] ??
    status.charAt(0).toUpperCase() + status.slice(1)
  );
}

function InfoRow({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
      <dt className="font-bold text-[#13233a]">{label}</dt>
      <dd className="font-semibold">{children}</dd>
    </div>
  );
}
