import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — Little Bloom Baby Boutique",
  description: "Our privacy policy and data protection commitments for families shopping at Little Bloom.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-cream-50 py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-powder-pink/40 text-cocoa-deep text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-powder-dark" />
            <span>Family Privacy Pledge</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-cocoa-deep">
            Privacy Policy
          </h1>
          <p className="text-xs text-cocoa-muted">Last updated: August 2026</p>
        </div>

        <div className="bg-white rounded-4xl p-6 sm:p-10 border border-warm-beige shadow-soft space-y-6 text-xs sm:text-sm text-cocoa-muted leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-cocoa-deep">1. Information We Collect</h2>
            <p>
              When you place an order with Little Bloom, we collect your name, shipping address, contact phone number, and email address solely for order processing, fulfillment, and delivery tracking.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-cocoa-deep">2. Zero Data Selling Pledge</h2>
            <p>
              We treat your family&apos;s personal information with the utmost respect. We never sell, rent, or trade your personal data with third-party advertisers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-cocoa-deep">3. Payment Security</h2>
            <p>
              All online payments are securely processed through RBI-compliant, 256-bit encrypted payment gateways. Little Bloom never stores credit/debit card details or UPI PINs on our servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-cocoa-deep">4. Cookies & Preferences</h2>
            <p>
              We use lightweight local browser storage to keep track of your shopping cart and saved wishlist items across browsing sessions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-cocoa-deep">5. Contact Our Privacy Officer</h2>
            <p>
              For any questions regarding your data or to request account deletion, please email us at <a href="mailto:care@littlebloom.in" className="font-bold text-cocoa-deep underline">care@littlebloom.in</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
