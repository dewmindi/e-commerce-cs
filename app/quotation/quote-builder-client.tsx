"use client";

import Header from "@/components/Header";
import React, { useMemo, useState } from "react";
import { Product, SelectedProduct, PackageCategory, Category, PackageFromDB, Subcategory } from "@/types/quoate";

import QuoteButtons from "@/components/Quoatation/quote-buttons";
import PackagesSidebar from "@/components/Quoatation/packages-side-bar";
import PackageDetailArea from "@/components/Quoatation/package-detials-area";
import SummaryCard from "@/components/Quoatation/summary-card";

function normalizeUiFeatures(p: PackageFromDB): string[] {
  if (Array.isArray(p.ui_features) && p.ui_features.length > 0) {
    return p.ui_features.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
  }

  if (!Array.isArray(p.features)) return [];

  // New format: Array<{ text: string; included: boolean }>
  const first = p.features[0];
  if (first && typeof first === "object" && "included" in first) {
    return p.features
      .filter((item): item is { text: string; included: boolean } =>
        !!item && typeof item === "object" && (item as any).included === true
      )
      .map((item) => (item as { text: string }).text)
      .filter((t) => typeof t === "string" && t.trim().length > 0);
  }

  // Legacy format: Array<{ title/name, items: { text, highlight }[] }>
  const legacyFeatures: string[] = [];
  for (const section of p.features) {
    if (!section || typeof section !== "object") continue;

    const sectionName = (section as { title?: unknown; name?: unknown }).title
      ?? (section as { title?: unknown; name?: unknown }).name;
    if (typeof sectionName === "string" && sectionName.trim()) {
      legacyFeatures.push(sectionName);
    }

    const items = (section as { items?: unknown }).items;
    if (Array.isArray(items)) {
      for (const item of items) {
        if (!item || typeof item !== "object") continue;
        const text = (item as { text?: unknown }).text;
        if (typeof text === "string" && text.trim()) {
          legacyFeatures.push(text);
        }
      }
    }
  }

  return legacyFeatures;
}

function mapPackageToProduct(p: PackageFromDB): Product {
  return {
    id: p._id,
    subcategoryId: p.subcategory_id,
    name: p.name,
    price: typeof p.price === "number" ? p.price : Number(p.price) || 0,
    inStock: 1,
    overview: p.overview,
    uiFeatures: normalizeUiFeatures(p),
    quotation: p.quotation,
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

  const handleCategoryChange = (catId: PackageCategory | null) => {
    setSelectedCategory(catId);
    setSelectedProducts([]);
    const firstSub = subcategories.find((s) => s.category_id === catId);
    setSelectedSubcategoryId(firstSub?._id ?? null);
  };

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
      uiFeatures: product.uiFeatures,
      quotation: product.quotation,
    };

    setSelectedProducts((prev) => {
      const sameCategory = prev.filter((p) => p.categoryId === selectedCategory);
      const withoutThisSub = sameCategory.filter((p) => p.subcategoryId !== subcategory._id);
      return [...withoutThisSub, newSelection];
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
      <div className="mt-16 lg:mt-24 flex flex-col lg:flex-row gap-6 md:mb-24">
        <div className="w-full lg:w-1/4">
          <PackagesSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
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

// "
