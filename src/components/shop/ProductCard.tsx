"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star, Eye } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "../providers/CartContext";
import { useWishlist } from "../providers/WishlistContext";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  priority = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isSaved = isInWishlist(product.id);
  const hasSecondaryImage = product.images.length > 1;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.colors[0], product.sizes[0], 1);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col bg-white rounded-3xl p-3 sm:p-3.5 border border-warm-beige/80 hover:border-powder-pink/80 shadow-soft hover:shadow-soft-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-cream-200">
        {/* Main Image */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover transition-all duration-700 ease-out ${
            isHovered && hasSecondaryImage ? "opacity-0 scale-105" : "opacity-100 group-hover:scale-105"
          }`}
        />

        {/* Secondary Hover Image */}
        {hasSecondaryImage && (
          <Image
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover absolute inset-0 transition-all duration-700 ease-out ${
              isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
            }`}
          />
        )}

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold tracking-wide uppercase bg-cream-50/95 backdrop-blur-md text-cocoa-deep shadow-xs border border-warm-beige">
              {product.badge}
            </span>
          )}
          {product.discount && product.discount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-powder-pink text-cocoa-deep shadow-xs">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={isSaved ? "Remove from wishlist" : "Save to wishlist"}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all z-20 ${
            isSaved
              ? "bg-white text-rose-500 shadow-md scale-110"
              : "bg-white/80 hover:bg-white text-cocoa-muted hover:text-rose-500 shadow-xs"
          }`}
        >
          <motion.div whileTap={{ scale: 0.75 }}>
            <Heart
              className={`w-4 h-4 transition-colors ${
                isSaved ? "fill-rose-500 text-rose-500" : ""
              }`}
            />
          </motion.div>
        </button>

        {/* Quick View Button on Hover */}
        {onQuickView && (
          <button
            onClick={handleQuickViewClick}
            aria-label="Quick View"
            className="absolute top-12 right-2.5 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-cocoa-muted hover:text-cocoa-deep backdrop-blur-md shadow-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20 translate-x-2 group-hover:translate-x-0 duration-200"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}

        {/* Quick Add Button sliding up */}
        <div className="absolute inset-x-3 bottom-3 z-20">
          <motion.button
            onClick={handleQuickAdd}
            initial={false}
            animate={{
              y: isHovered ? 0 : 45,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full py-2.5 px-3 rounded-2xl bg-cocoa-deep/95 hover:bg-cocoa-deep text-cream text-xs font-bold shadow-soft flex items-center justify-center gap-2 backdrop-blur-sm transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-powder-pink" />
            <span>Quick Add</span>
          </motion.button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="pt-3 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-cocoa-muted mb-1">
            <span className="capitalize text-[11px] font-bold text-powder-dark">
              {product.category}
            </span>
            <div className="flex items-center gap-1 font-semibold text-cocoa-deep text-[11px]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-cocoa-muted font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <Link
            href={`/product/${product.slug}`}
            className="font-bold text-sm sm:text-base text-cocoa-deep hover:text-powder-dark transition-colors line-clamp-1 block"
          >
            {product.name}
          </Link>

          {/* Short description */}
          <p className="text-xs text-cocoa-muted line-clamp-1 mt-0.5">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing & Colors Footer */}
        <div className="pt-2.5 mt-2 border-t border-warm-beige/50 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-extrabold text-cocoa-deep">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-cocoa-muted line-through font-normal">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Color Dots */}
          {product.colors.length > 0 && (
            <div className="flex items-center -space-x-1">
              {product.colors.slice(0, 3).map((color, idx) => (
                <div
                  key={idx}
                  title={color.name}
                  className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-xs"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-[9px] font-bold text-cocoa-muted pl-1.5">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
