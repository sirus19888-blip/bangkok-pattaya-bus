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
  de: { fallback: "Schatzung", live: "Live", prefix: "Wetter in" },
  en: { fallback: "Estimate", live: "Live", prefix: "Weather in" },
  fr: { fallback: "Estime", live: "Live", prefix: "Meteo a" },
  pl: { fallback: "Szacunek", live: "Live", prefix: "Pogoda w" },
  ru: { fallback: "Prognoz", live: "Live", prefix: "Weather in" },
  th: { fallback: "Estimate", live: "Live", prefix: "Weather in" },
  zh: { fallback: "Estimate", live: "Live", prefix: "Weather in" },
};

const conditionLabels: Record<LocaleCode, Record<string, string>> = {
  de: {
    clear: "Klar",
    clouds: "Bewolkt",
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
    clear: "Clear",
    clouds: "Clouds",
    drizzle: "Drizzle",
    fog: "Fog",
    rain: "Rain",
    storm: "Storm",
  },
  th: {
    clear: "Clear",
    clouds: "Clouds",
    drizzle: "Drizzle",
    fog: "Fog",
    rain: "Rain",
    storm: "Storm",
  },
  zh: {
    clear: "Clear",
    clouds: "Clouds",
    drizzle: "Drizzle",
    fog: "Fog",
    rain: "Rain",
    storm: "Storm",
  },
};

export function MobileDestinationWeather({
  locale,
  routeSlug,
}: DestinationWeatherProps) {
  const destination = destinations[routeSlug];
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
    <aside className="relative z-20 px-4 pb-1">
      <div className="flex min-h-14 items-start justify-end gap-2">
        <div className="min-w-0 flex-1" aria-hidden="true" />

        <div className="group relative w-[4.7rem] shrink-0">
          <button
            type="button"
            aria-expanded={isOpen}
            aria-label={`${copy.prefix} ${destination.label}: ${weather.temperature} degrees, ${condition}`}
            className="relative isolate h-14 w-[4.7rem] overflow-hidden rounded-2xl border border-white/15 bg-[#0b4d68] text-white shadow-lg shadow-black/15 ring-1 ring-white/10 transition duration-200 hover:-translate-y-0.5 hover:shadow-[#0e7b6b]/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b05a]"
            onClick={() => setIsOpen((current) => !current)}
          >
            <Image
              alt=""
              aria-hidden="true"
              className="absolute inset-0 -z-10 h-full w-full object-cover object-left"
              fill
              priority
              sizes="75px"
              src="/images/weather/mobile-destination-weather.png"
            />
            <span className="absolute inset-0 -z-10 bg-gradient-to-br from-[#052032]/5 via-[#052032]/15 to-[#052032]/70" />
            <span className="absolute right-2 top-1.5 rounded-full bg-white/18 px-1.5 py-0.5 text-[0.48rem] font-black uppercase tracking-[0.12em] text-[#ffe9ae] ring-1 ring-white/15">
              {sourceLabel}
            </span>
            <span className="absolute bottom-1.5 right-2 text-[1.05rem] font-black leading-none tracking-[-0.06em]">
              {weather.temperature}&deg;
            </span>
          </button>

          <div
            className={`absolute right-0 top-[calc(100%+0.45rem)] isolate w-[14.5rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-[1.15rem] border border-white/15 bg-[#0d2638] p-2.5 text-white shadow-2xl shadow-black/30 ring-1 ring-white/10 transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 ${
              isOpen
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none translate-y-1 opacity-0"
            }`}
          >
            <div className="absolute inset-0 -z-10">
              <Image
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover object-left opacity-80"
                fill
                sizes="280px"
                src="/images/weather/mobile-destination-weather.png"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#052032]/15 via-[#052032]/45 to-[#052032]/85" />
            </div>
            <div className="ml-auto flex max-w-[8.8rem] flex-col items-end text-right">
              <span className="rounded-full bg-white/14 px-1.5 py-0.5 text-[0.5rem] font-black uppercase tracking-[0.14em] text-[#ffe9ae] ring-1 ring-white/15">
                {sourceLabel}
              </span>
              <span className="mt-1 text-[1.65rem] font-black leading-none tracking-[-0.07em]">
                {weather.temperature}&deg;
              </span>
              <span className="mt-0.5 max-w-full truncate text-[0.68rem] font-black leading-none text-white">
                {copy.prefix} {destination.label}
              </span>
              <span className="mt-1 text-[0.62rem] font-bold leading-none text-white/80">
                {condition}
              </span>
            </div>
          </div>
        </div>

        <Link
          aria-label="Postaw mi kawę"
          className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-[#fffaf2] shadow-lg shadow-black/15 ring-1 ring-white/10 transition duration-200 hover:-translate-y-0.5 hover:shadow-[#e8b05a]/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b05a]"
          href="https://www.buymeacoffee.com/Pawel_"
          rel="noopener noreferrer"
          target="_blank"
          title="Postaw mi kawę"
        >
          <Image
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
            height={56}
            src="/images/icons/icon-support-coffee.png"
            width={56}
          />
        </Link>
      </div>
    </aside>
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
