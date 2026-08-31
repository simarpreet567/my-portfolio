"use client";

import React from "react";
import { motion } from "framer-motion";

export const FloatingTeddy: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <motion.div
      animate={{
        y: [0, -18, 0],
        rotate: [-2, 3, -2],
      }}
      transition={{
        duration: 5.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`relative w-28 h-32 sm:w-36 sm:h-40 ${className}`}
    >
      <div className="relative w-full h-full filter drop-shadow-xl select-none">
        {/* Soft 3D Pastel Bear SVG */}
        <svg viewBox="0 0 160 180" className="w-full h-full">
          <defs>
            <radialGradient id="bearBodyGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#F9E2D2" />
              <stop offset="60%" stopColor="#E8C9B5" />
              <stop offset="100%" stopColor="#D5B09A" />
            </radialGradient>
            <radialGradient id="earInnerGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FDE8EE" />
              <stop offset="100%" stopColor="#F7C9D4" />
            </radialGradient>
            <radialGradient id="snoutGrad" cx="45%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#FFFDFB" />
              <stop offset="100%" stopColor="#F5EFE8" />
            </radialGradient>
            <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#493B3B" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Left Ear */}
          <circle cx="42" cy="42" r="22" fill="url(#bearBodyGrad)" filter="url(#softShadow)" />
          <circle cx="42" cy="42" r="13" fill="url(#earInnerGrad)" />

          {/* Right Ear */}
          <circle cx="118" cy="42" r="22" fill="url(#bearBodyGrad)" filter="url(#softShadow)" />
          <circle cx="118" cy="42" r="13" fill="url(#earInnerGrad)" />

          {/* Body */}
          <ellipse cx="80" cy="120" rx="46" ry="42" fill="url(#bearBodyGrad)" filter="url(#softShadow)" />
          {/* Tummy patch */}
          <ellipse cx="80" cy="122" rx="28" ry="26" fill="#FFF8F2" opacity="0.8" />

          {/* Head */}
          <circle cx="80" cy="72" r="42" fill="url(#bearBodyGrad)" filter="url(#softShadow)" />

          {/* Snout */}
          <ellipse cx="80" cy="80" rx="20" ry="16" fill="url(#snoutGrad)" />
          {/* Nose */}
          <ellipse cx="80" cy="74" rx="7" ry="5.5" fill="#493B3B" />
          <path d="M 80 80 L 80 88 M 74 86 Q 80 91 86 86" stroke="#493B3B" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Eyes */}
          <circle cx="62" cy="66" r="4.5" fill="#493B3B" />
          <circle cx="60.5" cy="64" r="1.5" fill="#FFF" />
          <circle cx="98" cy="66" r="4.5" fill="#493B3B" />
          <circle cx="96.5" cy="64" r="1.5" fill="#FFF" />

          {/* Rosy Cheeks */}
          <ellipse cx="54" cy="78" rx="8" ry="5" fill="#F7C9D4" opacity="0.75" />
          <ellipse cx="106" cy="78" rx="8" ry="5" fill="#F7C9D4" opacity="0.75" />

          {/* Cute Pink Bowtie */}
          <polygon points="70,104 90,104 80,109" fill="#F7C9D4" />
          <polygon points="70,114 90,114 80,109" fill="#F7C9D4" />
          <circle cx="80" cy="109" r="4" fill="#E8A5B6" />
        </svg>
      </div>
    </motion.div>
  );
};

export const FloatingMoon: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <motion.div
      animate={{
        y: [0, -15, 0],
        rotate: [0, -5, 0],
      }}
      transition={{
        duration: 6.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`relative w-24 h-24 sm:w-28 sm:h-28 ${className}`}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-lg">
        <defs>
          <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF7D6" />
            <stop offset="60%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#FCD34D" />
          </linearGradient>
        </defs>
        {/* Crescent Moon */}
        <path
          d="M 68 15 C 38 18 20 45 28 75 C 34 92 50 100 68 95 C 44 86 38 52 56 32 C 60 27 65 20 68 15 Z"
          fill="url(#moonGrad)"
        />
        {/* Sleeping Face on Moon */}
        <path d="M 40 50 Q 44 54 48 50" stroke="#8C7D7D" strokeWidth="2" strokeLinecap="round" fill="none" />
        <ellipse cx="44" cy="58" rx="4" ry="2.5" fill="#F7C9D4" opacity="0.8" />
        {/* Sleeping Cap Tassel */}
        <circle cx="70" cy="14" r="5" fill="#DDD3F5" />
      </svg>
    </motion.div>
  );
};

