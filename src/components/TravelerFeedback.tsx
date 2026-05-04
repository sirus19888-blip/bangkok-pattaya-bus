"use client";

import { useState } from "react";
import type { LocaleCode } from "@/data/routes";

type TravelerFeedbackProps = {
  locale: LocaleCode;
  routeTitle: string;
};

const copy = {
  en: {
    title: "Was this guide helpful?",
    text: "Help us keep bus times clear and useful for other travelers.",
    helped: "Yes, it helped",
    report: "Report outdated times",
    thanks: "Thank you — your feedback helps improve this guide.",
    subject: "Outdated bus time report",
    bodyIntro: "Hi, I found outdated information on this route page:",
    prompt: "What needs to be corrected?",
  },
  pl: {
    title: "Czy ten przewodnik był pomocny?",
    text: "Pomóż nam utrzymać godziny autobusów jasne i przydatne dla innych podróżnych.",
    helped: "Tak, pomógł",
    report: "Zgłoś nieaktualne godziny",
    thanks: "Dziękujemy — Twoja opinia pomaga ulepszać ten przewodnik.",
    subject: "Zgłoszenie nieaktualnych godzin autobusów",
    bodyIntro: "Cześć, znalazłem nieaktualne informacje na tej stronie trasy:",
    prompt: "Co trzeba poprawić?",
  },
} as const;

export function TravelerFeedback({ locale, routeTitle }: TravelerFeedbackProps) {
  const [helped, setHelped] = useState(false);
  const text = locale === "pl" ? copy.pl : copy.en;
  const pageUrl =
    typeof window === "undefined" ? "" : window.location.href;
  const body = `${text.bodyIntro}\n${pageUrl}\n\nRoute: ${routeTitle}\n\n${text.prompt}`;
  const mailtoUrl = `mailto:bangkokpattayabus@gmail.com?subject=${encodeURIComponent(
    text.subject,
  )}&body=${encodeURIComponent(body)}`;

  return (
    <section className="rounded-2xl border border-[#eadcc7] bg-white p-4 shadow-sm sm:p-5 md:p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-black leading-tight text-[#13233a]">
            {text.title}
          </h2>
          <p className="mt-1 text-sm font-semibold leading-6 text-[#4f5d6c] md:text-xs md:leading-5">
            {text.text}
          </p>
        </div>
        <div className="grid gap-2 sm:min-w-64 sm:grid-cols-2 md:min-w-[23rem]">
          <button
            type="button"
            onClick={() => setHelped(true)}
            className="flex min-h-11 items-center justify-center rounded-xl bg-[#13233a] px-4 text-center text-sm font-black text-white transition hover:bg-[#233a5b] md:min-h-10 md:text-xs"
          >
            {text.helped}
          </button>
          <a
            href={mailtoUrl}
            className="flex min-h-11 items-center justify-center rounded-xl border border-[#7fb7d8] bg-[#f4fbff] px-4 text-center text-sm font-black text-[#13233a] transition hover:bg-white md:min-h-10 md:text-xs"
          >
            {text.report}
          </a>
        </div>
      </div>
      {helped ? (
        <p className="mt-3 rounded-xl bg-[#fffaf2] px-3 py-2 text-sm font-bold leading-5 text-[#13233a]">
          {text.thanks}
        </p>
      ) : null}
    </section>
  );
}
