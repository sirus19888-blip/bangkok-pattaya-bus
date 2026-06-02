"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { LocaleCode, RouteId } from "@/data/routes";

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
  variant?: "default" | "desktopHome" | "routeDesktop";
  locale?: LocaleCode;
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
const thailandTimePlaceholder = "--:--";

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

const localizedLocationLabels: Partial<
  Record<LocaleCode, Partial<Record<RouteId, string>>>
> = {
  de: {
    "bangkok-to-pattaya": "Bangkok",
    "pattaya-to-bangkok": "Pattaya",
    "suvarnabhumi-airport-to-pattaya": "Suvarnabhumi",
    "pattaya-to-suvarnabhumi-airport": "Pattaya",
    "don-mueang-airport-to-pattaya": "Don Mueang",
    "pattaya-to-don-mueang-airport": "Pattaya",
  },
  th: {
    "bangkok-to-pattaya": "กรุงเทพฯ",
    "pattaya-to-bangkok": "พัทยา",
    "suvarnabhumi-airport-to-pattaya": "สุวรรณภูมิ",
    "pattaya-to-suvarnabhumi-airport": "พัทยา",
    "don-mueang-airport-to-pattaya": "ดอนเมือง",
    "pattaya-to-don-mueang-airport": "พัทยา",
  },
  zh: {
    "bangkok-to-pattaya": "曼谷",
    "pattaya-to-bangkok": "芭提雅",
    "suvarnabhumi-airport-to-pattaya": "素万那普",
    "pattaya-to-suvarnabhumi-airport": "芭提雅",
    "don-mueang-airport-to-pattaya": "廊曼",
    "pattaya-to-don-mueang-airport": "芭提雅",
  },
  fr: {
    "bangkok-to-pattaya": "Bangkok",
    "pattaya-to-bangkok": "Pattaya",
    "suvarnabhumi-airport-to-pattaya": "Suvarnabhumi",
    "pattaya-to-suvarnabhumi-airport": "Pattaya",
    "don-mueang-airport-to-pattaya": "Don Mueang",
    "pattaya-to-don-mueang-airport": "Pattaya",
  },
  ru: {
    "bangkok-to-pattaya": "Бангкок",
    "pattaya-to-bangkok": "Паттайя",
    "suvarnabhumi-airport-to-pattaya": "Суварнабхуми",
    "pattaya-to-suvarnabhumi-airport": "Паттайя",
    "don-mueang-airport-to-pattaya": "Дон Муанг",
    "pattaya-to-don-mueang-airport": "Паттайя",
  },
};

function getHeaderTravelLabels(locale?: LocaleCode) {
  if (locale === "ru") {
    return {
      buyMeCoffee: "Купить кофе",
      currencyAria: "Курсы валют",
      currencyButton: "Курс",
      estimated: "Оценка",
      live: "Актуально",
      ratesTitle: "Курс к THB",
      thailandTime: "Местное время Таиланда",
      weatherSuffix: "погода",
    };
  }

  if (locale === "pl") {
    return {
      buyMeCoffee: "Postaw kawę",
      currencyAria: "Kursy walut",
      currencyButton: "Waluty",
      estimated: "Szac.",
      live: "Live",
      ratesTitle: "Kursy do THB",
      thailandTime: "Czas lokalny w Tajlandii",
      weatherSuffix: "pogoda",
    };
  }

  if (locale === "de") {
    return {
      buyMeCoffee: "Kaffee spendieren",
      currencyAria: "Wechselkurse",
      currencyButton: "Kurse",
      estimated: "Geschätzt",
      live: "Live",
      ratesTitle: "Kurse zu THB",
      thailandTime: "Thailändische Ortszeit",
      weatherSuffix: "Wetter",
    };
  }

  if (locale === "th") {
    return {
      buyMeCoffee: "เลี้ยงกาแฟ",
      currencyAria: "อัตราแลกเปลี่ยน",
      currencyButton: "ค่าเงิน",
      estimated: "ประมาณ",
      live: "สด",
      ratesTitle: "อัตราเป็น THB",
      thailandTime: "เวลาท้องถิ่นของประเทศไทย",
      weatherSuffix: "สภาพอากาศ",
    };
  }

  if (locale === "zh") {
    return {
      buyMeCoffee: "请我喝咖啡",
      currencyAria: "汇率",
      currencyButton: "汇率",
      estimated: "估算",
      live: "实时",
      ratesTitle: "兑换 THB 汇率",
      thailandTime: "泰国当地时间",
      weatherSuffix: "天气",
    };
  }

  if (locale === "fr") {
    return {
      buyMeCoffee: "M'offrir un café",
      currencyAria: "Taux de change",
      currencyButton: "Taux",
      estimated: "Estimé",
      live: "Direct",
      ratesTitle: "Taux vers THB",
      thailandTime: "Heure locale de Thaïlande",
      weatherSuffix: "météo",
    };
  }

  return {
    buyMeCoffee: "Buy me coffee",
    currencyAria: "Currency rates",
    currencyButton: "FX",
    estimated: "Est.",
    live: "Live",
    ratesTitle: "Rates to THB",
    thailandTime: "Thailand local time",
    weatherSuffix: "weather",
  };
}

