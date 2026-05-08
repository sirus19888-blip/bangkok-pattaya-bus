"use client";

import { useEffect, useState } from "react";
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
  ru: {
    title: "Карта станции",
    fallbackNote: "Эта карта поможет узнать район вокруг станции.",
  },
  de: {
    title: "Stationskarte",
    fallbackNote: "Diese Karte hilft dir, die Umgebung der Station zu erkennen.",
  },
  th: {
    title: "แผนที่สถานี",
    fallbackNote: "แผนที่นี้ช่วยให้จำบริเวณรอบสถานีได้ง่ายขึ้น",
  },
  zh: {
    title: "车站地图",
    fallbackNote: "这张地图可帮助你识别车站周边区域。",
  },
  fr: {
    title: "Carte de la station",
    fallbackNote: "Cette carte vous aide à reconnaître les environs de la station.",
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
    locale === "pl"
      ? mapLabels.pl
      : locale === "ru"
        ? mapLabels.ru
        : locale === "de"
          ? mapLabels.de
        : locale === "th"
          ? mapLabels.th
        : locale === "zh"
          ? mapLabels.zh
        : locale === "fr"
          ? mapLabels.fr
          : mapLabels.en;
  const walkingNote =
    locale === "pl"
      ? station.walkingNote.pl
      : locale === "ru"
        ? getRussianWalkingNote(station.id)
        : locale === "de"
          ? getGermanWalkingNote(station.id)
        : locale === "th"
          ? getThaiWalkingNote(station.id)
        : locale === "zh"
          ? getChineseWalkingNote(station.id)
        : locale === "fr"
          ? getFrenchWalkingNote(station.id)
          : station.walkingNote.en;
  const mapLabel =
    locale === "ru"
      ? getRussianStationMapLabel(station.id, station.mapLabel)
      : locale === "de"
        ? getGermanStationMapLabel(station.id, station.mapLabel)
      : locale === "th"
        ? getThaiStationMapLabel(station.id, station.mapLabel)
      : locale === "zh"
        ? getChineseStationMapLabel(station.id, station.mapLabel)
      : locale === "fr"
        ? getFrenchStationMapLabel(station.id, station.mapLabel)
        : station.mapLabel;
  const [isMapOpen, setIsMapOpen] = useState(false);
  const openMapLabel = getOpenMapLabel(locale);
  const closeMapLabel = getCloseMapLabel(locale);
  const mapUrl = getOpenStreetMapEmbedUrl(station);

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
      <button
        type="button"
        className="relative block h-[180px] w-full overflow-hidden bg-white text-left focus:outline-none focus:ring-2 focus:ring-[#13233a] focus:ring-offset-2 sm:h-[220px] lg:h-[210px] xl:h-[220px]"
        onClick={() => setIsMapOpen(true)}
        aria-label={`${openMapLabel}: ${mapLabel}`}
      >
        <iframe
          src={mapUrl}
          title={`${labels.title}: ${mapLabel}`}
          className="pointer-events-none h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <span className="absolute bottom-2 right-2 rounded-full bg-[#13233a] px-3 py-1 text-xs font-black text-white shadow-sm">
          {openMapLabel}
        </span>
      </button>
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
      {isMapOpen ? (
        <StationMapLightbox
          closeMapLabel={closeMapLabel}
          mapLabel={mapLabel}
          mapTitle={labels.title}
          mapUrl={mapUrl}
          walkingNote={walkingNote || labels.fallbackNote}
          onClose={() => setIsMapOpen(false)}
        />
      ) : null}
    </div>
  );
}

