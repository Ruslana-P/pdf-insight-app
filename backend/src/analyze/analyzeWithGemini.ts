import type { Env } from '../env';
import { insightSchema, type DocumentInsight } from './insightSchema';
import {
  buildGeminiSystemInstruction,
  buildGeminiUserPrompt,
} from './gemini/buildGeminiPrompt';
import { callGeminiGenerate } from './gemini/callGeminiGenerate';
import { MAX_GEMINI_ATTEMPTS } from './gemini/constants';
import { logGeminiError } from './gemini/logGeminiError';
import { parseJsonPayload } from './gemini/parseGeminiJson';
import { prepareAnalyzeText } from './gemini/prepareAnalyzeText';
import { resolveModelChain, shouldTryNextModel } from './gemini/resolveModelChain';
import { ANALYSIS_FAILED_USER_MESSAGE } from './gemini/userMessages';
import { sanitizeExtractedInsight } from './sanitizeExtractedInsight';
import type { AnalyzeRequestBody } from './types';

type GeminiAnalyzeResult =
  { ok: true; data: DocumentInsight } | { ok: false; error: string; status: number };

function mergeRequestDocumentFields(
  insight: DocumentInsight,
  body: AnalyzeRequestBody,
): DocumentInsight {
  return {
    ...insight,
    document: {
      ...insight.document,
      fileName: body.fileName,
      pages: body.pages,
    },
  };
}

export async function analyzeWithGemini(
  body: AnalyzeRequestBody,
  env: Env,
): Promise<GeminiAnalyzeResult> {
  const apiKey = env.GEMINI_API_KEY?.trim();

  if (!apiKey) {
    return {
      ok: false,
      error: 'Brak konfiguracji API po stronie serwera.',
      status: 500,
    };
  }

  const modelChain = resolveModelChain(env);
  const prepared = prepareAnalyzeText(body.text);
  const requestBody: AnalyzeRequestBody = {
    ...body,
    text: prepared.text,
  };

  const systemInstruction = buildGeminiSystemInstruction();
  let lastApiError: { error: string; status: number } | null = null;

  for (const model of modelChain) {
    let lastValidationFailed = false;

    for (let attempt = 0; attempt < MAX_GEMINI_ATTEMPTS; attempt += 1) {
      const isRetry = attempt > 0;
      const userPrompt = buildGeminiUserPrompt(requestBody, {
        isRetry: isRetry || lastValidationFailed,
        truncated: prepared.truncated,
      });

      const generated = await callGeminiGenerate(
        apiKey,
        model,
        systemInstruction,
        userPrompt,
      );

      if (!generated.ok) {
        lastApiError = { error: generated.error, status: generated.status };

        if (shouldTryNextModel(generated.status)) {
          logGeminiError('Switching Gemini model after API error', {
            model,
            status: generated.status,
          });
          break;
        }

        return generated;
      }

      let parsedPayload: unknown;

      try {
        parsedPayload = parseJsonPayload(generated.text);
      } catch (cause) {
        logGeminiError('Failed to parse Gemini JSON text', { attempt, cause, model });
        lastValidationFailed = true;
        continue;
      }

      const validated = insightSchema.safeParse(parsedPayload);

      if (!validated.success) {
        logGeminiError('Gemini JSON failed schema validation', {
          attempt,
          model,
          issues: validated.error.issues,
        });
        lastValidationFailed = true;
        continue;
      }

      const merged = mergeRequestDocumentFields(validated.data, body);

      return {
        ok: true,
        data: sanitizeExtractedInsight(merged),
      };
    }
  }

  if (lastApiError) {
    return {
      ok: false,
      error: lastApiError.error,
      status: lastApiError.status === 429 ? 429 : 502,
    };
  }

  return {
    ok: false,
    error: ANALYSIS_FAILED_USER_MESSAGE,
    status: 502,
  };
}
