"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Trash2,
  Heart,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Tag,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import { useCart } from "@/components/providers/CartContext";
import { useWishlist } from "@/components/providers/WishlistContext";
import { useToast } from "@/components/providers/ToastContext";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
    shipping,
    total,
    freeShippingThreshold,
    freeShippingRemaining,
    isFreeShipping,
    appliedPromo,
    applyPromo,
    removePromo,
  } = useCart();

  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    if (!promoInput.trim()) return;

    const res = applyPromo(promoInput);
    if (res.success) {
      showToast("Coupon Applied! ✨", res.message, "success");
      setPromoInput("");
    } else {
      setPromoError(res.message);
    }
  };

  const handleMoveToWishlist = (item: (typeof items)[0]) => {
    if (!isInWishlist(item.product.id)) {
      toggleWishlist(item.product);
    }
    removeFromCart(item.id);
    showToast("Moved to Wishlist ❤️", `${item.product.name} moved to your wishlist.`, "wishlist");
  };

  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="min-h-screen bg-cream-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 border-b border-warm-beige pb-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-powder-pink/40 text-cocoa-deep text-xs font-extrabold uppercase tracking-wider">
              <ShoppingBag className="w-3.5 h-3.5 text-powder-dark" />
              <span>Shopping Bag ({items.length} items)</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-cocoa-deep tracking-tight">
              Your Little Bag
            </h1>
          </div>

          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-bold text-cocoa-muted hover:text-rose-500 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear Bag</span>
            </button>
          )}
        </div>

        {/* Free Shipping Progress Card */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-warm-beige shadow-soft">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-cocoa-deep mb-2">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-powder-dark" />
              {isFreeShipping ? (
                <span className="text-sage-green font-extrabold">
                  🎉 Congratulations! You qualify for complimentary FREE Shipping.
                </span>
              ) : (
                <span>
                  Add <strong className="text-powder-dark">₹{freeShippingRemaining.toLocaleString("en-IN")}</strong> more for FREE Shipping!
                </span>
              )}
            </span>
            <span className="text-cocoa-muted text-xs">₹{freeShippingThreshold} Threshold</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-cream-200 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${shippingProgress}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-powder-pink to-powder-dark rounded-full"
            />
          </div>
        </div>

        {/* Main 2-Column Cart Content */}
        {items.length === 0 ? (
          <div className="py-20 text-center px-4 bg-white rounded-5xl border border-warm-beige shadow-soft max-w-2xl mx-auto space-y-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-powder-light flex items-center justify-center text-4xl shadow-inner animate-float-slow">
              🧸
            </div>
            <div className="space-y-2 max-w-md mx-auto">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cocoa-deep">
                Your little bag is feeling lonely.
              </h2>
              <p className="text-sm text-cocoa-muted leading-relaxed">
                Discover our cloud-soft organic rompers, silicone feeding sets, and tranquil nursery keepsakes!
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-3xl bg-cocoa-deep text-cream text-sm font-bold shadow-soft hover:bg-cocoa-light transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-powder-pink" />
              <span>Start Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Cart Items List (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 sm:p-6 rounded-4xl bg-white border border-warm-beige shadow-soft flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between"
                  >
                    {/* Item Image & Title */}
                    <div className="flex gap-4 sm:gap-5 items-center flex-1">
                      <div className="relative w-20 sm:w-24 aspect-[4/5] rounded-2xl overflow-hidden bg-cream-200 flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold uppercase text-powder-dark tracking-wider">
                          {item.product.category}
                        </span>
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="font-serif text-base sm:text-lg font-bold text-cocoa-deep hover:text-powder-dark block leading-tight"
                        >
                          {item.product.name}
                        </Link>
                        <div className="flex items-center gap-2 text-xs text-cocoa-muted font-medium pt-1">
                          <span className="flex items-center gap-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-warm-beige"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            {item.selectedColor.name}
                          </span>
                          <span>•</span>
                          <span>Size: {item.selectedSize.name}</span>
                        </div>
                        <p className="text-xs font-bold text-cocoa-deep pt-1">
                          ₹{item.product.price.toLocaleString("en-IN")} each
                        </p>
                      </div>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-cream-200">
                      <div className="text-right">
                        <span className="text-base sm:text-lg font-extrabold text-cocoa-deep">
                          ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Stepper */}
                        <div className="flex items-center rounded-2xl border border-warm-beige bg-cream-50 p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-cocoa-deep hover:bg-cream-200 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-cocoa-deep">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-cocoa-deep hover:bg-cream-200 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Move to Wishlist */}
                        <button
                          onClick={() => handleMoveToWishlist(item)}
                          className="p-2 rounded-xl text-cocoa-muted hover:text-rose-500 hover:bg-cream-100 transition-colors"
                          title="Save to Wishlist"
                        >
                          <Heart className="w-4 h-4" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 rounded-xl text-cocoa-muted hover:text-rose-500 hover:bg-cream-100 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Right: Order Summary Card (4 cols) */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              {/* Promo Code Box */}
              <div className="p-5 rounded-4xl bg-white border border-warm-beige shadow-soft space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-cocoa-deep uppercase tracking-wider">
                  <Tag className="w-4 h-4 text-powder-dark" />
                  <span>Have a Promo Code?</span>
                </div>
                {appliedPromo ? (
                  <div className="p-3 rounded-2xl bg-powder-light border border-powder-pink flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-cocoa-deep">
                        🏷️ Code: <span className="font-mono">{appliedPromo.code}</span>
                      </p>
                      <p className="text-[11px] text-cocoa-muted">{appliedPromo.description}</p>
                    </div>
                    <button
                      onClick={removePromo}
                      className="text-xs font-bold text-rose-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Try BLOOM10"
                      className="flex-1 px-4 py-2.5 rounded-2xl bg-cream-50 border border-warm-beige text-xs font-bold text-cocoa-deep placeholder:text-cocoa-muted uppercase focus:outline-none focus:border-powder-pink"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-2xl bg-cocoa-deep text-cream text-xs font-bold hover:bg-cocoa-light transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && <p className="text-xs text-rose-500 font-medium">{promoError}</p>}
              </div>

              {/* Cost Summary Box */}
              <div className="p-6 rounded-4xl bg-white border border-warm-beige shadow-soft space-y-4">
                <h3 className="font-serif text-xl font-bold text-cocoa-deep pb-3 border-b border-warm-beige">
                  Order Summary
                </h3>

                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-cocoa-muted">
                    <span>Subtotal</span>
                    <span className="font-bold text-cocoa-deep">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-powder-dark font-semibold">
                      <span>Promo Discount</span>
                      <span>-₹{discount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-cocoa-muted">
                    <span>Estimated Shipping</span>
                    <span className="font-bold text-sage-green">
                      {isFreeShipping ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-cream-200 flex justify-between items-baseline">
                    <span className="text-base font-bold text-cocoa-deep">Grand Total</span>
                    <span className="text-2xl font-extrabold text-cocoa-deep">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="w-full py-4 rounded-3xl bg-cocoa-deep text-cream hover:bg-cocoa-light font-bold text-base shadow-soft hover:shadow-soft-lg flex items-center justify-center gap-2 transition-all mt-4"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-powder-pink" />
                </Link>

                <div className="pt-2 flex items-center justify-center gap-2 text-xs text-cocoa-muted">
                  <ShieldCheck className="w-4 h-4 text-sage-green" />
                  <span>256-Bit Encrypted Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
