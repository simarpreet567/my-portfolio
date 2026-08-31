import React from "react";
import { CategoryTemplate } from "@/components/shop/CategoryTemplate";

export const metadata = {
  title: "Feeding & Mealtime — Little Bloom Baby Boutique",
  description: "100% food-grade silicone suction bowls, anti-colic glass bottles, catch bibs, and ergonomic weaning utensils.",
};

export default function FeedingPage() {
  return <CategoryTemplate categorySlug="feeding" />;
}
