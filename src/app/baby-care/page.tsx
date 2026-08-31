import React from "react";
import { CategoryTemplate } from "@/components/shop/CategoryTemplate";

export const metadata = {
  title: "Baby Care & Skincare — Little Bloom Baby Boutique",
  description: "Tear-free botanical washes, organic cold-pressed massage oils, zinc barrier creams, and pure water wipes.",
};

export default function BabyCarePage() {
  return <CategoryTemplate categorySlug="baby-care" />;
}
