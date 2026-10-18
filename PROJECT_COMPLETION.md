# Project completion

## Objective

Ship a working **Personalized Travel Itinerary Planner**: users save a travel taste profile and receive a stored, day-by-day plan for a chosen city — not a one-shot chatbot transcript.

## Delivered

| Area | Status |
| --- | --- |
| Auth (register / login / JWT) | Done |
| Taste profile (interests, budget, pace) | Done |
| Curated destination catalog (8 cities) | Done |
| Personalized generator (slots, scoring, budget) | Done |
| Persisted trips + nested itinerary | Done |
| Postgres schema + local JSON fallback | Done |
| React itinerary UI | Done |
| API / architecture / setup / deploy docs | Done |
| Render blueprint | Done |

## How personalization works

The engine does not call an external LLM. It scores a city-specific catalog against the signed-in user’s interests, then:

- varies stops per day from **pace**
- keeps a dedicated **meal** slot
- downshifts costs when the daily budget is tight
- eases the first and last day

That keeps the project runnable without paid API keys while still producing different plans for different profiles.

## Stack

- Frontend: React 18, Vite, React Router
- Backend: Node, Express, bcrypt, jsonwebtoken
- Data: PostgreSQL (`database/schema.sql`) or `backend/data/store.json`

## Future work

- Live maps and walking times
- Optional LLM rewrite of day notes
- Shareable public itinerary links
- Calendar export (ICS)
