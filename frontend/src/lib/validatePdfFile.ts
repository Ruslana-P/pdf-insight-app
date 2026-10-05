import { VALIDATION_MESSAGES } from './constants';

export const PDF_MAX_BYTES = 10 * 1024 * 1024;

export const PDF_ACCEPT = 'application/pdf,.pdf';

export type ValidationResultType =
  { ok: true; file: File } | { ok: false; error: string };

function isPdfFile(file: File): boolean {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
}

export function validatePdfFile(file: File): ValidationResultType {
  if (file.size === 0) {
    return { ok: false, error: VALIDATION_MESSAGES.emptyFile };
  }

  if (!isPdfFile(file)) {
    return { ok: false, error: VALIDATION_MESSAGES.notPdf };
  }

  if (file.size > PDF_MAX_BYTES) {
    return { ok: false, error: VALIDATION_MESSAGES.fileTooLarge };
  }

  return { ok: true, file };
}
