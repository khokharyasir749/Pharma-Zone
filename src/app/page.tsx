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
  const { selectedCity, setIsPrescriptionModalOpen } = usePharmacy();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [rxFilter, setRxFilter] = useState<"all" | "otc" | "rx">("all");
  const [sortBy, setSortBy] = useState<"popular" | "price-asc" | "price-desc" | "rating">("popular");

  // Filter and sort medicines
  const filteredMedicines = useMemo(() => {
    return MEDICINES_DATA.filter((med) => {
      // Search matching (name, formula, or brand)
      const matchesSearch =
        med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.genericFormula.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.brand.toLowerCase().includes(searchQuery.toLowerCase());

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

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F8F6]">
      {/* 1. Header & Pill Bar Architecture */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <main className="flex-1">
        {/* 2. Dribbble-Identical Hero Card */}
        <HeroCard />

        {/* 3. Flash Sale Section (Dribbble Layout) */}
        <section id="flash-sale-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          {/* Section Heading with Live Indicator Dot and "View All Products" text button */}
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
                <span>Flash Sale</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#EAF3EE] text-[#084236] border border-[#084236]/15">
                  Verified DRAP MRP
                </span>
              </h2>
            </div>

            {/* "View All Products" text button with an arrow */}
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery("");
                setRxFilter("all");
              }}
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
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mr-1">
                <Filter className="w-3.5 h-3.5 text-slate-400" /> Filter:
              </span>

              <button
                onClick={() => setRxFilter("all")}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  rxFilter === "all"
                    ? "bg-[#084236] text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All Items ({MEDICINES_DATA.length})
              </button>

              <button
                onClick={() => setRxFilter("otc")}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  rxFilter === "otc"
                    ? "bg-[#084236] text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                OTC (No Rx Needed)
              </button>

              <button
                onClick={() => setRxFilter("rx")}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  rxFilter === "rx"
                    ? "bg-[#084236] text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Prescription Only (Rx)
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

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display">
              {selectedCategory || "Featured Pakistani Medicines"}
              <span className="text-xs font-normal text-slate-500 ml-2">
                ({filteredMedicines.length} medicines available)
              </span>
            </h3>

            {searchQuery && (
              <p className="text-xs text-[#059669] font-semibold">
                Filtering by "{searchQuery}"
              </p>
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
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#EAF3EE] text-[#084236] flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-1">
                No matching medicines found
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Try searching for the generic formula or brand name, or submit your prescription slip directly.
              </p>
              <div className="flex justify-center gap-3">
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(null);
                    setRxFilter("all");
                  }}
                  variant="outline"
                  size="sm"
                >
                  Reset Filters
                </Button>
                <Button
                  onClick={() => setIsPrescriptionModalOpen(true)}
                  variant="primary"
                  size="sm"
                >
                  Upload Prescription
                </Button>
              </div>
            </div>
          )}
        </section>

        {/* 4. Promotional Split Cards (Directly from the Reference) */}
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
