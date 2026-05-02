import type { RouteId } from "./routes";

export type Schedule = {
  id: string;
  from: string;
  to: string;
  direction: RouteId;
  travelTime: string;
  price: string;
  departures: string[];
  nextDeparture: string;
  lastUpdated: string;
  disclaimer: string;
  sourceName: string;
  sourceUrl: string;
  lastVerified: string;
  verificationMethod: "manual";
  confidenceLevel: "sample";
  operatorNote: string;
  isSampleData: boolean;
};

const sampleScheduleSource = {
  sourceName: "Operator website / ticket system",
  sourceUrl: "#",
  lastVerified: "Needs verification",
  verificationMethod: "manual",
  confidenceLevel: "sample",
  operatorNote: "Bus times may change. Confirm before travel.",
  isSampleData: true,
} satisfies Pick<
  Schedule,
  | "sourceName"
  | "sourceUrl"
  | "lastVerified"
  | "verificationMethod"
  | "confidenceLevel"
  | "operatorNote"
  | "isSampleData"
>;

export const schedules: Schedule[] = [
  {
    id: "bangkok-ekkamai-to-pattaya",
    from: "Bangkok Ekkamai",
    to: "Pattaya Bus Station",
    direction: "bangkok-to-pattaya",
    travelTime: "Around 2-3 hours",
    price: "Around 130-150 THB",
    departures: [
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
    ],
    nextDeparture: "14:00",
    lastUpdated: "2026-05-02",
    disclaimer:
      "Bus times may change. Please confirm at the station or with the operator before travel.",
    ...sampleScheduleSource,
  },
  {
    id: "pattaya-to-bangkok-ekkamai",
    from: "Pattaya Bus Station",
    to: "Bangkok Ekkamai",
    direction: "pattaya-to-bangkok",
    travelTime: "Around 2-3 hours",
    price: "Around 130-150 THB",
    departures: [
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
    ],
    nextDeparture: "14:00",
    lastUpdated: "2026-05-02",
    disclaimer:
      "Bus times may change. Please confirm at the station or with the operator before travel.",
    ...sampleScheduleSource,
  },
  {
    id: "suvarnabhumi-airport-to-pattaya",
    from: "Suvarnabhumi Airport",
    to: "Pattaya Bus Station",
    direction: "suvarnabhumi-airport-to-pattaya",
    travelTime: "Around 2-2.5 hours",
    price: "Around 140-180 THB",
    departures: [
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
    ],
    nextDeparture: "14:00",
    lastUpdated: "2026-05-02",
    disclaimer:
      "Bus times may change. Please confirm at the station or with the operator before travel.",
    ...sampleScheduleSource,
  },
];

export function getScheduleByRoute(routeId: RouteId) {
  return schedules.find((schedule) => schedule.direction === routeId);
}
