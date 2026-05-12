import type { Metadata } from "next";
import Link from "next/link";
import { routeSeoPages } from "@/data/seoRoutes";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thailand Transport Routes | Bangkok Pattaya Bus Guide",
  description:
    "Compare Bangkok, Pattaya, Suvarnabhumi Airport and Don Mueang Airport transport routes with bus, taxi, Grab, Bolt, inDrive and private transfer tips.",
  alternates: {
    canonical: absoluteUrl("/routes"),
  },
};

export default function RoutesIndexPage() {
  return (
    <main className="min-h-screen bg-[#f7f0e3] px-4 py-10 text-[#13233a]">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#0e7b6b]">
          Thailand transport guide
        </p>
        <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
          Transport routes for Bangkok, Pattaya and airports
        </h1>
        <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-[#4f5d6c]">
          Choose a route to compare bus information, estimated taxi and app ride
          options, legal boarding points, prices, safety tips and common tourist
          questions.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {routeSeoPages.map((route) => (
            <Link
              className="rounded-2xl border border-[#eadcc7] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              href={`/routes/${route.slug}`}
              key={route.slug}
            >
              <h2 className="text-xl font-black leading-tight">
                {route.h1}
              </h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#5f6874]">
                {route.seoDescription}
              </p>
              <span className="mt-4 inline-flex rounded-xl bg-[#13233a] px-4 py-3 text-sm font-black text-white">
                Open guide
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
