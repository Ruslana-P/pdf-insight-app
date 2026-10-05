import { MAX_ANALYZE_TEXT_CHARS } from './constants';

export function prepareAnalyzeText(text: string): {
  text: string;
  truncated: boolean;
} {
  if (text.length <= MAX_ANALYZE_TEXT_CHARS) {
    return { text, truncated: false };
  }

  return {
    text: text.slice(0, MAX_ANALYZE_TEXT_CHARS),
    truncated: true,
  };
}
