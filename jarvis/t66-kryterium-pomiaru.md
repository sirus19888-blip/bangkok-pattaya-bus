# T66 — kryterium pomiaru dla zmiany transferowej

Spisane **2026-08-30, przed wdrożeniem T65a.** To jest warunek uczciwości tego testu:
progi ustalone po zobaczeniu danych to nie pomiar, tylko opowiadanie.

Dokument do otwarcia ponownie za 8–12 tygodni. Poprzednik: T55 w `current-task.md`,
rozstrzygnięcie techniczne: T64 w `zadania-t60-t68.md`.

---

## 1. Dlaczego projekt pomiaru się zmienił

W T55 pytanie brzmiało: „czy średnia prowizja z rezerwacji o SubID `_transfer` jest
istotnie wyższa niż €0,88". Miało to dwie wady, obie usunięte przez T64.

**Wada pierwsza — konfundent produktu, teraz zamknięty.** Dopóki wszystkie CTA prowadziły
pod ten sam nieprzefiltrowany adres, rezerwacja z sub_id `_transfer` mogła być zwykłym
biletem autobusowym. T64 wykazał, że `vehclasses_tab=charter` realnie kontroluje klasę
produktu na liście wyników, więc ten konfundent w dużej mierze znika.

**Wada druga — brak mocy statystycznej, nadal aktualna.** Przy 105 rezerwacjach na
8 tygodni i 3 transferach w linii bazowej, cztery tygodnie dają około półtora transferu.
Podwojenie efektu da trzy zamiast półtora i tego nie da się odróżnić od szumu.
Liczba rezerwacji transferowych **nie może być** miarą rozstrzygającą.

**Zmiana trzecia — zakres urósł.** T65a w rozszerzonym zakresie nie dotyka 11 stron
z blokiem transferowym, tylko ponad 150 miejsc CTA na stronach tras. To zmienia projekt
eksperymentu na korzyść: **wartości `sub_id` zostają bez zmian**, zmienia się wyłącznie
adres docelowy. Dzięki temu mamy naturalne porównanie przed/po na tym samym identyfikatorze,
z ośmioma tygodniami istniejącej historii jako grupą kontrolną.

---

## 2. Co dokładnie się zmienia

Do adresu 12Go dochodzi jeden parametr, **tylko** przy pozycjach CTA, których treść już
teraz argumentuje, że autobus nie jest odpowiedzią:

```
guide_transfer  route_charter_gap  route_help_after_last  route_help_bus_full
route_help_vs_taxi  route_airport_transfer  route_city_transfer
```

Bez zmian zostają CTA „kup bilet na autobus": `route_after_schedule`, `route_top`,
`desktop_sidebar`, `mobile_sticky`, `guide_mobile_sticky`, `guide_short_answer`,
`route_help_online_vs_station`, `route_commercial_help` i wszystkie `homepage_*`.

Ani jedna etykieta przycisku, ani jedno zdanie treści się nie zmienia. **Zmienia się
wyłącznie to, na jaką listę wyników trafia czytelnik.** To czyni pomiar czystym: każda
różnica w wynikach pochodzi z celu linku, nie z perswazji.

---

## 3. Linia bazowa — zapisać PRZED wdrożeniem

Bez tego nie ma z czym porównywać. Okno odniesienia: **1 lipca – 24 sierpnia 2026**
(8 tygodni), które już znamy:

```
2 290 uzytkownikow -> 641 klikniec CTA (28%) -> 895 wizyt w 12Go -> 105 rezerwacji -> €91,99
srednia prowizja: €0,88
prowizja na 1000 sesji: €40,17
transfery: 3 rezerwacje, €22,64 (3% rezerwacji, 25% przychodu)
```

Do zebrania dodatkowo, bo tego jeszcze nie mamy spisanego:

- [ ] **Udział kliknięć per `cta_position`** za okno bazowe (GA4 → Zdarzenia →
      `affiliate_click` → parametr `cta_position`). Bez tego nie wiadomo, jaką część
      ruchu obejmuje zmiana.
