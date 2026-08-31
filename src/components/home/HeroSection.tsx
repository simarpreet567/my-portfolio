"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Heart, ShieldCheck, Truck, Star } from "lucide-react";
import { Hero3DCanvas } from "../3d/Hero3DCanvas";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-20 lg:pt-14 lg:pb-24 bg-gradient-to-b from-cream-50 via-cream-100 to-warm-beige/30">
      {/* Ambient background soft pastel glow orbs */}
      <div className="absolute top-6 left-10 w-80 h-80 rounded-full bg-powder-pink/30 blur-3xl pointer-events-none" />
      <div className="absolute top-16 right-10 w-96 h-96 rounded-full bg-baby-blue/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-96 h-96 rounded-full bg-lavender-soft/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Editorial Content (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 md:space-y-7 text-left">
            {/* Small pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-powder-pink text-cocoa-deep shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-powder-dark" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-cocoa-deep">
                India&apos;s Curated Baby Boutique
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-cocoa-deep leading-[1.08]">
                Little Things, <br />
                <span className="italic font-serif text-powder-dark font-normal">
                  Big Love.
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-cocoa-muted max-w-xl leading-relaxed font-normal"
            >
              Cloud-soft organic cotton, Montessori-inspired wooden toys, and heirloom nursery treasures designed with gentle care for your little one&apos;s wonder years.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 pt-1"
            >
              <Link
                href="/shop"
                className="px-8 py-4 rounded-3xl bg-cocoa-deep hover:bg-cocoa-light text-cream font-bold text-base shadow-soft hover:shadow-soft-lg transition-all flex items-center gap-2.5 group"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/new-arrivals"
                className="px-7 py-4 rounded-3xl bg-white/95 hover:bg-white text-cocoa-deep font-bold text-base border border-warm-beige hover:border-powder-pink shadow-xs transition-all flex items-center gap-2"
              >
                <span>Explore New Arrivals</span>
                <span className="text-xs">✨</span>
              </Link>

              <Link
                href="/guides/newborn-checklist"
                className="px-6 py-4 rounded-3xl bg-powder-pink/40 hover:bg-powder-pink/60 text-cocoa-deep font-bold text-sm border border-powder-pink shadow-xs transition-all flex items-center gap-2"
              >
                <span>Newborn Checklist</span>
                <span className="text-xs">📋</span>
              </Link>
            </motion.div>

            {/* Trust Micro-Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 border-t border-warm-beige/80 flex flex-wrap items-center gap-5 sm:gap-6 text-xs text-cocoa-deep font-semibold"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-powder-pink/40 flex items-center justify-center text-powder-dark">
                  <Heart className="w-3 h-3 fill-powder-pink" />
                </div>
                <span>100% GOTS Organic Cotton</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-lavender-soft/50 flex items-center justify-center text-purple-600">
                  <ShieldCheck className="w-3 h-3" />
                </div>
                <span>Pediatrician Approved</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-baby-blue/50 flex items-center justify-center text-blue-600">
                  <Truck className="w-3 h-3" />
                </div>
                <span>Free Shipping over ₹999</span>
              </div>
            </motion.div>
          </div>

          {/* Right 3D Interactive WebGL Canvas & Card (5 Cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[420px] sm:min-h-[480px]">
            <div className="relative w-full max-w-lg aspect-square flex items-center justify-center select-none">
              {/* Central Soft Card container with WebGL */}
              <div className="absolute inset-2 sm:inset-4 rounded-5xl bg-gradient-to-tr from-powder-light via-white/80 to-baby-light border-2 border-white shadow-soft-lg backdrop-blur-md overflow-hidden flex items-center justify-center">
                <Hero3DCanvas />
              </div>

              {/* Floating "Tiny Favorite" pill banner */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-3 right-6 z-30 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-powder-pink shadow-soft flex items-center gap-2.5"
              >
                <div className="w-7 h-7 rounded-xl bg-powder-pink/40 flex items-center justify-center text-sm">
                  🌸
                </div>
                <div>
                  <p className="text-[10px] font-extrabold uppercase text-powder-dark tracking-wider">
                    Parent Favorite
                  </p>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <p className="text-xs font-bold text-cocoa-deep">4.9 / 5.0 (2,400+ Verified Parents)</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating "100% Non-Toxic" top pill */}
              <motion.div
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -top-2 left-6 z-30 px-3.5 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-warm-beige shadow-soft flex items-center gap-2"
              >
                <span className="text-xs">🌿</span>
                <span className="text-[11px] font-bold text-cocoa-deep">Zero Toxic Dyes • 100% Safe</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
