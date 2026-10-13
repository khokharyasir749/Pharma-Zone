"use client";

import React from "react";
import { ArrowRight, Upload, Sparkles, FileText, PackagePlus, ShieldCheck } from "lucide-react";
import { usePharmacy } from "@/context/PharmacyContext";

export function PromoSplitCards() {
  const { setIsPrescriptionModalOpen } = usePharmacy();

  const handleScrollToBundles = () => {
    const el = document.getElementById("flash-sale-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {/* Card 1 (#E4EFEA background): "Save up to 35% on Family Bundles" with action button */}
        <div className="relative overflow-hidden bg-[#E4EFEA] rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#084236]/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
          {/* Subtle decorative circles */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/40 blur-xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-[#10B981]/10 blur-lg pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            {/* Text details */}
            <div className="sm:col-span-7 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#084236]/15 text-[#084236] text-xs font-bold uppercase tracking-wider shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                Family Care Pack
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#084236] font-display tracking-tight leading-snug">
                Save up to 35% on <br />
                <span className="text-[#059669]">Family Bundles</span>
              </h3>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-xs">
                Essential first aid, pediatric syrups, and daily immunity kits curated for complete home peace of mind.
              </p>

              <div className="pt-2">
                <button
                  onClick={handleScrollToBundles}
                  className="inline-flex items-center gap-2 bg-[#084236] hover:bg-[#052e25] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-full transition-all duration-200 shadow-md shadow-[#084236]/20 active:scale-95 group/btn"
                >
                  <span>Explore Bundles</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Vector Artwork on Right */}
            <div className="sm:col-span-5 flex justify-center sm:justify-end">
              <div className="relative w-36 h-36 sm:w-40 sm:h-40">
                <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
                  <defs>
                    <linearGradient id="boxGrad1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="100%" stopColor="#F1F5F9" />
                    </linearGradient>
                    <linearGradient id="kitGreen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#059669" />
                      <stop offset="100%" stopColor="#047857" />
                    </linearGradient>
                  </defs>

                  {/* Ground Shadow */}
                  <ellipse cx="80" cy="140" rx="60" ry="10" fill="#CBD5E1" opacity="0.6" />

                  {/* Medical First-Aid Kit Box */}
                  <rect x="25" y="45" width="85" height="75" rx="10" fill="url(#boxGrad1)" stroke="#CBD5E1" strokeWidth="1.5" />
                  <rect x="25" y="45" width="85" height="18" rx="6" fill="url(#kitGreen)" />

                  {/* First Aid Cross Badge */}
                  <circle cx="67" cy="85" r="18" fill="#EAF3EE" />
                  <path d="M 67 73 L 67 97 M 55 85 L 79 85" stroke="#059669" strokeWidth="4.5" strokeLinecap="round" />

                  {/* Supplement Jar beside kit */}
                  <rect x="85" y="60" width="45" height="65" rx="8" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.2" />
                  <rect x="92" y="50" width="31" height="14" rx="3" fill="#D97706" />
                  <rect x="85" y="75" width="45" height="14" fill="#FEF3C7" />
                  <text x="107" y="85" textAnchor="middle" fill="#92400E" fontSize="6.5" fontWeight="bold">
                    ZINC + VIT C
                  </text>

                  {/* 35% OFF Floating Badge */}
                  <rect x="18" y="25" width="55" height="22" rx="11" fill="#084236" />
                  <text x="45" y="39" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="900">
                    35% OFF
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 (#DCEEEA background): "Have a Doctor's Prescription?" / "Get 25% off" upload CTA */}
        <div className="relative overflow-hidden bg-[#DCEEEA] rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#084236]/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
          {/* Subtle decorative circles */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/40 blur-xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-[#084236]/10 blur-lg pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            {/* Text details */}
            <div className="sm:col-span-7 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#084236]/15 text-[#084236] text-xs font-bold uppercase tracking-wider shadow-2xs">
                <FileText className="w-3.5 h-3.5 text-[#10B981]" />
                Prescription Discount
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#084236] font-display tracking-tight leading-snug">
                Have a Doctor's <br />
                Prescription? <span className="text-[#059669]">Get 25% Off</span>
              </h3>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-xs">
                Snap and upload your doctor's slip. Our registered Pharm-D team validates and arranges doorstep delivery.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setIsPrescriptionModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-[#084236] hover:bg-[#052e25] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-full transition-all duration-200 shadow-md shadow-[#084236]/20 active:scale-95 group/btn"
                >
                  <Upload className="w-4 h-4 text-[#10B981]" />
                  <span>Upload Prescription</span>
                </button>
              </div>
            </div>

            {/* Vector Artwork on Right */}
            <div className="sm:col-span-5 flex justify-center sm:justify-end">
              <div className="relative w-36 h-36 sm:w-40 sm:h-40">
                <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
                  <defs>
                    <linearGradient id="slipGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="100%" stopColor="#F8FAFC" />
                    </linearGradient>
                  </defs>

                  {/* Ground Shadow */}
                  <ellipse cx="80" cy="140" rx="60" ry="10" fill="#CBD5E1" opacity="0.6" />

                  {/* Doctor Prescription Pad Sheet */}
                  <rect x="35" y="25" width="75" height="105" rx="8" fill="url(#slipGrad)" stroke="#CBD5E1" strokeWidth="1.5" />
                  {/* Clip on top of pad */}
                  <rect x="60" y="20" width="25" height="10" rx="3" fill="#475569" />

                  {/* Rx Symbol on top of slip */}
                  <text x="46" y="50" fill="#084236" fontSize="16" fontWeight="900" fontFamily="serif">
                    ℞
                  </text>

                  {/* Lines of doctor's handwritten notes */}
                  <line x1="46" y1="62" x2="96" y2="62" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
                  <line x1="46" y1="74" x2="88" y2="74" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
                  <line x1="46" y1="86" x2="94" y2="86" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
                  <line x1="46" y1="98" x2="78" y2="98" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />

                  {/* Official Doctor Stamp in Green */}
                  <circle cx="86" cy="108" r="14" fill="#D1FAE5" stroke="#059669" strokeWidth="1.5" strokeDasharray="3 2" />
                  <text x="86" y="111" textAnchor="middle" fill="#065F46" fontSize="5" fontWeight="bold">
                    DRAP OK
                  </text>

                  {/* Stethoscope wrapping across the pad */}
                  <path
                    d="M 20 85 C 10 115, 60 145, 95 130 C 120 120, 130 90, 115 65"
                    fill="none"
                    stroke="#084236"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* Stethoscope bell */}
                  <circle cx="115" cy="65" r="9" fill="#059669" stroke="#084236" strokeWidth="2" />
                  <circle cx="115" cy="65" r="4" fill="#EAF3EE" />

                  {/* 25% OFF Floating Badge */}
                  <rect x="90" y="25" width="55" height="22" rx="11" fill="#059669" />
                  <text x="117" y="39" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="900">
                    25% OFF
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
