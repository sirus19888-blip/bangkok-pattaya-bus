const SCHEDULE_TIMEZONE = "Asia/Bangkok";

export function getLocalDateValue(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: SCHEDULE_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

const DAY_IN_MS = 24 * 60 * 60 * 1000;

/**
 * Domyslna data w linku do 12Go. Ich parametr `date` dziala jak twardy filtr
 * (`godate`), wiec po ostatnim kursie dnia "dzis" prowadzi na liste prawie bez
 * autobusow. Pomiar z 2026-09-09, 18:00 w Bangkoku, Bangkok->Pattaya:
 * bez daty 139 przejazdow i 8 autobusow od PLN 16, `date=dzis` 54 przejazdy
 * i 1 autobus od PLN 25, `date=jutro` znowu 136 i 8 od PLN 16.
 *
 * Prog jest liczony z rozkladu, nie z arbitralnej godziny: `getNextDeparture`
 * ustawia `isTomorrow`, gdy na dzis nie zostal juz zaden kurs.
 *
 * Tajlandia nie zmienia czasu, wiec dodanie doby w milisekundach jest tu
 * bezpieczne.
 */
export function getDefaultTravelDate(
  nextDepartureIsTomorrow: boolean,
  date = new Date(),
) {
  return getLocalDateValue(
    nextDepartureIsTomorrow ? new Date(date.getTime() + DAY_IN_MS) : date,
  );
}
