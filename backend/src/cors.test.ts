import { describe, expect, it } from 'vitest';
import { buildCorsHeaders } from './cors';

const ALLOWED = 'https://ruslana-p.github.io';

describe('buildCorsHeaders', () => {
  it('reflects matching origin', () => {
    const headers = buildCorsHeaders(ALLOWED, ALLOWED);
    expect(headers['Access-Control-Allow-Origin']).toBe(ALLOWED);
  });

  it('falls back to allowed origin when origin differs', () => {
    const headers = buildCorsHeaders('https://evil.example', ALLOWED);
    expect(headers['Access-Control-Allow-Origin']).toBe(ALLOWED);
  });

  it('falls back when origin is null', () => {
    const headers = buildCorsHeaders(null, ALLOWED);
    expect(headers['Access-Control-Allow-Origin']).toBe(ALLOWED);
  });
});
