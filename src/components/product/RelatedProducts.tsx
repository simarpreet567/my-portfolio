"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { ProductCard } from "../shop/ProductCard";
import { QuickViewModal } from "../shop/QuickViewModal";

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
  allProducts: Product[];
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentProductId,
  category,
  allProducts,
}) => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Pick up to 4 related products from same category or fallback to other popular products
  const related = allProducts
    .filter((p) => p.id !== currentProductId)
    .filter((p) => p.category === category || p.bestseller)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="pt-16 sm:pt-20 border-t border-warm-beige">
      <div className="space-y-2 mb-8">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cocoa-deep">
          You may also adore
        </h3>
        <p className="text-sm text-cocoa-muted">
          Complementary essentials curated to pair beautifully with your selection.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {related.map((prod) => (
          <ProductCard
            key={prod.id}
            product={prod}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        ))}
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
