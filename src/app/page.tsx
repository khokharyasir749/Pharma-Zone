"use client";

import React, { useState, useMemo } from "react";
import {
  ShieldCheck,
  Search,
  Filter,
  CheckCircle,
  Clock,
  ArrowRight,
  Flame,
  Truck,
  Sparkles,
  MessageCircle,
  Upload,
} from "lucide-react";
import { Navbar } from "@/components/pharmacy/Navbar";
import { HeroCard } from "@/components/pharmacy/HeroCard";
import { MedicineCard } from "@/components/pharmacy/MedicineCard";
import { CategoryBar } from "@/components/pharmacy/CategoryBar";
import { PromoSplitCards } from "@/components/pharmacy/PromoSplitCards";
import { Footer } from "@/components/pharmacy/Footer";
import { MEDICINES_DATA } from "@/data/medicines";
import { usePharmacy } from "@/context/PharmacyContext";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  const {
    selectedCity,
    setIsPrescriptionModalOpen,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = usePharmacy();

  const [rxFilter, setRxFilter] = useState<"all" | "otc" | "rx">("all");
  const [sortBy, setSortBy] = useState<"popular" | "price-asc" | "price-desc" | "rating">("popular");

  const otcCount = useMemo(
    () => MEDICINES_DATA.filter((m) => !m.requiresPrescription).length,
    []
  );
  const rxCount = useMemo(
    () => MEDICINES_DATA.filter((m) => m.requiresPrescription).length,
    []
  );

  // Real-time filter and sort medicines across name, formula, brand, category and Rx status
  const filteredMedicines = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return MEDICINES_DATA.filter((med) => {
      // Search matching (brand name, generic active salt/formula, or manufacturer brand)
      const matchesSearch =
        !q ||
        med.name.toLowerCase().includes(q) ||
        med.genericFormula.toLowerCase().includes(q) ||
        med.brand.toLowerCase().includes(q) ||
        med.category.toLowerCase().includes(q);

      // Category matching
      const matchesCategory =
        !selectedCategory || med.category === selectedCategory;

      // Rx matching
      const matchesRx =
        rxFilter === "all"
          ? true
          : rxFilter === "rx"
          ? med.requiresPrescription
          : !med.requiresPrescription;

      return matchesSearch && matchesCategory && matchesRx;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.pricePKR - b.pricePKR;
      if (sortBy === "price-desc") return b.pricePKR - a.pricePKR;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount; // popular
    });
  }, [searchQuery, selectedCategory, rxFilter, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setRxFilter("all");
    setSortBy("popular");
  };

  const whatsAppInquiryUrl = `https://wa.me/923280790704?text=${encodeURIComponent(
    `Hello PharmaZone, I searched for "${searchQuery || "medicines"}" in ${selectedCity} but couldn't find it. Can you help me arrange it?`
  )}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F8F6]">
      {/* 1. Header & Pill Bar Architecture */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Dribbble-Identical Hero Card */}
        <HeroCard />

        {/* 3. Flash Sale / Catalog Section */}
        <section id="flash-sale-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          {/* Section Heading with Live Indicator Dot and "View All Products" button */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-2 border-b border-slate-200/60">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                {/* Live Indicator Dot */}
                <div className="relative flex items-center justify-center w-3 h-3">
                  <span className="absolute w-3 h-3 rounded-full bg-emerald-500 animate-ping opacity-75" />
                  <span className="relative w-2 h-2 rounded-full bg-emerald-600" />
                </div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#059669]">
                  Live Daily Deals
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display flex items-center gap-2.5">
                <span>Flash Sale & Catalog</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#EAF3EE] text-[#084236] border border-[#084236]/15">
                  Verified DRAP MRP
                </span>
              </h2>
            </div>

            {/* "View All Products" text button with an arrow */}
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#084236] hover:text-[#059669] transition-colors group self-start sm:self-auto"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4 text-[#084236] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Category Bar Navigation */}
          <div className="mb-6">
            <CategoryBar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          {/* Filtering & Sorting Controls Bar */}
          <div className="bg-white rounded-2xl p-3.5 sm:p-4 mb-8 border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
            {/* Quick Filter Buttons: All, OTC, Rx Required */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mr-1">
                <Filter className="w-3.5 h-3.5 text-slate-400" /> Filter:
              </span>

              <button
                onClick={() => setRxFilter("all")}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  rxFilter === "all"
                    ? "bg-[#084236] text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All Medicines ({MEDICINES_DATA.length})
              </button>

              <button
                onClick={() => setRxFilter("otc")}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  rxFilter === "otc"
                    ? "bg-[#084236] text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                OTC (Over The Counter) ({otcCount})
              </button>

              <button
                onClick={() => setRxFilter("rx")}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  rxFilter === "rx"
                    ? "bg-[#084236] text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Rx Required ({rxCount})
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <span className="text-xs text-slate-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-semibold bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#084236]/20"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Top Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Search / Category Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display">
              {selectedCategory || "Featured Pakistani Medicines"}
              <span className="text-xs font-normal text-slate-500 ml-2">
                ({filteredMedicines.length} medicines available)
              </span>
            </h3>

            {(searchQuery || selectedCategory || rxFilter !== "all") && (
              <div className="flex items-center gap-2 text-xs">
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 bg-[#EAF3EE] text-[#084236] px-2.5 py-1 rounded-full font-semibold">
                    Keyword: "{searchQuery}"
                    <button
                      onClick={() => setSearchQuery("")}
                      className="ml-1 text-slate-400 hover:text-slate-700"
                    >
                      ×
                    </button>
                  </span>
                )}
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-[#059669] hover:underline font-bold"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* 4-column responsive grid of clean product cards */}
          {filteredMedicines.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMedicines.map((medicine) => (
                <MedicineCard key={medicine.id} medicine={medicine} />
              ))}
            </div>
          ) : (
            /* Friendly Pakistani Fallback Message */
            <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200/80 max-w-xl mx-auto shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#EAF3EE] text-[#084236] flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8" />
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-[#059669] bg-[#EAF3EE] px-3 py-1 rounded-full border border-[#084236]/15">
                Medication Inquiry
              </span>

              <h3 className="text-2xl font-black text-slate-900 mt-3 font-display">
                Dawaai nahi mili?
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
                If your required brand or active generic formula isn't listed, our clinical Pharm-D team can procure and dispatch it immediately from licensed DRAP distributors across Pakistan.
              </p>

              {/* Action Buttons: Upload Slip & WhatsApp us at 0328-0790704 */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6">
                <Button
                  onClick={() => setIsPrescriptionModalOpen(true)}
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  <span>Upload Prescription Slip</span>
                </Button>

                <a
                  href={whatsAppInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-2xl shadow-md transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp Us (0328-0790704)</span>
                </a>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-slate-500 hover:text-[#084236] hover:underline font-semibold"
                >
                  Reset all filters & view full catalog
                </button>
              </div>
            </div>
          )}
        </section>

        {/* 4. Promotional Split Cards */}
        <PromoSplitCards />

        {/* Cold-Chain & Quality Assurance Assurance */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-6">
          <div className="bg-[#084236] rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden border border-emerald-900/40">
            {/* Ambient glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#10B981]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#052e25] rounded-full blur-2xl pointer-events-none" />

            <div className="max-w-3xl relative z-10 space-y-4">
              <span className="bg-white/10 text-[#A7F3D0] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20 inline-block">
                Temperature & Integrity Guarantee
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight text-white">
                WHO Cold-Chain Certified Delivery in 50+ Pakistani Cities
              </h2>
              <p className="text-xs sm:text-sm text-[#EAF3EE]/85 leading-relaxed">
                Biologics, insulin, vaccines, and pediatric suspensions require strict 2°C – 8°C temperature control under Pakistan's climate. Pharma Zone uses calibrated insulated cool-boxes to ensure active chemical potency.
              </p>
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#10B981]" />
                  <span>Sealed Tamper-Evident Packaging</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#10B981]" />
                  <span>DRAP Batch Barcode Verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#10B981]" />
                  <span>Licensed Clinical Pharm-D Review</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
