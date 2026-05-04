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
  const localeLabels =
    currentLocale === "ru"
      ? {
          en: "АНГ",
          th: "ТАЙ",
          zh: "КИТ",
          ru: "РУ",
          de: "НЕМ",
          fr: "ФР",
          pl: "ПОЛ",
        }
      : null;

  function handleLanguageChange(nextLocale: LocaleCode) {
    router.push(`/${nextLocale}/${routeSlug}`);
  }

  return (
    <label className="flex h-10 shrink-0 items-center gap-2 rounded-lg border border-[#d8c8b4] bg-[#fffaf2] px-2.5 text-sm font-semibold text-[#13233a]">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        className="h-full bg-transparent text-sm font-semibold outline-none"
        value={currentLocale}
        onChange={(event) =>
          handleLanguageChange(event.target.value as LocaleCode)
        }
      >
        {supportedLocales.map((locale) => (
          <option key={locale.code} value={locale.code}>
            {localeLabels?.[locale.code] ?? locale.code.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}
