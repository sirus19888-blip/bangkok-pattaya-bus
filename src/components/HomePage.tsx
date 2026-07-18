import Link from "next/link";
import type { ComponentProps } from "react";
import Image from "next/image";
import { HomepageJsonLd } from "@/components/HomepageJsonLd";
import { HomepageRevenueHeroCard } from "@/components/HomepageRevenueHeroCard";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileDestinationWeather } from "@/components/MobileDestinationWeather";
import { MobileRouteCountdown } from "@/components/MobileRouteCountdown";
import { MoreThailandRoutes } from "@/components/MoreThailandRoutes";
import { RouteSearch } from "@/components/RouteSearch";
import { TravelDateAwareTwelveGoAffiliateButton } from "@/components/TravelDateAwareTwelveGoAffiliateButton";
import {
  TravelDateField,
  TravelDateProvider,
} from "@/components/TravelDateContext";
import { TravelGuideLinks } from "@/components/TravelGuideLinks";
import { routePages } from "@/data/routes";
import type { LocaleCode, RouteId, RoutePage } from "@/data/routes";
import { schedules } from "@/data/schedules";
import type { Schedule } from "@/data/schedules";
import { getTranslations, localizeRoutePage, localizeSchedule } from "@/lib/i18n";
import type { Translations } from "@/lib/i18n";
import { hasTwelveGoTickets } from "@/lib/twelveGo";
import { getUiTranslations } from "@/lib/uiTranslations";

export function HomePage({ locale }: { locale: LocaleCode }) {
  const t = getTranslations(locale);
  const localizedRoutePages = routePages.map((page) =>
    localizeRoutePage(page, t),
  );
  const localizedSchedules = schedules.map((schedule) =>
    localizeSchedule(schedule, t),
  );

  return (
    <main className="min-h-screen bg-[#f7f0e3] text-[#13233a]">
      <HomepageJsonLd locale={locale} />
      <TravelDateProvider>
        <MobileHome
          locale={locale}
          routePagesForLocale={localizedRoutePages}
          schedulesForLocale={localizedSchedules}
          t={t}
        />
      </TravelDateProvider>
    </main>
  );
}

const mobileRouteMeta: Record<
  RouteId,
  {
    badge: string;
    note: string;
  }
> = {
  "bangkok-to-pattaya": {
    badge: "Most popular",
    note: "From Ekkamai Bus Terminal",
  },
  "pattaya-to-bangkok": {
    badge: "Return route",
    note: "To Ekkamai and Mo Chit",
  },
  "suvarnabhumi-airport-to-pattaya": {
    badge: "Airport bus",
    note: "Counter on Level 1",
  },
  "pattaya-to-suvarnabhumi-airport": {
    badge: "Before flight",
    note: "From Jomtien bus area",
  },
  "don-mueang-airport-to-pattaya": {
    badge: "Airport route",
    note: "Transport Co. service",
  },
  "pattaya-to-don-mueang-airport": {
    badge: "Airport return",
    note: "Confirm boarding point",
  },
};

const polishMobileRouteMeta: Record<RouteId, { badge: string; note: string }> =
  {
    "bangkok-to-pattaya": {
      badge: "Najpopularniejsza",
      note: "Z dworca Ekkamai",
    },
    "pattaya-to-bangkok": {
      badge: "Trasa powrotna",
      note: "Do Ekkamai i Mo Chit",
    },
    "suvarnabhumi-airport-to-pattaya": {
      badge: "Autobus z lotniska",
      note: "Stanowisko na poziomie 1",
    },
    "pattaya-to-suvarnabhumi-airport": {
      badge: "Przed lotem",
      note: "Z okolicy dworca Jomtien",
    },
    "don-mueang-airport-to-pattaya": {
      badge: "Trasa z lotniska",
      note: "Połączenie Transport Co.",
    },
    "pattaya-to-don-mueang-airport": {
      badge: "Powrót na lotnisko",
      note: "Potwierdź miejsce odjazdu",
    },
  };

const russianMobileRouteMeta: Record<RouteId, { badge: string; note: string }> =
  {
    "bangkok-to-pattaya": {
      badge: "Популярный маршрут",
      note: "От автовокзала Эккамай",
    },
    "pattaya-to-bangkok": {
      badge: "Обратный маршрут",
      note: "До Эккамай и Мо Чит",
    },
    "suvarnabhumi-airport-to-pattaya": {
      badge: "Автобус из аэропорта",
      note: "Стойка на уровне 1",
    },
    "pattaya-to-suvarnabhumi-airport": {
      badge: "Перед вылетом",
      note: "Из района автовокзала Джомтьен",
    },
    "don-mueang-airport-to-pattaya": {
      badge: "Маршрут из аэропорта",
      note: "Рейс Transport Co.",
    },
    "pattaya-to-don-mueang-airport": {
      badge: "В аэропорт",
      note: "Подтвердите место посадки",
    },
  };

const germanMobileRouteMeta: Record<RouteId, { badge: string; note: string }> =
  {
    "bangkok-to-pattaya": {
      badge: "Beliebte Route",
      note: "Ab Busbahnhof Ekkamai",
    },
    "pattaya-to-bangkok": {
      badge: "Rückroute",
      note: "Nach Ekkamai und Mo Chit",
    },
    "suvarnabhumi-airport-to-pattaya": {
      badge: "Flughafenbus",
      note: "Schalter auf Ebene 1",
    },
    "pattaya-to-suvarnabhumi-airport": {
      badge: "Vor dem Flug",
      note: "Ab Busbereich Jomtien",
    },
    "don-mueang-airport-to-pattaya": {
      badge: "Flughafenroute",
      note: "Service von Transport Co.",
    },
    "pattaya-to-don-mueang-airport": {
      badge: "Zum Flughafen",
      note: "Einstiegsort bestätigen",
    },
  };

const mobileRouteImages: Record<RouteId, string> = {
  "bangkok-to-pattaya": "/images/stations/ekkamai/ekkamai-entrance.jpg",
  "pattaya-to-bangkok": "/images/stations/pattaya-north/pattaya-station.jpg",
  "suvarnabhumi-airport-to-pattaya":
    "/images/stations/suvarnabhumi/suvarnabhumi-bus-terminal.jpg",
  "pattaya-to-suvarnabhumi-airport":
    "/images/stations/pattaya-north/pattaya-bus-area.jpg",
  "don-mueang-airport-to-pattaya":
    "/images/stations/don-mueang/don-mueang-terminal-2.jpg",
  "pattaya-to-don-mueang-airport":
    "/images/stations/pattaya-sukhumvit/pattaya-sukhumvit-road.jpg",
};

const airportHighlightRouteIds: RouteId[] = [
  "suvarnabhumi-airport-to-pattaya",
  "don-mueang-airport-to-pattaya",
];

type TouristShortcut = {
  routeId: RouteId;
  title: string;
  description: string;
};

