import type { FAQItem, GuideTip } from "@/data/faqs";
import type { LocaleCode, RouteId, RoutePage } from "@/data/routes";
import type { SeoGuide } from "@/data/seoGuides";
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
    guideCards: mergeTextRecord(en.guideCards, dictionary.guideCards),
    guides: {
      ...mergeTextRecord(en.guides, dictionary.guides),
      ...Object.fromEntries(
        Object.entries(dictionary.guides ?? {}).filter(
          ([key]) => !(key in en.guides),
        ),
      ),
    } as Translations["guides"],
  };
}

type ScheduleText = {
  price?: string;
  subRoutePrices?: Record<string, string>;
};

export function getLocalizedSchedulePrice(
  scheduleId: string,
  t: Translations,
  fallback: string,
) {
  const scheduleText = t.schedules[
    scheduleId as keyof Translations["schedules"]
  ] as ScheduleText | undefined;

  return scheduleText?.price ?? fallback;
}

export function getLocalizedSubRoutePrice(
  scheduleId: string,
  subRouteId: string,
  t: Translations,
  fallback: string,
) {
  const scheduleText = t.schedules[
    scheduleId as keyof Translations["schedules"]
  ] as ScheduleText | undefined;

  return scheduleText?.subRoutePrices?.[subRouteId] ?? fallback;
}

export function localizeRoutePage(
  routePage: RoutePage,
  t: Translations,
): RoutePage {
  const fallbackRouteText = en.routePages[routePage.slug];
  const routeText = t.routePages[routePage.slug] ?? fallbackRouteText;
  const localizedEndpoints = routeText as {
    from?: string;
    to?: string;
  };

  return {
    ...routePage,
    title: routeText.title ?? fallbackRouteText.title,
    intro: routeText.intro ?? fallbackRouteText.intro,
    relatedDescription:
      routeText.relatedDescription ??
      fallbackRouteText.relatedDescription ??
      routePage.relatedDescription,
    from: localizedEndpoints.from ?? routePage.from,
    to: localizedEndpoints.to ?? routePage.to,
    metadata: {
      title: routeText.metadataTitle ?? fallbackRouteText.metadataTitle,
      description:
        routeText.metadataDescription ?? fallbackRouteText.metadataDescription,
    },
  };
}

