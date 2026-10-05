export type { DocumentInsight } from '../schemas/insightSchema';

export type AnalyzeRequestBody = {
  fileName: string;
  pages: number;
  text: string;
};
