"use client";

import { useState } from "react";
import type { LocaleCode } from "@/data/routes";

type TravelerFeedbackProps = {
  buyMeCoffeeLabel: string;
  locale: LocaleCode;
  routeTitle: string;
};

const copy = {
  en: {
    title: "Was this guide helpful?",
    text: "Help us keep bus times accurate and useful for other travelers.",
    helped: "Yes, it helped",
    report: "Report outdated times",
    thanks: "Thank you - your feedback helps improve this guide.",
    sending: "Sending...",
    emailError: "Email could not be sent automatically. Your email app will open instead.",
    subject: "Outdated bus time report",
    helpedSubject: "Guide marked as helpful",
    bodyIntro: "Hi, I found outdated information on this route page:",
    helpedBodyIntro: "A traveler marked this route guide as helpful:",
    routeLabel: "Route",
    prompt: "What needs to be corrected?",
  },
  pl: {
    title: "Czy ten przewodnik był pomocny?",
    text: "Pomóż nam utrzymać godziny autobusów jasne i przydatne dla innych podróżnych.",
    helped: "Tak, pomógł",
    report: "Zgłoś nieaktualne godziny",
    thanks: "Dziękujemy - Twoja opinia pomaga ulepszać ten przewodnik.",
    sending: "Wysyłanie...",
    emailError: "Nie udało się wysłać automatycznie. Otworzę gotową wiadomość e-mail.",
    subject: "Zgłoszenie nieaktualnych godzin autobusów",
    helpedSubject: "Przewodnik oznaczony jako pomocny",
    bodyIntro: "Cześć, znalazłem nieaktualne informacje na tej stronie trasy:",
    helpedBodyIntro: "Podróżny oznaczył tę stronę trasy jako pomocną:",
    routeLabel: "Trasa",
    prompt: "Co trzeba poprawić?",
  },
  ru: {
    title: "Этот гид был полезен?",
    text: "Помогите нам сохранять расписание понятным и полезным для других путешественников.",
    helped: "Да, помог",
    report: "Сообщить о неактуальном расписании",
    thanks: "Спасибо - ваш отзыв помогает улучшать этот гид.",
    sending: "Отправка...",
    emailError: "Не удалось отправить автоматически. Открою готовое письмо.",
    subject: "Сообщение о неактуальном расписании",
    helpedSubject: "Гид отмечен как полезный",
    bodyIntro: "Здравствуйте, я нашёл неактуальную информацию на странице маршрута:",
    helpedBodyIntro: "Путешественник отметил эту страницу маршрута как полезную:",
    routeLabel: "Маршрут",
    prompt: "Что нужно исправить?",
  },
  de: {
    title: "War dieser Guide hilfreich?",
    text: "Hilf uns, Buszeiten klar und nützlich für andere Reisende zu halten.",
    helped: "Ja, hilfreich",
    report: "Veraltete Zeiten melden",
    thanks: "Danke - dein Feedback hilft, diesen Guide zu verbessern.",
    sending: "Wird gesendet...",
    emailError: "Automatisch senden ging nicht. Ich öffne stattdessen eine vorbereitete E-Mail.",
    subject: "Meldung zu veralteten Buszeiten",
    helpedSubject: "Guide als hilfreich markiert",
    bodyIntro: "Hallo, ich habe veraltete Informationen auf dieser Routenseite gefunden:",
    helpedBodyIntro: "Ein Reisender hat diese Routenseite als hilfreich markiert:",
    routeLabel: "Route",
    prompt: "Was muss korrigiert werden?",
  },
  th: {
    title: "คู่มือนี้มีประโยชน์ไหม",
    text: "ช่วยให้เรารักษาข้อมูลเวลาเดินรถให้ชัดเจนและเป็นประโยชน์กับนักเดินทางคนอื่น",
    helped: "มีประโยชน์",
    report: "แจ้งเวลารถที่ไม่อัปเดต",
    thanks: "ขอบคุณ ความเห็นของคุณช่วยให้คู่มือนี้ดีขึ้น",
    sending: "กำลังส่ง...",
    emailError: "ส่งอัตโนมัติไม่ได้ จะเปิดอีเมลที่เตรียมไว้แทน",
    subject: "แจ้งเวลารถที่ไม่อัปเดต",
    helpedSubject: "คู่มือนี้ถูกระบุว่ามีประโยชน์",
    bodyIntro: "สวัสดี ฉันพบข้อมูลที่ไม่อัปเดตในหน้าเส้นทางนี้:",
    helpedBodyIntro: "นักเดินทางระบุว่าหน้าเส้นทางนี้มีประโยชน์:",
    routeLabel: "เส้นทาง",
    prompt: "ควรแก้ไขข้อมูลส่วนใด",
  },
} as const;

