import type { LocaleCode, RouteId } from "@/data/routes";

type LocalizedText = Record<"en" | "pl", string> & {
  fr?: string;
  ru?: string;
  th?: string;
  zh?: string;
};

export type StationAccessGuide = {
  routeId: RouteId;
  title: LocalizedText;
  items: LocalizedText[];
  note: LocalizedText;
};

type PlainStationAccessGuide = {
  title: string;
  items: string[];
  note: string;
};

const germanTransportPriceNote =
  "Transportpreise können sich ändern. Preise in Fahr-Apps hängen von Verkehr, Nachfrage und Abholort ab.";

const germanStationAccessGuides: Record<RouteId, PlainStationAccessGuide> = {
  "bangkok-to-pattaya": {
    title: "So kommst du zum Busbahnhof Ekkamai",
    items: [
      "Mit BTS: Nimm die Sukhumvit-Linie bis zur Station Ekkamai. Der Busbahnhof ist meist etwa 5 Minuten zu Fuß entfernt.",
      "Mit Taxi oder Grab: Gut, wenn du Gepäck hast. Der Preis hängt von Verkehr und Abholort ab. Prüfe den Fahrpreis in der App vor der Buchung.",
      "Tuk-Tuks besser meiden, wenn der Preis nicht vorher klar ist. In Touristengebieten können sie teurer sein als erwartet.",
      "Tipp: Komm 20–30 Minuten vor Abfahrt an, um dein Ticket zu kaufen und den richtigen Bussteig zu finden."
    ],
    note: germanTransportPriceNote
  },
  "pattaya-to-bangkok": {
    title: "So kommst du zum Busbahnhof Nord-Pattaya",
    items: [
      "Mit Songthaew: Ein gemeinsames Songthaew kann günstig sein, wenn es in die richtige Richtung fährt. Für Erstbesucher sind die Routen nicht immer klar.",
      "Mit Taxi oder Grab: Meist die einfachste Option ab Hotel oder Strandbereich. Der Preis hängt von Entfernung, Verkehr und Nachfrage ab.",
      "Aus dem Zentrum von Pattaya: Plane extra Zeit ein, besonders nachmittags und am Wochenende.",
      "Tipp: Prüfe vor dem Ticketkauf, ob dein Bus nach Ekkamai oder Mo Chit 2 fährt."
    ],
    note: germanTransportPriceNote
  },
  "suvarnabhumi-airport-to-pattaya": {
    title: "So findest du den Busschalter am Flughafen",
    items: [
      "Nach der Ankunft: Plane Zeit für Einreise, Gepäckausgabe und Wege im Flughafen ein.",
      "Busschalter: Aktuelle Routendaten nennen Ebene 1 nahe Gate 8. Folge den Schildern und bestätige es am Schalter.",
      "Airport Rail Link: Für diesen Bus nicht nötig, aber hilfreich, wenn du nach Bangkok fährst. Die Fahrt kostet meist 15–45 Baht je nach Entfernung.",
      "Taxi oder Grab: Nützlich, wenn du den Bus verpasst oder spät reist. Der Preis hängt von Verkehr, Maut und Nachfrage ab.",
      "Tipp: Dieser Hinweis betrifft die separate stündliche Verbindung Suvarnabhumi–Jomtien für 151 THB, nicht den auf dieser Seite beschriebenen Bus für 130 THB. Deren Abfahrt um 22:00 endet am Busbahnhof Pattaya und hält nicht in Jomtien. Beide Verbindungen fahren im selben Bereich bei Gate 8 ab; bestätige daher die Route am Schalter."
    ],
    note: germanTransportPriceNote
  },
  "pattaya-to-suvarnabhumi-airport": {
    title: "So kommst du zum Flughafenbus in Pattaya",
    items: [
      "Vom Hotel: Taxi oder Grab ist mit Gepäck meist am einfachsten. Der Preis hängt von Entfernung, Verkehr und Nachfrage ab.",
      "Mit Songthaew: Kann günstig sein, wenn die Route passt. Wenn du Pattaya nicht kennst, plane extra Zeit ein.",
      "Busbahnhof Jomtien: Der Betreiber nennt Tickets am Serviceschalter. Bestätige den genauen Einstieg vor der Fahrt.",
      "Tipp: Plane genug Puffer für Verkehr, Check-in, Sicherheitskontrolle und Einreiseformalitäten am Flughafen ein."
    ],
    note: germanTransportPriceNote
  },
  "don-mueang-airport-to-pattaya": {
    title: "So findest du den Busbereich am Flughafen Don Mueang",
    items: [
      "Nach der Landung: Folge den Schildern Arrivals, erledige Passkontrolle falls nötig, hole dein Gepäck und gehe in den öffentlichen Ankunftsbereich auf Ebene 1.",
      "Wenn du in Terminal 1 ankommst, gehe zum Serviceschalter am International Passenger Terminal, Building 1, Floor 1, Gate 1. Bei Terminal 2 nennt die Flughafenseite Building 2, Floor 1, Gate 11.",
      "Frage dort nach dem Transport Co. / TCL Express Bus nach Pattaya. Der offizielle Abholpunkt ist das Service Hall Building; lass dir am Schalter den Weg bestätigen, bevor du das Terminal verlässt.",
      "Wenn du unsicher bist, zeige dem Personal: Pattaya, Transport Co. bus, Service Hall Building. Plane nach Gepäckausgabe mindestens 20-30 Minuten Orientierungspuffer ein."
    ],
    note: germanTransportPriceNote
  },
  "pattaya-to-don-mueang-airport": {
    title: "So kommst du zum Bus Pattaya — Don Mueang",
    items: [
      "Vom Hotel: Taxi oder Grab ist mit Gepäck meist am einfachsten. Der Preis hängt von Entfernung, Verkehr und Nachfrage ab.",
      "Mit Songthaew: Kann günstig sein, wenn die Route passt. Wenn du Pattaya nicht kennst, plane extra Zeit ein.",
      "Einstiegsort: Zusätzliche Quellen nennen den Busbahnhof an der Sukhumvit Road in Pattaya. Bestätige die genaue Haltestelle vor der Reise.",
      "Tipp: Verlasse dich vor einem Flug nicht auf den letzten möglichen Bus. Halte eine Alternative bereit."
    ],
    note: germanTransportPriceNote
  }
};