- [ ] **Rezerwacje i prowizja per `sub_id`** z raportu 12Go za to samo okno.
- [ ] **Nazwy produktów** przy tych rezerwacjach — stąd wzięło się rozróżnienie
      €0,20–0,67 wobec €6,91–7,95.
- [ ] Data i godzina wdrożenia T65a, żeby dało się uciąć okna.

---

## 4. Wskaźniki

### 4.1 Wiodący, w dniach — czy zmiana nie odstrasza

**CTR pozycji objętych zmianą**, przed vs po, ta sama pozycja.

Etykieta przycisku się nie zmienia, więc CTR **powinien zostać taki sam**. Jeśli spadnie,
znaczy to, że coś poza linkiem uległo zmianie i trzeba szukać usterki. Ten wskaźnik ma
wolumen w setkach kliknięć, więc mówi coś sensownego już po kilku dniach.

### 4.2 Rdzeniowy, w tygodniach — czy miks produktowy się przesunął

Z raportu 12Go, per `sub_id`, dla pozycji objętych zmianą:

- **udział rezerwacji klasy charter** (taxi / prywatny transfer / van premium) —
  rozpoznawany po nazwie produktu, tak jak przy €7,95
- **średnia prowizja na rezerwację**

To jest test hipotezy T55. Porównanie przed/po na tym samym `sub_id`.

### 4.3 Wynikowy — czy to w ogóle zarabia

**Prowizja na 1000 sesji**, całościowo. Baza: **€40,17**.

Odporny na wahania ruchu, dlatego jest miarą rozstrzygającą, a nie liczba rezerwacji.

### 4.4 Strażniczy — czy nie tracimy więcej, niż zyskujemy

**Łączna liczba rezerwacji na 1000 sesji.** Baza: **45,9**.

> **UWAGA — ta definicja została poprawiona 2026-09-06. Nie używać jej w tej postaci.**
> Mianownik „użytkownicy" zawiera ruch botów i natychmiastowych odbić, który fizycznie
> nie może zarezerwować biletu, więc jego przyrost wygląda jak spadek konwersji.
> Obowiązująca definicja i baza: **rezerwacje na 1000 sesji z zaangażowaniem, baza 82,1**.
> Uzasadnienie w bloku „Odczyt 2 — KOREKTA" niżej.

Realne ryzyko tej zmiany: czytelnik szukający autobusu ląduje na liście od PLN 155,
odbija się i nie rezerwuje niczego. Wyższa prowizja przy wyraźnie mniejszej liczbie
rezerwacji może dać gorszy wynik łączny. Ten wskaźnik pilnuje właśnie tego.

---

## 4a. KOREKTA po zebraniu danych rzeczywistych (2026-08-30)

Linia bazowa zebrana. **Obala progi z sekcji 5**, które zostawiam nietknięte,
żeby było widać, co zakładałem przed danymi.

Dane: `reports/baseline-2026-08-30/12go-bookings.tsv` (eksport 12Go, pełne SubID,
**1 maja – 30 sierpnia 2026**). Analiza: `node scripts/analyze-12go-report.mjs <plik>`.

Kontrola kompletności: suma z pliku €120,64 (BPB) + €12,19 (spoza BPB) = **€132,83**,
zgodnie ze stopką raportu co do centa.

```
157 rezerwacji BPB, EUR 120,64, srednia EUR 0,77
  3 rezerwacje spoza BPB (ttg-, koh-chang-, jedna bez SubID)  EUR 12,19
```

### Miks produktowy potwierdza tezę z T55

| Klasa | Rezerwacji | Udział | Prowizja | Średnia | Udział przychodu |
|---|---|---|---|---|---|
| bus | 134 | 85,4% | EUR 70,92 | EUR 0,53 | 58,8% |
| charter | 6 | 3,8% | EUR 24,19 | **EUR 4,03** | **20,1%** |
| van | 14 | 8,9% | EUR 21,67 | EUR 1,55 | 18,0% |
| ferry | 3 | 1,9% | EUR 3,86 | EUR 1,29 | 3,2% |

