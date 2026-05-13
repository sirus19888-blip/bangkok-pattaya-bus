export const ADS_ENABLED = process.env.NEXT_PUBLIC_ENABLE_ADS === "true";

export const AD_SLOT_IDS = {
  afterFaq: "after-faq",
  afterSchedule: "after-schedule",
  afterStationInformation: "after-station-information",
} as const;

export type AdSlotId = (typeof AD_SLOT_IDS)[keyof typeof AD_SLOT_IDS];
