import type { LocaleCode, RouteId } from "@/data/routes";

type LocalizedText = Record<"en" | "pl", string> & {
  th?: string;
};

export type StationAccessGuide = {
  routeId: RouteId;
  title: LocalizedText;
  items: LocalizedText[];
  note: LocalizedText;
};

export const stationAccessGuides: Record<RouteId, StationAccessGuide> = {
  "bangkok-to-pattaya": {
    routeId: "bangkok-to-pattaya",
    title: {
      en: "How to get to Ekkamai Bus Terminal",
      pl: "Jak dotrzeć na dworzec Ekkamai",
      th: "วิธีเดินทางไปสถานีขนส่งเอกมัย",
    },
    items: [
      {
        en: "By BTS: Take the BTS Sukhumvit Line to Ekkamai Station. The bus terminal is usually about a 5-minute walk from the station.",
        pl: "BTS: Jedź linią BTS Sukhumvit do stacji Ekkamai. Dworzec autobusowy jest zwykle około 5 minut pieszo od stacji.",
        th: "โดย BTS: ขึ้นสายสุขุมวิทไปลงสถานีเอกมัย สถานีขนส่งอยู่ห่างไปประมาณ 5 นาทีโดยการเดิน",
      },
      {
        en: "By taxi or Grab: Good if you have luggage. Price depends on traffic and pickup location. Check the app fare before you book.",
        pl: "Taxi lub Grab: Dobre rozwiązanie, jeśli masz bagaż. Cena zależy od korków i miejsca odbioru. Sprawdź cenę w aplikacji przed zamówieniem.",
        th: "แท็กซี่หรือ Grab: เหมาะถ้ามีกระเป๋า ราคาเปลี่ยนตามรถติดและจุดรับ ควรตรวจราคาก่อนจอง",
      },
      {
        en: "Avoid tuk-tuks for this trip unless you agree on the price first. Around tourist areas, tuk-tuks can be more expensive than expected.",
        pl: "Unikaj tuk-tuka na tej trasie, chyba że wcześniej ustalisz cenę. W miejscach turystycznych tuk-tuki mogą być droższe, niż się wydaje.",
        th: "ควรหลีกเลี่ยงตุ๊กตุ๊กถ้ายังไม่ได้ตกลงราคา แถวแหล่งท่องเที่ยวอาจแพงกว่าที่คิด",
      },
      {
        en: "Tip: Arrive 20-30 minutes before departure to buy your ticket and find the correct platform.",
        pl: "Wskazówka: Przyjdź 20-30 minut przed odjazdem, żeby kupić bilet i znaleźć właściwe stanowisko.",
        th: "คำแนะนำ: มาถึงก่อนเวลาออก 20-30 นาที เพื่อซื้อตั๋วและหาชานชาลาให้ถูกต้อง",
      },
    ],
    note: {
      en: "Transport prices can change. App-based ride prices vary by traffic, demand, and pickup point.",
      pl: "Ceny transportu mogą się zmieniać. Ceny przejazdów w aplikacjach zależą od korków, popytu i miejsca odbioru.",
      th: "ค่าเดินทางอาจเปลี่ยนได้ ราคาในแอปขึ้นอยู่กับรถติด ความต้องการ และจุดรับ",
    },
  },
  "pattaya-to-bangkok": {
    routeId: "pattaya-to-bangkok",
    title: {
      en: "How to get to North Pattaya Bus Station",
      pl: "Jak dotrzeć na North Pattaya Bus Station",
      th: "วิธีเดินทางไปสถานีขนส่งพัทยาเหนือ",
    },
    items: [
      {
        en: "By songthaew: A shared songthaew can be a cheap option if it goes in the right direction, but routes may not be obvious for first-time visitors.",
        pl: "Songthaew: Wspólny songthaew może być tanią opcją, jeśli jedzie w dobrą stronę, ale trasy mogą być niejasne dla osób pierwszy raz w Pattayi.",
        th: "โดยสองแถว: อาจเป็นตัวเลือกที่ประหยัดถ้าไปทางเดียวกัน แต่เส้นทางอาจไม่ชัดสำหรับคนที่มาครั้งแรก",
      },
      {
        en: "By taxi or Grab: The easiest option from hotels or beach areas. Price varies by distance, traffic, and demand. Check the app fare before booking.",
        pl: "Taxi lub Grab: Najłatwiejsza opcja z hotelu albo okolic plaży. Cena zależy od dystansu, korków i popytu. Sprawdź cenę w aplikacji przed zamówieniem.",
        th: "แท็กซี่หรือ Grab: ง่ายที่สุดจากโรงแรมหรือย่านชายหาด ราคาเปลี่ยนตามระยะทาง รถติด และความต้องการ",
      },
      {
        en: "From central Pattaya: Leave extra time, especially in the afternoon or during weekends.",
        pl: "Z centrum Pattayi: Zostaw dodatkowy czas, szczególnie po południu i w weekendy.",
        th: "จากกลางเมืองพัทยา: เผื่อเวลาเพิ่ม โดยเฉพาะช่วงบ่ายและวันหยุดสุดสัปดาห์",
      },
      {
        en: "Tip: Check whether your bus goes to Ekkamai or Mo Chit before buying the ticket.",
        pl: "Wskazówka: Przed zakupem biletu sprawdź, czy autobus jedzie do Ekkamai czy Mo Chit.",
        th: "คำแนะนำ: ตรวจสอบก่อนซื้อตั๋วว่ารถไปเอกมัยหรือหมอชิต 2",
      },
    ],
    note: {
      en: "Transport prices can change. App-based ride prices vary by traffic, demand, and pickup point.",
      pl: "Ceny transportu mogą się zmieniać. Ceny przejazdów w aplikacjach zależą od korków, popytu i miejsca odbioru.",
      th: "ค่าเดินทางอาจเปลี่ยนได้ ราคาในแอปขึ้นอยู่กับรถติด ความต้องการ และจุดรับ",
    },
  },
  "suvarnabhumi-airport-to-pattaya": {
    routeId: "suvarnabhumi-airport-to-pattaya",
    title: {
      en: "How to find the airport bus counter",
      pl: "Jak znaleźć stanowisko autobusu na lotnisku",
      th: "วิธีหาเคาน์เตอร์รถบัสที่สนามบิน",
    },
    items: [
      {
        en: "After arrival: Allow time for immigration, baggage claim, and walking through the airport.",
        pl: "Po przylocie: Zostaw czas na kontrolę paszportową, odbiór bagażu i przejście przez lotnisko.",
        th: "หลังเดินทางถึง: เผื่อเวลาสำหรับตรวจคนเข้าเมือง รับกระเป๋า และเดินในสนามบิน",
      },
      {
        en: "Bus counter: Current route data says the bus counter is on Level 1 near Gate 8. Follow airport signs and confirm at the counter.",
        pl: "Stanowisko autobusu: Z aktualnych danych trasy wynika, że stanowisko jest na poziomie 1 w pobliżu bramki 8. Kieruj się oznaczeniami na lotnisku i potwierdź przy stanowisku.",
        th: "เคาน์เตอร์รถบัส: ข้อมูลปัจจุบันระบุว่าอยู่ชั้น 1 ใกล้ประตู 8 โปรดตามป้ายในสนามบินและยืนยันที่เคาน์เตอร์",
      },
      {
        en: "Airport Rail Link: Not needed for this bus route, but useful if you are going into Bangkok. Airport Rail Link fares are usually 15-45 THB depending on distance.",
        pl: "Airport Rail Link: Nie jest potrzebny na tej trasie autobusowej, ale przydaje się, jeśli jedziesz do Bangkoku. Przejazd Airport Rail Link zwykle kosztuje 15-45 THB zależnie od odległości.",
        th: "Airport Rail Link: ไม่จำเป็นสำหรับเส้นทางนี้ แต่มีประโยชน์ถ้าจะเข้า กรุงเทพฯ ค่าโดยสารมักอยู่ที่ 15-45 บาทตามระยะทาง",
      },
      {
        en: "Taxi or Grab: Useful if you miss the bus or travel late. Price varies by traffic, tolls, and demand. Check the app or taxi queue price before you go.",
        pl: "Taxi lub Grab: Przydatne, jeśli spóźnisz się na autobus albo jedziesz późno. Cena zależy od korków, opłat drogowych i popytu. Sprawdź cenę w aplikacji albo na postoju taxi.",
        th: "แท็กซี่หรือ Grab: เหมาะถ้าพลาดรถหรือเดินทางดึก ราคาเปลี่ยนตามรถติด ค่าทางด่วน และความต้องการ",
      },
      {
        en: "Tip: The late 22:00 bus may go to North Pattaya Bus Station rather than Jomtien. Confirm before buying the ticket.",
        pl: "Wskazówka: Późny autobus o 22:00 może jechać do North Pattaya Bus Station, a nie do Jomtien. Potwierdź przed zakupem biletu.",
        th: "คำแนะนำ: รถเที่ยว 22:00 อาจไปสถานีขนส่งพัทยาเหนือ ไม่ใช่จอมเทียน โปรดยืนยันก่อนซื้อตั๋ว",
      },
    ],
    note: {
      en: "Transport prices can change. App-based ride prices vary by traffic, demand, and pickup point.",
      pl: "Ceny transportu mogą się zmieniać. Ceny przejazdów w aplikacjach zależą od korków, popytu i miejsca odbioru.",
      th: "ค่าเดินทางอาจเปลี่ยนได้ ราคาในแอปขึ้นอยู่กับรถติด ความต้องการ และจุดรับ",
    },
  },
  "pattaya-to-suvarnabhumi-airport": {
    routeId: "pattaya-to-suvarnabhumi-airport",
    title: {
      en: "How to get to the Pattaya airport bus area",
      pl: "Jak dotrzeć do strefy autobusu lotniskowego w Pattayi",
      th: "วิธีเดินทางไปจุดรถบัสสนามบินในพัทยา",
    },
    items: [
      {
        en: "From your hotel: Taxi or Grab is usually the easiest option if you have luggage. Price varies by distance, traffic, and demand.",
        pl: "Z hotelu: Taxi lub Grab to zwykle najłatwiejsza opcja, jeśli masz bagaż. Cena zależy od dystansu, korków i popytu.",
        th: "จากโรงแรม: แท็กซี่หรือ Grab มักสะดวกที่สุดถ้ามีกระเป๋า ราคาเปลี่ยนตามระยะทาง รถติด และความต้องการ",
      },
      {
        en: "By songthaew: It may be cheap if the route is convenient, but first-time visitors should allow extra time.",
        pl: "Songthaew: Może być tani, jeśli trasa jest wygodna, ale osoby pierwszy raz w Pattayi powinny zostawić dodatkowy czas.",
        th: "โดยสองแถว: อาจประหยัดถ้าเส้นทางสะดวก แต่ถ้ามาครั้งแรกควรเผื่อเวลาเพิ่ม",
      },
      {
        en: "Jomtien bus station: The operator shows tickets as available at the counter service there. Confirm the exact boarding point before you go.",
        pl: "Dworzec Jomtien: Według informacji operatora bilety można kupić przy stanowisku obsługi. Przed wyjazdem potwierdź dokładne miejsce odjazdu.",
        th: "สถานีจอมเทียน: ผู้ให้บริการระบุว่าสามารถซื้อตั๋วที่เคาน์เตอร์ได้ โปรดยืนยันจุดขึ้นรถก่อนออกเดินทาง",
      },
      {
        en: "Tip: Leave a generous buffer for traffic, check-in, security, and immigration at the airport.",
        pl: "Wskazówka: Zostaw duży zapas czasu na ruch drogowy, odprawę, kontrolę bezpieczeństwa i paszportową na lotnisku.",
        th: "คำแนะนำ: เผื่อเวลามากพอสำหรับรถติด เช็กอิน ตรวจความปลอดภัย และตรวจคนเข้าเมือง",
      },
    ],
    note: {
      en: "Transport prices can change. App-based ride prices vary by traffic, demand, and pickup point.",
      pl: "Ceny transportu mogą się zmieniać. Ceny przejazdów w aplikacjach zależą od korków, popytu i miejsca odbioru.",
      th: "ค่าเดินทางอาจเปลี่ยนได้ ราคาในแอปขึ้นอยู่กับรถติด ความต้องการ และจุดรับ",
    },
  },
  "don-mueang-airport-to-pattaya": {
    routeId: "don-mueang-airport-to-pattaya",
    title: {
      en: "How to find the Don Mueang bus area",
      pl: "Jak znaleźć autobus na lotnisku Don Mueang",
      th: "วิธีหาจุดรถบัสที่ท่าอากาศยานดอนเมือง",
    },
    items: [
      {
        en: "After arrival: Allow time for baggage, airport navigation, and walking to the bus counter or pick-up point.",
        pl: "Po przylocie: Zostaw czas na bagaż, przejście przez lotnisko i dojście do stanowiska autobusu.",
        th: "หลังเดินทางถึง: เผื่อเวลารับกระเป๋า เดินในสนามบิน และไปยังเคาน์เตอร์หรือจุดขึ้นรถ",
      },
      {
        en: "Bus counter: The airport page shows service counters in Terminal 1 Gate 1 and Terminal 2 Gate 11. Confirm the Pattaya bus when you arrive.",
        pl: "Stanowisko autobusu: Strona lotniska pokazuje stanowiska w Terminalu 1 przy bramce 1 i Terminalu 2 przy bramce 11. Potwierdź autobus do Pattaya na miejscu.",
        th: "เคาน์เตอร์รถบัส: หน้าเว็บสนามบินระบุเคาน์เตอร์ที่อาคาร 1 ประตู 1 และอาคาร 2 ประตู 11 โปรดยืนยันรถไปพัทยาเมื่อถึงสนามบิน",
      },
      {
        en: "Pick-up point: The airport page lists Service Hall Building as the pick-up point. Follow airport signs and ask at the counter.",
        pl: "Miejsce odjazdu: Strona lotniska wskazuje Service Hall Building. Kieruj się oznaczeniami i zapytaj przy stanowisku.",
        th: "จุดขึ้นรถ: หน้าเว็บสนามบินระบุอาคารบริการเป็นจุดรับ โปรดตามป้ายและถามที่เคาน์เตอร์",
      },
      {
        en: "Tip: Bangkok traffic can be unpredictable, so keep your arrival plans flexible.",
        pl: "Wskazówka: Ruch w Bangkoku bywa nieprzewidywalny, więc zostaw elastyczny plan po przyjeździe.",
        th: "คำแนะนำ: การจราจรในกรุงเทพฯ คาดเดายาก ควรวางแผนหลังเดินทางถึงให้ยืดหยุ่น",
      },
    ],
    note: {
      en: "Transport prices can change. App-based ride prices vary by traffic, demand, and pickup point.",
      pl: "Ceny transportu mogą się zmieniać. Ceny przejazdów w aplikacjach zależą od korków, popytu i miejsca odbioru.",
      th: "ค่าเดินทางอาจเปลี่ยนได้ ราคาในแอปขึ้นอยู่กับรถติด ความต้องการ และจุดรับ",
    },
  },
  "pattaya-to-don-mueang-airport": {
    routeId: "pattaya-to-don-mueang-airport",
    title: {
      en: "How to get to the Pattaya Don Mueang bus stop",
      pl: "Jak dotrzeć do autobusu Pattaya - Don Mueang",
      th: "วิธีไปจุดรถบัสจากพัทยาไปดอนเมือง",
    },
    items: [
      {
        en: "From your hotel: Taxi or Grab is usually easiest with luggage. Price varies by distance, traffic, and demand.",
        pl: "Z hotelu: Taxi lub Grab to zwykle najłatwiejsza opcja z bagażem. Cena zależy od dystansu, korków i popytu.",
        th: "จากโรงแรม: แท็กซี่หรือ Grab มักสะดวกที่สุดถ้ามีกระเป๋า ราคาเปลี่ยนตามระยะทาง รถติด และความต้องการ",
      },
      {
        en: "By songthaew: It can be cheap if the route works for you, but first-time visitors should allow extra time.",
        pl: "Songthaew: Może być tani, jeśli trasa jest wygodna, ale osoby pierwszy raz w Pattayi powinny zostawić dodatkowy czas.",
        th: "โดยสองแถว: อาจประหยัดถ้าเส้นทางเหมาะกับคุณ แต่ถ้ามาครั้งแรกควรเผื่อเวลาเพิ่ม",
      },
      {
        en: "Boarding point: Secondary sources point to Pattaya Sukhumvit Road Bus Station. Confirm the exact stop before travel.",
        pl: "Miejsce odjazdu: Źródła dodatkowe wskazują Pattaya Sukhumvit Road Bus Station. Potwierdź dokładne miejsce przed podróżą.",
        th: "จุดขึ้นรถ: แหล่งข้อมูลรองระบุสถานีรถบัสถนนสุขุมวิทพัทยา โปรดยืนยันจุดขึ้นรถที่แน่นอนก่อนเดินทาง",
      },
      {
        en: "Tip: Do not rely on the last possible bus before a flight. Leave a backup option in case of traffic or delays.",
        pl: "Wskazówka: Nie opieraj planu na ostatnim możliwym autobusie przed lotem. Zostaw opcję awaryjną na wypadek korków lub opóźnień.",
        th: "คำแนะนำ: อย่าพึ่งรถเที่ยวสุดท้ายก่อนขึ้นเครื่อง ควรมีแผนสำรองเผื่อรถติดหรือความล่าช้า",
      },
    ],
    note: {
      en: "Transport prices can change. App-based ride prices vary by traffic, demand, and pickup point.",
      pl: "Ceny transportu mogą się zmieniać. Ceny przejazdów w aplikacjach zależą od korków, popytu i miejsca odbioru.",
      th: "ค่าเดินทางอาจเปลี่ยนได้ ราคาในแอปขึ้นอยู่กับรถติด ความต้องการ และจุดรับ",
    },
  },
};

export function getStationAccessGuide(routeId: RouteId, locale: LocaleCode) {
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

  if (locale === "th") {
    return "วิธีเดินทางไปสถานี";
  }

  return "How to get to the station";
}

function textForLocale(text: LocalizedText, locale: LocaleCode) {
  if (locale === "pl") {
    return text.pl;
  }

  if (locale === "th" && text.th) {
    return text.th;
  }

  return text.en;
}
