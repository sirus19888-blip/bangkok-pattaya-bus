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
  const isThai = labels.from === "จาก:";
  const fromOptions = isThai
    ? [from, "พัทยา", "กรุงเทพฯ", "ท่าอากาศยานสุวรรณภูมิ", "ท่าอากาศยานดอนเมือง"]
    : [from, "Pattaya", "Bangkok", "Suvarnabhumi Airport", "Don Mueang Airport"];
  const toOptions = isThai
    ? [to, "กรุงเทพฯ", "พัทยา", "ท่าอากาศยานสุวรรณภูมิ", "ท่าอากาศยานดอนเมือง"]
    : [to, "Bangkok", "Pattaya", "Suvarnabhumi Airport", "Don Mueang Airport"];

  return (
    <div className="mt-5 rounded-2xl border border-[#eadcc7] bg-white p-3.5 shadow-sm sm:mt-6 sm:p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-[#344153]">
            {labels.from}
          </span>
          <select className="h-13 min-h-13 w-full rounded-xl border border-[#d8c8b4] bg-[#fffaf2] px-4 text-base font-black text-[#13233a] outline-none focus:border-[#2f6f93]">
            {[...new Set(fromOptions)].map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-[#344153]">
            {labels.to}
          </span>
          <select className="h-13 min-h-13 w-full rounded-xl border border-[#d8c8b4] bg-[#fffaf2] px-4 text-base font-black text-[#13233a] outline-none focus:border-[#2f6f93]">
            {[...new Set(toOptions)].map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
