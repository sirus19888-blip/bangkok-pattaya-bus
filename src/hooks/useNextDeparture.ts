"use client";

import { useEffect, useState } from "react";
import type { Schedule } from "@/data/schedules";
import { getNextDeparture, type NextDepartureResult } from "@/lib/scheduleTime";

export const emptyNextDeparture: NextDepartureResult = {
  time: "",
  isTomorrow: false,
  subRoutes: [],
};

/**
 * Najblizszy odjazd, odswiezany co minute po stronie klienta.
 *
 * `initialNextDeparture` musi byc dokladnie ta sama wartoscia, ktora wyliczyl
 * serwer i wyrenderowal w HTML. Dzieki temu pierwszy render klienta zgadza sie
 * z serwerowym i hydratacja przebiega bez rozjazdu; dopiero efekt podmienia
 * wartosc na policzona "teraz".
 *
 * Wczesniej hook startowal z pustym stringiem, zeby uniknac tego rozjazdu.
 * Kosztem bylo to, ze najbardziej eksponowana liczba na stronie nie istniala
 * w HTML - a crawlery modeli jezykowych, ktore wg danych z T55 daja wiecej
 * sesji niz Google, nie wykonuja JavaScriptu.
 */
export function useNextDeparture(
  schedule: Schedule,
  initialNextDeparture: NextDepartureResult = emptyNextDeparture,
): NextDepartureResult {
  const [nextDeparture, setNextDeparture] =
    useState<NextDepartureResult>(initialNextDeparture);

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
