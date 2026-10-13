"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Medicine, CartItem, PakistanCity } from "@/types/pharmacy";

interface PharmacyContextType {
  selectedCity: PakistanCity;
  setSelectedCity: (city: PakistanCity) => void;
  cart: CartItem[];
  addToCart: (medicine: Medicine, quantity?: number) => void;
  removeFromCart: (medicineId: string) => void;
  updateQuantity: (medicineId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartSavings: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isPrescriptionModalOpen: boolean;
  setIsPrescriptionModalOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
}

const PharmacyContext = createContext<PharmacyContextType | undefined>(undefined);

export function PharmacyProvider({ children }: { children: React.ReactNode }) {
  const [selectedCity, setSelectedCity] = useState<PakistanCity>("Karachi");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Restore cart and city from localStorage on mount
  useEffect(() => {
    try {
      const storedCity = localStorage.getItem("pharma_zone_city") as PakistanCity | null;
      if (storedCity) {
        setSelectedCity(storedCity);
      }
      const storedCart = localStorage.getItem("pharma_zone_cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch {
      // ignore JSON parse or localStorage errors
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("pharma_zone_city", selectedCity);
      localStorage.setItem("pharma_zone_cart", JSON.stringify(cart));
    } catch {
      // storage unavailable
    }
  }, [selectedCity, cart, isLoaded]);

  const addToCart = (medicine: Medicine, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.medicine.id === medicine.id);
      if (existing) {
        return prev.map((item) =>
          item.medicine.id === medicine.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { medicine, quantity }];
    });
  };

  const removeFromCart = (medicineId: string) => {
    setCart((prev) => prev.filter((item) => item.medicine.id !== medicineId));
  };

  const updateQuantity = (medicineId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(medicineId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.medicine.id === medicineId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.medicine.pricePKR * item.quantity,
    0
  );

  const cartSavings = cart.reduce((sum, item) => {
    if (item.medicine.oldPricePKR && item.medicine.oldPricePKR > item.medicine.pricePKR) {
      return sum + (item.medicine.oldPricePKR - item.medicine.pricePKR) * item.quantity;
    }
    return sum;
  }, 0);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <PharmacyContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartSavings,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        isPrescriptionModalOpen,
        setIsPrescriptionModalOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
      }}
    >
      {children}
    </PharmacyContext.Provider>
  );
}

export function usePharmacy() {
  const context = useContext(PharmacyContext);
  if (!context) {
    throw new Error("usePharmacy must be used within a PharmacyProvider");
  }
  return context;
}
