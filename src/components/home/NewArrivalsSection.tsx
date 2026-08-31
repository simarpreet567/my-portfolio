"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "../shop/ProductCard";
import { QuickViewModal } from "../shop/QuickViewModal";
import { Product } from "@/types";

export const NewArrivalsSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const newArrivals = PRODUCTS.filter((p) => p.newArrival);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-cream-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Carousel Arrows */}
        <div className="flex items-end justify-between mb-8 sm:mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-baby-blue/60 text-cocoa-deep text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Fresh Off The Loom</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-cocoa-deep tracking-tight">
              Just landed
            </h2>
            <p className="text-sm sm:text-base text-cocoa-muted font-normal">
              Fresh seasonal pieces designed for endless comfort and playful smiles.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => handleScroll("left")}
              className="w-11 h-11 rounded-2xl bg-white border border-warm-beige hover:border-powder-pink text-cocoa-deep flex items-center justify-center shadow-xs hover:bg-cream-200 transition-all"
              aria-label="Previous items"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="w-11 h-11 rounded-2xl bg-cocoa-deep text-cream flex items-center justify-center shadow-soft hover:bg-cocoa-light transition-all"
              aria-label="Next items"
            >
              <ChevronRight className="w-5 h-5 text-powder-pink" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {newArrivals.map((product) => (
            <div
              key={product.id}
              className="min-w-[260px] sm:min-w-[280px] md:min-w-[300px] flex-shrink-0 snap-start"
            >
              <ProductCard
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            </div>
          ))}
        </div>

        {/* Mobile View All button */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/new-arrivals"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-warm-beige text-xs font-bold text-cocoa-deep shadow-xs"
          >
            <span>Explore All New Arrivals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Quick View Modal */}
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      </div>
    </section>
  );
};
