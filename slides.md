---
theme: default
layout: default
title: OpenWAF — obrona aplikacji i analiza AI
info: |
  10 slajdów po polsku opartych na lokalnym kodzie OpenWAF.
author: OpenWAF
lang: pl
colorSchema: dark
aspectRatio: 16/9
canvasWidth: 1200
transition: fade
drawings:
  persist: false
duration: 15min
fonts:
  sans: Figtree
  mono: Consolas
  provider: none
---

<div class="eyebrow brand"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3 20 6v6c0 5-4 8-8 10-4-2-8-5-8-10V6Z" stroke="currentColor" stroke-width="1.8"/><path d="m8 12 3 3 5-6" stroke="currentColor" stroke-width="1.8"/></svg>OpenWAF</div>
<div class="hero"><h1>Ochrona aplikacji.<br><span>Analiza z AI.</span></h1><div class="pills"><span>Reverse proxy</span><span>Coraza + OWASP CRS</span><span>Asystent AI</span></div></div>
<ScreenshotSlot class="hero-metrics" src="/screenshots/dashboard.png" title="Statystyki ochrony OpenWAF — dane demo" :crop="[0.18, 0.14, 0.8, 0.21]" />
<div class="caption">Rzeczywisty panel · dane demonstracyjne</div>

<!--
Prezentacja opisuje kod z C:\Users\Anonym\Desktop\OpenWAF. Projekt łączy reverse proxy w Go, silnik Coraza z OWASP CRS, panel Nuxt i analizę AI. Reguły podejmują decyzję dla żądania, a AI bada telemetrię poza tą ścieżką.
Źródła: main.go; internal/proxy/proxy.go; internal/rules/engine.go; internal/assistant/service.go.
-->

---

<div class="eyebrow">Przepływ żądania</div>

# Gdzie działa ochrona?

<div class="flow request-flow"><div class="node">Klient HTTP</div><span class="connector">→</span><div class="node">Reverse proxy</div><span class="connector">→</span><div class="node accent">OpenWAF</div><span class="connector">→</span><div class="node">Aplikacja</div></div>
<div class="decision-row"><span class="status blocked">Podejrzane żądanie → blokada</span><span class="status allowed">Zapis ruchu → analiza AI</span></div>
<div class="one-line">Reguły chronią na wejściu. AI analizuje zapisane zdarzenia.</div>

<!--
Diagram rozdziela role logiczne: odbiór przez reverse proxy, kontrola reguł i przekazanie do aplikacji. Reverse proxy jest częścią implementacji OpenWAF, a nie wymaganym dodatkowym serwerem. Inspekcja odbywa się w ServeHTTP przed proxy.ServeHTTP. Po kontroli ten sam moduł proxy przekazuje żądanie do upstreamu. Nie zmieniono faktycznej architektury projektu. AI analizuje zapisaną telemetrię poza ścieżką obsługi.
Źródła: main.go; internal/proxy/proxy.go: ServeHTTP.
-->

---

<div class="eyebrow">Mechanizmy obrony</div>

# Trzy warstwy kontroli

<div class="cards three"><div class="card"><span class="card-index">01</span><h3>Limity</h3><p>Limit na IP i usługę.<br>Kontrola rozmiaru body.</p></div><div class="card"><span class="card-index">02</span><h3>Reguły własne</h3><p>IP, ścieżki, parametry, nagłówki.<br>Wyjątki dla wybranych reguł.</p></div><div class="card"><span class="card-index">03</span><h3>Coraza + CRS</h3><p>SQL injection, XSS, wykonanie kodu.<br>CRS 4.25 + konfiguracja bazowa.</p></div></div>
<div class="pills protection-options"><span>Blokowanie / wykrywanie / wyłączona ochrona</span><span>Poziom kontroli i próg blokady</span><span>Polityka globalna lub per usługa</span></div>
<ScreenshotSlot class="defence-metrics" src="/screenshots/dashboard.png" title="Blokady i statystyki ochrony — dane demo" :crop="[0.18, 0.14, 0.8, 0.21]" />

