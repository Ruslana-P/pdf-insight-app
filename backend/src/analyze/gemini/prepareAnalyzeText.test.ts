import { describe, expect, it } from 'vitest';
import { MAX_ANALYZE_TEXT_CHARS } from './constants';
import { prepareAnalyzeText } from './prepareAnalyzeText';

describe('prepareAnalyzeText', () => {
  it('returns original text when under limit', () => {
    const result = prepareAnalyzeText('abc');
    expect(result).toEqual({ text: 'abc', truncated: false });
  });

  it('truncates long text', () => {
    const longText = 'x'.repeat(MAX_ANALYZE_TEXT_CHARS + 10);
    const result = prepareAnalyzeText(longText);
    expect(result.text.length).toBe(MAX_ANALYZE_TEXT_CHARS);
    expect(result.truncated).toBe(true);
  });
});
