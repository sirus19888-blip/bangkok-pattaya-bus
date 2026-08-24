import type { RouteId } from "@/data/routes";
import type { AffiliateCTAPosition } from "@/components/AffiliateCTA";

export type SeoGuideSource = {
  label: string;
  // Bez url zrodlo renderuje sie jako sam tekst - atrybucja zostaje widoczna,
  // ale nie wysylamy odwiedzajacego ani mocy linkow na zewnatrz.
  url?: string;
};

export type SeoGuideFaq = {
  question: string;
  answer: string;
};

// Blok o prywatnym transferze. Renderowany TYLKO tam, gdzie istnieje treść w jezyku
// strony - inaczej chinski czytelnik dostalby angielski blok w srodku chinskiej strony.
// Ma zaczynac od wady (cena), nie od zachety: wiarygodnosc jest tu jedyna przewaga.
export type SeoGuideTransferNote = {
  title: string;
  body: string;
  ctaLabel: string;
};

export type SeoGuide = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  shortAnswer?: string;
  shortAnswerHotelCity?: "pattaya" | "bangkok";
  routeId: RouteId;
  routeLinkLabel: string;
  ctaLabel: string;
  ctaPosition?: AffiliateCTAPosition;
  ctaSubId?: string;
  lastUpdated: string;
  lastVerified?: string;
  keyPoints: string[];
  transferNote?: SeoGuideTransferNote;
  sections: {
    title: string;
    body: string;
  }[];
  internalLinks?: {
    label: string;
    href: string;
    description: string;
  }[];
  faq: SeoGuideFaq[];
  sources: SeoGuideSource[];
};

