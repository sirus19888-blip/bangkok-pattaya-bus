import type { Schedule } from "@/data/schedules";
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
  return (
    <aside className="rounded-lg border border-[#c8dbe9] bg-[#eaf5fb] p-4 shadow-sm sm:p-7">
      <div className="rounded-lg bg-white p-4 shadow-sm sm:p-5">
        <p className="text-sm font-bold text-[#5f6874]">{labels.title}</p>
        <p className="mt-1 text-5xl font-black leading-none text-[#13233a] sm:mt-2 sm:text-6xl">
          {nextDeparture}
        </p>

        <div className="mt-4 grid gap-3 sm:mt-6">
          <MiniFact label={labels.travelTime} value={schedule.travelTime} />
          <MiniFact label={labels.ticketPrice} value={schedule.price} />
        </div>

        <a
          href="#schedule"
          className="mt-5 flex h-14 items-center justify-center rounded-lg bg-[#13233a] px-5 text-base font-black text-white shadow-sm transition hover:bg-[#1d3455] sm:mt-6"
        >
          {labels.showAllDepartures}
        </a>
      </div>
    </aside>
  );
}

function MiniFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[#c8dbe9] bg-white p-3.5 sm:p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-[#5f6874]">
        {label}
      </p>
      <p className="mt-1 text-base font-black text-[#13233a] sm:text-lg">{value}</p>
    </div>
  );
}
