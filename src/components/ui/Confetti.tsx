"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  shape: "circle" | "square" | "star";
  duration: number;
  delay: number;
}

const PASTEL_COLORS = [
  "#F7C9D4", // Powder Pink
  "#CFE8F7", // Baby Blue
  "#DDD3F5", // Soft Lavender
  "#F3E8DC", // Warm Beige
  "#A3C9A8", // Sage Green
  "#FBD38D", // Gold
];

export const ConfettiCelebration: React.FC = () => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const generated: ConfettiPiece[] = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage vw
      y: -20 - Math.random() * 20,
      color: PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)],
      size: Math.random() * 10 + 8,
      rotation: Math.random() * 360,
      shape: i % 3 === 0 ? "star" : i % 2 === 0 ? "circle" : "square",
      duration: Math.random() * 2.5 + 2.5,
      delay: Math.random() * 0.8,
    }));
    setPieces(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: `${p.x}vw`,
            y: `${p.y}vh`,
            opacity: 1,
            rotate: p.rotation,
          }}
          animate={{
            y: "110vh",
            x: `${p.x + (Math.random() * 20 - 10)}vw`,
            rotate: p.rotation + 720,
            opacity: [1, 1, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            backgroundColor: p.shape !== "star" ? p.color : "transparent",
            borderRadius: p.shape === "circle" ? "50%" : p.shape === "square" ? "3px" : "0",
          }}
        >
          {p.shape === "star" && (
            <svg
              viewBox="0 0 24 24"
              width={p.size}
              height={p.size}
              fill={p.color}
              className="drop-shadow-sm"
            >
              <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
};
