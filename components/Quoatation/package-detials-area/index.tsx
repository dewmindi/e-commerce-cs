import { Product, SelectedProduct, PackageCategory, Subcategory } from "@/types/quoate";
import React, { useEffect, useMemo, useState } from "react";
import { X, CheckCircle2, ChevronRight, Info } from "lucide-react";

interface PackageDetailAreaProps {
  selectedCategory: PackageCategory | null;
  products: Product[];
  subcategories: Subcategory[];
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
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const selectedProductIds = useMemo(
    () => new Set(selectedProducts.map((p) => p.productId)),
    [selectedProducts]
  );

  useEffect(() => {
    setActiveProduct(null);
  }, [selectedCategory, selectedSubcategoryId, products]);

  if (!selectedCategory) {
    return (
      <div className="flex-1 p-8 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center">
        <Info className="mb-2 opacity-20" size={48} />
        <p>Select a category to view available packages</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col lg:flex-row gap-6">
      {/* LEFT COLUMN: Subcategories & Product List */}
      <div className="flex-1 min-w-0">
        {/* Subcategory Navigation */}
        <div className="sticky top-0  z-10 py-2 mb-4">
          <div
            className={`flex gap-2 pb-1 overflow-x-auto no-scrollbar flex-nowrap lg:overflow-visible lg:flex-wrap `}
          >
            {subcategories.length === 0 ? (
              <div className="text-sm text-gray-500">No subcategories</div>
            ) : (
              subcategories.map((sub) => {
                const active = selectedSubcategoryId === sub._id;
                return (
                  <button
                    key={sub._id}
                    className={`
                      w-48 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border 
              flex-shrink-0 
              ${active
                        ? "bg-[#a87f03] border-[#a87f03] text-white shadow-md"
                        : "bg-white border-gray-200 text-gray-600 hover:border-[#a87f03]"
                      }
            `}
                    onClick={() => setSelectedSubcategoryId(sub._id)}
                  >
                    {sub.name}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Products List */}
        <div className="space-y-3">
          {loadingPackages ? (
            <div className="p-10 text-center text-gray-400 animate-pulse">Loading items...</div>
          ) : products.length === 0 ? (
            <div className="p-10 text-center text-gray-500 bg-gray-50 rounded-xl">
              No packages found in this subcategory.
            </div>
          ) : (
            products.map((product) => {
              const isSelected = selectedProductIds.has(product.id);
              return (
                <div
                  key={product.id}
                  className={`group  relative flex items-center p-4 border rounded-xl cursor-pointer transition-all ${isSelected
                    ? "bg-[#fdf8e6] border-[#a87f03] ring-1 ring-[#a87f03]"
                    : " border-gray-200 hover:border-gray-400"
                    }`}
                  onClick={() => {
                    selectProduct(product);
                    setActiveProduct(product);
                  }}
                >
                  <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold text-gray-400 shrink-0 border border-gray-200">
                    {product.name.slice(0, 2).toUpperCase()}
                  </div>

                  <div className="flex-1 ml-4 pr-6">
                    <div className="flex items-center gap-2">
                      <p className={`font-bold group-hover:text-[#a87f03] transition-colors ${isSelected ? "text-primary" : "text-primary-foreground"}`}>
                        {product.name}
                      </p>
                      {isSelected && <CheckCircle2 size={16} className="text-[#a87f03]" />}
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-1">{product.overview}</p>
                    <p className="text-sm font-bold text-[#a87f03] mt-1">
                      AUD {product.price.toLocaleString()}
                    </p>
                  </div>

                  <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-500" />
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className={`
        fixed inset-0 z-50 lg:relative lg:inset-auto lg:z-0 lg:block lg:w-96
        ${activeProduct ? 'flex' : 'hidden'}
        flex-col bg-black/60 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none
      `}>
        <div className="mt-auto lg:mt-0 w-full lg:h-full bg-[#1a1a1a] text-white rounded-t-3xl lg:rounded-2xl p-6 shadow-2xl overflow-y-auto max-h-[85vh] lg:max-h-screen">
          {/* Mobile Close Button */}
          <button
            onClick={() => setActiveProduct(null)}
            className="lg:hidden absolute top-4 right-4 p-2 bg-white/10 rounded-full"
          >
            <X size={20} />
          </button>

          {activeProduct ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <span className="text-[10px] uppercase tracking-widest text-[#a87f03] font-bold">Package Detail</span>
              <h2 className="text-2xl font-bold text-white mt-1 mb-4 leading-tight">
                {activeProduct.name}
              </h2>

              <div className="space-y-6">
                {activeProduct.overview && (
                  <div>
                    <h4 className="text-[#a87f03] text-xs font-bold uppercase mb-2">Overview</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{activeProduct.overview}</p>
                  </div>
                )}

                {activeProduct.uiFeatures.length > 0 && (
                  <div>
                    <h4 className="text-[#a87f03] text-xs font-bold uppercase mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {activeProduct.uiFeatures.map((feature, i) => (
                        <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                          <span className="mt-1 w-1 h-1 rounded-full bg-[#a87f03] shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase">PRICE</p>
                  <p className="text-2xl font-black text-[#ffd700]">
                    AUD {activeProduct.price.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setActiveProduct(null)}
                  className="lg:hidden bg-[#a87f03] px-6 py-2 rounded-lg font-bold text-sm"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex flex-col items-center justify-center h-full text-center text-gray-500">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <Info size={24} />
              </div>
              <p>Select a package to view<br />specifications and features</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageDetailArea;
