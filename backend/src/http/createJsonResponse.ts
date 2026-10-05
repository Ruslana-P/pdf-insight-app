import { buildCorsHeaders } from '../cors';

export function createJsonResponse(
  data: unknown,
  status: number,
  requestOrigin: string | null,
): Response {
  return Response.json(data, {
    status,
    headers: buildCorsHeaders(requestOrigin),
  });
}
