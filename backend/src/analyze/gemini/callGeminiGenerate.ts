import { GEMINI_GENERATE_URL } from './constants';
import { logGeminiError } from './logGeminiError';
import { ANALYSIS_FAILED_USER_MESSAGE } from './userMessages';

type GeminiGenerateResult =
  { ok: true; text: string } | { ok: false; error: string; status: number };

type GeminiApiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
  error?: {
    message?: string;
    status?: string;
  };
};

export async function callGeminiGenerate(
  apiKey: string,
  model: string,
  systemInstruction: string,
  userPrompt: string,
): Promise<GeminiGenerateResult> {
  const url = `${GEMINI_GENERATE_URL}/${encodeURIComponent(model)}:generateContent`;

  let response: Response;

  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemInstruction }],
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: userPrompt }],
          },
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      }),
    });
  } catch (cause) {
    logGeminiError('Gemini network error', cause);
    return {
      ok: false,
      error: ANALYSIS_FAILED_USER_MESSAGE,
      status: 502,
    };
  }

  let payload: GeminiApiResponse;

  try {
    payload = (await response.json()) as GeminiApiResponse;
  } catch (cause) {
    logGeminiError('Gemini invalid JSON response', { status: response.status, cause });
    return {
      ok: false,
      error: ANALYSIS_FAILED_USER_MESSAGE,
      status: 502,
    };
  }

  if (!response.ok) {
    logGeminiError('Gemini API error', {
      status: response.status,
      model,
      message: payload.error?.message,
      apiStatus: payload.error?.status,
    });
    const status = response.status === 429 ? 429 : 502;

    return { ok: false, error: ANALYSIS_FAILED_USER_MESSAGE, status };
  }

  const text = payload.candidates?.[0]?.content?.parts?.[0]?.text;

  if (typeof text !== 'string' || text.trim().length === 0) {
    logGeminiError('Gemini empty candidate text', { model, payload });
    return {
      ok: false,
      error: ANALYSIS_FAILED_USER_MESSAGE,
      status: 502,
    };
  }

  return { ok: true, text };
}
