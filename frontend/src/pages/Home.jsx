import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";
import { useAuth } from "../auth.jsx";

export default function Home() {
  const { user } = useAuth();
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    api("/api/destinations")
      .then((d) => setDestinations(d.destinations))
      .catch(() => {});
  }, []);

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">Personalized travel itinerary planner</p>
        <h1>
          A trip that already
          <br />
          knows your taste.
        </h1>
        <p className="lede">
          Tell Wayline where you are going, how you like to move, and what you never skip.
          It writes a day-by-day plan — meals, museums, viewpoints — matched to your budget
          and pace.
        </p>
        <div className="hero-actions">
          <Link className="btn" to={user ? "/plan" : "/register"}>
            Plan a trip
          </Link>
          <Link className="btn ghost" to={user ? "/app" : "/login"}>
            {user ? "My trips" : "I already have an account"}
          </Link>
        </div>
      </section>

      <section className="grid-3 how">
        {[
          ["01", "Set your taste", "Interests, budget, and pace live in your profile so every new trip starts personal."],
          ["02", "Pick dates & a city", "Choose from curated destinations. We score activities against what you actually like."],
          ["03", "Live the day sheet", "Morning, meal, afternoon, evening — with costs, maps of neighborhoods, and room to edit."]
        ].map(([n, t, d]) => (
          <article key={n} className="card">
            <span className="num">{n}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </article>
        ))}
      </section>

      <section>
        <div className="section-head">
          <h2>Destinations on the board</h2>
          <p>Each city ships with a local catalog of places, not a generic “visit the museum” stub.</p>
        </div>
        <div className="dest-grid">
          {destinations.map((d) => (
            <article key={d.id} className="dest-card" style={{ backgroundImage: `url(${d.image})` }}>
              <div>
                <h3>{d.name}</h3>
                <p>
                  {d.country} · {d.tagline}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
