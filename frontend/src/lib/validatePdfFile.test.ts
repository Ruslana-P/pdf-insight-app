import { describe, expect, it } from 'vitest';
import { VALIDATION_MESSAGES } from './constants';
import { PDF_MAX_BYTES, validatePdfFile } from './validatePdfFile';

function createFile(name: string, size: number, type: string): File {
  const bytes = size > 0 ? new Uint8Array(size) : new Uint8Array();
  return new File([bytes], name, { type });
}

describe('validatePdfFile', () => {
  it('accepts a valid PDF within size limit', () => {
    const file = createFile('doc.pdf', 1024, 'application/pdf');
    const result = validatePdfFile(file);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.file).toBe(file);
    }
  });

  it('accepts PDF by extension when MIME type is empty', () => {
    const file = createFile('doc.pdf', 100, '');
    const result = validatePdfFile(file);

    expect(result.ok).toBe(true);
  });

  it('rejects empty files', () => {
    const file = createFile('doc.pdf', 0, 'application/pdf');
    const result = validatePdfFile(file);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe(VALIDATION_MESSAGES.emptyFile);
    }
  });

  it('rejects non-PDF files', () => {
    const file = createFile('notes.txt', 100, 'text/plain');
    const result = validatePdfFile(file);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe(VALIDATION_MESSAGES.notPdf);
    }
  });

  it('rejects files larger than 10 MB', () => {
    const file = createFile('big.pdf', PDF_MAX_BYTES + 1, 'application/pdf');
    const result = validatePdfFile(file);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe(VALIDATION_MESSAGES.fileTooLarge);
    }
  });
});
