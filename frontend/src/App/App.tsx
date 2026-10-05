import { useState } from 'react';
import { UploadZone } from '../components/UploadZone';
import { APP_COPY, DOM_IDS } from '../lib/constants';
import { formatFileSize } from '../lib/formatFileSize';
import { validatePdfFile } from '../lib/validatePdfFile';
import { ErrorText, FileInfo, Instructions, Lead, Page, Title } from './App.styles';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const isLoadedFileInvalid = validationError !== null;

  function handleFilePicked(file: File) {
    const result = validatePdfFile(file);

    if (!result.ok) {
      setSelectedFile(null);
      setValidationError(result.error);
      return;
    }

    setValidationError(null);
    setSelectedFile(result.file);
  }

  return (
    <Page>
      <Title>{APP_COPY.title}</Title>
      <Lead>{APP_COPY.lead}</Lead>
      <Instructions>{APP_COPY.instructions}</Instructions>

      <UploadZone
        onFilePicked={handleFilePicked}
        isLoadedFileInvalid={isLoadedFileInvalid}
        uploadErrorElementId={isLoadedFileInvalid ? DOM_IDS.uploadError : undefined}
      />

      {validationError && (
        <ErrorText id={DOM_IDS.uploadError} role="alert">
          {validationError}
        </ErrorText>
      )}

      {selectedFile && !validationError && (
        <FileInfo>
          {APP_COPY.selectedFileLabel} {selectedFile.name} (
          {formatFileSize(selectedFile.size)})
        </FileInfo>
      )}
    </Page>
  );
}

export default App;
