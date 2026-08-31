"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Heart, ShoppingBag, Info, X } from "lucide-react";

export type ToastType = "success" | "cart" | "wishlist" | "info";

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type?: ToastType;
  icon?: string;
}

interface ToastContextType {
  showToast: (title: string, message?: string, type?: ToastType, icon?: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (title: string, message?: string, type: ToastType = "success", icon?: string) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, title, message, type, icon }]);

      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="pointer-events-auto flex items-start gap-3 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-soft-lg border border-powder-pink/40 text-cocoa-deep"
            >
              <div className="flex-shrink-0 mt-0.5">
                {toast.icon ? (
                  <span className="text-xl">{toast.icon}</span>
                ) : toast.type === "cart" ? (
                  <div className="w-8 h-8 rounded-full bg-powder-pink/30 flex items-center justify-center text-powder-dark">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                ) : toast.type === "wishlist" ? (
                  <div className="w-8 h-8 rounded-full bg-powder-pink/40 flex items-center justify-center text-rose-500">
                    <Heart className="w-4 h-4 fill-rose-400" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-sage-light flex items-center justify-center text-sage-green">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </div>
              <div className="flex-1 pr-2">
                <p className="text-sm font-bold text-cocoa-deep">{toast.title}</p>
                {toast.message && (
                  <p className="text-xs text-cocoa-muted mt-0.5 leading-relaxed">{toast.message}</p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-cocoa-muted hover:text-cocoa-deep p-1 rounded-lg hover:bg-cream-200 transition-colors"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
