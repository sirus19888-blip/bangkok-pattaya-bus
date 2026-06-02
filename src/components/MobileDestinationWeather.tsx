"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { LocaleCode, RouteId } from "@/data/routes";

type DestinationWeatherProps = {
  locale: LocaleCode;
  routeSlug: RouteId;
};

type WeatherState = {
  code: number;
  source: "live" | "fallback";
  temperature: number;
};

type Destination = {
  label: string;
  latitude: number;
  longitude: number;
};

const fallbackWeather: WeatherState = {
  code: 1,
  source: "fallback",
  temperature: 31,
};

const destinations: Record<RouteId, Destination> = {
  "bangkok-to-pattaya": {
    label: "Pattaya",
    latitude: 12.9236,
    longitude: 100.8825,
  },
  "pattaya-to-bangkok": {
    label: "Bangkok",
    latitude: 13.7563,
    longitude: 100.5018,
  },
  "suvarnabhumi-airport-to-pattaya": {
    label: "Pattaya",
    latitude: 12.9236,
    longitude: 100.8825,
  },
  "pattaya-to-suvarnabhumi-airport": {
    label: "Suvarnabhumi",
    latitude: 13.69,
    longitude: 100.7501,
  },
  "don-mueang-airport-to-pattaya": {
    label: "Pattaya",
    latitude: 12.9236,
    longitude: 100.8825,
  },
  "pattaya-to-don-mueang-airport": {
    label: "Don Mueang",
    latitude: 13.9125,
    longitude: 100.6067,
  },
};

const labels: Record<
  LocaleCode,
  {
    fallback: string;
    live: string;
    prefix: string;
  }
> = {
  de: { fallback: "Schätzung", live: "Live", prefix: "Wetter in" },
  en: { fallback: "Estimate", live: "Live", prefix: "Weather in" },
  fr: { fallback: "Estimation", live: "En direct", prefix: "Météo à" },
  pl: { fallback: "Szacunek", live: "Live", prefix: "Pogoda w" },
  ru: { fallback: "Прогноз", live: "Онлайн", prefix: "Погода в" },
  th: { fallback: "ประมาณการ", live: "สด", prefix: "อากาศที่" },
  zh: { fallback: "预估", live: "实时", prefix: "天气：" },
};

const destinationLabels: Record<RouteId, Record<LocaleCode, string>> = {
  "bangkok-to-pattaya": {
    de: "Pattaya",
    en: "Pattaya",
    fr: "Pattaya",
    pl: "Pattaya",
    ru: "Паттайе",
    th: "พัทยา",
    zh: "芭提雅",
  },
  "pattaya-to-bangkok": {
    de: "Bangkok",
    en: "Bangkok",
    fr: "Bangkok",
    pl: "Bangkoku",
    ru: "Бангкоке",
    th: "กรุงเทพฯ",
    zh: "曼谷",
  },
  "suvarnabhumi-airport-to-pattaya": {
    de: "Pattaya",
    en: "Pattaya",
    fr: "Pattaya",
    pl: "Pattaya",
    ru: "Паттайе",
    th: "พัทยา",
    zh: "芭提雅",
  },
  "pattaya-to-suvarnabhumi-airport": {
    de: "Suvarnabhumi",
    en: "Suvarnabhumi",
    fr: "Suvarnabhumi",
    pl: "Suvarnabhumi",
    ru: "Суварнабхуми",
    th: "สุวรรณภูมิ",
    zh: "素万那普",
  },
  "don-mueang-airport-to-pattaya": {
    de: "Pattaya",
    en: "Pattaya",
    fr: "Pattaya",
    pl: "Pattaya",
    ru: "Паттайе",
    th: "พัทยา",
    zh: "芭提雅",
  },
  "pattaya-to-don-mueang-airport": {
    de: "Don Mueang",
    en: "Don Mueang",
    fr: "Don Mueang",
    pl: "Don Mueang",
    ru: "Дон Муанг",
    th: "ดอนเมือง",
    zh: "廊曼",
  },
};

const conditionLabels: Record<LocaleCode, Record<string, string>> = {
  de: {
    clear: "Klar",
    clouds: "Bewölkt",
    drizzle: "Niesel",
    fog: "Nebel",
    rain: "Regen",
    storm: "Gewitter",
  },
  en: {
    clear: "Clear",
    clouds: "Clouds",
    drizzle: "Drizzle",
    fog: "Fog",
    rain: "Rain",
    storm: "Storm",
  },
  fr: {
    clear: "Clair",
    clouds: "Nuages",
    drizzle: "Bruine",
    fog: "Brouillard",
    rain: "Pluie",
    storm: "Orage",
  },
  pl: {
    clear: "Bezchmurnie",
    clouds: "Chmury",
    drizzle: "Mzawka",
    fog: "Mgla",
    rain: "Deszcz",
    storm: "Burza",
  },
  ru: {
    clear: "Ясно",
    clouds: "Облачно",
    drizzle: "Морось",
    fog: "Туман",
    rain: "Дождь",
    storm: "Гроза",
  },
  th: {
    clear: "ท้องฟ้าโปร่ง",
    clouds: "มีเมฆ",
    drizzle: "ฝนปรอย",
    fog: "หมอก",
    rain: "ฝน",
    storm: "พายุฝน",
  },
  zh: {
    clear: "晴",
    clouds: "多云",
    drizzle: "小雨",
    fog: "雾",
    rain: "雨",
    storm: "雷雨",
  },
};

