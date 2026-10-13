"use client";

import React, { useState } from "react";
import {
  X,
  Star,
  Plus,
  Minus,
  ShoppingCart,
  ShieldCheck,
  Check,
  MessageCircle,
  FileText,
  AlertCircle,
  Clock,
  Sparkles,
  Heart,
  ThermometerSnowflake,
} from "lucide-react";
import { usePharmacy } from "@/context/PharmacyContext";
import { MedicineVisual } from "@/components/pharmacy/MedicineVisual";

export function ProductDetailModal() {
  const {
    quickViewMedicine,
    setQuickViewMedicine,
    cart,
    addToCart,
    updateQuantity,
    setIsCartOpen,
  } = usePharmacy();

  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!quickViewMedicine) return null;

  const medicine = quickViewMedicine;
  const cartItem = cart.find((item) => item.medicine.id === medicine.id);
  const currentInCart = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addToCart(medicine, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleClose = () => {
    setQuickViewMedicine(null);
    setQuantity(1);
    setAddedNotice(false);
  };

  // WhatsApp order link prefilled with medicine details
  const whatsAppMessage = encodeURIComponent(
    `Hello PharmaZone, I want to order:\nMedicine: ${medicine.name}\nStrength: ${medicine.strength || medicine.dosageForm}\nPack Size: ${medicine.packSize || "Standard"}\nPrice: PKR ${medicine.pricePKR}\nFormula: ${medicine.genericFormula}`
  );
  const whatsAppUrl = `https://wa.me/923280790704?text=${whatsAppMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={handleClose} />

      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[92vh] flex flex-col z-10 animate-in zoom-in-95 duration-200">
        {/* Top Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 overflow-y-auto flex-1">
          {/* Left Column: Medicine Vector Visual Display */}
          <div className="md:col-span-5 bg-[#F6F9F7] p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200/80 relative">
            {/* Top Badges */}
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#EAF3EE] text-[#084236] font-extrabold text-xs border border-[#084236]/15">
                {medicine.discountPercent && medicine.discountPercent > 0
                  ? `${medicine.discountPercent}% OFF`
                  : "DRAP MRP"}
              </span>

              {medicine.requiresPrescription ? (
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  Rx Required
                </span>
              ) : (
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  OTC Medicine
                </span>
              )}
            </div>

            {/* High-res vector medicine visual */}
            <div className="py-6 flex items-center justify-center">
              <div className="w-48 h-48 sm:w-56 sm:h-56">
                <MedicineVisual
                  name={medicine.name}
                  dosageForm={medicine.dosageForm}
                  category={medicine.category}
                  brand={medicine.brand}
                  strength={medicine.strength}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Bottom Trust Tag */}
            <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-3 border border-slate-200/60 text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#084236]">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <span>100% Genuine Pakistani Distributor</span>
              </div>
              <p className="text-[10px] text-slate-500">
                Batch Verified • Cold-Chain Handled • DRAP Approved
              </p>
            </div>
          </div>

          {/* Right Column: Full Medicine Information & Actions */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5">
            <div>
              {/* Category & Star Rating */}
              <div className="flex items-center justify-between gap-2 text-xs mb-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {medicine.category}
                </span>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-slate-800">{medicine.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">
                    ({medicine.reviewsCount} verified reviews)
                  </span>
                </div>
              </div>

              {/* Medicine Name & Strength */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                {medicine.name}
              </h2>

              {/* Manufacturer Brand */}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-bold text-[#059669]">
                  Manufactured by {medicine.brand}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-500 font-medium">
                  {medicine.packSize || `${medicine.dosageForm} Pack`}
                </span>
              </div>

              {/* Active Formula / Generic Salt */}
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-mono font-semibold">
                <span className="text-slate-400">Formula:</span>
                <span>{medicine.genericFormula}</span>
              </div>

              {/* Pricing Display */}
              <div className="flex items-baseline gap-3 mt-4 pt-3 border-t border-slate-100">
                <span className="text-2xl sm:text-3xl font-black text-[#084236] font-display">
                  PKR {medicine.pricePKR}
                </span>
                {medicine.oldPricePKR && (
                  <span className="text-sm text-slate-400 line-through">
                    PKR {medicine.oldPricePKR}
                  </span>
                )}
                {medicine.discountPercent && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Save PKR {(medicine.oldPricePKR || 0) - medicine.pricePKR}
                  </span>
                )}
              </div>

              {/* Description & Clinical Usage Instructions */}
              <div className="mt-4 space-y-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Usage & Dosage Instructions
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed bg-[#F6F9F7] p-3 rounded-2xl border border-slate-200/60">
                  {medicine.description ||
                    "Take as advised by your physician. Swallow whole with water, preferably after meals. Do not exceed the recommended daily dose."}
                </p>
              </div>

              {/* Prescription Notice */}
              {medicine.requiresPrescription && (
                <div className="mt-3 bg-amber-50/80 border border-amber-200/80 rounded-2xl p-2.5 text-xs text-amber-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-tight">
                    <strong>Doctor's Prescription Slip Required:</strong> Our licensed Pharm-D will verify your prescription slip during packing.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Actions: Quantity Selector, Add to Cart, WhatsApp Order */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-3">
                {/* Quantity Controller */}
                <div className="flex items-center gap-3 bg-[#F6F8F6] border border-slate-200 rounded-2xl px-3 py-2">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="w-7 h-7 rounded-xl bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors shadow-2xs"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-extrabold text-sm text-slate-900 min-w-5 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="w-7 h-7 rounded-xl bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors shadow-2xs"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#084236] hover:bg-[#052e25] text-white font-extrabold text-xs sm:text-sm py-3 px-5 rounded-2xl shadow-lg shadow-[#084236]/20 transition-all active:scale-95"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>
                    {addedNotice
                      ? "Added to Cart!"
                      : `Add ${quantity} to Cart (PKR ${(medicine.pricePKR * quantity).toLocaleString()})`}
                  </span>
                </button>
              </div>

              {/* Direct WhatsApp Order CTA */}
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-4 rounded-2xl transition-all shadow-md active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Order via WhatsApp (0328-0790704)</span>
              </a>

              {currentInCart > 0 && (
                <div className="text-center">
                  <button
                    onClick={() => {
                      handleClose();
                      setIsCartOpen(true);
                    }}
                    className="text-xs text-[#084236] hover:underline font-bold"
                  >
                    You have {currentInCart} in your cart • View Cart
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
