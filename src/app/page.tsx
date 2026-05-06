import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { MobileRouteCountdown } from "@/components/MobileRouteCountdown";
import { PopularRoutes } from "@/components/PopularRoutes";
import { defaultRouteId, routePages } from "@/data/routes";
import type { RouteId, RoutePage } from "@/data/routes";
import { schedules } from "@/data/schedules";
import type { Schedule } from "@/data/schedules";
import { getTranslations } from "@/lib/i18n";

const t = getTranslations("en");

export const metadata: Metadata = {
  title: "Bangkok Pattaya Bus Guide – Bus Times, Prices & Stations",
  description:
    "Check Bangkok to Pattaya, Pattaya to Bangkok, and Suvarnabhumi Airport to Pattaya bus times, ticket prices, travel time, stations, and practical travel tips.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f0e3] text-[#13233a]">
      <MobileHome />
      <section className="mx-auto hidden w-full max-w-6xl flex-col gap-4 px-4 pb-10 pt-3 sm:gap-8 sm:px-6 sm:pb-12 sm:pt-5 md:flex lg:px-8">
        <Header
          labels={{
            ...t.app,
            chooseLanguage: t.navigation.chooseLanguage,
          }}
          currentLocale="en"
          routeSlug={defaultRouteId}
        />

        <section id="top" className="rounded-2xl border border-[#eadcc7] bg-white p-4 shadow-sm sm:rounded-3xl sm:p-7">
          <p className="text-xs font-bold uppercase tracking-wide text-[#2f6f93] sm:text-sm">
            Thailand bus routes
          </p>
          <h1 className="mt-1 text-[1.85rem] font-black leading-[1.08] text-[#13233a] sm:text-5xl">
            Bangkok Pattaya Bus Guide
          </h1>
          <p className="mt-2 text-base font-semibold leading-6 text-[#4f5d6c] sm:mt-3 sm:max-w-xl sm:text-lg sm:leading-7">
            Simple bus times, prices, and route information.
          </p>
        </section>

        <PopularRoutes routePages={routePages} schedules={schedules} />

        <UtilityGrid />
      </section>
    </main>
  );
}

const mobileRouteMeta: Record<
  RouteId,
  {
    badge: string;
    note: string;
  }
> = {
  "bangkok-to-pattaya": {
    badge: "Most popular",
    note: "From Ekkamai Bus Terminal",
  },
  "pattaya-to-bangkok": {
    badge: "Return route",
    note: "To Ekkamai and Mo Chit",
  },
  "suvarnabhumi-airport-to-pattaya": {
    badge: "Airport bus",
    note: "Counter on Level 1",
  },
  "pattaya-to-suvarnabhumi-airport": {
    badge: "Before flight",
    note: "From Jomtien bus area",
  },
  "don-mueang-airport-to-pattaya": {
    badge: "Airport route",
    note: "Transport Co. service",
  },
  "pattaya-to-don-mueang-airport": {
    badge: "Airport return",
    note: "Confirm boarding point",
  },
};

