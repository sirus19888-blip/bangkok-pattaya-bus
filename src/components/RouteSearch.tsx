"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { LocaleCode, RouteId } from "@/data/routes";
import type { Translations } from "@/lib/i18n";

type SearchRoute = {
  slug: RouteId;
  from: string;
  to: string;
};

type RouteSearchProps = {
  currentRoute: RouteId;
  from: string;
  labels: Translations["routeSelector"];
  locale: LocaleCode;
  routePages: SearchRoute[];
  to: string;
};

export function RouteSearch({
  currentRoute,
  from,
  labels,
  locale,
  routePages,
  to,
}: RouteSearchProps) {
  const router = useRouter();
  const [selectedFrom, setSelectedFrom] = useState(from);
  const [selectedTo, setSelectedTo] = useState(to);
  const fromOptions = useMemo(
    () => Array.from(new Set(routePages.map((route) => route.from))),
    [routePages],
  );
  const toOptions = useMemo(
    () =>
      Array.from(
        new Set(
          routePages
            .filter((route) => route.from === selectedFrom)
            .map((route) => route.to),
        ),
      ),
    [routePages, selectedFrom],
  );

  function openRoute(nextFrom: string, nextTo: string) {
    const matchingRoute = routePages.find(
      (route) => route.from === nextFrom && route.to === nextTo,
    );

    if (!matchingRoute || matchingRoute.slug === currentRoute) {
      return;
    }

    router.push(`/${locale}/${matchingRoute.slug}`);
  }

  function handleFromChange(nextFrom: string) {
    setSelectedFrom(nextFrom);

    const nextToOptions = routePages
      .filter((route) => route.from === nextFrom)
      .map((route) => route.to);
    const safeNextTo = nextToOptions.includes(selectedTo)
      ? selectedTo
      : nextToOptions[0];

    if (safeNextTo) {
      setSelectedTo(safeNextTo);
      openRoute(nextFrom, safeNextTo);
    }
  }

  function handleToChange(nextTo: string) {
    setSelectedTo(nextTo);
    openRoute(selectedFrom, nextTo);
  }

  return (
    <div className="mt-5 rounded-2xl border border-[#eadcc7] bg-white p-3.5 shadow-sm sm:mt-6 sm:p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-[#344153]">
            {labels.from}
          </span>
          <select
            value={selectedFrom}
            onChange={(event) => handleFromChange(event.target.value)}
            className="h-13 min-h-13 w-full rounded-xl border border-[#d8c8b4] bg-[#fffaf2] px-4 text-base font-black text-[#13233a] outline-none focus:border-[#2f6f93]"
          >
            {fromOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-[#344153]">
            {labels.to}
          </span>
          <select
            value={selectedTo}
            onChange={(event) => handleToChange(event.target.value)}
            className="h-13 min-h-13 w-full rounded-xl border border-[#d8c8b4] bg-[#fffaf2] px-4 text-base font-black text-[#13233a] outline-none focus:border-[#2f6f93]"
          >
            {toOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
