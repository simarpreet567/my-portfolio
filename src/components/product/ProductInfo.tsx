"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  ShoppingBag,
  Heart,
  Check,
  Truck,
  ShieldCheck,
  RefreshCw,
  Ruler,
  X,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Product, ProductColor, ProductSize } from "@/types";
import { useCart } from "../providers/CartContext";
import { useWishlist } from "../providers/WishlistContext";
import { useToast } from "../providers/ToastContext";

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const isSaved = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    router.push("/checkout");
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length !== 6 || isNaN(Number(pincode))) {
      setPincodeStatus("Please enter a valid 6-digit Indian PIN code");
      return;
    }
    const days = Number(pincode[0]) < 4 ? "2-3 business days" : "3-5 business days";
    setPincodeStatus(`✨ Express Delivery to ${pincode} in ${days}. Cash on Delivery eligible.`);
  };

  return (
    <div className="space-y-6">
      {/* Category Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cocoa-muted">
        <Link href="/" className="hover:text-cocoa-deep">Home</Link>
        <span>/</span>
        <Link href={`/category/${product.category}`} className="hover:text-cocoa-deep text-powder-dark">
          {product.category}
        </Link>
      </div>

      {/* Title & Ratings */}
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-cocoa-deep tracking-tight leading-tight">
          {product.name}
        </h1>

        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-bold text-cocoa-deep">{product.rating.toFixed(1)}</span>
          <span className="text-sm text-cocoa-muted font-medium">({product.reviewCount} customer reviews)</span>
        </div>
      </div>

      {/* Pricing */}
      <div className="p-4 rounded-3xl bg-cream-100/80 border border-warm-beige flex items-baseline gap-3">
        <span className="text-3xl sm:text-4xl font-extrabold text-cocoa-deep">
          ₹{product.price.toLocaleString("en-IN")}
        </span>
        {product.originalPrice && (
          <span className="text-lg text-cocoa-muted line-through font-medium">
            ₹{product.originalPrice.toLocaleString("en-IN")}
          </span>
        )}
        {product.discount && (
          <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-powder-pink text-cocoa-deep shadow-xs ml-auto">
            Save ₹{((product.originalPrice || 0) - product.price).toLocaleString("en-IN")} ({product.discount}%)
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm sm:text-base text-cocoa-muted leading-relaxed font-normal">
        {product.description}
      </p>

      {/* Color Selection */}
      {product.colors.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cocoa-deep">
              Color: <strong className="text-powder-dark font-extrabold">{selectedColor.name}</strong>
            </span>
          </div>
          <div className="flex gap-2.5">
            {product.colors.map((color) => {
              const isSelected = selectedColor.name === color.name;
              return (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected ? "border-cocoa-deep scale-110 shadow-soft" : "border-warm-beige hover:border-powder-pink"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {isSelected && <Check className="w-4 h-4 text-cocoa-deep stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Size Selection & Size Guide */}
      {product.sizes.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cocoa-deep">
              Size: <strong className="text-cocoa-deep font-extrabold">{selectedSize.name}</strong>
            </span>
            <button
              onClick={() => setIsSizeGuideOpen(true)}
              className="inline-flex items-center gap-1 text-xs font-bold text-powder-dark hover:underline"
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>Baby Size Guide</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {product.sizes.map((size) => {
              const isSelected = selectedSize.name === size.name;
              return (
                <button
                  key={size.name}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold border transition-all ${
                    isSelected
                      ? "bg-cocoa-deep text-cream border-cocoa-deep shadow-soft scale-105"
                      : "bg-white text-cocoa-deep border-warm-beige hover:border-powder-pink"
                  }`}
                >
                  {size.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity & CTA Buttons */}
      <div className="space-y-3 pt-2">
        <div className="flex gap-3">
          {/* Quantity Stepper */}
          <div className="flex items-center rounded-3xl border border-warm-beige bg-white shadow-xs p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-cocoa-deep hover:bg-cream-100 font-bold transition-colors"
            >
              -
            </button>
            <span className="w-10 text-center text-sm font-bold text-cocoa-deep">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-cocoa-deep hover:bg-cream-100 font-bold transition-colors"
            >
              +
            </button>
          </div>

          {/* Add to Bag */}
          <button
            onClick={handleAddToCart}
            className="flex-1 py-4 px-6 rounded-3xl bg-cocoa-deep hover:bg-cocoa-light text-cream font-bold text-sm sm:text-base shadow-soft hover:shadow-soft-lg flex items-center justify-center gap-2.5 transition-all"
          >
            <ShoppingBag className="w-5 h-5 text-powder-pink" />
            <span>Add to Bag</span>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(product)}
            className={`w-14 h-14 rounded-3xl border border-warm-beige flex items-center justify-center transition-all ${
              isSaved ? "bg-rose-50 border-rose-200 text-rose-500 shadow-sm" : "bg-white text-cocoa-muted hover:text-rose-500 hover:border-powder-pink"
            }`}
            aria-label="Save to wishlist"
          >
            <Heart className={`w-6 h-6 ${isSaved ? "fill-rose-500" : ""}`} />
          </button>
        </div>

        {/* Buy Now Button */}
        <button
          onClick={handleBuyNow}
          className="w-full py-4 px-6 rounded-3xl bg-gradient-to-r from-powder-pink via-lavender-soft/60 to-baby-blue text-cocoa-deep font-extrabold text-sm sm:text-base border border-powder-pink/50 shadow-soft hover:opacity-95 transition-opacity"
        >
          Buy Now (Direct Checkout)
        </button>
      </div>

      {/* Pin Code Delivery Checker */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-warm-beige shadow-soft space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-cocoa-deep uppercase tracking-wider">
          <MapPin className="w-4 h-4 text-powder-dark" />
          <span>Check Delivery Timeline</span>
        </div>
        <form onSubmit={handleCheckPincode} className="flex gap-2">
          <input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter 6-digit PIN Code"
            className="flex-1 px-4 py-2.5 rounded-2xl bg-cream-50 border border-warm-beige text-xs font-bold text-cocoa-deep placeholder:text-cocoa-muted focus:outline-none focus:border-powder-pink"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-2xl bg-cocoa-deep text-cream text-xs font-bold hover:bg-cocoa-light transition-colors"
          >
            Check
          </button>
        </form>
        {pincodeStatus && (
          <p className="text-xs font-semibold text-cocoa-deep bg-sage-light p-2.5 rounded-xl border border-sage-green/30">
            {pincodeStatus}
          </p>
        )}
      </div>

      {/* Trust Highlights */}
      <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs font-bold text-cocoa-deep">
        <div className="p-3 rounded-2xl bg-white border border-warm-beige flex flex-col items-center gap-1.5 shadow-xs">
          <ShieldCheck className="w-5 h-5 text-powder-dark" />
          <span>100% Baby-Safe</span>
        </div>
        <div className="p-3 rounded-2xl bg-white border border-warm-beige flex flex-col items-center gap-1.5 shadow-xs">
          <Truck className="w-5 h-5 text-blue-600" />
          <span>Free on ₹999+</span>
        </div>
        <div className="p-3 rounded-2xl bg-white border border-warm-beige flex flex-col items-center gap-1.5 shadow-xs">
          <RefreshCw className="w-5 h-5 text-sage-green" />
          <span>14-Day Returns</span>
        </div>
      </div>

      {/* Baby Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-cocoa-deep/50 backdrop-blur-sm" onClick={() => setIsSizeGuideOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-4xl p-6 sm:p-8 shadow-2xl border border-warm-beige z-10 space-y-4">
            <div className="flex items-center justify-between border-b border-warm-beige pb-3">
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-powder-dark" />
                <h3 className="font-serif text-xl font-bold text-cocoa-deep">Baby Sizing Guide</h3>
              </div>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="p-1.5 rounded-xl text-cocoa-muted hover:bg-cream-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-cocoa-muted">
              Babies grow quickly! When in doubt or approaching the next weight bracket, we suggest choosing one size up.
            </p>

            {/* Sizing Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-cream-100 text-cocoa-deep border-b border-warm-beige">
                    <th className="p-2.5 font-bold">Size</th>
                    <th className="p-2.5 font-bold">Age</th>
                    <th className="p-2.5 font-bold">Weight (kg)</th>
                    <th className="p-2.5 font-bold">Height (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-beige text-cocoa-muted font-medium">
                  <tr>
                    <td className="p-2.5 font-bold text-cocoa-deep">NB</td>
                    <td className="p-2.5">0-1 Month</td>
                    <td className="p-2.5">Up to 4.0 kg</td>
                    <td className="p-2.5">Up to 52 cm</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-cocoa-deep">0-3M</td>
                    <td className="p-2.5">1-3 Months</td>
                    <td className="p-2.5">4.0 – 6.0 kg</td>
                    <td className="p-2.5">52 – 62 cm</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-cocoa-deep">3-6M</td>
                    <td className="p-2.5">3-6 Months</td>
                    <td className="p-2.5">6.0 – 8.0 kg</td>
                    <td className="p-2.5">62 – 68 cm</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-cocoa-deep">6-12M</td>
                    <td className="p-2.5">6-12 Months</td>
                    <td className="p-2.5">8.0 – 10.5 kg</td>
                    <td className="p-2.5">68 – 76 cm</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-cocoa-deep">1-2Y</td>
                    <td className="p-2.5">12-24 Months</td>
                    <td className="p-2.5">10.5 – 13.0 kg</td>
                    <td className="p-2.5">76 – 88 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="w-full py-3 rounded-2xl bg-cocoa-deep text-cream text-xs font-bold hover:bg-cocoa-light"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
