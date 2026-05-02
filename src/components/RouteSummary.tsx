import type { Route } from "@/data/routes";
import type { Schedule } from "@/data/schedules";
import type { Translations } from "@/lib/i18n";

type RouteSummaryProps = {
  route: Route;
  schedule: Schedule;
  from: string;
  to: string;
  labels: Translations["common"] &
    Translations["routeSelector"] &
    Pick<Translations["nextBus"], "travelTime">;
};

export function RouteSummary({
  route,
  schedule,
  from,
  to,
  labels,
}: RouteSummaryProps) {
  return (
    <section className="rounded-lg border border-[#eadcc7] bg-white p-4 shadow-sm sm:p-5">
      <p className="text-sm font-bold uppercase tracking-wide text-[#2f6f93]">
        {labels.routeSummary}
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <SummaryItem label={labels.from} value={from} />
        <SummaryItem label={labels.to} value={to} />
        <SummaryItem label={labels.travelTime} value={schedule.travelTime} />
        <SummaryItem label={labels.distance} value={route.distance} />
      </div>
    </section>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[#eadcc7] bg-[#fffaf2] p-3.5">
      <p className="text-xs font-bold uppercase tracking-wide text-[#5f6874]">
        {label}
      </p>
      <p className="mt-1 text-base font-black text-[#13233a]">{value}</p>
    </div>
  );
}
