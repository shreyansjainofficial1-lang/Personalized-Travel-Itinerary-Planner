import React, { useState } from "react";
import { api } from "../api.js";
import { useAuth } from "../auth.jsx";

const INTERESTS = ["culture", "food", "nature", "adventure", "shopping", "nightlife", "relaxation"];

export default function Preferences() {
  const { preferences, setPreferences } = useAuth();
  const [form, setForm] = useState(
    preferences || {
      interests: ["culture", "food"],
      budget_level: "mid",
      pace: "moderate",
      dietary: "none",
      notes: ""
    }
  );
  const [saved, setSaved] = useState("");
  const [error, setError] = useState("");

  React.useEffect(() => {
    if (preferences) {
      setForm({
        interests: preferences.interests || [],
        budget_level: preferences.budget_level || "mid",
        pace: preferences.pace || "moderate",
        dietary: preferences.dietary || "none",
        notes: preferences.notes || ""
      });
    }
  }, [preferences]);

  function toggle(tag) {
    const interests = form.interests.includes(tag)
      ? form.interests.filter((t) => t !== tag)
      : [...form.interests, tag];
    setForm({ ...form, interests });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const data = await api("/api/preferences", {
        method: "PUT",
        body: JSON.stringify(form)
      });
      setPreferences(data.preferences);
      setSaved("Taste profile saved. New trips will use it.");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="narrow">
      <p className="eyebrow">Taste profile</p>
      <h1>How do you like to travel?</h1>
      <form className="stack" onSubmit={onSubmit}>
        <fieldset>
          <legend>Interests</legend>
          <div className="chips">
            {INTERESTS.map((tag) => (
              <button
                type="button"
                key={tag}
                className={form.interests.includes(tag) ? "chip on" : "chip"}
                onClick={() => toggle(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </fieldset>
        <label>
          Budget level
          <select
            value={form.budget_level}
            onChange={(e) => setForm({ ...form, budget_level: e.target.value })}
          >
            <option value="budget">Budget</option>
            <option value="mid">Mid-range</option>
            <option value="luxury">Luxury</option>
          </select>
        </label>
        <label>
          Pace
          <select value={form.pace} onChange={(e) => setForm({ ...form, pace: e.target.value })}>
            <option value="relaxed">Relaxed (3 stops)</option>
            <option value="moderate">Moderate (4 stops)</option>
            <option value="packed">Packed (4 denser stops)</option>
          </select>
        </label>
        <label>
          Dietary notes
          <input
            value={form.dietary}
            onChange={(e) => setForm({ ...form, dietary: e.target.value })}
            placeholder="vegetarian, no shellfish…"
          />
        </label>
        <label>
          Anything else
          <textarea
            rows={3}
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="I collect bookshops. I dislike crowded viewpoints."
          />
        </label>
        {error && <p className="error">{error}</p>}
        {saved && <p className="ok">{saved}</p>}
        <button className="btn">Save profile</button>
      </form>
    </main>
  );
}
