import { StationMiniMap } from "@/components/StationMiniMap";
import type { LocaleCode } from "@/data/routes";
import type { Station } from "@/data/stations";
import type { Translations } from "@/lib/i18n";

type StationCardProps = {
  stations: Station[];
  locale: LocaleCode;
  labels: Translations["station"] & {
    openInGoogleMaps: string;
  };
};

export function StationCard({ stations, locale, labels }: StationCardProps) {
  return (
    <section className="rounded-2xl border border-[#eadcc7] bg-[#fffaf2] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-[#2f6f93] sm:text-sm">
        {labels.title}
      </p>
      <div className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {stations.map((station) => (
          <article key={station.id} className="rounded-xl border border-[#eadcc7] bg-white p-4">
            <h2 className="text-lg font-black leading-tight text-[#13233a] sm:text-xl">{station.name}</h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-[#4f5d6c]">
              <span className="font-black text-[#13233a]">{labels.bestFor}</span>{" "}
              {station.bestFor}
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-[#4f5d6c]">
              <span className="font-black text-[#13233a]">{labels.tip}</span>{" "}
              {station.tip}
            </p>
            <StationMiniMap
              station={station}
              locale={locale}
              openInGoogleMapsLabel={labels.openInGoogleMaps}
            />
          </article>
        ))}
      </div>
    </section>
  );
}
