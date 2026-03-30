export type Category = {
  _id: string;
  name: string;
  description?: string;
};

export type Subcategory = {
  _id: string;
  category_id: string;
  name: string;
  description?: string;
};

export type PackageFromDB = {
  _id: string;
  subcategory_id: string;
  name: string;
  price: number;
  overview?: string;
  ui_features?: string[];
  quotation?: QuotationData;
  features?: any[];
  is_active?: boolean;
  popular?: boolean;
};

export type QuotationSummaryItem = {
  title: string;
  description?: string;
  amount: number;
  optional?: boolean;
};

export type QuotationSummary = {
  items?: QuotationSummaryItem[];
  total_label?: string;
  total_amount?: number;
  note?: string;
};

export type QuotationTimeline = {
  week: string;
  tasks: string;
};

export type QuotationPayment = {
  label: string;
  amount: number;
};

export type QuotationFinalTotal = {
  label?: string;
  amount?: number;
};

export type QuotationData = {
  summary?: QuotationSummary;
  deliverables?: string[];
  timeline?: QuotationTimeline[];
  payment_schedule?: QuotationPayment[];
  exclusions?: string[];
  // final_total?: QuotationFinalTotal;
};

export type Product = {
  id: string;           // mapped from package._id
  subcategoryId: string; // mapped from package.subcategory_id
  name: string;
  price: number;
  inStock: number;      // defaulted if not provided by DB
  overview?: string;
  uiFeatures: string[];
  quotation?: QuotationData;

};

export type PackageCategory = string; // category _id

// export type SelectedProduct = {
//   category: PackageCategory;
//   productId: string;
//   productName: string;
//   price: number;
// };

export interface SelectedProduct {
  categoryId: PackageCategory;     // Brand Identity
  subcategoryId: string;           // Logo Design / Business Card
  subcategoryName: string;
  productId: string;
  productName: string;
  price: number;
  uiFeatures: string[];
  quotation?: QuotationData;
}
