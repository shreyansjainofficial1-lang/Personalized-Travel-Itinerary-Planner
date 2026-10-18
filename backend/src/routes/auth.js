const express = require("express");
const bcrypt = require("bcryptjs");
const { requireAuth, signToken, publicUser } = require("../middleware/auth");

module.exports = function authRoutes(db) {
  const router = express.Router();

  router.post("/register", async (req, res) => {
    try {
      const { name, email, password } = req.body || {};
      if (!name || !email || !password) {
        return res.status(400).json({ error: "Name, email, and password are required." });
      }
      if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters." });
      }
      const existing = await db.findUserByEmail(email);
      if (existing) return res.status(409).json({ error: "An account with that email already exists." });
      const password_hash = await bcrypt.hash(password, 10);
      const user = await db.createUser({ name: name.trim(), email, password_hash });
      const token = signToken(user);
      return res.status(201).json({ token, user: publicUser(user) });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Could not create account." });
    }
  });

  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body || {};
      const user = await db.findUserByEmail(email || "");
      if (!user) return res.status(401).json({ error: "Invalid email or password." });
      const ok = await bcrypt.compare(password || "", user.password_hash);
      if (!ok) return res.status(401).json({ error: "Invalid email or password." });
      return res.json({ token: signToken(user), user: publicUser(user) });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Could not sign in." });
    }
  });

  router.get("/me", requireAuth, async (req, res) => {
    const user = await db.findUserById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found." });
    const preferences = await db.getPreferences(user.id);
    return res.json({ user: publicUser(user), preferences });
  });

  router.put("/preferences", requireAuth, async (req, res) => {
    const allowedBudget = ["budget", "mid", "luxury"];
    const allowedPace = ["relaxed", "moderate", "packed"];
    const body = req.body || {};
    const preferences = await db.upsertPreferences(req.user.id, {
      interests: Array.isArray(body.interests) ? body.interests : [],
      budget_level: allowedBudget.includes(body.budget_level) ? body.budget_level : "mid",
      pace: allowedPace.includes(body.pace) ? body.pace : "moderate",
      dietary: body.dietary || "none",
      notes: body.notes || ""
    });
    return res.json({ preferences });
  });

  return router;
};
