// Gallery Section — Masonry photo grid with lightbox
// Media loaded from src/assets/photos/ via galleryImages.js (no Firebase Storage)
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import galleryImages from "../assets/galleryImages";

// Placeholder grid cards when no photos have been added yet
const PLACEHOLDER_ITEMS = Array.from({ length: 9 }, (_, i) => ({
  id: `placeholder-${i}`,
  src: null,
  caption: `Memory #${i + 1}`,
  alt: `Memory ${i + 1}`,
}));

function LightboxModal({ item, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.92)",
        backdropFilter: "blur(10px)",
        zIndex: 3000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
        style={{ position: "relative", maxWidth: "90vw", maxHeight: "85vh" }}
      >
        {item.src ? (
          <img
            src={item.src}
            alt={item.alt || item.caption}
            style={{
              maxWidth: "100%", maxHeight: "80vh",
              borderRadius: "16px",
              objectFit: "contain",
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              width: "400px", height: "300px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "16px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "4rem",
            }}
          >
            📸
          </div>
        )}
        {item.caption && (
          <p style={{
            textAlign: "center", color: "var(--white-70)", marginTop: "12px",
            fontFamily: "var(--font-script)", fontSize: "1.1rem",
          }}>
            {item.caption}
          </p>
        )}

        {/* Prev / Next buttons */}
        {[
          { label: "◀", fn: onPrev, pos: { left: "-60px" } },
          { label: "▶", fn: onNext, pos: { right: "-60px" } },
        ].map((b) => (
          <button key={b.label} onClick={b.fn} style={{
            position: "absolute", top: "50%", transform: "translateY(-50%)",
            ...b.pos,
            background: "rgba(255,255,255,0.1)", border: "none",
            color: "white", width: "44px", height: "44px", borderRadius: "50%",
            fontSize: "1rem", cursor: "pointer",
          }}>
            {b.label}
          </button>
        ))}

        <button onClick={onClose} style={{
          position: "absolute", top: "-40px", right: 0,
          background: "none", border: "none", color: "white",
          fontSize: "1.5rem", cursor: "pointer",
        }}>
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function GallerySection() {
  // Use local assets — galleryImages is populated from src/assets/photos/ at build time
  const items = galleryImages.length > 0 ? galleryImages : PLACEHOLDER_ITEMS;
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="gallery" className="section section-mid">
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="section-title">Our Gallery</h2>
          <p className="section-subtitle">Moments frozen in time, forever beautiful</p>
          <div className="divider-rose" />
        </motion.div>

        {/* Masonry grid */}
        <div style={{ columns: "3 280px", columnGap: "16px", marginTop: "20px" }}>
          {items.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.08 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setLightbox(i)}
              style={{
                breakInside: "avoid",
                marginBottom: "16px",
                borderRadius: "16px",
                overflow: "hidden",
                cursor: "pointer",
                position: "relative",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                minHeight: i % 3 === 0 ? "240px" : "180px",
              }}
            >
              {photo.src ? (
                <img
                  src={photo.src}
                  alt={photo.alt || photo.caption}
                  style={{ width: "100%", display: "block", objectFit: "cover" }}
                  loading="lazy"
                />
              ) : (
                <div style={{
                  minHeight: i % 3 === 0 ? "240px" : "180px",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: "10px",
                  background: `linear-gradient(135deg,
                    hsl(${(i * 47) % 360},30%,15%),
                    hsl(${(i * 47 + 60) % 360},20%,10%))`,
                }}>
                  <span style={{ fontSize: "2.5rem" }}>📸</span>
                  <span style={{ color: "var(--white-40)", fontSize: "0.8rem" }}>
                    {photo.caption}
                  </span>
                </div>
              )}

              {/* Hover overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(233,30,99,0.5), transparent)",
                opacity: 0, transition: "opacity 0.3s",
                display: "flex", alignItems: "flex-end", padding: "16px",
              }} className="gallery-overlay">
                <span style={{ color: "white", fontSize: "0.85rem" }}>{photo.caption}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Shown when the photos folder is still empty */}
        {galleryImages.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              textAlign: "center", color: "var(--white-40)",
              fontSize: "0.9rem", marginTop: "16px",
            }}
          >
            Add photos to <code>src/assets/photos/</code> and rebuild 📸
          </motion.p>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <LightboxModal
            item={items[lightbox]}
            onClose={() => setLightbox(null)}
            onPrev={() => setLightbox((lightbox - 1 + items.length) % items.length)}
            onNext={() => setLightbox((lightbox + 1) % items.length)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
