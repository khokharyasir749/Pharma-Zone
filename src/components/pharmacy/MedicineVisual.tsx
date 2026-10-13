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
    category.includes("Antibiotic") || name.toLowerCase().includes("augmentin") || name.toLowerCase().includes("leflox");
  const isPain =
    category.includes("Pain") || name.toLowerCase().includes("panadol") || name.toLowerCase().includes("disprin") || name.toLowerCase().includes("brufen");
  const isStomach =
    category.includes("Gastro") || category.includes("Stomach") || name.toLowerCase().includes("risek") || name.toLowerCase().includes("entox");
  const isVitamin =
    category.includes("Vitamin") || name.toLowerCase().includes("surbex") || name.toLowerCase().includes("cac");
  const isAllergy =
    category.includes("Cold") || category.includes("Allergy") || name.toLowerCase().includes("softin") || name.toLowerCase().includes("arinac");

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
    : "#EAF3EE";

  // Render specific visual types:
  // 1. Suspension / Syrup bottles
  if (dosageForm === "Syrup" || dosageForm === "Suspension") {
    return (
      <div className={`relative flex items-center justify-center p-3 select-none ${className}`}>
        {/* Soft shadow below bottle */}
        <div className="absolute bottom-2 w-28 h-4 bg-slate-300/40 rounded-full blur-[6px]" />

        <svg viewBox="0 0 160 200" className="w-28 h-36 drop-shadow-md">
          <defs>
            {/* Amber glass bottle gradient */}
            <linearGradient id="amberGlass" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#78350F" />
              <stop offset="35%" stopColor="#B45309" />
              <stop offset="70%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>
            {/* Cap gradient */}
            <linearGradient id="whiteCap" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            {/* Liquid level */}
            <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>

          {/* Measuring Cup / White Cap on Top */}
          <rect x="62" y="12" width="36" height="20" rx="3" fill="url(#whiteCap)" stroke="#94A3B8" strokeWidth="1" />
          {/* Cap ridges */}
          <line x1="68" y1="14" x2="68" y2="30" stroke="#CBD5E1" strokeWidth="1" />
          <line x1="74" y1="14" x2="74" y2="30" stroke="#CBD5E1" strokeWidth="1" />
          <line x1="80" y1="14" x2="80" y2="30" stroke="#CBD5E1" strokeWidth="1" />
          <line x1="86" y1="14" x2="86" y2="30" stroke="#CBD5E1" strokeWidth="1" />
          <line x1="92" y1="14" x2="92" y2="30" stroke="#CBD5E1" strokeWidth="1" />

          {/* Bottle Neck */}
          <rect x="68" y="32" width="24" height="14" fill="#92400E" rx="1" />

          {/* Bottle Body */}
          <path
            d="M 50 56 Q 50 46 70 46 L 90 46 Q 110 46 110 56 L 114 165 Q 114 175 102 175 L 58 175 Q 46 175 46 165 Z"
            fill="url(#amberGlass)"
          />

          {/* Liquid highlight */}
          <path
            d="M 50 68 L 110 68 L 112 165 Q 112 172 102 172 L 58 172 Q 48 172 48 165 Z"
            fill="url(#liquidGrad)"
            opacity="0.35"
          />

          {/* Specular bottle sheen */}
          <path d="M 54 58 L 54 165" stroke="#FDE68A" strokeWidth="3" strokeLinecap="round" opacity="0.6" />

          {/* Pharmaceutical Label */}
          <rect x="52" y="80" width="56" height="74" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
          {/* Top color header of label */}
          <rect x="52" y="80" width="56" height="12" rx="3" fill={primaryColor} />
          <text x="80" y="88" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold">
            60ml ORAL
          </text>

          {/* Medicine Name on label */}
          <text x="80" y="104" textAnchor="middle" fill="#0F172A" fontSize="7" fontWeight="bold">
            {name.split(" ")[0]}
          </text>
          <text x="80" y="112" textAnchor="middle" fill="#64748B" fontSize="5">
            Suspension
          </text>

          {/* Rx badge */}
          <rect x="58" y="118" width="16" height="7" rx="2" fill={secondaryColor} />
          <text x="66" y="123.5" textAnchor="middle" fill={primaryColor} fontSize="4.5" fontWeight="bold">
            Rx
          </text>

          {/* Mini barcodes & DRAP stamp */}
          <line x1="58" y1="134" x2="102" y2="134" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 1" />
          <text x="80" y="145" textAnchor="middle" fill="#94A3B8" fontSize="4">
            DRAP 012847
          </text>
        </svg>
      </div>
    );
  }

  // 2. Effervescent Tablet Tubes (e.g. CaC-1000)
  if (dosageForm === "Effervescent Tablet") {
    return (
      <div className={`relative flex items-center justify-center p-3 select-none ${className}`}>
        <div className="absolute bottom-2 w-24 h-4 bg-slate-300/40 rounded-full blur-[6px]" />
        <svg viewBox="0 0 160 200" className="w-28 h-36 drop-shadow-md">
          <defs>
            <linearGradient id="tubeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="40%" stopColor="#FFFFFF" />
              <stop offset="85%" stopColor="#F1F5F9" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <linearGradient id="orangeCap" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#EA580C" />
              <stop offset="50%" stopColor="#FB923C" />
              <stop offset="100%" stopColor="#C2410C" />
            </linearGradient>
          </defs>

          {/* Effervescent Tube Cap */}
          <rect x="63" y="16" width="34" height="16" rx="4" fill="url(#orangeCap)" />
          <line x1="68" y1="20" x2="68" y2="30" stroke="#FDBA74" strokeWidth="1" />
          <line x1="74" y1="20" x2="74" y2="30" stroke="#FDBA74" strokeWidth="1" />
          <line x1="80" y1="20" x2="80" y2="30" stroke="#FDBA74" strokeWidth="1" />
          <line x1="86" y1="20" x2="86" y2="30" stroke="#FDBA74" strokeWidth="1" />

          {/* Tube Body */}
          <rect x="65" y="32" width="30" height="142" rx="4" fill="url(#tubeGrad)" stroke="#E2E8F0" strokeWidth="1" />

          {/* Tube Sheen */}
          <line x1="70" y1="36" x2="70" y2="168" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

          {/* Vibrant Branding wrapper */}
          <rect x="65" y="60" width="30" height="85" fill="#FB923C" />
          <rect x="65" y="70" width="30" height="65" fill="#F97316" />

          {/* Name rotated vertically */}
          <text
            x="-106"
            y="83"
            transform="rotate(-90)"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="9"
            fontWeight="900"
            letterSpacing="1"
          >
            {name.split(" ")[0]}
          </text>

          {/* 10 Tablets badge */}
          <circle cx="80" cy="155" r="7" fill="#FED7AA" />
          <text x="80" y="157.5" textAnchor="middle" fill="#9A3412" fontSize="5" fontWeight="bold">
            10T
          </text>
        </svg>
      </div>
    );
  }

  // 3. Supplement Jar / Multivitamin Bottle (e.g., Surbex-Z)
  if (name.toLowerCase().includes("surbex") || category.includes("Vitamin")) {
    return (
      <div className={`relative flex items-center justify-center p-3 select-none ${className}`}>
        <div className="absolute bottom-2 w-28 h-4 bg-slate-300/40 rounded-full blur-[6px]" />
        <svg viewBox="0 0 160 200" className="w-28 h-36 drop-shadow-md">
          <defs>
            <linearGradient id="jarCap" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="50%" stopColor="#64748B" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <linearGradient id="jarBody" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="45%" stopColor="#FFFFFF" />
              <stop offset="85%" stopColor="#F1F5F9" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
          </defs>

          {/* Jar Ribbed Cap */}
          <rect x="55" y="18" width="50" height="22" rx="4" fill="url(#jarCap)" />
          {Array.from({ length: 9 }).map((_, i) => (
            <line
              key={i}
              x1={60 + i * 5}
              y1="22"
              x2={60 + i * 5}
              y2="36"
              stroke="#94A3B8"
              strokeWidth="1.2"
            />
          ))}

          {/* Bottle Shoulder */}
          <path
            d="M 50 48 Q 50 40 70 40 L 90 40 Q 110 40 110 48 L 115 165 Q 115 174 102 174 L 58 174 Q 45 174 45 165 Z"
            fill="url(#jarBody)"
            stroke="#CBD5E1"
            strokeWidth="1"
          />

          {/* Specular sheen */}
          <path d="M 52 50 L 52 165" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />

          {/* Premium Gold/Amber Multi-vitamin Label */}
          <rect x="48" y="66" width="64" height="88" rx="4" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="1" />
          <rect x="48" y="66" width="64" height="16" rx="3" fill="#D97706" />
          <text x="80" y="77" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="bold">
            HIGH-POTENCY ZINC
          </text>

          <text x="80" y="98" textAnchor="middle" fill="#78350F" fontSize="11" fontWeight="900">
            {name.split(" ")[0]}
          </text>

          <text x="80" y="108" textAnchor="middle" fill="#B45309" fontSize="6" fontWeight="bold">
            Vitamin B-Complex + C
          </text>

          {/* 30 Tablets badge */}
          <rect x="62" y="118" width="36" height="12" rx="6" fill="#F59E0B" />
          <text x="80" y="126" textAnchor="middle" fill="#FFFFFF" fontSize="5.5" fontWeight="bold">
            30 TABLETS
          </text>

          {/* DRAP Logo */}
          <text x="80" y="146" textAnchor="middle" fill="#92400E" fontSize="4.5">
            Abbott Laboratories
          </text>
        </svg>
      </div>
    );
  }

  // 4. Blister Foil Strips (e.g., Arinac, Gravinate, Flagyl)
  if (name.toLowerCase().includes("arinac") || name.toLowerCase().includes("gravinate") || name.toLowerCase().includes("flagyl")) {
    return (
      <div className={`relative flex items-center justify-center p-3 select-none ${className}`}>
        <div className="absolute bottom-2 w-32 h-4 bg-slate-300/40 rounded-full blur-[6px]" />
        <svg viewBox="0 0 180 200" className="w-32 h-36 drop-shadow-md">
          <defs>
            <linearGradient id="foilGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F1F5F9" />
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
            x="40"
            y="25"
            width="100"
            height="150"
            rx="10"
            fill="url(#foilGrad)"
            stroke="#CBD5E1"
            strokeWidth="1.2"
          />

          {/* Foil Perforation Pattern */}
          <line x1="90" y1="28" x2="90" y2="172" stroke="#94A3B8" strokeWidth="0.8" strokeDasharray="3 2" />
          <line x1="42" y1="85" x2="138" y2="85" stroke="#94A3B8" strokeWidth="0.8" strokeDasharray="3 2" />
          <line x1="42" y1="125" x2="138" y2="125" stroke="#94A3B8" strokeWidth="0.8" strokeDasharray="3 2" />

          {/* Foil Pockets / Tablets (2 columns x 4 rows) */}
          {[
            { cx: 65, cy: 50 },
            { cx: 115, cy: 50 },
            { cx: 65, cy: 105 },
            { cx: 115, cy: 105 },
            { cx: 65, cy: 145 },
            { cx: 115, cy: 145 },
          ].map((pill, idx) => (
            <g key={idx}>
              {/* Pocket bevel */}
              <circle cx={pill.cx} cy={pill.cy} r="14" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.6" />
              {/* Tablet inside pocket */}
              <circle cx={pill.cx} cy={pill.cy} r="10.5" fill="url(#pillGrad)" stroke="#FFFFFF" strokeWidth="1" />
              {/* Tablet highlight */}
              <path
                d={`M ${pill.cx - 6} ${pill.cy - 6} A 8 8 0 0 1 ${pill.cx + 4} ${pill.cy - 6}`}
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          ))}

          {/* Brand watermark printed on foil */}
          <text x="90" y="20" textAnchor="middle" fill="#64748B" fontSize="6" fontWeight="bold">
            {brand || "DRAP VERIFIED"}
          </text>
        </svg>
      </div>
    );
  }

  // 5. Default: Modern 3D Pharmaceutical Packaging Box (e.g. Panadol, Augmentin, Risek, Brufen, Disprin)
  return (
    <div className={`relative flex items-center justify-center p-3 select-none ${className}`}>
      {/* Soft Ground Shadow */}
      <div className="absolute bottom-2 w-32 h-5 bg-slate-300/40 rounded-full blur-[7px]" />

      <svg viewBox="0 0 180 200" className="w-32 h-36 drop-shadow-lg">
        <defs>
          <linearGradient id="boxFrontGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F8FAFC" />
          </linearGradient>
          <linearGradient id="boxTopGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
          <linearGradient id="boxSideGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
        </defs>

        {/* Isometric 3D Medicine Box Front Face */}
        <rect
          x="34"
          y="42"
          width="112"
          height="128"
          rx="6"
          fill="url(#boxFrontGrad)"
          stroke="#E2E8F0"
          strokeWidth="1"
        />

        {/* Top Decorative Category Accent Stripe */}
        <path d="M 34 48 Q 34 42 40 42 L 140 42 Q 146 42 146 48 L 146 58 L 34 58 Z" fill={primaryColor} />

        {/* Holographic Security / DRAP Seal on Top Right */}
        <rect x="122" y="46" width="18" height="8" rx="2" fill="#FEF08A" stroke="#EAB308" strokeWidth="0.5" />
        <text x="131" y="52" textAnchor="middle" fill="#854D0E" fontSize="3.8" fontWeight="bold">
          DRAP
        </text>

        {/* Brand Name (e.g. GSK, Abbott, Getz) */}
        <text x="44" y="53" fill="#FFFFFF" fontSize="6" fontWeight="bold">
          {brand.split(" ")[0] || "PHARMA"}
        </text>

        {/* Medicine Main Title */}
        <text
          x="44"
          y="80"
          fill="#0F172A"
          fontSize="11"
          fontWeight="900"
          className="font-display"
        >
          {name.length > 13 ? name.slice(0, 13) + "..." : name}
        </text>

        {/* Dosage / Strength Tag */}
        <rect x="44" y="88" width="50" height="12" rx="3" fill={secondaryColor} />
        <text x="69" y="96.5" textAnchor="middle" fill={primaryColor} fontSize="5.5" fontWeight="bold">
          {strength || dosageForm}
        </text>

        {/* Subtle Formula Line */}
        <line x1="44" y1="112" x2="136" y2="112" stroke="#E2E8F0" strokeWidth="0.8" />

        {/* Stylized Pill or Capsule Icon on the Box Face */}
        <g transform="translate(44, 122)">
          {dosageForm === "Capsule" ? (
            <g>
              <rect x="0" y="0" width="36" height="14" rx="7" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="0.8" />
              <rect x="0" y="0" width="18" height="14" rx="7" fill={primaryColor} />
            </g>
          ) : (
            <g>
              <circle cx="10" cy="8" r="8" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="0.8" />
              <line x1="10" y1="2" x2="10" y2="14" stroke="#CBD5E1" strokeWidth="0.8" />
              <circle cx="28" cy="8" r="8" fill={secondaryColor} stroke={primaryColor} strokeWidth="0.8" />
            </g>
          )}
        </g>

        {/* Pack Size info */}
        <text x="136" y="132" textAnchor="end" fill="#64748B" fontSize="5.5" fontWeight="semibold">
          14 - 30 Tabs
        </text>

        {/* Bottom Barcode preview */}
        <line x1="44" y1="154" x2="136" y2="154" stroke="#94A3B8" strokeWidth="0.6" strokeDasharray="1.5 1" />
        <text x="90" y="162" textAnchor="middle" fill="#94A3B8" fontSize="4.5">
          PKR MRP REGULATED
        </text>
      </svg>
    </div>
  );
}
