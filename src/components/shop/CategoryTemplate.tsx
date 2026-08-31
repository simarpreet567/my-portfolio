"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ProductCategory, Product, FilterState } from "@/types";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { QuickViewModal } from "./QuickViewModal";
import { FilterSidebar } from "./FilterSidebar";
import {
  Sparkles,
  ArrowRight,
  SlidersHorizontal,
  ArrowUpDown,
  Search,
  X,
  Star,
  CheckCircle2,
} from "lucide-react";

interface CategoryTemplateProps {
  categorySlug: ProductCategory;
}

function CategoryContent({ categorySlug }: CategoryTemplateProps) {
  const searchParams = useSearchParams();
  const subParam = searchParams.get("sub") || "";

  const category = CATEGORIES.find((c) => c.slug === categorySlug) || CATEGORIES[0];
  const allCategoryProducts = PRODUCTS.filter((p) => p.category === categorySlug);

  const [activeSub, setActiveSub] = useState<string>(subParam);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    category: categorySlug,
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

  const filteredProducts = useMemo(() => {
    return allCategoryProducts.filter((product) => {
      // Subcategory button filter
      if (activeSub && product.subCategory !== activeSub) {
        return false;
      }

      // Keyword search
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.shortDescription.toLowerCase().includes(q);
        const matchesTag = product.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesTag) return false;
      }

      // Age group
      if (filters.ageGroup && product.ageGroup !== filters.ageGroup) {
        return false;
      }

      // Routine need
      if (filters.routineNeed && product.routineNeed !== filters.routineNeed) {
        return false;
      }

      // Price
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }

      // Rating
      if (filters.rating && product.rating < filters.rating) {
        return false;
      }

      // In stock
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
      return 0;
    });
  }, [allCategoryProducts, activeSub, filters]);

  const bestsellers = allCategoryProducts.filter((p) => p.bestseller || p.featured).slice(0, 4);

  return (
    <div className="min-h-screen bg-cream-50 pb-20">
      {/* Category Hero Banner */}
      <div className={`relative overflow-hidden pt-10 pb-16 md:pt-14 md:pb-20 bg-gradient-to-b ${category.bgGradient} border-b border-warm-beige/60`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 text-left">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs font-semibold text-cocoa-muted">
                <Link href="/" className="hover:text-cocoa-deep">Home</Link>
                <span>/</span>
                <Link href="/shop" className="hover:text-cocoa-deep">Collections</Link>
                <span>/</span>
                <span className="text-cocoa-deep font-bold">{category.name}</span>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-warm-beige text-cocoa-deep text-xs font-extrabold uppercase tracking-wider shadow-xs">
                <span>{category.icon}</span>
                <span>{category.tagline}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-cocoa-deep tracking-tight">
                {category.name}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-cocoa-muted max-w-xl leading-relaxed font-normal">
                {category.description}
              </p>

              {/* Subcategories Pills Bar */}
              <div className="pt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveSub("")}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                    activeSub === ""
                      ? "bg-cocoa-deep text-cream shadow-soft"
                      : "bg-white/90 text-cocoa-deep hover:bg-white border border-warm-beige"
                  }`}
                >
                  All {category.name} ({allCategoryProducts.length})
                </button>
                {category.subCategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveSub(activeSub === sub.slug ? "" : sub.slug)}
                    className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                      activeSub === sub.slug
                        ? "bg-cocoa-deep text-cream shadow-soft"
                        : "bg-white/90 text-cocoa-deep hover:bg-white border border-warm-beige"
                    }`}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-[4/3] rounded-4xl overflow-hidden border-2 border-white shadow-soft-lg">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cocoa-deep/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-powder-pink">
                    100% Quality Checked
                  </p>
                  <p className="text-sm font-bold">
                    Pediatrician Approved & Hypoallergenic
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        {/* Controls Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-warm-beige shadow-soft mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-cocoa-muted absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              placeholder={`Search in ${category.name}...`}
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-cream-50 border border-warm-beige text-xs font-medium text-cocoa-deep focus:outline-none focus:border-powder-pink"
            />
            {filters.searchQuery && (
              <button
                onClick={() => setFilters({ ...filters, searchQuery: "" })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-cocoa-muted"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-cream-100 border border-warm-beige text-xs font-bold text-cocoa-deep"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-powder-dark" />
              <span>Filters ({filteredProducts.length})</span>
            </button>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-cocoa-muted hidden sm:block" />
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters({ ...filters, sortBy: e.target.value as FilterState["sortBy"] })
                }
                className="px-3.5 py-2.5 rounded-2xl bg-cream-50 border border-warm-beige text-xs font-bold text-cocoa-deep focus:outline-none focus:border-powder-pink cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="bestsellers">Bestsellers</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Catalog Body: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="hidden lg:block lg:col-span-3 sticky top-24">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              onReset={() => {
                setActiveSub("");
                setFilters({
                  searchQuery: "",
                  category: categorySlug,
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
              }}
              totalResults={filteredProducts.length}
            />
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-9 space-y-12">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-4 bg-white rounded-4xl border border-warm-beige space-y-4">
                <span className="text-4xl">🌸</span>
                <h3 className="font-serif text-xl font-bold text-cocoa-deep">
                  No items match this filter
                </h3>
                <p className="text-xs sm:text-sm text-cocoa-muted max-w-sm mx-auto">
                  Try clearing subcategory filters or expanding your price range.
                </p>
                <button
                  onClick={() => {
                    setActiveSub("");
                    setFilters((prev) => ({ ...prev, minPrice: 0, maxPrice: 5000, searchQuery: "" }));
                  }}
                  className="px-6 py-2.5 rounded-2xl bg-cocoa-deep text-cream text-xs font-bold shadow-soft"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Category Spotlight / Recommended Row */}
            {bestsellers.length > 0 && (
              <div className="pt-8 border-t border-warm-beige">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-cocoa-deep">
                      {category.name} Bestsellers
                    </h3>
                    <p className="text-xs text-cocoa-muted">Parent-favorite picks from this collection</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                  {bestsellers.map((prod) => (
                    <ProductCard
                      key={`rec-${prod.id}`}
                      product={prod}
                      onQuickView={(p) => setQuickViewProduct(p)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

export const CategoryTemplate: React.FC<CategoryTemplateProps> = ({ categorySlug }) => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream-50 p-12 text-center text-sm font-bold">Loading collection...</div>}>
      <CategoryContent categorySlug={categorySlug} />
    </Suspense>
  );
};
