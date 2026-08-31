"use client";

import React from "react";
import { ToastProvider } from "./ToastContext";
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";
import { SearchProvider } from "./SearchContext";
import { SearchModal } from "../ui/SearchModal";
import { MiniCartDrawer } from "../ui/MiniCartDrawer";

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>
          <SearchProvider>
            {children}
            <SearchModal />
            <MiniCartDrawer />
          </SearchProvider>
        </WishlistProvider>
      </CartProvider>
    </ToastProvider>
  );
};
