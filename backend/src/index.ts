import { buildCorsHeaders } from './cors';

export interface Env {
  OPENAI_API_KEY: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const allowedOrigin = 'https://ruslana-p.github.io';
    const cors = (origin: string | null) => buildCorsHeaders(origin, allowedOrigin);

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: cors(request.headers.get('Origin')),
      });
    }

    const url = new URL(request.url);

    if (url.pathname === '/health' && request.method === 'GET') {
      return Response.json(
        { ok: true },
        {
          headers: cors(request.headers.get('Origin')),
        },
      );
    }

    if (url.pathname === '/analyze' && request.method === 'POST') {
      if (!env.OPENAI_API_KEY) {
        return Response.json(
          { error: 'Brak konfiguracji API po stronie serwera.' },
          {
            status: 500,
            headers: cors(request.headers.get('Origin')),
          },
        );
      }

      return Response.json(
        { error: 'Endpoint /analyze — w trakcie implementacji.' },
        {
          status: 501,
          headers: cors(request.headers.get('Origin')),
        },
      );
    }

    return new Response('Not Found', { status: 404 });
  },
};
