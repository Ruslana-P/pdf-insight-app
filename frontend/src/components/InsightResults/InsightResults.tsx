import { useId, useMemo, useState } from 'react';
import { SimpleButton } from '../SimpleButton';
import { DOCUMENT_TYPE_LABELS, RESULTS_COPY } from '../../lib/constants';
import { downloadInsightJson } from '../../lib/downloadInsightJson';
import type { DocumentInsight } from '../../lib/schemas/insightSchema';
import {
  BulletItem,
  BulletList,
  DataTable,
  EmptyHint,
  JsonPreview,
  KeywordItem,
  KeywordList,
  MetaList,
  MetaTerm,
  MetaValue,
  DocumentSectionTitle,
  FooterDownloadRow,
  HeaderDownloadWrap,
  ResponsiveResultsStack,
  ResultsBlock,
  ResultsHeaderActions,
  ResultsSection,
  ResultsSectionHeader,
  SubHeading,
  SummaryText,
  TableCell,
  TableHeadCell,
  ViewModeButton,
  ViewModeSwitch,
} from './InsightResults.styles';
import { ResponsiveResultsSection } from './ResponsiveResultsSection';

export type InsightResultsProps = {
  insight: DocumentInsight;
};

type ViewMode = 'text' | 'json';

function formatOptionalText(value: string | null): string {
  if (value === null || value.trim().length === 0) {
    return RESULTS_COPY.notProvided;
  }

  return value;
}

function StringListSection({
  heading,
  items,
  emptyLabel,
}: {
  heading: string;
  items: string[];
  emptyLabel: string;
}) {
  return (
    <ResultsBlock>
      <SubHeading>{heading}</SubHeading>
      {items.length === 0 ? (
        <EmptyHint>{emptyLabel}</EmptyHint>
      ) : (
        <BulletList>
          {items.map((item, index) => (
            <BulletItem key={`${heading}-${index}`}>{item}</BulletItem>
          ))}
        </BulletList>
      )}
    </ResultsBlock>
  );
}

function StructuredResultsView({ insight }: { insight: DocumentInsight }) {
  const {
    document: doc,
    amounts,
    dates,
    entities,
    keywords,
    keyPoints,
    summary,
  } = insight;

  return (
    <>
      <ResultsBlock>
        <MetaList>
          <MetaTerm>{RESULTS_COPY.documentFileName}</MetaTerm>
          <MetaValue>{doc.fileName}</MetaValue>
          <MetaTerm>{RESULTS_COPY.documentPages}</MetaTerm>
          <MetaValue>{doc.pages}</MetaValue>
          <MetaTerm>{RESULTS_COPY.documentLanguage}</MetaTerm>
          <MetaValue>{doc.language}</MetaValue>
          <MetaTerm>{RESULTS_COPY.documentType}</MetaTerm>
          <MetaValue>{DOCUMENT_TYPE_LABELS[doc.type]}</MetaValue>
          <MetaTerm>{RESULTS_COPY.documentTitle}</MetaTerm>
          <MetaValue>{formatOptionalText(doc.title)}</MetaValue>
          <MetaTerm>{RESULTS_COPY.documentDate}</MetaTerm>
          <MetaValue>{formatOptionalText(doc.date)}</MetaValue>
        </MetaList>
      </ResultsBlock>

      <ResponsiveResultsStack>
        <ResponsiveResultsSection
          title={RESULTS_COPY.summaryHeading}
          defaultExpanded
          renderContent={() => <SummaryText>{summary}</SummaryText>}
        />

        <ResponsiveResultsSection
          title={RESULTS_COPY.keyPointsHeading}
          renderContent={() =>
            keyPoints.length === 0 ? (
              <EmptyHint>{RESULTS_COPY.emptyList}</EmptyHint>
            ) : (
              <BulletList>
                {keyPoints.map((point, index) => (
                  <BulletItem key={`key-point-${index}`}>{point}</BulletItem>
                ))}
              </BulletList>
            )
          }
        />

        <ResponsiveResultsSection
          title={RESULTS_COPY.entitiesHeading}
          renderContent={() => (
            <>
              <StringListSection
                heading={RESULTS_COPY.organizationsLabel}
                items={entities.organizations}
                emptyLabel={RESULTS_COPY.emptyList}
              />
              <StringListSection
                heading={RESULTS_COPY.peopleLabel}
                items={entities.people}
                emptyLabel={RESULTS_COPY.emptyList}
              />
            </>
          )}
        />

        <ResponsiveResultsSection
          title={RESULTS_COPY.amountsHeading}
          renderContent={() =>
            amounts.length === 0 ? (
              <EmptyHint>{RESULTS_COPY.emptyList}</EmptyHint>
            ) : (
              <DataTable>
                <thead>
                  <tr>
                    <TableHeadCell scope="col">
                      {RESULTS_COPY.amountValue}
                    </TableHeadCell>
                    <TableHeadCell scope="col">
                      {RESULTS_COPY.amountCurrency}
                    </TableHeadCell>
                    <TableHeadCell scope="col">
                      {RESULTS_COPY.amountContext}
                    </TableHeadCell>
                  </tr>
                </thead>
                <tbody>
                  {amounts.map((amount, index) => (
                    <tr key={`amount-${index}`}>
                      <TableCell>{amount.value}</TableCell>
                      <TableCell>{amount.currency}</TableCell>
                      <TableCell>{amount.context}</TableCell>
                    </tr>
                  ))}
                </tbody>
              </DataTable>
            )
          }
        />

        <ResponsiveResultsSection
          title={RESULTS_COPY.datesHeading}
          renderContent={() =>
            dates.length === 0 ? (
              <EmptyHint>{RESULTS_COPY.emptyList}</EmptyHint>
            ) : (
              <DataTable>
                <thead>
                  <tr>
                    <TableHeadCell scope="col">{RESULTS_COPY.dateValue}</TableHeadCell>
                    <TableHeadCell scope="col">
                      {RESULTS_COPY.dateContext}
                    </TableHeadCell>
                  </tr>
                </thead>
                <tbody>
                  {dates.map((entry, index) => (
                    <tr key={`date-${index}`}>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.context}</TableCell>
                    </tr>
                  ))}
                </tbody>
              </DataTable>
            )
          }
        />

        <ResponsiveResultsSection
          title={RESULTS_COPY.keywordsHeading}
          renderContent={() =>
            keywords.length === 0 ? (
              <EmptyHint>{RESULTS_COPY.emptyList}</EmptyHint>
            ) : (
              <KeywordList>
                {keywords.map((keyword, index) => (
                  <KeywordItem key={`keyword-${index}`}>{keyword}</KeywordItem>
                ))}
              </KeywordList>
            )
          }
        />
      </ResponsiveResultsStack>
    </>
  );
}

