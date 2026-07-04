import type { LocaleCode } from "@/data/routes";

type AffiliateVariantLabels = {
  top: string;
  afterSchedule: string;
  stickyMobile: string;
  afterFaq: string;
  checkAvailability: string;
  compareAlternatives: string;
  bookFromPrice: string;
  homepageCardCta: string;
  homepageCardAria: string;
  sidebarTitle: string;
};

type UiTranslations = {
  affiliate: {
    disclosure: string;
    shortDisclosure: string;
    variantLabels: AffiliateVariantLabels;
  };
  commercial: {
    ariaLabel: string;
    bookOnlineTitle: string;
    bookOnlineLead: string;
    bookOnlineStationTitle: string;
    bookOnlineStationBody: string;
    bookOnlineOnlineTitle: string;
    bookOnlineOnlineBody: string;
    bookOnlineClosing: string;
    bookOnlineCta: string;
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
    airportTransferTitle?: string;
    airportTransferBody?: string;
    airportTransferCta?: string;
    cityTransferTitle?: string;
    cityTransferBody?: string;
    cityTransferCta?: string;
  };
  footer: {
    title: string;
    ariaLabel: string;
    about: string;
    contact: string;
    privacy: string;
  };
  hotel: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    inlineCta: string;
    disclosure: string;
    cityNames: { pattaya: string; bangkok: string };
  };
  guideLinks: {
    homepageEyebrow: string;
    homepageHeading: string;
    routeEyebrow: string;
    routeHeading: string;
    inEnglishBadge: string;
  };
  guidePage: {
    eyebrow: string;
    lastUpdated: string;
    shortAnswer: string;
    quickFacts: string;
    relatedRoute: string;
    relatedRouteBody: string;
    usefulLinks: string;
    faq: string;
    sourcesTitle: string;
    sourcesBody: string;
    bookingOptions: string;
    bookingHeading: string;
    bookingBody: string;
    breadcrumbHome: string;
    breadcrumbRoutes: string;
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
        bookFromPrice: "Book from {price}",
        homepageCardCta: "Check tickets",
        homepageCardAria: "Compare tickets on 12Go",
        sidebarTitle: "Check tickets for this route",
      },
    },
    commercial: {
      ariaLabel: "Extra travel options",
      bookOnlineTitle: "Book online or buy at the station?",
      bookOnlineLead:
        "Both work. The right choice depends on when you travel and how fixed your plans are.",
      bookOnlineStationTitle: "Buy at the station - usually cheapest",
      bookOnlineStationBody:
        "Counter fares are the lowest published price (148-158 THB per seat, depending on the terminal). Best when you're flexible: midweek travel, daytime departures running every hour, and no tight connection. You pay on the spot and take the next available bus.",
      bookOnlineOnlineTitle: "Book online - pay for a guaranteed seat",
      bookOnlineOnlineBody:
        "Online fares typically run around 30-35% higher than the counter price, in exchange for a reserved seat booked in advance. Worth it when a seat matters more than saving a little: weekends and holidays (popular departures sell out), the last bus of the day, or a fixed plan before a flight.",
      bookOnlineClosing:
        "Either way, the timetable on this page stays the same - only the price and seat guarantee differ.",
      bookOnlineCta: "Check online prices and availability",
      busFullTitle: "What if the bus is full?",
      busFullBody:
        "Popular departures can sell out around weekends, holidays, and late afternoon travel. If the next bus is full, ask at the counter for the following departure and compare bookable alternatives before you move to another station.",
      busFullCta: "Check today's seat availability",
      afterLastTitle: "After the last bus",
      afterLastBody:
        "After the last scheduled bus, your realistic choices are usually a taxi, private transfer, or waiting until the next morning. For airport routes, avoid relying on the final bus before a flight and compare alternatives early.",
      afterLastCta: "See night travel options",
      compareTitle: "Bus vs taxi vs private transfer",
      compareBody:
        "The bus is the cheapest option but the slowest. A shared van is a faster mid-price choice. A private transfer is the quickest and most comfortable - door to door with no terminal, no waiting, and room for luggage - which makes it the easiest option for early or late flights and group travel. A metered taxi works on demand but usually costs the most. Always confirm the final price, pickup point, and luggage space before you go.",
      compareCta: "Compare transfer prices",
      returnTitle: "Return route",
      returnBody:
        "Planning the way back now can save time later. Check the return route, station notes, first and last departures, and whether your destination in Bangkok is Ekkamai, Mo Chit, Suvarnabhumi, or Don Mueang.",
      returnRoutePrefix: "View",
      viewAllRoutes: "View all routes",
      airportTransferTitle: "Private transfer or van - door to door",
      airportTransferBody: "Skip the terminal: a private car or van takes you straight from the airport to your Pattaya hotel. Best with luggage, late flights, or traveling as a group.",
      airportTransferCta: "Check prices & availability",
      cityTransferTitle: "Private transfer or van - door to door",
      cityTransferBody: "Skip the bus terminal: a private car or van takes you straight to your hotel. Best with luggage, groups, or a fixed schedule.",
      cityTransferCta: "Check prices & availability",
    },
    footer: {
      title: "Bangkok Pattaya Bus Guide",
      ariaLabel: "Footer links",
      about: "About",
      contact: "Contact",
      privacy: "Privacy",
    },
    hotel: {
      eyebrow: "Where to stay",
      title: "Hotels in {city}",
      body: "Compare hotels, guesthouses and resorts — from beachfront stays to budget rooms in the center. Many offer free cancellation, so you can plan your room alongside your bus.",
      cta: "See {city} hotels on Agoda",
      inlineCta: "Hotels in {city} — compare",
      disclosure: "Hotel booking links may be affiliate links. Route and timetable information stays independent.",
      cityNames: { pattaya: "Pattaya", bangkok: "Bangkok" },
    },
    guideLinks: {
      homepageEyebrow: "Travel guides",
      homepageHeading: "Practical Bangkok and Pattaya guides",
      routeEyebrow: "Popular travel guides",
      routeHeading: "Helpful guides for this route",
      inEnglishBadge: "In English",
    },
    guidePage: {
      eyebrow: "Practical travel guide",
      lastUpdated: "Last updated:",
      shortAnswer: "Short answer",
      quickFacts: "Quick facts",
      relatedRoute: "Related route:",
      relatedRouteBody: "Use the route page for current departure times, station details, fare notes and source status before you travel.",
      usefulLinks: "Useful links",
      faq: "FAQ",
      sourcesTitle: "Sources and last checked",
      sourcesBody: "Last checked: {date}. Always confirm at the station or with the operator before travel.",
      bookingOptions: "Booking options",
      bookingHeading: "Compare tickets and alternatives",
      bookingBody: "Timetable information stays independent. Booking links help you compare live seats and available alternatives before going to the station.",
      breadcrumbHome: "Home",
      breadcrumbRoutes: "Routes",
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
        bookFromPrice: "Rezerwuj od {price}",
        homepageCardCta: "Sprawdź bilety",
        homepageCardAria: "Porównaj bilety w 12Go",
        sidebarTitle: "Sprawdź bilety na tę trasę",
      },
    },
    commercial: {
      ariaLabel: "Dodatkowe opcje podróży",
      bookOnlineTitle: "Rezerwować online czy kupić na dworcu?",
      bookOnlineLead:
        "Obie opcje działają. Właściwy wybór zależy od terminu podróży i od tego, jak sztywne są Twoje plany.",
      bookOnlineStationTitle: "Kupno na dworcu - zwykle najtaniej",
      bookOnlineStationBody:
        "Ceny w kasie to najniższa opublikowana cena (148-158 THB za miejsce, zależnie od terminalu). Najlepsze rozwiązanie, gdy masz elastyczny plan: podróż w tygodniu, kursy dzienne odjeżdżające co godzinę i brak ciasnej przesiadki. Płacisz na miejscu i jedziesz najbliższym dostępnym autobusem.",
      bookOnlineOnlineTitle: "Rezerwacja online - płacisz za gwarantowane miejsce",
      bookOnlineOnlineBody:
        "Ceny online są zwykle o około 30-35% wyższe niż cena w kasie, w zamian za miejsce zarezerwowane z wyprzedzeniem. Warto, gdy miejsce jest ważniejsze niż niewielka oszczędność: w weekendy i święta (popularne kursy się wyprzedają), na ostatni autobus dnia albo przy stałym planie przed lotem.",
      bookOnlineClosing:
        "W obu przypadkach rozkład na tej stronie pozostaje taki sam - różnią się tylko cena i gwarancja miejsca.",
      bookOnlineCta: "Sprawdź ceny online i dostępność",
      busFullTitle: "Co jeśli autobus jest pełny?",
      busFullBody:
        "Popularne kursy mogą się wyprzedać w weekendy, święta i późnym popołudniem. Jeśli najbliższy autobus jest pełny, zapytaj w kasie o kolejny kurs i porównaj dostępne alternatywy przed zmianą dworca.",
      busFullCta: "Sprawdź wolne miejsca na dziś",
      afterLastTitle: "Po ostatnim autobusie",
      afterLastBody:
        "Po ostatnim planowym autobusie realne opcje to zwykle taxi, prywatny transfer albo wyjazd następnego dnia rano. Na trasach lotniskowych nie opieraj planu na ostatnim autobusie przed lotem.",
      afterLastCta: "Zobacz nocne opcje podróży",
      compareTitle: "Autobus, taxi czy prywatny transfer",
      compareBody:
        "Autobus jest najtańszy, ale najwolniejszy. Współdzielony bus (van) to szybszy wybór w średniej cenie. Transfer prywatny jest najszybszy i najwygodniejszy — od drzwi do drzwi, bez dworca, bez czekania i z miejscem na bagaż — co czyni go najłatwiejszą opcją przy wczesnych lub późnych lotach oraz podróży grupowej. Taksówka z licznikiem działa na żądanie, ale zwykle kosztuje najwięcej. Zawsze przed wyjazdem potwierdź cenę końcową, miejsce odbioru i miejsce na bagaż.",
      compareCta: "Porównaj ceny transferów",
      returnTitle: "Trasa powrotna",
      returnBody:
        "Zaplanowanie powrotu z wyprzedzeniem oszczędza czas. Sprawdź trasę powrotną, stacje, pierwszy i ostatni odjazd oraz czy jedziesz do Ekkamai, Mo Chit, Suvarnabhumi czy Don Mueang.",
      returnRoutePrefix: "Zobacz",
      viewAllRoutes: "Zobacz wszystkie trasy",
      airportTransferTitle: "Transfer prywatny lub bus — od drzwi do drzwi",
      airportTransferBody:
        "Pomiń terminal: prywatny samochód lub bus zawiezie Cię prosto z lotniska do hotelu w Pattayi. Najlepsze przy bagażu, późnych lotach lub podróży w grupie.",
      airportTransferCta: "Sprawdź ceny i dostępność",
      cityTransferTitle: "Transfer prywatny lub bus — od drzwi do drzwi",
      cityTransferBody:
        "Pomiń dworzec autobusowy: prywatny samochód lub bus zawiezie Cię prosto do hotelu. Najlepsze przy bagażu, w grupie lub przy sztywnym planie.",
      cityTransferCta: "Sprawdź ceny i dostępność",
    },
    footer: {
      title: "Bangkok Pattaya Bus Guide",
      ariaLabel: "Linki w stopce",
      about: "O stronie",
      contact: "Kontakt",
      privacy: "Prywatność",
    },
    hotel: {
      eyebrow: "Nocleg",
      title: "Hotele: {city}",
      body: "Porównaj hotele, pensjonaty i resorty — od noclegów przy plaży po tańsze pokoje w centrum. Wiele ofert z darmową anulacją, więc zaplanujesz nocleg razem z autobusem.",
      cta: "Zobacz hotele w Agoda: {city}",
      inlineCta: "Hotele: {city} — porównaj",
      disclosure: "Linki do rezerwacji hoteli mogą być afiliacyjne. Informacje o trasach i rozkładach pozostają niezależne.",
      cityNames: { pattaya: "Pattaya", bangkok: "Bangkok" },
    },
    guideLinks: {
      homepageEyebrow: "Przewodniki",
      homepageHeading: "Praktyczne przewodniki po Bangkoku i Pattayi",
      routeEyebrow: "Popularne przewodniki",
      routeHeading: "Pomocne przewodniki dla tej trasy",
      inEnglishBadge: "Po angielsku",
    },
    guidePage: {
      eyebrow: "Praktyczny przewodnik",
      lastUpdated: "Ostatnia aktualizacja:",
      shortAnswer: "Krótka odpowiedź",
      quickFacts: "Najważniejsze fakty",
      relatedRoute: "Powiązana trasa:",
      relatedRouteBody: "Skorzystaj ze strony trasy, aby przed podróżą sprawdzić aktualne godziny odjazdów, informacje o stacjach, uwagi o cenach i status źródła.",
      usefulLinks: "Przydatne linki",
      faq: "FAQ",
      sourcesTitle: "Źródła i ostatnia weryfikacja",
      sourcesBody: "Ostatnie sprawdzenie: {date}. Zawsze potwierdź na stacji lub u operatora przed podróżą.",
      bookingOptions: "Opcje rezerwacji",
      bookingHeading: "Porównaj bilety i alternatywy",
      bookingBody: "Informacje o rozkładzie pozostają niezależne. Linki rezerwacyjne pomagają porównać dostępne miejsca i alternatywy przed wyjściem na stację.",
      breadcrumbHome: "Strona główna",
      breadcrumbRoutes: "Trasy",
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
        bookFromPrice: "Ab {price} buchen",
        homepageCardCta: "Tickets prüfen",
        homepageCardAria: "Tickets auf 12Go vergleichen",
        sidebarTitle: "Tickets für diese Route prüfen",
      },
    },
    commercial: {
      ariaLabel: "Weitere Reiseoptionen",
      bookOnlineTitle: "Online buchen oder am Bahnhof kaufen?",
      bookOnlineLead:
        "Beides funktioniert. Die richtige Wahl hängt davon ab, wann Sie reisen und wie fest Ihre Pläne sind.",
      bookOnlineStationTitle: "Am Bahnhof kaufen - meist am günstigsten",
      bookOnlineStationBody:
        "Schalterpreise sind der niedrigste veröffentlichte Preis (148-158 THB pro Sitzplatz, je nach Terminal). Am besten, wenn Sie flexibel sind: Reisen unter der Woche, Tagesabfahrten stündlich und kein knapper Anschluss. Sie zahlen vor Ort und nehmen den nächsten verfügbaren Bus.",
      bookOnlineOnlineTitle: "Online buchen - für einen garantierten Sitzplatz zahlen",
      bookOnlineOnlineBody:
        "Online-Preise liegen in der Regel etwa 30-35% über dem Schalterpreis, dafür ist der Sitzplatz im Voraus reserviert. Sinnvoll, wenn ein Sitzplatz wichtiger ist als eine kleine Ersparnis: an Wochenenden und Feiertagen (beliebte Abfahrten sind ausverkauft), beim letzten Bus des Tages oder bei einem festen Plan vor einem Flug.",
      bookOnlineClosing:
        "In beiden Fällen bleibt der Fahrplan auf dieser Seite gleich - nur Preis und Sitzplatzgarantie unterscheiden sich.",
      bookOnlineCta: "Online-Preise und Verfügbarkeit prüfen",
      busFullTitle: "Was, wenn der Bus voll ist?",
      busFullBody:
        "Beliebte Abfahrten können an Wochenenden, Feiertagen und am späten Nachmittag ausverkauft sein. Wenn der nächste Bus voll ist, fragen Sie am Schalter nach der nächsten Abfahrt und vergleichen Sie buchbare Alternativen.",
      busFullCta: "Freie Plätze heute prüfen",
      afterLastTitle: "Nach dem letzten Bus",
      afterLastBody:
        "Nach dem letzten Linienbus bleiben meist Taxi, privater Transfer oder die Fahrt am nächsten Morgen. Bei Flughafenrouten sollten Sie nicht auf den letzten Bus vor dem Flug setzen.",
      afterLastCta: "Nächtliche Reiseoptionen ansehen",
      compareTitle: "Bus, Taxi oder privater Transfer",
      compareBody:
        "Der Bus ist am günstigsten, aber am langsamsten. Ein geteilter Van ist eine schnellere Option zum mittleren Preis. Ein privater Transfer ist am schnellsten und bequemsten - von Tür zu Tür, ohne Terminal, ohne Warten und mit Platz für Gepäck - und damit die einfachste Wahl bei frühen oder späten Flügen und für Gruppen. Ein Taxi mit Taxameter fährt auf Abruf, kostet aber meist am meisten. Bestätigen Sie vor der Fahrt immer den Endpreis, den Abholpunkt und den Gepäckplatz.",
      compareCta: "Transferpreise vergleichen",
      returnTitle: "Rückroute",
      returnBody:
        "Wenn Sie die Rückfahrt früh planen, sparen Sie später Zeit. Prüfen Sie Rückroute, Stationshinweise, erste und letzte Abfahrt und ob Ihr Ziel Ekkamai, Mo Chit, Suvarnabhumi oder Don Mueang ist.",
      returnRoutePrefix: "Ansehen:",
      viewAllRoutes: "Alle Routen anzeigen",
      airportTransferTitle: "Privater Transfer oder Van - von Tür zu Tür",
      airportTransferBody:
        "Sparen Sie sich das Terminal: Ein privates Auto oder ein Van bringt Sie direkt vom Flughafen zu Ihrem Hotel in Pattaya. Ideal mit Gepäck, bei späten Flügen oder in der Gruppe.",
      airportTransferCta: "Preise & Verfügbarkeit prüfen",
      cityTransferTitle: "Privater Transfer oder Van - von Tür zu Tür",
      cityTransferBody:
        "Sparen Sie sich den Busbahnhof: Ein privates Auto oder ein Van bringt Sie direkt zu Ihrem Hotel. Ideal mit Gepäck, in der Gruppe oder bei festem Zeitplan.",
      cityTransferCta: "Preise & Verfügbarkeit prüfen",
    },
    footer: {
      title: "Bangkok Pattaya Bus Guide",
      ariaLabel: "Links im Seitenfuß",
      about: "Über uns",
      contact: "Kontakt",
      privacy: "Datenschutz",
    },
    hotel: {
      eyebrow: "Übernachten",
      title: "Hotels in {city}",
      body: "Vergleichen Sie Hotels, Gästehäuser und Resorts — von Strandunterkünften bis zu günstigen Zimmern im Zentrum. Viele mit kostenloser Stornierung, passend zu Ihrer Busfahrt planbar.",
      cta: "{city}-Hotels auf Agoda ansehen",
      inlineCta: "Hotels in {city} vergleichen",
      disclosure: "Hotel-Buchungslinks können Affiliate-Links sein. Routen- und Fahrplaninformationen bleiben unabhängig.",
      cityNames: { pattaya: "Pattaya", bangkok: "Bangkok" },
    },
    guideLinks: {
      homepageEyebrow: "Reiseführer",
      homepageHeading: "Praktische Guides für Bangkok und Pattaya",
      routeEyebrow: "Beliebte Reiseführer",
      routeHeading: "Hilfreiche Guides für diese Route",
      inEnglishBadge: "Auf Englisch",
    },
    guidePage: {
      eyebrow: "Praktischer Reiseratgeber",
      lastUpdated: "Zuletzt aktualisiert:",
      shortAnswer: "Kurze Antwort",
      quickFacts: "Kurzinfos",
      relatedRoute: "Zugehörige Route:",
      relatedRouteBody: "Nutzen Sie die Routenseite für aktuelle Abfahrtszeiten, Stationsdetails, Preishinweise und Quellenstatus vor der Reise.",
      usefulLinks: "Nützliche Links",
      faq: "FAQ",
      sourcesTitle: "Quellen und letzte Prüfung",
      sourcesBody: "Zuletzt geprüft: {date}. Bestätigen Sie immer am Bahnhof oder beim Betreiber vor der Reise.",
      bookingOptions: "Buchungsoptionen",
      bookingHeading: "Tickets und Alternativen vergleichen",
      bookingBody: "Die Fahrplaninformationen bleiben unabhängig. Buchungslinks helfen Ihnen, verfügbare Plätze und Alternativen vor dem Weg zum Bahnhof zu vergleichen.",
      breadcrumbHome: "Startseite",
      breadcrumbRoutes: "Routen",
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
        bookFromPrice: "Réservez à partir de {price}",
        homepageCardCta: "Vérifier les billets",
        homepageCardAria: "Comparer les billets sur 12Go",
        sidebarTitle: "Voir les billets pour cet itinéraire",
      },
    },
    commercial: {
      ariaLabel: "Options de voyage supplémentaires",
      bookOnlineTitle: "Réserver en ligne ou acheter à la gare ?",
      bookOnlineLead:
        "Les deux options fonctionnent. Le bon choix dépend de votre date de voyage et de la souplesse de vos plans.",
      bookOnlineStationTitle: "Acheter à la gare - généralement le moins cher",
      bookOnlineStationBody:
        "Les tarifs au guichet sont le prix publié le plus bas (148-158 THB par siège, selon le terminal). C'est le meilleur choix si vous êtes flexible : voyage en semaine, départs en journée toutes les heures et aucune correspondance serrée. Vous payez sur place et prenez le prochain bus disponible.",
      bookOnlineOnlineTitle: "Réserver en ligne - payer pour une place garantie",
      bookOnlineOnlineBody:
        "Les tarifs en ligne sont généralement environ 30-35% plus élevés que le prix au guichet, en échange d'une place réservée à l'avance. Cela vaut le coup quand la place compte plus qu'une petite économie : week-ends et jours fériés (les départs populaires affichent complet), dernier bus de la journée ou plan fixe avant un vol.",
      bookOnlineClosing:
        "Dans tous les cas, l'horaire de cette page reste le même - seuls le prix et la garantie de place changent.",
      bookOnlineCta: "Vérifier les prix en ligne et la disponibilité",
      busFullTitle: "Et si le bus est complet ?",
      busFullBody:
        "Les départs populaires peuvent être complets les week-ends, jours fériés et en fin d'après-midi. Si le prochain bus est complet, demandez le départ suivant au guichet et comparez les alternatives réservables.",
      busFullCta: "Voir les places pour aujourd'hui",
      afterLastTitle: "Après le dernier bus",
      afterLastBody:
        "Après le dernier bus prévu, les options réalistes sont souvent le taxi, le transfert privé ou le lendemain matin. Pour l'aéroport, évitez de compter sur le dernier bus avant un vol.",
      afterLastCta: "Voir les options de nuit",
      compareTitle: "Bus, taxi ou transfert privé",
      compareBody:
        "Le bus est l'option la moins chère mais la plus lente. Un van partagé est un choix plus rapide à prix moyen. Un transfert privé est le plus rapide et le plus confortable - de porte à porte, sans terminal, sans attente et avec de la place pour les bagages - ce qui en fait l'option la plus simple pour les vols matinaux ou tardifs et les voyages en groupe. Un taxi au compteur fonctionne à la demande mais coûte généralement le plus cher. Confirmez toujours le prix final, le point de prise en charge et l'espace bagages avant de partir.",
      compareCta: "Comparer les prix des transferts",
      returnTitle: "Trajet retour",
      returnBody:
        "Prévoir le retour à l'avance peut faire gagner du temps. Vérifiez le trajet retour, les gares, le premier et le dernier départ, et si votre destination est Ekkamai, Mo Chit, Suvarnabhumi ou Don Mueang.",
      returnRoutePrefix: "Voir",
      viewAllRoutes: "Voir toutes les routes",
      airportTransferTitle: "Transfert privé ou van - de porte à porte",
      airportTransferBody:
        "Évitez le terminal : une voiture privée ou un van vous emmène directement de l'aéroport à votre hôtel à Pattaya. Idéal avec des bagages, un vol tardif ou en groupe.",
      airportTransferCta: "Vérifier prix et disponibilité",
      cityTransferTitle: "Transfert privé ou van - de porte à porte",
      cityTransferBody:
        "Évitez la gare routière : une voiture privée ou un van vous emmène directement à votre hôtel. Idéal avec des bagages, en groupe ou avec un horaire fixe.",
      cityTransferCta: "Vérifier prix et disponibilité",
    },
    footer: {
      title: "Bangkok Pattaya Bus Guide",
      ariaLabel: "Liens de pied de page",
      about: "À propos",
      contact: "Nous contacter",
      privacy: "Confidentialité",
    },
    hotel: {
      eyebrow: "Où dormir",
      title: "Hôtels à {city}",
      body: "Comparez hôtels, maisons d'hôtes et resorts — du bord de mer aux chambres économiques du centre. Beaucoup avec annulation gratuite, à planifier en même temps que votre bus.",
      cta: "Voir les hôtels à {city} sur Agoda",
      inlineCta: "Hôtels à {city} — comparer",
      disclosure: "Les liens de réservation d'hôtel peuvent être des liens affiliés. Les informations d'itinéraire et d'horaires restent indépendantes.",
      cityNames: { pattaya: "Pattaya", bangkok: "Bangkok" },
    },
    guideLinks: {
      homepageEyebrow: "Guides de voyage",
      homepageHeading: "Guides pratiques pour Bangkok et Pattaya",
      routeEyebrow: "Guides populaires",
      routeHeading: "Guides utiles pour cet itinéraire",
      inEnglishBadge: "En anglais",
    },
    guidePage: {
      eyebrow: "Guide pratique de voyage",
      lastUpdated: "Dernière mise à jour :",
      shortAnswer: "Réponse rapide",
      quickFacts: "Infos clés",
      relatedRoute: "Itinéraire associé :",
      relatedRouteBody: "Utilisez la page de l'itinéraire pour les horaires de départ actuels, les détails des gares, les notes de tarif et le statut des sources avant de voyager.",
      usefulLinks: "Liens utiles",
      faq: "FAQ",
      sourcesTitle: "Sources et dernière vérification",
      sourcesBody: "Dernière vérification : {date}. Confirmez toujours à la gare ou auprès de l'opérateur avant de voyager.",
      bookingOptions: "Options de réservation",
      bookingHeading: "Comparer les billets et alternatives",
      bookingBody: "Les informations d'horaires restent indépendantes. Les liens de réservation vous aident à comparer les places disponibles et les alternatives avant d'aller à la gare.",
      breadcrumbHome: "Accueil",
      breadcrumbRoutes: "Itinéraires",
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
        bookFromPrice: "Билеты от {price}",
        homepageCardCta: "Проверить билеты",
        homepageCardAria: "Сравнить билеты на 12Go",
        sidebarTitle: "Проверить билеты на этот маршрут",
      },
    },
    commercial: {
      ariaLabel: "Дополнительные варианты поездки",
      bookOnlineTitle: "Бронировать онлайн или купить на станции?",
      bookOnlineLead:
        "Оба варианта подходят. Правильный выбор зависит от даты поездки и того, насколько жесткие у вас планы.",
      bookOnlineStationTitle: "Купить на станции - обычно дешевле",
      bookOnlineStationBody:
        "Тарифы в кассе - самая низкая опубликованная цена (148-158 THB за место, в зависимости от терминала). Лучше всего, если вы гибки: поездка в будний день, дневные отправления каждый час и нет плотной пересадки. Вы платите на месте и садитесь на ближайший доступный автобус.",
      bookOnlineOnlineTitle: "Бронировать онлайн - платить за гарантированное место",
      bookOnlineOnlineBody:
        "Онлайн-тарифы обычно примерно на 30-35% выше цены в кассе, зато место бронируется заранее. Это стоит выбрать, когда место важнее небольшой экономии: в выходные и праздники (популярные рейсы распродаются), на последний автобус дня или при фиксированном плане перед рейсом.",
      bookOnlineClosing:
        "В любом случае расписание на этой странице остается тем же - отличаются только цена и гарантия места.",
      bookOnlineCta: "Проверить онлайн-цены и наличие мест",
      busFullTitle: "Что делать, если автобус полный?",
      busFullBody:
        "Популярные рейсы могут распродаваться в выходные, праздники и ближе к вечеру. Если ближайший автобус полный, спросите на стойке о следующем рейсе и сравните доступные альтернативы.",
      busFullCta: "Проверить свободные места на сегодня",
      afterLastTitle: "После последнего автобуса",
      afterLastBody:
        "После последнего автобуса обычно остаются такси, частный трансфер или поездка утром. Для маршрутов в аэропорт не планируйте поездку только на последнем автобусе перед рейсом.",
      afterLastCta: "Посмотреть варианты на ночь",
      compareTitle: "Автобус, такси или частный трансфер",
      compareBody:
        "Автобус — самый дешёвый вариант, но самый медленный. Совместный вэн — более быстрый выбор по средней цене. Частный трансфер — самый быстрый и комфортный: от двери до двери, без вокзала, без ожидания и с местом для багажа, что делает его самым удобным вариантом при ранних или поздних рейсах и поездках группой. Такси по счётчику доступно по запросу, но обычно обходится дороже всего. Всегда уточняйте итоговую цену, место посадки и место для багажа перед поездкой.",
      compareCta: "Сравнить цены трансферов",
      returnTitle: "Обратный маршрут",
      returnBody:
        "Если продумать обратную дорогу заранее, потом будет проще. Проверьте маршрут обратно, станции, первый и последний рейс, а также конечную точку: Эккамай, Мо Чит, Суварнабхуми или Дон Муанг.",
      returnRoutePrefix: "Открыть",
      viewAllRoutes: "Показать все маршруты",
      airportTransferTitle: "Частный трансфер или вэн - от двери до двери",
      airportTransferBody:
        "Минуя терминал: частный автомобиль или вэн довезёт вас прямо из аэропорта до отеля в Паттайе. Удобно с багажом, при поздних рейсах или поездке группой.",
      airportTransferCta: "Проверить цены и наличие",
      cityTransferTitle: "Частный трансфер или вэн - от двери до двери",
      cityTransferBody:
        "Минуя автовокзал: частный автомобиль или вэн довезёт вас прямо до отеля. Удобно с багажом, группой или при фиксированном плане.",
      cityTransferCta: "Проверить цены и наличие",
    },
    footer: {
      title: "Гид по автобусам Бангкок Паттайя",
      ariaLabel: "Ссылки внизу страницы",
      about: "О проекте",
      contact: "Контакты",
      privacy: "Конфиденциальность",
    },
    hotel: {
      eyebrow: "Где остановиться",
      title: "Отели: {city}",
      body: "Сравните отели, гостевые дома и курорты — от жилья у пляжа до бюджетных номеров в центре. У многих бесплатная отмена — спланируйте ночлег вместе с автобусом.",
      cta: "Смотреть отели на Agoda: {city}",
      inlineCta: "Отели: {city} — сравнить",
      disclosure: "Ссылки на бронирование отелей могут быть партнёрскими. Информация о маршрутах и расписании остаётся независимой.",
      cityNames: { pattaya: "Паттайя", bangkok: "Бангкок" },
    },
    guideLinks: {
      homepageEyebrow: "Путеводители",
      homepageHeading: "Практичные гиды по Бангкоку и Паттайе",
      routeEyebrow: "Популярные путеводители",
      routeHeading: "Полезные гиды для этого маршрута",
      inEnglishBadge: "На английском",
    },
    guidePage: {
      eyebrow: "Практичный путеводитель",
      lastUpdated: "Последнее обновление:",
      shortAnswer: "Краткий ответ",
      quickFacts: "Ключевые факты",
      relatedRoute: "Связанный маршрут:",
      relatedRouteBody: "Откройте страницу маршрута, чтобы перед поездкой узнать актуальное время отправления, детали станций, замечания о ценах и статус источника.",
      usefulLinks: "Полезные ссылки",
      faq: "Частые вопросы",
      sourcesTitle: "Источники и последняя проверка",
      sourcesBody: "Последняя проверка: {date}. Всегда уточняйте на станции или у оператора перед поездкой.",
      bookingOptions: "Варианты бронирования",
      bookingHeading: "Сравнить билеты и альтернативы",
      bookingBody: "Информация о расписании остаётся независимой. Ссылки на бронирование помогают сравнить доступные места и альтернативы до поездки на вокзал.",
      breadcrumbHome: "Главная",
      breadcrumbRoutes: "Маршруты",
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
        bookFromPrice: "จองตั๋ว เริ่ม {price}",
        homepageCardCta: "ตรวจสอบตั๋ว",
        homepageCardAria: "เปรียบเทียบตั๋วบน 12Go",
        sidebarTitle: "ตรวจสอบตั๋วสำหรับเส้นทางนี้",
      },
    },
    commercial: {
      ariaLabel: "ตัวเลือกการเดินทางเพิ่มเติม",
      bookOnlineTitle: "จองออนไลน์หรือซื้อที่สถานี?",
      bookOnlineLead:
        "ใช้ได้ทั้งสองแบบ ตัวเลือกที่เหมาะขึ้นอยู่กับช่วงเวลาที่เดินทางและแผนของคุณแน่นแค่ไหน",
      bookOnlineStationTitle: "ซื้อที่สถานี - มักถูกที่สุด",
      bookOnlineStationBody:
        "ราคาหน้าเคาน์เตอร์เป็นราคาประกาศที่ต่ำที่สุด (148-158 THB ต่อที่นั่ง ขึ้นอยู่กับเทอร์มินัล) เหมาะที่สุดเมื่อคุณยืดหยุ่นได้: เดินทางวันธรรมดา รอบกลางวันออกทุกชั่วโมง และไม่มีการต่อรถที่เวลาจำกัด คุณจ่ายเงินที่สถานีและขึ้นรถรอบถัดไปที่มีที่นั่ง",
      bookOnlineOnlineTitle: "จองออนไลน์ - จ่ายเพื่อการันตีที่นั่ง",
      bookOnlineOnlineBody:
        "ราคาออนไลน์มักสูงกว่าราคาหน้าเคาน์เตอร์ประมาณ 30-35% แลกกับที่นั่งที่จองไว้ล่วงหน้า คุ้มเมื่อที่นั่งสำคัญกว่าการประหยัดเล็กน้อย: วันหยุดสุดสัปดาห์และวันหยุดนักขัตฤกษ์ (รอบยอดนิยมอาจเต็ม), รถรอบสุดท้ายของวัน หรือแผนที่แน่นอนก่อนขึ้นเครื่องบิน",
      bookOnlineClosing:
        "ไม่ว่าจะเลือกแบบไหน ตารางเวลาบนหน้านี้ยังเหมือนเดิม - ต่างกันแค่ราคาและการการันตีที่นั่ง",
      bookOnlineCta: "ตรวจสอบราคาออนไลน์และที่นั่งว่าง",
      busFullTitle: "ถ้ารถบัสเต็มควรทำอย่างไร?",
      busFullBody:
        "เที่ยวรถยอดนิยมอาจเต็มในช่วงสุดสัปดาห์ วันหยุด และช่วงบ่ายแก่ ๆ หากรถเที่ยวถัดไปเต็ม ให้ถามเคาน์เตอร์เรื่องเที่ยวถัดไปและเปรียบเทียบทางเลือกที่จองได้ก่อนเปลี่ยนสถานี",
      busFullCta: "ตรวจสอบที่นั่งว่างวันนี้",
      afterLastTitle: "หลังรถบัสเที่ยวสุดท้าย",
      afterLastBody:
        "หลังเที่ยวรถตามตารางเที่ยวสุดท้าย ตัวเลือกที่เป็นไปได้มักเป็นแท็กซี่ รถรับส่งส่วนตัว หรือรอเช้าวันถัดไป สำหรับเส้นทางสนามบิน อย่าพึ่งเที่ยวสุดท้ายก่อนขึ้นเครื่อง",
      afterLastCta: "ดูตัวเลือกเดินทางกลางคืน",
      compareTitle: "รถบัส แท็กซี่ หรือรถรับส่งส่วนตัว",
      compareBody:
        "รถบัสถูกที่สุดแต่ช้าที่สุด รถตู้ร่วมเดินทางเป็นทางเลือกที่เร็วกว่าในราคาปานกลาง รถรับส่งส่วนตัวเร็วและสะดวกที่สุด - รับส่งถึงที่หมายโดยไม่ต้องผ่านสถานี ไม่ต้องรอ และมีที่วางสัมภาระ - จึงเป็นตัวเลือกที่ง่ายที่สุดสำหรับเที่ยวบินเช้าหรือดึกและการเดินทางเป็นกลุ่ม แท็กซี่มิเตอร์เรียกใช้ได้ตามต้องการแต่มักแพงที่สุด ควรยืนยันราคาสุดท้าย จุดรับ และพื้นที่วางสัมภาระก่อนเดินทางเสมอ",
      compareCta: "เปรียบเทียบราคารถรับส่ง",
      returnTitle: "เส้นทางขากลับ",
      returnBody:
        "การวางแผนขากลับล่วงหน้าช่วยประหยัดเวลา ตรวจสอบเส้นทางกลับ สถานี เที่ยวแรก เที่ยวสุดท้าย และปลายทางในกรุงเทพฯ เช่น เอกมัย หมอชิต สุวรรณภูมิ หรือดอนเมือง",
      returnRoutePrefix: "ดู",
      viewAllRoutes: "ดูเส้นทางทั้งหมด",
      airportTransferTitle: "รถรับส่งส่วนตัวหรือรถตู้ - รับส่งถึงที่หมาย",
      airportTransferBody:
        "ข้ามขั้นตอนที่เทอร์มินัล: รถยนต์หรือรถตู้ส่วนตัวพาคุณจากสนามบินตรงถึงโรงแรมในพัทยา เหมาะเมื่อมีสัมภาระ เที่ยวบินดึก หรือเดินทางเป็นกลุ่ม",
      airportTransferCta: "ตรวจสอบราคาและที่ว่าง",
      cityTransferTitle: "รถรับส่งส่วนตัวหรือรถตู้ - รับส่งถึงที่หมาย",
      cityTransferBody:
        "ข้ามขั้นตอนที่สถานีขนส่ง: รถยนต์หรือรถตู้ส่วนตัวพาคุณตรงถึงโรงแรม เหมาะเมื่อมีสัมภาระ เดินทางเป็นกลุ่ม หรือมีกำหนดการที่แน่นอน",
      cityTransferCta: "ตรวจสอบราคาและที่ว่าง",
    },
    footer: {
      title: "คู่มือรถบัสกรุงเทพฯ พัทยา",
      ariaLabel: "ลิงก์ท้ายหน้า",
      about: "เกี่ยวกับเรา",
      contact: "ติดต่อ",
      privacy: "ความเป็นส่วนตัว",
    },
    hotel: {
      eyebrow: "ที่พัก",
      title: "โรงแรมใน{city}",
      body: "เปรียบเทียบโรงแรม เกสต์เฮาส์ และรีสอร์ต ตั้งแต่ที่พักริมหาดไปจนถึงห้องราคาประหยัดในเมือง หลายที่ยกเลิกฟรี วางแผนที่พักพร้อมกับรถบัสได้เลย",
      cta: "ดูโรงแรมใน{city}บน Agoda",
      inlineCta: "โรงแรมใน{city} — เปรียบเทียบ",
      disclosure: "ลิงก์จองโรงแรมอาจเป็นลิงก์พันธมิตร ข้อมูลเส้นทางและตารางเวลายังคงเป็นอิสระ",
      cityNames: { pattaya: "พัทยา", bangkok: "กรุงเทพฯ" },
    },
    guideLinks: {
      homepageEyebrow: "คู่มือท่องเที่ยว",
      homepageHeading: "คู่มือที่ใช้ได้จริงสำหรับกรุงเทพฯ และพัทยา",
      routeEyebrow: "คู่มือยอดนิยม",
      routeHeading: "คู่มือที่เป็นประโยชน์สำหรับเส้นทางนี้",
      inEnglishBadge: "ภาษาอังกฤษ",
    },
    guidePage: {
      eyebrow: "คู่มือเดินทางที่ใช้ได้จริง",
      lastUpdated: "อัปเดตล่าสุด:",
      shortAnswer: "คำตอบสั้น ๆ",
      quickFacts: "ข้อมูลสำคัญ",
      relatedRoute: "เส้นทางที่เกี่ยวข้อง:",
      relatedRouteBody: "ใช้หน้าข้อมูลเส้นทางเพื่อดูเวลาออกเดินทางล่าสุด รายละเอียดสถานี หมายเหตุค่าโดยสาร และสถานะแหล่งข้อมูลก่อนเดินทาง",
      usefulLinks: "ลิงก์ที่เป็นประโยชน์",
      faq: "คำถามที่พบบ่อย",
      sourcesTitle: "แหล่งข้อมูลและการตรวจสอบล่าสุด",
      sourcesBody: "ตรวจสอบล่าสุด: {date} โปรดยืนยันที่สถานีหรือกับผู้ให้บริการก่อนเดินทางเสมอ",
      bookingOptions: "ตัวเลือกการจอง",
      bookingHeading: "เปรียบเทียบตั๋วและทางเลือก",
      bookingBody: "ข้อมูลตารางเวลายังคงเป็นอิสระ ลิงก์จองช่วยให้คุณเปรียบเทียบที่นั่งว่างและทางเลือกก่อนไปที่สถานี",
      breadcrumbHome: "หน้าแรก",
      breadcrumbRoutes: "เส้นทาง",
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
        bookFromPrice: "订票 · {price} 起",
        homepageCardCta: "查看车票",
        homepageCardAria: "在 12Go 比较车票",
        sidebarTitle: "查看此路线车票",
      },
    },
    commercial: {
      ariaLabel: "更多出行选择",
      bookOnlineTitle: "网上预订还是在车站购买？",
      bookOnlineLead:
        "两种方式都可以。正确选择取决于你的出行时间，以及行程计划是否固定。",
      bookOnlineStationTitle: "在车站购买 - 通常最便宜",
      bookOnlineStationBody:
        "柜台票价是公布的最低价格（每座 148-158 THB，取决于车站）。如果你的行程灵活，这是最合适的选择：工作日出行、白天班次每小时一班，而且没有紧张的换乘。你在现场付款，然后乘坐下一班有座位的巴士。",
      bookOnlineOnlineTitle: "网上预订 - 为保证座位付费",
      bookOnlineOnlineBody:
        "网上票价通常比柜台价高约 30-35%，换来的是提前预留的座位。当座位比省一点钱更重要时值得选择：周末和节假日（热门班次会售完）、当天最后一班巴士，或赶飞机前的固定计划。",
      bookOnlineClosing:
        "无论哪种方式，本页时刻表都保持不变 - 只有价格和座位保证不同。",
      bookOnlineCta: "查看网上价格和可订情况",
      busFullTitle: "如果巴士满座怎么办？",
      busFullBody:
        "热门班次在周末、节假日和傍晚可能会售完。如果下一班车满座，请在柜台询问后续班次，并在换车站前比较可预订的替代选择。",
      busFullCta: "查看今日余座",
      afterLastTitle: "最后一班巴士之后",
      afterLastBody:
        "最后一班计划巴士之后，通常只能选择出租车、私人接送，或等到第二天早上。机场路线不要把行程押在航班前最后一班车上。",
      afterLastCta: "查看夜间出行选择",
      compareTitle: "巴士、出租车或私人接送",
      compareBody:
        "巴士最便宜但最慢。拼车面包车是价格适中、速度更快的选择。私人接送最快也最舒适——门到门、无需车站、无需等待，还有行李空间——是赶早班或晚班航班以及团体出行最省心的选择。打表出租车随叫随到，但通常最贵。出发前请务必确认最终价格、上车地点和行李空间。",
      compareCta: "比较接送价格",
      returnTitle: "返程路线",
      returnBody:
        "提前规划返程可以节省时间。查看返程路线、车站信息、首末班车，以及在曼谷的目的地是亿甲迈、莫奇特、素万那普还是廊曼。",
      returnRoutePrefix: "查看",
      viewAllRoutes: "查看所有路线",
      airportTransferTitle: "私人接送或面包车 - 门到门",
      airportTransferBody:
        "免去车站奔波：私人轿车或面包车从机场直接送您到芭提雅酒店。适合携带行李、深夜航班或团体出行。",
      airportTransferCta: "查看价格和可订情况",
      cityTransferTitle: "私人接送或面包车 - 门到门",
      cityTransferBody:
        "免去汽车站奔波：私人轿车或面包车直接送您到酒店。适合携带行李、团体出行或行程固定。",
      cityTransferCta: "查看价格和可订情况",
    },
    footer: {
      title: "曼谷芭提雅巴士指南",
      ariaLabel: "页脚链接",
      about: "关于",
      contact: "联系",
      privacy: "隐私",
    },
    hotel: {
      eyebrow: "住宿",
      title: "{city}酒店",
      body: "比较酒店、旅馆和度假村——从海边住宿到市中心经济房型。许多可免费取消，方便与巴士行程一起安排。",
      cta: "在 Agoda 查看{city}酒店",
      inlineCta: "比较{city}酒店",
      disclosure: "酒店预订链接可能是联盟链接。路线和时刻表信息保持独立。",
      cityNames: { pattaya: "芭提雅", bangkok: "曼谷" },
    },
    guideLinks: {
      homepageEyebrow: "旅行指南",
      homepageHeading: "曼谷和芭提雅实用指南",
      routeEyebrow: "热门指南",
      routeHeading: "适用于此路线的实用指南",
      inEnglishBadge: "英文",
    },
    guidePage: {
      eyebrow: "实用旅行指南",
      lastUpdated: "最后更新：",
      shortAnswer: "简短回答",
      quickFacts: "关键信息",
      relatedRoute: "相关路线：",
      relatedRouteBody: "出行前请使用路线页面查看最新发车时间、车站详情、票价说明和数据来源状态。",
      usefulLinks: "实用链接",
      faq: "常见问题",
      sourcesTitle: "来源与最近核对",
      sourcesBody: "最近核对：{date}。出行前请务必在车站或向运营商确认。",
      bookingOptions: "预订选项",
      bookingHeading: "比较车票和替代选择",
      bookingBody: "时刻表信息保持独立。预订链接帮助你在前往车站前比较可订座位和替代选择。",
      breadcrumbHome: "首页",
      breadcrumbRoutes: "路线",
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
