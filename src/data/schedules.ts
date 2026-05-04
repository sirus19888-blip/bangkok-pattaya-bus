import type { RouteId } from "./routes";

export type VerificationStatus =
  | "partially verified"
  | "needs official confirmation";

export type ScheduleSource = {
  sourceName: string;
  sourceUrl: string;
  sourceType: string;
  lastVerified: string;
  verificationStatus: VerificationStatus;
  fareNote: string;
  operatorNote: string;
  dataQuality: string;
};

export type ScheduleSubRoute = ScheduleSource & {
  id: string;
  label: string;
  from: string;
  to: string;
  departures: string[];
  boardingNote?: string;
};

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
  boardingNote?: string;
  subRoutes?: ScheduleSubRoute[];
} & ScheduleSource;

export const schedules: Schedule[] = [
  {
    id: "bangkok-ekkamai-to-pattaya",
    from: "Bangkok Ekkamai",
    to: "Pattaya Bus Station",
    direction: "bangkok-to-pattaya",
    travelTime: "Around 2-3 hours",
    price: "158 THB per seat",
    departures: [
      "06:00",
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
      "20:00",
      "21:00",
      "22:00",
    ],
    nextDeparture: "14:00",
    lastUpdated: "2026-05-03",
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
    to: "Bangkok Mochit / Ekkamai",
    direction: "pattaya-to-bangkok",
    travelTime: "Around 2-3 hours",
    price: "148-158 THB per seat",
    departures: [
      "04:30",
      "05:00",
      "07:30",
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
      "20:00",
      "22:00",
    ],
    nextDeparture: "14:00",
    lastUpdated: "2026-05-03",
    disclaimer:
      "Bus times may change. Please confirm at the station or with the operator before travel.",
    sourceName: "Pattaya Bus / Roong Reuang Coach",
    sourceUrl: "https://pattayabus.com/",
    sourceType: "official operator website",
    lastVerified: "2026-05-03",
    verificationStatus: "partially verified",
    fareNote:
      "Published fares shown by operator: 158 THB to Mochit and 148 THB to Ekkamai per seat.",
    operatorNote:
      "Bus times may change. Confirm at the station or with the operator before travel.",
    dataQuality: "official source, manual verification",
    subRoutes: [
      {
        id: "pattaya-to-mochit",
        label: "Pattaya to Mochit",
        from: "Pattaya Bus Station",
        to: "Bangkok Mochit",
        sourceName: "Pattaya Bus / Roong Reuang Coach",
        sourceUrl: "https://pattayabus.com/",
        sourceType: "official operator website",
        lastVerified: "2026-05-03",
        verificationStatus: "partially verified",
        fareNote: "Published fare shown by operator: 158 THB per seat.",
        operatorNote:
          "Bus times may change. Confirm at the station or with the operator before travel.",
        dataQuality: "official source, manual verification",
        departures: [
          "05:00",
          "07:30",
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
      },
      {
        id: "pattaya-to-ekkamai",
        label: "Pattaya to Ekkamai",
        from: "Pattaya Bus Station",
        to: "Bangkok Ekkamai",
        sourceName: "Pattaya Bus / Roong Reuang Coach",
        sourceUrl: "https://pattayabus.com/",
        sourceType: "official operator website",
        lastVerified: "2026-05-03",
        verificationStatus: "partially verified",
        fareNote: "Published fare shown by operator: 148 THB per seat.",
        operatorNote:
          "Bus times may change. Confirm at the station or with the operator before travel.",
        dataQuality: "official source, manual verification",
        departures: [
          "04:30",
          "08:00",
          "10:00",
          "12:00",
          "14:00",
          "16:00",
          "17:00",
          "18:00",
          "19:00",
          "20:00",
          "22:00",
        ],
      },
    ],
  },
  {
    id: "suvarnabhumi-airport-to-pattaya",
    from: "Suvarnabhumi Airport",
    to: "Pattaya Bus Station",
    direction: "suvarnabhumi-airport-to-pattaya",
    travelTime: "Around 2-2.5 hours",
    price: "162 THB per seat",
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
      "19:00",
      "20:00",
      "21:00",
      "22:00",
    ],
    nextDeparture: "14:00",
    lastUpdated: "2026-05-03",
    disclaimer:
      "Bus times may change. Please confirm at the station or with the operator before travel.",
    sourceName: "Airport Pattaya Bus",
    sourceUrl: "https://airportpattayabus.com/",
    sourceType: "official operator website",
    lastVerified: "2026-05-03",
    verificationStatus: "partially verified",
    fareNote: "Published fare shown by operator: 162 THB per seat.",
    boardingNote: "Buy ticket at counter service on Level 1, Gate 8.",
    operatorNote:
      "The 22:00 bus goes to North Pattaya bus station, not Jomtien bus terminal. Bus times may change. Confirm before travel.",
    dataQuality: "official source, manual verification",
  },
  {
    id: "pattaya-to-suvarnabhumi-airport",
    from: "Pattaya / Jomtien bus area",
    to: "Suvarnabhumi Airport",
    direction: "pattaya-to-suvarnabhumi-airport",
    travelTime: "Around 2-2.5 hours, depending on traffic",
    price: "Check operator information",
    departures: [],
    nextDeparture: "Schedule needs verification",
    lastUpdated: "Needs verification",
    disclaimer: "Bus times may change. Confirm with the operator before travel.",
    sourceName: "Airport Pattaya Bus",
    sourceUrl: "https://airportpattayabus.com/",
    sourceType: "official operator website",
    lastVerified: "Needs verification",
    verificationStatus: "needs official confirmation",
    fareNote: "Check operator information before travel.",
    operatorNote:
      "Bus times may change. Confirm with the operator before travel.",
    dataQuality: "official source, needs manual schedule verification",
  },
];

export function getScheduleByRoute(routeId: RouteId) {
  return schedules.find((schedule) => schedule.direction === routeId);
}
