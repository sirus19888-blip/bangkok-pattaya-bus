import type { GuideTip } from "@/data/faqs";
import type { Translations } from "@/lib/i18n";

type TravelGuideProps = {
  tips: GuideTip[];
  labels: Translations["travelTips"];
};

export function TravelGuide({ tips, labels }: TravelGuideProps) {
  return (
    <section className="rounded-2xl border border-[#c8dbe9] bg-[#eaf5fb] p-4 shadow-sm sm:p-5 md:p-4 lg:p-3">
      <p className="text-xs font-bold uppercase tracking-wide text-[#2f6f93] sm:text-sm lg:text-[0.68rem]">
        {labels.title}
      </p>
      <h2 className="mt-1 text-xl font-black leading-tight text-[#13233a] sm:text-2xl md:text-xl lg:text-base">
        {labels.heading}
      </h2>
      <div className="mt-4 grid gap-3 sm:mt-5 md:mt-3 md:gap-2.5 lg:mt-2 lg:gap-2">
        {tips.map((tip, index) => (
          <article key={tip.title} className="rounded-xl bg-white p-4 shadow-sm md:p-3 lg:p-2.5">
            <div className="flex gap-3 lg:gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f3d77b] text-sm font-black text-[#3f3413] md:h-7 md:w-7 md:text-xs lg:h-6 lg:w-6 lg:text-[0.65rem]">
                {index + 1}
              </span>
              <div>
                <h3 className="font-black text-[#13233a] lg:text-sm">{tip.title}</h3>
                <p className="mt-1 text-sm leading-6 text-[#4f5d6c] md:text-xs md:leading-5 lg:text-[0.72rem] lg:leading-4">{tip.body}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
