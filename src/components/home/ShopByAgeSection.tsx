"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { AgeGroup } from "@/types";

interface AgeCard {
  id: AgeGroup;
  title: string;
  subtitle: string;
  ageSpan: string;
  icon: string;
  image: string;
  bgColor: string;
  tag: string;
}

const AGE_CARDS: AgeCard[] = [
  {
    id: "0-3m",
    title: "Newborn Sweetness",
    subtitle: "Swaddles, kimono sets, scratch mitts & pure water care",
    ageSpan: "0–3 Months",
    icon: "🍼",
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=600&q=80",
    bgColor: "bg-powder-pink/20 border-powder-pink/50",
    tag: "First Weeks",
  },
  {
    id: "3-6m",
    title: "Curious Infant",
    subtitle: "Teethers, rattle toys, tummy-time mats & soft footies",
    ageSpan: "3–6 Months",
    icon: "🧸",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80",
    bgColor: "bg-baby-blue/20 border-baby-blue/50",
    tag: "Sensory Bloom",
  },
  {
    id: "6-12m",
    title: "Active Crawler",
    subtitle: "Weaning suction sets, stacking cups & crawler knee pads",
    ageSpan: "6–12 Months",
    icon: "🥣",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=600&q=80",
    bgColor: "bg-soft-lavender/20 border-soft-lavender/50",
    tag: "First Bites",
  },
  {
    id: "1-2y",
    title: "Busy Toddler",
    subtitle: "Push walkers, first sneakers, linen sets & shape puzzles",
    ageSpan: "1–2 Years",
    icon: "👟",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80",
    bgColor: "bg-warm-beige/30 border-warm-beige",
    tag: "First Steps",
  },
  {
    id: "2-4y",
    title: "Playful Explorer",
    subtitle: "Montessori wooden toys, dresses, cardigans & mini bags",
    ageSpan: "2–4 Years",
    icon: "🎨",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=600&q=80",
    bgColor: "bg-sage-green/20 border-sage-green/40",
    tag: "Little Dreamer",
  },
];

export const ShopByAgeSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-cream-100/50 border-y border-warm-beige/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-powder-pink/40 text-cocoa-deep text-xs font-extrabold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-powder-dark" />
            <span>Tailored Milestones</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-cocoa-deep tracking-tight">
            Shop By Stage & Age
          </h2>
          <p className="text-sm sm:text-base text-cocoa-muted mt-2">
            Every month brings new wonders. Discover pediatrician-tailored collections curated for every developmental stage.
          </p>
        </div>

        {/* 5-Card Age Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
          {AGE_CARDS.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className={`rounded-4xl p-4 sm:p-5 border transition-all duration-300 shadow-xs hover:shadow-soft-lg flex flex-col justify-between bg-white group`}
            >
              <div>
                {/* Age Image Thumbnail */}
                <div className="relative aspect-square rounded-3xl overflow-hidden mb-4 bg-cream-100">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-extrabold text-cocoa-deep shadow-xs">
                    {card.tag}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center text-sm shadow-xs">
                    {card.icon}
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-powder-dark">
                    {card.ageSpan}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-cocoa-deep group-hover:text-powder-dark transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-cocoa-muted line-clamp-2 leading-relaxed pt-1">
                    {card.subtitle}
                  </p>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-4 mt-3 border-t border-warm-beige/60">
                <Link
                  href={`/shop?age=${card.id}`}
                  className="w-full py-2 rounded-2xl bg-cream-100 group-hover:bg-cocoa-deep text-cocoa-deep group-hover:text-cream font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Explore {card.ageSpan}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
