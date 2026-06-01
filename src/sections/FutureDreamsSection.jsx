// Future Dreams Section — Animated dream board cards
import { motion } from "framer-motion";
import { futureDreams } from "../data/defaults";

function DreamCard({ dream, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
      whileHover={{ y: -12, scale: 1.02 }}
      style={{
        borderRadius: "24px",
        overflow: "hidden",
        position: "relative",
        cursor: "default",
        background: dream.color,
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* Glass overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.25)",
          backdropFilter: "blur(2px)",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, padding: "32px 28px" }}>
        {/* Icon */}
        <div style={{ fontSize: "2.8rem", marginBottom: "16px" }}>{dream.icon}</div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "var(--white)",
            marginBottom: "20px",
            lineHeight: 1.3,
          }}
        >
          {dream.title}
        </h3>

        {/* Items */}
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {dream.items.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 + i * 0.08 }}
              style={{
                color: "rgba(255,255,255,0.9)",
                fontSize: "0.9rem",
                padding: "6px 0",
                borderBottom: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.7rem" }}>✦</span>
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function FutureDreamsSection() {
  return (
    <section id="dreams" className="section section-dark">
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="section-title">Our Future Dreams</h2>
          <p className="section-subtitle">Everything we'll build together — just wait ✨</p>
          <div className="divider-rose" />
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
            marginTop: "20px",
          }}
        >
          {futureDreams.map((dream, i) => (
            <DreamCard key={dream.id} dream={dream} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          style={{
            textAlign: "center",
            marginTop: "48px",
            fontFamily: "var(--font-script)",
            fontSize: "1.4rem",
            color: "var(--pink-300)",
          }}
        >
          "The best is yet to come, my love." 🌙
        </motion.p>
      </div>
    </section>
  );
}
