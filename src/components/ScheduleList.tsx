import type { Route } from "@/data/routes";
import type { Schedule } from "@/data/schedules";
import type { Translations } from "@/lib/i18n";

type ScheduleListProps = {
  route: Route;
  schedule: Schedule;
  nextDeparture: string;
  labels: Translations["schedule"];
};

export function ScheduleList({
  route,
  schedule,
  nextDeparture,
  labels,
}: ScheduleListProps) {
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
    </section>
  );
}
