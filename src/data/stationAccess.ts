import type { LocaleCode, RouteId } from "@/data/routes";

type LocalizedText = Record<"en" | "pl", string> & {
  ru?: string;
  th?: string;
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
      "Tipp: Der späte Bus um 22:00 kann zum Busbahnhof Nord-Pattaya fahren, nicht nach Jomtien. Bestätige das Ziel vor dem Ticketkauf."
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
      "Nach der Ankunft: Plane Zeit für Gepäck, Orientierung im Flughafen und den Weg zum Schalter oder Einstiegsort ein.",
      "Busschalter: Die Flughafenseite nennt Terminal 1 Gate 1 und Terminal 2 Gate 11. Bestätige den Bus nach Pattaya vor Ort.",
      "Einstiegsort: Die Flughafenseite nennt das Servicegebäude als Abholpunkt. Folge den Schildern und frage am Schalter.",
      "Tipp: Der Verkehr in Bangkok ist schwer vorhersehbar. Halte deine Ankunftspläne flexibel."
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
        en: "Tip: The late 22:00 bus may go to North Pattaya Bus Station rather than Jomtien. Confirm before buying the ticket.",
        pl: "Wskazówka: Późny autobus o 22:00 może jechać do North Pattaya Bus Station, a nie do Jomtien. Potwierdź przed zakupem biletu.",
        ru: "Совет: поздний автобус в 22:00 может идти до автовокзала Северной Паттайи, а не до Джомтьена. Подтвердите перед покупкой билета.",
        th: "คำแนะนำ: รถเที่ยว 22:00 อาจไปสถานีขนส่งพัทยาเหนือ ไม่ใช่จอมเทียน โปรดยืนยันก่อนซื้อตั๋ว",
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
      en: "How to find the Don Mueang bus area",
      pl: "Jak znaleźć autobus na lotnisku Don Mueang",
      ru: "Как найти автобусную зону в аэропорту Дон Муанг",
      th: "วิธีหาจุดรถบัสที่ท่าอากาศยานดอนเมือง",
    },
    items: [
      {
        en: "After arrival: Allow time for baggage, airport navigation, and walking to the bus counter or pick-up point.",
        pl: "Po przylocie: Zostaw czas na bagaż, przejście przez lotnisko i dojście do stanowiska autobusu.",
        ru: "После прилёта: заложите время на багаж, путь по аэропорту и дорогу до стойки или места посадки.",
        th: "หลังเดินทางถึง: เผื่อเวลารับกระเป๋า เดินในสนามบิน และไปยังเคาน์เตอร์หรือจุดขึ้นรถ",
      },
      {
        en: "Bus counter: The airport page shows service counters in Terminal 1 Gate 1 and Terminal 2 Gate 11. Confirm the Pattaya bus when you arrive.",
        pl: "Stanowisko autobusu: Strona lotniska pokazuje stanowiska w Terminalu 1 przy bramce 1 i Terminalu 2 przy bramce 11. Potwierdź autobus do Pattaya na miejscu.",
        ru: "Стойка автобуса: страница аэропорта указывает терминал 1, выход 1, и терминал 2, выход 11. Подтвердите автобус до Паттайи на месте.",
        th: "เคาน์เตอร์รถบัส: หน้าเว็บสนามบินระบุเคาน์เตอร์ที่อาคาร 1 ประตู 1 และอาคาร 2 ประตู 11 โปรดยืนยันรถไปพัทยาเมื่อถึงสนามบิน",
      },
      {
        en: "Pick-up point: The airport page lists Service Hall Building as the pick-up point. Follow airport signs and ask at the counter.",
        pl: "Miejsce odjazdu: Strona lotniska wskazuje Service Hall Building. Kieruj się oznaczeniami i zapytaj przy stanowisku.",
        ru: "Место посадки: страница аэропорта указывает сервисное здание как место посадки. Следуйте указателям и спросите у стойки.",
        th: "จุดขึ้นรถ: หน้าเว็บสนามบินระบุอาคารบริการเป็นจุดรับ โปรดตามป้ายและถามที่เคาน์เตอร์",
      },
      {
        en: "Tip: Bangkok traffic can be unpredictable, so keep your arrival plans flexible.",
        pl: "Wskazówka: Ruch w Bangkoku bywa nieprzewidywalny, więc zostaw elastyczny plan po przyjeździe.",
        ru: "Совет: трафик в Бангкоке бывает непредсказуемым, поэтому оставьте гибкий план после прибытия.",
        th: "คำแนะนำ: การจราจรในกรุงเทพฯ คาดเดายาก ควรวางแผนหลังเดินทางถึงให้ยืดหยุ่น",
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

  if (locale === "th") {
    return "วิธีเดินทางไปสถานี";
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

  if (locale === "th" && text.th) {
    return text.th;
  }

  return text.en;
}
