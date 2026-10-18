import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./auth.jsx";

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="shell">
      <header className="nav">
        <Link to="/" className="brand">
          <span className="brand-mark">W</span>
          Wayline
        </Link>
        <nav>
          <NavLink to="/" end>
            Home
          </NavLink>
          {user ? (
            <>
              <NavLink to="/app">Trips</NavLink>
              <NavLink to="/plan">Plan</NavLink>
              <NavLink to="/preferences">Taste</NavLink>
              <button
                className="linkish"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Sign in</NavLink>
              <NavLink to="/register" className="pill">
                Start planning
              </NavLink>
            </>
          )}
        </nav>
      </header>
      <Outlet />
      <footer className="foot">
        <p>Wayline — a personalized travel itinerary planner.</p>
        <p>Built for day-by-day trips shaped by your pace, budget, and interests.</p>
      </footer>
    </div>
  );
}
