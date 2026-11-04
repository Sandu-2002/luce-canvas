import React, { useState } from "react";
import { motion } from "framer-motion";

// Canvas component for rendering products
export function Canvas({ a, w }) {
  return (
    <div className="canvas-item" style={{ width: w || "100%" }}>
      {a && a.image ? (
        <img src={a.image} alt={a.title || "Artwork"} style={{ width: "100%", height: "auto", display: "block" }} />
      ) : (
        <div className="placeholder-canvas" style={{ background: "#eee", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span>{a?.title || "Art"}</span>
        </div>
      )}
    </div>
  );
}

// Hang animation wrapper
export function Hang({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay, ease: [.2, .8, .2, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Reveal animation wrapper
export function Reveal({ children, d = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: d, ease: [.2, .8, .2, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Magnet interactive wrapper
export function Magnet({ children }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ display: "inline-block" }}>
      {children}
    </motion.div>
  );
}

// Brush icon component
export function Brush() {
  return <span className="brush-icon" style={{ marginLeft: "8px" }}>🖌️</span>;
}

// Live Painting component
export function LivePainting({ w }) {
  const [painted, setPainted] = useState(false);
  const paintCanvas = () => setPainted(true);
  const eraseCanvas = () => setPainted(false);

  return (
    <div className="painting-container" style={{ width: w || "100%" }}>
      <div className="canvas-wrapper" style={{ position: "relative", cursor: "pointer" }} onClick={painted ? eraseCanvas : paintCanvas}>
        <motion.svg
          viewBox="0 0 718 957"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          className="painting-svg"
          style={{ width: "100%", height: "auto" }}
        >
          <path
            fill="#4B3A28"
            d="M692.266235,957.727295"
          />
        </motion.svg>
      </div>
    </div>
  );
}