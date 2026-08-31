"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Maximize2 } from "lucide-react";
import { Product } from "@/types";
import { useWishlist } from "../providers/WishlistContext";

interface ProductGalleryProps {
  product: Product;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ product }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isSaved = isInWishlist(product.id);
  const currentImage = product.images[selectedIndex] || product.images[0];

  return (
    <div className="space-y-4">
      {/* Main Large Image Box */}
      <div className="relative aspect-[4/5] rounded-4xl overflow-hidden bg-white border border-warm-beige shadow-soft">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <Image
              src={currentImage}
              alt={`${product.name} showcase`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`object-cover transition-transform duration-500 ${
                isZoomed ? "scale-125 cursor-zoom-out" : "scale-100 cursor-zoom-in"
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            />
          </motion.div>
        </AnimatePresence>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.badge && (
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-white/90 backdrop-blur-md text-cocoa-deep border border-warm-beige shadow-xs">
              {product.badge}
            </span>
          )}
          {product.discount && product.discount > 0 && (
            <span className="px-2.5 py-1 rounded-full text-xs font-extrabold uppercase bg-powder-pink text-cocoa-deep shadow-xs">
              -{product.discount}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product)}
          aria-label={isSaved ? "Remove from wishlist" : "Save to wishlist"}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all z-20 ${
            isSaved
              ? "bg-white text-rose-500 shadow-md scale-110"
              : "bg-white/80 hover:bg-white text-cocoa-muted hover:text-rose-500 shadow-xs"
          }`}
        >
          <Heart className={`w-5 h-5 ${isSaved ? "fill-rose-500 text-rose-500" : ""}`} />
        </button>

        {/* Zoom Hint */}
        <div className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-warm-beige text-[11px] font-bold text-cocoa-deep flex items-center gap-1.5 shadow-xs pointer-events-none">
          <Maximize2 className="w-3 h-3 text-powder-dark" />
          <span>Click to zoom</span>
        </div>
      </div>

      {/* Thumbnails Rail */}
      {product.images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {product.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-20 sm:w-24 aspect-[4/5] rounded-2xl overflow-hidden bg-cream-200 border-2 flex-shrink-0 transition-all ${
                selectedIndex === idx
                  ? "border-powder-dark shadow-soft scale-105"
                  : "border-warm-beige opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={img} alt={`${product.name} thumb ${idx}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
