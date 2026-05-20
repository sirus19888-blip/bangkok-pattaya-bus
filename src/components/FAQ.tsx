import type { FAQItem } from "@/data/faqs";
import type { Translations } from "@/lib/i18n";

type FAQProps = {
  faqs: FAQItem[];
  labels: Translations["faq"];
  showTitle?: boolean;
};

export function FAQ({ faqs, labels, showTitle = true }: FAQProps) {
  return (
    <section className="rounded-2xl border border-[#eadcc7] bg-white p-4 shadow-sm sm:p-5 md:p-4">
      {showTitle ? (
        <p className="text-xs font-bold uppercase tracking-wide text-[#2f6f93] sm:text-sm">
          {labels.title}
        </p>
      ) : null}
      <h2 className="mt-1 text-xl font-black leading-tight text-[#13233a] sm:text-2xl md:text-xl">{labels.heading}</h2>
      <div className="mt-4 space-y-3 sm:mt-5 md:mt-3 md:space-y-2">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group/faq rounded-xl border border-[#eadcc7] bg-[#fffaf2] p-3.5 sm:p-4 md:p-3"
          >
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 text-left text-sm font-black leading-6 text-[#13233a] sm:text-base md:min-h-10 md:text-sm md:leading-5 [&::-webkit-details-marker]:hidden">
              <span>{faq.question}</span>
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#d8c8b4] bg-white text-lg leading-none text-[#13233a] md:h-8 md:w-8"
              >
                <span className="group-open/faq:hidden">+</span>
                <span className="hidden group-open/faq:inline">-</span>
              </span>
            </summary>
            <p className="mt-3 text-sm font-semibold leading-6 text-[#4f5d6c] md:mt-2 md:text-xs md:leading-5">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
