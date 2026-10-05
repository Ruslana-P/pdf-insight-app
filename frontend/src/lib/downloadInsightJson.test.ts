import { describe, expect, it } from 'vitest';
import { buildInsightDownloadFileName } from './downloadInsightJson';

describe('buildInsightDownloadFileName', () => {
  it('strips PDF extension and adds insight suffix', () => {
    expect(buildInsightDownloadFileName('raport.pdf')).toBe('raport-insight.json');
  });

  it('sanitizes unsafe characters in the base name', () => {
    expect(buildInsightDownloadFileName('Moja Faktura.pdf')).toBe(
      'Moja-Faktura-insight.json',
    );
  });

  it('falls back when name is empty after trim', () => {
    expect(buildInsightDownloadFileName('.pdf')).toBe('dokument-insight.json');
  });
});
