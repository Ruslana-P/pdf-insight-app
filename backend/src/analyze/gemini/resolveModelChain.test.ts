import { describe, expect, it } from 'vitest';
import { resolveModelChain, shouldTryNextModel } from './resolveModelChain';

describe('resolveModelChain', () => {
  it('uses default model when env is empty', () => {
    expect(resolveModelChain({})).toEqual([
      'gemini-3.5-flash-lite',
      'gemini-3.8-flash',
    ]);
  });

  it('puts configured model first without duplicates', () => {
    expect(resolveModelChain({ GEMINI_MODEL: 'gemini-3.8-flash' })).toEqual([
      'gemini-3.8-flash',
      'gemini-3.5-flash-lite',
    ]);
  });
});

describe('shouldTryNextModel', () => {
  it('retries with another model on overload and quota errors', () => {
    expect(shouldTryNextModel(429)).toBe(true);
    expect(shouldTryNextModel(502)).toBe(true);
    expect(shouldTryNextModel(404)).toBe(true);
    expect(shouldTryNextModel(400)).toBe(false);
  });
});
