import type { Env } from '../../env';
import { DEFAULT_GEMINI_MODEL, FALLBACK_GEMINI_MODELS } from './constants';

export function resolveModelChain(env: Env): string[] {
  const primary = env.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL;
  const ordered = [primary, ...FALLBACK_GEMINI_MODELS];

  return [...new Set(ordered.filter((model) => model.length > 0))];
}

export function shouldTryNextModel(httpStatus: number): boolean {
  return httpStatus === 404 || httpStatus === 429 || httpStatus === 502;
}
