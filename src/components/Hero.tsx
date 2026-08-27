"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15],
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-pink/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-green/5 rounded-full blur-[150px]"
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

        {/* Diagonal neon lines */}
        <motion.div
          animate={{ opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(0,240,255,0.05)_49%,rgba(0,240,255,0.05)_51%,transparent_52%)] bg-[size:200px_200px]"
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotateX: -30 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-neon mb-10 glow-blue"
        >
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="text-sm text-gray-300">Available for opportunities</span>
        </motion.div>

        {/* Main heading with 3D effect */}
        <motion.h1
          initial={{ opacity: 0, y: 50, rotateX: -20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-none perspective-1000"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span className="inline-block">Hi, I&apos;m</span>
          <br />
          <motion.span
            className="inline-block text-gradient"
            animate={{
              textShadow: [
                "0 0 20px rgba(0,240,255,0.5)",
                "0 0 40px rgba(255,0,229,0.5)",
                "0 0 20px rgba(57,255,20,0.5)",
                "0 0 20px rgba(0,240,255,0.5)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            simukhurana
          </motion.span>
        </motion.h1>

        {/* Subtitle with 3D slide */}
        <motion.p
          initial={{ opacity: 0, x: -50, rotateY: 15 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="text-xl md:text-2xl text-gray-400 mb-4"
        >
          Software Engineer
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, x: 50, rotateY: -15 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          className="text-gray-500 max-w-2xl mx-auto mb-12 text-lg"
        >
          I build clean, responsive web applications using HTML, CSS, JavaScript, React & SQL.
          Passionate about solving real-world problems through code.
        </motion.p>

        {/* CTA Buttons with 3D hover */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-14"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, rotateX: -5, rotateY: 5, boxShadow: "0 0 30px rgba(0,240,255,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gradient-to-r from-neon-blue to-neon-pink rounded-2xl text-dark font-bold shadow-lg shadow-neon-blue/20 transition-all duration-300 perspective-1000"
            style={{ transformStyle: "preserve-3d" }}
          >
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, rotateX: -5, rotateY: -5, boxShadow: "0 0 30px rgba(255,0,229,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 glass-neon rounded-2xl text-white font-bold glow-pink transition-all duration-300"
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Social Links with 3D pop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex items-center justify-center gap-5"
        >
          {[
            { icon: Github, href: "https://github.com/simukhurana", color: "neon-blue" },
            { icon: Linkedin, href: "https://linkedin.com/in/simukhurana", color: "neon-pink" },
            { icon: Twitter, href: "https://twitter.com/simukhurana", color: "neon-green" },
          ].map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20, rotateX: -30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 1.2 + i * 0.15, duration: 0.5 }}
              whileHover={{
                scale: 1.2,
                y: -8,
                rotateY: 15,
                boxShadow: "0 0 25px rgba(0,240,255,0.3)",
              }}
              whileTap={{ scale: 0.9 }}
              className="p-3.5 glass-neon rounded-2xl text-gray-400 hover:text-white transition-colors duration-300"
            >
              <social.icon size={22} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-gray-500 hover:text-neon-blue transition-colors"
        >
          <ArrowDown size={28} />
        </motion.a>
      </motion.div>
    </section>
  );
}
