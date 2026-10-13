"use client";

import React from "react";
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
} from "lucide-react";
import { usePharmacy } from "@/context/PharmacyContext";

export function HeroCard() {
  const { selectedCity, setIsPrescriptionModalOpen } = usePharmacy();

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

          {/* Right Column: Healthcare Professional Portrait Visual + Floating Glassmorphism Metric Card */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] h-[360px] sm:h-[400px]">
              {/* Mint Backdrop Circle with Radial Depth */}
              <div className="absolute inset-x-4 bottom-0 top-6 rounded-[2.5rem] bg-gradient-to-b from-[#0F5A4B] to-[#06332A] border border-emerald-400/20 overflow-hidden flex items-end justify-center">
                {/* Subtle medical grid rings */}
                <div className="absolute top-8 w-64 h-64 rounded-full border border-emerald-400/10 pointer-events-none" />
                <div className="absolute top-16 w-48 h-48 rounded-full border border-emerald-400/15 pointer-events-none" />

                {/* Healthcare Professional Portrait (Clean Vector Artwork) */}
                <svg
                  viewBox="0 0 320 340"
                  className="w-full h-full object-contain drop-shadow-2xl translate-y-1"
                >
                  <defs>
                    <linearGradient id="doctorSkin" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FBD5B5" />
                      <stop offset="100%" stopColor="#F5B288" />
                    </linearGradient>
                    <linearGradient id="doctorCoat" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="70%" stopColor="#F8FAFC" />
                      <stop offset="100%" stopColor="#E2E8F0" />
                    </linearGradient>
                    <linearGradient id="scrubsTeal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0D9488" />
                      <stop offset="100%" stopColor="#0F766E" />
                    </linearGradient>
                    <linearGradient id="hairGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#1E293B" />
                      <stop offset="100%" stopColor="#0F172A" />
                    </linearGradient>
                  </defs>

                  {/* Doctor Hair / Hijab / Head */}
                  <ellipse cx="160" cy="112" rx="42" ry="50" fill="url(#doctorSkin)" />
                  <path
                    d="M 115 110 C 115 55, 205 55, 205 110 C 205 85, 115 85, 115 110 Z"
                    fill="url(#hairGrad)"
                  />
                  {/* Neatly tied hair */}
                  <path
                    d="M 120 95 Q 160 80 200 95 Q 160 65 120 95 Z"
                    fill="#334155"
                  />

                  {/* Face details */}
                  {/* Eyes */}
                  <ellipse cx="145" cy="112" rx="3.5" ry="2" fill="#0F172A" />
                  <ellipse cx="175" cy="112" rx="3.5" ry="2" fill="#0F172A" />
                  {/* Eyebrows */}
                  <path d="M 138 105 Q 146 102 153 105" stroke="#334155" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                  <path d="M 167 105 Q 174 102 182 105" stroke="#334155" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                  {/* Friendly Smile */}
                  <path d="M 150 128 Q 160 136 170 128" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" fill="none" />
                  {/* Soft Rosy Cheeks */}
                  <circle cx="138" cy="122" r="5" fill="#FDA4AF" opacity="0.4" />
                  <circle cx="182" cy="122" r="5" fill="#FDA4AF" opacity="0.4" />

                  {/* Neck & Scrubs Inner Collar */}
                  <path d="M 150 155 L 150 180 L 170 180 L 170 155 Z" fill="url(#doctorSkin)" />
                  <path d="M 135 175 L 160 205 L 185 175 Z" fill="url(#scrubsTeal)" />

                  {/* White Medical Lab Coat Shoulders & Chest */}
                  <path
                    d="M 90 340 L 96 210 Q 100 180 132 178 L 160 215 L 188 178 Q 220 180 224 210 L 230 340 Z"
                    fill="url(#doctorCoat)"
                    stroke="#E2E8F0"
                    strokeWidth="1.5"
                  />

                  {/* Lab Coat Lapels */}
                  <path d="M 132 178 L 155 240 L 125 245 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
                  <path d="M 188 178 L 165 240 L 195 245 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />

                  {/* Name badge */}
                  <rect x="180" y="250" width="28" height="12" rx="2" fill="#084236" />
                  <line x1="184" y1="254" x2="204" y2="254" stroke="#A7F3D0" strokeWidth="1.2" />
                  <line x1="184" y1="258" x2="198" y2="258" stroke="#FFFFFF" strokeWidth="1" />

                  {/* Stethoscope around neck */}
                  <path
                    d="M 136 182 Q 130 220 148 260 L 152 260 Q 138 220 142 182"
                    fill="#334155"
                  />
                  <path
                    d="M 184 182 Q 190 220 172 260 L 168 260 Q 182 220 178 182"
                    fill="#334155"
                  />
                  {/* Stethoscope chest piece bell */}
                  <circle cx="150" cy="272" r="8" fill="#94A3B8" stroke="#64748B" strokeWidth="1.5" />
                  <circle cx="150" cy="272" r="4" fill="#CBD5E1" />
                  <path d="M 150 260 L 150 264" stroke="#475569" strokeWidth="2.5" />
                </svg>
              </div>

              {/* Floating Top Mini Badge */}
              <div className="absolute top-2 left-0 sm:-left-3 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-white/50 text-[#084236] text-[11px] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Licensed Pharm-D On-Call</span>
              </div>

              {/* Floating glassmorphism "98% Customer satisfaction" metric card pinned at the bottom-right */}
              <div className="absolute -bottom-3 sm:bottom-2 -right-1 sm:-right-2 bg-white/95 backdrop-blur-md text-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-2xl border border-white/60 flex items-center gap-3 z-20">
                <div className="w-11 h-11 rounded-xl bg-[#EAF3EE] text-[#084236] flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-base sm:text-lg font-black text-slate-900 font-display">
                      98%
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                      ★ 4.9
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-700 leading-tight">
                    Customer Satisfaction
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">
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
