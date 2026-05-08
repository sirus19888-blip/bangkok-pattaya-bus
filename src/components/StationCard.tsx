import { StationMiniMap } from "@/components/StationMiniMap";
import { StationPhotoGallery } from "@/components/StationPhotoGallery";
import type { LocaleCode, RouteId } from "@/data/routes";
import type { Station } from "@/data/stations";
import type { StationPhotoGroup } from "@/data/stationPhotos";
import type { Translations } from "@/lib/i18n";

type StationCardProps = {
  stations: Station[];
  locale: LocaleCode;
  routeId?: RouteId;
  photoGroups?: StationPhotoGroup[];
  labels: Translations["station"] & {
    openInGoogleMaps: string;
  };
};

export function StationCard({
  stations,
  locale,
  routeId,
  photoGroups = [],
  labels,
}: StationCardProps) {
  return (
    <section className="rounded-2xl border border-[#eadcc7] bg-[#fffaf2] p-3 shadow-sm sm:p-5 min-[1180px]:p-3.5">
      <p className="px-1 text-xs font-bold uppercase tracking-wide text-[#2f6f93] sm:text-sm">
        {labels.title}
      </p>
      <div className="mt-3 grid gap-3 sm:mt-5 sm:grid-cols-2 min-[1180px]:mt-3 min-[1180px]:grid-cols-1 min-[1180px]:gap-3">
        {stations.map((station, index) => {
          const stationTip = getStationTip(station.id, station.tip, locale, routeId);
          const mobileTipPoints = getMobileTipPoints(
            station.id,
            stationTip,
            locale,
            routeId,
          );

          return (
            <article
              key={station.id}
              className="overflow-hidden rounded-2xl border border-[#eadcc7] bg-white shadow-sm"
            >
              <div className="border-b border-[#eadcc7] bg-[#f9fbff] p-3.5 sm:p-4 min-[1180px]:p-3">
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#13233a] text-sm font-black text-white min-[1180px]:h-7 min-[1180px]:w-7 min-[1180px]:text-xs">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="hidden text-lg font-black leading-tight text-[#13233a] md:block sm:text-xl min-[1180px]:text-base">
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
                <div className="mt-3 overflow-hidden rounded-xl border border-[#eadcc7] bg-white px-3 py-2 text-sm font-semibold leading-6 text-[#4f5d6c] min-[1180px]:mt-2 min-[1180px]:text-xs min-[1180px]:leading-5">
                  <span className="font-black text-[#13233a]">{labels.tip}</span>
                  <ul className="-mx-3 mt-2 flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-2 [scrollbar-width:thin] md:hidden">
                    {mobileTipPoints.map((point) => (
                      <li
                        key={point}
                        className="flex w-[17rem] flex-none snap-start gap-2 rounded-xl border border-[#eadcc7] bg-[#fffaf2] p-3 leading-5 shadow-sm"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e8b05a]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="hidden md:inline"> {stationTip}</span>
                </div>
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
          );
        })}
      </div>
    </section>
  );
}

const donMueangDepartureTips: Record<LocaleCode, string[]> = {
  en: [
    "After arriving at Don Mueang, check your ticket first: Terminal 1 is for international flights and Terminal 2 is for domestic flights.",
    "Go to the departures level and find your airline check-in row or self-service kiosk. Prepare passport or ID, ticket/booking, and baggage.",
    "After check-in and bag drop, go through security. For international flights, continue through passport control/immigration after security.",
    "Check the gate on the airport screens and walk to the gate early. Aim to be at DMK about 2 hours before departure, longer if you have baggage or an international flight.",
  ],
  pl: [
    "Po dojechaniu na Don Mueang najpierw sprawdź bilet: Terminal 1 obsługuje loty międzynarodowe, a Terminal 2 loty krajowe.",
    "Idź na poziom odlotów i znajdź rząd odprawy swojej linii albo kiosk samoobsługowy. Przygotuj paszport lub dokument, rezerwację/bilet i bagaż.",
    "Po odprawie i nadaniu bagażu przejdź kontrolę bezpieczeństwa. Przy locie międzynarodowym po kontroli przejdź jeszcze kontrolę paszportową/immigration.",
    "Sprawdź bramkę na ekranach lotniska i idź do gate wcześniej. Celuj w przyjazd na DMK około 2 godziny przed odlotem, a przy bagażu lub locie międzynarodowym zostaw większy zapas.",
  ],
  de: [
    "Nach der Ankunft am Don Mueang prüfe zuerst dein Ticket: Terminal 1 ist für internationale Flüge, Terminal 2 für Inlandsflüge.",
    "Gehe zur Abflugebene und suche die Check-in-Reihe deiner Airline oder einen Self-Service-Kiosk. Halte Pass oder Ausweis, Buchung/Ticket und Gepäck bereit.",
    "Nach Check-in und Gepäckabgabe gehst du durch die Sicherheitskontrolle. Bei internationalen Flügen folgt danach die Passkontrolle/Immigration.",
    "Prüfe dein Gate auf den Flughafenbildschirmen und gehe frühzeitig dorthin. Plane etwa 2 Stunden vor Abflug am DMK zu sein, mit Gepäck oder internationalem Flug lieber mehr.",
  ],
  fr: [
    "À l'arrivée à Don Mueang, vérifiez d'abord votre billet : le Terminal 1 est pour les vols internationaux et le Terminal 2 pour les vols domestiques.",
    "Montez au niveau des départs et trouvez le rang d'enregistrement de votre compagnie ou une borne libre-service. Préparez passeport ou pièce d'identité, réservation/billet et bagages.",
    "Après l'enregistrement et le dépôt des bagages, passez le contrôle de sécurité. Pour un vol international, continuez ensuite vers le contrôle des passeports/immigration.",
    "Vérifiez la porte sur les écrans de l'aéroport et rejoignez-la en avance. Essayez d'arriver à DMK environ 2 heures avant le départ, davantage avec bagages ou vol international.",
  ],
  ru: [
    "После прибытия в Don Mueang сначала проверьте билет: Terminal 1 — международные рейсы, Terminal 2 — внутренние рейсы.",
    "Идите на уровень вылетов и найдите стойку регистрации своей авиакомпании или киоск самообслуживания. Подготовьте паспорт или ID, билет/бронь и багаж.",
    "После регистрации и сдачи багажа пройдите контроль безопасности. Для международного рейса после него пройдите паспортный контроль/immigration.",
    "Проверьте выход на табло аэропорта и идите к gate заранее. Лучше быть в DMK примерно за 2 часа до вылета, а с багажом или международным рейсом — с большим запасом.",
  ],
  th: [
    "เมื่อถึง Don Mueang ให้ตรวจตั๋วก่อน: Terminal 1 สำหรับเที่ยวบินระหว่างประเทศ และ Terminal 2 สำหรับเที่ยวบินภายในประเทศ",
    "ไปที่ชั้นผู้โดยสารขาออก แล้วหาแถวเช็กอินของสายการบินหรือเครื่องเช็กอินอัตโนมัติ เตรียมพาสปอร์ตหรือบัตรประชาชน ตั๋ว/การจอง และสัมภาระ",
    "หลังเช็กอินและโหลดกระเป๋า ให้ผ่านจุดตรวจความปลอดภัย ถ้าเป็นเที่ยวบินระหว่างประเทศ ให้ผ่าน ตม./immigration ต่อหลังจากนั้น",
    "ตรวจประตูขึ้นเครื่องจากจอสนามบินแล้วไปที่ gate ล่วงหน้า ควรถึง DMK ประมาณ 2 ชั่วโมงก่อนบิน และเผื่อมากกว่านั้นถ้ามีกระเป๋าหรือบินระหว่างประเทศ",
  ],
  zh: [
    "到达 Don Mueang 后先看机票：Terminal 1 为国际航班，Terminal 2 为国内航班。",
    "前往出发层，找到航空公司的值机排/柜台或自助值机机。准备好护照或身份证件、机票/预订信息和行李。",
    "办理值机和托运行李后，前往安检。国际航班安检后还需要继续通过 passport control/immigration。",
    "在机场屏幕确认登机口，并提前前往 gate。建议至少提前约 2 小时到达 DMK；如果有托运行李或国际航班，请预留更多时间。",
  ],
};

function getStationTip(
  stationId: string,
  tip: string,
  locale: LocaleCode,
  routeId?: RouteId,
) {
  if (stationId === "don-mueang-airport" && routeId === "pattaya-to-don-mueang-airport") {
    return donMueangDepartureTips[locale].join(" ");
  }

  return tip;
}

function getMobileTipPoints(
  stationId: string,
  tip: string,
  locale: LocaleCode,
  routeId?: RouteId,
) {
  if (stationId === "don-mueang-airport" && routeId === "pattaya-to-don-mueang-airport") {
    return donMueangDepartureTips[locale];
  }

  if (stationId !== "north-pattaya" && stationId !== "pattaya-sukhumvit") {
    return [tip];
  }

  if (locale === "th") {
    return tip
      .split(/(?=ตัวเลือกท้องถิ่น|ถ้ามีกระเป๋า|ถ้าใช้แท็กซี่)/)
      .map((point) => point.trim())
      .filter(Boolean);
  }

  return tip
    .split(/(?<=[.!?。])\s+/)
    .map((point) => point.trim())
    .filter(Boolean);
}
