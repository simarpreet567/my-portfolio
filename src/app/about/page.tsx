"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Sparkles, ShieldCheck, Leaf, Users, ArrowRight, Sun, Award } from "lucide-react";
import { FloatingCloud, FloatingStar, FloatingTeddy } from "@/components/home/FloatingObjects";

export default function AboutPage() {
  const pledges = [
    {
      icon: Leaf,
      title: "100% GOTS Organic Cotton",
      desc: "Every romper and blanket begins with hand-picked long-staple organic cotton grown without harmful synthetic pesticides.",
      color: "bg-sage-light text-sage-green",
    },
    {
      icon: ShieldCheck,
      title: "Zero Harmful Chemicals",
      desc: "No formaldehyde, optical brighteners, lead, or toxic AZO dyes ever touch our fabrics or wooden toys.",
      color: "bg-powder-pink/40 text-powder-dark",
    },
    {
      icon: Users,
      title: "Ethical Artisan Weaving",
      desc: "We partner with generational female-led weaver collectives across India ensuring fair living wages and safe studio environments.",
      color: "bg-baby-blue/50 text-blue-600",
    },
    {
      icon: Sun,
      title: "Gentle on the Planet",
      desc: "From plastic-free compostable mailers to FSC-certified sustainable beechwood, we protect the earth your little one inherits.",
      color: "bg-lavender-soft/50 text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-cream-50 py-12 sm:py-20 space-y-16 sm:space-y-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 relative">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-powder-pink/40 text-cocoa-deep text-xs font-extrabold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Our Story</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-cocoa-deep tracking-tight">
            Small beginnings. <br />
            <span className="italic font-serif text-powder-dark">Big love.</span>
          </h1>

          <p className="text-base sm:text-lg text-cocoa-muted font-normal leading-relaxed">
            Littlebloom was born from a simple belief: the purest beginnings deserve the tenderest touch.
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-5xl overflow-hidden bg-white border-2 border-white shadow-soft-lg">
              <Image
                src="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&q=80"
                alt="Mother and baby cuddled in organic cotton blanket"
                fill
                className="object-cover"
              />
            </div>
            {/* Float badge */}
            <div className="absolute -bottom-6 -right-4 bg-white/95 backdrop-blur-md p-4 rounded-3xl border border-warm-beige shadow-soft max-w-xs space-y-1">
              <p className="text-xs font-bold text-cocoa-deep flex items-center gap-1.5">
                <Award className="w-4 h-4 text-powder-dark" />
                <span>Certified Organic & Baby-Safe</span>
              </p>
              <p className="text-[11px] text-cocoa-muted">Dermatologist approved for newborn sensitive skin</p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5 text-left">
            <span className="text-xs font-extrabold uppercase tracking-widest text-powder-dark">
              Where It All Started
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-cocoa-deep tracking-tight">
              Crafted by parents, for parents.
            </h2>
            <p className="text-sm sm:text-base text-cocoa-muted leading-relaxed font-normal">
              When our founders welcomed their first baby, they searched endlessly for baby clothing that was truly non-toxic, buttery soft, and beautifully minimalist. Everything on store shelves was either scratchy synthetic polyester or covered in chaotic cartoon neon prints.
            </p>
            <p className="text-sm sm:text-base text-cocoa-muted leading-relaxed font-normal">
              We set out to create a sanctuary of pastel calmness: GOTS-certified organic cotton rompers, soothing silicone feeding sets, hand-carved Montessori wooden stacking toys, and heirloom keepsake blankets that get softer with every midnight snuggle.
            </p>
          </div>
        </div>

        {/* 4 Pledges */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-powder-dark">
              Our Commitments
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-cocoa-deep">
              Our 4 Pledges to Every Family
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pledges.map((pledge, idx) => {
              const Icon = pledge.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-4xl bg-white border border-warm-beige shadow-soft space-y-4 hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl ${pledge.color} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-cocoa-deep">
                    {pledge.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-cocoa-muted leading-relaxed">
                    {pledge.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Strip */}
        <div className="p-8 sm:p-12 rounded-5xl bg-gradient-to-r from-powder-pink via-lavender-soft/50 to-baby-blue border border-warm-beige shadow-soft grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-cocoa-deep">
          <div>
            <p className="font-serif text-3xl sm:text-4xl font-bold">25,000+</p>
            <p className="text-xs font-bold text-cocoa-muted uppercase tracking-wider mt-1">Families Loved</p>
          </div>
          <div>
            <p className="font-serif text-3xl sm:text-4xl font-bold">100%</p>
            <p className="text-xs font-bold text-cocoa-muted uppercase tracking-wider mt-1">Organic Cotton</p>
          </div>
          <div>
            <p className="font-serif text-3xl sm:text-4xl font-bold">0%</p>
            <p className="text-xs font-bold text-cocoa-muted uppercase tracking-wider mt-1">Toxic Chemicals</p>
          </div>
          <div>
            <p className="font-serif text-3xl sm:text-4xl font-bold">4.9 ★</p>
            <p className="text-xs font-bold text-cocoa-muted uppercase tracking-wider mt-1">Customer Rating</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4 pt-6">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cocoa-deep">
            Ready to welcome softness into your nursery?
          </h3>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-3xl bg-cocoa-deep text-cream text-sm font-bold shadow-soft hover:bg-cocoa-light transition-all"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-4 h-4 text-powder-pink" />
          </Link>
        </div>
      </div>
    </div>
  );
}
