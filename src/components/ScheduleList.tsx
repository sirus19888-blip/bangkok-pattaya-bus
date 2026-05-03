"use client";

import type { ReactNode } from "react";
import type { Route } from "@/data/routes";
import type { Schedule, ScheduleSource } from "@/data/schedules";
import { useNextDeparture } from "@/hooks/useNextDeparture";
import type { Translations } from "@/lib/i18n";

type ScheduleListProps = {
  route: Route;
  schedule: Schedule;
  nextDeparture: string;
  labels: Translations["schedule"];
  showSourceInfo?: boolean;
};

export function ScheduleList({
  route,
  schedule,
  nextDeparture,
  labels,
  showSourceInfo = false,
}: ScheduleListProps) {
  const hasSubRoutes = Boolean(schedule.subRoutes?.length);
  const calculatedNextDeparture = useNextDeparture(schedule, nextDeparture);

  return (
    <section id="schedule" className="rounded-lg border border-[#eadcc7] bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-[#2f6f93]">
            {labels.title}
          </p>
          <h2 className="mt-1 text-xl font-black text-[#13233a] sm:text-2xl">{route.label}</h2>
          <p className="mt-1 text-xs font-bold text-[#5f6874]">
            {labels.timeZoneNote}
          </p>
        </div>
        <p className="text-right text-xs font-bold text-[#5f6874] sm:text-sm">
          {labels.updated} {schedule.lastUpdated}
        </p>
      </div>
      {hasSubRoutes ? (
        <div className="mt-4 grid gap-4 sm:mt-5">
          {schedule.subRoutes?.map((subRoute) => (
            <div
              key={subRoute.id}
              className="rounded-lg border border-[#eadcc7] bg-[#fffaf2] p-3.5 sm:p-4"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-[#5f6874]">
                {labels.subRoute}
              </p>
              <h3 className="mt-1 text-lg font-black text-[#13233a]">
                {subRoute.label}
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-2 xl:grid-cols-3">
                {subRoute.departures.map((departure) => (
                  <DepartureTile
                    key={`${subRoute.id}-${departure}`}
                    departure={departure}
                    isNext={departure === calculatedNextDeparture.time}
                    labels={labels}
                  />
                ))}
              </div>
              {showSourceInfo ? (
                <ScheduleSourceInfo
                  boardingNote={subRoute.boardingNote}
                  labels={labels}
                  source={subRoute}
                />
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-2 xl:grid-cols-3">
          {schedule.departures.map((departure) => (
            <DepartureTile
              key={departure}
              departure={departure}
              isNext={departure === calculatedNextDeparture.time}
              labels={labels}
            />
          ))}
        </div>
      )}
      <p className="mt-4 rounded-lg bg-[#fffaf2] p-3.5 text-sm font-semibold leading-6 text-[#4f5d6c] sm:mt-5 sm:p-4">
        {schedule.disclaimer}
      </p>
      {showSourceInfo && !hasSubRoutes ? (
        <ScheduleSourceInfo
          boardingNote={schedule.boardingNote}
          labels={labels}
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
      className={`rounded-lg border p-3.5 shadow-sm sm:p-4 ${
        isNext
          ? "border-[#13233a] bg-[#13233a] text-white"
          : "border-[#eadcc7] bg-white text-[#13233a]"
      }`}
    >
      <p
        className={`text-sm font-bold ${
          isNext ? "text-[#f3d77b]" : "text-[#5f6874]"
        }`}
      >
        {isNext ? labels.nextBus : labels.departure}
      </p>
      <p className="mt-1.5 text-2xl font-black leading-none sm:mt-2 sm:text-3xl">
        {departure}
      </p>
    </article>
  );
}

function ScheduleSourceInfo({
  boardingNote,
  labels,
  source,
}: {
  boardingNote?: string;
  labels: Translations["schedule"];
  source: ScheduleSource;
}) {
  const verificationNotice =
    source.verificationStatus === "needs official confirmation"
      ? labels.needsOfficialConfirmationNotice
      : source.verificationStatus === "partially verified"
        ? labels.partiallyVerifiedNotice
        : null;

  return (
    <div className="mt-3 rounded-lg border border-[#eadcc7] bg-[#fffaf2] p-3.5 text-sm leading-6 text-[#4f5d6c] sm:p-4">
      <p className="font-black text-[#13233a]">{labels.dataTitle}</p>
      <dl className="mt-2 grid gap-1.5">
        <InfoRow label={labels.source}>
          {source.sourceUrl && source.sourceUrl !== "#" ? (
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
        <p className="mt-2 rounded-lg bg-[#f9e8a8] px-3 py-2 font-bold text-[#13233a]">
          {verificationNotice}
        </p>
      ) : null}
      <details className="mt-2">
        <summary className="inline-flex min-h-11 cursor-pointer list-none items-center rounded-lg border border-[#eadcc7] bg-white px-3 text-sm font-black text-[#13233a]">
          {labels.showDetails}
        </summary>
        <dl className="mt-3 grid gap-1.5">
          <InfoRow label={labels.sourceType}>{source.sourceType}</InfoRow>
          <InfoRow label={labels.verification}>
            {source.verificationStatus}
          </InfoRow>
          <InfoRow label={labels.fareNote}>{source.fareNote}</InfoRow>
          {boardingNote ? (
            <InfoRow label={labels.boardingNote}>{boardingNote}</InfoRow>
          ) : null}
          <InfoRow label={labels.dataQuality}>{source.dataQuality}</InfoRow>
          <InfoRow label={labels.note}>{source.operatorNote}</InfoRow>
        </dl>
      </details>
    </div>
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
