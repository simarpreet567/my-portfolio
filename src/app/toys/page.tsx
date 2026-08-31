import React from "react";
import { CategoryTemplate } from "@/components/shop/CategoryTemplate";

export const metadata = {
  title: "Toys & Montessori Play — Little Bloom Baby Boutique",
  description: "Natural beechwood toys, organic plush animals, musical teethers, and sensory developmental play sets.",
};

export default function ToysPage() {
  return <CategoryTemplate categorySlug="toys" />;
}
