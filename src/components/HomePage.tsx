import Link from "next/link";
import type { ComponentProps } from "react";
import Image from "next/image";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileDestinationWeather } from "@/components/MobileDestinationWeather";
import { MobileRouteCountdown } from "@/components/MobileRouteCountdown";
import { RouteSearch } from "@/components/RouteSearch";
import { TwelveGoAffiliateButton } from "@/components/TwelveGoAffiliateButton";
import { routePages } from "@/data/routes";
import type { LocaleCode, RouteId, RoutePage } from "@/data/routes";
import { schedules } from "@/data/schedules";
import type { Schedule } from "@/data/schedules";
import { getTranslations, localizeRoutePage } from "@/lib/i18n";
import type { Translations } from "@/lib/i18n";

export function HomePage({ locale }: { locale: LocaleCode }) {
  const t = getTranslations(locale);
  const localizedRoutePages = routePages.map((page) =>
    localizeRoutePage(page, t),
  );

  return (
    <main className="min-h-screen bg-[#f7f0e3] text-[#13233a]">
      <MobileHome
        locale={locale}
        routePagesForLocale={localizedRoutePages}
        t={t}
      />
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
  "bangkok-to-pattaya": "/images/hero/mobile-home-bus-guide.png",
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
      beforeTravel: "Avant le départ",
      brandPrimary: "Bangkok Pattaya",
      brandSecondary: "Guide bus",
      bus: "Bus",
      buyMeCoffee: "M'offrir un café",
      check: "Vérifier",
      checkTimes: "Voir les horaires",
      chooseBus: "Choisissez votre bus",
      chooseRoute: "Choisissez votre route",
      contact: "Contact",
      dataFactLabel: "Données",
      dataFactValue: "Sources opérateurs",
      desktopIntro:
        "Horaires de bus, prix, gares et conseils pratiques pour Bangkok, Pattaya, l’aéroport Suvarnabhumi et l’aéroport Don Mueang.",
      findRoute: "Trouver une route",
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
  t,
}: {
  locale: LocaleCode;
  routePagesForLocale: RoutePage[];
  t: Translations;
}) {
  const copy = getMobileHomeCopy(locale);
  const featuredRoute = routePagesForLocale[0];
  const countdownLabels = {
    check: copy.check,
    hoursShort: copy.hoursShort,
    leavesIn: copy.leavesIn,
    minutesShort: copy.minutesShort,
    nextBus: copy.nextBus,
    now: copy.now,
  };

  return (
    <section className="mx-auto flex h-dvh min-h-dvh w-full max-w-[390px] flex-col overflow-hidden bg-[#fbf8f3] text-[#13233a] shadow-2xl shadow-[#13233a]/15">
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="overflow-hidden rounded-b-[2rem] bg-[#0e1e2e] text-white shadow-xl shadow-[#13233a]/20">
          <div className="flex items-center justify-between px-4 pb-3 pt-[calc(env(safe-area-inset-top)+0.9rem)]">
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

          <div className="relative px-4 pb-4 pt-3">
            <div className="absolute inset-x-4 bottom-0 top-4 overflow-hidden rounded-[2rem]">
              <Image
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover opacity-55"
                fill
                priority
                sizes="390px"
                src="/images/hero/mobile-home-bus-guide.png"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0e1e2e]/45 via-[#0e1e2e]/70 to-[#0e1e2e]" />
            </div>
            <div className="relative pb-2 pt-4">
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#e8b05a] ring-1 ring-white/15">
                {copy.mobileHeroKicker}
              </span>
              <p className="mt-3 max-w-[16rem] text-[2.18rem] font-black leading-[0.95] tracking-tight">
                {copy.heroLineOne}{" "}
                <span className="italic text-[#e8b05a]">
                  {copy.heroSmart}
                </span>
                <br />
                {copy.heroLineTwo}{" "}
                <span className="italic text-[#e8b05a]">
                  {copy.heroEasy}
                </span>
              </p>
              <h1 className="mt-3 max-w-[18rem] text-[1.72rem] font-black leading-[1.02] tracking-tight text-white">
                {copy.homepageH1}
              </h1>
              <p className="mt-2 max-w-[17.5rem] text-[0.84rem] font-semibold leading-5 text-[#e8edf5]">
                {copy.subtitle}
              </p>
              {featuredRoute ? (
                <div className="mt-4 rounded-[1.45rem] bg-white/95 p-2.5 text-[#13233a] shadow-xl shadow-black/20">
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
            </div>
          </div>
        </div>

        <section>
          <div className="mb-3 flex items-end justify-between gap-3 px-4 pt-5">
            <div>
              <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#0e7b6b]">
                {copy.popularRoutes}
              </p>
              <h2 className="text-xl font-black leading-tight text-[#13233a]">
                {copy.chooseBus}
              </h2>
            </div>
            <span className="text-xs font-black text-[#6b7280]">
              {copy.swipe}
            </span>
          </div>
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3">
            {routePagesForLocale.map((routePage) => (
              <MobileRouteCard
                copy={copy}
                countdownLabels={countdownLabels}
                key={routePage.slug}
                locale={locale}
                routePage={routePage}
                schedule={schedules.find(
                  (schedule) => schedule.direction === routePage.slug,
                )}
              />
            ))}
          </div>
        </section>

        <section className="mx-4 rounded-[1.5rem] border border-[#e8c986] bg-[#fff8ec] p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#efd18a]">
              <IconAsset name="tips" size="lg" />
            </span>
            <div>
              <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#b9832e]">
                {copy.beforeTravel}
              </p>
              <h2 className="text-xl font-black text-[#13233a]">
                {copy.adviceTitle}
              </h2>
            </div>
          </div>
          <div className="mt-3 space-y-2">
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

      <MobileBottomNav copy={copy} locale={locale} />
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

  return (
    <article className="flex w-[172px] flex-none snap-start flex-col overflow-hidden rounded-[1.35rem] border border-[#eadcc7] bg-white shadow-sm">
      <Link
        href={`/${locale}/${routePage.slug}`}
        className="relative block h-28 overflow-hidden bg-[#13233a]"
      >
        <Image
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
          fill
          sizes="172px"
          src={routeImage}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-[#0e1e2e]/30 to-[#0e1e2e]/85" />
        <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[0.58rem] font-black uppercase tracking-wide text-[#0e7b6b]">
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
          value={schedule?.price}
        />
      </div>
      <MobileRouteCountdown labels={countdownLabels} schedule={schedule} />
      <Link
        href={`/${locale}/${routePage.slug}`}
        className="mt-3 flex min-h-10 items-center justify-center rounded-xl bg-[#13233a] text-xs font-black text-white"
      >
        {copy.viewRoute}
      </Link>
      <TwelveGoAffiliateButton
        className="mt-2 flex min-h-10 items-center justify-center rounded-xl border border-[#e8b05a] bg-[#fff8ec] text-xs font-black text-[#13233a]"
        label="12Go"
        locale={locale}
        routeId={routePage.slug}
      />
      </div>
    </article>
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
    icon: "home" | "routes" | "airport" | "contact" | "support-coffee";
    label: string;
    target?: string;
  }[] = [
    { href: "#mobile-airports", icon: "airport", label: copy.airport },
    { href: "/contact", icon: "contact", label: copy.contact },
    {
      href: "https://www.buymeacoffee.com/Pawel_",
      icon: "support-coffee",
      label: copy.buyMeCoffee,
      target: "_blank",
    },
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
    <nav className="fixed bottom-0 left-0 right-0 z-40 mx-auto max-w-[390px] border-t border-[#eadcc7] bg-white/95 px-2.5 pb-[calc(env(safe-area-inset-bottom)+0.3rem)] pt-1.5 shadow-[0_-8px_24px_rgba(19,35,58,0.08)] backdrop-blur md:hidden">
      <div className="grid grid-cols-3 gap-0.5">
        {items.map((item) =>
          item.icon === "airport" ? (
            <details key={item.label} className="group relative">
              <summary
                className="flex min-h-10 cursor-pointer list-none flex-col items-center justify-center rounded-xl text-[0.62rem] font-black text-[#6b7280] transition group-open:bg-[#eaf5fb] group-open:text-[#0e7b6b] [&::-webkit-details-marker]:hidden"
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
              <div className="absolute bottom-[calc(100%+0.55rem)] left-1/2 z-50 w-44 -translate-x-1/2 rounded-2xl border border-[#eadcc7] bg-white p-2 shadow-2xl shadow-[#13233a]/20">
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
              className={`flex min-h-10 flex-col items-center justify-center rounded-xl text-[0.62rem] font-black ${
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
      <span className="block text-[0.58rem] font-black uppercase tracking-wide text-[#6b7280]">
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
  name: "home" | "routes" | "airport" | "contact" | "support-coffee";
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
