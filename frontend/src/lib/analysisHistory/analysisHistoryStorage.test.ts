import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import type { DocumentInsight } from '../schemas/insightSchema';
import {
  ANALYSIS_HISTORY_MAX_ENTRIES,
  ANALYSIS_HISTORY_STORAGE_KEY,
  loadAnalysisHistory,
  prependAnalysisHistoryEntry,
  saveAnalysisHistory,
} from './analysisHistoryStorage';

const sampleInsight: DocumentInsight = {
  document: {
    fileName: 'raport.pdf',
    pages: 2,
    language: 'pl',
    type: 'raport',
    title: null,
    date: null,
  },
  summary: 'Krótkie podsumowanie.',
  keyPoints: ['Punkt'],
  entities: { organizations: [], people: [] },
  amounts: [],
  dates: [],
  keywords: ['test'],
};

function createLocalStorageMock(): Storage {
  const store = new Map<string, string>();

  return {
    get length() {
      return store.size;
    },
    clear() {
      store.clear();
    },
    getItem(key: string) {
      return store.get(key) ?? null;
    },
    key(index: number) {
      return [...store.keys()][index] ?? null;
    },
    removeItem(key: string) {
      store.delete(key);
    },
    setItem(key: string, value: string) {
      store.set(key, value);
    },
  };
}

describe('analysisHistoryStorage', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', createLocalStorageMock());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns empty list when storage is missing', () => {
    expect(loadAnalysisHistory()).toEqual([]);
  });

  it('persists and loads valid entries', () => {
    const entries = prependAnalysisHistoryEntry([], sampleInsight);
    saveAnalysisHistory(entries);

    const loaded = loadAnalysisHistory();
    expect(loaded).toHaveLength(1);
    expect(loaded[0]?.insight.document.fileName).toBe('raport.pdf');
  });

  it('keeps only the newest entries up to the limit', () => {
    let entries = prependAnalysisHistoryEntry([], sampleInsight);

    for (let index = 0; index < ANALYSIS_HISTORY_MAX_ENTRIES + 2; index += 1) {
      entries = prependAnalysisHistoryEntry(entries, {
        ...sampleInsight,
        summary: `Summary ${index}`,
      });
    }

    saveAnalysisHistory(entries);
    const loaded = loadAnalysisHistory();

    expect(loaded).toHaveLength(ANALYSIS_HISTORY_MAX_ENTRIES);
    expect(loaded[0]?.insight.summary).toBe(
      `Summary ${ANALYSIS_HISTORY_MAX_ENTRIES + 1}`,
    );
  });

  it('ignores corrupted storage payload', () => {
    localStorage.setItem(ANALYSIS_HISTORY_STORAGE_KEY, '{not-json');
    expect(loadAnalysisHistory()).toEqual([]);
  });
});
