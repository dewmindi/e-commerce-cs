"use client";

import { useState } from 'react';
import { useCart } from '@/app/context/CartContext';

type AddPackageToCartButtonProps = {
    id: string;
    name: string;
    price: number;
    subcategoryId: string;
};

const AddPackageToCartButton = ({ id, name, price, subcategoryId }: AddPackageToCartButtonProps) => {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleClick = () => {
        addToCart({
            id,
            title: name,
            price,
            quantity: 1,
            image: '/cs-logo.png',
            category: subcategoryId,
        });

        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#e9c468] px-4 py-2 text-sm font-semibold text-black hover:bg-[#d7af4f] transition-colors"
        >
            {added ? 'Added to Cart' : `Choose ${name}`}
        </button>
    );
};

export default AddPackageToCartButton;