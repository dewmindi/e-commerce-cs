"use client";
import {
    PackageCategory,
    CATEGORY_ORDER,
    CategoryDisplayNames,
    PackagesSidebarProps,
} from '@/types/quoate';
import React from 'react';


const PackagesSidebar: React.FC<PackagesSidebarProps> = ({
    selectedCategory,
    setSelectedCategory,
    selectedProducts,
    removeSelectedProduct,
}) => {
    const getSelectedProduct = (category: PackageCategory) =>
        selectedProducts.find((p) => p.category === category);

    return (
        <div className="w-full max-w-sm pr-4 space-y-2">
            {CATEGORY_ORDER.map((category) => {
                const selected = getSelectedProduct(category);
                const isSelected = selectedCategory === category;

                return (
                    <div
                        key={category}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${isSelected ? 'border-purple-600 ring-2 ring-purple-300' : 'border-gray-300 hover:border-purple-400'
                            }`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        <p className="font-semibold text-purple-700">
                            {CategoryDisplayNames[category]}
                        </p>
                        {selected ? (
                            <div className="flex items-center justify-between mt-1 p-1 bg-purple-100 rounded text-sm">
                                <span className="truncate pr-2">{selected.productName}</span>
                                <button
                                    className="w-5 h-5 flex items-center justify-center text-xs font-bold text-white bg-red-500 rounded-full hover:bg-red-700 transition"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent opening/selecting the category
                                        removeSelectedProduct(category);
                                    }}
                                >
                                    &times;
                                </button>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">Click to choose</p>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default PackagesSidebar;