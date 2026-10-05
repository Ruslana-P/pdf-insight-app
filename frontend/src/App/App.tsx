import { useRef, useState } from 'react';
import { SimpleButton } from '../components/SimpleButton';
import { UploadZone } from '../components/UploadZone';
import { ANALYSIS_COPY, APP_COPY, DOM_IDS } from '../lib/constants';
import { extractPdfText } from '../lib/extractPdfText';
import { formatFileSize } from '../lib/formatFileSize';
import { validatePdfFile } from '../lib/validatePdfFile';
import {
  ActionsRow,
  ErrorText,
  FileInfo,
  Instructions,
  Lead,
  Page,
  StatusText,
  SuccessText,
  Title,
} from './App.styles';

type ExtractionSnapshot = {
  pages: number;
  characterCount: number;
};

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [extractionSnapshot, setExtractionSnapshot] =
    useState<ExtractionSnapshot | null>(null);
  const extractedTextRef = useRef<string | null>(null);

  const isLoadedFileInvalid = validationError !== null;
  const hasValidFile = selectedFile !== null && !validationError;
  const hasAnalysisError = analysisError !== null;

  function resetAnalysisState() {
    setIsAnalyzing(false);
    setAnalysisError(null);
    setExtractionSnapshot(null);
    extractedTextRef.current = null;
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

    setIsAnalyzing(true);
    setAnalysisError(null);
    setExtractionSnapshot(null);
    extractedTextRef.current = null;

    const result = await extractPdfText(selectedFile);

    setIsAnalyzing(false);

    if (!result.ok) {
      setAnalysisError(result.error);
      return;
    }

    extractedTextRef.current = result.text;
    setExtractionSnapshot({
      pages: result.pages,
      characterCount: result.text.length,
    });

    // eslint-disable-next-line no-console -- tymczasowy podgląd ekstrakcji (usuń przed produkcją)
    console.log('[PDF Insight] extracted text:', result.text);
  }

  const analyzeButtonLabel = hasAnalysisError
    ? ANALYSIS_COPY.buttonRetry
    : ANALYSIS_COPY.buttonAnalyze;

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

      {isAnalyzing && <StatusText>{ANALYSIS_COPY.loading}</StatusText>}

      {analysisError && (
        <ErrorText id={DOM_IDS.analyzeError} role="alert">
          {analysisError}
        </ErrorText>
      )}

      {extractionSnapshot && !analysisError && (
        <SuccessText>
          {ANALYSIS_COPY.extractSuccess} {extractionSnapshot.pages},{' '}
          {ANALYSIS_COPY.charactersLabel} {extractionSnapshot.characterCount}
        </SuccessText>
      )}
    </Page>
  );
}

export default App;
