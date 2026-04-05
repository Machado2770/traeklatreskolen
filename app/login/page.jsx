"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    const result = await signIn("credentials", {
      username,
      password,
      redirect: true,
      callbackUrl: "/admin",
    });
    if (result?.error) setError("Login mislykkedes");
  }

  return (
    <main style={{ maxWidth: 420, margin: "80px auto", padding: 24, background: "white", borderRadius: 16, boxShadow: "0 6px 24px rgba(0,0,0,0.08)" }}>
      <h1 style={{ color: "#1f3a2b", marginTop: 0 }}>Admin login</h1>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 14 }}>
        <label>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Brugernavn</div>
          <input value={username} onChange={(e) => setUsername(e.target.value)} style={inputStyle} />
        </label>
        <label>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Kode</div>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
        </label>
        {error ? <div style={{ color: "#b42318" }}>{error}</div> : null}
        <button type="submit" style={btnStyle}>Log ind</button>
      </form>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #cfd8d3",
  boxSizing: "border-box",
};

const btnStyle = {
  background: "#2f5f43",
  color: "white",
  border: 0,
  padding: "12px 16px",
  borderRadius: 10,
  fontWeight: 700,
  cursor: "pointer",
};
