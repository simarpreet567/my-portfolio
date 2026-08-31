"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Gift } from "lucide-react";
import { FloatingCloud, FloatingStar, FloatingTeddy } from "./FloatingObjects";

export const PromoBanner: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-5xl bg-gradient-to-br from-[#FDF4F6] via-[#FFF9F3] to-[#EFF7FC] p-8 sm:p-12 lg:p-16 border-2 border-white shadow-soft-lg overflow-hidden"
        >
          {/* Ambient Background Orbs */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-powder-pink/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-60 h-60 bg-baby-blue/30 rounded-full blur-3xl pointer-events-none" />

          {/* Floating decorative elements */}
          <FloatingStar className="absolute top-6 left-12" color="#F7C9D4" delay={0.1} />
          <FloatingStar className="absolute bottom-8 right-1/3" color="#FCD34D" delay={0.6} />
          <div className="absolute -top-4 right-12 hidden md:block">
            <FloatingCloud size="sm" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-powder-pink text-cocoa-deep text-xs font-extrabold uppercase tracking-wider shadow-xs">
                <Gift className="w-3.5 h-3.5 text-powder-dark" />
                <span>Special Newborn Offer</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-cocoa-deep tracking-tight leading-tight">
                Welcome to their <br />
                <span className="italic font-serif text-powder-dark">wonder years.</span>
              </h2>

              <p className="text-base sm:text-lg text-cocoa-muted max-w-lg leading-relaxed font-normal">
                Enjoy <strong className="text-cocoa-deep font-bold">20% off</strong> our certified organic newborn essentials, sleep sacks, and cuddly companions with code{" "}
                <span className="px-2 py-0.5 rounded-lg bg-powder-pink/50 text-cocoa-deep font-mono font-bold text-sm">
                  NEWBORN20
                </span>
              </p>

              <div className="pt-2">
                <Link
                  href="/category/clothing"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-3xl bg-cocoa-deep text-cream hover:bg-cocoa-light font-bold text-sm sm:text-base shadow-soft hover:shadow-soft-lg transition-all group"
                >
                  <span>Shop Newborn Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Decorative Bear & Cloud */}
            <div className="lg:col-span-5 flex items-center justify-center relative min-h-[220px]">
              <div className="relative scale-110 sm:scale-125">
                <FloatingTeddy />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
