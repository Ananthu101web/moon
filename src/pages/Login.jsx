// Login Page — Dark romantic glassmorphism login with animated stars
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import StarBackground from "../components/StarBackground";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      setError(
        err.message.includes("Invalid username")
          ? "Hmm, that username doesn't match... 🌙"
          : "Incorrect password, my love. Try again 💕"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--gradient-hero)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "24px",
      }}
    >
      <StarBackground count={250} />

      {/* Floating decorative hearts */}
      {["❤️", "💕", "🌙", "✨", "💫"].map((emoji, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -30, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
          style={{
            position: "absolute",
            left: `${10 + i * 18}%`,
            top: `${15 + (i % 3) * 25}%`,
            fontSize: "1.5rem",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          {emoji}
        </motion.div>
      ))}

      {/* Login card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-card"
        style={{
          position: "relative",
          zIndex: 10,
          padding: "52px 44px",
          width: "100%",
          maxWidth: "420px",
          textAlign: "center",
        }}
      >
        {/* Heart icon */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ fontSize: "3.5rem", marginBottom: "8px" }}
        >
          ❤️
        </motion.div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.9rem",
            fontWeight: 700,
            color: "var(--white)",
            marginBottom: "6px",
          }}
        >
          Welcome, My Love
        </h1>
        <p
          style={{
            fontFamily: "var(--font-script)",
            fontSize: "1.1rem",
            color: "var(--pink-300)",
            marginBottom: "36px",
          }}
        >
          This world was made just for you 🌙
        </p>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div style={{ marginBottom: "16px", textAlign: "left" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "1px",
                color: "var(--white-70)",
                marginBottom: "8px",
                textTransform: "uppercase",
              }}
            >
              Your Name
            </label>
            <input
              id="login-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name..."
              required
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "12px",
                padding: "14px 18px",
                color: "var(--white)",
                fontSize: "1rem",
                outline: "none",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--pink-400)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "24px", textAlign: "left" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "1px",
                color: "var(--white-70)",
                marginBottom: "8px",
                textTransform: "uppercase",
              }}
            >
              Secret Key
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="login-password"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your special key..."
                required
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "12px",
                  padding: "14px 50px 14px 18px",
                  color: "var(--white)",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "border-color 0.3s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--pink-400)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "var(--white-40)",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                color: "var(--pink-300)",
                fontSize: "0.88rem",
                marginBottom: "16px",
                textAlign: "center",
              }}
            >
              {error}
            </motion.p>
          )}

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              width: "100%",
              background: loading ? "rgba(233,30,99,0.5)" : "var(--gradient-pink)",
              border: "none",
              borderRadius: "50px",
              padding: "15px",
              color: "var(--white)",
              fontSize: "1.05rem",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: "0.5px",
              boxShadow: "0 6px 25px rgba(233,30,99,0.4)",
              transition: "background 0.3s",
            }}
          >
            {loading ? "✨ Opening..." : "Enter My World ❤️"}
          </motion.button>
        </form>

        <p
          style={{
            marginTop: "24px",
            fontSize: "0.78rem",
            color: "var(--white-40)",
          }}
        >
          Made with ❤️ just for you
        </p>
      </motion.div>
    </div>
  );
}
