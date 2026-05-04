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
  th: {
    title: "แผนที่สถานี",
    fallbackNote: "แผนที่นี้ช่วยให้จำบริเวณรอบสถานีได้ง่ายขึ้น",
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
  const labels =
    locale === "pl" ? mapLabels.pl : locale === "th" ? mapLabels.th : mapLabels.en;
  const walkingNote =
    locale === "pl"
      ? station.walkingNote.pl
      : locale === "th"
        ? getThaiWalkingNote(station.id)
        : station.walkingNote.en;
  const mapLabel =
    locale === "th" ? getThaiStationMapLabel(station.id, station.mapLabel) : station.mapLabel;

  return (
    <div className="overflow-hidden rounded-2xl border border-[#d6e8f4] bg-[#f4fbff]">
      <div className="border-b border-[#d6e8f4] px-3 py-2.5 lg:py-2">
        <p className="text-xs font-black uppercase tracking-wide text-[#2f6f93]">
          {labels.title}
        </p>
        <p className="mt-1 text-sm font-black leading-5 text-[#13233a] lg:text-xs lg:leading-4">
          {mapLabel}
        </p>
        <p className="mt-1 text-xs font-semibold leading-5 text-[#4f5d6c] lg:leading-4">
          {walkingNote || labels.fallbackNote}
        </p>
      </div>
      <iframe
        src={getOpenStreetMapEmbedUrl(station)}
        title={`${labels.title}: ${mapLabel}`}
        className="h-[180px] w-full border-0 sm:h-[220px] lg:h-[210px] xl:h-[220px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="border-t border-[#d6e8f4] bg-white p-2.5 lg:p-2">
        <a
          href={station.googleMapsUrl}
          className="flex min-h-11 w-full items-center justify-center rounded-xl bg-[#13233a] px-4 text-center text-sm font-black text-white transition hover:bg-[#233a5b] lg:min-h-10 lg:text-xs"
          target="_blank"
          rel="noopener noreferrer"
        >
          {openInGoogleMapsLabel}
        </a>
      </div>
    </div>
  );
}

function getThaiWalkingNote(stationId: string) {
  const notes: Record<string, string> = {
    ekkamai: "ใช้แผนที่นี้เพื่อจำบริเวณรอบสถานีขนส่งเอกมัย",
    "mo-chit": "เมื่อถึงสถานี โปรดตรวจสอบป้ายบอกทางในพื้นที่",
    "north-pattaya": "ใช้แผนที่นี้เพื่อจำบริเวณรอบสถานีขนส่งพัทยาเหนือ",
    "suvarnabhumi-airport": "เมื่อถึงสนามบิน โปรดตรวจสอบป้ายบอกทางในพื้นที่",
    "jomtien-bus-area": "โปรดยืนยันจุดขึ้นรถที่แน่นอนกับผู้ให้บริการก่อนเดินทาง",
    "don-mueang-airport":
      "ใช้แผนที่นี้เพื่อจำบริเวณสนามบิน และยืนยันจุดขึ้นรถเมื่อมาถึง",
    "pattaya-sukhumvit": "โปรดยืนยันจุดขึ้นรถที่แน่นอนในพัทยาก่อนเดินทาง",
  };

  return notes[stationId] ?? mapLabels.th.fallbackNote;
}

function getThaiStationMapLabel(stationId: string, fallback: string) {
  const labels: Record<string, string> = {
    ekkamai: "สถานีขนส่งเอกมัย",
    "mo-chit": "สถานีขนส่งหมอชิต 2",
    "north-pattaya": "สถานีขนส่งพัทยาเหนือ",
    "suvarnabhumi-airport": "จุดรถบัสท่าอากาศยานสุวรรณภูมิ",
    "jomtien-bus-area": "จุดรถบัสสนามบินพัทยา / จอมเทียน",
    "don-mueang-airport": "ท่าอากาศยานดอนเมือง",
    "pattaya-sukhumvit": "สถานีรถบัสถนนสุขุมวิทพัทยา",
  };

  return labels[stationId] ?? fallback;
}