function MobileHome() {
  const featuredRoute = routePages[0];
  const featuredSchedule = schedules.find(
    (schedule) => schedule.direction === featuredRoute.slug,
  );

  return (
    <section className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-[#fbf8f3] pb-24 md:hidden">
      <div className="bg-[#0e1e2e] px-4 pb-5 pt-4 text-white shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#0e7b6b] text-sm font-black text-white shadow-sm">
              BP
            </span>
            <div className="min-w-0">
              <p className="truncate text-base font-black leading-tight">
                Bangkok Pattaya
              </p>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#e8b05a]">
                Bus Guide
              </p>
            </div>
          </div>
          <Link
            href="/en/bangkok-to-pattaya"
            className="flex min-h-10 items-center rounded-full border border-white/15 bg-white/10 px-3 text-xs font-black text-white"
          >
            EN
          </Link>
        </div>

        <div className="mt-5 rounded-[1.7rem] bg-[#162840] p-4 shadow-lg shadow-black/10">
          <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#e8b05a]">
            Thailand bus routes
          </p>
          <h1 className="mt-2 text-[2rem] font-black leading-[1.02]">
            Bangkok Pattaya Bus Guide
          </h1>
          <p className="mt-2 max-w-[18rem] text-sm font-semibold leading-5 text-[#dce6f0]">
            Simple bus times, prices, stations, and practical travel tips.
          </p>
        </div>
      </div>

      <div className="-mt-3 flex flex-1 flex-col gap-5 rounded-t-[2rem] bg-[#fbf8f3] px-4 pt-5">
        <MobileFeaturedRoute
          routePage={featuredRoute}
          schedule={featuredSchedule}
        />

        <section>
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#0e7b6b]">
                Popular routes
              </p>
              <h2 className="text-xl font-black leading-tight text-[#13233a]">
                Choose your bus
              </h2>
            </div>
            <span className="text-xs font-black text-[#6b7280]">Swipe</span>
          </div>
          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2">
            {routePages.map((routePage) => (
              <MobileRouteCard
                key={routePage.slug}
                routePage={routePage}
                schedule={schedules.find(
                  (schedule) => schedule.direction === routePage.slug,
                )}
              />
            ))}
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-[#eadcc7] bg-[#fff8ec] p-4 shadow-sm">
          <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#b9832e]">
            Before you travel
          </p>
          <h2 className="mt-1 text-xl font-black text-[#13233a]">
            Essential advice
          </h2>
          <div className="mt-3 space-y-2.5">
            {[
              "Arrive 20-30 minutes before departure.",
              "Confirm times before travel.",
              "Keep some cash for tickets.",
              "Check the station before you go.",
            ].map((tip) => (
              <p
                key={tip}
                className="rounded-2xl bg-white/70 px-3 py-2 text-sm font-bold leading-5 text-[#4f5d6c]"
              >
                {tip}
              </p>
            ))}
          </div>
        </section>
      </div>

      <MobileBottomNav />
    </section>
  );
}

function MobileFeaturedRoute({
  routePage,
  schedule,
}: {
  routePage: RoutePage;
  schedule?: Schedule;
}) {
  return (
    <Link
      href={`/en/${routePage.slug}`}
      className="rounded-[1.5rem] border border-[#c8dbe9] bg-white p-4 shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#0e7b6b]">
            Start here
          </p>
          <h2 className="mt-1 text-xl font-black leading-tight text-[#13233a]">
            {routePage.title}
          </h2>
        </div>
        <span className="rounded-full bg-[#f3d77b] px-3 py-1 text-xs font-black text-[#3f3413]">
          Bus
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <MobileMiniFact label="Travel time" value={schedule?.travelTime} />
        <MobileMiniFact label="Ticket price" value={schedule?.price} />
      </div>
      <MobileRouteCountdown schedule={schedule} />
      <span className="mt-3 flex min-h-11 w-full items-center justify-center rounded-2xl bg-[#13233a] text-sm font-black text-white">
        Check times
      </span>
    </Link>
  );
}

function MobileRouteCard({
  routePage,
  schedule,
}: {
  routePage: RoutePage;
  schedule?: Schedule;
}) {
  const meta = mobileRouteMeta[routePage.slug];

  return (
    <Link
      href={`/en/${routePage.slug}`}
      className="flex w-[238px] flex-none snap-start flex-col rounded-[1.35rem] border border-[#eadcc7] bg-white p-3 shadow-sm"
    >
      <span className="w-fit rounded-full bg-[#eaf5fb] px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-wide text-[#0e7b6b]">
        {meta.badge}
      </span>
      <h3 className="mt-2 min-h-[2.6rem] text-base font-black leading-tight text-[#13233a]">
        {routePage.title}
      </h3>
      <p className="mt-1 text-xs font-bold leading-4 text-[#6b7280]">
        {meta.note}
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <MobileMiniFact label="Time" value={schedule?.travelTime} compact />
        <MobileMiniFact label="Price" value={schedule?.price} compact />
      </div>
      <MobileRouteCountdown schedule={schedule} />
      <span className="mt-3 flex min-h-10 items-center justify-center rounded-xl bg-[#13233a] text-xs font-black text-white">
        View route
      </span>
    </Link>
  );
}

function MobileMiniFact({
  compact = false,
  label,
  value,
}: {
  compact?: boolean;
  label: string;
  value?: string;
}) {
  return (
    <span className="rounded-2xl bg-[#fffaf2] p-2">
      <span className="block text-[0.58rem] font-black uppercase tracking-wide text-[#6b7280]">
        {label}
      </span>
      <span
        className={`mt-0.5 block font-black leading-tight text-[#13233a] ${
          compact ? "text-[0.72rem]" : "text-xs"
        }`}
      >
        {value ?? "Check"}
      </span>
    </span>
  );
}

function MobileBottomNav() {
  const items: {
    active?: boolean;
    href: string;
    icon: "home" | "routes" | "airport" | "contact";
    label: string;
  }[] = [
    { href: "/", icon: "home", label: "Home", active: true },
    { href: "/en/bangkok-to-pattaya", icon: "routes", label: "Routes" },
    {
      href: "/en/suvarnabhumi-airport-to-pattaya",
      icon: "airport",
      label: "Airport",
    },
    { href: "/contact", icon: "contact", label: "Contact" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 mx-auto max-w-[430px] border-t border-[#eadcc7] bg-white/95 px-3 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 shadow-[0_-8px_24px_rgba(19,35,58,0.08)] backdrop-blur md:hidden">
      <div className="grid grid-cols-4 gap-1">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex min-h-12 flex-col items-center justify-center rounded-2xl text-[0.68rem] font-black ${
              item.active
                ? "bg-[#eaf5fb] text-[#0e7b6b]"
                : "text-[#6b7280]"
            }`}
          >
            <span
              aria-hidden="true"
              className="mb-0.5 flex h-7 w-7 items-center justify-center rounded-xl bg-white"
            >
              <MobileNavIcon name={item.icon} />
            </span>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function MobileNavIcon({
  name,
}: {
  name: "home" | "routes" | "airport" | "contact";
}) {
  if (name === "home") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="#0e7b6b"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="m4 10 8-6 8 6" stroke="#12a08c" />
        <path d="M6.5 9.5V20h11V9.5" />
        <path d="M10 20v-5h4v5" />
      </svg>
    );
  }

  if (name === "routes") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="#c8913a"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M7 18a3 3 0 1 1-3-3" stroke="#0e7b6b" />
        <path d="M17 6a3 3 0 1 0 3 3" stroke="#e8b05a" />
        <path d="M7 15h7a3 3 0 0 0 0-6H7" />
        <path d="M6 6h2" />
        <path d="M16 18h2" />
      </svg>
    );
  }

  if (name === "airport") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="#315d9d"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M3 11h18" />
        <path d="m4 11 7-7h3l-3 7 5 8h-3l-5-8" stroke="#0e7b6b" />
        <path d="m16 11 3-3" stroke="#e8b05a" />
        <path d="M6 19h12" stroke="#c8913a" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="#8d5fd3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" />
      <path d="M8 9h8" stroke="#0e7b6b" />
      <path d="M8 13h5" stroke="#e8b05a" />
    </svg>
  );
}

const utilityCards = [
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/contact",
    label: "Contact",
  },
  {
    href: "/privacy",
    label: "Privacy",
  },
  {
    href: "https://www.buymeacoffee.com/Pawel_",
    label: "Support",
  },
];

function UtilityGrid() {
  return (
    <section>
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#2f6f93] sm:text-sm">
        More
      </p>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
        {utilityCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="flex min-h-12 items-center justify-center rounded-2xl border border-[#eadcc7] bg-white px-3 text-center text-sm font-black text-[#13233a] shadow-sm transition hover:bg-[#fffaf2]"
            target={card.href.startsWith("http") ? "_blank" : undefined}
            rel={
              card.href.startsWith("http") ? "noopener noreferrer" : undefined
            }
          >
            {card.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
