"use client";

import Header from "@/components/Header";
import React, { useMemo, useState } from "react";
import { Product, SelectedProduct, PackageCategory, Category, PackageFromDB, Subcategory } from "@/types/quoate";

import QuoteButtons from "@/components/Quoatation/quote-buttons";
import PackagesSidebar from "@/components/Quoatation/packages-side-bar";
import PackageDetailArea from "@/components/Quoatation/package-detials-area";
import SummaryCard from "@/components/Quoatation/summary-card";

function mapPackageToProduct(p: PackageFromDB): Product {
  return {
    id: p._id,
    subcategoryId: p.subcategory_id,
    name: p.name,
    price: typeof p.price === "number" ? p.price : Number(p.price) || 0,
    inStock: 1,
    overview: p.overview,
    features: p.features || [],
  };
}

export default function QuoteBuilderClient({
  categories,
  subcategories,
  packages,
}: {
  categories: Category[];
  subcategories: Subcategory[];
  packages: PackageFromDB[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<PackageCategory | null>(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>(
    subcategories?.[0]?._id || null
  );

  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);

  const filteredSubcategories = useMemo(() => {
    if (!selectedCategory) return [];
    return subcategories.filter((s) => s.category_id === selectedCategory);
  }, [selectedCategory, subcategories]);

  const products: Product[] = useMemo(() => {
    if (!selectedSubcategoryId) return [];
    return packages
      .filter((p) => p.subcategory_id === selectedSubcategoryId)
      .map(mapPackageToProduct);
  }, [selectedSubcategoryId, packages]);

  const selectProduct = (product: Product) => {
    if (!selectedCategory) return;

    const subcategory = subcategories.find(
      (sub) => sub._id === product.subcategoryId
    );

    if (!subcategory) return;

    const newSelection: SelectedProduct = {
      categoryId: selectedCategory,
      subcategoryId: subcategory._id,
      subcategoryName: subcategory.name,
      productId: product.id,
      productName: product.name,
      price: product.price,
      features: product.features,
    };

    setSelectedProducts((prev) => {
      const filtered = prev.filter(
        (p) => p.subcategoryId !== subcategory._id
      );
      return [...filtered, newSelection];
    });
  };

  const removeSelectedProduct = (subcategoryId: string) => {
    setSelectedProducts((prev) =>
      prev.filter((p) => p.subcategoryId !== subcategoryId)
    );
  };

  const totalPrice = useMemo(() => {
    return selectedProducts.reduce((sum, p) => sum + p.price, 0);
  }, [selectedProducts]);

  return (
    <div className="min-h-screen bg-foreground px-4 py-6 md:p-8">
      <Header />

      <div className="mt-16 lg:mt-24 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/4">
          <PackagesSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedProducts={selectedProducts}
            removeSelectedProduct={removeSelectedProduct}
          />
        </div>

        <div className="flex-1 min-h-[400px]">
          <PackageDetailArea
            selectedCategory={selectedCategory}
            products={products}
            subcategories={filteredSubcategories}
            selectedSubcategoryId={selectedSubcategoryId}
            setSelectedSubcategoryId={setSelectedSubcategoryId}
            selectProduct={selectProduct}
            selectedProducts={selectedProducts}
            loadingPackages={false}
            packagesError={null}
          />
        </div>

        <div className="w-full lg:w-80 xl:w-96">
          <SummaryCard
            selectedProducts={selectedProducts}
            onCheckout={() => console.log("Checkout clicked!")}
          />
        </div>
      </div>

      <QuoteButtons
        totalPrice={totalPrice}
        selectedProducts={selectedProducts}
      />
    </div>
  );
}