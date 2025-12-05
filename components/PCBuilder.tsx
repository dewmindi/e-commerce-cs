// components/PCBuilder.tsx
import React, { useEffect, useMemo, useState } from "react";

/**
 * Types (adjust if your API returns slightly different shapes)
 */
type Category = {
  _id: string;
  name: string;
  description?: string;
};

type Subcategory = {
  _id: string;
  category_id: string;
  name: string;
  description?: string;
};

type PackageFromDB = {
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
};

export type PackageCategory = string; // category _id

export type SelectedProduct = {
  category: PackageCategory;
  productId: string;
  productName: string;
  price: number;
};

/**
 * Helper: convert DB package -> UI Product
 */
function mapPackageToProduct(p: PackageFromDB): Product {
  return {
    id: p._id,
    subcategoryId: p.subcategory_id,
    name: p.name,
    price: typeof p.price === "number" ? p.price : Number(p.price) || 0,
    inStock: 1, // default because DB doesn't have stock field; change if you add it
    overview: p.overview,
  };
}

/**
 * Packages Sidebar
 */
interface PackagesSidebarProps {
  categories: Category[];
  selectedCategory: PackageCategory | null;
  setSelectedCategory: (cat: PackageCategory | null) => void;
  selectedProducts: SelectedProduct[];
  removeSelectedProduct: (category: PackageCategory) => void;
}

const PackagesSidebar: React.FC<PackagesSidebarProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedProducts,
  removeSelectedProduct,
}) => {
  const getSelectedProduct = (category: PackageCategory | null) =>
    selectedProducts.find((p) => p.category === category);

  return (
    <div className="w-full max-w-sm pr-4 space-y-2">
      {categories.length === 0 ? (
        <div className="p-3 border rounded-lg text-gray-500">Loading categories...</div>
      ) : (
        categories.map((cat) => {
          const selected = getSelectedProduct(cat._id);
          const isSelected = selectedCategory === cat._id;

          return (
            <div
              key={cat._id}
              className={`p-3 border rounded-lg cursor-pointer transition-all ${
                isSelected
                  ? "border-purple-600 ring-2 ring-purple-300"
                  : "border-gray-300 hover:border-purple-400"
              }`}
              onClick={() => setSelectedCategory(cat._id)}
            >
              <p className="font-semibold text-purple-700">{cat.name}</p>
              <p className="text-sm text-gray-500 truncate">{cat.description}</p>

              {selected ? (
                <div className="flex items-center justify-between mt-2 p-1 bg-purple-100 rounded text-sm">
                  <span className="truncate pr-2">{selected.productName}</span>
                  <button
                    className="w-6 h-6 flex items-center justify-center text-sm font-bold text-white bg-red-500 rounded-full hover:bg-red-700 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSelectedProduct(cat._id);
                    }}
                    aria-label={`Remove selected product for ${cat.name}`}
                  >
                    &times;
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-500 mt-2">Click to choose</p>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

/**
 * Package Detail Area (with subcategory tabs)
 */
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
                  className={`px-3 py-2 rounded-full text-sm font-medium transition ${
                    active
                      ? "bg-purple-700 text-white"
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

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          // You can wire up search state if you'd like; kept simple for now
        />
      </div>

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
                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                  isSelected ? "bg-purple-50 border-purple-600" : "hover:bg-gray-50"
                }`}
                onClick={() => selectProduct(product)}
              >
                {/* Image Placeholder */}
                <div className="w-12 h-12 bg-gray-200 mr-4 rounded-md flex items-center justify-center text-xs text-gray-600">
                  {product.name.slice(0, 2).toUpperCase()}
                </div>

                <div className="flex-1">
                  <p className={`font-medium ${isSelected ? "text-purple-800" : "text-gray-800"}`}>
                    {product.name}
                  </p>
                  {product.overview && <p className="text-sm text-gray-500">{product.overview}</p>}
                  <div className="flex items-center mt-1">
                    <span className="text-lg font-bold text-purple-700 mr-4">LKR {product.price.toLocaleString()}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${product.inStock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                    >
                      {product.inStock > 0 ? `In Stock (${product.inStock})` : "Out of Stock"}
                    </span>
                  </div>
                </div>

                {isCompatible && (
                  <span className="text-xs text-green-600 font-semibold border border-green-300 px-2 py-1 rounded-full ml-4">
                    Compatible
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

/**
 * Buttons (summary)
 */
interface ButtonsProps {
  totalPrice: number;
}

const Buttons: React.FC<ButtonsProps> = ({ totalPrice }) => {
  return (
    <div className="flex justify-end items-center mt-8 pt-4 border-t border-gray-200">
      <span className="mr-6 text-xl font-bold">LKR {totalPrice.toLocaleString()}</span>
      <button className="px-6 py-3 mr-3 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition">
        Download Quotation
      </button>
      <button className="px-6 py-3 font-semibold text-white bg-purple-800 rounded-lg hover:bg-purple-900 transition">
        Add All to Cart
      </button>
    </div>
  );
};

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

    const newSelection: SelectedProduct = {
      category: selectedCategory,
      productId: product.id,
      productName: product.name,
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
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-purple-800">Build Your PC Quote</h1>
      <div className="flex">
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
      <Buttons totalPrice={totalPrice} />
    </div>
  );
};

export default PCBuilder;