function getTouristShortcuts(locale: LocaleCode): {
  title: string;
  items: TouristShortcut[];
} {
  const shortcuts: Record<
    LocaleCode,
    { title: string; items: TouristShortcut[] }
  > = {
    de: {
      title: "Am nützlichsten für Reisende",
      items: [
        {
          routeId: "bangkok-to-pattaya",
          title: "Bangkok City nach Pattaya",
          description: "Buszeiten ab Ekkamai und Tipps zur Anreise.",
        },
        {
          routeId: "pattaya-to-suvarnabhumi-airport",
          title: "Pattaya zum Flughafen Bangkok",
          description: "Planen Sie die Fahrt vor dem Flug.",
        },
      ],
    },
    en: {
      title: "Most useful for travelers",
      items: [
        {
          routeId: "bangkok-to-pattaya",
          title: "Bangkok city to Pattaya",
          description: "Start here for Ekkamai bus times and station tips.",
        },
        {
          routeId: "pattaya-to-suvarnabhumi-airport",
          title: "Pattaya to Bangkok airport",
          description: "Useful before a flight from Suvarnabhumi.",
        },
      ],
    },
    fr: {
      title: "Le plus utile pour les voyageurs",
      items: [
        {
          routeId: "bangkok-to-pattaya",
          title: "Centre de Bangkok vers Pattaya",
          description: "Horaires depuis Ekkamai et conseils de station.",
        },
        {
          routeId: "pattaya-to-suvarnabhumi-airport",
          title: "Pattaya vers l’aéroport de Bangkok",
          description: "Utile avant un vol depuis Suvarnabhumi.",
        },
      ],
    },
    pl: {
      title: "Najbardziej przydatne dla podróżnych",
      items: [
        {
          routeId: "bangkok-to-pattaya",
          title: "Centrum Bangkoku do Pattayi",
          description: "Godziny z Ekkamai i praktyczne wskazówki o dworcu.",
        },
        {
          routeId: "pattaya-to-suvarnabhumi-airport",
          title: "Pattaya na lotnisko w Bangkoku",
          description: "Praktyczne przed lotem z Suvarnabhumi.",
        },
      ],
    },
    ru: {
      title: "Самое полезное для путешественников",
      items: [
        {
          routeId: "bangkok-to-pattaya",
          title: "Центр Бангкока в Паттайю",
          description: "Время автобусов от Эккамай и советы по станции.",
        },
        {
          routeId: "pattaya-to-suvarnabhumi-airport",
          title: "Паттайя в аэропорт Бангкока",
          description: "Полезно перед вылетом из Суварнабхуми.",
        },
      ],
    },
    th: {
      title: "มีประโยชน์ที่สุดสำหรับนักท่องเที่ยว",
      items: [
        {
          routeId: "bangkok-to-pattaya",
          title: "กรุงเทพฯ ไปพัทยา",
          description: "เวลาออกจากเอกมัยและคำแนะนำเรื่องสถานี",
        },
        {
          routeId: "pattaya-to-suvarnabhumi-airport",
          title: "พัทยาไปสนามบินกรุงเทพฯ",
          description: "เหมาะสำหรับวางแผนก่อนขึ้นเครื่องที่สุวรรณภูมิ",
        },
      ],
    },
    zh: {
      title: "旅客最常用",
      items: [
        {
          routeId: "bangkok-to-pattaya",
          title: "曼谷市区到芭提雅",
          description: "查看亿甲迈发车时间和车站提示。",
        },
        {
          routeId: "pattaya-to-suvarnabhumi-airport",
          title: "芭提雅到曼谷机场",
          description: "从素万那普起飞前很实用。",
        },
      ],
    },
  };

  return shortcuts[locale] ?? shortcuts.en;
}

const thaiMobileRouteMeta: Record<RouteId, { badge: string; note: string }> = {
  "bangkok-to-pattaya": {
    badge: "เส้นทางยอดนิยม",
    note: "ออกจากสถานีขนส่งเอกมัย",
  },
  "pattaya-to-bangkok": {
    badge: "เส้นทางกลับ",
    note: "ไปเอกมัยและหมอชิต",
  },
  "suvarnabhumi-airport-to-pattaya": {
    badge: "รถบัสสนามบิน",
    note: "เคาน์เตอร์ที่ชั้น 1",
  },
  "pattaya-to-suvarnabhumi-airport": {
    badge: "ก่อนขึ้นเครื่อง",
    note: "จากพื้นที่รถบัสจอมเทียน",
  },
  "don-mueang-airport-to-pattaya": {
    badge: "เส้นทางสนามบิน",
    note: "บริการของ Transport Co.",
  },
  "pattaya-to-don-mueang-airport": {
    badge: "ไปสนามบิน",
    note: "ยืนยันจุดขึ้นรถก่อนเดินทาง",
  },
};

const chineseMobileRouteMeta: Record<RouteId, { badge: string; note: string }> =
  {
    "bangkok-to-pattaya": {
      badge: "热门路线",
      note: "从亿甲迈汽车站出发",
    },
    "pattaya-to-bangkok": {
      badge: "返程路线",
      note: "前往亿甲迈和莫奇特",
    },
    "suvarnabhumi-airport-to-pattaya": {
      badge: "机场巴士",
      note: "柜台在1层",
    },
    "pattaya-to-suvarnabhumi-airport": {
      badge: "赶飞机",
      note: "从中天巴士区域出发",
    },
    "don-mueang-airport-to-pattaya": {
      badge: "机场路线",
      note: "Transport Co. 服务",
    },
    "pattaya-to-don-mueang-airport": {
      badge: "前往机场",
      note: "出行前确认上车点",
    },
  };

const frenchMobileRouteMeta: Record<RouteId, { badge: string; note: string }> =
  {
    "bangkok-to-pattaya": {
      badge: "Route populaire",
      note: "Depuis la gare routière d’Ekkamai",
    },
    "pattaya-to-bangkok": {
      badge: "Route retour",
      note: "Vers Ekkamai et Mo Chit",
    },
    "suvarnabhumi-airport-to-pattaya": {
      badge: "Bus aéroport",
      note: "Comptoir au niveau 1",
    },
    "pattaya-to-suvarnabhumi-airport": {
      badge: "Avant le vol",
      note: "Depuis la zone bus de Jomtien",
    },
    "don-mueang-airport-to-pattaya": {
      badge: "Route aéroport",
      note: "Service Transport Co.",
    },
    "pattaya-to-don-mueang-airport": {
      badge: "Vers l’aéroport",
      note: "Confirmez le point de départ",
    },
  };

