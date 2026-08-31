"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, ShoppingBag, Heart, Check, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { Product, ProductColor, ProductSize } from "@/types";
import { useCart } from "../providers/CartContext";
import { useWishlist } from "../providers/WishlistContext";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const currentColor = selectedColor || product.colors[0];
  const currentSize = selectedSize || product.sizes[0];
  const isSaved = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, currentColor, currentSize, quantity);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-cocoa-deep/50 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative w-full max-w-3xl bg-cream-50 rounded-4xl shadow-2xl border border-warm-beige overflow-hidden z-10 my-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-cocoa-muted hover:text-cocoa-deep flex items-center justify-center shadow-sm backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Column */}
            <div className="p-6 bg-white flex flex-col justify-between border-b md:border-b-0 md:border-r border-warm-beige">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-cream-200 shadow-inner">
                <Image
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                        selectedImageIndex === idx
                          ? "border-powder-dark shadow-sm scale-105"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt="Thumbnail" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details Column */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-powder-dark">
                  {product.category}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-cocoa-deep mt-1">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-cocoa-deep">{product.rating.toFixed(1)}</span>
                  <span className="text-xs text-cocoa-muted">({product.reviewCount} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mt-3">
                  <span className="text-2xl font-black text-cocoa-deep">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-cocoa-muted line-through">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                  {product.discount && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-powder-pink text-cocoa-deep">
                      Save {product.discount}%
                    </span>
                  )}
                </div>

                <p className="text-xs text-cocoa-muted mt-3 leading-relaxed">
                  {product.shortDescription}
                </p>

                {/* Color Selector */}
                {product.colors.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-bold text-cocoa-deep mb-1.5">
                      Color: <span className="font-normal text-cocoa-muted">{currentColor.name}</span>
                    </p>
                    <div className="flex gap-2">
                      {product.colors.map((col, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedColor(col)}
                          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                            currentColor.name === col.name
                              ? "border-cocoa-deep scale-110 shadow-xs"
                              : "border-transparent"
                          }`}
                          style={{ backgroundColor: col.hex }}
                          title={col.name}
                        >
                          {currentColor.name === col.name && (
                            <Check className="w-3.5 h-3.5 text-cocoa-deep stroke-[3]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                {product.sizes.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-bold text-cocoa-deep mb-1.5">
                      Size: <span className="font-normal text-cocoa-muted">{currentSize.name}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((sz, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedSize(sz)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                            currentSize.name === sz.name
                              ? "bg-cocoa-deep text-cream border-cocoa-deep shadow-xs"
                              : "bg-white text-cocoa-deep border-warm-beige hover:border-powder-pink"
                          }`}
                        >
                          {sz.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4 border-t border-warm-beige">
                <div className="flex gap-2">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-4 rounded-2xl bg-cocoa-deep hover:bg-cocoa-light text-cream font-bold text-sm shadow-soft flex items-center justify-center gap-2 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4 text-powder-pink" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3 rounded-2xl border border-warm-beige transition-colors ${
                      isSaved ? "bg-rose-50 border-rose-200 text-rose-500" : "bg-white text-cocoa-muted hover:text-rose-500"
                    }`}
                    title={isSaved ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart className={`w-5 h-5 ${isSaved ? "fill-rose-500" : ""}`} />
                  </button>
                </div>

                <Link
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="w-full py-2.5 rounded-2xl bg-cream-200 hover:bg-powder-pink/40 text-cocoa-deep text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>View Full Product Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
