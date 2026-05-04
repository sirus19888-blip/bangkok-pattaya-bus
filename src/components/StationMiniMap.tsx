import type { LocaleCode } from "@/data/routes";
import type { Station } from "@/data/stations";

type StationMiniMapProps = {
  station: Station;
  locale: LocaleCode;
  openInGoogleMapsLabel: string;
};

const mapLabels = {
  en: {
    title: "Station map",
    fallbackNote: "Use this map to recognize the area around the station.",
  },
  pl: {
    title: "Mapa stacji",
    fallbackNote: "Ta mapa pomoże rozpoznać okolice stacji.",
  },
} as const;

function getOpenStreetMapEmbedUrl(station: Station) {
  const delta = 0.004;
  const minLongitude = station.longitude - delta;
  const minLatitude = station.latitude - delta;
  const maxLongitude = station.longitude + delta;
  const maxLatitude = station.latitude + delta;
  const bbox = `${minLongitude},${minLatitude},${maxLongitude},${maxLatitude}`;

  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
    bbox,
  )}&layer=mapnik&marker=${station.latitude},${station.longitude}`;
}

export function StationMiniMap({
  station,
  locale,
  openInGoogleMapsLabel,
}: StationMiniMapProps) {
  const labels = locale === "pl" ? mapLabels.pl : mapLabels.en;
  const walkingNote =
    locale === "pl" ? station.walkingNote.pl : station.walkingNote.en;

  return (
    <div className="overflow-hidden rounded-2xl border border-[#d6e8f4] bg-[#f4fbff]">
      <div className="border-b border-[#d6e8f4] px-3 py-2.5">
        <p className="text-xs font-black uppercase tracking-wide text-[#2f6f93]">
          {labels.title}
        </p>
        <p className="mt-1 text-sm font-black leading-5 text-[#13233a]">
          {station.mapLabel}
        </p>
        <p className="mt-1 text-xs font-semibold leading-5 text-[#4f5d6c]">
          {walkingNote || labels.fallbackNote}
        </p>
      </div>
      <iframe
        src={getOpenStreetMapEmbedUrl(station)}
        title={`${labels.title}: ${station.mapLabel}`}
        className="h-[180px] w-full border-0 sm:h-[220px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="border-t border-[#d6e8f4] bg-white p-2.5">
        <a
          href={station.googleMapsUrl}
          className="flex min-h-11 w-full items-center justify-center rounded-xl bg-[#13233a] px-4 text-center text-sm font-black text-white transition hover:bg-[#233a5b]"
          target="_blank"
          rel="noopener noreferrer"
        >
          {openInGoogleMapsLabel}
        </a>
      </div>
    </div>
  );
}
