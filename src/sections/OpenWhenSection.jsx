// Open When Letters Section — Envelope cards with open animation
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { openWhenLetters } from "../data/defaults";

function EnvelopeCard({ letter }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ marginBottom: "24px" }}
    >
      {/* Envelope */}
      <div
        style={{
          background: "var(--glass-bg)",
          backdropFilter: "var(--glass-blur)",
          border: `1px solid ${letter.color}44`,
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        {/* Header / sealed envelope */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            width: "100%",
            background: "none",
            border: "none",
            padding: "28px 32px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            textAlign: "left",
          }}
        >
          {/* Animated envelope icon */}
          <motion.div
            animate={{ rotate: open ? [0, -10, 0] : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: `${letter.color}22`,
              border: `2px solid ${letter.color}66`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.8rem",
              flexShrink: 0,
            }}
          >
            {open ? "📖" : "✉️"}
          </motion.div>

          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: letter.color,
                marginBottom: "6px",
              }}
            >
              {open ? "Reading..." : "Sealed with love"}
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.15rem",
                fontWeight: 700,
                color: "var(--white)",
                margin: 0,
              }}
            >
              {letter.category}
            </h3>
          </div>

          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            style={{ color: "var(--white-40)", fontSize: "1.2rem" }}
          >
            ↓
          </motion.span>
        </button>

        {/* Letter content */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <div
                style={{
                  padding: "0 32px 32px",
                  borderTop: `1px solid ${letter.color}22`,
                }}
              >
                {/* Letter paper */}
                <div
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`,
                    border: `1px solid rgba(255,255,255,0.08)`,
                    borderRadius: "16px",
                    padding: "28px 28px",
                    marginTop: "20px",
                    position: "relative",
                  }}
                >
                  {/* Lines decoration */}
                  {Array.from({ length: 6 }, (_, i) => (
                    <div key={i} style={{
                      position: "absolute",
                      left: "28px", right: "28px",
                      top: `${50 + i * 28}px`,
                      height: "1px",
                      background: "rgba(255,255,255,0.04)",
                    }} />
                  ))}

                  <pre
                    style={{
                      fontFamily: "var(--font-script)",
                      fontSize: "1.15rem",
                      color: "var(--white-90)",
                      whiteSpace: "pre-wrap",
                      lineHeight: 2,
                      margin: 0,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {letter.content}
                  </pre>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function OpenWhenSection() {
  return (
    <section id="letters" className="section section-dark">
      <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "780px" }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="section-title">Open When...</h2>
          <p className="section-subtitle">Letters written from my heart — just for you</p>
          <div className="divider-rose" />
        </motion.div>

        <div style={{ marginTop: "20px" }}>
          {openWhenLetters.map((letter) => (
            <EnvelopeCard key={letter.id} letter={letter} />
          ))}
        </div>
      </div>
    </section>
  );
}
