"use client";

import {
  TwelveGoAffiliateButton,
  type TwelveGoAffiliateButtonProps,
} from "@/components/TwelveGoAffiliateButton";
import { useTravelDateValue } from "@/components/TravelDateContext";

export function TravelDateAwareTwelveGoAffiliateButton(
  props: TwelveGoAffiliateButtonProps,
) {
  const travelDate = useTravelDateValue();

  return (
    <TwelveGoAffiliateButton
      {...props}
      travelDate={travelDate || undefined}
    />
  );
}
