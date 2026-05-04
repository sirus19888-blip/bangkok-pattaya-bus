type StationAccessGuideProps = {
  sectionTitle: string;
  title: string;
  items: string[];
  note: string;
};

export function StationAccessGuide({
  sectionTitle,
  title,
  items,
  note,
}: StationAccessGuideProps) {
  return (
    <section className="rounded-2xl border border-[#eadcc7] bg-[#fffaf2] p-3 shadow-sm sm:p-5">
      <div className="rounded-2xl border border-[#eadcc7] bg-white p-3.5">
        <p className="text-xs font-bold uppercase tracking-wide text-[#2f6f93] sm:text-sm">
          {sectionTitle}
        </p>
        <h3 className="mt-2 text-lg font-black leading-tight text-[#13233a] sm:text-xl">
          {title}
        </h3>
      </div>
      <div className="mt-3 grid gap-2">
        {items.map((item, index) => (
          <div
            key={item}
            className="flex gap-3 rounded-2xl border border-[#eadcc7] bg-white px-3 py-2.5 text-sm font-semibold leading-6 text-[#4f5d6c]"
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f1d27a] text-xs font-black text-[#13233a]">
              {index + 1}
            </span>
            <p>{item}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 rounded-xl border border-[#d8c8b4] bg-white px-3 py-2 text-xs font-bold leading-5 text-[#6b7280]">
        {note}
      </p>
    </section>
  );
}
