import { CrossSiteLink } from "@/components/CrossSiteLink";
import type { LocaleCode, RouteId } from "@/data/routes";

const thailandTransferGuideRoutes = [
  {
    href: "https://thailandtransferguide.com/routes/suvarnabhumi-airport-to-koh-chang",
    id: "suvarnabhumi-airport-to-koh-chang",
    label: "Bangkok → Koh Chang (bus + ferry)",
  },
  {
    href: "https://thailandtransferguide.com/routes/koh-chang-to-bangkok",
    id: "koh-chang-to-bangkok",
    label: "Koh Chang → Bangkok",
  },
  {
    href: "https://thailandtransferguide.com/routes/bangkok-to-hua-hin",
    id: "bangkok-to-hua-hin",
    label: "Bangkok → Hua Hin (van, bus, train)",
  },
  {
    href: "https://thailandtransferguide.com/routes/bangkok-to-chiang-mai",
    id: "bangkok-to-chiang-mai",
    label: "Bangkok → Chiang Mai (train, bus, flight)",
  },
  {
    href: "https://thailandtransferguide.com/routes/phuket-airport-to-patong-beach",
    id: "phuket-airport-to-patong-beach",
    label: "Phuket Airport → Patong Beach",
  },
  {
    href: "https://thailandtransferguide.com/routes/krabi-airport-to-ao-nang",
    id: "krabi-airport-to-ao-nang",
    label: "Krabi Airport → Ao Nang",
  },
] as const;

const allThailandRoutesHref = "https://thailandtransferguide.com";

type MoreThailandRoutesProps = {
  className?: string;
  locale: LocaleCode;
  routeId?: RouteId;
};

export function MoreThailandRoutes({
  className = "",
  locale,
  routeId,
}: MoreThailandRoutesProps) {
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
        <CrossSiteLink
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#d8c8b4] bg-[#fffaf2] px-4 text-center text-sm font-black text-[#13233a] transition hover:border-[#e8b05a] hover:bg-[#fff8ec]"
          href={allThailandRoutesHref}
          lang={locale}
          routeId={routeId}
          to="ttg-home"
        >
          All Thailand routes, hotels &amp; eSIM {"→"} Thailand Transfer
          Guide
        </CrossSiteLink>
      </div>

      <ul className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {thailandTransferGuideRoutes.map((route) => (
          <li key={route.href} className="min-w-0">
            <CrossSiteLink
              className="block min-h-16 rounded-2xl border border-[#eadcc7] bg-[#fffaf2] px-4 py-3 text-sm font-black leading-5 text-[#13233a] transition hover:-translate-y-0.5 hover:border-[#e8b05a] hover:bg-white hover:text-[#0e7b6b] hover:shadow-md"
              href={route.href}
              lang={locale}
              routeId={routeId}
              to={route.id}
            >
              {route.label}
            </CrossSiteLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