Charter i van to **12,7% rezerwacji i 38,1% przychodu**. Autobus to 85% rezerwacji
i 59% przychodu przy średniej EUR 0,53.

### Problem: pozycje objęte T65a to 8% wolumenu

```
objete zmiana   13 rezerwacji (8,3%)   EUR  16,56   srednia EUR 1,27   charter: 0
nieobjete      144 rezerwacji          EUR 104,08   srednia EUR 0,72   charter: 6
```

Nawet gdyby każda z tych 13 osiągnęła średnią klasy charter (EUR 4,03), przychód
urósłby do EUR 156,5, czyli o 30%. Przy EUR 7 za sztukę — o 62%. Próg „+50%”
z sekcji 5 jest w zasięgu tylko w skrajnym scenariuszu, a próg wyrażony kwotowo
(EUR 60/1000) był policzony na złej bazie i nie ma zastosowania.

### Gdzie naprawdę pojawił się charter — i dlaczego to ważne

| Pozycja | Rezerwacji | Prowizja | Średnia | charter | Objęta T65a |
|---|---|---|---|---|---|
| mobilesticky | 87 | EUR 61,95 | EUR 0,71 | 2 | nie |
| guideshortanswer | 22 | EUR 16,48 | EUR 0,75 | **2** | nie |
| routehelpbusfull | 6 | EUR 10,96 | EUR 1,83 | 0 | **tak** |
| desktopsidebar | 17 | EUR 7,10 | EUR 0,42 | 0 | nie |
| guidemobilesticky | 3 | EUR 5,47 | EUR 1,82 | 0 | nie |
| homepagehero | 5 | EUR 5,34 | EUR 1,07 | **1** | nie |
| routeairporttransfer | 3 | EUR 4,08 | EUR 1,36 | 0 | **tak** |
| homepagemobilesticky | 4 | EUR 3,71 | EUR 0,93 | 1 | nie |
| routecitytransfer | 2 | EUR 1,09 | EUR 0,54 | 0 | **tak** |
| routehelpvstaxi | 1 | EUR 0,30 | EUR 0,30 | 0 | **tak** |
| routechartergap | 1 | EUR 0,13 | EUR 0,13 | 0 | **tak** |

**Żadna rezerwacja charter nie przyszła przez pozycję objętą zmianą.** Wszystkie
sześć przyszło przez CTA ogólne — i to jest spodziewane, bo tamte pozycje mają
wolumen, a objęte mają go osiem procent.

**Dwie rezerwacje charter przyszły przez `guideshortanswer`**, którą świadomie
wyłączyłem. Obie to lotnisko → transfer hotelowy: Don Mueang → Pattaya Hotel
Transfer (EUR 3,15) i Suvarnabhumi → Pattaya Hotel Transfer (EUR 1,21). Czyli
dokładnie scenariusz „przylot z bagażem”.

To **nie jest** argument, żeby dodać `guide_short_answer` do listy charter.
Treść bloku „krótka odpowiedź” różni się per przewodnik — na części z nich
odpowiedzią jest autobus i przefiltrowanie złamałoby obietnicę. Właściwym
rozwiązaniem byłoby sterowanie per przewodnik, nie per pozycja. Osobne zadanie.

### Progi — DOMKNIĘTE 2026-08-30

GA4 dla tego samego okna (1 maja – 30 sierpnia 2026): **4 200 aktywnych użytkowników**.

```
prowizja / 1000 uzytkownikow :  EUR 28,72     <- miara rozstrzygajaca
rezerwacje / 1000            :  37,4          <- miara strażnicza
srednia prowizja             :  EUR 0,77
```

