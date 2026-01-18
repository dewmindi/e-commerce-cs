import { Product, SelectedProduct, PackageCategory, Category, PackageFromDB, Subcategory } from "@/types/quoate";
import React, { useEffect, useMemo, useState } from "react";

interface PackageDetailAreaProps {
  selectedCategory: PackageCategory | null;
  products: Product[]; // currently loaded products (for the selected subcategory)
  subcategories: Subcategory[]; // subcategories for the selected category
  selectedSubcategoryId: string | null;
  setSelectedSubcategoryId: (id: string | null) => void;
  selectProduct: (product: Product) => void;
  selectedProducts: SelectedProduct[];
  loadingPackages: boolean;
  packagesError?: string | null;
}

const PackageDetailArea: React.FC<PackageDetailAreaProps> = ({
  selectedCategory,
  products,
  subcategories,
  selectedSubcategoryId,
  setSelectedSubcategoryId,
  selectProduct,
  selectedProducts,
  loadingPackages,
  packagesError,
}) => {
  const selectedProductIds = useMemo(
    () => new Set(selectedProducts.map((p) => p.productId)),
    [selectedProducts]
  );

  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // Reset active product when category or subcategory changes
  useEffect(() => {
    setActiveProduct(null);
  }, [selectedCategory, selectedSubcategoryId]);
  // Reset active product when products list changes

  useEffect(() => {
    setActiveProduct(null);
  }, [products]);



  if (!selectedCategory) {
    return (
      <div className="flex-1 p-6 text-center text-gray-500 border border-dashed rounded-lg">
        Select a category to load products
      </div>
    );
  }

  return (
    <div className="flex-1 p-0">
      {/* Subcategory Tabs */}
      <div className="mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {subcategories.length === 0 ? (
            <div className="text-sm text-gray-500">No subcategories</div>
          ) : (
            subcategories.map((sub) => {
              const active = selectedSubcategoryId === sub._id;
              return (
                <button
                  key={sub._id}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition ${active
                    ? "bg-[#a87f03] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  onClick={() => setSelectedSubcategoryId(sub._id)}
                >
                  {sub.name}
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className="flex">
        {/* Packages List */}
        <div className="space-y-3">
          {loadingPackages ? (
            <div className="p-6 text-center text-gray-500">Loading packages...</div>
          ) : packagesError ? (
            <div className="p-6 text-center text-red-600">{packagesError}</div>
          ) : products.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No packages found for this subcategory.</div>
          ) : (
            products.map((product) => {
              const isSelected = selectedProductIds.has(product.id);
              const isCompatible = true; // keep your compatibility logic here

              return (
                <div
                  key={product.id}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${isSelected ? "bg-[#e1cf9a] border-black" : "hover:bg-gray-50"
                    }`}
                  // onClick={() => selectProduct(product)}
                  onClick={() => {
                    selectProduct(product);     // your existing logic
                    setActiveProduct(product);  // show details on the right side
                  }}

                >
                  {/* Image Placeholder */}
                  <div className="w-12 h-12 bg-gray-200 mr-4 rounded-md flex items-center justify-center text-xs text-gray-600">
                    {product.name.slice(0, 2).toUpperCase()}
                  </div>

                  <div className="flex-1">
                    <p className={`font-medium ${isSelected ? "text-[#cc9b07]" : "text-[#cc9b07]"}`}>
                      {product.name}
                    </p>
                    {product.overview && <p className="text-sm text-gray-500">{product.overview}</p>}
                    <div className="flex items-center mt-1">
                      <span className="text-lg font-bold text-[#cc9b07] mr-4">AUD {product.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="w-96 p-4 bg-[#1a1a1a] text-white rounded-lg ml-6">
          {!activeProduct ? (
            <p className="text-gray-400">Select a package to view details</p>
          ) : (
            <>
              {/* Product Name */}
              <h2 className="text-2xl font-semibold text-[#cc9b07] mb-4">
                {activeProduct.name}
              </h2>

              {/* Overview */}
              {activeProduct.overview && (
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  {activeProduct.overview}
                </p>
              )}

              {/* Description */}
              {/* {activeProduct.description && (
        <div className="mb-4">
          <p className="text-md font-semibold text-gray-200 mb-1">Description</p>
          <p className="text-gray-300 text-sm">{activeProduct.description}</p>
        </div>
      )} */}

              {/* Features */}
              {/* FEATURES BLOCK — supports both types */}
              {activeProduct.features && (
                <div className="mb-4">
                  <p className="text-lg font-semibold text-[#ffd700] mb-2">Features</p>

                  {activeProduct.features.map((section, i) => (
                    <div key={i} className="mb-4">
                      {/* TYPE A (has title + items[]) */}
                      {"title" in section && (
                        <>
                          <p className="text-md font-semibold text-gray-200 mb-1">
                            {section.title}
                          </p>

                          <ul className="pl-4 list-disc space-y-1">
                            {section.items?.map((item, idx) => (
                              <li
                                key={idx}
                                className={`text-sm ${item.highlight
                                  ? "font-semibold text-[#ffd700]"
                                  : "text-gray-300"
                                  }`}
                              >
                                {item.text}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}

                      {/* TYPE B (simple name/value features) */}
                      {/* {"name" in section && (
                        <ul className="pl-4 list-disc space-y-1">
                          <li className="text-sm text-gray-300">{section.name}</li>
                        </ul>
                      )} */}

                      {"name" in section && (
                        <ul className="pl-4 list-disc space-y-1">
                          <li className="text-sm text-gray-300">{(section as { name: string }).name}</li>
                        </ul>
                      )}

                    </div>
                  ))}
                </div>
              )}
              <p className="text-lg font-bold text-[#ffd700] mt-4">
                AUD {activeProduct.price.toLocaleString()}
              </p>
            </>
          )}
        </div>


      </div>
    </div>
  );
};

export default PackageDetailArea;