"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Eye } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "../shop/ProductCard";
import { Product } from "@/types";

export const RecentlyViewedSection: React.FC = () => {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("littlebloom_recently_viewed");
      if (stored) {
        const ids: string[] = JSON.parse(stored);
        const matches = ids
          .map((id) => PRODUCTS.find((p) => p.id === id))
          .filter(Boolean) as Product[];
        if (matches.length > 0) {
          setRecentProducts(matches.slice(0, 4));
          return;
        }
      }
    } catch {
      // fallback
    }

    // Default fallback: 4 editor's picks
    setRecentProducts(PRODUCTS.filter((p) => p.featured || p.bestseller).slice(4, 8));
  }, []);

  if (recentProducts.length === 0) return null;

  return (
    <section className="py-14 sm:py-18 bg-white border-t border-warm-beige/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-powder-pink/40 flex items-center justify-center text-powder-dark">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-cocoa-deep">
                Recently Viewed & Recommended
              </h2>
              <p className="text-xs text-cocoa-muted">Curated items from your browsing journey</p>
            </div>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold text-cocoa-deep hover:text-powder-dark flex items-center gap-1"
          >
            <span>Explore All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {recentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
