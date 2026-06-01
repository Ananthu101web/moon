// MusicPlayer — Minimal floating music player (no autoplay)
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer({ src }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  const handleVolume = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
      style={{
        position: "fixed",
        bottom: "24px",
        left: "24px",
        zIndex: 1000,
      }}
    >
      {src && <audio ref={audioRef} src={src} loop />}

      <div
        className="glass-card"
        style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}
      >
        {/* Play/Pause */}
        <button
          onClick={toggle}
          style={{
            background: "var(--gradient-pink)",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            color: "#fff",
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
          title={playing ? "Pause" : "Play"}
        >
          {playing ? "⏸" : "▶"}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 120, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              style={{ overflow: "hidden", display: "flex", alignItems: "center", gap: 8 }}
            >
              <span style={{ fontSize: "0.75rem", color: "var(--white-70)" }}>🎵</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={volume}
                onChange={handleVolume}
                style={{ width: "90px", accentColor: "var(--pink-500)" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: "none",
            border: "none",
            color: "var(--white-70)",
            cursor: "pointer",
            fontSize: "0.8rem",
            padding: "2px 4px",
          }}
          title="Volume"
        >
          {expanded ? "◀" : "🔊"}
        </button>
      </div>

      {!src && (
        <div style={{ fontSize: "0.65rem", color: "var(--white-40)", textAlign: "center", marginTop: 4 }}>
          Add music URL in Admin
        </div>
      )}
    </motion.div>
  );
}
