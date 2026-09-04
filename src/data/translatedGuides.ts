import type { LocaleCode } from "@/data/routes";

// Jedyne źródło prawdy: które przewodniki SEO mają pełne tłumaczenie treści,
// dla których języków innych niż angielski. Angielski jest zawsze wersją bazową.
// Gdy treść przewodnika zostanie w pełni przetłumaczona w src/locales/<locale>.json,
// dopisz tu locale — wtedy karty i canonical/hreflang zaczną go używać.
export const translatedGuideLocales: Record<string, LocaleCode[]> = {
  "ekkamai-bus-terminal-to-pattaya-guide": ["zh", "ru", "de"],
  "jomtien-bus-station": ["ru", "zh"],
  "don-mueang-airport-to-pattaya-bus": ["zh"],
  "pattaya-to-don-mueang-airport-bus": ["zh"],
  "pattaya-to-suvarnabhumi-airport-before-flight": ["zh"],
  "suvarnabhumi-airport-gate-8-pattaya-bus": ["zh"],
  "pattaya-to-suvarnabhumi-which-station": ["zh"],
  "bangkok-to-pattaya-bus-vs-taxi": ["zh"],
  "bangkok-to-pattaya-after-midnight": ["zh"],
  "pattaya-to-bangkok-before-flight": ["zh"],
  "mo-chit-bus-terminal-to-pattaya": ["zh"],
  "pattaya-bus-station-to-jomtien": ["zh"],
  "pattaya-to-bangkok-which-terminal": ["zh"],
  "hotels-near-pattaya-bus-station": ["zh"],
};

// Kiedy ostatnio zmieniła się TREŚĆ danego tłumaczenia. Osobno od SeoGuide.lastUpdated,
// które opisuje zmianę źródła angielskiego i jest wspólne dla wszystkich języków.
// Bez tego rozróżnienia strona /zh/ podawała Google datę zmiany wersji angielskiej.
// Daty to moment ostatniego commitu, który realnie zmienił guides[slug] w danym
// locale.json — nie moment dotknięcia samego pliku. Commity z 2026-08-18 ruszały
// ru.json i de.json, ale wyłącznie rozkłady; treść przewodników została tam
// nietknięta od lipca i data musi to odzwierciedlać.
export const guideTranslationUpdatedAt: Record<
  string,
  Partial<Record<LocaleCode, string>>
> = {
  "ekkamai-bus-terminal-to-pattaya-guide": {
    zh: "2026-08-23",
    ru: "2026-07-05",
    de: "2026-07-05",
  },
  "jomtien-bus-station": { zh: "2026-08-23", ru: "2026-07-17" },
  "don-mueang-airport-to-pattaya-bus": { zh: "2026-09-04" },
  "pattaya-to-don-mueang-airport-bus": { zh: "2026-08-23" },
  "pattaya-to-suvarnabhumi-airport-before-flight": { zh: "2026-08-23" },
  "suvarnabhumi-airport-gate-8-pattaya-bus": { zh: "2026-08-24" },
  "pattaya-to-suvarnabhumi-which-station": { zh: "2026-08-23" },
  "bangkok-to-pattaya-bus-vs-taxi": { zh: "2026-08-24" },
  "bangkok-to-pattaya-after-midnight": { zh: "2026-08-24" },
  "pattaya-to-bangkok-before-flight": { zh: "2026-08-24" },
  "mo-chit-bus-terminal-to-pattaya": { zh: "2026-08-23" },
  "pattaya-bus-station-to-jomtien": { zh: "2026-08-23" },
  "pattaya-to-bangkok-which-terminal": { zh: "2026-08-23" },
  "hotels-near-pattaya-bus-station": { zh: "2026-08-23" },
};

// Data modyfikacji konkretnej wersji językowej strony.
// en -> zawsze data źródła. Inny język -> data tłumaczenia, a gdy przewodnik nie jest
// przetłumaczony (strona pokazuje treść angielską) -> data źródła.
// Celowo NIE max(): gdy zmieni się angielski, a tłumaczenie nie, strona /zh/ realnie
// się nie zmieniła i jej data ma stać w miejscu.
export function getGuideModifiedDate(
  slug: string,
  locale: LocaleCode,
  sourceLastUpdated: string,
): string {
  if (locale === "en") {
    return sourceLastUpdated;
  }
  return guideTranslationUpdatedAt[slug]?.[locale] ?? sourceLastUpdated;
}

export function isGuideTranslated(slug: string, locale: LocaleCode): boolean {
  if (locale === "en") {
    return true;
  }
  return translatedGuideLocales[slug]?.includes(locale) ?? false;
}

// Języki, które mają realną wersję tego przewodnika (zawsze zawiera "en").
export function getGuideLocales(slug: string): LocaleCode[] {
  return ["en", ...(translatedGuideLocales[slug] ?? [])];
}
