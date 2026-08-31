import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Terms of Service — Little Bloom Baby Boutique",
  description: "Terms and conditions for shopping at Little Bloom Baby Boutique.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-cream-50 py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-powder-pink/40 text-cocoa-deep text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-powder-dark" />
            <span>Store Terms</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-cocoa-deep">
            Terms of Service
          </h1>
          <p className="text-xs text-cocoa-muted">Last updated: August 2026</p>
        </div>

        <div className="bg-white rounded-4xl p-6 sm:p-10 border border-warm-beige shadow-soft space-y-6 text-xs sm:text-sm text-cocoa-muted leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-cocoa-deep">1. Acceptance of Terms</h2>
            <p>
              By accessing or making a purchase on Little Bloom (littlebloom.in), you agree to be bound by these store terms, pricing policies, and delivery conditions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-cocoa-deep">2. Product Quality & Safety Pledges</h2>
            <p>
              We warrant that all products sold on Little Bloom comply with Indian BIS and European toy safety standards, GOTS organic cotton certifications, and FDA food-contact guidelines.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-cocoa-deep">3. Pricing & Taxes</h2>
            <p>
              All prices displayed on the website are in Indian Rupees (INR) and inclusive of all applicable GST taxes. Orders exceeding ₹999 qualify for complimentary express shipping.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-cocoa-deep">4. 14-Day Returns & Replacements</h2>
            <p>
              Unused items in their original packaging with tags intact can be returned within 14 days of delivery. For hygiene reasons, sterilized feeding accessories and opened skincare cannot be returned.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
