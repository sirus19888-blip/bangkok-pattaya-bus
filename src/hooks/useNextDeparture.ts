"use client";

import { useEffect, useState } from "react";
import type { Schedule } from "@/data/schedules";
import { getNextDeparture, type NextDepartureResult } from "@/lib/scheduleTime";

export function useNextDeparture(
  schedule: Schedule,
  initialNextDeparture: string,
): NextDepartureResult {
  const [nextDeparture, setNextDeparture] = useState<NextDepartureResult>(() =>
    getStableInitialNextDeparture(schedule, initialNextDeparture),
  );

  useEffect(() => {
    function updateNextDeparture() {
      setNextDeparture(getNextDeparture(schedule));
    }

    updateNextDeparture();
    const intervalId = window.setInterval(updateNextDeparture, 60_000);

    return () => window.clearInterval(intervalId);
  }, [schedule]);

  return nextDeparture.time
    ? nextDeparture
    : {
        time: initialNextDeparture,
        isTomorrow: false,
        subRoutes: [],
      };
}

function getStableInitialNextDeparture(
  schedule: Schedule,
  initialNextDeparture: string,
): NextDepartureResult {
  const time = initialNextDeparture || schedule.nextDeparture || "";

  return {
    time,
    isTomorrow: false,
    subRoutes:
      schedule.subRoutes
        ?.filter((subRoute) => subRoute.departures.includes(time))
        .map((subRoute) => ({
          id: subRoute.id,
          label: subRoute.label,
          to: subRoute.to,
        })) ?? [],
  };
}
