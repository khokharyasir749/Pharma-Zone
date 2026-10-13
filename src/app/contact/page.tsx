"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
  Send,
  CheckCircle2,
} from "lucide-react";
import { Navbar } from "@/components/pharmacy/Navbar";
import { Footer } from "@/components/pharmacy/Footer";
import { Button } from "@/components/ui/Button";
import { usePharmacy } from "@/context/PharmacyContext";

export default function ContactPage() {
  const { selectedCity } = usePharmacy();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
    }, 1000);
  };

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
          <span className="text-[#084236] font-bold">Contact & Support</span>
        </div>

        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF3EE] text-[#084236] text-xs font-bold border border-[#084236]/15 mb-3">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>24/7 Clinical Pharmacist Assistance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Contact Pharma Zone Pakistan
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mt-2 leading-relaxed">
            Need immediate medicine consultation, prescription verification, or delivery assistance in {selectedCity}? Reach our support team anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Contact Channels */}
          <div className="lg:col-span-5 space-y-4">
            {/* WhatsApp Card */}
            <div className="bg-emerald-600 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 fill-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Official WhatsApp</h3>
                  <p className="text-xs text-emerald-100">Direct Prescription & Orders</p>
                </div>
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed mb-4">
                Chat directly with our clinical pharmacist for swift dosage calculations and instant delivery confirmation.
              </p>
              <a
                href="https://wa.me/923280790704?text=Hello%20PharmaZone%20I%20have%20an%20inquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-white text-[#084236] hover:bg-emerald-50 font-extrabold text-xs py-3 px-4 rounded-2xl transition-all shadow-sm"
              >
                <span>Chat on WhatsApp (0328-0790704)</span>
              </a>
            </div>

            {/* Helpline Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EAF3EE] text-[#084236] flex items-center justify-center">
                  <Phone className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase">UAN / Hotline</h4>
                  <a
                    href="tel:+923280790704"
                    className="text-base font-bold text-[#084236] hover:underline"
                  >
                    0328-0790704
                  </a>
                </div>
              </div>
            </div>

            {/* Email Support Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EAF3EE] text-[#084236] flex items-center justify-center">
                  <Mail className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase">Official Support Email</h4>
                  <a
                    href="mailto:khokharyasir749@gmail.com"
                    className="text-sm font-bold text-slate-800 hover:text-[#084236]"
                  >
                    khokharyasir749@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Head Office Info */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EAF3EE] text-[#084236] flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase">Distribution Hub</h4>
                  <p className="text-xs font-semibold text-slate-800">
                    Express Dispatch Hubs in Karachi, Lahore, Islamabad & Nationwide
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
            {isSent ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 font-display">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#084236]">{name || "Valued Patient"}</strong>. Our pharmacy support desk has received your note and will contact you shortly.
                </p>
                <div className="pt-4">
                  <Button onClick={() => setIsSent(false)} variant="primary">
                    Send Another Message
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    Send Us an Inquiry
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out the form below and our registered team will reply within 30 minutes.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Yasir Khokhar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#084236]/20 focus:border-[#084236]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0328-0790704"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#084236]/20 focus:border-[#084236]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#084236]/20 focus:border-[#084236]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Message / Prescription Query *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Specify requested medicines, dosage, or city dispatch questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#084236]/20 focus:border-[#084236]"
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" variant="primary" disabled={isSending} className="w-full sm:w-auto">
                    <Send className="w-4 h-4 mr-2" />
                    <span>{isSending ? "Sending Inquiry..." : "Submit Inquiry"}</span>
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
