import type { DocumentInsight } from './schemas/insightSchema';

export function buildInsightDownloadFileName(sourceFileName: string): string {
  const baseName = sourceFileName.replace(/\.pdf$/i, '').trim() || 'dokument';
  const safeBase = baseName.replace(/[^\w\u0100-\u024F.-]+/gi, '-').replace(/-+/g, '-');

  return `${safeBase}-insight.json`;
}

export function downloadInsightJson(insight: DocumentInsight): void {
  const json = JSON.stringify(insight, null, 2);
  const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
  const objectUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = buildInsightDownloadFileName(insight.document.fileName);
  link.rel = 'noopener';
  link.click();

  URL.revokeObjectURL(objectUrl);
}