| Wynik | Prowizja / 1000 | Rezerwacje / 1000 | Decyzja |
|---|---|---|---|
| **Sukces** | ≥ EUR 35,90 (+25%) | ≥ 29,9 (spadek ≤20%) | zostawić, rozważyć rozszerzenie |
| **Neutralny** | EUR 31,60 – 35,90 | ≥ 29,9 | zostawić, nie inwestować dalej |
| **Porażka** | < EUR 31,60 (+10%) | — | cofnąć parametr |
| **Szkodliwy** | — | < 26,2 (spadek >30%) | **cofnąć natychmiast** |

Dodatkowy wyzwalacz natychmiastowego cofnięcia: CTR pozycji objętych zmianą
spada o ponad 30%. Etykiety przycisków się nie zmieniają, więc taki spadek
oznaczałby usterkę, nie efekt.

Dla orientacji: sukces przy niezmienionym ruchu oznacza łączną prowizję
**≥ EUR 150,80** wobec EUR 120,64 dzisiaj.

**Zastrzeżenie do precyzji.** GA4 pokazuje „4,2 tys.”, czyli wartość zaokrągloną —
rzeczywista mieści się w 4 150–4 249, co daje niepewność około ±1,2%. Przy progach
rzędu +25% to nie ma znaczenia, ale przy odczycie „po” warto wziąć liczbę z tego
samego widoku i tak samo zaokrągloną, żeby błąd znosił się po obu stronach.

**Okno pomiaru: 8 tygodni minimum, 12 preferowane**, licząc od wdrożenia T65a.
Wskaźnik strażniczy sprawdzać co tydzień — to jedyny, który uzasadnia cofnięcie
zmiany przed końcem okna.

## 4b. WDROŻENIE — start zegara

**T65a jest na produkcji.**

```
moment wdrozenia   2026-08-30  15:17:01 UTC
                   2026-08-30  22:17:01 Asia/Bangkok
                   2026-08-30  17:17:01 Europe/Warsaw

commit             1a244c9 (main)
wdrozenie Vercel   bangkok-pattaya-nu70kbbi3, build 24 s, Ready
```

Okno „przed": 1 maja – 30 sierpnia 2026 (dane w `reports/baseline-2026-08-30/`).
Okno „po": od 31 sierpnia 2026. Rezerwacje z 30 sierpnia **odrzucić** przy odczycie,
bo dzień jest podzielony wdrożeniem.

Potwierdzone na żywej domenie bezpośrednio po wdrożeniu:

- filtr `vehclasses_tab=charter` obecny dokładnie na pozycjach objętych i na żadnej innej
  (strona trasy EN 9/9 zgodnych, przewodnik EN 4/4, strona trasy ZH 7/7)
- afiliacja przeżywa obok filtra: `z=15791301`, `sub_id=bpb-bangkok-to-pattaya-route_charter_gap`
- kafelek najbliższego odjazdu ma godzinę w HTML (`05:00` EN, `04:30` ZH) — T67
- bez regresji: jeden `<h1>`, 9 linków 12Go, 7 mierzonych linków TTG

### Odczyt 1 — 2026-09-02, +3 dni: ZDANY

Wskaźnik wiodący. Sprawdza wyłącznie, czy nic się nie zepsuło — **nie jest dowodem,
że zmiana działa.** Na to jest o wiele za wcześnie.

Źródło: GA4, zdarzenie `affiliate_click`, wymiar `CTA Position`.

```
PRZED  1 lip - 30 sie (61 dni)   223 / 1072 = 20,8%    17,6 zdarzen/dzien
PO     31 sie -  2 wrz  (3 dni)   13 /   72 = 18,1%    24,0 zdarzen/dzien

95% przedzial ufnosci dla "po":  9,2% - 26,9%
linia bazowa 20,8% miesci sie w przedziale:  TAK
prog cofniecia (ponizej 14,6%):  nie przekroczony
```