export function localizeSchedule(
  schedule: Schedule,
  t: Translations,
  locale: LocaleCode,
): Schedule {
  const scheduleId = schedule.id as keyof Translations["schedules"];
  const scheduleText = t.schedules[scheduleId] ?? en.schedules[scheduleId];
  const sourceText = scheduleText as {
    boardingNote?: string;
    dataQuality?: string;
    departureWindow?: string;
    fareNote?: string;
    operatorNote?: string;
    sourceName?: string;
    sourceType?: string;
  };
  const isThai = locale === "th";
  const isRussian = locale === "ru";
  const isGerman = locale === "de";
  const isPolish = locale === "pl";
  const isFrench = locale === "fr";
  const isChinese = locale === "zh";
  const polishSubRouteText: Record<string, { label: string; from: string; to: string }> = {
    "bangkok-ekkamai-to-pattaya": {
      label: "Ekkamai Bus Terminal",
      from: "dworzec autobusowy Ekkamai",
      to: "dworzec autobusowy w Pattayi",
    },
    "bangkok-mochit-to-pattaya": {
      label: "Mo Chit 2 Bus Terminal",
      from: "dworzec autobusowy Mo Chit 2",
      to: "dworzec autobusowy w Pattayi",
    },
    "pattaya-to-mochit": {
      label: "Pattaya do Mo Chit 2",
      from: "dworzec autobusowy w Pattayi",
      to: "dworzec autobusowy Mo Chit 2",
    },
    "pattaya-to-ekkamai": {
      label: "Pattaya do Ekkamai",
      from: "dworzec autobusowy w Pattayi",
      to: "dworzec autobusowy Ekkamai",
    },
  };
  const frenchSubRouteText: Record<string, { label: string; from: string; to: string }> = {
    "bangkok-ekkamai-to-pattaya": {
      label: "Gare routiere Ekkamai",
      from: "gare routiere Ekkamai",
      to: "gare routiere de Pattaya",
    },
    "bangkok-mochit-to-pattaya": {
      label: "Gare routiere Mo Chit 2",
      from: "gare routiere Mo Chit 2",
      to: "gare routiere de Pattaya",
    },
    "pattaya-to-mochit": {
      label: "Pattaya vers Mo Chit 2",
      from: "gare routière de Pattaya",
      to: "gare routière Mo Chit 2",
    },
    "pattaya-to-ekkamai": {
      label: "Pattaya vers Ekkamai",
      from: "gare routière de Pattaya",
      to: "gare routière Ekkamai",
    },
  };
  const chineseSubRouteText: Record<string, { label: string; from: string; to: string }> = {
    "bangkok-ekkamai-to-pattaya": {
      label: "Ekkamai Bus Terminal",
      from: "Ekkamai Bus Terminal",
      to: "Pattaya Bus Station",
    },
    "bangkok-mochit-to-pattaya": {
      label: "Mo Chit 2 Bus Terminal",
      from: "Mo Chit 2 Bus Terminal",
      to: "Pattaya Bus Station",
    },
    "pattaya-to-mochit": {
      label: "芭提雅到 Mo Chit 2",
      from: "芭提雅巴士站",
      to: "Mo Chit 2 巴士总站",
    },
    "pattaya-to-ekkamai": {
      label: "芭提雅到 Ekkamai",
      from: "芭提雅巴士站",
      to: "Ekkamai 巴士总站",
    },
  };
  const thaiSubRouteText: Record<string, { label: string; from: string; to: string }> = {
    "bangkok-ekkamai-to-pattaya": {
      label: "Ekkamai Bus Terminal",
      from: "Ekkamai Bus Terminal",
      to: "Pattaya Bus Station",
    },
    "bangkok-mochit-to-pattaya": {
      label: "Mo Chit 2 Bus Terminal",
      from: "Mo Chit 2 Bus Terminal",
      to: "Pattaya Bus Station",
    },
    "pattaya-to-mochit": {
      label: "พัทยาไปหมอชิต 2",
      from: "สถานีขนส่งพัทยา",
      to: "สถานีขนส่งหมอชิต 2",
    },
    "pattaya-to-ekkamai": {
      label: "พัทยาไปเอกมัย",
      from: "สถานีขนส่งพัทยา",
      to: "สถานีขนส่งเอกมัย",
    },
  };
  const russianSubRouteText: Record<string, { label: string; from: string; to: string }> = {
    "bangkok-ekkamai-to-pattaya": {
      label: "Ekkamai Bus Terminal",
      from: "Ekkamai Bus Terminal",
      to: "Pattaya Bus Station",
    },
    "bangkok-mochit-to-pattaya": {
      label: "Mo Chit 2 Bus Terminal",
      from: "Mo Chit 2 Bus Terminal",
      to: "Pattaya Bus Station",
    },
    "pattaya-to-mochit": {
      label: "Паттайя — Мо Чит 2",
      from: "автовокзал Паттайи",
      to: "автовокзал Мо Чит 2",
    },
    "pattaya-to-ekkamai": {
      label: "Паттайя — Эккамай",
      from: "автовокзал Паттайи",
      to: "автовокзал Эккамай",
    },
  };
  const germanSubRouteText: Record<string, { label: string; from: string; to: string }> = {
    "bangkok-ekkamai-to-pattaya": {
      label: "Busbahnhof Ekkamai",
      from: "Busbahnhof Ekkamai",
      to: "Busbahnhof Pattaya",
    },
    "bangkok-mochit-to-pattaya": {
      label: "Busbahnhof Mo Chit 2",
      from: "Busbahnhof Mo Chit 2",
      to: "Busbahnhof Pattaya",
    },
    "pattaya-to-mochit": {
      label: "Pattaya nach Mo Chit 2",
      from: "Busbahnhof Pattaya",
      to: "Busbahnhof Mo Chit 2",
    },
    "pattaya-to-ekkamai": {
      label: "Pattaya nach Ekkamai",
      from: "Busbahnhof Pattaya",
      to: "Busbahnhof Ekkamai",
    },
  };

  return {
    ...schedule,
    distance: isThai
      ? schedule.distance.replace("km", "กม.")
      : isRussian
        ? schedule.distance.replace("km", "км")
        : schedule.distance,
    departureWindow: sourceText.departureWindow ?? schedule.departureWindow,
    travelTime: scheduleText.travelTime,
    price: getLocalizedSchedulePrice(schedule.id, t, schedule.price),
    disclaimer: scheduleText.disclaimer,
    boardingNote: sourceText.boardingNote ?? schedule.boardingNote,
    dataQuality: sourceText.dataQuality ?? schedule.dataQuality,
    fareNote: sourceText.fareNote ?? schedule.fareNote,
    operatorNote: sourceText.operatorNote ?? schedule.operatorNote,
    sourceName: schedule.sourceName,
    sourceType: sourceText.sourceType ?? schedule.sourceType,
    subRoutes: schedule.subRoutes?.map((subRoute) => {
      const thaiText = isThai ? thaiSubRouteText[subRoute.id] : undefined;
      const russianText = isRussian
        ? russianSubRouteText[subRoute.id]
        : undefined;
      const germanText = isGerman ? germanSubRouteText[subRoute.id] : undefined;
      const polishText = isPolish ? polishSubRouteText[subRoute.id] : undefined;
      const frenchText = isFrench ? frenchSubRouteText[subRoute.id] : undefined;
      const chineseText = isChinese ? chineseSubRouteText[subRoute.id] : undefined;

      return {
        ...subRoute,
        dataQuality: sourceText.dataQuality ?? subRoute.dataQuality,
        fareNote: sourceText.fareNote ?? subRoute.fareNote,
        label:
          thaiText?.label ??
          russianText?.label ??
          germanText?.label ??
          polishText?.label ??
          frenchText?.label ??
          chineseText?.label ??
          subRoute.label,
        operatorNote: sourceText.operatorNote ?? subRoute.operatorNote,
        price: getLocalizedSubRoutePrice(
          schedule.id,
          subRoute.id,
          t,
          subRoute.price,
        ),
        sourceName: subRoute.sourceName,
        sourceType: sourceText.sourceType ?? subRoute.sourceType,
        from:
          thaiText?.from ??
          russianText?.from ??
          germanText?.from ??
          polishText?.from ??
          frenchText?.from ??
          chineseText?.from ??
          subRoute.from,
        to:
          thaiText?.to ??
          russianText?.to ??
          germanText?.to ??
          polishText?.to ??
          frenchText?.to ??
          chineseText?.to ??
          subRoute.to,
      };
    }),
  };
}

