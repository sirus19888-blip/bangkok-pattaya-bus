import Link from "next/link";
import type { ComponentProps } from "react";
import { Header } from "@/components/Header";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileRouteCountdown } from "@/components/MobileRouteCountdown";
import { RouteSearch } from "@/components/RouteSearch";
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
      <section className="mx-auto hidden w-full max-w-6xl flex-col gap-5 px-4 pb-10 pt-4 md:flex lg:px-8">
        <Header
          labels={{
            ...t.app,
            chooseLanguage: t.navigation.chooseLanguage,
          }}
          currentLocale={locale}
        />

        <DesktopHome
          locale={locale}
          routePagesForLocale={localizedRoutePages}
          t={t}
        />
      </section>
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
      hoursShort: "godz.",
      home: "Home",
      leavesIn: "Pozostało do odjazdu",
      minutesShort: "min",
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
      home: "Главная",
      hoursShort: "ч",
      leavesIn: "До отправления",
      minutesShort: "мин",
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
      home: "Home",
      hoursShort: "Std.",
      leavesIn: "Bis zur Abfahrt",
      minutesShort: "Min.",
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
      home: "หน้าแรก",
      hoursShort: "ชม.",
      leavesIn: "ออกในอีก",
      minutesShort: "นาที",
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
      home: "首页",
      hoursShort: "小时",
      leavesIn: "距离发车",
      minutesShort: "分钟",
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
      home: "Accueil",
      hoursShort: "h",
      leavesIn: "Départ dans",
      minutesShort: "min",
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
    hoursShort: "h",
    home: "Home",
    leavesIn: "Leaves in",
    minutesShort: "min",
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

const desktopQuickLinks: RouteId[] = [
  "bangkok-to-pattaya",
  "pattaya-to-bangkok",
  "suvarnabhumi-airport-to-pattaya",
];

