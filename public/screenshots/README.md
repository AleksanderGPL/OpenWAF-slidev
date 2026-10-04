# Zrzuty ekranu do prezentacji

- `dashboard.png` — wcześniejsze ujęcie metryk, ruchu i zagrożeń; kadry na kilku slajdach.
- `assistant.png` — rzeczywista rozmowa z AI, slajd 7.
- `dashboard-update.png` — panel po aktualizacji z 4 października 2026, slajd 5.
- `geo.png` — nowa mapa ruchu i ranking krajów, slajd 4.
- `investigations.png` — nowa lista dochodzeń, slajd 8.
- `investigation-detail.png` — szczegóły wykrycia, slajd 9.

Obrazy przedstawiają rzeczywisty interfejs OpenWAF po polsku, uruchomiony lokalnie na osobnej bazie z 6000 żądań demonstracyjnych wygenerowanych przez `cmd/seed`. Rozmowa zawiera rzeczywistą odpowiedź skonfigurowanego modelu na pytanie o te dane. Nie są to dane ani statystyki produkcyjne.

Starsze obrazy `dashboard.png` i `assistant.png` mają komunikaty załadowane z pliku tłumaczeń projektu, ponieważ wcześniejszy wygenerowany frontend wyświetlał klucze tłumaczeń. Nowe zrzuty korzystają ze świeżo zbudowanego frontendu z aktualizacji `a5ec6e7`; tłumaczenia są częścią kompilacji. Nie zmieniono kodu ani bazy oryginalnej aplikacji. Ujęcie rozmowy przewinięto do końcowego wyniku.

Nowe dochodzenia utworzył rzeczywisty detektor na 35 dodatkowych syntetycznych wpisach blokad w izolowanej bazie. AI było wyłączone podczas tej sesji: lista i szczegóły pokazują wykrycie oraz oczekującą analizę, bez wymyślonych ocen modelu. Nie wykonano dodatkowego płatnego wywołania AI.

Możesz zastąpić PNG nowszymi zrzutami pod tymi samymi nazwami, a następnie ponownie zbudować prezentację i wyeksportować PDF.
