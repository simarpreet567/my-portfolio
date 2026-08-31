"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, BookOpen, CheckSquare, Gift, Ruler } from "lucide-react";
import { BABY_GUIDES } from "@/data/guides";

export const BabyGuidesBanner: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-powder-pink/30 text-cocoa-deep text-xs font-extrabold uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3 text-powder-dark" />
              <span>Parenting Resources</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-cocoa-deep tracking-tight">
              Curated Baby Care Guides
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-cocoa-muted max-w-md">
            Pediatrician-reviewed checklists and interactive shopping tools designed to make preparation peaceful and confident.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BABY_GUIDES.map((guide, idx) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-4xl overflow-hidden bg-white border border-warm-beige shadow-xs hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-cream-100">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-extrabold text-cocoa-deep shadow-xs">
                    {guide.badge}
                  </div>
                </div>

                <div className="p-5 space-y-2 text-left">
                  <div className="flex items-center justify-between text-[11px] text-powder-dark font-bold uppercase tracking-wider">
                    <span>{guide.category}</span>
                    <span>{guide.readTime}</span>
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-cocoa-deep group-hover:text-powder-dark transition-colors line-clamp-2">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-cocoa-muted line-clamp-3 leading-relaxed">
                    {guide.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href={`/guides/${guide.slug}`}
                  className="w-full py-2.5 rounded-2xl bg-cream-100 group-hover:bg-cocoa-deep text-cocoa-deep group-hover:text-cream font-bold text-xs transition-all flex items-center justify-center gap-2"
                >
                  <span>Open Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
