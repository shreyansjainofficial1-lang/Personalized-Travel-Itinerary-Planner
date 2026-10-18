const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const DATA_DIR = path.join(__dirname, "..", "data");
const STORE_FILE = path.join(DATA_DIR, "store.json");

function emptyStore() {
  return { users: [], preferences: [], trips: [], days: [], items: [] };
}

function readStore() {
  if (!fs.existsSync(STORE_FILE)) return emptyStore();
  return JSON.parse(fs.readFileSync(STORE_FILE, "utf8"));
}

function writeStore(store) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2));
}

function now() {
  return new Date().toISOString();
}

class MemoryDb {
  async findUserByEmail(email) {
    return readStore().users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  async findUserById(id) {
    return readStore().users.find((u) => u.id === id) || null;
  }

  async createUser({ name, email, password_hash }) {
    const store = readStore();
    const user = { id: uuid(), name, email: email.toLowerCase(), password_hash, created_at: now() };
    store.users.push(user);
    store.preferences.push({
      user_id: user.id,
      interests: [],
      budget_level: "mid",
      pace: "moderate",
      dietary: "none",
      notes: ""
    });
    writeStore(store);
    return user;
  }

  async getPreferences(userId) {
    return (
      readStore().preferences.find((p) => p.user_id === userId) || {
        user_id: userId,
        interests: [],
        budget_level: "mid",
        pace: "moderate",
        dietary: "none",
        notes: ""
      }
    );
  }

  async upsertPreferences(userId, prefs) {
    const store = readStore();
    const existing = store.preferences.find((p) => p.user_id === userId);
    const next = {
      user_id: userId,
      interests: prefs.interests || [],
      budget_level: prefs.budget_level || "mid",
      pace: prefs.pace || "moderate",
      dietary: prefs.dietary || "none",
      notes: prefs.notes || ""
    };
    if (existing) Object.assign(existing, next);
    else store.preferences.push(next);
    writeStore(store);
    return next;
  }

  async listTrips(userId) {
    return readStore()
      .trips.filter((t) => t.user_id === userId)
      .sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  }

  async getTrip(userId, tripId) {
    const store = readStore();
    const trip = store.trips.find((t) => t.id === tripId && t.user_id === userId);
    if (!trip) return null;
    const days = store.days
      .filter((d) => d.trip_id === tripId)
      .sort((a, b) => a.day_number - b.day_number)
      .map((day) => ({
        ...day,
        items: store.items
          .filter((i) => i.day_id === day.id)
          .sort((a, b) => a.sort_order - b.sort_order)
      }));
    return { ...trip, days };
  }

  async createTripWithItinerary(userId, tripFields, itineraryDays) {
    const store = readStore();
    const trip = {
      id: uuid(),
      user_id: userId,
      title: tripFields.title,
      destination: tripFields.destination,
      start_date: tripFields.start_date,
      end_date: tripFields.end_date,
      budget: Number(tripFields.budget || 0),
      travelers: Number(tripFields.travelers || 1),
      status: "planned",
      created_at: now()
    };
    store.trips.push(trip);
    itineraryDays.forEach((day) => {
      const dayRow = {
        id: uuid(),
        trip_id: trip.id,
        day_number: day.day_number,
        date: day.date,
        theme: day.theme,
        notes: day.notes || ""
      };
      store.days.push(dayRow);
      (day.items || []).forEach((item) => {
        store.items.push({
          id: uuid(),
          day_id: dayRow.id,
          ...item
        });
      });
    });
    writeStore(store);
    return this.getTrip(userId, trip.id);
  }

  async deleteTrip(userId, tripId) {
    const store = readStore();
    const trip = store.trips.find((t) => t.id === tripId && t.user_id === userId);
    if (!trip) return false;
    const dayIds = store.days.filter((d) => d.trip_id === tripId).map((d) => d.id);
    store.items = store.items.filter((i) => !dayIds.includes(i.day_id));
    store.days = store.days.filter((d) => d.trip_id !== tripId);
    store.trips = store.trips.filter((t) => t.id !== tripId);
    writeStore(store);
    return true;
  }

  async updateItem(userId, itemId, patch) {
    const store = readStore();
    const item = store.items.find((i) => i.id === itemId);
    if (!item) return null;
    const day = store.days.find((d) => d.id === item.day_id);
    const trip = store.trips.find((t) => t.id === day?.trip_id && t.user_id === userId);
    if (!trip) return null;
    Object.assign(item, {
      title: patch.title ?? item.title,
      description: patch.description ?? item.description,
      start_time: patch.start_time ?? item.start_time,
      estimated_cost: patch.estimated_cost ?? item.estimated_cost
    });
    writeStore(store);
    return item;
  }
}

class PostgresDb {
  constructor(pool) {
    this.pool = pool;
  }

  async findUserByEmail(email) {
    const { rows } = await this.pool.query("SELECT * FROM users WHERE email = $1", [
      email.toLowerCase()
    ]);
    return rows[0] || null;
  }

  async findUserById(id) {
    const { rows } = await this.pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return rows[0] || null;
  }

