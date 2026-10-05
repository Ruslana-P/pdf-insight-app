import { useState } from 'react';
import { analyzeDocument } from '../api/analyzeDocument';
import { ANALYSIS_COPY } from './constants';
import { extractPdfText } from './extractPdfText';
import type { DocumentInsight } from './types/documentInsight';
import { validatePdfFile } from './validatePdfFile';

type AnalysisPhase = 'idle' | 'readingPdf' | 'callingApi';

type UseDocumentAnalysisOptions = {
  onAnalysisSuccess: (insight: DocumentInsight) => void;
};

export function useDocumentAnalysis({ onAnalysisSuccess }: UseDocumentAnalysisOptions) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [analysisPhase, setAnalysisPhase] = useState<AnalysisPhase>('idle');
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [insightResult, setInsightResult] = useState<DocumentInsight | null>(null);

  const isAnalyzing = analysisPhase !== 'idle';
  const isLoadedFileInvalid = validationError !== null;
  const hasValidFile = selectedFile !== null && !validationError;
  const hasAnalysisError = analysisError !== null;

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
    onAnalysisSuccess(analysis.data);
  }

  const analyzeButtonLabel = hasAnalysisError
    ? ANALYSIS_COPY.buttonRetry
    : ANALYSIS_COPY.buttonAnalyze;

  const loadingMessage =
    analysisPhase === 'readingPdf'
      ? ANALYSIS_COPY.loadingReadPdf
      : ANALYSIS_COPY.loadingAnalyze;

  return {
    selectedFile,
    validationError,
    analysisError,
    insightResult,
    isAnalyzing,
    isLoadedFileInvalid,
    hasValidFile,
    hasAnalysisError,
    analyzeButtonLabel,
    loadingMessage,
    handleFilePicked,
    handleAnalyzeClick,
  };
}
