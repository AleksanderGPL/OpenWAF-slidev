# Zrzuty ekranu do prezentacji

- `dashboard.png` — aktualne ujęcie metryk, ruchu i zagrożeń; kopia `dashboard-update.png`.
- `assistant.png` — ponownie wykonany zrzut zapisanej rzeczywistej rozmowy z AI.
- `assistant-report.png` — odpowiedź asystenta, slajd 7.
- `metrics.png` — metryki, slajdy 1 i 3.
- `traffic.png` — wykres ruchu, slajd 6.
- `threats.png` — podział zagrożeń, slajd 10.
- `dashboard-update.png` — panel po aktualizacji z 4 października 2026, slajd 5.
- `geo.png` — nowa mapa ruchu i ranking krajów, slajd 4.
- `investigations.png` — nowa lista dochodzeń, slajd 8.
- `investigation-detail.png` — szczegóły wykrycia, slajd 9.

Obrazy przedstawiają rzeczywisty interfejs OpenWAF po polsku, uruchomiony lokalnie na osobnej bazie z 6000 żądań demonstracyjnych wygenerowanych przez `cmd/seed`. Rozmowa zawiera rzeczywistą odpowiedź skonfigurowanego modelu na pytanie o te dane. Nie są to dane ani statystyki produkcyjne.

Wszystkie zrzuty wykonano ponownie 4 października 2026 na frontendzie aktualizacji `a5ec6e7`; tłumaczenia są częścią kompilacji. Nie zmieniono kodu ani bazy oryginalnej aplikacji. Ujęcie rozmowy przewinięto do końcowego wyniku. Odpowiedź AI pochodzi z wcześniej zapisanej rozmowy i odnosi się do danych z chwili jej wykonania, dlatego jej liczby mogą różnić się od aktualnych metryk demo. Metadane sesji: `capture.json`.

Nowe dochodzenia utworzył rzeczywisty detektor na 35 dodatkowych syntetycznych wpisach blokad w izolowanej bazie. AI było wyłączone podczas tej sesji: lista i szczegóły pokazują wykrycie oraz oczekującą analizę, bez wymyślonych ocen modelu. Nie wykonano dodatkowego płatnego wywołania AI.

Możesz zastąpić PNG nowszymi zrzutami pod tymi samymi nazwami, a następnie ponownie zbudować prezentację i wyeksportować PDF.
