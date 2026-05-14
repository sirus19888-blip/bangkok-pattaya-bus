"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { LocaleCode } from "@/data/routes";
import {
  getStationPhotoAttributionLabel,
  getStationPhotoGalleryTitle,
  getStationPhotoText,
  type StationPhotoGroup,
} from "@/data/stationPhotos";
import type { StationPhoto } from "@/data/stationPhotos";
import { repairMojibake } from "@/lib/repairMojibake";

type StationPhotoGalleryProps = {
  groups: StationPhotoGroup[];
  locale: LocaleCode;
  showTitle?: boolean;
  showGroupTitles?: boolean;
  compact?: boolean;
  mobilePreviewLimit?: number;
  mobileShowAll?: boolean;
};

export function StationPhotoGallery({
  groups,
  locale,
  showTitle = true,
  showGroupTitles = true,
  compact = false,
  mobilePreviewLimit,
  mobileShowAll = true,
}: StationPhotoGalleryProps) {
  const visibleGroups = groups.filter((group) => group.photos.length > 0);
  const [activePhoto, setActivePhoto] = useState<StationPhoto | null>(null);

  if (visibleGroups.length === 0) {
    return null;
  }

  const galleryTitle = repairMojibake(getStationPhotoGalleryTitle(locale));
  const attributionLabel = repairMojibake(getStationPhotoAttributionLabel(locale));
  const openPhotoLabel =
    locale === "ru"
      ? "Открыть фото крупнее"
      : locale === "de"
        ? "Foto größer öffnen"
      : locale === "th"
        ? "เปิดรูปขนาดใหญ่"
      : locale === "zh"
        ? "打开大图"
      : locale === "fr"
        ? "Ouvrir la photo en grand"
        : "Open larger photo";
  const closeImageLabel =
    locale === "ru"
      ? "Закрыть фото"
      : locale === "de"
        ? "Foto schließen"
        : locale === "th"
          ? "ปิดรูป"
        : locale === "zh"
          ? "关闭图片"
        : locale === "fr"
          ? "Fermer l'image"
          : "Close image";

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
      <div className={showTitle ? "mt-3 space-y-4 sm:mt-4" : "mt-2 space-y-4 md:mt-0"}>
        {visibleGroups.map((group) => (
          <section key={group.stationId} aria-labelledby={`${group.stationId}-photos`}>
            {showGroupTitles ? (
              <h3
                id={`${group.stationId}-photos`}
                className="text-sm font-black text-[#13233a] sm:text-base"
              >
                {repairMojibake(group.title)}
              </h3>
            ) : null}
            <div
              className={
                showGroupTitles
                  ? "mt-2 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3"
                  : "flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:grid md:gap-2 md:overflow-visible md:pb-0 md:grid-cols-2 lg:grid-cols-3"
              }
            >
              {group.photos.map((photo, photoIndex) => {
                const photoText = getStationPhotoText(photo, locale);
                const cleanAlt = repairMojibake(photoText.alt);
                const cleanCaption = repairMojibake(photoText.caption);
                const hideInMobilePreview =
                  typeof mobilePreviewLimit === "number" &&
                  !mobileShowAll &&
                  photoIndex >= mobilePreviewLimit;

                return (
                  <figure
                    key={`${group.stationId}-${photo.src}`}
                    className={`w-[240px] flex-none snap-start rounded-xl border border-[#eadcc7] bg-white p-2 md:w-auto md:flex-auto lg:p-1.5 ${
                      hideInMobilePreview ? "hidden md:block" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="relative block aspect-[4/3] w-full overflow-hidden rounded-xl text-left focus:outline-none focus:ring-2 focus:ring-[#13233a] focus:ring-offset-2 lg:rounded-lg"
                      onClick={() => setActivePhoto(photo)}
                      aria-label={`${openPhotoLabel}: ${cleanAlt}`}
                    >
                      <Image
                        src={photo.src}
                        alt={cleanAlt}
                        fill
                        loading="lazy"
                        sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition duration-200 hover:scale-[1.02]"
                      />
                    </button>
                    {photo.displayTitle ? (
                      <p className="mt-2 text-sm font-black leading-5 text-[#13233a] lg:mt-1.5 lg:text-xs lg:leading-4">
                        {repairMojibake(locale === "pl"
                          ? photo.displayTitle.pl
                          : locale === "ru"
                            ? photo.displayTitle.ru ?? "Фото станции"
                          : locale === "de"
                            ? photo.displayTitle.de ?? "Stationsfoto"
                          : locale === "th"
                            ? photo.displayTitle.th ?? "ภาพสถานี"
                          : locale === "zh"
                            ? photo.displayTitle.zh ?? "车站照片"
                          : locale === "fr"
                            ? photo.displayTitle.fr ?? "Photo de la station"
                            : photo.displayTitle.en)}
                      </p>
                    ) : null}
                    <figcaption
                      className={
                        photo.displayTitle
                          ? "mt-1 text-[0.82rem] font-semibold leading-5 text-[#4f5d6c] lg:text-[0.68rem] lg:leading-4"
                          : "mt-2 text-[0.82rem] font-black leading-5 text-[#13233a] lg:mt-1 lg:text-[0.68rem] lg:leading-4"
                      }
                    >
                      {cleanCaption}
                    </figcaption>
                    <p className="mt-1 text-[0.72rem] font-semibold leading-4 text-[#6b7280] lg:text-[0.62rem] lg:leading-3">
                      <AttributionPrefix
                        label={attributionLabel}
                        tooltip={repairMojibake(`${attributionLabel}: ${photo.author} / Wikimedia Commons / ${photo.licenseName}`)}
                      />{" "}
                      <span className="hidden">
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
                      </span>
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
          closeImageLabel={closeImageLabel}
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
  closeImageLabel,
  locale,
  onClose,
  photo,
}: {
  attributionLabel: string;
  closeImageLabel: string;
  locale: LocaleCode;
  onClose: () => void;
  photo: StationPhoto;
}) {
  const photoText = getStationPhotoText(photo, locale);
  const cleanAlt = repairMojibake(photoText.alt);
  const cleanCaption = repairMojibake(photoText.caption);
  const title = repairMojibake(photo.displayTitle
    ? locale === "pl"
      ? photo.displayTitle.pl
      : locale === "ru"
        ? photo.displayTitle.ru ?? "Фото станции"
      : locale === "de"
        ? photo.displayTitle.de ?? "Stationsfoto"
      : locale === "th"
        ? photo.displayTitle.th ?? "ภาพสถานี"
      : locale === "zh"
        ? photo.displayTitle.zh ?? "车站照片"
      : locale === "fr"
        ? photo.displayTitle.fr ?? "Photo de la station"
      : photo.displayTitle.en
    : photo.title);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#13233a]/80 p-3 sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-label={cleanAlt}
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-[90vw] flex-col overflow-hidden rounded-2xl bg-white shadow-xl sm:max-h-[90vh]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[#eadcc7] p-3 pr-14">
          <p className="line-clamp-2 text-sm font-black leading-5 text-[#13233a]">
            {title}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={closeImageLabel}
          className="absolute right-2 top-2 z-10 flex min-h-11 min-w-11 items-center justify-center rounded-full bg-[#13233a] text-2xl font-black leading-none text-white shadow-sm transition hover:bg-[#233a5b]"
        >
          ×
        </button>
        <button
          type="button"
          className="relative h-[62vh] max-h-[70vh] w-full cursor-zoom-out touch-manipulation bg-[#fffaf2] sm:h-[70vh] sm:max-h-[80vh]"
          onClick={onClose}
          onPointerUp={onClose}
          aria-label={closeImageLabel}
        >
          <Image
            src={photo.src}
            alt={cleanAlt}
            fill
            sizes="100vw"
            className="pointer-events-none object-contain"
            priority
          />
        </button>
        <div className="shrink-0 p-3">
          <p className="text-sm font-black leading-5 text-[#13233a]">
            {cleanCaption}
          </p>
          <p className="mt-1 text-xs font-semibold leading-5 text-[#6b7280]">
            <AttributionPrefix
              label={attributionLabel}
              tooltip={repairMojibake(`${attributionLabel}: ${photo.author} / Wikimedia Commons / ${photo.licenseName}`)}
            />{" "}
            <span className="hidden">
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
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function AttributionPrefix({
  label,
  tooltip,
}: {
  label: string;
  tooltip: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span className="relative inline-flex align-middle">
      <button
        type="button"
        aria-label={label}
        aria-expanded={isOpen}
        className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#d8c8b4] bg-[#fffaf2] text-[#13233a] outline-none transition hover:border-[#2f6f93] focus:border-[#2f6f93] focus:ring-2 focus:ring-[#c8dbe9]"
        onClick={() => setIsOpen((current) => !current)}
      >
        <Image
          alt=""
          aria-hidden="true"
          className="h-4 w-4 object-contain"
          height={16}
          src="/images/icons/icon-camera.png"
          width={16}
        />
      </button>
      {isOpen ? (
        <span className="absolute bottom-full left-0 z-50 mb-2 block w-[16rem] max-w-[min(16rem,80vw)] rounded-lg bg-[#13233a] px-3 py-2 text-left text-[0.68rem] font-black leading-4 text-white shadow-xl">
          {tooltip}
        </span>
      ) : null}
    </span>
  );
}


