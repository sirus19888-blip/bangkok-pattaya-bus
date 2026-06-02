import Link from "next/link";
import type { RoutePage } from "@/data/routes";
import type { Schedule } from "@/data/schedules";

type PopularRoutesProps = {
  routePages: RoutePage[];
  schedules: Schedule[];
};

const routeCards: Record<
  RoutePage["slug"],
  {
    cta: string;
    note: string;
    price: string;
    title: string;
    travelTime: string;
  }
> = {
  "bangkok-to-pattaya": {
    cta: "Check times",
    note: "Buses from Ekkamai",
    price: "From 148 THB",
    title: "Bangkok to Pattaya Bus",
    travelTime: "Around 2-3 hours",
  },
  "pattaya-to-bangkok": {
    cta: "Check times",
    note: "To Ekkamai and Mo Chit",
    price: "From 148 / 158 THB",
    title: "Pattaya to Bangkok Bus",
    travelTime: "Around 2-3 hours",
  },
  "suvarnabhumi-airport-to-pattaya": {
    cta: "Check times",
    note: "From airport counter",
    price: "139 THB",
    title: "Suvarnabhumi Airport to Pattaya Bus",
    travelTime: "Around 2 hours",
  },
  "pattaya-to-suvarnabhumi-airport": {
    cta: "Check times",
    note: "From Jomtien bus station",
    price: "162 THB",
    title: "Pattaya to Suvarnabhumi Airport Bus",
    travelTime: "Around 2 hours",
  },
  "don-mueang-airport-to-pattaya": {
    cta: "Check times",
    note: "From Don Mueang Airport",
    price: "155 THB",
    title: "Don Mueang Airport to Pattaya Bus",
    travelTime: "Around 3-3.5 hours",
  },
  "pattaya-to-don-mueang-airport": {
    cta: "Check times",
    note: "Confirm the Pattaya boarding point",
    price: "Around 170 THB",
    title: "Pattaya to Don Mueang Airport Bus",
    travelTime: "Around 3-3.5 hours",
  },
};

export function PopularRoutes({ routePages, schedules }: PopularRoutesProps) {
  return (
    <section>
      <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#2f6f93] sm:text-sm">
        Choose a route
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {routePages.map((routePage) => {
          const schedule = schedules.find(
            (item) => item.direction === routePage.slug,
          );
          const card = routeCards[routePage.slug];

          return (
            <Link
              key={routePage.slug}
              href={`/en/${routePage.slug}`}
              className="flex min-h-full flex-col rounded-2xl border border-[#eadcc7] bg-white p-3.5 shadow-sm sm:rounded-3xl sm:p-5"
            >
              <h2 className="text-lg font-black leading-tight text-[#13233a] sm:text-xl">
                {card.title}
              </h2>
              <p className="mt-1.5 text-sm font-semibold leading-5 text-[#4f5d6c] sm:mt-2 sm:leading-6">
                {card.note}
              </p>
              {schedule ? (
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm sm:mt-4">
                  <p className="rounded-xl bg-[#fffaf2] p-2.5 font-bold leading-5 text-[#13233a] sm:p-3">
                    <span className="block text-xs uppercase tracking-wide text-[#5f6874]">
                      Travel time
                    </span>
                    {card.travelTime}
                  </p>
                  <p className="rounded-xl bg-[#eaf5fb] p-2.5 font-bold leading-5 text-[#13233a] sm:p-3">
                    <span className="block text-xs uppercase tracking-wide text-[#5f6874]">
                      Ticket price
                    </span>
                    {card.price}
                  </p>
                </div>
              ) : null}
              <span
                className="mt-3 flex min-h-11 w-full items-center justify-center rounded-xl bg-[#13233a] px-4 text-center text-sm font-black text-white transition hover:bg-[#1d3455] sm:mt-4 sm:min-h-12"
              >
                {card.cta}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
