// Admin Dashboard — Manage Firestore text content (timeline events, love reasons, letters)
// Firebase Storage has been removed. Media is served from local src/assets/ folders.
import { useState } from "react";
import { motion } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

// ── Reusable UI helpers ───────────────────────────────────────────────────────

function Section({ title, children }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "20px",
      padding: "28px 28px",
      marginBottom: "24px",
    }}>
      <h3 style={{
        color: "var(--white)",
        fontFamily: "var(--font-display)",
        fontSize: "1.2rem",
        marginBottom: "20px",
      }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, type = "text", multiline }) {
  const style = {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "10px",
    padding: "10px 14px",
    color: "var(--white)",
    fontSize: "0.9rem",
    marginBottom: "12px",
    outline: "none",
    resize: "vertical",
    fontFamily: "var(--font-body)",
  };
  return (
    <div>
      {label && (
        <label style={{
          display: "block", color: "var(--white-70)", fontSize: "0.78rem",
          marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px",
        }}>
          {label}
        </label>
      )}
      {multiline
        ? <textarea rows={4} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={style} />
        : <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={style} />
      }
    </div>
  );
}

// ── Timeline Event ────────────────────────────────────────────────────────────
function TimelineAdd() {
  const [date, setDate]   = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc]   = useState("");
  const [emoji, setEmoji] = useState("❤️");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!title || !date) return;
    setSaving(true);
    try {
      const { getDocs, collection: col } = await import("firebase/firestore");
      const count = (await getDocs(col(db, "timeline"))).size;
      await addDoc(collection(db, "timeline"), {
        date, title, description: desc, emoji,
        order: count + 1,
        createdAt: serverTimestamp(),
      });
      setSaved(true);
      setDate(""); setTitle(""); setDesc(""); setEmoji("❤️");
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Section title="📅 Add Timeline Event">
      <InputField label="Date" value={date} onChange={setDate} placeholder="e.g. March 19, 2026" />
      <InputField label="Title" value={title} onChange={setTitle} placeholder="e.g. The Day We Met" />
      <InputField label="Description" value={desc} onChange={setDesc} placeholder="Describe this memory..." multiline />
      <InputField label="Emoji" value={emoji} onChange={setEmoji} placeholder="❤️" />
      <button onClick={handleSave} disabled={saving} className="btn-romantic" style={{ marginTop: "4px" }}>
        {saved ? "✅ Saved!" : saving ? "Saving..." : "Save Event"}
      </button>
    </Section>
  );
}

// ── Love Reason ───────────────────────────────────────────────────────────────
function LoveReasonAdd() {
  const [id, setId]         = useState("");
  const [reason, setReason] = useState("");
  const [saved, setSaved]   = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!reason) return;
    setSaving(true);
    try {
      await addDoc(collection(db, "loveReasons"), {
        id: Number(id) || Date.now(),
        reason,
        createdAt: serverTimestamp(),
      });
      setSaved(true);
      setId(""); setReason("");
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Section title="❤️ Add / Override Love Reason">
      <InputField label="Reason Number (1–100)" value={id} onChange={setId} type="number" placeholder="e.g. 42" />
      <InputField label="Reason" value={reason} onChange={setReason} placeholder="Because..." multiline />
      <button onClick={handleSave} disabled={saving} className="btn-romantic" style={{ marginTop: "4px" }}>
        {saved ? "✅ Saved!" : saving ? "Saving..." : "Save Reason"}
      </button>
    </Section>
  );
}

// ── Media Instructions Card ───────────────────────────────────────────────────
function MediaInstructions() {
  const items = [
    { icon: "📸", label: "Photos (Gallery)", path: "src/assets/photos/", note: "Any .jpg .png .webp — auto-detected at build time" },
    { icon: "🎬", label: "Video Message", path: "src/assets/videos/", note: "Add file, then follow instructions in videoAssets.js" },
    { icon: "🎙️", label: "Voice Notes", path: "src/assets/audio/", note: "Add .mp3 files, then follow instructions in audioAssets.js" },
  ];

  return (
    <Section title="🗂️ How to Add Media">
      <p style={{ color: "var(--white-70)", fontSize: "0.88rem", marginBottom: "20px", lineHeight: 1.7 }}>
        Media files (photos, videos, audio) are bundled directly with the app.
        No upload required — just drop files into the correct folder and rebuild.
      </p>
      {items.map((item) => (
        <div key={item.label} style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "12px",
          padding: "16px 18px",
          marginBottom: "12px",
          display: "flex",
          alignItems: "flex-start",
          gap: "14px",
        }}>
          <span style={{ fontSize: "1.6rem", flexShrink: 0 }}>{item.icon}</span>
          <div>
            <div style={{ color: "var(--white)", fontWeight: 600, fontSize: "0.92rem", marginBottom: "4px" }}>
              {item.label}
            </div>
            <code style={{ color: "var(--pink-300)", fontSize: "0.82rem", display: "block", marginBottom: "4px" }}>
              📁 {item.path}
            </code>
            <span style={{ color: "var(--white-40)", fontSize: "0.8rem" }}>{item.note}</span>
          </div>
        </div>
      ))}
      <div style={{
        background: "rgba(233,30,99,0.08)",
        border: "1px solid rgba(233,30,99,0.2)",
        borderRadius: "12px",
        padding: "14px 18px",
        marginTop: "8px",
      }}>
        <p style={{ color: "var(--pink-300)", fontSize: "0.85rem", margin: 0, lineHeight: 1.6 }}>
          After adding files, run <code>npm run build</code> and then{" "}
          <code>firebase deploy</code> to publish the updated site.
        </p>
      </div>
    </Section>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { logout } = useAuth();

  return (
    <div style={{ minHeight: "100vh", background: "var(--navy-950)", padding: "32px 24px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: "40px", flexWrap: "wrap", gap: "12px",
        }}>
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem", color: "var(--white)", marginBottom: "4px",
              }}
            >
              ⚙️ Admin Panel
            </motion.h1>
            <p style={{ color: "var(--white-40)", fontSize: "0.85rem" }}>
              Manage content for Moon's Birthday Website
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Link to="/" style={{ color: "var(--pink-300)", fontSize: "0.85rem", textDecoration: "none" }}>
              ← View Site
            </Link>
            <button
              onClick={logout}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "var(--white-70)", padding: "8px 20px",
                borderRadius: "50px", cursor: "pointer", fontSize: "0.85rem",
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Media instructions first */}
          <MediaInstructions />

          {/* Firestore content forms */}
          <TimelineAdd />
          <LoveReasonAdd />
        </motion.div>
      </div>
    </div>
  );
}
