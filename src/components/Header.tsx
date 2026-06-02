import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { HeaderTravelInfo } from "./HeaderTravelInfo";
import type { LocaleCode, RouteId } from "@/data/routes";
import type { Translations } from "@/lib/i18n";

type HeaderProps = {
  labels: Translations["app"] & {
    chooseLanguage: string;
  };
  currentLocale: LocaleCode;
  routeSlug?: RouteId;
  showDesktopRouteIcons?: boolean;
  showDesktopHomeIcons?: boolean;
};

export function Header({
  labels,
  currentLocale,
  routeSlug,
  showDesktopRouteIcons = false,
  showDesktopHomeIcons = false,
}: HeaderProps) {
  const hasDesktopFeatureBackground =
    showDesktopHomeIcons || showDesktopRouteIcons;

  return (
    <header
      className={`relative flex flex-wrap items-center justify-between gap-3 rounded-xl border px-3 py-2.5 shadow-sm sm:px-4 sm:py-3 ${
        showDesktopRouteIcons ? "overflow-visible md:overflow-hidden" : "overflow-hidden"
      } ${
        hasDesktopFeatureBackground
          ? "border-[#13233a]/25 bg-[#13233a] bg-cover bg-center"
          : "border-[#eadcc7] bg-white/90"
      }`}
    >
      <Link href={`/${currentLocale}`} className="relative z-10 flex min-h-11 min-w-0 items-center gap-3">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-black shadow-sm sm:h-10 sm:w-10 sm:text-base ${
          hasDesktopFeatureBackground
            ? "bg-white/95 text-[#13233a]"
            : "bg-[#13233a] text-white"
        }`}>
          {currentLocale === "th" ? "รถ" : "BP"}
        </span>
        <span className="min-w-0 leading-tight">
          <span className={`block truncate text-xs font-bold uppercase tracking-wide sm:text-sm ${
            hasDesktopFeatureBackground ? "text-white" : "text-[#13233a]"
          }`}>
            {labels.brandPrimary}
          </span>
          <span className={`block truncate text-[0.7rem] font-semibold sm:text-xs ${
            hasDesktopFeatureBackground ? "text-[#f3d77b]" : "text-[#5f6874]"
          }`}>
            {labels.brandSecondary}
          </span>
        </span>
      </Link>

      <div className="relative z-10 ml-auto flex min-w-0 flex-wrap items-center justify-end gap-2">
        <HeaderTravelInfo
          locale={currentLocale}
          routeSlug={routeSlug ?? "bangkok-to-pattaya"}
          variant={
            showDesktopHomeIcons
              ? "desktopHome"
              : showDesktopRouteIcons
                ? "routeDesktop"
                : "default"
          }
        />
        <LanguageSwitcher
          label={labels.chooseLanguage}
          currentLocale={currentLocale}
          routeSlug={routeSlug}
        />
      </div>
    </header>
  );
}
