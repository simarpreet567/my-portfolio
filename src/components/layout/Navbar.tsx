"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ArrowRight,
  User,
  ShieldCheck,
} from "lucide-react";
import { useCart } from "../providers/CartContext";
import { useWishlist } from "../providers/WishlistContext";
import { useSearch } from "../providers/SearchContext";
import { CATEGORIES } from "@/data/categories";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);

  const { totalItems, openCartDrawer } = useCart();
  const { totalWishlistItems } = useWishlist();
  const { openSearch } = useSearch();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-cream-50/92 backdrop-blur-md shadow-soft py-3 border-b border-warm-beige/80"
            : "bg-cream-50/98 backdrop-blur-sm py-4 md:py-4.5 border-b border-warm-beige/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu & Search Buttons */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-2xl text-cocoa-deep hover:bg-cream-200 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button
              onClick={openSearch}
              className="p-2 rounded-2xl text-cocoa-deep hover:bg-cream-200 transition-colors"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center">
            <Link href="/" className="group flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-powder-pink via-soft-lavender to-baby-blue flex items-center justify-center shadow-pastel-pink group-hover:scale-105 transition-transform duration-300">
                <span className="text-xl font-bold">🌸</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-2xl font-bold tracking-tight text-cocoa-deep group-hover:text-powder-dark transition-colors">
                  LITTLEBLOOM
                </span>
                <span className="text-[10px] tracking-widest uppercase font-bold text-cocoa-muted -mt-1 hidden sm:block">
                  Tiny things. Big love.
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-2xl text-sm font-semibold transition-all ${
                pathname === "/"
                  ? "bg-powder-pink/40 text-cocoa-deep"
                  : "text-cocoa-deep/80 hover:text-cocoa-deep hover:bg-cream-200"
              }`}
            >
              Home
            </Link>

            <Link
              href="/shop"
              className={`px-3.5 py-2 rounded-2xl text-sm font-semibold transition-all ${
                pathname === "/shop"
                  ? "bg-powder-pink/40 text-cocoa-deep"
                  : "text-cocoa-deep/80 hover:text-cocoa-deep hover:bg-cream-200"
              }`}
            >
              Shop All
            </Link>

            {/* Mega Menu Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <button
                className={`px-3.5 py-2 rounded-2xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  pathname.startsWith("/category") || pathname.startsWith("/clothing") || isMegaMenuOpen
                    ? "bg-powder-pink/40 text-cocoa-deep"
                    : "text-cocoa-deep/80 hover:text-cocoa-deep hover:bg-cream-200"
                }`}
              >
                <span>Categories</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isMegaMenuOpen ? "rotate-180 text-powder-dark" : ""
                  }`}
                />
              </button>

              {/* Mega Dropdown Panel */}
              <AnimatePresence>
                {isMegaMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="fixed left-1/2 -translate-x-1/2 top-[68px] w-[96vw] max-w-6xl bg-white/98 backdrop-blur-xl rounded-4xl p-6 sm:p-8 shadow-soft-lg border border-warm-beige z-50 overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {/* Column 1: Clothing & Footwear */}
                      <div className="space-y-4">
                        <div>
                          <Link
                            href="/clothing"
                            className="flex items-center gap-2 text-sm font-extrabold text-cocoa-deep hover:text-powder-dark transition-colors pb-1 border-b border-warm-beige"
                          >
                            <span>👕 Clothing & Rompers</span>
                            <ArrowRight className="w-3 h-3 ml-auto text-cocoa-muted" />
                          </Link>
                          <ul className="mt-2 space-y-1.5 text-xs text-cocoa-muted">
                            <li><Link href="/clothing?sub=newborn-clothing" className="hover:text-cocoa-deep hover:font-bold transition-colors">Newborn Essentials</Link></li>
                            <li><Link href="/clothing?sub=rompers" className="hover:text-cocoa-deep hover:font-bold transition-colors">Bodysuits & Rompers</Link></li>
                            <li><Link href="/clothing?sub=sleepsuits" className="hover:text-cocoa-deep hover:font-bold transition-colors">Sleepsuits & Footies</Link></li>
                            <li><Link href="/clothing?sub=dresses-sets" className="hover:text-cocoa-deep hover:font-bold transition-colors">Dresses & Peasant Blouses</Link></li>
                            <li><Link href="/clothing?sub=knitwear" className="hover:text-cocoa-deep hover:font-bold transition-colors">Merino Knitwear & Prams</Link></li>
                            <li><Link href="/clothing?sub=ethnic-wear" className="hover:text-cocoa-deep hover:font-bold transition-colors">Traditional & Kurta Sets</Link></li>
                          </ul>
                        </div>

                        <div className="pt-2">
                          <Link
                            href="/footwear"
                            className="flex items-center gap-2 text-sm font-extrabold text-cocoa-deep hover:text-powder-dark transition-colors pb-1 border-b border-warm-beige"
                          >
                            <span>👟 Footwear & Booties</span>
                            <ArrowRight className="w-3 h-3 ml-auto text-cocoa-muted" />
                          </Link>
                          <ul className="mt-2 space-y-1.5 text-xs text-cocoa-muted">
                            <li><Link href="/footwear" className="hover:text-cocoa-deep hover:font-bold transition-colors">Soft Suede Moccasins</Link></li>
                            <li><Link href="/footwear" className="hover:text-cocoa-deep hover:font-bold transition-colors">Sherpa Stay-On Booties</Link></li>
                            <li><Link href="/footwear" className="hover:text-cocoa-deep hover:font-bold transition-colors">First-Walker Sneakers</Link></li>
                            <li><Link href="/footwear" className="hover:text-cocoa-deep hover:font-bold transition-colors">Non-Skid Gripper Socks</Link></li>
                          </ul>
                        </div>
                      </div>

                      {/* Column 2: Toys & Nursery */}
                      <div className="space-y-4">
                        <div>
                          <Link
                            href="/toys"
                            className="flex items-center gap-2 text-sm font-extrabold text-cocoa-deep hover:text-powder-dark transition-colors pb-1 border-b border-warm-beige"
                          >
                            <span>🧸 Toys & Play</span>
                            <ArrowRight className="w-3 h-3 ml-auto text-cocoa-muted" />
                          </Link>
                          <ul className="mt-2 space-y-1.5 text-xs text-cocoa-muted">
                            <li><Link href="/toys" className="hover:text-cocoa-deep hover:font-bold transition-colors">Heirloom Plush Cuddle Bears</Link></li>
                            <li><Link href="/toys" className="hover:text-cocoa-deep hover:font-bold transition-colors">Montessori Rainbow Stackers</Link></li>
                            <li><Link href="/toys" className="hover:text-cocoa-deep hover:font-bold transition-colors">Beechwood Rattles & Teethers</Link></li>
                            <li><Link href="/toys" className="hover:text-cocoa-deep hover:font-bold transition-colors">Silicone Bath Squirties</Link></li>
                            <li><Link href="/toys" className="hover:text-cocoa-deep hover:font-bold transition-colors">Wooden Activity Push Walkers</Link></li>
                          </ul>
                        </div>

                        <div className="pt-2">
                          <Link
                            href="/nursery"
                            className="flex items-center gap-2 text-sm font-extrabold text-cocoa-deep hover:text-powder-dark transition-colors pb-1 border-b border-warm-beige"
                          >
                            <span>🛏 Nursery & Bedding</span>
                            <ArrowRight className="w-3 h-3 ml-auto text-cocoa-muted" />
                          </Link>
                          <ul className="mt-2 space-y-1.5 text-xs text-cocoa-muted">
                            <li><Link href="/nursery" className="hover:text-cocoa-deep hover:font-bold transition-colors">Bamboo Muslin Swaddles</Link></li>
                            <li><Link href="/nursery" className="hover:text-cocoa-deep hover:font-bold transition-colors">1.0 TOG Safe Sleep Bags</Link></li>
                            <li><Link href="/nursery" className="hover:text-cocoa-deep hover:font-bold transition-colors">Bear Glow Night Lamps</Link></li>
                            <li><Link href="/nursery" className="hover:text-cocoa-deep hover:font-bold transition-colors">Cotton Rope Storage Baskets</Link></li>
                          </ul>
                        </div>
                      </div>

                      {/* Column 3: Feeding, Baby Care & Diapering */}
                      <div className="space-y-4">
                        <div>
                          <Link
                            href="/feeding"
                            className="flex items-center gap-2 text-sm font-extrabold text-cocoa-deep hover:text-powder-dark transition-colors pb-1 border-b border-warm-beige"
                          >
                            <span>🍼 Feeding & Mealtime</span>
                            <ArrowRight className="w-3 h-3 ml-auto text-cocoa-muted" />
                          </Link>
                          <ul className="mt-2 space-y-1.5 text-xs text-cocoa-muted">
                            <li><Link href="/feeding" className="hover:text-cocoa-deep hover:font-bold transition-colors">Silicone Suction Starter Sets</Link></li>
                            <li><Link href="/feeding" className="hover:text-cocoa-deep hover:font-bold transition-colors">Anti-Colic Glass Bottles</Link></li>
                            <li><Link href="/feeding" className="hover:text-cocoa-deep hover:font-bold transition-colors">Catch-All Silicone Bibs</Link></li>
                            <li><Link href="/feeding" className="hover:text-cocoa-deep hover:font-bold transition-colors">360° Weighted Straw Cups</Link></li>
                          </ul>
                        </div>

                        <div className="pt-2">
                          <Link
                            href="/baby-care"
                            className="flex items-center gap-2 text-sm font-extrabold text-cocoa-deep hover:text-powder-dark transition-colors pb-1 border-b border-warm-beige"
                          >
                            <span>🧴 Care, Diapering & Hampers</span>
                            <ArrowRight className="w-3 h-3 ml-auto text-cocoa-muted" />
                          </Link>
                          <ul className="mt-2 space-y-1.5 text-xs text-cocoa-muted">
                            <li><Link href="/baby-care" className="hover:text-cocoa-deep hover:font-bold transition-colors">Tear-Free Botanical Washes</Link></li>
                            <li><Link href="/diapering" className="hover:text-cocoa-deep hover:font-bold transition-colors">Vegan Leather Diaper Bags</Link></li>
                            <li><Link href="/diapering" className="hover:text-cocoa-deep hover:font-bold transition-colors">99.9% Pure Water Bamboo Wipes</Link></li>
                            <li><Link href="/gifts" className="hover:text-cocoa-deep hover:font-bold transition-colors">🎁 Luxury Keepsake Hampers</Link></li>
                          </ul>
                        </div>
                      </div>

                      {/* Column 4: Featured Boutique Spotlight Card */}
                      <div className="rounded-3xl bg-gradient-to-tr from-powder-light via-cream-100 to-baby-light p-5 border border-warm-beige flex flex-col justify-between">
                        <div className="space-y-3">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-powder-pink text-cocoa-deep text-[10px] font-extrabold uppercase">
                            <Sparkles className="w-3 h-3 text-powder-dark" />
                            <span>Gift Concierge</span>
                          </span>
                          <h4 className="font-serif text-lg font-bold text-cocoa-deep">
                            The Welcome World Trunk
                          </h4>
                          <p className="text-xs text-cocoa-muted leading-relaxed">
                            Complete heirloom newborn hamper packed with organic clothing, rattle, plush bear, and complimentary handwritten gift card.
                          </p>
                        </div>
                        <div className="pt-4">
                          <Link
                            href="/product/welcome-world-luxury-hamper"
                            className="w-full py-2.5 rounded-2xl bg-cocoa-deep hover:bg-cocoa-light text-cream font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-soft"
                          >
                            <span>Explore Hamper (₹3,499)</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/new-arrivals"
              className={`px-3.5 py-2 rounded-2xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                pathname === "/new-arrivals"
                  ? "bg-powder-pink/40 text-cocoa-deep"
                  : "text-cocoa-deep/80 hover:text-cocoa-deep hover:bg-cream-200"
              }`}
            >
              <span>New Arrivals</span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-powder-pink text-cocoa-deep shadow-xs">
                ✨
              </span>
            </Link>

            <Link
              href="/guides/newborn-checklist"
              className={`px-3.5 py-2 rounded-2xl text-sm font-semibold transition-all ${
                pathname.startsWith("/guides")
                  ? "bg-powder-pink/40 text-cocoa-deep"
                  : "text-cocoa-deep/80 hover:text-cocoa-deep hover:bg-cream-200"
              }`}
            >
              Baby Guides
            </Link>

            <Link
              href="/about"
              className={`px-3.5 py-2 rounded-2xl text-sm font-semibold transition-all ${
                pathname === "/about"
                  ? "bg-powder-pink/40 text-cocoa-deep"
                  : "text-cocoa-deep/80 hover:text-cocoa-deep hover:bg-cream-200"
              }`}
            >
              About
            </Link>
          </nav>

          {/* Desktop Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger Button */}
            <button
              onClick={openSearch}
              className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-cream-200/80 hover:bg-cream-200 text-cocoa-muted hover:text-cocoa-deep text-xs font-semibold border border-warm-beige transition-all group"
            >
              <Search className="w-3.5 h-3.5 text-cocoa-muted group-hover:text-powder-dark transition-colors" />
              <span>Search 70+ baby essentials...</span>
              <kbd className="px-1.5 py-0.5 rounded-lg bg-white text-[10px] text-cocoa-muted border border-warm-beige font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Wishlist Button */}
            <Link
              href="/wishlist"
              className="relative p-2.5 rounded-2xl text-cocoa-deep hover:bg-cream-200 transition-colors"
              aria-label="View Wishlist"
            >
              <Heart
                className={`w-5 h-5 transition-transform duration-200 hover:scale-110 ${
                  totalWishlistItems > 0 ? "fill-powder-pink text-powder-dark" : "text-cocoa-deep"
                }`}
              />
              {totalWishlistItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-powder-pink text-cocoa-deep text-[10px] font-extrabold flex items-center justify-center border-2 border-white shadow-xs">
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger Button */}
            <button
              onClick={openCartDrawer}
              className="relative p-2.5 px-3 rounded-2xl bg-cocoa-deep text-cream hover:bg-cocoa-light transition-all flex items-center gap-2 shadow-soft group"
              aria-label="Open Cart Drawer"
            >
              <ShoppingBag className="w-5 h-5 text-powder-pink group-hover:rotate-6 transition-transform" />
              <span className="hidden sm:inline text-xs font-bold pr-1">Bag</span>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 rounded-full bg-powder-pink text-cocoa-deep text-[10px] font-extrabold flex items-center justify-center border-2 border-cocoa-deep shadow-xs"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-cocoa-deep/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="relative w-4/5 max-w-sm bg-cream-50 h-full shadow-2xl flex flex-col p-5 sm:p-6 overflow-y-auto z-50 border-r border-warm-beige"
            >
              <div className="flex items-center justify-between pb-4 border-b border-warm-beige">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2"
                >
                  <span className="text-2xl">🌸</span>
                  <span className="font-serif text-xl font-bold text-cocoa-deep">LITTLEBLOOM</span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-cocoa-muted hover:bg-cream-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search Input Button */}
              <div className="pt-4">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openSearch();
                  }}
                  className="w-full flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-warm-beige text-cocoa-muted text-xs"
                >
                  <Search className="w-4 h-4 text-powder-dark" />
                  <span>Search 70+ products, rompers, toys...</span>
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="py-4 space-y-1">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block p-3 rounded-2xl text-sm font-bold text-cocoa-deep hover:bg-cream-200"
                >
                  Home
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block p-3 rounded-2xl text-sm font-bold text-cocoa-deep hover:bg-cream-200"
                >
                  Shop All Products
                </Link>
                <Link
                  href="/new-arrivals"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl text-sm font-bold text-cocoa-deep hover:bg-cream-200"
                >
                  <span>New Arrivals</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-powder-pink font-bold">New</span>
                </Link>
                <Link
                  href="/guides/newborn-checklist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block p-3 rounded-2xl text-sm font-bold text-cocoa-deep hover:bg-cream-200"
                >
                  Newborn Checklist Guide
                </Link>
              </div>

              {/* Accordion Categories */}
              <div className="space-y-2 pt-3 border-t border-warm-beige">
                <p className="text-xs font-extrabold uppercase tracking-wider text-cocoa-muted px-2">
                  All 9 Collections
                </p>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => {
                    const isExpanded = mobileExpandedCat === cat.id;
                    return (
                      <div key={cat.id} className="rounded-2xl bg-white border border-warm-beige overflow-hidden">
                        <button
                          onClick={() => setMobileExpandedCat(isExpanded ? null : cat.id)}
                          className="w-full flex items-center justify-between p-3 text-left"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-lg">{cat.icon}</span>
                            <span className="text-xs font-bold text-cocoa-deep">{cat.name}</span>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-cocoa-muted transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                        </button>
                        {isExpanded && (
                          <div className="px-4 pb-3 pt-1 border-t border-warm-beige/60 space-y-1.5 text-xs text-cocoa-muted">
                            {cat.subCategories.map((sub) => (
                              <Link
                                key={sub.id}
                                href={`/category/${cat.slug}?sub=${sub.slug}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-1 hover:text-cocoa-deep font-medium"
                              >
                                • {sub.name}
                              </Link>
                            ))}
                            <Link
                              href={`/category/${cat.slug}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block pt-1 font-bold text-powder-dark"
                            >
                              View all in {cat.name} →
                            </Link>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Footer info */}
              <div className="mt-auto pt-6 text-center text-xs text-cocoa-muted">
                <p className="font-bold text-cocoa-deep">Free Shipping across India over ₹999</p>
                <p className="mt-1">100% Certified Safe & Pediatrician Approved</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
