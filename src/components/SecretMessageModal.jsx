// SecretMessageModal — Floating heart button that reveals a secret message
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SecretMessageModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating heart button */}
      <motion.button
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 1000,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          border: "none",
          background: "var(--gradient-pink)",
          fontSize: "1.5rem",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(233,30,99,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        title="A secret for you 💌"
      >
        💌
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(6px)",
              zIndex: 2000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
            }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card"
              style={{
                padding: "48px 40px",
                maxWidth: "460px",
                width: "100%",
                textAlign: "center",
                position: "relative",
              }}
            >
              {/* Animated hearts */}
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                style={{ fontSize: "3.5rem", marginBottom: "24px" }}
              >
                ❤️
              </motion.div>

              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.6rem",
                  color: "var(--white)",
                  marginBottom: "20px",
                  fontStyle: "italic",
                }}
              >
                A Secret Just For You
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-script)",
                  fontSize: "1.4rem",
                  color: "var(--pink-300)",
                  lineHeight: 1.9,
                }}
              >
                I love you today,
                <br />
                I love you tomorrow,
                <br />
                and every single day
                <br />
                after that — forever. 🌙
              </p>

              <div
                style={{
                  marginTop: "32px",
                  display: "flex",
                  gap: "12px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {"❤️💕💖💗💞".split("").map((e, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ delay: i * 0.15, duration: 1.2, repeat: Infinity }}
                    style={{ fontSize: "1.4rem" }}
                  >
                    {e}
                  </motion.span>
                ))}
              </div>

              <button
                onClick={() => setOpen(false)}
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
                Close 💕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