const headerConditionLabels: Record<LocaleCode, Record<string, string>> = {
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
    fog: "Mgła",
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

function getHeaderConditionLabel(code: number, locale: LocaleCode) {
  const localized = headerConditionLabels[locale] ?? headerConditionLabels.en;

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

export function HeaderTravelInfo({
  variant = "default",
  locale = "en",
  routeSlug,
}: HeaderTravelInfoProps) {
  const location = routeWeatherLocations[routeSlug];
  const labels = getHeaderTravelLabels(locale);
  const locationLabel =
    localizedLocationLabels[locale]?.[routeSlug] ?? location.label;
  const [weather, setWeather] = useState<WeatherState>(fallbackWeather);
  const [rates, setRates] = useState<RatesState>({
    rates: fallbackRates,
    source: "fallback",
  });
  const [weatherOpen, setWeatherOpen] = useState(false);
  const [thaiTime, setThaiTime] = useState(thailandTimePlaceholder);
  const [ratesOpen, setRatesOpen] = useState(false);

  useEffect(() => {
    if (variant === "routeDesktop" && !weatherOpen) {
      return;
    }

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
    const intervalId = window.setInterval(loadWeather, 10 * 60 * 1000);

    return () => {
      ignore = true;
      window.clearInterval(intervalId);
    };
  }, [location.latitude, location.longitude, variant, weatherOpen]);

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
    const intervalId = window.setInterval(loadRates, 60 * 60 * 1000);

    return () => {
      ignore = true;
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    function updateTime() {
      setThaiTime(formatThailandTime());
    }

    updateTime();
    const intervalId = window.setInterval(updateTime, 30_000);

    return () => window.clearInterval(intervalId);
  }, []);

  const mainRate = useMemo(() => formatRate(rates.rates.USD), [rates.rates]);
  const condition = useMemo(
    () => getHeaderConditionLabel(weather.code, locale),
    [locale, weather.code],
  );

  if (variant === "desktopHome") {
    return (
      <div className="hidden items-center gap-3 md:flex">
        <div
          className="flex h-14 min-w-[10.5rem] items-center gap-3 rounded-2xl border border-[#d8c8b4] bg-[#fffaf2] px-3 py-2 text-[#13233a] shadow-sm"
          title={`${locationLabel} ${labels.weatherSuffix}`}
        >
          <Image
            alt=""
            aria-hidden="true"
            className="h-11 w-11 rounded-xl object-cover"
            height={44}
            src="/images/icons/icon-header-weather.png"
            width={44}
          />
          <span className="leading-tight">
            <span className="block text-xl font-black">
              {weather.temperature}&deg;{" "}
            </span>
            <span className="block max-w-[6rem] truncate text-[0.68rem] font-black uppercase tracking-[0.12em] text-[#0e7b6b]">
              {locationLabel}
            </span>
            <span className="block max-w-[6rem] truncate text-[0.62rem] font-bold text-[#637083]">
              {condition}
            </span>
          </span>
          <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-[0.65rem] font-black uppercase tracking-wide text-[#8a5b12]">
            {weather.source === "live" ? labels.live : labels.estimated}
          </span>
        </div>

        <Link
          aria-label={labels.buyMeCoffee}
          className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-[#d8c8b4] bg-[#fffaf2] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          href="https://www.buymeacoffee.com/Pawel_"
          rel="noopener noreferrer"
          target="_blank"
          title={labels.buyMeCoffee}
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
    );
  }

  return (
    <>
      {variant === "routeDesktop" ? (
        <div className="hidden items-center gap-3 md:flex">
          <div
            className="flex h-14 min-w-[10.5rem] items-center gap-3 rounded-2xl border border-[#d8c8b4] bg-[#fffaf2] px-3 py-2 text-[#13233a] shadow-sm"
            title={`${locationLabel} ${labels.weatherSuffix}`}
          >
            <Image
              alt=""
              aria-hidden="true"
              className="h-11 w-11 rounded-xl object-cover"
              height={44}
              src="/images/icons/icon-header-weather.png"
              width={44}
            />
            <span className="leading-tight">
              <span className="block text-xl font-black">
                {weather.temperature}&deg;{" "}
              </span>
              <span className="block max-w-[6rem] truncate text-[0.68rem] font-black uppercase tracking-[0.12em] text-[#0e7b6b]">
                {locationLabel}
              </span>
              <span className="block max-w-[6rem] truncate text-[0.62rem] font-bold text-[#637083]">
                {condition}
              </span>
            </span>
            <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-[0.65rem] font-black uppercase tracking-wide text-[#8a5b12]">
              {weather.source === "live" ? labels.live : labels.estimated}
            </span>
          </div>

          <Link
            aria-label={labels.buyMeCoffee}
            className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-[#d8c8b4] bg-[#fffaf2] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            href="https://www.buymeacoffee.com/Pawel_"
            rel="noopener noreferrer"
            target="_blank"
            title={labels.buyMeCoffee}
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
      ) : null}
      <div
        className={`ml-auto flex min-w-0 items-center justify-end gap-2 ${
          variant === "routeDesktop" ? "md:hidden" : ""
        }`}
      >
      <div
        className="hidden h-10 items-center gap-1.5 rounded-lg border border-[#d8c8b4] bg-[#fffaf2] px-2.5 text-xs font-bold text-[#13233a] shadow-sm md:flex"
        title={labels.thailandTime}
      >
        <Image
          alt=""
          aria-hidden="true"
          className="h-4 w-4 object-contain"
          height={16}
          src="/images/icons/icon-clock.png"
          width={16}
        />
        <span>{thaiTime}</span>
      </div>

      {variant === "routeDesktop" ? (
        <div className="group relative">
          <button
            type="button"
            aria-expanded={weatherOpen}
            aria-label={`${locationLabel} ${labels.weatherSuffix}: ${weather.temperature}°, ${condition}`}
            className="relative isolate flex h-11 min-w-[4.6rem] items-center justify-end overflow-hidden rounded-lg border border-[#d8c8b4] bg-[#0b4d68] px-2 text-xs font-black text-white shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b05a]"
            onClick={() => setWeatherOpen((current) => !current)}
            title={`${locationLabel} ${labels.weatherSuffix}`}
          >
            <Image
              alt=""
              aria-hidden="true"
              className="absolute inset-0 -z-10 h-full w-full object-cover object-left"
              fill
              sizes="70px"
              src="/images/weather/mobile-destination-weather.png"
            />
            <span className="absolute inset-0 -z-10 bg-gradient-to-br from-[#052032]/10 via-[#052032]/25 to-[#052032]/75" />
            <span className="text-[1rem] leading-none tracking-[-0.06em]">
              {weather.temperature}&deg;
            </span>
          </button>
          <span className="sr-only"> </span>
          <div
            className={`absolute right-0 top-[calc(100%+0.45rem)] isolate z-50 w-[14.5rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-[1.15rem] border border-white/15 bg-[#0d2638] p-2.5 text-white shadow-2xl shadow-black/30 ring-1 ring-white/10 transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 ${
              weatherOpen
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
            <div className="ml-auto flex max-w-[9.6rem] flex-col items-end gap-1 text-right">
              <p className="max-w-full truncate text-[0.68rem] font-black leading-none text-white">
                <span>{locationLabel}</span>{" "}
                <span>{labels.weatherSuffix}</span>
              </p>
              <p className="flex items-center gap-1.5 leading-none">
                <span className="rounded-full bg-white/14 px-1.5 py-0.5 text-[0.5rem] font-black uppercase tracking-[0.14em] text-[#ffe9ae] ring-1 ring-white/15">
                  {weather.source === "live" ? labels.live : labels.estimated}
                </span>
                <span aria-hidden="true" className="text-white/35">
                  ·
                </span>
                <span className="text-[1.65rem] font-black tracking-[-0.07em]">
                  {weather.temperature}&deg;
                </span>
              </p>
              <p className="text-[0.62rem] font-bold leading-none text-white/80">
                {condition}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="hidden h-10 items-center gap-1.5 rounded-lg border border-[#d8c8b4] bg-[#fffaf2] px-2.5 text-xs font-bold text-[#13233a] shadow-sm min-[390px]:flex"
          title={`${locationLabel} ${labels.weatherSuffix}`}
        >
          <Image
            alt=""
            aria-hidden="true"
            className="h-4 w-4 object-contain"
            height={16}
            src="/images/icons/icon-weather.png"
            width={16}
          />
          <span>{weather.temperature}&deg;</span>
          <span aria-hidden="true" className="text-[#9aa3ad]">
            ·
          </span>
          <span className="max-w-[5.6rem] truncate text-[0.68rem] font-semibold text-[#637083]">
            {locationLabel}
          </span>
          <span aria-hidden="true" className="text-[#9aa3ad]">
            ·
          </span>
          <span className="max-w-[4.8rem] truncate text-[0.68rem] font-semibold text-[#637083]">
            {condition}
          </span>
        </div>
      )}

      <Link
        aria-label={labels.buyMeCoffee}
        className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#d8c8b4] bg-[#fffaf2] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:hidden"
        href="https://www.buymeacoffee.com/Pawel_"
        rel="noopener noreferrer"
        target="_blank"
        title={labels.buyMeCoffee}
      >
        <Image
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
          height={40}
          src="/images/icons/icon-support-coffee.png"
          width={40}
        />
      </Link>

      {variant !== "routeDesktop" ? (
      <div className="relative">
        <button
          type="button"
          className="flex h-11 items-center gap-1.5 rounded-lg border border-[#d8c8b4] bg-[#fffaf2] px-3 text-xs font-bold text-[#13233a] shadow-sm"
          aria-expanded={ratesOpen}
          aria-label={labels.currencyAria}
          onClick={() => setRatesOpen((current) => !current)}
        >
          <Image
            alt=""
            aria-hidden="true"
            className="h-4 w-4 object-contain"
            height={16}
            src="/images/icons/icon-currency.png"
            width={16}
          />
          <span className="text-[#8a5b12]">{labels.currencyButton}</span>
          <span>{mainRate}฿</span>
          <span className="text-[0.65rem] text-[#637083]" aria-hidden="true">
            ▾
          </span>
        </button>

        {ratesOpen ? (
          <div className="absolute right-0 top-12 z-50 w-56 rounded-xl border border-[#d8c8b4] bg-white p-3 text-xs shadow-xl">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="font-black uppercase tracking-wide text-[#13233a]">
                {labels.ratesTitle}
              </p>
              <span className="rounded-full bg-[#f7f0e3] px-2 py-0.5 text-[0.65rem] font-bold uppercase text-[#6f7782]">
                {rates.source === "live" ? labels.live : labels.estimated}
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
      ) : null}
      </div>
    </>
  );
}

function formatRate(value: number) {
  return value.toFixed(value >= 10 ? 1 : 2);
}

function formatThailandTime() {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Bangkok",
  }).format(new Date());
}


