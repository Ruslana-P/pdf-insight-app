import type { DocumentInsight } from '../schemas/insightSchema';

export type StoredAnalysisEntry = {
  id: string;
  analyzedAt: string;
  insight: DocumentInsight;
};
