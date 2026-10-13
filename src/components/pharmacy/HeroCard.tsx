"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Upload,
  ArrowRight,
  Star,
  CheckCircle,
  Clock,
  MapPin,
  Heart,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { usePharmacy } from "@/context/PharmacyContext";

export function HeroCard() {
  const { selectedCity, setIsPrescriptionModalOpen } = usePharmacy();
  const [imageError, setImageError] = useState(false);

  const scrollToProducts = () => {
    const el = document.getElementById("flash-sale-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
      {/* Deep forest green curved container card (#084236) with rounded-3xl corners */}
      <div className="relative overflow-hidden bg-[#084236] text-white rounded-3xl lg:rounded-[2.5rem] shadow-2xl border border-emerald-900/40">
        {/* Soft background glow accents */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#10B981]/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#052e25] blur-2xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-64 h-64 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center p-6 sm:p-10 lg:p-14">
          {/* Left Column: Trust badge, display headline, body copy, and dual CTA buttons */}
          <div className="lg:col-span-7 space-y-6">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-[#A7F3D0] backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>100% DRAP Approved Genuine Medicines</span>
            </div>

            {/* Bold display headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12] font-display text-white">
              Premium Health Essentials <br />
              <span className="text-[#10B981]">at your Doorstep</span>
            </h1>

            {/* Concise body copy */}
            <p className="text-sm sm:text-base text-[#EAF3EE]/85 max-w-xl leading-relaxed">
              Skip crowded pharmacies and avoid counterfeit drugs. Pharma Zone delivers certified prescription medications, daily vitamins, and emergency care with cold-chain guarantee across{" "}
              <strong className="text-white underline decoration-[#10B981] underline-offset-4">
                {selectedCity}
              </strong>{" "}
              and 50+ Pakistani cities.
            </p>

            {/* Dual CTA buttons ("Shop Medicines" primary white pill + "Upload Prescription" ghost button) */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={scrollToProducts}
                className="flex items-center gap-2.5 bg-white hover:bg-[#EAF3EE] text-[#084236] font-extrabold text-sm px-7 py-3.5 rounded-full shadow-xl shadow-black/15 transition-all duration-200 active:scale-95 group"
              >
                <span>Shop Medicines</span>
                <ArrowRight className="w-4 h-4 text-[#084236] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setIsPrescriptionModalOpen(true)}
                className="flex items-center gap-2.5 bg-transparent hover:bg-white/10 text-white font-semibold text-sm px-6 py-3.5 rounded-full border border-white/30 backdrop-blur-xs transition-all duration-200 active:scale-95"
              >
                <Upload className="w-4 h-4 text-[#10B981]" />
                <span>Upload Prescription</span>
              </button>
            </div>

            {/* Micro Trust Stats */}
            <div className="pt-6 grid grid-cols-3 gap-3 sm:gap-6 border-t border-white/15">
              <div>
                <div className="text-xl sm:text-2xl font-black text-white font-display">
                  2 Hours
                </div>
                <div className="text-[#A7F3D0]/80 text-[11px] font-medium mt-0.5">
                  Express City Dispatch
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-[#10B981] font-display">
                  100%
                </div>
                <div className="text-[#A7F3D0]/80 text-[11px] font-medium mt-0.5">
                  DRAP Batch Verified
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-white font-display">
                  50+
                </div>
                <div className="text-[#A7F3D0]/80 text-[11px] font-medium mt-0.5">
                  Pakistani Cities
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Healthcare Professional Portrait + Dribbble Arch Framing + Floating Glass Badges */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end mt-4 lg:mt-0">
            <div className="relative w-full max-w-[360px] sm:max-w-[410px] h-[380px] sm:h-[430px] flex items-end justify-center">
              {/* Ambient Mint Glow behind the Arch */}
              <div className="absolute -inset-2 sm:-inset-4 bg-[#10B981]/20 rounded-[3rem] blur-2xl pointer-events-none" />

              {/* Dribbble Style Curved Arch Container with Soft Mint/Sage Contrast (#E2F0E8 to #D8EAE1) */}
              <div className="relative w-full h-[360px] sm:h-[405px] rounded-t-[10rem] sm:rounded-t-[12rem] rounded-b-[2rem] sm:rounded-b-[2.5rem] bg-gradient-to-b from-[#E8F4EE] via-[#D8EAE1] to-[#CBE2D5] shadow-2xl border-2 border-white/40 overflow-hidden flex items-end justify-center">
                {/* Concentric Medical Halo Rings behind the head & shoulders */}
                <div className="absolute top-10 sm:top-12 w-64 h-64 rounded-full border border-emerald-700/10 pointer-events-none" />
                <div className="absolute top-18 sm:top-20 w-48 h-48 rounded-full border border-emerald-700/15 pointer-events-none" />
                <div className="absolute top-24 w-32 h-32 rounded-full bg-white/40 blur-xl pointer-events-none" />

                {/* High-Resolution Verified Medical Portrait with Elegant Fallback */}
                {!imageError ? (
                  <img
                    src="https://images.unsplash.com/photo-1594824813589-322f280a9d8c?auto=format&fit=crop&w=800&q=85"
                    alt="Licensed Clinical Pharmacist and Medical Doctor at Pharma Zone"
                    className="relative z-10 w-full h-full object-cover object-top transition-transform duration-700 hover:scale-[1.03] select-none"
                    onError={() => setImageError(true)}
                    loading="eager"
                  />
                ) : (
                  <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#084236]">
                    <div className="w-20 h-20 rounded-full bg-white/80 shadow-md flex items-center justify-center mb-3">
                      <ShieldCheck className="w-10 h-10 text-[#084236]" />
                    </div>
                    <div className="font-extrabold text-base">Pharma Zone Clinical Team</div>
                    <div className="text-xs text-emerald-800/80 mt-1 max-w-[200px]">
                      DRAP Verified Pharm-D & Healthcare Consultants
                    </div>
                  </div>
                )}

                {/* Subtle soft bottom shadow overlay */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#084236]/25 to-transparent z-10 pointer-events-none" />
              </div>

              {/* Floating Top-Left Badge: Licensed Pharm-D On-Call in Frosted Glass Pill */}
              <div className="absolute top-3 -left-2 sm:-left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-xl border border-white/80 text-[#084236] text-[11px] sm:text-xs font-bold flex items-center gap-2 z-20 transition-transform duration-200 hover:-translate-y-0.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
                </span>
                <span>Licensed Pharm-D On-Call</span>
              </div>

              {/* Floating Bottom-Right Badge: 98% ★ 4.9 Customer Satisfaction */}
              <div className="absolute -bottom-4 sm:-bottom-2 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md text-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-2xl border border-white/80 flex items-center gap-3 z-20 transition-transform duration-200 hover:-translate-y-0.5 max-w-[270px]">
                <div className="w-11 h-11 rounded-xl bg-[#EAF3EE] text-[#084236] flex items-center justify-center shrink-0 shadow-xs">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-base sm:text-lg font-black text-slate-900 font-display">
                      98%
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                      ★ 4.9
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-800 leading-tight">
                    Customer Satisfaction
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    Over 45,000+ Verified Orders
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
