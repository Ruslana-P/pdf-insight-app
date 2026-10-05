export const ALLOWED_ORIGINS = [
  'https://ruslana-p.github.io',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
] as const;

export function resolveAllowedOrigin(requestOrigin: string | null): string {
  if (requestOrigin && (ALLOWED_ORIGINS as readonly string[]).includes(requestOrigin)) {
    return requestOrigin;
  }

  return ALLOWED_ORIGINS[0];
}
