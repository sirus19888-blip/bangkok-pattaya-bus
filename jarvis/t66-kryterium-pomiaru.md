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
