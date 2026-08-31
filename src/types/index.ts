export type ProductCategory =
  | 'clothing'
  | 'toys'
  | 'nursery'
  | 'feeding'
  | 'baby-care'
  | 'diapering'
  | 'footwear'
  | 'accessories'
  | 'gifts';

export type AgeGroup = '0-3m' | '3-6m' | '6-12m' | '1-2y' | '2-4y';

export type RoutineNeed = 'feeding' | 'sleeping' | 'bath-time' | 'playtime' | 'travel' | 'baby-care';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ProductSize {
  name: string;
  inStock: boolean;
}

export interface ProductReview {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  location?: string;
  helpfulCount?: number;
}

export interface ProductQAItem {
  id: string;
  question: string;
  answer: string;
  askedBy: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  subCategory: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  shortDescription: string;
  colors: ProductColor[];
  sizes: ProductSize[];
  ageRange: string;
  ageGroup: AgeGroup;
  routineNeed?: RoutineNeed;
  gender?: 'unisex' | 'boy' | 'girl';
  stock: number;
  bestseller?: boolean;
  newArrival?: boolean;
  featured?: boolean;
  badge?: string;
  materials: string[];
  dimensions?: string;
  features?: string[];
  careInstructions: string[];
  safetyCertifications: string[];
  shippingInfo?: string;
  tags: string[];
  isOrganic?: boolean;
  isMontessori?: boolean;
  isParentPick?: boolean;
  qa?: ProductQAItem[];
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  itemCount?: number;
}

export interface Category {
  id: ProductCategory;
  name: string;
  slug: string;
  icon: string;
  tagline: string;
  description: string;
  image: string;
  bgGradient: string;
  accentColor: string;
  itemCount: number;
  subCategories: SubCategory[];
}

export interface CartItem {
  id: string; // unique combo of product.id + color + size
  product: Product;
  selectedColor: ProductColor;
  selectedSize: ProductSize;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  content: string;
  verified: boolean;
  location: string;
  date: string;
  productMentioned?: string;
  productImage?: string;
}

export interface FilterState {
  searchQuery: string;
  category: string;
  subCategory?: string;
  ageGroup?: string;
  routineNeed?: string;
  gender: string;
  minPrice: number;
  maxPrice: number;
  rating: number | null;
  inStockOnly: boolean;
  badge?: string;
  sortBy: 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating' | 'bestsellers';
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine: string;
  apartment?: string;
  city: string;
  state: string;
  pinCode: string;
  giftWrap?: boolean;
  giftNote?: string;
}

export interface OrderDetails {
  orderId: string;
  orderDate: string;
  address: ShippingAddress;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  giftWrapFee?: number;
  total: number;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
  paymentStatus: 'paid' | 'pending';
  orderStatus: 'confirmed' | 'processing' | 'shipped' | 'delivered';
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface GuideItem {
  id: string;
  title: string;
  slug: string;
  badge: string;
  description: string;
  image: string;
  readTime: string;
  category: string;
  checklistItems?: {
    category: string;
    items: { name: string; required: boolean; tip?: string; recommendedProductId?: string }[];
  }[];
}
