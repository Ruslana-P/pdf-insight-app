export type AnalyzeRequestBody = {
  fileName: string;
  pages: number;
  text: string;
};

export type DocumentInsight = {
  document: {
    fileName: string;
    pages: number;
    language: string;
    type: 'faktura' | 'umowa' | 'oferta' | 'raport' | 'inne';
    title: string | null;
    date: string | null;
  };
  summary: string;
  keyPoints: string[];
  entities: {
    organizations: string[];
    people: string[];
  };
  amounts: Array<{
    value: number;
    currency: string;
    context: string;
  }>;
  dates: Array<{
    date: string;
    context: string;
  }>;
  keywords: string[];
};
