import { describe, expect, it } from 'vitest';
import type { DocumentInsight } from './insightSchema';
import { sanitizeExtractedInsight } from './sanitizeExtractedInsight';

const baseInsight: DocumentInsight = {
  document: {
    fileName: 'x.pdf',
    pages: 1,
    language: 'pl',
    type: 'inne',
    title: null,
    date: null,
  },
  summary: 'Test',
  keyPoints: [],
  entities: { organizations: [], people: [] },
  amounts: [],
  dates: [],
  keywords: [],
};

describe('sanitizeExtractedInsight', () => {
  it('removes amounts that describe file limits, not money', () => {
    const insight: DocumentInsight = {
      ...baseInsight,
      amounts: [
        { value: 10, currency: 'PLN', context: 'maksymalny rozmiar pliku PDF' },
        { value: 1230, currency: 'PLN', context: 'kwota brutto na fakturze' },
      ],
    };

    const sanitized = sanitizeExtractedInsight(insight);

    expect(sanitized.amounts).toEqual([
      { value: 1230, currency: 'PLN', context: 'kwota brutto na fakturze' },
    ]);
  });

  it('removes example dates from specification text', () => {
    const insight: DocumentInsight = {
      ...baseInsight,
      dates: [
        { date: '2026-09-01', context: 'przykładowa data umowy' },
        { date: '2024-03-15', context: 'data wystawienia faktury' },
      ],
    };

    const sanitized = sanitizeExtractedInsight(insight);

    expect(sanitized.dates).toEqual([
      { date: '2024-03-15', context: 'data wystawienia faktury' },
    ]);
  });
});
