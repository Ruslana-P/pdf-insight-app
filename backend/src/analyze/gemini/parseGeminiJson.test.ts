import { describe, expect, it } from 'vitest';
import { extractJsonText, parseJsonPayload } from './parseGeminiJson';

describe('parseGeminiJson', () => {
  it('extracts JSON from markdown fences', () => {
    const raw = '```json\n{"summary":"ok","n":1}\n```';
    expect(extractJsonText(raw)).toBe('{"summary":"ok","n":1}');
  });

  it('parses object wrapped in extra text', () => {
    const payload = parseJsonPayload('Oto wynik: {"a":1} koniec.');
    expect(payload).toEqual({ a: 1 });
  });
});
