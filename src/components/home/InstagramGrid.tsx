"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, Heart } from "lucide-react";

const INSTA_POSTS = [
  {
    id: "insta-1",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80",
    likes: 428,
  },
  {
    id: "insta-2",
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80",
    likes: 612,
  },
  {
    id: "insta-3",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80",
    likes: 389,
  },
  {
    id: "insta-4",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80",
    likes: 541,
  },
  {
    id: "insta-5",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=600&q=80",
    likes: 720,
  },
  {
    id: "insta-6",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=600&q=80",
    likes: 854,
  },
];

export const InstagramGrid: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-powder-pink/40 text-cocoa-deep text-xs font-extrabold uppercase tracking-wider">
            <Instagram className="w-3.5 h-3.5 text-powder-dark" />
            <span>@littlebloom</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-cocoa-deep tracking-tight">
            A little love, every day.
          </h2>
          <p className="text-sm sm:text-base text-cocoa-muted font-normal">
            Tag us in your nursery moments with #LittlebloomMoments to be featured!
          </p>
        </div>

        {/* 6 Images Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTA_POSTS.map((post, idx) => (
            <motion.a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="group relative aspect-square rounded-3xl overflow-hidden bg-cream-200 shadow-sm block"
            >
              <Image
                src={post.image}
                alt="Littlebloom Instagram moment"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              />

              {/* Hover Overlay with Heart & Instagram Icon */}
              <div className="absolute inset-0 bg-cocoa-deep/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white gap-2 backdrop-blur-xs">
                <Instagram className="w-6 h-6 text-powder-pink" />
                <div className="flex items-center gap-1 text-xs font-bold">
                  <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                  <span>{post.likes}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Follow CTA Button */}
        <div className="mt-10 text-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-3xl bg-cream-100 hover:bg-powder-pink/50 text-cocoa-deep text-sm font-bold border border-warm-beige transition-all shadow-xs"
          >
            <Instagram className="w-4 h-4 text-powder-dark" />
            <span>Follow @littlebloom on Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
};
