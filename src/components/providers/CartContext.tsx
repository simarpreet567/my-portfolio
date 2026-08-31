"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { Product, ProductColor, ProductSize, CartItem } from "@/types";
import { useToast } from "./ToastContext";

interface PromoInfo {
  code: string;
  discountPercent?: number;
  discountFixed?: number;
  description: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, selectedColor?: ProductColor, selectedSize?: ProductSize, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  isFreeShipping: boolean;
  appliedPromo: PromoInfo | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;
}

const VALID_PROMOS: Record<string, PromoInfo> = {
  BLOOM10: { code: "BLOOM10", discountPercent: 10, description: "10% off entire order" },
  LITTLELOVE: { code: "LITTLELOVE", discountFixed: 200, description: "₹200 flat savings on order" },
  NEWBORN20: { code: "NEWBORN20", discountPercent: 20, description: "20% off Newborn Collection" },
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<PromoInfo | null>(null);
  const { showToast } = useToast();

  const FREE_SHIPPING_THRESHOLD = 999;
  const STANDARD_SHIPPING_FEE = 99;

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("littlebloom_cart");
      if (stored) {
        setItems(JSON.parse(stored));
      }
      const storedPromo = localStorage.getItem("littlebloom_promo");
      if (storedPromo) {
        setAppliedPromo(JSON.parse(storedPromo));
      }
    } catch (e) {
      console.error("Failed to load cart from storage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("littlebloom_cart", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      if (appliedPromo) {
        localStorage.setItem("littlebloom_promo", JSON.stringify(appliedPromo));
      } else {
        localStorage.removeItem("littlebloom_promo");
      }
    }
  }, [appliedPromo, isLoaded]);

  const addToCart = useCallback(
    (
      product: Product,
      selectedColor?: ProductColor,
      selectedSize?: ProductSize,
      quantity = 1
    ) => {
      const color = selectedColor || product.colors[0] || { name: "Default", hex: "#FFF" };
      const size = selectedSize || product.sizes[0] || { name: "Standard", inStock: true };
      const cartItemId = `${product.id}-${color.name}-${size.name}`;

      setItems((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === cartItemId);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };
          return updated;
        } else {
          return [
            ...prev,
            {
              id: cartItemId,
              product,
              selectedColor: color,
              selectedSize: size,
              quantity,
            },
          ];
        }
      });

      showToast(
        "Added to Bag ✨",
        `${product.name} (${size.name}) added to your shopping bag.`,
        "cart"
      );
    },
    [showToast]
  );

  const removeFromCart = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.id !== itemId));
    } else {
      setItems((prev) =>
        prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const applyPromo = useCallback((code: string) => {
    const formatted = code.trim().toUpperCase();
    const promo = VALID_PROMOS[formatted];
    if (promo) {
      setAppliedPromo(promo);
      return { success: true, message: `Promo code "${promo.code}" applied! ${promo.description}` };
    }
    return { success: false, message: "Invalid promo code. Try 'BLOOM10' or 'LITTLELOVE'" };
  }, []);

  const removePromo = useCallback(() => {
    setAppliedPromo(null);
  }, []);

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  );

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0;
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shipping = items.length === 0 ? 0 : isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;

  const discount = useMemo(() => {
    if (!appliedPromo || items.length === 0) return 0;
    if (appliedPromo.discountPercent) {
      return Math.round((subtotal * appliedPromo.discountPercent) / 100);
    }
    if (appliedPromo.discountFixed) {
      return Math.min(subtotal, appliedPromo.discountFixed);
    }
    return 0;
  }, [appliedPromo, subtotal, items.length]);

  const total = Math.max(0, subtotal - discount + shipping);

  const openCartDrawer = useCallback(() => setIsCartDrawerOpen(true), []);
  const closeCartDrawer = useCallback(() => setIsCartDrawerOpen(false), []);
  const toggleCartDrawer = useCallback(() => setIsCartDrawerOpen((prev) => !prev), []);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discount,
        shipping,
        total,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingRemaining,
        isFreeShipping,
        appliedPromo,
        applyPromo,
        removePromo,
        isCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
        toggleCartDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
