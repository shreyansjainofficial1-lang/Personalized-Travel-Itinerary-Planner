const destinations = require("../data/destinations");

const SLOT_TEMPLATES = {
  relaxed: [
    { time_slot: "morning", start_time: "09:30" },
    { time_slot: "meal", start_time: "13:00" },
    { time_slot: "afternoon", start_time: "16:00" }
  ],
  moderate: [
    { time_slot: "morning", start_time: "09:00" },
    { time_slot: "meal", start_time: "12:30" },
    { time_slot: "afternoon", start_time: "15:00" },
    { time_slot: "evening", start_time: "19:30" }
  ],
  packed: [
    { time_slot: "morning", start_time: "08:30" },
    { time_slot: "meal", start_time: "12:00" },
    { time_slot: "afternoon", start_time: "14:00" },
    { time_slot: "evening", start_time: "18:30" }
  ]
};

const THEMES = {
  culture: "Heritage & museums",
  food: "Local flavors",
  nature: "Outdoors & views",
  adventure: "Active day",
  shopping: "Markets & makers",
  nightlife: "After dark",
  relaxation: "Slow hours"
};

function daysBetween(start, end) {
  const a = new Date(`${start}T00:00:00`);
  const b = new Date(`${end}T00:00:00`);
  const diff = Math.round((b - a) / 86400000);
  return Math.max(1, diff + 1);
}

function addDays(iso, n) {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

function scoreActivity(activity, interests, usedTitles) {
  let score = 1;
  if (interests.includes(activity.category)) score += 4;
  if (usedTitles.has(activity.title)) score -= 8;
  if (activity.category === "food") score += 0.5;
  return score + Math.random() * 0.4;
}

function pick(list, interests, used, fallbackCategory) {
  const ranked = [...list]
    .map((a) => ({ a, s: scoreActivity(a, interests, used) }))
    .sort((x, y) => y.s - x.s);
  const preferred = ranked.find(
    (x) =>
      !used.has(x.a.title) &&
      (interests.includes(x.a.category) || x.a.category === fallbackCategory)
  );
  const next = preferred || ranked.find((x) => !used.has(x.a.title)) || ranked[0];
  return next ? next.a : list[0];
}

function mealFrom(list, used, budgetLevel) {
  const meals = list.filter((a) => a.category === "food");
  const pool = meals.length ? meals : list;
  const activity = pick(pool, ["food"], used, "food");
  return activity;
}

function buildItinerary({ destinationName, startDate, endDate, budget, travelers, preferences }) {
  const dest =
    destinations.find(
      (d) => d.name.toLowerCase() === String(destinationName).toLowerCase()
    ) ||
    destinations.find((d) =>
      String(destinationName).toLowerCase().includes(d.name.toLowerCase())
    ) ||
    destinations[0];

  const interests = Array.isArray(preferences?.interests) && preferences.interests.length
    ? preferences.interests
    : ["culture", "food"];
  const pace = preferences?.pace || "moderate";
  const budgetLevel = preferences?.budget_level || "mid";
  const slots = SLOT_TEMPLATES[pace] || SLOT_TEMPLATES.moderate;
  const totalDays = daysBetween(startDate, endDate);
  const used = new Set();
  const perPersonBudget = Number(budget || 0) / Math.max(1, Number(travelers || 1));
  const dailyCap = perPersonBudget > 0 ? perPersonBudget / totalDays : Infinity;

  const days = [];
  for (let i = 0; i < totalDays; i += 1) {
    const date = addDays(startDate, i);
    const isLast = i === totalDays - 1;
    const isFirst = i === 0;
    const daySlots = isFirst || isLast
      ? slots.filter((s) => s.time_slot !== "morning" || !isFirst).slice(0, isLast ? 3 : slots.length)
      : slots;

    const items = [];
    let running = 0;
    let themeCat = interests[i % interests.length] || "culture";

    daySlots.forEach((slot, index) => {
      const fallback = slot.time_slot === "meal" ? "food" : themeCat;
      const activity =
        slot.time_slot === "meal"
          ? mealFrom(dest.activities, used, budgetLevel)
          : pick(dest.activities, interests, used, fallback);

      used.add(activity.title);
      const cost = Number(activity.cost[budgetLevel] ?? activity.cost.mid ?? 0);
      const scaled = dailyCap < Infinity && running + cost > dailyCap * 1.25
        ? Math.round(cost * 0.6)
        : cost;
      running += scaled;

      items.push({
        time_slot: slot.time_slot,
        start_time: slot.start_time,
        title: activity.title,
        category: activity.category,
        location: activity.location,
        description: activity.description,
        estimated_cost: scaled,
        duration_minutes: activity.duration,
        sort_order: index
      });
    });

    const dominant = items.find((it) => it.category !== "food") || items[0];
    days.push({
      day_number: i + 1,
      date,
      theme: THEMES[dominant?.category] || "City day",
      notes: isFirst
        ? "Ease in: shorter morning, neighborhood orientation."
        : isLast
          ? "Buffer time for departure. Keep the last slot flexible."
          : preferences?.notes || "",
      items
    });
  }

  return {
    destination: dest,
    days,
    totals: {
      days: totalDays,
      estimated_cost: days.reduce(
        (sum, d) => sum + d.items.reduce((s, i) => s + Number(i.estimated_cost), 0),
        0
      )
    }
  };
}

function listDestinations() {
  return destinations.map((d) => ({
    id: d.id,
    name: d.name,
    country: d.country,
    tagline: d.tagline,
    image: d.image,
    activityCount: d.activities.length
  }));
}

module.exports = { buildItinerary, listDestinations, daysBetween };