function getMobileHomeCopy(locale: LocaleCode) {
  if (locale === "pl") {
    return {
      adviceTitle: "Ważne wskazówki",
      aboutEyebrow: "O przewodniku",
      aboutText:
        "Ta strona nie jest oficjalną stroną operatora autobusowego. Dane rozkładów opierają się na informacjach operatorów i ręcznych sprawdzeniach tam, gdzie to możliwe. Godziny mogą się zmienić, więc potwierdź je przed podróżą.",
      aboutTitle: "Niezależne informacje dla podróżnych",
      airport: "Lotnisko",
      airportHighlightEyebrow: "Po przylocie?",
      airportHighlightTitle: "Lotnisko → Pattaya",
      beforeTravel: "Przed podróżą",
      brandPrimary: "Bangkok Pattaya",
      brandSecondary: "Przewodnik autobusowy",
      bus: "Autobus",
      buyMeCoffee: "Postaw kawę",
      check: "Sprawdź",
      checkTimes: "Sprawdź godziny",
      chooseBus: "Wybierz autobus",
      chooseRoute: "Wybierz dokąd jedziesz",
      contact: "Kontakt",
      dataFactLabel: "Dane",
      dataFactValue: "Źródła operatorów",
      desktopIntro:
        "Godziny autobusów, ceny, stacje i praktyczne wskazówki dla Bangkoku, Pattayi oraz lotnisk Suvarnabhumi i Don Mueang.",
      findRoute: "Znajdź trasę",
      guides: "Przewodniki",
      heroEasy: "łatwo",
      heroLineOne: "Podróżuj",
      heroLineTwo: "podróżuj",
      heroSmart: "sprytnie,",
      homepageH1: "Rozkład, ceny i dworce autobusów Bangkok Pattaya",
      hoursShort: "godz.",
      home: "Home",
      leavesIn: "Pozostało do odjazdu",
      minutesShort: "min",
      mobileHeroKicker: "Bangkok i Pattaya",
      nextBus: "Najbliższy autobus",
      now: "Teraz",
      open: "Otwórz",
      popularRoutes: "Popularne trasy",
      price: "Cena",
      routeMeta: polishMobileRouteMeta,
      routes: "Trasy",
      routePickerHelp:
        "Wybierz zapisaną trasę, a strona otworzy rozkład, stacje i informacje o źródłach.",
      safetyFactLabel: "Bezpieczeństwo",
      safetyFactValue: "Potwierdź przed podróżą",
      startHere: "Zacznij tutaj",
      subtitle:
        "Proste godziny odjazdów, ceny, stacje i praktyczne wskazówki.",
      swipe: "Przesuń",
      time: "Czas",
      timeFactLabel: "Godziny",
      timeFactValue: "Czas lokalny w Tajlandii",
      title: "Bangkok Pattaya Bus Guide",
      travelTime: "Czas podróży",
      ticketPrice: "Cena biletu",
      travelRoutes: "Trasy autobusowe w Tajlandii",
      viewRoute: "Zobacz trasę",
      tips: [
        "Przyjdź 20–30 minut przed odjazdem.",
        "Potwierdź godziny przed podróżą.",
        "Miej trochę gotówki na bilety.",
        "Sprawdź stację przed wyjazdem.",
      ],
    };
  }

  if (locale === "ru") {
    return {
      adviceTitle: "Важные советы",
      aboutEyebrow: "О гиде",
      aboutText:
        "Этот сайт не является официальным сайтом автобусного оператора. Данные расписания основаны на информации операторов и ручных проверках, где это возможно. Время может измениться, поэтому подтвердите его перед поездкой.",
      aboutTitle: "Независимая информация для путешественников",
      airport: "Аэропорт",
      airportHighlightEyebrow: "Только прилетели?",
      airportHighlightTitle: "Аэропорт → Паттайя",
      beforeTravel: "Перед поездкой",
      brandPrimary: "Бангкок Паттайя",
      brandSecondary: "Гид по автобусам",
      bus: "Автобус",
      buyMeCoffee: "Купить кофе",
      check: "Проверить",
      checkTimes: "Показать время",
      chooseBus: "Выберите автобус",
      chooseRoute: "Выберите маршрут",
      contact: "Контакты",
      dataFactLabel: "Данные",
      dataFactValue: "Источники операторов",
      desktopIntro:
        "Время автобусов, цены, станции и практические советы для Бангкока, Паттайи, аэропорта Суварнабхуми и аэропорта Дон Муанг.",
      findRoute: "Найти маршрут",
      guides: "Путеводители",
      heroEasy: "легко",
      heroLineOne: "Путешествуйте",
      heroLineTwo: "путешествуйте",
      heroSmart: "умно,",
      homepageH1: "Автобусы Бангкок Паттайя: расписание, цены и станции",
      home: "Главная",
      hoursShort: "ч",
      leavesIn: "До отправления",
      minutesShort: "мин",
      mobileHeroKicker: "Бангкок и Паттайя",
      nextBus: "Следующий автобус",
      now: "Сейчас",
      open: "Открыть",
      popularRoutes: "Популярные маршруты",
      price: "Цена",
      routeMeta: russianMobileRouteMeta,
      routes: "Маршруты",
      routePickerHelp:
        "Выберите сохранённый маршрут, и откроется страница с расписанием, станциями и источниками данных.",
      safetyFactLabel: "Безопасность",
      safetyFactValue: "Подтвердите перед поездкой",
      startHere: "Начните здесь",
      subtitle:
        "Простое расписание автобусов, цены, станции и полезные советы.",
      swipe: "Листайте",
      time: "Время",
      timeFactLabel: "Время",
      timeFactValue: "Местное время Таиланда",
      title: "Гид по автобусам Бангкок Паттайя",
      travelTime: "Время в пути",
      ticketPrice: "Цена билета",
      travelRoutes: "Автобусные маршруты в Таиланде",
      viewRoute: "Открыть маршрут",
      tips: [
        "Приходите за 20–30 минут до отправления.",
        "Подтвердите время перед поездкой.",
        "Держите немного наличных для билетов.",
        "Проверьте станцию перед выездом.",
      ],
    };
  }

  if (locale === "de") {
    return {
      adviceTitle: "Wichtige Hinweise",
      aboutEyebrow: "Über diesen Guide",
      aboutText:
        "Diese Website ist keine offizielle Website eines Busbetreibers. Fahrplandaten basieren auf Betreiberinformationen und manuellen Prüfungen, soweit möglich. Zeiten können sich ändern, bitte bestätigen Sie sie vor der Reise.",
      aboutTitle: "Unabhängige Reiseinformationen",
      airport: "Flughafen",
      airportHighlightEyebrow: "Gerade gelandet?",
      airportHighlightTitle: "Flughafen → Pattaya",
      beforeTravel: "Vor der Reise",
      brandPrimary: "Bangkok Pattaya",
      brandSecondary: "Bus Guide",
      bus: "Bus",
      buyMeCoffee: "Kaffee spendieren",
      check: "Prüfen",
      checkTimes: "Zeiten prüfen",
      chooseBus: "Bus auswählen",
      chooseRoute: "Route auswählen",
      contact: "Kontakt",
      dataFactLabel: "Daten",
      dataFactValue: "Betreiberquellen",
      desktopIntro:
        "Buszeiten, Preise, Stationen und praktische Reisetipps für Bangkok, Pattaya, den Flughafen Suvarnabhumi und den Flughafen Don Mueang.",
      findRoute: "Route finden",
      guides: "Reiseführer",
      heroEasy: "einfach",
      heroLineOne: "Reise",
      heroLineTwo: "reise",
      heroSmart: "smart,",
      homepageH1: "Bangkok Pattaya Buszeiten, Preise und Stationen",
      home: "Home",
      hoursShort: "Std.",
      leavesIn: "Bis zur Abfahrt",
      minutesShort: "Min.",
      mobileHeroKicker: "Bangkok & Pattaya",
      nextBus: "Nächster Bus",
      now: "Jetzt",
      open: "Öffnen",
      popularRoutes: "Beliebte Routen",
      price: "Preis",
      routeMeta: germanMobileRouteMeta,
      routes: "Routen",
      routePickerHelp:
        "Wählen Sie eine gespeicherte Route. Die Seite öffnet Fahrpläne, Stationen und Quellenhinweise.",
      safetyFactLabel: "Sicherheit",
      safetyFactValue: "Vor der Reise bestätigen",
      startHere: "Hier starten",
      subtitle:
        "Einfache Buszeiten, Preise, Stationen und praktische Reisetipps.",
      swipe: "Wischen",
      time: "Zeit",
      timeFactLabel: "Zeiten",
      timeFactValue: "Thailändische Ortszeit",
      title: "Bangkok Pattaya Bus Guide",
      travelTime: "Fahrzeit",
      ticketPrice: "Ticketpreis",
      travelRoutes: "Buslinien in Thailand",
      viewRoute: "Route öffnen",
      tips: [
        "Kommen Sie 20–30 Minuten vor Abfahrt an.",
        "Bestätigen Sie die Zeiten vor der Reise.",
        "Halten Sie etwas Bargeld für Tickets bereit.",
        "Prüfen Sie die Station vor der Fahrt.",
      ],
    };
  }

  if (locale === "th") {
    return {
      adviceTitle: "คำแนะนำสำคัญ",
      aboutEyebrow: "เกี่ยวกับคู่มือนี้",
      aboutText:
        "เว็บไซต์นี้ไม่ใช่เว็บไซต์อย่างเป็นทางการของผู้ให้บริการรถบัส ข้อมูลตารางเวลาอ้างอิงจากข้อมูลของผู้ให้บริการและการตรวจสอบด้วยตนเองเท่าที่ทำได้ เวลาเดินรถอาจเปลี่ยนแปลงได้ โปรดยืนยันก่อนเดินทาง",
      aboutTitle: "ข้อมูลเดินทางอิสระสำหรับนักท่องเที่ยว",
      airport: "สนามบิน",
      airportHighlightEyebrow: "เพิ่งลงเครื่อง?",
      airportHighlightTitle: "สนามบิน → พัทยา",
      beforeTravel: "ก่อนเดินทาง",
      brandPrimary: "กรุงเทพฯ พัทยา",
      brandSecondary: "คู่มือรถบัส",
      bus: "รถบัส",
      buyMeCoffee: "เลี้ยงกาแฟ",
      check: "ตรวจสอบ",
      checkTimes: "ดูเวลาเดินรถ",
      chooseBus: "เลือกรถบัส",
      chooseRoute: "เลือกเส้นทาง",
      contact: "ติดต่อ",
      dataFactLabel: "ข้อมูล",
      dataFactValue: "แหล่งข้อมูลผู้ให้บริการ",
      desktopIntro:
        "เวลาเดินรถ ราคา สถานี และคำแนะนำที่เป็นประโยชน์สำหรับกรุงเทพฯ พัทยา ท่าอากาศยานสุวรรณภูมิ และท่าอากาศยานดอนเมือง",
      findRoute: "ค้นหาเส้นทาง",
      guides: "คู่มือ",
      heroEasy: "ง่าย",
      heroLineOne: "เดินทาง",
      heroLineTwo: "เดินทาง",
      heroSmart: "ฉลาด,",
      homepageH1: "เวลารถบัส กรุงเทพฯ พัทยา ราคา และสถานี",
      home: "หน้าแรก",
      hoursShort: "ชม.",
      leavesIn: "ออกในอีก",
      minutesShort: "นาที",
      mobileHeroKicker: "กรุงเทพฯ และพัทยา",
      nextBus: "รถบัสเที่ยวถัดไป",
      now: "ตอนนี้",
      open: "เปิด",
      popularRoutes: "เส้นทางยอดนิยม",
      price: "ราคา",
      routeMeta: thaiMobileRouteMeta,
      routes: "เส้นทาง",
      routePickerHelp:
        "เลือกเส้นทางที่บันทึกไว้ เพื่อเปิดหน้าตารางเวลา สถานี และแหล่งข้อมูล",
      safetyFactLabel: "ความปลอดภัย",
      safetyFactValue: "ยืนยันก่อนเดินทาง",
      startHere: "เริ่มที่นี่",
      subtitle: "เวลาเดินรถ ราคา สถานี และคำแนะนำแบบเข้าใจง่าย",
      swipe: "เลื่อน",
      time: "เวลา",
      timeFactLabel: "เวลา",
      timeFactValue: "เวลาท้องถิ่นของประเทศไทย",
      title: "คู่มือรถบัสกรุงเทพฯ พัทยา",
      travelTime: "เวลาเดินทาง",
      ticketPrice: "ราคาตั๋ว",
      travelRoutes: "เส้นทางรถบัสในประเทศไทย",
      viewRoute: "ดูเส้นทาง",
      tips: [
        "มาถึงก่อนเวลาออกเดินทาง 20–30 นาที",
        "ยืนยันเวลาเดินรถก่อนเดินทาง",
        "เตรียมเงินสดไว้สำหรับซื้อตั๋ว",
        "ตรวจสอบสถานีก่อนออกเดินทาง",
      ],
    };
  }

  if (locale === "zh") {
    return {
      adviceTitle: "重要提示",
      aboutEyebrow: "关于本指南",
      aboutText:
        "本网站不是官方巴士运营商网站。时刻表数据基于运营商信息，并尽可能进行人工检查。巴士时间可能会变动，出行前请再次确认。",
      aboutTitle: "面向旅客的独立出行信息",
      airport: "机场",
      airportHighlightEyebrow: "刚落地？",
      airportHighlightTitle: "机场 → 芭提雅",
      beforeTravel: "出行前",
      brandPrimary: "曼谷芭提雅",
      brandSecondary: "巴士指南",
      bus: "巴士",
      buyMeCoffee: "请我喝咖啡",
      check: "查看",
      checkTimes: "查看时间",
      chooseBus: "选择巴士",
      chooseRoute: "选择路线",
      contact: "联系",
      dataFactLabel: "数据",
      dataFactValue: "运营商来源",
      desktopIntro:
        "查看曼谷、芭提雅、素万那普机场和廊曼机场的巴士时间、票价、车站和实用出行提示。",
      findRoute: "查找路线",
      guides: "指南",
      heroEasy: "旅行",
      heroLineOne: "聪明",
      heroLineTwo: "轻松",
      heroSmart: "出行，",
      homepageH1: "曼谷芭提雅巴士时间、票价和车站",
      home: "首页",
      hoursShort: "小时",
      leavesIn: "距离发车",
      minutesShort: "分钟",
      mobileHeroKicker: "曼谷与芭提雅",
      nextBus: "下一班巴士",
      now: "现在",
      open: "打开",
      popularRoutes: "热门路线",
      price: "价格",
      routeMeta: chineseMobileRouteMeta,
      routes: "路线",
      routePickerHelp:
        "选择已保存的路线，打开时刻表、车站和数据来源信息。",
      safetyFactLabel: "安全",
      safetyFactValue: "出行前请确认",
      startHere: "从这里开始",
      subtitle: "简单查看巴士时间、票价、车站和实用提示。",
      swipe: "滑动",
      time: "时间",
      timeFactLabel: "时间",
      timeFactValue: "泰国当地时间",
      title: "曼谷芭提雅巴士指南",
      travelTime: "行程时间",
      ticketPrice: "票价",
      travelRoutes: "泰国巴士路线",
      viewRoute: "查看路线",
      tips: [
        "请提前20–30分钟到达。",
        "出行前确认发车时间。",
        "准备一些现金买票。",
        "出发前确认车站位置。",
      ],
    };
  }

  if (locale === "fr") {
    return {
      adviceTitle: "Conseils essentiels",
      aboutEyebrow: "À propos de ce guide",
      aboutText:
        "Ce site n’est pas le site officiel d’un opérateur de bus. Les horaires sont basés sur les informations des opérateurs et des vérifications manuelles lorsque c’est possible. Les horaires peuvent changer, confirmez-les avant de voyager.",
      aboutTitle: "Informations de voyage indépendantes",
      airport: "Aéroport",
      airportHighlightEyebrow: "Vous venez d’atterrir ?",
      airportHighlightTitle: "Aéroport → Pattaya",
      beforeTravel: "Avant le départ",
      brandPrimary: "Bangkok Pattaya",
      brandSecondary: "Guide bus",
      bus: "Bus",
      buyMeCoffee: "M'offrir un café",
      check: "Vérifier",
      checkTimes: "Voir les horaires",
      chooseBus: "Choisissez votre bus",
      chooseRoute: "Choisissez votre route",
      contact: "Nous contacter",
      dataFactLabel: "Données",
      dataFactValue: "Sources opérateurs",
      desktopIntro:
        "Horaires de bus, prix, gares et conseils pratiques pour Bangkok, Pattaya, l’aéroport Suvarnabhumi et l’aéroport Don Mueang.",
      findRoute: "Trouver une route",
      guides: "Guides",
      heroEasy: "facile",
      heroLineOne: "Voyagez",
      heroLineTwo: "voyagez",
      heroSmart: "malin,",
      homepageH1: "Bus Bangkok Pattaya : horaires, prix et gares",
      home: "Accueil",
      hoursShort: "h",
      leavesIn: "Départ dans",
      minutesShort: "min",
      mobileHeroKicker: "Bangkok et Pattaya",
      nextBus: "Prochain bus",
      now: "Maintenant",
      open: "Ouvrir",
      popularRoutes: "Routes populaires",
      price: "Prix",
      routeMeta: frenchMobileRouteMeta,
      routes: "Routes",
      routePickerHelp:
        "Choisissez une route enregistrée pour ouvrir les horaires, les gares et les sources.",
      safetyFactLabel: "Sécurité",
      safetyFactValue: "Confirmer avant le voyage",
      startHere: "Commencer ici",
      subtitle:
        "Horaires de bus, prix, gares et conseils pratiques en toute simplicité.",
      swipe: "Faites glisser",
      time: "Temps",
      timeFactLabel: "Horaires",
      timeFactValue: "Heure locale de Thaïlande",
      title: "Bangkok Pattaya Bus Guide",
      travelTime: "Durée du trajet",
      ticketPrice: "Prix du billet",
      travelRoutes: "Routes de bus en Thaïlande",
      viewRoute: "Voir la route",
      tips: [
        "Arrivez 20–30 minutes avant le départ.",
        "Confirmez les horaires avant de voyager.",
        "Gardez un peu d’argent liquide pour les billets.",
        "Vérifiez la gare avant de partir.",
      ],
    };
  }

  return {
    adviceTitle: "Essential advice",
    aboutEyebrow: "About this guide",
    aboutText:
      "This website is not an official bus operator. Schedule data is based on published operator information and manual checks where possible. Bus times may change, so confirm before travel.",
    aboutTitle: "Independent travel information",
    airport: "Airport",
    airportHighlightEyebrow: "Just landed?",
    airportHighlightTitle: "Airport → Pattaya",
    beforeTravel: "Before you travel",
    brandPrimary: "Bangkok Pattaya",
    brandSecondary: "Bus Guide",
    bus: "Bus",
    buyMeCoffee: "Buy me coffee",
    check: "Check",
    checkTimes: "Check times",
    chooseBus: "Choose your bus",
    chooseRoute: "Choose where you are going",
    contact: "Contact",
    dataFactLabel: "Data",
    dataFactValue: "Operator sources",
    desktopIntro:
      "Bus times, prices, stations, and practical travel tips for Bangkok, Pattaya, Suvarnabhumi Airport, and Don Mueang Airport.",
    findRoute: "Find your route",
    guides: "Guides",
      heroEasy: "easy",
      heroLineOne: "Travel",
      heroLineTwo: "travel",
      heroSmart: "smart,",
      homepageH1: "Bangkok Pattaya Bus Times, Prices & Stations",
    hoursShort: "h",
    home: "Home",
    leavesIn: "Leaves in",
    minutesShort: "min",
    mobileHeroKicker: "Bangkok & Pattaya",
    nextBus: "Next bus",
    now: "Now",
    open: "Open",
    popularRoutes: "Popular routes",
    price: "Price",
    routeMeta: mobileRouteMeta,
    routes: "Routes",
    routePickerHelp:
      "Pick a saved route and the page opens with schedules, stations, and source details.",
    safetyFactLabel: "Safety",
    safetyFactValue: "Confirm before travel",
    startHere: "Start here",
    subtitle: "Simple bus times, prices, stations, and practical travel tips.",
    swipe: "Swipe",
    time: "Time",
    timeFactLabel: "Times",
    timeFactValue: "Thailand local time",
    title: "Bangkok Pattaya Bus Guide",
    travelTime: "Travel time",
    ticketPrice: "Ticket price",
    travelRoutes: "Thailand bus routes",
    viewRoute: "View route",
    tips: [
      "Arrive 20-30 minutes before departure.",
      "Confirm times before travel.",
      "Keep some cash for tickets.",
      "Check the station before you go.",
    ],
  };
}

