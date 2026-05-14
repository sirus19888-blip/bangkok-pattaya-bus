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
    <section
      className="rounded-2xl border border-[#eadcc7] bg-[#fffaf2] p-3 shadow-sm sm:p-5"
      data-visual-qa="station-info"
    >
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
          const hasMobileShowMore = hasHiddenMobileDetails || Boolean(station.googleMapsUrl);

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
                  {hasMobileShowMore ? (
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
                <div className="md:hidden">
                  <a
                    href={station.googleMapsUrl}
                    className="flex min-h-11 w-full items-center justify-center rounded-xl bg-[#13233a] px-4 text-center text-sm font-black text-white transition hover:bg-[#233a5b]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {labels.openInGoogleMaps}
                  </a>
                </div>
                <div className={isExpanded ? "block" : "hidden md:block"}>
                  <StationMiniMap
                    station={station}
                    locale={locale}
                    openInGoogleMapsLabel={labels.openInGoogleMaps}
                  />
                </div>
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

const suvarnabhumiDepartureTips: Record<LocaleCode, string[]> = {
  en: [
    "After the bus reaches Suvarnabhumi, enter the terminal and follow signs to Departures / Level 4 for check-in.",
    "Check your flight on the airport screens, then find your airline check-in row or self-service kiosk. Keep passport, booking, boarding pass if already checked in, and baggage ready.",
    "After check-in and bag drop, follow signs to security screening. For international flights, continue to passport control/immigration after security.",
    "Suvarnabhumi is large, so check your gate early and start walking before boarding time. Aim to be at the airport about 3 hours before international flights and about 2 hours before domestic flights.",
  ],
  pl: [
    "Po dojechaniu autobusem na Suvarnabhumi wejdź do terminala i kieruj się znakami Departures / Level 4, gdzie znajduje się odprawa.",
    "Sprawdź lot na ekranach lotniska, potem znajdź rząd odprawy swojej linii albo kiosk samoobsługowy. Przygotuj paszport, rezerwację, kartę pokładową jeśli masz online check-in i bagaż.",
    "Po odprawie i nadaniu bagażu idź za znakami do kontroli bezpieczeństwa. Przy locie międzynarodowym po security przejdź jeszcze passport control/immigration.",
    "Suvarnabhumi jest duże, więc sprawdź gate wcześniej i zacznij iść przed boardingiem. Celuj w przyjazd około 3 godziny przed lotem międzynarodowym i około 2 godziny przed lotem krajowym.",
  ],
  de: [
    "Nach der Ankunft mit dem Bus in Suvarnabhumi gehst du in das Terminal und folgst den Schildern zu Departures / Level 4 für den Check-in.",
    "Prüfe deinen Flug auf den Flughafenbildschirmen und suche dann die Check-in-Reihe deiner Airline oder einen Self-Service-Kiosk. Halte Pass, Buchung, Boardingpass falls online eingecheckt, und Gepäck bereit.",
    "Nach Check-in und Gepäckabgabe folgst du den Schildern zur Sicherheitskontrolle. Bei internationalen Flügen gehst du danach weiter zur Passkontrolle/Immigration.",
    "Suvarnabhumi ist groß, deshalb prüfe dein Gate früh und gehe vor dem Boarding los. Plane etwa 3 Stunden vor internationalen Flügen und etwa 2 Stunden vor Inlandsflügen am Flughafen zu sein.",
  ],
  fr: [
    "Après l'arrivée du bus à Suvarnabhumi, entrez dans le terminal et suivez les panneaux Departures / Level 4 pour l'enregistrement.",
    "Vérifiez votre vol sur les écrans de l'aéroport, puis trouvez le rang d'enregistrement de votre compagnie ou une borne libre-service. Préparez passeport, réservation, carte d'embarquement si déjà enregistrée, et bagages.",
    "Après l'enregistrement et le dépôt des bagages, suivez les panneaux vers le contrôle de sécurité. Pour un vol international, continuez ensuite vers le contrôle des passeports/immigration.",
    "Suvarnabhumi est grand : vérifiez votre porte tôt et commencez à marcher avant l'embarquement. Visez environ 3 heures avant un vol international et environ 2 heures avant un vol domestique.",
  ],
  ru: [
    "После прибытия автобуса в Suvarnabhumi войдите в терминал и следуйте указателям Departures / Level 4 к регистрации.",
    "Проверьте рейс на табло аэропорта, затем найдите стойку регистрации вашей авиакомпании или киоск самообслуживания. Подготовьте паспорт, бронь, посадочный талон если уже зарегистрировались онлайн, и багаж.",
    "После регистрации и сдачи багажа следуйте указателям к контролю безопасности. Для международного рейса после security пройдите passport control/immigration.",
    "Suvarnabhumi большой, поэтому проверьте gate заранее и начните идти до начала посадки. Лучше быть в аэропорту примерно за 3 часа до международного рейса и за 2 часа до внутреннего.",
  ],
  th: [
    "เมื่อรถบัสถึง Suvarnabhumi ให้เข้าอาคารผู้โดยสาร แล้วตามป้าย Departures / Level 4 เพื่อไปเช็กอิน",
    "ตรวจเที่ยวบินบนจอสนามบิน จากนั้นหาแถวเช็กอินของสายการบินหรือเครื่องเช็กอินอัตโนมัติ เตรียมพาสปอร์ต การจอง boarding pass ถ้าเช็กอินออนไลน์แล้ว และสัมภาระ",
    "หลังเช็กอินและโหลดกระเป๋า ให้ตามป้ายไปจุดตรวจความปลอดภัย ถ้าเป็นเที่ยวบินระหว่างประเทศ หลัง security ให้ผ่าน passport control/immigration ต่อ",
    "Suvarnabhumi ใหญ่มาก ควรตรวจ gate ล่วงหน้าและเริ่มเดินก่อนเวลา boarding ควรถึงสนามบินประมาณ 3 ชั่วโมงก่อนเที่ยวบินระหว่างประเทศ และประมาณ 2 ชั่วโมงก่อนเที่ยวบินภายในประเทศ",
  ],
  zh: [
    "巴士到达 Suvarnabhumi 后，进入航站楼并跟随 Departures / Level 4 标识前往值机区。",
    "先在机场屏幕确认航班，再找到航空公司的值机排/柜台或自助值机机。准备好护照、预订信息、如已网上值机则准备登机牌，以及行李。",
    "办理值机和托运行李后，跟随标识前往安检。国际航班在 security 后还需要继续通过 passport control/immigration。",
    "Suvarnabhumi 很大，请提前确认 gate，并在登机前开始步行前往。建议国际航班提前约 3 小时到达机场，国内航班提前约 2 小时到达。",
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
    "Po lądowaniu kieruj się za znakami Arrivals, przejdź kontrolę paszportową jeśli dotyczy, odbierz bagaż i wyjdź przez customs do publicznej hali przylotów.",
    "Zejdź na Level 1 / Ground Transportation i szukaj Gate 8. Airport Pattaya Bus / Roong Reuang Coach sprzedaje bilety do Pattaya przy stanowisku obsługi w pobliżu Gate 8.",
    "Pokaż paszport albo rezerwację jeśli ją masz, kup lub odbierz bilet i zapytaj, czy autobus jedzie do Jomtien Bus Station czy North Pattaya. Operator informuje, że późny autobus o 22:00 jedzie do North Pattaya, nie do Jomtien.",
    "Nie planuj zbyt krótkiej przesiadki po lądowaniu. Zostaw minimum 1,5 godziny od planowanego lądowania do odjazdu autobusu na immigration, bagaż, przejście przez lotnisko i znalezienie stanowiska.",
  ],
  de: [
    "Nach der Landung folge Arrivals, gehe falls nötig durch die Passkontrolle, hole dein Gepäck und gehe durch den Zoll in die öffentliche Ankunftshalle.",
    "Gehe hinunter zu Level 1 / Ground Transportation und suche Gate 8. Airport Pattaya Bus / Roong Reuang Coach verkauft Pattaya-Tickets am Serviceschalter nahe Gate 8.",
    "Zeige Pass oder Buchung, falls vorhanden, kaufe oder hole dein Ticket ab und frage, ob der Bus zur Jomtien Bus Station oder nach North Pattaya fährt. Der Betreiber weist darauf hin, dass der späte Bus um 22:00 nach North Pattaya fährt, nicht nach Jomtien.",
    "Plane nach der Landung keine knappe Verbindung. Lass mindestens 1,5 Stunden von der geplanten Landung bis zur Busabfahrt für Immigration, Gepäck, Wege im Flughafen und den Schalter.",
  ],
  fr: [
    "Après l'atterrissage, suivez Arrivals, passez l'immigration si nécessaire, récupérez vos bagages puis sortez par la douane vers le hall public des arrivées.",
    "Descendez au Level 1 / Ground Transportation et cherchez Gate 8. Airport Pattaya Bus / Roong Reuang Coach vend les billets pour Pattaya au comptoir près de Gate 8.",
    "Montrez votre passeport ou votre réservation si vous en avez une, achetez ou récupérez le billet, puis demandez si le bus va à Jomtien Bus Station ou à North Pattaya. L'opérateur indique que le bus tardif de 22:00 va à North Pattaya, pas à Jomtien.",
    "Ne prévoyez pas une correspondance trop courte après l'atterrissage. Gardez au moins 1 h 30 entre l'atterrissage prévu et le départ du bus pour l'immigration, les bagages, la marche dans l'aéroport et le comptoir.",
  ],
  ru: [
    "После посадки следуйте указателям Arrivals, при необходимости пройдите паспортный контроль, получите багаж и выйдите через таможню в общую зону прилёта.",
    "Спуститесь на Level 1 / Ground Transportation и ищите Gate 8. Airport Pattaya Bus / Roong Reuang Coach продаёт билеты в Паттайю у стойки рядом с Gate 8.",
    "Покажите паспорт или бронь, если она есть, купите или получите билет и уточните, идёт ли автобус до Jomtien Bus Station или North Pattaya. Оператор указывает, что поздний автобус в 22:00 идёт в North Pattaya, не в Jomtien.",
    "Не планируйте слишком короткую пересадку после прилёта. Оставьте минимум 1,5 часа от плановой посадки до отправления автобуса на immigration, багаж, путь по аэропорту и поиск стойки.",
  ],
  th: [
    "หลังเครื่องลง ให้ตามป้าย Arrivals ผ่าน ตม. หากจำเป็น รับกระเป๋า แล้วออกผ่านศุลกากรไปยังโถงผู้โดยสารขาเข้าฝั่งสาธารณะ",
    "ลงไป Level 1 / Ground Transportation แล้วหา Gate 8 เคาน์เตอร์ Airport Pattaya Bus / Roong Reuang Coach ขายตั๋วไปพัทยาอยู่ใกล้ Gate 8",
    "แสดงพาสปอร์ตหรือการจองถ้ามี ซื้อตั๋วหรือรับตั๋ว แล้วถามว่ารถไป Jomtien Bus Station หรือ North Pattaya ผู้ให้บริการระบุว่ารถเที่ยวดึก 22:00 ไป North Pattaya ไม่ไป Jomtien",
    "อย่าวางแผนต่อรถแน่นเกินไปหลังลงเครื่อง ควรเผื่ออย่างน้อย 1.5 ชั่วโมงจากเวลาลงเครื่องถึงเวลาออกของรถ สำหรับ ตม. รับกระเป๋า เดินในสนามบิน และหาเคาน์เตอร์",
  ],
  zh: [
    "落地后跟随 Arrivals 标识；如需入境，先通过边检，再领取行李，并通过海关进入公共到达大厅。",
    "前往 Level 1 / Ground Transportation，寻找 Gate 8。Airport Pattaya Bus / Roong Reuang Coach 前往芭提雅的售票柜台在 Gate 8 附近。",
    "出示护照或预订信息（如有），购买或领取车票，并确认巴士是去 Jomtien Bus Station 还是 North Pattaya。运营商提示，晚间 22:00 班次去 North Pattaya，不去 Jomtien。",
    "不要安排太紧的落地衔接。建议从预计落地到巴士发车至少预留 1.5 小时，用于入境、取行李、在机场步行和找到柜台。",
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
    "Z hotelu najpierw otwórz North Pattaya Bus Terminal w Google Maps i sprawdź, czy jesteś w Central Pattaya, Beach Road, Jomtien, Pratumnak, Naklua albo blisko Terminal 21.",
    "Z lekkim bagażem najtańszy jest songthaew/baht bus: około 15 THB w tej samej strefie miasta i około 20 THB przy przejeździe z Jomtien lub Naklua; licz około 20-45 minut, bo możesz musieć zmienić trasę albo dojść z głównej drogi.",
    "Z walizkami, w deszczu, upale albo przy bliskim odjeździe autobusu wybierz Grab/Bolt: zwykle około 80-150 THB z Central Pattaya lub Terminal 21, 100-180 THB z Beach Road/Pratumnak i 150-250 THB z Jomtien albo dalszej Naklua, zależnie od ruchu i popytu.",
    "Prywatną taksówkę lub wynajęty songthaew ustal przed wejściem; licz około 120-250 THB z centralnych dzielnic i 200-350 THB z Jomtien albo dalszej Naklua. Wyjedź 45-60 minut przed autobusem z centrum Pattayi i 60-90 minut wcześniej z Jomtien, Pratumnak albo Naklua.",
  ],
  de: [
    "Öffne vom Hotel zuerst North Pattaya Bus Terminal in Google Maps und prüfe, ob du in Central Pattaya, Beach Road, Jomtien, Pratumnak, Naklua oder nahe Terminal 21 bist.",
    "Mit leichtem Gepäck ist Songthaew/Baht Bus am günstigsten: etwa 15 THB innerhalb derselben Stadtzone und etwa 20 THB aus Jomtien oder Naklua; plane etwa 20-45 Minuten, weil du eventuell umsteigen oder von der Hauptstraße laufen musst.",
    "Mit Koffern, Regen, Hitze oder knapper Busabfahrt nutze Grab/Bolt: häufig etwa 80-150 THB aus Central Pattaya oder Terminal 21, 100-180 THB von Beach Road/Pratumnak und 150-250 THB aus Jomtien oder weiterem Naklua, je nach Verkehr und Nachfrage.",
    "Ein privates Taxi oder gechartertes Songthaew immer vor dem Einsteigen vereinbaren; rechne grob mit 120-250 THB aus zentralen Bereichen und 200-350 THB aus Jomtien oder weiterem Naklua. Fahre 45-60 Minuten vor deinem Bus aus Central Pattaya los, und 60-90 Minuten vorher aus Jomtien, Pratumnak oder Naklua.",
  ],
  fr: [
    "Depuis votre hôtel, ouvrez d'abord North Pattaya Bus Terminal dans Google Maps et vérifiez si vous êtes à Central Pattaya, Beach Road, Jomtien, Pratumnak, Naklua ou près de Terminal 21.",
    "Avec peu de bagages, le songthaew/baht bus est le moins cher : environ 15 THB dans la même zone urbaine et environ 20 THB depuis Jomtien ou Naklua ; prévoyez environ 20-45 minutes car il peut falloir changer de route ou marcher depuis la route principale.",
    "Avec des valises, sous la pluie, par forte chaleur ou si le départ du bus est proche, utilisez Grab/Bolt : souvent environ 80-150 THB depuis Central Pattaya ou Terminal 21, 100-180 THB depuis Beach Road/Pratumnak et 150-250 THB depuis Jomtien ou le nord de Naklua selon le trafic et la demande.",
    "Pour un taxi privé ou un songthaew affrété, convenez du prix avant de monter ; comptez environ 120-250 THB depuis les zones centrales et 200-350 THB depuis Jomtien ou le nord de Naklua. Partez 45-60 minutes avant le bus depuis le centre de Pattaya, et 60-90 minutes avant depuis Jomtien, Pratumnak ou Naklua.",
  ],
  ru: [
    "Из отеля сначала откройте North Pattaya Bus Terminal в Google Maps и проверьте, где вы находитесь: Central Pattaya, Beach Road, Jomtien, Pratumnak, Naklua или рядом с Terminal 21.",
    "С лёгким багажом дешевле всего сонгтео/baht bus: около 15 THB в пределах одной городской зоны и около 20 THB из Jomtien или Naklua; закладывайте 20-45 минут, потому что может понадобиться пересадка или пеший проход от главной дороги.",
    "С чемоданами, в дождь, жару или если автобус скоро отправляется, используйте Grab/Bolt: обычно около 80-150 THB из Central Pattaya или Terminal 21, 100-180 THB с Beach Road/Pratumnak и 150-250 THB из Jomtien или дальней Naklua, в зависимости от трафика и спроса.",
    "Частное такси или заказанное сонгтео согласуйте до посадки; ориентир — 120-250 THB из центральных районов и 200-350 THB из Jomtien или дальней Naklua. Выезжайте за 45-60 минут до автобуса из центра Pattaya и за 60-90 минут из Jomtien, Pratumnak или Naklua.",
  ],
  th: [
    "จากโรงแรม ให้เปิด North Pattaya Bus Terminal ใน Google Maps ก่อน แล้วดูว่าคุณอยู่ใน Central Pattaya, Beach Road, Jomtien, Pratumnak, Naklua หรือใกล้ Terminal 21",
    "ถ้ามีกระเป๋าไม่มาก สองแถว/baht bus ถูกที่สุด: ประมาณ 15 THB ในโซนเมืองเดียวกัน และประมาณ 20 THB จาก Jomtien หรือ Naklua ควรเผื่อเวลา 20-45 นาที เพราะอาจต้องเปลี่ยนเส้นทางหรือเดินจากถนนหลัก",
    "ถ้ามีกระเป๋า ฝนตก อากาศร้อน หรือใกล้เวลาออกของรถบัส ให้ใช้ Grab/Bolt: โดยทั่วไปประมาณ 80-150 THB จาก Central Pattaya หรือ Terminal 21, 100-180 THB จาก Beach Road/Pratumnak และ 150-250 THB จาก Jomtien หรือไกลใน Naklua",
    "ถ้าใช้แท็กซี่ส่วนตัวหรือเหมาสองแถว ให้ตกลงราคาก่อนขึ้นรถ โดยประมาณ 120-250 THB จากย่านกลางเมือง และ 200-350 THB จาก Jomtien หรือไกลใน Naklua ควรออกก่อนเวลารถบัส 45-60 นาทีจากกลางพัทยา และ 60-90 นาทีจาก Jomtien, Pratumnak หรือ Naklua",
  ],
  zh: [
    "从酒店出发时，先在 Google Maps 打开 North Pattaya Bus Terminal，确认自己位于 Central Pattaya、Beach Road、Jomtien、Pratumnak、Naklua 还是 Terminal 21 附近。",
    "行李少时，songthaew/baht bus 最便宜：同一城市区域内约 15 THB，从 Jomtien 或 Naklua 跨区约 20 THB；请预留约 20-45 分钟，因为可能需要换车或从主路步行。",
    "带行李、下雨、天气很热或巴士快发车时，建议使用 Grab/Bolt：从 Central Pattaya 或 Terminal 21 通常约 80-150 THB，从 Beach Road/Pratumnak 约 100-180 THB，从 Jomtien 或较远的 Naklua 约 150-250 THB，取决于交通和需求。",
    "私人出租车或包 songthaew 请上车前谈好价格；市中心区域大约 120-250 THB，Jomtien 或较远 Naklua 大约 200-350 THB。如果在芭提雅中心，请提前 45-60 分钟从酒店出发；如果在 Jomtien、Pratumnak 或 Naklua，请提前 60-90 分钟出发。",
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
    "Po wysiadce na Mo Chit 2 najpierw otwórz adres hotelu w Google Maps i sprawdź, czy jedziesz w stronę Sukhumvit, Siam, Silom, Riverside, Khao San czy Don Mueang.",
    "Najtaniej do miasta: dojedź do BTS Mo Chit albo MRT Chatuchak Park; są około 2 km od terminala. Weź krótki taxi/Grab albo motorbike taxi do stacji, potem jedź BTS/MRT. BTS kosztuje zwykle około 17-65 THB, a MRT około 17-45 THB zależnie od dystansu.",
    "Z bagażem, w deszczu, upale albo późnym przyjazdem wybierz Grab/Bolt lub taxi bezpośrednio z terminala. Licz około 120-250 THB do Sukhumvit/Siam, 180-350 THB do Silom/Riverside i 180-350 THB do Khao San, zależnie od korków i popytu.",
    "Przy zwykłej taksówce poproś o taksometr albo ustal cenę przed wejściem. Korki w Bangkoku bywają duże, więc BTS/MRT jest często bezpieczniejszy dla Sukhumvit, Siam, Silom i okolic centrów handlowych.",
  ],
  de: [
    "Nach dem Ausstieg am Mo Chit 2 öffne zuerst die Hoteladresse in Google Maps und prüfe, ob du nach Sukhumvit, Siam, Silom, Riverside, Khao San oder Don Mueang musst.",
    "Am günstigsten in die Stadt: Fahre zu BTS Mo Chit oder MRT Chatuchak Park; beide liegen etwa 2 km vom Terminal entfernt. Nimm ein kurzes Taxi/Grab oder Motorradtaxi zur Station und fahre dann mit BTS/MRT weiter. BTS kostet meist etwa 17-65 THB, MRT etwa 17-45 THB je nach Strecke.",
    "Mit Gepäck, Regen, Hitze oder später Ankunft nutze Grab/Bolt oder Taxi direkt ab Terminal. Rechne grob mit 120-250 THB nach Sukhumvit/Siam, 180-350 THB nach Silom/Riverside und 180-350 THB nach Khao San, je nach Verkehr und Nachfrage.",
    "Beim Straßentaxi um Meter bitten oder den Preis vor dem Einsteigen vereinbaren. Bangkok-Verkehr kann stark sein, deshalb ist BTS/MRT oft sicherer für Sukhumvit, Siam, Silom und Einkaufsviertel.",
  ],
  fr: [
    "Après être descendu à Mo Chit 2, ouvrez d'abord l'adresse de votre hôtel dans Google Maps et vérifiez si vous allez vers Sukhumvit, Siam, Silom, Riverside, Khao San ou Don Mueang.",
    "Pour rejoindre la ville au moindre coût, allez à BTS Mo Chit ou MRT Chatuchak Park ; ils sont à environ 2 km du terminal. Prenez un court taxi/Grab ou moto-taxi jusqu'à la station, puis continuez en BTS/MRT. Le BTS coûte généralement environ 17-65 THB et le MRT environ 17-45 THB selon la distance.",
    "Avec des bagages, sous la pluie, par forte chaleur ou en arrivée tardive, utilisez Grab/Bolt ou un taxi directement depuis le terminal. Comptez environ 120-250 THB vers Sukhumvit/Siam, 180-350 THB vers Silom/Riverside et 180-350 THB vers Khao San selon le trafic et la demande.",
    "En taxi de rue, demandez le compteur ou convenez du prix avant de monter. Le trafic à Bangkok peut être dense, donc BTS/MRT est souvent plus sûr pour Sukhumvit, Siam, Silom et les quartiers de shopping.",
  ],
  ru: [
    "После выхода на Mo Chit 2 сначала откройте адрес отеля в Google Maps и проверьте направление: Sukhumvit, Siam, Silom, Riverside, Khao San или Don Mueang.",
    "Самый дешёвый путь в город — доехать до BTS Mo Chit или MRT Chatuchak Park; они примерно в 2 км от терминала. Возьмите короткий taxi/Grab или мототакси до станции, затем продолжайте на BTS/MRT. BTS обычно стоит около 17-65 THB, MRT около 17-45 THB в зависимости от расстояния.",
    "С багажом, в дождь, жару или при позднем приезде используйте Grab/Bolt или такси прямо от терминала. Ориентир: 120-250 THB до Sukhumvit/Siam, 180-350 THB до Silom/Riverside и 180-350 THB до Khao San, в зависимости от трафика и спроса.",
    "В уличном такси попросите включить счётчик или договоритесь о цене до посадки. В Бангкоке бывают сильные пробки, поэтому BTS/MRT часто надёжнее для Sukhumvit, Siam, Silom и торговых районов.",
  ],
  th: [
    "หลังลงรถที่ Mo Chit 2 ให้เปิดที่อยู่โรงแรมใน Google Maps ก่อน แล้วดูว่าต้องไปทาง Sukhumvit, Siam, Silom, Riverside, Khao San หรือ Don Mueang",
    "วิธีเข้าเมืองที่ประหยัดที่สุดคือไป BTS Mo Chit หรือ MRT Chatuchak Park ซึ่งอยู่ห่างจากเทอร์มินัลประมาณ 2 กม. นั่ง taxi/Grab สั้น ๆ หรือมอเตอร์ไซค์รับจ้างไปสถานี แล้วต่อ BTS/MRT ค่า BTS มักประมาณ 17-65 THB และ MRT ประมาณ 17-45 THB ตามระยะทาง",
    "ถ้ามีกระเป๋า ฝนตก อากาศร้อน หรือมาถึงดึก ให้ใช้ Grab/Bolt หรือแท็กซี่จากเทอร์มินัลโดยตรง โดยประมาณ 120-250 THB ไป Sukhumvit/Siam, 180-350 THB ไป Silom/Riverside และ 180-350 THB ไป Khao San ขึ้นกับรถติดและความต้องการเรียกรถ",
    "ถ้าใช้แท็กซี่ริมถนน ให้ขอมิเตอร์หรือคุยราคาก่อนขึ้นรถ รถติดในกรุงเทพฯ อาจหนัก ดังนั้น BTS/MRT มักปลอดภัยกว่าเวลาจะไป Sukhumvit, Siam, Silom และย่านห้าง",
  ],
  zh: [
    "到达 Mo Chit 2 下车后，先在 Google Maps 打开酒店地址，确认你要去 Sukhumvit、Siam、Silom、Riverside、Khao San 还是 Don Mueang。",
    "最便宜的进城方式是先到 BTS Mo Chit 或 MRT Chatuchak Park；它们距离车站约 2 公里。可先坐短途 taxi/Grab 或摩托车出租到车站，再换乘 BTS/MRT。BTS 通常约 17-65 THB，MRT 约 17-45 THB，取决于距离。",
    "如果有行李、下雨、天气很热或较晚到达，建议从车站直接用 Grab/Bolt 或出租车。到 Sukhumvit/Siam 约 120-250 THB，到 Silom/Riverside 约 180-350 THB，到 Khao San 约 180-350 THB，取决于交通和需求。",
    "乘坐路边出租车时，请要求打表或上车前谈好价格。曼谷堵车可能很严重，所以前往 Sukhumvit、Siam、Silom 和购物区时，BTS/MRT 通常更稳妥。",
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
    "Po wysiadce na Ekkamai Bus Terminal najpierw otwórz adres hotelu w Google Maps i sprawdź, czy jedziesz w stronę Sukhumvit, Siam, Silom, Riverside, Khao San albo Airport Rail Link.",
    "Do większości hoteli w mieście najłatwiej jechać BTS: stacja BTS Ekkamai jest obok terminala. Przejdź do BTS Ekkamai Exit 2 i jedź linią Sukhumvit/Green Line. Bilet BTS kosztuje zwykle około 17-65 THB zależnie od dystansu.",
    "BTS wybierz dla Sukhumvit, Asok, Nana, Phrom Phong, Siam i okolic centrów handlowych. Do Silom przesiądź się na Siam na linię Silom albo jedź do Asok/Sukhumvit i połącz z MRT, jeśli tak jest bliżej hotelu.",
    "Z dużym bagażem, w deszczu albo przy hotelu w Khao San/Riverside wybierz Grab/Bolt lub taxi z taksometrem. Licz około 80-180 THB do pobliskiego Sukhumvit/Siam, 150-300 THB do Silom/Riverside i 180-350 THB do Khao San, zależnie od korków. Poproś o taksometr albo ustal cenę przed wejściem.",
  ],
  de: [
    "Nach dem Ausstieg am Ekkamai Bus Terminal öffne zuerst die Hoteladresse in Google Maps und prüfe, ob du nach Sukhumvit, Siam, Silom, Riverside, Khao San oder zum Airport Rail Link musst.",
    "Für die meisten Stadthotels ist BTS am einfachsten: BTS Ekkamai liegt direkt neben dem Terminal. Gehe zu BTS Ekkamai Exit 2 und fahre mit der Sukhumvit/Green Line weiter. BTS kostet je nach Strecke meist etwa 17-65 THB.",
    "Nutze BTS für Sukhumvit, Asok, Nana, Phrom Phong, Siam und Einkaufsviertel. Nach Silom steigst du in Siam in die Silom Line um, oder fährst nach Asok/Sukhumvit und wechselst zur MRT, wenn das näher am Hotel ist.",
    "Mit viel Gepäck, Regen oder Hotel in Khao San/Riverside nutze Grab/Bolt oder ein Taxi mit Meter. Rechne grob mit 80-180 THB nach Sukhumvit/Siam in der Nähe, 150-300 THB nach Silom/Riverside und 180-350 THB nach Khao San, je nach Verkehr. Bitte um Meter oder vereinbare den Preis vor dem Einsteigen.",
  ],
  fr: [
    "Après être descendu à Ekkamai Bus Terminal, ouvrez d'abord l'adresse de votre hôtel dans Google Maps et vérifiez si vous allez vers Sukhumvit, Siam, Silom, Riverside, Khao San ou l'Airport Rail Link.",
    "Pour la plupart des hôtels en ville, le BTS est le plus simple : BTS Ekkamai est juste à côté du terminal. Marchez jusqu'à BTS Ekkamai Exit 2 et continuez sur la ligne Sukhumvit/Green Line. Le BTS coûte généralement environ 17-65 THB selon la distance.",
    "Utilisez le BTS pour Sukhumvit, Asok, Nana, Phrom Phong, Siam et les quartiers de shopping. Pour Silom, changez à Siam vers la Silom Line, ou allez à Asok/Sukhumvit pour prendre le MRT si c'est plus proche de votre hôtel.",
    "Avec beaucoup de bagages, sous la pluie ou si vous logez à Khao San/Riverside, utilisez Grab/Bolt ou un taxi au compteur. Comptez environ 80-180 THB vers Sukhumvit/Siam proche, 150-300 THB vers Silom/Riverside et 180-350 THB vers Khao San selon le trafic. Demandez le compteur ou convenez du prix avant de monter.",
  ],
  ru: [
    "После выхода на Ekkamai Bus Terminal сначала откройте адрес отеля в Google Maps и проверьте направление: Sukhumvit, Siam, Silom, Riverside, Khao San или Airport Rail Link.",
    "Для большинства городских отелей проще всего BTS: станция BTS Ekkamai находится рядом с терминалом. Идите к BTS Ekkamai Exit 2 и продолжайте по Sukhumvit/Green Line. BTS обычно стоит около 17-65 THB в зависимости от расстояния.",
    "Используйте BTS для Sukhumvit, Asok, Nana, Phrom Phong, Siam и торговых районов. Для Silom сделайте пересадку на Siam на Silom Line или доедьте до Asok/Sukhumvit и перейдите на MRT, если так ближе к отелю.",
    "С большим багажом, в дождь или если отель в Khao San/Riverside, используйте Grab/Bolt или такси по счётчику. Ориентир: 80-180 THB до ближайших Sukhumvit/Siam, 150-300 THB до Silom/Riverside и 180-350 THB до Khao San, в зависимости от трафика. Попросите включить счётчик или договоритесь о цене до посадки.",
  ],
  th: [
    "หลังลงรถที่ Ekkamai Bus Terminal ให้เปิดที่อยู่โรงแรมใน Google Maps ก่อน แล้วดูว่าต้องไปทาง Sukhumvit, Siam, Silom, Riverside, Khao San หรือ Airport Rail Link",
    "สำหรับโรงแรมส่วนใหญ่ในเมือง BTS ง่ายที่สุด: สถานี BTS Ekkamai อยู่ติดกับเทอร์มินัล เดินไป BTS Ekkamai Exit 2 แล้วต่อสาย Sukhumvit/Green Line ค่า BTS มักประมาณ 17-65 THB ตามระยะทาง",
    "ใช้ BTS สำหรับ Sukhumvit, Asok, Nana, Phrom Phong, Siam และย่านห้าง ถ้าไป Silom ให้เปลี่ยนสายที่ Siam ไป Silom Line หรือไป Asok/Sukhumvit แล้วต่อ MRT ถ้าใกล้โรงแรมกว่า",
    "ถ้ามีกระเป๋าเยอะ ฝนตก หรือพักแถว Khao San/Riverside ให้ใช้ Grab/Bolt หรือแท็กซี่มิเตอร์ โดยประมาณ 80-180 THB ไป Sukhumvit/Siam ใกล้ ๆ, 150-300 THB ไป Silom/Riverside และ 180-350 THB ไป Khao San ขึ้นกับรถติด ควรขอมิเตอร์หรือคุยราคาก่อนขึ้นรถ",
  ],
  zh: [
    "到达 Ekkamai Bus Terminal 下车后，先在 Google Maps 打开酒店地址，确认你要去 Sukhumvit、Siam、Silom、Riverside、Khao San 还是 Airport Rail Link。",
    "大多数市区酒店最方便的是 BTS：BTS Ekkamai 站就在车站旁边。步行到 BTS Ekkamai Exit 2，然后乘坐 Sukhumvit/Green Line。BTS 票价通常约 17-65 THB，取决于距离。",
    "前往 Sukhumvit、Asok、Nana、Phrom Phong、Siam 和购物区可使用 BTS。去 Silom 可在 Siam 换乘 Silom Line，或到 Asok/Sukhumvit 换 MRT，如果那样更靠近酒店。",
    "如果行李多、下雨，或住在 Khao San/Riverside，建议使用 Grab/Bolt 或打表出租车。到附近 Sukhumvit/Siam 约 80-180 THB，到 Silom/Riverside 约 150-300 THB，到 Khao San 约 180-350 THB，取决于交通。请要求打表或上车前谈好价格。",
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
    .split(/(?<=[.!?。])\s+/)
    .map((point) => point.trim())
    .filter(Boolean);
}