export const FloatingCloud: React.FC<{ className?: string; size?: "sm" | "md" | "lg" }> = ({
  className = "",
  size = "md",
}) => {
  const sizeClasses =
    size === "sm" ? "w-20 h-12" : size === "lg" ? "w-40 h-24" : "w-32 h-20";

  return (
    <motion.div
      animate={{
        x: [0, 10, 0],
        y: [0, -8, 0],
      }}
      transition={{
        duration: 7.2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`relative ${sizeClasses} ${className}`}
    >
      <svg viewBox="0 0 120 70" className="w-full h-full filter drop-shadow-md">
        <defs>
          <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#EFF7FC" />
          </linearGradient>
        </defs>
        <path
          d="M 25 55 L 95 55 A 15 15 0 0 0 95 25 A 22 22 0 0 0 65 15 A 25 25 0 0 0 30 28 A 18 18 0 0 0 25 55 Z"
          fill="url(#cloudGrad)"
        />
        {/* Cute Smiling Face on Cloud */}
        <circle cx="50" cy="38" r="2" fill="#8C7D7D" />
        <circle cx="70" cy="38" r="2" fill="#8C7D7D" />
        <path d="M 57 42 Q 60 46 63 42" stroke="#8C7D7D" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <ellipse cx="44" cy="42" rx="3" ry="2" fill="#F7C9D4" opacity="0.8" />
        <ellipse cx="76" cy="42" rx="3" ry="2" fill="#F7C9D4" opacity="0.8" />
      </svg>
    </motion.div>
  );
};

export const FloatingBlock: React.FC<{ letter: string; color: string; className?: string; delay?: number }> = ({
  letter,
  color,
  className = "",
  delay = 0,
}) => {
  return (
    <motion.div
      animate={{
        y: [0, -14, 0],
        rotateX: [12, -8, 12],
        rotateY: [-15, 20, -15],
      }}
      transition={{
        duration: 5 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={`relative w-14 h-14 sm:w-16 sm:h-16 perspective-1000 ${className}`}
    >
      <div
        className="w-full h-full rounded-2xl flex items-center justify-center text-white font-extrabold text-xl sm:text-2xl shadow-soft-md border-2 border-white/60 select-none"
        style={{
          backgroundColor: color,
          transform: "rotateX(10deg) rotateY(-10deg)",
          transformStyle: "preserve-3d",
        }}
      >
        <span className="font-serif drop-shadow-sm text-cocoa-deep">{letter}</span>
      </div>
    </motion.div>
  );
};

export const FloatingStar: React.FC<{ className?: string; color?: string; delay?: number }> = ({
  className = "",
  color = "#FCD34D",
  delay = 0,
}) => {
  return (
    <motion.div
      animate={{
        scale: [1, 1.25, 1],
        rotate: [0, 90, 180, 270, 360],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 4.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={`relative w-7 h-7 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="w-full h-full filter drop-shadow-sm" fill={color}>
        <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
      </svg>
    </motion.div>
  );
};

export const FloatingPacifier: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <motion.div
      animate={{
        y: [0, -12, 0],
        rotate: [15, -10, 15],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5,
      }}
      className={`relative w-14 h-14 ${className}`}
    >
      <svg viewBox="0 0 60 60" className="w-full h-full filter drop-shadow-md">
        <defs>
          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDF4F6" />
            <stop offset="100%" stopColor="#F7C9D4" />
          </linearGradient>
        </defs>
        {/* Shield */}
        <ellipse cx="30" cy="30" rx="22" ry="14" fill="url(#shieldGrad)" />
        {/* Holes */}
        <circle cx="18" cy="30" r="3.5" fill="#FFF9F3" />
        <circle cx="42" cy="30" r="3.5" fill="#FFF9F3" />
        {/* Nipple knob */}
        <circle cx="30" cy="30" r="9" fill="#E8A5B6" />
        {/* Ring handle */}
        <path
          d="M 22 34 C 22 46 38 46 38 34"
          stroke="#F7C9D4"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </motion.div>
  );
};
