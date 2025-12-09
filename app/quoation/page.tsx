"use client";

import Header from "@/components/Header";
import React, { useEffect, useMemo, useState } from "react";
import { Product, SelectedProduct,PackageCategory, Category, PackageFromDB,Subcategory } from "@/types/quoate";


import QuoteButtons from "@/components/Quoatation/quote-buttons";
import PackagesSidebar from "@/components/Quoatation/packages-side-bar";
import PackageDetailArea from "@/components/Quoatation/package-detials-area";

function mapPackageToProduct(p: PackageFromDB): Product {
  return {
    id: p._id,
    subcategoryId: p.subcategory_id,
    name: p.name,
    price: typeof p.price === "number" ? p.price : Number(p.price) || 0,
    inStock: 1, // default because DB doesn't have stock field; change if you add it
    overview: p.overview,
    features: p.features || [],
  };
}
/**
 * Main PCBuilder Component
 */
const PCBuilder: React.FC = () => {
  // Data
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // Selections
  const [selectedCategory, setSelectedCategory] = useState<PackageCategory | null>(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);

  // Loading / errors
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);
  const [loadingPackages, setLoadingPackages] = useState(false);
  const [packagesError, setPackagesError] = useState<string | null>(null);

  // Load categories on mount
  useEffect(() => {
    let mounted = true;
    async function loadCategories() {
      setLoadingCategories(true);
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error(`Failed to load categories: ${res.status}`);
        const data: Category[] = await res.json();
        if (!mounted) return;
        setCategories(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoadingCategories(false);
      }
    }

    
    loadCategories();
    return () => { mounted = false; };
  }, []);

  // When selectedCategory changes: load its subcategories
  useEffect(() => {
    let mounted = true;
    async function loadSubcategories() {
      setSubcategories([]);
      setProducts([]);
      setSelectedSubcategoryId(null);
      if (!selectedCategory) return;

      setLoadingSubcategories(true);
      try {
        const res = await fetch(`/api/subcategories?category_id=${encodeURIComponent(selectedCategory)}`);
        if (!res.ok) throw new Error(`Failed to load subcategories: ${res.status}`);
        const data: Subcategory[] = await res.json();
        if (!mounted) return;
        setSubcategories(data);

        // Auto-select first subcategory if present
        if (data.length > 0) {
          setSelectedSubcategoryId(data[0]._id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoadingSubcategories(false);
      }
    }
    loadSubcategories();
    return () => { mounted = false; };
  }, [selectedCategory]);

  // When selectedSubcategoryId changes: load packages for that subcategory
  useEffect(() => {
    let mounted = true;
    async function loadPackages() {
      setProducts([]);
      setPackagesError(null);
      if (!selectedSubcategoryId) return;

      setLoadingPackages(true);
      try {
        const res = await fetch(`/api/packages?subcategory_id=${encodeURIComponent(selectedSubcategoryId)}`);
        if (!res.ok) throw new Error(`Failed to load packages: ${res.status}`);
        const data: PackageFromDB[] = await res.json();
        if (!mounted) return;

        const mapped = data.map(mapPackageToProduct);
        setProducts(mapped);
      } catch (err: any) {
        console.error(err);
        if (mounted) setPackagesError(err.message || "Failed to load packages");
      } finally {
        if (mounted) setLoadingPackages(false);
      }
    }
    loadPackages();
    return () => { mounted = false; };
  }, [selectedSubcategoryId]);

  // Selection handlers
  const selectProduct = (product: Product) => {
    if (!selectedCategory) {
      // Defensive: require a category selected (shouldn't happen; UI disables)
      return;
    }

    // Find the subcategory name
    const subcategory = subcategories.find(sub => sub._id === product.subcategoryId);
    const subcategoryName = subcategory ? subcategory.name : "";

    const feat = subcategories.find(sub => sub._id === product.features[0]?.title);

    console.log("Selecting product:", product.name, "for category:", selectedCategory);

    const newSelection: SelectedProduct = {
      category: selectedCategory,
      productId: product.id,
      productName: `${subcategoryName} - ${product.name}`,
      price: product.price,
    };

    setSelectedProducts((prev) => {
      // Replace existing selection for this category
      const filtered = prev.filter((p) => p.category !== selectedCategory);
      return [...filtered, newSelection];
    });
  };

  const removeSelectedProduct = (category: PackageCategory) => {
    setSelectedProducts((prev) => prev.filter((p) => p.category !== category));
  };

  const totalPrice = useMemo(() => {
    return selectedProducts.reduce((sum, p) => sum + p.price, 0);
  }, [selectedProducts]);

  return (
    <div className="min-h-screen bg-foreground p-8">
      <Header />
      {/* <h1 className="text-3xl font-bold mb-6 text-purple-800">Build Your PC Quote</h1> */}
      <div className="flex mt-20">
        {/* Sidebar */}
        <div className="w-1/4">
          <PackagesSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={(cat) => setSelectedCategory(cat)}
            selectedProducts={selectedProducts}
            removeSelectedProduct={removeSelectedProduct}
          />
        </div>

        {/* Main area */}
        <div className="flex-1 min-h-[600px] ml-6">
          <PackageDetailArea
            selectedCategory={selectedCategory}
            products={products}
            subcategories={subcategories}
            selectedSubcategoryId={selectedSubcategoryId}
            setSelectedSubcategoryId={setSelectedSubcategoryId}
            selectProduct={selectProduct}
            selectedProducts={selectedProducts}
            loadingPackages={loadingPackages}
            packagesError={packagesError}
          />
        </div>
      </div>

      {/* Buttons */}
      <QuoteButtons totalPrice={totalPrice} selectedProducts={selectedProducts} />
    </div>
  );
};

export default PCBuilder;
