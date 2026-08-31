"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Truck, Heart } from "lucide-react";

const ANNOUNCEMENTS = [
  { icon: Sparkles, text: "Free shipping on orders over ₹999 ✨" },
  { icon: Heart, text: "Use code BLOOM10 for 10% off your first order 🧸" },
  { icon: Truck, text: "Express 24-hour dispatch across India 🚚" },
];

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const CurrentIcon = ANNOUNCEMENTS[currentIndex].icon;

  return (
    <div className="bg-gradient-to-r from-powder-pink via-lavender-soft/60 to-baby-blue py-2 px-4 text-cocoa-deep text-xs font-semibold tracking-wide border-b border-powder-pink/40">
      <div className="max-w-7xl mx-auto flex items-center justify-center relative h-5 overflow-hidden text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="flex items-center justify-center gap-2"
          >
            <CurrentIcon className="w-3.5 h-3.5 text-powder-dark flex-shrink-0" />
            <span>{ANNOUNCEMENTS[currentIndex].text}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
