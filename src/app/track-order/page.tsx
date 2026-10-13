"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Package,
  CheckCircle2,
  Clock,
  Truck,
  ShieldCheck,
  ChevronRight,
  PhoneCall,
  MessageCircle,
  AlertCircle,
  ThermometerSnowflake,
  UserCheck,
} from "lucide-react";
import { Navbar } from "@/components/pharmacy/Navbar";
import { Footer } from "@/components/pharmacy/Footer";
import { usePharmacy } from "@/context/PharmacyContext";
import { Button } from "@/components/ui/Button";

export default function TrackOrderPage() {
  const { selectedCity } = usePharmacy();
  const [orderQuery, setOrderQuery] = useState("");
  const [activeTrackingId, setActiveTrackingId] = useState<string | null>("PZ-PK-10294");
  const [hasSearched, setHasSearched] = useState(false);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;
    setActiveTrackingId(orderQuery.trim().toUpperCase());
    setHasSearched(true);
  };

  const isRxOrder = activeTrackingId?.startsWith("PZ-RX");

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
          <span className="text-[#084236] font-bold">Track Medicine Order</span>
        </div>

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF3EE] text-[#084236] text-xs font-bold border border-[#084236]/15 mb-3">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>Live Dispatch & Cold-Chain Tracking</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Track Your Delivery Status
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Enter your Pharma Zone Order ID (e.g. <strong className="text-[#084236]">PZ-PK-10294</strong>) or Prescription Tracking ID (e.g. <strong className="text-[#084236]">PZ-RX-8492</strong>).
          </p>

          {/* Search Box */}
          <form onSubmit={handleTrackSubmit} className="mt-6 flex items-center gap-2 max-w-md mx-auto">
            <div className="relative flex-1">
              <Package className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter PZ-PK-XXXXX or PZ-RX-XXXX"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm font-mono uppercase rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#084236]/20 focus:border-[#084236] shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-[#084236] hover:bg-[#052e25] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
            >
              Track Order
            </button>
          </form>
        </div>

        {/* Live Timeline Result Card */}
        {activeTrackingId && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md">
            {/* Order Info Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Tracking Identifier
                </span>
                <div className="flex items-center gap-2.5 mt-0.5">
                  <span className="text-xl sm:text-2xl font-black text-[#084236] font-mono tracking-wider">
                    {activeTrackingId}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Active Delivery
                  </span>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Delivery Destination
                </span>
                <p className="text-sm font-bold text-slate-800 mt-0.5">
                  {selectedCity}, Pakistan (Express 2-Hour Hub)
                </p>
              </div>
            </div>

            {/* 4-Stage Delivery Timeline */}
            <div className="py-8">
              <div className="relative">
                {/* Horizontal progress bar for desktop */}
                <div className="hidden md:block absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1.5 bg-slate-100 rounded-full">
                  <div className="h-full bg-emerald-500 rounded-full w-3/4 transition-all duration-500" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                  {/* Step 1: Order Placed */}
                  <div className="flex md:flex-col items-start md:items-center text-left md:text-center gap-4 md:gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md ring-4 ring-emerald-50">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        {isRxOrder ? "Prescription Received" : "Order Placed"}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Recorded in DRAP Order Queue
                      </p>
                      <span className="text-[10px] text-emerald-600 font-semibold block mt-1">
                        Completed
                      </span>
                    </div>
                  </div>

                  {/* Step 2: Pharmacist Verified */}
                  <div className="flex md:flex-col items-start md:items-center text-left md:text-center gap-4 md:gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md ring-4 ring-emerald-50">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        Pharm-D Verified
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Dosage & expiry seal validated
                      </p>
                      <span className="text-[10px] text-emerald-600 font-semibold block mt-1">
                        Completed
                      </span>
                    </div>
                  </div>

                  {/* Step 3: Cold-Chain Dispatch */}
                  <div className="flex md:flex-col items-start md:items-center text-left md:text-center gap-4 md:gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md ring-4 ring-emerald-50">
                      <ThermometerSnowflake className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        Cold-Chain Packaged
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Insulated cool-box (2°C – 8°C)
                      </p>
                      <span className="text-[10px] text-emerald-600 font-semibold block mt-1">
                        Completed
                      </span>
                    </div>
                  </div>

                  {/* Step 4: Out for Delivery */}
                  <div className="flex md:flex-col items-start md:items-center text-left md:text-center gap-4 md:gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-[#084236] text-white flex items-center justify-center shrink-0 shadow-md ring-4 ring-[#EAF3EE] animate-pulse">
                      <Truck className="w-6 h-6 text-[#10B981]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        Out for Delivery
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Pharmacy Rider en-route to doorstep
                      </p>
                      <span className="text-[10px] text-[#084236] font-bold block mt-1">
                        In Transit • Est. 35 mins
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Assistance Banner */}
            <div className="bg-[#EAF3EE] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-[#084236]">Need rider contact or special instructions?</span>
                  <p className="text-slate-600">Our customer care team is available 24/7 on call and WhatsApp.</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <a
                  href={`https://wa.me/923280790704?text=Hello%20PharmaZone%20I%20am%20tracking%20order%20${activeTrackingId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp 0328-0790704</span>
                </a>

                <a
                  href="tel:+923280790704"
                  className="inline-flex items-center justify-center gap-1.5 bg-white text-[#084236] border border-slate-200 font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-all"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Call Hotline</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
