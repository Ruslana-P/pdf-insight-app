import { resolveAllowedOrigin } from './allowedOrigins';

export function buildCorsHeaders(requestOrigin: string | null): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': resolveAllowedOrigin(requestOrigin),
    'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}
