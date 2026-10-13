"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldAlert,
  Pill,
  Activity,
  Sparkles,
  Wind,
  Compass,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { Navbar } from "@/components/pharmacy/Navbar";
import { Footer } from "@/components/pharmacy/Footer";
import { CATEGORIES, MEDICINES_DATA } from "@/data/medicines";
import { usePharmacy } from "@/context/PharmacyContext";

const ICON_MAP: Record<string, React.ReactNode> = {
  ShieldAlert: <ShieldAlert className="w-6 h-6 text-rose-500" />,
  Pill: <Pill className="w-6 h-6 text-sky-500" />,
  Activity: <Activity className="w-6 h-6 text-emerald-500" />,
  Sparkles: <Sparkles className="w-6 h-6 text-amber-500" />,
  Wind: <Wind className="w-6 h-6 text-purple-500" />,
  Compass: <Compass className="w-6 h-6 text-teal-500" />,
};

export default function CategoriesPage() {
  const router = useRouter();
  const { setSelectedCategory, setSearchQuery } = usePharmacy();

  const handleSelectCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSearchQuery("");
    router.push("/#flash-sale-section");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F8F6]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-[#084236] font-semibold">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#084236] font-bold">Therapeutic Categories</span>
        </div>

        {/* Page Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF3EE] text-[#084236] text-xs font-bold border border-[#084236]/15 mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% DRAP Regulated Therapeutic Formulations</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Browse Medicines by Category
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mt-2 leading-relaxed">
            Select a specialized medical classification to view authentic prescription tablets, capsules, pediatric suspensions, and cold-chain therapeutics delivered in Pakistan.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => {
            const count = MEDICINES_DATA.filter(
              (m) => m.category === category.name
            ).length;
            const sampleMeds = MEDICINES_DATA.filter(
              (m) => m.category === category.name
            ).slice(0, 3);

            return (
              <div
                key={category.id}
                onClick={() => handleSelectCategory(category.name)}
                className="group bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-[#084236]/30 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="w-13 h-13 rounded-2xl bg-[#EAF3EE] flex items-center justify-center p-3 shadow-2xs group-hover:bg-[#084236] transition-colors">
                      <div className="group-hover:brightness-200 transition-all">
                        {ICON_MAP[category.icon] || <Pill className="w-6 h-6 text-emerald-600" />}
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-800 bg-[#EAF3EE] px-3 py-1 rounded-full border border-[#084236]/10">
                      {count} {count === 1 ? "medicine" : "medicines"}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-[#084236] transition-colors font-display">
                    {category.name}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {category.description ||
                      "Certified Pakistani medications verified for active bioavailability and standard storage."}
                  </p>

                  {/* Sample medicines tags */}
                  {sampleMeds.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Common Essentials:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {sampleMeds.map((med) => (
                          <span
                            key={med.id}
                            className="text-[11px] font-medium bg-[#F6F9F7] text-[#084236] px-2.5 py-1 rounded-lg border border-slate-200/60"
                          >
                            {med.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-6 mt-4 flex items-center justify-between text-xs font-bold text-[#084236] group-hover:text-[#059669] transition-colors">
                  <span>Browse {category.name}</span>
                  <div className="w-8 h-8 rounded-full bg-[#EAF3EE] group-hover:bg-[#084236] group-hover:text-white flex items-center justify-center transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
