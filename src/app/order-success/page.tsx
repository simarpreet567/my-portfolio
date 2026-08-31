"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ShoppingBag, ArrowRight, Printer, Sparkles, Truck, Package, Clock, ShieldCheck } from "lucide-react";
import { ConfettiCelebration } from "@/components/ui/Confetti";
import { OrderDetails } from "@/types";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams ? searchParams.get("orderId") || "LB-984210" : "LB-984210";
  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("littlebloom_latest_order");
      if (stored) {
        setOrder(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
      {/* Success Header Card */}
      <div className="p-8 sm:p-12 rounded-5xl bg-white border-2 border-white shadow-soft-lg text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-sage-light mx-auto flex items-center justify-center text-sage-green shadow-soft">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-powder-pink/40 text-cocoa-deep text-xs font-extrabold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-powder-dark" />
          <span>Order Confirmed</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-cocoa-deep tracking-tight">
          Thank you for shopping tiny!
        </h1>

        <p className="text-sm sm:text-base text-cocoa-muted max-w-md mx-auto leading-relaxed">
          We’ve received your order and our boutique artisans are tenderly packaging your little treasures.
        </p>

        <div className="p-3 rounded-2xl bg-cream-100 max-w-xs mx-auto text-xs font-mono font-bold text-cocoa-deep">
          Order Reference: <span className="text-powder-dark">{order?.orderId || orderId}</span>
        </div>
      </div>

      {/* Delivery Progress Tracker */}
      <div className="p-6 sm:p-8 rounded-4xl bg-white border border-warm-beige shadow-soft space-y-6">
        <h3 className="font-serif text-xl font-bold text-cocoa-deep flex items-center gap-2">
          <Truck className="w-5 h-5 text-powder-dark" />
          <span>Delivery Timeline</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
          <div className="flex sm:flex-col items-center sm:text-center gap-3 p-3 rounded-2xl bg-powder-light/50 border border-powder-pink">
            <div className="w-8 h-8 rounded-full bg-powder-pink text-cocoa-deep flex items-center justify-center text-xs font-bold">
              ✓
            </div>
            <div>
              <p className="text-xs font-bold text-cocoa-deep">Order Placed</p>
              <p className="text-[10px] text-cocoa-muted font-medium">Payment verified</p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:text-center gap-3 p-3 rounded-2xl bg-cream-50 border border-warm-beige">
            <div className="w-8 h-8 rounded-full bg-cream-200 text-cocoa-deep flex items-center justify-center text-xs font-bold animate-pulse">
              🎁
            </div>
            <div>
              <p className="text-xs font-bold text-cocoa-deep">Packaging & Ribbon</p>
              <p className="text-[10px] text-cocoa-muted font-medium">In boutique studio</p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:text-center gap-3 p-3 rounded-2xl bg-cream-50 border border-warm-beige">
            <div className="w-8 h-8 rounded-full bg-cream-200 text-cocoa-muted flex items-center justify-center text-xs font-bold">
              🚚
            </div>
            <div>
              <p className="text-xs font-bold text-cocoa-deep">Dispatched</p>
              <p className="text-[10px] text-cocoa-muted font-medium">Within 24 hours</p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:text-center gap-3 p-3 rounded-2xl bg-cream-50 border border-warm-beige">
            <div className="w-8 h-8 rounded-full bg-cream-200 text-cocoa-muted flex items-center justify-center text-xs font-bold">
              🏡
            </div>
            <div>
              <p className="text-xs font-bold text-cocoa-deep">Delivered</p>
              <p className="text-[10px] text-cocoa-muted font-medium">Est. 3-5 business days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details & Summary Card */}
      {order && (
        <div className="p-6 sm:p-8 rounded-4xl bg-white border border-warm-beige shadow-soft space-y-6">
          <h3 className="font-serif text-xl font-bold text-cocoa-deep pb-3 border-b border-warm-beige">
            Receipt & Shipping Destination
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-cocoa-muted">
            <div>
              <p className="font-bold text-cocoa-deep uppercase tracking-wider mb-1">Delivering To:</p>
              <p className="font-semibold text-cocoa-deep text-sm">{order.address.fullName}</p>
              <p>{order.address.addressLine}</p>
              {order.address.apartment && <p>{order.address.apartment}</p>}
              <p>
                {order.address.city}, {order.address.state} - {order.address.pinCode}
              </p>
              <p className="pt-1">Phone: +91 {order.address.phone}</p>
            </div>

            <div>
              <p className="font-bold text-cocoa-deep uppercase tracking-wider mb-1">Payment Details:</p>
              <p className="font-semibold text-cocoa-deep capitalize">
                Method: {order.paymentMethod.toUpperCase()}
              </p>
              <p>Status: {order.paymentStatus === "paid" ? "Confirmed (Paid)" : "Cash on Delivery"}</p>
              <p>Date: {order.orderDate}</p>
              {order.address.giftWrap && (
                <p className="text-powder-dark font-bold pt-1">
                  🎁 Gift Wrapping & Greeting Note Included
                </p>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-cream-200 flex justify-between items-baseline text-sm">
            <span className="font-bold text-cocoa-deep">Total Paid</span>
            <span className="text-2xl font-black text-cocoa-deep">
              ₹{order.total.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <button
          onClick={handlePrint}
          className="px-6 py-3.5 rounded-3xl bg-white border border-warm-beige text-cocoa-deep hover:bg-cream-100 font-bold text-xs flex items-center gap-2 shadow-xs transition-all"
        >
          <Printer className="w-4 h-4 text-cocoa-muted" />
          <span>Print Receipt</span>
        </button>

        <Link
          href="/shop"
          className="px-8 py-3.5 rounded-3xl bg-cocoa-deep hover:bg-cocoa-light text-cream font-bold text-xs sm:text-sm shadow-soft flex items-center gap-2 transition-all"
        >
          <ShoppingBag className="w-4 h-4 text-powder-pink" />
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-cream-50 py-12 sm:py-16 relative overflow-hidden">
      <ConfettiCelebration />
      <Suspense fallback={
        <div className="max-w-md mx-auto text-center p-12 text-cocoa-muted font-medium">
          Loading your order details...
        </div>
      }>
        <OrderSuccessContent />
      </Suspense>
    </div>
  );
}
