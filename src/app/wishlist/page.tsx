"use client";

import React from "react";
import Link from "next/link";
import { useWishlist } from "@/components/providers/WishlistContext";
import { ProductCard } from "@/components/shop/ProductCard";
import { Heart, Sparkles, ShoppingBag, ArrowRight } from "lucide-react";
import { FloatingCloud, FloatingStar } from "@/components/home/FloatingObjects";

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-cream-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 border-b border-warm-beige pb-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-powder-pink/40 text-cocoa-deep text-xs font-extrabold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>Saved Items ({items.length})</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-cocoa-deep tracking-tight">
              Little things you love
            </h1>
            <p className="text-sm text-cocoa-muted">
              Keep track of your nursery favorites and wishlist treasures.
            </p>
          </div>

          {items.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs font-bold text-cocoa-muted hover:text-rose-500 transition-colors"
            >
              Clear Entire Wishlist
            </button>
          )}
        </div>

        {/* Wishlist Items Grid or Empty State */}
        {items.length === 0 ? (
          <div className="py-20 text-center px-4 bg-white rounded-5xl border border-warm-beige shadow-soft max-w-2xl mx-auto relative overflow-hidden space-y-6">
            <div className="absolute top-4 left-6 hidden sm:block pointer-events-none">
              <FloatingCloud size="sm" />
            </div>
            <FloatingStar className="absolute top-6 right-10" color="#F7C9D4" delay={0.3} />

            <div className="relative w-24 h-24 mx-auto rounded-full bg-powder-light flex items-center justify-center text-4xl shadow-inner animate-float-slow">
              💖
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cocoa-deep">
                Your little wishlist is waiting for something lovely.
              </h2>
              <p className="text-sm text-cocoa-muted leading-relaxed">
                Save soft organic rompers, wooden sensory toys, and nursery essentials to shop them whenever you&apos;re ready.
              </p>
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-3xl bg-cocoa-deep text-cream text-sm font-bold shadow-soft hover:bg-cocoa-light transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-powder-pink" />
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
