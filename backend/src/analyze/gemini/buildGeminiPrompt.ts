import type { AnalyzeRequestBody } from '../types';

const OUTPUT_SCHEMA_DESCRIPTION = `{
  "document": {
    "fileName": "string",
    "pages": number,
    "language": "string (ISO 639-1, np. pl, en)",
    "type": "faktura | umowa | oferta | raport | inne",
    "title": "string | null",
    "date": "string | null (YYYY-MM-DD gdy możliwe)"
  },
  "summary": "string (3–5 zdań w języku dokumentu)",
  "keyPoints": ["string (3–7 konkretnych punktów)"],
  "entities": {
    "organizations": ["string"],
    "people": ["string"]
  },
  "amounts": [{ "value": number, "currency": "string (ISO 4217, np. PLN, EUR)", "context": "string" }],
  "dates": [{ "date": "string (ISO 8601, np. YYYY-MM-DD)", "context": "string" }],
  "keywords": ["string (5–10 słów kluczowych)"]
}`;

export function buildGeminiSystemInstruction(): string {
  return [
    'Jesteś analitykiem dokumentów PDF. Odpowiadasz wyłącznie poprawnym JSON-em (bez markdown, bez komentarzy).',
    'Korzystaj tylko z treści podanej przez użytkownika. Nie wymyślaj faktów.',
    'Brak informacji = null lub []. Model nie zgaduje.',
    'Daty: format ISO 8601 (preferuj YYYY-MM-DD). Dotyczy document.date oraz dates[].date.',
    'Waluty w amounts.currency: kody ISO 4217 (np. PLN, EUR, USD).',
    'amounts: wyłącznie kwoty pieniężne (cena, brutto/netto, VAT, suma do zapłaty).',
    'Nigdy nie wpisuj do amounts: limitów rozmiaru pliku (MB/KB/GB), liczby stron, godzin, procentów, numerów wersji ani liczb z kontekstu wymagań technicznych.',
    'dates: wyłącznie daty wydarzeń opisanych w dokumencie (wystawienie, płatność, obowiązywanie).',
    'Pomiń daty przykładowe/szkoleniowe (np. „przykładowa data”, „YYYY-MM-DD” w opisie schematu).',
    'entities.organizations: strony dokumentu (firmy, urzędy, kontrahenci), nie nazwy narzędzi ani platform z list wymagań (np. GitHub, Cloudflare) chyba że są stroną umowy.',
    'summary: dokładnie 3–5 zdań w języku dominującym w dokumencie.',
    'document.type: wybierz najtrafniejszą kategorię spośród dozwolonych wartości.',
    `Wymagany kształt JSON:\n${OUTPUT_SCHEMA_DESCRIPTION}`,
  ].join('\n');
}

export function buildGeminiUserPrompt(
  body: AnalyzeRequestBody,
  options?: { isRetry?: boolean; truncated?: boolean },
): string {
  const retryNote = options?.isRetry
    ? '\nPoprzednia odpowiedź nie przeszła walidacji. Zwróć wyłącznie poprawny JSON zgodny ze schematem.\n'
    : '';
  const truncateNote = options?.truncated
    ? '\n(Uwaga: treść dokumentu została skrócona z powodu limitu długości.)\n'
    : '';

  return [
    retryNote,
    `Nazwa pliku: ${body.fileName}`,
    `Liczba stron (z ekstrakcji PDF): ${body.pages}`,
    'Przeanalizuj poniższy tekst dokumentu i wypełnij JSON.',
    `Pole document.fileName musi być dokładnie: "${body.fileName}".`,
    `Pole document.pages musi być dokładnie: ${body.pages}.`,
    truncateNote,
    '--- TREŚĆ DOKUMENTU ---',
    body.text,
    '--- KONIEC TREŚCI ---',
  ].join('\n');
}
