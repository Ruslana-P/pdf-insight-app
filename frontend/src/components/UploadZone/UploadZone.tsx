import { useRef, useState, type DragEvent } from 'react';
import { SimpleButton } from '../SimpleButton';
import { UPLOAD_COPY } from '../../lib/constants';
import { PDF_ACCEPT } from '../../lib/validatePdfFile';
import { DropArea, HiddenInput, Root, UploadButtonWrap } from './UploadZone.styles';

export type UploadZoneProps = {
  onFilePicked: (file: File) => void;
  isInputDisabled?: boolean;
  isLoadedFileInvalid?: boolean;
  uploadErrorElementId?: string;
};

export function UploadZone({
  onFilePicked,
  isInputDisabled = false,
  isLoadedFileInvalid = false,
  uploadErrorElementId,
}: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  function openFileDialog() {
    if (isInputDisabled) {
      return;
    }
    inputRef.current?.click();
  }

  function handleFile(file: File | undefined) {
    if (!file || isInputDisabled) {
      return;
    }
    onFilePicked(file);
  }

  function onDragEnter(event: DragEvent) {
    event.preventDefault();
    if (!isInputDisabled) {
      setIsDragActive(true);
    }
  }

  function onDragOver(event: DragEvent) {
    event.preventDefault();
    if (!isInputDisabled) {
      event.dataTransfer.dropEffect = 'copy';
    }
  }

  function onDragLeave(event: DragEvent) {
    event.preventDefault();
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
      return;
    }
    setIsDragActive(false);
  }

  function onDrop(event: DragEvent) {
    event.preventDefault();
    setIsDragActive(false);
    handleFile(event.dataTransfer.files[0]);
  }

  const uploadButtonLabel = isLoadedFileInvalid
    ? UPLOAD_COPY.buttonRetry
    : UPLOAD_COPY.buttonUpload;

  return (
    <Root>
      <HiddenInput
        ref={inputRef}
        type="file"
        accept={PDF_ACCEPT}
        disabled={isInputDisabled}
        onChange={(event) => {
          handleFile(event.target.files?.[0]);
          event.target.value = '';
        }}
      />
      <DropArea
        $isInputDisabled={isInputDisabled}
        $dragActive={isDragActive}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        role="region"
        aria-label={UPLOAD_COPY.dropAreaAriaLabel}
        aria-invalid={isLoadedFileInvalid}
        aria-describedby={uploadErrorElementId}
      >
        {UPLOAD_COPY.dropAreaHint}
      </DropArea>
      <UploadButtonWrap>
        <SimpleButton
          isDisabled={isInputDisabled}
          onClick={openFileDialog}
          ariaDescribedBy={uploadErrorElementId}
        >
          {uploadButtonLabel}
        </SimpleButton>
      </UploadButtonWrap>
    </Root>
  );
}
