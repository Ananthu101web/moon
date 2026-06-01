// FloatingHearts — Randomly spawns floating heart particles
import { useEffect, useState } from "react";

const EMOJIS = ["❤️", "💕", "💖", "💗", "🌙", "✨", "💫"];

export default function FloatingHearts({ count = 12 }) {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const spawn = () => ({
      id: Math.random(),
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      left: Math.random() * 100,
      size: Math.random() * 1.5 + 0.8,
      duration: Math.random() * 6 + 6,
      delay: Math.random() * 4,
    });

    setHearts(Array.from({ length: count }, spawn));

    const interval = setInterval(() => {
      setHearts((prev) => [...prev.slice(-count + 1), spawn()]);
    }, 2000);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {hearts.map((h) => (
        <span
          key={h.id}
          style={{
            position: "absolute",
            bottom: "-10%",
            left: `${h.left}%`,
            fontSize: `${h.size}rem`,
            animation: `floatUp ${h.duration}s ease-in ${h.delay}s both`,
            userSelect: "none",
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}
