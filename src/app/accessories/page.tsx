import React from "react";
import { CategoryTemplate } from "@/components/shop/CategoryTemplate";

export const metadata = {
  title: "Accessories & Extras — Little Bloom Baby Boutique",
  description: "Hand-tied nylon bow headbands, beechwood pacifier clips, UV400 flexible sunglasses, and sun hats.",
};

export default function AccessoriesPage() {
  return <CategoryTemplate categorySlug="accessories" />;
}
