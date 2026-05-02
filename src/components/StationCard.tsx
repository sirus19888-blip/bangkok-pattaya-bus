import type { Station } from "@/data/stations";
import type { Translations } from "@/lib/i18n";

type StationCardProps = {
  stations: Station[];
  labels: Translations["station"] & {
    openInGoogleMaps: string;
  };
};

export function StationCard({ stations, labels }: StationCardProps) {
  return (
    <section className="rounded-lg border border-[#eadcc7] bg-[#fffaf2] p-4 shadow-sm sm:p-5">
      <p className="text-sm font-bold uppercase tracking-wide text-[#2f6f93]">
        {labels.title}
      </p>
      <div className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-2">
        {stations.map((station) => (
          <article key={station.id} className="rounded-lg border border-[#eadcc7] bg-white p-3.5 sm:p-4">
            <h2 className="text-lg font-black text-[#13233a] sm:text-xl">{station.name}</h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-[#4f5d6c] sm:mt-4">
              <span className="font-black text-[#13233a]">{labels.bestFor}</span>{" "}
              {station.bestFor}
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-[#4f5d6c]">
              <span className="font-black text-[#13233a]">{labels.tip}</span>{" "}
              {station.tip}
            </p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                station.name,
              )}`}
              className="mt-4 flex h-12 items-center justify-center rounded-lg border border-[#7fb7d8] bg-white px-4 text-sm font-black text-[#13233a] transition hover:bg-[#f4fbff] sm:mt-5"
              target="_blank"
              rel="noreferrer"
            >
              {labels.openInGoogleMaps}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
