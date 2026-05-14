"use client";

import { useState } from "react";
import { StationMiniMap } from "@/components/StationMiniMap";
import { StationPhotoGallery } from "@/components/StationPhotoGallery";
import type { LocaleCode, RouteId } from "@/data/routes";
import type { Station } from "@/data/stations";
import type { StationPhotoGroup } from "@/data/stationPhotos";
import type { Translations } from "@/lib/i18n";
import { repairMojibake, repairMojibakeList } from "@/lib/repairMojibake";

type StationCardProps = {
  stations: Station[];
  locale: LocaleCode;
  routeId?: RouteId;
  photoGroups?: StationPhotoGroup[];
  showTitle?: boolean;
  labels: Translations["station"] & {
    openInGoogleMaps: string;
  };
};

export function StationCard({
  stations,
  locale,
  routeId,
  photoGroups = [],
  showTitle = true,
  labels,
}: StationCardProps) {
  const [expandedStations, setExpandedStations] = useState<
    Record<string, boolean>
  >({});
  const showMoreLabel = getShowMoreLabel(locale);
  const showLessLabel = getShowLessLabel(locale);

  return (
    <section className="rounded-2xl border border-[#eadcc7] bg-[#fffaf2] p-3 shadow-sm sm:p-5">
      {showTitle ? (
        <p className="px-1 text-xs font-bold uppercase tracking-wide text-[#2f6f93] sm:text-sm">
          {labels.title}
        </p>
      ) : null}
      <div className="mt-3 grid gap-3 sm:mt-5 sm:grid-cols-2">
        {stations.map((station, index) => {
          const stationTip = getStationTip(station.id, station.tip, locale, routeId);
          const stationTipPoints = getMobileTipPoints(
            station.id,
            stationTip,
            locale,
            routeId,
          );
          const isExpanded = expandedStations[station.id] ?? false;
          const stationPhotoGroups = photoGroups.filter(
            (group) => group.stationId === station.id,
          );
          const hasExtraMobilePhotos = stationPhotoGroups.some(
            (group) => group.photos.length > 1,
          );
          const hasHiddenMobileDetails =
            stationTipPoints.length > 3 || hasExtraMobilePhotos;

          return (
            <article
              key={station.id}
              className="overflow-hidden rounded-2xl border border-[#eadcc7] bg-white shadow-sm"
            >
              <div className="border-b border-[#eadcc7] bg-[#f9fbff] p-3.5 sm:p-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#13233a] text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="hidden text-lg font-black leading-tight text-[#13233a] md:block sm:text-xl">
                      {station.name}
                    </h2>
                    <p className="mt-1 hidden text-xs font-bold uppercase tracking-wide text-[#2f6f93] md:block">
                      {labels.bestFor} {station.bestFor}
                    </p>
                    <ul className="space-y-2 md:hidden">
                      <li className="flex gap-2 text-base font-black leading-tight text-[#13233a]">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e8b05a]" />
                        <span>{station.name}</span>
                      </li>
                      <li className="flex gap-2 text-xs font-bold uppercase tracking-wide text-[#2f6f93]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e8b05a]" />
                        <span>
                          {labels.bestFor} {station.bestFor}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="relative mt-3 overflow-hidden rounded-xl border border-[#eadcc7] bg-white px-3 py-2 text-sm font-semibold leading-6 text-[#4f5d6c]">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-black text-[#13233a]">{labels.tip}</span>
                  </div>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-2 right-0 top-10 z-10 w-10 bg-gradient-to-l from-white via-white/85 to-transparent md:hidden"
                  />
                  <ul className="-mx-3 mt-2 flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-2 pr-8 [scrollbar-width:thin] md:mx-0 md:grid md:grid-cols-2 md:gap-2 md:overflow-visible md:px-0 md:pb-0 md:pr-0">
                    {stationTipPoints.map((point, pointIndex) => (
                      <li
                        key={point}
                        className={`w-[17rem] flex-none snap-start gap-2 rounded-xl border border-[#eadcc7] bg-[#fffaf2] p-3 leading-5 shadow-sm md:w-auto md:flex md:border-[#eadcc7] md:bg-[#fffaf2] md:p-3 md:shadow-sm ${
                          pointIndex < 3 || isExpanded ? "flex" : "hidden md:flex"
                        }`}
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e8b05a]" />
                      <span>{repairMojibake(point)}</span>
                      </li>
                    ))}
                  </ul>
                  {hasHiddenMobileDetails ? (
                    <button
                      type="button"
                      className="mt-2 inline-flex min-h-9 items-center rounded-full border border-[#e8b05a] bg-[#fff8ec] px-3 text-xs font-black text-[#13233a] md:hidden"
                      onClick={() =>
                        setExpandedStations((current) => ({
                          ...current,
                          [station.id]: !isExpanded,
                        }))
                      }
                    >
                      {isExpanded ? showLessLabel : showMoreLabel}
                    </button>
                  ) : null}
                </div>
              </div>
              <div className="space-y-3 p-3 sm:p-4">
                <StationPhotoGallery
                  groups={stationPhotoGroups}
                  locale={locale}
                  showTitle={false}
                  showGroupTitles={false}
                  compact
                  mobilePreviewLimit={1}
                  mobileShowAll={isExpanded}
                />
                <StationMiniMap
                  station={station}
                  locale={locale}
                  openInGoogleMapsLabel={labels.openInGoogleMaps}
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function getShowMoreLabel(locale: LocaleCode) {
  const labels: Record<LocaleCode, string> = {
    de: "Mehr anzeigen",
    en: "Show more",
    fr: "Voir plus",
    pl: "Pokaż więcej",
    ru: "Показать ещё",
    th: "ดูเพิ่มเติม",
    zh: "查看更多",
  };

  return labels[locale] ?? labels.en;
}

function getShowLessLabel(locale: LocaleCode) {
  const labels: Record<LocaleCode, string> = {
    de: "Weniger anzeigen",
    en: "Show less",
    fr: "Voir moins",
    pl: "Pokaż mniej",
    ru: "Скрыть",
    th: "แสดงน้อยลง",
    zh: "收起",
  };

  return labels[locale] ?? labels.en;
}

const donMueangDepartureTips: Record<LocaleCode, string[]> = {
  en: [
    "After arriving at Don Mueang, check your ticket first: Terminal 1 is for international flights and Terminal 2 is for domestic flights.",
    "Go to the departures level and find your airline check-in row or self-service kiosk. Prepare passport or ID, ticket/booking, and baggage.",
    "After check-in and bag drop, go through security. For international flights, continue through passport control/immigration after security.",
    "Check the gate on the airport screens and walk to the gate early. Aim to be at DMK about 2 hours before departure, longer if you have baggage or an international flight.",
  ],
  pl: [
    "Po dojechaniu na Don Mueang najpierw sprawdĹş bilet: Terminal 1 obsĹ‚uguje loty miÄ™dzynarodowe, a Terminal 2 loty krajowe.",
    "IdĹş na poziom odlotĂłw i znajdĹş rzÄ…d odprawy swojej linii albo kiosk samoobsĹ‚ugowy. Przygotuj paszport lub dokument, rezerwacjÄ™/bilet i bagaĹĽ.",
    "Po odprawie i nadaniu bagaĹĽu przejdĹş kontrolÄ™ bezpieczeĹ„stwa. Przy locie miÄ™dzynarodowym po kontroli przejdĹş jeszcze kontrolÄ™ paszportowÄ…/immigration.",
    "SprawdĹş bramkÄ™ na ekranach lotniska i idĹş do gate wczeĹ›niej. Celuj w przyjazd na DMK okoĹ‚o 2 godziny przed odlotem, a przy bagaĹĽu lub locie miÄ™dzynarodowym zostaw wiÄ™kszy zapas.",
  ],
  de: [
    "Nach der Ankunft am Don Mueang prĂĽfe zuerst dein Ticket: Terminal 1 ist fĂĽr internationale FlĂĽge, Terminal 2 fĂĽr InlandsflĂĽge.",
    "Gehe zur Abflugebene und suche die Check-in-Reihe deiner Airline oder einen Self-Service-Kiosk. Halte Pass oder Ausweis, Buchung/Ticket und GepĂ¤ck bereit.",
    "Nach Check-in und GepĂ¤ckabgabe gehst du durch die Sicherheitskontrolle. Bei internationalen FlĂĽgen folgt danach die Passkontrolle/Immigration.",
    "PrĂĽfe dein Gate auf den Flughafenbildschirmen und gehe frĂĽhzeitig dorthin. Plane etwa 2 Stunden vor Abflug am DMK zu sein, mit GepĂ¤ck oder internationalem Flug lieber mehr.",
  ],
  fr: [
    "Ă€ l'arrivĂ©e Ă  Don Mueang, vĂ©rifiez d'abord votre billet : le Terminal 1 est pour les vols internationaux et le Terminal 2 pour les vols domestiques.",
    "Montez au niveau des dĂ©parts et trouvez le rang d'enregistrement de votre compagnie ou une borne libre-service. PrĂ©parez passeport ou piĂ¨ce d'identitĂ©, rĂ©servation/billet et bagages.",
    "AprĂ¨s l'enregistrement et le dĂ©pĂ´t des bagages, passez le contrĂ´le de sĂ©curitĂ©. Pour un vol international, continuez ensuite vers le contrĂ´le des passeports/immigration.",
    "VĂ©rifiez la porte sur les Ă©crans de l'aĂ©roport et rejoignez-la en avance. Essayez d'arriver Ă  DMK environ 2 heures avant le dĂ©part, davantage avec bagages ou vol international.",
  ],
  ru: [
    "ĐźĐľŃĐ»Đµ ĐżŃ€Đ¸Đ±Ń‹Ń‚Đ¸ŃŹ Đ˛ Don Mueang ŃĐ˝Đ°Ń‡Đ°Đ»Đ° ĐżŃ€ĐľĐ˛ĐµŃ€ŃŚŃ‚Đµ Đ±Đ¸Đ»ĐµŃ‚: Terminal 1 â€” ĐĽĐµĐ¶Đ´ŃĐ˝Đ°Ń€ĐľĐ´Đ˝Ń‹Đµ Ń€ĐµĐąŃŃ‹, Terminal 2 â€” Đ˛Đ˝ŃŃ‚Ń€ĐµĐ˝Đ˝Đ¸Đµ Ń€ĐµĐąŃŃ‹.",
    "ĐĐ´Đ¸Ń‚Đµ Đ˝Đ° ŃŃ€ĐľĐ˛ĐµĐ˝ŃŚ Đ˛Ń‹Đ»ĐµŃ‚ĐľĐ˛ Đ¸ Đ˝Đ°ĐąĐ´Đ¸Ń‚Đµ ŃŃ‚ĐľĐąĐşŃ Ń€ĐµĐłĐ¸ŃŃ‚Ń€Đ°Ń†Đ¸Đ¸ ŃĐ˛ĐľĐµĐą Đ°Đ˛Đ¸Đ°ĐşĐľĐĽĐżĐ°Đ˝Đ¸Đ¸ Đ¸Đ»Đ¸ ĐşĐ¸ĐľŃĐş ŃĐ°ĐĽĐľĐľĐ±ŃĐ»ŃĐ¶Đ¸Đ˛Đ°Đ˝Đ¸ŃŹ. ĐźĐľĐ´ĐłĐľŃ‚ĐľĐ˛ŃŚŃ‚Đµ ĐżĐ°ŃĐżĐľŃ€Ń‚ Đ¸Đ»Đ¸ ID, Đ±Đ¸Đ»ĐµŃ‚/Đ±Ń€ĐľĐ˝ŃŚ Đ¸ Đ±Đ°ĐłĐ°Đ¶.",
    "ĐźĐľŃĐ»Đµ Ń€ĐµĐłĐ¸ŃŃ‚Ń€Đ°Ń†Đ¸Đ¸ Đ¸ ŃĐ´Đ°Ń‡Đ¸ Đ±Đ°ĐłĐ°Đ¶Đ° ĐżŃ€ĐľĐąĐ´Đ¸Ń‚Đµ ĐşĐľĐ˝Ń‚Ń€ĐľĐ»ŃŚ Đ±ĐµĐ·ĐľĐżĐ°ŃĐ˝ĐľŃŃ‚Đ¸. Đ”Đ»ŃŹ ĐĽĐµĐ¶Đ´ŃĐ˝Đ°Ń€ĐľĐ´Đ˝ĐľĐłĐľ Ń€ĐµĐąŃĐ° ĐżĐľŃĐ»Đµ Đ˝ĐµĐłĐľ ĐżŃ€ĐľĐąĐ´Đ¸Ń‚Đµ ĐżĐ°ŃĐżĐľŃ€Ń‚Đ˝Ń‹Đą ĐşĐľĐ˝Ń‚Ń€ĐľĐ»ŃŚ/immigration.",
    "ĐźŃ€ĐľĐ˛ĐµŃ€ŃŚŃ‚Đµ Đ˛Ń‹Ń…ĐľĐ´ Đ˝Đ° Ń‚Đ°Đ±Đ»Đľ Đ°ŃŤŃ€ĐľĐżĐľŃ€Ń‚Đ° Đ¸ Đ¸Đ´Đ¸Ń‚Đµ Đş gate Đ·Đ°Ń€Đ°Đ˝ĐµĐµ. Đ›ŃŃ‡ŃĐµ Đ±Ń‹Ń‚ŃŚ Đ˛ DMK ĐżŃ€Đ¸ĐĽĐµŃ€Đ˝Đľ Đ·Đ° 2 Ń‡Đ°ŃĐ° Đ´Đľ Đ˛Ń‹Đ»ĐµŃ‚Đ°, Đ° Ń Đ±Đ°ĐłĐ°Đ¶ĐľĐĽ Đ¸Đ»Đ¸ ĐĽĐµĐ¶Đ´ŃĐ˝Đ°Ń€ĐľĐ´Đ˝Ń‹ĐĽ Ń€ĐµĐąŃĐľĐĽ â€” Ń Đ±ĐľĐ»ŃŚŃĐ¸ĐĽ Đ·Đ°ĐżĐ°ŃĐľĐĽ.",
  ],
  th: [
    "ŕą€ŕ¸ˇŕ¸·ŕąŕ¸­ŕ¸–ŕ¸¶ŕ¸‡ Don Mueang ŕąŕ¸«ŕą‰ŕ¸•ŕ¸Łŕ¸§ŕ¸ŕ¸•ŕ¸±ŕą‹ŕ¸§ŕ¸ŕąŕ¸­ŕ¸™: Terminal 1 ŕ¸Şŕ¸łŕ¸«ŕ¸Łŕ¸±ŕ¸šŕą€ŕ¸—ŕ¸µŕąŕ¸˘ŕ¸§ŕ¸šŕ¸´ŕ¸™ŕ¸Łŕ¸°ŕ¸«ŕ¸§ŕąŕ¸˛ŕ¸‡ŕ¸›ŕ¸Łŕ¸°ŕą€ŕ¸—ŕ¸¨ ŕąŕ¸Ąŕ¸° Terminal 2 ŕ¸Şŕ¸łŕ¸«ŕ¸Łŕ¸±ŕ¸šŕą€ŕ¸—ŕ¸µŕąŕ¸˘ŕ¸§ŕ¸šŕ¸´ŕ¸™ŕ¸ ŕ¸˛ŕ¸˘ŕąŕ¸™ŕ¸›ŕ¸Łŕ¸°ŕą€ŕ¸—ŕ¸¨",
    "ŕą„ŕ¸›ŕ¸—ŕ¸µŕąŕ¸Šŕ¸±ŕą‰ŕ¸™ŕ¸śŕ¸ąŕą‰ŕą‚ŕ¸”ŕ¸˘ŕ¸Şŕ¸˛ŕ¸Łŕ¸‚ŕ¸˛ŕ¸­ŕ¸­ŕ¸ ŕąŕ¸Ąŕą‰ŕ¸§ŕ¸«ŕ¸˛ŕąŕ¸–ŕ¸§ŕą€ŕ¸Šŕą‡ŕ¸ŕ¸­ŕ¸´ŕ¸™ŕ¸‚ŕ¸­ŕ¸‡ŕ¸Şŕ¸˛ŕ¸˘ŕ¸ŕ¸˛ŕ¸Łŕ¸šŕ¸´ŕ¸™ŕ¸«ŕ¸Łŕ¸·ŕ¸­ŕą€ŕ¸„ŕ¸Łŕ¸·ŕąŕ¸­ŕ¸‡ŕą€ŕ¸Šŕą‡ŕ¸ŕ¸­ŕ¸´ŕ¸™ŕ¸­ŕ¸±ŕ¸•ŕą‚ŕ¸™ŕ¸ˇŕ¸±ŕ¸•ŕ¸´ ŕą€ŕ¸•ŕ¸Łŕ¸µŕ¸˘ŕ¸ˇŕ¸žŕ¸˛ŕ¸Şŕ¸›ŕ¸­ŕ¸ŁŕąŚŕ¸•ŕ¸«ŕ¸Łŕ¸·ŕ¸­ŕ¸šŕ¸±ŕ¸•ŕ¸Łŕ¸›ŕ¸Łŕ¸°ŕ¸Šŕ¸˛ŕ¸Šŕ¸™ ŕ¸•ŕ¸±ŕą‹ŕ¸§/ŕ¸ŕ¸˛ŕ¸Łŕ¸ŕ¸­ŕ¸‡ ŕąŕ¸Ąŕ¸°ŕ¸Şŕ¸±ŕ¸ˇŕ¸ ŕ¸˛ŕ¸Łŕ¸°",
    "ŕ¸«ŕ¸Ąŕ¸±ŕ¸‡ŕą€ŕ¸Šŕą‡ŕ¸ŕ¸­ŕ¸´ŕ¸™ŕąŕ¸Ąŕ¸°ŕą‚ŕ¸«ŕ¸Ąŕ¸”ŕ¸ŕ¸Łŕ¸°ŕą€ŕ¸›ŕą‹ŕ¸˛ ŕąŕ¸«ŕą‰ŕ¸śŕąŕ¸˛ŕ¸™ŕ¸ŕ¸¸ŕ¸”ŕ¸•ŕ¸Łŕ¸§ŕ¸ŕ¸„ŕ¸§ŕ¸˛ŕ¸ˇŕ¸›ŕ¸Ąŕ¸­ŕ¸”ŕ¸ ŕ¸±ŕ¸˘ ŕ¸–ŕą‰ŕ¸˛ŕą€ŕ¸›ŕą‡ŕ¸™ŕą€ŕ¸—ŕ¸µŕąŕ¸˘ŕ¸§ŕ¸šŕ¸´ŕ¸™ŕ¸Łŕ¸°ŕ¸«ŕ¸§ŕąŕ¸˛ŕ¸‡ŕ¸›ŕ¸Łŕ¸°ŕą€ŕ¸—ŕ¸¨ ŕąŕ¸«ŕą‰ŕ¸śŕąŕ¸˛ŕ¸™ ŕ¸•ŕ¸ˇ./immigration ŕ¸•ŕąŕ¸­ŕ¸«ŕ¸Ąŕ¸±ŕ¸‡ŕ¸ŕ¸˛ŕ¸ŕ¸™ŕ¸±ŕą‰ŕ¸™",
    "ŕ¸•ŕ¸Łŕ¸§ŕ¸ŕ¸›ŕ¸Łŕ¸°ŕ¸•ŕ¸ąŕ¸‚ŕ¸¶ŕą‰ŕ¸™ŕą€ŕ¸„ŕ¸Łŕ¸·ŕąŕ¸­ŕ¸‡ŕ¸ŕ¸˛ŕ¸ŕ¸ŕ¸­ŕ¸Şŕ¸™ŕ¸˛ŕ¸ˇŕ¸šŕ¸´ŕ¸™ŕąŕ¸Ąŕą‰ŕ¸§ŕą„ŕ¸›ŕ¸—ŕ¸µŕą gate ŕ¸Ąŕąŕ¸§ŕ¸‡ŕ¸«ŕ¸™ŕą‰ŕ¸˛ ŕ¸„ŕ¸§ŕ¸Łŕ¸–ŕ¸¶ŕ¸‡ DMK ŕ¸›ŕ¸Łŕ¸°ŕ¸ˇŕ¸˛ŕ¸“ 2 ŕ¸Šŕ¸±ŕąŕ¸§ŕą‚ŕ¸ˇŕ¸‡ŕ¸ŕąŕ¸­ŕ¸™ŕ¸šŕ¸´ŕ¸™ ŕąŕ¸Ąŕ¸°ŕą€ŕ¸śŕ¸·ŕąŕ¸­ŕ¸ˇŕ¸˛ŕ¸ŕ¸ŕ¸§ŕąŕ¸˛ŕ¸™ŕ¸±ŕą‰ŕ¸™ŕ¸–ŕą‰ŕ¸˛ŕ¸ˇŕ¸µŕ¸ŕ¸Łŕ¸°ŕą€ŕ¸›ŕą‹ŕ¸˛ŕ¸«ŕ¸Łŕ¸·ŕ¸­ŕ¸šŕ¸´ŕ¸™ŕ¸Łŕ¸°ŕ¸«ŕ¸§ŕąŕ¸˛ŕ¸‡ŕ¸›ŕ¸Łŕ¸°ŕą€ŕ¸—ŕ¸¨",
  ],
  zh: [
    "ĺ°čľľ Don Mueang ĺŽĺ…çś‹ćśşçĄ¨ďĽšTerminal 1 ä¸şĺ›˝é™…čŞçŹ­ďĽŚTerminal 2 ä¸şĺ›˝ĺ†…čŞçŹ­ă€‚",
    "ĺ‰Ťĺľ€ĺ‡şĺŹ‘ĺ±‚ďĽŚć‰ľĺ°čŞç©şĺ…¬ĺŹ¸çš„ĺ€ĽćśşćŽ’/ćźśĺŹ°ć–č‡ŞĺŠ©ĺ€Ľćśşćśşă€‚ĺ‡†ĺ¤‡ĺĄ˝ćŠ¤ç…§ć–čş«ä»˝čŻä»¶ă€ćśşçĄ¨/é˘„č®˘äżˇćŻĺ’ŚčˇŚćťŽă€‚",
    "ĺŠžç†ĺ€Ľćśşĺ’Ść‰čżčˇŚćťŽĺŽďĽŚĺ‰Ťĺľ€ĺ®‰ćŁ€ă€‚ĺ›˝é™…čŞçŹ­ĺ®‰ćŁ€ĺŽčżéś€č¦ç»§ç»­é€ščż‡ passport control/immigrationă€‚",
    "ĺś¨ćśşĺśşĺ±Źĺą•çˇ®č®¤ç™»ćśşĺŹŁďĽŚĺą¶ćŹĺ‰Ťĺ‰Ťĺľ€ gateă€‚ĺ»şč®®č‡łĺ°‘ćŹĺ‰Ťçş¦ 2 ĺ°Źć—¶ĺ°čľľ DMKďĽ›ĺ¦‚ćžśćś‰ć‰čżčˇŚćťŽć–ĺ›˝é™…čŞçŹ­ďĽŚčŻ·é˘„ç•™ć›´ĺ¤šć—¶é—´ă€‚",
  ],
};

const suvarnabhumiDepartureTips: Record<LocaleCode, string[]> = {
  en: [
    "After the bus reaches Suvarnabhumi, enter the terminal and follow signs to Departures / Level 4 for check-in.",
    "Check your flight on the airport screens, then find your airline check-in row or self-service kiosk. Keep passport, booking, boarding pass if already checked in, and baggage ready.",
    "After check-in and bag drop, follow signs to security screening. For international flights, continue to passport control/immigration after security.",
    "Suvarnabhumi is large, so check your gate early and start walking before boarding time. Aim to be at the airport about 3 hours before international flights and about 2 hours before domestic flights.",
  ],
  pl: [
    "Po dojechaniu autobusem na Suvarnabhumi wejdĹş do terminala i kieruj siÄ™ znakami Departures / Level 4, gdzie znajduje siÄ™ odprawa.",
    "SprawdĹş lot na ekranach lotniska, potem znajdĹş rzÄ…d odprawy swojej linii albo kiosk samoobsĹ‚ugowy. Przygotuj paszport, rezerwacjÄ™, kartÄ™ pokĹ‚adowÄ… jeĹ›li masz online check-in i bagaĹĽ.",
    "Po odprawie i nadaniu bagaĹĽu idĹş za znakami do kontroli bezpieczeĹ„stwa. Przy locie miÄ™dzynarodowym po security przejdĹş jeszcze passport control/immigration.",
    "Suvarnabhumi jest duĹĽe, wiÄ™c sprawdĹş gate wczeĹ›niej i zacznij iĹ›Ä‡ przed boardingiem. Celuj w przyjazd okoĹ‚o 3 godziny przed lotem miÄ™dzynarodowym i okoĹ‚o 2 godziny przed lotem krajowym.",
  ],
  de: [
    "Nach der Ankunft mit dem Bus in Suvarnabhumi gehst du in das Terminal und folgst den Schildern zu Departures / Level 4 fĂĽr den Check-in.",
    "PrĂĽfe deinen Flug auf den Flughafenbildschirmen und suche dann die Check-in-Reihe deiner Airline oder einen Self-Service-Kiosk. Halte Pass, Buchung, Boardingpass falls online eingecheckt, und GepĂ¤ck bereit.",
    "Nach Check-in und GepĂ¤ckabgabe folgst du den Schildern zur Sicherheitskontrolle. Bei internationalen FlĂĽgen gehst du danach weiter zur Passkontrolle/Immigration.",
    "Suvarnabhumi ist groĂź, deshalb prĂĽfe dein Gate frĂĽh und gehe vor dem Boarding los. Plane etwa 3 Stunden vor internationalen FlĂĽgen und etwa 2 Stunden vor InlandsflĂĽgen am Flughafen zu sein.",
  ],
  fr: [
    "AprĂ¨s l'arrivĂ©e du bus Ă  Suvarnabhumi, entrez dans le terminal et suivez les panneaux Departures / Level 4 pour l'enregistrement.",
    "VĂ©rifiez votre vol sur les Ă©crans de l'aĂ©roport, puis trouvez le rang d'enregistrement de votre compagnie ou une borne libre-service. PrĂ©parez passeport, rĂ©servation, carte d'embarquement si dĂ©jĂ  enregistrĂ©e, et bagages.",
    "AprĂ¨s l'enregistrement et le dĂ©pĂ´t des bagages, suivez les panneaux vers le contrĂ´le de sĂ©curitĂ©. Pour un vol international, continuez ensuite vers le contrĂ´le des passeports/immigration.",
    "Suvarnabhumi est grand : vĂ©rifiez votre porte tĂ´t et commencez Ă  marcher avant l'embarquement. Visez environ 3 heures avant un vol international et environ 2 heures avant un vol domestique.",
  ],
  ru: [
    "ĐźĐľŃĐ»Đµ ĐżŃ€Đ¸Đ±Ń‹Ń‚Đ¸ŃŹ Đ°Đ˛Ń‚ĐľĐ±ŃŃĐ° Đ˛ Suvarnabhumi Đ˛ĐľĐąĐ´Đ¸Ń‚Đµ Đ˛ Ń‚ĐµŃ€ĐĽĐ¸Đ˝Đ°Đ» Đ¸ ŃĐ»ĐµĐ´ŃĐąŃ‚Đµ ŃĐşĐ°Đ·Đ°Ń‚ĐµĐ»ŃŹĐĽ Departures / Level 4 Đş Ń€ĐµĐłĐ¸ŃŃ‚Ń€Đ°Ń†Đ¸Đ¸.",
    "ĐźŃ€ĐľĐ˛ĐµŃ€ŃŚŃ‚Đµ Ń€ĐµĐąŃ Đ˝Đ° Ń‚Đ°Đ±Đ»Đľ Đ°ŃŤŃ€ĐľĐżĐľŃ€Ń‚Đ°, Đ·Đ°Ń‚ĐµĐĽ Đ˝Đ°ĐąĐ´Đ¸Ń‚Đµ ŃŃ‚ĐľĐąĐşŃ Ń€ĐµĐłĐ¸ŃŃ‚Ń€Đ°Ń†Đ¸Đ¸ Đ˛Đ°ŃĐµĐą Đ°Đ˛Đ¸Đ°ĐşĐľĐĽĐżĐ°Đ˝Đ¸Đ¸ Đ¸Đ»Đ¸ ĐşĐ¸ĐľŃĐş ŃĐ°ĐĽĐľĐľĐ±ŃĐ»ŃĐ¶Đ¸Đ˛Đ°Đ˝Đ¸ŃŹ. ĐźĐľĐ´ĐłĐľŃ‚ĐľĐ˛ŃŚŃ‚Đµ ĐżĐ°ŃĐżĐľŃ€Ń‚, Đ±Ń€ĐľĐ˝ŃŚ, ĐżĐľŃĐ°Đ´ĐľŃ‡Đ˝Ń‹Đą Ń‚Đ°Đ»ĐľĐ˝ ĐµŃĐ»Đ¸ ŃĐ¶Đµ Đ·Đ°Ń€ĐµĐłĐ¸ŃŃ‚Ń€Đ¸Ń€ĐľĐ˛Đ°Đ»Đ¸ŃŃŚ ĐľĐ˝Đ»Đ°ĐąĐ˝, Đ¸ Đ±Đ°ĐłĐ°Đ¶.",
    "ĐźĐľŃĐ»Đµ Ń€ĐµĐłĐ¸ŃŃ‚Ń€Đ°Ń†Đ¸Đ¸ Đ¸ ŃĐ´Đ°Ń‡Đ¸ Đ±Đ°ĐłĐ°Đ¶Đ° ŃĐ»ĐµĐ´ŃĐąŃ‚Đµ ŃĐşĐ°Đ·Đ°Ń‚ĐµĐ»ŃŹĐĽ Đş ĐşĐľĐ˝Ń‚Ń€ĐľĐ»ŃŽ Đ±ĐµĐ·ĐľĐżĐ°ŃĐ˝ĐľŃŃ‚Đ¸. Đ”Đ»ŃŹ ĐĽĐµĐ¶Đ´ŃĐ˝Đ°Ń€ĐľĐ´Đ˝ĐľĐłĐľ Ń€ĐµĐąŃĐ° ĐżĐľŃĐ»Đµ security ĐżŃ€ĐľĐąĐ´Đ¸Ń‚Đµ passport control/immigration.",
    "Suvarnabhumi Đ±ĐľĐ»ŃŚŃĐľĐą, ĐżĐľŃŤŃ‚ĐľĐĽŃ ĐżŃ€ĐľĐ˛ĐµŃ€ŃŚŃ‚Đµ gate Đ·Đ°Ń€Đ°Đ˝ĐµĐµ Đ¸ Đ˝Đ°Ń‡Đ˝Đ¸Ń‚Đµ Đ¸Đ´Ń‚Đ¸ Đ´Đľ Đ˝Đ°Ń‡Đ°Đ»Đ° ĐżĐľŃĐ°Đ´ĐşĐ¸. Đ›ŃŃ‡ŃĐµ Đ±Ń‹Ń‚ŃŚ Đ˛ Đ°ŃŤŃ€ĐľĐżĐľŃ€Ń‚Ń ĐżŃ€Đ¸ĐĽĐµŃ€Đ˝Đľ Đ·Đ° 3 Ń‡Đ°ŃĐ° Đ´Đľ ĐĽĐµĐ¶Đ´ŃĐ˝Đ°Ń€ĐľĐ´Đ˝ĐľĐłĐľ Ń€ĐµĐąŃĐ° Đ¸ Đ·Đ° 2 Ń‡Đ°ŃĐ° Đ´Đľ Đ˛Đ˝ŃŃ‚Ń€ĐµĐ˝Đ˝ĐµĐłĐľ.",
  ],
  th: [
    "ŕą€ŕ¸ˇŕ¸·ŕąŕ¸­ŕ¸Łŕ¸–ŕ¸šŕ¸±ŕ¸Şŕ¸–ŕ¸¶ŕ¸‡ Suvarnabhumi ŕąŕ¸«ŕą‰ŕą€ŕ¸‚ŕą‰ŕ¸˛ŕ¸­ŕ¸˛ŕ¸„ŕ¸˛ŕ¸Łŕ¸śŕ¸ąŕą‰ŕą‚ŕ¸”ŕ¸˘ŕ¸Şŕ¸˛ŕ¸Ł ŕąŕ¸Ąŕą‰ŕ¸§ŕ¸•ŕ¸˛ŕ¸ˇŕ¸›ŕą‰ŕ¸˛ŕ¸˘ Departures / Level 4 ŕą€ŕ¸žŕ¸·ŕąŕ¸­ŕą„ŕ¸›ŕą€ŕ¸Šŕą‡ŕ¸ŕ¸­ŕ¸´ŕ¸™",
    "ŕ¸•ŕ¸Łŕ¸§ŕ¸ŕą€ŕ¸—ŕ¸µŕąŕ¸˘ŕ¸§ŕ¸šŕ¸´ŕ¸™ŕ¸šŕ¸™ŕ¸ŕ¸­ŕ¸Şŕ¸™ŕ¸˛ŕ¸ˇŕ¸šŕ¸´ŕ¸™ ŕ¸ŕ¸˛ŕ¸ŕ¸™ŕ¸±ŕą‰ŕ¸™ŕ¸«ŕ¸˛ŕąŕ¸–ŕ¸§ŕą€ŕ¸Šŕą‡ŕ¸ŕ¸­ŕ¸´ŕ¸™ŕ¸‚ŕ¸­ŕ¸‡ŕ¸Şŕ¸˛ŕ¸˘ŕ¸ŕ¸˛ŕ¸Łŕ¸šŕ¸´ŕ¸™ŕ¸«ŕ¸Łŕ¸·ŕ¸­ŕą€ŕ¸„ŕ¸Łŕ¸·ŕąŕ¸­ŕ¸‡ŕą€ŕ¸Šŕą‡ŕ¸ŕ¸­ŕ¸´ŕ¸™ŕ¸­ŕ¸±ŕ¸•ŕą‚ŕ¸™ŕ¸ˇŕ¸±ŕ¸•ŕ¸´ ŕą€ŕ¸•ŕ¸Łŕ¸µŕ¸˘ŕ¸ˇŕ¸žŕ¸˛ŕ¸Şŕ¸›ŕ¸­ŕ¸ŁŕąŚŕ¸• ŕ¸ŕ¸˛ŕ¸Łŕ¸ŕ¸­ŕ¸‡ boarding pass ŕ¸–ŕą‰ŕ¸˛ŕą€ŕ¸Šŕą‡ŕ¸ŕ¸­ŕ¸´ŕ¸™ŕ¸­ŕ¸­ŕ¸™ŕą„ŕ¸Ąŕ¸™ŕąŚŕąŕ¸Ąŕą‰ŕ¸§ ŕąŕ¸Ąŕ¸°ŕ¸Şŕ¸±ŕ¸ˇŕ¸ ŕ¸˛ŕ¸Łŕ¸°",
    "ŕ¸«ŕ¸Ąŕ¸±ŕ¸‡ŕą€ŕ¸Šŕą‡ŕ¸ŕ¸­ŕ¸´ŕ¸™ŕąŕ¸Ąŕ¸°ŕą‚ŕ¸«ŕ¸Ąŕ¸”ŕ¸ŕ¸Łŕ¸°ŕą€ŕ¸›ŕą‹ŕ¸˛ ŕąŕ¸«ŕą‰ŕ¸•ŕ¸˛ŕ¸ˇŕ¸›ŕą‰ŕ¸˛ŕ¸˘ŕą„ŕ¸›ŕ¸ŕ¸¸ŕ¸”ŕ¸•ŕ¸Łŕ¸§ŕ¸ŕ¸„ŕ¸§ŕ¸˛ŕ¸ˇŕ¸›ŕ¸Ąŕ¸­ŕ¸”ŕ¸ ŕ¸±ŕ¸˘ ŕ¸–ŕą‰ŕ¸˛ŕą€ŕ¸›ŕą‡ŕ¸™ŕą€ŕ¸—ŕ¸µŕąŕ¸˘ŕ¸§ŕ¸šŕ¸´ŕ¸™ŕ¸Łŕ¸°ŕ¸«ŕ¸§ŕąŕ¸˛ŕ¸‡ŕ¸›ŕ¸Łŕ¸°ŕą€ŕ¸—ŕ¸¨ ŕ¸«ŕ¸Ąŕ¸±ŕ¸‡ security ŕąŕ¸«ŕą‰ŕ¸śŕąŕ¸˛ŕ¸™ passport control/immigration ŕ¸•ŕąŕ¸­",
    "Suvarnabhumi ŕąŕ¸«ŕ¸Ťŕąŕ¸ˇŕ¸˛ŕ¸ ŕ¸„ŕ¸§ŕ¸Łŕ¸•ŕ¸Łŕ¸§ŕ¸ gate ŕ¸Ąŕąŕ¸§ŕ¸‡ŕ¸«ŕ¸™ŕą‰ŕ¸˛ŕąŕ¸Ąŕ¸°ŕą€ŕ¸Łŕ¸´ŕąŕ¸ˇŕą€ŕ¸”ŕ¸´ŕ¸™ŕ¸ŕąŕ¸­ŕ¸™ŕą€ŕ¸§ŕ¸Ąŕ¸˛ boarding ŕ¸„ŕ¸§ŕ¸Łŕ¸–ŕ¸¶ŕ¸‡ŕ¸Şŕ¸™ŕ¸˛ŕ¸ˇŕ¸šŕ¸´ŕ¸™ŕ¸›ŕ¸Łŕ¸°ŕ¸ˇŕ¸˛ŕ¸“ 3 ŕ¸Šŕ¸±ŕąŕ¸§ŕą‚ŕ¸ˇŕ¸‡ŕ¸ŕąŕ¸­ŕ¸™ŕą€ŕ¸—ŕ¸µŕąŕ¸˘ŕ¸§ŕ¸šŕ¸´ŕ¸™ŕ¸Łŕ¸°ŕ¸«ŕ¸§ŕąŕ¸˛ŕ¸‡ŕ¸›ŕ¸Łŕ¸°ŕą€ŕ¸—ŕ¸¨ ŕąŕ¸Ąŕ¸°ŕ¸›ŕ¸Łŕ¸°ŕ¸ˇŕ¸˛ŕ¸“ 2 ŕ¸Šŕ¸±ŕąŕ¸§ŕą‚ŕ¸ˇŕ¸‡ŕ¸ŕąŕ¸­ŕ¸™ŕą€ŕ¸—ŕ¸µŕąŕ¸˘ŕ¸§ŕ¸šŕ¸´ŕ¸™ŕ¸ ŕ¸˛ŕ¸˘ŕąŕ¸™ŕ¸›ŕ¸Łŕ¸°ŕą€ŕ¸—ŕ¸¨",
  ],
  zh: [
    "ĺ·´ĺŁ«ĺ°čľľ Suvarnabhumi ĺŽďĽŚčż›ĺ…ĄčŞç«™ćĄĽĺą¶č·źéšŹ Departures / Level 4 ć ‡čŻ†ĺ‰Ťĺľ€ĺ€ĽćśşĺŚşă€‚",
    "ĺ…ĺś¨ćśşĺśşĺ±Źĺą•çˇ®č®¤čŞçŹ­ďĽŚĺ†Ťć‰ľĺ°čŞç©şĺ…¬ĺŹ¸çš„ĺ€ĽćśşćŽ’/ćźśĺŹ°ć–č‡ŞĺŠ©ĺ€Ľćśşćśşă€‚ĺ‡†ĺ¤‡ĺĄ˝ćŠ¤ç…§ă€é˘„č®˘äżˇćŻă€ĺ¦‚ĺ·˛ç˝‘ä¸Šĺ€Ľćśşĺ™ĺ‡†ĺ¤‡ç™»ćśşç‰ŚďĽŚä»ĄĺŹŠčˇŚćťŽă€‚",
    "ĺŠžç†ĺ€Ľćśşĺ’Ść‰čżčˇŚćťŽĺŽďĽŚč·źéšŹć ‡čŻ†ĺ‰Ťĺľ€ĺ®‰ćŁ€ă€‚ĺ›˝é™…čŞçŹ­ĺś¨ security ĺŽčżéś€č¦ç»§ç»­é€ščż‡ passport control/immigrationă€‚",
    "Suvarnabhumi ĺľĺ¤§ďĽŚčŻ·ćŹĺ‰Ťçˇ®č®¤ gateďĽŚĺą¶ĺś¨ç™»ćśşĺ‰ŤĺĽ€ĺ§‹ć­ĄčˇŚĺ‰Ťĺľ€ă€‚ĺ»şč®®ĺ›˝é™…čŞçŹ­ćŹĺ‰Ťçş¦ 3 ĺ°Źć—¶ĺ°čľľćśşĺśşďĽŚĺ›˝ĺ†…čŞçŹ­ćŹĺ‰Ťçş¦ 2 ĺ°Źć—¶ĺ°čľľă€‚",
  ],
};

const suvarnabhumiArrivalBusTips: Record<LocaleCode, string[]> = {
  en: [
    "After landing, follow Arrivals, pass immigration if needed, collect baggage, and exit customs into the public arrivals hall.",
    "Go down to Level 1 / Ground Transportation and look for Gate 8. Airport Pattaya Bus / Roong Reuang Coach sells Pattaya tickets at the counter service near Gate 8.",
    "Show your passport or booking if you have one, buy or collect the ticket, and ask whether your bus goes to Jomtien Bus Station or North Pattaya. The operator notes that the late 22:00 bus goes to North Pattaya, not Jomtien.",
    "Do not book a tight connection after landing. Keep at least 1.5 hours from estimated landing to bus departure for immigration, baggage, walking through the airport, and finding the counter.",
  ],
  pl: [
    "Po lÄ…dowaniu kieruj siÄ™ za znakami Arrivals, przejdĹş kontrolÄ™ paszportowÄ… jeĹ›li dotyczy, odbierz bagaĹĽ i wyjdĹş przez customs do publicznej hali przylotĂłw.",
    "ZejdĹş na Level 1 / Ground Transportation i szukaj Gate 8. Airport Pattaya Bus / Roong Reuang Coach sprzedaje bilety do Pattaya przy stanowisku obsĹ‚ugi w pobliĹĽu Gate 8.",
    "PokaĹĽ paszport albo rezerwacjÄ™ jeĹ›li jÄ… masz, kup lub odbierz bilet i zapytaj, czy autobus jedzie do Jomtien Bus Station czy North Pattaya. Operator informuje, ĹĽe pĂłĹşny autobus o 22:00 jedzie do North Pattaya, nie do Jomtien.",
    "Nie planuj zbyt krĂłtkiej przesiadki po lÄ…dowaniu. Zostaw minimum 1,5 godziny od planowanego lÄ…dowania do odjazdu autobusu na immigration, bagaĹĽ, przejĹ›cie przez lotnisko i znalezienie stanowiska.",
  ],
  de: [
    "Nach der Landung folge Arrivals, gehe falls nĂ¶tig durch die Passkontrolle, hole dein GepĂ¤ck und gehe durch den Zoll in die Ă¶ffentliche Ankunftshalle.",
    "Gehe hinunter zu Level 1 / Ground Transportation und suche Gate 8. Airport Pattaya Bus / Roong Reuang Coach verkauft Pattaya-Tickets am Serviceschalter nahe Gate 8.",
    "Zeige Pass oder Buchung, falls vorhanden, kaufe oder hole dein Ticket ab und frage, ob der Bus zur Jomtien Bus Station oder nach North Pattaya fĂ¤hrt. Der Betreiber weist darauf hin, dass der spĂ¤te Bus um 22:00 nach North Pattaya fĂ¤hrt, nicht nach Jomtien.",
    "Plane nach der Landung keine knappe Verbindung. Lass mindestens 1,5 Stunden von der geplanten Landung bis zur Busabfahrt fĂĽr Immigration, GepĂ¤ck, Wege im Flughafen und den Schalter.",
  ],
  fr: [
    "AprĂ¨s l'atterrissage, suivez Arrivals, passez l'immigration si nĂ©cessaire, rĂ©cupĂ©rez vos bagages puis sortez par la douane vers le hall public des arrivĂ©es.",
    "Descendez au Level 1 / Ground Transportation et cherchez Gate 8. Airport Pattaya Bus / Roong Reuang Coach vend les billets pour Pattaya au comptoir prĂ¨s de Gate 8.",
    "Montrez votre passeport ou votre rĂ©servation si vous en avez une, achetez ou rĂ©cupĂ©rez le billet, puis demandez si le bus va Ă  Jomtien Bus Station ou Ă  North Pattaya. L'opĂ©rateur indique que le bus tardif de 22:00 va Ă  North Pattaya, pas Ă  Jomtien.",
    "Ne prĂ©voyez pas une correspondance trop courte aprĂ¨s l'atterrissage. Gardez au moins 1 h 30 entre l'atterrissage prĂ©vu et le dĂ©part du bus pour l'immigration, les bagages, la marche dans l'aĂ©roport et le comptoir.",
  ],
  ru: [
    "ĐźĐľŃĐ»Đµ ĐżĐľŃĐ°Đ´ĐşĐ¸ ŃĐ»ĐµĐ´ŃĐąŃ‚Đµ ŃĐşĐ°Đ·Đ°Ń‚ĐµĐ»ŃŹĐĽ Arrivals, ĐżŃ€Đ¸ Đ˝ĐµĐľĐ±Ń…ĐľĐ´Đ¸ĐĽĐľŃŃ‚Đ¸ ĐżŃ€ĐľĐąĐ´Đ¸Ń‚Đµ ĐżĐ°ŃĐżĐľŃ€Ń‚Đ˝Ń‹Đą ĐşĐľĐ˝Ń‚Ń€ĐľĐ»ŃŚ, ĐżĐľĐ»ŃŃ‡Đ¸Ń‚Đµ Đ±Đ°ĐłĐ°Đ¶ Đ¸ Đ˛Ń‹ĐąĐ´Đ¸Ń‚Đµ Ń‡ĐµŃ€ĐµĐ· Ń‚Đ°ĐĽĐľĐ¶Đ˝ŃŽ Đ˛ ĐľĐ±Ń‰ŃŃŽ Đ·ĐľĐ˝Ń ĐżŃ€Đ¸Đ»Ń‘Ń‚Đ°.",
    "ĐˇĐżŃŃŃ‚Đ¸Ń‚ĐµŃŃŚ Đ˝Đ° Level 1 / Ground Transportation Đ¸ Đ¸Ń‰Đ¸Ń‚Đµ Gate 8. Airport Pattaya Bus / Roong Reuang Coach ĐżŃ€ĐľĐ´Đ°Ń‘Ń‚ Đ±Đ¸Đ»ĐµŃ‚Ń‹ Đ˛ ĐźĐ°Ń‚Ń‚Đ°ĐąŃŽ Ń ŃŃ‚ĐľĐąĐşĐ¸ Ń€ŃŹĐ´ĐľĐĽ Ń Gate 8.",
    "ĐźĐľĐşĐ°Đ¶Đ¸Ń‚Đµ ĐżĐ°ŃĐżĐľŃ€Ń‚ Đ¸Đ»Đ¸ Đ±Ń€ĐľĐ˝ŃŚ, ĐµŃĐ»Đ¸ ĐľĐ˝Đ° ĐµŃŃ‚ŃŚ, ĐşŃĐżĐ¸Ń‚Đµ Đ¸Đ»Đ¸ ĐżĐľĐ»ŃŃ‡Đ¸Ń‚Đµ Đ±Đ¸Đ»ĐµŃ‚ Đ¸ ŃŃ‚ĐľŃ‡Đ˝Đ¸Ń‚Đµ, Đ¸Đ´Ń‘Ń‚ Đ»Đ¸ Đ°Đ˛Ń‚ĐľĐ±ŃŃ Đ´Đľ Jomtien Bus Station Đ¸Đ»Đ¸ North Pattaya. ĐžĐżĐµŃ€Đ°Ń‚ĐľŃ€ ŃĐşĐ°Đ·Ń‹Đ˛Đ°ĐµŃ‚, Ń‡Ń‚Đľ ĐżĐľĐ·Đ´Đ˝Đ¸Đą Đ°Đ˛Ń‚ĐľĐ±ŃŃ Đ˛ 22:00 Đ¸Đ´Ń‘Ń‚ Đ˛ North Pattaya, Đ˝Đµ Đ˛ Jomtien.",
    "ĐťĐµ ĐżĐ»Đ°Đ˝Đ¸Ń€ŃĐąŃ‚Đµ ŃĐ»Đ¸ŃĐşĐľĐĽ ĐşĐľŃ€ĐľŃ‚ĐşŃŃŽ ĐżĐµŃ€ĐµŃĐ°Đ´ĐşŃ ĐżĐľŃĐ»Đµ ĐżŃ€Đ¸Đ»Ń‘Ń‚Đ°. ĐžŃŃ‚Đ°Đ˛ŃŚŃ‚Đµ ĐĽĐ¸Đ˝Đ¸ĐĽŃĐĽ 1,5 Ń‡Đ°ŃĐ° ĐľŃ‚ ĐżĐ»Đ°Đ˝ĐľĐ˛ĐľĐą ĐżĐľŃĐ°Đ´ĐşĐ¸ Đ´Đľ ĐľŃ‚ĐżŃ€Đ°Đ˛Đ»ĐµĐ˝Đ¸ŃŹ Đ°Đ˛Ń‚ĐľĐ±ŃŃĐ° Đ˝Đ° immigration, Đ±Đ°ĐłĐ°Đ¶, ĐżŃŃ‚ŃŚ ĐżĐľ Đ°ŃŤŃ€ĐľĐżĐľŃ€Ń‚Ń Đ¸ ĐżĐľĐ¸ŃĐş ŃŃ‚ĐľĐąĐşĐ¸.",
  ],
  th: [
    "ŕ¸«ŕ¸Ąŕ¸±ŕ¸‡ŕą€ŕ¸„ŕ¸Łŕ¸·ŕąŕ¸­ŕ¸‡ŕ¸Ąŕ¸‡ ŕąŕ¸«ŕą‰ŕ¸•ŕ¸˛ŕ¸ˇŕ¸›ŕą‰ŕ¸˛ŕ¸˘ Arrivals ŕ¸śŕąŕ¸˛ŕ¸™ ŕ¸•ŕ¸ˇ. ŕ¸«ŕ¸˛ŕ¸ŕ¸ŕ¸łŕą€ŕ¸›ŕą‡ŕ¸™ ŕ¸Łŕ¸±ŕ¸šŕ¸ŕ¸Łŕ¸°ŕą€ŕ¸›ŕą‹ŕ¸˛ ŕąŕ¸Ąŕą‰ŕ¸§ŕ¸­ŕ¸­ŕ¸ŕ¸śŕąŕ¸˛ŕ¸™ŕ¸¨ŕ¸¸ŕ¸Ąŕ¸ŕ¸˛ŕ¸ŕ¸Łŕą„ŕ¸›ŕ¸˘ŕ¸±ŕ¸‡ŕą‚ŕ¸–ŕ¸‡ŕ¸śŕ¸ąŕą‰ŕą‚ŕ¸”ŕ¸˘ŕ¸Şŕ¸˛ŕ¸Łŕ¸‚ŕ¸˛ŕą€ŕ¸‚ŕą‰ŕ¸˛ŕ¸ťŕ¸±ŕąŕ¸‡ŕ¸Şŕ¸˛ŕ¸ŕ¸˛ŕ¸Łŕ¸“ŕ¸°",
    "ŕ¸Ąŕ¸‡ŕą„ŕ¸› Level 1 / Ground Transportation ŕąŕ¸Ąŕą‰ŕ¸§ŕ¸«ŕ¸˛ Gate 8 ŕą€ŕ¸„ŕ¸˛ŕ¸™ŕąŚŕą€ŕ¸•ŕ¸­ŕ¸ŁŕąŚ Airport Pattaya Bus / Roong Reuang Coach ŕ¸‚ŕ¸˛ŕ¸˘ŕ¸•ŕ¸±ŕą‹ŕ¸§ŕą„ŕ¸›ŕ¸žŕ¸±ŕ¸—ŕ¸˘ŕ¸˛ŕ¸­ŕ¸˘ŕ¸ąŕąŕąŕ¸ŕ¸Ąŕą‰ Gate 8",
    "ŕąŕ¸Şŕ¸”ŕ¸‡ŕ¸žŕ¸˛ŕ¸Şŕ¸›ŕ¸­ŕ¸ŁŕąŚŕ¸•ŕ¸«ŕ¸Łŕ¸·ŕ¸­ŕ¸ŕ¸˛ŕ¸Łŕ¸ŕ¸­ŕ¸‡ŕ¸–ŕą‰ŕ¸˛ŕ¸ˇŕ¸µ ŕ¸‹ŕ¸·ŕą‰ŕ¸­ŕ¸•ŕ¸±ŕą‹ŕ¸§ŕ¸«ŕ¸Łŕ¸·ŕ¸­ŕ¸Łŕ¸±ŕ¸šŕ¸•ŕ¸±ŕą‹ŕ¸§ ŕąŕ¸Ąŕą‰ŕ¸§ŕ¸–ŕ¸˛ŕ¸ˇŕ¸§ŕąŕ¸˛ŕ¸Łŕ¸–ŕą„ŕ¸› Jomtien Bus Station ŕ¸«ŕ¸Łŕ¸·ŕ¸­ North Pattaya ŕ¸śŕ¸ąŕą‰ŕąŕ¸«ŕą‰ŕ¸šŕ¸Łŕ¸´ŕ¸ŕ¸˛ŕ¸Łŕ¸Łŕ¸°ŕ¸šŕ¸¸ŕ¸§ŕąŕ¸˛ŕ¸Łŕ¸–ŕą€ŕ¸—ŕ¸µŕąŕ¸˘ŕ¸§ŕ¸”ŕ¸¶ŕ¸ 22:00 ŕą„ŕ¸› North Pattaya ŕą„ŕ¸ˇŕąŕą„ŕ¸› Jomtien",
    "ŕ¸­ŕ¸˘ŕąŕ¸˛ŕ¸§ŕ¸˛ŕ¸‡ŕąŕ¸śŕ¸™ŕ¸•ŕąŕ¸­ŕ¸Łŕ¸–ŕąŕ¸™ŕąŕ¸™ŕą€ŕ¸ŕ¸´ŕ¸™ŕą„ŕ¸›ŕ¸«ŕ¸Ąŕ¸±ŕ¸‡ŕ¸Ąŕ¸‡ŕą€ŕ¸„ŕ¸Łŕ¸·ŕąŕ¸­ŕ¸‡ ŕ¸„ŕ¸§ŕ¸Łŕą€ŕ¸śŕ¸·ŕąŕ¸­ŕ¸­ŕ¸˘ŕąŕ¸˛ŕ¸‡ŕ¸™ŕą‰ŕ¸­ŕ¸˘ 1.5 ŕ¸Šŕ¸±ŕąŕ¸§ŕą‚ŕ¸ˇŕ¸‡ŕ¸ŕ¸˛ŕ¸ŕą€ŕ¸§ŕ¸Ąŕ¸˛ŕ¸Ąŕ¸‡ŕą€ŕ¸„ŕ¸Łŕ¸·ŕąŕ¸­ŕ¸‡ŕ¸–ŕ¸¶ŕ¸‡ŕą€ŕ¸§ŕ¸Ąŕ¸˛ŕ¸­ŕ¸­ŕ¸ŕ¸‚ŕ¸­ŕ¸‡ŕ¸Łŕ¸– ŕ¸Şŕ¸łŕ¸«ŕ¸Łŕ¸±ŕ¸š ŕ¸•ŕ¸ˇ. ŕ¸Łŕ¸±ŕ¸šŕ¸ŕ¸Łŕ¸°ŕą€ŕ¸›ŕą‹ŕ¸˛ ŕą€ŕ¸”ŕ¸´ŕ¸™ŕąŕ¸™ŕ¸Şŕ¸™ŕ¸˛ŕ¸ˇŕ¸šŕ¸´ŕ¸™ ŕąŕ¸Ąŕ¸°ŕ¸«ŕ¸˛ŕą€ŕ¸„ŕ¸˛ŕ¸™ŕąŚŕą€ŕ¸•ŕ¸­ŕ¸ŁŕąŚ",
  ],
  zh: [
    "č˝ĺś°ĺŽč·źéšŹ Arrivals ć ‡čŻ†ďĽ›ĺ¦‚éś€ĺ…Ąĺ˘ďĽŚĺ…é€ščż‡čľąćŁ€ďĽŚĺ†Ťé˘†ĺŹ–čˇŚćťŽďĽŚĺą¶é€ščż‡ćµ·ĺ…łčż›ĺ…Ąĺ…¬ĺ…±ĺ°čľľĺ¤§ĺŽ…ă€‚",
    "ĺ‰Ťĺľ€ Level 1 / Ground TransportationďĽŚĺŻ»ć‰ľ Gate 8ă€‚Airport Pattaya Bus / Roong Reuang Coach ĺ‰Ťĺľ€čŠ­ćŹé›…çš„ĺ”®çĄ¨ćźśĺŹ°ĺś¨ Gate 8 é™„čż‘ă€‚",
    "ĺ‡şç¤şćŠ¤ç…§ć–é˘„č®˘äżˇćŻďĽĺ¦‚ćś‰ďĽ‰ďĽŚč´­äą°ć–é˘†ĺŹ–č˝¦çĄ¨ďĽŚĺą¶çˇ®č®¤ĺ·´ĺŁ«ćŻĺŽ» Jomtien Bus Station čżćŻ North Pattayaă€‚čżčĄĺ•†ćŹç¤şďĽŚć™šé—´ 22:00 çŹ­ć¬ˇĺŽ» North PattayaďĽŚä¸ŤĺŽ» Jomtienă€‚",
    "ä¸Ťč¦ĺ®‰ćŽ’ĺ¤Şç´§çš„č˝ĺś°čˇ”ćŽĄă€‚ĺ»şč®®ä»Žé˘„č®ˇč˝ĺś°ĺ°ĺ·´ĺŁ«ĺŹ‘č˝¦č‡łĺ°‘é˘„ç•™ 1.5 ĺ°Źć—¶ďĽŚç”¨äşŽĺ…Ąĺ˘ă€ĺŹ–čˇŚćťŽă€ĺś¨ćśşĺśşć­ĄčˇŚĺ’Ść‰ľĺ°ćźśĺŹ°ă€‚",
  ],
};

const northPattayaDepartureTips: Record<LocaleCode, string[]> = {
  en: [
    "From your hotel, open North Pattaya Bus Terminal in Google Maps first and check whether you are in Central Pattaya, Beach Road, Jomtien, Pratumnak, Naklua, or near Terminal 21.",
    "With light luggage, songthaew/baht bus is cheapest: about 15 THB within the same city zone and about 20 THB when crossing from Jomtien or Naklua; allow about 20-45 minutes because you may need to change routes or walk from the main road.",
    "With suitcases, rain, heat, or a tight bus departure, use Grab/Bolt: commonly about 80-150 THB from Central Pattaya or Terminal 21, 100-180 THB from Beach Road/Pratumnak, and 150-250 THB from Jomtien or far Naklua, depending on traffic and demand.",
    "A private taxi or chartered songthaew should be agreed before boarding; expect roughly 120-250 THB from central areas and 200-350 THB from Jomtien or far Naklua. Leave 45-60 minutes before your bus from central Pattaya, and 60-90 minutes before from Jomtien, Pratumnak, or Naklua.",
  ],
  pl: [
    "Z hotelu najpierw otwĂłrz North Pattaya Bus Terminal w Google Maps i sprawdĹş, czy jesteĹ› w Central Pattaya, Beach Road, Jomtien, Pratumnak, Naklua albo blisko Terminal 21.",
    "Z lekkim bagaĹĽem najtaĹ„szy jest songthaew/baht bus: okoĹ‚o 15 THB w tej samej strefie miasta i okoĹ‚o 20 THB przy przejeĹşdzie z Jomtien lub Naklua; licz okoĹ‚o 20-45 minut, bo moĹĽesz musieÄ‡ zmieniÄ‡ trasÄ™ albo dojĹ›Ä‡ z gĹ‚Ăłwnej drogi.",
    "Z walizkami, w deszczu, upale albo przy bliskim odjeĹşdzie autobusu wybierz Grab/Bolt: zwykle okoĹ‚o 80-150 THB z Central Pattaya lub Terminal 21, 100-180 THB z Beach Road/Pratumnak i 150-250 THB z Jomtien albo dalszej Naklua, zaleĹĽnie od ruchu i popytu.",
    "PrywatnÄ… taksĂłwkÄ™ lub wynajÄ™ty songthaew ustal przed wejĹ›ciem; licz okoĹ‚o 120-250 THB z centralnych dzielnic i 200-350 THB z Jomtien albo dalszej Naklua. WyjedĹş 45-60 minut przed autobusem z centrum Pattayi i 60-90 minut wczeĹ›niej z Jomtien, Pratumnak albo Naklua.",
  ],
  de: [
    "Ă–ffne vom Hotel zuerst North Pattaya Bus Terminal in Google Maps und prĂĽfe, ob du in Central Pattaya, Beach Road, Jomtien, Pratumnak, Naklua oder nahe Terminal 21 bist.",
    "Mit leichtem GepĂ¤ck ist Songthaew/Baht Bus am gĂĽnstigsten: etwa 15 THB innerhalb derselben Stadtzone und etwa 20 THB aus Jomtien oder Naklua; plane etwa 20-45 Minuten, weil du eventuell umsteigen oder von der HauptstraĂźe laufen musst.",
    "Mit Koffern, Regen, Hitze oder knapper Busabfahrt nutze Grab/Bolt: hĂ¤ufig etwa 80-150 THB aus Central Pattaya oder Terminal 21, 100-180 THB von Beach Road/Pratumnak und 150-250 THB aus Jomtien oder weiterem Naklua, je nach Verkehr und Nachfrage.",
    "Ein privates Taxi oder gechartertes Songthaew immer vor dem Einsteigen vereinbaren; rechne grob mit 120-250 THB aus zentralen Bereichen und 200-350 THB aus Jomtien oder weiterem Naklua. Fahre 45-60 Minuten vor deinem Bus aus Central Pattaya los, und 60-90 Minuten vorher aus Jomtien, Pratumnak oder Naklua.",
  ],
  fr: [
    "Depuis votre hĂ´tel, ouvrez d'abord North Pattaya Bus Terminal dans Google Maps et vĂ©rifiez si vous ĂŞtes Ă  Central Pattaya, Beach Road, Jomtien, Pratumnak, Naklua ou prĂ¨s de Terminal 21.",
    "Avec peu de bagages, le songthaew/baht bus est le moins cher : environ 15 THB dans la mĂŞme zone urbaine et environ 20 THB depuis Jomtien ou Naklua ; prĂ©voyez environ 20-45 minutes car il peut falloir changer de route ou marcher depuis la route principale.",
    "Avec des valises, sous la pluie, par forte chaleur ou si le dĂ©part du bus est proche, utilisez Grab/Bolt : souvent environ 80-150 THB depuis Central Pattaya ou Terminal 21, 100-180 THB depuis Beach Road/Pratumnak et 150-250 THB depuis Jomtien ou le nord de Naklua selon le trafic et la demande.",
    "Pour un taxi privĂ© ou un songthaew affrĂ©tĂ©, convenez du prix avant de monter ; comptez environ 120-250 THB depuis les zones centrales et 200-350 THB depuis Jomtien ou le nord de Naklua. Partez 45-60 minutes avant le bus depuis le centre de Pattaya, et 60-90 minutes avant depuis Jomtien, Pratumnak ou Naklua.",
  ],
  ru: [
    "ĐĐ· ĐľŃ‚ĐµĐ»ŃŹ ŃĐ˝Đ°Ń‡Đ°Đ»Đ° ĐľŃ‚ĐşŃ€ĐľĐąŃ‚Đµ North Pattaya Bus Terminal Đ˛ Google Maps Đ¸ ĐżŃ€ĐľĐ˛ĐµŃ€ŃŚŃ‚Đµ, ĐłĐ´Đµ Đ˛Ń‹ Đ˝Đ°Ń…ĐľĐ´Đ¸Ń‚ĐµŃŃŚ: Central Pattaya, Beach Road, Jomtien, Pratumnak, Naklua Đ¸Đ»Đ¸ Ń€ŃŹĐ´ĐľĐĽ Ń Terminal 21.",
    "Đˇ Đ»Ń‘ĐłĐşĐ¸ĐĽ Đ±Đ°ĐłĐ°Đ¶ĐľĐĽ Đ´ĐµŃĐµĐ˛Đ»Đµ Đ˛ŃĐµĐłĐľ ŃĐľĐ˝ĐłŃ‚ĐµĐľ/baht bus: ĐľĐşĐľĐ»Đľ 15 THB Đ˛ ĐżŃ€ĐµĐ´ĐµĐ»Đ°Ń… ĐľĐ´Đ˝ĐľĐą ĐłĐľŃ€ĐľĐ´ŃĐşĐľĐą Đ·ĐľĐ˝Ń‹ Đ¸ ĐľĐşĐľĐ»Đľ 20 THB Đ¸Đ· Jomtien Đ¸Đ»Đ¸ Naklua; Đ·Đ°ĐşĐ»Đ°Đ´Ń‹Đ˛Đ°ĐąŃ‚Đµ 20-45 ĐĽĐ¸Đ˝ŃŃ‚, ĐżĐľŃ‚ĐľĐĽŃ Ń‡Ń‚Đľ ĐĽĐľĐ¶ĐµŃ‚ ĐżĐľĐ˝Đ°Đ´ĐľĐ±Đ¸Ń‚ŃŚŃŃŹ ĐżĐµŃ€ĐµŃĐ°Đ´ĐşĐ° Đ¸Đ»Đ¸ ĐżĐµŃĐ¸Đą ĐżŃ€ĐľŃ…ĐľĐ´ ĐľŃ‚ ĐłĐ»Đ°Đ˛Đ˝ĐľĐą Đ´ĐľŃ€ĐľĐłĐ¸.",
    "Đˇ Ń‡ĐµĐĽĐľĐ´Đ°Đ˝Đ°ĐĽĐ¸, Đ˛ Đ´ĐľĐ¶Đ´ŃŚ, Đ¶Đ°Ń€Ń Đ¸Đ»Đ¸ ĐµŃĐ»Đ¸ Đ°Đ˛Ń‚ĐľĐ±ŃŃ ŃĐşĐľŃ€Đľ ĐľŃ‚ĐżŃ€Đ°Đ˛Đ»ŃŹĐµŃ‚ŃŃŹ, Đ¸ŃĐżĐľĐ»ŃŚĐ·ŃĐąŃ‚Đµ Grab/Bolt: ĐľĐ±Ń‹Ń‡Đ˝Đľ ĐľĐşĐľĐ»Đľ 80-150 THB Đ¸Đ· Central Pattaya Đ¸Đ»Đ¸ Terminal 21, 100-180 THB Ń Beach Road/Pratumnak Đ¸ 150-250 THB Đ¸Đ· Jomtien Đ¸Đ»Đ¸ Đ´Đ°Đ»ŃŚĐ˝ĐµĐą Naklua, Đ˛ Đ·Đ°Đ˛Đ¸ŃĐ¸ĐĽĐľŃŃ‚Đ¸ ĐľŃ‚ Ń‚Ń€Đ°Ń„Đ¸ĐşĐ° Đ¸ ŃĐżŃ€ĐľŃĐ°.",
    "Đ§Đ°ŃŃ‚Đ˝ĐľĐµ Ń‚Đ°ĐşŃĐ¸ Đ¸Đ»Đ¸ Đ·Đ°ĐşĐ°Đ·Đ°Đ˝Đ˝ĐľĐµ ŃĐľĐ˝ĐłŃ‚ĐµĐľ ŃĐľĐłĐ»Đ°ŃŃĐąŃ‚Đµ Đ´Đľ ĐżĐľŃĐ°Đ´ĐşĐ¸; ĐľŃ€Đ¸ĐµĐ˝Ń‚Đ¸Ń€ â€” 120-250 THB Đ¸Đ· Ń†ĐµĐ˝Ń‚Ń€Đ°Đ»ŃŚĐ˝Ń‹Ń… Ń€Đ°ĐąĐľĐ˝ĐľĐ˛ Đ¸ 200-350 THB Đ¸Đ· Jomtien Đ¸Đ»Đ¸ Đ´Đ°Đ»ŃŚĐ˝ĐµĐą Naklua. Đ’Ń‹ĐµĐ·Đ¶Đ°ĐąŃ‚Đµ Đ·Đ° 45-60 ĐĽĐ¸Đ˝ŃŃ‚ Đ´Đľ Đ°Đ˛Ń‚ĐľĐ±ŃŃĐ° Đ¸Đ· Ń†ĐµĐ˝Ń‚Ń€Đ° Pattaya Đ¸ Đ·Đ° 60-90 ĐĽĐ¸Đ˝ŃŃ‚ Đ¸Đ· Jomtien, Pratumnak Đ¸Đ»Đ¸ Naklua.",
  ],
  th: [
    "ŕ¸ŕ¸˛ŕ¸ŕą‚ŕ¸Łŕ¸‡ŕąŕ¸Łŕ¸ˇ ŕąŕ¸«ŕą‰ŕą€ŕ¸›ŕ¸´ŕ¸” North Pattaya Bus Terminal ŕąŕ¸™ Google Maps ŕ¸ŕąŕ¸­ŕ¸™ ŕąŕ¸Ąŕą‰ŕ¸§ŕ¸”ŕ¸ąŕ¸§ŕąŕ¸˛ŕ¸„ŕ¸¸ŕ¸“ŕ¸­ŕ¸˘ŕ¸ąŕąŕąŕ¸™ Central Pattaya, Beach Road, Jomtien, Pratumnak, Naklua ŕ¸«ŕ¸Łŕ¸·ŕ¸­ŕąŕ¸ŕ¸Ąŕą‰ Terminal 21",
    "ŕ¸–ŕą‰ŕ¸˛ŕ¸ˇŕ¸µŕ¸ŕ¸Łŕ¸°ŕą€ŕ¸›ŕą‹ŕ¸˛ŕą„ŕ¸ˇŕąŕ¸ˇŕ¸˛ŕ¸ ŕ¸Şŕ¸­ŕ¸‡ŕąŕ¸–ŕ¸§/baht bus ŕ¸–ŕ¸ąŕ¸ŕ¸—ŕ¸µŕąŕ¸Şŕ¸¸ŕ¸”: ŕ¸›ŕ¸Łŕ¸°ŕ¸ˇŕ¸˛ŕ¸“ 15 THB ŕąŕ¸™ŕą‚ŕ¸‹ŕ¸™ŕą€ŕ¸ˇŕ¸·ŕ¸­ŕ¸‡ŕą€ŕ¸”ŕ¸µŕ¸˘ŕ¸§ŕ¸ŕ¸±ŕ¸™ ŕąŕ¸Ąŕ¸°ŕ¸›ŕ¸Łŕ¸°ŕ¸ˇŕ¸˛ŕ¸“ 20 THB ŕ¸ŕ¸˛ŕ¸ Jomtien ŕ¸«ŕ¸Łŕ¸·ŕ¸­ Naklua ŕ¸„ŕ¸§ŕ¸Łŕą€ŕ¸śŕ¸·ŕąŕ¸­ŕą€ŕ¸§ŕ¸Ąŕ¸˛ 20-45 ŕ¸™ŕ¸˛ŕ¸—ŕ¸µ ŕą€ŕ¸žŕ¸Łŕ¸˛ŕ¸°ŕ¸­ŕ¸˛ŕ¸ŕ¸•ŕą‰ŕ¸­ŕ¸‡ŕą€ŕ¸›ŕ¸Ąŕ¸µŕąŕ¸˘ŕ¸™ŕą€ŕ¸Şŕą‰ŕ¸™ŕ¸—ŕ¸˛ŕ¸‡ŕ¸«ŕ¸Łŕ¸·ŕ¸­ŕą€ŕ¸”ŕ¸´ŕ¸™ŕ¸ŕ¸˛ŕ¸ŕ¸–ŕ¸™ŕ¸™ŕ¸«ŕ¸Ąŕ¸±ŕ¸",
    "ŕ¸–ŕą‰ŕ¸˛ŕ¸ˇŕ¸µŕ¸ŕ¸Łŕ¸°ŕą€ŕ¸›ŕą‹ŕ¸˛ ŕ¸ťŕ¸™ŕ¸•ŕ¸ ŕ¸­ŕ¸˛ŕ¸ŕ¸˛ŕ¸¨ŕ¸Łŕą‰ŕ¸­ŕ¸™ ŕ¸«ŕ¸Łŕ¸·ŕ¸­ŕąŕ¸ŕ¸Ąŕą‰ŕą€ŕ¸§ŕ¸Ąŕ¸˛ŕ¸­ŕ¸­ŕ¸ŕ¸‚ŕ¸­ŕ¸‡ŕ¸Łŕ¸–ŕ¸šŕ¸±ŕ¸Ş ŕąŕ¸«ŕą‰ŕąŕ¸Šŕą‰ Grab/Bolt: ŕą‚ŕ¸”ŕ¸˘ŕ¸—ŕ¸±ŕąŕ¸§ŕą„ŕ¸›ŕ¸›ŕ¸Łŕ¸°ŕ¸ˇŕ¸˛ŕ¸“ 80-150 THB ŕ¸ŕ¸˛ŕ¸ Central Pattaya ŕ¸«ŕ¸Łŕ¸·ŕ¸­ Terminal 21, 100-180 THB ŕ¸ŕ¸˛ŕ¸ Beach Road/Pratumnak ŕąŕ¸Ąŕ¸° 150-250 THB ŕ¸ŕ¸˛ŕ¸ Jomtien ŕ¸«ŕ¸Łŕ¸·ŕ¸­ŕą„ŕ¸ŕ¸Ąŕąŕ¸™ Naklua",
    "ŕ¸–ŕą‰ŕ¸˛ŕąŕ¸Šŕą‰ŕąŕ¸—ŕą‡ŕ¸ŕ¸‹ŕ¸µŕąŕ¸Şŕąŕ¸§ŕ¸™ŕ¸•ŕ¸±ŕ¸§ŕ¸«ŕ¸Łŕ¸·ŕ¸­ŕą€ŕ¸«ŕ¸ˇŕ¸˛ŕ¸Şŕ¸­ŕ¸‡ŕąŕ¸–ŕ¸§ ŕąŕ¸«ŕą‰ŕ¸•ŕ¸ŕ¸Ąŕ¸‡ŕ¸Łŕ¸˛ŕ¸„ŕ¸˛ŕ¸ŕąŕ¸­ŕ¸™ŕ¸‚ŕ¸¶ŕą‰ŕ¸™ŕ¸Łŕ¸– ŕą‚ŕ¸”ŕ¸˘ŕ¸›ŕ¸Łŕ¸°ŕ¸ˇŕ¸˛ŕ¸“ 120-250 THB ŕ¸ŕ¸˛ŕ¸ŕ¸˘ŕąŕ¸˛ŕ¸™ŕ¸ŕ¸Ąŕ¸˛ŕ¸‡ŕą€ŕ¸ˇŕ¸·ŕ¸­ŕ¸‡ ŕąŕ¸Ąŕ¸° 200-350 THB ŕ¸ŕ¸˛ŕ¸ Jomtien ŕ¸«ŕ¸Łŕ¸·ŕ¸­ŕą„ŕ¸ŕ¸Ąŕąŕ¸™ Naklua ŕ¸„ŕ¸§ŕ¸Łŕ¸­ŕ¸­ŕ¸ŕ¸ŕąŕ¸­ŕ¸™ŕą€ŕ¸§ŕ¸Ąŕ¸˛ŕ¸Łŕ¸–ŕ¸šŕ¸±ŕ¸Ş 45-60 ŕ¸™ŕ¸˛ŕ¸—ŕ¸µŕ¸ŕ¸˛ŕ¸ŕ¸ŕ¸Ąŕ¸˛ŕ¸‡ŕ¸žŕ¸±ŕ¸—ŕ¸˘ŕ¸˛ ŕąŕ¸Ąŕ¸° 60-90 ŕ¸™ŕ¸˛ŕ¸—ŕ¸µŕ¸ŕ¸˛ŕ¸ Jomtien, Pratumnak ŕ¸«ŕ¸Łŕ¸·ŕ¸­ Naklua",
  ],
  zh: [
    "ä»Žé…’ĺş—ĺ‡şĺŹ‘ć—¶ďĽŚĺ…ĺś¨ Google Maps ć‰“ĺĽ€ North Pattaya Bus TerminalďĽŚçˇ®č®¤č‡Şĺ·±ä˝ŤäşŽ Central Pattayaă€Beach Roadă€Jomtienă€Pratumnakă€Naklua čżćŻ Terminal 21 é™„čż‘ă€‚",
    "čˇŚćťŽĺ°‘ć—¶ďĽŚsongthaew/baht bus ćś€äľżĺ®śďĽšĺŚä¸€ĺźŽĺ¸‚ĺŚşĺźźĺ†…çş¦ 15 THBďĽŚä»Ž Jomtien ć– Naklua č·¨ĺŚşçş¦ 20 THBďĽ›čŻ·é˘„ç•™çş¦ 20-45 ĺ†é’źďĽŚĺ› ä¸şĺŹŻč˝éś€č¦ćŤ˘č˝¦ć–ä»Žä¸»č·Żć­ĄčˇŚă€‚",
    "ĺ¸¦čˇŚćťŽă€ä¸‹é›¨ă€ĺ¤©ć°”ĺľç­ć–ĺ·´ĺŁ«ĺż«ĺŹ‘č˝¦ć—¶ďĽŚĺ»şč®®ä˝żç”¨ Grab/BoltďĽšä»Ž Central Pattaya ć– Terminal 21 é€šĺ¸¸çş¦ 80-150 THBďĽŚä»Ž Beach Road/Pratumnak çş¦ 100-180 THBďĽŚä»Ž Jomtien ć–čľčżśçš„ Naklua çş¦ 150-250 THBďĽŚĺŹ–ĺ†łäşŽäş¤é€šĺ’Śéś€ć±‚ă€‚",
    "ç§äşşĺ‡şç§źč˝¦ć–ĺŚ… songthaew čŻ·ä¸Šč˝¦ĺ‰Ťč°ĺĄ˝ä»·ć ĽďĽ›ĺ¸‚ä¸­ĺżĺŚşĺźźĺ¤§çş¦ 120-250 THBďĽŚJomtien ć–čľčżś Naklua ĺ¤§çş¦ 200-350 THBă€‚ĺ¦‚ćžśĺś¨čŠ­ćŹé›…ä¸­ĺżďĽŚčŻ·ćŹĺ‰Ť 45-60 ĺ†é’źä»Žé…’ĺş—ĺ‡şĺŹ‘ďĽ›ĺ¦‚ćžśĺś¨ Jomtienă€Pratumnak ć– NakluaďĽŚčŻ·ćŹĺ‰Ť 60-90 ĺ†é’źĺ‡şĺŹ‘ă€‚",
  ],
};

const moChitArrivalTips: Record<LocaleCode, string[]> = {
  en: [
    "After getting off at Mo Chit 2, first open your hotel address in Google Maps and choose whether you need Sukhumvit, Siam, Silom, Riverside, Khao San, or Don Mueang.",
    "For the cheapest city access, go to BTS Mo Chit or MRT Chatuchak Park; they are about 2 km from the terminal. Take a short taxi/Grab or motorcycle taxi to the station, then continue by BTS/MRT. BTS is usually about 17-65 THB and MRT about 17-45 THB depending on distance.",
    "With luggage, rain, heat, or late arrival, use Grab/Bolt or taxi directly from the terminal. Expect roughly 120-250 THB to Sukhumvit/Siam, 180-350 THB to Silom/Riverside, and 180-350 THB to Khao San depending on traffic and demand.",
    "If using a street taxi, ask for the meter or agree the price before getting in. Bangkok traffic can be heavy, so BTS/MRT is often safer for Sukhumvit, Siam, Silom, and shopping areas.",
  ],
  pl: [
    "Po wysiadce na Mo Chit 2 najpierw otwĂłrz adres hotelu w Google Maps i sprawdĹş, czy jedziesz w stronÄ™ Sukhumvit, Siam, Silom, Riverside, Khao San czy Don Mueang.",
    "Najtaniej do miasta: dojedĹş do BTS Mo Chit albo MRT Chatuchak Park; sÄ… okoĹ‚o 2 km od terminala. WeĹş krĂłtki taxi/Grab albo motorbike taxi do stacji, potem jedĹş BTS/MRT. BTS kosztuje zwykle okoĹ‚o 17-65 THB, a MRT okoĹ‚o 17-45 THB zaleĹĽnie od dystansu.",
    "Z bagaĹĽem, w deszczu, upale albo pĂłĹşnym przyjazdem wybierz Grab/Bolt lub taxi bezpoĹ›rednio z terminala. Licz okoĹ‚o 120-250 THB do Sukhumvit/Siam, 180-350 THB do Silom/Riverside i 180-350 THB do Khao San, zaleĹĽnie od korkĂłw i popytu.",
    "Przy zwykĹ‚ej taksĂłwce poproĹ› o taksometr albo ustal cenÄ™ przed wejĹ›ciem. Korki w Bangkoku bywajÄ… duĹĽe, wiÄ™c BTS/MRT jest czÄ™sto bezpieczniejszy dla Sukhumvit, Siam, Silom i okolic centrĂłw handlowych.",
  ],
  de: [
    "Nach dem Ausstieg am Mo Chit 2 Ă¶ffne zuerst die Hoteladresse in Google Maps und prĂĽfe, ob du nach Sukhumvit, Siam, Silom, Riverside, Khao San oder Don Mueang musst.",
    "Am gĂĽnstigsten in die Stadt: Fahre zu BTS Mo Chit oder MRT Chatuchak Park; beide liegen etwa 2 km vom Terminal entfernt. Nimm ein kurzes Taxi/Grab oder Motorradtaxi zur Station und fahre dann mit BTS/MRT weiter. BTS kostet meist etwa 17-65 THB, MRT etwa 17-45 THB je nach Strecke.",
    "Mit GepĂ¤ck, Regen, Hitze oder spĂ¤ter Ankunft nutze Grab/Bolt oder Taxi direkt ab Terminal. Rechne grob mit 120-250 THB nach Sukhumvit/Siam, 180-350 THB nach Silom/Riverside und 180-350 THB nach Khao San, je nach Verkehr und Nachfrage.",
    "Beim StraĂźentaxi um Meter bitten oder den Preis vor dem Einsteigen vereinbaren. Bangkok-Verkehr kann stark sein, deshalb ist BTS/MRT oft sicherer fĂĽr Sukhumvit, Siam, Silom und Einkaufsviertel.",
  ],
  fr: [
    "AprĂ¨s ĂŞtre descendu Ă  Mo Chit 2, ouvrez d'abord l'adresse de votre hĂ´tel dans Google Maps et vĂ©rifiez si vous allez vers Sukhumvit, Siam, Silom, Riverside, Khao San ou Don Mueang.",
    "Pour rejoindre la ville au moindre coĂ»t, allez Ă  BTS Mo Chit ou MRT Chatuchak Park ; ils sont Ă  environ 2 km du terminal. Prenez un court taxi/Grab ou moto-taxi jusqu'Ă  la station, puis continuez en BTS/MRT. Le BTS coĂ»te gĂ©nĂ©ralement environ 17-65 THB et le MRT environ 17-45 THB selon la distance.",
    "Avec des bagages, sous la pluie, par forte chaleur ou en arrivĂ©e tardive, utilisez Grab/Bolt ou un taxi directement depuis le terminal. Comptez environ 120-250 THB vers Sukhumvit/Siam, 180-350 THB vers Silom/Riverside et 180-350 THB vers Khao San selon le trafic et la demande.",
    "En taxi de rue, demandez le compteur ou convenez du prix avant de monter. Le trafic Ă  Bangkok peut ĂŞtre dense, donc BTS/MRT est souvent plus sĂ»r pour Sukhumvit, Siam, Silom et les quartiers de shopping.",
  ],
  ru: [
    "ĐźĐľŃĐ»Đµ Đ˛Ń‹Ń…ĐľĐ´Đ° Đ˝Đ° Mo Chit 2 ŃĐ˝Đ°Ń‡Đ°Đ»Đ° ĐľŃ‚ĐşŃ€ĐľĐąŃ‚Đµ Đ°Đ´Ń€ĐµŃ ĐľŃ‚ĐµĐ»ŃŹ Đ˛ Google Maps Đ¸ ĐżŃ€ĐľĐ˛ĐµŃ€ŃŚŃ‚Đµ Đ˝Đ°ĐżŃ€Đ°Đ˛Đ»ĐµĐ˝Đ¸Đµ: Sukhumvit, Siam, Silom, Riverside, Khao San Đ¸Đ»Đ¸ Don Mueang.",
    "ĐˇĐ°ĐĽŃ‹Đą Đ´ĐµŃŃ‘Đ˛Ń‹Đą ĐżŃŃ‚ŃŚ Đ˛ ĐłĐľŃ€ĐľĐ´ â€” Đ´ĐľĐµŃ…Đ°Ń‚ŃŚ Đ´Đľ BTS Mo Chit Đ¸Đ»Đ¸ MRT Chatuchak Park; ĐľĐ˝Đ¸ ĐżŃ€Đ¸ĐĽĐµŃ€Đ˝Đľ Đ˛ 2 ĐşĐĽ ĐľŃ‚ Ń‚ĐµŃ€ĐĽĐ¸Đ˝Đ°Đ»Đ°. Đ’ĐľĐ·ŃŚĐĽĐ¸Ń‚Đµ ĐşĐľŃ€ĐľŃ‚ĐşĐ¸Đą taxi/Grab Đ¸Đ»Đ¸ ĐĽĐľŃ‚ĐľŃ‚Đ°ĐşŃĐ¸ Đ´Đľ ŃŃ‚Đ°Đ˝Ń†Đ¸Đ¸, Đ·Đ°Ń‚ĐµĐĽ ĐżŃ€ĐľĐ´ĐľĐ»Đ¶Đ°ĐąŃ‚Đµ Đ˝Đ° BTS/MRT. BTS ĐľĐ±Ń‹Ń‡Đ˝Đľ ŃŃ‚ĐľĐ¸Ń‚ ĐľĐşĐľĐ»Đľ 17-65 THB, MRT ĐľĐşĐľĐ»Đľ 17-45 THB Đ˛ Đ·Đ°Đ˛Đ¸ŃĐ¸ĐĽĐľŃŃ‚Đ¸ ĐľŃ‚ Ń€Đ°ŃŃŃ‚ĐľŃŹĐ˝Đ¸ŃŹ.",
    "Đˇ Đ±Đ°ĐłĐ°Đ¶ĐľĐĽ, Đ˛ Đ´ĐľĐ¶Đ´ŃŚ, Đ¶Đ°Ń€Ń Đ¸Đ»Đ¸ ĐżŃ€Đ¸ ĐżĐľĐ·Đ´Đ˝ĐµĐĽ ĐżŃ€Đ¸ĐµĐ·Đ´Đµ Đ¸ŃĐżĐľĐ»ŃŚĐ·ŃĐąŃ‚Đµ Grab/Bolt Đ¸Đ»Đ¸ Ń‚Đ°ĐşŃĐ¸ ĐżŃ€ŃŹĐĽĐľ ĐľŃ‚ Ń‚ĐµŃ€ĐĽĐ¸Đ˝Đ°Đ»Đ°. ĐžŃ€Đ¸ĐµĐ˝Ń‚Đ¸Ń€: 120-250 THB Đ´Đľ Sukhumvit/Siam, 180-350 THB Đ´Đľ Silom/Riverside Đ¸ 180-350 THB Đ´Đľ Khao San, Đ˛ Đ·Đ°Đ˛Đ¸ŃĐ¸ĐĽĐľŃŃ‚Đ¸ ĐľŃ‚ Ń‚Ń€Đ°Ń„Đ¸ĐşĐ° Đ¸ ŃĐżŃ€ĐľŃĐ°.",
    "Đ’ ŃĐ»Đ¸Ń‡Đ˝ĐľĐĽ Ń‚Đ°ĐşŃĐ¸ ĐżĐľĐżŃ€ĐľŃĐ¸Ń‚Đµ Đ˛ĐşĐ»ŃŽŃ‡Đ¸Ń‚ŃŚ ŃŃ‡Ń‘Ń‚Ń‡Đ¸Đş Đ¸Đ»Đ¸ Đ´ĐľĐłĐľĐ˛ĐľŃ€Đ¸Ń‚ĐµŃŃŚ Đľ Ń†ĐµĐ˝Đµ Đ´Đľ ĐżĐľŃĐ°Đ´ĐşĐ¸. Đ’ Đ‘Đ°Đ˝ĐłĐşĐľĐşĐµ Đ±Ń‹Đ˛Đ°ŃŽŃ‚ ŃĐ¸Đ»ŃŚĐ˝Ń‹Đµ ĐżŃ€ĐľĐ±ĐşĐ¸, ĐżĐľŃŤŃ‚ĐľĐĽŃ BTS/MRT Ń‡Đ°ŃŃ‚Đľ Đ˝Đ°Đ´Ń‘Đ¶Đ˝ĐµĐµ Đ´Đ»ŃŹ Sukhumvit, Siam, Silom Đ¸ Ń‚ĐľŃ€ĐłĐľĐ˛Ń‹Ń… Ń€Đ°ĐąĐľĐ˝ĐľĐ˛.",
  ],
  th: [
    "ŕ¸«ŕ¸Ąŕ¸±ŕ¸‡ŕ¸Ąŕ¸‡ŕ¸Łŕ¸–ŕ¸—ŕ¸µŕą Mo Chit 2 ŕąŕ¸«ŕą‰ŕą€ŕ¸›ŕ¸´ŕ¸”ŕ¸—ŕ¸µŕąŕ¸­ŕ¸˘ŕ¸ąŕąŕą‚ŕ¸Łŕ¸‡ŕąŕ¸Łŕ¸ˇŕąŕ¸™ Google Maps ŕ¸ŕąŕ¸­ŕ¸™ ŕąŕ¸Ąŕą‰ŕ¸§ŕ¸”ŕ¸ąŕ¸§ŕąŕ¸˛ŕ¸•ŕą‰ŕ¸­ŕ¸‡ŕą„ŕ¸›ŕ¸—ŕ¸˛ŕ¸‡ Sukhumvit, Siam, Silom, Riverside, Khao San ŕ¸«ŕ¸Łŕ¸·ŕ¸­ Don Mueang",
    "ŕ¸§ŕ¸´ŕ¸ŕ¸µŕą€ŕ¸‚ŕą‰ŕ¸˛ŕą€ŕ¸ˇŕ¸·ŕ¸­ŕ¸‡ŕ¸—ŕ¸µŕąŕ¸›ŕ¸Łŕ¸°ŕ¸«ŕ¸˘ŕ¸±ŕ¸”ŕ¸—ŕ¸µŕąŕ¸Şŕ¸¸ŕ¸”ŕ¸„ŕ¸·ŕ¸­ŕą„ŕ¸› BTS Mo Chit ŕ¸«ŕ¸Łŕ¸·ŕ¸­ MRT Chatuchak Park ŕ¸‹ŕ¸¶ŕąŕ¸‡ŕ¸­ŕ¸˘ŕ¸ąŕąŕ¸«ŕąŕ¸˛ŕ¸‡ŕ¸ŕ¸˛ŕ¸ŕą€ŕ¸—ŕ¸­ŕ¸ŁŕąŚŕ¸ˇŕ¸´ŕ¸™ŕ¸±ŕ¸Ąŕ¸›ŕ¸Łŕ¸°ŕ¸ˇŕ¸˛ŕ¸“ 2 ŕ¸ŕ¸ˇ. ŕ¸™ŕ¸±ŕąŕ¸‡ taxi/Grab ŕ¸Şŕ¸±ŕą‰ŕ¸™ ŕą† ŕ¸«ŕ¸Łŕ¸·ŕ¸­ŕ¸ˇŕ¸­ŕą€ŕ¸•ŕ¸­ŕ¸ŁŕąŚŕą„ŕ¸‹ŕ¸„ŕąŚŕ¸Łŕ¸±ŕ¸šŕ¸ŕą‰ŕ¸˛ŕ¸‡ŕą„ŕ¸›ŕ¸Şŕ¸–ŕ¸˛ŕ¸™ŕ¸µ ŕąŕ¸Ąŕą‰ŕ¸§ŕ¸•ŕąŕ¸­ BTS/MRT ŕ¸„ŕąŕ¸˛ BTS ŕ¸ˇŕ¸±ŕ¸ŕ¸›ŕ¸Łŕ¸°ŕ¸ˇŕ¸˛ŕ¸“ 17-65 THB ŕąŕ¸Ąŕ¸° MRT ŕ¸›ŕ¸Łŕ¸°ŕ¸ˇŕ¸˛ŕ¸“ 17-45 THB ŕ¸•ŕ¸˛ŕ¸ˇŕ¸Łŕ¸°ŕ¸˘ŕ¸°ŕ¸—ŕ¸˛ŕ¸‡",
    "ŕ¸–ŕą‰ŕ¸˛ŕ¸ˇŕ¸µŕ¸ŕ¸Łŕ¸°ŕą€ŕ¸›ŕą‹ŕ¸˛ ŕ¸ťŕ¸™ŕ¸•ŕ¸ ŕ¸­ŕ¸˛ŕ¸ŕ¸˛ŕ¸¨ŕ¸Łŕą‰ŕ¸­ŕ¸™ ŕ¸«ŕ¸Łŕ¸·ŕ¸­ŕ¸ˇŕ¸˛ŕ¸–ŕ¸¶ŕ¸‡ŕ¸”ŕ¸¶ŕ¸ ŕąŕ¸«ŕą‰ŕąŕ¸Šŕą‰ Grab/Bolt ŕ¸«ŕ¸Łŕ¸·ŕ¸­ŕąŕ¸—ŕą‡ŕ¸ŕ¸‹ŕ¸µŕąŕ¸ŕ¸˛ŕ¸ŕą€ŕ¸—ŕ¸­ŕ¸ŁŕąŚŕ¸ˇŕ¸´ŕ¸™ŕ¸±ŕ¸Ąŕą‚ŕ¸”ŕ¸˘ŕ¸•ŕ¸Łŕ¸‡ ŕą‚ŕ¸”ŕ¸˘ŕ¸›ŕ¸Łŕ¸°ŕ¸ˇŕ¸˛ŕ¸“ 120-250 THB ŕą„ŕ¸› Sukhumvit/Siam, 180-350 THB ŕą„ŕ¸› Silom/Riverside ŕąŕ¸Ąŕ¸° 180-350 THB ŕą„ŕ¸› Khao San ŕ¸‚ŕ¸¶ŕą‰ŕ¸™ŕ¸ŕ¸±ŕ¸šŕ¸Łŕ¸–ŕ¸•ŕ¸´ŕ¸”ŕąŕ¸Ąŕ¸°ŕ¸„ŕ¸§ŕ¸˛ŕ¸ˇŕ¸•ŕą‰ŕ¸­ŕ¸‡ŕ¸ŕ¸˛ŕ¸Łŕą€ŕ¸Łŕ¸µŕ¸˘ŕ¸ŕ¸Łŕ¸–",
    "ŕ¸–ŕą‰ŕ¸˛ŕąŕ¸Šŕą‰ŕąŕ¸—ŕą‡ŕ¸ŕ¸‹ŕ¸µŕąŕ¸Łŕ¸´ŕ¸ˇŕ¸–ŕ¸™ŕ¸™ ŕąŕ¸«ŕą‰ŕ¸‚ŕ¸­ŕ¸ˇŕ¸´ŕą€ŕ¸•ŕ¸­ŕ¸ŁŕąŚŕ¸«ŕ¸Łŕ¸·ŕ¸­ŕ¸„ŕ¸¸ŕ¸˘ŕ¸Łŕ¸˛ŕ¸„ŕ¸˛ŕ¸ŕąŕ¸­ŕ¸™ŕ¸‚ŕ¸¶ŕą‰ŕ¸™ŕ¸Łŕ¸– ŕ¸Łŕ¸–ŕ¸•ŕ¸´ŕ¸”ŕąŕ¸™ŕ¸ŕ¸Łŕ¸¸ŕ¸‡ŕą€ŕ¸—ŕ¸žŕ¸Ż ŕ¸­ŕ¸˛ŕ¸ŕ¸«ŕ¸™ŕ¸±ŕ¸ ŕ¸”ŕ¸±ŕ¸‡ŕ¸™ŕ¸±ŕą‰ŕ¸™ BTS/MRT ŕ¸ˇŕ¸±ŕ¸ŕ¸›ŕ¸Ąŕ¸­ŕ¸”ŕ¸ ŕ¸±ŕ¸˘ŕ¸ŕ¸§ŕąŕ¸˛ŕą€ŕ¸§ŕ¸Ąŕ¸˛ŕ¸ŕ¸°ŕą„ŕ¸› Sukhumvit, Siam, Silom ŕąŕ¸Ąŕ¸°ŕ¸˘ŕąŕ¸˛ŕ¸™ŕ¸«ŕą‰ŕ¸˛ŕ¸‡",
  ],
  zh: [
    "ĺ°čľľ Mo Chit 2 ä¸‹č˝¦ĺŽďĽŚĺ…ĺś¨ Google Maps ć‰“ĺĽ€é…’ĺş—ĺś°ĺť€ďĽŚçˇ®č®¤ä˝ č¦ĺŽ» Sukhumvită€Siamă€Silomă€Riversideă€Khao San čżćŻ Don Mueangă€‚",
    "ćś€äľżĺ®śçš„čż›ĺźŽć–ąĺĽŹćŻĺ…ĺ° BTS Mo Chit ć– MRT Chatuchak ParkďĽ›ĺ®ä»¬č·ťç¦»č˝¦ç«™çş¦ 2 ĺ…¬é‡Śă€‚ĺŹŻĺ…ĺťçź­é€” taxi/Grab ć–ć‘©ć‰č˝¦ĺ‡şç§źĺ°č˝¦ç«™ďĽŚĺ†ŤćŤ˘äą BTS/MRTă€‚BTS é€šĺ¸¸çş¦ 17-65 THBďĽŚMRT çş¦ 17-45 THBďĽŚĺŹ–ĺ†łäşŽč·ťç¦»ă€‚",
    "ĺ¦‚ćžśćś‰čˇŚćťŽă€ä¸‹é›¨ă€ĺ¤©ć°”ĺľç­ć–čľć™šĺ°čľľďĽŚĺ»şč®®ä»Žč˝¦ç«™ç›´ćŽĄç”¨ Grab/Bolt ć–ĺ‡şç§źč˝¦ă€‚ĺ° Sukhumvit/Siam çş¦ 120-250 THBďĽŚĺ° Silom/Riverside çş¦ 180-350 THBďĽŚĺ° Khao San çş¦ 180-350 THBďĽŚĺŹ–ĺ†łäşŽäş¤é€šĺ’Śéś€ć±‚ă€‚",
    "äąĺťč·Żčľąĺ‡şç§źč˝¦ć—¶ďĽŚčŻ·č¦ć±‚ć‰“čˇ¨ć–ä¸Šč˝¦ĺ‰Ťč°ĺĄ˝ä»·ć Ľă€‚ć›Ľč°·ĺ µč˝¦ĺŹŻč˝ĺľä¸Ąé‡ŤďĽŚć‰€ä»Ąĺ‰Ťĺľ€ Sukhumvită€Siamă€Silom ĺ’Śč´­ç‰©ĺŚşć—¶ďĽŚBTS/MRT é€šĺ¸¸ć›´ç¨łĺ¦Ąă€‚",
  ],
};

const ekkamaiArrivalTips: Record<LocaleCode, string[]> = {
  en: [
    "After getting off at Ekkamai Bus Terminal, first open your hotel address in Google Maps and check whether you need Sukhumvit, Siam, Silom, Riverside, Khao San, or the airport rail link.",
    "For most city hotels, BTS is the easiest option: Ekkamai BTS Station is next to the terminal. Walk to BTS Ekkamai Exit 2 and continue on the Sukhumvit/Green Line. BTS fares are usually about 17-65 THB depending on distance.",
    "Use BTS for Sukhumvit, Asok, Nana, Phrom Phong, Siam, and shopping areas. For Silom, change at Siam to the Silom Line, or go to Asok/Sukhumvit and connect with MRT if that is closer to your hotel.",
    "With heavy luggage, rain, or if you stay near Khao San/Riverside, use Grab/Bolt or metered taxi. Expect roughly 80-180 THB to nearby Sukhumvit/Siam, 150-300 THB to Silom/Riverside, and 180-350 THB to Khao San depending on traffic. Ask for the meter or agree the fare before getting in.",
  ],
  pl: [
    "Po wysiadce na Ekkamai Bus Terminal najpierw otwĂłrz adres hotelu w Google Maps i sprawdĹş, czy jedziesz w stronÄ™ Sukhumvit, Siam, Silom, Riverside, Khao San albo Airport Rail Link.",
    "Do wiÄ™kszoĹ›ci hoteli w mieĹ›cie najĹ‚atwiej jechaÄ‡ BTS: stacja BTS Ekkamai jest obok terminala. PrzejdĹş do BTS Ekkamai Exit 2 i jedĹş liniÄ… Sukhumvit/Green Line. Bilet BTS kosztuje zwykle okoĹ‚o 17-65 THB zaleĹĽnie od dystansu.",
    "BTS wybierz dla Sukhumvit, Asok, Nana, Phrom Phong, Siam i okolic centrĂłw handlowych. Do Silom przesiÄ…dĹş siÄ™ na Siam na liniÄ™ Silom albo jedĹş do Asok/Sukhumvit i poĹ‚Ä…cz z MRT, jeĹ›li tak jest bliĹĽej hotelu.",
    "Z duĹĽym bagaĹĽem, w deszczu albo przy hotelu w Khao San/Riverside wybierz Grab/Bolt lub taxi z taksometrem. Licz okoĹ‚o 80-180 THB do pobliskiego Sukhumvit/Siam, 150-300 THB do Silom/Riverside i 180-350 THB do Khao San, zaleĹĽnie od korkĂłw. PoproĹ› o taksometr albo ustal cenÄ™ przed wejĹ›ciem.",
  ],
  de: [
    "Nach dem Ausstieg am Ekkamai Bus Terminal Ă¶ffne zuerst die Hoteladresse in Google Maps und prĂĽfe, ob du nach Sukhumvit, Siam, Silom, Riverside, Khao San oder zum Airport Rail Link musst.",
    "FĂĽr die meisten Stadthotels ist BTS am einfachsten: BTS Ekkamai liegt direkt neben dem Terminal. Gehe zu BTS Ekkamai Exit 2 und fahre mit der Sukhumvit/Green Line weiter. BTS kostet je nach Strecke meist etwa 17-65 THB.",
    "Nutze BTS fĂĽr Sukhumvit, Asok, Nana, Phrom Phong, Siam und Einkaufsviertel. Nach Silom steigst du in Siam in die Silom Line um, oder fĂ¤hrst nach Asok/Sukhumvit und wechselst zur MRT, wenn das nĂ¤her am Hotel ist.",
    "Mit viel GepĂ¤ck, Regen oder Hotel in Khao San/Riverside nutze Grab/Bolt oder ein Taxi mit Meter. Rechne grob mit 80-180 THB nach Sukhumvit/Siam in der NĂ¤he, 150-300 THB nach Silom/Riverside und 180-350 THB nach Khao San, je nach Verkehr. Bitte um Meter oder vereinbare den Preis vor dem Einsteigen.",
  ],
  fr: [
    "AprĂ¨s ĂŞtre descendu Ă  Ekkamai Bus Terminal, ouvrez d'abord l'adresse de votre hĂ´tel dans Google Maps et vĂ©rifiez si vous allez vers Sukhumvit, Siam, Silom, Riverside, Khao San ou l'Airport Rail Link.",
    "Pour la plupart des hĂ´tels en ville, le BTS est le plus simple : BTS Ekkamai est juste Ă  cĂ´tĂ© du terminal. Marchez jusqu'Ă  BTS Ekkamai Exit 2 et continuez sur la ligne Sukhumvit/Green Line. Le BTS coĂ»te gĂ©nĂ©ralement environ 17-65 THB selon la distance.",
    "Utilisez le BTS pour Sukhumvit, Asok, Nana, Phrom Phong, Siam et les quartiers de shopping. Pour Silom, changez Ă  Siam vers la Silom Line, ou allez Ă  Asok/Sukhumvit pour prendre le MRT si c'est plus proche de votre hĂ´tel.",
    "Avec beaucoup de bagages, sous la pluie ou si vous logez Ă  Khao San/Riverside, utilisez Grab/Bolt ou un taxi au compteur. Comptez environ 80-180 THB vers Sukhumvit/Siam proche, 150-300 THB vers Silom/Riverside et 180-350 THB vers Khao San selon le trafic. Demandez le compteur ou convenez du prix avant de monter.",
  ],
  ru: [
    "ĐźĐľŃĐ»Đµ Đ˛Ń‹Ń…ĐľĐ´Đ° Đ˝Đ° Ekkamai Bus Terminal ŃĐ˝Đ°Ń‡Đ°Đ»Đ° ĐľŃ‚ĐşŃ€ĐľĐąŃ‚Đµ Đ°Đ´Ń€ĐµŃ ĐľŃ‚ĐµĐ»ŃŹ Đ˛ Google Maps Đ¸ ĐżŃ€ĐľĐ˛ĐµŃ€ŃŚŃ‚Đµ Đ˝Đ°ĐżŃ€Đ°Đ˛Đ»ĐµĐ˝Đ¸Đµ: Sukhumvit, Siam, Silom, Riverside, Khao San Đ¸Đ»Đ¸ Airport Rail Link.",
    "Đ”Đ»ŃŹ Đ±ĐľĐ»ŃŚŃĐ¸Đ˝ŃŃ‚Đ˛Đ° ĐłĐľŃ€ĐľĐ´ŃĐşĐ¸Ń… ĐľŃ‚ĐµĐ»ĐµĐą ĐżŃ€ĐľŃ‰Đµ Đ˛ŃĐµĐłĐľ BTS: ŃŃ‚Đ°Đ˝Ń†Đ¸ŃŹ BTS Ekkamai Đ˝Đ°Ń…ĐľĐ´Đ¸Ń‚ŃŃŹ Ń€ŃŹĐ´ĐľĐĽ Ń Ń‚ĐµŃ€ĐĽĐ¸Đ˝Đ°Đ»ĐľĐĽ. ĐĐ´Đ¸Ń‚Đµ Đş BTS Ekkamai Exit 2 Đ¸ ĐżŃ€ĐľĐ´ĐľĐ»Đ¶Đ°ĐąŃ‚Đµ ĐżĐľ Sukhumvit/Green Line. BTS ĐľĐ±Ń‹Ń‡Đ˝Đľ ŃŃ‚ĐľĐ¸Ń‚ ĐľĐşĐľĐ»Đľ 17-65 THB Đ˛ Đ·Đ°Đ˛Đ¸ŃĐ¸ĐĽĐľŃŃ‚Đ¸ ĐľŃ‚ Ń€Đ°ŃŃŃ‚ĐľŃŹĐ˝Đ¸ŃŹ.",
    "ĐŃĐżĐľĐ»ŃŚĐ·ŃĐąŃ‚Đµ BTS Đ´Đ»ŃŹ Sukhumvit, Asok, Nana, Phrom Phong, Siam Đ¸ Ń‚ĐľŃ€ĐłĐľĐ˛Ń‹Ń… Ń€Đ°ĐąĐľĐ˝ĐľĐ˛. Đ”Đ»ŃŹ Silom ŃĐ´ĐµĐ»Đ°ĐąŃ‚Đµ ĐżĐµŃ€ĐµŃĐ°Đ´ĐşŃ Đ˝Đ° Siam Đ˝Đ° Silom Line Đ¸Đ»Đ¸ Đ´ĐľĐµĐ´ŃŚŃ‚Đµ Đ´Đľ Asok/Sukhumvit Đ¸ ĐżĐµŃ€ĐµĐąĐ´Đ¸Ń‚Đµ Đ˝Đ° MRT, ĐµŃĐ»Đ¸ Ń‚Đ°Đş Đ±Đ»Đ¸Đ¶Đµ Đş ĐľŃ‚ĐµĐ»ŃŽ.",
    "Đˇ Đ±ĐľĐ»ŃŚŃĐ¸ĐĽ Đ±Đ°ĐłĐ°Đ¶ĐľĐĽ, Đ˛ Đ´ĐľĐ¶Đ´ŃŚ Đ¸Đ»Đ¸ ĐµŃĐ»Đ¸ ĐľŃ‚ĐµĐ»ŃŚ Đ˛ Khao San/Riverside, Đ¸ŃĐżĐľĐ»ŃŚĐ·ŃĐąŃ‚Đµ Grab/Bolt Đ¸Đ»Đ¸ Ń‚Đ°ĐşŃĐ¸ ĐżĐľ ŃŃ‡Ń‘Ń‚Ń‡Đ¸ĐşŃ. ĐžŃ€Đ¸ĐµĐ˝Ń‚Đ¸Ń€: 80-180 THB Đ´Đľ Đ±Đ»Đ¸Đ¶Đ°ĐąŃĐ¸Ń… Sukhumvit/Siam, 150-300 THB Đ´Đľ Silom/Riverside Đ¸ 180-350 THB Đ´Đľ Khao San, Đ˛ Đ·Đ°Đ˛Đ¸ŃĐ¸ĐĽĐľŃŃ‚Đ¸ ĐľŃ‚ Ń‚Ń€Đ°Ń„Đ¸ĐşĐ°. ĐźĐľĐżŃ€ĐľŃĐ¸Ń‚Đµ Đ˛ĐşĐ»ŃŽŃ‡Đ¸Ń‚ŃŚ ŃŃ‡Ń‘Ń‚Ń‡Đ¸Đş Đ¸Đ»Đ¸ Đ´ĐľĐłĐľĐ˛ĐľŃ€Đ¸Ń‚ĐµŃŃŚ Đľ Ń†ĐµĐ˝Đµ Đ´Đľ ĐżĐľŃĐ°Đ´ĐşĐ¸.",
  ],
  th: [
    "ŕ¸«ŕ¸Ąŕ¸±ŕ¸‡ŕ¸Ąŕ¸‡ŕ¸Łŕ¸–ŕ¸—ŕ¸µŕą Ekkamai Bus Terminal ŕąŕ¸«ŕą‰ŕą€ŕ¸›ŕ¸´ŕ¸”ŕ¸—ŕ¸µŕąŕ¸­ŕ¸˘ŕ¸ąŕąŕą‚ŕ¸Łŕ¸‡ŕąŕ¸Łŕ¸ˇŕąŕ¸™ Google Maps ŕ¸ŕąŕ¸­ŕ¸™ ŕąŕ¸Ąŕą‰ŕ¸§ŕ¸”ŕ¸ąŕ¸§ŕąŕ¸˛ŕ¸•ŕą‰ŕ¸­ŕ¸‡ŕą„ŕ¸›ŕ¸—ŕ¸˛ŕ¸‡ Sukhumvit, Siam, Silom, Riverside, Khao San ŕ¸«ŕ¸Łŕ¸·ŕ¸­ Airport Rail Link",
    "ŕ¸Şŕ¸łŕ¸«ŕ¸Łŕ¸±ŕ¸šŕą‚ŕ¸Łŕ¸‡ŕąŕ¸Łŕ¸ˇŕ¸Şŕąŕ¸§ŕ¸™ŕąŕ¸«ŕ¸Ťŕąŕąŕ¸™ŕą€ŕ¸ˇŕ¸·ŕ¸­ŕ¸‡ BTS ŕ¸‡ŕąŕ¸˛ŕ¸˘ŕ¸—ŕ¸µŕąŕ¸Şŕ¸¸ŕ¸”: ŕ¸Şŕ¸–ŕ¸˛ŕ¸™ŕ¸µ BTS Ekkamai ŕ¸­ŕ¸˘ŕ¸ąŕąŕ¸•ŕ¸´ŕ¸”ŕ¸ŕ¸±ŕ¸šŕą€ŕ¸—ŕ¸­ŕ¸ŁŕąŚŕ¸ˇŕ¸´ŕ¸™ŕ¸±ŕ¸Ą ŕą€ŕ¸”ŕ¸´ŕ¸™ŕą„ŕ¸› BTS Ekkamai Exit 2 ŕąŕ¸Ąŕą‰ŕ¸§ŕ¸•ŕąŕ¸­ŕ¸Şŕ¸˛ŕ¸˘ Sukhumvit/Green Line ŕ¸„ŕąŕ¸˛ BTS ŕ¸ˇŕ¸±ŕ¸ŕ¸›ŕ¸Łŕ¸°ŕ¸ˇŕ¸˛ŕ¸“ 17-65 THB ŕ¸•ŕ¸˛ŕ¸ˇŕ¸Łŕ¸°ŕ¸˘ŕ¸°ŕ¸—ŕ¸˛ŕ¸‡",
    "ŕąŕ¸Šŕą‰ BTS ŕ¸Şŕ¸łŕ¸«ŕ¸Łŕ¸±ŕ¸š Sukhumvit, Asok, Nana, Phrom Phong, Siam ŕąŕ¸Ąŕ¸°ŕ¸˘ŕąŕ¸˛ŕ¸™ŕ¸«ŕą‰ŕ¸˛ŕ¸‡ ŕ¸–ŕą‰ŕ¸˛ŕą„ŕ¸› Silom ŕąŕ¸«ŕą‰ŕą€ŕ¸›ŕ¸Ąŕ¸µŕąŕ¸˘ŕ¸™ŕ¸Şŕ¸˛ŕ¸˘ŕ¸—ŕ¸µŕą Siam ŕą„ŕ¸› Silom Line ŕ¸«ŕ¸Łŕ¸·ŕ¸­ŕą„ŕ¸› Asok/Sukhumvit ŕąŕ¸Ąŕą‰ŕ¸§ŕ¸•ŕąŕ¸­ MRT ŕ¸–ŕą‰ŕ¸˛ŕąŕ¸ŕ¸Ąŕą‰ŕą‚ŕ¸Łŕ¸‡ŕąŕ¸Łŕ¸ˇŕ¸ŕ¸§ŕąŕ¸˛",
    "ŕ¸–ŕą‰ŕ¸˛ŕ¸ˇŕ¸µŕ¸ŕ¸Łŕ¸°ŕą€ŕ¸›ŕą‹ŕ¸˛ŕą€ŕ¸˘ŕ¸­ŕ¸° ŕ¸ťŕ¸™ŕ¸•ŕ¸ ŕ¸«ŕ¸Łŕ¸·ŕ¸­ŕ¸žŕ¸±ŕ¸ŕąŕ¸–ŕ¸§ Khao San/Riverside ŕąŕ¸«ŕą‰ŕąŕ¸Šŕą‰ Grab/Bolt ŕ¸«ŕ¸Łŕ¸·ŕ¸­ŕąŕ¸—ŕą‡ŕ¸ŕ¸‹ŕ¸µŕąŕ¸ˇŕ¸´ŕą€ŕ¸•ŕ¸­ŕ¸ŁŕąŚ ŕą‚ŕ¸”ŕ¸˘ŕ¸›ŕ¸Łŕ¸°ŕ¸ˇŕ¸˛ŕ¸“ 80-180 THB ŕą„ŕ¸› Sukhumvit/Siam ŕąŕ¸ŕ¸Ąŕą‰ ŕą†, 150-300 THB ŕą„ŕ¸› Silom/Riverside ŕąŕ¸Ąŕ¸° 180-350 THB ŕą„ŕ¸› Khao San ŕ¸‚ŕ¸¶ŕą‰ŕ¸™ŕ¸ŕ¸±ŕ¸šŕ¸Łŕ¸–ŕ¸•ŕ¸´ŕ¸” ŕ¸„ŕ¸§ŕ¸Łŕ¸‚ŕ¸­ŕ¸ˇŕ¸´ŕą€ŕ¸•ŕ¸­ŕ¸ŁŕąŚŕ¸«ŕ¸Łŕ¸·ŕ¸­ŕ¸„ŕ¸¸ŕ¸˘ŕ¸Łŕ¸˛ŕ¸„ŕ¸˛ŕ¸ŕąŕ¸­ŕ¸™ŕ¸‚ŕ¸¶ŕą‰ŕ¸™ŕ¸Łŕ¸–",
  ],
  zh: [
    "ĺ°čľľ Ekkamai Bus Terminal ä¸‹č˝¦ĺŽďĽŚĺ…ĺś¨ Google Maps ć‰“ĺĽ€é…’ĺş—ĺś°ĺť€ďĽŚçˇ®č®¤ä˝ č¦ĺŽ» Sukhumvită€Siamă€Silomă€Riversideă€Khao San čżćŻ Airport Rail Linkă€‚",
    "ĺ¤§ĺ¤šć•°ĺ¸‚ĺŚşé…’ĺş—ćś€ć–ąäľżçš„ćŻ BTSďĽšBTS Ekkamai ç«™ĺ°±ĺś¨č˝¦ç«™ć—čľąă€‚ć­ĄčˇŚĺ° BTS Ekkamai Exit 2ďĽŚç„¶ĺŽäąĺť Sukhumvit/Green Lineă€‚BTS çĄ¨ä»·é€šĺ¸¸çş¦ 17-65 THBďĽŚĺŹ–ĺ†łäşŽč·ťç¦»ă€‚",
    "ĺ‰Ťĺľ€ Sukhumvită€Asokă€Nanaă€Phrom Phongă€Siam ĺ’Śč´­ç‰©ĺŚşĺŹŻä˝żç”¨ BTSă€‚ĺŽ» Silom ĺŹŻĺś¨ Siam ćŤ˘äą Silom LineďĽŚć–ĺ° Asok/Sukhumvit ćŤ˘ MRTďĽŚĺ¦‚ćžśé‚Łć ·ć›´éť čż‘é…’ĺş—ă€‚",
    "ĺ¦‚ćžśčˇŚćťŽĺ¤šă€ä¸‹é›¨ďĽŚć–ä˝Źĺś¨ Khao San/RiversideďĽŚĺ»şč®®ä˝żç”¨ Grab/Bolt ć–ć‰“čˇ¨ĺ‡şç§źč˝¦ă€‚ĺ°é™„čż‘ Sukhumvit/Siam çş¦ 80-180 THBďĽŚĺ° Silom/Riverside çş¦ 150-300 THBďĽŚĺ° Khao San çş¦ 180-350 THBďĽŚĺŹ–ĺ†łäşŽäş¤é€šă€‚čŻ·č¦ć±‚ć‰“čˇ¨ć–ä¸Šč˝¦ĺ‰Ťč°ĺĄ˝ä»·ć Ľă€‚",
  ],
};

function getStationTip(
  stationId: string,
  tip: string,
  locale: LocaleCode,
  routeId?: RouteId,
) {
  if (stationId === "don-mueang-airport" && routeId === "pattaya-to-don-mueang-airport") {
    return repairMojibakeList(donMueangDepartureTips[locale]).join(" ");
  }

  if (stationId === "suvarnabhumi-airport" && routeId === "pattaya-to-suvarnabhumi-airport") {
    return repairMojibakeList(suvarnabhumiDepartureTips[locale]).join(" ");
  }

  if (stationId === "suvarnabhumi-airport" && routeId === "suvarnabhumi-airport-to-pattaya") {
    return repairMojibakeList(suvarnabhumiArrivalBusTips[locale]).join(" ");
  }

  if (stationId === "north-pattaya" && routeId === "pattaya-to-bangkok") {
    return repairMojibakeList(northPattayaDepartureTips[locale]).join(" ");
  }

  if (stationId === "mo-chit" && routeId === "pattaya-to-bangkok") {
    return repairMojibakeList(moChitArrivalTips[locale]).join(" ");
  }

  if (stationId === "ekkamai" && routeId === "pattaya-to-bangkok") {
    return repairMojibakeList(ekkamaiArrivalTips[locale]).join(" ");
  }

  return repairMojibake(tip);
}

function getMobileTipPoints(
  stationId: string,
  tip: string,
  locale: LocaleCode,
  routeId?: RouteId,
) {
  if (stationId === "don-mueang-airport" && routeId === "pattaya-to-don-mueang-airport") {
    return repairMojibakeList(donMueangDepartureTips[locale]);
  }

  if (stationId === "suvarnabhumi-airport" && routeId === "pattaya-to-suvarnabhumi-airport") {
    return repairMojibakeList(suvarnabhumiDepartureTips[locale]);
  }

  if (stationId === "suvarnabhumi-airport" && routeId === "suvarnabhumi-airport-to-pattaya") {
    return repairMojibakeList(suvarnabhumiArrivalBusTips[locale]);
  }

  if (stationId === "north-pattaya" && routeId === "pattaya-to-bangkok") {
    return repairMojibakeList(northPattayaDepartureTips[locale]);
  }

  if (stationId === "mo-chit" && routeId === "pattaya-to-bangkok") {
    return repairMojibakeList(moChitArrivalTips[locale]);
  }

  if (stationId === "ekkamai" && routeId === "pattaya-to-bangkok") {
    return repairMojibakeList(ekkamaiArrivalTips[locale]);
  }

  if (
    stationId !== "north-pattaya" &&
    stationId !== "pattaya-sukhumvit" &&
    stationId !== "ekkamai" &&
    stationId !== "jomtien-bus-area"
  ) {
    return [repairMojibake(tip)];
  }

  return repairMojibake(tip)
    .split(/(?<=[.!?ă€‚])\s+/)
    .map((point) => point.trim())
    .filter(Boolean);
}
