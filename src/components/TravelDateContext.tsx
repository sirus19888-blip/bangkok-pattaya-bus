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

export function TravelDateProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [minTravelDate, setMinTravelDate] = useState("");
  const [travelDate, setTravelDate] = useState("");

  useEffect(() => {
    const today = getLocalDateValue();

    setMinTravelDate(today);
    setTravelDate((currentTravelDate) => currentTravelDate || today);
    setIsReady(true);
  }, []);

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
