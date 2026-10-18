# Setup

## Requirements

- Node.js 18+
- Optional: PostgreSQL 14+ (Neon, Render, or local)

## 1. Backend

```bash
cd backend
copy .env.example .env   # Windows
# cp .env.example .env   # macOS / Linux
npm install
npm start
```

API: http://localhost:5000/api/health

Leave `DATABASE_URL` empty for a local JSON store. To use Postgres:

1. Create a database.
2. `DATABASE_URL` is enough — the API applies `database/schema.sql` on boot.
3. On managed Postgres, keep SSL on (default). Locally you may set `DATABASE_SSL=false`.

## 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

App: http://localhost:5173

Vite proxies `/api` to the backend, so you do not need a frontend `.env` for local work.

## First use

1. Register an account.
2. Open **Taste** and pick interests / pace / budget.
3. Open **Plan**, choose a city and dates, generate.
4. Read the day sheet; delete from **Trips** if you want a redo.

## Production env

| Variable | Where | Purpose |
| --- | --- | --- |
| `PORT` | backend | Bind port (Render sets this) |
| `JWT_SECRET` | backend | Sign tokens |
| `CLIENT_ORIGIN` | backend | Allowed CORS origin (frontend URL) |
| `DATABASE_URL` | backend | Postgres connection string |
