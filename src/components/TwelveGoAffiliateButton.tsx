import {
  AffiliateCTA,
  type AffiliateCTAPosition,
  type AffiliateCTAVariant,
} from "@/components/AffiliateCTA";
import type { LocaleCode, RouteId } from "@/data/routes";
import {
  build12GoRouteUrl,
  getAffiliateRoute,
  hasTwelveGoTickets,
} from "@/lib/twelveGo";
import { getUiTranslations } from "@/lib/uiTranslations";

export type TwelveGoAffiliateButtonProps = {
  ariaLabel?: string;
  className?: string;
  ctaPosition?: AffiliateCTAPosition;
  disclosureMode?: "full" | "short" | "none";
  label?: string;
  locale: LocaleCode;
  routeId: RouteId;
  travelDate?: string;
  variant?: AffiliateCTAVariant;
  wrapperClassName?: string;
};

export function getTwelveGoButtonLabel(locale: LocaleCode) {
  return getUiTranslations(locale).affiliate.variantLabels.afterSchedule;
}

export function getTwelveGoVariantLabel(
  variant: AffiliateCTAVariant,
  locale: LocaleCode = "en",
) {
  return getUiTranslations(locale).affiliate.variantLabels[variant];
}

export function getTwelveGoDisclosure(locale: LocaleCode) {
  return getUiTranslations(locale).affiliate.disclosure;
}

export function TwelveGoAffiliateButton({
  ariaLabel,
  className,
  ctaPosition,
  disclosureMode,
  label,
  locale,
  routeId,
  travelDate,
  variant = "top",
  wrapperClassName,
}: TwelveGoAffiliateButtonProps) {
  const affiliateUrl = build12GoRouteUrl(
    routeId,
    locale,
    ctaPosition,
    undefined,
    travelDate,
  );
  const affiliateRoute = getAffiliateRoute(routeId, locale);
  const affiliateText = getUiTranslations(locale).affiliate;
  const subId = ctaPosition
    ? `${affiliateRoute?.subId}-${ctaPosition}`
    : affiliateRoute?.subId;

  if (!hasTwelveGoTickets(routeId) || !affiliateUrl) {
    return null;
  }

  return (
    <AffiliateCTA
      ariaLabel={ariaLabel}
      className={className}
      ctaPosition={ctaPosition}
      disclosureMode={disclosureMode}
      disclosureText={affiliateText.disclosure}
      href={affiliateUrl}
      label={label ?? getTwelveGoVariantLabel(variant, locale)}
      lang={locale}
      provider="12go"
      routeId={routeId}
      from={affiliateRoute?.from ?? ""}
      shortDisclosureText={affiliateText.shortDisclosure}
      subId={subId}
      to={affiliateRoute?.to ?? ""}
      variant={variant}
      wrapperClassName={wrapperClassName}
    />
  );
}
