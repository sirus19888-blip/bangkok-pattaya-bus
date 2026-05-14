import type { RouteId } from "@/data/routes";

export type SeoGuideSource = {
  label: string;
  url: string;
};

export type SeoGuideFaq = {
  question: string;
  answer: string;
};

export type SeoGuide = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  routeId: RouteId;
  routeLinkLabel: string;
  ctaLabel: string;
  lastUpdated: string;
  keyPoints: string[];
  sections: {
    title: string;
    body: string;
  }[];
  faq: SeoGuideFaq[];
  sources: SeoGuideSource[];
};

export const seoGuides: SeoGuide[] = [
  {
    slug: "ekkamai-bus-terminal-to-pattaya-guide",
    title: "Ekkamai Bus Terminal to Pattaya Guide | Bus Times & Station Tips",
    description:
      "Practical guide to taking the bus from Ekkamai Bus Terminal in Bangkok to Pattaya, with ticket tips, station notes, schedule links and sources.",
    h1: "Ekkamai Bus Terminal to Pattaya Guide",
    intro:
      "Ekkamai Bus Terminal is one of the easiest Bangkok departure points for tourists going to Pattaya. This guide explains where to go, what to check before buying a ticket, and how to use the current Bangkok to Pattaya route page.",
    routeId: "bangkok-to-pattaya",
    routeLinkLabel: "Open Bangkok to Pattaya bus times",
    ctaLabel: "Compare Bangkok to Pattaya tickets",
    lastUpdated: "2026-05-14",
    keyPoints: [
      "Use Ekkamai Bus Terminal if you are staying near Sukhumvit or BTS Ekkamai.",
      "Current route data shows the Ekkamai fare as 148 THB, while Mo Chit to Pattaya is 158 THB.",
      "Arrive 20-30 minutes before departure so you have time to buy a ticket and find the platform.",
    ],
    sections: [
      {
        title: "Where to board",
        body: "Go to Ekkamai Bus Terminal, close to BTS Ekkamai. Buy your ticket from the official counter and confirm the platform before boarding. Avoid unofficial driver offers outside the terminal if the price or destination is unclear.",
      },
      {
        title: "When to use this route",
        body: "This is a good route for solo travelers, couples and tourists staying around Sukhumvit. If you have very large luggage or need hotel pickup, compare bus tickets with taxi or private transfer alternatives before you go.",
      },
      {
        title: "Before you travel",
        body: "Bus times can change. Check the latest route page, then confirm at the counter or with the operator before travel. Keep small cash ready because some bus counters may not accept cards.",
      },
    ],
    faq: [
      {
        question: "Is Ekkamai the best bus terminal for Pattaya?",
        answer:
          "Ekkamai is usually convenient if you are near Sukhumvit or BTS. Mo Chit can be better if you are staying in northern Bangkok.",
      },
      {
        question: "How much is the Ekkamai to Pattaya bus?",
        answer:
          "Current app data shows 148 THB for Ekkamai to Pattaya. Confirm the fare at the counter before travel.",
      },
      {
        question: "Do I need to book in advance?",
        answer:
          "For many travelers, buying at the counter is common. If you want to compare alternatives or reserve online, use a trusted booking platform.",
      },
    ],
    sources: [
      {
        label: "Pattaya Bus / Roong Reuang Coach",
        url: "https://pattayabus.com/",
      },
      {
        label: "Bangkok to Pattaya route page",
        url: "/en/bangkok-to-pattaya",
      },
    ],
  },
  {
    slug: "suvarnabhumi-airport-gate-8-pattaya-bus",
    title: "Suvarnabhumi Airport Gate 8 to Pattaya Bus | Practical Guide",
    description:
      "Guide to the Suvarnabhumi Airport to Pattaya bus near Level 1 Gate 8, with travel tips, schedule link, ticket notes and sources.",
    h1: "Suvarnabhumi Airport Gate 8 to Pattaya Bus",
    intro:
      "The Suvarnabhumi Airport to Pattaya bus is useful after landing in Bangkok when you want a direct, low-cost route to Pattaya. Current route information points travelers to Level 1 near Gate 8, but you should always confirm signs at the airport.",
    routeId: "suvarnabhumi-airport-to-pattaya",
    routeLinkLabel: "Open Suvarnabhumi Airport to Pattaya bus times",
    ctaLabel: "Compare airport to Pattaya tickets",
    lastUpdated: "2026-05-14",
    keyPoints: [
      "Allow time for immigration, baggage claim and walking through the airport.",
      "Current route data says the bus counter is on Level 1 near Gate 8.",
      "The operator fare shown in current app data is 162 THB per seat.",
    ],
    sections: [
      {
        title: "Finding the bus counter",
        body: "After arrivals, follow airport transport signs toward Level 1. Look for the Pattaya bus counter near Gate 8 and confirm the destination before buying your ticket.",
      },
      {
        title: "When taxi may be better",
        body: "If you arrive late, have heavy luggage, travel with family, or miss the next bus, a taxi or private transfer can be easier. Final prices can vary by traffic, tolls and provider.",
      },
      {
        title: "Arrival in Pattaya",
        body: "Some buses may stop at Jomtien or North Pattaya depending on the service. Confirm the final stop before buying, then plan a songthaew, taxi or app ride to your hotel.",
      },
    ],
    faq: [
      {
        question: "Where is the Pattaya bus counter at Suvarnabhumi Airport?",
        answer:
          "Current route data says Level 1 near Gate 8. Follow airport signs and confirm at the counter.",
      },
      {
        question: "How much is the airport bus to Pattaya?",
        answer:
          "Current operator information in the app shows 162 THB per seat. Confirm before travel.",
      },
      {
        question: "Should I take the bus after a long flight?",
        answer:
          "The bus is affordable, but taxi or private transfer can be easier if you are tired, arrive late or carry large luggage.",
      },
    ],
    sources: [
      {
        label: "Airport Pattaya Bus",
        url: "https://airportpattayabus.com/",
      },
      {
        label: "Suvarnabhumi Airport to Pattaya route page",
        url: "/en/suvarnabhumi-airport-to-pattaya",
      },
    ],
  },
  {
    slug: "bangkok-to-pattaya-bus-vs-taxi",
    title: "Bangkok to Pattaya Bus vs Taxi | Price, Time & Luggage Tips",
    description:
      "Compare Bangkok to Pattaya by bus and taxi, including price differences, travel time, luggage convenience, safety tips and booking options.",
    h1: "Bangkok to Pattaya Bus vs Taxi",
    intro:
      "The bus is usually the cheapest way from Bangkok to Pattaya, while taxi or private transfer is easier door-to-door. This guide helps tourists choose based on budget, luggage, time and comfort.",
    routeId: "bangkok-to-pattaya",
    routeLinkLabel: "Open Bangkok to Pattaya bus times",
    ctaLabel: "Compare bus, taxi and transfer options",
    lastUpdated: "2026-05-14",
    keyPoints: [
      "Bus from Ekkamai is usually the lowest-cost option for solo travelers.",
      "Taxi or private transfer is easier with luggage, family travel or hotel pickup.",
      "App and taxi prices can change with traffic, tolls, demand and pickup point.",
    ],
    sections: [
      {
        title: "Choose the bus if price matters",
        body: "The scheduled bus is usually the best budget choice. It works well if you can reach Ekkamai or Mo Chit easily and do not need door-to-door pickup.",
      },
      {
        title: "Choose taxi if convenience matters",
        body: "Taxi, Grab, Bolt, inDrive or private transfer can save walking and station time. It is usually more expensive, but often easier with bags or when traveling as a group.",
      },
      {
        title: "Safety and payment notes",
        body: "For taxis and app rides, confirm the car, plate, tolls and final fare. For bus tickets, use official counters or trusted booking platforms.",
      },
    ],
    faq: [
      {
        question: "Is bus or taxi better from Bangkok to Pattaya?",
        answer:
          "Bus is better for low cost. Taxi or private transfer is better for luggage, hotel pickup and door-to-door comfort.",
      },
      {
        question: "Is taxi faster than the bus?",
        answer:
          "Taxi can be faster door-to-door, but Bangkok traffic can reduce the advantage.",
      },
      {
        question: "Can I compare tickets online?",
        answer:
          "Yes. Use the route page for timetable information and a booking platform to compare live ticket or transfer options.",
      },
    ],
    sources: [
      {
        label: "Pattaya Bus / Roong Reuang Coach",
        url: "https://pattayabus.com/",
      },
      {
        label: "Bangkok to Pattaya route page",
        url: "/en/bangkok-to-pattaya",
      },
    ],
  },
  {
    slug: "bangkok-to-pattaya-after-midnight",
    title: "Bangkok to Pattaya After Midnight | Bus, Taxi & Safe Options",
    description:
      "Practical guide for traveling from Bangkok to Pattaya after midnight, including bus limitations, taxi safety, private transfer options and tips.",
    h1: "Bangkok to Pattaya After Midnight",
    intro:
      "Scheduled buses are not always useful late at night. If you need to travel from Bangkok to Pattaya after midnight, compare the next morning bus with taxi or private transfer options and avoid unclear driver offers.",
    routeId: "bangkok-to-pattaya",
    routeLinkLabel: "Check the next Bangkok to Pattaya bus",
    ctaLabel: "Check late-night alternatives",
    lastUpdated: "2026-05-14",
    keyPoints: [
      "If the last bus has passed, the next scheduled bus may be the following morning.",
      "Late-night taxi or private transfer can be convenient but should have a clear price.",
      "Avoid unofficial offers where the car, driver or final fare is unclear.",
    ],
    sections: [
      {
        title: "Check tomorrow's first bus",
        body: "If you do not need to travel immediately, the safest low-cost option may be to rest in Bangkok and take the first morning bus from Ekkamai or Mo Chit.",
      },
      {
        title: "If you must travel at night",
        body: "Use a trusted app, official taxi queue or pre-booked private transfer. Confirm tolls, destination, luggage and final fare before leaving.",
      },
      {
        title: "Airport arrival note",
        body: "If you land late at Suvarnabhumi or Don Mueang, check airport-specific Pattaya options first. A direct airport transfer may be easier than going into central Bangkok.",
      },
    ],
    faq: [
      {
        question: "Are there Bangkok to Pattaya buses after midnight?",
        answer:
          "Current scheduled bus data should be checked for the route, but after the final departure you may need to wait until the next morning.",
      },
      {
        question: "Is taxi safe after midnight?",
        answer:
          "It can be safe if you use a trusted provider, confirm the fare and match the car and driver before entering.",
      },
      {
        question: "Should I pre-book a private transfer?",
        answer:
          "For late-night arrivals, pre-booking can be easier if you want a fixed pickup point and less uncertainty.",
      },
    ],
    sources: [
      {
        label: "Pattaya Bus / Roong Reuang Coach",
        url: "https://pattayabus.com/",
      },
      {
        label: "Bangkok to Pattaya route page",
        url: "/en/bangkok-to-pattaya",
      },
    ],
  },
  {
    slug: "pattaya-to-bangkok-before-flight",
    title: "Pattaya to Bangkok Before a Flight | Bus or Taxi Planning Guide",
    description:
      "Guide for traveling from Pattaya to Bangkok before a flight, with timing buffers, bus risks, taxi alternatives, airport notes and route links.",
    h1: "Pattaya to Bangkok Before a Flight",
    intro:
      "If you are leaving Pattaya before a flight, plan more time than a normal city transfer. Traffic, station time, check-in, baggage and airport security can all add delays.",
    routeId: "pattaya-to-bangkok",
    routeLinkLabel: "Open Pattaya to Bangkok bus times",
    ctaLabel: "Compare tickets and airport alternatives",
    lastUpdated: "2026-05-14",
    keyPoints: [
      "Do not rely on the last possible bus before your flight.",
      "Confirm whether your Bangkok destination is Ekkamai, Mo Chit, Suvarnabhumi or Don Mueang.",
      "Taxi or private transfer is often safer for early flights or tight connections.",
    ],
    sections: [
      {
        title: "Use a generous time buffer",
        body: "A bus journey may look short on paper, but traffic and airport procedures can add time. Leave extra hours before international flights and avoid tight plans.",
      },
      {
        title: "Choose the right Bangkok destination",
        body: "A bus to Ekkamai or Mo Chit is not the same as a direct airport transfer. If your flight leaves from Suvarnabhumi or Don Mueang, compare the airport route before booking.",
      },
      {
        title: "When taxi is worth it",
        body: "Taxi or private transfer can be worth the extra cost if you have luggage, an early flight, family travel or no room for delays.",
      },
    ],
    faq: [
      {
        question: "Can I take the bus from Pattaya before a flight?",
        answer:
          "Yes, but only if you leave enough time for traffic, station transfer, check-in, baggage and security.",
      },
      {
        question: "Should I take taxi instead before a flight?",
        answer:
          "Taxi or private transfer is usually safer for tight flight connections, early departures or heavy luggage.",
      },
      {
        question: "Which Bangkok airport should I choose?",
        answer:
          "Check your airline ticket carefully. Suvarnabhumi and Don Mueang are different airports and require different travel planning.",
      },
    ],
    sources: [
      {
        label: "Pattaya Bus / Roong Reuang Coach",
        url: "https://pattayabus.com/",
      },
      {
        label: "Airport Pattaya Bus",
        url: "https://airportpattayabus.com/",
      },
      {
        label: "Pattaya to Bangkok route page",
        url: "/en/pattaya-to-bangkok",
      },
    ],
  },
];

export function getSeoGuide(slug: string) {
  return seoGuides.find((guide) => guide.slug === slug);
}
