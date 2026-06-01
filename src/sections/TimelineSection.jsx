// Timeline Section — Vertical scroll-reveal relationship timeline
import { motion } from "framer-motion";
import { timelineEvents } from "../data/defaults";

function TimelineItem({ event, index }) {
  const isLeft = index % 2 === 0;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isLeft ? "flex-start" : "flex-end",
        position: "relative",
        marginBottom: "60px",
      }}
    >
      {/* Center dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, type: "spring" }}
        style={{
          position: "absolute",
          left: "50%",
          top: "24px",
          transform: "translate(-50%, -50%)",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: "var(--gradient-pink)",
          boxShadow: "var(--shadow-pink)",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.7rem",
        }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="glass-card"
        style={{
          width: "calc(48% - 20px)",
          padding: "28px 28px 24px",
          border: "1px solid rgba(233,30,99,0.2)",
          position: "relative",
        }}
      >
        {/* Emoji badge */}
        <div
          style={{
            position: "absolute",
            top: "-16px",
            left: "24px",
            width: "36px",
            height: "36px",
            background: "var(--navy-900)",
            border: "2px solid rgba(233,30,99,0.4)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1rem",
          }}
        >
          {event.emoji}
        </div>

        {/* Date */}
        <div
          style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "var(--pink-400)",
            marginBottom: "8px",
            marginTop: "8px",
          }}
        >
          {event.date}
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "var(--white)",
            marginBottom: "10px",
          }}
        >
          {event.title}
        </h3>

        {/* Description */}
        <p
          style={{
            color: "var(--white-70)",
            fontSize: "0.9rem",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {event.description}
        </p>
      </motion.div>
    </div>
  );
}

export default function TimelineSection() {
  return (
    <section id="timeline" className="section section-dark">
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Our Story</h2>
          <p className="section-subtitle">The chapters that made us who we are</p>
          <div className="divider-rose" />
        </motion.div>

        {/* Vertical line */}
        <div
          style={{
            position: "relative",
            marginTop: "60px",
            paddingBottom: "20px",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "2px",
              background: "linear-gradient(to bottom, rgba(233,30,99,0.1), rgba(233,30,99,0.6), rgba(233,30,99,0.1))",
              transform: "translateX(-50%)",
            }}
          />

          {timelineEvents.map((event, i) => (
            <TimelineItem key={event.id} event={event} index={i} />
          ))}
        </div>

        {/* "More memories to come" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "var(--gradient-pink)",
              margin: "0 auto 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.4rem",
            }}
          >
            ∞
          </div>
          <p
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "1.3rem",
              color: "var(--pink-300)",
            }}
          >
            And so many more chapters to write together...
          </p>
        </motion.div>
      </div>
    </section>
  );
}
