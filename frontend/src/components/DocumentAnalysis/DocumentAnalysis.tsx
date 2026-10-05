import { APP_COPY, DOM_IDS } from '../../lib/constants';
import { formatFileSize } from '../../lib/formatFileSize';
import type { DocumentInsight } from '../../lib/types/documentInsight';
import { useDocumentAnalysis } from '../../lib/useDocumentAnalysis';
import { InsightResults } from '../InsightResults';
import { SimpleButton } from '../SimpleButton';
import { UploadZone } from '../UploadZone';
import {
  ActionsRow,
  ErrorText,
  FileInfo,
  Instructions,
  StatusText,
} from './DocumentAnalysis.styles';

export type DocumentAnalysisProps = {
  onAnalysisSuccess: (insight: DocumentInsight) => void;
};

export function DocumentAnalysis({ onAnalysisSuccess }: DocumentAnalysisProps) {
  const {
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
  } = useDocumentAnalysis({ onAnalysisSuccess });

  return (
    <>
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

      {hasValidFile && selectedFile && (
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

      {insightResult && !analysisError && (
        <InsightResults
          key={`${insightResult.document.fileName}-${insightResult.summary}`}
          insight={insightResult}
        />
      )}
    </>
  );
}