<!--
Rate limiter działa lokalnie w pamięci procesu, osobno dla pary usługa/IP. Reguła własna pasuje, gdy spełnione są wszystkie jej warunki. Blokada własna lub limitu ruchu może zakończyć inspekcję przed CRS. Limit body sprawdzany jest podczas transakcji Coraza, nie jako odrębny pierwszy etap. exposure.conf wykrywa .env, wybrane ścieżki .git oraz /util/php/eval-stdin.php związany z CVE-2017-9841. Te reguły nie gwarantują ochrony przed wszystkimi wariantami ataków. Inspekcja body odpowiedzi jest wyłączona. Aktualizacja ładuje także bazowy crs-setup.conf.example przed polityką i regułami CRS. Domyślna polityka: blocking, poziom blokowania 1, wykrywania 2, próg oceny 5, body 13 MiB, limit 600/min z akcją logowania. Katalog otrzymał czytelne opisy reguł wbudowanych. Wyłączenia ID oraz polityki usług pozwalają ograniczać fałszywe alarmy po weryfikacji operatora.
Źródła: internal/rules/inspect.go: Inspect i matches; internal/rules/engine.go: compile; internal/rules/filters/exposure.conf.
-->

---

<div class="eyebrow">Nowość · geolokalizacja ruchu</div>

# Skąd przychodzą żądania?

<ScreenshotSlot class="geo-screen" src="/screenshots/geo.png" title="Mapa krajów i udział ruchu — aktualny panel, dane demonstracyjne" />
<div class="pills geo-options"><span>Cały ruch lub blokady</span><span>24 h / 7 dni / 30 dni</span><span>Ranking krajów i udział procentowy</span></div>

<!--
Nowy DashboardGeoMap korzysta z /api/stats/countries. Lokalna baza DB-IP przypisuje kraj przy zapisie żądania; zapytanie mapy agreguje zapisane kody. Ranking pokazuje osiem pierwszych grup oraz liczbę pozostałych. Brak lokalizacji jest osobną kategorią i nie trafia na mapę. Kraj jest wskazówką analityczną, nie dowodem tożsamości ani intencji nadawcy. Widok blokad pomaga porównać źródła ruchu z odrzuconymi żądaniami. API pozwala też filtrować usługę. Dane na zrzucie pochodzą z izolowanej bazy demonstracyjnej.
Źródła: frontend/app/components/dashboard/DashboardGeoMap.vue; frontend/app/utils/geoMap.ts; docs/country-stats-api.md; internal/geoip.
-->

---

<div class="eyebrow">Panel OpenWAF · dane demonstracyjne</div>

# Ruch i blokady na jednym ekranie

<ScreenshotSlot class="full-screen" src="/screenshots/dashboard-update.png" title="Aktualny panel OpenWAF — rzeczywisty zrzut na danych demo" />

<!--
Zrzut rzeczywistego panelu po aktualizacji, przewiniętego do metryk i wykresów pod nową mapą. Osobna baza zawiera 6000 żądań z cmd/seed oraz 35 nowych syntetycznych blokad dla detektora. Zakres 30 dni może wykluczać najstarsze żądania generatora. Obraz: public/screenshots/dashboard-update.png. Interfejs i statystyki pochodzą z działającej aplikacji; dane są demonstracyjne.
Źródła funkcji: internal/telemetry/service.go; frontend.
-->

---

<div class="eyebrow">Wykrywanie anomalii</div>

# Anomalia → dochodzenie → analiza AI

<div class="anomaly-layout"><div class="signal-list"><div><span class="dot red"></span>Seria blokad <small>≥ 10 / 5 min</small></div><div><span class="dot amber"></span>Dopasowania reguł <small>≥ 10 / 5 min</small></div><div><span class="dot amber"></span>Skanowanie <small>≥ 30 żądań, 20 ścieżek</small></div><div><span class="dot violet"></span>Błędy upstreamu <small>≥ 20 i ≥ 50%</small></div><div><span class="dot sky"></span>Skok ruchu <small>≥ 100/min i 4× średnia</small></div><p>Progi globalne lub dla usługi.</p></div><ScreenshotSlot src="/screenshots/dashboard.png" title="Wykres ruchu w panelu OpenWAF — dane demo" :crop="[0.18, 0.365, 0.535, 0.54]" /></div>

