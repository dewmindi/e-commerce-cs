import { Product, SelectedProduct, PackageCategory, Category, PackageFromDB } from "@/types/quoate";

interface PackagesSidebarProps {
  categories: Category[];
  selectedCategory: PackageCategory | null;
  setSelectedCategory: (cat: PackageCategory | null) => void;
  selectedProducts: SelectedProduct[];
  removeSelectedProduct: (subcategoryId: string) => void; // now by subcategory
}

const PackagesSidebar: React.FC<PackagesSidebarProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedProducts,
  removeSelectedProduct,
}) => {
  const getSelectedProductsByCategory = (categoryId: PackageCategory | null) =>
    selectedProducts.filter((p) => p.categoryId === categoryId);



  return (
    <div className="w-full max-w-sm pr-4 space-y-2">
      {categories.length === 0 ? (
        <div className="p-3 border rounded-lg text-gray-500">Loading categories...</div>
      ) : (
        categories.map((cat) => {
          const selectedInCategory = getSelectedProductsByCategory(cat._id);
          const isSelected = selectedCategory === cat._id;

          return (
            <div
              key={cat._id}
              className={`p-3 border rounded-lg cursor-pointer transition-all ${isSelected
                ? "border-[#a87f03]  ring-gray-700"
                : "border-gray-300 hover:border-stone-950"
                }`}
              onClick={() => setSelectedCategory(cat._id)}
            >
              <p className="font-semibold text-[#a87f03]">{cat.name}</p>
              <p className="text-sm text-white truncate">{cat.description}</p>

              {selectedInCategory.length > 0 ? (
                <div className="mt-2 space-y-1">
                  {selectedInCategory.map((p) => (
                    <div
                      key={p.subcategoryId}
                      className="flex items-center justify-between p-1 bg-[#e1cf9a] rounded text-sm"
                    >
                      <span className="truncate pr-2">
                        <strong>{p.subcategoryName}:</strong> {p.productName}
                      </span>
                      <button
                        className="w-6 h-6 flex items-center justify-center text-sm font-bold text-white bg-red-500 rounded-full hover:bg-red-700 transition"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSelectedProduct(p.subcategoryId); // remove specific subcategory
                        }}
                        aria-label={`Remove selected product for ${p.subcategoryName}`}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
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

export default PackagesSidebar;