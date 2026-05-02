import type { Translations } from "@/lib/i18n";

type RouteSearchProps = {
  from?: string;
  to?: string;
  labels: Translations["routeSelector"];
};

export function RouteSearch({
  from = "Bangkok",
  to = "Pattaya",
  labels,
}: RouteSearchProps) {
  return (
    <div className="mt-4 rounded-lg border border-[#eadcc7] bg-white p-4 shadow-sm sm:mt-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-[#344153]">
            {labels.from}
          </span>
          <select className="h-[52px] w-full rounded-lg border border-[#d8c8b4] bg-[#fffaf2] px-4 text-base font-semibold text-[#13233a] outline-none focus:border-[#2f6f93]">
            <option>{from}</option>
            <option>Pattaya</option>
            <option>Bangkok</option>
            <option>Suvarnabhumi Airport</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-[#344153]">
            {labels.to}
          </span>
          <select className="h-[52px] w-full rounded-lg border border-[#d8c8b4] bg-[#fffaf2] px-4 text-base font-semibold text-[#13233a] outline-none focus:border-[#2f6f93]">
            <option>{to}</option>
            <option>Bangkok</option>
            <option>Pattaya</option>
          </select>
        </label>
      </div>
    </div>
  );
}
