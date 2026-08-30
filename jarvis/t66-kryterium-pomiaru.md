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
