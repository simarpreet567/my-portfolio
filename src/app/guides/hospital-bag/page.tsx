"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckSquare, Square, Sparkles, ArrowRight, Briefcase } from "lucide-react";
import { BABY_GUIDES } from "@/data/guides";

export default function HospitalBagPage() {
  const guide = BABY_GUIDES.find((g) => g.slug === "hospital-bag") || BABY_GUIDES[1];
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (name: string) => {
    setCheckedItems((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="min-h-screen bg-cream-50 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-cocoa-muted">
            <Link href="/" className="hover:text-cocoa-deep">Home</Link>
            <span>/</span>
            <Link href="/guides/newborn-checklist" className="hover:text-cocoa-deep">Baby Guides</Link>
            <span>/</span>
            <span className="text-cocoa-deep font-bold">Hospital Bag</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-soft-lavender/50 text-cocoa-deep text-xs font-extrabold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5 text-purple-600" />
            <span>Midwife Curated Guide</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-cocoa-deep tracking-tight">
            {guide.title}
          </h1>

          <p className="text-sm sm:text-base text-cocoa-muted max-w-2xl mx-auto leading-relaxed">
            {guide.description}
          </p>
        </div>

        {/* Checklist Content */}
        <div className="space-y-8">
          {guide.checklistItems?.map((group, gIdx) => (
            <div
              key={gIdx}
              className="bg-white rounded-4xl p-6 sm:p-8 border border-warm-beige shadow-soft space-y-5"
            >
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-cocoa-deep flex items-center gap-2">
                <span>{gIdx === 0 ? "👶" : "🌸"}</span>
                <span>{group.category}</span>
              </h2>

              <div className="space-y-3">
                {group.items.map((item, iIdx) => {
                  const isChecked = !!checkedItems[item.name];
                  return (
                    <button
                      key={iIdx}
                      onClick={() => toggleCheck(item.name)}
                      className={`w-full flex items-start gap-3 p-4 rounded-2xl border text-left transition-all ${
                        isChecked
                          ? "bg-cream-50/70 border-warm-beige/60 text-cocoa-muted"
                          : "bg-white border-warm-beige hover:border-powder-pink"
                      }`}
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
                        {item.tip && (
                          <p className="text-xs text-cocoa-muted mt-1 leading-relaxed">
                            💡 Tip: {item.tip}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Recommended Bag */}
        <div className="rounded-4xl p-8 bg-gradient-to-tr from-powder-light via-white to-baby-light border border-powder-pink text-center space-y-4">
          <h3 className="font-serif text-2xl font-bold text-cocoa-deep">
            Need a Hospital & Diaper Bag?
          </h3>
          <p className="text-xs sm:text-sm text-cocoa-muted max-w-md mx-auto">
            Our luxury wipe-clean vegan leather backpack has 14 organized pockets, insulated bottle holders, and stroller clips.
          </p>
          <Link
            href="/product/luxury-leather-diaper-backpack"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-3xl bg-cocoa-deep text-cream text-sm font-bold shadow-soft hover:bg-cocoa-light transition-all"
          >
            <span>View Vegan Leather Diaper Backpack (₹2,799)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
