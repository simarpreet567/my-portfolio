"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductAccordions } from "@/components/product/ProductAccordions";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { ArrowLeft } from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="text-5xl">🧸</div>
        <h1 className="font-serif text-3xl font-bold text-cocoa-deep">Product Not Found</h1>
        <p className="text-sm text-cocoa-muted max-w-sm">
          We couldn&apos;t find this little item in our boutique catalog.
        </p>
        <Link
          href="/shop"
          className="px-6 py-3 rounded-2xl bg-cocoa-deep text-cream text-xs font-bold shadow-soft"
        >
          Explore All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Back Link */}
        <div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold text-cocoa-muted hover:text-cocoa-deep"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Collections</span>
          </Link>
        </div>

        {/* 2-Column Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Gallery Column (6 cols) */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <ProductGallery product={product} />
          </div>

          {/* Product Details Column (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            <ProductInfo product={product} />
            <ProductAccordions product={product} />
          </div>
        </div>

        {/* Related Products Section */}
        <RelatedProducts
          currentProductId={product.id}
          category={product.category}
          allProducts={PRODUCTS}
        />
      </div>
    </div>
  );
}
