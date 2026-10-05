import { insightSchema } from '../schemas/insightSchema';
import type { DocumentInsight } from '../schemas/insightSchema';
import type { StoredAnalysisEntry } from './types';

export const ANALYSIS_HISTORY_STORAGE_KEY = 'pdf-insight-analysis-history-v1';
export const ANALYSIS_HISTORY_MAX_ENTRIES = 10;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function parseStoredEntry(value: unknown): StoredAnalysisEntry | null {
  if (!isRecord(value)) {
    return null;
  }

  const { id, analyzedAt, insight } = value;

  if (typeof id !== 'string' || typeof analyzedAt !== 'string') {
    return null;
  }

  const parsedInsight = insightSchema.safeParse(insight);

  if (!parsedInsight.success) {
    return null;
  }

  return {
    id,
    analyzedAt,
    insight: parsedInsight.data,
  };
}

export function loadAnalysisHistory(): StoredAnalysisEntry[] {
  if (typeof localStorage === 'undefined') {
    return [];
  }

  const raw = localStorage.getItem(ANALYSIS_HISTORY_STORAGE_KEY);

  if (!raw) {
    return [];
  }

  let payload: unknown;

  try {
    payload = JSON.parse(raw) as unknown;
  } catch {
    return [];
  }

  if (!Array.isArray(payload)) {
    return [];
  }

  return payload
    .map(parseStoredEntry)
    .filter((entry): entry is StoredAnalysisEntry => entry !== null)
    .slice(0, ANALYSIS_HISTORY_MAX_ENTRIES);
}

export function saveAnalysisHistory(entries: StoredAnalysisEntry[]): void {
  if (typeof localStorage === 'undefined') {
    return;
  }

  localStorage.setItem(
    ANALYSIS_HISTORY_STORAGE_KEY,
    JSON.stringify(entries.slice(0, ANALYSIS_HISTORY_MAX_ENTRIES)),
  );
}

export function createAnalysisHistoryEntry(
  insight: DocumentInsight,
): StoredAnalysisEntry {
  return {
    id: crypto.randomUUID(),
    analyzedAt: new Date().toISOString(),
    insight,
  };
}

export function prependAnalysisHistoryEntry(
  entries: StoredAnalysisEntry[],
  insight: DocumentInsight,
): StoredAnalysisEntry[] {
  const nextEntry = createAnalysisHistoryEntry(insight);

  return [nextEntry, ...entries].slice(0, ANALYSIS_HISTORY_MAX_ENTRIES);
}

export function removeAnalysisHistoryEntry(
  entries: StoredAnalysisEntry[],
  entryId: string,
): StoredAnalysisEntry[] {
  return entries.filter((entry) => entry.id !== entryId);
}
