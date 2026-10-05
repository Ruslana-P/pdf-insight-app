import { useState } from 'react';
import { analyzeDocument } from '../api/analyzeDocument';
import { AnalysisHistory } from '../components/AnalysisHistory';
import { InsightResults } from '../components/InsightResults';
import { SimpleButton } from '../components/SimpleButton';
import { UploadZone } from '../components/UploadZone';
import {
  loadAnalysisHistory,
  prependAnalysisHistoryEntry,
  removeAnalysisHistoryEntry,
  saveAnalysisHistory,
} from '../lib/analysisHistory/analysisHistoryStorage';
import type { StoredAnalysisEntry } from '../lib/analysisHistory/types';
import { ANALYSIS_COPY, APP_COPY, DOM_IDS } from '../lib/constants';
import { extractPdfText } from '../lib/extractPdfText';
import { formatFileSize } from '../lib/formatFileSize';
import type { DocumentInsight } from '../lib/types/documentInsight';
import { validatePdfFile } from '../lib/validatePdfFile';
import {
  ActionsRow,
  ErrorText,
  FileInfo,
  Instructions,
  Lead,
  Page,
  StatusText,
  Title,
} from './App.styles';

type AnalysisPhase = 'idle' | 'readingPdf' | 'callingApi';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [analysisPhase, setAnalysisPhase] = useState<AnalysisPhase>('idle');
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [insightResult, setInsightResult] = useState<DocumentInsight | null>(null);
  const [historyEntries, setHistoryEntries] = useState<StoredAnalysisEntry[]>(() =>
    loadAnalysisHistory(),
  );

  const isAnalyzing = analysisPhase !== 'idle';
  const isLoadedFileInvalid = validationError !== null;
  const hasValidFile = selectedFile !== null && !validationError;
  const hasAnalysisError = analysisError !== null;

  function persistHistory(entries: StoredAnalysisEntry[]) {
    setHistoryEntries(entries);
    saveAnalysisHistory(entries);
  }

  function resetAnalysisState() {
    setAnalysisPhase('idle');
    setAnalysisError(null);
    setInsightResult(null);
  }

  function handleFilePicked(file: File) {
    const result = validatePdfFile(file);

    if (!result.ok) {
      setSelectedFile(null);
      setValidationError(result.error);
      resetAnalysisState();
      return;
    }

    setValidationError(null);
    setSelectedFile(result.file);
    resetAnalysisState();
  }

  async function handleAnalyzeClick() {
    if (!selectedFile || isAnalyzing) {
      return;
    }

    setAnalysisPhase('readingPdf');
    setAnalysisError(null);
    setInsightResult(null);

    const extraction = await extractPdfText(selectedFile);

    if (!extraction.ok) {
      setAnalysisPhase('idle');
      setAnalysisError(extraction.error);
      return;
    }

    setAnalysisPhase('callingApi');

    const analysis = await analyzeDocument({
      fileName: extraction.fileName,
      pages: extraction.pages,
      text: extraction.text,
    });

    setAnalysisPhase('idle');

    if (!analysis.ok) {
      setAnalysisError(analysis.error);
      return;
    }

    setInsightResult(analysis.data);
    setHistoryEntries((previousEntries) => {
      const nextEntries = prependAnalysisHistoryEntry(previousEntries, analysis.data);
      saveAnalysisHistory(nextEntries);
      return nextEntries;
    });
  }

  function handleRemoveHistoryEntry(entryId: string) {
    persistHistory(removeAnalysisHistoryEntry(historyEntries, entryId));
  }

  function handleClearHistory() {
    persistHistory([]);
  }

  const analyzeButtonLabel = hasAnalysisError
    ? ANALYSIS_COPY.buttonRetry
    : ANALYSIS_COPY.buttonAnalyze;

  const loadingMessage =
    analysisPhase === 'readingPdf'
      ? ANALYSIS_COPY.loadingReadPdf
      : ANALYSIS_COPY.loadingAnalyze;

  return (
    <Page>
      <Title>{APP_COPY.title}</Title>
      <Lead>{APP_COPY.lead}</Lead>
      <Instructions>{APP_COPY.instructions}</Instructions>

      <UploadZone
        onFilePicked={handleFilePicked}
        isInputDisabled={isAnalyzing}
        isLoadedFileInvalid={isLoadedFileInvalid}
        uploadErrorElementId={isLoadedFileInvalid ? DOM_IDS.uploadError : undefined}
      />

      {validationError && (
        <ErrorText id={DOM_IDS.uploadError} role="alert">
          {validationError}
        </ErrorText>
      )}

      {hasValidFile && (
        <FileInfo>
          {APP_COPY.selectedFileLabel} {selectedFile.name} (
          {formatFileSize(selectedFile.size)})
        </FileInfo>
      )}

      {hasValidFile && (
        <ActionsRow>
          <SimpleButton
            isDisabled={isAnalyzing}
            onClick={handleAnalyzeClick}
            ariaDescribedBy={hasAnalysisError ? DOM_IDS.analyzeError : undefined}
          >
            {analyzeButtonLabel}
          </SimpleButton>
        </ActionsRow>
      )}

      {isAnalyzing && <StatusText>{loadingMessage}</StatusText>}

      {analysisError && (
        <ErrorText id={DOM_IDS.analyzeError} role="alert">
          {analysisError}
        </ErrorText>
      )}

      {insightResult && !analysisError && <InsightResults insight={insightResult} />}

      <AnalysisHistory
        entries={historyEntries}
        onRemoveEntry={handleRemoveHistoryEntry}
        onClearHistory={handleClearHistory}
      />
    </Page>
  );
}

export default App;
