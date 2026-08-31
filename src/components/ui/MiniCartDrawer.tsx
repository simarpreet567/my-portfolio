"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../providers/CartContext";

export const MiniCartDrawer: React.FC = () => {
  const {
    items,
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeFromCart,
    subtotal,
    freeShippingThreshold,
    freeShippingRemaining,
    isFreeShipping,
    total,
  } = useCart();

  useEffect(() => {
    if (isCartDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartDrawerOpen]);

  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-[9990] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 bg-cocoa-deep/40 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-md bg-cream-50 h-full shadow-2xl flex flex-col z-10 border-l border-warm-beige"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-warm-beige flex items-center justify-between bg-white">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-powder-pink/30 flex items-center justify-center text-powder-dark">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-cocoa-deep">Shopping Bag</h3>
                  <p className="text-xs text-cocoa-muted font-medium">
                    {items.length} {items.length === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>
              <button
                onClick={closeCartDrawer}
                className="p-2 rounded-xl text-cocoa-muted hover:text-cocoa-deep hover:bg-cream-200 transition-colors"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            <div className="p-4 bg-powder-light/60 border-b border-warm-beige">
              <div className="flex items-center justify-between text-xs font-semibold mb-1.5 text-cocoa-deep">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-powder-dark" />
                  {isFreeShipping ? (
                    <span className="text-sage-dark font-bold">🎉 You unlocked FREE Shipping!</span>
                  ) : (
                    <span>
                      Add <strong className="text-cocoa-deep">₹{freeShippingRemaining.toLocaleString("en-IN")}</strong> more for Free Shipping
                    </span>
                  )}
                </span>
                <span className="text-cocoa-muted text-[11px] font-bold">₹{freeShippingThreshold} Target</span>
              </div>
              <div className="w-full h-2 rounded-full bg-cream-200 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-powder-pink to-powder-dark rounded-full"
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-powder-pink/30 flex items-center justify-center text-3xl animate-float-slow">
                    🧸
                  </div>
                  <h4 className="font-serif text-xl text-cocoa-deep font-semibold">
                    Your little bag is feeling lonely.
                  </h4>
                  <p className="text-sm text-cocoa-muted max-w-xs leading-relaxed">
                    Explore our buttery soft rompers, organic muslin blankets, and nursery treasures!
                  </p>
                  <Link
                    href="/shop"
                    onClick={closeCartDrawer}
                    className="px-6 py-3 rounded-2xl bg-cocoa-deep text-cream text-sm font-bold shadow-soft hover:bg-cocoa-light transition-all inline-flex items-center gap-2"
                  >
                    Start Shopping
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex gap-3.5 p-3 rounded-2xl bg-white border border-warm-beige shadow-sm"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-cream-200 flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/product/${item.product.slug}`}
                            onClick={closeCartDrawer}
                            className="text-sm font-bold text-cocoa-deep hover:text-powder-dark truncate block leading-tight"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-cocoa-muted hover:text-rose-500 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-cocoa-muted">
                          <span className="inline-flex items-center gap-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-warm-beige"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            {item.selectedColor.name}
                          </span>
                          <span>•</span>
                          <span>{item.selectedSize.name}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-cream-200">
                        <p className="text-sm font-bold text-cocoa-deep">
                          ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                        <div className="flex items-center rounded-xl border border-warm-beige bg-cream-50 overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-cream-200 text-cocoa-deep transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-cocoa-deep">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-cream-200 text-cocoa-deep transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Drawer Footer with Totals & CTAs */}
            {items.length > 0 && (
              <div className="p-5 border-t border-warm-beige bg-white space-y-3">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-cocoa-muted">
                    <span>Subtotal</span>
                    <span className="font-semibold text-cocoa-deep">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-cocoa-muted">
                    <span>Estimated Shipping</span>
                    <span className="font-semibold text-sage-dark">
                      {isFreeShipping ? "FREE" : "₹99"}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-cocoa-deep pt-2 border-t border-cream-200">
                    <span>Estimated Total</span>
                    <span className="text-lg text-cocoa-deep">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Link
                    href="/cart"
                    onClick={closeCartDrawer}
                    className="w-full py-3 rounded-2xl border border-warm-beige bg-cream-50 text-cocoa-deep font-bold text-center text-sm hover:bg-cream-200 transition-all"
                  >
                    View Bag
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={closeCartDrawer}
                    className="w-full py-3 rounded-2xl bg-cocoa-deep text-cream font-bold text-center text-sm shadow-soft hover:bg-cocoa-light transition-all flex items-center justify-center gap-1.5"
                  >
                    Checkout
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
