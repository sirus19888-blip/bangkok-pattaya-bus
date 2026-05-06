"use client";

import { useEffect, useMemo, useState } from "react";
import type { RouteId } from "@/data/routes";

type WeatherLocation = {
  label: string;
  query: string;
  latitude: number;
  longitude: number;
};

type WeatherState = {
  temperature: number;
  code: number;
  source: "live" | "fallback";
};

type RatesState = {
  rates: Record<string, number>;
  source: "live" | "fallback";
};

type HeaderTravelInfoProps = {
  routeSlug: RouteId;
};

const fallbackRates: Record<string, number> = {
  USD: 36.2,
  EUR: 39.4,
  GBP: 46.1,
  PLN: 9.1,
  RUB: 0.39,
  CNY: 5.0,
};

const fallbackWeather: WeatherState = {
  temperature: 31,
  code: 1,
  source: "fallback",
};

const routeWeatherLocations: Record<RouteId, WeatherLocation> = {
  "bangkok-to-pattaya": {
    label: "Bangkok",
    query: "Bangkok,TH",
    latitude: 13.7563,
    longitude: 100.5018,
  },
  "pattaya-to-bangkok": {
    label: "Pattaya",
    query: "Pattaya,TH",
    latitude: 12.9236,
    longitude: 100.8825,
  },
  "suvarnabhumi-airport-to-pattaya": {
    label: "Suvarnabhumi",
    query: "Bangkok,TH",
    latitude: 13.69,
    longitude: 100.7501,
  },
  "pattaya-to-suvarnabhumi-airport": {
    label: "Pattaya",
    query: "Pattaya,TH",
    latitude: 12.9236,
    longitude: 100.8825,
  },
  "don-mueang-airport-to-pattaya": {
    label: "Don Mueang",
    query: "Bangkok,TH",
    latitude: 13.9125,
    longitude: 100.6067,
  },
  "pattaya-to-don-mueang-airport": {
    label: "Pattaya",
    query: "Pattaya,TH",
    latitude: 12.9236,
    longitude: 100.8825,
  },
};

export function HeaderTravelInfo({ routeSlug }: HeaderTravelInfoProps) {
  const location = routeWeatherLocations[routeSlug];
  const [weather, setWeather] = useState<WeatherState>(fallbackWeather);
  const [rates, setRates] = useState<RatesState>({
    rates: fallbackRates,
    source: "fallback",
  });
  const [ratesOpen, setRatesOpen] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadWeather() {
      try {
        const params = new URLSearchParams({
          latitude: String(location.latitude),
          longitude: String(location.longitude),
          current: "temperature_2m,weather_code",
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
            temperature: Math.round(temperature),
            code: typeof code === "number" ? code : 1,
            source: "live",
          });
        }
      } catch {
        if (!ignore) {
          setWeather(fallbackWeather);
        }
      }
    }

    loadWeather();

    return () => {
      ignore = true;
    };
  }, [location.latitude, location.longitude]);

  useEffect(() => {
    let ignore = false;

    async function loadRates() {
      try {
        const response = await fetch("https://open.er-api.com/v6/latest/USD");

        if (!response.ok) {
          throw new Error("Currency request failed");
        }

        const data = (await response.json()) as {
          rates?: Record<string, number>;
          result?: string;
        };
        const sourceRates = data.rates;

        if (!sourceRates?.THB || data.result === "error") {
          throw new Error("Currency response missing THB");
        }

        const nextRates = Object.fromEntries(
          Object.keys(fallbackRates).map((code) => {
            if (code === "USD") {
              return [code, sourceRates.THB];
            }

            const baseRate = sourceRates[code];
            return [
              code,
              typeof baseRate === "number"
                ? sourceRates.THB / baseRate
                : fallbackRates[code],
            ];
          }),
        );

        if (!ignore) {
          setRates({ rates: nextRates, source: "live" });
        }
      } catch {
        if (!ignore) {
          setRates({ rates: fallbackRates, source: "fallback" });
        }
      }
    }

    loadRates();

    return () => {
      ignore = true;
    };
  }, []);

  const mainRate = useMemo(() => formatRate(rates.rates.USD), [rates.rates]);

  return (
    <div className="ml-auto flex min-w-0 items-center justify-end gap-2">
      <div
        className="hidden h-10 items-center gap-1.5 rounded-lg border border-[#d8c8b4] bg-[#fffaf2] px-2.5 text-xs font-bold text-[#13233a] shadow-sm min-[390px]:flex"
        title={`${location.label} weather (${weather.source})`}
      >
        <span aria-hidden="true">{weatherIcon(weather.code)}</span>
        <span>{weather.temperature}°</span>
        <span className="max-w-[5.6rem] truncate text-[0.68rem] font-semibold text-[#637083]">
          {location.label}
        </span>
      </div>

      <div className="relative">
        <button
          type="button"
          className="flex h-10 items-center gap-1.5 rounded-lg border border-[#d8c8b4] bg-[#fffaf2] px-2.5 text-xs font-bold text-[#13233a] shadow-sm"
          aria-expanded={ratesOpen}
          aria-label="Currency rates"
          onClick={() => setRatesOpen((current) => !current)}
        >
          <span className="text-[#b9832e]">FX</span>
          <span>{mainRate}฿</span>
          <span className="text-[0.65rem] text-[#637083]" aria-hidden="true">
            ▾
          </span>
        </button>

        {ratesOpen ? (
          <div className="absolute right-0 top-12 z-50 w-56 rounded-xl border border-[#d8c8b4] bg-white p-3 text-xs shadow-xl">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="font-black uppercase tracking-wide text-[#13233a]">
                Rates to THB
              </p>
              <span className="rounded-full bg-[#f7f0e3] px-2 py-0.5 text-[0.65rem] font-bold uppercase text-[#6f7782]">
                {rates.source === "live" ? "Live" : "Est."}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(rates.rates).map(([code, value]) => (
                <div
                  key={code}
                  className="rounded-lg bg-[#fffaf2] px-2 py-1.5 font-semibold text-[#13233a]"
                >
                  <span className="text-[#6f7782]">{code}</span>{" "}
                  <span>{formatRate(value)}฿</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function formatRate(value: number) {
  return value.toFixed(value >= 10 ? 1 : 2);
}

function weatherIcon(code: number) {
  if (code === 0) {
    return "☀";
  }

  if (code >= 51 && code <= 67) {
    return "☂";
  }

  if (code >= 80) {
    return "☔";
  }

  if (code >= 1 && code <= 3) {
    return "◐";
  }

  return "☀";
}
