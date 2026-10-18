# API

Base URL (local): `http://localhost:5000/api`

Authenticated routes expect:

```
Authorization: Bearer <jwt>
```

## Health

`GET /health`

Returns `{ ok, service, storage }` where `storage` is `postgres` or `local-json`.

## Auth

| Method | Path | Body | Notes |
| --- | --- | --- | --- |
| POST | `/register` | `{ name, email, password }` | Returns `{ token, user }` |
| POST | `/login` | `{ email, password }` | Returns `{ token, user }` |
| GET | `/me` | — | Current user + preferences |
| PUT | `/preferences` | `{ interests[], budget_level, pace, dietary, notes }` | `budget_level`: budget \| mid \| luxury. `pace`: relaxed \| moderate \| packed |

## Destinations & trips

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/destinations` | Public catalog used by the planner |
| GET | `/trips` | List current user's trips |
| POST | `/trips` | `{ destination, start_date, end_date, budget, travelers, title? }` generates and stores an itinerary |
| GET | `/trips/:id` | Trip with nested `days[].items[]` |
| DELETE | `/trips/:id` | Removes trip and itinerary |
| PATCH | `/items/:id` | `{ title?, description?, start_time?, estimated_cost? }` |

## Example: create a trip

```http
POST /api/trips
Content-Type: application/json
Authorization: Bearer …

{
  "destination": "Kyoto",
  "start_date": "2026-04-10",
  "end_date": "2026-04-13",
  "budget": 900,
  "travelers": 2,
  "title": "Cherry week"
}
```

The planner scores each city’s activity catalog against the user’s interests, respects pace (slots per day), and scales activity costs toward the remaining daily budget.
