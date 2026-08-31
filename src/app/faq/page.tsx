"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, HelpCircle, MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { FAQ_DATA } from "@/data/faqs";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>("faq-1");

  const categories = ["All", "Orders & Shipping", "Returns & Exchanges", "Product Safety", "Sizing & Gifting"];

  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-cream-50 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-powder-pink/40 text-cocoa-deep text-xs font-extrabold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-powder-dark" />
            <span>Help Center</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-cocoa-deep tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-cocoa-muted font-normal">
            Everything you need to know about our organic materials, delivery speeds, and baby sizing.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-5 h-5 text-cocoa-muted absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. shipping time, organic dyes, COD)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-3xl bg-white border border-warm-beige text-sm text-cocoa-deep placeholder:text-cocoa-muted shadow-soft focus:outline-none focus:border-powder-pink"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
                selectedCategory === cat
                  ? "bg-cocoa-deep text-cream shadow-soft"
                  : "bg-white text-cocoa-deep border border-warm-beige hover:border-powder-pink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordions List */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-4xl border border-warm-beige p-6 space-y-2">
              <p className="font-serif text-lg font-bold text-cocoa-deep">
                No matching answers found
              </p>
              <p className="text-xs text-cocoa-muted">
                Try searching with different terms or contact our care team directly.
              </p>
            </div>
          ) : (
            filteredFAQs.map((faq) => {
              const isOpen = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-3xl bg-white border border-warm-beige shadow-soft overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-cream-100/40 transition-colors"
                  >
                    <div className="space-y-1 pr-4">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-powder-dark">
                        {faq.category}
                      </span>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-cocoa-deep">
                        {faq.question}
                      </h3>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center bg-cream-100 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 bg-powder-pink/40 text-powder-dark" : "text-cocoa-muted"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 sm:p-6 pt-0 border-t border-cream-200 text-sm text-cocoa-muted leading-relaxed font-normal">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Support Prompt Card */}
        <div className="p-8 rounded-4xl bg-gradient-to-r from-powder-pink/30 via-cream-100 to-baby-blue/30 border border-warm-beige text-center space-y-3">
          <h3 className="font-serif text-xl font-bold text-cocoa-deep">
            Still have a question?
          </h3>
          <p className="text-xs sm:text-sm text-cocoa-muted max-w-md mx-auto">
            Our friendly customer care team is always here to help you pick the right sizes or gift hampers.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-cocoa-deep text-cream text-xs font-bold shadow-soft hover:bg-cocoa-light transition-all"
            >
              <MessageCircle className="w-4 h-4 text-powder-pink" />
              <span>Contact Care Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
