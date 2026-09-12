"use client";

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { LocaleCode } from "@/data/routes";
import { getDefaultTravelDate, getLocalDateValue } from "@/lib/clientDate";
import { getNextDeparture } from "@/lib/scheduleTime";

type TravelDateContextValue = {
  isReady: boolean;
  minTravelDate: string;
  setTravelDate: (travelDate: string) => void;
  travelDate: string;
};

const TravelDateContext = createContext<TravelDateContextValue | null>(null);

const travelDateLabels: Record<LocaleCode, string> = {
  de: "Reisedatum",
  en: "Travel date",
  fr: "Date de voyage",
  pl: "Data podróży",
  ru: "Дата поездки",
  th: "วันที่เดินทาง",
  zh: "出行日期",
};

export function TravelDateProvider({
  children,
  // Dzisiejsza data w strefie Asia/Bangkok, policzona na serwerze. Bez niej pole
  // daty startowalo puste i wylaczone az do hydratacji, a CTA szly do 12Go bez
  // parametru date. Musi byc ta sama wartosc, ktora wyrenderowal serwer.
  initialDate = "",
  // Godziny odjazdow tej strony, splaszczone z podtras. Pozwalaja policzyc po
  // hydratacji te sama regule co serwer (T83): gdy na dzis nie ma juz kursu,
  // domyslna data to jutro. Bez nich strona pokazywala juz jutrzejsza godzine
  // odjazdu, a link do 12Go filtrowal liste na dzis - czyli na dzien, w ktorym
  // nic juz nie jedzie. Przy revalidate 3600 (T84) takie okno trwa do godziny.
  departures = [],
}: {
  children: ReactNode;
  initialDate?: string;
  departures?: string[];
}) {
  const [minTravelDate, setMinTravelDate] = useState(initialDate);
  const [travelDate, setTravelDate] = useState(initialDate);
  // Wyprowadzone, nie trzymane w stanie: gotowosc to po prostu "mamy juz date".
  const isReady = Boolean(minTravelDate);

  // Tablica z propsa ma nowa tozsamosc przy kazdym renderze, wiec zaleznoscia
  // efektu jest jej tresc, nie referencja.
  const departuresKey = departures.join(",");

  useEffect(() => {
    const today = getLocalDateValue();
    const list = departuresKey ? departuresKey.split(",") : [];

    // Ta sama regula co na serwerze (T83), ale liczona z zegara KLIENTA:
    // po ostatnim kursie dnia domyslna data to jutro. Serwer podjal te decyzje
    // przy renderowaniu, a ISR moze podac te strone nawet godzine pozniej -
    // wtedy jego rozstrzygniecie jest juz nieaktualne.
    const wanted =
      list.length > 0
        ? getDefaultTravelDate(getNextDeparture(list).isTomorrow)
        : today;

    // Swiadomy wyjatek od react-hooks/set-state-in-effect. Zegara klienta nie
    // wolno odczytac podczas renderu, bo pierwszy render musi zgadzac sie
    // z serwerowym - inaczej hydratacja sie rozjedzie. Korekta moze wiec nastapic
    // dopiero po hydratacji. React pomija ponowny render, gdy wartosc jest ta
    // sama, wiec bezwarunkowe wywolanie nic nie kosztuje.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMinTravelDate(today);
    // Minimum pola zostaje na dzis, zeby ktos jadacy jeszcze dzisiaj mogl je
    // wybrac recznie - podnosimy tylko wartosc domyslna.
    //
    // Nie "|| wanted": data wypieczona przez ISR jest niepusta, wiec przechodzila
    // przez taki warunek i zostawala w stanie. CTA szlo wtedy do 12Go z data
    // z przeszlosci, gdzie dziala ona jak twardy filtr (godate) i lista wychodzi
    // pusta - klikniecie jest, rezerwacji nie ma. Nadpisujemy wylacznie date
    // wczesniejsza niz wyliczona; swiadomy wybor uzytkownika na dalsza przyszlosc
    // zostaje nietkniety. Obie wartosci sa w formacie YYYY-MM-DD (Intl "en-CA"
    // i <input type="date">), wiec porownanie tekstowe jest chronologiczne.
    setTravelDate((currentTravelDate) =>
      !currentTravelDate || currentTravelDate < wanted ? wanted : currentTravelDate,
    );
  }, [initialDate, departuresKey]);

  const value = useMemo(
    () => ({
      isReady,
      minTravelDate,
      setTravelDate,
      travelDate,
    }),
    [isReady, minTravelDate, travelDate],
  );

  return (
    <TravelDateContext.Provider value={value}>
      {children}
    </TravelDateContext.Provider>
  );
}

export function useTravelDateValue() {
  return useContext(TravelDateContext)?.travelDate ?? "";
}

export function TravelDateField({
  className = "mt-4",
  inputClassName = "mt-2 min-h-11 w-full rounded-xl border border-[#d8c8b4] bg-white px-3 text-sm font-black text-[#13233a] shadow-sm outline-none transition focus:border-[#e8b05a] focus:ring-2 focus:ring-[#e8b05a]/35",
  labelClassName = "text-xs font-black uppercase tracking-[0.16em] text-[#0e7b6b]",
  locale,
}: {
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  locale: LocaleCode;
}) {
  const travelDateContext = useContext(TravelDateContext);
  const inputId = useId();
  const label = travelDateLabels[locale] ?? travelDateLabels.en;

  if (!travelDateContext) {
    return null;
  }

  const isInputReady =
    travelDateContext.isReady && Boolean(travelDateContext.travelDate);

  return (
    <div className={className} data-travel-date-field="true">
      <label className={labelClassName} htmlFor={inputId}>
        {label}
      </label>
      <input
        aria-label={label}
        aria-busy={!isInputReady}
        className={inputClassName}
        disabled={!isInputReady}
        id={inputId}
        min={travelDateContext.minTravelDate || undefined}
        onChange={(event) => travelDateContext.setTravelDate(event.target.value)}
        type="date"
        value={travelDateContext.travelDate}
      />
    </div>
  );
}
