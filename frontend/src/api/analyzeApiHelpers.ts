import { API_MESSAGES } from '../lib/constants';
import { insightSchema, type DocumentInsight } from '../lib/schemas/insightSchema';

export function getAnalyzeApiBaseUrl(): string | null {
  const url = import.meta.env.VITE_API_URL;

  if (typeof url !== 'string' || url.trim().length === 0) {
    return null;
  }

  return url.replace(/\/$/, '');
}

export function parseAnalyzeErrorPayload(payload: unknown, httpStatus: number): string {
  if (httpStatus === 400) {
    if (
      typeof payload === 'object' &&
      payload !== null &&
      'error' in payload &&
      typeof payload.error === 'string'
    ) {
      return payload.error;
    }
  }

  return API_MESSAGES.analyzeFailed;
}

export function parseAnalyzeSuccessPayload(
  payload: unknown,
): { ok: true; data: DocumentInsight } | { ok: false; error: string } {
  const parsed = insightSchema.safeParse(payload);

  if (!parsed.success) {
    return { ok: false, error: API_MESSAGES.invalidInsightSchema };
  }

  return { ok: true, data: parsed.data };
}