Udział pozycji objętych zmianą jest statystycznie nieodróżnialny od linii bazowej.
Przy 72 zdarzeniach przedział ufności jest szeroki i inaczej być nie może — dlatego
ten odczyt może tylko wykluczyć załamanie, a nie potwierdzić poprawę.

Per pozycja wszystkie obserwacje mieszczą się w granicach 1–2 zdarzeń od wartości
oczekiwanej przy braku zmiany, czyli w czystym szumie:

| Pozycja | przed | po | oczekiwane |
|---|---|---|---|
| route_help_bus_full | 7,3% | 4 (5,6%) | 5,2 |
| route_charter_gap | 5,0% | 2 (2,8%) | 3,6 |
| route_airport_transfer | 4,8% | 3 (4,2%) | 3,4 |
| route_city_transfer | 1,2% | 1 (1,4%) | 0,9 |
| route_help_after_last | 1,2% | 1 (1,4%) | 0,9 |
| route_help_vs_taxi | 1,2% | 2 (2,8%) | 0,9 |
| guide_transfer | 0,1% | 0 | 0,1 |

**Do odnotowania, bez wyciągania wniosków.** Częstość kliknięć wzrosła z 17,6 do
24,0 na dobę, a GA4 pokazuje zdarzenia na sesję 0,37 z adnotacją +49%. Trzy dni to
za mało, żeby to znaczyło cokolwiek, i może być zwykłą sezonowością początku września.
Odnotowane, bo kierunek jest dodatni, a nie ujemny.

**Kontrola spójności.** Suma wierszy zgadza się z sumą GA4 (72). Jedno zdarzenie ma
Sub ID `(not set)` — to ten sam pojedynczy klik Agody, bo `HotelAffiliateInline`
nie wysyła `sub_id`. Nie jest to usterka pomiaru.

---

### Odczyt 2 — 2026-09-06, +7 dni: wskaźnik strażniczy, ŻÓŁTY

Pierwszy odczyt wskaźnika strażniczego, czyli jedynego, który może uzasadnić
cofnięcie T65a przed końcem okna. **Wynik jest niejednoznaczny i zależy od
doboru okna** — zapisuję wszystkie trzy warianty, żeby nikt później nie wybrał
tego, który akurat pasuje do tezy.

Źródła: 12Go → Bookings and sales (30 sie – 6 wrz), GA4 dzień po dniu.

#### Dane surowe

```
13 rezerwacji, EUR 10,40, srednia EUR 0,80
klasa pojazdu    bus 8 (EUR 4,28)   van 5 (EUR 6,12)   charter 0
wg pozycji       mobilesticky        6   EUR 5,76
                 routehelpbusfull    3   EUR 2,25   <- grupa BADANA
                 desktopsidebar      2   EUR 1,13
                 homepageroutecard   1   EUR 0,29
                 guidemobilesticky   1   EUR 0,97
```

Zero rezerwacji klasy charter. Przy udziale 3,8% z linii bazowej oczekiwane
przy 13 rezerwacjach to pół sztuki, więc zero jest w normie.

#### Trzy warianty wskaźnika

```
A. cale okno 30.08-05.09, caly ruch
   13 / 484 uzytk. = 26,9 na 1000   przedzial 14,3-45,9   baza NA GRANICY

B. cale okno, bez ruchu z asystentow AI
   13 / 390 uzytk. = 33,3 na 1000   przedzial 17,7-57,0   baza W SRODKU

C. scisle po wdrozeniu 31.08-05.09, bez AI
    8 / 331 uzytk. = 24,2 na 1000   przedzial 12,1-38,7   baza POZA
```

Wariant C jest metodologicznie najczystszy — obejmuje wyłącznie ruch po
wdrożeniu (T65a od 30.08 15:17) — i to on wypada poniżej linii bazowej 45,9.

#### DECYZJA: nie cofać. Trzy powody