const transportPriceNote: LocalizedText = {
  en: "Transport prices can change. App-based ride prices vary by traffic, demand, and pickup point.",
  pl: "Ceny transportu mogą się zmieniać. Ceny przejazdów w aplikacjach zależą od korków, popytu i miejsca odbioru.",
  ru: "Цены на транспорт могут меняться. Стоимость поездок в приложениях зависит от трафика, спроса и места подачи.",
  th: "ค่าเดินทางอาจเปลี่ยนได้ ราคาในแอปขึ้นอยู่กับรถติด ความต้องการ และจุดรับ",
};

export const stationAccessGuides: Record<RouteId, StationAccessGuide> = {
  "bangkok-to-pattaya": {
    routeId: "bangkok-to-pattaya",
    title: {
      en: "How to get to Ekkamai Bus Terminal",
      pl: "Jak dotrzeć na dworzec Ekkamai",
      ru: "Как добраться до автовокзала Эккамай",
      th: "วิธีเดินทางไปสถานีขนส่งเอกมัย",
    },
    items: [
      {
        en: "By BTS: Take the BTS Sukhumvit Line to Ekkamai Station. The bus terminal is usually about a 5-minute walk from the station.",
        pl: "BTS: Jedź linią BTS Sukhumvit do stacji Ekkamai. Dworzec autobusowy jest zwykle około 5 minut pieszo od stacji.",
        ru: "На BTS: доезжайте по линии Сукхумвит до станции Эккамай. Автовокзал обычно примерно в 5 минутах пешком.",
        th: "โดย BTS: ขึ้นสายสุขุมวิทไปลงสถานีเอกมัย สถานีขนส่งอยู่ห่างไปประมาณ 5 นาทีโดยการเดิน",
      },
      {
        en: "By taxi or Grab: Good if you have luggage. Price depends on traffic and pickup location. Check the app fare before you book.",
        pl: "Taxi lub Grab: Dobre rozwiązanie, jeśli masz bagaż. Cena zależy od korków i miejsca odbioru. Sprawdź cenę w aplikacji przed zamówieniem.",
        ru: "На такси или Grab: удобно, если у вас багаж. Цена зависит от трафика и места подачи. Проверьте стоимость в приложении перед заказом.",
        th: "แท็กซี่หรือ Grab: เหมาะถ้ามีกระเป๋า ราคาเปลี่ยนตามรถติดและจุดรับ ควรตรวจราคาก่อนจอง",
      },
      {
        en: "Avoid tuk-tuks for this trip unless you agree on the price first. Around tourist areas, tuk-tuks can be more expensive than expected.",
        pl: "Unikaj tuk-tuka na tej trasie, chyba że wcześniej ustalisz cenę. W miejscach turystycznych tuk-tuki mogą być droższe, niż się wydaje.",
        ru: "Тук-тук лучше не брать, если цена не согласована заранее. В туристических местах поездка может оказаться дороже, чем ожидалось.",
        th: "ควรหลีกเลี่ยงตุ๊กตุ๊กถ้ายังไม่ได้ตกลงราคา แถวแหล่งท่องเที่ยวอาจแพงกว่าที่คิด",
      },
      {
        en: "Tip: Arrive 20-30 minutes before departure to buy your ticket and find the correct platform.",
        pl: "Wskazówka: Przyjdź 20-30 minut przed odjazdem, żeby kupić bilet i znaleźć właściwe stanowisko.",
        ru: "Совет: приходите за 20–30 минут до отправления, чтобы купить билет и найти нужную платформу.",
        th: "คำแนะนำ: มาถึงก่อนเวลาออก 20-30 นาที เพื่อซื้อตั๋วและหาชานชาลาให้ถูกต้อง",
      },
    ],
    note: transportPriceNote,
  },
  "pattaya-to-bangkok": {
    routeId: "pattaya-to-bangkok",
    title: {
      en: "How to get to North Pattaya Bus Station",
      pl: "Jak dotrzeć na North Pattaya Bus Station",
      ru: "Как добраться до автовокзала Северной Паттайи",
      th: "วิธีเดินทางไปสถานีขนส่งพัทยาเหนือ",
    },
    items: [
      {
        en: "By songthaew: A shared songthaew can be a cheap option if it goes in the right direction, but routes may not be obvious for first-time visitors.",
        pl: "Songthaew: Wspólny songthaew może być tanią opcją, jeśli jedzie w dobrą stronę, ale trasy mogą być niejasne dla osób pierwszy raz w Pattayi.",
        ru: "На сонгтео: общий сонгтео может быть недорогим вариантом, если едет в нужную сторону. Новым гостям маршруты могут быть неочевидны.",
        th: "โดยสองแถว: อาจเป็นตัวเลือกที่ประหยัดถ้าไปทางเดียวกัน แต่เส้นทางอาจไม่ชัดสำหรับคนที่มาครั้งแรก",
      },
      {
        en: "By taxi or Grab: The easiest option from hotels or beach areas. Price varies by distance, traffic, and demand. Check the app fare before booking.",
        pl: "Taxi lub Grab: Najłatwiejsza opcja z hotelu albo okolic plaży. Cena zależy od dystansu, korków i popytu. Sprawdź cenę w aplikacji przed zamówieniem.",
        ru: "На такси или Grab: самый простой вариант от отеля или пляжа. Цена зависит от расстояния, трафика и спроса. Проверьте стоимость перед заказом.",
        th: "แท็กซี่หรือ Grab: ง่ายที่สุดจากโรงแรมหรือย่านชายหาด ราคาเปลี่ยนตามระยะทาง รถติด และความต้องการ",
      },
      {
        en: "From central Pattaya: Leave extra time, especially in the afternoon or during weekends.",
        pl: "Z centrum Pattayi: Zostaw dodatkowy czas, szczególnie po południu i w weekendy.",
        ru: "Из центра Паттайи: заложите дополнительное время, особенно днём и в выходные.",
        th: "จากกลางเมืองพัทยา: เผื่อเวลาเพิ่ม โดยเฉพาะช่วงบ่ายและวันหยุดสุดสัปดาห์",
      },
      {
        en: "Tip: Check whether your bus goes to Ekkamai or Mo Chit before buying the ticket.",
        pl: "Wskazówka: Przed zakupem biletu sprawdź, czy autobus jedzie do Ekkamai czy Mo Chit.",
        ru: "Совет: перед покупкой билета проверьте, идёт ли автобус до Эккамай или Мо Чит 2.",
        th: "คำแนะนำ: ตรวจสอบก่อนซื้อตั๋วว่ารถไปเอกมัยหรือหมอชิต 2",
      },
    ],
    note: transportPriceNote,
  },
  "suvarnabhumi-airport-to-pattaya": {
    routeId: "suvarnabhumi-airport-to-pattaya",
    title: {
      en: "How to find the airport bus counter",
      pl: "Jak znaleźć stanowisko autobusu na lotnisku",
      ru: "Как найти автобусную стойку в аэропорту",
      th: "วิธีหาเคาน์เตอร์รถบัสที่สนามบิน",
    },
    items: [
      {
        en: "After arrival: Allow time for immigration, baggage claim, and walking through the airport.",
        pl: "Po przylocie: Zostaw czas na kontrolę paszportową, odbiór bagażu i przejście przez lotnisko.",
        ru: "После прилёта: заложите время на паспортный контроль, багаж и путь по аэропорту.",
        th: "หลังเดินทางถึง: เผื่อเวลาสำหรับตรวจคนเข้าเมือง รับกระเป๋า และเดินในสนามบิน",
      },
      {
        en: "Bus counter: Current route data says the bus counter is on Level 1 near Gate 8. Follow airport signs and confirm at the counter.",
        pl: "Stanowisko autobusu: Z aktualnych danych trasy wynika, że stanowisko jest na poziomie 1 w pobliżu bramki 8. Kieruj się oznaczeniami na lotnisku i potwierdź przy stanowisku.",
        ru: "Стойка автобуса: текущие данные маршрута указывают уровень 1 рядом с выходом 8. Следуйте указателям и подтвердите у стойки.",
        th: "เคาน์เตอร์รถบัส: ข้อมูลปัจจุบันระบุว่าอยู่ชั้น 1 ใกล้ประตู 8 โปรดตามป้ายในสนามบินและยืนยันที่เคาน์เตอร์",
      },
      {
        en: "Airport Rail Link: Not needed for this bus route, but useful if you are going into Bangkok. Airport Rail Link fares are usually 15-45 THB depending on distance.",
        pl: "Airport Rail Link: Nie jest potrzebny na tej trasie autobusowej, ale przydaje się, jeśli jedziesz do Bangkoku. Przejazd Airport Rail Link zwykle kosztuje 15-45 THB zależnie od odległości.",
        ru: "Airport Rail Link: для этого автобусного маршрута не нужен, но полезен, если вы едете в Бангкок. Обычно поездка стоит 15–45 бат в зависимости от расстояния.",
        th: "Airport Rail Link: ไม่จำเป็นสำหรับเส้นทางนี้ แต่มีประโยชน์ถ้าจะเข้า กรุงเทพฯ ค่าโดยสารมักอยู่ที่ 15-45 บาทตามระยะทาง",
      },
      {
        en: "Taxi or Grab: Useful if you miss the bus or travel late. Price varies by traffic, tolls, and demand. Check the app or taxi queue price before you go.",
        pl: "Taxi lub Grab: Przydatne, jeśli spóźnisz się na autobus albo jedziesz późno. Cena zależy od korków, opłat drogowych i popytu. Sprawdź cenę w aplikacji albo na postoju taxi.",
        ru: "Такси или Grab: удобно, если вы опоздали на автобус или едете поздно. Цена зависит от трафика, платных дорог и спроса.",
        th: "แท็กซี่หรือ Grab: เหมาะถ้าพลาดรถหรือเดินทางดึก ราคาเปลี่ยนตามรถติด ค่าทางด่วน และความต้องการ",
      },
      {
        en: "Tip: This note concerns the separate hourly Suvarnabhumi-Jomtien service at 151 THB, not the 130 THB bus described on this page. Its 22:00 departure terminates at Pattaya Bus Station and does not stop at Jomtien. Both services leave from the same Gate 8 area, so confirm your route at the counter.",
        pl: "Wskazówka: Ta uwaga dotyczy osobnej, kursującej co godzinę linii Suvarnabhumi–Jomtien za 151 THB, a nie opisanego na tej stronie autobusu za 130 THB. Jej kurs o 22:00 kończy bieg na dworcu w Pattayi i nie zatrzymuje się w Jomtien. Obie linie odjeżdżają z tego samego stanowiska przy Gate 8, więc potwierdź kierunek przy kasie.",
        ru: "Совет: это примечание относится к отдельному ежечасному маршруту Суварнабхуми — Джомтьен за 151 бат, а не к автобусу за 130 бат, описанному на этой странице. Его рейс в 22:00 заканчивается на автовокзале Паттайи и не заезжает в Джомтьен. Оба маршрута отправляются из одной зоны у выхода 8, поэтому уточните направление в кассе.",
        th: "คำแนะนำ: ข้อความนี้ใช้กับบริการสุวรรณภูมิ–จอมเทียนแยกต่างหากที่ออกทุกชั่วโมง ราคา 151 บาท ไม่ใช่รถราคา 130 บาทที่อธิบายในหน้านี้ เที่ยวเวลา 22:00 สิ้นสุดที่สถานีขนส่งพัทยาและไม่จอดที่สถานีขนส่งจอมเทียน รถทั้งสองบริการออกจากบริเวณเดียวกันใกล้ประตู 8 ดังนั้นโปรดยืนยันเส้นทางที่เคาน์เตอร์",
      },
    ],
    note: transportPriceNote,
  },
  "pattaya-to-suvarnabhumi-airport": {
    routeId: "pattaya-to-suvarnabhumi-airport",
    title: {
      en: "How to get to the Pattaya airport bus area",
      pl: "Jak dotrzeć do strefy autobusu lotniskowego w Pattayi",
      ru: "Как добраться до зоны автобуса в аэропорт в Паттайе",
      th: "วิธีเดินทางไปจุดรถบัสสนามบินในพัทยา",
    },
    items: [
      {
        en: "From your hotel: Taxi or Grab is usually the easiest option if you have luggage. Price varies by distance, traffic, and demand.",
        pl: "Z hotelu: Taxi lub Grab to zwykle najłatwiejsza opcja, jeśli masz bagaż. Cena zależy od dystansu, korków i popytu.",
        ru: "От отеля: такси или Grab обычно проще всего, если у вас багаж. Цена зависит от расстояния, трафика и спроса.",
        th: "จากโรงแรม: แท็กซี่หรือ Grab มักสะดวกที่สุดถ้ามีกระเป๋า ราคาเปลี่ยนตามระยะทาง รถติด และความต้องการ",
      },
      {
        en: "By songthaew: It may be cheap if the route is convenient, but first-time visitors should allow extra time.",
        pl: "Songthaew: Może być tani, jeśli trasa jest wygodna, ale osoby pierwszy raz w Pattayi powinny zostawić dodatkowy czas.",
        ru: "На сонгтео: может быть недорого, если маршрут удобен. Если вы впервые в Паттайе, заложите больше времени.",
        th: "โดยสองแถว: อาจประหยัดถ้าเส้นทางสะดวก แต่ถ้ามาครั้งแรกควรเผื่อเวลาเพิ่ม",
      },
      {
        en: "Jomtien bus station: The operator shows tickets as available at the counter service there. Confirm the exact boarding point before you go.",
        pl: "Dworzec Jomtien: Według informacji operatora bilety można kupić przy stanowisku obsługi. Przed wyjazdem potwierdź dokładne miejsce odjazdu.",
        ru: "Автостанция Джомтьен: оператор указывает продажу билетов в кассе. Подтвердите точное место посадки перед поездкой.",
        th: "สถานีจอมเทียน: ผู้ให้บริการระบุว่าสามารถซื้อตั๋วที่เคาน์เตอร์ได้ โปรดยืนยันจุดขึ้นรถก่อนออกเดินทาง",
      },
      {
        en: "Tip: Leave a generous buffer for traffic, check-in, security, and immigration at the airport.",
        pl: "Wskazówka: Zostaw duży zapas czasu na ruch drogowy, odprawę, kontrolę bezpieczeństwa i paszportową na lotnisku.",
        ru: "Совет: оставьте хороший запас на трафик, регистрацию, контроль безопасности и паспортный контроль.",
        th: "คำแนะนำ: เผื่อเวลามากพอสำหรับรถติด เช็กอิน ตรวจความปลอดภัย และตรวจคนเข้าเมือง",
      },
    ],
    note: transportPriceNote,
  },
  "don-mueang-airport-to-pattaya": {
    routeId: "don-mueang-airport-to-pattaya",
    title: {
      en: "From the plane to the Don Mueang Pattaya bus",
      pl: "Od wyjścia z samolotu do autobusu na Pattaya",
      fr: "De la sortie de l'avion au bus Don Mueang - Pattaya",
      ru: "От самолёта до автобуса Дон Муанг — Паттайя",
      th: "จากเครื่องบินไปยังรถบัสดอนเมือง-พัทยา",
      zh: "从下飞机到廊曼机场前往芭提雅的巴士",
    },
    items: [
      {
        en: "After landing: Follow Arrivals signs, pass immigration if needed, collect your baggage, and exit into the public arrivals area on Floor 1.",
        pl: "Po lądowaniu: Kieruj się za znakami Arrivals, przejdź kontrolę paszportową jeśli dotyczy, odbierz bagaż i wyjdź do publicznej strefy przylotów na poziomie 1.",
        fr: "Après l'atterrissage : suivez les panneaux Arrivals, passez l'immigration si nécessaire, récupérez vos bagages puis sortez dans la zone publique des arrivées au niveau 1.",
        ru: "После посадки следуйте указателям Arrivals, при необходимости пройдите паспортный контроль, получите багаж и выйдите в общую зону прилёта на 1-м этаже.",
        th: "หลังลงเครื่อง ให้ตามป้าย Arrivals ผ่าน ตม. หากจำเป็น รับกระเป๋า แล้วออกไปยังพื้นที่ผู้โดยสารขาเข้าฝั่งสาธารณะชั้น 1",
        zh: "落地后跟随 Arrivals（到达）标识；如需入境，先通过边检，再领取行李，前往 1 层公共到达区。",
      },
      {
        en: "If you arrive at Terminal 1, go to the service counter at International Passenger Terminal, Building 1, Floor 1, Gate 1. For Terminal 2, the airport page lists Building 2, Floor 1, Gate 11.",
        pl: "Jeśli przylatujesz do Terminala 1, idź do stanowiska obsługi w International Passenger Terminal, Building 1, Floor 1, Gate 1. Dla Terminala 2 strona lotniska wskazuje Building 2, Floor 1, Gate 11.",
        fr: "Si vous arrivez au Terminal 1, allez au comptoir du terminal international, Building 1, Floor 1, Gate 1. Pour le Terminal 2, la page de l'aéroport indique Building 2, Floor 1, Gate 11.",
        ru: "Если вы прилетели в Терминал 1, идите к стойке International Passenger Terminal, Building 1, Floor 1, Gate 1. Для Терминала 2 сайт аэропорта указывает Building 2, Floor 1, Gate 11.",
        th: "ถ้ามาถึงอาคาร 1 ให้ไปที่เคาน์เตอร์อาคารผู้โดยสารระหว่างประเทศ Building 1, Floor 1, Gate 1 ส่วนอาคาร 2 หน้าเว็บสนามบินระบุ Building 2, Floor 1, Gate 11",
        zh: "如果抵达 1 号航站楼，请前往 International Passenger Terminal, Building 1, Floor 1, Gate 1 的服务柜台；2 号航站楼页面标注为 Building 2, Floor 1, Gate 11。",
      },
      {
        en: "Ask specifically for the Transport Co. / TCL express bus to Pattaya. The official airport page lists the pick-up point as Service Hall Building, so confirm the walking direction at the counter before leaving the terminal.",
        pl: "Zapytaj konkretnie o autobus Transport Co. / TCL express bus do Pattaya. Oficjalna strona lotniska wskazuje miejsce odbioru jako Service Hall Building, więc potwierdź kierunek dojścia przy stanowisku zanim wyjdziesz z terminala.",
        fr: "Demandez précisément le bus express Transport Co. / TCL pour Pattaya. La page officielle de l'aéroport indique le point de prise en charge Service Hall Building ; faites confirmer le chemin au comptoir avant de quitter le terminal.",
        ru: "Спросите именно автобус Transport Co. / TCL express bus до Паттайи. Официальная страница аэропорта указывает место посадки Service Hall Building, поэтому уточните направление у стойки до выхода из терминала.",
        th: "ให้ถามหา Transport Co. / TCL express bus ไปพัทยาโดยตรง หน้าเว็บทางการระบุจุดรับเป็น Service Hall Building ควรถามทางที่เคาน์เตอร์ก่อนออกจากอาคาร",
        zh: "请明确询问前往芭提雅的 Transport Co. / TCL express bus。机场官方页面标注上车点为 Service Hall Building，离开航站楼前请在柜台确认步行方向。",
      },
      {
        en: "If you feel unsure, show airport staff: Pattaya, Transport Co. bus, Service Hall Building. Keep at least 20-30 minutes after baggage claim for orientation and ticket confirmation.",
        pl: "Jeśli nie masz pewności, pokaż obsłudze: Pattaya, Transport Co. bus, Service Hall Building. Po odbiorze bagażu zostaw minimum 20-30 minut na orientację i potwierdzenie biletu.",
        fr: "Si vous hésitez, montrez au personnel : Pattaya, Transport Co. bus, Service Hall Building. Gardez au moins 20-30 minutes après les bagages pour vous orienter et confirmer le billet.",
        ru: "Если сомневаетесь, покажите сотруднику: Pattaya, Transport Co. bus, Service Hall Building. После получения багажа оставьте минимум 20-30 минут на ориентирование и подтверждение билета.",
        th: "ถ้าไม่แน่ใจ ให้แสดงข้อความนี้กับเจ้าหน้าที่: Pattaya, Transport Co. bus, Service Hall Building หลังรับกระเป๋าควรเผื่อเวลาอย่างน้อย 20-30 นาทีเพื่อหาทางและยืนยันตั๋ว",
        zh: "如果不确定，可向工作人员出示：Pattaya, Transport Co. bus, Service Hall Building。取行李后至少预留 20-30 分钟用于找路和确认车票。",
      },
    ],
    note: transportPriceNote,
  },
  "pattaya-to-don-mueang-airport": {
    routeId: "pattaya-to-don-mueang-airport",
    title: {
      en: "How to get to the Pattaya Don Mueang bus stop",
      pl: "Jak dotrzeć do autobusu Pattaya - Don Mueang",
      ru: "Как добраться до остановки автобуса Паттайя — Дон Муанг",
      th: "วิธีไปจุดรถบัสจากพัทยาไปดอนเมือง",
    },
    items: [
      {
        en: "From your hotel: Taxi or Grab is usually easiest with luggage. Price varies by distance, traffic, and demand.",
        pl: "Z hotelu: Taxi lub Grab to zwykle najłatwiejsza opcja z bagażem. Cena zależy od dystansu, korków i popytu.",
        ru: "От отеля: такси или Grab обычно проще всего с багажом. Цена зависит от расстояния, трафика и спроса.",
        th: "จากโรงแรม: แท็กซี่หรือ Grab มักสะดวกที่สุดถ้ามีกระเป๋า ราคาเปลี่ยนตามระยะทาง รถติด และความต้องการ",
      },
      {
        en: "By songthaew: It can be cheap if the route works for you, but first-time visitors should allow extra time.",
        pl: "Songthaew: Może być tani, jeśli trasa jest wygodna, ale osoby pierwszy raz w Pattayi powinny zostawić dodatkowy czas.",
        ru: "На сонгтео: может быть недорого, если маршрут вам подходит. Если вы впервые в Паттайе, заложите больше времени.",
        th: "โดยสองแถว: อาจประหยัดถ้าเส้นทางเหมาะกับคุณ แต่ถ้ามาครั้งแรกควรเผื่อเวลาเพิ่ม",
      },
      {
        en: "Boarding point: Secondary sources point to Pattaya Sukhumvit Road Bus Station. Confirm the exact stop before travel.",
        pl: "Miejsce odjazdu: Źródła dodatkowe wskazują Pattaya Sukhumvit Road Bus Station. Potwierdź dokładne miejsce przed podróżą.",
        ru: "Место посадки: дополнительные источники указывают автостанцию на дороге Сукхумвит в Паттайе. Подтвердите точную остановку перед поездкой.",
        th: "จุดขึ้นรถ: แหล่งข้อมูลรองระบุสถานีรถบัสถนนสุขุมวิทพัทยา โปรดยืนยันจุดขึ้นรถที่แน่นอนก่อนเดินทาง",
      },
      {
        en: "Tip: Do not rely on the last possible bus before a flight. Leave a backup option in case of traffic or delays.",
        pl: "Wskazówka: Nie opieraj planu na ostatnim możliwym autobusie przed lotem. Zostaw opcję awaryjną na wypadek korków lub opóźnień.",
        ru: "Совет: не рассчитывайте на последний возможный автобус перед рейсом. Оставьте запасной вариант на случай пробок или задержек.",
        th: "คำแนะนำ: อย่าพึ่งรถเที่ยวสุดท้ายก่อนขึ้นเครื่อง ควรมีแผนสำรองเผื่อรถติดหรือความล่าช้า",
      },
    ],
    note: transportPriceNote,
  },
};

