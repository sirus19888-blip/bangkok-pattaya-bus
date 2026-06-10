# AGENTS.md — Bangkok Pattaya Bus (BPB)

## Stack
Sprawdź package.json przed pracą — tu jest źródło prawdy o stacku.

## Zasady dla agentów AI

### Zawsze
- Czytaj `jarvis/current-task.md` — tam jest aktualne zadanie od Jarvisa
- Pracujesz na izolowanym branchu w worktree — nie wykonuj `git push`
- Po zmianach uruchom: `npx tsc --noEmit` i `npm run build`
- Jeśli testy istnieją: `npx vitest run`

### Nigdy
- Nie dodawaj nowych zależności bez uzasadnienia w zadaniu
- Nie zmieniaj konfiguracji buildu
- Nie hardkoduj danych (ceny, trasy, godziny)
- Nie commituj zmian — Jarvis zarządza gitem

### Design
- Design NIE jest zablokowany dla tego projektu
- Zmiany wizualne są dozwolone jeśli zadanie tego wymaga

## Weryfikacja zmian
Po każdej sesji podaj:
1. Listę zmienionych plików
2. Co dokładnie zmieniono i dlaczego
3. Wynik `npx tsc --noEmit`
4. Wynik `npm run build`
