// Landing Section — Full-screen hero with stars, floating hearts, animated text
import { motion } from "framer-motion";
import StarBackground from "../components/StarBackground";
import FloatingHearts from "../components/FloatingHearts";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.25, duration: 0.8, ease: "easeOut" },
  }),
};

export default function LandingSection() {
  return (
    <section
      id="landing"
      style={{
        minHeight: "100vh",
        background: "var(--gradient-hero)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <StarBackground count={300} />
      <FloatingHearts count={16} />

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(233,30,99,0.18) 0%, transparent 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "40px 24px",
        }}
      >
        {/* Date badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          style={{
            display: "inline-block",
            background: "rgba(233,30,99,0.2)",
            border: "1px solid rgba(233,30,99,0.4)",
            borderRadius: "50px",
            padding: "6px 20px",
            fontSize: "0.8rem",
            color: "var(--pink-300)",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "28px",
            fontWeight: 600,
          }}
        >
          ✨ June 2, 2005 ✨
        </motion.div>

        {/* Main title */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: "20px",
            background: "linear-gradient(135deg, #ffffff 30%, #ffa0c5 70%, #c9956b 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Happy Birthday
          <br />
          <span style={{ fontStyle: "italic" }}>My Love ❤️</span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="divider-rose"
          style={{ margin: "0 auto 24px" }}
        />

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2.5}
          style={{
            fontFamily: "var(--font-script)",
            fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
            color: "var(--white-70)",
            maxWidth: "560px",
            margin: "0 auto 40px",
            lineHeight: 1.7,
          }}
        >
          Every moment with you is my favorite memory.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3.5}
          style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}
        >
          <a href="#timeline" className="btn-romantic">
            Begin Our Story 📖
          </a>
          <a href="#gift" className="btn-outline-romantic">
            Open Your Surprise 🎁
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 3, duration: 1.5, repeat: Infinity }}
          style={{
            marginTop: "60px",
            color: "var(--white-40)",
            fontSize: "0.85rem",
            letterSpacing: "1px",
          }}
        >
          scroll to explore ↓
        </motion.div>
      </div>
    </section>
  );
}
