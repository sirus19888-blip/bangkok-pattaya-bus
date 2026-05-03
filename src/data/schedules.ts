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
  sourceType: string;
  lastVerified: string;
  verificationStatus: string;
  fareNote: string;
  operatorNote: string;
  dataQuality: string;
};

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
    sourceName: "Pattaya Bus / Roong Reuang Coach",
    sourceUrl: "https://pattayabus.com/",
    sourceType: "official operator website",
    lastVerified: "2026-05-03",
    verificationStatus: "partially verified",
    fareNote: "Published fare shown by operator: 158 THB per seat.",
    operatorNote:
      "Bus times may change. Confirm at the station or with the operator before travel.",
    dataQuality: "official source, manual verification",
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
    sourceName: "BusOnlineTicket / operator ticket listings",
    sourceUrl: "https://www.busonlineticket.co.th/bus/pattaya-bus/",
    sourceType: "ticketing platform",
    lastVerified: "2026-05-03",
    verificationStatus: "needs official confirmation",
    fareNote: "Fare may vary by operator and booking platform.",
    operatorNote:
      "Departure times must be confirmed with the operator before publishing as verified.",
    dataQuality: "secondary source, needs confirmation",
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
    sourceName: "Airport Pattaya Bus",
    sourceUrl: "https://airportpattayabus.com/",
    sourceType: "official operator website",
    lastVerified: "2026-05-03",
    verificationStatus: "partially verified",
    fareNote: "Published fare shown by operator: 162 THB per seat.",
    operatorNote: "Bus times may change. Confirm before travel.",
    dataQuality: "official source, manual verification",
  },
];

export function getScheduleByRoute(routeId: RouteId) {
  return schedules.find((schedule) => schedule.direction === routeId);
}
