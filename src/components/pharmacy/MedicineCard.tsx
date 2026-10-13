"use client";

import React, { useState } from "react";
import { Star, Heart, Plus, Minus, ShoppingCart, Eye } from "lucide-react";
import { Medicine } from "@/types/pharmacy";
import { usePharmacy } from "@/context/PharmacyContext";
import { MedicineVisual } from "@/components/pharmacy/MedicineVisual";

interface MedicineCardProps {
  medicine: Medicine;
}

export function MedicineCard({ medicine }: MedicineCardProps) {
  const { cart, addToCart, updateQuantity, setQuickViewMedicine } = usePharmacy();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const cartItem = cart.find((item) => item.medicine.id === medicine.id);
  const currentQuantity = cartItem?.quantity || 0;

  const discountVal =
    medicine.discountPercent && medicine.discountPercent > 0
      ? `${medicine.discountPercent}% OFF`
      : medicine.oldPricePKR && medicine.oldPricePKR > medicine.pricePKR
      ? `${Math.round(((medicine.oldPricePKR - medicine.pricePKR) / medicine.oldPricePKR) * 100)}% OFF`
      : "10% OFF";

  const handleCardClick = () => {
    setQuickViewMedicine(medicine);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-[#084236]/20 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 cursor-pointer select-none"
    >
      {/* Top Header: Discount chip (top left) & Wishlist heart toggle (top right) */}
      <div className="flex items-center justify-between gap-2 mb-3">
        {/* Discount percentage chip */}
        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#EAF3EE] text-[#084236] font-extrabold text-[11px] tracking-wide border border-[#084236]/15">
          {discountVal}
        </span>

        {/* Wishlist heart toggle */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isWishlisted
              ? "bg-rose-50 text-rose-500 scale-105"
              : "bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50"
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${
              isWishlisted ? "fill-rose-500 stroke-rose-500 scale-110" : ""
            }`}
          />
        </button>
      </div>

      {/* Product Illustration centered on neutral surface (Vector SVG/CSS) */}
      <div className="relative w-full h-44 mb-3.5 rounded-2xl bg-[#F6F9F7] group-hover:bg-[#EAF3EE]/50 flex items-center justify-center transition-colors overflow-hidden">
        <MedicineVisual
          name={medicine.name}
          dosageForm={medicine.dosageForm}
          category={medicine.category}
          brand={medicine.brand}
          strength={medicine.strength}
          className="w-full h-full object-contain"
        />

        {/* Quick View Hover Indicator */}
        <div className="absolute inset-0 bg-[#084236]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white/90 backdrop-blur-xs text-[#084236] font-bold text-[11px] px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transform scale-95 group-hover:scale-100 transition-transform">
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </span>
        </div>

        {/* Prescription indicator badge */}
        <div className="absolute bottom-2 left-2.5">
          {medicine.requiresPrescription ? (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 border border-amber-500/20">
              Rx Required
            </span>
          ) : (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
              OTC
            </span>
          )}
        </div>

        {/* Pack Size info */}
        <div className="absolute bottom-2 right-2.5 text-[10px] text-slate-500 font-medium bg-white/80 px-2 py-0.5 rounded-md backdrop-blur-xs">
          {medicine.dosageForm}
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col">
        {/* Category & Star Rating */}
        <div className="flex items-center justify-between gap-2 text-xs mb-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider truncate">
            {medicine.category.split("&")[0].trim()}
          </span>
          <div className="flex items-center gap-1 text-amber-500 shrink-0 font-bold text-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-slate-800">{medicine.rating.toFixed(1)}</span>
            <span className="text-slate-400 font-normal text-[11px]">
              ({medicine.reviewsCount})
            </span>
          </div>
        </div>

        {/* Bold Product Title */}
        <h3 className="font-extrabold text-base text-slate-900 group-hover:text-[#084236] transition-colors line-clamp-1 font-display">
          {medicine.name}
        </h3>

        {/* Manufacturer Name (GSK, Abbott, Getz, etc.) */}
        <p className="text-xs text-emerald-700 font-medium mb-1">
          {medicine.brand}
        </p>

        {/* Formula / Salt */}
        <p className="text-[11px] text-slate-500 line-clamp-1 italic mb-3">
          {medicine.genericFormula}
        </p>

        {/* Price in PKR alongside strikethrough original price */}
        <div className="flex items-baseline gap-2 mb-3.5 mt-auto">
          <span className="text-lg font-black text-[#084236] font-display">
            PKR {medicine.pricePKR}
          </span>
          {medicine.oldPricePKR && (
            <span className="text-xs text-slate-400 line-through">
              PKR {medicine.oldPricePKR}
            </span>
          )}
        </div>
      </div>

      {/* Subtle full-width "Add to Cart" button */}
      <div className="w-full pt-1">
        {currentQuantity > 0 ? (
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full flex items-center justify-between bg-[#EAF3EE] text-[#084236] rounded-2xl px-3 py-2 border border-[#084236]/20"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                updateQuantity(medicine.id, currentQuantity - 1);
              }}
              className="w-7 h-7 rounded-xl bg-white text-[#084236] hover:bg-[#084236] hover:text-white flex items-center justify-center transition-all shadow-2xs active:scale-95"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-1.5 font-extrabold text-xs">
              <span className="text-slate-500 font-medium">Qty:</span>
              <span className="text-[#084236] text-sm">{currentQuantity}</span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                updateQuantity(medicine.id, currentQuantity + 1);
              }}
              className="w-7 h-7 rounded-xl bg-white text-[#084236] hover:bg-[#084236] hover:text-white flex items-center justify-center transition-all shadow-2xs active:scale-95"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(medicine, 1);
            }}
            className="w-full flex items-center justify-center gap-2 bg-[#F6F9F7] hover:bg-[#084236] text-[#084236] hover:text-white border border-[#084236]/15 hover:border-[#084236] font-bold text-xs py-2.5 px-4 rounded-2xl transition-all duration-200 active:scale-[0.98] group/btn"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-[#084236] group-hover/btn:text-white transition-colors" />
            <span>Add to Cart</span>
          </button>
        )}
      </div>
    </div>
  );
}
