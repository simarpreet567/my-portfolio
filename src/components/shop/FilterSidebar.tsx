"use client";

import React from "react";
import { FilterState, AgeGroup, RoutineNeed } from "@/types";
import { CATEGORIES } from "@/data/categories";
import { RotateCcw, Star, Check, Sparkles, Filter } from "lucide-react";

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

const AGE_GROUPS: { id: AgeGroup | ""; label: string }[] = [
  { id: "", label: "All Ages" },
  { id: "0-3m", label: "0–3M (Newborn)" },
  { id: "3-6m", label: "3–6M (Infant)" },
  { id: "6-12m", label: "6–12M (Crawler)" },
  { id: "1-2y", label: "1–2Y (Toddler)" },
  { id: "2-4y", label: "2–4Y (Explorer)" },
];

const ROUTINE_NEEDS: { id: RoutineNeed | ""; label: string; icon: string }[] = [
  { id: "", label: "All Routines", icon: "✨" },
  { id: "sleeping", label: "Sleeping & Bedtime", icon: "🌙" },
  { id: "feeding", label: "Feeding & Mealtime", icon: "🍼" },
  { id: "bath-time", label: "Bath Time", icon: "🛁" },
  { id: "playtime", label: "Play & Learn", icon: "🧸" },
  { id: "travel", label: "On-the-Go & Travel", icon: "✈️" },
  { id: "baby-care", label: "Care & Skincare", icon: "🧴" },
];

const BADGE_FILTERS = [
  { id: "", label: "All Badges" },
  { id: "organic", label: "🌿 100% Organic" },
  { id: "montessori", label: "🧩 Montessori" },
  { id: "bestseller", label: "⭐ Bestsellers" },
  { id: "new-arrival", label: "✨ New Arrivals" },
];

