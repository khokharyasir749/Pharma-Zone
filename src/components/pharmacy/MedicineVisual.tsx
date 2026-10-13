"use client";

import React from "react";
import { DosageForm } from "@/types/pharmacy";

interface MedicineVisualProps {
  name: string;
  dosageForm: DosageForm;
  category?: string;
  brand?: string;
  strength?: string;
  className?: string;
}

export function MedicineVisual({
  name,
  dosageForm,
  category = "",
  brand = "",
  strength = "",
  className = "w-full h-full",
}: MedicineVisualProps) {
  // Determine color theme based on category or name
  const isAntibiotic =
    category.includes("Antibiotic") ||
    name.toLowerCase().includes("augmentin") ||
    name.toLowerCase().includes("leflox") ||
    name.toLowerCase().includes("klaricid");
  const isPain =
    category.includes("Pain") ||
    name.toLowerCase().includes("panadol") ||
    name.toLowerCase().includes("disprin") ||
    name.toLowerCase().includes("brufen") ||
    name.toLowerCase().includes("ponstan");
  const isStomach =
    category.includes("Gastro") ||
    category.includes("Stomach") ||
    name.toLowerCase().includes("risek") ||
    name.toLowerCase().includes("entox") ||
    name.toLowerCase().includes("motilium") ||
    name.toLowerCase().includes("nexum") ||
    name.toLowerCase().includes("gaviscon") ||
    name.toLowerCase().includes("duspatalin");
  const isVitamin =
    category.includes("Vitamin") ||
    name.toLowerCase().includes("surbex") ||
    name.toLowerCase().includes("cac") ||
    name.toLowerCase().includes("sunny") ||
    name.toLowerCase().includes("neurobion") ||
    name.toLowerCase().includes("sangobion") ||
    name.toLowerCase().includes("evion");
  const isAllergy =
    category.includes("Cold") ||
    category.includes("Allergy") ||
    name.toLowerCase().includes("softin") ||
    name.toLowerCase().includes("arinac") ||
    name.toLowerCase().includes("rigix") ||
    name.toLowerCase().includes("hydryllin") ||
    name.toLowerCase().includes("cf");
  const isNausea =
    category.includes("Nausea") ||
    category.includes("Motion") ||
    name.toLowerCase().includes("gravinate") ||
    name.toLowerCase().includes("vomilux") ||
    name.toLowerCase().includes("stemetil") ||
    name.toLowerCase().includes("avomine");

  const primaryColor = isPain
    ? "#EF4444" // Crimson / Red
    : isAntibiotic
    ? "#0284C7" // Medical Cyan / Royal Blue
    : isStomach
    ? "#059669" // Emerald Green
    : isVitamin
    ? "#F59E0B" // Amber / Gold
    : isAllergy
    ? "#8B5CF6" // Purple / Violet
    : isNausea
    ? "#0D9488" // Teal / Turquoise
    : "#084236"; // Brand Dark Green

  const secondaryColor = isPain
    ? "#FEE2E2"
    : isAntibiotic
    ? "#E0F2FE"
    : isStomach
    ? "#D1FAE5"
    : isVitamin
    ? "#FEF3C7"
    : isAllergy
    ? "#EDE9FE"
    : isNausea
    ? "#CCFBF1"
    : "#EAF3EE";

  // 1. Suspension / Syrup / Drops bottles (e.g. Entox-P, Hydryllin, Panadol Drops)
  if (dosageForm === "Syrup" || dosageForm === "Suspension" || dosageForm === "Drops") {
    return (
      <div className={`relative flex items-center justify-center p-2 select-none ${className}`}>
        {/* Ambient shadow below bottle */}
        <div className="absolute bottom-1 w-3/4 h-5 bg-slate-400/30 rounded-full blur-[8px]" />

        <svg viewBox="0 0 160 200" className="w-full h-full max-h-64 object-contain drop-shadow-md">
          <defs>
            <linearGradient id="amberGlass" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#78350F" />
              <stop offset="35%" stopColor="#B45309" />
              <stop offset="70%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>
            <linearGradient id="whiteCap" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>

          {/* Measuring Cup / White Cap on Top */}
          <rect x="58" y="10" width="44" height="24" rx="4" fill="url(#whiteCap)" stroke="#94A3B8" strokeWidth="1" />
          {[64, 70, 76, 82, 88, 94].map((x) => (
            <line key={x} x1={x} y1="12" x2={x} y2="32" stroke="#CBD5E1" strokeWidth="1.2" />
          ))}

          {/* Bottle Neck */}
          <rect x="66" y="34" width="28" height="14" fill="#92400E" rx="1" />

          {/* Bottle Body */}
          <path
            d="M 44 58 Q 44 48 68 48 L 92 48 Q 116 48 116 58 L 120 168 Q 120 178 106 178 L 54 178 Q 40 178 40 168 Z"
            fill="url(#amberGlass)"
          />

          {/* Liquid highlight */}
          <path
            d="M 44 70 L 116 70 L 118 168 Q 118 175 106 175 L 54 175 Q 42 175 42 168 Z"
            fill="url(#liquidGrad)"
            opacity="0.35"
          />

          {/* Specular bottle sheen */}
          <path d="M 48 60 L 48 168" stroke="#FDE68A" strokeWidth="3.5" strokeLinecap="round" opacity="0.65" />

          {/* Pharmaceutical Label */}
          <rect x="46" y="82" width="68" height="78" rx="5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
          <rect x="46" y="82" width="68" height="14" rx="4" fill={primaryColor} />
          <text x="80" y="92" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="bold">
            60ml ORAL
          </text>

          <text x="80" y="108" textAnchor="middle" fill="#0F172A" fontSize="8" fontWeight="bold">
            {name.split(" ")[0]}
          </text>
          <text x="80" y="117" textAnchor="middle" fill="#64748B" fontSize="6">
            Suspension
          </text>

          <rect x="52" y="123" width="20" height="8" rx="2" fill={secondaryColor} />
          <text x="62" y="129" textAnchor="middle" fill={primaryColor} fontSize="5" fontWeight="bold">
            Rx
          </text>

          <line x1="52" y1="140" x2="108" y2="140" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 1" />
          <text x="80" y="151" textAnchor="middle" fill="#94A3B8" fontSize="5">
            DRAP 012847
          </text>
        </svg>
      </div>
    );
  }

  // 2. Effervescent Tablet Tubes (e.g. CaC-1000)
  if (dosageForm === "Effervescent Tablet") {
    return (
      <div className={`relative flex items-center justify-center p-2 select-none ${className}`}>
        {/* Realistic ground shadow */}
        <div className="absolute bottom-1 w-3/4 h-5 bg-slate-400/30 rounded-full blur-[8px]" />

        {/* Scaled & Enlarged SVG tube to fill frame properly */}
        <svg viewBox="0 0 130 200" className="w-full h-full max-h-64 object-contain drop-shadow-md">
          <defs>
            <linearGradient id="tubeGradLarge" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#CBD5E1" />
              <stop offset="25%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#F8FAFC" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
            <linearGradient id="orangeCapLarge" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#C2410C" />
              <stop offset="40%" stopColor="#FB923C" />
              <stop offset="100%" stopColor="#9A3412" />
            </linearGradient>
          </defs>

          {/* Cap Flange */}
          <rect x="36" y="12" width="58" height="22" rx="4" fill="url(#orangeCapLarge)" />
          {[42, 49, 56, 63, 70, 77, 84].map((x) => (
            <line key={x} x1={x} y1="14" x2={x} y2="32" stroke="#FDBA74" strokeWidth="1.5" />
          ))}

          {/* Tube Cylinder Body (Substantially wider so it fills the frame) */}
          <rect
            x="41"
            y="34"
            width="48"
            height="146"
            rx="5"
            fill="url(#tubeGradLarge)"
            stroke="#94A3B8"
            strokeWidth="0.8"
          />

          {/* Left Sheen Highlight */}
          <line x1="48" y1="36" x2="48" y2="176" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />

          {/* Vivid Label Wrapper */}
          <rect x="41" y="62" width="48" height="92" fill="#FB923C" />
          <rect x="41" y="74" width="48" height="68" fill="#EA580C" />

          {/* Vertical Name Typography */}
          <text
            x="-108"
            y="70"
            transform="rotate(-90)"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="12"
            fontWeight="900"
            letterSpacing="1.5"
          >
            {name.split(" ")[0]}
          </text>

          {/* 10 Tablets Badge */}
          <circle cx="65" cy="162" r="9" fill="#FFEDD5" />
          <text x="65" y="165.5" textAnchor="middle" fill="#9A3412" fontSize="7" fontWeight="bold">
            10T
          </text>
        </svg>
      </div>
    );
  }

  // 3. Supplement Jar / Multivitamin Bottle (e.g., Surbex-Z)
  if (name.toLowerCase().includes("surbex") || category.includes("Vitamin")) {
    return (
      <div className={`relative flex items-center justify-center p-2 select-none ${className}`}>
        <div className="absolute bottom-1 w-3/4 h-5 bg-slate-400/30 rounded-full blur-[8px]" />

        <svg viewBox="0 0 160 200" className="w-full h-full max-h-64 object-contain drop-shadow-md">
          <defs>
            <linearGradient id="jarCap" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="50%" stopColor="#64748B" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
            <linearGradient id="jarBody" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="45%" stopColor="#FFFFFF" />
              <stop offset="85%" stopColor="#F8FAFC" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
          </defs>

          {/* Jar Ribbed Cap */}
          <rect x="48" y="14" width="64" height="24" rx="4" fill="url(#jarCap)" />
          {Array.from({ length: 11 }).map((_, i) => (
            <line
              key={i}
              x1={53 + i * 5}
              y1="16"
              x2={53 + i * 5}
              y2="36"
              stroke="#94A3B8"
              strokeWidth="1.2"
            />
          ))}

          {/* Bottle Shoulder & Body */}
          <path
            d="M 40 48 Q 40 38 64 38 L 96 38 Q 120 38 120 48 L 124 168 Q 124 178 110 178 L 50 178 Q 36 178 36 168 Z"
            fill="url(#jarBody)"
            stroke="#94A3B8"
            strokeWidth="0.8"
          />

          {/* Specular sheen */}
          <path d="M 44 50 L 44 168" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />

          {/* Premium Gold/Amber Multi-vitamin Label */}
          <rect x="38" y="66" width="84" height="96" rx="5" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="1" />
          <rect x="38" y="66" width="84" height="18" rx="4" fill="#D97706" />
          <text x="80" y="78" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="bold">
            HIGH-POTENCY ZINC
          </text>

          <text x="80" y="102" textAnchor="middle" fill="#78350F" fontSize="13" fontWeight="900">
            {name.split(" ")[0]}
          </text>

          <text x="80" y="114" textAnchor="middle" fill="#B45309" fontSize="6.5" fontWeight="bold">
            Vitamin B-Complex + C
          </text>

          {/* 30 Tablets badge */}
          <rect x="58" y="124" width="44" height="14" rx="7" fill="#F59E0B" />
          <text x="80" y="133.5" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="bold">
            30 TABLETS
          </text>

          <text x="80" y="153" textAnchor="middle" fill="#92400E" fontSize="5.5">
            Abbott Laboratories
          </text>
        </svg>
      </div>
    );
  }

  // 4. Blister Foil Strips (e.g., Arinac, Gravinate, Flagyl tablets, Rigix, Motilium)
  if (
    (name.toLowerCase().includes("arinac") && dosageForm === "Tablet") ||
    (name.toLowerCase().includes("gravinate") && dosageForm === "Tablet") ||
    (name.toLowerCase().includes("flagyl") && dosageForm === "Tablet") ||
    name.toLowerCase().includes("rigix") ||
    name.toLowerCase().includes("motilium")
  ) {
    return (
      <div className={`relative flex items-center justify-center p-2 select-none ${className}`}>
        <div className="absolute bottom-1 w-3/4 h-5 bg-slate-400/30 rounded-full blur-[8px]" />

        <svg viewBox="0 0 180 200" className="w-full h-full max-h-64 object-contain drop-shadow-md">
          <defs>
            <linearGradient id="foilGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="30%" stopColor="#E2E8F0" />
              <stop offset="60%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <linearGradient id="pillGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor={secondaryColor} />
              <stop offset="100%" stopColor={primaryColor} />
            </linearGradient>
          </defs>

          {/* Blister Card Background */}
          <rect
            x="32"
            y="20"
            width="116"
            height="160"
            rx="12"
            fill="url(#foilGrad)"
            stroke="#CBD5E1"
            strokeWidth="1.2"
          />

          {/* Foil Perforation Pattern */}
          <line x1="90" y1="22" x2="90" y2="178" stroke="#94A3B8" strokeWidth="0.8" strokeDasharray="3 2" />
          <line x1="34" y1="80" x2="146" y2="80" stroke="#94A3B8" strokeWidth="0.8" strokeDasharray="3 2" />
          <line x1="34" y1="126" x2="146" y2="126" stroke="#94A3B8" strokeWidth="0.8" strokeDasharray="3 2" />

          {/* Foil Pockets / Tablets */}
          {[
            { cx: 62, cy: 50 },
            { cx: 118, cy: 50 },
            { cx: 62, cy: 103 },
            { cx: 118, cy: 103 },
            { cx: 62, cy: 152 },
            { cx: 118, cy: 152 },
          ].map((pill, idx) => (
            <g key={idx}>
              <circle cx={pill.cx} cy={pill.cy} r="15" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />
              <circle cx={pill.cx} cy={pill.cy} r="11.5" fill="url(#pillGrad)" stroke="#FFFFFF" strokeWidth="1" />
              <path
                d={`M ${pill.cx - 7} ${pill.cy - 7} A 9 9 0 0 1 ${pill.cx + 5} ${pill.cy - 7}`}
                stroke="#FFFFFF"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          ))}

          <text x="90" y="15" textAnchor="middle" fill="#64748B" fontSize="6.5" fontWeight="bold">
            {brand || "DRAP VERIFIED"}
          </text>
        </svg>
      </div>
    );
  }

  // 5. Default: Modern 3D Pharmaceutical Packaging Box (e.g. Panadol, Augmentin, Risek, Brufen, Disprin)
  return (
    <div className={`relative flex items-center justify-center p-2 select-none ${className}`}>
      <div className="absolute bottom-1 w-3/4 h-5 bg-slate-400/30 rounded-full blur-[8px]" />

      <svg viewBox="0 0 180 200" className="w-full h-full max-h-64 object-contain drop-shadow-lg">
        <defs>
          <linearGradient id="boxFrontGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F8FAFC" />
          </linearGradient>
        </defs>

        {/* Box Front Face */}
        <rect
          x="28"
          y="32"
          width="124"
          height="144"
          rx="8"
          fill="url(#boxFrontGrad)"
          stroke="#E2E8F0"
          strokeWidth="1"
        />

        {/* Top Decorative Accent Stripe */}
        <path d="M 28 40 Q 28 32 36 32 L 144 32 Q 152 32 152 40 L 152 52 L 28 52 Z" fill={primaryColor} />

        {/* Holographic Security / DRAP Seal */}
        <rect x="126" y="37" width="20" height="9" rx="2" fill="#FEF08A" stroke="#EAB308" strokeWidth="0.5" />
        <text x="136" y="43.5" textAnchor="middle" fill="#854D0E" fontSize="4.2" fontWeight="bold">
          DRAP
        </text>

        {/* Brand Name */}
        <text x="38" y="45" fill="#FFFFFF" fontSize="7" fontWeight="bold">
          {brand.split(" ")[0] || "PHARMA"}
        </text>

        {/* Medicine Main Title */}
        <text
          x="38"
          y="76"
          fill="#0F172A"
          fontSize="13"
          fontWeight="900"
          className="font-display"
        >
          {name.length > 13 ? name.slice(0, 13) + "..." : name}
        </text>

        {/* Dosage / Strength Tag */}
        <rect x="38" y="86" width="56" height="14" rx="3.5" fill={secondaryColor} />
        <text x="66" y="95.5" textAnchor="middle" fill={primaryColor} fontSize="6.5" fontWeight="bold">
          {strength || dosageForm}
        </text>

        {/* Formula divider */}
        <line x1="38" y1="114" x2="142" y2="114" stroke="#E2E8F0" strokeWidth="0.8" />

        {/* Pill / Capsule Icon */}
        <g transform="translate(38, 126)">
          {dosageForm === "Capsule" ? (
            <g>
              <rect x="0" y="0" width="40" height="16" rx="8" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="0.8" />
              <rect x="0" y="0" width="20" height="16" rx="8" fill={primaryColor} />
            </g>
          ) : (
            <g>
              <circle cx="12" cy="10" r="9" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="0.8" />
              <line x1="12" y1="3" x2="12" y2="17" stroke="#CBD5E1" strokeWidth="0.8" />
              <circle cx="32" cy="10" r="9" fill={secondaryColor} stroke={primaryColor} strokeWidth="0.8" />
            </g>
          )}
        </g>

        <text x="142" y="138" textAnchor="end" fill="#64748B" fontSize="6" fontWeight="semibold">
          14 - 30 Tabs
        </text>

        <line x1="38" y1="158" x2="142" y2="158" stroke="#94A3B8" strokeWidth="0.6" strokeDasharray="1.5 1" />
        <text x="90" y="167" textAnchor="middle" fill="#94A3B8" fontSize="5">
          DRAP MRP REGULATED
        </text>
      </svg>
    </div>
  );
}
