"use client";

import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/admin",          label: "Tilmeldinger" },
  { href: "/admin/arkiv",    label: "Arkiv" },
  { href: "/admin/kalender", label: "Kursuskalender" },
  { href: "/admin/kurser",   label: "Kurser & tekst" },
  { href: "/admin/billeder", label: "Billeder & Videoer" },
  { href: "/admin/brugere",  label: "Admin-brugere" },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const router   = useRouter();
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status]);

  // Close nav when navigating
  useEffect(() => { setNavOpen(false); }, [pathname]);

  if (status === "loading") return null;

  const currentLabel = NAV.find(n => n.href === pathname)?.label ?? "Admin";

  return (
    <div className="admin-wrap">

      {/* ── MOBILE TOP BAR ── */}
      <header className="admin-topbar">
        <button
          className="admin-hamburger"
          onClick={() => setNavOpen(v => !v)}
          aria-label="Åbn menu"
        >
          <span className={`adm-bar ${navOpen ? "adm-top" : ""}`} />
          <span className={`adm-bar ${navOpen ? "adm-mid" : ""}`} />
          <span className={`adm-bar ${navOpen ? "adm-bot" : ""}`} />
        </button>
        <span className="admin-topbar-title">{currentLabel}</span>
        <a href="/" className="admin-topbar-site">← Siden</a>
      </header>

      {/* ── OVERLAY (mobil, når nav er åben) ── */}
      {navOpen && (
        <div className="admin-overlay" onClick={() => setNavOpen(false)} />
      )}

      {/* ── SIDEBAR ── */}
      <aside className={`admin-sidebar ${navOpen ? "admin-sidebar-open" : ""}`}>
        {/* Logo — link til forsiden */}
        <div className="admin-sidebar-logo">
          <a href="/" className="admin-sidebar-name">Træklatreskolen</a>
          <div className="admin-sidebar-sub">Admin</div>
        </div>

        {/* Navigation */}
        <nav className="admin-nav">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`admin-nav-link ${active ? "active" : ""}`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Bruger + log ud */}
        <div className="admin-sidebar-footer">
          <div className="admin-sidebar-user">
            {session?.user?.name || session?.user?.email || "Admin"}
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="admin-logout-btn"
          >
            Log ud →
          </button>
        </div>
      </aside>

      {/* ── INDHOLD ── */}
      <main className="admin-main">
        {children}
      </main>

    </div>
  );
}
