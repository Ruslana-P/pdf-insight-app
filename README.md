# PDF Insight

Monorepo for the Vibe Coder recruitment task.

## Structure

- `frontend/` — React + TypeScript (Vite), deployed to GitHub Pages
- `backend/` — Cloudflare Worker API proxy (LLM key stays on the server)

## Local development

```bash
cd frontend && npm install && npm run dev
cd backend && npm install && npm run dev
```

Demo URL (after deploy): `https://ruslana-p.github.io/pdf-insight-app/`
