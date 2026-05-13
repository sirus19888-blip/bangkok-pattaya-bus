import type { LocaleCode } from "@/data/routes";

type AffiliateVariantLabels = {
  top: string;
  afterSchedule: string;
  stickyMobile: string;
  afterFaq: string;
  checkAvailability: string;
  compareAlternatives: string;
  homepageCardCta: string;
  homepageCardAria: string;
};

type UiTranslations = {
  affiliate: {
    disclosure: string;
    shortDisclosure: string;
    variantLabels: AffiliateVariantLabels;
  };
  commercial: {
    ariaLabel: string;
    busFullTitle: string;
    busFullBody: string;
    busFullCta: string;
    afterLastTitle: string;
    afterLastBody: string;
    afterLastCta: string;
    compareTitle: string;
    compareBody: string;
    compareCta: string;
    returnTitle: string;
    returnBody: string;
    returnRoutePrefix: string;
    viewAllRoutes: string;
  };
  footer: {
    title: string;
    ariaLabel: string;
    about: string;
    contact: string;
    privacy: string;
  };
  homepageRevenue: {
    title: string;
    heading: string;
    text: string;
    primaryCta: string;
    primaryAria: string;
    secondaryCta: string;
  };
  report: {
    label: string;
    subject: string;
    intro: string;
    routeLabel: string;
    prompt: string;
  };
  scheduleStatus: {
    verified: string;
    partiallyVerified: string;
    needsOfficialConfirmation: string;
  };
};

