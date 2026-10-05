export type { DocumentInsight } from './insightSchema';

export type AnalyzeRequestBody = {
  fileName: string;
  pages: number;
  text: string;
};