function MobileHome({
  locale,
  routePagesForLocale,
  schedulesForLocale,
  t,
}: {
  locale: LocaleCode;
  routePagesForLocale: RoutePage[];
  schedulesForLocale: Schedule[];
  t: Translations;
}) {
  const copy = getMobileHomeCopy(locale);
  const touristShortcuts = getTouristShortcuts(locale);
  const uiText = getUiTranslations(locale);
  const featuredRoute = routePagesForLocale[0];
  const countdownLabels = {
    check: copy.check,
    hoursShort: copy.hoursShort,
    leavesIn: copy.leavesIn,
    minutesShort: copy.minutesShort,
    nextBus: copy.nextBus,
    now: copy.now,
  };
  const featuredSchedule = schedulesForLocale.find(
    (schedule) => schedule.direction === featuredRoute?.slug,
  );
  const featuredRouteHasTickets = featuredRoute
    ? hasTwelveGoTickets(featuredRoute.slug)
    : false;
  const airportHighlightRoutes = airportHighlightRouteIds
    .map((routeId) =>
      routePagesForLocale.find((routePage) => routePage.slug === routeId),
    )
    .filter((routePage): routePage is RoutePage => Boolean(routePage));

  return (
    <section className="mx-auto flex h-dvh min-h-dvh w-full max-w-[390px] flex-col overflow-hidden bg-[#fbf8f3] text-[#13233a] shadow-2xl shadow-[#13233a]/15 lg:h-auto lg:min-h-screen lg:max-w-7xl lg:overflow-visible lg:bg-transparent lg:px-8 lg:py-8 lg:shadow-none">
      <div className="flex-1 overflow-y-auto pb-44 md:overflow-visible md:pb-0">
        <div className="overflow-hidden rounded-b-[2rem] bg-[#0e1e2e] text-white shadow-xl shadow-[#13233a]/20 lg:rounded-[2rem]">
          <div className="flex items-center justify-between px-4 pb-3 pt-[calc(env(safe-area-inset-top)+0.9rem)] md:px-8 md:pb-4 md:pt-6">
            <Link href={`/${locale}`} className="flex min-w-0 items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0e7b6b] p-1.5 shadow-sm ring-1 ring-white/10">
                <Image
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-contain"
                  height={44}
                  src="/images/icons/icon-brand.png"
                  width={44}
                />
              </span>
              <div className="min-w-0">
                <p className="truncate text-base font-black leading-tight">
                  {copy.brandPrimary}
                </p>
                <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#e8b05a]">
                  {copy.brandSecondary}
                </p>
              </div>
            </Link>
            <LanguageSwitcher
              label={t.navigation.chooseLanguage}
              currentLocale={locale}
            />
          </div>

          {featuredRoute ? (
            <MobileDestinationWeather
              locale={locale}
              routeSlug={featuredRoute.slug}
            />
          ) : null}

          <div className="relative px-4 pb-4 pt-3 md:px-8 md:pb-8 md:pt-6">
            <div className="absolute inset-x-4 bottom-0 top-4 overflow-hidden rounded-[2rem] md:inset-x-8 md:rounded-[2.25rem]">
              <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 800 420"
                fill="none"
                preserveAspectRatio="xMidYMax slice"
              >
                <path
                  d="M60 380 C 240 342, 330 226, 470 188 S 686 122, 734 98"
                  stroke="#2c4d74"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="1 15"
                />
                <circle cx="60" cy="380" r="7" fill="#2c4d74" />
                <circle cx="734" cy="98" r="17" stroke="#e8b05a" strokeOpacity="0.45" strokeWidth="2" />
                <circle cx="734" cy="98" r="6.5" fill="#e8b05a" fillOpacity="0.8" />
              </svg>
            </div>
            <div className="relative pb-2 pt-4 md:min-h-[390px] md:pb-0 md:pt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-10">
              <div className="min-w-0">
                <span className="inline-flex rounded-full bg-[#0e1e2e]/90 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#f3d77b] ring-1 ring-white/20">
                  {copy.mobileHeroKicker}
                </span>
                <p className="mt-2 text-sm font-black tracking-tight text-[#f3d77b] md:hidden">
                  {copy.heroLineOne} <span className="italic">{copy.heroSmart}</span>{" "}
                  {copy.heroLineTwo} <span className="italic">{copy.heroEasy}</span>
                </p>
                <p className="mt-3 hidden max-w-3xl text-5xl font-black leading-[0.95] tracking-tight md:block lg:text-6xl">
                  {copy.heroLineOne}{" "}
                  <span className="italic text-[#f3d77b]">
                    {copy.heroSmart}
                  </span>
                  <br />
                  {copy.heroLineTwo}{" "}
                  <span className="italic text-[#f3d77b]">
                    {copy.heroEasy}
                  </span>
                </p>
                <h1 className="mt-2 max-w-[18rem] text-2xl font-black leading-[1.02] tracking-tight text-white md:mt-3 md:max-w-3xl md:text-4xl lg:text-5xl">
                  {copy.homepageH1}
                </h1>
                <p className="mt-2 max-w-[17.5rem] text-[0.84rem] font-semibold leading-5 text-[#e8edf5] md:max-w-xl md:text-base md:leading-7">
                  {copy.subtitle}
                </p>
                {featuredRoute ? (
                  <div className="mt-4 rounded-[1.45rem] bg-white/95 p-2.5 text-[#13233a] shadow-xl shadow-black/20 md:max-w-xl md:p-3">
                    <RouteSearch
                      allowCurrentRouteNavigation
                      compact
                      currentRoute={featuredRoute.slug}
                      from={featuredRoute.from}
                      labels={t.routeSelector}
                      locale={locale}
                      routePages={routePagesForLocale}
                      to={featuredRoute.to}
                    />
                  </div>
                ) : null}
                {featuredRoute && featuredSchedule ? (
                  <div className="mt-3 rounded-[1.35rem] border border-white/15 bg-white/95 p-3 text-[#13233a] shadow-xl shadow-black/20 lg:hidden">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-[#0e7b6b]">
                          {copy.nextBus}
                        </p>
                        <h2 className="mt-1 text-base font-black leading-tight">
                          {featuredRoute.title}
                        </h2>
                      </div>
                      <Link
                        href={`/${locale}/${featuredRoute.slug}`}
                        className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-[#13233a] px-3 text-xs font-black text-white"
                      >
                        {copy.viewRoute}
                      </Link>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <MobileMiniFact
                        compact
                        fallbackLabel={copy.check}
                        label={copy.time}
                        value={featuredSchedule.travelTime}
                      />
                      <MobileMiniFact
                        compact
                        fallbackLabel={copy.check}
                        label={copy.price}
                        value={getHomepageSchedulePrice(featuredSchedule)}
                      />
                    </div>
                    <MobileRouteCountdown
                      labels={countdownLabels}
                      schedule={featuredSchedule}
                    />
                    <p className="mt-2 text-[0.65rem] font-bold leading-4 text-[#4f5d6c]">
                      {t.schedule.source.replace(/\s*:+$/, "")}: {featuredSchedule.sourceName} ·{" "}
                      {t.schedule.lastVerified.replace(/\s*:+$/, "")}: {featuredSchedule.lastVerified}
                    </p>
                  </div>
                ) : null}
              </div>
              <div className="mt-4 lg:mt-0 lg:self-end">
                <HomepageRevenueHeroCard locale={locale} />
                {featuredRoute && featuredSchedule ? (
                  <div className="mt-4 hidden rounded-[1.65rem] border border-white/15 bg-white/95 p-5 text-[#13233a] shadow-2xl shadow-black/20 lg:block">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0e7b6b]">
                      {copy.nextBus}
                    </p>
                    <h2 className="mt-2 text-2xl font-black leading-tight">
                      {featuredRoute.title}
                    </h2>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <MobileMiniFact
                        fallbackLabel={copy.check}
                        label={copy.time}
                        value={featuredSchedule.travelTime}
                      />
                      <MobileMiniFact
                        fallbackLabel={copy.check}
                        label={copy.price}
                        value={getHomepageSchedulePrice(featuredSchedule)}
                      />
                    </div>
                    <MobileRouteCountdown
                      labels={countdownLabels}
                      schedule={featuredSchedule}
                    />
                    {featuredRouteHasTickets ? (
                      <TravelDateAwareTwelveGoAffiliateButton
                        ariaLabel={
                          uiText.affiliate.variantLabels.homepageCardAria
                        }
                        className="mt-4 flex min-h-11 items-center justify-center rounded-xl bg-[#13233a] px-5 text-sm font-black text-white shadow-sm transition hover:bg-[#1d3455]"
                        ctaPosition="homepage_route_card"
                        disclosureMode="none"
                        label={uiText.affiliate.variantLabels.homepageCardCta}
                        locale={locale}
                        routeId={featuredRoute.slug}
                      />
                    ) : null}
                    <Link
                      href={`/${locale}/${featuredRoute.slug}`}
                      className={
                        featuredRouteHasTickets
                          ? "mt-3 flex min-h-11 items-center justify-center rounded-xl border border-[#d8c8b4] bg-white px-5 text-sm font-black text-[#13233a] transition hover:bg-[#fffaf2]"
                          : "mt-4 flex min-h-11 items-center justify-center rounded-xl bg-[#13233a] px-5 text-sm font-black text-white shadow-sm transition hover:bg-[#1d3455]"
                      }
                    >
                      {copy.viewRoute}
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <MobileAirportHighlightSection
          copy={copy}
          countdownLabels={countdownLabels}
          locale={locale}
          routePages={airportHighlightRoutes}
          schedulesForLocale={schedulesForLocale}
        />

        <section
          id="popular-routes"
          data-visual-qa="homepage-popular-routes"
          className="scroll-mt-6 md:mt-6 md:rounded-[2rem] md:border md:border-[#eadcc7] md:bg-white md:p-6 md:shadow-sm"
        >
          <div className="mb-3 flex items-end justify-between gap-3 px-4 pt-5 md:px-0 md:pt-0">
            <div>
              <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#0e7b6b]">
                {copy.popularRoutes}
              </p>
              <h2 className="text-xl font-black leading-tight text-[#13233a]">
                {copy.chooseBus}
              </h2>
            </div>
          </div>
          <div
            aria-label={copy.popularRoutes}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#13233a] focus-visible:ring-offset-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-4 sm:pb-4 md:px-0 md:pb-0 lg:grid-cols-3"
            data-visual-qa="homepage-route-grid"
            role="group"
            tabIndex={0}
          >
            {routePagesForLocale.map((routePage) => (
              <MobileRouteCard
                copy={copy}
                countdownLabels={countdownLabels}
                key={routePage.slug}
                locale={locale}
                routePage={routePage}
                schedule={schedulesForLocale.find(
                  (schedule) => schedule.direction === routePage.slug,
                )}
              />
            ))}
          </div>
          <p className="px-4 pb-1 text-xs font-semibold leading-5 text-[#5f6874] md:px-0 md:pt-4">
            {uiText.affiliate.disclosure}
          </p>
        </section>

        <section className="mx-4 mt-2 rounded-[1.5rem] border border-[#eadcc7] bg-white p-4 shadow-sm md:mx-0 md:mt-6 md:rounded-[2rem] md:p-6">
          <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#0e7b6b]">
            {touristShortcuts.title}
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
            {touristShortcuts.items.map((shortcut) => {
              const routePage = routePagesForLocale.find(
                (page) => page.slug === shortcut.routeId,
              );

              if (!routePage) {
                return null;
              }

              return (
                <li key={shortcut.routeId} className="min-w-0">
                  <Link
                    href={`/${locale}/${shortcut.routeId}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#eadcc7] bg-[#fffaf2] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span className="relative block h-20 overflow-hidden bg-[#13233a]">
                      <Image
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        fill
                        sizes="(min-width: 768px) 180px, 45vw"
                        src={mobileRouteImages[shortcut.routeId]}
                      />
                      <span className="absolute inset-0 bg-gradient-to-b from-[#0e1e2e]/10 via-[#0e1e2e]/25 to-[#0e1e2e]/70" />
                    </span>
                    <span className="flex flex-1 flex-col p-3">
                      <span className="text-sm font-black leading-tight text-[#13233a]">
                        {shortcut.title}
                      </span>
                      <span className="mt-1 text-xs font-semibold leading-5 text-[#5f6874]">
                        {shortcut.description}
                      </span>
                      <span className="mt-auto pt-3 text-xs font-black text-[#0e7b6b]">
                        {copy.viewRoute}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <MoreThailandRoutes className="mx-4 mt-2 md:mx-0 md:mt-6" />

        <div id="travel-guides" className="scroll-mt-6">
          <TravelGuideLinks
            className="mx-4 rounded-[1.5rem] border border-[#eadcc7] bg-white p-4 shadow-sm md:mx-0 md:mt-6 md:rounded-[2rem] md:p-6"
            locale={locale}
          />
        </div>

        <section className="mx-4 rounded-[1.5rem] border border-[#e8c986] bg-[#fff8ec] p-4 shadow-sm md:mx-0 md:mt-6 md:rounded-[2rem] md:p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#efd18a]">
              <IconAsset name="tips" size="lg" />
            </span>
            <div>
              <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#8a5b12]">
                {copy.beforeTravel}
              </p>
              <h2 className="text-xl font-black text-[#13233a]">
                {copy.adviceTitle}
              </h2>
            </div>
          </div>
          <div className="mt-3 space-y-2 md:grid md:grid-cols-3 md:gap-3 md:space-y-0">
            {copy.tips.map((tip) => (
              <p
                key={tip}
                className="rounded-2xl bg-white/70 px-3 py-2 text-sm font-bold leading-5 text-[#4f5d6c]"
              >
                {tip}
              </p>
            ))}
          </div>
        </section>
      </div>

      <MobileHomepageBookingBar locale={locale} />
      <MobileBottomNav copy={copy} locale={locale} />
    </section>
  );
}

function MobileAirportHighlightSection({
  copy,
  countdownLabels,
  locale,
  routePages,
  schedulesForLocale,
}: {
  copy: ReturnType<typeof getMobileHomeCopy>;
  countdownLabels: NonNullable<
    ComponentProps<typeof MobileRouteCountdown>["labels"]
  >;
  locale: LocaleCode;
  routePages: RoutePage[];
  schedulesForLocale: Schedule[];
}) {
  const affiliateText = getUiTranslations(locale).affiliate.variantLabels;

  if (routePages.length === 0) {
    return null;
  }

  return (
    <section
      className="mx-4 mt-4 rounded-[1.5rem] border border-[#eadcc7] bg-white p-4 shadow-sm md:mx-0 md:mt-6 md:rounded-[2rem] md:p-6"
      data-homepage-airport-highlight="true"
    >
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#0e7b6b]">
            {copy.airportHighlightEyebrow}
          </p>
          <h2 className="text-xl font-black leading-tight text-[#13233a]">
            {copy.airportHighlightTitle}
          </h2>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {routePages.map((routePage) => {
          const schedule = schedulesForLocale.find(
            (routeSchedule) => routeSchedule.direction === routePage.slug,
          );
          const meta = copy.routeMeta[routePage.slug];
          const routeImage = mobileRouteImages[routePage.slug];
          const hasTickets = hasTwelveGoTickets(routePage.slug);

          return (
            <article
              key={routePage.slug}
              className="overflow-hidden rounded-[1.35rem] border border-[#eadcc7] bg-[#fffaf2] shadow-sm"
            >
              <Link
                href={`/${locale}/${routePage.slug}`}
                className="grid grid-cols-[5rem_minmax(0,1fr)] gap-3 p-3"
              >
                <span className="relative block h-20 overflow-hidden rounded-2xl bg-[#13233a]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover"
                    fill
                    sizes="80px"
                    src={routeImage}
                  />
                  <span className="absolute inset-0 bg-gradient-to-b from-black/5 via-[#0e1e2e]/15 to-[#0e1e2e]/50" />
                </span>
                <span className="min-w-0 self-center">
                  <span className="block text-[0.65rem] font-black uppercase tracking-[0.14em] text-[#0e7b6b]">
                    {meta.badge}
                  </span>
                  <span className="mt-1 block text-sm font-black leading-tight text-[#13233a]">
                    {routePage.title}
                  </span>
                  <span className="mt-1 block text-xs font-semibold leading-4 text-[#5f6874]">
                    {meta.note}
                  </span>
                </span>
              </Link>
              <div className="px-3 pb-3">
                <div className="grid grid-cols-2 gap-2">
                  <MobileMiniFact
                    compact
                    fallbackLabel={copy.check}
                    label={copy.time}
                    value={schedule?.travelTime}
                  />
                  <MobileMiniFact
                    compact
                    fallbackLabel={copy.check}
                    label={copy.price}
                    value={
                      schedule ? getHomepageSchedulePrice(schedule) : undefined
                    }
                  />
                </div>
                <MobileRouteCountdown
                  labels={countdownLabels}
                  schedule={schedule}
                />
                {hasTickets ? (
                  <TravelDateAwareTwelveGoAffiliateButton
                    ariaLabel={affiliateText.homepageCardAria}
                    className="mt-3 flex min-h-11 items-center justify-center rounded-xl bg-[#e8b05a] px-3 text-center text-xs font-black text-[#13233a] shadow-sm transition hover:bg-[#dca23f]"
                    ctaPosition="homepage_airport_highlight"
                    disclosureMode="none"
                    label={affiliateText.homepageCardCta}
                    locale={locale}
                    routeId={routePage.slug}
                  />
                ) : null}
                <Link
                  href={`/${locale}/${routePage.slug}`}
                  className="mt-2 flex min-h-11 items-center justify-center rounded-xl border border-[#d8c8b4] bg-white px-3 text-center text-xs font-black text-[#13233a] transition hover:bg-[#fffaf2]"
                >
                  {copy.viewRoute}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function MobileRouteCard({
  copy,
  countdownLabels,
  locale,
  routePage,
  schedule,
}: {
  copy: ReturnType<typeof getMobileHomeCopy>;
  countdownLabels: NonNullable<
    ComponentProps<typeof MobileRouteCountdown>["labels"]
  >;
  locale: LocaleCode;
  routePage: RoutePage;
  schedule?: Schedule;
}) {
  const meta = copy.routeMeta[routePage.slug];
  const routeImage = mobileRouteImages[routePage.slug];
  const hasTickets = hasTwelveGoTickets(routePage.slug);
  const affiliateText = getUiTranslations(locale).affiliate.variantLabels;

  return (
    <article
      className="flex w-[240px] flex-none snap-start flex-col overflow-hidden rounded-[1.35rem] border border-[#eadcc7] bg-white shadow-sm sm:w-auto sm:min-w-0"
      data-visual-qa="homepage-route-card"
    >
      <Link
        href={`/${locale}/${routePage.slug}`}
        className="relative block h-28 overflow-hidden bg-[#13233a] md:h-36"
      >
        <Image
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
          fill
          sizes="(min-width: 1280px) 190px, (min-width: 768px) 33vw, 240px"
          src={routeImage}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-[#0e1e2e]/30 to-[#0e1e2e]/85" />
        <span className="absolute left-2 top-2 rounded-full bg-white px-2 py-0.5 text-[0.65rem] font-black uppercase tracking-wide text-[#0e7b6b]">
          {meta.badge}
        </span>
        <h3 className="absolute inset-x-2 bottom-2 text-sm font-black leading-tight text-white">
          {routePage.title}
        </h3>
      </Link>
      <div className="flex flex-1 flex-col p-3">
        <p className="text-[0.72rem] font-bold leading-4 text-[#6b7280]">
          {meta.note}
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
        <MobileMiniFact
          compact
          fallbackLabel={copy.check}
          label={copy.time}
          value={schedule?.travelTime}
        />
        <MobileMiniFact
          compact
          fallbackLabel={copy.check}
          label={copy.price}
          value={schedule ? getHomepageSchedulePrice(schedule) : undefined}
        />
      </div>
        <div className="mt-auto pt-3">
          <MobileRouteCountdown
            className="mt-0"
            labels={countdownLabels}
            schedule={schedule}
          />
          {hasTickets ? (
            <TravelDateAwareTwelveGoAffiliateButton
              ariaLabel={affiliateText.homepageCardAria}
              className="mt-3 flex min-h-11 items-center justify-center rounded-xl bg-[#13233a] px-3 text-center text-xs font-black text-white shadow-sm transition hover:bg-[#1d3455]"
              ctaPosition="homepage_route_card"
              disclosureMode="none"
              label={affiliateText.homepageCardCta}
              locale={locale}
              routeId={routePage.slug}
            />
          ) : null}
          <Link
            href={`/${locale}/${routePage.slug}`}
            className={
              hasTickets
                ? "mt-2 flex min-h-11 items-center justify-center rounded-xl border border-[#d8c8b4] bg-white px-3 text-center text-xs font-black text-[#13233a] transition hover:bg-[#fffaf2]"
                : "mt-3 flex min-h-11 items-center justify-center rounded-xl bg-[#13233a] px-3 text-center text-xs font-black text-white shadow-sm transition hover:bg-[#1d3455]"
            }
          >
            {copy.viewRoute}
          </Link>
        </div>
      </div>
    </article>
  );
}

function getHomepageSchedulePrice(schedule: Schedule) {
  if (schedule.direction === "bangkok-to-pattaya") {
    return schedule.subRoutes?.[0]?.price ?? schedule.price;
  }

  return schedule.price;
}

function MobileHomepageBookingBar({ locale }: { locale: LocaleCode }) {
  const routeId: RouteId = "bangkok-to-pattaya";
  const affiliateText = getUiTranslations(locale).affiliate.variantLabels;

  if (!hasTwelveGoTickets(routeId)) {
    return null;
  }

  return (
    <div
      className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+4.15rem)] z-50 mx-auto w-full max-w-[390px] px-4 md:hidden"
      data-mobile-homepage-booking-bar="true"
    >
      <div className="grid grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] gap-2 rounded-2xl border border-[#eadcc7] bg-white/95 p-2 shadow-[0_-12px_28px_rgba(19,35,58,0.16)] backdrop-blur">
        <TravelDateField
          className="min-w-0"
          inputClassName="min-h-11 w-full rounded-xl border border-[#d8c8b4] bg-white px-2 text-xs font-black text-[#13233a] shadow-sm outline-none transition focus:border-[#e8b05a] focus:ring-2 focus:ring-[#e8b05a]/35"
          labelClassName="sr-only"
          locale={locale}
        />
        <TravelDateAwareTwelveGoAffiliateButton
          ariaLabel={affiliateText.homepageCardAria}
          className="flex min-h-11 w-full items-center justify-center rounded-xl bg-[#e8b05a] px-3 text-center text-xs font-black leading-tight text-[#13233a] shadow-sm transition hover:bg-[#dca23f]"
          ctaPosition="homepage_mobile_sticky"
          disclosureMode="none"
          label={affiliateText.stickyMobile}
          locale={locale}
          routeId={routeId}
          variant="stickyMobile"
          wrapperClassName="min-w-0"
        />
      </div>
    </div>
  );
}

function MobileBottomNav({
  copy,
  locale,
}: {
  copy: ReturnType<typeof getMobileHomeCopy>;
  locale: LocaleCode;
}) {
  const items: {
    active?: boolean;
    href: string;
    icon:
      | "routes"
      | "airport"
      | "contact"
      | "support-coffee"
      | "tips";
    label: string;
    target?: string;
  }[] = [
    { href: "#mobile-airports", icon: "airport", label: copy.airport },
    { href: "/contact", icon: "contact", label: copy.contact },
    locale === "en"
      ? { href: "#travel-guides", icon: "tips", label: copy.guides }
      : { href: "#popular-routes", icon: "routes", label: copy.routes },
  ];
  const airportOptions = [
    {
      href: `/${locale}/suvarnabhumi-airport-to-pattaya`,
      label: "Suvarnabhumi",
    },
    {
      href: `/${locale}/don-mueang-airport-to-pattaya`,
      label: "Don Mueang",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[60] mx-auto max-w-[390px] border-t border-[#eadcc7] bg-white/95 px-2.5 pb-[calc(env(safe-area-inset-bottom)+0.3rem)] pt-1.5 shadow-[0_-8px_24px_rgba(19,35,58,0.08)] backdrop-blur md:hidden">
      <div className="grid grid-cols-3 gap-0.5">
        {items.map((item) =>
          item.icon === "airport" ? (
            <details key={item.label} className="group relative">
              <summary
                className="flex min-h-11 cursor-pointer list-none flex-col items-center justify-center rounded-xl text-[0.62rem] font-black text-[#6b7280] transition group-open:bg-[#eaf5fb] group-open:text-[#0e7b6b] [&::-webkit-details-marker]:hidden"
                id="mobile-airports"
              >
                <span
                  aria-hidden="true"
                  className="mb-0.5 flex h-5 w-5 items-center justify-center rounded-lg bg-white"
                >
                  <MobileNavIcon name={item.icon} />
                </span>
                {item.label}
              </summary>
              <div className="absolute bottom-[calc(100%+0.55rem)] left-0 z-50 w-44 rounded-2xl border border-[#eadcc7] bg-white p-2 shadow-2xl shadow-[#13233a]/20">
                {airportOptions.map((option) => (
                  <Link
                    key={option.href}
                    href={option.href}
                    className="flex min-h-11 items-center justify-center rounded-xl bg-[#fffaf2] px-3 text-center text-xs font-black text-[#13233a] transition hover:bg-[#eaf5fb]"
                  >
                    {option.label}
                  </Link>
                ))}
              </div>
            </details>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              target={item.target}
              rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
              className={`flex min-h-11 flex-col items-center justify-center rounded-xl text-[0.62rem] font-black ${
                item.active
                  ? "bg-[#eaf5fb] text-[#0e7b6b]"
                  : "text-[#6b7280]"
              }`}
            >
              <span
                aria-hidden="true"
                className="mb-0.5 flex h-5 w-5 items-center justify-center rounded-lg bg-white"
              >
                <MobileNavIcon name={item.icon} />
              </span>
              {item.label}
            </Link>
          ),
        )}
      </div>
    </nav>
  );
}

function MobileMiniFact({
  compact = false,
  fallbackLabel = "Check",
  label,
  value,
}: {
  compact?: boolean;
  fallbackLabel?: string;
  label: string;
  value?: string;
}) {
  return (
    <span className="rounded-2xl bg-[#fffaf2] p-2">
      <span className="block text-[0.65rem] font-black uppercase tracking-wide text-[#4f5d6c]">
        {label}
      </span>
      <span
        className={`mt-0.5 block font-black leading-tight text-[#13233a] ${
          compact ? "text-[0.72rem]" : "text-xs"
        }`}
      >
        {value ?? fallbackLabel}
      </span>
    </span>
  );
}

function MobileNavIcon({
  name,
}: {
  name:
    | "routes"
    | "airport"
    | "contact"
    | "support-coffee"
    | "tips";
}) {
  if (name === "support-coffee") {
    return <IconAsset name={name} size="navCoffee" />;
  }

  return <IconAsset name={name} size="md" />;
}

function IconAsset({
  name,
  size = "md",
}: {
  name: string;
  size?: "sm" | "md" | "lg" | "navCoffee";
}) {
  const sizeClass =
    size === "lg"
      ? "h-8 w-8"
      : size === "sm"
        ? "h-4 w-4"
        : size === "navCoffee"
          ? "h-5 w-5 scale-125"
          : "h-5 w-5";

  return (
    <Image
      alt=""
      aria-hidden="true"
      className={`${sizeClass} object-contain`}
      height={32}
      src={`/images/icons/icon-${name}.png`}
      width={32}
    />
  );
}
