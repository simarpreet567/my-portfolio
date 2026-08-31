import React from "react";
import { CategoryTemplate } from "@/components/shop/CategoryTemplate";

export const metadata = {
  title: "Diapering & Changing — Little Bloom Baby Boutique",
  description: "Premium vegan leather diaper backpacks, organic bamboo diapers, portable changing mats, and nursery caddies.",
};

export default function DiaperingPage() {
  return <CategoryTemplate categorySlug="diapering" />;
}
