// "use client";

import QuoteBuilderClient from "./quote-builder-client";

// import Header from "@/components/Header";
// import React, { useEffect, useMemo, useState } from "react";
// import { Product, SelectedProduct, PackageCategory, Category, PackageFromDB, Subcategory } from "@/types/quoate";


// import QuoteButtons from "@/components/Quoatation/quote-buttons";
// import PackagesSidebar from "@/components/Quoatation/packages-side-bar";
// import PackageDetailArea from "@/components/Quoatation/package-detials-area";
// import SummaryCard from "@/components/Quoatation/summary-card";

// function mapPackageToProduct(p: PackageFromDB): Product {
//   return {
//     id: p._id,
//     subcategoryId: p.subcategory_id,
//     name: p.name,
//     price: typeof p.price === "number" ? p.price : Number(p.price) || 0,
//     inStock: 1, // default because DB doesn't have stock field; change if you add it
//     overview: p.overview,
//     features: p.features || [],
//   };
// }

// const QuoteBuilder: React.FC = () => {
//   // Data
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);

//   // Selections
//   const [selectedCategory, setSelectedCategory] = useState<PackageCategory | null>(null);
//   const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>(null);
//   const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);

//   // Loading / errors
//   const [loadingCategories, setLoadingCategories] = useState(false);
//   const [loadingSubcategories, setLoadingSubcategories] = useState(false);
//   const [loadingPackages, setLoadingPackages] = useState(false);
//   const [packagesError, setPackagesError] = useState<string | null>(null);

//   // Load categories on mount
//   useEffect(() => {
//     let mounted = true;
//     async function loadCategories() {
//       setLoadingCategories(true);
//       try {
//         const res = await fetch("/api/categories");
//         if (!res.ok) throw new Error(`Failed to load categories: ${res.status}`);
//         const data: Category[] = await res.json();
//         if (!mounted) return;
//         setCategories(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         if (mounted) setLoadingCategories(false);
//       }
//     }


//     loadCategories();
//     return () => { mounted = false; };
//   }, []);

//   // When selectedCategory changes: load its subcategories
//   useEffect(() => {
//     let mounted = true;
//     async function loadSubcategories() {
//       setSubcategories([]);
//       setProducts([]);
//       setSelectedSubcategoryId(null);
//       if (!selectedCategory) return;

//       setLoadingSubcategories(true);
//       try {
//         const res = await fetch(`/api/subcategories?category_id=${encodeURIComponent(selectedCategory)}`);
//         if (!res.ok) throw new Error(`Failed to load subcategories: ${res.status}`);
//         const data: Subcategory[] = await res.json();
//         if (!mounted) return;
//         setSubcategories(data);

//         // Auto-select first subcategory if present
//         if (data.length > 0) {
//           setSelectedSubcategoryId(data[0]._id);
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         if (mounted) setLoadingSubcategories(false);
//       }
//     }
//     loadSubcategories();
//     return () => { mounted = false; };
//   }, [selectedCategory]);

//   // When selectedSubcategoryId changes: load packages for that subcategory
//   useEffect(() => {
//     let mounted = true;
//     async function loadPackages() {
//       setProducts([]);
//       setPackagesError(null);
//       if (!selectedSubcategoryId) return;

//       setLoadingPackages(true);
//       try {
//         const res = await fetch(`/api/packages?subcategory_id=${encodeURIComponent(selectedSubcategoryId)}`);
//         if (!res.ok) throw new Error(`Failed to load packages: ${res.status}`);
//         const data: PackageFromDB[] = await res.json();
//         if (!mounted) return;

//         const mapped = data.map(mapPackageToProduct);
//         setProducts(mapped);
//       } catch (err: any) {
//         console.error(err);
//         if (mounted) setPackagesError(err.message || "Failed to load packages");
//       } finally {
//         if (mounted) setLoadingPackages(false);
//       }
//     }
//     loadPackages();
//     return () => { mounted = false; };
//   }, [selectedSubcategoryId]);

//   // Selection handlers
//   const selectProduct = (product: Product) => {
//     if (!selectedCategory) return;

//     const subcategory = subcategories.find(
//       (sub) => sub._id === product.subcategoryId
//     );

//     if (!subcategory) return;

//     const newSelection: SelectedProduct = {
//       categoryId: selectedCategory,
//       subcategoryId: subcategory._id,
//       subcategoryName: subcategory.name,
//       productId: product.id,
//       productName: product.name,
//       price: product.price,
//       features: product.features,
//     };

//     setSelectedProducts((prev) => {
//       const filtered = prev.filter(
//         (p) => p.subcategoryId !== subcategory._id
//       );
//       return [...filtered, newSelection];
//     });
//   };


//   const removeSelectedProduct = (subcategoryId: string) => {
//     setSelectedProducts((prev) =>
//       prev.filter((p) => p.subcategoryId !== subcategoryId)
//     );
//   };


//   const totalPrice = useMemo(() => {
//     return selectedProducts.reduce((sum, p) => sum + p.price, 0);
//   }, [selectedProducts]);

//   return (
//     <div className="min-h-screen bg-foreground px-4 py-6 md:p-8">
//       <Header />
//       <div className="mt-16 lg:mt-24 flex flex-col lg:flex-row lg:items-start gap-6">

//         {/* LEFT: CATEGORIES (Sidebar) */}
//         <div className="w-full lg:w-1/4 shrink-0">
//           <PackagesSidebar
//             categories={categories}
//             selectedCategory={selectedCategory}
//             setSelectedCategory={(cat) => setSelectedCategory(cat)}
//             selectedProducts={selectedProducts}
//             removeSelectedProduct={removeSelectedProduct}
//           />
//         </div>

//         {/* MIDDLE: PRODUCTS (Detail Area) */}
//         <div className="flex-1 min-w-0 min-h-[400px]">
//           <PackageDetailArea
//             selectedCategory={selectedCategory}
//             products={products}
//             subcategories={subcategories}
//             selectedSubcategoryId={selectedSubcategoryId}
//             setSelectedSubcategoryId={setSelectedSubcategoryId}
//             selectProduct={selectProduct}
//             selectedProducts={selectedProducts}
//             loadingPackages={loadingPackages}
//             packagesError={packagesError}
//           />
//         </div>

//         <div className="w-full lg:w-80 xl:w-96">
//           <SummaryCard
//             selectedProducts={selectedProducts}
//             onCheckout={() => console.log("Checkout clicked!")}
//           />
//         </div>
//       </div>

//       {/* FIXED FOOTER BUTTONS */}
//       <QuoteButtons
//         totalPrice={totalPrice}
//         selectedProducts={selectedProducts}
//       />
//     </div>
//   );
// };

// export default QuoteBuilder;



import { Category, PackageFromDB, Subcategory } from "@/types/quoate";
import clientPromise from "@/lib/mongodb";

export const revalidate = 300;

async function getQuoteData() {
  const client = await clientPromise;
  const db = client.db("cs-ecommerce");

  const [categories, subcategories, packages] = await Promise.all([
    db.collection("categories").find({}).toArray() as unknown as Promise<Category[]>,
    db.collection("subcategories").find({}).toArray() as unknown as Promise<Subcategory[]>,
    db.collection("packages").find({}).toArray() as unknown as Promise<PackageFromDB[]>,
  ]);

  return { categories, subcategories, packages };
}

export default async function Page() {
  const data = await getQuoteData();

  return <QuoteBuilderClient {...data} />;
}