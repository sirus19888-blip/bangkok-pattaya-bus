import {
  AffiliateCTA,
  type AffiliateCTAVariant,
} from "@/components/AffiliateCTA";
import type { LocaleCode, RouteId } from "@/data/routes";
import {
  build12GoRouteUrl,
  getAffiliateRoute,
  hasTwelveGoTickets,
} from "@/lib/twelveGo";

type TwelveGoAffiliateButtonProps = {
  className?: string;
  label?: string;
  locale: LocaleCode;
  routeId: RouteId;
  variant?: AffiliateCTAVariant;
};

const labels: Record<LocaleCode, string> = {
  de: "Tickets und Alternativen auf 12Go",
  en: "Tickets and alternatives on 12Go",
  fr: "Billets et alternatives sur 12Go",
  pl: "Bilety i alternatywy na 12Go",
  ru: "Билеты и альтернативы на 12Go",
  th: "ตั๋วและทางเลือกอื่นบน 12Go",
  zh: "12Go 车票和其他选择",
};

const disclosures: Record<LocaleCode, string> = {
  de: "12Go-Optionen können von den hier gezeigten informativen Zeiten abweichen.",
  en: "Some booking links may be affiliate links. This does not affect the timetable information. 12Go options may differ from the informational times shown here.",
  fr: "Les options sur 12Go peuvent différer des horaires informatifs affichés ici.",
  pl: "Niektóre linki do rezerwacji mogą być linkami afiliacyjnymi. Nie wpływa to na informacje o rozkładzie. Opcje na 12Go mogą różnić się od informacyjnych godzin pokazanych tutaj.",
  ru: "Варианты на 12Go могут отличаться от информационного расписания на этой странице.",
  th: "ตัวเลือกบน 12Go อาจแตกต่างจากเวลาข้อมูลที่แสดงบนหน้านี้",
  zh: "12Go 上的选择可能与本页显示的参考时刻不同。",
};

export function getTwelveGoButtonLabel(locale: LocaleCode) {
  return labels[locale] ?? labels.en;
}

export function getTwelveGoDisclosure(locale: LocaleCode) {
  return disclosures[locale] ?? disclosures.en;
}

export function TwelveGoAffiliateButton({
  className,
  label,
  locale,
  routeId,
  variant = "top",
}: TwelveGoAffiliateButtonProps) {
  const affiliateUrl = build12GoRouteUrl(routeId, locale);
  const affiliateRoute = getAffiliateRoute(routeId, locale);

  if (!hasTwelveGoTickets(routeId) || !affiliateUrl) {
    return null;
  }

  return (
    <AffiliateCTA
      className={className}
      href={affiliateUrl}
      label={label ?? getTwelveGoButtonLabel(locale)}
      lang={locale}
      provider="12go"
      routeId={routeId}
      from={affiliateRoute?.from ?? ""}
      subId={affiliateRoute?.subId}
      to={affiliateRoute?.to ?? ""}
      variant={variant}
    />
  );
}
