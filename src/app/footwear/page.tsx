import React from "react";
import { CategoryTemplate } from "@/components/shop/CategoryTemplate";

export const metadata = {
  title: "Footwear & Booties — Little Bloom Baby Boutique",
  description: "Soft suede moccasins, cozy sherpa fleece booties, vintage leather pre-walkers, and non-skid gripper socks.",
};

export default function FootwearPage() {
  return <CategoryTemplate categorySlug="footwear" />;
}