export const seoGuides: SeoGuide[] = [
  {
    slug: "ekkamai-bus-terminal-to-pattaya-guide",
    title: "Ekkamai Bus Terminal to Pattaya Bus Guide",
    description:
      "Get from Bangkok's Ekkamai Bus Terminal to Pattaya by bus: departure times, tickets, 2-3h travel time, fares, plus faster private-transfer options.",
    h1: "Ekkamai Bus Terminal to Pattaya Guide",
    intro:
      "Ekkamai Bus Terminal is the most convenient Bangkok bus station for many tourists staying around Sukhumvit. This guide explains how to reach the terminal, where to buy Pattaya tickets, how early to arrive, and what to do if the next bus is full.",
    shortAnswer:
      "The simplest way is to take BTS to Ekkamai Station, walk about 5 minutes to Ekkamai Bus Terminal, buy a Pattaya ticket at the official counter, and confirm the platform before boarding. Check the Bangkok to Pattaya route page for current times before you go.",
    routeId: "bangkok-to-pattaya",
    routeLinkLabel: "Open Bangkok to Pattaya Bus",
    ctaLabel: "Check Bangkok → Pattaya tickets",
    ctaPosition: "guide_body",
    ctaSubId: "bpb-bangkok-to-pattaya-guide_ekkamai",
    lastUpdated: "2026-08-02",
    lastVerified: "2026-08-23",
    keyPoints: [
      "Best for travelers staying near Sukhumvit, Thong Lo, Phrom Phong, Asok or BTS Ekkamai.",
      "The Ekkamai to Pattaya bus is usually a straightforward station-to-station trip, not a hotel pickup service.",
      "Arrive 20-30 minutes before departure so you have time to buy a ticket and find the correct platform.",
    ],
    sections: [
      {
        title: "Where is Ekkamai Bus Terminal?",
        body: "Ekkamai Bus Terminal is in eastern Bangkok, close to BTS Ekkamai on Sukhumvit Road. It is useful if you are staying in central Sukhumvit areas such as Asok, Phrom Phong, Thong Lo or Ekkamai. The terminal is smaller and easier to understand than Mo Chit 2, but you should still check the counter and platform before boarding.",
      },
      {
        title: "How to get to Ekkamai by BTS",
        body: "Take the BTS Sukhumvit Line to Ekkamai Station. From the station, the bus terminal is usually about a 5-minute walk. Follow signs toward the bus terminal and use Google Maps if you are unsure which exit to take. If you have heavy luggage, a taxi or Grab to the terminal may be easier.",
      },
      {
        title: "Where to buy Pattaya bus tickets at Ekkamai",
        body: "Buy Pattaya tickets at the official bus counter inside Ekkamai Bus Terminal. Confirm that the ticket is for Pattaya or North Pattaya Bus Station before paying. Keep small cash ready because counter payment options can vary. Avoid unofficial offers outside the station if the fare, vehicle or destination is unclear.",
      },
      {
        title: "Bangkok to Pattaya bus times",
        body: "The Bangkok to Pattaya route page on this site shows current departure information, fare notes and source status. Treat it as a planning guide, then confirm the next bus at the counter before travel because operator times can change.",
      },
      {
        title: "How early to arrive",
        body: "For normal travel, arrive 20-30 minutes before your preferred departure. This gives you time to buy a ticket, check the platform and use the restroom. Arrive earlier during weekends, Thai holidays or if you are traveling with luggage.",
      },
      {
        title: "What if the bus is full?",
        body: "Ask the official counter for the next available bus. If you cannot wait, compare alternatives such as another bus station, minivan, taxi, Grab, Bolt, inDrive or private transfer. Do not accept unclear driver offers without agreeing on destination, vehicle and final price first.",
      },
      {
        title: "Bus vs taxi vs private transfer",
        body: "The bus is usually the cheapest option for solo travelers. Taxi or private transfer is easier if you have large luggage, travel with family, want hotel pickup, or need to leave at a specific time. Final app or taxi prices can vary by traffic, tolls, demand and pickup point.",
      },
      {
        title: "Arrival in Pattaya",
        body: "Many buses arrive at North Pattaya Bus Station. From there, use a songthaew, taxi, Grab, Bolt or hotel transfer to reach your hotel. Confirm your final stop before boarding, especially if you need Jomtien or central Pattaya.",
      },
    ],
    internalLinks: [
      {
        label: "Bangkok Pattaya Bus Guide homepage",
        href: "/",
        description: "Start from the main guide and choose another Bangkok or Pattaya route.",
      },
      {
        label: "Bangkok to Pattaya Bus",
        href: "/en/bangkok-to-pattaya",
        description: "Check current route times, fare notes, station information and source status.",
      },
      {
        label: "Pattaya to Bangkok Bus",
        href: "/en/pattaya-to-bangkok",
        description: "Plan the return trip from Pattaya back to Bangkok.",
      },
    ],
    faq: [
      {
        question: "Is Ekkamai Bus Terminal the best station for Pattaya?",
        answer:
          "Ekkamai is usually the easiest choice if you are staying near Sukhumvit or BTS Ekkamai. Mo Chit 2 can be better if you are staying in northern Bangkok.",
      },
      {
        question: "Can I buy Pattaya bus tickets online?",
        answer:
          "You can compare online ticket and transfer options through booking platforms, but many travelers still buy the Ekkamai to Pattaya bus ticket at the station counter. Always confirm the departure and boarding point.",
      },
      {
        question: "How far is Ekkamai from BTS Ekkamai?",
        answer:
          "The terminal is usually about a 5-minute walk from BTS Ekkamai, depending on the exit you use and how much luggage you carry.",
      },
      {
        question: "How long is the bus from Ekkamai to Pattaya?",
        answer:
          "The trip is commonly around 2-3 hours depending on traffic and the final Pattaya stop. Allow extra time on weekends and holidays.",
      },
      {
        question: "What should I do if the bus is full?",
        answer:
          "Ask the official counter for the next departure. If you cannot wait, compare another bus, minivan, taxi or private transfer option before leaving the terminal.",
      },
    ],
    sources: [
      {
        label: "Pattaya Bus / Roong Reuang Coach",
        url: "https://airportpattayabus.com/bangkok-terminal-pattaya/",
      },
      {
        label: "Bangkok to Pattaya route page",
        url: "/en/bangkok-to-pattaya",
      },
    ],
  },
  {
    slug: "mo-chit-bus-terminal-to-pattaya",
    title: "Mo Chit Bus Terminal to Pattaya: Bus Times, Tickets & Tips",
    description:
      "Guide to traveling from Bangkok Mo Chit Bus Terminal to Pattaya, including ticket tips, travel time, station notes and alternatives.",
    h1: "Mo Chit Bus Terminal to Pattaya Guide",
    intro:
      "Mo Chit Bus Terminal, often called Mo Chit 2, is one of Bangkok's main long-distance bus terminals. This guide explains when it makes sense for Pattaya, how it compares with Ekkamai, where to buy tickets, and how to plan the return route from Pattaya to Mo Chit.",
    shortAnswer:
      "Use Mo Chit Bus Terminal for Pattaya if you are already staying in northern Bangkok or near Chatuchak. If you are staying around Sukhumvit, Ekkamai is often simpler. Buy tickets at the official counter, confirm whether the bus goes to Pattaya or North Pattaya Bus Station, and check the Bangkok to Pattaya route page before travel.",
    routeId: "bangkok-to-pattaya",
    routeLinkLabel: "Open Bangkok to Pattaya bus times",
    ctaLabel: "Check Bangkok to Pattaya tickets",
    ctaPosition: "guide_body",
    ctaSubId: "bpb-bangkok-to-pattaya-guide_mochit",
    lastUpdated: "2026-08-02",
    lastVerified: "2026-08-23",
    keyPoints: [
      "Best for travelers starting in northern Bangkok, Chatuchak or areas closer to Mo Chit 2.",
      "Mo Chit 2 is not the same as BTS Mo Chit, so plan the transfer to the terminal.",
      "Confirm the Pattaya destination and counter before paying, especially if you need North Pattaya Bus Station.",
    ],
    sections: [
      {
        title: "Where is Mo Chit Bus Terminal?",
        body: "Mo Chit Bus Terminal, also known as Mo Chit 2, is a major Bangkok bus terminal in the northern part of the city. It is useful if you are starting near Chatuchak, Ari, northern Bangkok or a nearby taxi route. It is not directly the same place as BTS Mo Chit, so allow time to reach the actual bus terminal.",
      },
      {
        title: "Mo Chit vs Ekkamai for Pattaya",
        body: "Ekkamai is usually easier if you are staying around Sukhumvit because it is close to BTS Ekkamai and has a simpler terminal layout. Mo Chit can make more sense if your hotel is in northern Bangkok or if the next useful Pattaya departure is from Mo Chit. Choose the station that saves the most transfer time before the bus.",
      },
      {
        title: "Where to buy tickets",
        body: "Use the official ticket counters inside Mo Chit Bus Terminal and confirm that the ticket is for Pattaya before you pay. Ask which platform or bay to use, keep small cash available, and avoid unclear offers from unofficial drivers outside the terminal.",
      },
      {
        title: "Travel time and fare notes",
        body: "Bangkok to Pattaya commonly takes around 2-3 hours, but Bangkok traffic can change the real travel time. Fare notes can vary by station, operator and route, so use the route page for current planning information and confirm the final fare at the counter before boarding.",
      },
      {
        title: "What if the bus is full?",
        body: "Ask the official counter for the next Pattaya departure first. If the wait is too long, compare Ekkamai, another bus, minivan, taxi, Grab, Bolt, inDrive or private transfer. Do not leave with a driver unless the vehicle, destination and final price are clear.",
      },
      {
        title: "Return route from Pattaya to Mo Chit",
        body: "For the return trip, check whether your Pattaya ticket goes to Ekkamai, Mo Chit 2 or another Bangkok stop before buying. The Pattaya to Bangkok route page is the best place to compare return options and avoid choosing the wrong Bangkok arrival station.",
      },
    ],
    internalLinks: [
      {
        label: "Bangkok to Pattaya Bus",
        href: "/en/bangkok-to-pattaya",
        description:
          "Check current Bangkok to Pattaya times, fare notes, station information and source status.",
      },
      {
        label: "Pattaya to Bangkok Bus",
        href: "/en/pattaya-to-bangkok",
        description:
          "Plan the return route from Pattaya to Bangkok, including Ekkamai and Mo Chit options.",
      },
      {
        label: "Ekkamai Bus Terminal to Pattaya guide",
        href: "/en/ekkamai-bus-terminal-to-pattaya-guide",
        description:
          "Compare Mo Chit with the more convenient Ekkamai option for Sukhumvit travelers.",
      },
    ],
    faq: [
      {
        question: "Is Mo Chit Bus Terminal good for Pattaya?",
        answer:
          "Yes, especially if you are staying in northern Bangkok or near Chatuchak. If you are near Sukhumvit, Ekkamai is often easier.",
      },
      {
        question: "Is Mo Chit 2 the same as BTS Mo Chit?",
        answer:
          "No. BTS Mo Chit is a rail station, while Mo Chit 2 is the long-distance bus terminal. Allow extra time to reach the actual terminal.",
      },
      {
        question: "How long is the bus from Mo Chit to Pattaya?",
        answer:
          "The trip is commonly around 2-3 hours, depending on traffic and the final Pattaya stop. Leave extra time on weekends and holidays.",
      },
      {
        question: "Can I buy Mo Chit to Pattaya tickets online?",
        answer:
          "You can compare online ticket and transfer options, but many travelers still buy bus tickets at the official counter. Confirm the operator, time and destination before travel.",
      },
      {
        question: "Can I return from Pattaya to Mo Chit?",
        answer:
          "Some Pattaya to Bangkok buses may go to Mo Chit, but you should confirm the Bangkok arrival station before buying the ticket.",
      },
    ],
    sources: [
      {
        label: "Pattaya Bus / Roong Reuang Coach",
        url: "https://airportpattayabus.com/bangkok-terminal-pattaya/",
      },
      {
        label: "Bangkok to Pattaya route page",
        url: "/en/bangkok-to-pattaya",
      },
      {
        label: "Pattaya to Bangkok route page",
        url: "/en/pattaya-to-bangkok",
      },
    ],
  },
  {
    slug: "pattaya-bus-station-to-jomtien",
    title: "Pattaya Bus Station to Jomtien: Taxi, Songthaew & Transfer Guide",
    description:
      "Practical guide to getting from North Pattaya Bus Station to Jomtien, including taxi, songthaew, Grab/Bolt, travel time and airport bus connection tips.",
    h1: "Pattaya Bus Station to Jomtien Guide",
    intro:
      "North Pattaya Bus Station is useful for buses arriving from Bangkok, but it is not in Jomtien. This guide explains the simplest ways to continue from the Pattaya bus station to Jomtien, including taxi, Grab or Bolt, songthaew and the Jomtien / Thappraya airport bus area.",
    shortAnswer:
      "For most travelers, the easiest way from North Pattaya Bus Station to Jomtien is a taxi, Grab or Bolt, especially with luggage. Songthaews can be cheaper, but the route is less obvious for first-time visitors. If you need the Suvarnabhumi airport bus, confirm the Jomtien / Thappraya boarding point before you go.",
    routeId: "pattaya-to-suvarnabhumi-airport",
    routeLinkLabel: "Open Pattaya to Suvarnabhumi Airport bus times",
    ctaLabel: "Check Pattaya → Suvarnabhumi Airport tickets",
    ctaPosition: "guide_body",
    ctaSubId: "bpb-pattaya-to-suvarnabhumi-guide_jomtien",
    lastUpdated: "2026-08-03",
    lastVerified: "2026-08-23",
    keyPoints: [
      "North Pattaya Bus Station and the Jomtien / Thappraya airport bus area are different places.",
      "Taxi, Grab or Bolt is usually easiest with luggage or after a long bus ride.",
      "Songthaew can be cheaper, but ask where it goes before boarding and allow extra time.",
    ],
    sections: [
      {
        title: "Where do buses arrive in Pattaya?",
        body: "Many Bangkok to Pattaya buses arrive at North Pattaya Bus Station. This is a practical arrival point for Pattaya city, but it is north of central Pattaya and not the same as Jomtien or the Thappraya airport bus office. Before leaving the station, check your hotel area and choose a local transfer that goes in the right direction.",
      },
      {
        title: "How far is North Pattaya Bus Station from Jomtien?",
        body: "Jomtien is south of central Pattaya, so the transfer is not usually a short walk. Travel time depends on traffic, hotel location and the route across Pattaya. Plan roughly 20-45 minutes by taxi or app ride, and more if you use a shared songthaew with transfers.",
      },
      {
        title: "Taxi, Grab/Bolt or songthaew?",
        body: "Taxi, Grab or Bolt is the simplest option if you have luggage, arrive at night or want to go directly to your hotel. Prices vary by traffic, demand and pickup point, so check the app fare before booking. Songthaews can be cheaper, but routes may not be obvious and you may need to change vehicles.",
      },
      {
        title: "How to reach the Jomtien / Thappraya airport bus area",
        body: "If you are connecting to the Suvarnabhumi Airport bus from the Jomtien / Thappraya area, do not assume it departs from North Pattaya Bus Station. Confirm the airport bus counter or Thappraya bus office location, leave a time buffer and use a direct taxi or app ride if you have bags or a flight connection.",
      },
      {
        title: "What to do with luggage",
        body: "With suitcases, a direct taxi, Grab or Bolt is usually worth considering because you avoid carrying bags between songthaews. Keep valuables with you, confirm the destination before loading luggage and allow extra time if you need to buy an airport bus ticket after arriving in Jomtien.",
      },
      {
        title: "Related routes",
        body: "Use the Bangkok to Pattaya route page when planning your arrival at North Pattaya Bus Station. Use the Pattaya to Bangkok route page for the return to Bangkok, and the Pattaya to Suvarnabhumi Airport route page if you are connecting from Jomtien or Thappraya toward the airport.",
      },
    ],
    internalLinks: [
      {
        label: "Bangkok to Pattaya Bus",
        href: "/en/bangkok-to-pattaya",
        description:
          "Plan the bus arrival into Pattaya before arranging your transfer to Jomtien.",
      },
      {
        label: "Pattaya to Bangkok Bus",
        href: "/en/pattaya-to-bangkok",
        description:
          "Check return buses from Pattaya to Bangkok, including station and timing notes.",
      },
      {
        label: "Pattaya to Suvarnabhumi Airport Bus",
        href: "/en/pattaya-to-suvarnabhumi-airport",
        description:
          "Check airport bus times, fare notes and boarding information before a flight.",
      },
    ],
    faq: [
      {
        question: "Is North Pattaya Bus Station the same as Jomtien Bus Station?",
        answer:
          "No. North Pattaya Bus Station is in North Pattaya, while the Jomtien bus station or Thappraya airport bus area is farther south. Confirm the exact airport bus boarding point before travel.",
      },
      {
        question: "How do I get from Pattaya Bus Station to Jomtien?",
        answer:
          "The easiest way is usually taxi, Grab or Bolt. A shared songthaew may be cheaper, but routes can be confusing if it is your first time in Pattaya.",
      },
      {
        question: "How long does it take from North Pattaya Bus Station to Jomtien?",
        answer:
          "Allow about 20-45 minutes by taxi or app ride, depending on traffic and your exact Jomtien destination. Shared transport can take longer.",
      },
      {
        question: "Can I take the Suvarnabhumi airport bus from North Pattaya Bus Station?",
        answer:
          "Yes. The 130 THB Pattaya to Suvarnabhumi service departs from North Pattaya Bus Station. The hourly Jomtien service costs 151 THB and is a separate route.",
      },
      {
        question: "What is easiest with luggage?",
        answer:
          "Taxi, Grab, Bolt or a pre-arranged transfer is usually easiest with luggage because it avoids changing vehicles or walking with bags.",
      },
    ],
    sources: [
      {
        label: "Pattaya to Suvarnabhumi Airport route page",
        url: "/en/pattaya-to-suvarnabhumi-airport",
      },
      {
        label: "Bangkok to Pattaya route page",
        url: "/en/bangkok-to-pattaya",
      },
      {
        label: "Airport Pattaya Bus",
        url: "https://airportpattayabus.com/",
      },
    ],
  },
    {
    slug: "suvarnabhumi-airport-gate-8-pattaya-bus",
    title:
      "Suvarnabhumi Airport to Pattaya Bus from Gate 8 | Operators, Price & Tips",
    description:
      "Complete guide to the Suvarnabhumi Airport to Pattaya bus from Level 1 Gate 8: operators, fares, travel time, where to find the counter, and what to do after a late flight.",
    h1: "Suvarnabhumi Airport to Pattaya Bus (Gate 8)",
    intro:
      "The Suvarnabhumi Airport to Pattaya bus is one of the cheapest and most popular ways to reach Pattaya after landing in Bangkok. Several operators run direct services from the airport, and the ticket counters are on Level 1 near Gate 8 in the arrivals area. This guide explains how to find the counter, which operators run the route, how much the bus usually costs, how long it takes, and when a taxi or private transfer makes more sense.",
    shortAnswer:
      "After arrivals, go to Level 1 and look for the bus counters near Gate 8 (the Pattaya / Hua Hin counter). Buy a ticket for Pattaya, confirm whether the bus stops at Jomtien or North Pattaya, and board there. The trip usually takes about 2 hours and commonly costs around 120-250 THB depending on the operator and whether you book online or at the counter.",
    routeId: "suvarnabhumi-airport-to-pattaya",
    routeLinkLabel: "Open Suvarnabhumi Airport to Pattaya bus times",
    ctaLabel: "Compare airport to Pattaya tickets",
    lastUpdated: "2026-08-02",
    lastVerified: "2026-08-23",
    keyPoints: [
      "The bus counters are on Level 1 (Arrivals) near Gate 8 - look for the Pattaya / Hua Hin service desk.",
      "Several operators run this route, including Roong Reuang Coach, the 999 / Transport Co. bus, Bell Travel and Mekong Transfer, so fares and timings vary a little.",
      "The journey usually takes around 2 hours, sometimes longer on Friday evenings, weekends and holidays.",
    ],
    transferNote: {
      title: "When to skip the airport bus",
      body: "The airport bus is the cheapest way to reach Pattaya and works well with hand luggage and a flexible arrival. A private transfer costs considerably more, but it starts at the terminal exit, waits if your flight is late and drops you at the hotel door - which matters most with children, several suitcases or a late-night landing.",
      ctaLabel: "Compare airport transfer prices",
    },
    sections: [
      {
        title: "Where to find the Pattaya bus at Suvarnabhumi",
        body: "After clearing immigration and collecting your baggage, follow the airport transport signs down to Level 1, the arrivals level. The Pattaya bus counters are near Gate 8, often shown as the Pattaya / Hua Hin service desk. Buy your ticket at the official counter, then ask which door or waiting area to use before boarding. Always confirm the signs at the airport, because counter and gate layouts can change.",
      },
      {
        title: "Which operators run the airport to Pattaya bus",
        body: "This route is served by more than one company. Roong Reuang Coach has the most frequent departures, running roughly every hour from early morning until late evening. The 999 / Transport Co. bus, Bell Travel and Mekong Transfer also run services, sometimes with fewer daily departures. If one counter is sold out or the next bus is too far away, ask whether another operator has an earlier seat.",
      },
      {
        title: "How much the airport bus to Pattaya costs",
        body: "Fares are affordable and vary by operator and how you buy the ticket. As a planning guide, expect roughly 120-250 THB per person. Booking online in advance is sometimes a little more than the counter price, but it can guarantee a seat on busy days. Confirm the exact fare at the counter or on the booking platform before you travel, because operator prices change.",
      },
      {
        title: "How long the bus takes",
        body: "The bus usually takes around 2 hours to reach Pattaya, depending on traffic and your final stop. Highway 7 is fast when clear, but Friday evenings, weekends and Thai holidays can add time. If you have a tight onward plan in Pattaya, leave a comfortable buffer.",
      },
      {
        title: "Where the bus drops you in Pattaya",
        body: "Depending on the operator and service, the airport bus may stop at Jomtien Bus Station or North Pattaya Bus Station. These are different parts of the Pattaya area, so check your hotel location and confirm the final stop before boarding. From either station, continue by songthaew (baht bus), taxi, Grab or Bolt to your hotel.",
      },
      {
        title: "When a taxi or private transfer is better",
        body: "The bus is the cheapest option, but a taxi or pre-booked private transfer can be easier if you land late at night, travel with family, carry large luggage, or want to go straight to your hotel door. Airport taxis and private cars cost much more than the bus - often well over 1,000 THB - but save you waiting and transfers. Final prices vary by traffic, tolls, demand and pickup point.",
      },
      {
        title: "After a late or delayed flight",
        body: "Airport buses do not run all night. If you land late in the evening, check whether the last Pattaya bus has already gone before you commit to the counter. After the last bus, your realistic options are a metered taxi, an app ride or a pre-booked private transfer. Avoid unofficial drivers offering unclear fares, vehicles or destinations.",
      },
      {
        title: "Buying tickets: counter vs online",
        body: "You can buy at the airport counter or book online before you fly. The counter is simple if seats are available and you are flexible. Booking online can be worth it on weekends, holidays or if you want a guaranteed seat after a long flight. Either way, the timetable on this site stays independent - booking links just let you compare live seats and transfers.",
      },
    ],
    internalLinks: [
      {
        label: "Suvarnabhumi Airport to Pattaya Bus",
        href: "/en/suvarnabhumi-airport-to-pattaya",
        description:
          "Check current airport to Pattaya times, fare notes and source status.",
      },
      {
        label: "Pattaya to Suvarnabhumi Airport Bus",
        href: "/en/pattaya-to-suvarnabhumi-airport",
        description:
          "Plan the return trip to the airport before your flight.",
      },
      {
        label: "Pattaya Bus Station to Jomtien guide",
        href: "/en/pattaya-bus-station-to-jomtien",
        description:
          "If your bus stops at North Pattaya, plan the transfer south to Jomtien.",
      },
    ],
    faq: [
      {
        question: "Where is the Pattaya bus counter at Suvarnabhumi Airport?",
        answer:
          "It is on Level 1 in the arrivals area, near Gate 8 - look for the Pattaya / Hua Hin service desk. Follow airport signs and confirm at the counter.",
      },
      {
        question: "How much is the bus from Suvarnabhumi Airport to Pattaya?",
        answer:
          "Fares vary by operator and booking method, but expect roughly 120-250 THB per person. Confirm the exact price at the counter or online before travel.",
      },
      {
        question: "Which companies run the airport to Pattaya bus?",
        answer:
          "Roong Reuang Coach runs the most frequent service, with others such as the 999 / Transport Co. bus, Bell Travel and Mekong Transfer also operating the route.",
      },
      {
        question: "How long does the airport bus to Pattaya take?",
        answer:
          "Usually around 2 hours, depending on traffic and your final stop. Allow extra time on Friday evenings, weekends and holidays.",
      },
      {
        question: "Does the bus go to Jomtien or North Pattaya?",
        answer:
          "It depends on the operator and service. Some buses stop at Jomtien Bus Station and others at North Pattaya Bus Station, so confirm the final stop before boarding.",
      },
      {
        question: "What should I do if I land late at night?",
        answer:
          "Check whether the last bus has already gone. After the last departure, a metered taxi, app ride or pre-booked private transfer is usually the safest option.",
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
      {
        label: "Roong Reuang Coach",
        url: "https://airportpattayabus.com/bangkok-terminal-pattaya/",
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
    shortAnswer:
      "The bus is the cheapest choice, with fares of 148 THB from Ekkamai or 158 THB from Mo Chit 2. Choose a private transfer instead when you have heavy luggage, travel with a group or children, or want direct hotel drop-off.",
    routeId: "bangkok-to-pattaya",
    routeLinkLabel: "Open Bangkok to Pattaya bus times",
    ctaLabel: "Check prices & availability",
    lastUpdated: "2026-08-03",
    lastVerified: "2026-08-23",
    keyPoints: [
      "Bus from Ekkamai is usually the lowest-cost option for solo travelers.",
      "Taxi or private transfer is easier with luggage, family travel or hotel pickup.",
      "App and taxi prices can change with traffic, tolls, demand and pickup point.",
    ],
    transferNote: {
      title: "When a private transfer beats the bus",
      body: "A private transfer costs several times a bus ticket, which is why the bus wins for most solo travelers on a flexible schedule. The transfer becomes better value with three or more people sharing the fare, with heavy luggage, or when your hotel is far from the bus station and you would need another ride anyway.",
      ctaLabel: "Compare transfer prices",
    },
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
        url: "https://airportpattayabus.com/bangkok-terminal-pattaya/",
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
    shortAnswer:
      "After 22:00, there are no scheduled Ekkamai buses to Pattaya; the last departure is at 22:00. Choose a private transfer if you must leave immediately, or wait for the first morning bus at 05:00.",
    routeId: "bangkok-to-pattaya",
    routeLinkLabel: "Check the next Bangkok to Pattaya bus",
    ctaLabel: "Check late-night alternatives",
    lastUpdated: "2026-08-03",
    lastVerified: "2026-08-23",
    keyPoints: [
      "If the last bus has passed, the next scheduled bus may be the following morning.",
      "Late-night taxi or private transfer can be convenient but should have a clear price.",
      "Avoid unofficial offers where the car, driver or final fare is unclear.",
    ],
    transferNote: {
      title: "When a private transfer is worth the extra cost",
      body: "A private transfer costs several times more than a bus ticket, so it is not the default choice. After the last evening bus it often becomes the only practical one: it leaves when you do, goes to the hotel door and does not depend on a timetable. If your arrival is flexible, waiting for the first morning bus is still cheaper and simpler.",
      ctaLabel: "Compare night transfer prices",
    },
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
        url: "https://airportpattayabus.com/bangkok-terminal-pattaya/",
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
    shortAnswer:
      "For a flight from Suvarnabhumi, use the direct Pattaya-to-airport bus instead of traveling through Bangkok; it takes about 2 hours and runs from 08:00 to 21:00. Build in a generous buffer for traffic and airport procedures.",
    routeId: "pattaya-to-bangkok",
    routeLinkLabel: "Open Pattaya to Bangkok bus times",
    ctaLabel: "Compare tickets and airport alternatives",
    lastUpdated: "2026-08-03",
    lastVerified: "2026-08-23",
    keyPoints: [
      "Do not rely on the last possible bus before your flight.",
      "Confirm whether your Bangkok destination is Ekkamai, Mo Chit, Suvarnabhumi or Don Mueang.",
      "Taxi or private transfer is often safer for early flights or tight connections.",
    ],
    transferNote: {
      title: "When a transfer protects your flight",
      body: "A bus ticket costs a fraction of a private transfer and is fine when you have a wide margin before check-in. If your connection is tight, a transfer leaves on your schedule rather than the timetable, goes straight to the terminal and removes the leg between the bus stop and the airport - the part hardest to plan around traffic.",
      ctaLabel: "Compare airport transfer prices",
    },
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
        url: "https://airportpattayabus.com/bangkok-terminal-pattaya/",
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
  {
    slug: "don-mueang-airport-to-pattaya-bus",
    title:
      "Don Mueang Airport to Pattaya Bus | Direct Service, Price & Tips",
    description:
      "How to take the direct bus from Don Mueang Airport (DMK) to Pattaya: where to find the counter after landing, operator, fare, travel time, and what to do if you miss the last bus.",
    h1: "Don Mueang Airport to Pattaya Bus (Direct)",
    intro:
      "There is now a direct bus from Don Mueang Airport (DMK) to Pattaya, run by the government operator Transport Co. (also known as the 999 bus). This is a big improvement over the older route, where travelers had to transfer through Mo Chit bus terminal in Bangkok first. This guide explains where to find the bus after landing, how much it costs, how long it takes, and what to do if you arrive late.",
    shortAnswer:
      "After collecting your baggage at Don Mueang, go to Floor 1 and look for the Transport Co. / 999 bus counter for Pattaya in the public arrivals area. The Terminal 1 Service Hall counter is closed on Tuesdays; use the Terminal 2 Gate 11 counter or confirm the current boarding point on arrival. The direct bus costs around 155 THB and the trip usually takes about 3 to 3.5 hours depending on traffic. Check the Don Mueang to Pattaya route page for current departure times before you go.",
    routeId: "don-mueang-airport-to-pattaya",
    routeLinkLabel: "Open Don Mueang Airport to Pattaya bus times",
    ctaLabel: "Check Don Mueang to Pattaya tickets",
    lastUpdated: "2026-08-18",
    lastVerified: "2026-08-23",
    keyPoints: [
      "The bus is a direct service to Pattaya - you do not need to transfer through Mo Chit or central Bangkok.",
      "It is operated by Transport Co. (the government 999 bus), with ticket counters on Floor 1 at Don Mueang.",
      "The fare is around 155 THB and the bus is an air-conditioned coach; the trip usually takes about 3 to 3.5 hours depending on traffic.",
    ],
    transferNote: {
      title: "When to skip the airport bus",
      body: "This route runs on a service window rather than a published timetable, so the wait can be long. The bus stays much cheaper, but a private transfer removes the waiting entirely, goes door to door and is easier to justify with a group, heavy bags or an arrival outside the service window.",
      ctaLabel: "Compare airport transfer prices",
    },
    sections: [
      {
        title: "Finding the bus after you land at Don Mueang",
        body: "After you leave the aircraft, follow the Arrivals signs. If you arrived on an international flight, clear immigration first, then collect your baggage and go out to the public arrivals area on Floor 1. Look for the Transport Co. / 999 bus counter or service hall for the Pattaya service. Tickets are sold on Floor 1, and counters are linked to the International Terminal (Building 1) and Domestic Terminal (Building 2). The Terminal 1 Service Hall counter is closed on Tuesdays; use the Terminal 2 Gate 11 counter or confirm the current boarding point on arrival. Always confirm the signs at the airport, because counter locations can change.",
      },
      {
        title: "Why the direct bus is easier than the old route",
        body: "Until recently, getting from Don Mueang to Pattaya meant first taking a shuttle or taxi to Mo Chit bus terminal in Bangkok, then changing to a Pattaya bus - often around four hours in total with the transfer. The direct Transport Co. bus skips that, taking you from the airport toward Pattaya without changing vehicles. Some older guides still describe only the Mo Chit route, so it is worth knowing the direct service exists.",
      },
      {
        title: "How much the bus costs",
        body: "The direct airport bus fare is around 155 THB per person. This is cheaper than going via Bangkok's Northern Bus Terminal and changing buses, and far cheaper than a taxi. Confirm the current fare on the route page or at the counter before travel, because operator prices can change.",
      },
      {
        title: "How long the journey takes",
        body: "The bus usually takes around 3 to 3.5 hours, depending on traffic and the time of day. Bangkok and motorway traffic - especially on Friday evenings, weekends and holidays - can add time. If you have an onward plan in Pattaya, leave a comfortable buffer.",
      },
      {
        title: "Departure times and how often the bus runs",
        body: "The direct bus runs several times a day rather than continuously, so the timing matters more than for a frequent city route. Check the Don Mueang to Pattaya route page on this site for the current departure times, then plan your arrival around the next available bus. If your flight lands between scheduled departures, you may have a wait.",
      },
      {
        title: "Where the bus drops you in Pattaya",
        body: "The bus heads to a Transport Co. stop on Sukhumvit Road in the Pattaya area, between North and Central Pattaya. From there, continue to your hotel by songthaew (baht bus), taxi, Grab or Bolt. Check your hotel location before boarding so you know roughly which part of Pattaya you are heading to.",
      },
      {
        title: "When a taxi or private transfer is better",
        body: "The bus is the cheapest option, but a taxi or pre-booked private transfer can be easier if you land late, travel with family, carry large luggage, or want to go straight to your hotel door. A taxi from Don Mueang to Pattaya usually costs well over 1,000 THB, but saves waiting and transfers. Confirm the price and route before you go.",
      },
      {
        title: "If you land late or miss the last bus",
        body: "The direct bus does not run late at night, so if you land in the evening, check whether the last departure has already gone before heading to the counter. After the last bus, your realistic options are a metered taxi, an app ride or a pre-booked private transfer. Avoid unofficial drivers offering unclear fares, vehicles or destinations.",
      },
    ],
    internalLinks: [
      {
        label: "Don Mueang Airport to Pattaya Bus",
        href: "/en/don-mueang-airport-to-pattaya",
        description:
          "Check current departure times, fare notes and source status.",
      },
      {
        label: "Pattaya to Don Mueang Airport Bus",
        href: "/en/pattaya-to-don-mueang-airport",
        description:
          "Plan the return trip to the airport before your flight.",
      },
      {
        label: "Bangkok to Pattaya Bus",
        href: "/en/bangkok-to-pattaya",
        description:
          "Compare other ways to reach Pattaya from Bangkok and its airports.",
      },
    ],
    faq: [
      {
        question: "Is there a direct bus from Don Mueang Airport to Pattaya?",
        answer:
          "Yes. Transport Co. (the government 999 bus) runs a direct service from Don Mueang to Pattaya, so you no longer have to transfer through Mo Chit bus terminal.",
      },
      {
        question: "How much is the bus from Don Mueang to Pattaya?",
        answer:
          "The fare is around 155 THB per person. Confirm the current price at the counter or on the route page before travel.",
      },
      {
        question: "Where do I catch the bus at Don Mueang Airport?",
        answer:
          "On Floor 1 in the public arrivals area, look for the Transport Co. / 999 Pattaya bus counter. Counters are linked to the International (Building 1) and Domestic (Building 2) terminals.",
      },
      {
        question: "How long does the bus take to Pattaya?",
        answer:
          "Usually around 3 to 3.5 hours, depending on traffic. Allow extra time on busy days.",
      },
      {
        question: "Where does the bus stop in Pattaya?",
        answer:
          "At a Transport Co. stop on Sukhumvit Road between North and Central Pattaya. Continue to your hotel by songthaew, taxi, Grab or Bolt.",
      },
      {
        question: "What if I land late at night?",
        answer:
          "The direct bus does not run late, so check whether the last departure has gone. After that, a metered taxi, app ride or pre-booked transfer is usually the safest option.",
      },
    ],
    sources: [
      {
        label: "Don Mueang Airport (AOT) - Transport",
        url: "https://donmueang.airportthai.co.th/",
      },
      {
        label: "Don Mueang Airport to Pattaya route page",
        url: "/en/don-mueang-airport-to-pattaya",
      },
      {
        label: "Transport Co. (Bus 999)",
        url: "https://transport.co.th/",
      },
    ],
  },
  {
    slug: "pattaya-to-don-mueang-airport-bus",
    title:
      "Pattaya to Don Mueang Airport Bus | Direct Service & Flight Tips",
    description:
      "How to take the direct bus from Pattaya to Don Mueang Airport (DMK) before a flight: where it departs, operator, fare, travel time, and how much buffer to leave for check-in.",
    h1: "Pattaya to Don Mueang Airport Bus (Direct)",
    intro:
      "There is a direct bus from Pattaya to Don Mueang Airport (DMK), run by the government operator Transport Co. (the 999 bus). It is the cheapest and simplest way to reach DMK for a flight without changing buses in Bangkok. Because you are traveling to catch a flight, the most important thing is leaving enough time for traffic and check-in. This guide explains where the bus departs, how long it takes, and how much buffer to plan.",
    shortAnswer:
      "The direct Pattaya to Don Mueang bus departs from a Transport Co. stop on Sukhumvit Road, with secondary sources showing online fares of 167-183 THB per person. Plan for roughly 3 to 3.5 hours of travel, then add time for check-in and security - do not take the last possible bus before an early flight. Check the Pattaya to Don Mueang route page for current departure times.",
    routeId: "pattaya-to-don-mueang-airport",
    routeLinkLabel: "Open Pattaya to Don Mueang Airport bus times",
    ctaLabel: "Check Pattaya to Don Mueang tickets",
    lastUpdated: "2026-08-03",
    lastVerified: "2026-08-23",
    keyPoints: [
      "The bus goes direct to Don Mueang - you do not need to change buses in Bangkok.",
      "It departs from a Transport Co. stop on Sukhumvit Road in Pattaya, with secondary sources showing online fares of 167-183 THB per person.",
      "Leave a generous buffer for traffic, check-in and security - do not rely on the last bus before an early or international flight.",
    ],
    sections: [
      {
        title: "Where the bus departs in Pattaya",
        body: "The direct Don Mueang bus leaves from a Transport Co. office and stop on Sukhumvit Road, on the east side of Pattaya City. Check exactly where it is before your travel day, especially if your hotel is in Jomtien, on Beach Road or in Naklua, because you will need a songthaew, taxi or app ride to reach the departure point first. Allow time for that local transfer as well.",
      },
      {
        title: "Why the direct bus is simpler before a flight",
        body: "The direct Transport Co. bus takes you from Pattaya toward Don Mueang without changing vehicles. The older alternative - a bus to Bangkok's Northern Bus Terminal and then a shuttle to the airport - adds connection time and uncertainty. For a flight, fewer changes means fewer things that can go wrong, which is why the direct bus is usually the better choice if the timing fits.",
      },
      {
        title: "How much the bus costs",
        body: "Secondary sources show online fares of 167-183 THB per person. The main advantage over taking a bus to Bangkok's Northern Bus Terminal and then a shuttle bus is the direct journey without a transfer; it is also far cheaper than a private taxi. Confirm the current fare on the route page or at the counter before travel.",
      },
      {
        title: "How long the journey takes - and your flight buffer",
        body: "The bus ride takes around 3 to 3.5 hours, depending on traffic. The road into Bangkok can be slow, especially on Friday evenings, weekends and holidays. On top of the travel time, add time for check-in, baggage drop and security at Don Mueang. For an early or international flight, leave a generous buffer and avoid the last possible departure.",
      },
      {
        title: "Departure times and how often the bus runs",
        body: "The bus runs several times a day rather than continuously, so departures need planning around your flight. Check the Pattaya to Don Mueang route page on this site for current times, then choose a departure that gets you to the airport with a comfortable buffer - not one that arrives just before check-in closes.",
      },
      {
        title: "Arriving at Don Mueang",
        body: "The bus arrives at Don Mueang Airport. Once there, check your terminal - Don Mueang handles both international and domestic flights from different buildings - and head to check-in with time to spare. Confirm your airline's terminal and check-in counter on your booking so you do not lose time finding it after the bus.",
      },
      {
        title: "When a taxi or private transfer is better",
        body: "A taxi or pre-booked private transfer can be worth it if you have an early flight, travel with family, carry large luggage, or your hotel is far from the Sukhumvit Road departure point. It costs much more than the bus - usually well over 1,000 THB - but gives you a fixed pickup time and door-to-door travel. Confirm the price and route before you go.",
      },
      {
        title: "Don't rely on the last bus before a flight",
        body: "The bus does not run late into the night, and the last departure may be in the late afternoon or early evening. For a late or early-morning flight, the bus timing may not work at all - in that case, plan a taxi or private transfer instead. Never build a tight flight plan around the final bus of the day.",
      },
    ],
    internalLinks: [
      {
        label: "Pattaya to Don Mueang Airport Bus",
        href: "/en/pattaya-to-don-mueang-airport",
        description:
          "Check current departure times, fare notes and source status.",
      },
      {
        label: "Don Mueang Airport to Pattaya Bus",
        href: "/en/don-mueang-airport-to-pattaya",
        description:
          "Plan the trip the other way, from the airport to Pattaya.",
      },
      {
        label: "Pattaya to Bangkok Bus",
        href: "/en/pattaya-to-bangkok",
        description:
          "Compare other routes from Pattaya toward Bangkok and its airports.",
      },
    ],
    faq: [
      {
        question: "Is there a direct bus from Pattaya to Don Mueang Airport?",
        answer:
          "Yes. Transport Co. (the government 999 bus) runs a direct service from Pattaya to Don Mueang, so you do not need to change buses in Bangkok.",
      },
      {
        question: "How much is the bus from Pattaya to Don Mueang?",
        answer:
          "Secondary sources show online fares of 167-183 THB per person. Confirm the current price at the counter or on the route page before travel.",
      },
      {
        question: "Where does the bus leave from in Pattaya?",
        answer:
          "From a Transport Co. stop on Sukhumvit Road, on the east side of Pattaya. Allow time to reach it from your hotel by songthaew, taxi or app ride.",
      },
      {
        question: "How much time should I leave before my flight?",
        answer:
          "The bus ride takes around 3 to 3.5 hours. Add check-in and security time on top of that; for early or international flights, leave a generous buffer and avoid the last bus.",
      },
      {
        question: "How long does the bus take to Don Mueang?",
        answer:
          "Usually around 3 to 3.5 hours, depending on traffic. Allow extra time on busy days.",
      },
      {
        question: "Can I take the bus for an early morning flight?",
        answer:
          "Often not - the bus does not run late at night or very early. For early flights, a taxi or pre-booked private transfer is usually the safer choice.",
      },
    ],
    sources: [
      {
        label: "Don Mueang Airport (AOT) - Transport",
        url: "https://donmueang.airportthai.co.th/",
      },
      {
        label: "Pattaya to Don Mueang Airport route page",
        url: "/en/pattaya-to-don-mueang-airport",
      },
      {
        label: "Transport Co. (Bus 999)",
        url: "https://transport.co.th/",
      },
    ],
  },
  {
    slug: "pattaya-to-suvarnabhumi-airport-before-flight",
    title:
      "Pattaya to Suvarnabhumi Airport Before a Flight | Bus Timing & Tips",
    description:
      "How to take the bus from Pattaya to Suvarnabhumi Airport (BKK) before a flight: where it departs, fare, travel time, how much buffer to leave, baggage limits, and when a taxi is safer.",
    h1: "Pattaya to Suvarnabhumi Airport Before a Flight",
    intro:
      "Taking the bus from Pattaya to Suvarnabhumi Airport (BKK) is the cheapest way to reach your flight, and it drops you right at the departure terminal. Because you are traveling to catch a flight, timing matters more than anything else - traffic, check-in and security all eat into your buffer. This guide explains where the bus departs in Pattaya, how long it takes, how much time to leave, and when a taxi or private transfer is the safer choice.",
    shortAnswer:
      "The 130 THB Pattaya to Suvarnabhumi bus departs from North Pattaya Bus Station and drops you at the airport departure terminal. Plan for around 2 hours of travel, then add check-in and security time - leave a generous buffer and do not rely on the last bus before an early or international flight. Check the Pattaya to Suvarnabhumi route page for current departure times.",
    routeId: "pattaya-to-suvarnabhumi-airport",
    routeLinkLabel: "Open Pattaya to Suvarnabhumi Airport bus times",
    ctaLabel: "Check prices & availability",
    lastUpdated: "2026-08-03",
    lastVerified: "2026-08-23",
    keyPoints: [
      "The bus drops you directly at the Suvarnabhumi departure terminal, where you check in - no airport transfer needed.",
      "The bus ride takes around 2 hours; add time to reach the station, check in and clear security, and leave a generous buffer.",
      "Do not build a tight flight plan around the last bus of the day - if the timing is tight, take a taxi or private transfer instead.",
    ],
    sections: [
      {
        title: "Where the bus departs in Pattaya",
        body: "The 130 THB airport bus leaves from North Pattaya Bus Station. A separate hourly service costs 151 THB and leaves from Jomtien, so confirm which service you are booking. If your hotel is on Beach Road, in Naklua or central Pattaya, allow time to reach the departure point first by songthaew, taxi or app ride.",
      },
      {
        title: "How much time to leave before your flight",
        body: "This is the most important part of the trip. The bus ride takes around 2 hours, but your door-to-door plan must be longer. Add time to reach the departure point in Pattaya, possible traffic near Bangkok, and check-in, baggage drop and security at the airport. A common guideline is to allow at least two hours of buffer beyond the expected travel time for an international flight. If your schedule is tight, do not take the bus.",
      },
      {
        title: "Where the bus drops you at the airport",
        body: "One advantage of the airport bus is that it drops you at the Suvarnabhumi departure terminal, right where you check in for your flight - you do not need a separate airport transfer. Once you arrive, head straight to your airline's check-in row. Confirm your terminal and check-in counter on your booking so you do not lose time after getting off the bus.",
      },
      {
        title: "How much the bus costs",
        body: "The operator publishes a fare of 130 THB per seat for the service from Pattaya Bus Station. It separately lists an hourly Suvarnabhumi-Jomtien service at 151 THB per seat. The bus fare is a fraction of the taxi fare. Confirm the current price on the route page or at the counter before travel, because operator prices change.",
      },
      {
        title: "How long the journey takes",
        body: "The bus ride takes around 2 hours. The road from Pattaya to Suvarnabhumi is mostly motorway and usually predictable, but Friday evenings, weekends and Thai holidays can add time because the same road carries a lot of airport traffic. The bus runs direct with no comfort stop, so use the restroom before boarding.",
      },
      {
        title: "Booking: online or at the counter",
        body: "You can usually buy at the counter on the day or book online in advance. For weekday travel, buying at the counter is often fine. For weekends, Thai holidays or an important flight, booking online ahead of time can secure your seat - the bus can sell out at busy times. Either way, the timetable on this site stays independent; booking links just let you compare live seats and transfers.",
      },
      {
        title: "Baggage on the airport bus",
        body: "The airport bus is a full coach with luggage storage, but baggage allowances can apply - often broadly similar to airline limits, such as around 20 kg per person and a limit on the number of bags. If you have oversized or extra luggage, check with the operator before travel, or consider a private transfer where space is less of an issue.",
      },
      {
        title: "When a taxi or private transfer is safer",
        body: "For an early-morning flight, a late arrival, or a tight connection, a taxi or pre-booked private transfer is usually the safer choice. It costs much more than the bus - often well over 1,000 THB - but gives you a fixed pickup time and door-to-door travel, with no dependence on the bus schedule. If missing your flight is not an option, pay for the certainty.",
      },
    ],
    internalLinks: [
      {
        label: "Pattaya to Suvarnabhumi Airport Bus",
        href: "/en/pattaya-to-suvarnabhumi-airport",
        description:
          "Check current departure times, fare notes and boarding information.",
      },
      {
        label: "Suvarnabhumi Airport to Pattaya Bus (Gate 8)",
        href: "/en/suvarnabhumi-airport-gate-8-pattaya-bus",
        description:
          "Plan the trip the other way, from the airport to Pattaya.",
      },
      {
        label: "Pattaya Bus Station to Jomtien guide",
        href: "/en/pattaya-bus-station-to-jomtien",
        description:
          "Find your way around the Jomtien and Thappraya bus area before departure.",
      },
    ],
    faq: [
      {
        question: "Where does the Pattaya to Suvarnabhumi Airport bus leave from?",
        answer:
          "The 130 THB Pattaya to Suvarnabhumi service leaves from North Pattaya Bus Station. A separate hourly service leaves from Jomtien and costs 151 THB, so confirm which service you are booking.",
      },
      {
        question: "How much time should I leave before my flight?",
        answer:
          "The bus ride takes around 2 hours. Add time to reach the station, check in and clear security; for international flights, leave a generous buffer and avoid the last bus of the day.",
      },
      {
        question: "Where does the bus drop me at the airport?",
        answer:
          "At the Suvarnabhumi departure terminal, where you check in - so you do not need a separate airport transfer.",
      },
      {
        question: "How much does the bus cost?",
        answer:
          "The operator publishes a fare of 130 THB per seat for the service from Pattaya Bus Station and separately lists an hourly Suvarnabhumi-Jomtien service at 151 THB per seat. Confirm the current price on the route page or at the counter.",
      },
      {
        question: "Can I take the bus for an early morning flight?",
        answer:
          "Often the schedule does not start early enough, and the buffer is risky. For early flights, a taxi or pre-booked private transfer is usually safer.",
      },
      {
        question: "Are there baggage limits on the airport bus?",
        answer:
          "Yes, allowances can apply, often broadly similar to airline limits such as around 20 kg per person. Check with the operator if you have oversized or extra bags.",
      },
    ],
    sources: [
      {
        label: "Pattaya to Suvarnabhumi Airport route page",
        url: "/en/pattaya-to-suvarnabhumi-airport",
      },
      {
        label: "Airport Pattaya Bus",
        url: "https://airportpattayabus.com/",
      },
      {
        label: "Roong Reuang Coach",
        url: "https://airportpattayabus.com/bangkok-terminal-pattaya/",
      },
    ],
  },
  {
    slug: "pattaya-to-bangkok-which-terminal",
    title: "Pattaya to Bangkok: Which Terminal? Ekkamai vs Mo Chit",
    description:
      "Choosing between Ekkamai and Mo Chit when taking the bus from Pattaya to Bangkok: which terminal suits your Bangkok destination, onward transport by BTS or taxi, fares and luggage tips.",
    h1: "Pattaya to Bangkok: Ekkamai or Mo Chit?",
    intro:
      "Buses from Pattaya to Bangkok arrive at one of two main terminals - Ekkamai or Mo Chit - and choosing the right one makes your onward journey much easier. The best terminal depends on where you are heading in Bangkok and how you plan to continue from there. This guide explains the difference between the two terminals, how to reach your final destination from each, and practical tips on fares, luggage and departure from Pattaya.",
    shortAnswer:
      "Most Pattaya to Bangkok buses arrive at either Ekkamai (eastern Bangkok, on the BTS Sukhumvit line) or Mo Chit (northern Bangkok, near Chatuchak). Choose Ekkamai if you are heading to Sukhumvit areas like Asok, Thong Lo or Phrom Phong, because it connects directly to the BTS. Choose Mo Chit if you are going to northern Bangkok, or if you prefer to continue by taxi. Check the Pattaya to Bangkok route page for current departure times.",
    routeId: "pattaya-to-bangkok",
    routeLinkLabel: "Open Pattaya to Bangkok bus times",
    ctaLabel: "Check prices & availability",
    lastUpdated: "2026-08-03",
    lastVerified: "2026-08-23",
    keyPoints: [
      "Ekkamai is the only major Bangkok bus terminal within walking distance of a BTS station, ideal for Sukhumvit destinations.",
      "Mo Chit serves northern Bangkok and is better if you are heading that way or continuing by taxi - the BTS is about 2 km from the terminal.",
      "Buses leave from the North Pattaya Bus Terminal, about 3 km from central Pattaya - allow time to reach it by taxi or songthaew.",
    ],
    sections: [
      {
        title: "The two Bangkok terminals at a glance",
        body: "Pattaya to Bangkok buses run by the main coach operators arrive at one of two terminals. Ekkamai (the Eastern Bus Terminal) sits on Sukhumvit Road in eastern Bangkok, right next to Ekkamai BTS station. Mo Chit (the Northern Bus Terminal, sometimes called Mo Chit 2 or the Chatuchak Coach Station) is in northern Bangkok, near Chatuchak Park. Both are served by the same Pattaya buses, so your choice is mainly about where you want to end up in Bangkok.",
      },
      {
        title: "Choose Ekkamai if you are heading to Sukhumvit",
        body: "Ekkamai is the most convenient terminal for most visitors because it is the only major Bangkok bus station within easy walking distance of a BTS station. From Ekkamai BTS you can reach Sukhumvit areas such as Asok, Nana, Phrom Phong and Thong Lo quickly, and connect to the wider BTS and MRT network. If your hotel is anywhere along the Sukhumvit corridor, or you want the simplest onward journey, Ekkamai is usually the better choice.",
      },
      {
        title: "Choose Mo Chit if you are heading north or prefer a taxi",
        body: "Mo Chit is the better choice if you are staying in northern Bangkok, near Chatuchak, or in riverside and Khao San areas that are not on the BTS network. The catch is that the terminal is not right next to a train station - BTS Mo Chit and MRT Chatuchak Park are about 2 km away, so you would take a short taxi, Grab or motorcycle taxi to reach them. If you are continuing entirely by taxi anyway, Mo Chit can be just as convenient as Ekkamai.",
      },
      {
        title: "How to continue from each terminal",
        body: "From Ekkamai, walk to Ekkamai BTS and take the Sukhumvit line - simple and traffic-free. From Mo Chit, take a taxi or Grab directly to your destination, or a short ride to BTS Mo Chit or MRT Chatuchak Park if you want the train. As a rough guide, a taxi from the terminal area to central Sukhumvit or Siam can range widely with traffic and demand, so use a meter or agree the fare first. For Bangkok's traffic, the BTS or MRT is often faster than a taxi for Sukhumvit, Siam and Silom.",
      },
      {
        title: "Where the bus leaves from in Pattaya",
        body: "Most Pattaya to Bangkok buses depart from the North Pattaya Bus Terminal on North Pattaya Road, roughly 3 km from the center of Pattaya. It is too far to walk comfortably from most hotels, so plan to reach it by taxi, Grab or songthaew. If your hotel is in Jomtien, Pratumnak or Naklua, allow extra time. Open the terminal in a map app before you leave so you know how long the transfer will take.",
      },
      {
        title: "Travel time and fares",
        body: "The journey usually takes around 2 to 3 hours depending on traffic, especially near Bangkok. Fares are modest - typically in the range of about 150 THB per seat, though exact prices vary by operator and can change. Both Ekkamai and Mo Chit services are similar in price and time, so the fare is rarely the deciding factor - your Bangkok destination matters more. Check the route page for current departure times and fare notes before you travel.",
      },
      {
        title: "Luggage and tickets",
        body: "You can usually buy tickets at the counter at the North Pattaya terminal on the day, or book online in advance for busy weekends and holidays. Standard luggage allowance is generally one main bag plus a carry-on, with a small extra charge (around 20 THB) for additional bags. Arrive 20 to 30 minutes before departure so you have time to buy your ticket and find the right platform.",
      },
      {
        title: "Which terminal should you pick?",
        body: "In short: pick Ekkamai for Sukhumvit and anywhere easily reached by BTS, and pick Mo Chit for northern Bangkok or if you are continuing by taxi. If you are unsure, Ekkamai is the safer default for most tourists because of its direct BTS connection. Whichever you choose, confirm the destination terminal when you buy your ticket, since some services run to one terminal and not the other.",
      },
    ],
    internalLinks: [
      {
        label: "Pattaya to Bangkok Bus",
        href: "/en/pattaya-to-bangkok",
        description:
          "Check current departure times to Ekkamai and Mo Chit, fares and station details.",
      },
      {
        label: "Mo Chit Bus Terminal to Pattaya guide",
        href: "/en/mo-chit-bus-terminal-to-pattaya",
        description:
          "Planning the trip the other way? Compare the same terminals from Bangkok to Pattaya.",
      },
      {
        label: "Ekkamai Bus Terminal to Pattaya guide",
        href: "/en/ekkamai-bus-terminal-to-pattaya-guide",
        description:
          "More on Ekkamai terminal and its BTS connection.",
      },
    ],
    faq: [
      {
        question: "Which is better for Pattaya to Bangkok - Ekkamai or Mo Chit?",
        answer:
          "Ekkamai is better for Sukhumvit areas because it connects directly to the BTS. Mo Chit is better for northern Bangkok or if you are continuing by taxi. For most tourists, Ekkamai is the easier default.",
      },
      {
        question: "Is Ekkamai terminal close to the BTS?",
        answer:
          "Yes. Ekkamai is the only major Bangkok bus terminal within easy walking distance of a BTS station (Ekkamai station on the Sukhumvit line).",
      },
      {
        question: "How far is Mo Chit terminal from the BTS?",
        answer:
          "About 2 km. BTS Mo Chit and MRT Chatuchak Park are a short taxi, Grab or motorcycle-taxi ride from the Mo Chit bus terminal.",
      },
      {
        question: "Where does the bus leave from in Pattaya?",
        answer:
          "From the North Pattaya Bus Terminal on North Pattaya Road, about 3 km from central Pattaya. Reach it by taxi, Grab or songthaew.",
      },
      {
        question: "How much does the Pattaya to Bangkok bus cost?",
        answer:
          "Typically around 150 THB per seat, though prices vary by operator and can change. Check the route page or the counter for current fares.",
      },
      {
        question: "Can I choose which terminal the bus goes to?",
        answer:
          "Often yes - different services run to Ekkamai or Mo Chit. Confirm the destination terminal when you buy your ticket.",
      },
    ],
    sources: [
      {
        label: "Pattaya to Bangkok route page",
        url: "/en/pattaya-to-bangkok",
      },
      {
        label: "Thailand Life - Pattaya to Bangkok",
        url: "https://thailandlife.info/how-to-get-from-pattaya-to-bangkok/",
      },
      {
        label: "Klook - Bangkok Pattaya guide",
        url: "https://www.klook.com/blog/bangkok-to-pattaya-guide/",
      },
    ],
  },
  {
    slug: "jomtien-bus-station",
    title: "Jomtien Bus Station (Thappraya Road): Airport Bus & Guide",
    description:
      "Where is Jomtien Bus Station on Thappraya Road, how the airport bus to Suvarnabhumi works, tickets, songthaew connections and nearby hotels.",
    h1: "Jomtien Bus Station (Thappraya Road) Guide",
    intro:
      "Jomtien Bus Station on Thappraya Road is the departure point many travelers use for the airport bus from the Jomtien side of Pattaya to Suvarnabhumi. This guide explains where the station is, how boarding works, how to reach it by songthaew or taxi, and where to stay nearby before an early flight.",
    shortAnswer:
      "Jomtien Bus Station is on Thappraya Road, between Pattaya and Jomtien Beach. Airport buses toward Suvarnabhumi board here - check the Pattaya to Suvarnabhumi Airport route page for current departure times and fares before you go.",
    routeId: "pattaya-to-suvarnabhumi-airport",
    routeLinkLabel: "Open Pattaya to Suvarnabhumi Airport Bus",
    ctaLabel: "Check Jomtien → Suvarnabhumi tickets",
    ctaPosition: "guide_body",
    ctaSubId: "bpb-pattaya-to-suvarnabhumi-airport-guide_jomtien_station",
    lastUpdated: "2026-08-02",
    lastVerified: "2026-08-23",
    keyPoints: [
      "Best boarding point if you stay in Jomtien, on Thappraya Road or in south Pattaya.",
      "The ticket office is sometimes listed as the \"Thappraya bus office\" - it is the same place.",
      "Arrive early for airport departures and keep a time buffer before international flights.",
    ],
    sections: [
      {
        title: "Where is Jomtien Bus Station?",
        body: "The station is on Thappraya Road, the road that links south Pattaya with Jomtien Beach. Many maps and reviews call it the Thappraya Road bus office or Jomtien airport bus stop - these names refer to the same boarding point. Check the exact pin and entrance photos on the route page before your first visit.",
      },
      {
        title: "Airport bus to Suvarnabhumi",
        body: "Buses from the Jomtien area toward Suvarnabhumi Airport board at this station. Departure times and fares change, so treat this guide as orientation and check the Pattaya to Suvarnabhumi Airport route page on this site for the current timetable, fare notes and source status.",
      },
      {
        title: "Where to buy tickets",
        body: "Buy at the station counter or compare online options in advance. For early-morning airport departures many travelers prefer booking a seat online the day before, then arriving with the confirmation ready. Keep small cash for the counter and confirm the destination before paying.",
      },
      {
        title: "How to get to the station",
        body: "From Jomtien Beach Road, a songthaew or short taxi ride brings you to Thappraya Road. From central Pattaya, taxi, Grab or Bolt is the simplest option with luggage. Agree the destination clearly: \"Jomtien Bus Station, Thappraya Road\" or show the map pin.",
      },
      {
        title: "How early to arrive",
        body: "For airport buses, be at the station at least 20-30 minutes before departure. Add more buffer on weekends and holidays. For international flights, plan to reach Suvarnabhumi about 3 hours before departure time, so pick a bus that lands you there with margin.",
      },
      {
        title: "Staying near the station before an early flight",
        body: "If your flight forces a very early start, staying within a short ride of Thappraya Road makes the morning easier. Jomtien and south Pattaya have many hotels in all price ranges - compare options for your dates and pick something close to the station side of Jomtien.",
      },
      {
        title: "If the bus is full or times do not fit",
        body: "Ask the counter about the next departure. If the schedule does not work, compare a private transfer or taxi to the airport - for 3-4 people traveling together the per-person cost gets closer to bus tickets, and pickup can be from your hotel.",
      },
      {
        title: "Arriving from the airport to Jomtien",
        body: "In the opposite direction, some airport buses from Suvarnabhumi drop passengers on the Jomtien side - check the Suvarnabhumi Airport to Pattaya route page for current stops. From the drop-off point, songthaews and taxis cover the last stretch to Jomtien Beach hotels.",
      },
    ],
    internalLinks: [
      {
        label: "Pattaya to Suvarnabhumi Airport Bus",
        href: "/en/pattaya-to-suvarnabhumi-airport",
        description:
          "Current departure times, fares and boarding details for the airport bus.",
      },
      {
        label: "Suvarnabhumi Airport to Pattaya Bus",
        href: "/en/suvarnabhumi-airport-to-pattaya",
        description:
          "Arrival direction: times, fares and where the bus stops in Pattaya.",
      },
      {
        label: "Pattaya Bus Station to Jomtien",
        href: "/en/pattaya-bus-station-to-jomtien",
        description:
          "How to get between North Pattaya Bus Station and Jomtien after arrival.",
      },
    ],
    faq: [
      {
        question: "Where exactly is Jomtien Bus Station?",
        answer:
          "On Thappraya Road, between south Pattaya and Jomtien Beach. It is often called the Thappraya bus office - the same boarding point for airport buses.",
      },
      {
        question: "Is the Thappraya bus office the same as Jomtien Bus Station?",
        answer:
          "Yes. Reviews and maps use both names for the airport bus boarding point on Thappraya Road.",
      },
      {
        question: "Which airport can I reach from Jomtien Bus Station?",
        answer:
          "Buses from this station head toward Suvarnabhumi Airport. For Don Mueang, check the Pattaya to Don Mueang route page for the correct departure point.",
      },
      {
        question: "How do I get from Jomtien Beach to the station?",
        answer:
          "A songthaew along the Jomtien routes or a short taxi, Grab or Bolt ride to Thappraya Road. With luggage, a taxi is usually easier.",
      },
      {
        question: "What time is the bus from Jomtien to Suvarnabhumi?",
        answer:
          "Times change, so always check the Pattaya to Suvarnabhumi Airport route page on this site for the current timetable, then confirm at the counter.",
      },
    ],
    sources: [
      {
        label: "Pattaya to Suvarnabhumi Airport route page",
        url: "/en/pattaya-to-suvarnabhumi-airport",
      },
      {
        label: "Pattaya Bus / Roong Reuang Coach",
        url: "https://airportpattayabus.com/bangkok-terminal-pattaya/",
      },
    ],
  },
  {
    slug: "hotels-near-pattaya-bus-station",
    title: "Hotels near Pattaya Bus Station: Where to Stay (North Pattaya)",
    description:
      "Best areas to stay near North Pattaya Bus Station: closest zones, late-arrival and early-departure tips, and how to pick a hotel by walking distance.",
    h1: "Hotels near Pattaya Bus Station: Where to Stay",
    intro:
      "Most buses from Bangkok arrive at North Pattaya Bus Station. If you arrive late, leave early, or simply want a short transfer, staying nearby saves time and stress. This guide compares the areas around the station and shows how to pick a hotel that fits a bus-based trip.",
    shortAnswer:
      "Stay in the North Pattaya area if you want the shortest ride to the bus station. Naklua and Wong Amat are quieter beach-side options a few minutes away, while Central Pattaya has the most shopping and nightlife within a short songthaew or Grab ride.",
    shortAnswerHotelCity: "pattaya",
    routeId: "bangkok-to-pattaya",
    routeLinkLabel: "Open Bangkok to Pattaya Bus",
    ctaLabel: "Check Bangkok → Pattaya tickets",
    ctaPosition: "guide_body",
    ctaSubId: "bpb-bangkok-to-pattaya-guide_hotels_station",
    lastUpdated: "2026-08-02",
    lastVerified: "2026-08-23",
    keyPoints: [
      "North Pattaya is the most convenient area for early buses and late arrivals.",
      "Use the map view when booking and check the distance to North Pattaya Bus Station.",
      "Central Pattaya is still fine with a morning bus if you leave a 20-30 minute buffer.",
    ],
    sections: [
      {
        title: "Where do buses from Bangkok arrive?",
        body: "Most services from Ekkamai and Mo Chit arrive at North Pattaya Bus Station, near the northern end of the city. Some routes and operators use other stops, so confirm the arrival point on the route page before you choose a hotel area.",
      },
      {
        title: "Why stay near the bus station",
        body: "A hotel close to the station makes a bus-based trip easier: you avoid a long transfer after arrival, and on departure day you are minutes from boarding instead of crossing the whole city in traffic. It is the safest setup for early-morning buses and for late-evening arrivals.",
      },
      {
        title: "North Pattaya: closest to the station",
        body: "The area around North Pattaya Road gives you the shortest ride to the bus station, with plenty of local restaurants and convenience stores. It is generally calmer than the center. Good choice for a first or last night when your priority is the bus, not the nightlife.",
      },
      {
        title: "Naklua and Wong Amat: quiet beach side",
        body: "North of the station, Naklua and Wong Amat offer a more relaxed, beach-oriented stay a short Grab or songthaew ride away. Pick this zone if you want quieter evenings and beach time but still an easy connection to the station.",
      },
      {
        title: "Central Pattaya and Second Road: shopping and nightlife",
        body: "Central Pattaya has the biggest choice of hotels, malls and nightlife. The trade-off is a 10-20 minute ride to the bus station depending on traffic. It works well with a mid-morning bus; for the earliest departures, add extra buffer or stay closer to the station.",
      },
      {
        title: "How to pick the hotel: use the map, not just the price",
        body: "When comparing hotels for your dates, switch to the map view and check the real distance to North Pattaya Bus Station. For late arrivals, look for a 24-hour front desk. For early buses, confirm that breakfast or checkout works at your departure time, and pack the evening before.",
      },
      {
        title: "Getting between the station and your hotel",
        body: "Songthaews run along the main roads and are the cheapest option, Grab and Bolt work well with luggage, and taxis are available at the station - agree on the destination and price before you get in. Most rides within North and Central Pattaya take only a few minutes outside rush hour.",
      },
    ],
    internalLinks: [
      {
        label: "Bangkok to Pattaya Bus",
        href: "/en/bangkok-to-pattaya",
        description:
          "Current timetable, fares and arrival details for the main route into Pattaya.",
      },
      {
        label: "Pattaya Bus Station to Jomtien",
        href: "/en/pattaya-bus-station-to-jomtien",
        description: "Onward travel from North Pattaya Bus Station to Jomtien.",
      },
      {
        label: "Jomtien Bus Station (Thappraya Road)",
        href: "/en/jomtien-bus-station",
        description:
          "Airport bus boarding point on the Jomtien side, with nearby stay tips.",
      },
    ],
    faq: [
      {
        question:
          "Are there hotels within walking distance of North Pattaya Bus Station?",
        answer:
          "Yes - the North Pattaya area has options a short walk or a few minutes' ride away. Use the map view when booking and check the distance to the station for your exact pick.",
      },
      {
        question: "Is North Pattaya a good base for the whole trip?",
        answer:
          "It is calmer than the center and great for bus connections. If you want nightlife and shopping at your doorstep, Central Pattaya may suit you better, at the cost of a longer ride to the station.",
      },
      {
        question: "How far is Central Pattaya from the bus station?",
        answer:
          "Usually a 10-20 minute ride depending on traffic. With an early-morning bus, leave extra buffer or choose a hotel closer to the station.",
      },
      {
        question: "I arrive late in the evening - what should I check?",
        answer:
          "Pick a hotel with a 24-hour front desk, and use Grab, Bolt or a taxi from the station. Agree the destination and price before the ride if you take a taxi.",
      },
      {
        question: "Should I book ahead or find a hotel after arrival?",
        answer:
          "For high season, weekends and Thai holidays, book ahead for your dates. In quiet periods walk-ins are possible, but arriving with a booking is easier after a long bus ride.",
      },
    ],
    sources: [
      {
        label: "Bangkok to Pattaya route page",
        url: "/en/bangkok-to-pattaya",
      },
      {
        label: "Pattaya Bus / Roong Reuang Coach",
        url: "https://airportpattayabus.com/bangkok-terminal-pattaya/",
      },
    ],
  },
  {
    slug: "pattaya-to-suvarnabhumi-which-station",
    title: "Pattaya to Suvarnabhumi: North Pattaya vs Jomtien Bus",
    description:
      "Compare North Pattaya and Jomtien buses to Suvarnabhumi Airport: boarding stations, fares, departure windows, travel time and which service fits your hotel.",
    h1: "Pattaya to Suvarnabhumi: North Pattaya or Jomtien?",
    intro:
      "Travelers in Pattaya can reach Suvarnabhumi Airport on two separate Roong Reuang Coach services: one from North Pattaya Bus Station and one from Jomtien Bus Station on Thappraya Road. They have different fares and departure patterns, so the best choice depends on where you are staying and when you need to leave. This guide compares them in one place.",
    shortAnswer:
      "Choose North Pattaya Bus Station for the 130 THB service with seven departures from 08:00 to 21:00. Choose Jomtien Bus Station if you stay in Jomtien, Pratumnak or south Pattaya and want the hourly 151 THB service from 06:00 to 22:00. Both take around 2 hours.",
    routeId: "pattaya-to-suvarnabhumi-airport",
    routeLinkLabel: "Open Pattaya to Suvarnabhumi Airport bus times",
    ctaLabel: "Check Pattaya → Suvarnabhumi tickets",
    lastUpdated: "2026-08-03",
    lastVerified: "2026-08-23",
    keyPoints: [
      "North Pattaya Bus Station has seven departures at 08:00, 10:00, 12:00, 14:00, 16:00, 18:00 and 21:00, with a fare of 130 THB per seat.",
      "Jomtien Bus Station has 17 hourly departures from 06:00 to 22:00, with a fare of 151 THB per seat.",
      "For the reverse trip from Suvarnabhumi, the 22:00 departure ends at Pattaya Bus Station and does not continue to Jomtien.",
    ],
    sections: [
      {
        title: "North Pattaya and Jomtien at a glance",
        body: "Roong Reuang Coach operates both services, and both take around 2 hours to reach Suvarnabhumi Airport. The North Pattaya service leaves from North Pattaya Bus Station and costs 130 THB per seat. The Jomtien service leaves from Jomtien Bus Station on Thappraya Road and costs 151 THB per seat. These are separate products with different departure patterns, not two stops on one route.",
      },
      {
        title: "Choose North Pattaya Bus Station if it is closer",
        body: "North Pattaya Bus Station is the practical choice when you are staying in North Pattaya or Naklua, or when one of its seven departures fits your flight plan. This is the 130 THB service listed on the main Pattaya to Suvarnabhumi route page. Check the distance from your hotel before choosing, because reaching the station is part of your total travel time.",
      },
      {
        title: "Choose Jomtien Bus Station if you are staying south",
        body: "Jomtien Bus Station on Thappraya Road is usually the more convenient choice from Jomtien, Pratumnak and south Pattaya. Its 17 hourly departures from 06:00 to 22:00 also provide more departure choices. The station is farther from Naklua and North Pattaya, so compare the transfer from your hotel before deciding.",
      },
      {
        title: "How to reach North Pattaya Bus Station",
        body: "Open North Pattaya Bus Station in a map app from your hotel and leave enough time to reach it before departure. A songthaew can cost around 15-20 THB, Grab or Bolt around 80-180 THB, and a taxi around 120-350 THB, depending on where you start and current conditions. With luggage or a tight departure, a direct ride is usually simpler.",
      },
      {
        title: "How to reach Jomtien Bus Station",
        body: "Jomtien Bus Station is on Thappraya Road and is close to many hotels in Jomtien, Pratumnak and south Pattaya. From Naklua or North Pattaya, allow substantially more time to cross the city. Use a map app to compare the journey from your hotel, but confirm the cost directly because local transport prices vary.",
      },
      {
        title: "Departure times, fares and travel time",
        body: "The North Pattaya service costs 130 THB per seat and departs at 08:00, 10:00, 12:00, 14:00, 16:00, 18:00 and 21:00. The Jomtien service costs 151 THB per seat and departs hourly from 06:00 to 22:00. Both services take around 2 hours, so station access and the departure that fits your flight are usually more important than journey time.",
      },
      {
        title: "Important: the 22:00 airport bus does not reach Jomtien",
        body: "The operator warns that the 22:00 departure from Suvarnabhumi Airport ends at Pattaya Bus Station and does not continue to Jomtien. This matters on the reverse trip after a late arrival: if your hotel is in Jomtien, you will need to arrange onward transport from Pattaya Bus Station instead of expecting the bus to reach Jomtien.",
      },
      {
        title: "Both airport services use Level 1, Gate 8",
        body: "For the return direction from Suvarnabhumi Airport, both the Pattaya and Jomtien services board at Level 1, Gate 8. Confirm the destination when buying your ticket because the two services have different endpoints, and remember that the 22:00 departure does not continue to Jomtien.",
      },
      {
        title: "Which Pattaya station should you choose?",
        body: "Choose the station that gives you the safest combination of hotel access and departure time. North Pattaya is usually better from the north side of the city, while Jomtien is usually better from Jomtien, Pratumnak and south Pattaya. Check the route page for the main North Pattaya service, then compare the separate Jomtien option before booking.",
      },
    ],
    faq: [
      {
        question: "Which station is better for Suvarnabhumi Airport: North Pattaya or Jomtien?",
        answer:
          "Choose North Pattaya Bus Station if you are staying in North Pattaya or Naklua and one of its seven departures fits. Choose Jomtien Bus Station if you are staying in Jomtien, Pratumnak or south Pattaya, or if its hourly departures suit your flight better.",
      },
      {
        question: "Are the North Pattaya and Jomtien airport buses the same service?",
        answer:
          "No. They are separate Roong Reuang Coach services with different boarding stations, fares and departure patterns, although both travel to Suvarnabhumi Airport.",
      },
      {
        question: "How long do the buses from Pattaya to Suvarnabhumi take?",
        answer:
          "Both the North Pattaya and Jomtien services take around 2 hours. Add enough time to reach the station and complete airport procedures before your flight.",
      },
      {
        question: "How often do the two Suvarnabhumi buses leave Pattaya?",
        answer:
          "North Pattaya has seven departures at 08:00, 10:00, 12:00, 14:00, 16:00, 18:00 and 21:00. Jomtien has 17 hourly departures from 06:00 to 22:00.",
      },
      {
        question: "Where do the Pattaya and Jomtien buses board at Suvarnabhumi Airport?",
        answer:
          "For the return trip from Suvarnabhumi, both services board at Level 1, Gate 8. Confirm whether your ticket is for Pattaya Bus Station or Jomtien.",
      },
      {
        question: "Does the 22:00 bus from Suvarnabhumi Airport go to Jomtien?",
        answer:
          "No. The operator states that the 22:00 departure ends at Pattaya Bus Station and does not continue to Jomtien.",
      },
    ],
    sources: [
      {
        label: "Pattaya to Suvarnabhumi Airport route page",
        url: "/en/pattaya-to-suvarnabhumi-airport",
      },
      {
        label: "Roong Reuang Coach - Pattaya Bus Station service",
        url: "https://airportpattayabus.com/airport-pattaya/",
      },
      {
        label: "Roong Reuang Coach - Jomtien service",
        url: "https://airportpattayabus.com/airport-jomtien/",
      },
    ],
  },
  {
    slug: "tomorrowland-thailand-bangkok-to-pattaya",
    title: "Tomorrowland Thailand 2026: Getting to Pattaya, Wisdom Valley & Hotels",
    description:
      "Plan travel and accommodation for Tomorrowland Thailand 2026: reach Pattaya from Bangkok airports, arrange the final transfer to Wisdom Valley and choose a practical hotel base.",
    h1: "Tomorrowland Thailand 2026: Travel to Pattaya and Where to Stay",
    intro:
      "Tomorrowland Thailand takes place at Wisdom Valley in Khao Mai Kaew, Bang Lamung, Chonburi, from 11 to 13 December 2026. The festival site is inland from Pattaya rather than in the city itself, so Pattaya is the practical base for most international visitors: it has far more accommodation, airport connections and transport choices for the final leg.",
    shortAnswer:
      "Use Pattaya as your accommodation base, then arrange a taxi, Grab, private transfer or an announced festival shuttle for the final trip to Wisdom Valley. Buses can bring you from Bangkok or an airport to Pattaya, but they do not go to the festival site. If you do not have a hotel package, book a Pattaya hotel early and check the official festival channels for non-package shuttle details before you travel.",
    shortAnswerHotelCity: "pattaya",
    routeId: "suvarnabhumi-airport-to-pattaya",
    routeLinkLabel: "Open Suvarnabhumi Airport to Pattaya bus information",
    ctaLabel: "Compare travel options to Pattaya",
    ctaPosition: "guide_body",
    ctaSubId: "bpb-suvarnabhumi-airport-to-pattaya-guide_tomorrowland",
    lastUpdated: "2026-08-24",
    lastVerified: "2026-08-24",
    keyPoints: [
      "Wisdom Valley is inland from Pattaya, so a bus to Pattaya is only the first part of the journey.",
      "There is no DreamVille camping for the Thailand edition; independent visitors should arrange accommodation themselves.",
      "Hotel packages included a hotel-to-site shuttle, but non-package shuttle details have not yet been announced.",
    ],
    transferNote: {
      title: "When a private transfer makes sense for the festival",
      body: "A bus to Pattaya is the cheapest way in and works well if you arrive with time to spare. A private transfer costs several times more, but it splits well across a group, carries luggage without trouble and does not depend on a timetable - which matters on festival days and for a return that can finish around dawn.",
      ctaLabel: "Compare private transfer prices",
    },
    sections: [
      {
        title: "Where the festival site is, and why Pattaya is the sensible base",
        body: "Wisdom Valley is in Khao Mai Kaew, Bang Lamung, Chonburi, roughly 20 km inland from Pattaya. Pattaya is not the festival site, but it is the most practical base because it has a wide choice of hotels, restaurants and onward transport. Expect the final car journey to take roughly 20 to 30 minutes in normal conditions, with extra time likely around festival traffic. There is no DreamVille camping for this edition, so most visitors need a hotel or another private accommodation plan.",
      },
      {
        title: "From Suvarnabhumi Airport to Pattaya",
        body: "For many international arrivals, Suvarnabhumi is the most straightforward airport gateway. The festival site is about 114 km from the airport, while Pattaya has direct airport-bus and private-transfer options. Use the Suvarnabhumi to Pattaya route page for current bus details, then arrange the separate final transfer from your hotel or Pattaya arrival point to Wisdom Valley. Do not treat a Pattaya bus ticket as transport to the festival grounds.",
      },
      {
        title: "From Don Mueang Airport to Pattaya",
        body: "Don Mueang is farther from the festival site, at roughly 143 km, but it can still work for travelers whose airline uses that airport. Check the dedicated Don Mueang to Pattaya guide for the current route options and confirm the final Pattaya drop-off before booking a hotel. From Pattaya, you still need a taxi, Grab, private transfer or an officially announced shuttle to reach Wisdom Valley.",
      },
      {
        title: "From central Bangkok to Pattaya",
        body: "Travelers already in Bangkok can use the city-to-Pattaya routes linked on this site, or choose a private transfer if their group, luggage or arrival timing makes that simpler. Build the itinerary in two parts: first reach Pattaya, then plan the final inland journey to Wisdom Valley. Avoid booking a connection so tight that a normal delay in Bangkok traffic leaves no margin for hotel check-in or the festival entrance.",
      },
      {
        title: "The final leg from Pattaya to Wisdom Valley",
        body: "The final leg is the part to plan most carefully. Wisdom Valley is not on a Pattaya bus route, and there is no public bus that drops festivalgoers at the site. A taxi, Grab, Bolt, private transfer or an official shuttle are the realistic options. Hotel-package guests had a hotel-to-site shuttle included, but details for visitors without a package have not yet been announced. Check official Tomorrowland Thailand updates before departure rather than relying on social-media pickup claims.",
      },
      {
        title: "Where to stay in Pattaya",
        body: "Choose a hotel based on how you expect to travel to and from the site, not only on the nightly rate. Central Pattaya offers the widest hotel and dining choice; North Pattaya can be convenient after an airport bus; Jomtien may suit travelers who prefer a quieter base. Whatever area you choose, confirm the hotel address and discuss the festival-night pickup plan before relying on an app ride. December is high season and festival demand will make the best-located rooms disappear first.",
      },
      {
        title: "Time planning for a December festival weekend",
        body: "Tomorrowland Thailand runs from 11 to 13 December 2026, when Pattaya is already in its high season. Allow extra time for airport arrival, the ride to Pattaya, hotel check-in and the journey to Wisdom Valley. Reserve accommodation early, especially if you want to stay near a likely pickup area or travel with a group. Keep your arrival and departure plans flexible enough to handle road congestion around the event.",
      },
      {
        title: "Getting back after the festival",
        body: "A festival day can finish around dawn, when ordinary daytime transport assumptions are unreliable. Do not assume that a bus connection or hotel shuttle will still be available without confirmation. Agree a return plan with your hotel, a licensed driver or the official festival information channels before going to the site. If you expect to fly soon after the event, avoid planning a fragile same-day connection and leave room for rest, traffic and airport procedures.",
      },
    ],
    internalLinks: [
      {
        label: "Suvarnabhumi Airport Gate 8 to Pattaya bus",
        href: "/en/suvarnabhumi-airport-gate-8-pattaya-bus",
        description: "Find the airport bus counter and plan the first leg to Pattaya after landing.",
      },
      {
        label: "Don Mueang Airport to Pattaya bus",
        href: "/en/don-mueang-airport-to-pattaya-bus",
        description: "Compare the direct airport-to-Pattaya option if your flight uses Don Mueang.",
      },
      {
        label: "Hotels near Pattaya Bus Station",
        href: "/en/hotels-near-pattaya-bus-station",
        description: "Choose a practical Pattaya base after arriving by bus.",
      },
      {
        label: "Bangkok to Pattaya after midnight",
        href: "/en/bangkok-to-pattaya-after-midnight",
        description: "Plan safer alternatives when scheduled buses are no longer useful.",
      },
    ],
    faq: [
      {
        question: "Does a bus go directly to the Tomorrowland Thailand festival site?",
        answer:
          "No. Buses can take you to Pattaya, but Wisdom Valley is inland from the city and requires a separate final transfer. Use a taxi, ride-hailing app, private transfer or an officially announced shuttle for that last leg.",
      },
      {
        question: "Which Bangkok airport is better for Tomorrowland Thailand?",
        answer:
          "Suvarnabhumi is usually the simpler gateway because it has direct connections to Pattaya and is closer to Wisdom Valley. Don Mueang can still work, but plan the longer airport-to-Pattaya journey and the separate final transfer carefully.",
      },
      {
        question: "Can I stay in Bangkok and commute to the festival?",
        answer:
          "It is possible, but not recommended for most visitors. The journey is long in each direction before festival traffic, and the event may end around dawn. Staying in Pattaya gives you a much more realistic return plan and more flexibility if transport changes.",
      },
      {
        question: "I do not have a hotel package. What should I do?",
        answer:
          "Book independent accommodation in Pattaya early, then arrange the final trip to Wisdom Valley separately. Hotel packages included a hotel-to-site shuttle, but non-package shuttle details have not yet been announced, so check official channels before you leave.",
      },
      {
        question: "Is there camping at Tomorrowland Thailand?",
        answer:
          "No DreamVille camping has been announced for the Thailand edition. Plan on a Pattaya hotel, private accommodation or another independently arranged overnight option.",
      },
      {
        question: "How should I plan the return after the festival?",
        answer:
          "Arrange the return before you enter the site. Confirm whether your hotel, private driver or an official shuttle has a workable pickup plan, and do not rely on an unverified public-bus connection from Wisdom Valley.",
      },
    ],
    sources: [
      {
        label: "DJ Mag - Tomorrowland Thailand 2026 tickets sell out under an hour",
      },
      {
        label: "Wise - Tomorrowland Thailand travel guide",
      },
    ],
  },
];

export function getSeoGuide(slug: string) {
  return seoGuides.find((guide) => guide.slug === slug);
}