**1. Grupa badana ma się lepiej, nie gorzej.** Gdyby zmiana odstraszała
czytelników, ucierpiałaby przede wszystkim ona. Jest odwrotnie:

```
udzial rezerwacji z pozycji objetych zmiana
linia bazowa   8,3%   (13 z 157)
po wdrozeniu  25,0%   (2 z 8)
```

**2. Liczby bezwzględne stoją.** 1,88 rezerwacji dziennie w linii bazowej,
1,62 teraz. Spada wskaźnik, bo mianownik urósł o 71% (41 → 70 użytkowników
na dobę), a nie dlatego, że ludzie przestali rezerwować.

**3. Osiem rezerwacji w sześć dni** to za mało, by unieważnić pomiar
zaplanowany na 8–12 tygodni. To jest tydzień pierwszy.

#### Dlaczego ŻÓŁTY, a nie zielony

Dwie rzeczy, których nie wolno odmachnąć:

- **Wariant C wypada poniżej przedziału ufności.** To nie jest szum.
- **5 i 6 września: zero rezerwacji.** Dwie doby z rzędu. Przy tempie 1,6
  dziennie to się zdarza, ale w połączeniu ze spadkiem zaangażowania
  (41 s → 23 s) i zdarzeń na użytkownika (6,0 → 4,9) układa się w kierunek.

#### LUKA W METODZIE — do domknięcia przed następnym odczytem

Warianty B i C odejmują ruch z asystentów AI, **zakładając, że w linii
bazowej go nie było. Tego NIE sprawdzono.**

```
udzial ruchu z asystentow AI (chatgpt.com, openai, syntx.ai, doubao.com)
30.08  20,3%   02.09  14,9%   04.09   8,3%
31.08  24,6%   03.09  20,3%   05.09  20,6%
01.09  27,4%                  RAZEM  19,4%
```

Jedna piąta ruchu, stabilnie przez cały tydzień. **Jeśli w okresie bazowym
(1 lip – 24 sie) było podobnie, całe odejmowanie jest nieuprawnione** i
właściwym porównaniem jest wariant A, gdzie baza mieści się w przedziale
i nie ma o czym mówić.

**Do pobrania przed 13 września:** GA4 → Aktywni użytkownicy według
Pierwsze źródło/medium, zakres **1 lipca – 24 sierpnia**. Interesuje
wyłącznie udział `chatgpt.com` i pokrewnych.

To rozstrzygnie, czy patrzymy na realne osłabienie konwersji, czy na
artefakt zmiany składu ruchu.

#### Kontekst z tego samego dnia

Ruch na stronie **nie spadł** — 74, 67, 74, 72, 65 użytkowników 1–5 września.
Wykres w panelu 12Go sugerował załamanie, ale to był powrót do normy po
wyskoku z 30–31 sierpnia plus obcięta doba bieżąca. Strona sprawdzona
technicznie: linki afiliacyjne, `sub_id` i czasy odpowiedzi bez zarzutu.

---

### Odczyt 2 — KOREKTA z tego samego dnia: ZIELONY

Po dociągnięciu dwóch brakujących raportów GA4 **odwołuję dwie tezy z bloku wyżej.**
Zostawiam je nienaruszone, bo droga do wniosku jest częścią wartości tego dokumentu.

#### Teza odwołana nr 1: „ruch z asystentów AI to nowy kanał"

```
udzial ruchu z AI
linia bazowa (1 lip - 24 sie)   773 z 2290 = 33,8%
teraz        (30 sie -  6 wrz)   94 z  488 = 19,4%
```

Kanał istniał od początku, a jego udział **SPADŁ o 14 punktów**. Odejmowanie go
z mianownika (warianty B i C) było nieuprawnione.

#### Teza odwołana nr 2: „wariant C wypada poniżej przedziału, sygnał żółty"

Arytmetycznie prawda, ale liczona na **złym mianowniku**. Właściwy mianownik
znalazł się dopiero po rozbiciu ruchu na kraje.

