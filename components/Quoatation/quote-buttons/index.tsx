"use client";
import {
    ButtonsProps
} from '@/types/quoate';
import React, { useState, useMemo } from 'react';

const QuoteButtons: React.FC<ButtonsProps> = ({ totalPrice }) => {
    return (
        <div className="flex justify-end items-center mt-8 pt-4 border-t border-gray-200 pb-10 p-8">
            <span className="mr-6 text-xl font-bold">
                LKR {totalPrice.toLocaleString()}
            </span>
            <button className="px-6 py-3 mr-3 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition">
                Download Quotation
            </button>
            <button className="px-6 py-3 font-semibold text-white bg-purple-800 rounded-lg hover:bg-purple-900 transition">
                Add All to Cart
            </button>
        </div>
    );
};

export default QuoteButtons;