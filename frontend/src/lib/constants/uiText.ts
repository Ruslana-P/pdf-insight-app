export const APP_COPY = {
  title: 'PDF Insight',
  lead: 'Wgraj PDF, aby uzyskać podsumowanie i dane strukturalne.',
  instructions:
    'Przeciągnij plik PDF w okienko poniżej lub kliknij przycisk „Wgraj”, aby wybrać odpowiedni plik (max. 10 MB).',
  selectedFileLabel: 'Wybrany plik:',
} as const;

export const UPLOAD_COPY = {
  dropAreaAriaLabel: 'Obszar upuszczania pliku PDF',
  dropAreaHint: 'Upuść plik PDF tutaj',
  buttonUpload: 'Wgraj',
  buttonRetry: 'Spróbuj ponownie',
} as const;

export const ANALYSIS_COPY = {
  buttonAnalyze: 'Analizuj',
  buttonRetry: 'Spróbuj ponownie',
  loadingReadPdf: 'Wczytywanie tekstu z PDF…',
  loadingAnalyze: 'Analiza dokumentu…',
  summaryHeading: 'Podsumowanie',
  keyPointsHeading: 'Kluczowe informacje',
} as const;

export const API_MESSAGES = {
  missingApiUrl: 'Brak adresu API (VITE_API_URL).',
  networkError: 'Błąd połączenia z serwerem. Spróbuj ponownie.',
  invalidResponse: 'Serwer zwrócił nieprawidłową odpowiedź.',
  analyzeFailed: 'Analiza nie powiodła się. Spróbuj ponownie.',
  invalidInsightSchema:
    'Odpowiedź serwera nie spełnia wymaganego formatu. Spróbuj ponownie.',
} as const;

export const EXTRACTION_MESSAGES = {
  noTextLayer: 'Nie znaleziono warstwy tekstowej. Dokument może być skanem bez OCR.',
  readFailed: 'Nie udało się odczytać pliku PDF. Spróbuj ponownie.',
} as const;

export const VALIDATION_MESSAGES = {
  emptyFile: 'Plik jest pusty.',
  notPdf: 'Dozwolony jest tylko plik PDF.',
  fileTooLarge: 'Plik jest za duży. Maksymalny rozmiar to 10 MB.',
} as const;

export const DOM_IDS = {
  uploadError: 'upload-error',
  analyzeError: 'analyze-error',
} as const;