function getCopy(locale: LocaleCode) {
  if (locale === "pl") {
    return copy.pl;
  }

  if (locale === "ru") {
    return copy.ru;
  }

  if (locale === "de") {
    return copy.de;
  }

  if (locale === "th") {
    return copy.th;
  }

  return copy.en;
}

export function TravelerFeedback({
  buyMeCoffeeLabel,
  locale,
  routeTitle,
}: TravelerFeedbackProps) {
  const [helped, setHelped] = useState(false);
  const [isSendingHelped, setIsSendingHelped] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const text = getCopy(locale);
  const pageUrl = typeof window === "undefined" ? "" : window.location.href;
  const feedbackStorageKey =
    typeof window === "undefined"
      ? ""
      : `traveler-feedback-helped:${window.location.pathname}`;
  const body = `${text.bodyIntro}\n${pageUrl}\n\n${text.routeLabel}: ${routeTitle}\n\n${text.prompt}`;
  const mailtoUrl = `mailto:bangkokpattayabus@gmail.com?subject=${encodeURIComponent(
    text.subject,
  )}&body=${encodeURIComponent(body)}`;
  const helpedBody = `${text.helpedBodyIntro}\n${pageUrl}\n\n${text.routeLabel}: ${routeTitle}\n\nLocale: ${locale}`;
  const helpedMailtoUrl = `mailto:bangkokpattayabus@gmail.com?subject=${encodeURIComponent(
    text.helpedSubject,
  )}&body=${encodeURIComponent(helpedBody)}`;

  async function handleHelpedClick() {
    if (isSendingHelped) {
      return;
    }

    setHelped(true);
    setEmailError(false);
    setIsSendingHelped(true);

    if (feedbackStorageKey) {
      window.localStorage.setItem(feedbackStorageKey, "yes");
    }

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/bangkokpattayabus@gmail.com",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _captcha: "false",
            _subject: text.helpedSubject,
            message: helpedBody,
            page: pageUrl,
            route: routeTitle,
            locale,
            feedback: text.helped,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Feedback email request failed");
      }
    } catch {
      setEmailError(true);
      window.location.href = helpedMailtoUrl;
    } finally {
      setIsSendingHelped(false);
    }
  }

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
        <div className="grid gap-2 sm:min-w-64 sm:grid-cols-3 md:min-w-[32rem]">
          <button
            type="button"
            onClick={handleHelpedClick}
            aria-pressed={helped}
            disabled={isSendingHelped}
            className={`flex min-h-11 items-center justify-center rounded-xl px-4 text-center text-sm font-black transition md:min-h-10 md:text-xs ${
              helped
                ? "bg-[#2f6f93] text-white"
                : "bg-[#13233a] text-white hover:bg-[#233a5b]"
            }`}
          >
            {isSendingHelped ? text.sending : `${helped ? "✓ " : ""}${text.helped}`}
          </button>
          <a
            href={mailtoUrl}
            className="flex min-h-11 items-center justify-center rounded-xl border border-[#7fb7d8] bg-[#f4fbff] px-4 text-center text-sm font-black text-[#13233a] transition hover:bg-white md:min-h-10 md:text-xs"
          >
            {text.report}
          </a>
          <a
            href="https://www.buymeacoffee.com/Pawel_"
            className="flex min-h-11 items-center justify-center rounded-xl border border-[#13233a] bg-white px-4 text-center text-sm font-black text-[#13233a] transition hover:bg-[#fffaf2] md:min-h-10 md:text-xs"
            target="_blank"
            rel="noopener noreferrer"
          >
            {buyMeCoffeeLabel}
          </a>
        </div>
      </div>
      <div aria-live="polite" role="status">
        {helped ? (
          <p className="mt-3 rounded-xl border border-[#c8dbe9] bg-[#f4fbff] px-3 py-2 text-sm font-bold leading-5 text-[#13233a]">
            {emailError ? text.emailError : text.thanks}
          </p>
        ) : null}
      </div>
    </section>
  );
}
