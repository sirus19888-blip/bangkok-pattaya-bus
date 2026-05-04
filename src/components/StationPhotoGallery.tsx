import Image from "next/image";
import type { LocaleCode } from "@/data/routes";
import {
  getStationPhotoAttributionLabel,
  getStationPhotoGalleryTitle,
  getStationPhotoText,
  type StationPhotoGroup,
} from "@/data/stationPhotos";

type StationPhotoGalleryProps = {
  groups: StationPhotoGroup[];
  locale: LocaleCode;
  showTitle?: boolean;
  showGroupTitles?: boolean;
  compact?: boolean;
};

export function StationPhotoGallery({
  groups,
  locale,
  showTitle = true,
  showGroupTitles = true,
  compact = false,
}: StationPhotoGalleryProps) {
  const visibleGroups = groups.filter((group) => group.photos.length > 0);

  if (visibleGroups.length === 0) {
    return null;
  }

  const galleryTitle = getStationPhotoGalleryTitle(locale);
  const attributionLabel = getStationPhotoAttributionLabel(locale);

  return (
    <section
      className={
        compact
          ? "rounded-2xl border border-[#eadcc7] bg-[#fffaf2] p-2.5"
          : "rounded-2xl border border-[#eadcc7] bg-white p-3.5 shadow-sm sm:p-5"
      }
    >
      {showTitle ? (
        <h2 className="text-lg font-black leading-tight text-[#13233a] sm:text-2xl">
          {galleryTitle}
        </h2>
      ) : null}

      <div className={showTitle ? "mt-3 space-y-4 sm:mt-4" : "space-y-4"}>
        {visibleGroups.map((group) => (
          <section key={group.stationId} aria-labelledby={`${group.stationId}-photos`}>
            {showGroupTitles ? (
              <h3
                id={`${group.stationId}-photos`}
                className="text-sm font-black text-[#13233a] sm:text-base"
              >
                {group.title}
              </h3>
            ) : null}
            <div
              className={
                showGroupTitles
                  ? "mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid gap-2 sm:grid-cols-2"
              }
            >
              {group.photos.map((photo) => {
                const photoText = getStationPhotoText(photo, locale);

                return (
                  <figure
                    key={`${group.stationId}-${photo.src}`}
                    className="overflow-hidden rounded-xl border border-[#eadcc7] bg-white p-2"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                      <Image
                        src={photo.src}
                        alt={photoText.alt}
                        fill
                        sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="mt-2 text-[0.82rem] font-black leading-5 text-[#13233a]">
                      {photoText.caption}
                    </figcaption>
                    <p className="mt-1 text-[0.72rem] font-semibold leading-4 text-[#6b7280]">
                      {attributionLabel}:{" "}
                      <a
                        href={photo.sourceUrl}
                        className="underline decoration-[#d6b45f] underline-offset-2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {photo.author}
                      </a>
                      ,{" "}
                      <a
                        href={photo.licenseUrl}
                        className="underline decoration-[#d6b45f] underline-offset-2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {photo.licenseName}
                      </a>
                    </p>
                  </figure>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
