"use client";

import Header from "@/components/Header";
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
                  ? "border-[#a87f03]  ring-gray-700"
                  : "border-gray-300 hover:border-stone-950"
              }`}
              onClick={() => setSelectedCategory(cat._id)}
            >
              <p className="font-semibold text-[#a87f03]">{cat.name}</p>
              <p className="text-sm text-white truncate">{cat.description}</p>

              {selected ? (
                <div className="flex items-center justify-between mt-2 p-1 bg-[#e1cf9a] rounded text-sm">
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
                  isSelected ? "bg-[#e1cf9a] border-black" : "hover:bg-gray-50"
                }`}
                onClick={() => selectProduct(product)}
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
    </div>
  );
};

import { jsPDF } from "jspdf";

/**
 * Buttons (summary)
 */
interface ButtonsProps {
  totalPrice: number;
  selectedProducts: SelectedProduct[];
}

const Buttons: React.FC<ButtonsProps> = ({ totalPrice, selectedProducts }) => {

  // Helper function to generate a short, random alphanumeric string
const generateRandomString = (length = 6) => {
    return Math.random().toString(36).substring(2, length + 2).toUpperCase();
};

  const downloadQuotation = () => {
    if (selectedProducts.length === 0) return;

    // Initialize jsPDF in 'portrait' mode with 'mm' units (better for precise layout)
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const marginX = 15; // Standard margin on X-axis

    // --- Placeholder/Example Data ---
    const companyLogo = 'data:image/png;base64,...'; // **REPLACE** with your actual base64 logo image string
    const companyName = "CS Graphic Meta";
    const companyAddress = "Unit 3/2 Adam Ave, Hallam VIC 3803, Australia";
    const companyPhone = "+61 405 455 273";
    const companyEmail = "info@graphicmeta.com.au";
    const quoteTitle = "QUOTATION";
    const customerName = "Client Placeholder Name"; // You should pass this in
    // --- End Placeholder/Example Data ---

    // --- Dynamic Quote Reference Generation ---
    const currentYear = new Date().getFullYear();
    const randomPart = generateRandomString(4); // e.g., 'A8G7'
    
    // Example ID: Q-2025-A8G7
    const quoteReference = `Q-${currentYear}-${randomPart}`; 
    
    // --- End Dynamic Quote Reference Generation ---

    let currentY = 0; // Current Y position for content

    // --- Helper function for Header ---
    const addHeader = (doc, logoData, name, address, phone, email, title) => {
        const logoWidth = 30; // mm
        const logoHeight = 15; // mm
        const headerY = 15;

        // 1. Logo
        // Add image: (imgData, format, x, y, width, height)
        if (logoData) {
            try {
                // Ensure your logo is properly formatted (e.g., PNG, JPEG)
                doc.addImage(logoData, 'PNG', marginX, headerY, logoWidth, logoHeight);
            } catch (e) {
                console.error("Error adding logo:", e);
                // Fallback text if logo fails
                doc.setFontSize(14);
                doc.setTextColor(50, 50, 50);
                doc.setFont('helvetica', 'bold');
                doc.text(name, marginX, headerY + 10);
            }
        } else {
            // Text Header if no logo
            doc.setFontSize(14);
            doc.setTextColor(50, 50, 50);
            doc.setFont('helvetica', 'bold');
            doc.text(name, marginX, headerY + 10);
        }

        // 2. Company Info & Title (Right Aligned)
        const infoX = pageWidth - marginX;
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 100, 100);
        doc.setFontSize(9);
        doc.text(address, infoX, headerY + 2, { align: "right" });
        doc.text(`Phone: ${phone}`, infoX, headerY + 6, { align: "right" });
        doc.text(`Email: ${email}`, infoX, headerY + 10, { align: "right" });

        // 3. Quote Title
        doc.setFontSize(18);
        doc.setTextColor(30, 30, 30);
        doc.setFont('helvetica', 'bold');
        doc.text(title, infoX, headerY + 20, { align: "right" });

        // Set Y position for content start
        return headerY + 30; // Space after header
    };

    // --- Helper function for Footer ---
    const addFooter = (doc, pageNum, totalPages) => {
        const footerY = pageHeight - 10;
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.setFont('helvetica', 'normal');

        // Page Numbering
        doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - marginX, footerY, { align: "right" });

        // Footer Text
        doc.text("Graphic Meta Solutions - ABN 98 765 432 109 - Thank you for your business!", marginX, footerY);
    };

    // --- Main Document Generation ---

    // 1. Set up Header
    currentY = addHeader(doc, companyLogo, companyName, companyAddress, companyPhone, companyEmail, quoteTitle);

    // 2. Quote/Client Details Box
    doc.setFillColor(240, 240, 240); // Light grey background
    doc.rect(marginX, currentY, pageWidth - (2 * marginX), 25, 'F'); // Draw filled rectangle
    currentY += 5;

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(11);
    doc.text("Quotation Date:", marginX + 2, currentY);
    // doc.text("Quotation Date:", pageWidth / 2, currentY);

    currentY += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(new Date().toLocaleDateString('en-AU'), marginX + 2, currentY);

    currentY += 5;
    doc.setFont('helvetica', 'bold');
    doc.text("Quote Ref:", marginX + 2, currentY);
    currentY += 5;
    doc.setFont('helvetica', 'normal');
    doc.text(quoteReference, marginX + 2, currentY); // Example Quote Number
    doc.setFontSize(9);

    currentY += 10; // Space after box

    // 3. Table Headers
    const tableHeaderY = currentY;
    const colNo = marginX;
    const colProduct = marginX + 20;
    const colPrice = pageWidth - marginX; // Right edge
    const colPriceStart = colPrice - 30; // X position to start price column

    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255); // White text
    doc.setFont('helvetica', 'bold');
    doc.setFillColor(0, 123, 194); // A professional blue color

    // Draw header row rectangle
    doc.rect(marginX, tableHeaderY, pageWidth - (2 * marginX), 7, 'F'); // 'F' for fill

    // Write text on top of rectangle
    doc.text("No.", colNo + 2, tableHeaderY + 5);
    doc.text("Product/Service Description", colProduct, tableHeaderY + 5);
    doc.text("Price (AUD)", colPrice, tableHeaderY + 5, { align: "right" });

    currentY += 7; // Move Y down after header row

    // 4. Table Rows
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    doc.setFont('helvetica', 'normal');
    let rowHeight = 6;
    let tableLine = currentY;

    selectedProducts.forEach((p, index) => {
        const rowY = currentY + (index * rowHeight);

        // Check for page break (simple check)
        if (rowY > pageHeight - 40) {
            doc.addPage();
            currentY = addHeader(doc, companyLogo, companyName, companyAddress, companyPhone, companyEmail, quoteTitle); // Re-add header
            // Re-draw table header on new page
            doc.setFillColor(0, 123, 194);
            doc.rect(marginX, currentY, pageWidth - (2 * marginX), 7, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFont('helvetica', 'bold');
            doc.text("No.", colNo + 2, currentY + 5);
            doc.text("Product/Service Description", colProduct, currentY + 5);
            doc.text("Price (AUD)", colPrice, currentY + 5, { align: "right" });
            currentY += 7;
            rowHeight = 6;
            tableLine = currentY;
        }
        
        const currentRowY = tableLine + (index * rowHeight) + 4; // Adjusted row Y

        // Render Row content
        doc.setTextColor(50, 50, 50);
        doc.setFont('helvetica', 'normal');
        doc.text(`${index + 1}`, colNo + 2, currentRowY);
        doc.text(p.productName, colProduct, currentRowY);
        doc.text(p.price.toFixed(2), colPrice, currentRowY, { align: "right" });

        // Add a light separator line for better readability
        doc.setLineWidth(0.1);
        doc.setDrawColor(200, 200, 200);
        doc.line(marginX, currentRowY + 2, pageWidth - marginX, currentRowY + 2);
    });

    currentY = tableLine + (selectedProducts.length * rowHeight);

    // 5. Total Section
    currentY += 5; // Space
    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 0, 0); // Black line
    doc.line(colPriceStart - 15, currentY, colPrice, currentY); // Line above total

    currentY += 5;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 30, 30);
    doc.text(`TOTAL (AUD):`, colPriceStart - 15, currentY, { align: "left" });
    doc.text(`${totalPrice.toFixed(2)}`, colPrice, currentY, { align: "right" });

    // 6. Final Notes/Terms
    currentY += 10;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text("Note: Prices are inclusive of GST unless otherwise stated. This quote is valid for 30 days.", marginX, currentY);

    // 7. Render Footer on all pages
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        addFooter(doc, i, pageCount);
    }

    // 8. Save PDF
    doc.save("Quotation-CS Graphic Meta.pdf");
};


  return (
    <div className="flex justify-end items-center mt-8 pt-4 border-t border-gray-200">
      <span className="mr-6 text-xl font-bold text-white">AUD {totalPrice.toLocaleString()}</span>
      <button 
        onClick={downloadQuotation}
        disabled={selectedProducts.length === 0}
        className="px-6 py-3 mr-3 font-semibold text-white bg-[#a87f03] rounded-lg hover:bg-black hover:border  transition"
        >
        Download Quotation
      </button>
      <button className="px-6 py-3 font-semibold text-white bg-[#a87f03] rounded-lg hover:bg-black hover:border transition">
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

      // Find the subcategory name
  const subcategory = subcategories.find(sub => sub._id === product.subcategoryId);
  const subcategoryName = subcategory ? subcategory.name : "";

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
      <Header/>
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
      <Buttons totalPrice={totalPrice} selectedProducts={selectedProducts} />
    </div>
  );
};

export default PCBuilder;