  async createUser({ name, email, password_hash }) {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      const { rows } = await client.query(
        `INSERT INTO users (name, email, password_hash)
         VALUES ($1, $2, $3) RETURNING *`,
        [name, email.toLowerCase(), password_hash]
      );
      await client.query(
        `INSERT INTO preferences (user_id) VALUES ($1)`,
        [rows[0].id]
      );
      await client.query("COMMIT");
      return rows[0];
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }

  async getPreferences(userId) {
    const { rows } = await this.pool.query("SELECT * FROM preferences WHERE user_id = $1", [
      userId
    ]);
    return rows[0] || null;
  }

  async upsertPreferences(userId, prefs) {
    const { rows } = await this.pool.query(
      `INSERT INTO preferences (user_id, interests, budget_level, pace, dietary, notes)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (user_id) DO UPDATE SET
         interests = EXCLUDED.interests,
         budget_level = EXCLUDED.budget_level,
         pace = EXCLUDED.pace,
         dietary = EXCLUDED.dietary,
         notes = EXCLUDED.notes
       RETURNING *`,
      [
        userId,
        prefs.interests || [],
        prefs.budget_level || "mid",
        prefs.pace || "moderate",
        prefs.dietary || "none",
        prefs.notes || ""
      ]
    );
    return rows[0];
  }

  async listTrips(userId) {
    const { rows } = await this.pool.query(
      "SELECT * FROM trips WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    return rows;
  }

  async getTrip(userId, tripId) {
    const { rows: trips } = await this.pool.query(
      "SELECT * FROM trips WHERE id = $1 AND user_id = $2",
      [tripId, userId]
    );
    if (!trips[0]) return null;
    const { rows: days } = await this.pool.query(
      "SELECT * FROM itinerary_days WHERE trip_id = $1 ORDER BY day_number",
      [tripId]
    );
    const { rows: items } = await this.pool.query(
      `SELECT i.* FROM itinerary_items i
       JOIN itinerary_days d ON d.id = i.day_id
       WHERE d.trip_id = $1
       ORDER BY i.sort_order`,
      [tripId]
    );
    return {
      ...trips[0],
      days: days.map((day) => ({
        ...day,
        items: items.filter((i) => i.day_id === day.id)
      }))
    };
  }

  async createTripWithItinerary(userId, tripFields, itineraryDays) {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      const { rows } = await client.query(
        `INSERT INTO trips (user_id, title, destination, start_date, end_date, budget, travelers, status)
         VALUES ($1,$2,$3,$4,$5,$6,$7,'planned') RETURNING *`,
        [
          userId,
          tripFields.title,
          tripFields.destination,
          tripFields.start_date,
          tripFields.end_date,
          tripFields.budget || 0,
          tripFields.travelers || 1
        ]
      );
      const trip = rows[0];
      for (const day of itineraryDays) {
        const { rows: dayRows } = await client.query(
          `INSERT INTO itinerary_days (trip_id, day_number, date, theme, notes)
           VALUES ($1,$2,$3,$4,$5) RETURNING *`,
          [trip.id, day.day_number, day.date, day.theme, day.notes || ""]
        );
        for (const item of day.items || []) {
          await client.query(
            `INSERT INTO itinerary_items
             (day_id, time_slot, start_time, title, category, location, description, estimated_cost, duration_minutes, sort_order)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
            [
              dayRows[0].id,
              item.time_slot,
              item.start_time,
              item.title,
              item.category,
              item.location,
              item.description,
              item.estimated_cost,
              item.duration_minutes,
              item.sort_order
            ]
          );
        }
      }
      await client.query("COMMIT");
      return this.getTrip(userId, trip.id);
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }

  async deleteTrip(userId, tripId) {
    const { rowCount } = await this.pool.query(
      "DELETE FROM trips WHERE id = $1 AND user_id = $2",
      [tripId, userId]
    );
    return rowCount > 0;
  }

  async updateItem(userId, itemId, patch) {
    const { rows } = await this.pool.query(
      `UPDATE itinerary_items i SET
         title = COALESCE($3, i.title),
         description = COALESCE($4, i.description),
         start_time = COALESCE($5, i.start_time),
         estimated_cost = COALESCE($6, i.estimated_cost)
       FROM itinerary_days d
       JOIN trips t ON t.id = d.trip_id
       WHERE i.id = $1 AND i.day_id = d.id AND t.user_id = $2
       RETURNING i.*`,
      [
        itemId,
        userId,
        patch.title ?? null,
        patch.description ?? null,
        patch.start_time ?? null,
        patch.estimated_cost ?? null
      ]
    );
    return rows[0] || null;
  }
}

async function createDb() {
  if (process.env.DATABASE_URL) {
    const { Pool } = require("pg");
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false }
    });
    const schema = fs.readFileSync(
      path.join(__dirname, "..", "..", "database", "schema.sql"),
      "utf8"
    );
    await pool.query(schema);
    return { db: new PostgresDb(pool), mode: "postgres" };
  }
  return { db: new MemoryDb(), mode: "local-json" };
}

module.exports = { createDb };
