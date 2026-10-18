# Deployment (Render)

This repo includes `render.yaml`.

## Blueprint

1. Push the project to GitHub.
2. In Render: **New → Blueprint**, select the repo.
3. Fill `CLIENT_ORIGIN` with the frontend URL once it exists (you can save a placeholder, then update).
4. Render creates:
   - `wayline-db` (Postgres)
   - `wayline-api` (Node web service from `backend/`)
   - `wayline-web` (static site from `frontend/dist`)

## After first deploy

1. Copy the API public URL, e.g. `https://wayline-api.onrender.com`.
2. Static sites cannot proxy `/api` the way Vite does. Either:
   - keep using a reverse proxy, or
   - point the frontend fetch base at the API (set a `VITE_API_URL` at build time if you add one).
3. Set the API `CLIENT_ORIGIN` to the static site URL so CORS allows the browser.

For a simple student demo, the **local JSON store** plus a single Node service that also serves `frontend/dist` is an alternative. The split services in `render.yaml` match a typical API + static hosting layout.

## Health check

`GET https://<api-host>/api/health` should return `{ "ok": true, "storage": "postgres" }`.