export function InsightResults({ insight }: InsightResultsProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('text');
  const textPanelId = useId();
  const jsonPanelId = useId();

  const jsonPreview = useMemo(() => JSON.stringify(insight, null, 2), [insight]);

  function handleDownloadClick() {
    downloadInsightJson(insight);
  }

  return (
    <ResultsSection aria-label={RESULTS_COPY.documentHeading}>
      <ResultsBlock>
        <ResultsSectionHeader>
          <DocumentSectionTitle>{RESULTS_COPY.documentHeading}</DocumentSectionTitle>
          <ResultsHeaderActions>
            <ViewModeSwitch
              role="tablist"
              aria-label={RESULTS_COPY.viewModeSwitchLabel}
            >
              <ViewModeButton
                type="button"
                role="tab"
                id={`${textPanelId}-tab`}
                aria-selected={viewMode === 'text'}
                aria-controls={textPanelId}
                $active={viewMode === 'text'}
                onClick={() => setViewMode('text')}
              >
                {RESULTS_COPY.viewModeText}
              </ViewModeButton>
              <ViewModeButton
                type="button"
                role="tab"
                id={`${jsonPanelId}-tab`}
                aria-selected={viewMode === 'json'}
                aria-controls={jsonPanelId}
                $active={viewMode === 'json'}
                onClick={() => setViewMode('json')}
              >
                {RESULTS_COPY.viewModeJson}
              </ViewModeButton>
            </ViewModeSwitch>
            <HeaderDownloadWrap>
              <SimpleButton onClick={handleDownloadClick}>
                {RESULTS_COPY.buttonDownloadJson}
              </SimpleButton>
            </HeaderDownloadWrap>
          </ResultsHeaderActions>
        </ResultsSectionHeader>

        {viewMode === 'text' ? (
          <div role="tabpanel" id={textPanelId} aria-labelledby={`${textPanelId}-tab`}>
            <StructuredResultsView insight={insight} />
          </div>
        ) : (
          <div role="tabpanel" id={jsonPanelId} aria-labelledby={`${jsonPanelId}-tab`}>
            <JsonPreview aria-label={RESULTS_COPY.jsonPreviewAriaLabel}>
              {jsonPreview}
            </JsonPreview>
          </div>
        )}

        <FooterDownloadRow>
          <SimpleButton onClick={handleDownloadClick}>
            {RESULTS_COPY.buttonDownloadJson}
          </SimpleButton>
        </FooterDownloadRow>
      </ResultsBlock>
    </ResultsSection>
  );
}
