"use client";

import { useState } from "react";
import type { FAQItem } from "@/data/faqs";
import type { Translations } from "@/lib/i18n";

type FAQProps = {
  faqs: FAQItem[];
  labels: Translations["faq"];
};

export function FAQ({ faqs, labels }: FAQProps) {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return (
    <section className="rounded-2xl border border-[#eadcc7] bg-white p-4 shadow-sm sm:p-5 md:p-4 lg:p-3">
      <p className="text-xs font-bold uppercase tracking-wide text-[#2f6f93] sm:text-sm lg:text-[0.68rem]">
        {labels.title}
      </p>
      <h2 className="mt-1 text-xl font-black leading-tight text-[#13233a] sm:text-2xl md:text-xl lg:text-base">{labels.heading}</h2>
      <div className="mt-4 space-y-3 sm:mt-5 md:mt-3 md:space-y-2 lg:mt-2">
        {faqs.map((faq, index) => {
          const panelId = `faq-answer-${index}`;
          const buttonId = `faq-question-${index}`;
          const isOpen = openQuestion === faq.question;

          return (
            <div
              key={faq.question}
              className="rounded-xl border border-[#eadcc7] bg-[#fffaf2] p-3.5 sm:p-4 md:p-3 lg:p-2.5"
            >
              <button
                id={buttonId}
                type="button"
                className="flex min-h-12 w-full items-center justify-between gap-3 text-left text-sm font-black leading-6 text-[#13233a] sm:text-base md:min-h-10 md:text-sm md:leading-5 lg:min-h-9 lg:text-[0.78rem] lg:leading-4"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenQuestion(isOpen ? null : faq.question)}
              >
                <span>{faq.question}</span>
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#d8c8b4] bg-white text-lg leading-none text-[#13233a] md:h-8 md:w-8 lg:h-7 lg:w-7"
                >
                  {isOpen ? "-" : "+"}
                </span>
              </button>
              {isOpen ? (
                <p
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="mt-3 text-sm font-semibold leading-6 text-[#4f5d6c] md:mt-2 md:text-xs md:leading-5 lg:text-[0.72rem] lg:leading-4"
                >
                  {faq.answer}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
