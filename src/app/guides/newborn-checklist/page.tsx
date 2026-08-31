"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckSquare, Square, Sparkles, ArrowRight, ShieldCheck, Heart, ShoppingBag } from "lucide-react";
import { BABY_GUIDES } from "@/data/guides";
import { PRODUCTS } from "@/data/products";

export default function NewbornChecklistPage() {
  const guide = BABY_GUIDES.find((g) => g.slug === "newborn-checklist") || BABY_GUIDES[0];
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (name: string) => {
    setCheckedItems((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const totalItemsCount = guide.checklistItems?.reduce((acc, cat) => acc + cat.items.length, 0) || 0;
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = totalItemsCount > 0 ? Math.round((checkedCount / totalItemsCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-cream-50 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb & Header */}
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-cocoa-muted">
            <Link href="/" className="hover:text-cocoa-deep">Home</Link>
            <span>/</span>
            <Link href="/guides/newborn-checklist" className="text-cocoa-deep font-bold">Baby Guides</Link>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-powder-pink/40 text-cocoa-deep text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-powder-dark" />
            <span>Pediatrician Reviewed Guide</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-cocoa-deep tracking-tight">
            {guide.title}
          </h1>

          <p className="text-sm sm:text-base text-cocoa-muted max-w-2xl mx-auto leading-relaxed">
            {guide.description}
          </p>
        </div>

        {/* Interactive Progress Bar */}
        <div className="bg-white rounded-3xl p-6 border border-warm-beige shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cocoa-deep uppercase tracking-wider">
              Preparation Progress
            </span>
            <span className="text-xs font-extrabold text-powder-dark">
              {checkedCount} of {totalItemsCount} items ready ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-3 rounded-full bg-cream-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-powder-pink to-soft-lavender transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Checklist Categories */}
        <div className="space-y-8">
          {guide.checklistItems?.map((group, gIdx) => (
            <div
              key={gIdx}
              className="bg-white rounded-4xl p-6 sm:p-8 border border-warm-beige shadow-soft space-y-5"
            >
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-cocoa-deep flex items-center gap-2">
                <span>{gIdx === 0 ? "👕" : gIdx === 1 ? "🛏" : gIdx === 2 ? "🧷" : "🛁"}</span>
                <span>{group.category}</span>
              </h2>

              <div className="space-y-3">
                {group.items.map((item, iIdx) => {
                  const isChecked = !!checkedItems[item.name];
                  const linkedProduct = item.recommendedProductId
                    ? PRODUCTS.find((p) => p.slug === item.recommendedProductId)
                    : null;

                  return (
                    <div
                      key={iIdx}
                      className={`p-4 rounded-2xl border transition-all ${
                        isChecked
                          ? "bg-cream-50/70 border-warm-beige/60 text-cocoa-muted"
                          : "bg-white border-warm-beige hover:border-powder-pink"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <button
                          onClick={() => toggleCheck(item.name)}
                          className="flex items-start gap-3 text-left flex-1 cursor-pointer"
                        >
                          <div className="mt-0.5 text-powder-dark shrink-0">
                            {isChecked ? (
                              <CheckSquare className="w-5 h-5 fill-powder-pink text-cocoa-deep" />
                            ) : (
                              <Square className="w-5 h-5 text-cocoa-muted" />
                            )}
                          </div>
                          <div>
                            <span className={`text-sm font-bold text-cocoa-deep ${isChecked ? "line-through opacity-70" : ""}`}>
                              {item.name}
                            </span>
                            {item.required && (
                              <span className="ml-2 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-powder-pink/50 text-cocoa-deep">
                                Essential
                              </span>
                            )}
                            {item.tip && (
                              <p className="text-xs text-cocoa-muted mt-1 leading-relaxed">
                                💡 Tip: {item.tip}
                              </p>
                            )}
                          </div>
                        </button>

                        {linkedProduct && (
                          <Link
                            href={`/product/${linkedProduct.slug}`}
                            className="px-3 py-1.5 rounded-xl bg-cream-100 hover:bg-cocoa-deep text-cocoa-deep hover:text-cream text-xs font-bold transition-colors shrink-0 flex items-center gap-1"
                          >
                            <span>Shop Item</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="rounded-4xl p-8 bg-gradient-to-tr from-powder-light via-white to-baby-light border border-powder-pink text-center space-y-4">
          <h3 className="font-serif text-2xl font-bold text-cocoa-deep">
            Ready to Welcome Your Little One?
          </h3>
          <p className="text-xs sm:text-sm text-cocoa-muted max-w-md mx-auto">
            Order all your newborn essentials together and enjoy complimentary gift packaging and free express delivery.
          </p>
          <Link
            href="/clothing?sub=newborn-clothing"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-3xl bg-cocoa-deep text-cream text-sm font-bold shadow-soft hover:bg-cocoa-light transition-all"
          >
            <span>Shop Newborn Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
