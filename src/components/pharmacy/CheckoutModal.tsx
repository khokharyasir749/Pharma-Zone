"use client";

import React, { useState } from "react";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Phone,
  User,
  MapPin,
  Home,
  CreditCard,
  Banknote,
  Smartphone,
  Copy,
  Check,
  AlertCircle,
  Truck,
  MessageCircle,
  Mail,
  ArrowRight,
  PackageCheck,
} from "lucide-react";
import { usePharmacy } from "@/context/PharmacyContext";
import { PAKISTAN_CITIES } from "@/data/medicines";
import { Button } from "@/components/ui/Button";

const FREE_DELIVERY_THRESHOLD = 1500;
const STANDARD_DELIVERY_FEE = 150;

export function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    cartSavings,
    clearCart,
    selectedCity,
    setSelectedCity,
  } = usePharmacy();

  // Form State
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [areaSector, setAreaSector] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "jazzcash_easypaisa" | "card">("cod");

  // JazzCash / EasyPaisa Transaction ID
  const [transactionId, setTransactionId] = useState("");
  const [copiedAccount, setCopiedAccount] = useState(false);

  // Card fields
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Validation & Processing
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState("");
  const [copiedOrder, setCopiedOrder] = useState(false);

  if (!isCheckoutOpen) return null;

  const isFreeDelivery = cartTotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = isFreeDelivery ? 0 : STANDARD_DELIVERY_FEE;
  const finalTotal = cartTotal + deliveryFee;

  const validatePakistaniPhone = (num: string): boolean => {
    const cleaned = num.replace(/[\s-]/g, "");
    return /^(\+923\d{9}|03\d{9}|3\d{9})$/.test(cleaned);
  };

  const handleCopyAccount = () => {
    navigator.clipboard?.writeText("03280790704");
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleCopyOrderNumber = () => {
    navigator.clipboard?.writeText(confirmedOrderNumber);
    setCopiedOrder(true);
    setTimeout(() => setCopiedOrder(false), 2000);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePakistaniPhone(phoneNumber)) {
      setPhoneError("Please enter a valid Pakistani mobile number (e.g. 0328-0790704).");
      return;
    }
    setPhoneError(null);

    setIsProcessing(true);

    setTimeout(() => {
      const generatedOrderNum = `PZ-PK-${Math.floor(10000 + Math.random() * 90000)}`;
      setConfirmedOrderNumber(generatedOrderNum);
      clearCart();
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1400);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setIsSuccess(false);
    setPhoneError(null);
  };

  const whatsAppTrackingUrl = `https://wa.me/923280790704?text=${encodeURIComponent(
    `Hello PharmaZone, I have placed order ${confirmedOrderNumber} for PKR ${finalTotal.toLocaleString()} in ${selectedCity}.\nPatient: ${fullName}\nAddress: ${streetAddress}, ${areaSector}, ${selectedCity}.`
  )}`;

  const emailSupportUrl = `mailto:khokharyasir749@gmail.com?subject=${encodeURIComponent(
    `Order Confirmation Inquiry - ${confirmedOrderNumber}`
  )}&body=${encodeURIComponent(
    `Hello PharmaZone,\n\nI have placed order ${confirmedOrderNumber} for PKR ${finalTotal.toLocaleString()}.\nPlease confirm delivery status for ${selectedCity}.\n\nPatient: ${fullName}\nPhone: ${phoneNumber}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#084236] text-white p-5 sm:p-6 relative shrink-0">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close Checkout"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-[#A7F3D0] text-xs font-bold tracking-wider uppercase mb-1">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            Secure DRAP Cold-Chain Delivery Checkout
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-display text-white">
            Checkout & Shipping Details
          </h2>
          <p className="text-[#EAF3EE]/80 text-xs mt-1">
            Fast doorstep dispatch across <strong className="text-white">{selectedCity}</strong> and nationwide Pakistan.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {isSuccess ? (
            /* Order Success Screen */
            <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#059669] bg-[#EAF3EE] px-3.5 py-1 rounded-full border border-[#084236]/15">
                  Order Confirmed
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2 font-display">
                  Thank You for Your Order!
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto mt-1 leading-relaxed">
                  Your order has been routed to our licensed pharmacist hub in{" "}
                  <strong className="text-[#084236]">{selectedCity}</strong>. Your medicines are packed in temperature-monitored cold-boxes for delivery.
                </p>
              </div>

              {/* Order Number & Estimated Time */}
              <div className="bg-[#F6F9F7] rounded-2xl p-4 border border-slate-200 max-w-md mx-auto text-left space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase">Order Number</span>
                  <div className="flex items-center gap-1.5 font-mono font-black text-[#084236] text-sm">
                    <span>{confirmedOrderNumber}</span>
                    <button
                      onClick={handleCopyOrderNumber}
                      className="p-1 rounded hover:bg-slate-200 text-slate-500 transition-colors"
                      title="Copy Order ID"
                    >
                      {copiedOrder ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Clock className="w-4 h-4 text-emerald-600" /> Estimated Delivery:
                  </span>
                  <span className="font-bold text-slate-800">
                    {["Karachi", "Lahore", "Islamabad"].includes(selectedCity)
                      ? "Within 2 Hours (City Express)"
                      : "Within 24-48 Hours (Standard Courier)"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Banknote className="w-4 h-4 text-emerald-600" /> Payment Status:
                  </span>
                  <span className="font-bold text-slate-800">
                    {paymentMethod === "cod"
                      ? "Cash on Delivery (Pending Rider)"
                      : paymentMethod === "jazzcash_easypaisa"
                      ? `JazzCash/EasyPaisa (TID: ${transactionId || "Verifying"})`
                      : "Card Payment Authorized"}
                  </span>
                </div>
              </div>

              {/* Instant WhatsApp & Email Support Buttons */}
              <div className="space-y-3 pt-2 max-w-md mx-auto">
                <a
                  href={whatsAppTrackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm py-3.5 px-5 rounded-2xl shadow-lg shadow-emerald-600/25 transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Receive Live Updates on WhatsApp (0328-0790704)</span>
                </a>

                <a
                  href={emailSupportUrl}
                  className="w-full flex items-center justify-center gap-2 bg-[#EAF3EE] hover:bg-[#dceeea] text-[#084236] font-bold text-xs py-3 px-4 rounded-2xl transition-all"
                >
                  <Mail className="w-4 h-4 text-[#084236]" />
                  <span>Email Confirmation to khokharyasir749@gmail.com</span>
                </a>

                <button
                  onClick={handleClose}
                  className="w-full border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs py-2.5 px-4 rounded-2xl transition-all"
                >
                  Return to Home
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="space-y-5">
              {/* Order Price Summary Header */}
              <div className="bg-[#EAF3EE] rounded-2xl p-4 border border-[#084236]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-bold text-[#084236]">Order Total Breakdown</div>
                  <div className="text-[11px] text-slate-600">
                    Subtotal: PKR {cartTotal.toLocaleString()} • Delivery:{" "}
                    {isFreeDelivery ? (
                      <span className="font-bold text-emerald-700 uppercase">FREE</span>
                    ) : (
                      `PKR ${deliveryFee}`
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Total Payable</span>
                  <span className="text-xl font-black text-[#084236] font-display">
                    PKR {finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* 1. Contact & Recipient Info */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#084236]" /> 1. Recipient Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Yasir Khokhar"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#084236]/20 focus:border-[#084236]"
                    />
                  </div>

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
                        placeholder="328-0790704"
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
              </div>

              {/* 2. Shipping Address */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
                  <Home className="w-4 h-4 text-[#084236]" /> 2. Shipping & Delivery Address
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      City *
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#084236]/20 focus:border-[#084236]"
                    >
                      {PAKISTAN_CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Area / Town / Sector *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. DHA Phase 5, Gulberg III, Clifton Block 4"
                      value={areaSector}
                      onChange={(e) => setAreaSector(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#084236]/20 focus:border-[#084236]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      House / Flat & Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="House # 12, Street 4, Block B"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#084236]/20 focus:border-[#084236]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Delivery Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Near Masjid, call rider upon arrival"
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#084236]/20 focus:border-[#084236]"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Pakistani Payment Method Selection */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
                  <Banknote className="w-4 h-4 text-[#084236]" /> 3. Payment Method
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Cash on Delivery */}
                  <label
                    className={`relative p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      paymentMethod === "cod"
                        ? "border-[#084236] bg-[#EAF3EE] shadow-2xs"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="text-[#084236] focus:ring-[#084236]"
                      />
                      <Banknote className="w-4 h-4 text-[#084236]" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900">Cash on Delivery</div>
                      <div className="text-[10px] text-emerald-700 font-semibold mt-0.5 flex items-center gap-1">
                        <PackageCheck className="w-3 h-3" /> Open-Parcel Verified
                      </div>
                    </div>
                  </label>

                  {/* JazzCash / EasyPaisa */}
                  <label
                    className={`relative p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      paymentMethod === "jazzcash_easypaisa"
                        ? "border-[#084236] bg-[#EAF3EE] shadow-2xs"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <input
                        type="radio"
                        name="payment"
                        value="jazzcash_easypaisa"
                        checked={paymentMethod === "jazzcash_easypaisa"}
                        onChange={() => setPaymentMethod("jazzcash_easypaisa")}
                        className="text-[#084236] focus:ring-[#084236]"
                      />
                      <Smartphone className="w-4 h-4 text-[#084236]" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900">JazzCash / EasyPaisa</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Direct Mobile Wallet</div>
                    </div>
                  </label>

                  {/* Credit / Debit Card */}
                  <label
                    className={`relative p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      paymentMethod === "card"
                        ? "border-[#084236] bg-[#EAF3EE] shadow-2xs"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="text-[#084236] focus:ring-[#084236]"
                      />
                      <CreditCard className="w-4 h-4 text-[#084236]" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900">Debit / Credit Card</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">3D Secure Online</div>
                    </div>
                  </label>
                </div>

                {/* Specific details based on Payment Method */}
                {paymentMethod === "cod" && (
                  <div className="mt-3 bg-emerald-50/80 border border-emerald-200 rounded-2xl p-3 text-xs text-slate-700 flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed text-[11px]">
                      <strong>Open-Parcel Policy:</strong> You have the right to inspect your order package and verify the sealed cold-chain integrity before handing payment to the rider.
                    </p>
                  </div>
                )}

                {paymentMethod === "jazzcash_easypaisa" && (
                  <div className="mt-3 bg-white border border-slate-200 rounded-2xl p-3.5 text-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 text-[11px]">Account / Till Number:</span>
                      <div className="flex items-center gap-1.5">
                        <strong className="text-slate-900 font-mono">03280790704</strong>
                        <button
                          type="button"
                          onClick={handleCopyAccount}
                          className="p-1 rounded hover:bg-slate-100 text-slate-500"
                          title="Copy Account Number"
                        >
                          {copiedAccount ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 text-[11px]">Account Title:</span>
                      <strong className="text-slate-900">Pharma Zone Official (Yasir Khokhar)</strong>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Enter 6-Digit Transaction ID (TID) from SMS:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 984210"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#084236]/20 font-mono"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="mt-3 bg-white border border-slate-200 rounded-2xl p-3.5 space-y-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="4214 •••• •••• ••••"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#084236]/20 font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Expiry (MM/YY)
                        </label>
                        <input
                          type="text"
                          placeholder="12/28"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#084236]/20 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          placeholder="•••"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#084236]/20 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <Button type="button" variant="ghost" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={isProcessing}>
                  {isProcessing
                    ? "Dispatching Order..."
                    : `Confirm Order (PKR ${finalTotal.toLocaleString()})`}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
