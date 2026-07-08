const thailandTransferGuideRoutes = [
  {
    href: "https://thailandtransferguide.com/routes/suvarnabhumi-airport-to-koh-chang",
    label: "Bangkok \u2192 Koh Chang (bus + ferry)",
  },
  {
    href: "https://thailandtransferguide.com/routes/koh-chang-to-bangkok",
    label: "Koh Chang \u2192 Bangkok",
  },
  {
    href: "https://thailandtransferguide.com/routes/bangkok-to-hua-hin",
    label: "Bangkok \u2192 Hua Hin (van, bus, train)",
  },
  {
    href: "https://thailandtransferguide.com/routes/bangkok-to-chiang-mai",
    label: "Bangkok \u2192 Chiang Mai (train, bus, flight)",
  },
  {
    href: "https://thailandtransferguide.com/routes/phuket-airport-to-patong-beach",
    label: "Phuket Airport \u2192 Patong Beach",
  },
  {
    href: "https://thailandtransferguide.com/routes/krabi-airport-to-ao-nang",
    label: "Krabi Airport \u2192 Ao Nang",
  },
] as const;

const allThailandRoutesHref = "https://thailandtransferguide.com";

export function MoreThailandRoutes({ className = "" }: { className?: string }) {
  const rootClassName = [
    "rounded-[1.5rem] border border-[#eadcc7] bg-white p-4 shadow-sm md:rounded-[2rem] md:p-6",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      className={rootClassName}
      data-more-thailand-routes="true"
      data-visual-qa="more-thailand-routes"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#0e7b6b]">
            Thailand Transfer Guide
          </p>
          <h2 className="mt-1 text-xl font-black leading-tight text-[#13233a] md:text-2xl">
            More Thailand routes
          </h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-[#4f5d6c]">
            Traveling beyond Bangkok-Pattaya? Ferries, islands, airports, full
            route guides with live prices, plus hotels and eSIM.
          </p>
        </div>
        <a
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#d8c8b4] bg-[#fffaf2] px-4 text-center text-sm font-black text-[#13233a] transition hover:border-[#e8b05a] hover:bg-[#fff8ec]"
          href={allThailandRoutesHref}
        >
          All Thailand routes, hotels &amp; eSIM {"\u2192"} Thailand Transfer
          Guide
        </a>
      </div>

      <ul className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {thailandTransferGuideRoutes.map((route) => (
          <li key={route.href} className="min-w-0">
            <a
              className="block min-h-16 rounded-2xl border border-[#eadcc7] bg-[#fffaf2] px-4 py-3 text-sm font-black leading-5 text-[#13233a] transition hover:-translate-y-0.5 hover:border-[#e8b05a] hover:bg-white hover:text-[#0e7b6b] hover:shadow-md"
              href={route.href}
            >
              {route.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