const PRICE_PRESETS = [
  { label: "All Prices", min: 0, max: 5000 },
  { label: "Under ₹800", min: 0, max: 800 },
  { label: "₹800 - ₹1,500", min: 800, max: 1500 },
  { label: "₹1,500 - ₹3,000", min: 1500, max: 3000 },
  { label: "₹3,000+", min: 3000, max: 5000 },
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalResults,
}) => {
  const handleCategoryClick = (catSlug: string) => {
    onFilterChange({
      ...filters,
      category: filters.category === catSlug ? "" : catSlug,
    });
  };

  const handlePricePreset = (min: number, max: number) => {
    onFilterChange({
      ...filters,
      minPrice: min,
      maxPrice: max,
    });
  };

  const hasActiveFilters =
    filters.category !== "" ||
    (filters.ageGroup && filters.ageGroup !== "") ||
    (filters.routineNeed && filters.routineNeed !== "") ||
    (filters.badge && filters.badge !== "") ||
    filters.gender !== "" ||
    filters.minPrice > 0 ||
    filters.maxPrice < 5000 ||
    filters.rating !== null ||
    filters.inStockOnly;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-warm-beige shadow-soft space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-warm-beige">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-powder-dark" />
          <div>
            <h3 className="font-serif text-lg font-bold text-cocoa-deep">Filters</h3>
            <p className="text-xs text-cocoa-muted font-medium">{totalResults} items found</p>
          </div>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-bold text-powder-dark hover:underline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 9 Categories Filter */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-cocoa-deep">
          Collections (9)
        </h4>
        <div className="space-y-1">
          <button
            onClick={() => onFilterChange({ ...filters, category: "" })}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-bold transition-all text-left ${
              filters.category === ""
                ? "bg-powder-pink/50 text-cocoa-deep shadow-xs"
                : "text-cocoa-muted hover:bg-cream-100 hover:text-cocoa-deep"
            }`}
          >
            <span>✨ All Collections</span>
            {filters.category === "" && <Check className="w-3.5 h-3.5" />}
          </button>
          {CATEGORIES.map((cat) => {
            const isActive = filters.category === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.slug)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-bold transition-all text-left ${
                  isActive
                    ? "bg-powder-pink/50 text-cocoa-deep shadow-xs"
                    : "text-cocoa-muted hover:bg-cream-100 hover:text-cocoa-deep"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </span>
                {isActive && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Age Group Filter */}
      <div className="space-y-2.5 pt-4 border-t border-warm-beige">
        <h4 className="text-xs font-bold uppercase tracking-wider text-cocoa-deep">
          Shop By Age
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {AGE_GROUPS.map((age) => {
            const isActive = filters.ageGroup === age.id || (!filters.ageGroup && age.id === "");
            return (
              <button
                key={age.id || "all"}
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    ageGroup: age.id,
                  })
                }
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-cocoa-deep text-cream shadow-xs"
                    : "bg-cream-50 text-cocoa-muted border border-warm-beige hover:border-powder-pink"
                }`}
              >
                {age.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Routine Needs Filter */}
      <div className="space-y-2.5 pt-4 border-t border-warm-beige">
        <h4 className="text-xs font-bold uppercase tracking-wider text-cocoa-deep">
          Daily Routine Need
        </h4>
        <div className="space-y-1">
          {ROUTINE_NEEDS.map((need) => {
            const isActive = filters.routineNeed === need.id || (!filters.routineNeed && need.id === "");
            return (
              <button
                key={need.id || "all"}
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    routineNeed: need.id,
                  })
                }
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-2xl text-xs font-bold transition-all text-left ${
                  isActive
                    ? "bg-powder-pink/50 text-cocoa-deep shadow-xs"
                    : "text-cocoa-muted hover:bg-cream-100 hover:text-cocoa-deep"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span>{need.icon}</span>
                  <span>{need.label}</span>
                </span>
                {isActive && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Special Badges (Organic, Montessori, etc.) */}
      <div className="space-y-2.5 pt-4 border-t border-warm-beige">
        <h4 className="text-xs font-bold uppercase tracking-wider text-cocoa-deep">
          Special Curations
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {BADGE_FILTERS.map((badge) => {
            const isActive = filters.badge === badge.id || (!filters.badge && badge.id === "");
            return (
              <button
                key={badge.id || "all"}
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    badge: badge.id,
                  })
                }
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-powder-dark text-white shadow-xs"
                    : "bg-cream-50 text-cocoa-muted border border-warm-beige hover:border-powder-pink"
                }`}
              >
                {badge.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Presets */}
      <div className="space-y-2.5 pt-4 border-t border-warm-beige">
        <h4 className="text-xs font-bold uppercase tracking-wider text-cocoa-deep">
          Price Range
        </h4>
        <div className="space-y-1">
          {PRICE_PRESETS.map((preset) => {
            const isActive =
              filters.minPrice === preset.min && filters.maxPrice === preset.max;
            return (
              <button
                key={preset.label}
                onClick={() => handlePricePreset(preset.min, preset.max)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-bold transition-all text-left ${
                  isActive
                    ? "bg-powder-pink/50 text-cocoa-deep shadow-xs"
                    : "text-cocoa-muted hover:bg-cream-100 hover:text-cocoa-deep"
                }`}
              >
                <span>{preset.label}</span>
                {isActive && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Customer Rating Filter */}
      <div className="space-y-2.5 pt-4 border-t border-warm-beige">
        <h4 className="text-xs font-bold uppercase tracking-wider text-cocoa-deep">
          Customer Rating
        </h4>
        <div className="flex flex-col gap-1">
          {[4.8, 4.5].map((rating) => {
            const isActive = filters.rating === rating;
            return (
              <button
                key={rating}
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    rating: isActive ? null : rating,
                  })
                }
                className={`flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-powder-pink/50 text-cocoa-deep"
                    : "text-cocoa-muted hover:bg-cream-100 hover:text-cocoa-deep"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{rating} Stars & Above</span>
                </div>
                {isActive && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* In Stock Only Switch */}
      <div className="pt-4 border-t border-warm-beige">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-xs font-bold text-cocoa-deep">In Stock Items Only</span>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) =>
              onFilterChange({ ...filters, inStockOnly: e.target.checked })
            }
            className="w-4 h-4 rounded text-powder-dark focus:ring-powder-pink cursor-pointer accent-powder-dark"
          />
        </label>
      </div>
    </div>
  );
};
