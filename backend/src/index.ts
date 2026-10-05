import { analyzeApi } from './analyze';
import { buildCorsHeaders } from './cors';
import type { Env } from './env';
import { createJsonResponse } from './http';

export type { Env };

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    void env;
    const origin = request.headers.get('Origin');
    const cors = buildCorsHeaders(origin);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: cors });
    }

    const url = new URL(request.url);

    if (url.pathname === '/health' && request.method === 'GET') {
      return createJsonResponse({ ok: true }, 200, origin);
    }

    if (url.pathname === '/analyze' && request.method === 'POST') {
      const result = await analyzeApi(request);

      if (!result.ok) {
        return createJsonResponse({ error: result.error }, result.status, origin);
      }

      return createJsonResponse(result.data, 200, origin);
    }

    return new Response('Not Found', { status: 404, headers: cors });
  },
};
