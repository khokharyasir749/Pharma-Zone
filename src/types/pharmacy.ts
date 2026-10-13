export type DosageForm =
  | "Tablet"
  | "Capsule"
  | "Syrup"
  | "Suspension"
  | "Injection"
  | "Drops"
  | "Ointment"
  | "Sachet"
  | "Effervescent Tablet";

export type PrescriptionStatus =
  | "pending"
  | "verifying"
  | "approved"
  | "dispatched"
  | "delivered"
  | "cancelled";

export type PakistanCity =
  | "Karachi"
  | "Lahore"
  | "Islamabad"
  | "Rawalpindi"
  | "Faisalabad"
  | "Multan"
  | "Peshawar"
  | "Quetta"
  | "Sialkot"
  | "Gujranwala"
  | "Hyderabad"
  | "Abbottabad";

export interface Medicine {
  id: string;
  name: string;
  genericFormula: string;
  brand: string; // manufacturer / brand name e.g. GSK, Abbott, Getz Pharma
  pricePKR: number;
  oldPricePKR?: number;
  discountPercent?: number;
  category: string;
  dosageForm: DosageForm;
  requiresPrescription: boolean;
  inStock: boolean;
  image: string;
  rating: number;
  reviewsCount: number;
  description?: string;
  packSize?: string;
  strength?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string; // Lucide icon identifier or SVG name
  itemCount?: number;
  description?: string;
}

export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

export interface PrescriptionOrder {
  id: string;
  patientName: string;
  phone: string;
  city: PakistanCity | string;
  notes?: string;
  fileUrl: string;
  status: PrescriptionStatus;
  createdAt?: string;
}

export interface PharmacyFilterState {
  searchQuery: string;
  selectedCategory: string | null;
  requiresPrescriptionOnly: boolean;
  inStockOnly: boolean;
  sortBy: "popular" | "price-asc" | "price-desc" | "rating";
}
