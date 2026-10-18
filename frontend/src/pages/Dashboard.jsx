import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";
import { useAuth } from "../auth.jsx";

export default function Dashboard() {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState("");

  async function load() {
    try {
      const data = await api("/api/trips");
      setTrips(data.trips);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function remove(id) {
    if (!confirm("Delete this itinerary?")) return;
    await api(`/api/trips/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <main>
      <div className="section-head">
        <div>
          <p className="eyebrow">Hello, {user.name.split(" ")[0]}</p>
          <h1>Your itineraries</h1>
        </div>
        <Link className="btn" to="/plan">
          New trip
        </Link>
      </div>
      {error && <p className="error">{error}</p>}
      {!trips.length && (
        <article className="card empty">
          <h3>No trips yet</h3>
          <p>Set your taste, then generate a day-by-day plan for a destination.</p>
          <Link className="btn" to="/plan">
            Plan the first one
          </Link>
        </article>
      )}
      <div className="trip-list">
        {trips.map((t) => (
          <article key={t.id} className="trip-row">
            <div>
              <h3>{t.title}</h3>
              <p>
                {t.destination} · {String(t.start_date).slice(0, 10)} → {String(t.end_date).slice(0, 10)} ·{" "}
                {t.travelers} traveler{t.travelers > 1 ? "s" : ""}
              </p>
            </div>
            <div className="row-actions">
              <Link className="btn ghost" to={`/trips/${t.id}`}>
                Open
              </Link>
              <button className="btn danger" onClick={() => remove(t.id)}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
