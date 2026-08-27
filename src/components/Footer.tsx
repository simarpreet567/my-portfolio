"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-neon-blue/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.05 }}
            className="text-xl font-black text-gradient"
          >
            Portfolio
          </motion.a>

          {/* Copyright */}
          <p className="text-gray-500 text-sm flex items-center gap-1">
            © {new Date().getFullYear()} simukhurana. Made with{" "}
            <Heart size={14} className="text-neon-pink fill-neon-pink" /> and lots of coffee.
          </p>

          {/* Back to top */}
          <motion.a
            href="#home"
            whileHover={{ y: -3 }}
            className="text-gray-500 hover:text-neon-blue text-sm transition-colors"
          >
            Back to top ↑
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
