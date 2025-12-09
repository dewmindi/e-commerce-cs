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
  features?: any[];
  is_active?: boolean;
  popular?: boolean;
};

export type Product = {
  id: string;           // mapped from package._id
  subcategoryId: string; // mapped from package.subcategory_id
  name: string;
  price: number;
  inStock: number;      // defaulted if not provided by DB
  overview?: string;
  features?: {
    title: string;
    items: {
      text: string;
      highlight: boolean;
    }[];
  }[];

};

export type PackageCategory = string; // category _id

export type SelectedProduct = {
  category: PackageCategory;
  productId: string;
  productName: string;
  price: number;
};