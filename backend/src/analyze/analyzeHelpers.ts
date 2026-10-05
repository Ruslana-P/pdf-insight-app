import type { AnalyzeRequestBody } from './types';

type ParseResult =
  { ok: true; body: AnalyzeRequestBody } | { ok: false; error: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function parseAnalyzeRequest(payload: unknown): ParseResult {
  if (!isRecord(payload)) {
    return { ok: false, error: 'Nieprawidłowy format żądania.' };
  }

  const { fileName, pages, text } = payload;

  if (typeof fileName !== 'string' || fileName.trim().length === 0) {
    return { ok: false, error: 'Brak nazwy pliku.' };
  }

  if (typeof pages !== 'number' || !Number.isFinite(pages) || pages < 1) {
    return { ok: false, error: 'Nieprawidłowa liczba stron.' };
  }

  if (typeof text !== 'string' || text.trim().length === 0) {
    return { ok: false, error: 'Brak tekstu dokumentu.' };
  }

  return {
    ok: true,
    body: {
      fileName: fileName.trim(),
      pages: Math.floor(pages),
      text,
    },
  };
}