<!--
Progi konfiguruje się globalnie i dla usług. Agregacja używa minutowych koszyków oraz trwałego kursora; ocena dotyczy zakończonych koszyków. Pierwsze uruchomienie zaczyna od najnowszego logu. Skok ruchu wymaga około 31 minut ciągłego zbierania na rozgrzanie średniej. Skanowanie wymaga trzech podejrzanych żądań lub trzech odpowiedzi 400/404/405. Błędy upstreamu to kategorie błędów proxy, nie wszystkie odpowiedzi 5xx. Powiązana aktywność jest korelowana według rodziny detektora, usługi i IP. Podwojenie pomiaru może ominąć cooldown po minucie. Anomalia nie dowodzi ataku. Wykonanie AI wymaga konfiguracji modelu i wolnego budżetu uruchomień.
Źródła: docs/investigations-api.md: Detection and limits; internal/investigation/detector.go.
-->

---

<div class="eyebrow">Jak działa AI</div>

# AI sprawdza dane i wyjaśnia zdarzenia

<div class="ai-layout"><div><div class="analysis-step"><span>01</span><strong>Pytanie lub wykryta anomalia</strong></div><div class="analysis-step"><span>02</span><strong>Narzędzia: ruch, reguły, logi</strong></div><div class="analysis-step"><span>03</span><strong>Ocena, dowody i zalecenia</strong></div><div class="pills"><span>Rozmowa z asystentem</span><span>Automatyczna analiza</span></div><div class="one-line">AI odczytuje dane. Nie zmienia reguł ani nie blokuje ruchu.</div></div><ScreenshotSlot class="report-focus" src="/screenshots/assistant.png" title="Rzeczywista odpowiedź AI z oceną i dowodem — dane demo" :crop="[0.767, 0.245, 0.225, 0.525]" /></div>

<!--
Naturalne polskie nazewnictwo zastępuje dosłowne tłumaczenia i nazwy funkcji na slajdzie. Narzędzia w kodzie to m.in. get_request_stats, get_traffic, get_threats, search_requests i get_request. Raport automatyczny składany jest przez submit_finding. Orkiestrację realizuje Eino ADK. Model używa API z tool calling, domyślnie OpenRouter. AI_KEY i AI_MODEL włączają asystenta. Nie jest to własny klasyfikator ML decydujący o blokadzie. Odpowiedź przesyłana jest przez SSE. Raport rozróżnia aktywność prawdopodobnie złośliwą, prawdopodobnie nieszkodliwą i wynik nierozstrzygnięty. Automatyczna analiza: jeden worker, kolejka do 100 aktywnych wykonań, domyślnie 20 przyjęć/uruchomień na godzinę, maksymalnie dwie próby; pojedyncza próba do 3 minut, 8 iteracji modelu i 24 wywołań narzędzi. Są to limity wykonania, nie budżet pieniężny. Weryfikacja cytowanych żądań sprawdza referencje, nie gwarantuje poprawności interpretacji AI.
Źródła: internal/assistant/service.go; internal/assistant/tools.go; internal/assistant/investigation.go; docs/assistant-api.md.
-->

---

<div class="eyebrow">Nowość · sekcja dochodzeń</div>

# Wszystkie analizy w jednym miejscu

<ScreenshotSlot class="full-screen investigations-screen" src="/screenshots/investigations.png" title="Lista dochodzeń w aktualnym panelu — dane demonstracyjne" />
<div class="pills under-screen"><span>Filtry: usługa, status, waga i ocena</span><span>Aktualizacje na żywo</span><span>Nieprzeczytane wyniki</span></div>

