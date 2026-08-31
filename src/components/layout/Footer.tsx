"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-cream-100/80 border-t border-warm-beige text-cocoa-deep pt-16 pb-12">
      {/* 4 Trust Value Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-warm-beige/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-powder-pink/50 flex items-center justify-center text-powder-dark shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-cocoa-deep">Free India Shipping</h4>
              <p className="text-xs text-cocoa-muted mt-0.5">Complimentary express delivery on all orders over ₹999.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-soft-lavender/60 flex items-center justify-center text-purple-600 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-cocoa-deep">14-Day Easy Returns</h4>
              <p className="text-xs text-cocoa-muted mt-0.5">Zero hassle exchanges and doorstep pickup service.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-baby-blue/50 flex items-center justify-center text-blue-600 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-cocoa-deep">100% Certified Safe</h4>
              <p className="text-xs text-cocoa-muted mt-0.5">GOTS organic cotton & non-toxic botanical finishes.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-sage-green/40 flex items-center justify-center text-emerald-700 shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-cocoa-deep">Loved By Parents</h4>
              <p className="text-xs text-cocoa-muted mt-0.5">Over 2,400+ five-star reviews from verified families.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main 5-Column Navigation Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-powder-pink via-soft-lavender to-baby-blue flex items-center justify-center shadow-xs">
                <span className="text-xl">🌸</span>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-cocoa-deep">
                LITTLEBLOOM
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-cocoa-muted max-w-sm leading-relaxed">
              Little Bloom is an artisanal baby boutique dedicated to creating cloud-soft organic clothing, Montessori heirloom toys, and tranquil nursery essentials that celebrate the tender wonder of childhood.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-xl bg-white border border-warm-beige flex items-center justify-center text-cocoa-muted hover:text-powder-dark hover:border-powder-pink transition-all shadow-2xs">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-white border border-warm-beige flex items-center justify-center text-cocoa-muted hover:text-powder-dark hover:border-powder-pink transition-all shadow-2xs">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-white border border-warm-beige flex items-center justify-center text-cocoa-muted hover:text-powder-dark hover:border-powder-pink transition-all shadow-2xs">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Shop Collections */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-cocoa-deep">
              Shop Collections
            </h4>
            <ul className="space-y-2 text-xs text-cocoa-muted">
              <li><Link href="/clothing" className="hover:text-cocoa-deep hover:font-semibold transition-colors">👕 Clothing & Rompers</Link></li>
              <li><Link href="/toys" className="hover:text-cocoa-deep hover:font-semibold transition-colors">🧸 Toys & Montessori</Link></li>
              <li><Link href="/nursery" className="hover:text-cocoa-deep hover:font-semibold transition-colors">🛏 Nursery & Swaddles</Link></li>
              <li><Link href="/feeding" className="hover:text-cocoa-deep hover:font-semibold transition-colors">🍼 Feeding & Weaning</Link></li>
              <li><Link href="/baby-care" className="hover:text-cocoa-deep hover:font-semibold transition-colors">🧴 Baby Care & Skincare</Link></li>
              <li><Link href="/diapering" className="hover:text-cocoa-deep hover:font-semibold transition-colors">🧷 Diaper Bags & Mats</Link></li>
              <li><Link href="/footwear" className="hover:text-cocoa-deep hover:font-semibold transition-colors">👟 Footwear & Booties</Link></li>
              <li><Link href="/gifts" className="hover:text-cocoa-deep hover:font-semibold transition-colors">🎁 Luxury Keepsake Hampers</Link></li>
            </ul>
          </div>

          {/* Column 3: Baby Guides & Help */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-cocoa-deep">
              Baby Guides & Tools
            </h4>
            <ul className="space-y-2 text-xs text-cocoa-muted">
              <li><Link href="/guides/newborn-checklist" className="hover:text-cocoa-deep hover:font-semibold transition-colors">📋 Newborn Checklist</Link></li>
              <li><Link href="/guides/hospital-bag" className="hover:text-cocoa-deep hover:font-semibold transition-colors">👜 Hospital Bag Packing</Link></li>
              <li><Link href="/guides/size-guide" className="hover:text-cocoa-deep hover:font-semibold transition-colors">📏 Baby Size Chart Guide</Link></li>
              <li><Link href="/guides/gift-finder" className="hover:text-cocoa-deep hover:font-semibold transition-colors">✨ Interactive Gift Finder</Link></li>
              <li><Link href="/shop?need=sleeping" className="hover:text-cocoa-deep hover:font-semibold transition-colors">🌙 Bedtime Essentials</Link></li>
              <li><Link href="/shop?need=bath-time" className="hover:text-cocoa-deep hover:font-semibold transition-colors">🛁 Bath Time Routine</Link></li>
            </ul>
          </div>

          {/* Column 4: Customer Care & Policies */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-cocoa-deep">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs text-cocoa-muted">
              <li><Link href="/about" className="hover:text-cocoa-deep hover:font-semibold transition-colors">Our Story & Pledges</Link></li>
              <li><Link href="/contact" className="hover:text-cocoa-deep hover:font-semibold transition-colors">Contact Concierge</Link></li>
              <li><Link href="/faq" className="hover:text-cocoa-deep hover:font-semibold transition-colors">FAQ & Shipping Policy</Link></li>
              <li><Link href="/wishlist" className="hover:text-cocoa-deep hover:font-semibold transition-colors">My Saved Wishlist</Link></li>
              <li><Link href="/privacy" className="hover:text-cocoa-deep hover:font-semibold transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-cocoa-deep hover:font-semibold transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Payment Icons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-warm-beige/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cocoa-muted">
        <p>© {new Date().getFullYear()} Little Bloom Baby Boutique Private Limited. All rights reserved.</p>

        {/* Payment badges */}
        <div className="flex items-center gap-2 font-medium">
          <span className="px-2 py-0.5 rounded-md bg-white border border-warm-beige text-[10px] font-bold">UPI</span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-warm-beige text-[10px] font-bold">VISA</span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-warm-beige text-[10px] font-bold">MasterCard</span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-warm-beige text-[10px] font-bold">RuPay</span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-warm-beige text-[10px] font-bold">NetBanking</span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-warm-beige text-[10px] font-bold">COD</span>
        </div>
      </div>
    </footer>
  );
};
