import type { LocaleCode } from "@/data/routes";

export const homeSeoMetadata: Record<
  LocaleCode,
  { title: string; description: string }
> = {
  en: {
    title: "Bangkok Pattaya Bus Guide - Bus Times, Prices & Stations",
    description:
      "Check Bangkok to Pattaya, Pattaya to Bangkok, and airport bus times, ticket prices, travel time, stations, and practical travel tips.",
  },
  pl: {
    title: "Autobus Bangkok–Pattaya: rozkład, ceny biletów i dworce",
    description:
      "Sprawdź rozkłady autobusów Bangkok–Pattaya oraz z lotnisk Suvarnabhumi i Don Mueang: godziny odjazdów, ceny biletów, czas podróży, dworce i praktyczne wskazówki dla turystów.",
  },
  de: {
    title: "Bus Bangkok–Pattaya: Fahrplan, Ticketpreise & Stationen",
    description:
      "Buszeiten Bangkok–Pattaya sowie ab den Flughäfen Suvarnabhumi und Don Mueang: Abfahrtszeiten, Ticketpreise, Fahrzeit, Busbahnhöfe und praktische Reisetipps.",
  },
  fr: {
    title: "Bus Bangkok–Pattaya : horaires, prix des billets et gares",
    description:
      "Consultez les horaires des bus Bangkok–Pattaya et depuis les aéroports Suvarnabhumi et Don Mueang : départs, prix des billets, durée du trajet, gares et conseils pratiques.",
  },
  ru: {
    title: "Автобус Бангкок–Паттайя: расписание, цены и станции",
    description:
      "Расписание автобусов Бангкок–Паттайя и из аэропортов Суварнабхуми и Дон Муанг: время отправления, цены на билеты, время в пути, станции и практические советы для туристов.",
  },
  th: {
    title: "รถบัสกรุงเทพฯ–พัทยา: ตารางเวลา ราคาตั๋ว และสถานี",
    description:
      "ตรวจสอบเวลารถบัสกรุงเทพฯ–พัทยา และจากสนามบินสุวรรณภูมิและดอนเมือง: เวลาออกเดินทาง ราคาตั๋ว เวลาเดินทาง สถานี และคำแนะนำที่เป็นประโยชน์สำหรับนักท่องเที่ยว",
  },
  zh: {
    title: "曼谷–芭提雅巴士：时刻表、票价和车站",
    description:
      "查询曼谷–芭提雅以及素万那普和廊曼机场的巴士时刻表：发车时间、票价、行程时间、车站及实用出行提示。",
  },
};
