import Link from "next/link";
import type { RoutePage } from "@/data/routes";
import type { Schedule } from "@/data/schedules";

type PopularRoutesProps = {
  routePages: RoutePage[];
  schedules: Schedule[];
};

const routeDescriptions: Record<RoutePage["slug"], string> = {
  "bangkok-to-pattaya":
    "Ekkamai departures to Pattaya with station notes and practical boarding tips.",
  "pattaya-to-bangkok":
    "Return buses from Pattaya to Bangkok, including Ekkamai and Mo Chit routes.",
  "suvarnabhumi-airport-to-pattaya":
    "Airport bus information with counter notes, travel time, and arrival tips.",
};

export function PopularRoutes({ routePages, schedules }: PopularRoutesProps) {
  return (
    <section className="rounded-lg border border-[#eadcc7] bg-white p-4 shadow-sm sm:p-5">
      <p className="text-sm font-bold uppercase tracking-wide text-[#2f6f93]">
        Popular routes
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {routePages.map((routePage) => {
          const schedule = schedules.find(
            (item) => item.direction === routePage.slug,
          );

          return (
            <article
              key={routePage.slug}
              className="rounded-lg border border-[#eadcc7] bg-[#fffaf2] p-3.5 shadow-sm sm:p-4"
            >
              <h2 className="text-lg font-black text-[#13233a]">
                {routePage.title}
              </h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-[#4f5d6c]">
                {routeDescriptions[routePage.slug]}
              </p>
              {schedule ? (
                <div className="mt-3 grid gap-1 text-sm font-bold text-[#13233a]">
                  <p>Travel time: {schedule.travelTime}</p>
                  <p>Ticket price: {schedule.price}</p>
                </div>
              ) : null}
              <Link
                href={`/en/${routePage.slug}`}
                className="mt-4 flex h-12 items-center justify-center rounded-lg border border-[#7fb7d8] bg-white px-4 text-sm font-black text-[#13233a] transition hover:bg-[#f4fbff]"
              >
                View route
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
