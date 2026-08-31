"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Heart } from "lucide-react";
import { RoutineNeed } from "@/types";

interface NeedCard {
  id: RoutineNeed;
  title: string;
  subtitle: string;
  icon: string;
  image: string;
  accent: string;
}

const NEEDS: NeedCard[] = [
  {
    id: "sleeping",
    title: "Sweet Slumber & Sleep",
    subtitle: "Organic sleepsuits, 1.0 TOG sacks, warm bear lamps & bamboo swaddles",
    icon: "🌙",
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=600&q=80",
    accent: "bg-[#F7C9D4]/40",
  },
  {
    id: "feeding",
    title: "Joyful Mealtime & Weaning",
    subtitle: "Suction plates, catch bibs, training straw cups & glass bottles",
    icon: "🍼",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=600&q=80",
    accent: "bg-[#DDD3F5]/40",
  },
  {
    id: "bath-time",
    title: "Gentle Bath & Splash",
    subtitle: "Tear-free botanical washes, bear ear bamboo towels & floating squirties",
    icon: "🛁",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80",
    accent: "bg-[#CFE8F7]/40",
  },
  {
    id: "playtime",
    title: "Play, Learn & Grow",
    subtitle: "Montessori wooden stackers, crochet rattles & plush cuddle bears",
    icon: "🧸",
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80",
    accent: "bg-[#A3C9A8]/30",
  },
  {
    id: "travel",
    title: "On-the-Go & Travel",
    subtitle: "Vegan leather diaper backpacks, portable changing clutches & sun hats",
    icon: "✈️",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    accent: "bg-[#FFE082]/30",
  },
  {
    id: "baby-care",
    title: "Daily Care & Hygiene",
    subtitle: "Pure water wipes, zinc rash balms, massage oils & grooming sets",
    icon: "🧴",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80",
    accent: "bg-[#F3E8DC]/60",
  },
];

export const ShopByNeedSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-powder-pink/30 text-cocoa-deep text-xs font-extrabold uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3 text-powder-dark" />
              <span>Daily Family Routines</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-cocoa-deep tracking-tight">
              Shop By Daily Need
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-cocoa-muted max-w-md">
            Simplify parenthood with purpose-designed curated bundles for bath time, bedtime, feeding routines, and wanderlust travel.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEEDS.map((need, idx) => (
            <motion.div
              key={need.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              whileHover={{ y: -5 }}
              className="rounded-4xl p-5 sm:p-6 bg-white border border-warm-beige shadow-xs hover:shadow-soft-lg transition-all duration-300 flex items-center gap-5 group"
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden shrink-0 bg-cream-100">
                <img
                  src={need.image}
                  alt={need.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-cocoa-deep/10" />
                <span className="absolute bottom-2 right-2 w-7 h-7 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center text-xs shadow-xs">
                  {need.icon}
                </span>
              </div>

              <div className="flex-1 space-y-1.5 text-left">
                <h3 className="font-serif text-lg font-bold text-cocoa-deep group-hover:text-powder-dark transition-colors">
                  {need.title}
                </h3>
                <p className="text-xs text-cocoa-muted line-clamp-2 leading-relaxed">
                  {need.subtitle}
                </p>
                <Link
                  href={`/shop?need=${need.id}`}
                  className="inline-flex items-center gap-1 text-xs font-extrabold text-cocoa-deep group-hover:text-powder-dark transition-colors pt-1"
                >
                  <span>Shop Routine</span>
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
