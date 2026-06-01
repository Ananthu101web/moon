// Long Distance Section — Real interactive Leaflet map (Kerala → Brisbane)
// Uses CartoDB Dark Matter tiles — free, no API key required
import { useEffect } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ── Coordinates ───────────────────────────────────────────────────────────────
const KERALA   = [10.8505, 76.2711];   // Kerala, India
const BRISBANE = [-27.4698, 153.0251]; // Brisbane, Australia

// ── Great-circle path (linear interpolation — looks accurate at this scale) ──
function buildPath(p1, p2, steps = 120) {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    // Slight arc by lifting the midpoint
    const lat = p1[0] + (p2[0] - p1[0]) * t;
    const lng = p1[1] + (p2[1] - p1[1]) * t;
    return [lat, lng];
  });
}
const PATH = buildPath(KERALA, BRISBANE);

// ── Custom pulsing DivIcon markers ────────────────────────────────────────────
const makeIcon = (emoji, color) =>
  L.divIcon({
    className: "",
    html: `
      <div style="position:relative;width:48px;height:48px;">
        <div style="
          position:absolute;inset:0;border-radius:50%;
          background:${color};opacity:0.25;
          animation:lm-pulse 2s ease-out infinite;
        "></div>
        <div style="
          position:absolute;inset:6px;border-radius:50%;
          background:${color};opacity:0.15;
          animation:lm-pulse 2s ease-out infinite 0.4s;
        "></div>
        <div style="
          position:absolute;inset:12px;border-radius:50%;
          background:${color};
          display:flex;align-items:center;justify-content:center;
          font-size:13px;
          box-shadow:0 0 16px ${color}99;
        ">${emoji}</div>
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
    popupAnchor: [0, -24],
  });

const KERALA_ICON   = makeIcon("🇮🇳", "#ff9800");
const BRISBANE_ICON = makeIcon("🇦🇺", "#2196f3");

// ── Auto-fit map to show both markers ────────────────────────────────────────
function FitBounds() {
  const map = useMap();
  useEffect(() => {
    map.fitBounds([KERALA, BRISBANE], { padding: [50, 50] });
  }, [map]);
  return null;
}

// ── Pulsing CSS injected once ─────────────────────────────────────────────────
function InjectMapCSS() {
  useEffect(() => {
    const id = "lm-keyframes";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @keyframes lm-pulse {
        0%   { transform: scale(0.8); opacity: 0.6; }
        70%  { transform: scale(2.2); opacity: 0; }
        100% { transform: scale(0.8); opacity: 0; }
      }
      /* Leaflet dark-mode overrides */
      .lm-map .leaflet-container {
        background: #05050f;
        border-radius: 20px;
      }
      .lm-map .leaflet-popup-content-wrapper {
        background: rgba(10,10,30,0.95);
        color: #fff;
        border: 1px solid rgba(255,255,255,0.12);
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.6);
        backdrop-filter: blur(12px);
      }
      .lm-map .leaflet-popup-tip { background: rgba(10,10,30,0.95); }
      .lm-map .leaflet-popup-close-button { color: rgba(255,255,255,0.5) !important; }
      .lm-map .leaflet-control-zoom a {
        background: rgba(10,10,30,0.85) !important;
        color: #fff !important;
        border-color: rgba(255,255,255,0.1) !important;
      }
      .lm-map .leaflet-control-attribution {
        background: rgba(10,10,30,0.6) !important;
        color: rgba(255,255,255,0.3) !important;
        font-size: 9px;
      }
      .lm-map .leaflet-control-attribution a { color: rgba(255,255,255,0.4) !important; }
    `;
    document.head.appendChild(style);
  }, []);
  return null;
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function LongDistanceSection() {
  return (
    <section id="distance" className="section section-darker">
      <div
        style={{
          position: "absolute", inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(33,150,243,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Love Across the Distance</h2>
          <p className="section-subtitle">
            Kerala, India → Brisbane, Australia — hearts always together
          </p>
          <div className="divider-rose" />
        </motion.div>

        {/* Map card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="lm-map"
          style={{
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 8px 48px rgba(0,0,0,0.5)",
            height: "420px",
            position: "relative",
          }}
        >
          <InjectMapCSS />

          <MapContainer
            center={[0, 115]}
            zoom={3}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={false}
            zoomControl={true}
          >
            {/* CartoDB Dark Matter — free, no API key */}
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
              subdomains="abcd"
              maxZoom={19}
            />

            {/* Auto-fit to show both markers */}
            <FitBounds />

            {/* Connection path */}
            <Polyline
              positions={PATH}
              pathOptions={{
                color: "#ff4d87",
                weight: 2.5,
                opacity: 0.8,
                dashArray: "10 6",
              }}
            />

            {/* Kerala marker */}
            <Marker position={KERALA} icon={KERALA_ICON}>
              <Popup>
                <div style={{ textAlign: "center", padding: "4px 8px" }}>
                  <div style={{ fontSize: "1.4rem" }}>🇮🇳</div>
                  <div style={{ fontWeight: 700, color: "#ff9800", marginTop: "4px" }}>
                    Kerala, India
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem" }}>
                    Where you are 💕
                  </div>
                </div>
              </Popup>
            </Marker>

            {/* Brisbane marker */}
            <Marker position={BRISBANE} icon={BRISBANE_ICON}>
              <Popup>
                <div style={{ textAlign: "center", padding: "4px 8px" }}>
                  <div style={{ fontSize: "1.4rem" }}>🇦🇺</div>
                  <div style={{ fontWeight: 700, color: "#2196f3", marginTop: "4px" }}>
                    Brisbane, Australia
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem" }}>
                    Where she is 🌙
                  </div>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </motion.div>

        {/* Location cards below the map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            {
              flag: "🇮🇳", label: "Kerala, India",
              sub: "Where you are", color: "#ff9800",
              coords: "10.85°N, 76.27°E",
            },
            {
              flag: "💞", label: "~7,300 km",
              sub: "Always connected", color: "#ff4d87",
              coords: "No distance too far",
            },
            {
              flag: "🇦🇺", label: "Brisbane, Australia",
              sub: "Where she is", color: "#2196f3",
              coords: "27.47°S, 153.03°E",
            },
          ].map((loc) => (
            <div
              key={loc.label}
              className="glass-card"
              style={{
                flex: "1 1 180px",
                padding: "20px",
                textAlign: "center",
                border: `1px solid ${loc.color}33`,
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "8px" }}>{loc.flag}</div>
              <div style={{ fontWeight: 700, color: loc.color, fontSize: "0.95rem" }}>
                {loc.label}
              </div>
              <div style={{ color: "var(--white-70)", fontSize: "0.8rem", marginTop: "4px" }}>
                {loc.sub}
              </div>
              <div style={{ color: "var(--white-40)", fontSize: "0.72rem", marginTop: "4px" }}>
                {loc.coords}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          style={{
            textAlign: "center",
            marginTop: "32px",
            fontFamily: "var(--font-script)",
            fontSize: "1.4rem",
            color: "var(--pink-300)",
          }}
        >
          No matter the distance, my heart always finds you. ❤️
        </motion.p>
      </div>
    </section>
  );
}