function StationMapLightbox({
  closeMapLabel,
  mapLabel,
  mapTitle,
  mapUrl,
  onClose,
  walkingNote,
}: {
  closeMapLabel: string;
  mapLabel: string;
  mapTitle: string;
  mapUrl: string;
  onClose: () => void;
  walkingNote: string;
}) {
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#13233a]/80 p-3 sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-label={`${mapTitle}: ${mapLabel}`}
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-[94vw] flex-col overflow-hidden rounded-2xl bg-white shadow-xl md:max-w-4xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-[#d6e8f4] p-3 pr-14">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#2f6f93]">
              {mapTitle}
            </p>
            <p className="mt-1 text-sm font-black leading-5 text-[#13233a] md:text-base">
              {mapLabel}
            </p>
            <p className="mt-1 text-xs font-semibold leading-5 text-[#4f5d6c]">
              {walkingNote}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={closeMapLabel}
          className="absolute right-2 top-2 z-10 flex min-h-11 min-w-11 items-center justify-center rounded-full bg-[#13233a] text-2xl font-black leading-none text-white shadow-sm transition hover:bg-[#233a5b]"
        >
          ×
        </button>
        <iframe
          src={mapUrl}
          title={`${mapTitle}: ${mapLabel}`}
          className="h-[70vh] max-h-[75vh] w-full border-0 md:h-[72vh] md:max-h-[80vh]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}

function getOpenMapLabel(locale: LocaleCode) {
  const labels: Record<LocaleCode, string> = {
    de: "Stationskarte vergrößern",
    en: "Enlarge station map",
    fr: "Agrandir la carte de la station",
    pl: "Powiększ mapę stacji",
    ru: "Увеличить карту станции",
    th: "ขยายแผนที่สถานี",
    zh: "放大车站地图",
  };

  return labels[locale] ?? labels.en;
}

function getCloseMapLabel(locale: LocaleCode) {
  const labels: Record<LocaleCode, string> = {
    de: "Karte schließen",
    en: "Close map",
    fr: "Fermer la carte",
    pl: "Zamknij mapę",
    ru: "Закрыть карту",
    th: "ปิดแผนที่",
    zh: "关闭地图",
  };

  return labels[locale] ?? labels.en;
}

function getRussianWalkingNote(stationId: string) {
  const notes: Record<string, string> = {
    ekkamai: "Используйте карту, чтобы узнать район вокруг автовокзала Эккамай.",
    "mo-chit": "После прибытия проверьте указатели на месте.",
    "north-pattaya": "Используйте карту, чтобы узнать район вокруг автовокзала Северной Паттайи.",
    "suvarnabhumi-airport": "После прилёта проверьте указатели в аэропорту.",
    "jomtien-bus-area": "Подтвердите точное место посадки у оператора перед поездкой.",
    "don-mueang-airport": "Используйте карту, чтобы узнать район аэропорта, и подтвердите место посадки после прибытия.",
    "pattaya-sukhumvit": "Подтвердите точное место посадки в Паттайе перед поездкой.",
  };

  return notes[stationId] ?? mapLabels.ru.fallbackNote;
}

function getGermanWalkingNote(stationId: string) {
  const notes: Record<string, string> = {
    ekkamai: "Nutze diese Karte, um die Umgebung des Busbahnhofs Ekkamai zu erkennen.",
    "mo-chit": "Prüfe nach der Ankunft die Schilder vor Ort.",
    "north-pattaya": "Nutze diese Karte, um die Umgebung des Busbahnhofs Nord-Pattaya zu erkennen.",
    "suvarnabhumi-airport": "Prüfe nach der Ankunft die Schilder im Flughafen.",
    "jomtien-bus-area": "Bestätige den genauen Einstieg beim Betreiber vor der Reise.",
    "don-mueang-airport": "Nutze diese Karte zur Orientierung am Flughafen und bestätige den Einstieg vor Ort.",
    "pattaya-sukhumvit": "Bestätige den genauen Einstieg in Pattaya vor der Reise.",
  };

  return notes[stationId] ?? mapLabels.de.fallbackNote;
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

function getChineseWalkingNote(stationId: string) {
  const notes: Record<string, string> = {
    ekkamai: "使用这张地图识别 Ekkamai 巴士总站周边区域。",
    "mo-chit": "到达后请查看现场指示牌。",
    "north-pattaya": "使用这张地图识别 North Pattaya Bus Terminal 周边区域。",
    "suvarnabhumi-airport": "到达机场后请查看现场指示牌。",
    "jomtien-bus-area": "出行前请向运营商确认准确上车点。",
    "don-mueang-airport": "使用这张地图识别机场周边区域，并在到达后确认上车点。",
    "pattaya-sukhumvit": "出行前请确认芭提雅的准确上车点。",
  };

  return notes[stationId] ?? mapLabels.zh.fallbackNote;
}

function getFrenchWalkingNote(stationId: string) {
  const notes: Record<string, string> = {
    ekkamai: "Utilisez cette carte pour reconnaître les environs de la gare routière Ekkamai.",
    "mo-chit": "À l'arrivée, vérifiez les panneaux sur place.",
    "north-pattaya": "Utilisez cette carte pour reconnaître les environs du terminal de bus North Pattaya.",
    "suvarnabhumi-airport": "À l'arrivée à l'aéroport, vérifiez les panneaux sur place.",
    "jomtien-bus-area": "Confirmez le point d'embarquement exact auprès de l'opérateur avant le départ.",
    "don-mueang-airport": "Utilisez cette carte pour vous repérer à l'aéroport et confirmez le point d'embarquement sur place.",
    "pattaya-sukhumvit": "Confirmez le point d'embarquement exact à Pattaya avant le départ.",
  };

  return notes[stationId] ?? mapLabels.fr.fallbackNote;
}

function getRussianStationMapLabel(stationId: string, fallback: string) {
  const labels: Record<string, string> = {
    ekkamai: "автовокзал Эккамай",
    "mo-chit": "автовокзал Мо Чит 2",
    "north-pattaya": "автовокзал Северной Паттайи",
    "suvarnabhumi-airport": "автобусная зона аэропорта Суварнабхуми",
    "jomtien-bus-area": "автобусная зона Паттайя / Джомтьен",
    "don-mueang-airport": "аэропорт Дон Муанг",
    "pattaya-sukhumvit": "автостанция на дороге Сукхумвит в Паттайе",
  };

  return labels[stationId] ?? fallback;
}

function getGermanStationMapLabel(stationId: string, fallback: string) {
  const labels: Record<string, string> = {
    ekkamai: "Busbahnhof Ekkamai",
    "mo-chit": "Busbahnhof Mo Chit 2",
    "north-pattaya": "Busbahnhof Nord-Pattaya",
    "suvarnabhumi-airport": "Busbereich am Flughafen Suvarnabhumi",
    "jomtien-bus-area": "Busbereich Pattaya / Jomtien",
    "don-mueang-airport": "Flughafen Don Mueang",
    "pattaya-sukhumvit": "Busbahnhof an der Sukhumvit Road in Pattaya",
  };

  return labels[stationId] ?? fallback;
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

function getChineseStationMapLabel(stationId: string, fallback: string) {
  const labels: Record<string, string> = {
    ekkamai: "Ekkamai 巴士总站",
    "mo-chit": "Mo Chit 2 巴士总站",
    "north-pattaya": "North Pattaya Bus Terminal",
    "suvarnabhumi-airport": "素万那普机场巴士区域",
    "jomtien-bus-area": "芭提雅 / 中天机场巴士区域",
    "don-mueang-airport": "廊曼机场",
    "pattaya-sukhumvit": "芭提雅 Sukhumvit Road 巴士站",
  };

  return labels[stationId] ?? fallback;
}

function getFrenchStationMapLabel(stationId: string, fallback: string) {
  const labels: Record<string, string> = {
    ekkamai: "Gare routière Ekkamai",
    "mo-chit": "Gare routière Mo Chit 2",
    "north-pattaya": "Terminal de bus North Pattaya",
    "suvarnabhumi-airport": "Zone de bus de l'aéroport Suvarnabhumi",
    "jomtien-bus-area": "Zone de bus Pattaya / Jomtien",
    "don-mueang-airport": "Aéroport Don Mueang",
    "pattaya-sukhumvit": "Gare routière de Pattaya Sukhumvit Road",
  };

  return labels[stationId] ?? fallback;
}
