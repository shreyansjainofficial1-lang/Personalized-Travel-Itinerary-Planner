const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { buildItinerary, listDestinations } = require("../services/planner");

module.exports = function tripRoutes(db) {
  const router = express.Router();

  router.get("/destinations", (_req, res) => {
    res.json({ destinations: listDestinations() });
  });

  router.get("/trips", requireAuth, async (req, res) => {
    const trips = await db.listTrips(req.user.id);
    res.json({ trips });
  });

  router.get("/trips/:id", requireAuth, async (req, res) => {
    const trip = await db.getTrip(req.user.id, req.params.id);
    if (!trip) return res.status(404).json({ error: "Trip not found." });
    res.json({ trip });
  });

  router.post("/trips", requireAuth, async (req, res) => {
    try {
      const { destination, start_date, end_date, budget, travelers, title } = req.body || {};
      if (!destination || !start_date || !end_date) {
        return res.status(400).json({ error: "Destination and dates are required." });
      }
      if (new Date(end_date) < new Date(start_date)) {
        return res.status(400).json({ error: "End date must be on or after start date." });
      }
      const preferences = await db.getPreferences(req.user.id);
      const plan = buildItinerary({
        destinationName: destination,
        startDate: start_date,
        endDate: end_date,
        budget,
        travelers,
        preferences
      });
      const trip = await db.createTripWithItinerary(
        req.user.id,
        {
          title: title || `${plan.destination.name} · ${start_date}`,
          destination: plan.destination.name,
          start_date,
          end_date,
          budget: budget || 0,
          travelers: travelers || 1
        },
        plan.days
      );
      res.status(201).json({ trip, totals: plan.totals });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Could not generate itinerary." });
    }
  });

  router.delete("/trips/:id", requireAuth, async (req, res) => {
    const ok = await db.deleteTrip(req.user.id, req.params.id);
    if (!ok) return res.status(404).json({ error: "Trip not found." });
    res.status(204).end();
  });

  router.patch("/items/:id", requireAuth, async (req, res) => {
    const item = await db.updateItem(req.user.id, req.params.id, req.body || {});
    if (!item) return res.status(404).json({ error: "Item not found." });
    res.json({ item });
  });

  return router;
};
