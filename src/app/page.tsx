import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { PopularRoutes } from "@/components/PopularRoutes";
import { defaultRouteId, routePages } from "@/data/routes";
import { schedules } from "@/data/schedules";
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
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 pb-10 pt-3 sm:gap-8 sm:px-6 sm:pb-12 sm:pt-5 lg:px-8">
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
