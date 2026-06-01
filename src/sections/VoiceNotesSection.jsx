// Voice Notes Section — Custom audio player with waveform-style UI
// Audio loaded from src/assets/audioAssets.js (no Firebase Storage)
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import audioAssets, { placeholderAudioNotes } from "../assets/audioAssets";

// Use real audio if added; otherwise fall back to placeholder entries
const notes = audioAssets.length > 0 ? audioAssets : placeholderAudioNotes;

// ── Animated waveform bars ────────────────────────────────────────────────────
function Waveform({ playing }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2px", height: "32px" }}>
      {Array.from({ length: 24 }, (_, b) => (
        <motion.div
          key={b}
          animate={
            playing
              ? { scaleY: [0.3, Math.random() * 0.7 + 0.3, 0.3] }
              : { scaleY: 0.15 }
          }
          transition={
            playing
              ? { duration: 0.5 + Math.random() * 0.3, repeat: Infinity, delay: b * 0.04 }
              : {}
          }
          style={{
            width: "3px", height: "100%",
            background: "var(--gradient-pink)",
            borderRadius: "2px", transformOrigin: "center",
          }}
        />
      ))}
    </div>
  );
}

// ── Single audio player card ──────────────────────────────────────────────────
function AudioCard({ note, index }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");

  const toggle = () => {
    if (!audioRef.current || !note.src) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      // Pause any other playing audio on the page
      document.querySelectorAll("audio").forEach((a) => {
        if (a !== audioRef.current) a.pause();
      });
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const { currentTime: ct, duration } = audioRef.current;
    if (duration) setProgress((ct / duration) * 100);
    const m = Math.floor(ct / 60);
    const s = String(Math.floor(ct % 60)).padStart(2, "0");
    setCurrentTime(`${m}:${s}`);
  };

  const handleEnded = () => {
    setPlaying(false);
    setProgress(0);
    setCurrentTime("0:00");
  };

  const seek = (e) => {
    if (!audioRef.current?.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = ratio * audioRef.current.duration;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass-card"
      style={{
        padding: "20px 24px",
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
        gap: "20px",
      }}
    >
      {/* Hidden audio element — only created when src exists */}
      {note.src && (
        <audio
          ref={audioRef}
          src={note.src}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />
      )}

      {/* Play / Pause button */}
      <button
        onClick={toggle}
        title={note.src ? (playing ? "Pause" : "Play") : "No audio file yet"}
        style={{
          width: "52px", height: "52px", borderRadius: "50%",
          background: note.src ? "var(--gradient-pink)" : "rgba(255,255,255,0.1)",
          border: "none", color: "white", fontSize: "1.1rem",
          cursor: note.src ? "pointer" : "not-allowed",
          flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: note.src ? "0 4px 16px rgba(233,30,99,0.4)" : "none",
          opacity: note.src ? 1 : 0.5,
        }}
      >
        {playing ? "⏸" : "▶"}
      </button>

      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Title */}
        <p style={{
          margin: "0 0 10px",
          fontWeight: 600,
          color: "var(--white)",
          fontSize: "0.95rem",
        }}>
          🎙️ {note.title}
        </p>

        {/* Waveform visualization */}
        <Waveform playing={playing} />

        {/* Progress bar */}
        <div
          onClick={seek}
          style={{
            marginTop: "8px", height: "4px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "2px",
            cursor: note.src ? "pointer" : "default",
          }}
        >
          <div style={{
            width: `${progress}%`, height: "100%",
            background: "var(--gradient-pink)",
            borderRadius: "2px",
            transition: "width 0.3s",
          }} />
        </div>

        {/* Time display */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          marginTop: "4px", fontSize: "0.72rem", color: "var(--white-40)",
        }}>
          <span>{currentTime}</span>
          <span>{note.duration || "--:--"}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function VoiceNotesSection() {
  return (
    <section id="voice" className="section section-dark">
      <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "700px" }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="section-title">Voice Notes</h2>
          <p className="section-subtitle">My voice, always close to your heart</p>
          <div className="divider-rose" />
        </motion.div>

        <div style={{ marginTop: "20px" }}>
          {notes.map((note, i) => (
            <AudioCard key={note.id} note={note} index={i} />
          ))}
        </div>

        {/* Shown when no real audio files have been added yet */}
        {audioAssets.length === 0 && (
          <p style={{
            textAlign: "center", color: "var(--white-40)",
            fontSize: "0.85rem", marginTop: "12px",
          }}>
            Add audio files to{" "}
            <code style={{ color: "var(--pink-300)" }}>src/assets/audio/</code>
            {" "}and follow the instructions in{" "}
            <code style={{ color: "var(--pink-300)" }}>audioAssets.js</code> 🎙️
          </p>
        )}
      </div>
    </section>
  );
}