export function MobileDestinationWeather({
  locale,
  routeSlug,
}: DestinationWeatherProps) {
  const destination = destinations[routeSlug];
  const destinationLabel =
    destinationLabels[routeSlug]?.[locale] ?? destination.label;
  const copy = labels[locale] ?? labels.en;
  const [isOpen, setIsOpen] = useState(false);
  const [weather, setWeather] = useState<WeatherState>(fallbackWeather);

  useEffect(() => {
    let ignore = false;

    async function loadWeather() {
      try {
        const params = new URLSearchParams({
          current: "temperature_2m,weather_code",
          latitude: String(destination.latitude),
          longitude: String(destination.longitude),
          timezone: "Asia/Bangkok",
        });
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
        );

        if (!response.ok) {
          throw new Error("Weather request failed");
        }

        const data = (await response.json()) as {
          current?: { temperature_2m?: number; weather_code?: number };
        };
        const temperature = data.current?.temperature_2m;
        const code = data.current?.weather_code;

        if (!ignore && typeof temperature === "number") {
          setWeather({
            code: typeof code === "number" ? code : 1,
            source: "live",
            temperature: Math.round(temperature),
          });
        }
      } catch {
        if (!ignore) {
          setWeather(fallbackWeather);
        }
      }
    }

    loadWeather();
    const intervalId = window.setInterval(loadWeather, 10 * 60 * 1000);

    return () => {
      ignore = true;
      window.clearInterval(intervalId);
    };
  }, [destination.latitude, destination.longitude]);

  const condition = useMemo(
    () => getConditionLabel(weather.code, locale),
    [locale, weather.code],
  );
  const sourceLabel = weather.source === "live" ? copy.live : copy.fallback;

  return (
    <div className="relative z-20 px-4 pb-1">
      <div className="flex min-h-[3.25rem] items-start justify-end gap-2">
        <div className="min-w-0 flex-1" aria-hidden="true" />

        <div className="group relative w-[4.7rem] shrink-0">
          <button
            type="button"
            aria-expanded={isOpen}
            aria-label={`${copy.prefix} ${destinationLabel}: ${weather.temperature}°, ${condition}`}
            className="relative flex h-[3.25rem] w-[4.7rem] items-center justify-start gap-1.5 overflow-hidden rounded-2xl border border-white/20 bg-[#fffaf2] p-1.5 text-[#13233a] shadow-lg shadow-black/15 ring-1 ring-white/10 transition duration-200 hover:-translate-y-0.5 hover:shadow-[#0e7b6b]/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b05a]"
            onClick={() => setIsOpen((current) => !current)}
          >
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white to-[#f7f0e3]" />
            <Image
              alt=""
              aria-hidden="true"
              className="relative h-9 w-9 shrink-0 rounded-xl object-contain"
              height={36}
              priority
              src="/images/icons/icon-header-weather.png"
              width={36}
            />
            <span className="relative text-[0.82rem] font-black leading-none text-[#13233a]">
              {weather.temperature}&deg;
            </span>
          </button>
          <span className="sr-only"> </span>

          <div
            className={`absolute right-0 top-[calc(100%+0.45rem)] z-50 w-[14.5rem] max-w-[calc(100vw-2rem)] rounded-[1.15rem] border border-[#d8c8b4] bg-[#fffaf2] p-3 text-[#13233a] shadow-2xl shadow-black/25 ring-1 ring-white/60 transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 ${
              isOpen
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none translate-y-1 opacity-0"
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-[#eadcc7]">
                <Image
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full rounded-xl object-contain"
                  height={40}
                  src="/images/icons/icon-header-weather.png"
                  width={40}
                />
              </span>
              <div className="min-w-0 flex-1 text-right">
                <p className="max-w-full truncate text-[0.68rem] font-black uppercase tracking-[0.14em] text-[#0e7b6b]">
                  <span>{copy.prefix}</span>{" "}
                  <span>{destinationLabel}</span>
                </p>
                <p className="mt-1 flex items-center justify-end gap-1.5 leading-none">
                  <span className="rounded-full bg-white px-1.5 py-0.5 text-[0.5rem] font-black uppercase tracking-[0.14em] text-[#8a5b12] ring-1 ring-[#eadcc7]">
                    {sourceLabel}
                  </span>
                  <span aria-hidden="true" className="text-[#9aa3ad]">
                    ·
                  </span>
                  <span className="text-[1.65rem] font-black tracking-[-0.06em] text-[#13233a]">
                    {weather.temperature}&deg;
                  </span>
                </p>
                <p className="mt-1 text-[0.72rem] font-bold leading-none text-[#4f5d6c]">
                  {condition}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Link
          aria-label="Postaw mi kawę"
          className="flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-[#fffaf2] p-1.5 shadow-lg shadow-black/15 ring-1 ring-white/10 transition duration-200 hover:-translate-y-0.5 hover:shadow-[#e8b05a]/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b05a]"
          href="https://www.buymeacoffee.com/Pawel_"
          rel="noopener noreferrer"
          target="_blank"
          title="Postaw mi kawę"
        >
          <Image
            alt=""
            aria-hidden="true"
            className="h-full w-full rounded-xl object-contain"
            height={40}
            src="/images/icons/icon-support-coffee.png"
            width={40}
          />
        </Link>
      </div>
    </div>
  );
}

function getConditionLabel(code: number, locale: LocaleCode) {
  const localized = conditionLabels[locale] ?? conditionLabels.en;

  if (code === 0 || code === 1) {
    return localized.clear;
  }

  if (code === 2 || code === 3) {
    return localized.clouds;
  }

  if (code === 45 || code === 48) {
    return localized.fog;
  }

  if ((code >= 51 && code <= 57) || (code >= 80 && code <= 82)) {
    return localized.drizzle;
  }

  if ((code >= 61 && code <= 67) || (code >= 71 && code <= 77)) {
    return localized.rain;
  }

  if (code >= 95) {
    return localized.storm;
  }

  return localized.clear;
}
