import React from "react";
import { CategoryTemplate } from "@/components/shop/CategoryTemplate";

export const metadata = {
  title: "Clothing & Rompers — Little Bloom Baby Boutique",
  description: "Cloud-soft organic cotton bodysuits, kimono sets, knit rompers, and festive traditional babywear.",
};

export default function ClothingPage() {
  return <CategoryTemplate categorySlug="clothing" />;
}
