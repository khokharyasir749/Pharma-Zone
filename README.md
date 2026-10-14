# 🌿 Pharma Zone — Modern Pakistani E-Pharmacy Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.x-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Build-Passing-brightgreen)]()

A fast, fully responsive, and modern online pharmacy web application built for the Pakistani healthcare ecosystem. Inspired by a clean Dribbble design reference, **Pharma Zone** combines a deep forest green visual theme (`#084236`) with intuitive category navigation, high-res static assets, vector-based medicine visuals, prescription review workflows, and localized payment gateways.

---

## 🌟 Key Features

- **🎨 Modern Dribbble-Inspired UI**:
  - Forest Green brand palette (`#084236`) with rounded-3xl container cards and mint accents (`#EAF3EE`).
  - Hero card with local high-resolution medical portrait, status beacons, and 98% customer satisfaction badges.
  - Floating custom category popover and real-time search pill with auto-reset and instant clear (`X`) button.

- **💊 100% Dynamic Medicine Catalog**:
  - 33 authentic Pakistani medicines spanning 6 therapeutic classes (Pain & Fever, Antibiotics, Gastro & Acidity, Vitamins, Allergy & Cold, Motion Sickness).
  - Accurate DRAP-compliant pricing (PKR), active generic salts, and manufacturer details (GSK, Abbott, Getz Pharma, Sanofi, Searle, AGP, etc.).
  - Zero hardcoded counts: Category pill badges calculate and display exact matching quantities in real time.
  - Resolution-independent SVG/CSS vector product visuals (blister foil packs, suspension bottles, supplement jars, effervescent tubes).

- **🔍 Interactive Product Quick View**:
  - Detailed modal view displaying clinical dosage, pack size, salt composition, and storage guidelines.
  - Dynamic pricing and quantity synchronization (`+` / `-`).
  - Direct WhatsApp order generation per product.

- **📋 Prescription Slip Upload & Verification**:
  - Drag-and-drop document upload (JPG, PNG, PDF up to 10MB).
  - Validation for Pakistani phone formats (`03XX-XXXXXXX`).
  - Generates simulated tracking IDs (e.g., `PZ-RX-8492`) with a pre-filled direct WhatsApp handoff to the Pharm-D team.

- **🇵🇰 Localized Checkout & City Delivery**:
  - City selection with persistent delivery preferences (Lahore, Karachi, Islamabad, Rawalpindi, etc.).
  - Cash on Delivery (COD) with Open-Parcel inspection guarantee.
  - JazzCash & EasyPaisa wallet transfer flow with Transaction ID (TID) verification.
  - Credit / Debit Card (Visa, Mastercard) processing layout.

- **🧭 Dedicated Application Routes**:
  - `/` — Homepage with Hero, Category Bar, Flash Sale grid, and Promotional Split Cards.
  - `/categories` — Comprehensive therapeutic category breakdown with active medicine counters.
  - `/track-order` — 4-stage live delivery tracker (Order Placed ➔ Pharm-D Verified ➔ Cold-Chain Packaged ➔ Out for Delivery).
  - `/about` & `/contact` — DRAP compliance documentation, cold-chain assurance, official hotline, and inquiry forms.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & PostCSS
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API with LocalStorage synchronization
- **Fonts**: `Plus Jakarta Sans` & `Inter` (Google Fonts via `next/font`)

---

## 📁 Project Structure

```text
Pharma-Zone/
├── public/
│   ├── images/
│   │   └── doctor.png              # High-res local healthcare professional portrait
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── about/page.tsx          # About & DRAP compliance page
│   │   ├── categories/page.tsx     # Categories exploration page
│   │   ├── contact/page.tsx        # Contact & distribution hubs page
│   │   ├── track-order/page.tsx    # Order & prescription tracking page
│   │   ├── globals.css             # Tailwind base & custom utilities
│   │   ├── layout.tsx              # Root layout & providers
│   │   └── page.tsx                # Main store homepage
│   ├── components/
│   │   └── pharmacy/
│   │       ├── CartDrawer.tsx      # Slide-over cart with live price calculations
│   │       ├── CategoryBar.tsx     # Dynamic category filter pills
│   │       ├── CheckoutModal.tsx   # Multi-option Pakistani checkout modal
│   │       ├── Footer.tsx          # Store footer & official contact links
│   │       ├── HeroCard.tsx        # Dribbble hero section with arch framing
│   │       ├── MedicineCard.tsx    # Product card with quantity controls & wishlist
│   │       ├── MedicineVisual.tsx  # Vector-based pharmaceutical illustrations
│   │       ├── Navbar.tsx          # Pill search, location selector & popover
│   │       ├── PrescriptionUploadModal.tsx # Prescription slip upload modal
│   │       ├── ProductDetailModal.tsx      # Medicine quick-view modal
│   │       └── PromoSplitCards.tsx # Family & Prescription promo split cards
│   ├── context/
│   │   └── PharmacyContext.tsx     # Global cart, search, city, & modal state
│   ├── data/
│   │   └── medicines.ts            # Pakistani medicines dataset & categories
│   └── types/
│       └── pharmacy.ts             # TypeScript definitions & interfaces
├── postcss.config.js               # PostCSS configuration
├── tailwind.config.ts              # Tailwind tokens & palette setup
├── tsconfig.json
└── package.json
