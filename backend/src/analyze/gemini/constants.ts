/** Best free-tier fit for new AI Studio projects (see Google model docs). */
export const DEFAULT_GEMINI_MODEL = 'gemini-3.5-flash-lite';

export const FALLBACK_GEMINI_MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.8-flash',
] as const;

export const GEMINI_GENERATE_URL =
  'https://generativelanguage.googleapis.com/v1beta/models';

/** Keeps free-tier requests predictable for large PDFs. */
export const MAX_ANALYZE_TEXT_CHARS = 120_000;

export const MAX_GEMINI_ATTEMPTS = 2;
