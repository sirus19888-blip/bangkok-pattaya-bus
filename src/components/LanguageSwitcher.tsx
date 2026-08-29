"use client";

import { supportedLocales, type LocaleCode } from "@/data/routes";

type LanguageSwitcherProps = {
  label: string;
  currentLocale: LocaleCode;
  // Slug biezacej strony - trasy ALBO przewodnika. Celowo `string`, a nie `RouteId`:
  // wczesniej typ dopuszczal wylacznie trasy, wiec strony przewodnikow nie mialy
  // czego przekazac i przelacznik cofal czytelnika na strone glowna.
  slug?: string;
};

export function LanguageSwitcher({
  label,
  currentLocale,
  slug,
}: LanguageSwitcherProps) {
  function handleLanguageChange(nextLocale: LocaleCode) {
    const nextPath = slug ? `/${nextLocale}/${slug}` : `/${nextLocale}`;

    window.location.assign(nextPath);
  }

  return (
    <label className="flex h-11 min-h-11 shrink-0 items-center gap-2 rounded-lg border border-[#d8c8b4] bg-[#fffaf2] px-3 text-sm font-semibold text-[#13233a]">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        className="h-11 min-w-12 bg-transparent text-sm font-semibold outline-none"
        value={currentLocale}
        onChange={(event) =>
          handleLanguageChange(event.target.value as LocaleCode)
        }
      >
        {supportedLocales.map((locale) => (
          <option key={locale.code} value={locale.code}>
            {locale.code.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}
