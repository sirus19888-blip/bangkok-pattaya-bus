import type { FAQItem, GuideTip } from "@/data/faqs";
import type { LocaleCode, Route, RouteId, RoutePage } from "@/data/routes";
import type { Schedule } from "@/data/schedules";
import type { Station } from "@/data/stations";
import de from "@/locales/de.json";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import pl from "@/locales/pl.json";
import ru from "@/locales/ru.json";
import th from "@/locales/th.json";
import zh from "@/locales/zh.json";

export type Translations = typeof en;

type DeepPartial<T> = {
  [Key in keyof T]?: T[Key] extends Array<infer Item>
    ? Item[]
    : T[Key] extends object
      ? DeepPartial<T[Key]>
      : T[Key];
};

const dictionaries: Record<LocaleCode, DeepPartial<Translations>> = {
  en,
  pl,
  de,
  fr,
  ru,
  zh,
  th,
};

function mergeTextRecord<T extends Record<string, object>>(
  fallback: T,
  overrides?: DeepPartial<T>,
): T {
  return Object.fromEntries(
    Object.entries(fallback).map(([key, value]) => [
      key,
      {
        ...value,
        ...(overrides?.[key as keyof T] as object | undefined),
      },
    ]),
  ) as T;
}

function mergeArrayRecord<T extends Record<string, unknown[]>>(
  fallback: T,
  overrides?: DeepPartial<T>,
): T {
  return Object.fromEntries(
    Object.entries(fallback).map(([key, value]) => [
      key,
      (overrides?.[key as keyof T] as unknown[] | undefined) ?? value,
    ]),
  ) as T;
}

export function getTranslations(locale: LocaleCode): Translations {
  const dictionary = dictionaries[locale] ?? en;

  return {
    app: { ...en.app, ...dictionary.app },
    navigation: { ...en.navigation, ...dictionary.navigation },
    routeSelector: { ...en.routeSelector, ...dictionary.routeSelector },
    nextBus: { ...en.nextBus, ...dictionary.nextBus },
    schedule: { ...en.schedule, ...dictionary.schedule },
    station: { ...en.station, ...dictionary.station },
    travelTips: { ...en.travelTips, ...dictionary.travelTips },
    faq: { ...en.faq, ...dictionary.faq },
    support: { ...en.support, ...dictionary.support },
    lastUpdated: { ...en.lastUpdated, ...dictionary.lastUpdated },
    disclaimer: { ...en.disclaimer, ...dictionary.disclaimer },
    common: { ...en.common, ...dictionary.common },
    routePages: mergeTextRecord(en.routePages, dictionary.routePages),
    schedules: mergeTextRecord(en.schedules, dictionary.schedules),
    stationsText: mergeTextRecord(en.stationsText, dictionary.stationsText),
    travelTipItems: dictionary.travelTipItems ?? en.travelTipItems,
    routeTravelTipItems: mergeArrayRecord(
      en.routeTravelTipItems,
      dictionary.routeTravelTipItems,
    ),
    faqItems: dictionary.faqItems ?? en.faqItems,
    routeFaqItems: mergeArrayRecord(en.routeFaqItems, dictionary.routeFaqItems),
  };
}

export function localizeRoute(route: Route, t: Translations): Route {
  const routeText = t.routePages[route.id] ?? en.routePages[route.id];

  return {
    ...route,
    label: routeText.label,
  };
}

export function localizeRoutePage(
  routePage: RoutePage,
  t: Translations,
): RoutePage {
  const fallbackRouteText = en.routePages[routePage.slug];
  const routeText = t.routePages[routePage.slug] ?? fallbackRouteText;

  return {
    ...routePage,
    title: routeText.title ?? fallbackRouteText.title,
    intro: routeText.intro ?? fallbackRouteText.intro,
    metadata: {
      title: routeText.metadataTitle ?? fallbackRouteText.metadataTitle,
      description:
        routeText.metadataDescription ?? fallbackRouteText.metadataDescription,
    },
  };
}

export function localizeSchedule(schedule: Schedule, t: Translations): Schedule {
  const scheduleId = schedule.id as keyof Translations["schedules"];
  const scheduleText = t.schedules[scheduleId] ?? en.schedules[scheduleId];

  return {
    ...schedule,
    travelTime: scheduleText.travelTime,
    price: scheduleText.price,
    disclaimer: scheduleText.disclaimer,
  };
}

export function localizeStations(
  stations: Station[],
  t: Translations,
): Station[] {
  return stations.map((station) => {
    const stationId = station.id as keyof Translations["stationsText"];
    const stationText = t.stationsText[stationId] ?? en.stationsText[stationId];

    return {
      ...station,
      bestFor: stationText.bestFor,
      tip: stationText.tip,
    };
  });
}

export function getLocalizedGuideTips(
  t: Translations,
  routeId?: RouteId,
): GuideTip[] {
  if (!routeId) {
    return t.travelTipItems;
  }

  return t.routeTravelTipItems[routeId] ?? t.travelTipItems;
}

export function getLocalizedFaqs(
  t: Translations,
  routeId?: RouteId,
): FAQItem[] {
  if (!routeId) {
    return t.faqItems;
  }

  return t.routeFaqItems[routeId] ?? t.faqItems;
}
