import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { PharmacyProvider } from "@/context/PharmacyContext";
import { CartDrawer } from "@/components/pharmacy/CartDrawer";
import { PrescriptionUploadModal } from "@/components/pharmacy/PrescriptionUploadModal";
import { CheckoutModal } from "@/components/pharmacy/CheckoutModal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pharma Zone | Pakistan's Trusted Online Medicine & Healthcare Store",
  description:
    "Order 100% genuine DRAP-certified prescription medicines, OTC relief, and vitamins in Pakistan. Fast home delivery in Karachi, Lahore, Islamabad, and nationwide.",
  keywords: [
    "Online Pharmacy Pakistan",
    "Medicine Delivery Karachi",
    "Panadol Extra",
    "Augmentin 625mg",
    "Risek 20mg",
    "Surbex-Z",
    "Brufen",
    "DRAP Licensed Pharmacy",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="font-sans bg-[#F6F8F6] text-slate-900 min-h-screen flex flex-col antialiased">
        <PharmacyProvider>
          {children}
          <CartDrawer />
          <PrescriptionUploadModal />
          <CheckoutModal />
        </PharmacyProvider>
      </body>
    </html>
  );
}
