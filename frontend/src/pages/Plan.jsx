import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api.js";

export default function Plan() {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [form, setForm] = useState({
    destination: "Kyoto",
    start_date: "",
    end_date: "",
    budget: 800,
    travelers: 1,
    title: ""
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api("/api/destinations").then((d) => setDestinations(d.destinations));
    const start = new Date();
    start.setDate(start.getDate() + 21);
    const end = new Date(start);
    end.setDate(end.getDate() + 3);
    setForm((f) => ({
      ...f,
      start_date: start.toISOString().slice(0, 10),
      end_date: end.toISOString().slice(0, 10)
    }));
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const data = await api("/api/trips", {
        method: "POST",
        body: JSON.stringify(form)
      });
      navigate(`/trips/${data.trip.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="narrow">
      <p className="eyebrow">New itinerary</p>
      <h1>Where to, and when?</h1>
      <p className="lede">
        The planner uses your saved taste profile. Update it first if this trip should feel different.
      </p>
      <form className="stack" onSubmit={onSubmit}>
        <label>
          Destination
          <select
            value={form.destination}
            onChange={(e) => setForm({ ...form, destination: e.target.value })}
          >
            {destinations.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}, {d.country}
              </option>
            ))}
          </select>
        </label>
        <label>
          Trip title (optional)
          <input
            placeholder="Spring in Kyoto"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </label>
        <div className="two">
          <label>
            Start
            <input
              type="date"
              value={form.start_date}
              onChange={(e) => setForm({ ...form, start_date: e.target.value })}
              required
            />
          </label>
          <label>
            End
            <input
              type="date"
              value={form.end_date}
              onChange={(e) => setForm({ ...form, end_date: e.target.value })}
              required
            />
          </label>
        </div>
        <div className="two">
          <label>
            Budget (total, your currency)
            <input
              type="number"
              min="0"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
            />
          </label>
          <label>
            Travelers
            <input
              type="number"
              min="1"
              value={form.travelers}
              onChange={(e) => setForm({ ...form, travelers: Number(e.target.value) })}
            />
          </label>
        </div>
        {error && <p className="error">{error}</p>}
        <button className="btn" disabled={busy}>
          {busy ? "Writing your days…" : "Generate itinerary"}
        </button>
      </form>
    </main>
  );
}
