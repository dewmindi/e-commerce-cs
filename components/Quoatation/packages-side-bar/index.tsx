import { PackageCategory, Category, SelectedProduct } from "@/types/quoate";
import { X, ChevronRight, Check } from "lucide-react"; // Optional: Use Lucide for better icons

interface PackagesSidebarProps {
  categories: Category[];
  selectedCategory: PackageCategory | null;
  setSelectedCategory: (cat: PackageCategory | null) => void;
  selectedProducts: SelectedProduct[];
  removeSelectedProduct: (subcategoryId: string) => void;
}

const PackagesSidebar: React.FC<PackagesSidebarProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedProducts,
  removeSelectedProduct,
}) => {
  const getSelectedProductsByCategory = (categoryId: string) =>
    selectedProducts.filter((p) => p.categoryId === categoryId);

  return (
    <aside className="w-full lg:max-w-sm lg:pr-4">
      {/* Mobile Horizontal Navigation: Sticky & Scannable */}
      <div className="flex overflow-x-auto pb-4 gap-3 lg:hidden no-scrollbar">
        {categories.map((cat) => {
          const selectedCount = getSelectedProductsByCategory(cat._id).length;
          const isSelected = selectedCategory === cat._id;

          return (
            <button
              key={cat._id}
              onClick={() => setSelectedCategory(cat._id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                isSelected
                  ? "bg-[#a87f03] text-white border-[#a87f03]"
                  : "bg-white text-gray-700 border-gray-200"
              }`}
            >
              {cat.name}
              {selectedCount > 0 && (
                <span className="ml-2 bg-white text-[#a87f03] px-1.5 rounded-full text-xs">
                  {selectedCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Desktop Vertical List & Mobile Details (Visible only for active category on mobile) */}
      <div className="space-y-3">
        {categories.length === 0 ? (
          <div className="p-4 border rounded-lg text-gray-500 animate-pulse">
            Loading categories...
          </div>
        ) : (
          categories.map((cat) => {
            const selectedInCategory = getSelectedProductsByCategory(cat._id);
            const isSelected = selectedCategory === cat._id;

            return (
              <div
                key={cat._id}
                className={`transition-all duration-200 border rounded-xl overflow-hidden ${
                  isSelected
                    ? "border-[#a87f03] ring-1 ring-[#a87f03]"
                    : "border-gray-200 bg-gray-50 lg:hover:border-gray-400"
                } ${!isSelected ? "hidden lg:block" : "block"}`} 
                /* Note: On mobile, we only show the expanded active card to save space */
                onClick={() => setSelectedCategory(cat._id)}
              >
                <div className="p-4 cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`font-bold ${isSelected ? "text-[#a87f03]" : "text-gray-900"}`}>
                        {cat.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">{cat.description}</p>
                    </div>
                    {selectedInCategory.length > 0 && <Check className="w-5 h-5 text-green-600" />}
                  </div>

                  {/* Selected Items Tags */}
                  {selectedInCategory.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedInCategory.map((p) => (
                        <div
                          key={p.subcategoryId}
                          className="flex items-center gap-2 px-2 py-1 bg-[#fdf8e6] border border-[#e1cf9a] rounded-md text-[11px] text-gray-800"
                        >
                          <span className="truncate max-w-[120px]">
                            <span className="font-semibold">{p.subcategoryName}:</span> {p.productName}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSelectedProduct(p.subcategoryId);
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {!selectedInCategory.length && isSelected && (
                    <div className="mt-2 text-xs text-[#a87f03] flex items-center gap-1 font-medium">
                      Select an option below <ChevronRight size={12} />
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};

export default PackagesSidebar;