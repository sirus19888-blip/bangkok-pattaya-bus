import { StationMiniMap } from "@/components/StationMiniMap";
import { StationPhotoGallery } from "@/components/StationPhotoGallery";
import type { LocaleCode } from "@/data/routes";
import type { Station } from "@/data/stations";
import type { StationPhotoGroup } from "@/data/stationPhotos";
import type { Translations } from "@/lib/i18n";

type StationCardProps = {
  stations: Station[];
  locale: LocaleCode;
  photoGroups?: StationPhotoGroup[];
  labels: Translations["station"] & {
    openInGoogleMaps: string;
  };
};

export function StationCard({
  stations,
  locale,
  photoGroups = [],
  labels,
}: StationCardProps) {
  return (
    <section className="rounded-2xl border border-[#eadcc7] bg-[#fffaf2] p-3 shadow-sm sm:p-5 min-[1180px]:p-3.5">
      <p className="px-1 text-xs font-bold uppercase tracking-wide text-[#2f6f93] sm:text-sm">
        {labels.title}
      </p>
      <div className="mt-3 grid gap-3 sm:mt-5 sm:grid-cols-2 min-[1180px]:mt-3 min-[1180px]:grid-cols-1 min-[1180px]:gap-3">
        {stations.map((station, index) => (
          <article
            key={station.id}
            className="overflow-hidden rounded-2xl border border-[#eadcc7] bg-white shadow-sm"
          >
            <div className="border-b border-[#eadcc7] bg-[#f9fbff] p-3.5 sm:p-4 min-[1180px]:p-3">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#13233a] text-sm font-black text-white min-[1180px]:h-7 min-[1180px]:w-7 min-[1180px]:text-xs">
                  {index + 1}
                </span>
                <div>
                  <h2 className="text-lg font-black leading-tight text-[#13233a] sm:text-xl min-[1180px]:text-base">
                    {station.name}
                  </h2>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[#2f6f93]">
                    {labels.bestFor} {station.bestFor}
                  </p>
                </div>
              </div>
              <p className="mt-3 rounded-xl border border-[#eadcc7] bg-white px-3 py-2 text-sm font-semibold leading-6 text-[#4f5d6c] min-[1180px]:mt-2 min-[1180px]:text-xs min-[1180px]:leading-5">
                <span className="font-black text-[#13233a]">{labels.tip}</span>{" "}
                {station.tip}
              </p>
            </div>
            <div className="space-y-3 p-3 sm:p-4 min-[1180px]:space-y-2.5 min-[1180px]:p-3">
              <StationPhotoGallery
                groups={photoGroups.filter((group) => group.stationId === station.id)}
                locale={locale}
                showTitle={false}
                showGroupTitles={false}
                compact
              />
              <StationMiniMap
                station={station}
                locale={locale}
                openInGoogleMapsLabel={labels.openInGoogleMaps}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
