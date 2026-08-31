"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight, Sparkles, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearch } from "../providers/SearchContext";
import { PRODUCTS } from "@/data/products";

const POPULAR_SEARCHES = [
  "Organic Romper",
  "Cloud Bunny Plush",
  "Wooden Stacking Toy",
  "Silicone Feeding Set",
  "Muslin Swaddle",
  "Newborn Hamper",
];

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, searchTerm, setSearchTerm } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSearchOpen]);

  // Keyboard shortcut listener (Cmd/Ctrl + K and Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isSearchOpen) closeSearch();
        else {
          inputRef.current?.focus();
        }
      }
      if (e.key === "Escape" && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  const filteredProducts = searchTerm.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-[9990] flex items-start justify-center pt-16 md:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
            className="fixed inset-0 bg-cocoa-deep/40 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-2xl bg-cream-50 rounded-3xl shadow-soft-lg border border-warm-beige overflow-hidden z-10 max-h-[85vh] flex flex-col"
          >
            {/* Search Input Bar */}
            <div className="p-4 md:p-6 border-b border-warm-beige flex items-center gap-3 bg-white/80">
              <Search className="w-5 h-5 text-powder-dark flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tiny rompers, wooden toys, nursery blankets..."
                className="w-full bg-transparent text-cocoa-deep placeholder:text-cocoa-muted text-base md:text-lg focus:outline-none font-medium"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="p-1 text-cocoa-muted hover:text-cocoa-deep rounded-full hover:bg-cream-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={closeSearch}
                className="px-3 py-1.5 rounded-xl bg-cream-200 text-xs font-semibold text-cocoa-deep hover:bg-powder-pink/50 transition-colors"
              >
                ESC
              </button>
            </div>

            {/* Content Area */}
            <div className="p-4 md:p-6 overflow-y-auto space-y-6">
              {/* If no query yet, show popular suggestions */}
              {!searchTerm.trim() ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cocoa-muted">
                    <Sparkles className="w-3.5 h-3.5 text-powder-dark" />
                    Popular Searches
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCHES.map((query) => (
                      <button
                        key={query}
                        onClick={() => setSearchTerm(query)}
                        className="px-4 py-2 rounded-2xl bg-white border border-warm-beige text-sm text-cocoa-deep hover:border-powder-pink hover:bg-powder-light transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        <span>{query}</span>
                      </button>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-warm-beige">
                    <p className="text-xs font-bold uppercase tracking-wider text-cocoa-muted mb-3">
                      Featured Little Treasures
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {PRODUCTS.filter((p) => p.bestseller).slice(0, 4).map((p) => (
                        <Link
                          key={p.id}
                          href={`/product/${p.slug}`}
                          onClick={closeSearch}
                          className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/70 hover:bg-white border border-warm-beige hover:border-powder-pink transition-all group"
                        >
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-cream-200 flex-shrink-0">
                            <Image
                              src={p.images[0]}
                              alt={p.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-cocoa-deep truncate group-hover:text-powder-dark transition-colors">
                              {p.name}
                            </p>
                            <p className="text-xs text-cocoa-muted font-medium">₹{p.price.toLocaleString("en-IN")}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : filteredProducts.length > 0 ? (
                /* Results List */
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-cocoa-muted">
                    Found {filteredProducts.length} Results
                  </p>
                  <div className="space-y-2">
                    {filteredProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={closeSearch}
                        className="flex items-center justify-between p-3 rounded-2xl bg-white border border-warm-beige hover:border-powder-pink hover:shadow-soft transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-cream-200 flex-shrink-0">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-powder-dark px-2 py-0.5 rounded-full bg-powder-light">
                              {product.category}
                            </span>
                            <h4 className="text-sm font-semibold text-cocoa-deep group-hover:text-powder-dark transition-colors mt-0.5">
                              {product.name}
                            </h4>
                            <p className="text-xs font-bold text-cocoa-deep">
                              ₹{product.price.toLocaleString("en-IN")}
                              {product.originalPrice && (
                                <span className="text-xs text-cocoa-muted line-through font-normal ml-2">
                                  ₹{product.originalPrice.toLocaleString("en-IN")}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-cocoa-muted group-hover:text-powder-dark group-hover:translate-x-1 transition-all mr-2" />
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                /* Empty state for search */
                <div className="py-12 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-powder-light mx-auto flex items-center justify-center text-2xl">
                    🧸
                  </div>
                  <h3 className="font-serif text-xl font-medium text-cocoa-deep">
                    Hmm… we couldn’t find that little treasure.
                  </h3>
                  <p className="text-sm text-cocoa-muted max-w-sm mx-auto">
                    Try searching with simpler terms like &ldquo;romper&rdquo;, &ldquo;blanket&rdquo;, or &ldquo;toy&rdquo;.
                  </p>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="mt-2 text-xs font-bold text-powder-dark hover:underline"
                  >
                    Clear search query
                  </button>
                </div>
              )}
            </div>

            {/* Footer hint */}
            <div className="p-3 bg-cream-200 border-t border-warm-beige text-center text-xs text-cocoa-muted flex items-center justify-center gap-2">
              <ShoppingBag className="w-3.5 h-3.5 text-powder-dark" />
              <span>All orders over ₹999 qualify for complimentary premium shipping</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
