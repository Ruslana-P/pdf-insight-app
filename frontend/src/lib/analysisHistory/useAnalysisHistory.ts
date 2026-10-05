import { useCallback, useState } from 'react';
import type { DocumentInsight } from '../schemas/insightSchema';
import {
  loadAnalysisHistory,
  prependAnalysisHistoryEntry,
  removeAnalysisHistoryEntry,
  saveAnalysisHistory,
} from './analysisHistoryStorage';
import type { StoredAnalysisEntry } from './types';

export function useAnalysisHistory() {
  const [entries, setEntries] = useState<StoredAnalysisEntry[]>(() =>
    loadAnalysisHistory(),
  );

  const addEntry = useCallback((insight: DocumentInsight) => {
    setEntries((previousEntries) => {
      const nextEntries = prependAnalysisHistoryEntry(previousEntries, insight);
      saveAnalysisHistory(nextEntries);
      return nextEntries;
    });
  }, []);

  const removeEntry = useCallback((entryId: string) => {
    setEntries((previousEntries) => {
      const nextEntries = removeAnalysisHistoryEntry(previousEntries, entryId);
      saveAnalysisHistory(nextEntries);
      return nextEntries;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setEntries([]);
    saveAnalysisHistory([]);
  }, []);

  return {
    entries,
    addEntry,
    removeEntry,
    clearHistory,
  };
}
