"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { QuickViewModal } from "./QuickViewModal";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  columns?: 2 | 3 | 4;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading = false,
  emptyTitle = "No little treasures match your search",
  emptyDescription = "Try adjusting your filters or search keywords to find what you're looking for.",
  columns = 4,
}) => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl p-3 sm:p-4 border border-warm-beige space-y-3 animate-pulse"
          >
            <div className="w-full aspect-[4/5] rounded-2xl bg-cream-200" />
            <div className="h-3 w-1/3 bg-cream-200 rounded-full" />
            <div className="h-4 w-3/4 bg-cream-200 rounded-full" />
            <div className="h-4 w-1/2 bg-cream-200 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-16 sm:py-20 text-center px-4 bg-white rounded-4xl border border-warm-beige shadow-soft">
        <div className="w-20 h-20 rounded-full bg-powder-light mx-auto flex items-center justify-center text-3xl mb-4 animate-float-slow">
          🧸
        </div>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-cocoa-deep">
          {emptyTitle}
        </h3>
        <p className="text-sm text-cocoa-muted max-w-md mx-auto mt-2 leading-relaxed">
          {emptyDescription}
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-cocoa-deep text-cream text-sm font-bold shadow-soft hover:bg-cocoa-light transition-all"
        >
          <ShoppingBag className="w-4 h-4 text-powder-pink" />
          <span>Explore All Collections</span>
        </Link>
      </div>
    );
  }

  const gridColsClass =
    columns === 4
      ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      : columns === 3
      ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3"
      : "grid-cols-2";

  return (
    <>
      <div className={`grid ${gridColsClass} gap-3 sm:gap-5 lg:gap-6`}>
        {products.map((product, idx) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={(p) => setQuickViewProduct(p)}
            priority={idx < 4}
          />
        ))}
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
};
