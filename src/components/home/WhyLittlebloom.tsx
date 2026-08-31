"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, ShieldCheck, Truck, RefreshCw } from "lucide-react";

const FEATURES = [
  {
    icon: Heart,
    title: "Gentle Materials",
    description: "Cloud-soft, baby-friendly materials. 100% GOTS certified organic cotton and botanical dyes.",
    bgColor: "bg-powder-pink/30",
    accentColor: "text-powder-dark",
    borderColor: "hover:border-powder-pink",
  },
  {
    icon: ShieldCheck,
    title: "Thoughtfully Chosen",
    description: "Products parents can trust with total peace of mind. Non-toxic, lead-free and pediatrician tested.",
    bgColor: "bg-lavender-soft/40",
    accentColor: "text-purple-600",
    borderColor: "hover:border-lavender-dark",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick, reliable delivery across India. Free priority dispatch on all orders over ₹999.",
    bgColor: "bg-baby-blue/40",
    accentColor: "text-blue-600",
    borderColor: "hover:border-baby-dark",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "Simple and stress-free returns. 14-day hassle-free doorstep pickups and size exchanges.",
    bgColor: "bg-sage-light",
    accentColor: "text-sage-green",
    borderColor: "hover:border-sage-dark",
  },
];

export const WhyLittlebloom: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-powder-pink/40 text-cocoa-deep text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-powder-dark" />
            <span>The Littlebloom Promise</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-cocoa-deep tracking-tight">
            Why parents choose Littlebloom
          </h2>
          <p className="text-sm sm:text-base text-cocoa-muted font-normal">
            Every thread, stitch, and wooden curve is thoughtfully created with utmost safety in mind.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`flex flex-col p-6 sm:p-7 rounded-4xl bg-cream-50/70 border border-warm-beige ${feature.borderColor} shadow-soft hover:shadow-soft-lg hover:-translate-y-1.5 transition-all duration-300`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${feature.bgColor} ${feature.accentColor} flex items-center justify-center mb-5 flex-shrink-0 shadow-xs`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-xl font-bold text-cocoa-deep mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-cocoa-muted leading-relaxed font-normal">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
