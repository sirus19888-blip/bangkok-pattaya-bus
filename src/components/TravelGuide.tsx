import type { GuideTip } from "@/data/faqs";
import type { Translations } from "@/lib/i18n";

type TravelGuideProps = {
  tips: GuideTip[];
  labels: Translations["travelTips"];
};

export function TravelGuide({ tips, labels }: TravelGuideProps) {
  return (
    <section className="rounded-lg border border-[#c8dbe9] bg-[#eaf5fb] p-4 shadow-sm sm:p-5">
      <p className="text-sm font-bold uppercase tracking-wide text-[#2f6f93]">
        {labels.title}
      </p>
      <h2 className="mt-1 text-xl font-black text-[#13233a] sm:text-2xl">
        {labels.heading}
      </h2>
      <div className="mt-4 grid gap-3 sm:mt-5">
        {tips.map((tip, index) => (
          <article key={tip.title} className="rounded-lg bg-white p-3.5 shadow-sm sm:p-4">
            <div className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#f3d77b] text-sm font-black text-[#3f3413]">
                {index + 1}
              </span>
              <div>
                <h3 className="font-black text-[#13233a]">{tip.title}</h3>
                <p className="mt-1 text-sm leading-6 text-[#4f5d6c]">{tip.body}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
