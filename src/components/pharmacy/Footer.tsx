import React from "react";
import {
  ShieldCheck,
  Truck,
  HeartPulse,
  Award,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
} from "lucide-react";
import { PAKISTAN_CITIES } from "@/data/medicines";

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white border-t border-brand-primary/40 mt-20">
      {/* Trust Badges Strip */}
      <div className="border-b border-white/10 py-10 bg-brand-primary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-brand-accent/20 text-brand-accent flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">DRAP Certified</h4>
                <p className="text-xs text-brand-mint/70">
                  Strictly 100% authentic medicines sourced from licensed pharma distributors
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-brand-accent/20 text-brand-accent flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Express Delivery</h4>
                <p className="text-xs text-brand-mint/70">
                  Same-day delivery in major cities, with temperature-controlled handling
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-brand-accent/20 text-brand-accent flex items-center justify-center shrink-0">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Clinical Pharmacists</h4>
                <p className="text-xs text-brand-mint/70">
                  Qualified Pharm-D specialists to review prescriptions and dosage safety
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-brand-accent/20 text-brand-accent flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Best Market Prices</h4>
                <p className="text-xs text-brand-mint/70">
                  DRAP max retail price compliance with transparent discounts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Intro */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-accent flex items-center justify-center text-brand-dark font-black text-xl">
                P
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white font-display">
                PHARMA <span className="text-brand-accent">ZONE</span>
              </span>
            </div>
            <p className="text-sm text-brand-mint/80 max-w-sm leading-relaxed">
              Pharma Zone is Pakistan's forward-thinking digital healthcare and e-pharmacy platform, committed to delivering genuine prescription medications, surgical supplies, and wellness care straight to your doorstep.
            </p>
            <div className="space-y-2.5 text-xs text-brand-mint/70">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-accent" />
                <a href="tel:+923280790704" className="hover:text-white transition-colors">
                  Helpline / UAN: 03280790704
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-accent" />
                <a href="mailto:khokharyasir749@gmail.com" className="hover:text-white transition-colors">
                  khokharyasir749@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-brand-accent" />
                <span>24 Hours / 7 Days Live Pharmacist On-Call</span>
              </div>

              {/* Direct WhatsApp Order CTA */}
              <div className="pt-2">
                <a
                  href="https://wa.me/923280790704?text=Hello%20PharmaZone%20I%20want%20to%20order%20medicines"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 group"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Order via WhatsApp (0328-0790704)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-brand-mint/75">
              <li><a href="#" className="hover:text-white transition-colors">Pain & Fever</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Antibiotics & Anti-Infectives</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Stomach & Acidity (PPIs)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Vitamins & Supplements</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cough, Cold & Allergy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Nausea & Travel Relief</a></li>
            </ul>
          </div>

          {/* Delivery Hubs */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4">
              Delivery Network
            </h4>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {PAKISTAN_CITIES.map((city) => (
                <span
                  key={city}
                  className="bg-white/10 text-brand-mint/90 px-2 py-1 rounded-lg text-[11px]"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* Regulatory & Payment */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4">
              Payment & Security
            </h4>
            <p className="text-xs text-brand-mint/70 mb-3">
              We offer multiple convenient payment options across Pakistan:
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-brand-dark">
              <span className="bg-brand-mint px-2.5 py-1 rounded-md">Cash on Delivery</span>
              <span className="bg-brand-mint px-2.5 py-1 rounded-md">JazzCash</span>
              <span className="bg-brand-mint px-2.5 py-1 rounded-md">EasyPaisa</span>
              <span className="bg-brand-mint px-2.5 py-1 rounded-md">Debit/Credit Card</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-mint/60 gap-4">
          <p>© {new Date().getFullYear()} Pharma Zone Pakistan. Licensed by DRAP under Drug Act 1976.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white">Terms of Sale</a>
            <span>•</span>
            <a href="#" className="hover:text-white">Prescription Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
