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

## Deploy

### Backend (Cloudflare Worker)

```bash
cd backend
npx wrangler login
npx wrangler secret put GEMINI_API_KEY
npm run deploy
```

### Frontend (GitHub Pages)

1. Repo **Settings → Pages → Build and deployment**: source **GitHub Actions**.
2. Push to `main` — workflow `.github/workflows/deploy-pages.yml` builds `frontend/` with `VITE_API_URL` and publishes `dist/`.
3. Optional: override API URL with repo variable **`VITE_API_URL`** (Settings → Secrets and variables → Actions → Variables).

## Git hooks (Husky)

From repo root after `npm install`:

- **pre-commit** — Prettier + ESLint on staged `frontend/**` and `backend/**` files
- **pre-push** — `npm run test` (Vitest in frontend and backend)

```bash
npm run lint          # both packages
npm run test          # both packages
```
