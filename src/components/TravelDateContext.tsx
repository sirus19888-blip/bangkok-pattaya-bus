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
import { getLocalDateValue } from "@/lib/clientDate";

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
}: {
  children: ReactNode;
  initialDate?: string;
}) {
  const [minTravelDate, setMinTravelDate] = useState(initialDate);
  const [travelDate, setTravelDate] = useState(initialDate);
  // Wyprowadzone, nie trzymane w stanie: gotowosc to po prostu "mamy juz date".
  const isReady = Boolean(minTravelDate);

  useEffect(() => {
    const today = getLocalDateValue();

    // Serwer renderuje przez ISR, wiec jego data moze byc o dobe stara tylko
    // wtedy, gdy strona przeszla polnoc w Bangkoku miedzy renderem a wizyta.
    // Poza tym przypadkiem nie ruszamy stanu i nie wywolujemy ponownego renderu.
    if (today === initialDate) {
      return;
    }

    // Swiadomy wyjatek od react-hooks/set-state-in-effect. Zegara klienta nie
    // wolno odczytac podczas renderu, bo pierwszy render musi zgadzac sie
    // z serwerowym - inaczej hydratacja sie rozjedzie. Korekta moze wiec nastapic
    // dopiero po hydratacji. Jest potrzebna, bo ISR serwuje strone z pamieci
    // podrecznej i na rzadko odwiedzanym adresie data w HTML moze byc stara.
    // Wywoluje sie raz. Od T83 uruchamia sie takze wtedy, gdy serwer celowo
    // podal jutrzejsza date (po ostatnim kursie dnia) - wtedy poprawia tylko
    // minimum pola, a sama date zostawia, bo jest przyszla.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMinTravelDate(today);
    // Nie "|| today": data wypieczona przez ISR jest niepusta, wiec przechodzila
    // przez ten warunek i zostawala w stanie. CTA szlo wtedy do 12Go z data
    // z przeszlosci, gdzie dziala ona jak twardy filtr (godate) i lista wychodzi
    // pusta - klikniecie jest, rezerwacji nie ma. Nadpisujemy wylacznie date juz
    // nieaktualna; swiadomy wybor uzytkownika na przyszlosc zostaje nietkniety.
    // Obie wartosci sa w formacie YYYY-MM-DD (Intl "en-CA" i <input type="date">),
    // wiec porownanie tekstowe jest chronologiczne.
    setTravelDate((currentTravelDate) =>
      !currentTravelDate || currentTravelDate < today ? today : currentTravelDate,
    );
  }, [initialDate]);

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
