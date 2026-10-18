import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./auth.jsx";
import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import Auth from "./pages/Auth.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Plan from "./pages/Plan.jsx";
import Trip from "./pages/Trip.jsx";
import Preferences from "./pages/Preferences.jsx";

function Guard({ children }) {
  const { user, ready } = useAuth();
  if (!ready) return <div className="loading">Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth mode="login" />} />
        <Route path="/register" element={<Auth mode="register" />} />
        <Route
          path="/app"
          element={
            <Guard>
              <Dashboard />
            </Guard>
          }
        />
        <Route
          path="/plan"
          element={
            <Guard>
              <Plan />
            </Guard>
          }
        />
        <Route
          path="/trips/:id"
          element={
            <Guard>
              <Trip />
            </Guard>
          }
        />
        <Route
          path="/preferences"
          element={
            <Guard>
              <Preferences />
            </Guard>
          }
        />
      </Route>
    </Routes>
  );
}
