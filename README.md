# VibeEduDei – Nauka Vibe Codingu z AI

Interaktywna platforma do nauki **vibe codingu**, **prompt engineeringu**, **grafiki AI & multimedia**, **e-marketingu** oraz **zarządzania** (PM, PO, Scrum Master, certyfikacje) z kołem 48 tematów, ćwiczeniami wideo z YouTube i systemem powtórek.

Live: [https://vibedudei.pages.dev](https://vibedudei.pages.dev)

## Funkcjonalności

- **Koło 48 Tematów (Wheel of Topics)**: 4 główne domeny wiedzy (Programowanie, Grafika i Multimedia, E-Marketing, Management & Certyfikacje).
- **Interaktywny Odtwarzacz Ćwiczeń**: fiszki, shadowing, dictation, listening, quizy i testy wiedzy zintegrowane z materiałami YouTube.
- **Wymowa i Audio (Web Speech API)**: odsłuch zdań i słówek po angielsku oraz sprawdzanie dykcji / wymowy.
- **Śledzenie postępów i Streak**: zapis stanu w LocalStorage, statystyki nauki, poziomy biegłości.
- **Wdrożenie na Cloudflare Pages**: szybkie serwowanie globalne przez sieć Cloudflare CDN.

## Uruchomienie lokalne

1. Zainstaluj zależności:
   ```bash
   npm install
   ```

2. Uruchom serwer developerski:
   ```bash
   npm run dev
   ```

3. Zbuduj wersję produkcyjną:
   ```bash
   npm run build
   ```

4. Podgląd wersji produkcyjnej:
   ```bash
   npm run preview
   ```

## Wdrożenie

Projekt wdrażany jest automatycznie na **Cloudflare Pages** przy każdym pushu do gałęzi `main` za pośrednictwem GitHub Actions, a także może być wdrożony bezpośrednio z CLI:

```bash
npm run deploy
```
