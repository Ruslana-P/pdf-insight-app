import { buildMockInsightResponse, parseAnalyzeRequest } from './analyzeHelpers';
import type { DocumentInsight } from './types';

type AnalyzeApiResult =
  { ok: true; data: DocumentInsight } | { ok: false; error: string; status: number };

export async function analyzeApi(request: Request): Promise<AnalyzeApiResult> {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return { ok: false, error: 'Nie udało się odczytać JSON.', status: 400 };
  }

  const parsed = parseAnalyzeRequest(payload);

  if (!parsed.ok) {
    return { ok: false, error: parsed.error, status: 400 };
  }

  return {
    ok: true,
    data: buildMockInsightResponse(parsed.body),
  };
}
