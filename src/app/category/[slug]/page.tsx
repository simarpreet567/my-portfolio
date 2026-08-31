"use client";

import React from "react";
import { useParams } from "next/navigation";
import { CategoryTemplate } from "@/components/shop/CategoryTemplate";
import { ProductCategory } from "@/types";

export default function DynamicCategoryPage() {
  const params = useParams();
  const slug = (params?.slug as ProductCategory) || "clothing";

  return <CategoryTemplate categorySlug={slug} />;
}
