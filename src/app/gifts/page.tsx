import React from "react";
import { CategoryTemplate } from "@/components/shop/CategoryTemplate";

export const metadata = {
  title: "Gifts & Keepsake Hampers — Little Bloom Baby Boutique",
  description: "Luxury newborn gift boxes, baby shower baskets, milestone keepsake journals, and first birthday hampers.",
};

export default function GiftsPage() {
  return <CategoryTemplate categorySlug="gifts" />;
}
