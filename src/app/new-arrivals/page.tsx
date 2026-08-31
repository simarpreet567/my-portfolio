"use client";

import React, { useState } from "react";
import { PRODUCTS } from "@/data/products";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function NewArrivalsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const newProducts = PRODUCTS.filter((p) => p.newArrival || p.featured);

  const displayedProducts =
    selectedCategory === "all"
      ? newProducts
      : newProducts.filter((p) => p.category === selectedCategory);

  const categories = [
    { label: "All New Arrivals", value: "all" },
    { label: "👕 Clothing", value: "clothing" },
    { label: "🧸 Toys", value: "toys" },
    { label: "🛏 Nursery", value: "nursery" },
    { label: "🍼 Feeding", value: "feeding" },
    { label: "🧴 Baby Care", value: "baby-care" },
    { label: "🧷 Diapering", value: "diapering" },
    { label: "👟 Footwear", value: "footwear" },
    { label: "🎀 Accessories", value: "accessories" },
    { label: "🎁 Gifts", value: "gifts" },
  ];

  return (
    <div className="min-h-screen bg-cream-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-powder-pink/40 text-cocoa-deep text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-powder-dark" />
            <span>Seasonal Additions</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-cocoa-deep tracking-tight">
            Just Landed at Little Bloom
          </h1>
          <p className="text-sm sm:text-base text-cocoa-muted font-normal">
            Be the first to explore our latest organic silhouettes, soothing nursery lighting, and sensory essentials.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
                selectedCategory === cat.value
                  ? "bg-cocoa-deep text-cream shadow-soft"
                  : "bg-white text-cocoa-deep border border-warm-beige hover:border-powder-pink"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <ProductGrid
          products={displayedProducts}
          columns={4}
          emptyTitle="No new arrivals in this category right now"
          emptyDescription="Check back soon as our artisans weave fresh batches weekly!"
        />
      </div>
    </div>
  );
}
