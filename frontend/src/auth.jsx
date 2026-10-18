import React, { createContext, useContext, useEffect, useState } from "react";
import { api, getToken, setToken } from "./api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [ready, setReady] = useState(false);

  async function refresh() {
    if (!getToken()) {
      setUser(null);
      setPreferences(null);
      setReady(true);
      return;
    }
    try {
      const data = await api("/api/me");
      setUser(data.user);
      setPreferences(data.preferences);
    } catch {
      setToken(null);
      setUser(null);
    } finally {
      setReady(true);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function login(email, password) {
    const data = await api("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    setToken(data.token);
    await refresh();
  }

  async function register(name, email, password) {
    const data = await api("/api/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password })
    });
    setToken(data.token);
    await refresh();
  }

  function logout() {
    setToken(null);
    setUser(null);
    setPreferences(null);
  }

  return (
    <AuthContext.Provider value={{ user, preferences, setPreferences, ready, login, register, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
