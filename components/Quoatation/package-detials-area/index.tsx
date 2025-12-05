"use client";
import {
    PackageDetailAreaProps,
} from '@/types/quoate';
import React, { useState, useMemo } from 'react';

const PackageDetailArea: React.FC<PackageDetailAreaProps> = ({
    selectedCategory,
    products,
    selectProduct,
    selectedProducts
}) => {
    const filteredProducts = useMemo(
        () => products.filter((p) => p.category === selectedCategory),
        [products, selectedCategory]
    );

    const selectedProductIds = useMemo(
        () => new Set(selectedProducts.map(p => p.productId)),
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
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
            </div>
            <div className="space-y-3">
                {filteredProducts.map((product) => {
                    const isSelected = selectedProductIds.has(product.id);
                    const isCompatible = true; // Placeholder for compatibility logic

                    return (
                        <div
                            key={product.id}
                            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${isSelected ? 'bg-purple-50 border-purple-600' : 'hover:bg-gray-50'
                                }`}
                            onClick={() => selectProduct(product)}
                        >
                            {/* Image Placeholder */}
                            <div className="w-12 h-12 bg-gray-200 mr-4 rounded-md flex items-center justify-center text-xs text-gray-600">


                                [Image of {product.category}]

                            </div>

                            <div className="flex-1">
                                <p className={`font-medium ${isSelected ? 'text-purple-800' : 'text-gray-800'}`}>
                                    {product.name}
                                </p>
                                <div className="flex items-center mt-1">
                                    <span className="text-lg font-bold text-purple-700 mr-4">
                                        LKR {product.price.toLocaleString()}
                                    </span>
                                    <span className={`text-xs px-2 py-0.5 rounded ${product.inStock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {product.inStock > 0 ? `In Stock (${product.inStock})` : 'Out of Stock'}
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
                })}
            </div>
        </div>
    );
};

export default PackageDetailArea