<!--
Nowa strona /dash/investigations pokazuje powód wykrycia, stan wykonania i wynik w jednym zasobie. Zestawienie zawiera liczniki wszystkich, nieprzeczytanych, aktywnych i poważnych spraw. Filtry obejmują usługę, stan obsługi, status analizy, wagę, ocenę, czas i nieprzeczytane. SSE aktualizuje listę i licznik w nawigacji. Stan obsługi jest wspólny, a przeczytanie jest indywidualne dla operatora. Nowa wersja wyniku ponownie oznacza sprawę jako nieprzeczytaną. Detektor utworzył widoczne sprawy na nowych syntetycznych logach; nie są one raportami wygenerowanymi przez AI.
Źródła: frontend/app/pages/dash/investigations.vue; frontend/app/composables/useInvestigationFeed.ts; docs/investigations-api.md.
-->

---

<div class="eyebrow">Nowość · obsługa zdarzenia</div>

# Od sygnału do decyzji operatora

<div class="detail-layout"><div class="detail-points"><div><strong>Powód wykrycia</strong><p>Pomiar, próg i okno czasowe.</p></div><div><strong>Wynik i dowody</strong><p>Ocena, konkretne żądania, zalecenia.</p></div><div><strong>Obsługa sprawy</strong><p>Potwierdź, rozwiąż lub odrzuć.</p></div><div><strong>Dalsza analiza</strong><p>Ponów, anuluj lub dopytaj asystenta.</p></div></div><div><ScreenshotSlot src="/screenshots/investigation-detail.png" title="Powód wykrycia, obserwacja i próg — dane demonstracyjne" :crop="[0, 0.15, 1, 0.41]" /><ScreenshotSlot class="detail-actions" src="/screenshots/investigation-detail.png" title="Działania operatora w szczegółach dochodzenia" :crop="[0, 0.935, 1, 0.065]" /></div></div>

<!--
Szczegóły dochodzenia łączą trigger, postęp, ostatni opublikowany raport i rozmowę uzupełniającą. Raport zawiera wagę, ocenę likely_malicious / likely_benign / inconclusive, wyjaśnienie, wzorce, rekomendacje, ograniczenia oraz dowody. Backend sprawdza, czy cytowane ID żądań wystąpiły w wynikach narzędzi i nadal istnieją przy publikacji. Zapisane migawki dowodów zostają po usunięciu zwykłych logów przez retencję. Brak dowodów wymusza ocenę nierozstrzygniętą i jawne ograniczenia. Ponowienie zachowuje ID sprawy i poprzedni raport; anulowanie nie kasuje opublikowanego wyniku. Rozmowa uzupełniająca jest osobna dla każdego operatora. Zrzut pokazuje wykrycie bez raportu AI; możliwości raportowania wyjaśnia slajd i notatki.
Źródła: frontend/app/components/dashboard/DashboardInvestigationDetail.vue; DashboardInvestigationFollowUp.vue; docs/investigations-api.md.
-->

---

<div class="eyebrow">OpenWAF</div>

# Chroń. Obserwuj. Wyjaśniaj.

<div class="closing-layout"><div><div class="closing-word"><span>01</span>Reguły WAF</div><div class="closing-word"><span>02</span>Mapa i dochodzenia</div><div class="closing-word"><span>03</span>Asystent AI</div><div class="one-line">Proste wdrożenie · polityki usług · dowody w jednym panelu.</div></div><ScreenshotSlot src="/screenshots/dashboard.png" title="Podział zagrożeń w panelu OpenWAF — dane demo" :crop="[0.723, 0.365, 0.26, 0.55]" /></div>

<!--
Ochrona deterministyczna działa podczas obsługi ruchu, detektory wskazują nietypową aktywność, a model interpretuje dowody. AI nie zastępuje decyzji operatora. Kod wyłącza SecResponseBodyAccess i nie uruchamia faz inspekcji odpowiedzi Coraza. Limiter w pamięci nie zapewnia wspólnego limitu wielu instancji. Dochodzenia zależą od telemetrii, retencji, kompletności zbierania i konfiguracji AI. Nie należy obiecywać ochrony przed wolumetrycznym DDoS na podstawie limitera HTTP. Bez AI_KEY asystent jest wyłączony, ale reguły działają. Przebieg pracy operatora jest syntezą funkcji projektu.
Źródła: internal/rules/engine.go; internal/rules/inspect.go; internal/assistant/service.go; docs/assistant-api.md; docs/investigations-api.md; README.md.
-->
