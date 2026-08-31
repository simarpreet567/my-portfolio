"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, CheckCircle2, Heart, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/reviews";

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-cream-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-powder-pink/40 text-cocoa-deep text-xs font-extrabold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Community Stories</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-cocoa-deep tracking-tight">
            Loved by little families
          </h2>
          <p className="text-sm sm:text-base text-cocoa-muted font-normal">
            Real stories from parents who welcomed Littlebloom into their sweetest everyday moments.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col justify-between p-6 rounded-4xl bg-white border border-warm-beige shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 relative"
            >
              <div className="space-y-3">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Content */}
                <p className="text-sm text-cocoa-deep leading-relaxed italic font-normal">
                  &ldquo;{review.content}&rdquo;
                </p>
              </div>

              {/* Author Details */}
              <div className="pt-4 mt-4 border-t border-cream-200 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-cream-200 flex-shrink-0">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-cocoa-deep truncate">{review.name}</h4>
                    {review.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-sage-green flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-cocoa-muted truncate">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
