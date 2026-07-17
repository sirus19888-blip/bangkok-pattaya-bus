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

// Przewodniki bez miasta z routeHotelCity, ktore maja dostac hotel CTA (slug -> miasto).
export const guideHotelCity: Record<string, HotelCity> = {
  "jomtien-bus-station": "pattaya",
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

export function buildAgodaUrl(
  city: HotelCity,
  locale: LocaleCode,
  travelDate?: string,
) {
  const cid = process.env.NEXT_PUBLIC_AGODA_CID || fallbackAgodaCid;
  const hl = agodaHl[locale] ?? "en-us";
  const url = `https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=${cid}&hl=${hl}&city=${agodaCityId[city]}`;

  if (!travelDate || !/^\d{4}-\d{2}-\d{2}$/.test(travelDate)) {
    return url;
  }

  const [year, month, day] = travelDate.split("-").map(Number);
  const checkout = new Date(Date.UTC(year, month - 1, day + 2))
    .toISOString()
    .slice(0, 10);

  return `${url}&checkin=${travelDate}&checkout=${checkout}`;
}

export function buildAgodaBadgeUrl(locale: LocaleCode) {
  const cid = process.env.NEXT_PUBLIC_AGODA_CID || fallbackAgodaCid;
  const hl = agodaHl[locale] ?? "en-us";
  return `https://www.agoda.com/partners/partnersearch.aspx?cid=${cid}&pcs=8&hl=${hl}`;
}
