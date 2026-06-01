// Counter Section — Live relationship duration counter
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RELATIONSHIP_START } from "../data/defaults";

function getTimeDiff() {
  const now = new Date();
  const start = RELATIONSHIP_START;
  const diffMs = now - start;

  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours   = Math.floor(totalMinutes / 60);
  const totalDays    = Math.floor(totalHours / 24);

  const years  = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays % 365) / 30);
  const days   = totalDays % 365 % 30;
  const hours  = totalHours % 24;
  const minutes = totalMinutes % 60;

  return { years, months, days, hours, minutes, totalDays };
}

const UNITS = [
  { key: "years",   label: "Years",   icon: "🌹" },
  { key: "months",  label: "Months",  icon: "🌙" },
  { key: "days",    label: "Days",    icon: "⭐" },
  { key: "hours",   label: "Hours",   icon: "💫" },
  { key: "minutes", label: "Minutes", icon: "❤️" },
];

function CounterCard({ icon, label, value, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.7 }}
      whileHover={{ scale: 1.05, y: -6 }}
      className="glass-card"
      style={{
        padding: "32px 20px",
        textAlign: "center",
        flex: "1 1 140px",
        minWidth: "130px",
        maxWidth: "180px",
        border: "1px solid rgba(201,149,107,0.25)",
        cursor: "default",
      }}
    >
      <div style={{ fontSize: "2rem", marginBottom: "10px" }}>{icon}</div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 700,
          background: "var(--gradient-rose-gold)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1,
          marginBottom: "8px",
        }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <div
        style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "var(--white-70)",
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

export default function CounterSection() {
  const [diff, setDiff] = useState(getTimeDiff());

  // Update every minute
  useEffect(() => {
    const timer = setInterval(() => setDiff(getTimeDiff()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="counter" className="section section-darker">
      {/* Background radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(201,149,107,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">We Have Been Together</h2>
          <p className="section-subtitle">Since March 19, 2026 — every second counts</p>
          <div className="divider-rose" />
        </motion.div>

        {/* Counter cards */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
            marginTop: "16px",
          }}
        >
          {UNITS.map((u, i) => (
            <CounterCard key={u.key} index={i} icon={u.icon} label={u.label} value={diff[u.key]} />
          ))}
        </div>

        {/* Total days badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          style={{
            textAlign: "center",
            marginTop: "40px",
          }}
        >
          <div
            className="glass-card"
            style={{
              display: "inline-block",
              padding: "16px 36px",
              border: "1px solid rgba(233,30,99,0.3)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-script)",
                fontSize: "1.3rem",
                color: "var(--pink-300)",
              }}
            >
              {diff.totalDays} beautiful days and counting... ❤️
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
