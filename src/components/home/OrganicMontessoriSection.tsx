"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2, Leaf, Shapes } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "../shop/ProductCard";

export const OrganicMontessoriSection: React.FC = () => {
  const organicProducts = PRODUCTS.filter((p) => p.isOrganic).slice(0, 4);
  const montessoriProducts = PRODUCTS.filter((p) => p.isMontessori).slice(0, 4);

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-cream-50 via-cream-100/60 to-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Banner 1: The Pure Organic Collection */}
        <div className="rounded-5xl p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-[#F0F7F1] via-white to-[#FAF5EF] border border-[#A3C9A8]/50 shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A3C9A8]/30 text-emerald-900 text-xs font-extrabold uppercase tracking-wider">
                <Leaf className="w-3.5 h-3.5 text-emerald-700" />
                <span>100% Certified Organic</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-cocoa-deep tracking-tight">
                Gentle on Skin, Kind to Earth
              </h2>
              <p className="text-xs sm:text-sm text-cocoa-muted leading-relaxed">
                Every fiber in our organic range is GOTS-certified combed cotton and sustainably grown bamboo — free from pesticides, heavy metals, and toxic chemical finishes.
              </p>
              <div className="space-y-2 pt-2 text-xs font-semibold text-cocoa-deep">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>OEKO-TEX 100 Class 1 Infant Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Hypoallergenic & Eczema-Safe</span>
                </div>
              </div>
              <div className="pt-3">
                <Link
                  href="/shop?badge=organic"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-900 hover:bg-emerald-950 text-white text-xs font-bold transition-all shadow-sm"
                >
                  <span>Explore Organic Range</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 4 Organic Products Display */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {organicProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>

        {/* Banner 2: The Montessori Play & Learn Collection */}
        <div className="rounded-5xl p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-[#EFF7FC] via-white to-[#F5F1FD] border border-[#CFE8F7] shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-baby-blue/40 text-blue-950 text-xs font-extrabold uppercase tracking-wider">
                <Shapes className="w-3.5 h-3.5 text-blue-700" />
                <span>Montessori Development</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-cocoa-deep tracking-tight">
                Play With Purpose & Wonder
              </h2>
              <p className="text-xs sm:text-sm text-cocoa-muted leading-relaxed">
                Heirloom wooden toys designed to inspire open-ended imagination, spatial problem solving, and fine motor coordination without noisy screens or flashing lights.
              </p>
              <div className="space-y-2 pt-2 text-xs font-semibold text-cocoa-deep">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Sustainably Harvested FSC Beech & Basswood</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Lead-Free Botanical Water Stains</span>
                </div>
              </div>
              <div className="pt-3">
                <Link
                  href="/shop?badge=montessori"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-cocoa-deep hover:bg-cocoa-light text-white text-xs font-bold transition-all shadow-sm"
                >
                  <span>Shop Montessori Toys</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 4 Montessori Products Display */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {montessoriProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
