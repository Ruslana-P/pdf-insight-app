import { describe, expect, it } from 'vitest';
import { ALLOWED_ORIGINS } from './allowedOrigins';
import { buildCorsHeaders } from './buildCorsHeaders';

describe('buildCorsHeaders', () => {
  it('reflects allowed origin when it matches', () => {
    const headers = buildCorsHeaders(ALLOWED_ORIGINS[1]);
    expect(headers['Access-Control-Allow-Origin']).toBe('http://localhost:5173');
  });

  it('falls back to production origin when origin differs', () => {
    const headers = buildCorsHeaders('https://evil.example');
    expect(headers['Access-Control-Allow-Origin']).toBe(ALLOWED_ORIGINS[0]);
  });

  it('falls back when origin is null', () => {
    const headers = buildCorsHeaders(null);
    expect(headers['Access-Control-Allow-Origin']).toBe(ALLOWED_ORIGINS[0]);
  });
});
