export function logGeminiError(context: string, details: unknown): void {
  /* eslint-disable-next-line no-console -- diagnostyka serwera; użytkownik widzi komunikat po polsku */
  console.error(`[pdf-insight] ${context}`, details);
}
