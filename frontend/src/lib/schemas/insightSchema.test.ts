import { describe, expect, it } from 'vitest';
import { insightSchema } from './insightSchema';

const validInsight = {
  document: {
    fileName: 'faktura.pdf',
    pages: 2,
    language: 'pl',
    type: 'faktura',
    title: 'FV 2024/01',
    date: '2024-01-15',
  },
  summary: 'Krótkie podsumowanie dokumentu.',
  keyPoints: ['Punkt pierwszy', 'Punkt drugi'],
  entities: {
    organizations: ['Acme Sp. z o.o.'],
    people: ['Jan Kowalski'],
  },
  amounts: [{ value: 1230.5, currency: 'PLN', context: 'Kwota brutto' }],
  dates: [{ date: '2024-01-15', context: 'Data wystawienia' }],
  keywords: ['faktura', 'VAT'],
} as const;

describe('insightSchema', () => {
  it('accepts a valid insight payload', () => {
    const result = insightSchema.safeParse(validInsight);

    expect(result.success).toBe(true);
  });

  it('accepts null title and date on document', () => {
    const result = insightSchema.safeParse({
      ...validInsight,
      document: {
        ...validInsight.document,
        title: null,
        date: null,
      },
    });

    expect(result.success).toBe(true);
  });

  it('rejects an invalid document type', () => {
    const result = insightSchema.safeParse({
      ...validInsight,
      document: { ...validInsight.document, type: 'newsletter' },
    });

    expect(result.success).toBe(false);
  });

  it('rejects non-positive page count', () => {
    const result = insightSchema.safeParse({
      ...validInsight,
      document: { ...validInsight.document, pages: 0 },
    });

    expect(result.success).toBe(false);
  });

  it('rejects missing summary', () => {
    const payload = { ...validInsight } as Record<string, unknown>;
    delete payload.summary;
    const result = insightSchema.safeParse(payload);

    expect(result.success).toBe(false);
  });

  it('rejects amounts with non-numeric value', () => {
    const result = insightSchema.safeParse({
      ...validInsight,
      amounts: [{ value: '100', currency: 'PLN', context: 'x' }],
    });

    expect(result.success).toBe(false);
  });
});
