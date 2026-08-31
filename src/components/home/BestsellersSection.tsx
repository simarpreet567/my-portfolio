"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "../shop/ProductCard";
import { QuickViewModal } from "../shop/QuickViewModal";
import { Product } from "@/types";

const TABS = [
  { id: "all", label: "All Bestsellers" },
  { id: "clothing", label: "👕 Clothing" },
  { id: "toys", label: "🧸 Toys" },
  { id: "nursery", label: "🛏 Nursery" },
  { id: "feeding", label: "🍼 Feeding" },
  { id: "baby-care", label: "🧴 Baby Care" },
  { id: "gifts", label: "🎁 Gifts" },
];

export const BestsellersSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeTab === "all") return p.bestseller || p.featured;
    return p.category === activeTab;
  }).slice(0, 8);

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-powder-pink/40 text-cocoa-deep text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-powder-dark" />
              <span>Parent-Approved</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-cocoa-deep tracking-tight">
              Little Bloom Bestsellers
            </h2>
            <p className="text-sm sm:text-base text-cocoa-muted font-normal">
              The everyday essentials and heirloom keepsakes our community of parents loves most.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-bold text-cocoa-deep hover:text-powder-dark group self-start md:self-auto"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold shrink-0 transition-all ${
                activeTab === tab.id
                  ? "bg-cocoa-deep text-cream shadow-soft"
                  : "bg-cream-100 text-cocoa-deep/80 hover:bg-cream-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 8 Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
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
