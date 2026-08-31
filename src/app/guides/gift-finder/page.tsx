"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Sparkles, Gift, ArrowRight, RotateCcw, Check } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { QuickViewModal } from "@/components/shop/QuickViewModal";
import { Product } from "@/types";

const OCCASIONS = [
  { id: "baby-shower", label: "Baby Shower", icon: "🍼" },
  { id: "newborn", label: "Welcome Newborn", icon: "👶" },
  { id: "first-birthday", label: "1st Birthday", icon: "🎂" },
  { id: "holiday", label: "Festive & Diwali", icon: "✨" },
];

const AGES = [
  { id: "0-3m", label: "0–3 Months" },
  { id: "3-6m", label: "3–6 Months" },
  { id: "6-12m", label: "6–12 Months" },
  { id: "1-2y", label: "1–2 Years" },
];

const BUDGETS = [
  { id: "all", label: "Any Budget", min: 0, max: 10000 },
  { id: "under-1000", label: "Under ₹1,000", min: 0, max: 1000 },
  { id: "1000-2000", label: "₹1,000 – ₹2,000", min: 1000, max: 2000 },
  { id: "above-2000", label: "Luxury (₹2,000+)", min: 2000, max: 10000 },
];

export default function GiftFinderPage() {
  const [occasion, setOccasion] = useState<string>("baby-shower");
  const [age, setAge] = useState<string>("0-3m");
  const [budget, setBudget] = useState<string>("all");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const matchedProducts = useMemo(() => {
    const selectedBudget = BUDGETS.find((b) => b.id === budget) || BUDGETS[0];

    return PRODUCTS.filter((product) => {
      // Budget
      if (product.price < selectedBudget.min || product.price > selectedBudget.max) {
        return false;
      }

      // Age matching
      if (age && product.ageGroup !== age && product.category !== "gifts") {
        return false;
      }

      // Occasion matching
      if (occasion === "first-birthday" && product.ageGroup !== "1-2y" && !product.tags.includes("first-birthday")) {
        return false;
      }

      return true;
    }).slice(0, 8);
  }, [occasion, age, budget]);

  return (
    <div className="min-h-screen bg-cream-50 py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-cocoa-muted">
            <Link href="/" className="hover:text-cocoa-deep">Home</Link>
            <span>/</span>
            <Link href="/guides/newborn-checklist" className="hover:text-cocoa-deep">Baby Guides</Link>
            <span>/</span>
            <span className="text-cocoa-deep font-bold">Gift Finder</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-powder-pink/40 text-cocoa-deep text-xs font-extrabold uppercase tracking-wider">
            <Gift className="w-3.5 h-3.5 text-powder-dark" />
            <span>Interactive Gift Concierge</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-cocoa-deep tracking-tight">
            Find the Perfect Little Gift in Seconds
          </h1>

          <p className="text-sm sm:text-base text-cocoa-muted max-w-xl mx-auto leading-relaxed">
            Answer 3 quick questions to discover tailored boutique recommendations with complimentary gift wrapping.
          </p>
        </div>

        {/* 3-Step Interactive Quiz Card */}
        <div className="bg-white rounded-4xl p-6 sm:p-10 border border-warm-beige shadow-soft space-y-8">
          {/* Step 1: Occasion */}
          <div className="space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-powder-dark">
              Step 1: What is the Occasion?
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {OCCASIONS.map((occ) => {
                const isActive = occasion === occ.id;
                return (
                  <button
                    key={occ.id}
                    onClick={() => setOccasion(occ.id)}
                    className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                      isActive
                        ? "bg-powder-pink/40 border-powder-pink text-cocoa-deep shadow-xs"
                        : "bg-cream-50 border-warm-beige hover:border-powder-pink text-cocoa-muted"
                    }`}
                  >
                    <span className="text-xl">{occ.icon}</span>
                    <span className="text-xs sm:text-sm font-bold">{occ.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Baby Age */}
          <div className="space-y-3 pt-6 border-t border-warm-beige">
            <span className="text-xs font-extrabold uppercase tracking-wider text-powder-dark">
              Step 2: Baby&apos;s Age Bracket
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {AGES.map((a) => {
                const isActive = age === a.id;
                return (
                  <button
                    key={a.id}
                    onClick={() => setAge(a.id)}
                    className={`py-3 px-4 rounded-2xl border text-center transition-all ${
                      isActive
                        ? "bg-cocoa-deep text-cream font-bold shadow-soft"
                        : "bg-cream-50 border-warm-beige hover:border-powder-pink text-cocoa-deep text-xs font-semibold"
                    }`}
                  >
                    {a.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Budget */}
          <div className="space-y-3 pt-6 border-t border-warm-beige">
            <span className="text-xs font-extrabold uppercase tracking-wider text-powder-dark">
              Step 3: Preferred Gift Budget
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {BUDGETS.map((b) => {
                const isActive = budget === b.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => setBudget(b.id)}
                    className={`py-3 px-4 rounded-2xl border text-center transition-all ${
                      isActive
                        ? "bg-powder-dark text-white font-bold shadow-xs"
                        : "bg-cream-50 border-warm-beige hover:border-powder-pink text-cocoa-deep text-xs font-semibold"
                    }`}
                  >
                    {b.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Matched Products Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-cocoa-deep">
              Curated Gift Matches ({matchedProducts.length})
            </h2>
            <Link
              href="/gifts"
              className="text-xs font-bold text-cocoa-deep hover:text-powder-dark flex items-center gap-1"
            >
              <span>View All Gift Hampers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {matchedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </div>

        {/* Quick View Modal */}
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      </div>
    </div>
  );
}
