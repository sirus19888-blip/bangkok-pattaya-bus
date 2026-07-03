import type { LocaleCode } from "@/data/routes";

// Jedyne źródło prawdy: które przewodniki SEO mają pełne tłumaczenie treści,
// dla których języków innych niż angielski. Angielski jest zawsze wersją bazową.
// Gdy treść przewodnika zostanie w pełni przetłumaczona w src/locales/<locale>.json,
// dopisz tu locale — wtedy karty i canonical/hreflang zaczną go używać.
export const translatedGuideLocales: Record<string, LocaleCode[]> = {
  "ekkamai-bus-terminal-to-pattaya-guide": ["zh", "ru", "de"],
};

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
