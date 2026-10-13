"use client";

import React, { useState } from "react";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { usePharmacy } from "@/context/PharmacyContext";
import { Button } from "@/components/ui/Button";
import { MedicineVisual } from "@/components/pharmacy/MedicineVisual";

const FREE_DELIVERY_THRESHOLD = 1500;
const DELIVERY_FEE = 150;

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartSavings,
    selectedCity,
    setIsCheckoutOpen,
  } = usePharmacy();

  if (!isCartOpen) return null;

  const isFreeDelivery = cartTotal >= FREE_DELIVERY_THRESHOLD || cartTotal === 0;
  const deliveryCharge = isFreeDelivery ? 0 : DELIVERY_FEE;
  const finalTotal = cartTotal + deliveryCharge;
  const amountNeededForFree = Math.max(0, FREE_DELIVERY_THRESHOLD - cartTotal);
  const progressPercent = Math.min(
    100,
    Math.round((cartTotal / FREE_DELIVERY_THRESHOLD) * 100)
  );

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-[#F6F8F6]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#084236] text-white flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">
                  Your Pharmacy Cart
                </h2>
                <p className="text-xs text-slate-500">
                  Delivering to: <strong className="text-[#084236]">{selectedCity}</strong>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#EAF3EE] text-[#084236] flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-1">
                  Your Cart is Empty
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mb-6">
                  Add genuine medicines, vitamins, or upload your doctor's prescription.
                </p>
                <Button onClick={() => setIsCartOpen(false)} variant="primary">
                  Browse Medicines
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Free Delivery Bar */}
                <div className="bg-[#EAF3EE] border border-emerald-500/20 rounded-2xl p-3.5">
                  <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                    <span className="text-[#084236] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                      {isFreeDelivery ? (
                        <strong className="text-emerald-700">You unlocked FREE Delivery!</strong>
                      ) : (
                        <>
                          Add <strong className="text-[#084236]">PKR {amountNeededForFree}</strong> more for FREE Delivery
                        </>
                      )}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">
                      {progressPercent}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white overflow-hidden">
                    <div
                      className="h-full bg-[#10B981] transition-all duration-300 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="divide-y divide-slate-100">
                  {cart.map((item) => (
                    <div key={item.medicine.id} className="py-3.5 flex gap-3 items-center">
                      {/* Medicine Vector Visual Thumbnail */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F6F9F7] shrink-0 border border-slate-100 flex items-center justify-center">
                        <MedicineVisual
                          name={item.medicine.name}
                          dosageForm={item.medicine.dosageForm}
                          category={item.medicine.category}
                          brand={item.medicine.brand}
                          className="w-full h-full p-1"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-xs font-bold text-slate-800 line-clamp-1">
                              {item.medicine.name}
                            </h4>
                            <p className="text-[10px] text-slate-500 line-clamp-1">
                              {item.medicine.brand} • {item.medicine.dosageForm}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.medicine.id)}
                            className="text-slate-400 hover:text-red-500 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-baseline gap-1">
                            <span className="text-xs font-bold text-[#084236]">
                              PKR {item.medicine.pricePKR * item.quantity}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              (PKR {item.medicine.pricePKR}/ea)
                            </span>
                          </div>

                          <div className="flex items-center gap-2 bg-[#F6F8F6] border border-slate-200/80 rounded-lg px-2 py-0.5">
                            <button
                              onClick={() => updateQuantity(item.medicine.id, item.quantity - 1)}
                              className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-[#084236]"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-slate-800 min-w-3 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.medicine.id, item.quantity + 1)}
                              className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-[#084236]"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-white space-y-3">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">
                    PKR {cartTotal.toLocaleString()}
                  </span>
                </div>

                {cartSavings > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount Savings</span>
                    <span>- PKR {cartSavings.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Standard Delivery ({selectedCity})</span>
                  <span>
                    {isFreeDelivery ? (
                      <strong className="text-emerald-700 uppercase">FREE</strong>
                    ) : (
                      `PKR ${deliveryCharge}`
                    )}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex justify-between text-sm font-bold text-slate-900">
                  <span>Total Amount</span>
                  <span className="text-base text-[#084236] font-display font-black">
                    PKR {finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Pakistani Payment Methods Note */}
              <div className="bg-[#F6F8F6] rounded-xl p-2.5 text-[11px] text-slate-600 flex items-center justify-between">
                <span>Payment Accepted:</span>
                <span className="font-semibold text-[#084236]">
                  Cash on Delivery / JazzCash / EasyPaisa
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-[#084236] hover:bg-[#052e25] text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#084236]/20 active:scale-[0.99] transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Sealed & Temperature-Controlled Cold-Chain Packaging
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
