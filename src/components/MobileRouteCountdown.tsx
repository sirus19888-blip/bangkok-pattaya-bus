"use client";

import { useEffect, useMemo, useState } from "react";
import type { Schedule } from "@/data/schedules";
import { useNextDeparture } from "@/hooks/useNextDeparture";
import {
  getMinutesUntilDeparture,
  type NextDepartureResult,
} from "@/lib/scheduleTime";

type MobileRouteCountdownProps = {
  className?: string;
  // Najblizszy odjazd policzony na serwerze. Musi byc ta sama wartoscia,
  // ktora wyrenderowal serwer, inaczej hydratacja sie rozjedzie.
  initialNextDeparture?: NextDepartureResult;
  labels?: {
    check: string;
    hoursShort: string;
    leavesIn: string;
    minutesShort: string;
    nextBus: string;
    now: string;
  };
  schedule?: Schedule;
};

const defaultLabels = {
  check: "Check",
  hoursShort: "h",
  leavesIn: "Leaves in",
  minutesShort: "min",
  nextBus: "Next bus",
  now: "Now",
};

export function MobileRouteCountdown({
  className = "mt-3",
  initialNextDeparture,
  labels = defaultLabels,
  schedule,
}: MobileRouteCountdownProps) {
  const fallbackSchedule = useMemo(
    () =>
      schedule ?? {
        departures: [],
        nextDeparture: "",
        subRoutes: [],
      },
    [schedule],
  );
  const nextDeparture = useNextDeparture(
    fallbackSchedule as Schedule,
    initialNextDeparture,
  );
  const [minutesUntilDeparture, setMinutesUntilDeparture] = useState<
    number | null
  >(null);
  const nextDepartureDisplay =
    schedule?.departureWindow ?? nextDeparture.time;

  useEffect(() => {
    if (!schedule) {
      return;
    }

    if (schedule.departureWindow) {
      // Stan startowy to juz null, a ta galaz konczy efekt przy kazdym przebiegu,
      // wiec ustawianie null bylo bez skutku - i lamalo react-hooks/set-state-in-effect.
      return;
    }

    function updateCountdown() {
      setMinutesUntilDeparture(
        getMinutesUntilDeparture(nextDeparture.time, nextDeparture.isTomorrow),
      );
    }

    updateCountdown();
    const intervalId = window.setInterval(updateCountdown, 30_000);

    return () => window.clearInterval(intervalId);
  }, [nextDeparture.isTomorrow, nextDeparture.time, schedule]);

  if (!schedule) {
    return null;
  }

  if (schedule.departureWindow) {
    return (
      <div className={`${className} rounded-2xl border border-[#c8dbe9] bg-[#eaf5fb] p-2`}>
        <span>
          <span className="block text-[0.65rem] font-black uppercase tracking-wide text-[#4f5d6c]">
            {labels.nextBus}
          </span>
          <span className="mt-0.5 block break-words text-sm font-black leading-snug text-[#13233a]">
            {schedule.departureWindow}
          </span>
        </span>
      </div>
    );
  }

  const countdown = formatCountdown(minutesUntilDeparture, labels);
  const isUrgent =
    minutesUntilDeparture !== null &&
    minutesUntilDeparture > 0 &&
    minutesUntilDeparture <= 15;

  return (
    <div className={`${className} rounded-2xl border border-[#c8dbe9] bg-[#eaf5fb] p-2`}>
      <div className="grid grid-cols-2 gap-2">
        <span>
          <span className="block text-[0.65rem] font-black uppercase tracking-wide text-[#4f5d6c]">
            {labels.nextBus}
          </span>
          <span className="mt-0.5 block text-base font-black leading-tight text-[#13233a]">
            {nextDepartureDisplay}
          </span>
        </span>
        <span>
          <span className="block text-[0.65rem] font-black uppercase tracking-wide text-[#4f5d6c]">
            {labels.leavesIn}
          </span>
          <span
            className={`mt-0.5 block text-base font-black leading-tight ${
              isUrgent ? "text-[#c81e1e]" : "text-[#13233a]"
            }`}
          >
            {countdown}
          </span>
        </span>
      </div>
    </div>
  );
}

function formatCountdown(
  minutesUntilDeparture: number | null,
  labels: NonNullable<MobileRouteCountdownProps["labels"]>,
) {
  if (minutesUntilDeparture === null) {
    return labels.check;
  }

  if (minutesUntilDeparture <= 0) {
    return labels.now;
  }

  if (minutesUntilDeparture < 60) {
    return `${minutesUntilDeparture} ${labels.minutesShort}`;
  }

  const hours = Math.floor(minutesUntilDeparture / 60);
  const minutes = minutesUntilDeparture % 60;

  return minutes === 0
    ? `${hours} ${labels.hoursShort}`
    : `${hours} ${labels.hoursShort} ${minutes} ${labels.minutesShort}`;
}
