import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { EXTRACTION_MESSAGES } from './constants';

GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).href;

export type ExtractPdfTextResult =
  | { ok: true; text: string; pages: number; fileName: string }
  | { ok: false; error: string };

export async function extractPdfText(file: File): Promise<ExtractPdfTextResult> {
  try {
    const data = new Uint8Array(await file.arrayBuffer());
    const pdf = await getDocument({ data }).promise;
    const pages = pdf.numPages;
    const pageTexts: string[] = [];

    for (let pageNumber = 1; pageNumber <= pages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item) => ('str' in item ? item.str : ''))
        .join(' ');
      pageTexts.push(pageText);
    }

    const text = pageTexts.join('\n').trim();

    if (text.length === 0) {
      return { ok: false, error: EXTRACTION_MESSAGES.noTextLayer };
    }

    return {
      ok: true,
      text,
      pages,
      fileName: file.name,
    };
  } catch {
    return { ok: false, error: EXTRACTION_MESSAGES.readFailed };
  }
}
