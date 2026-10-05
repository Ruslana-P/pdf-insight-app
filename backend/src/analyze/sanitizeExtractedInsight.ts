import type { DocumentInsight } from './insightSchema';

const NON_MONETARY_AMOUNT_CONTEXT =
  /rozmiar|wielkość|limit|\bmb\b|\bkb\b|\bgb\b|stron(y)?|godzin|sekund|max\.?\s*10/i;

const EXAMPLE_DATE_CONTEXT = /przykład|przykładow|sample|placeholder|\bnp\./i;

export function sanitizeExtractedInsight(insight: DocumentInsight): DocumentInsight {
  return {
    ...insight,
    amounts: insight.amounts.filter(
      (item) => !NON_MONETARY_AMOUNT_CONTEXT.test(item.context),
    ),
    dates: insight.dates.filter((item) => !EXAMPLE_DATE_CONTEXT.test(item.context)),
  };
}
