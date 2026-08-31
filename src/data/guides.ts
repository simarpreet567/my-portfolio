import { GuideItem } from "@/types";

export const BABY_GUIDES: GuideItem[] = [
  {
    id: "newborn-essentials",
    title: "The Ultimate Newborn Essentials Checklist",
    slug: "newborn-checklist",
    badge: "Must-Read for New Parents",
    category: "Preparation & Nursery",
    readTime: "5 min read",
    description: "A stress-free, pediatrician-reviewed checklist of everything baby genuinely needs for the first 3 months — and what you can safely skip.",
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80",
    checklistItems: [
      {
        category: "Clothing & Layering",
        items: [
          { name: "6–8 Organic Cotton Sleepsuits & Rompers", required: true, tip: "Look for 2-way zippers to make 2 AM diaper changes effortless.", recommendedProductId: "organic-cotton-sleepsuit" },
          { name: "4–6 Kimono-style side snap bodysuits", required: true, tip: "Prevents pulling fabric over healing umbilical cord." },
          { name: "3–4 Pairs soft cotton booties or gripper socks", required: true },
          { name: "2 Soft knot beanies & no-scratch mittens", required: true },
          { name: "1 Special announcement / going-home outfit", required: false },
        ],
      },
      {
        category: "Nursery & Sweet Sleep",
        items: [
          { name: "1 Safe firm crib or bassinet with breathable mattress", required: true },
          { name: "3–4 100% Bamboo breathable swaddle blankets", required: true, tip: "Bamboo thermoregulates to prevent overheating.", recommendedProductId: "bamboo-muslin-swaddle" },
          { name: "2–3 Fitted organic crib sheets", required: true },
          { name: "1 Gentle warm night light (soft amber glow)", required: true, recommendedProductId: "silicone-bear-night-light" },
          { name: "1 White noise machine or plush cloud soother", required: false, recommendedProductId: "musical-cloud-soother" },
        ],
      },
      {
        category: "Diapering & Hygiene",
        items: [
          { name: "2–3 Packs hypoallergenic pure water wipes", required: true, recommendedProductId: "pure-bamboo-baby-wipes" },
          { name: "1 Zinc oxide soothing barrier diaper balm", required: true, recommendedProductId: "soothing-zinc-diaper-balm" },
          { name: "1 Portable wipeable changing mat", required: true, recommendedProductId: "portable-changing-clutch" },
          { name: "1 Nursery diaper caddy organizer", required: true, recommendedProductId: "felt-nursery-diaper-caddy" },
        ],
      },
      {
        category: "Bath & Gentle Care",
        items: [
          { name: "1 Tear-free organic chamomile baby wash", required: true, recommendedProductId: "gentle-chamomile-baby-wash" },
          { name: "1 Hooded plush bamboo bath towel", required: true, recommendedProductId: "hooded-bear-bamboo-towel" },
          { name: "1 Soft goat bristle cradle cap brush", required: true, recommendedProductId: "goat-bristle-baby-brush" },
          { name: "1 Safe baby electric/curved nail grooming set", required: true, recommendedProductId: "baby-grooming-health-kit" },
        ],
      },
    ],
  },
  {
    id: "hospital-bag-essentials",
    title: "Hospital Bag Packing Guide for Mom & Baby",
    slug: "hospital-bag",
    badge: "Labor & Delivery Ready",
    category: "Checklists",
    readTime: "4 min read",
    description: "Curated by experienced midwives: what to pack in your hospital bag for labor, postpartum recovery, and bringing baby home peacefully.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    checklistItems: [
      {
        category: "For Baby's Arrival",
        items: [
          { name: "3 Kimono bodysuits (Newborn & 0-3M sizes)", required: true },
          { name: "2 Swaddle blankets for swaddling and photos", required: true },
          { name: "2 Newborn beanies and scratch mittens", required: true },
          { name: "1 Installed rear-facing infant car seat", required: true },
          { name: "1 Pack of pure water sensitive baby wipes", required: true },
        ],
      },
      {
        category: "For Mom's Comfort",
        items: [
          { name: "2 Nursing-friendly button-down nightgowns", required: true },
          { name: "Warm non-slip cozy socks or slippers", required: true },
          { name: "Organic nipple balm & nursing pads", required: true },
          { name: "Long phone charger cord (10ft) & lip balm", required: true },
        ],
      },
    ],
  },
  {
    id: "size-guide",
    title: "Little Bloom Baby & Toddler Size Guide",
    slug: "size-guide",
    badge: "Fit & Measuring Guide",
    category: "Sizing Help",
    readTime: "3 min read",
    description: "Accurate size charts covering age, weight, and height measurements for newborn, infant, and toddler clothing and pre-walker footwear.",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "gift-finder",
    title: "Interactive Baby Gift Finder & Hamper Builder",
    slug: "gift-finder",
    badge: "Interactive Tool",
    category: "Gifting",
    readTime: "Interactive Quiz",
    description: "Find the dream gift in under 60 seconds based on the baby's age, occasion (Baby Shower, 1st Birthday, Welcome World), and budget.",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80",
  },
];
