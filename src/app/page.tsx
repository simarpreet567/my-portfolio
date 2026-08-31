import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ShopByAgeSection } from "@/components/home/ShopByAgeSection";
import { BestsellersSection } from "@/components/home/BestsellersSection";
import { ShopByNeedSection } from "@/components/home/ShopByNeedSection";
import { OrganicMontessoriSection } from "@/components/home/OrganicMontessoriSection";
import { PromoBanner } from "@/components/home/PromoBanner";
import { NewArrivalsSection } from "@/components/home/NewArrivalsSection";
import { BabyGuidesBanner } from "@/components/home/BabyGuidesBanner";
import { WhyLittlebloom } from "@/components/home/WhyLittlebloom";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { RecentlyViewedSection } from "@/components/home/RecentlyViewedSection";
import { InstagramGrid } from "@/components/home/InstagramGrid";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <CategoryGrid />
      <ShopByAgeSection />
      <BestsellersSection />
      <ShopByNeedSection />
      <OrganicMontessoriSection />
      <PromoBanner />
      <NewArrivalsSection />
      <BabyGuidesBanner />
      <WhyLittlebloom />
      <TestimonialsSection />
      <RecentlyViewedSection />
      <InstagramGrid />
      <NewsletterSection />
    </div>
  );
}
