// Navbar — Sticky navigation with smooth scroll links
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", href: "#landing" },
  { label: "Us ❤️", href: "#counter" },
  { label: "Story", href: "#timeline" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reasons", href: "#reasons" },
  { label: "Letters", href: "#letters" },
  { label: "Video", href: "#video" },
  { label: "Voice", href: "#voice" },
  { label: "Distance", href: "#distance" },
  { label: "Gift 🎁", href: "#gift" },
  { label: "Dreams", href: "#dreams" },
];

export default function Navbar({ isAdmin }) {
  const { logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        padding: scrolled ? "8px 24px" : "16px 24px",
        background: scrolled
          ? "rgba(10,10,30,0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
        transition: "all 0.4s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <a
        href="#landing"
        style={{
          fontFamily: "var(--font-script)",
          fontSize: "1.6rem",
          background: "var(--gradient-rose-gold)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textDecoration: "none",
          flexShrink: 0,
        }}
      >
        🌙 Moon
      </a>

      {/* Desktop links */}
      <div className="d-none d-lg-flex" style={{ gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        {NAV_LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            style={{
              color: "var(--white-70)",
              textDecoration: "none",
              fontSize: "0.82rem",
              fontWeight: 500,
              letterSpacing: "0.5px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "var(--pink-300)")}
            onMouseLeave={(e) => (e.target.style.color = "var(--white-70)")}
          >
            {l.label}
          </a>
        ))}
      </div>

      {/* Right actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {isAdmin && (
          <Link
            to="/admin"
            style={{
              color: "var(--gold-400)",
              fontSize: "0.8rem",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Admin ⚙️
          </Link>
        )}
        <button
          onClick={logout}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "50px",
            color: "var(--white-70)",
            padding: "6px 16px",
            fontSize: "0.8rem",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = "var(--pink-400)";
            e.target.style.color = "var(--pink-300)";
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = "rgba(255,255,255,0.2)";
            e.target.style.color = "var(--white-70)";
          }}
        >
          Leave
        </button>

        {/* Hamburger */}
        <button
          className="d-lg-none"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            color: "var(--white)",
            fontSize: "1.4rem",
            cursor: "pointer",
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "rgba(10,10,30,0.97)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "var(--white-80)",
                textDecoration: "none",
                fontSize: "1rem",
                fontWeight: 500,
              }}
            >
              {l.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
