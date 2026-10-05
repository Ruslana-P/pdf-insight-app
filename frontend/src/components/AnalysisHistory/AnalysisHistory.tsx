import { DOCUMENT_TYPE_LABELS, HISTORY_COPY } from '../../lib/constants';
import { formatAnalyzedAt } from '../../lib/formatAnalyzedAt';
import { downloadInsightJson } from '../../lib/downloadInsightJson';
import type { StoredAnalysisEntry } from '../../lib/analysisHistory/types';
import { SimpleButton } from '../SimpleButton';
import {
  HistoryActions,
  HistoryHeading,
  HistoryItem,
  HistoryItemMeta,
  HistoryItemSummary,
  HistoryItemTitle,
  HistoryLead,
  HistoryList,
  HistorySection,
  HistoryToolbar,
} from './AnalysisHistory.styles';

export type AnalysisHistoryProps = {
  entries: StoredAnalysisEntry[];
  onRemoveEntry: (entryId: string) => void;
  onClearHistory: () => void;
};

export function AnalysisHistory({
  entries,
  onRemoveEntry,
  onClearHistory,
}: AnalysisHistoryProps) {
  return (
    <HistorySection aria-labelledby="analysis-history-heading">
      <HistoryHeading id="analysis-history-heading">
        {HISTORY_COPY.heading}
      </HistoryHeading>
      <HistoryLead>{HISTORY_COPY.lead}</HistoryLead>

      {entries.length === 0 ? (
        <HistoryLead>{HISTORY_COPY.empty}</HistoryLead>
      ) : (
        <>
          <HistoryToolbar>
            <SimpleButton onClick={onClearHistory}>
              {HISTORY_COPY.buttonClearAll}
            </SimpleButton>
          </HistoryToolbar>
          <HistoryList>
            {entries.map((entry) => {
              const { document: doc, summary } = entry.insight;

              function handleDownloadClick() {
                downloadInsightJson(entry.insight);
              }

              function handleRemoveClick() {
                onRemoveEntry(entry.id);
              }

              return (
                <HistoryItem key={entry.id}>
                  <HistoryItemTitle>{doc.fileName}</HistoryItemTitle>
                  <HistoryItemMeta>
                    {formatAnalyzedAt(entry.analyzedAt)} ·{' '}
                    {DOCUMENT_TYPE_LABELS[doc.type]} · {doc.pages}{' '}
                    {HISTORY_COPY.pagesLabel}
                  </HistoryItemMeta>
                  <HistoryItemSummary>{summary}</HistoryItemSummary>
                  <HistoryActions>
                    <SimpleButton onClick={handleDownloadClick}>
                      {HISTORY_COPY.buttonDownloadJson}
                    </SimpleButton>
                    <SimpleButton onClick={handleRemoveClick}>
                      {HISTORY_COPY.buttonRemove}
                    </SimpleButton>
                  </HistoryActions>
                </HistoryItem>
              );
            })}
          </HistoryList>
        </>
      )}
    </HistorySection>
  );
}
