import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Ruler, Check } from "lucide-react";

export const metadata = {
  title: "Baby Size & Fit Guide — Little Bloom Baby Boutique",
  description: "Comprehensive baby and toddler clothing & footwear size chart covering age, weight, and height measurements.",
};

const CLOTHING_SIZES = [
  { size: "Newborn (NB)", age: "0–1 Month", weight: "Up to 4.5 kg", height: "Up to 53 cm" },
  { size: "0–3 Months", age: "1–3 Months", weight: "4.5 – 6.5 kg", height: "53 – 61 cm" },
  { size: "3–6 Months", age: "3–6 Months", weight: "6.5 – 8.5 kg", height: "61 – 68 cm" },
  { size: "6–12 Months", age: "6–12 Months", weight: "8.5 – 10.5 kg", height: "68 – 76 cm" },
  { size: "12–18 Months", age: "12–18 Months", weight: "10.5 – 12.5 kg", height: "76 – 84 cm" },
  { size: "18–24 Months", age: "18–24 Months", weight: "12.5 – 14.0 kg", height: "84 – 90 cm" },
  { size: "2–3 Years (2T/3T)", age: "2–3 Years", weight: "14.0 – 16.5 kg", height: "90 – 98 cm" },
  { size: "3–4 Years (4T)", age: "3–4 Years", weight: "16.5 – 19.0 kg", height: "98 – 105 cm" },
];

const SHOE_SIZES = [
  { euSize: "EU 16 / US 0", age: "0–3 Months", footLength: "9.5 cm", stage: "Pre-walker / Booties" },
  { euSize: "EU 17 / US 1", age: "3–6 Months", footLength: "10.5 cm", stage: "Pre-walker / Moccasins" },
  { euSize: "EU 18 / US 2", age: "6–9 Months", footLength: "11.2 cm", stage: "Crawling / Gripper Socks" },
  { euSize: "EU 19 / US 3", age: "9–12 Months", footLength: "11.8 cm", stage: "First Steps / Soft Soles" },
  { euSize: "EU 20 / US 4", age: "12–18 Months", footLength: "12.6 cm", stage: "Active Walker Sneakers" },
  { euSize: "EU 21 / US 5", age: "18–24 Months", footLength: "13.4 cm", stage: "Flexible Rubber Soles" },
  { euSize: "EU 22 / US 6", age: "2–3 Years", footLength: "14.2 cm", stage: "Toddler Explorer Shoes" },
];

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-cream-50 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-cocoa-muted">
            <Link href="/" className="hover:text-cocoa-deep">Home</Link>
            <span>/</span>
            <Link href="/guides/newborn-checklist" className="hover:text-cocoa-deep">Baby Guides</Link>
            <span>/</span>
            <span className="text-cocoa-deep font-bold">Size Guide</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-powder-pink/40 text-cocoa-deep text-xs font-extrabold uppercase tracking-wider">
            <Ruler className="w-3.5 h-3.5 text-powder-dark" />
            <span>Accurate Fit Guide</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-cocoa-deep tracking-tight">
            Baby & Toddler Size Guide
          </h1>

          <p className="text-sm sm:text-base text-cocoa-muted max-w-2xl mx-auto leading-relaxed">
            Babies grow rapidly. When in doubt, we recommend sizing up to ensure long-lasting comfort and freedom of movement.
          </p>
        </div>

        {/* Clothing Size Table */}
        <div className="bg-white rounded-4xl p-6 sm:p-8 border border-warm-beige shadow-soft space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">👕</span>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-cocoa-deep">
                Clothing & Rompers Sizing
              </h2>
              <p className="text-xs text-cocoa-muted">Weight and height measurements for 100% organic cotton wear</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-warm-beige bg-cream-50 text-cocoa-deep font-extrabold uppercase text-[11px]">
                  <th className="py-3 px-4 rounded-l-2xl">Size Tag</th>
                  <th className="py-3 px-4">Approx. Age</th>
                  <th className="py-3 px-4">Baby Weight (kg)</th>
                  <th className="py-3 px-4 rounded-r-2xl">Baby Height (cm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-beige/60">
                {CLOTHING_SIZES.map((row, idx) => (
                  <tr key={idx} className="hover:bg-cream-50/50 transition-colors">
                    <td className="py-3 px-4 font-bold text-cocoa-deep">{row.size}</td>
                    <td className="py-3 px-4 text-cocoa-muted">{row.age}</td>
                    <td className="py-3 px-4 font-semibold text-cocoa-deep">{row.weight}</td>
                    <td className="py-3 px-4 text-cocoa-muted">{row.height}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footwear Size Table */}
        <div className="bg-white rounded-4xl p-6 sm:p-8 border border-warm-beige shadow-soft space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">👟</span>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-cocoa-deep">
                Footwear & First-Walker Sizing
              </h2>
              <p className="text-xs text-cocoa-muted">Measure from the back of the heel to the tip of the big toe</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-warm-beige bg-cream-50 text-cocoa-deep font-extrabold uppercase text-[11px]">
                  <th className="py-3 px-4 rounded-l-2xl">Shoe Size</th>
                  <th className="py-3 px-4">Approx. Age</th>
                  <th className="py-3 px-4">Max Foot Length</th>
                  <th className="py-3 px-4 rounded-r-2xl">Walking Stage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-beige/60">
                {SHOE_SIZES.map((row, idx) => (
                  <tr key={idx} className="hover:bg-cream-50/50 transition-colors">
                    <td className="py-3 px-4 font-bold text-cocoa-deep">{row.euSize}</td>
                    <td className="py-3 px-4 text-cocoa-muted">{row.age}</td>
                    <td className="py-3 px-4 font-semibold text-cocoa-deep">{row.footLength}</td>
                    <td className="py-3 px-4 text-powder-dark font-semibold">{row.stage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sizing Tips */}
        <div className="rounded-4xl p-8 bg-gradient-to-tr from-powder-light via-white to-baby-light border border-warm-beige space-y-4">
          <h3 className="font-serif text-xl font-bold text-cocoa-deep">
            Parent Pro-Tips for Perfect Sizing
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-cocoa-deep">
            <div className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Always measure weight & height</strong> over age alone, as baby percentiles vary significantly.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Pre-washed organic cotton</strong> does not shrink under gentle cold washes.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Free 14-day size exchange:</strong> If a piece doesn&apos;t fit like a dream, we&apos;ll swap it at zero extra charge!</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Footwear:</strong> Allow 0.5 cm of wriggle room for growing toes and sock thickness.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
