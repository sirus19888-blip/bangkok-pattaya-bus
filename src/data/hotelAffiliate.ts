import type { LocaleCode, RouteId } from "@/data/routes";

export type HotelCity = "pattaya" | "bangkok";

const fallbackAgodaCid = "1967985";

// Agoda city ids (potwierdzone): Pattaya 8584, Bangkok 9395.
const agodaCityId: Record<HotelCity, string> = {
  pattaya: "8584",
  bangkok: "9395",
};

// Miasto docelowe trasy (tylko trasy, gdzie hotel ma sens — przyjazd do miasta).
export const routeHotelCity: Partial<Record<RouteId, HotelCity>> = {
  "bangkok-to-pattaya": "pattaya",
  "suvarnabhumi-airport-to-pattaya": "pattaya",
  "don-mueang-airport-to-pattaya": "pattaya",
  "pattaya-to-bangkok": "bangkok",
};

// Kod języka Agoda per locale (fallback en-us).
const agodaHl: Record<LocaleCode, string> = {
  en: "en-us",
  pl: "pl-pl",
  de: "de-de",
  fr: "fr-fr",
  ru: "ru-ru",
  th: "th-th",
  zh: "zh-cn",
};

export function buildAgodaUrl(city: HotelCity, locale: LocaleCode) {
  const cid = process.env.NEXT_PUBLIC_AGODA_CID || fallbackAgodaCid;
  const hl = agodaHl[locale] ?? "en-us";
  return `https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=${cid}&hl=${hl}&city=${agodaCityId[city]}`;
}

export function buildAgodaBadgeUrl(locale: LocaleCode) {
  const cid = process.env.NEXT_PUBLIC_AGODA_CID || fallbackAgodaCid;
  const hl = agodaHl[locale] ?? "en-us";
  return `https://www.agoda.com/partners/partnersearch.aspx?cid=${cid}&pcs=8&hl=${hl}`;
}
