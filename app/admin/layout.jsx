"use client";

import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const NAV = [
  { href: "/admin",          label: "Tilmeldinger" },
  { href: "/admin/arkiv",    label: "Arkiv" },
  { href: "/admin/kalender", label: "Kursuskalender" },
  { href: "/admin/kurser",   label: "Kurser & tekst" },
  { href: "/admin/billeder", label: "Billeder" },
  { href: "/admin/brugere",  label: "Admin-brugere" },
];

export default function AdminLayout({ children }) {
  const pathname  = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status]);

  if (status === "loading") return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", background: "#f4f7f5", overflow: "hidden" }}>

      {/* Sidebar */}
      <aside style={{
        width: 220, background: "#1f3a2b", display: "flex",
        flexDirection: "column", padding: "28px 0", flexShrink: 0,
        position: "sticky", top: 0, height: "100vh",
      }}>
        {/* Logo/navn */}
        <div style={{ padding: "0 20px 28px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ color: "white", fontWeight: 800, fontSize: 15, lineHeight: 1.3 }}>
            Træklatreskolen
          </div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 }}>
            Admin
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: "16px 12px" }}>
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <a key={item.href} href={item.href} style={{
                display: "block", padding: "10px 12px", borderRadius: 10,
                marginBottom: 2, textDecoration: "none", fontSize: 14, fontWeight: active ? 700 : 400,
                background: active ? "rgba(255,255,255,0.15)" : "transparent",
                color: active ? "white" : "rgba(255,255,255,0.65)",
              }}>
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Bruger + log ud */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginBottom: 10 }}>
            {session?.user?.name || session?.user?.email || "Admin"}
          </div>
          <button onClick={() => signOut({ callbackUrl: "/" })} style={{
            width: "100%", padding: "9px 12px", borderRadius: 10,
            background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.75)",
            border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, textAlign: "left",
          }}>
            Log ud →
          </button>
        </div>
      </aside>

      {/* Indhold */}
      <main style={{ flex: 1, padding: "36px 32px", overflowY: "auto", minWidth: 0 }}>
        {children}
      </main>
    </div>
  );
}
