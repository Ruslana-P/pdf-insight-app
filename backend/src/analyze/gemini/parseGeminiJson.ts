export function extractJsonText(raw: string): string {
  const trimmed = raw.trim();

  const fencedMatch = /^```(?:json)?\s*([\s\S]*?)```$/i.exec(trimmed);
  if (fencedMatch) {
    return fencedMatch[1].trim();
  }

  const firstBrace = trimmed.indexOf('{');
  const lastBrace = trimmed.lastIndexOf('}');

  if (firstBrace !== -1 && lastBrace > firstBrace) {
    return trimmed.slice(firstBrace, lastBrace + 1);
  }

  return trimmed;
}

export function parseJsonPayload(raw: string): unknown {
  const jsonText = extractJsonText(raw);
  return JSON.parse(jsonText) as unknown;
}
