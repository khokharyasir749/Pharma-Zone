"use client";

import React, { useState, useRef } from "react";
import {
  X,
  UploadCloud,
  FileCheck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Phone,
  User,
  MapPin,
  Home,
  MessageCircle,
  Copy,
  Check,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { usePharmacy } from "@/context/PharmacyContext";
import { PAKISTAN_CITIES } from "@/data/medicines";
import { Button } from "@/components/ui/Button";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export function PrescriptionUploadModal() {
  const {
    isPrescriptionModalOpen,
    setIsPrescriptionModalOpen,
    selectedCity,
    setSelectedCity,
  } = usePharmacy();

  const [patientName, setPatientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [copiedTracking, setCopiedTracking] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isPrescriptionModalOpen) return null;

  const validatePakistaniPhone = (num: string): boolean => {
    // Clean string of spaces and dashes
    const cleaned = num.replace(/[\s-]/g, "");
    // Valid formats: +923XXXXXXXXX, 03XXXXXXXXX, 3XXXXXXXXX
    const regex = /^(\+923\d{9}|03\d{9}|3\d{9})$/;
    return regex.test(cleaned);
  };

  const handleFileProcess = (selectedFile: File) => {
    setFileError(null);
    const validTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!validTypes.includes(selectedFile.type)) {
      setFileError("Please upload a valid image (JPG, PNG) or PDF document.");
      return;
    }
    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      setFileError("File size exceeds 10MB limit. Please upload a compressed photo or PDF.");
      return;
    }
    setFile(selectedFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setFileError("Please attach your doctor prescription slip or hospital memo.");
      return;
    }

    if (!validatePakistaniPhone(phoneNumber)) {
      setPhoneError("Enter a valid Pakistani mobile number (e.g. 0300-1234567 or 3280790704).");
      return;
    }
    setPhoneError(null);
    setLoading(true);

    setTimeout(() => {
      // Generate simulated Pakistani Prescription tracking ID e.g. PZ-RX-8492
      const randomDigits = Math.floor(1000 + Math.random() * 9000);
      const generatedId = `PZ-RX-${randomDigits}`;
      setTrackingId(generatedId);
      setLoading(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleCopyTracking = () => {
    navigator.clipboard?.writeText(trackingId);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  const handleClose = () => {
    setIsPrescriptionModalOpen(false);
    setIsSubmitted(false);
    setFile(null);
    setFileError(null);
    setPhoneError(null);
  };

  // WhatsApp prefilled message
  const whatsAppMessage = encodeURIComponent(
    `Hello PharmaZone, I have submitted my prescription slip.\nTracking ID: ${trackingId}\nPatient Name: ${patientName || "Customer"}\nPhone: ${phoneNumber}\nCity: ${selectedCity}\nAddress: ${deliveryAddress || "N/A"}\nNotes: ${notes || "None"}`
  );
  const whatsAppUrl = `https://wa.me/923280790704?text=${whatsAppMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#084236] text-white p-5 sm:p-6 relative shrink-0">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-[#A7F3D0] text-xs font-bold tracking-wider uppercase mb-1">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            100% DRAP-Verified Pharmacy Protocol
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-display text-white">
            Upload Doctor's Prescription
          </h2>
          <p className="text-[#EAF3EE]/80 text-xs mt-1">
            Our qualified Pharm-D specialist in <strong className="text-white">{selectedCity}</strong> will verify dosage and dispatch your order.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {isSubmitted ? (
            /* Submission Success Screen */
            <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#059669] bg-[#EAF3EE] px-3 py-1 rounded-full border border-[#084236]/15">
                  Verified Order Ticket
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2 font-display">
                  Prescription Received!
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto mt-1 leading-relaxed">
                  Thank you, <strong className="text-[#084236]">{patientName || "Valued Customer"}</strong>. Our registered clinical pharmacist has received your slip and is calculating your medicine dosage and strip counts.
                </p>
              </div>

              {/* Simulated Tracking ID Box */}
              <div className="bg-[#F6F9F7] rounded-2xl p-4 border border-slate-200 max-w-sm mx-auto">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Your Prescription Tracking ID
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl font-black tracking-widest text-[#084236] font-mono">
                    {trackingId}
                  </span>
                  <button
                    onClick={handleCopyTracking}
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 transition-colors"
                    title="Copy Tracking ID"
                  >
                    {copiedTracking ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  Expected Call / WhatsApp Dispatch: <strong className="text-[#084236]">within 15 mins</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2 max-w-sm mx-auto">
                {/* Direct WhatsApp Send CTA */}
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm py-3.5 px-5 rounded-2xl shadow-lg shadow-emerald-600/25 transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send Slip on WhatsApp (0328-0790704)</span>
                </a>

                <button
                  onClick={handleClose}
                  className="w-full bg-[#EAF3EE] hover:bg-[#dceeea] text-[#084236] font-bold text-xs py-3 px-4 rounded-2xl transition-all"
                >
                  Done & Return to Store
                </button>
              </div>
            </div>
          ) : (
            /* Prescription Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Drag and Drop File Upload Zone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Upload Doctor's Slip or Discharge Memo *
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-5 text-center transition-all cursor-pointer relative ${
                    isDragging
                      ? "border-[#10B981] bg-[#EAF3EE]"
                      : file
                      ? "border-emerald-500/50 bg-[#F6F9F7]"
                      : "border-slate-300 bg-slate-50 hover:bg-[#EAF3EE]/60 hover:border-[#084236]/40"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="prescription-file-input"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center">
                    <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center text-[#084236] mb-2 shadow-xs border border-slate-200">
                      {file ? (
                        <FileCheck className="w-6 h-6 text-emerald-600" />
                      ) : (
                        <UploadCloud className="w-6 h-6 text-[#084236]" />
                      )}
                    </div>
                    {file ? (
                      <div>
                        <p className="text-xs font-bold text-[#084236] line-clamp-1">{file.name}</p>
                        <p className="text-[10px] text-slate-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB • Click or drop to replace
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs font-bold text-slate-800">
                          Click to upload or drag & drop prescription
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          JPG, PNG or PDF from clinic or hospital (Max 10MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {fileError && (
                  <p className="text-xs text-rose-500 font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{fileError}</span>
                  </p>
                )}
              </div>

              {/* Patient Information Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Patient Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq Mehmood"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#084236]/20 focus:border-[#084236]"
                    />
                  </div>
                </div>

                {/* Phone Number with +92 prefix */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp / Mobile Number *
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-xs font-bold text-slate-500 pointer-events-none">
                      +92
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="300-1234567"
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        if (phoneError) setPhoneError(null);
                      }}
                      className="w-full pl-11 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#084236]/20 focus:border-[#084236]"
                    />
                  </div>
                  {phoneError && (
                    <p className="text-[11px] text-rose-500 font-semibold mt-0.5">{phoneError}</p>
                  )}
                </div>
              </div>

              {/* City & Delivery Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    City for Express Delivery *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value as any)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#084236]/20 focus:border-[#084236]"
                    >
                      {PAKISTAN_CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Delivery Address *
                  </label>
                  <div className="relative">
                    <Home className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="House/Flat #, Street, Sector/Area"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#084236]/20 focus:border-[#084236]"
                    />
                  </div>
                </div>
              </div>

              {/* Special Instructions for Pharmacist */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Special Instructions for Clinical Pharmacist (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Need 10-day dosage only, generic substitute acceptable"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#084236]/20 focus:border-[#084236]"
                />
              </div>

              {/* Guarantee Bar */}
              <div className="bg-[#EAF3EE] rounded-2xl p-3 flex items-center justify-between text-[11px] text-[#084236]">
                <span className="flex items-center gap-1.5 font-bold">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" /> Free Pharmacist Call within 15 mins
                </span>
                <span className="font-semibold text-slate-600">Free Doorstep Delivery</span>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <Button type="button" variant="ghost" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? "Transmitting Prescription..." : "Submit Prescription Slip"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
