"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export const CategoryGrid: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-powder-pink/30 text-cocoa-deep text-xs font-extrabold uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3 text-powder-dark" />
              <span>Explore Little Bloom</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-cocoa-deep tracking-tight">
              Shop Their Little World
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-bold text-cocoa-deep hover:text-powder-dark transition-colors group"
          >
            <span>View All Collections ({CATEGORIES.reduce((acc, c) => acc + c.itemCount, 0)}+ Items)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 9-Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-4xl bg-white border border-warm-beige shadow-xs hover:shadow-soft-lg transition-all duration-300 flex flex-col"
            >
              {/* Category Image Header */}
              <div className="relative aspect-[16/10] overflow-hidden bg-cream-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cocoa-deep/60 via-cocoa-deep/10 to-transparent" />

                {/* Top Badge with Icon */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span
                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-md backdrop-blur-md"
                    style={{ backgroundColor: `${cat.accentColor}dd` }}
                  >
                    {cat.icon}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-extrabold text-cocoa-deep">
                    {cat.itemCount} Curated Items
                  </span>
                </div>

                {/* Bottom title on image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight drop-shadow-sm">
                    {cat.name}
                  </h3>
                </div>
              </div>

              {/* Category Body & Subcategory Chips */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-cocoa-muted line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>

                {/* Subcategory Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cat.subCategories.slice(0, 3).map((sub) => (
                    <span
                      key={sub.id}
                      className="px-2.5 py-1 rounded-xl bg-cream-100 text-[11px] font-semibold text-cocoa-deep/80"
                    >
                      {sub.name}
                    </span>
                  ))}
                  {cat.subCategories.length > 3 && (
                    <span className="px-2 py-1 rounded-xl bg-cream-200/60 text-[11px] font-bold text-cocoa-muted">
                      +{cat.subCategories.length - 3} more
                    </span>
                  )}
                </div>

                {/* CTA Link */}
                <div className="pt-2 border-t border-warm-beige/60">
                  <Link
                    href={`/category/${cat.slug}`}
                    className="w-full py-2.5 rounded-2xl bg-cream-100 group-hover:bg-cocoa-deep text-cocoa-deep group-hover:text-cream font-bold text-xs transition-all flex items-center justify-center gap-2"
                  >
                    <span>Shop {cat.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
