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
  price: string;
  departures: string[];
  boardingNote?: string;
};

export type Schedule = {
  id: string;
  from: string;
  to: string;
  direction: RouteId;
  distance: string;
  travelTime: string;
  price: string;
  departures: string[];
  departureWindow?: string;
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
    distance: "150 km",
    travelTime: "Around 2-3 hours, depending on traffic",
    price: "148-158 THB per seat (depends on terminal)",
    departures: [
      "05:00",
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
    nextDeparture: "05:00",
    lastUpdated: "2026-07-01",
    disclaimer:
      "Bus times may change. Please confirm at the station or with the operator before travel.",
    sourceName: "Roong Reuang Coach",
    sourceUrl: "https://airportpattayabus.com/bangkok-terminal-pattaya/",
    sourceType: "official operator website",
    lastVerified: "2026-07-01",
    verificationStatus: "partially verified",
    fareNote:
      "Fares published by the operator: 148 THB from Ekkamai Bus Terminal and 158 THB from Mo Chit 2 Bus Terminal.",
    operatorNote:
      "Bus times may change. Confirm at the station or with the operator before travel.",
    dataQuality: "Official source, manually verified",
    subRoutes: [
      {
        id: "bangkok-ekkamai-to-pattaya",
        label: "Ekkamai Bus Terminal",
        from: "Ekkamai Bus Terminal",
        to: "Pattaya Bus Station",
        price: "148 THB per seat",
        sourceName: "Roong Reuang Coach",
        sourceUrl: "https://airportpattayabus.com/bangkok-terminal-pattaya/",
        sourceType: "official operator website",
        lastVerified: "2026-07-01",
        verificationStatus: "partially verified",
        fareNote: "Fare published by the operator: 148 THB per seat.",
        operatorNote:
          "Bus times may change. Confirm at the station or with the operator before travel.",
        dataQuality: "Official source, manually verified",
        departures: [
          "05:00",
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
      },
      {
        id: "bangkok-mochit-to-pattaya",
        label: "Mo Chit 2 Bus Terminal",
        from: "Mo Chit 2 Bus Terminal",
        to: "Pattaya Bus Station",
        price: "158 THB per seat",
        sourceName: "Roong Reuang Coach",
        sourceUrl: "https://airportpattayabus.com/bangkok-terminal-pattaya/",
        sourceType: "official operator website",
        lastVerified: "2026-07-01",
        verificationStatus: "partially verified",
        fareNote: "Fare published by the operator: 158 THB per seat.",
        operatorNote:
          "Bus times may change. Confirm at the station or with the operator before travel.",
        dataQuality: "Official source, manually verified",
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
      },
    ],
  },
  {
    id: "pattaya-to-bangkok-ekkamai",
    from: "Pattaya Bus Station",
    to: "Bangkok Mochit / Ekkamai",
    direction: "pattaya-to-bangkok",
    distance: "150 km",
    travelTime: "Around 2-3 hours",
    price: "148-158 THB per seat",
    departures: [
      "04:30",
      "05:00",
      "07:30",
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
      "22:00",
    ],
    nextDeparture: "14:00",
    lastUpdated: "2026-07-01",
    disclaimer:
      "Bus times may change. Please confirm at the station or with the operator before travel.",
    sourceName: "Pattaya Bus / Roong Reuang Coach",
    sourceUrl: "https://airportpattayabus.com/bangkok-terminal-pattaya/",
    sourceType: "official operator website",
    lastVerified: "2026-07-01",
    verificationStatus: "partially verified",
    fareNote:
      "Fares published by the operator: 158 THB to Mochit and 148 THB to Ekkamai per seat.",
    operatorNote:
      "Bus times may change. Confirm at the station or with the operator before travel.",
    dataQuality: "Official source, manually verified",
    subRoutes: [
      {
        id: "pattaya-to-mochit",
        label: "Pattaya to Mochit",
        from: "Pattaya Bus Station",
        to: "Bangkok Mochit",
        price: "158 THB per seat",
        sourceName: "Pattaya Bus / Roong Reuang Coach",
        sourceUrl: "https://airportpattayabus.com/bangkok-terminal-pattaya/",
        sourceType: "official operator website",
        lastVerified: "2026-07-01",
        verificationStatus: "partially verified",
        fareNote: "Fare published by the operator: 158 THB per seat.",
        operatorNote:
          "Bus times may change. Confirm at the station or with the operator before travel.",
        dataQuality: "Official source, manually verified",
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
        price: "148 THB per seat",
        sourceName: "Pattaya Bus / Roong Reuang Coach",
        sourceUrl: "https://airportpattayabus.com/bangkok-terminal-pattaya/",
        sourceType: "official operator website",
        lastVerified: "2026-07-01",
        verificationStatus: "partially verified",
        fareNote: "Fare published by the operator: 148 THB per seat.",
        operatorNote:
          "Bus times may change. Confirm at the station or with the operator before travel.",
        dataQuality: "Official source, manually verified",
        departures: [
          "04:30",
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
    distance: "120 km",
    travelTime: "Around 2 hours",
    price: "139 THB per seat",
    departures: [
      "07:30",
      "09:30",
      "11:30",
      "13:30",
      "15:30",
      "17:30",
      "18:30",
    ],
    nextDeparture: "13:30",
    lastUpdated: "2026-07-01",
    disclaimer:
      "Bus times may change. Please confirm at the station or with the operator before travel.",
    sourceName: "Airport Pattaya Bus",
    sourceUrl: "https://airportpattayabus.com/airport-pattaya/",
    sourceType: "official operator website",
    lastVerified: "2026-07-01",
    verificationStatus: "partially verified",
    fareNote: "Fare published by the operator: 139 THB per seat.",
    boardingNote: "Buy ticket at counter service on Level 1, Gate 8.",
    operatorNote:
      "This schedule is for the Suvarnabhumi Airport to Pattaya Bus Station service. Bus times may change. Confirm before travel.",
    dataQuality: "Official source, manually verified",
  },
  {
    id: "pattaya-to-suvarnabhumi-airport",
    from: "Pattaya Bus Station",
    to: "Suvarnabhumi Airport",
    direction: "pattaya-to-suvarnabhumi-airport",
    distance: "120 km",
    travelTime: "Around 2 hours, depending on traffic",
    price: "162 THB per seat",
    departures: [
      "08:00",
      "10:00",
      "12:00",
      "14:00",
      "16:00",
      "18:00",
      "21:00",
    ],
    nextDeparture: "14:00",
    lastUpdated: "2026-07-01",
    disclaimer:
      "Bus times may change. Please confirm at the station or with the operator before travel.",
    sourceName: "Airport Pattaya Bus",
    sourceUrl: "https://airportpattayabus.com/airport-pattaya/",
    sourceType: "official operator website",
    lastVerified: "2026-07-01",
    verificationStatus: "partially verified",
    fareNote: "Fare published by the operator: 162 THB per seat.",
    boardingNote:
      "Tickets are shown by the operator as available at the counter service at Pattaya bus station.",
    operatorNote:
      "Bus times may change. Confirm at the station or with the operator before travel.",
    dataQuality: "Official source, manually verified",
  },
  {
    id: "don-mueang-airport-to-pattaya",
    from: "Don Mueang Airport",
    to: "Pattaya",
    direction: "don-mueang-airport-to-pattaya",
    distance: "155 km",
    travelTime: "Around 3-3.5 hours",
    price: "155 THB per person",
    departures: [],
    departureWindow: "06:30-17:30, every ~4h",
    nextDeparture: "",
    lastUpdated: "2026-07-01",
    disclaimer:
      "Bus times may change. Please confirm at the station or with the operator before travel.",
    sourceName: "Transport Co., Ltd. / Don Mueang Airport",
    sourceUrl:
      "https://donmueang.airportthai.co.th/service/transportation/detail/1290",
    sourceType: "official airport / operator transportation page",
    lastVerified: "2026-07-01",
    verificationStatus: "partially verified",
    fareNote:
      "Fare published by the airport transportation page: 155 THB per person.",
    boardingNote:
      "The airport page shows service counters in Terminal 1 Gate 1 and Terminal 2 Gate 11, with pick-up at Service Hall Building.",
    operatorNote:
      "Official airport information confirms the route, fare, service counters, pick-up point, and service window from 06:30 to 17:30 about every 4 hours, but does not publish exact departure times.",
    dataQuality:
      "Official airport source, manually verified for fare, counters, pick-up point, and service window; exact departure times are not published by the official source.",
  },
  {
    id: "pattaya-to-don-mueang-airport",
    from: "Pattaya Sukhumvit Road Bus Station",
    to: "Don Mueang Airport",
    direction: "pattaya-to-don-mueang-airport",
    distance: "155 km",
    travelTime: "Around 3-3.5 hours",
    price: "Around 170 THB",
    departures: ["07:00", "10:00", "14:30", "17:00"],
    nextDeparture: "10:00",
    lastUpdated: "2026-07-01",
    disclaimer:
      "Bus times may change. Please confirm at the station or with the operator before travel.",
    sourceName: "Transport Co. via secondary sources",
    sourceUrl:
      "https://thailandlife.info/travel-from-pattaya-to-don-mueang-airport/",
    sourceType: "secondary booking / travel sources",
    lastVerified: "2026-07-01",
    verificationStatus: "partially verified",
    fareNote: "Secondary source fare shown: around 170 THB per person.",
    boardingNote:
      "Secondary sources point to Pattaya Sukhumvit Road Bus Station. Confirm the exact Pattaya boarding point before travel.",
    operatorNote:
      "Schedule based on secondary booking/travel sources. Confirm with the operator or station before travel.",
    dataQuality: "secondary sources, needs official operator confirmation",
  },
];

export function getScheduleByRoute(routeId: RouteId) {
  return schedules.find((schedule) => schedule.direction === routeId);
}