#### Co pokazało rozbicie na kraje

```
kraj             baza/dobe   teraz/dobe   zmiana   zaangazowanie
United States         2,1         6,8      +215%   25%   <- Ashburn = centrum danych AWS
China                 8,0        12,6       +58%   7,5%  <- 8 sekund na stronie
Taiwan                0,8         1,5       +92%
Singapore             3,2         4,9       +52%
Thailand             15,0        17,4       +16%   45,6% <- rynek rdzeniowy
India                 1,7         1,6        -4%
RAZEM                41,8        61,0       +46%
```

Wspólczynnik zaangażowania spadł z **48,71% do 37,16%** — dokładnie tak, jak musi,
gdy rośnie ruch, który się nie angażuje. Przyrost siedzi w USA (boty z centrów
danych) i w Chinach (7,5% zaangażowania; 12Go nie jest tam obecne, więc ci ludzie
i tak nie zarezerwują).

#### Właściwy mianownik: sesje z zaangażowaniem

```
                          baza    teraz   zmiana
uzytkownicy / dobe        41,8     61,0     +46%   <- mianownik zafalszowany
sesje z zaang. / dobe     23,3     25,9     +11%   <- realny ruch
rezerwacje / dobe          1,9      1,6     -15%
```

```
WSKAZNIK na 1000 SESJI Z ZAANGAZOWANIEM
baza     105 / 1279 = 82,1
teraz     13 /  207 = 62,8
95% przedzial:  33,4 - 107,4
baza 82,1 w przedziale:  TAK, wygodnie w srodku
```

#### Trzy mianowniki, trzy odpowiedzi — dlatego to jest zapisane

```
mianownik                  wynik    baza w przedziale
uzytkownicy (surowo)       26,9     na granicy
uzytkownicy bez AI         33,3     tak, ale na blednym zalozeniu
sesje z zaangazowaniem     62,8     TAK, wygodnie          <- OBOWIAZUJACY
```

#### DECYZJA: ZIELONY. Nie cofamy.

Przy poprawnym mianowniku odchylenia nie ma. Zastrzeżenie pozostaje takie samo
jak przy każdym tygodniu pierwszym: 13 rezerwacji to szeroki przedział i dopiero
kolejne odczyty zaczną coś znaczyć.

Argument najmocniejszy jest niezależny od mianownika: **gdyby T65a szkodziła,
spadłaby bezwzględna liczba rezerwacji.** Nie spadła w sposób odróżnialny od szumu.

#### DWIE POPRAWKI METODY, obowiązujące od następnego odczytu

**1. Wskaźnik strażniczy liczymy na 1000 SESJI Z ZAANGAŻOWANIEM, baza 82,1.**
Nie na użytkowników. Stary mianownik rósł od botów i wywołałby fałszywy alarm.

**2. Odfiltrować ruch z centrów danych w GA4** (wykluczenia ruchu wewnętrznego
i botów). Ashburn i podobne zawyżają statystyki i psują każdy wskaźnik liczony
na użytkownikach.

---

### Kalendarz odczytów

```
+3 dni       2026-09-02   CTR objetych pozycji - czy nic sie nie zepsulo
co tydzien   od 2026-09-06  wskaznik strazniczy (rezerwacje/1000)
+8 tygodni   2026-10-25   pierwsza mozliwa decyzja
+12 tygodni  2026-11-22   decyzja ostateczna
```

Odczyt: `node scripts/analyze-12go-report.mjs <eksport-po> --users <GA4 za to samo okno>`.
Eksport 12Go z **pełnymi SubID** i ze **wszystkich stron** — widok przeglądarki skraca
identyfikatory, a raport jest stronicowany.

---

## 5. Reguła decyzyjna

Okno pomiaru: **8 tygodni minimum, 12 preferowane.** Nie cztery.

