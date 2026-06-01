// Gift Box Section — 3D animated gift box with confetti reveal
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const GIFT_MESSAGE =
  "Happy Birthday, my love! 🎂\n\nThis gift is wrapped with every kiss I owe you, every hug I'm saving for when I hold you, and every moment of joy I want to give you.\n\nYou deserve the entire world. Until I can give you that — take this little piece of my heart.\n\nI love you more than words.\n\nForever yours ❤️";

function launchConfetti() {
  const colors = ["#ff4d87", "#c9956b", "#ffffff", "#ffd700", "#ff9800"];

  // Left burst
  confetti({
    particleCount: 80,
    spread: 60,
    origin: { x: 0.2, y: 0.6 },
    colors,
    ticks: 300,
  });
  // Right burst
  confetti({
    particleCount: 80,
    spread: 60,
    origin: { x: 0.8, y: 0.6 },
    colors,
    ticks: 300,
  });
  // Center burst
  setTimeout(() => {
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors,
      startVelocity: 30,
      ticks: 400,
    });
  }, 300);
}

export default function GiftBoxSection() {
  const [opened, setOpened] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleOpen = () => {
    if (opened || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setOpened(true);
      setAnimating(false);
      launchConfetti();
    }, 600);
  };

  return (
    <section id="gift" className="section section-mid" style={{ background: "var(--navy-950)" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(233,30,99,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="container"
        style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: "600px" }}
      >
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="section-title">A Gift Just For You</h2>
          <p className="section-subtitle">Something special is waiting inside 🎁</p>
          <div className="divider-rose" />
        </motion.div>

        {/* Gift box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{ marginTop: "20px" }}
        >
          {!opened ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
              {/* Gift box visual */}
              <motion.div
                animate={animating ? { rotate: [-5, 5, -5, 5, 0], scale: [1, 1.05, 1] } : { y: [0, -10, 0] }}
                transition={animating ? { duration: 0.5 } : { duration: 2.5, repeat: Infinity }}
                style={{
                  width: "160px",
                  height: "160px",
                  position: "relative",
                  cursor: animating ? "default" : "pointer",
                }}
                onClick={handleOpen}
              >
                {/* Box body */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "110px",
                    background: "linear-gradient(135deg, #e91e63, #c2185b)",
                    borderRadius: "8px 8px 16px 16px",
                    boxShadow: "0 8px 32px rgba(233,30,99,0.5)",
                  }}
                >
                  {/* Ribbon vertical */}
                  <div style={{
                    position: "absolute", left: "50%", top: 0, bottom: 0,
                    width: "20px", transform: "translateX(-50%)",
                    background: "rgba(255,255,255,0.3)",
                  }} />
                </div>

                {/* Lid */}
                <motion.div
                  animate={animating ? { rotateX: -120, y: -40 } : {}}
                  transition={{ duration: 0.5 }}
                  style={{
                    position: "absolute",
                    top: "30px",
                    left: "-8px",
                    right: "-8px",
                    height: "40px",
                    background: "linear-gradient(135deg, #f06292, #e91e63)",
                    borderRadius: "12px",
                    transformOrigin: "top",
                    boxShadow: "0 4px 16px rgba(233,30,99,0.4)",
                    zIndex: 2,
                  }}
                >
                  {/* Ribbon horizontal */}
                  <div style={{
                    position: "absolute", left: 0, right: 0, top: "50%",
                    height: "14px", transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.3)",
                  }} />
                </motion.div>

                {/* Bow */}
                <div style={{
                  position: "absolute", top: "10px", left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "2rem", zIndex: 3,
                }}>
                  🎀
                </div>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpen}
                disabled={animating}
                className="btn-romantic"
                style={{ fontSize: "1.1rem", padding: "14px 36px" }}
              >
                {animating ? "✨ Opening..." : "🎁 Open Your Birthday Gift"}
              </motion.button>
            </div>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="glass-card"
                style={{
                  padding: "48px 40px",
                  border: "1px solid rgba(233,30,99,0.4)",
                  background: "linear-gradient(135deg, rgba(233,30,99,0.12), rgba(201,149,107,0.08))",
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ fontSize: "3.5rem", marginBottom: "24px" }}
                >
                  🎂
                </motion.div>

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.8rem",
                    color: "var(--white)",
                    marginBottom: "24px",
                    fontStyle: "italic",
                  }}
                >
                  Happy Birthday, My Love! ❤️
                </h3>

                <pre
                  style={{
                    fontFamily: "var(--font-script)",
                    fontSize: "1.15rem",
                    color: "var(--white-90)",
                    whiteSpace: "pre-wrap",
                    lineHeight: 2,
                    textAlign: "left",
                    margin: "0 auto",
                    maxWidth: "460px",
                  }}
                >
                  {GIFT_MESSAGE}
                </pre>

                <div style={{ marginTop: "32px", display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                  {"🎂🎁🎊🎉🌙❤️".split("").map((e, i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -12, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                      style={{ fontSize: "1.6rem" }}
                    >
                      {e}
                    </motion.span>
                  ))}
                </div>

                <button
                  onClick={() => { setOpened(false); launchConfetti(); }}
                  style={{
                    marginTop: "28px",
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "var(--white-70)",
                    padding: "8px 24px",
                    borderRadius: "50px",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                  }}
                >
                  🎊 Celebrate Again!
                </button>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </section>
  );
}
