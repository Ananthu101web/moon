// Final Section — Emotional full-screen ending with fireworks and falling hearts
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import StarBackground from "../components/StarBackground";

const LINES = [
  "Happy Birthday, My Love ❤️",
  "Thank you for being the most beautiful part of my life.",
  "No matter how many miles separate us,",
  "you will always be close to my heart.",
  "I love you endlessly.",
  "— Forever Yours 🌙",
];

function FallingHearts() {
  const hearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 6,
    duration: Math.random() * 4 + 5,
    size: Math.random() * 1.2 + 0.6,
    emoji: ["❤️", "💕", "💖", "💗", "🌙"][Math.floor(Math.random() * 5)],
  }));

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 1 }}>
      {hearts.map((h) => (
        <span
          key={h.id}
          style={{
            position: "absolute",
            left: `${h.left}%`,
            top: "-5%",
            fontSize: `${h.size}rem`,
            animation: `fall ${h.duration}s linear ${h.delay}s infinite`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}

export default function FinalSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          setVisible(true);
          // Launch fireworks
          const colors = ["#ff4d87", "#c9956b", "#ffffff", "#ffd700"];
          const fire = () => {
            confetti({ particleCount: 60, spread: 70, origin: { x: 0.3, y: 0.5 }, colors });
            confetti({ particleCount: 60, spread: 70, origin: { x: 0.7, y: 0.5 }, colors });
          };
          fire();
          setTimeout(fire, 1000);
          setTimeout(fire, 2000);
        }
      },
      { threshold: 0.4 }
    );
    const el = document.getElementById("final");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <section
      id="final"
      style={{
        minHeight: "100vh",
        background: "var(--gradient-hero)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "80px 24px",
      }}
    >
      <StarBackground count={300} />
      <FallingHearts />

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(233,30,99,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: "720px" }}>
        {/* Moon icon */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ fontSize: "4rem", marginBottom: "32px" }}
        >
          🌙
        </motion.div>

        {/* Staggered text lines */}
        {LINES.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.35, duration: 0.8 }}
            style={{
              fontFamily: i === 0 || i === LINES.length - 1
                ? "var(--font-display)"
                : "var(--font-script)",
              fontSize:
                i === 0
                  ? "clamp(2rem, 5vw, 3.5rem)"
                  : i === LINES.length - 1
                  ? "clamp(1.2rem, 3vw, 1.8rem)"
                  : "clamp(1rem, 2.5vw, 1.4rem)",
              fontWeight: i === 0 ? 700 : 400,
              color:
                i === 0
                  ? "transparent"
                  : i === LINES.length - 1
                  ? "var(--rose-gold-300)"
                  : "var(--white-90)",
              background: i === 0 ? "linear-gradient(135deg, #ffffff 30%, #ffa0c5 70%, #c9956b 100%)" : "none",
              WebkitBackgroundClip: i === 0 ? "text" : "unset",
              backgroundClip: i === 0 ? "text" : "unset",
              WebkitTextFillColor: i === 0 ? "transparent" : "unset",
              marginBottom: i === 0 ? "24px" : "12px",
              lineHeight: 1.5,
              fontStyle: i > 0 && i < LINES.length - 1 ? "italic" : "normal",
            }}
          >
            {line}
          </motion.p>
        ))}

        {/* Animated hearts */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2.5 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            marginTop: "40px",
            flexWrap: "wrap",
          }}
        >
          {"❤️💕💖💗💞🌙✨".split("").map((e, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -12, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              style={{ fontSize: "2rem" }}
            >
              {e}
            </motion.span>
          ))}
        </motion.div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 3 }}
          style={{
            marginTop: "48px",
            padding: "20px 32px",
            display: "inline-block",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "50px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "1.3rem",
              color: "var(--white-70)",
            }}
          >
            Made with ❤️ for the most beautiful person in my world
          </span>
        </motion.div>
      </div>
    </section>
  );
}
