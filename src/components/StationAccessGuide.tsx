type StationAccessGuideProps = {
  sectionTitle: string;
  title: string;
  items: string[];
  note: string;
  swipeHint: string;
};

export function StationAccessGuide({
  sectionTitle,
  title,
  items,
  note,
  swipeHint,
}: StationAccessGuideProps) {
  return (
    <section className="rounded-2xl border border-[#eadcc7] bg-[#fffaf2] p-3 shadow-sm sm:p-5 lg:p-3.5">
      <div className="rounded-2xl border border-[#eadcc7] bg-white p-3.5 lg:p-3">
        <p className="text-xs font-bold uppercase tracking-wide text-[#2f6f93] sm:text-sm">
          {sectionTitle}
        </p>
        <h3 className="mt-2 text-lg font-black leading-tight text-[#13233a] sm:text-xl lg:text-base">
          {title}
        </h3>
      </div>
      <p className="mt-3 text-xs font-bold text-[#6b7280] md:hidden">
        {swipeHint}
      </p>
      <div
        aria-label={`${title}: ${swipeHint}`}
        className="mt-2 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#13233a] focus-visible:ring-offset-2 md:grid md:gap-2 md:overflow-visible md:pb-0 lg:mt-2.5"
        role="group"
        tabIndex={0}
      >
        {items.map((item, index) => (
          <div
            key={item}
            className="flex w-[260px] flex-none snap-start gap-3 rounded-2xl border border-[#eadcc7] bg-white px-3 py-2.5 text-sm font-semibold leading-6 text-[#4f5d6c] md:w-auto md:flex-auto lg:gap-2.5 lg:py-2 lg:text-xs lg:leading-5"
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f1d27a] text-xs font-black text-[#13233a] lg:h-5 lg:w-5 lg:text-[0.65rem]">
              {index + 1}
            </span>
            <p>{item}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 rounded-xl border border-[#d8c8b4] bg-white px-3 py-2 text-xs font-bold leading-5 text-[#6b7280] lg:mt-2.5">
        {note}
      </p>
    </section>
  );
}
