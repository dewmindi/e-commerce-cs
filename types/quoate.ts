// // types.ts
// export type PackageCategory =
//   | 'PROCESSORS'
//   | 'MOTHERBOARDS'
//   | 'RAM'
//   | 'PRIMARY_STORAGE'
//   | 'SECONDARY_STORAGE'
//   | 'GPU'
//   | 'POWER_SUPPLY'
//   | 'COOLER'
//   | 'PC_CASE'
//   | 'CASE_FANS'
//   | 'MONITORS';

// export interface Product {
//   id: number;
//   name: string;
//   price: number; // LKR
//   category: PackageCategory;
//   inStock: number;
// }

// export interface SelectedProduct {
//   category: PackageCategory;
//   productId: number;
//   productName: string;
//   price: number;
// }

// // Map for display names
// export const CategoryDisplayNames: Record<PackageCategory, string> = {
//   PROCESSORS: 'Processors',
//   MOTHERBOARDS: 'Motherboards',
//   RAM: 'RAM (Memory)',
//   PRIMARY_STORAGE: 'PRIMARY Storage',
//   SECONDARY_STORAGE: 'SECONDARY Storage',
//   GPU: 'GPU (Graphics Card)',
//   POWER_SUPPLY: 'Power Supply',
//   COOLER: 'Cooler',
//   PC_CASE: 'PC Case',
//   CASE_FANS: 'Case Fans',
//   MONITORS: 'Monitors',
// };

// // Dummy Products Data
// export const DUMMY_PRODUCTS: Product[] = [
//   // Processors
//   {
//     id: 1,
//     name: 'USED - INTEL I7 8700 8TH GEN PROCESSOR',
//     price: 27000,
//     category: 'PROCESSORS',
//     inStock: 1,
//   },
//   {
//     id: 2,
//     name: 'USED - INTEL CORE I5 - 10400F PROCESSOR',
//     price: 26000,
//     category: 'PROCESSORS',
//     inStock: 1,
//   },
//   {
//     id: 3,
//     name: 'USED - INTEL CORE I3 - 7100 PROCESSOR',
//     price: 8000,
//     category: 'PROCESSORS',
//     inStock: 1,
//   },
//   {
//     id: 4,
//     name: 'USED - INTEL CORE I5 - 9500 PROCESSOR',
//     price: 22000,
//     category: 'PROCESSORS',
//     inStock: 2,
//   },
//   {
//     id: 5,
//     name: 'USED - AMD RYZEN 5 3600 PROCESSOR (TRAY)',
//     price: 21000,
//     category: 'PROCESSORS',
//     inStock: 0,
//   },
//   // Motherboards (Example for other categories)
//   {
//     id: 101,
//     name: 'ASUS B450 PRIME',
//     price: 15000,
//     category: 'MOTHERBOARDS',
//     inStock: 3,
//   },
//   {
//     id: 102,
//     name: 'GIGABYTE H610M',
//     price: 18500,
//     category: 'MOTHERBOARDS',
//     inStock: 1,
//   },
// ];

// // List of categories to display in the sidebar
// export const CATEGORY_ORDER: PackageCategory[] = [
//   'PROCESSORS',
//   'MOTHERBOARDS',
//   'RAM',
//   'PRIMARY_STORAGE',
//   'SECONDARY_STORAGE',
//   'GPU',
//   'POWER_SUPPLY',
//   'COOLER',
//   'PC_CASE',
//   'CASE_FANS',
//   'MONITORS',
// ];

// // 1. Packages Side Bar Component
// export interface PackagesSidebarProps {
//     selectedCategory: PackageCategory | null;
//     setSelectedCategory: (category: PackageCategory) => void;
//     selectedProducts: SelectedProduct[];
//     removeSelectedProduct: (category: PackageCategory) => void;
// }

//  // 2. Package Detail Area Component
// export interface PackageDetailAreaProps {
//     selectedCategory: PackageCategory | null;
//     products: Product[];
//     selectProduct: (product: Product) => void;
//     selectedProducts: SelectedProduct[];
// }

//  // 3. Buttons Component
// export interface ButtonsProps {
//     totalPrice: number;
// }


export interface Category {
  _id: string; // "web_dev"
  name: string;
  description: string;
}

export interface Subcategory {
  _id: string;
  category_id: string; // FK → categories._id
  name: string;
  description: string;
}

export interface Package {
  _id: string; 
  subcategory_id: string; // FK → subcategories._id
  name: string;
  price: number;
  overview: string;
  features: any[];
  is_active: boolean;
  popular: boolean;
}

export interface Product {
  id: string;         // mapped from package._id
  category: string;   // mapped from CATEGORY → user click
  name: string;
  price: number;
  inStock: number;    // your DB has no stock → default to 1
}
