import { API_MESSAGES } from '../lib/constants';
import type { DocumentInsight } from '../lib/schemas/insightSchema';
import type { AnalyzeRequestBody } from '../lib/types/documentInsight';
import {
  getAnalyzeApiBaseUrl,
  parseAnalyzeErrorPayload,
  parseAnalyzeSuccessPayload,
} from './analyzeApiHelpers';

export type AnalyzeDocumentResult =
  { ok: true; data: DocumentInsight } | { ok: false; error: string };

export async function analyzeDocument(
  body: AnalyzeRequestBody,
): Promise<AnalyzeDocumentResult> {
  const apiBaseUrl = getAnalyzeApiBaseUrl();

  if (!apiBaseUrl) {
    return { ok: false, error: API_MESSAGES.missingApiUrl };
  }

  let response: Response;

  try {
    response = await fetch(`${apiBaseUrl}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    return { ok: false, error: API_MESSAGES.networkError };
  }

  let payload: unknown;

  try {
    payload = await response.json();
  } catch {
    return { ok: false, error: API_MESSAGES.invalidResponse };
  }

  if (!response.ok) {
    return {
      ok: false,
      error: parseAnalyzeErrorPayload(payload, response.status),
    };
  }

  return parseAnalyzeSuccessPayload(payload);
}
