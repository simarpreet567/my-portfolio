"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, Shield, HeartHandshake, Truck, Star, HelpCircle, MessageCircle } from "lucide-react";
import { Product } from "@/types";
import { GENERAL_PRODUCT_REVIEWS } from "@/data/reviews";

interface ProductAccordionsProps {
  product: Product;
}

export const ProductAccordions: React.FC<ProductAccordionsProps> = ({ product }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    materials: true,
    care: false,
    shipping: false,
    qa: false,
    reviews: true,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-4 pt-8">
      {/* 1. Materials & Safety */}
      <div className="rounded-3xl bg-white border border-warm-beige shadow-soft overflow-hidden">
        <button
          onClick={() => toggleSection("materials")}
          className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-cream-100/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-powder-pink/30 flex items-center justify-center text-powder-dark">
              <Shield className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-lg font-bold text-cocoa-deep">
              Materials, Dimensions & Safety
            </h3>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-cocoa-muted transition-transform duration-200 ${
              openSections.materials ? "rotate-180 text-cocoa-deep" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {openSections.materials && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="p-5 sm:p-6 pt-0 border-t border-cream-200 space-y-4 text-sm text-cocoa-muted leading-relaxed">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cocoa-deep mb-2">
                    Fabric & Composition
                  </h4>
                  <ul className="space-y-1.5 list-disc list-inside">
                    {product.materials.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>

                {product.dimensions && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cocoa-deep mb-1">
                      Fit & Dimensions
                    </h4>
                    <p className="text-xs text-cocoa-deep font-semibold">{product.dimensions}</p>
                  </div>
                )}

                {product.features && product.features.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cocoa-deep mb-2">
                      Key Highlights & Features
                    </h4>
                    <ul className="space-y-1.5 list-disc list-inside text-xs">
                      {product.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cocoa-deep mb-2">
                    Safety Credentials
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {product.safetyCertifications.map((c, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-xl bg-sage-light text-sage-green font-bold text-xs border border-sage-green/30"
                      >
                        ✓ {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. Care Instructions */}
      <div className="rounded-3xl bg-white border border-warm-beige shadow-soft overflow-hidden">
        <button
          onClick={() => toggleSection("care")}
          className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-cream-100/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-lavender-soft/40 flex items-center justify-center text-purple-600">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-lg font-bold text-cocoa-deep">
              Care & Washing Instructions
            </h3>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-cocoa-muted transition-transform duration-200 ${
              openSections.care ? "rotate-180 text-cocoa-deep" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {openSections.care && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="p-5 sm:p-6 pt-0 border-t border-cream-200 text-sm text-cocoa-muted leading-relaxed">
                <ul className="space-y-2 list-disc list-inside">
                  {product.careInstructions.map((inst, i) => (
                    <li key={i}>{inst}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Shipping & Returns */}
      <div className="rounded-3xl bg-white border border-warm-beige shadow-soft overflow-hidden">
        <button
          onClick={() => toggleSection("shipping")}
          className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-cream-100/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-baby-blue/40 flex items-center justify-center text-blue-600">
              <Truck className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-lg font-bold text-cocoa-deep">
              Shipping & 14-Day Easy Returns
            </h3>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-cocoa-muted transition-transform duration-200 ${
              openSections.shipping ? "rotate-180 text-cocoa-deep" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {openSections.shipping && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="p-5 sm:p-6 pt-0 border-t border-cream-200 text-sm text-cocoa-muted space-y-3 leading-relaxed">
                <p>
                  • <strong>Dispatch:</strong> All orders are securely hand-packed and dispatched within 24 business hours from our central warehouse.
                </p>
                <p>
                  • <strong>Free Shipping:</strong> Automatically applied to all Indian domestic orders over ₹999.
                </p>
                <p>
                  • <strong>Returns:</strong> We offer a 14-day hassle-free doorstep return & size exchange guarantee.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Customer Questions & Answers */}
      <div className="rounded-3xl bg-white border border-warm-beige shadow-soft overflow-hidden">
        <button
          onClick={() => toggleSection("qa")}
          className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-cream-100/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-lg font-bold text-cocoa-deep">
              Questions & Answers
            </h3>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-cocoa-muted transition-transform duration-200 ${
              openSections.qa ? "rotate-180 text-cocoa-deep" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {openSections.qa && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="p-5 sm:p-6 pt-0 border-t border-cream-200 space-y-4">
                {product.qa && product.qa.length > 0 ? (
                  product.qa.map((item) => (
                    <div key={item.id} className="p-3.5 rounded-2xl bg-cream-50 border border-warm-beige space-y-1.5 text-xs">
                      <p className="font-bold text-cocoa-deep">Q: {item.question}</p>
                      <p className="text-cocoa-muted"><strong>A:</strong> {item.answer}</p>
                      <span className="text-[10px] text-cocoa-muted block">Asked by {item.askedBy} • {item.date}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-3.5 rounded-2xl bg-cream-50 border border-warm-beige space-y-1 text-xs">
                    <p className="font-bold text-cocoa-deep">Q: Is this suitable for newborns from Day 1?</p>
                    <p className="text-cocoa-muted"><strong>A:</strong> Yes, all Little Bloom products in this category undergo pediatrician review and strict hypoallergenic testing for infant skin contact.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 5. Verified Customer Reviews */}
      <div className="rounded-3xl bg-white border border-warm-beige shadow-soft overflow-hidden">
        <button
          onClick={() => toggleSection("reviews")}
          className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-cream-100/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-powder-pink/30 flex items-center justify-center text-powder-dark">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <h3 className="font-serif text-lg font-bold text-cocoa-deep">
              Customer Reviews ({product.reviewCount})
            </h3>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-cocoa-muted transition-transform duration-200 ${
              openSections.reviews ? "rotate-180 text-cocoa-deep" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {openSections.reviews && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="p-5 sm:p-6 pt-0 border-t border-cream-200 space-y-6">
                {/* Rating summary bar */}
                <div className="p-4 rounded-2xl bg-cream-100 flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-serif font-black text-cocoa-deep">
                      {product.rating.toFixed(1)}
                    </span>
                    <span className="text-sm text-cocoa-muted ml-1">/ 5.0</span>
                    <div className="flex items-center gap-1 text-amber-400 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-cocoa-deep">100% Verified Buyers</p>
                    <p className="text-xs text-cocoa-muted">Recommended by 98% of parents</p>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {GENERAL_PRODUCT_REVIEWS.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-2xl bg-cream-50 border border-warm-beige space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-cocoa-deep">{rev.author}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sage-light text-sage-green">
                            Verified Purchase
                          </span>
                        </div>
                        <span className="text-[11px] text-cocoa-muted">{rev.date}</span>
                      </div>
                      <div className="flex text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <h4 className="text-xs font-bold text-cocoa-deep">{rev.title}</h4>
                      <p className="text-xs text-cocoa-muted leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
