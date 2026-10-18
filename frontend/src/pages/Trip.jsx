import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api.js";

export default function Trip() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [error, setError] = useState("");

  async function load() {
    try {
      const data = await api(`/api/trips/${id}`);
      setTrip(data.trip);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  const total = useMemo(() => {
    if (!trip) return 0;
    return trip.days.reduce(
      (s, d) => s + d.items.reduce((x, i) => x + Number(i.estimated_cost || 0), 0),
      0
    );
  }, [trip]);

  if (error) {
    return (
      <main>
        <p className="error">{error}</p>
        <Link to="/app">Back to trips</Link>
      </main>
    );
  }
  if (!trip) return <div className="loading">Opening itinerary…</div>;

  return (
    <main>
      <p className="eyebrow">
        <Link to="/app">Trips</Link> / {trip.destination}
      </p>
      <div className="section-head">
        <div>
          <h1>{trip.title}</h1>
          <p className="lede">
            {String(trip.start_date).slice(0, 10)} → {String(trip.end_date).slice(0, 10)} · {trip.travelers}{" "}
            traveler{trip.travelers > 1 ? "s" : ""} · est. {total.toFixed(0)} per person activities
          </p>
        </div>
      </div>
      <div className="timeline">
        {trip.days.map((day) => (
          <section key={day.id} className="day">
            <header>
              <span>Day {day.day_number}</span>
              <h2>{day.theme}</h2>
              <p>
                {String(day.date).slice(0, 10)}
                {day.notes ? ` · ${day.notes}` : ""}
              </p>
            </header>
            <ol>
              {day.items.map((item) => (
                <li key={item.id} className={`slot ${item.time_slot}`}>
                  <time>{item.start_time}</time>
                  <div>
                    <h3>{item.title}</h3>
                    <p>
                      {item.category} · {item.location} · {item.duration_minutes} min · ~
                      {Number(item.estimated_cost).toFixed(0)}
                    </p>
                    <p className="desc">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </main>
  );
}