export function localizeStations(
  stations: Station[],
  t: Translations,
  locale: LocaleCode,
): Station[] {
  const isThai = locale === "th";
  const isRussian = locale === "ru";
  const isGerman = locale === "de";
  const isFrench = locale === "fr";
  const isChinese = locale === "zh";
  const thaiStationNames: Record<string, string> = {
    ekkamai: "สถานีขนส่งเอกมัย",
    "mo-chit": "สถานีขนส่งหมอชิต 2",
    "north-pattaya": "สถานีขนส่งพัทยาเหนือ",
    "suvarnabhumi-airport": "เคาน์เตอร์รถบัสท่าอากาศยานสุวรรณภูมิ",
    "jomtien-bus-area": "จุดรถบัสสนามบินพัทยา / จอมเทียน",
    "don-mueang-airport": "ท่าอากาศยานดอนเมือง",
    "pattaya-sukhumvit": "สถานีรถบัสถนนสุขุมวิทพัทยา",
  };
  const russianStationNames: Record<string, string> = {
    ekkamai: "автовокзал Эккамай",
    "mo-chit": "автовокзал Мо Чит 2",
    "north-pattaya": "автовокзал Северной Паттайи",
    "suvarnabhumi-airport": "автобусная стойка аэропорта Суварнабхуми",
    "jomtien-bus-area": "автобусная зона Паттайя / Джомтьен",
    "don-mueang-airport": "аэропорт Дон Муанг",
    "pattaya-sukhumvit": "автостанция на дороге Сукхумвит в Паттайе",
  };
  const germanStationNames: Record<string, string> = {
    ekkamai: "Busbahnhof Ekkamai",
    "mo-chit": "Busbahnhof Mo Chit 2",
    "north-pattaya": "Busbahnhof Nord-Pattaya",
    "suvarnabhumi-airport": "Busschalter am Flughafen Suvarnabhumi",
    "jomtien-bus-area": "Busbereich Pattaya / Jomtien",
    "don-mueang-airport": "Flughafen Don Mueang",
    "pattaya-sukhumvit": "Busbahnhof an der Sukhumvit Road in Pattaya",
  };
  const frenchStationNames: Record<string, string> = {
    ekkamai: "Gare routière Ekkamai",
    "mo-chit": "Gare routière Mo Chit 2",
    "north-pattaya": "Terminal de bus North Pattaya",
    "suvarnabhumi-airport": "Comptoir de bus de l'aéroport Suvarnabhumi",
    "jomtien-bus-area": "Zone de bus Pattaya / Jomtien",
    "don-mueang-airport": "Aéroport Don Mueang",
    "pattaya-sukhumvit": "Gare routière de Pattaya Sukhumvit Road",
  };
  const chineseStationNames: Record<string, string> = {
    ekkamai: "Ekkamai 巴士总站",
    "mo-chit": "Mo Chit 2 巴士总站",
    "north-pattaya": "North Pattaya Bus Terminal",
    "suvarnabhumi-airport": "素万那普机场巴士柜台",
    "jomtien-bus-area": "芭提雅 / 中天机场巴士区域",
    "don-mueang-airport": "廊曼机场",
    "pattaya-sukhumvit": "芭提雅 Sukhumvit Road 巴士站",
  };

  return stations.map((station) => {
    const stationId = station.id as keyof Translations["stationsText"];
    const stationText = t.stationsText[stationId] ?? en.stationsText[stationId];

    return {
      ...station,
      name: isThai
        ? thaiStationNames[station.id] ?? station.name
        : isRussian
          ? russianStationNames[station.id] ?? station.name
        : isGerman
          ? germanStationNames[station.id] ?? station.name
        : isFrench
          ? frenchStationNames[station.id] ?? station.name
        : isChinese
          ? chineseStationNames[station.id] ?? station.name
          : station.name,
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

type SeoGuideText = {
  title?: string;
  description?: string;
  h1?: string;
  intro?: string;
  shortAnswer?: string;
  ctaLabel?: string;
  routeLinkLabel?: string;
  keyPoints?: string[];
  sections?: { title?: string; body?: string }[];
  faq?: { question?: string; answer?: string }[];
  transferNote?: { title?: string; body?: string; ctaLabel?: string };
};

// Blok transferowy NIE ma fallbacku do angielskiego. Gdy brak tlumaczenia w danym
// jezyku, zwracamy undefined i strona go nie renderuje. Powod: 2026-08-24 angielska
// karta trafila na 3. pozycje chinskiej strony glownej i wygladalo to jak brak
// tlumaczenia. Lepiej nie pokazac bloku, niz pokazac go w obcym jezyku.
function localizeTransferNote(
  guide: SeoGuide,
  guideText: SeoGuideText | undefined,
  isEnglish: boolean,
): SeoGuide["transferNote"] {
  if (!guide.transferNote) {
    return undefined;
  }
  if (isEnglish) {
    return guide.transferNote;
  }
  const t = guideText?.transferNote;
  if (!t?.title?.trim() || !t?.body?.trim() || !t?.ctaLabel?.trim()) {
    return undefined;
  }
  return { title: t.title, body: t.body, ctaLabel: t.ctaLabel };
}

// locale jest wymagane, nie opcjonalne: dzieki temu tsc wskaze kazde wywolanie,
// ktore o nim zapomni, zamiast po cichu pokazac angielski blok w obcym jezyku.
export function localizeSeoGuide(
  guide: SeoGuide,
  t: Translations,
  locale: LocaleCode,
): SeoGuide {
  const guideText = (t.guides as Record<string, SeoGuideText | undefined>)[
    guide.slug
  ];
  const transferNote = localizeTransferNote(guide, guideText, locale === "en");

  if (!guideText) {
    return { ...guide, transferNote };
  }

  return {
    ...guide,
    transferNote,
    title: guideText.title ?? guide.title,
    description: guideText.description ?? guide.description,
    h1: guideText.h1 ?? guide.h1,
    intro: guideText.intro ?? guide.intro,
    shortAnswer: guideText.shortAnswer ?? guide.shortAnswer,
    ctaLabel: guideText.ctaLabel ?? guide.ctaLabel,
    routeLinkLabel: guideText.routeLinkLabel ?? guide.routeLinkLabel,
    keyPoints: guideText.keyPoints ?? guide.keyPoints,
    sections: guide.sections.map((section, index) => ({
      ...section,
      title: guideText.sections?.[index]?.title ?? section.title,
      body: guideText.sections?.[index]?.body ?? section.body,
    })),
    faq: guide.faq.map((item, index) => ({
      ...item,
      question: guideText.faq?.[index]?.question ?? item.question,
      answer: guideText.faq?.[index]?.answer ?? item.answer,
    })),
  };
}
