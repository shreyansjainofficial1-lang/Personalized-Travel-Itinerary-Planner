# Architecture

```
┌─────────────┐     JSON/JWT      ┌──────────────────┐     SQL / JSON     ┌─────────────┐
│ React (Vite)│ ◄──────────────► │ Express REST API │ ◄────────────────► │ PostgreSQL  │
│  frontend/  │   /api proxy     │    backend/      │   DATABASE_URL     │ schema.sql  │
└─────────────┘                  │  planner engine  │                    └─────────────┘
                                 └──────────────────┘
                                          │
                                          ▼
                                 Curated destination
                                 catalogs (in-process)
```

## Frontend

- React 18 + React Router
- Pages: home, auth, dashboard, plan form, itinerary timeline, taste profile
- Talks to the API through Vite’s `/api` proxy in development

## Backend

- `src/server.js` — Express, CORS, JSON
- `src/routes/auth.js` — register, login, me, preferences
- `src/routes/trips.js` — destinations, CRUD-ish trips, item edits
- `src/middleware/auth.js` — JWT
- `src/services/planner.js` — day-sheet generator
- `src/db.js` — PostgreSQL when `DATABASE_URL` is set; otherwise `backend/data/store.json`

## Planner

1. Resolve destination to a curated city catalog.
2. Compute trip length from dates.
3. Choose slot template from pace (`relaxed` / `moderate` / `packed`).
4. Score activities by interest overlap, avoid repeats, keep a meal slot each day.
5. Soft-cap estimated costs against budget / travelers / days.
6. Persist nested days and items in one transaction (or one JSON write).

## Data model

See `database/schema.sql`.

- `users` — accounts
- `preferences` — 1:1 taste profile
- `trips` — header (destination, dates, budget)
- `itinerary_days` — themed days
- `itinerary_items` — timed stops

## Security notes

- Passwords hashed with bcrypt
- JWT in `Authorization` header (not cookies)
- Trip and item mutations are scoped to `user_id`
- `.env` files are gitignored
