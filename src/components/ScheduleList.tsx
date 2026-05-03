import type { Route } from "@/data/routes";
import type { Schedule } from "@/data/schedules";
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
  const verificationNotice =
    schedule.verificationStatus === "needs official confirmation"
      ? labels.needsOfficialConfirmationNotice
      : schedule.verificationStatus === "partially verified"
        ? labels.partiallyVerifiedNotice
        : null;

  return (
    <section id="schedule" className="rounded-lg border border-[#eadcc7] bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-[#2f6f93]">
            {labels.title}
          </p>
          <h2 className="mt-1 text-xl font-black text-[#13233a] sm:text-2xl">{route.label}</h2>
        </div>
        <p className="text-right text-xs font-bold text-[#5f6874] sm:text-sm">
          {labels.updated} {schedule.lastUpdated}
        </p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-2 xl:grid-cols-3">
        {schedule.departures.map((departure) => {
          const isNext = departure === nextDeparture;

          return (
            <article
              key={departure}
              className={`rounded-lg border p-3.5 shadow-sm sm:p-4 ${
                isNext
                  ? "border-[#13233a] bg-[#13233a] text-white"
                  : "border-[#eadcc7] bg-[#fffaf2] text-[#13233a]"
              }`}
            >
              <p
                className={`text-sm font-bold ${
                  isNext ? "text-[#f3d77b]" : "text-[#5f6874]"
                }`}
              >
                {isNext ? labels.nextBus : labels.departure}
              </p>
              <p className="mt-1.5 text-2xl font-black leading-none sm:mt-2 sm:text-3xl">{departure}</p>
            </article>
          );
        })}
      </div>
      <p className="mt-4 rounded-lg bg-[#fffaf2] p-3.5 text-sm font-semibold leading-6 text-[#4f5d6c] sm:mt-5 sm:p-4">
        {schedule.disclaimer}
      </p>
      {showSourceInfo ? (
        <div className="mt-3 rounded-lg border border-[#eadcc7] bg-[#fffaf2] p-3.5 text-sm leading-6 text-[#4f5d6c] sm:p-4">
          <p className="font-black text-[#13233a]">{labels.dataTitle}</p>
          {verificationNotice ? (
            <p className="mt-2 rounded-lg bg-[#f9e8a8] px-3 py-2 font-bold text-[#13233a]">
              {verificationNotice}
            </p>
          ) : null}
          <dl className="mt-3 grid gap-1.5">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
              <dt className="font-bold text-[#13233a]">{labels.source}</dt>
              <dd className="font-semibold">
                {schedule.sourceUrl && schedule.sourceUrl !== "#" ? (
                  <a
                    href={schedule.sourceUrl}
                    className="underline underline-offset-4"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {schedule.sourceName}
                  </a>
                ) : (
                  schedule.sourceName
                )}
              </dd>
            </div>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
              <dt className="font-bold text-[#13233a]">{labels.sourceType}</dt>
              <dd className="font-semibold">{schedule.sourceType}</dd>
            </div>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
              <dt className="font-bold text-[#13233a]">
                {labels.lastVerified}
              </dt>
              <dd className="font-semibold">{schedule.lastVerified}</dd>
            </div>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
              <dt className="font-bold text-[#13233a]">
                {labels.verification}
              </dt>
              <dd className="font-semibold">{schedule.verificationStatus}</dd>
            </div>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
              <dt className="font-bold text-[#13233a]">{labels.fareNote}</dt>
              <dd className="font-semibold">{schedule.fareNote}</dd>
            </div>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
              <dt className="font-bold text-[#13233a]">{labels.dataQuality}</dt>
              <dd className="font-semibold">{schedule.dataQuality}</dd>
            </div>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
              <dt className="font-bold text-[#13233a]">{labels.note}</dt>
              <dd className="font-semibold">{schedule.operatorNote}</dd>
            </div>
          </dl>
        </div>
      ) : null}
    </section>
  );
}
