// Love Reasons Section — 100 flip cards with search functionality
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { loveReasons } from "../data/defaults";

function FlipCard({ index, reason }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 10) * 0.04 }}
      onClick={() => setFlipped(!flipped)}
      style={{
        width: "100%",
        aspectRatio: "1",
        perspective: "1000px",
        cursor: "pointer",
        minHeight: "120px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            background: "var(--glass-bg)",
            backdropFilter: "var(--glass-blur)",
            border: "1px solid rgba(233,30,99,0.2)",
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "1.4rem", marginBottom: "6px" }}>❤️</div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.85rem",
              fontWeight: 700,
              background: "var(--gradient-rose-gold)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Reason #{index + 1}
          </div>
          <div
            style={{
              fontSize: "0.65rem",
              color: "var(--white-40)",
              marginTop: "4px",
            }}
          >
            tap to reveal
          </div>
        </div>

        {/* Back */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg, rgba(233,30,99,0.2), rgba(201,149,107,0.15))",
            border: "1px solid rgba(233,30,99,0.4)",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "14px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "0.78rem",
              color: "var(--white-90)",
              lineHeight: 1.5,
              margin: 0,
              fontStyle: "italic",
            }}
          >
            {reason}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function LoveReasonsSection() {
  const [search, setSearch] = useState("");

  const filtered = loveReasons
    .map((r, i) => ({ reason: r, index: i }))
    .filter(
      ({ reason, index }) =>
        reason.toLowerCase().includes(search.toLowerCase()) ||
        String(index + 1).includes(search)
    );

  return (
    <section id="reasons" className="section section-darker">
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="section-title">100 Reasons I Love You</h2>
          <p className="section-subtitle">Tap each card to reveal a reason from my heart</p>
          <div className="divider-rose" />
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ maxWidth: "400px", margin: "0 auto 40px" }}
        >
          <input
            type="text"
            placeholder="🔍  Search reasons or numbers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50px",
              padding: "12px 24px",
              color: "var(--white)",
              fontSize: "0.9rem",
              outline: "none",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--pink-400)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
          />
        </motion.div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
            gap: "12px",
          }}
        >
          {filtered.map(({ reason, index }) => (
            <FlipCard key={index} index={index} reason={reason} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ textAlign: "center", color: "var(--white-40)", marginTop: "40px" }}>
            No reasons found for "{search}" 💕
          </p>
        )}
      </div>
    </section>
  );
}
