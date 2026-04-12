"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError]       = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    const result = await signIn("credentials", {
      username,
      password,
      remember: String(remember),
      redirect: true,
      callbackUrl: "/admin",
    });
    if (result?.error) setError("Login mislykkedes");
  }

  return (
    <main style={page}>
      <h1 style={h1}>Admin login</h1>
      <form onSubmit={onSubmit} style={formStyle}>
        <label>
          <div style={labelText}>Brugernavn</div>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
            autoComplete="username"
          />
        </label>

        <label>
          <div style={labelText}>Kode</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            autoComplete="current-password"
          />
        </label>

        {/* Husk denne browser */}
        <label style={checkRow}>
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            style={checkBox}
          />
          <span style={checkLabel}>Husk denne browser i 30 dage</span>
        </label>

        {error && <div style={errorStyle}>{error}</div>}

        <button type="submit" style={btnStyle}>Log ind</button>
      </form>
    </main>
  );
}

const page = {
  maxWidth: 420,
  margin: "80px auto",
  padding: 24,
  background: "white",
  borderRadius: 16,
  boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
};

const h1 = {
  color: "#1f3a2b",
  marginTop: 0,
  marginBottom: 24,
};

const formStyle = {
  display: "grid",
  gap: 16,
};

const labelText = {
  fontWeight: 700,
  marginBottom: 6,
  color: "#1f3a2b",
  fontSize: 14,
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #cfd8d3",
  boxSizing: "border-box",
  fontSize: 15,
  font: "inherit",
};

const checkRow = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  cursor: "pointer",
};

const checkBox = {
  width: 18,
  height: 18,
  accentColor: "#2f5f43",
  cursor: "pointer",
  flexShrink: 0,
};

const checkLabel = {
  fontSize: 14,
  color: "#33463a",
  userSelect: "none",
};

const errorStyle = {
  color: "#b42318",
  fontSize: 14,
};

const btnStyle = {
  background: "#2f5f43",
  color: "white",
  border: 0,
  padding: "12px 16px",
  borderRadius: 10,
  fontWeight: 700,
  cursor: "pointer",
  fontSize: 15,
};
