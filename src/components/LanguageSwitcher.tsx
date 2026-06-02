"use client";

import { supportedLocales, type LocaleCode, type RouteId } from "@/data/routes";

type LanguageSwitcherProps = {
  label: string;
  currentLocale: LocaleCode;
  routeSlug?: RouteId;
};

export function LanguageSwitcher({
  label,
  currentLocale,
  routeSlug,
}: LanguageSwitcherProps) {
  function handleLanguageChange(nextLocale: LocaleCode) {
    const nextPath = routeSlug ? `/${nextLocale}/${routeSlug}` : `/${nextLocale}`;

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
