import type { FAQItem, GuideTip } from "@/data/faqs";
import type { LocaleCode, Route, RoutePage } from "@/data/routes";
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

const dictionaries: Record<LocaleCode, Partial<Translations>> = {
  en,
  pl,
  de,
  fr,
  ru,
  zh,
  th,
};

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
    routePages: { ...en.routePages, ...dictionary.routePages },
    schedules: { ...en.schedules, ...dictionary.schedules },
    stationsText: { ...en.stationsText, ...dictionary.stationsText },
    travelTipItems: dictionary.travelTipItems ?? en.travelTipItems,
    faqItems: dictionary.faqItems ?? en.faqItems,
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
  const routeText = t.routePages[routePage.slug] ?? en.routePages[routePage.slug];

  return {
    ...routePage,
    title: routeText.title,
    intro: routeText.intro,
    metadata: {
      title: routeText.metadataTitle,
      description: routeText.metadataDescription,
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

export function getLocalizedGuideTips(t: Translations): GuideTip[] {
  return t.travelTipItems;
}

export function getLocalizedFaqs(t: Translations): FAQItem[] {
  return t.faqItems;
}
