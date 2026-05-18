"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { LocaleCode, RouteId } from "@/data/routes";
import type { Translations } from "@/lib/i18n";

type SearchRoute = {
  slug: RouteId;
  from: string;
  to: string;
};

type RouteSearchProps = {
  allowCurrentRouteNavigation?: boolean;
  compact?: boolean;
  currentRoute: RouteId;
  desktopGo?: boolean;
  from: string;
  labels: Translations["routeSelector"];
  locale: LocaleCode;
  routePages: SearchRoute[];
  to: string;
};

const goLabels: Record<LocaleCode, string> = {
  de: "Los",
  en: "Go",
  fr: "Aller",
  pl: "Pokaż trasę",
  ru: "Ехать",
  th: "ไป",
  zh: "前往",
};

export function RouteSearch({
  allowCurrentRouteNavigation = false,
  compact = false,
  currentRoute,
  desktopGo = false,
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
  const displayLabels = getRouteSearchLabels(locale, labels);
  const goLabel = goLabels[locale] ?? goLabels.en;
  const fromSelectId = "from";
  const toSelectId = "to";
  const routeFinderAriaLabel = `${getAriaLabelText(
    displayLabels.from,
  )} ${getAriaLabelText(displayLabels.to)} route finder`;

  function openRoute(nextFrom: string, nextTo: string) {
    const matchingRoute = findMatchingRoute(routePages, nextFrom, nextTo);

    if (
      !matchingRoute ||
      (!allowCurrentRouteNavigation && matchingRoute.slug === currentRoute)
    ) {
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

      if (compact || desktopGo) {
        return;
      }

      openRoute(nextFrom, safeNextTo);
    }
  }

  function handleToChange(nextTo: string) {
    setSelectedTo(nextTo);

    if (compact || desktopGo) {
      return;
    }

    openRoute(selectedFrom, nextTo);
  }

  function handleGo() {
    openRoute(selectedFrom, selectedTo);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleGo();
  }

  const labelClass = compact
    ? "mb-1 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-[#6b7280]"
    : "mb-2 block text-sm font-bold text-[#344153]";
  const selectClass = compact
    ? "h-11 min-h-11 w-full rounded-xl border border-[#eadcc7] bg-[#fffaf2] px-2 text-sm font-black text-[#13233a] outline-none focus:border-[#0e7b6b]"
    : "h-13 min-h-13 w-full rounded-xl border border-[#d8c8b4] bg-[#fffaf2] px-4 text-base font-black text-[#13233a] outline-none focus:border-[#2f6f93]";

  return (
    <form
      aria-label={routeFinderAriaLabel}
      data-route-finder="true"
      onSubmit={handleSubmit}
      className={
        compact
          ? "rounded-[1.2rem] bg-white"
          : "mt-5 rounded-2xl border border-[#eadcc7] bg-white p-3.5 shadow-sm sm:mt-6 sm:p-4"
      }
    >
      <div
        className={
          compact
            ? "grid grid-cols-[1fr_1fr_auto] items-end gap-2"
            : desktopGo
              ? "grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
              : "grid gap-3 sm:grid-cols-2"
        }
      >
        <div className="block">
          <label className={labelClass} htmlFor={fromSelectId}>
            {displayLabels.from}{" "}
          </label>
          <select
            id={fromSelectId}
            name="from"
            aria-label={`${getAriaLabelText(displayLabels.from)} ${selectedFrom}`}
            value={selectedFrom}
            onChange={(event) => handleFromChange(event.target.value)}
            className={selectClass}
          >
            {fromOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="block">
          <label className={labelClass} htmlFor={toSelectId}>
            {displayLabels.to}{" "}
          </label>
          <select
            id={toSelectId}
            name="to"
            aria-label={`${getAriaLabelText(displayLabels.to)} ${selectedTo}`}
            value={selectedTo}
            onChange={(event) => handleToChange(event.target.value)}
            className={selectClass}
          >
            {toOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {compact || desktopGo ? (
          <button
            type="submit"
            aria-label={`${goLabel}: ${selectedFrom} ${displayLabels.to} ${selectedTo}`}
            className={
              compact
                ? "mb-0.5 flex h-10 min-w-12 items-center justify-center rounded-full border border-[#e8b05a] bg-[#13233a] px-2.5 text-[0.7rem] font-black leading-none text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#0e7b6b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b05a]"
                : "flex h-13 min-h-13 min-w-16 items-center justify-center rounded-xl border border-[#e8b05a] bg-[#13233a] px-5 text-sm font-black uppercase tracking-[0.08em] text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#0e7b6b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b05a]"
            }
          >
            {goLabel}
          </button>
        ) : null}
      </div>
    </form>
  );
}

function getRouteSearchLabels(
  locale: LocaleCode,
  labels: Translations["routeSelector"],
) {
  if (locale === "pl") {
    return { from: "Z:", to: "Do:" };
  }

  if (locale === "fr") {
    return { from: "De :", to: "À :" };
  }

  return labels;
}

function getAriaLabelText(label: string) {
  return label.replace(/[:：]\s*$/u, "").trim();
}

function findMatchingRoute(
  routePages: SearchRoute[],
  from: string,
  to: string,
) {
  return (
    routePages.find((route) => route.from === from && route.to === to) ??
    routePages.find(
      (route) =>
        normalizeEndpoint(route.from) === normalizeEndpoint(from) &&
        normalizeEndpoint(route.to) === normalizeEndpoint(to),
    )
  );
}

function normalizeEndpoint(value: string) {
  return value
    .split("/")[0]
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}
