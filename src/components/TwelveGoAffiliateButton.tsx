import type { LocaleCode, RouteId } from "@/data/routes";
import { build12GoRouteUrl, hasTwelveGoTickets } from "@/lib/twelveGo";

type TwelveGoAffiliateButtonProps = {
  className?: string;
  label?: string;
  locale: LocaleCode;
  routeId: RouteId;
};

const labels: Record<LocaleCode, string> = {
  de: "Auf 12Go buchen",
  en: "Book on 12Go",
  fr: "Réserver sur 12Go",
  pl: "Sprawdź bilety na 12Go",
  ru: "Билеты на 12Go",
  th: "จองบน 12Go",
  zh: "在 12Go 订票",
};

export function getTwelveGoButtonLabel(locale: LocaleCode) {
  return labels[locale] ?? labels.en;
}

export function TwelveGoAffiliateButton({
  className = "",
  label,
  locale,
  routeId,
}: TwelveGoAffiliateButtonProps) {
  if (!hasTwelveGoTickets(routeId)) {
    return null;
  }

  return (
    <a
      aria-label={label ?? getTwelveGoButtonLabel(locale)}
      className={className}
      href={build12GoRouteUrl(routeId)}
      rel="noopener noreferrer sponsored"
    >
      {label ?? getTwelveGoButtonLabel(locale)}
    </a>
  );
}
