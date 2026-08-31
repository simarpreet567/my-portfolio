"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, Heart } from "lucide-react";
import { useToast } from "../providers/ToastContext";
import { FloatingCloud, FloatingStar } from "./FloatingObjects";

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      showToast("Please enter a valid email", "We promise never to send spam!", "info");
      return;
    }
    showToast(
      "Welcome to the Little Club! 🌸",
      "We've sent a 10% welcome coupon straight to your inbox.",
      "success"
    );
    setEmail("");
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-cream-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Floating Background Clouds & Stars */}
        <div className="absolute -top-10 -left-10 hidden sm:block pointer-events-none">
          <FloatingCloud size="md" />
        </div>
        <div className="absolute -bottom-8 -right-8 hidden sm:block pointer-events-none">
          <FloatingCloud size="sm" />
        </div>
        <FloatingStar className="absolute top-4 right-12" color="#F7C9D4" delay={0.4} />
        <FloatingStar className="absolute bottom-6 left-16" color="#FCD34D" delay={0.8} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-5xl bg-white p-8 sm:p-12 md:p-16 border-2 border-white shadow-soft-lg text-center space-y-6 overflow-hidden"
        >
          {/* Subtle Ambient Gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-powder-light via-white to-baby-light opacity-70 pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-powder-pink/40 text-cocoa-deep text-xs font-extrabold uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-powder-dark" />
              <span>Join 25,000+ Parents</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-cocoa-deep tracking-tight">
              Join the little club ✨
            </h2>

            <p className="text-sm sm:text-base text-cocoa-muted font-normal leading-relaxed">
              Get first access to limited-edition new arrivals, secret seasonal promotions, and curated nursery inspiration.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="pt-4 flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-5 py-4 rounded-3xl bg-cream-50 border border-warm-beige text-cocoa-deep placeholder:text-cocoa-muted text-sm font-medium focus:outline-none focus:border-powder-pink focus:bg-white transition-all shadow-inner"
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-3xl bg-cocoa-deep hover:bg-cocoa-light text-cream font-bold text-sm shadow-soft hover:shadow-soft-lg flex items-center justify-center gap-2 transition-all group flex-shrink-0"
              >
                <span>Subscribe</span>
                <Send className="w-4 h-4 text-powder-pink group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <p className="text-[11px] text-cocoa-muted pt-2">
              🔒 Unsubscribe anytime with one click. We respect your inbox privacy.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
