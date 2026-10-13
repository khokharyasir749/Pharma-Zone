"use client";

import React, { useState } from "react";
import {
  MapPin,
  Search,
  ShoppingCart,
  Upload,
  PhoneCall,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  User,
  Copy,
  Check,
} from "lucide-react";
import { usePharmacy } from "@/context/PharmacyContext";
import { PAKISTAN_CITIES, CATEGORIES } from "@/data/medicines";

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory?: string | null;
  setSelectedCategory?: (category: string | null) => void;
}

export function Navbar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}: NavbarProps) {
  const {
    selectedCity,
    setSelectedCity,
    cartCount,
    cartTotal,
    setIsCartOpen,
    setIsPrescriptionModalOpen,
  } = usePharmacy();

  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText("PHARMA25");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/70 shadow-sm transition-all">
      {/* 1. Top Notification Strip: Mint Tint (#EAF3EE) with announcement and promo code pill */}
      <div className="bg-[#EAF3EE] text-[#084236] text-xs py-2 px-4 border-b border-[#084236]/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Left: Announcement & Promo Code Pill */}
          <div className="flex items-center gap-2.5 flex-wrap justify-center md:justify-start">
            <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Special Ramadan & Spring Wellness Sale:
            </span>
            <span className="font-semibold text-[#084236]">Get Up to 25% OFF Genuine Medicines</span>

            {/* Promo Code Pill */}
            <button
              onClick={handleCopyCode}
              title="Click to copy promo code"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-[#084236]/20 text-[#084236] font-bold text-[11px] shadow-2xs hover:bg-[#084236] hover:text-white transition-all cursor-pointer group"
            >
              <span>Code:</span>
              <span className="tracking-wider">PHARMA25</span>
              {copiedCode ? (
                <Check className="w-3 h-3 text-emerald-600 group-hover:text-white" />
              ) : (
                <Copy className="w-3 h-3 opacity-60 group-hover:opacity-100" />
              )}
            </button>
          </div>

          {/* Right: Express Delivery & Contact */}
          <div className="hidden sm:flex items-center gap-4 text-xs font-medium text-slate-700">
            <span className="flex items-center gap-1 text-[#084236] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Free 2-Hour Express Delivery on orders over PKR 1,500
            </span>
            <span className="text-slate-300">|</span>
            <a
              href="tel:+923280790704"
              className="flex items-center gap-1 text-[#084236] hover:text-emerald-700 font-bold transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>0328-0790704</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-3 lg:gap-6">
          {/* Brand Logo: "Pharma Zone" in bold dark forest green with a sleek medical badge */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2.5 cursor-pointer group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#084236] flex items-center justify-center text-white shadow-md shadow-[#084236]/20 group-hover:bg-[#052e25] transition-all duration-300">
                {/* Sleek Medical Badge */}
                <div className="relative flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-6 h-6 text-[#10B981]"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 6v12M6 12h12" />
                  </svg>
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#084236]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#084236] font-display leading-none">
                  Pharma <span className="text-[#10B981]">Zone</span>
                </span>
                <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase mt-0.5">
                  Pakistani E-Pharmacy
                </span>
              </div>
            </div>
          </div>

          {/* Unified Pill Search (Center) */}
          <div className="flex-1 max-w-2xl mx-1 sm:mx-2">
            <div className="relative flex items-center w-full bg-white rounded-full border border-slate-200/90 shadow-sm hover:border-[#084236]/30 focus-within:border-[#084236] focus-within:ring-2 focus-within:ring-[#084236]/15 transition-all p-1.5 pl-3 sm:pl-4">
              {/* Category dropdown selector inside with divider */}
              <div className="relative shrink-0 pr-2 sm:pr-3 mr-2 sm:mr-3 border-r border-slate-200">
                <select
                  value={selectedCategory || "all"}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (setSelectedCategory) {
                      setSelectedCategory(val === "all" ? null : val);
                    }
                  }}
                  className="bg-transparent text-xs font-semibold text-slate-700 hover:text-[#084236] focus:outline-none cursor-pointer pr-4 appearance-none text-ellipsis max-w-[95px] sm:max-w-[130px]"
                >
                  <option value="all">All Categories</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" />
              </div>

              {/* Clean text input for medicines / active salts */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search medicines or active salts (e.g. Paracetamol, Risek)..."
                className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none font-medium truncate"
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-slate-400 hover:text-slate-600 px-2 py-0.5 mr-1"
                >
                  Clear
                </button>
              )}

              {/* Contained green submit action button inside the pill */}
              <button
                type="button"
                aria-label="Search"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#084236] hover:bg-[#052e25] active:scale-95 text-white flex items-center justify-center shrink-0 transition-all shadow-sm"
              >
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Right Utility Group */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* "Deliver to [City]" widget with location pin and dropdown */}
            <div className="relative">
              <button
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#EAF3EE] hover:bg-[#dceeea] text-[#084236] text-xs font-semibold border border-[#084236]/10 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                <span className="hidden md:inline text-slate-600 font-normal">Deliver to</span>
                <span className="font-bold text-[#084236] max-w-[80px] sm:max-w-none truncate">
                  {selectedCity}
                </span>
                <ChevronDown className="w-3 h-3 text-[#084236]/70" />
              </button>

              {cityDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3.5 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Select Delivery City
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {PAKISTAN_CITIES.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setSelectedCity(city);
                          setCityDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-[#EAF3EE] transition-colors flex items-center justify-between ${
                          selectedCity === city
                            ? "text-[#084236] font-bold bg-[#EAF3EE]/60"
                            : "text-slate-700"
                        }`}
                      >
                        <span>{city}</span>
                        {selectedCity === city && (
                          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Upload Prescription Button */}
            <button
              onClick={() => setIsPrescriptionModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-[#EAF3EE] border border-[#084236]/20 text-[#084236] text-xs font-bold transition-all shadow-2xs"
            >
              <Upload className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Upload Rx</span>
            </button>

            {/* Cart Icon with dynamic counter badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-[#084236] hover:bg-[#052e25] text-white transition-all shadow-sm group active:scale-95"
              aria-label="View Shopping Cart"
            >
              <ShoppingCart className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#EAF3EE]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#10B981] text-white font-extrabold text-[10px] min-w-5 h-5 px-1 rounded-full flex items-center justify-center ring-2 ring-white animate-in zoom-in-75">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile Avatar */}
            <div
              className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-600 to-[#084236] p-0.5 flex items-center justify-center cursor-pointer shadow-sm hover:ring-2 hover:ring-[#10B981]/50 transition-all"
              title="Verified Patient Account"
            >
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#084236]">
                <User className="w-4 h-4 text-[#084236]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
