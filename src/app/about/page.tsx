"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  HeartPulse,
  Award,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  CheckCircle2,
  ThermometerSnowflake,
  MessageCircle,
} from "lucide-react";
import { Navbar } from "@/components/pharmacy/Navbar";
import { Footer } from "@/components/pharmacy/Footer";
import { PAKISTAN_CITIES } from "@/data/medicines";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F8F6]">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-[#084236] font-semibold">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#084236] font-bold">About Pharma Zone</span>
        </div>

        {/* Hero Banner */}
        <div className="bg-[#084236] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden mb-12 shadow-xl border border-emerald-900/40">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#A7F3D0] text-xs font-bold border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
              DRAP Licensed E-Pharmacy Pakistan
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight text-white">
              Pakistan's Premier Certified Digital Healthcare Platform
            </h1>
            <p className="text-sm text-[#EAF3EE]/85 leading-relaxed">
              Pharma Zone was established to eliminate counterfeit medicines and delivery delays in Pakistan. We connect patients directly to 100% genuine pharmaceuticals with strict cold-chain handling and licensed Pharm-D oversight.
            </p>
          </div>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF3EE] text-[#084236] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#10B981]" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              100% DRAP Compliance
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              All inventory is sourced exclusively from licensed pharmaceutical manufacturers including GSK, Abbott, Getz, Searle, and Sanofi Pakistan with verified batch registration.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF3EE] text-[#084236] flex items-center justify-center">
              <ThermometerSnowflake className="w-6 h-6 text-sky-500" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              WHO Cold-Chain Guarantee
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Biologics, vaccines, and pediatric suspensions are strictly delivered in calibrated, insulated cool-boxes (2°C – 8°C) to withstand summer heat waves across Pakistan.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF3EE] text-[#084236] flex items-center justify-center">
              <HeartPulse className="w-6 h-6 text-rose-500" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              Qualified Clinical Team
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our registered Pharm-D clinical team manually verifies every handwritten doctor slip and patient dosage instructions before dispatch.
            </p>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-display">
              Have Questions or Need Prescription Help?
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Reach our clinical pharmacists on WhatsApp or our 24/7 official helpline.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="https://wa.me/923280790704?text=Hello%20PharmaZone%20I%20have%20an%20inquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp 0328-0790704</span>
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 bg-[#EAF3EE] hover:bg-[#dceeea] text-[#084236] font-bold text-xs px-5 py-3 rounded-2xl transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