const uiTranslations: Record<LocaleCode, UiTranslations> = {
  en: {
    affiliate: {
      disclosure:
        "Some booking links may be affiliate links. Timetable information stays independent.",
      shortDisclosure: "Affiliate link",
      variantLabels: {
        top: "Check live seats & prices",
        afterSchedule: "Compare tickets and alternatives",
        stickyMobile: "Book ticket",
        afterFaq: "Compare tickets and alternatives",
        checkAvailability: "Check availability",
        compareAlternatives: "Compare alternatives",
        homepageCardCta: "Check tickets",
        homepageCardAria: "Compare tickets on 12Go",
      },
    },
    commercial: {
      ariaLabel: "Extra travel options",
      busFullTitle: "What if the bus is full?",
      busFullBody:
        "Popular departures can sell out around weekends, holidays, and late afternoon travel. If the next bus is full, ask at the counter for the following departure and compare bookable alternatives before you move to another station.",
      busFullCta: "Compare tickets and alternatives",
      afterLastTitle: "After the last bus",
      afterLastBody:
        "After the last scheduled bus, your realistic choices are usually a taxi, private transfer, or waiting until the next morning. For airport routes, avoid relying on the final bus before a flight and compare alternatives early.",
      afterLastCta: "Check alternatives",
      compareTitle: "Bus vs taxi vs private transfer",
      compareBody:
        "The bus is usually the cheapest choice. Taxi and private transfer cost more, but they can be easier with luggage, late arrivals, or hotel-to-hotel travel. Always confirm the final price, tolls, pickup point, and luggage space before you go.",
      compareCta: "Compare route options",
      returnTitle: "Return route",
      returnBody:
        "Planning the way back now can save time later. Check the return route, station notes, first and last departures, and whether your destination in Bangkok is Ekkamai, Mo Chit, Suvarnabhumi, or Don Mueang.",
      returnRoutePrefix: "View",
      viewAllRoutes: "View all routes",
    },
    footer: {
      title: "Bangkok Pattaya Bus Guide",
      ariaLabel: "Footer links",
      about: "About",
      contact: "Contact",
      privacy: "Privacy",
    },
    homepageRevenue: {
      title: "Need a ticket today?",
      heading: "Check before you go",
      text: "Check live availability before you go to the station.",
      primaryCta: "Check Bangkok → Pattaya tickets",
      primaryAria: "Check Bangkok to Pattaya tickets on 12Go",
      secondaryCta: "View all routes",
    },
    report: {
      label: "Report outdated times",
      subject: "Outdated bus time report",
      intro: "Hi, I found outdated information on this route page.",
      routeLabel: "Route",
      prompt: "What needs to be corrected?",
    },
    scheduleStatus: {
      verified: "Verified",
      partiallyVerified: "Partially verified",
      needsOfficialConfirmation: "Needs official confirmation",
    },
  },
  pl: {
    affiliate: {
      disclosure:
        "Niektóre linki do rezerwacji mogą być linkami afiliacyjnymi. Informacje o rozkładzie pozostają niezależne.",
      shortDisclosure: "Link afiliacyjny",
      variantLabels: {
        top: "Sprawdź miejsca i ceny",
        afterSchedule: "Porównaj bilety i alternatywy",
        stickyMobile: "Kup bilet",
        afterFaq: "Porównaj bilety i alternatywy",
        checkAvailability: "Sprawdź dostępność",
        compareAlternatives: "Porównaj alternatywy",
        homepageCardCta: "Sprawdź bilety",
        homepageCardAria: "Porównaj bilety w 12Go",
      },
    },
    commercial: {
      ariaLabel: "Dodatkowe opcje podróży",
      busFullTitle: "Co jeśli autobus jest pełny?",
      busFullBody:
        "Popularne kursy mogą się wyprzedać w weekendy, święta i późnym popołudniem. Jeśli najbliższy autobus jest pełny, zapytaj w kasie o kolejny kurs i porównaj dostępne alternatywy przed zmianą dworca.",
      busFullCta: "Porównaj bilety i alternatywy",
      afterLastTitle: "Po ostatnim autobusie",
      afterLastBody:
        "Po ostatnim planowym autobusie realne opcje to zwykle taxi, prywatny transfer albo wyjazd następnego dnia rano. Na trasach lotniskowych nie opieraj planu na ostatnim autobusie przed lotem.",
      afterLastCta: "Sprawdź alternatywy",
      compareTitle: "Autobus, taxi czy prywatny transfer",
      compareBody:
        "Autobus jest zwykle najtańszy. Taxi i prywatny transfer kosztują więcej, ale są wygodniejsze z bagażem, przy późnym przylocie albo przy przejeździe hotel-hotel. Zawsze potwierdź cenę, opłaty drogowe i miejsce odbioru.",
      compareCta: "Porównaj opcje trasy",
      returnTitle: "Trasa powrotna",
      returnBody:
        "Zaplanowanie powrotu z wyprzedzeniem oszczędza czas. Sprawdź trasę powrotną, stacje, pierwszy i ostatni odjazd oraz czy jedziesz do Ekkamai, Mo Chit, Suvarnabhumi czy Don Mueang.",
      returnRoutePrefix: "Zobacz",
      viewAllRoutes: "Zobacz wszystkie trasy",
    },
    footer: {
      title: "Bangkok Pattaya Bus Guide",
      ariaLabel: "Linki w stopce",
      about: "O stronie",
      contact: "Kontakt",
      privacy: "Prywatność",
    },
    homepageRevenue: {
      title: "Potrzebujesz biletu na dziś?",
      heading: "Sprawdź przed wyjazdem",
      text: "Sprawdź dostępność miejsc, zanim pojedziesz na dworzec.",
      primaryCta: "Sprawdź bilety Bangkok → Pattaya",
      primaryAria: "Sprawdź bilety Bangkok Pattaya w 12Go",
      secondaryCta: "Zobacz wszystkie trasy",
    },
    report: {
      label: "Zgłoś nieaktualne godziny",
      subject: "Zgłoszenie nieaktualnych godzin autobusów",
      intro: "Cześć, znalazłem nieaktualne informacje na tej stronie trasy.",
      routeLabel: "Trasa",
      prompt: "Co trzeba poprawić?",
    },
    scheduleStatus: {
      verified: "Zweryfikowano",
      partiallyVerified: "Częściowo zweryfikowano",
      needsOfficialConfirmation: "Wymaga potwierdzenia operatora",
    },
  },
  de: {
    affiliate: {
      disclosure:
        "Einige Buchungslinks können Affiliate-Links sein. Die Fahrplaninformationen bleiben unabhängig.",
      shortDisclosure: "Affiliate-Link",
      variantLabels: {
        top: "Live-Plätze und Preise prüfen",
        afterSchedule: "Tickets und Alternativen vergleichen",
        stickyMobile: "Ticket buchen",
        afterFaq: "Tickets und Alternativen vergleichen",
        checkAvailability: "Verfügbarkeit prüfen",
        compareAlternatives: "Alternativen vergleichen",
        homepageCardCta: "Tickets prüfen",
        homepageCardAria: "Tickets auf 12Go vergleichen",
      },
    },
    commercial: {
      ariaLabel: "Weitere Reiseoptionen",
      busFullTitle: "Was, wenn der Bus voll ist?",
      busFullBody:
        "Beliebte Abfahrten können an Wochenenden, Feiertagen und am späten Nachmittag ausverkauft sein. Wenn der nächste Bus voll ist, fragen Sie am Schalter nach der nächsten Abfahrt und vergleichen Sie buchbare Alternativen.",
      busFullCta: "Tickets und Alternativen vergleichen",
      afterLastTitle: "Nach dem letzten Bus",
      afterLastBody:
        "Nach dem letzten Linienbus bleiben meist Taxi, privater Transfer oder die Fahrt am nächsten Morgen. Bei Flughafenrouten sollten Sie nicht auf den letzten Bus vor dem Flug setzen.",
      afterLastCta: "Alternativen prüfen",
      compareTitle: "Bus, Taxi oder privater Transfer",
      compareBody:
        "Der Bus ist meist am günstigsten. Taxi und privater Transfer kosten mehr, sind aber mit Gepäck, später Ankunft oder Hotel-zu-Hotel-Fahrten einfacher. Bestätigen Sie Preis, Maut, Abholpunkt und Gepäckplatz.",
      compareCta: "Routenoptionen vergleichen",
      returnTitle: "Rückroute",
      returnBody:
        "Wenn Sie die Rückfahrt früh planen, sparen Sie später Zeit. Prüfen Sie Rückroute, Stationshinweise, erste und letzte Abfahrt und ob Ihr Ziel Ekkamai, Mo Chit, Suvarnabhumi oder Don Mueang ist.",
      returnRoutePrefix: "Ansehen:",
      viewAllRoutes: "Alle Routen anzeigen",
    },
    footer: {
      title: "Bangkok Pattaya Bus Guide",
      ariaLabel: "Links im Seitenfuß",
      about: "Über uns",
      contact: "Kontakt",
      privacy: "Datenschutz",
    },
    homepageRevenue: {
      title: "Brauchen Sie heute ein Ticket?",
      heading: "Vor der Fahrt prüfen",
      text: "Prüfen Sie die Verfügbarkeit, bevor Sie zum Busbahnhof fahren.",
      primaryCta: "Tickets Bangkok → Pattaya prüfen",
      primaryAria: "Tickets Bangkok nach Pattaya auf 12Go prüfen",
      secondaryCta: "Alle Routen anzeigen",
    },
    report: {
      label: "Veraltete Zeiten melden",
      subject: "Meldung veralteter Buszeiten",
      intro:
        "Hallo, ich habe veraltete Informationen auf dieser Routenseite gefunden.",
      routeLabel: "Route",
      prompt: "Was muss korrigiert werden?",
    },
    scheduleStatus: {
      verified: "Geprüft",
      partiallyVerified: "Teilweise geprüft",
      needsOfficialConfirmation: "Benötigt Bestätigung des Betreibers",
    },
  },
  fr: {
    affiliate: {
      disclosure:
        "Certains liens de réservation peuvent être des liens affiliés. Les informations d'horaires restent indépendantes.",
      shortDisclosure: "Lien affilié",
      variantLabels: {
        top: "Vérifier les places et les prix",
        afterSchedule: "Comparer les billets et alternatives",
        stickyMobile: "Réserver un billet",
        afterFaq: "Comparer les billets et alternatives",
        checkAvailability: "Vérifier la disponibilité",
        compareAlternatives: "Comparer les alternatives",
        homepageCardCta: "Vérifier les billets",
        homepageCardAria: "Comparer les billets sur 12Go",
      },
    },
    commercial: {
      ariaLabel: "Options de voyage supplémentaires",
      busFullTitle: "Et si le bus est complet ?",
      busFullBody:
        "Les départs populaires peuvent être complets les week-ends, jours fériés et en fin d'après-midi. Si le prochain bus est complet, demandez le départ suivant au guichet et comparez les alternatives réservables.",
      busFullCta: "Comparer les billets et alternatives",
      afterLastTitle: "Après le dernier bus",
      afterLastBody:
        "Après le dernier bus prévu, les options réalistes sont souvent le taxi, le transfert privé ou le lendemain matin. Pour l'aéroport, évitez de compter sur le dernier bus avant un vol.",
      afterLastCta: "Vérifier les alternatives",
      compareTitle: "Bus, taxi ou transfert privé",
      compareBody:
        "Le bus est souvent le moins cher. Le taxi et le transfert privé coûtent plus cher, mais sont plus simples avec des bagages, une arrivée tardive ou un trajet d'hôtel à hôtel. Confirmez le prix, les péages et le point de prise en charge.",
      compareCta: "Comparer les options",
      returnTitle: "Trajet retour",
      returnBody:
        "Prévoir le retour à l'avance peut faire gagner du temps. Vérifiez le trajet retour, les gares, le premier et le dernier départ, et si votre destination est Ekkamai, Mo Chit, Suvarnabhumi ou Don Mueang.",
      returnRoutePrefix: "Voir",
      viewAllRoutes: "Voir toutes les routes",
    },
    footer: {
      title: "Bangkok Pattaya Bus Guide",
      ariaLabel: "Liens de pied de page",
      about: "À propos",
      contact: "Contact",
      privacy: "Confidentialité",
    },
    homepageRevenue: {
      title: "Besoin d'un billet aujourd'hui ?",
      heading: "Vérifiez avant de partir",
      text: "Vérifiez les disponibilités avant d'aller à la gare.",
      primaryCta: "Vérifier les billets Bangkok → Pattaya",
      primaryAria: "Vérifier les billets Bangkok Pattaya sur 12Go",
      secondaryCta: "Voir toutes les routes",
    },
    report: {
      label: "Signaler des horaires obsolètes",
      subject: "Signalement d'horaires de bus obsolètes",
      intro:
        "Bonjour, j'ai trouvé des informations obsolètes sur cette page de route.",
      routeLabel: "Route",
      prompt: "Que faut-il corriger ?",
    },
    scheduleStatus: {
      verified: "Vérifié",
      partiallyVerified: "Partiellement vérifié",
      needsOfficialConfirmation: "Confirmation de l'opérateur nécessaire",
    },
  },
  ru: {
    affiliate: {
      disclosure:
        "Некоторые ссылки на бронирование могут быть партнёрскими. Информация о расписании остаётся независимой.",
      shortDisclosure: "Партнёрская ссылка",
      variantLabels: {
        top: "Проверить места и цены",
        afterSchedule: "Сравнить билеты и альтернативы",
        stickyMobile: "Купить билет",
        afterFaq: "Сравнить билеты и альтернативы",
        checkAvailability: "Проверить наличие",
        compareAlternatives: "Сравнить альтернативы",
        homepageCardCta: "Проверить билеты",
        homepageCardAria: "Сравнить билеты на 12Go",
      },
    },
    commercial: {
      ariaLabel: "Дополнительные варианты поездки",
      busFullTitle: "Что делать, если автобус полный?",
      busFullBody:
        "Популярные рейсы могут распродаваться в выходные, праздники и ближе к вечеру. Если ближайший автобус полный, спросите на стойке о следующем рейсе и сравните доступные альтернативы.",
      busFullCta: "Сравнить билеты и альтернативы",
      afterLastTitle: "После последнего автобуса",
      afterLastBody:
        "После последнего автобуса обычно остаются такси, частный трансфер или поездка утром. Для маршрутов в аэропорт не планируйте поездку только на последнем автобусе перед рейсом.",
      afterLastCta: "Проверить альтернативы",
      compareTitle: "Автобус, такси или частный трансфер",
      compareBody:
        "Автобус обычно самый дешёвый. Такси и частный трансфер дороже, но удобнее с багажом, при позднем прибытии или поездке от отеля до отеля. Подтвердите цену, платные дороги и место посадки.",
      compareCta: "Сравнить варианты маршрута",
      returnTitle: "Обратный маршрут",
      returnBody:
        "Если продумать обратную дорогу заранее, потом будет проще. Проверьте маршрут обратно, станции, первый и последний рейс, а также конечную точку: Эккамай, Мо Чит, Суварнабхуми или Дон Муанг.",
      returnRoutePrefix: "Открыть",
      viewAllRoutes: "Показать все маршруты",
    },
    footer: {
      title: "Гид по автобусам Бангкок Паттайя",
      ariaLabel: "Ссылки внизу страницы",
      about: "О проекте",
      contact: "Контакты",
      privacy: "Конфиденциальность",
    },
    homepageRevenue: {
      title: "Нужен билет сегодня?",
      heading: "Проверьте перед поездкой",
      text: "Проверьте наличие мест до поездки на автовокзал.",
      primaryCta: "Проверить билеты Бангкок → Паттайя",
      primaryAria: "Проверить билеты Бангкок Паттайя на 12Go",
      secondaryCta: "Показать все маршруты",
    },
    report: {
      label: "Сообщить о неактуальном расписании",
      subject: "Сообщение о неактуальном расписании автобусов",
      intro:
        "Здравствуйте, я нашёл неактуальную информацию на этой странице маршрута.",
      routeLabel: "Маршрут",
      prompt: "Что нужно исправить?",
    },
    scheduleStatus: {
      verified: "Проверено",
      partiallyVerified: "Частично проверено",
      needsOfficialConfirmation: "Требуется подтверждение оператора",
    },
  },
  th: {
    affiliate: {
      disclosure:
        "ลิงก์จองบางลิงก์อาจเป็นลิงก์พันธมิตร ข้อมูลตารางเวลายังคงเป็นอิสระ",
      shortDisclosure: "ลิงก์พันธมิตร",
      variantLabels: {
        top: "ตรวจสอบที่นั่งและราคา",
        afterSchedule: "เปรียบเทียบตั๋วและทางเลือก",
        stickyMobile: "จองตั๋ว",
        afterFaq: "เปรียบเทียบตั๋วและทางเลือก",
        checkAvailability: "ตรวจสอบที่นั่งว่าง",
        compareAlternatives: "เปรียบเทียบทางเลือก",
        homepageCardCta: "ตรวจสอบตั๋ว",
        homepageCardAria: "เปรียบเทียบตั๋วบน 12Go",
      },
    },
    commercial: {
      ariaLabel: "ตัวเลือกการเดินทางเพิ่มเติม",
      busFullTitle: "ถ้ารถบัสเต็มควรทำอย่างไร?",
      busFullBody:
        "เที่ยวรถยอดนิยมอาจเต็มในช่วงสุดสัปดาห์ วันหยุด และช่วงบ่ายแก่ ๆ หากรถเที่ยวถัดไปเต็ม ให้ถามเคาน์เตอร์เรื่องเที่ยวถัดไปและเปรียบเทียบทางเลือกที่จองได้ก่อนเปลี่ยนสถานี",
      busFullCta: "เปรียบเทียบตั๋วและทางเลือก",
      afterLastTitle: "หลังรถบัสเที่ยวสุดท้าย",
      afterLastBody:
        "หลังเที่ยวรถตามตารางเที่ยวสุดท้าย ตัวเลือกที่เป็นไปได้มักเป็นแท็กซี่ รถรับส่งส่วนตัว หรือรอเช้าวันถัดไป สำหรับเส้นทางสนามบิน อย่าพึ่งเที่ยวสุดท้ายก่อนขึ้นเครื่อง",
      afterLastCta: "ตรวจสอบทางเลือก",
      compareTitle: "รถบัส แท็กซี่ หรือรถรับส่งส่วนตัว",
      compareBody:
        "รถบัสมักถูกที่สุด แท็กซี่และรถรับส่งส่วนตัวแพงกว่า แต่สะดวกกว่าเมื่อมีสัมภาระ มาถึงดึก หรือเดินทางจากโรงแรมถึงโรงแรม โปรดยืนยันราคา ค่าทางด่วน และจุดรับก่อนเดินทาง",
      compareCta: "เปรียบเทียบตัวเลือกเส้นทาง",
      returnTitle: "เส้นทางขากลับ",
      returnBody:
        "การวางแผนขากลับล่วงหน้าช่วยประหยัดเวลา ตรวจสอบเส้นทางกลับ สถานี เที่ยวแรก เที่ยวสุดท้าย และปลายทางในกรุงเทพฯ เช่น เอกมัย หมอชิต สุวรรณภูมิ หรือดอนเมือง",
      returnRoutePrefix: "ดู",
      viewAllRoutes: "ดูเส้นทางทั้งหมด",
    },
    footer: {
      title: "คู่มือรถบัสกรุงเทพฯ พัทยา",
      ariaLabel: "ลิงก์ท้ายหน้า",
      about: "เกี่ยวกับเรา",
      contact: "ติดต่อ",
      privacy: "ความเป็นส่วนตัว",
    },
    homepageRevenue: {
      title: "ต้องการตั๋ววันนี้ไหม?",
      heading: "ตรวจสอบก่อนออกเดินทาง",
      text: "ตรวจสอบที่นั่งว่างก่อนเดินทางไปสถานี",
      primaryCta: "ตรวจสอบตั๋ว กรุงเทพฯ → พัทยา",
      primaryAria: "ตรวจสอบตั๋วกรุงเทพฯ ไปพัทยาบน 12Go",
      secondaryCta: "ดูเส้นทางทั้งหมด",
    },
    report: {
      label: "แจ้งเวลารถที่ไม่อัปเดต",
      subject: "แจ้งเวลารถบัสที่ไม่อัปเดต",
      intro: "สวัสดี ฉันพบข้อมูลที่ไม่อัปเดตในหน้าตารางเส้นทางนี้",
      routeLabel: "เส้นทาง",
      prompt: "ควรแก้ไขอะไร?",
    },
    scheduleStatus: {
      verified: "ตรวจสอบแล้ว",
      partiallyVerified: "ตรวจสอบบางส่วนแล้ว",
      needsOfficialConfirmation: "ต้องยืนยันจากผู้ให้บริการ",
    },
  },
  zh: {
    affiliate: {
      disclosure:
        "部分预订链接可能是联盟链接。时刻表信息保持独立。",
      shortDisclosure: "联盟链接",
      variantLabels: {
        top: "查看实时座位和价格",
        afterSchedule: "比较车票和替代选择",
        stickyMobile: "预订车票",
        afterFaq: "比较车票和替代选择",
        checkAvailability: "查看可订情况",
        compareAlternatives: "比较替代选择",
        homepageCardCta: "查看车票",
        homepageCardAria: "在 12Go 比较车票",
      },
    },
    commercial: {
      ariaLabel: "更多出行选择",
      busFullTitle: "如果巴士满座怎么办？",
      busFullBody:
        "热门班次在周末、节假日和傍晚可能会售完。如果下一班车满座，请在柜台询问后续班次，并在换车站前比较可预订的替代选择。",
      busFullCta: "比较车票和替代选择",
      afterLastTitle: "最后一班巴士之后",
      afterLastBody:
        "最后一班计划巴士之后，通常只能选择出租车、私人接送，或等到第二天早上。机场路线不要把行程押在航班前最后一班车上。",
      afterLastCta: "查看替代选择",
      compareTitle: "巴士、出租车或私人接送",
      compareBody:
        "巴士通常最便宜。出租车和私人接送更贵，但带行李、晚到或酒店到酒店出行时更方便。出发前请确认最终价格、过路费、上车点和行李空间。",
      compareCta: "比较路线选择",
      returnTitle: "返程路线",
      returnBody:
        "提前规划返程可以节省时间。查看返程路线、车站信息、首末班车，以及在曼谷的目的地是亿甲迈、莫奇特、素万那普还是廊曼。",
      returnRoutePrefix: "查看",
      viewAllRoutes: "查看所有路线",
    },
    footer: {
      title: "曼谷芭提雅巴士指南",
      ariaLabel: "页脚链接",
      about: "关于",
      contact: "联系",
      privacy: "隐私",
    },
    homepageRevenue: {
      title: "今天需要车票吗？",
      heading: "出发前先查看",
      text: "去车站前先查看实时可订情况。",
      primaryCta: "查看曼谷 → 芭提雅车票",
      primaryAria: "在 12Go 查看曼谷到芭提雅车票",
      secondaryCta: "查看所有路线",
    },
    report: {
      label: "报告过期时刻",
      subject: "报告过期巴士时刻",
      intro: "你好，我在这个路线页面发现了过期信息。",
      routeLabel: "路线",
      prompt: "需要更正什么？",
    },
    scheduleStatus: {
      verified: "已验证",
      partiallyVerified: "部分已验证",
      needsOfficialConfirmation: "需要运营商确认",
    },
  },
};

export function getUiTranslations(locale: LocaleCode) {
  return uiTranslations[locale] ?? uiTranslations.en;
}
