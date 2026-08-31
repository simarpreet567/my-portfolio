"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, Send, Sparkles, MessageCircle, HelpCircle } from "lucide-react";
import { useToast } from "@/components/providers/ToastContext";

export default function ContactPage() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast("Please fill in all fields", "We need your message to help you out!", "info");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      showToast("Message Delivered 🌸", "Thank you! Our care team will reply within 4 business hours.", "success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-cream-50 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-powder-pink/40 text-cocoa-deep text-xs font-extrabold uppercase tracking-wider">
            <MessageCircle className="w-3.5 h-3.5 text-powder-dark" />
            <span>We&apos;re Here to Help</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-cocoa-deep tracking-tight">
            Get in touch with us
          </h1>
          <p className="text-sm sm:text-base text-cocoa-muted font-normal">
            Questions about sizing, custom gift hampers, or order tracking? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Contact Form (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 rounded-5xl bg-white border border-warm-beige shadow-soft">
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="font-serif text-2xl font-bold text-cocoa-deep">
                Send Us a Note
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-cocoa-deep mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full px-4 py-3 rounded-2xl bg-cream-50 border border-warm-beige text-xs font-semibold text-cocoa-deep focus:outline-none focus:border-powder-pink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-cocoa-deep mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-2xl bg-cream-50 border border-warm-beige text-xs font-semibold text-cocoa-deep focus:outline-none focus:border-powder-pink"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-cocoa-deep mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Sizing Advice / Custom Hamper Inquiry"
                  className="w-full px-4 py-3 rounded-2xl bg-cream-50 border border-warm-beige text-xs font-semibold text-cocoa-deep focus:outline-none focus:border-powder-pink"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-cocoa-deep mb-1">
                  Your Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you and your little one today?"
                  className="w-full p-4 rounded-2xl bg-cream-50 border border-warm-beige text-xs font-medium text-cocoa-deep focus:outline-none focus:border-powder-pink"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-3xl bg-cocoa-deep hover:bg-cocoa-light text-cream font-bold text-sm shadow-soft hover:shadow-soft-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-powder-pink" />
                <span>{isSubmitting ? "Sending Note..." : "Send Message"}</span>
              </button>
            </form>
          </div>

          {/* Right: Contact Information Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-4xl bg-white border border-warm-beige shadow-soft space-y-6">
              <h3 className="font-serif text-xl font-bold text-cocoa-deep pb-2 border-b border-warm-beige">
                Customer Care & Studio
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-powder-pink/30 flex items-center justify-center text-powder-dark flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-cocoa-deep">Email Support</p>
                    <p className="text-cocoa-muted">care@littlebloom.in</p>
                    <p className="text-[11px] text-cocoa-muted">Response within 4 business hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-baby-blue/40 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-cocoa-deep">WhatsApp & Telephone</p>
                    <p className="text-cocoa-muted">+91 98765 43210</p>
                    <p className="text-[11px] text-cocoa-muted">Mon - Sat: 9:30 AM - 6:30 PM IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-lavender-soft/40 flex items-center justify-center text-purple-600 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-cocoa-deep">Boutique Flagship Studios</p>
                    <p className="text-cocoa-muted">Studio 4, Hill Road, Bandra West, Mumbai, 400050</p>
                    <p className="text-cocoa-muted">Design House: Model Town, Ludhiana, Punjab</p>
                  </div>
                </div>
              </div>

              {/* Quick FAQ link box */}
              <div className="p-4 rounded-3xl bg-cream-100/70 border border-warm-beige flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-powder-dark" />
                  <span className="text-xs font-bold text-cocoa-deep">Have a quick question?</span>
                </div>
                <Link
                  href="/faq"
                  className="text-xs font-bold text-powder-dark hover:underline"
                >
                  Read FAQ →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
