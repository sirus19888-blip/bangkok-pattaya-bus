import type { RouteId } from "@/data/routes";

export type SeoTransportOption = {
  title: string;
  price: string;
  duration: string;
  bestFor: string;
  note: string;
};

export type SeoFaq = {
  question: string;
  answer: string;
};

export type RouteSeoPage = {
  slug: RouteId;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
  ogImage: string;
  keywords: string[];
  cheapestWay: string;
  fastestWay: string;
  bestWithLuggage: string;
  legalBoarding: string;
  estimatedPrices: string[];
  safetyTips: string[];
  options: SeoTransportOption[];
  faq: SeoFaq[];
};

export const routeSeoPages: RouteSeoPage[] = [
  {
    slug: "bangkok-to-pattaya",
    seoTitle:
      "Bangkok to Pattaya Transport Guide | Bus, Taxi, Grab & Station Tips",
    seoDescription:
      "Compare Bangkok to Pattaya bus, taxi, Grab, Bolt, inDrive and private transfer options with prices, travel time, station tips and safety advice.",
    h1: "Bangkok to Pattaya Transport Guide",
    intro:
      "Compare the main ways to travel from Bangkok to Pattaya, including the Ekkamai bus, taxi, app-based rides and private transfer options. Bus schedule data on this site is informational and should be confirmed before travel.",
    ogImage: "/images/stations/ekkamai/ekkamai-terminal.jpg",
    keywords: [
      "Bangkok to Pattaya transport",
      "Bangkok to Pattaya bus",
      "Bangkok to Pattaya taxi price",
      "Bangkok to Pattaya Grab price",
      "Ekkamai to Pattaya bus",
    ],
    cheapestWay:
      "The scheduled bus from Ekkamai is usually the cheapest practical option for solo travelers.",
    fastestWay:
      "A private taxi or app-based car can be fastest door-to-door, but Bangkok traffic can change the journey time.",
    bestWithLuggage:
      "Taxi, Grab, Bolt, inDrive or a private transfer is usually easier if you have large luggage or travel as a group.",
    legalBoarding:
      "For the main bus route, use Ekkamai Bus Terminal and buy tickets at the official counter. Avoid unofficial drivers around terminals.",
    estimatedPrices: [
      "Bus: around 148 THB per seat from Ekkamai, based on operator information.",
      "Private taxi or transfer: commonly advertised around 1,200-2,000 THB depending on pickup point, vehicle and provider.",
      "Grab, Bolt and inDrive: app prices vary by traffic, demand, tolls and driver availability. Check the app before booking.",
    ],
    safetyTips: [
      "Arrive 20-30 minutes before bus departure.",
      "Use official ticket counters or trusted booking platforms.",
      "For app rides, match the license plate and car model before entering.",
      "Confirm tolls, luggage and final price before a long taxi ride.",
    ],
    options: [
      {
        title: "Bus from Ekkamai",
        price: "148 THB per seat",
        duration: "Around 2-3 hours",
        bestFor: "Budget travelers",
        note: "Cheap and simple if you are staying near Sukhumvit or BTS.",
      },
      {
        title: "Grab, Bolt or inDrive",
        price: "Estimated in app",
        duration: "Around 2-3 hours",
        bestFor: "Door-to-door travel",
        note: "Final price may change with traffic, demand, tolls and pickup point.",
      },
      {
        title: "Private taxi or transfer",
        price: "Estimated 1,200-2,000+ THB",
        duration: "Around 2-3 hours",
        bestFor: "Luggage and groups",
        note: "Use a clear fixed quote and confirm tolls before travel.",
      },
    ],
    faq: [
      {
        question: "What is the cheapest way from Bangkok to Pattaya?",
        answer:
          "The bus from Ekkamai is usually the cheapest practical option for most tourists.",
      },
      {
        question: "How much is a taxi from Bangkok to Pattaya?",
        answer:
          "Private taxi and transfer prices are commonly advertised around 1,200-2,000+ THB depending on pickup point, vehicle, tolls and provider. Always confirm the final price before travel.",
      },
      {
        question: "Can I use Grab, Bolt or inDrive from Bangkok to Pattaya?",
        answer:
          "Yes, app-based rides may be available, but prices and driver availability vary. Check the app before relying on it.",
      },
    ],
  },
  {
    slug: "pattaya-to-bangkok",
    seoTitle:
      "Pattaya to Bangkok Transport Guide | Bus to Ekkamai, Mo Chit & Taxi",
    seoDescription:
      "Compare Pattaya to Bangkok bus, taxi, Grab, Bolt, inDrive and private transfer options with prices, travel time and station tips.",
    h1: "Pattaya to Bangkok Transport Guide",
    intro:
      "Plan the return trip from Pattaya to Bangkok with bus departures to Ekkamai and Mo Chit, plus taxi and app-based alternatives.",
    ogImage: "/images/stations/pattaya-north/pattaya-station.jpg",
    keywords: [
      "Pattaya to Bangkok transport",
      "Pattaya to Bangkok bus",
      "Pattaya to Ekkamai bus",
      "Pattaya to Mo Chit bus",
      "Pattaya to Bangkok taxi",
    ],
    cheapestWay:
      "The scheduled bus is usually the cheapest option, especially for solo travelers.",
    fastestWay:
      "A taxi or private transfer can be faster door-to-door if traffic is light.",
    bestWithLuggage:
      "Use a taxi, Grab, Bolt, inDrive or private transfer if you have heavy bags or need hotel pickup.",
    legalBoarding:
      "Use the Pattaya bus station or confirmed operator boarding point. Check whether your bus goes to Ekkamai or Mo Chit before buying.",
    estimatedPrices: [
      "Bus: around 148-158 THB per seat depending on destination.",
      "Private taxi or transfer: commonly advertised around 1,200-2,000+ THB depending on provider and drop-off point.",
      "Grab, Bolt and inDrive: app prices vary by traffic, demand and pickup point.",
    ],
    safetyTips: [
      "Confirm Ekkamai or Mo Chit before buying the ticket.",
      "Leave extra time when traveling to Bangkok before a flight or appointment.",
      "Avoid unofficial driver offers if the price is unclear.",
    ],
    options: [
      {
        title: "Bus to Ekkamai or Mo Chit",
        price: "148-158 THB per seat",
        duration: "Around 2-3 hours",
        bestFor: "Budget travel",
        note: "Confirm the Bangkok terminal before buying your ticket.",
      },
      {
        title: "Grab, Bolt or inDrive",
        price: "Estimated in app",
        duration: "Around 2-3 hours",
        bestFor: "Hotel pickup",
        note: "Availability and price can change quickly in Pattaya.",
      },
      {
        title: "Private taxi or transfer",
        price: "Estimated 1,200-2,000+ THB",
        duration: "Around 2-3 hours",
        bestFor: "Families and luggage",
        note: "Confirm destination, tolls and final fare before departure.",
      },
    ],
    faq: [
      {
        question: "Can I travel from Pattaya to Ekkamai or Mo Chit?",
        answer:
          "Yes. Current route information includes services to Ekkamai and Mo Chit. Confirm the destination before buying your ticket.",
      },
      {
        question: "How long is Pattaya to Bangkok by bus?",
        answer:
          "The journey usually takes around 2-3 hours, depending on traffic and the Bangkok terminal.",
      },
      {
        question: "Is taxi easier than the bus from Pattaya to Bangkok?",
        answer:
          "Taxi or private transfer is usually easier with luggage or hotel pickup, but it costs much more than the bus.",
      },
    ],
  },
  {
    slug: "suvarnabhumi-airport-to-pattaya",
    seoTitle:
      "Suvarnabhumi Airport to Pattaya Transport | Bus, Taxi & Transfer",
    seoDescription:
      "Compare Suvarnabhumi Airport to Pattaya bus, taxi, Grab, Bolt and private transfer options with prices, travel time and airport counter tips.",
    h1: "Suvarnabhumi Airport to Pattaya Transport Guide",
    intro:
      "Compare the airport bus from Suvarnabhumi to Pattaya with taxi, app-based rides and private transfers after arriving in Thailand.",
    ogImage: "/images/stations/suvarnabhumi/suvarnabhumi-bus-area.jpg",
    keywords: [
      "Suvarnabhumi Airport to Pattaya",
      "BKK Airport to Pattaya bus",
      "Suvarnabhumi to Pattaya taxi price",
      "airport bus to Pattaya",
    ],
    cheapestWay:
      "The airport bus is usually the cheapest direct option from Suvarnabhumi to Pattaya.",
    fastestWay:
      "Taxi or private transfer is usually fastest door-to-door after baggage claim.",
    bestWithLuggage:
      "Taxi or private transfer is easiest with large luggage, late arrival or family travel.",
    legalBoarding:
      "Current route data points travelers to the bus counter on Level 1 near Gate 8. Confirm signs and counter information after arrival.",
    estimatedPrices: [
      "Airport bus: 139 THB per seat, based on operator information.",
      "Private taxi or transfer: commonly advertised from around 1,199 THB and higher depending on vehicle and provider.",
      "Grab, Bolt and inDrive: prices vary by airport pickup rules, demand, traffic and tolls.",
    ],
    safetyTips: [
      "Allow time for immigration and baggage claim.",
      "Confirm the bus counter before buying a ticket.",
      "For taxis, use official queues, app rides or a trusted pre-booked transfer.",
    ],
    options: [
      {
        title: "Airport bus",
        price: "139 THB per seat",
        duration: "Around 2 hours",
        bestFor: "Low-cost direct travel",
        note: "Confirm counter and destination before buying the ticket.",
      },
      {
        title: "Taxi or app ride",
        price: "Estimated in app or queue",
        duration: "Around 1.5-2.5 hours",
        bestFor: "Late arrivals",
        note: "Airport pickup rules, tolls and traffic can affect the final price.",
      },
      {
        title: "Private transfer",
        price: "Estimated 1,199+ THB",
        duration: "Around 1.5-2.5 hours",
        bestFor: "Families and luggage",
        note: "Useful when arriving late or traveling with bags.",
      },
    ],
    faq: [
      {
        question: "Where is the bus counter at Suvarnabhumi Airport?",
        answer:
          "Current route data says the bus counter is on Level 1 near Gate 8. Check airport signs and confirm at the counter after arrival.",
      },
      {
        question: "How much is the airport bus to Pattaya?",
        answer:
          "The published operator fare shown in the app data is 139 THB per seat. Confirm before travel.",
      },
      {
        question: "Should I book taxi instead after a long flight?",
        answer:
          "Taxi or private transfer is easier with luggage, late arrival or family travel, but it costs more than the bus.",
      },
    ],
  },
  {
    slug: "pattaya-to-suvarnabhumi-airport",
    seoTitle:
      "Pattaya to Suvarnabhumi Airport Transport | Bus, Taxi & Flight Tips",
    seoDescription:
      "Compare Pattaya to Suvarnabhumi Airport bus, taxi and transfer options with travel time, prices, boarding notes and flight safety tips.",
    h1: "Pattaya to Suvarnabhumi Airport Transport Guide",
    intro:
      "Plan travel from Pattaya or Jomtien to Suvarnabhumi Airport with airport bus information and alternatives for flights.",
    ogImage: "/images/stations/pattaya-sukhumvit/pattaya-sukhumvit-road.jpg",
    keywords: [
      "Pattaya to Suvarnabhumi Airport",
      "Pattaya to BKK airport bus",
      "Pattaya to Suvarnabhumi taxi",
      "Jomtien airport bus",
    ],
    cheapestWay:
      "The airport bus is usually the cheapest direct option if the departure time fits your flight.",
    fastestWay:
      "Taxi or private transfer can be faster and safer for tight flight connections.",
    bestWithLuggage:
      "Taxi or private transfer is usually easier with luggage or early morning flights.",
    legalBoarding:
      "The operator shows tickets as available at the counter service at Jomtien bus station. Confirm the exact boarding point before travel.",
    estimatedPrices: [
      "Airport bus: 162 THB per seat, based on operator information.",
      "Private taxi or transfer: commonly advertised around 1,199-2,000+ THB depending on provider and vehicle.",
      "Grab, Bolt and inDrive: app prices vary by demand, traffic, tolls and pickup point.",
    ],
    safetyTips: [
      "Do not rely on the last possible bus before a flight.",
      "Leave extra time for traffic and airport check-in.",
      "Confirm luggage rules and boarding point before travel.",
    ],
    options: [
      {
        title: "Airport bus from Pattaya/Jomtien",
        price: "162 THB per seat",
        duration: "Around 2 hours",
        bestFor: "Budget airport travel",
        note: "Best when you have enough time before your flight.",
      },
      {
        title: "Taxi or app ride",
        price: "Estimated in app",
        duration: "Around 1.5-2.5 hours",
        bestFor: "Flight connections",
        note: "Prices vary and tolls may apply.",
      },
      {
        title: "Private transfer",
        price: "Estimated 1,199-2,000+ THB",
        duration: "Around 1.5-2.5 hours",
        bestFor: "Early flights and luggage",
        note: "Confirm pickup time, vehicle and final price.",
      },
    ],
    faq: [
      {
        question: "Should I leave extra time before my flight?",
        answer:
          "Yes. Leave a generous buffer for traffic, check-in, baggage and security. Avoid relying on the last possible bus.",
      },
      {
        question: "Where do I board the airport bus in Pattaya?",
        answer:
          "The operator shows counter service at Jomtien bus station. Confirm the exact boarding point before travel.",
      },
      {
        question: "Is taxi better than bus before a flight?",
        answer:
          "Taxi or private transfer is more flexible, especially for early flights or heavy luggage, but it costs more.",
      },
    ],
  },
  {
    slug: "don-mueang-airport-to-pattaya",
    seoTitle:
      "Don Mueang Airport to Pattaya Transport | Bus, Taxi & Transfer",
    seoDescription:
      "Compare Don Mueang Airport to Pattaya bus, taxi and transfer options with travel time, source status, prices and airport travel tips.",
    h1: "Don Mueang Airport to Pattaya Transport Guide",
    intro:
      "Compare Transport Co. bus information from Don Mueang Airport to Pattaya with taxi, app-based rides and private transfer options.",
    ogImage: "/images/stations/don-mueang/don-mueang-terminal-1.jpg",
    keywords: [
      "Don Mueang Airport to Pattaya",
      "DMK to Pattaya bus",
      "Don Mueang to Pattaya taxi",
      "Pattaya Don Mueang airport transfer",
    ],
    cheapestWay:
      "The bus can be the cheapest option when the official schedule fits your arrival time.",
    fastestWay:
      "Taxi or private transfer is usually fastest door-to-door from Don Mueang.",
    bestWithLuggage:
      "Taxi, app ride or private transfer is easier with luggage after a flight.",
    legalBoarding:
      "Use airport transportation information and confirm the exact airport boarding point after arrival.",
    estimatedPrices: [
      "Bus: around 170 THB or check operator information, depending on source availability.",
      "Private taxi or transfer: commonly advertised from around 1,499 THB and higher for Don Mueang to Pattaya.",
      "Grab, Bolt and inDrive: prices vary by airport pickup rules, demand, traffic and tolls.",
    ],
    safetyTips: [
      "Confirm the boarding point at the airport before leaving arrivals.",
      "Leave time for baggage, airport navigation and Bangkok traffic.",
      "For taxi or app rides, confirm tolls and final price before departure.",
    ],
    options: [
      {
        title: "Transport Co. bus",
        price: "Around 170 THB / check operator",
        duration: "Around 3-3.5 hours",
        bestFor: "Budget travelers",
        note: "Schedule is based on official airport/operator information and should be confirmed.",
      },
      {
        title: "Taxi or app ride",
        price: "Estimated in app or quote",
        duration: "Around 2.5-3.5 hours",
        bestFor: "Airport arrivals",
        note: "Traffic across Bangkok can be unpredictable.",
      },
      {
        title: "Private transfer",
        price: "Estimated 1,499+ THB",
        duration: "Around 2.5-3.5 hours",
        bestFor: "Luggage and families",
        note: "Confirm pickup point, vehicle and tolls.",
      },
    ],
    faq: [
      {
        question: "Is there a bus from Don Mueang Airport to Pattaya?",
        answer:
          "Current route data includes Transport Co. information from Don Mueang Airport to Pattaya. Confirm the schedule before travel.",
      },
      {
        question: "How long is Don Mueang Airport to Pattaya?",
        answer:
          "Travel time is usually around 3-3.5 hours by bus or road transfer, depending on traffic.",
      },
      {
        question: "Is taxi easier from Don Mueang to Pattaya?",
        answer:
          "Taxi or private transfer is usually easier with luggage or late arrival, but it costs much more than the bus.",
      },
    ],
  },
  {
    slug: "pattaya-to-don-mueang-airport",
    seoTitle:
      "Pattaya to Don Mueang Airport Transport | Bus, Taxi & Flight Tips",
    seoDescription:
      "Compare Pattaya to Don Mueang Airport bus, taxi and transfer options with prices, travel time, source status and flight safety tips.",
    h1: "Pattaya to Don Mueang Airport Transport Guide",
    intro:
      "Plan the route from Pattaya to Don Mueang Airport with bus information from secondary sources and safer alternatives before a flight.",
    ogImage: "/images/stations/pattaya-sukhumvit/pattaya-sukhumvit-road.jpg",
    keywords: [
      "Pattaya to Don Mueang Airport",
      "Pattaya to DMK bus",
      "Pattaya to Don Mueang taxi",
      "Pattaya airport transfer",
    ],
    cheapestWay:
      "The bus can be the cheapest option, but this route should be confirmed carefully before travel.",
    fastestWay:
      "Taxi or private transfer is usually the most flexible option before a flight.",
    bestWithLuggage:
      "Taxi, app ride or private transfer is best with luggage or early flights.",
    legalBoarding:
      "Confirm the exact Pattaya boarding point before travel. Current data points to Pattaya Sukhumvit Road Bus Station / related Pattaya bus area information.",
    estimatedPrices: [
      "Bus: around 170 THB based on secondary references; confirm with the operator or station.",
      "Private taxi or transfer: commonly advertised from around 1,499 THB and higher for Don Mueang airport routes.",
      "Grab, Bolt and inDrive: prices vary by demand, pickup point, traffic and tolls.",
    ],
    safetyTips: [
      "Do not plan the last possible departure before a flight.",
      "Confirm the exact station and destination before travel.",
      "Use a clear fixed quote if booking a private car.",
    ],
    options: [
      {
        title: "Bus to Don Mueang Airport",
        price: "Around 170 THB / confirm",
        duration: "Around 3-3.5 hours",
        bestFor: "Flexible travelers",
        note: "Data is based on secondary sources and needs confirmation before relying on it.",
      },
      {
        title: "Taxi or app ride",
        price: "Estimated in app or quote",
        duration: "Around 2.5-3.5 hours",
        bestFor: "Flights and luggage",
        note: "Final price may change with traffic, tolls and demand.",
      },
      {
        title: "Private transfer",
        price: "Estimated 1,499+ THB",
        duration: "Around 2.5-3.5 hours",
        bestFor: "Early flights",
        note: "Confirm pickup time and allow a generous flight buffer.",
      },
    ],
    faq: [
      {
        question: "Are Pattaya to Don Mueang bus times confirmed?",
        answer:
          "This route is partially verified with secondary sources. Confirm with the operator or station before relying on the schedule.",
      },
      {
        question: "Should I take a taxi before a flight from Don Mueang?",
        answer:
          "Taxi or private transfer is safer for tight flight connections, but it costs more than the bus.",
      },
      {
        question: "How long is Pattaya to Don Mueang Airport?",
        answer:
          "Plan for around 3-3.5 hours by road, and add extra time for traffic, check-in and security.",
      },
    ],
  },
];

export function getRouteSeoPage(slug: string) {
  return routeSeoPages.find((page) => page.slug === slug);
}
