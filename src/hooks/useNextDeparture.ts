"use client";

import { useEffect, useState } from "react";
import type { Schedule } from "@/data/schedules";
import { getNextDeparture, type NextDepartureResult } from "@/lib/scheduleTime";

export function useNextDeparture(
  schedule: Schedule,
  _initialNextDeparture: string,
): NextDepartureResult {
  const [nextDeparture, setNextDeparture] = useState<NextDepartureResult>(() =>
    getStableInitialNextDeparture(),
  );

  useEffect(() => {
    function updateNextDeparture() {
      setNextDeparture(getNextDeparture(schedule));
    }

    updateNextDeparture();
    const intervalId = window.setInterval(updateNextDeparture, 60_000);

    return () => window.clearInterval(intervalId);
  }, [schedule]);

  return nextDeparture;
}

function getStableInitialNextDeparture(): NextDepartureResult {
  return {
    time: "",
    isTomorrow: false,
    subRoutes: [],
  };
}
