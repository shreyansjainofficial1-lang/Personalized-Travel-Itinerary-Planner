# Personalized Travel Itinerary Planner

Wayline is a full-stack planner that turns destination, dates, budget, and a traveler’s taste profile into a day-by-day itinerary.

## What it does

- Register and sign in (JWT)
- Save interests, budget level, and pace
- Generate a personalized itinerary for curated cities
- Review a morning / meal / afternoon / evening timeline with estimated costs
- Store trips in PostgreSQL (or a local JSON store when no database is configured)

## Project layout

```
backend/                 Express API
database/schema.sql     PostgreSQL schema
frontend/               React + Vite app
API.md
ARCHITECTURE.md
DEPLOYMENT.md
PROJECT_COMPLETION.md
SETUP.md
render.yaml
```

## Quick start

See **SETUP.md**. In short:

```bash
cd backend && npm install && npm start
cd frontend && npm install && npm run dev
```

Open http://localhost:5173

Without `DATABASE_URL`, the API writes to `backend/data/store.json` so you can demo locally with zero database setup.
