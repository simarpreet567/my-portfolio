"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FilterState, AgeGroup, RoutineNeed } from "@/types";
import { PRODUCTS } from "@/data/products";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { Search, SlidersHorizontal, ArrowUpDown, X, Sparkles, LayoutGrid, Grid3X3 } from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [columns, setColumns] = useState<3 | 4>(4);
  const [visibleCount, setVisibleCount] = useState(16);

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    category: "",
    ageGroup: "",
    routineNeed: "",
    badge: "",
    gender: "",
    minPrice: 0,
    maxPrice: 5000,
    rating: null,
    inStockOnly: false,
    sortBy: "featured",
  });

  // Sync initial query params from URL
  useEffect(() => {
    const categoryParam = searchParams.get("category") || "";
    const ageParam = searchParams.get("age") || "";
    const needParam = searchParams.get("need") || "";
    const badgeParam = searchParams.get("badge") || "";
    const searchParam = searchParams.get("search") || "";

    setFilters((prev) => ({
      ...prev,
      category: categoryParam || prev.category,
      ageGroup: ageParam || prev.ageGroup,
      routineNeed: needParam || prev.routineNeed,
      badge: badgeParam || prev.badge,
      searchQuery: searchParam || prev.searchQuery,
    }));
  }, [searchParams]);

  const handleResetFilters = () => {
    setFilters({
      searchQuery: "",
      category: "",
      ageGroup: "",
      routineNeed: "",
      badge: "",
      gender: "",
      minPrice: 0,
      maxPrice: 5000,
      rating: null,
      inStockOnly: false,
      sortBy: "featured",
    });
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Search Query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.shortDescription.toLowerCase().includes(query) || product.description.toLowerCase().includes(query);
        const matchesTag = product.tags.some((t) => t.toLowerCase().includes(query));
        const matchesSub = product.subCategory.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesTag && !matchesSub) return false;
      }

      // Category
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      // Age Group
      if (filters.ageGroup && product.ageGroup !== filters.ageGroup) {
        return false;
      }

      // Routine Need
      if (filters.routineNeed && product.routineNeed !== filters.routineNeed) {
        return false;
      }

      // Special Badges (Organic, Montessori, Bestseller, New Arrival)
      if (filters.badge) {
        if (filters.badge === "organic" && !product.isOrganic) return false;
        if (filters.badge === "montessori" && !product.isMontessori) return false;
        if (filters.badge === "bestseller" && !product.bestseller) return false;
        if (filters.badge === "new-arrival" && !product.newArrival) return false;
      }

      // Price Range
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }

      // Customer Rating
      if (filters.rating && product.rating < filters.rating) {
        return false;
      }

      // In Stock
      if (filters.inStockOnly && product.stock <= 0) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === "newest") return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
      if (filters.sortBy === "price-low") return a.price - b.price;
      if (filters.sortBy === "price-high") return b.price - a.price;
      if (filters.sortBy === "rating") return b.rating - a.rating;
      if (filters.sortBy === "bestsellers") return (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0);
      return 0; // featured default
    });
  }, [filters]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-cream-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-powder-pink/40 text-cocoa-deep text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-powder-dark" />
            <span>Complete Catalogue ({PRODUCTS.length} Items)</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-cocoa-deep tracking-tight">
            Shop All Little Things
          </h1>
          <p className="text-sm sm:text-base text-cocoa-muted font-normal">
            Explore our heirloom rompers, sensory wooden toys, gentle skincare, and tranquil nursery essentials.
          </p>
        </div>

        {/* Search & Action Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-warm-beige shadow-soft mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-cocoa-muted absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              placeholder="Search 70+ products by name, tag, or material..."
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-cream-50 border border-warm-beige text-xs font-medium text-cocoa-deep placeholder:text-cocoa-muted focus:outline-none focus:border-powder-pink"
            />
            {filters.searchQuery && (
              <button
                onClick={() => setFilters({ ...filters, searchQuery: "" })}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-cocoa-muted hover:text-cocoa-deep"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Controls: Mobile Filter Toggle, Sort, Column Switcher */}
          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-cream-100 border border-warm-beige text-xs font-bold text-cocoa-deep hover:bg-powder-pink/30"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-powder-dark" />
              <span>Filters ({filteredProducts.length})</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-cocoa-muted hidden sm:block" />
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters({ ...filters, sortBy: e.target.value as FilterState["sortBy"] })
                }
                className="px-3 py-2.5 rounded-2xl bg-cream-50 border border-warm-beige text-xs font-bold text-cocoa-deep focus:outline-none focus:border-powder-pink cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="newest">Sort: Newest</option>
                <option value="bestsellers">Sort: Bestsellers</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Column Switcher (Desktop) */}
            <div className="hidden md:flex items-center gap-1 p-1 rounded-2xl bg-cream-100 border border-warm-beige">
              <button
                onClick={() => setColumns(3)}
                className={`p-1.5 rounded-xl transition-colors ${
                  columns === 3 ? "bg-white text-cocoa-deep shadow-xs" : "text-cocoa-muted hover:text-cocoa-deep"
                }`}
                title="3 Columns"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setColumns(4)}
                className={`p-1.5 rounded-xl transition-colors ${
                  columns === 4 ? "bg-white text-cocoa-deep shadow-xs" : "text-cocoa-muted hover:text-cocoa-deep"
                }`}
                title="4 Columns"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Pills */}
        {(filters.category || filters.ageGroup || filters.routineNeed || filters.badge || filters.rating || filters.inStockOnly || filters.searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs font-bold text-cocoa-muted">Active:</span>
            {filters.category && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-powder-pink/40 text-xs font-bold text-cocoa-deep border border-powder-pink">
                Collection: {filters.category}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters({ ...filters, category: "" })} />
              </span>
            )}
            {filters.ageGroup && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-baby-blue/40 text-xs font-bold text-cocoa-deep border border-baby-blue">
                Age: {filters.ageGroup}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters({ ...filters, ageGroup: "" })} />
              </span>
            )}
            {filters.routineNeed && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-soft-lavender/50 text-xs font-bold text-cocoa-deep border border-soft-lavender">
                Need: {filters.routineNeed}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters({ ...filters, routineNeed: "" })} />
              </span>
            )}
            {filters.badge && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-xs font-bold text-emerald-800 border border-emerald-300">
                Badge: {filters.badge}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters({ ...filters, badge: "" })} />
              </span>
            )}
            {filters.rating && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-lavender-soft/50 text-xs font-bold text-cocoa-deep border border-lavender-soft">
                {filters.rating}★+
                <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters({ ...filters, rating: null })} />
              </span>
            )}
            {filters.inStockOnly && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sage-light text-xs font-bold text-sage-green border border-sage-green/30">
                In Stock Only
                <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters({ ...filters, inStockOnly: false })} />
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-powder-dark hover:underline ml-2"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Main Content Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar (3 cols) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-24">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              onReset={handleResetFilters}
              totalResults={filteredProducts.length}
            />
          </div>

          {/* Mobile Filter Drawer Overlay */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
              <div
                className="fixed inset-0 bg-cocoa-deep/40 backdrop-blur-sm"
                onClick={() => setIsMobileFilterOpen(false)}
              />
              <div className="relative w-4/5 max-w-sm bg-white h-full p-6 overflow-y-auto z-10 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-warm-beige pb-3">
                  <h3 className="font-serif text-lg font-bold text-cocoa-deep">Filters</h3>
                  <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FilterSidebar
                  filters={filters}
                  onFilterChange={(f) => {
                    setFilters(f);
                  }}
                  onReset={handleResetFilters}
                  totalResults={filteredProducts.length}
                />
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3 rounded-2xl bg-cocoa-deep text-cream text-xs font-bold"
                >
                  Show {filteredProducts.length} Results
                </button>
              </div>
            </div>
          )}

          {/* Product Grid Area (9 cols) */}
          <div className="lg:col-span-9 space-y-8">
            <ProductGrid
              products={visibleProducts}
              columns={columns}
              emptyTitle="No little treasures match this filter."
              emptyDescription="Try selecting a different collection, age group, or price range."
            />

            {/* Load More Button */}
            {visibleCount < filteredProducts.length && (
              <div className="text-center pt-6">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                  className="px-8 py-3.5 rounded-3xl bg-white border border-warm-beige text-cocoa-deep hover:border-powder-pink text-sm font-bold shadow-soft hover:bg-cream-100 transition-all"
                >
                  Load More ({filteredProducts.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream-50 p-12 text-center text-sm font-bold">Loading catalogue...</div>}>
      <ShopContent />
    </Suspense>
  );
}
