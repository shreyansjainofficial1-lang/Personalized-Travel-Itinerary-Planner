require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createDb } = require("./db");
const authRoutes = require("./routes/auth");
const tripRoutes = require("./routes/trips");

const PORT = process.env.PORT || 5000;
const ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

async function main() {
  const { db, mode } = await createDb();
  const app = express();
  app.use(cors({ origin: ORIGIN, credentials: true }));
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, service: "travel-planner-api", storage: mode });
  });

  app.use("/api", authRoutes(db));
  app.use("/api", tripRoutes(db));

  app.use((req, res) => res.status(404).json({ error: `No route for ${req.method} ${req.path}` }));

  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT} (${mode})`);
  });
}

main().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
