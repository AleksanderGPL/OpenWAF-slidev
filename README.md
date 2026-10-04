# OpenWAF — obrona aplikacji i analiza AI

Prezentacja po polsku: 10 slajdów, około 15 minut. Oparta na kodzie z `C:\Users\Anonym\Desktop\OpenWAF`. Gotowy plik: [OpenWAF-prezentacja.pdf](./OpenWAF-prezentacja.pdf). Notatki prelegenta w `slides.md` zawierają objaśnienia, ograniczenia i ścieżki do źródeł.

## Uruchomienie

```sh
bun install
bun run dev
```

Prezentacja: http://localhost:3030. Strzałki zmieniają slajdy; tryb prelegenta pokazuje notatki.

## Budowanie i eksport

```sh
bun run build
bun run export --output OpenWAF-prezentacja.pdf
```

Eksport PDF wymaga Playwright i przeglądarki Chromium. Zbudowana wersja HTML znajduje się w `dist/`.

Na Windows z zainstalowanym Edge można odtworzyć eksport bez pobierania Chromium (bezwzględna ścieżka wyjściowa omija błąd Bun dotyczący `mkdir('.')`):

```powershell
bun --bun node_modules/@slidev/cli/bin/slidev.mjs export --output "C:\Users\Anonym\Desktop\OpenWAF-slidev\OpenWAF-prezentacja.pdf" --executable-path "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
```

## Zakres

Przepływ żądania przez reverse proxy, Coraza i OWASP CRS, polityki usług, mapa krajów, progi detektorów anomalii, narzędzia AI oraz nowa sekcja dochodzeń. Treść uwzględnia aktualizację aplikacji z 4 października 2026 (commit `a5ec6e7`). Źródła kodu i dodatkowe szczegóły są dostępne w notatkach prelegenta, bez ścieżek w stopkach slajdów.

Dziewięć slajdów zawiera rzeczywiste zrzuty panelu, mapy, dochodzeń i rozmowy z AI lub powiększone fragmenty tych zrzutów. Dane pochodzą z osobnej bazy demonstracyjnej. Szczegóły: [public/screenshots/README.md](./public/screenshots/README.md).

Stylistyka odpowiada projektowi: paleta sky/zinc, font Figtree i proste elementy panelu. Fonty są zapisane lokalnie w `public/fonts/`; prezentacja nie pobiera ich z sieci. Kontenery zrzutów mają przezroczyste tło, bez kart, ramek i pasków tytułowych. Powiększenia powstają przez kadrowanie w CSS, a oryginalne obrazy pozostają zachowane.
