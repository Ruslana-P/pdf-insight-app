export function buildCorsHeaders(
  origin: string | null,
  allowedOrigin: string,
): Record<string, string> {
  return {
    'Access-Control-Allow-Origin':
      origin && origin === allowedOrigin ? origin : allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}