export function getStationAccessGuide(routeId: RouteId, locale: LocaleCode) {
  if (locale === "de") {
    return germanStationAccessGuides[routeId];
  }

  const guide = stationAccessGuides[routeId];

  return {
    title: textForLocale(guide.title, locale),
    items: guide.items.map((item) => textForLocale(item, locale)),
    note: textForLocale(guide.note, locale),
  };
}

export function getStationAccessSectionTitle(locale: LocaleCode) {
  if (locale === "pl") {
    return "Jak dotrzeć na dworzec";
  }

  if (locale === "ru") {
    return "Как добраться до станции";
  }

  if (locale === "de") {
    return "So kommst du zur Station";
  }

  if (locale === "fr") {
    return "Comment rejoindre la station";
  }

  if (locale === "th") {
    return "วิธีเดินทางไปสถานี";
  }

  if (locale === "zh") {
    return "如何前往车站";
  }

  return "How to get to the station";
}

function textForLocale(text: LocalizedText, locale: LocaleCode) {
  if (locale === "pl") {
    return text.pl;
  }

  if (locale === "ru" && text.ru) {
    return text.ru;
  }

  if (locale === "fr" && text.fr) {
    return text.fr;
  }

  if (locale === "th" && text.th) {
    return text.th;
  }

  if (locale === "zh" && text.zh) {
    return text.zh;
  }

  return text.en;
}
