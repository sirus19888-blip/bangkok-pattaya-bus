import { LanguageSwitcher } from "./LanguageSwitcher";
import type { LocaleCode, RouteId } from "@/data/routes";
import type { Translations } from "@/lib/i18n";

type HeaderProps = {
  labels: Translations["app"] & {
    chooseLanguage: string;
  };
  currentLocale: LocaleCode;
  routeSlug: RouteId;
};

export function Header({ labels, currentLocale, routeSlug }: HeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3 rounded-xl border border-[#eadcc7] bg-white/90 px-3 py-2.5 shadow-sm sm:px-4 sm:py-3">
      <a href="#top" className="flex min-w-0 items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#13233a] text-sm font-black text-white shadow-sm sm:h-10 sm:w-10 sm:text-base">
          {currentLocale === "th" ? "รถ" : "BP"}
        </span>
        <span className="min-w-0 leading-tight">
          <span className="block truncate text-xs font-bold uppercase tracking-wide text-[#13233a] sm:text-sm">
            {labels.brandPrimary}
          </span>
          <span className="block truncate text-[0.7rem] font-semibold text-[#5f6874] sm:text-xs">
            {labels.brandSecondary}
          </span>
        </span>
      </a>

      <LanguageSwitcher
        label={labels.chooseLanguage}
        currentLocale={currentLocale}
        routeSlug={routeSlug}
      />
    </header>
  );
}