function DesktopHome({
  locale,
  routePagesForLocale,
  t,
}: {
  locale: LocaleCode;
  routePagesForLocale: RoutePage[];
  t: Translations;
}) {
  const firstRoute = routePagesForLocale[0];
  const copy = getMobileHomeCopy(locale);
  const countdownLabels = {
    check: copy.check,
    hoursShort: copy.hoursShort,
    leavesIn: copy.leavesIn,
    minutesShort: copy.minutesShort,
    nextBus: copy.nextBus,
    now: copy.now,
  };

  return (
    <>
      <section
        id="top"
        className="grid gap-5 rounded-[1.8rem] border border-[#eadcc7] bg-[#0e1e2e] p-5 text-white shadow-sm lg:grid-cols-[1.15fr_0.85fr] lg:p-7"
      >
        <div className="flex min-h-[25rem] flex-col justify-between rounded-[1.35rem] bg-[#162840] p-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#e8b05a]">
              {copy.travelRoutes}
            </p>
            <h1 className="mt-3 max-w-2xl text-5xl font-black leading-[1.03] tracking-tight">
              {copy.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-[#dce6f0]">
              {copy.desktopIntro}
            </p>
          </div>

          <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
            <HeroFact label={copy.timeFactLabel} value={copy.timeFactValue} />
            <HeroFact label={copy.dataFactLabel} value={copy.dataFactValue} />
            <HeroFact
              label={copy.safetyFactLabel}
              value={copy.safetyFactValue}
            />
          </div>
        </div>

        <div className="rounded-[1.35rem] border border-white/10 bg-white p-5 text-[#13233a] shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0e7b6b]">
            {copy.findRoute}
          </p>
          <h2 className="mt-2 text-2xl font-black leading-tight">
            {copy.chooseRoute}
          </h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-[#4f5d6c]">
            {copy.routePickerHelp}
          </p>

          <RouteSearch
            currentRoute="bangkok-to-pattaya"
            from={firstRoute?.from ?? "Bangkok"}
            labels={t.routeSelector}
            locale={locale}
            routePages={routePagesForLocale.map((page) => ({
              slug: page.slug,
              from: page.from,
              to: page.to,
            }))}
            to={firstRoute?.to ?? "Pattaya"}
          />

          <div className="mt-4 grid gap-2">
            {desktopQuickLinks.map((routeId) => {
              const routePage = routePagesForLocale.find(
                (page) => page.slug === routeId,
              );

              if (!routePage) {
                return null;
              }

              return (
                <Link
                  key={routeId}
                  href={`/${locale}/${routePage.slug}`}
                  className="flex min-h-12 items-center justify-between gap-3 rounded-2xl border border-[#eadcc7] bg-[#fffaf2] px-4 text-sm font-black text-[#13233a] transition hover:bg-[#eaf5fb]"
                >
                  {routePage.title}
                  <span className="text-[#0e7b6b]">{copy.open}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {routePagesForLocale.map((routePage) => (
          <DesktopRouteCard
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
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[1.6rem] border border-[#eadcc7] bg-[#fff8ec] p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#b9832e]">
            {copy.beforeTravel}
          </p>
          <h2 className="mt-2 text-2xl font-black text-[#13233a]">
            {copy.adviceTitle}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {copy.tips.map((tip) => (
              <p
                key={tip}
                className="rounded-2xl bg-white/80 px-4 py-3 text-sm font-bold leading-6 text-[#4f5d6c]"
              >
                {tip}
              </p>
            ))}
          </div>
        </div>

        <div className="rounded-[1.6rem] border border-[#c8dbe9] bg-white p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0e7b6b]">
            {copy.aboutEyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-black text-[#13233a]">
            {copy.aboutTitle}
          </h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-[#4f5d6c]">
            {copy.aboutText}
          </p>
          <UtilityGrid locale={locale} />
        </div>
      </section>
    </>
  );
}

function HeroFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/8 p-3">
      <p className="text-[0.65rem] font-black uppercase tracking-wide text-[#e8b05a]">
        {label}
      </p>
      <p className="mt-1 text-sm font-black leading-5 text-white">{value}</p>
    </div>
  );
}

function DesktopRouteCard({
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

  return (
    <Link
      href={`/${locale}/${routePage.slug}`}
      className="flex min-h-full flex-col rounded-[1.5rem] border border-[#eadcc7] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full bg-[#eaf5fb] px-3 py-1 text-[0.68rem] font-black uppercase tracking-wide text-[#0e7b6b]">
          {meta.badge}
        </span>
        <span className="rounded-full bg-[#fff8ec] px-3 py-1 text-[0.68rem] font-black uppercase tracking-wide text-[#b9832e]">
          {copy.bus}
        </span>
      </div>
      <h2 className="mt-3 text-xl font-black leading-tight text-[#13233a]">
        {routePage.title}
      </h2>
      <p className="mt-2 text-sm font-semibold leading-5 text-[#5f6874]">
        {meta.note}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <MobileMiniFact
          fallbackLabel={copy.check}
          label={copy.travelTime}
          value={schedule?.travelTime}
        />
        <MobileMiniFact
          fallbackLabel={copy.check}
          label={copy.ticketPrice}
          value={schedule?.price}
        />
      </div>
      <MobileRouteCountdown labels={countdownLabels} schedule={schedule} />
      <span className="mt-4 flex min-h-11 w-full items-center justify-center rounded-2xl bg-[#13233a] text-sm font-black text-white">
        {copy.checkTimes}
      </span>
    </Link>
  );
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
  const featuredSchedule = schedules.find(
    (schedule) => schedule.direction === featuredRoute?.slug,
  );
  const countdownLabels = {
    check: copy.check,
    hoursShort: copy.hoursShort,
    leavesIn: copy.leavesIn,
    minutesShort: copy.minutesShort,
    nextBus: copy.nextBus,
    now: copy.now,
  };

  return (
    <section className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-[#fbf8f3] pb-20 md:hidden">
      <div className="bg-[#0e1e2e] px-4 pb-5 pt-4 text-white shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#0e7b6b] text-sm font-black text-white shadow-sm">
              BP
            </span>
            <div className="min-w-0">
              <p className="truncate text-base font-black leading-tight">
                {copy.brandPrimary}
              </p>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#e8b05a]">
                {copy.brandSecondary}
              </p>
            </div>
          </div>
          <LanguageSwitcher
            label={t.navigation.chooseLanguage}
            currentLocale={locale}
          />
        </div>

        <div className="mt-5 rounded-[1.7rem] bg-[#162840] p-4 shadow-lg shadow-black/10">
          <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#e8b05a]">
            {copy.travelRoutes}
          </p>
          <h1 className="mt-2 text-[2rem] font-black leading-[1.02]">
            {copy.title}
          </h1>
          <p className="mt-2 max-w-[18rem] text-sm font-semibold leading-5 text-[#dce6f0]">
            {copy.subtitle}
          </p>
        </div>
      </div>

      <div className="-mt-3 flex flex-1 flex-col gap-5 rounded-t-[2rem] bg-[#fbf8f3] px-4 pt-5">
        {featuredRoute ? (
          <MobileFeaturedRoute
            copy={copy}
            countdownLabels={countdownLabels}
            locale={locale}
            routePage={featuredRoute}
            schedule={featuredSchedule}
          />
        ) : null}

        <section>
          <div className="mb-3 flex items-end justify-between gap-3">
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
          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2">
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

        <section className="rounded-[1.5rem] border border-[#eadcc7] bg-[#fff8ec] p-4 shadow-sm">
          <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#b9832e]">
            {copy.beforeTravel}
          </p>
          <h2 className="mt-1 text-xl font-black text-[#13233a]">
            {copy.adviceTitle}
          </h2>
          <div className="mt-3 space-y-2.5">
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

function MobileFeaturedRoute({
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
  return (
    <Link
      href={`/${locale}/${routePage.slug}`}
      className="rounded-[1.5rem] border border-[#c8dbe9] bg-white p-4 shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#0e7b6b]">
            {copy.startHere}
          </p>
          <h2 className="mt-1 text-xl font-black leading-tight text-[#13233a]">
            {routePage.title}
          </h2>
        </div>
        <span className="rounded-full bg-[#f3d77b] px-3 py-1 text-xs font-black text-[#3f3413]">
          {copy.bus}
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <MobileMiniFact
          fallbackLabel={copy.check}
          label={copy.travelTime}
          value={schedule?.travelTime}
        />
        <MobileMiniFact
          fallbackLabel={copy.check}
          label={copy.ticketPrice}
          value={schedule?.price}
        />
      </div>
      <MobileRouteCountdown labels={countdownLabels} schedule={schedule} />
      <span className="mt-3 flex min-h-11 w-full items-center justify-center rounded-2xl bg-[#13233a] text-sm font-black text-white">
        {copy.checkTimes}
      </span>
    </Link>
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

  return (
    <Link
      href={`/${locale}/${routePage.slug}`}
      className="flex w-[238px] flex-none snap-start flex-col rounded-[1.35rem] border border-[#eadcc7] bg-white p-3 shadow-sm"
    >
      <span className="w-fit rounded-full bg-[#eaf5fb] px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-wide text-[#0e7b6b]">
        {meta.badge}
      </span>
      <h3 className="mt-2 min-h-[2.6rem] text-base font-black leading-tight text-[#13233a]">
        {routePage.title}
      </h3>
      <p className="mt-1 text-xs font-bold leading-4 text-[#6b7280]">
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
      <span className="mt-3 flex min-h-10 items-center justify-center rounded-xl bg-[#13233a] text-xs font-black text-white">
        {copy.viewRoute}
      </span>
    </Link>
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
    icon: "home" | "routes" | "airport" | "contact";
    label: string;
  }[] = [
    { href: `/${locale}`, icon: "home", label: copy.home, active: true },
    {
      href: `/${locale}/bangkok-to-pattaya`,
      icon: "routes",
      label: copy.routes,
    },
    {
      href: `/${locale}/suvarnabhumi-airport-to-pattaya`,
      icon: "airport",
      label: copy.airport,
    },
    { href: "/contact", icon: "contact", label: copy.contact },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 mx-auto max-w-[430px] border-t border-[#eadcc7] bg-white/95 px-2.5 pb-[calc(env(safe-area-inset-bottom)+0.3rem)] pt-1.5 shadow-[0_-8px_24px_rgba(19,35,58,0.08)] backdrop-blur md:hidden">
      <div className="grid grid-cols-4 gap-0.5">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
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
        ))}
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
  name: "home" | "routes" | "airport" | "contact";
}) {
  if (name === "home") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="#0e7b6b"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="m4 10 8-6 8 6" stroke="#12a08c" />
        <path d="M6.5 9.5V20h11V9.5" />
        <path d="M10 20v-5h4v5" />
      </svg>
    );
  }

  if (name === "routes") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="#c8913a"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M7 18a3 3 0 1 1-3-3" stroke="#0e7b6b" />
        <path d="M17 6a3 3 0 1 0 3 3" stroke="#e8b05a" />
        <path d="M7 15h7a3 3 0 0 0 0-6H7" />
        <path d="M6 6h2" />
        <path d="M16 18h2" />
      </svg>
    );
  }

  if (name === "airport") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="#315d9d"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M3 11h18" />
        <path d="m4 11 7-7h3l-3 7 5 8h-3l-5-8" stroke="#0e7b6b" />
        <path d="m16 11 3-3" stroke="#e8b05a" />
        <path d="M6 19h12" stroke="#c8913a" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="#8d5fd3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" />
      <path d="M8 9h8" stroke="#0e7b6b" />
      <path d="M8 13h5" stroke="#e8b05a" />
    </svg>
  );
}

function getUtilityCards(locale: LocaleCode) {
  if (locale === "pl") {
    return {
      heading: "Więcej",
      cards: [
        {
          href: "/about",
          label: "O stronie",
        },
        {
          href: "/contact",
          label: "Kontakt",
        },
        {
          href: "/privacy",
          label: "Prywatność",
        },
        {
          href: "https://www.buymeacoffee.com/Pawel_",
          label: "Wsparcie",
        },
      ],
    };
  }

  if (locale === "ru") {
    return {
      heading: "Ещё",
      cards: [
        {
          href: "/about",
          label: "О сайте",
        },
        {
          href: "/contact",
          label: "Контакты",
        },
        {
          href: "/privacy",
          label: "Конфиденциальность",
        },
        {
          href: "https://www.buymeacoffee.com/Pawel_",
          label: "Поддержать",
        },
      ],
    };
  }

  if (locale === "de") {
    return {
      heading: "Mehr",
      cards: [
        {
          href: "/about",
          label: "Über uns",
        },
        {
          href: "/contact",
          label: "Kontakt",
        },
        {
          href: "/privacy",
          label: "Datenschutz",
        },
        {
          href: "https://www.buymeacoffee.com/Pawel_",
          label: "Unterstützen",
        },
      ],
    };
  }

  if (locale === "th") {
    return {
      heading: "เพิ่มเติม",
      cards: [
        {
          href: "/about",
          label: "เกี่ยวกับ",
        },
        {
          href: "/contact",
          label: "ติดต่อ",
        },
        {
          href: "/privacy",
          label: "ความเป็นส่วนตัว",
        },
        {
          href: "https://www.buymeacoffee.com/Pawel_",
          label: "สนับสนุน",
        },
      ],
    };
  }

  if (locale === "zh") {
    return {
      heading: "更多",
      cards: [
        {
          href: "/about",
          label: "关于",
        },
        {
          href: "/contact",
          label: "联系",
        },
        {
          href: "/privacy",
          label: "隐私",
        },
        {
          href: "https://www.buymeacoffee.com/Pawel_",
          label: "支持",
        },
      ],
    };
  }

  if (locale === "fr") {
    return {
      heading: "Plus",
      cards: [
        {
          href: "/about",
          label: "À propos",
        },
        {
          href: "/contact",
          label: "Contact",
        },
        {
          href: "/privacy",
          label: "Confidentialité",
        },
        {
          href: "https://www.buymeacoffee.com/Pawel_",
          label: "Soutenir",
        },
      ],
    };
  }

  return {
    heading: "More",
    cards: [
      {
        href: "/about",
        label: "About",
      },
      {
        href: "/contact",
        label: "Contact",
      },
      {
        href: "/privacy",
        label: "Privacy",
      },
      {
        href: "https://www.buymeacoffee.com/Pawel_",
        label: "Support",
      },
    ],
  };
}

function UtilityGrid({ locale }: { locale: LocaleCode }) {
  const utility = getUtilityCards(locale);

  return (
    <section>
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#2f6f93] sm:text-sm">
        {utility.heading}
      </p>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
        {utility.cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="flex min-h-12 items-center justify-center rounded-2xl border border-[#eadcc7] bg-white px-3 text-center text-sm font-black text-[#13233a] shadow-sm transition hover:bg-[#fffaf2]"
            target={card.href.startsWith("http") ? "_blank" : undefined}
            rel={
              card.href.startsWith("http") ? "noopener noreferrer" : undefined
            }
          >
            {card.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

