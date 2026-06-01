// Video Message Section — Cinematic video player
// Video loaded from src/assets/videoAssets.js (no Firebase Storage)
import { useRef } from "react";
import { motion } from "framer-motion";
import { mainVideoSrc, mainVideoPoster } from "../assets/videoAssets";

export default function VideoSection() {
  const videoRef = useRef(null);

  return (
    <section id="video" className="section section-mid" style={{ background: "var(--navy-950)" }}>
      <div
        style={{
          position: "absolute", inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(233,30,99,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="section-title">A Message From My Heart ❤️</h2>
          <p className="section-subtitle">Words that go beyond distance</p>
          <div className="divider-rose" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{ maxWidth: "360px", margin: "0 auto" }}
        >
          {mainVideoSrc ? (
            /* ── Video player — shown when video file is added ── */
            <div style={{
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid rgba(233,30,99,0.3)",
              boxShadow: "0 0 60px rgba(233,30,99,0.15)",
              /* Portrait 9:16 aspect ratio */
              aspectRatio: "9 / 16",
              width: "100%",
              position: "relative",
            }}>
              <video
                ref={videoRef}
                src={mainVideoSrc}
                poster={mainVideoPoster || undefined}
                controls
                playsInline
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          ) : (
            <div
              className="glass-card"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "32px 24px",
                textAlign: "center",
                border: "1px solid rgba(233,30,99,0.2)",
                background:
                  "linear-gradient(135deg, rgba(233,30,99,0.08), rgba(201,149,107,0.06))",
                aspectRatio: "9 / 16",
                width: "100%",
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ fontSize: "4rem", marginBottom: "16px" }}
              >
                🎬
              </motion.div>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.35rem", color: "var(--white)", marginBottom: "12px",
              }}>
                Video Message Coming Soon
              </h3>
              <p style={{
                color: "var(--white-70)",
                fontSize: "0.85rem",
                maxWidth: "280px", margin: "0 auto", lineHeight: 1.6,
              }}>
                Place your video file in{" "}
                <code style={{ color: "var(--pink-300)", fontSize: "0.75rem" }}>
                  src/assets/videos/
                </code>{" "}
                and follow the instructions in{" "}
                <code style={{ color: "var(--pink-300)", fontSize: "0.75rem" }}>
                  src/assets/videoAssets.js
                </code>
                .
              </p>
            </div>
          )}

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            style={{
              textAlign: "center", marginTop: "32px",
              fontFamily: "var(--font-script)", fontSize: "1.3rem",
              color: "var(--pink-300)", fontStyle: "italic",
            }}
          >
            "No matter the miles, my words will always find you." ❤️
          </motion.blockquote>
        </motion.div>
      </div>
    </section>
  );
}
