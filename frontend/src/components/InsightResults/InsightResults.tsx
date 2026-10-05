import { SimpleButton } from '../SimpleButton';
import { DOCUMENT_TYPE_LABELS, RESULTS_COPY } from '../../lib/constants';
import { downloadInsightJson } from '../../lib/downloadInsightJson';
import type { DocumentInsight } from '../../lib/schemas/insightSchema';
import {
  BulletItem,
  BulletList,
  DataTable,
  DownloadRow,
  EmptyHint,
  KeywordItem,
  KeywordList,
  MetaList,
  MetaTerm,
  MetaValue,
  ResultsBlock,
  ResultsHeading,
  ResultsSection,
  SubHeading,
  SummaryText,
  TableCell,
  TableHeadCell,
} from './InsightResults.styles';

export type InsightResultsProps = {
  insight: DocumentInsight;
};

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

export function InsightResults({ insight }: InsightResultsProps) {
  const {
    document: doc,
    amounts,
    dates,
    entities,
    keywords,
    keyPoints,
    summary,
  } = insight;

  function handleDownloadClick() {
    downloadInsightJson(insight);
  }

  return (
    <ResultsSection aria-label={RESULTS_COPY.summaryHeading}>
      <ResultsBlock>
        <ResultsHeading>{RESULTS_COPY.documentHeading}</ResultsHeading>
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

      <ResultsBlock>
        <ResultsHeading>{RESULTS_COPY.summaryHeading}</ResultsHeading>
        <SummaryText>{summary}</SummaryText>
      </ResultsBlock>

      <ResultsBlock>
        <ResultsHeading>{RESULTS_COPY.keyPointsHeading}</ResultsHeading>
        {keyPoints.length === 0 ? (
          <EmptyHint>{RESULTS_COPY.emptyList}</EmptyHint>
        ) : (
          <BulletList>
            {keyPoints.map((point, index) => (
              <BulletItem key={`key-point-${index}`}>{point}</BulletItem>
            ))}
          </BulletList>
        )}
      </ResultsBlock>

      <ResultsBlock>
        <ResultsHeading>{RESULTS_COPY.entitiesHeading}</ResultsHeading>
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
      </ResultsBlock>

      <ResultsBlock>
        <ResultsHeading>{RESULTS_COPY.amountsHeading}</ResultsHeading>
        {amounts.length === 0 ? (
          <EmptyHint>{RESULTS_COPY.emptyList}</EmptyHint>
        ) : (
          <DataTable>
            <thead>
              <tr>
                <TableHeadCell scope="col">{RESULTS_COPY.amountValue}</TableHeadCell>
                <TableHeadCell scope="col">{RESULTS_COPY.amountCurrency}</TableHeadCell>
                <TableHeadCell scope="col">{RESULTS_COPY.amountContext}</TableHeadCell>
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
        )}
      </ResultsBlock>

      <ResultsBlock>
        <ResultsHeading>{RESULTS_COPY.datesHeading}</ResultsHeading>
        {dates.length === 0 ? (
          <EmptyHint>{RESULTS_COPY.emptyList}</EmptyHint>
        ) : (
          <DataTable>
            <thead>
              <tr>
                <TableHeadCell scope="col">{RESULTS_COPY.dateValue}</TableHeadCell>
                <TableHeadCell scope="col">{RESULTS_COPY.dateContext}</TableHeadCell>
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
        )}
      </ResultsBlock>

      <ResultsBlock>
        <ResultsHeading>{RESULTS_COPY.keywordsHeading}</ResultsHeading>
        {keywords.length === 0 ? (
          <EmptyHint>{RESULTS_COPY.emptyList}</EmptyHint>
        ) : (
          <KeywordList>
            {keywords.map((keyword, index) => (
              <KeywordItem key={`keyword-${index}`}>{keyword}</KeywordItem>
            ))}
          </KeywordList>
        )}
      </ResultsBlock>

      <DownloadRow>
        <SimpleButton onClick={handleDownloadClick}>
          {RESULTS_COPY.buttonDownloadJson}
        </SimpleButton>
      </DownloadRow>
    </ResultsSection>
  );
}
