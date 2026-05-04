"use client";

import Image from "next/image";
import { useState } from "react";
import type { LocaleCode } from "@/data/routes";
import {
  getStationPhotoAttributionLabel,
  getStationPhotoGalleryTitle,
  getStationPhotoText,
  type StationPhotoGroup,
} from "@/data/stationPhotos";
import type { StationPhoto } from "@/data/stationPhotos";

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
  const [activePhoto, setActivePhoto] = useState<StationPhoto | null>(null);

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
                    <button
                      type="button"
                      className="relative block aspect-[4/3] w-full overflow-hidden rounded-xl text-left focus:outline-none focus:ring-2 focus:ring-[#13233a] focus:ring-offset-2"
                      onClick={() => setActivePhoto(photo)}
                      aria-label={`Open larger photo: ${photoText.alt}`}
                    >
                      <Image
                        src={photo.src}
                        alt={photoText.alt}
                        fill
                        sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition duration-200 hover:scale-[1.02]"
                      />
                    </button>
                    {photo.displayTitle ? (
                      <p className="mt-2 text-sm font-black leading-5 text-[#13233a]">
                        {locale === "pl"
                          ? photo.displayTitle.pl
                          : photo.displayTitle.en}
                      </p>
                    ) : null}
                    <figcaption
                      className={
                        photo.displayTitle
                          ? "mt-1 text-[0.82rem] font-semibold leading-5 text-[#4f5d6c]"
                          : "mt-2 text-[0.82rem] font-black leading-5 text-[#13233a]"
                      }
                    >
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
      {activePhoto ? (
        <PhotoLightbox
          attributionLabel={attributionLabel}
          locale={locale}
          photo={activePhoto}
          onClose={() => setActivePhoto(null)}
        />
      ) : null}
    </section>
  );
}

function PhotoLightbox({
  attributionLabel,
  locale,
  onClose,
  photo,
}: {
  attributionLabel: string;
  locale: LocaleCode;
  onClose: () => void;
  photo: StationPhoto;
}) {
  const photoText = getStationPhotoText(photo, locale);
  const closeLabel = locale === "pl" ? "Zamknij" : "Close";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#13233a]/80 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={photoText.alt}
    >
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between gap-3 border-b border-[#eadcc7] p-3">
          <p className="text-sm font-black text-[#13233a]">
            {photo.displayTitle
              ? locale === "pl"
                ? photo.displayTitle.pl
                : photo.displayTitle.en
              : photo.title}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-xl bg-[#13233a] px-3 text-sm font-black text-white"
          >
            {closeLabel}
          </button>
        </div>
        <div className="relative aspect-[4/3] w-full bg-[#fffaf2]">
          <Image
            src={photo.src}
            alt={photoText.alt}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>
        <div className="p-3">
          <p className="text-sm font-black leading-5 text-[#13233a]">
            {photoText.caption}
          </p>
          <p className="mt-1 text-xs font-semibold leading-5 text-[#6b7280]">
            {attributionLabel}:{" "}
            <a
              href={photo.sourceUrl}
              className="underline decoration-[#d6b45f] underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              {photo.author} / Wikimedia Commons
            </a>{" "}
            /{" "}
            <a
              href={photo.licenseUrl}
              className="underline decoration-[#d6b45f] underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              {photo.licenseName}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
