"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [username,    setUsername]    = useState("");
  const [password,    setPassword]    = useState("");
  const [remember,    setRemember]    = useState(false);
  const [showPass,    setShowPass]    = useState(false);
  const [error,       setError]       = useState("");

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
      <div style={topRow}>
        <h1 style={h1}>Admin login</h1>
        <a href="/" style={siteLink}>← Gå til siden</a>
      </div>

      <form onSubmit={onSubmit} style={formStyle}>
        <label>
          <div style={labelText}>Brugernavn</div>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={inputStyle}
            autoComplete="username"
          />
        </label>

        <label>
          <div style={labelText}>Kode</div>
          <div style={passWrap}>
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ ...inputStyle, paddingRight: 44 }}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPass(v => !v)}
              style={eyeBtn}
              title={showPass ? "Skjul kode" : "Vis kode"}
            >
              {showPass ? "🙈" : "👁️"}
            </button>
          </div>
        </label>

        {/* Husk denne browser */}
        <label style={checkRow}>
          <input
            type="checkbox"
            checked={remember}
            onChange={e => setRemember(e.target.checked)}
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

const topRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 24,
};

const h1 = {
  color: "#1f3a2b",
  margin: 0,
  fontSize: 24,
  fontWeight: 800,
};

const siteLink = {
  fontSize: 13,
  color: "#3d7a57",
  textDecoration: "none",
  fontWeight: 600,
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

const passWrap = {
  position: "relative",
};

const eyeBtn = {
  position: "absolute",
  right: 10,
  top: "50%",
  transform: "translateY(-50%)",
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: 16,
  padding: "2px 4px",
  lineHeight: 1,
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
