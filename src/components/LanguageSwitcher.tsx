"use client";

import { useRouter } from "next/navigation";
import { supportedLocales, type LocaleCode, type RouteId } from "@/data/routes";

type LanguageSwitcherProps = {
  label: string;
  currentLocale: LocaleCode;
  routeSlug: RouteId;
};

export function LanguageSwitcher({
  label,
  currentLocale,
  routeSlug,
}: LanguageSwitcherProps) {
  const router = useRouter();

  function handleLanguageChange(nextLocale: LocaleCode) {
    router.push(`/${nextLocale}/${routeSlug}`);
  }

  return (
    <label className="flex items-center gap-2 rounded-lg border border-[#d8c8b4] bg-white px-3 py-2 text-sm font-semibold text-[#13233a] shadow-sm">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        className="bg-transparent text-sm font-semibold outline-none"
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
