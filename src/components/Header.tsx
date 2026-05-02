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
    <header className="flex items-center justify-between gap-4">
      <a href="#top" className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#13233a] text-lg font-black text-white shadow-sm">
          BP
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-bold uppercase tracking-wide text-[#13233a]">
            {labels.brandPrimary}
          </span>
          <span className="block text-xs font-semibold text-[#5f6874]">
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