| Wynik | Warunek | Decyzja |
|---|---|---|
| Sukces | prowizja na 1000 sesji ≥ €60 (wzrost o 49%) **i** rezerwacje na 1000 sesji ≥ 37 (spadek o ≤19%) | zostawić, rozważyć rozszerzenie na kolejne pozycje |
| Neutralny | prowizja na 1000 sesji €44–60 | zostawić, ale nie inwestować dalej w ten kierunek |
| Porażka | prowizja na 1000 sesji < €44 (wzrost <10%) | cofnąć parametr, hipoteza T55 obalona |
| Szkodliwy | rezerwacje na 1000 sesji < 32 (spadek >30%) **lub** CTR objętych pozycji spadł >30% | **cofnąć natychmiast**, nie czekać do końca okna |

Progi są osądem, nie wyliczeniem. Ustalone tak, żeby test mógł się rozstrzygnąć przy
posiadanym wolumenie, i spisane przed zobaczeniem wyniku. Jeśli uważasz je za złe,
zmień je **teraz**, nie po.

---

## 6. Czego ten pomiar nie rozstrzygnie

**Sezonowość.** Okno bazowe to lipiec–sierpień, okno pomiaru wypadnie na wrzesień–listopad.
W Tajlandii to inna faza sezonu: inny miks podróżnych, inna gotowość do zapłaty za transfer.
Wskaźniki na 1000 sesji normalizują wolumen ruchu, ale **nie normalizują zmiany profilu
podróżnego**. To jest nieusuwalne ograniczenie tego testu i wynik trzeba czytać z tym
zastrzeżeniem. Jedyny sposób obejścia — równoległy podział ruchu — wymagałby infrastruktury
A/B, której ten serwis nie ma i której nie warto budować przy 42 odwiedzających dziennie.

**Atrybucja wielokrotnych wizyt.** 895 wizyt w 12Go na 641 kliknięć oznacza, że część
podróżnych wraca. Ciasteczko `sub_id` na `.12go.asia` przetrwa, ale przy dwóch różnych
kliknięciach z dwóch różnych pozycji ostatnie nadpisze pierwsze. Przy zmianie obejmującej
część pozycji będzie to zaszumiać podział przed/po.

**Wpływ Tomorrowland.** Festiwal 11–13 grudnia 2026 wypada tuż za oknem pomiaru, ale ruch
przygotowawczy może zacząć się w listopadzie i podbić właśnie segment transferowy.
Jeśli okno sięgnie listopada, odnotować to przy interpretacji.

---

## 7. Skąd wziąć dane

**GA4** → Zdarzenia → `affiliate_click` → wymiar `cta_position`.
Segmentacja po `lang`, `route_id` i urządzeniu dostępna w tym samym zdarzeniu.
Zdarzenie `affiliate_click_srv` ma stały `client_id`, więc służy do liczenia zdarzeń,
nie użytkowników — to celowe, opisane w `api/click/route.ts`.

**12Go** → Bookings → kolumna SubID + nazwa produktu + prowizja.

**Nowe od T61:** zdarzenie `cross_site_click` mierzy wyjścia przez blok Thailand Transfer
Guide. Przy interpretacji warto sprawdzić, czy nie rośnie równolegle — to sesje, które
wychodzą przed kliknięciem w 12Go i obniżają wszystkie powyższe wskaźniki niezależnie
od zmiany transferowej.

---

## 8. Kalendarz

```
2026-08-30   spisanie kryterium (ten dokument)
             zebranie linii bazowej per cta_position i per sub_id   <- DO ZROBIENIA
             wdrozenie T65a
+3 dni       kontrola wskaznika wiodacego (CTR) - czy nic sie nie zepsulo
+2 tygodnie  pierwsze spojrzenie na miks produktowy, bez wyciagania wnioskow
+8 tygodni   pierwsza mozliwa decyzja
+12 tygodni  decyzja ostateczna
```

Wskaźnik strażniczy sprawdzać co tydzień. To jedyny, który może uzasadnić cofnięcie
zmiany przed końcem okna.
