"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  Truck,
  ArrowRight,
  Gift,
  CheckCircle2,
  CreditCard,
  QrCode,
  Banknote,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/components/providers/CartContext";
import { useToast } from "@/components/providers/ToastContext";
import { ShippingAddress } from "@/types";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, discount, shipping, total, isFreeShipping, clearCart } = useCart();
  const { showToast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod">("upi");
  const [includeGiftWrap, setIncludeGiftWrap] = useState(false);
  const [giftNote, setGiftNote] = useState("");

  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "9876543210",
    addressLine: "Flat 402, Lotus Bloom Apartments, Bandra West",
    apartment: "Tower B",
    city: "Mumbai",
    state: "Maharashtra",
    pinCode: "400050",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone || !formData.addressLine || !formData.pinCode) {
      showToast("Please fill all required fields", "Delivery address details are required.", "info");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `LB-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderData = {
        orderId,
        orderDate: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        address: { ...formData, giftWrap: includeGiftWrap, giftNote },
        items,
        subtotal,
        discount,
        shipping,
        total,
        paymentMethod,
        paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
        orderStatus: "confirmed",
        trackingNumber: `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
        estimatedDelivery: "3-5 Business Days",
      };

      try {
        localStorage.setItem("littlebloom_latest_order", JSON.stringify(orderData));
      } catch (err) {
        console.error("Failed to save order details", err);
      }

      clearCart();
      setIsSubmitting(false);
      router.push(`/order-success?orderId=${orderId}`);
    }, 1200);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="text-5xl">🛍️</div>
        <h1 className="font-serif text-3xl font-bold text-cocoa-deep">Your bag is empty</h1>
        <p className="text-sm text-cocoa-muted max-w-sm">
          Please add items to your shopping bag before proceeding to checkout.
        </p>
        <Link
          href="/shop"
          className="px-6 py-3 rounded-2xl bg-cocoa-deep text-cream text-xs font-bold shadow-soft"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Checkout Header */}
        <div className="flex items-center justify-between border-b border-warm-beige pb-6 mb-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-powder-dark">
              Safe & Encrypted
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-cocoa-deep mt-0.5">
              Checkout
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-sage-green bg-sage-light px-3 py-1.5 rounded-full border border-sage-green/30">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit SSL Protection</span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Contact Information */}
            <div className="p-6 sm:p-8 rounded-4xl bg-white border border-warm-beige shadow-soft space-y-4">
              <h2 className="font-serif text-xl font-bold text-cocoa-deep flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-powder-pink/50 text-xs flex items-center justify-center font-sans font-extrabold text-cocoa-deep">
                  1
                </span>
                <span>Contact Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-cocoa-deep mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-2xl bg-cream-50 border border-warm-beige text-xs font-semibold text-cocoa-deep focus:outline-none focus:border-powder-pink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-cocoa-deep mb-1">
                    Phone Number (for SMS Tracking) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    className="w-full px-4 py-3 rounded-2xl bg-cream-50 border border-warm-beige text-xs font-semibold text-cocoa-deep focus:outline-none focus:border-powder-pink"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="p-6 sm:p-8 rounded-4xl bg-white border border-warm-beige shadow-soft space-y-4">
              <h2 className="font-serif text-xl font-bold text-cocoa-deep flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-powder-pink/50 text-xs flex items-center justify-center font-sans font-extrabold text-cocoa-deep">
                  2
                </span>
                <span>Delivery Address</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-cocoa-deep mb-1">
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-4 py-3 rounded-2xl bg-cream-50 border border-warm-beige text-xs font-semibold text-cocoa-deep focus:outline-none focus:border-powder-pink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-cocoa-deep mb-1">
                    Street Address & House No. *
                  </label>
                  <input
                    type="text"
                    name="addressLine"
                    required
                    value={formData.addressLine}
                    onChange={handleInputChange}
                    placeholder="House / Apartment / Street Name"
                    className="w-full px-4 py-3 rounded-2xl bg-cream-50 border border-warm-beige text-xs font-semibold text-cocoa-deep focus:outline-none focus:border-powder-pink"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-cocoa-deep mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="w-full px-4 py-3 rounded-2xl bg-cream-50 border border-warm-beige text-xs font-semibold text-cocoa-deep focus:outline-none focus:border-powder-pink"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-cocoa-deep mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="State"
                      className="w-full px-4 py-3 rounded-2xl bg-cream-50 border border-warm-beige text-xs font-semibold text-cocoa-deep focus:outline-none focus:border-powder-pink"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-cocoa-deep mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="pinCode"
                      maxLength={6}
                      required
                      value={formData.pinCode}
                      onChange={handleInputChange}
                      placeholder="6 Digits"
                      className="w-full px-4 py-3 rounded-2xl bg-cream-50 border border-warm-beige text-xs font-semibold text-cocoa-deep focus:outline-none focus:border-powder-pink"
                    />
                  </div>
                </div>
              </div>

              {/* Gift Wrap Toggle */}
              <div className="pt-4 border-t border-warm-beige space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeGiftWrap}
                    onChange={(e) => setIncludeGiftWrap(e.target.checked)}
                    className="w-4 h-4 rounded text-powder-dark accent-powder-dark"
                  />
                  <div className="flex items-center gap-1.5 text-xs font-bold text-cocoa-deep">
                    <Gift className="w-4 h-4 text-powder-dark" />
                    <span>Include Complimentary Luxury Gift Wrapping & Ribbon 🎁</span>
                  </div>
                </label>

                {includeGiftWrap && (
                  <div>
                    <textarea
                      rows={2}
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      placeholder="Write your sweet message for the gold-foiled welcome card..."
                      className="w-full p-3 rounded-2xl bg-cream-50 border border-warm-beige text-xs text-cocoa-deep focus:outline-none focus:border-powder-pink"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="p-6 sm:p-8 rounded-4xl bg-white border border-warm-beige shadow-soft space-y-4">
              <h2 className="font-serif text-xl font-bold text-cocoa-deep flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-powder-pink/50 text-xs flex items-center justify-center font-sans font-extrabold text-cocoa-deep">
                  3
                </span>
                <span>Payment Method</span>
              </h2>

              <div className="space-y-3">
                {/* UPI / QR Option */}
                <label
                  onClick={() => setPaymentMethod("upi")}
                  className={`flex items-center justify-between p-4 rounded-3xl border-2 cursor-pointer transition-all ${
                    paymentMethod === "upi"
                      ? "border-cocoa-deep bg-cream-100 shadow-xs"
                      : "border-warm-beige hover:border-powder-pink"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-powder-pink/30 flex items-center justify-center text-powder-dark">
                      <QrCode className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-cocoa-deep">UPI (Instant 0% Fee)</p>
                      <p className="text-[11px] text-cocoa-muted">Google Pay, PhonePe, Paytm, UPI QR</p>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "upi" ? "border-cocoa-deep bg-cocoa-deep" : "border-warm-beige"
                    }`}
                  >
                    {paymentMethod === "upi" && <span className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </label>

                {/* Cards Option */}
                <label
                  onClick={() => setPaymentMethod("card")}
                  className={`flex items-center justify-between p-4 rounded-3xl border-2 cursor-pointer transition-all ${
                    paymentMethod === "card"
                      ? "border-cocoa-deep bg-cream-100 shadow-xs"
                      : "border-warm-beige hover:border-powder-pink"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-baby-blue/40 flex items-center justify-center text-blue-600">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-cocoa-deep">Credit / Debit Card</p>
                      <p className="text-[11px] text-cocoa-muted">Visa, Mastercard, RuPay, Amex</p>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "card" ? "border-cocoa-deep bg-cocoa-deep" : "border-warm-beige"
                    }`}
                  >
                    {paymentMethod === "card" && <span className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </label>

                {/* Cash on Delivery Option */}
                <label
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex items-center justify-between p-4 rounded-3xl border-2 cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-cocoa-deep bg-cream-100 shadow-xs"
                      : "border-warm-beige hover:border-powder-pink"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-sage-light flex items-center justify-center text-sage-green">
                      <Banknote className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-cocoa-deep">Cash on Delivery (COD)</p>
                      <p className="text-[11px] text-cocoa-muted">Pay comfortably with cash/UPI at your doorstep</p>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "cod" ? "border-cocoa-deep bg-cocoa-deep" : "border-warm-beige"
                    }`}
                  >
                    {paymentMethod === "cod" && <span className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </label>
              </div>
            </div>

            {/* Place Order CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 rounded-4xl bg-cocoa-deep hover:bg-cocoa-light text-cream font-extrabold text-base sm:text-lg shadow-soft hover:shadow-soft-lg flex items-center justify-center gap-3 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <span>Place Order • ₹{total.toLocaleString("en-IN")}</span>
                  <ArrowRight className="w-5 h-5 text-powder-pink" />
                </>
              )}
            </button>
          </div>

          {/* Right Order Review Column (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="p-6 sm:p-8 rounded-4xl bg-white border border-warm-beige shadow-soft space-y-6">
              <h3 className="font-serif text-xl font-bold text-cocoa-deep pb-3 border-b border-warm-beige flex items-center justify-between">
                <span>Your Order</span>
                <span className="text-xs font-sans text-cocoa-muted font-bold">
                  {items.length} items
                </span>
              </h3>

              {/* Items scroll */}
              <div className="space-y-4 max-h-72 overflow-y-auto pr-1 scrollbar-none">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-cream-200 flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-cocoa-deep truncate max-w-[170px]">
                          {item.product.name}
                        </p>
                        <p className="text-cocoa-muted font-medium">
                          {item.selectedSize.name} • {item.selectedColor.name} • Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-extrabold text-cocoa-deep">
                      ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost breakdown */}
              <div className="pt-4 border-t border-cream-200 space-y-2 text-sm">
                <div className="flex justify-between text-cocoa-muted">
                  <span>Subtotal</span>
                  <span className="font-bold text-cocoa-deep">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-powder-dark font-semibold">
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div className="flex justify-between text-cocoa-muted">
                  <span>Shipping</span>
                  <span className="font-bold text-sage-green">
                    {isFreeShipping ? "FREE" : `₹${shipping}`}
                  </span>
                </div>

                <div className="pt-3 border-t border-warm-beige flex justify-between items-baseline">
                  <span className="text-base font-bold text-cocoa-deep">Total Payable</span>
                  <span className="text-2xl font-black text-cocoa-deep">
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Trust micro-badges */}
              <div className="pt-2 border-t border-cream-200 space-y-2 text-xs text-cocoa-muted">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-powder-dark flex-shrink-0" />
                  <span>Free priority delivery on orders over ₹999</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sage-green flex-shrink-0" />
                  <span>14-day hassle-free return guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
