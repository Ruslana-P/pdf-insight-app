# AI_LOG — PDF Insight (Vibe Coder)

Opis użycia narzędzi AI przy budowie projektu. Kod reviewowałam i rozumiem główne ścieżki: upload → ekstrakcja pdf.js → `POST /analyze` → Zod → UI.

## Narzędzia

| Narzędzie | Do czego |
| --- | --- |
| **Cursor** (Agent / Chat) | Refaktoryzacja UI, integracja Gemini, testy, deploy Pages + Worker, README |
| **Gemini API** | Analiza tekstu PDF (tylko backend, klucz w sekrecie Workera) |

Modele po stronie Cursora: domyślny agent w IDE; nie commitujemy kluczy ani logów z API.

## Kluczowe prompty (3–5)

1. **Integracja backendu** — „Replace mock `/analyze` with Gemini, validate JSON with Zod, Polish error messages, sanitize amounts/dates that look like file limits or schema examples.”  
   → Powstały: `analyzeWithGemini.ts`, `buildGeminiPrompt.ts`, `insightSchema`, retry walidacji.

2. **Frontend wyników** — „Show insight per brief schema: summary, key points, entities, amounts, dates, keywords; download JSON; Polish copy.”  
   → `InsightResults`, `downloadInsightJson`, stałe w `uiText.ts`.

3. **Historia (F-09)** — „Store last analyses in localStorage, max entries, load on mount, empty state.”  
   → `analysisHistoryStorage.ts`, `useAnalysisHistory`, sekcja Historia analiz.

4. **UI / responsywność** — „Refresh layout (theme, upload, accordions on mobile for result sections, Tekst \| JSON toggle).”  
   → styled-components, `ResponsiveResultsSection`, przełącznik podglądu JSON.

5. **Deploy** — „GitHub Actions: build frontend with `VITE_API_URL`, deploy to Pages; document Cloudflare Worker deploy.”  
   → `.github/workflows/deploy-pages.yml`, sekcja Deploy w README.

## Gdzie AI się pomyliło i jak poprawiłam

| Problem | Poprawka |
| --- | --- |
| Model wpisywał do `amounts` limity typu „10 MB” z treści wymagań | Reguły w prompcie + `sanitizeExtractedInsight.ts` + testy |
| Free tier Gemini — 404/429 na wybranym modelu | Łańcuch modeli w `resolveModelChain.ts`, przełączenie przy błędzie HTTP |
| Prettier/ESLint blokowały commit | Uruchomienie formatowania na plikach wyników; hook pre-commit |
| GitHub Pages deploy 404 | W Settings → Pages ustawione **GitHub Actions** jako source, ponowny run workflow |
| Ryzyko klucza w repo | Tylko `.env.example` / `.dev.vars` (gitignore), secret w Cloudflare |

## Co robię sama (bez zlewania na AI)

- Weryfikacja demo: `/health` Workera, build z `VITE_API_URL`, upload PDF na Pages.
- Decyzja: tekst PDF w przeglądarce, do API tylko string + `fileName` + `pages`.
- Ten plik i README — doprecyzowanie architektury i ograniczeń pod brief.

## Uwaga dla oceniającego

Jeśli pytacie o fragment kodu, wskażcie plik — przejdę ścieżkę (np. walidacja Zod, CORS, ekstrakcja pdf.js). Klucz API **nie** jest w repozytorium ani we frontendzie.
