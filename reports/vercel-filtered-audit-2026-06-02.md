# Vercel Filtered Audit - 2026-06-02

Scope: Vercel CSV reports from May 3, 7pm to Jun 2, 7:59pm, plus visitors/searches from Apr 20 to May 20.

Filters requested:
- Exclude chatbot referrers: chatgpt.com, copilot.microsoft.com, gemini.google.com, claude.ai, doubao.com.
- Exclude visitors from Poland in the country dimension: PL.

Important limitation:
- The supplied CSV files are aggregated by dimension. They do not allow a true cross-filter such as "top pages for non-Polish, non-chatbot users only". Therefore, country and referrer filters were applied to their own dimensions, while pages/devices/OS remain global Vercel aggregates.

## Filtered Country Signal

- Total country visitors: 903.
- Poland visitors excluded: 76, 8.4%.
- Non-Poland visitors: 827.

Top non-Poland countries by visitors:

1. TH: 381 visitors, 46.1% of non-PL.
2. US: 130 visitors, 15.7% of non-PL.
3. CN: 31 visitors, 3.7% of non-PL.
4. IN: 25 visitors, 3.0% of non-PL.
5. SG: 23 visitors, 2.8% of non-PL.
6. HK: 21 visitors, 2.5% of non-PL.
7. VN: 20 visitors, 2.4% of non-PL.
8. TW: 20 visitors, 2.4% of non-PL.
9. JP: 20 visitors, 2.4% of non-PL.
10. PH: 17 visitors, 2.1% of non-PL.

Product implication:
- Prioritize travelers already in Thailand, English pages, Thai pages, and mobile route clarity.

## Filtered Referrer Signal

- Total referrer visitors: 180.
- Chatbot referrer visitors excluded: 101, 56.1%.
- Non-chatbot referrer visitors: 79.
- Search engine referrer visitors: 64.
- Search engines represent 81.0% of non-chatbot referrer visitors.

Search referrers:

1. google.com: 45 visitors, 70.3% of search referrers.
2. duckduckgo.com: 7 visitors, 10.9%.
3. bing.com: 5 visitors, 7.8%.
4. search.yahoo.com: 3 visitors, 4.7%.
5. search.yahoo.co.jp: 2 visitors, 3.1%.
6. google.com.hk: 1 visitor, 1.6%.
7. com.google.android.googlequicksearchbox: 1 visitor, 1.6%.

Product implication:
- Optimize first screens for search intent: route name, next bus, price, source freshness, station clarity, and route alternatives.
- Do not prioritize chatbot-specific referral behavior in UX decisions.

## Device And OS Signal

Devices:

- mobile: 659 visitors, 73.2%.
- desktop: 236 visitors, 26.2%.
- tablet: 5 visitors, 0.6%.

Operating systems:

- iOS: 442 visitors, 49.1%.
- Android: 222 visitors, 24.6%.
- Windows: 140 visitors, 15.5%.
- GNU/Linux: 55 visitors, 6.1%.
- Mac: 38 visitors, 4.2%.

Product implication:
- Mobile and iOS/Android ergonomics are the primary quality bar.
- Desktop remains important but secondary.

## Page Signal

Top global Vercel pages by visitors:

1. /en/bangkok-to-pattaya: 216.
2. /: 185.
3. /en/suvarnabhumi-airport-to-pattaya: 149.
4. /en/pattaya-to-bangkok: 132.
5. /en/pattaya-to-suvarnabhumi-airport: 93.
6. /en/don-mueang-airport-to-pattaya: 61.
7. /en: 55.
8. /th/bangkok-to-pattaya: 51.
9. /en/pattaya-to-don-mueang-airport: 48.
10. /th/pattaya-to-bangkok: 31.

Product implication:
- The current implementation should prioritize the English Bangkok-Pattaya route, homepage, Suvarnabhumi route, return route, and Thai route pages.
- Polish route pages should not drive prioritization from this Vercel analysis because Poland was explicitly excluded in the country filter.

## Visitors And Searches

Period: Apr 20 to May 20 CSV, 14 rows present.

- Unique visitors: 78.
- Searches: 200.
- Bookings: 6.
- Paid: 7.
- Seats: 10.
- Revenue: 180.19.

Product implication:
- Search/route selection is materially used. Keeping the route finder prominent and accessible is justified.
